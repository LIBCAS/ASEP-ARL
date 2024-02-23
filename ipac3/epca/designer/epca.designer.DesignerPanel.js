/*
 * EPCA Form Designer
 * @author Kungfu
 *
 * 21.02.23 on; jazykova mutace nazvu formulare
 * 28.01.22 on; podminka - pole v kontejneru bez podpoli
 * 07.01.21 on; icon-error-epca
 * 03.03.20 on; prepinani stylu
 * 23.01.20 on; zmena nazvu getTagListInt - sufix Int
 * 27.11.19 on; prevod na format s prefixem "st", pokud jeste neni prevedeno
 * 11.07.19 on; osetrena loadForm
 * 16.05.17 on; uprava funkce saveas
 * 06.04.17 on; oprava vytvoreni noveho formulare
 * 14.12.16 on; uprava okna pro novy formular
 * 23.05.12 on; oprava chyby
 * 09.12.11 on; osetrene ztraceni defaultnich hodnot
 * 19.07.11 on; doplneno nastaveni cilove DB po vyberu noveho zaznamu
 */
/*global Ext,i3,epca,document */

Ext.ns('epca.designer');

// 03.03.20 on; konstanty
epca.designer.c = {
  sActualCssStyle : 'css/' + i3.ictx.toLowerCase() + '1.css' // globalni promenna - defaultni styl
};

/*
 * Mame tri typy uzlov (formPartType) - nic lepsie ma nenapadlo:
 * 1. form - formular
 * 2. tag - tag
 * 3. field - podpole tagu
 */
epca.designer.DesignerPanel = Ext.extend(Ext.Panel, {

  unFormat : 'B',

  tagListTreePanel : undefined, // Zoznam tagov - Lavy strom (jednourovnovy)
  formTreePanel : undefined, // Navrhnuty fomular - Pravy strom (viacurovnovy aj s podpoliami)
  propertyGridPanel : undefined, // Tabulka nastaveni
  sourceCodeTextArea : undefined,

  openForm : undefined, // referencia na otvoreny formular, undefined ak vytvarame novy
  selectedNode : undefined,

  spot : new Ext.ux.Spotlight({
    easing : 'easeOut',
    duration : 0.3
  }),

  constructor : function(config) {
    config = config || {};

    // pokud je v url zadan skin, otevre ho pri spusteni
    var sSkin = this.csGetSkinFromUrl();
    if (!i3.isEmptyString(sSkin)) {
      // "0" se bere jako ictx bez sufixu
      if (sSkin === '0') {
        sSkin = '';
      }
      sSkin = 'css/' + i3.ictx.toLowerCase() + sSkin + '.css';
      this.csSwitchCSS(null, null, null, sSkin);
    }

    /*
     config.listeners = config.listeners || {};
     Ext.applyIf(config.listeners, {

     });
     */
    Ext.apply(config, {
      autoScroll : false,
      frame : false,
      border : false,
      layout : 'border',
      items : [{
        region : 'east',
        title : epca.L10n.titleProperties,
        split : true,
        width : 300,
        minSize : 200,
        maxSize : 600,
        layout : 'fit',
        items : [{
          border : false,
          xtype : 'tabpanel',
          activeTab : 0,
          tabPosition : 'bottom',
          items : [this.getPropertyGridPanel(), {
            title : epca.L10n.titleSourceCode,
            layout : {
              type : 'vbox',
              padding : '5',
              align : 'stretch'
            },
            defaults : {
              margins : '5 0 0 0'
            },
            items : [this.getSourceCodeTextArea(), {
              xtype : 'button',
              text : epca.L10n.titleRunSourceCode,
              listeners : {
                click : function() {
                  eval(this.getSourceCodeTextArea().getValue());
                },
                scope : this
              }
            }, {
              xtype : 'button',
              text : epca.L10n.titleValidateSourceCode,
              listeners : {
                click : function() {
                  var source = this.getSourceCodeTextArea().getValue();

                  if (epca.designer.CustomCodeValidator.validate(source)) {
                    epca.notify("Validný zdrojový kód.", "Validácia", "icon-accept");
                  } else {
                    var message = "Nevalidný zdrojový kód!\nChyba: " + epca.designer.CustomCodeValidator.errorMessage;
                    epca.notify(message, "Validácia", "icon-error-epca");
                  }
                },
                scope : this
              }
            }, {
              xtype : 'button',
              text : epca.L10n.titleSaveSourceCode,
              listeners : {
                click : function() {
                  var source = this.getSourceCodeTextArea().getValue();

                  if (epca.designer.CustomCodeValidator.validate(source)) {
                    if (this.selectedNode) {
                      this.selectedNode.attributes.formProperties['customCode'] = source;
                      epca.notify("Zdrojový kód pre '" + this.selectedNode.text + "' úspešne uložený.", "Zdrojový kód", "icon-accept");
                    }
                  } else {
                    var message = "Nevalidný zdrojový kód!\nChyba: " + epca.designer.CustomCodeValidator.errorMessage;
                    epca.notify(message, "Validácia", "icon-error-epca");
                  }
                },
                scope : this
              }
            }]
          }]
        }]
      }, {
        layout : 'border',
        id : 'left-control-panel',
        region : 'west',
        border : false,
        split : true,
        width : 275,
        minSize : 200,
        maxSize : 600,
        items : [this.getTagListTreePanel(), {
          xtype : 'panel',
          id : 'details-panel',
          title : epca.L10n.designerTagDescription,
          region : 'center',
          autoScroll : true
        }]
      }, this.getFormTreePanel()],
      tbar : {
        xtype : 'toolbar',
        align : 'center',
        items : [{
          xtype : 'tbseparator'
        }, {
          xtype : 'spacer',
          width : 10
        }, {
          text : epca.L10n.titleNew,
          iconCls : 'icon-image-add',
          handler : function() {
            var win = new epca.window.NewForm({
              buttons : [{
                text : epca.L10n.titleCreate,
                listeners : {
                  click : function() {
                    // 14.12.16 on; pridani id, predelane
                    if (win.getFormId() === "") {
                      epca.notify("Nezadali jste id formuláře.", epca.L10n.messageError, "icon-error-epca");
                      return;
                    }
                    if (win.getUnFormat() === "") {
                      epca.notify("Nezadali jste typ formuláře.", epca.L10n.messageError, "icon-error-epca");
                      return;
                    }
                    var sTitle = win.getFormTitle();
                    if (sTitle === "") {
                      sTitle = win.getFormId();
                    }

                    this.initializeNewForm(win.getUnFormat(), sTitle, win.getFormId());
                    win.close();
                    this.spot.hide();
                  },
                  scope : this
                }
              }, {
                text : epca.L10n.titleClose,
                listeners : {
                  click : function() {
                    win.close();
                    this.spot.hide();
                  },
                  scope : this
                }
              }]
            });
            win.show();
            this.spot.show(win.id);
          },
          scope : this
        }, {
          xtype : 'spacer',
          width : 10
        }, {
          xtype : 'tbseparator'
        }, {
          xtype : 'spacer',
          width : 10
        }, {
          text : epca.L10n.titleOpen,
          iconCls : 'icon-open',
          handler : function() {
            var win = new epca.window.FormatForm({
              buttons : [{
                text : epca.L10n.titleOpen,
                listeners : {
                  click : function() {
                    if (Ext.isEmpty(win.getFormId())) {
                      epca.notify("Nevybrali ste formulár.", epca.L10n.messageError, "icon-error-epca");
                      //Ext.example.msg('Error', 'Nevybrali ste formulár');
                      return;
                    }
                    this.getTagListTreePanel().setIconClass("epca-loader");
                    epca.WsForm.getForm(win.getFormId(), win.getUnFormat(), this, this.loadForm);
                    win.close();
                    this.spot.hide();
                  },
                  scope : this
                }
              }, {
                text : epca.L10n.titleClose,
                listeners : {
                  click : function() {
                    win.close();
                    this.spot.hide();
                  },
                  scope : this
                }
              }]
            });
            win.show();
            this.spot.show(win.id);
          },
          scope : this
        }, {
          xtype : 'spacer',
          width : 10
        }, {
          xtype : 'tbseparator'
        }, {
          xtype : 'spacer',
          width : 10
        }, {
          text : epca.L10n.titleSave,
          iconCls : 'icon-save',
          handler : function() {
            var rootNode = (this.getFormTreePanel()).getRootNode();

            if (!this.openForm) {
              this.openForm = new epca.Form();
            }

            this.openForm.unFormat = this.unFormat;
            this.openForm.title = rootNode.text;
            this.openForm.targetDb = rootNode.attributes.formProperties.formDBTable;
            // 27.10.11 on;
            this.openForm.formTablesdCache = rootNode.attributes.formProperties.formTablesdCache;
            // 16.10.15 on;
            this.openForm.formDFST = rootNode.attributes.formProperties.formDFST;

            this.openForm.content = (this.getFormTreePanel()).getDesignedFormContent();

            if (this.openForm.formId) {
              epca.WsForm.updateForm(this.openForm);
            } else {
              epca.WsForm.addForm(this.openForm, this.formId);
            }
          },
          scope : this
        }, {
          xtype : 'spacer',
          width : 10
        }, {
          xtype : 'tbseparator'
        }, {
          xtype : 'spacer',
          width : 10
          //hidden: true     // 01.08.11 on; zatim neni potreba,
        }, {
          text : epca.L10n.titleSaveAs,
          //hidden: true,     // 01.08.11 on; zatim neni potreba, stejne by se muselo upravit
          iconCls : 'icon-save-new',
          handler : function() {
            var win = new epca.window.SaveAsForm({
              buttons : [{
                text : epca.L10n.titleSaveAs,
                listeners : {
                  click : function() {
                    var sTitle,
                        sId;

                    // 15.05.17 on; pridani id, predelane
                    sId = win.getFormId();
                    if (sId === "") {
                      epca.notify("Nezadali jste id formuláře.", epca.L10n.messageError, "icon-error-epca");
                      return;
                    }

                    sTitle = win.getFormTitle();
                    if (sTitle === "") {
                      sTitle = sId;
                    }

                    win.close();
                    this.spot.hide();

                    // 19.01.12 on; ulozi formular
                    var rootNode = (this.getFormTreePanel()).getRootNode();

                    this.openForm = new epca.Form({
                      unFormat : this.unFormat,
                      title : sTitle,
                      formId : sId,
                      targetDb : rootNode.attributes.formProperties.formDBTable,
                      formTablesdCache : rootNode.attributes.formProperties.formTablesdCache,
                      // 16.10.15 on;
                      formDFST : rootNode.attributes.formProperties.formDFST,

                      defaultValues : (this.openForm) ? this.openForm.defaultValues : undefined,
                      content : (this.getFormTreePanel()).getDesignedFormContent()
                    });

                    // 15.05.17 on; doplneno id
                    epca.WsForm.addForm(this.openForm, sId);
                  },
                  scope : this
                }
              }, {
                text : epca.L10n.titleClose,
                listeners : {
                  click : function() {
                    win.close();
                    this.spot.hide();
                  },
                  scope : this
                }
              }]
            });
            win.show();
            this.spot.show(win.id);
          },
          scope : this
        }, {
          xtype : 'spacer',
          //hidden: true,     // 01.08.11 on; zatim neni potreba,
          width : 10
        }, {
          xtype : 'tbseparator'
          //hidden: true     // 01.08.11 on; zatim neni potreba,
        }, {
          xtype : 'spacer',
          //hidden: true,     // 01.08.11 on; zatim neni potreba,
          width : 10
        },
        // 21.12.16 on; zmena id formulare zatim neni zapojena, protoze na serveru to neni doreseno:
        //              1. pri kontrole na existenci formulare se musi kontrolovat novy nazev, ne ten existujici
        //              2. pri zmene id nestaci zmenit nazev zaznamu v IctxUnTablesd, ale i "formid" v zaznamu
        //              3. po uspesne zmene id se musi smazat existujici zaznam (jinak jde o kopii)
        //              4. pak doresit tady v aplikaci otevreni noveho zaznamu
        /*{
         text: epca.L10n.titleChangeID,
         iconCls: 'icon-change',
         handler: function() {
         var win = new epca.window.SaveAsForm({
         csTitle: epca.L10n.titleChangeID,
         csFieldLabel: epca.L10n.formId,
         buttons: [{
         text: epca.L10n.titleChangeID,
         listeners: {
         click: function() {
         var sId = win.getFormTitle();
         if ((sId !== "")) {
         win.close();
         this.spot.hide();

         if (this.openForm) {
         epca.WsForm.changeidForm(this.openForm, this.openForm.unFormat, sId);
         //this.initializeNewForm();
         } else {
         epca.notify("Nemáte otvorený žiadny formulár.", epca.L10n.messageError, "icon-error-epca");
         //Ext.example.msg('Error', 'Nemáte otvorený žiadny formulár');
         }
         } else {
         epca.notify("Nezadal jste nové id formuláře.", epca.L10n.messageError, "icon-error-epca");
         }
         },
         scope: this
         }
         }, {
         text: epca.L10n.titleClose,
         listeners: {
         click: function() {
         win.close();
         this.spot.hide();
         },
         scope: this
         }
         }]
         });
         win.show();
         this.spot.show(win.id);
         },
         scope: this
         },
         {
         xtype: 'spacer',
         width: 10
         }, {
         xtype: 'tbseparator'
         }, {
         xtype: 'spacer',
         width: 10
         }, */
        {
          text : epca.L10n.titleDelete,
          iconCls : 'icon-delete',
          handler : function() {
            // 30.11.16 on; vymaz az po dotazu
            Ext.Msg.show({
              title : epca.L10n.designerReallyDeleteTit,
              msg : epca.L10n.designerReallyDelete,
              buttons : i3.ui.YesNoCancel,

              fn : function(pButtonId) {
                if (pButtonId !== 'yes') {
                  return;
                }

                if (this.openForm) {
                  epca.WsForm.deleteForm(this.openForm, this.openForm.unFormat);
                  this.initializeNewForm();
                } else {
                  epca.notify("Nemáte otvorený žiadny formulár.", epca.L10n.messageError, "icon-error-epca");
                  //Ext.example.msg('Error', 'Nemáte otvorený žiadny formulár');
                }
              },
              icon : Ext.MessageBox.QUESTION,
              scope : this
            });

          },
          scope : this
        }, {
          xtype : 'spacer',
          width : 10
        }, {
          xtype : 'tbseparator'
        }, {
          xtype : 'spacer',
          width : 10
        }, {
          text : epca.L10n.titleFormPreview,
          iconCls : 'icon-form',
          handler : function() {
            var win = new Ext.Window({
              width : 900,
              id : 'previewWindow',
              height : 400,
              title : epca.L10n.titleFormPreview,
              autoScroll : true,
              items : new epca.Form({
                content : (this.getFormTreePanel()).getDesignedFormContent()
              }).generate(),
              listeners : {
                close : function() {
                  win.destroy();
                  this.spot.hide();
                },
                scope : this
              },
              buttonAlign : 'center',
              buttons : [{
                text : epca.L10n.titleSavePredefinedValues,
                listeners : {
                  click : function() {
                    if (this.openForm) {
                      this.openForm.defaultValues = (win.get(0)).getMarc();
                    } else {
                      this.openForm = new epca.Form({
                        defaultValues : (win.get(0)).getMarc()
                      });
                    }
                    i3.alert('ok');
                  },
                  scope : this
                }
              }, {
                text : epca.L10n.titleClearPredefinedValues,
                listeners : {
                  click : function() {
                    if (this.openForm) {
                      this.openForm.defaultValues = {};
                    } else {
                      this.openForm = new epca.Form({
                        defaultValues : {}
                      });
                    }
                    i3.alert('cleared');
                  },
                  scope : this
                }
              }, {
                text : epca.L10n.titleFormPreviewClose,
                listeners : {
                  click : function() {
                    win.close();
                  }
                }
              }]
            });
            win.show();
            this.spot.show(win.id);

            // 09.12.11 on; defaultValues se v metode setMarc z nejakeho duvodu smazou, protoze je tam musim vratit zpet
            if (this.openForm && this.openForm.defaultValues) {
              // 27.11.19 on; prevod na format s prefixem "st", pokud jeste neni prevedeno
              epca.csAddStPrefixes(this.openForm.defaultValues);

              var otmp = epca.cloneObject(this.openForm.defaultValues);
              (win.get(0)).setMarc(this.openForm.defaultValues);

              this.openForm.defaultValues = null;
              this.openForm.defaultValues = otmp;
            }
          },
          scope : this
        }, {
          xtype : 'spacer',
          width : 10
        }, {
          xtype : 'tbfill'
        }, {
          text : epca.L10n.titleLogout,
          iconCls : 'icon-logout',
          handler : function() {
            i3.Login.mainAppFireEvent('app_logout');
          },
          scope : this
        },
        // 03.03.20 on; css
        {
          xtype : 'spacer',
          width : 10
        }, {
          hidden : true, // zobrazi se jenom pokud bude potreba  // 02.11.16 on;
          xtype : 'cs_combo_st',
          csStatTableN : 'EPCA_CSS_LIST',
          // 05.03.20 on; zruseno
          //csAutoSelectFirst : i3.isEmptyString(Ext.util.Cookies.get('i3styledesigner')) ? true : false,
          // 05.03.20 on; doplneno
          //value : Ext.util.Cookies.get('i3styledesigner') || '',
          value : Ext.util.Cookies.get('i3styledesigner') || epca.designer.c.sActualCssStyle,
          //tooltip : epca.Config.User.ShowURLBtnFnHint || '',
          forceSelection : true,
          width : 120,
          csHideQtip : true, // 21.01.16 on; skryje tooltip/qtip
          // 02.11.16 on; zobrazi combobox jenom pokud je to potreba
          csOnLoadCallBack : this.csOnCssListLoad,
          csOnLoadScope : this,
          listeners : {
            select : {
              fn : this.csSwitchCSS,
              scope : this
            }
          }
        }]
      }
    });

    epca.designer.DesignerPanel.superclass.constructor.call(this, config);
  },
  /**
   * Inicializacia noveho formulara
   * @param {Object} unFormat
   * @param {Object} title
   */
  initializeNewForm : function(unFormat, title, sId) {
    this.unFormat = unFormat || this.unFormat;
    title = title || epca.L10n.formNameNew;
    // 06.04.17 on; doplneno
    this.formId = sId;

    this.openForm = undefined;

    //clear previous filter
    var tagTreeList = this.getTagListTreePanel();
    (tagTreeList.topToolbar.getComponent('textBoxFind')).onTriggerClick();

    var tagNode = tagTreeList.getRootNode();
    tagNode.removeAll(true);
    tagTreeList.setIconClass("epca-loader");

    var formNode = (this.getFormTreePanel()).getRootNode();
    formNode.removeAll(true);
    formNode.setText(title);
    formNode.attributes.formProperties.formName = title;
    formNode.attributes.formProperties.formId = sId;
    formNode.attributes.formProperties.formDBTable = epca.UnFormat.getDBName(this.unFormat);
    formNode.attributes.formProperties.formTablesdCache = epca.Config.User.tablesdCache;
    formNode.attributes.formProperties.formDFST = '';

    // 19.07.11 on; nastavi spravny nazev DB

    this.getFormTreePanel().unFormat = this.unFormat;

    (this.getPropertyGridPanel()).updatePropertyGridPanel(formNode);

    // 23.01.20 on; zmena nazvu getTagListInt - sufix Int
    epca.WsTagMap.getTagListInt(this.unFormat, this, this.processTagList);
  },
  /**
   * Nacitanie zoznamu tagov do laveho stromu
   * @param {Object} tagList
   */
  processTagList : function(tagList) {
    var i;
    if (!tagList) {
      return;
    }

    var formTree = (this.getFormTreePanel()).getRootNode();
    var rootNode = (this.getTagListTreePanel()).getRootNode();

    for ( i = 0; i < tagList.length; i++) {
      // POZOR! nemenit na !==  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if (formTree.findChild('id', tagList[i].id, false) != undefined) {
        continue;
      }

      rootNode.appendChild(new Ext.tree.TreeNode({
        id : tagList[i].id,
        text : tagList[i].id + ': ' + tagList[i].title,
        formPartType : 'tag',

        // Default tag properties
        formProperties : {
          tag : tagList[i].id,
          tagLabel : tagList[i].title,
          tagLabelUser : '', // 25.10.11 on; uzivatelsky nazev tagu
          xtype : 'epca.marc_fieldset',
          disabled : false,
          hidden : false
        },

        allowDrop : true,
        iconCls : 'icon-book'
      }));
    }
    this.getTagListTreePanel().setIconClass("epca-list");
  },
  /**
   * Otvorenie formulara
   * @param {Object} form
   */
  loadForm : function(form) {
    var i,
        j,
        k,
        formTreeNode,
        formContent,
        tempTag,
        containerNode,
        tempContainer,
        tagNode,
        tempField;

    this.openForm = form;
    this.unFormat = form.unFormat;

    formTreeNode = this.getFormTreePanel().getRootNode();
    formTreeNode.removeAll(true);
    formTreeNode.attributes.formProperties = form.getProperties();
    // 21.02.23 on; jazykova mutace nazvu formulare
    formTreeNode.setText(form.title.ls());

    this.getFormTreePanel().unFormat = this.unFormat;

    formContent = form.getContent();

    for ( i = 0; i < formContent.length; i++) {
      // 06.08.15 on; rozbocka pro kontejner
      if (formContent[i].formProperties.csContainer) {
        tempContainer = formContent[i].formProperties;
        containerNode = new Ext.tree.TreeNode({
          //id : tempTag.tag,
          text : tempContainer.containerLabelUser || 'Kontejner',
          formPartType : 'container',
          formProperties : tempContainer,
          allowDrop : true,
          iconCls : 'icon-group'
        });

        // 11.07.19 on; nemusi mit zadne uzly
        if (formContent[i].items) {
          for ( k = 0; k < formContent[i].items.length; k++) {
            tempTag = formContent[i].items[k].formProperties;

            // kontejner vlozeny do kontejneru - predpokladam, ze muz obsahovat pouze subtagy (NE tagy)
            if (tempTag.csContainer) {
              tagNode = containerNode.appendChild(new Ext.tree.TreeNode({
                //id : tempTag.tag,
                text : tempTag.containerLabelUser || 'Kontejner',
                formPartType : 'container',
                formProperties : tempTag,
                allowDrop : true,
                iconCls : 'icon-group'
              }));

              // 28.01.22 on; podminka - pole v kontejneru bez podpoli
              if (formContent[i].items[k].items && formContent[i].items[k].items.length) {
                for ( j = 0; j < formContent[i].items[k].items.length; j++) {
                  tempField = formContent[i].items[k].items[j].formProperties;
                  tagNode.appendChild(new Ext.tree.TreeNode({
                    id : tempField.tag + tempField.field,
                    text : tempField.field + ': ' + (tempField.fieldLabel || tempField.title) + ' {' + tempField.tag + tempField.field + '}',
                    formPartType : 'field',
                    formProperties : tempField,
                    checked : formContent[i].items[k].items[j].checked,

                    allowDrag : true,
                    allowDrop : true,
                    leaf : true,
                    iconCls : 'icon-details'
                  }));
                }
              }
            } else
            // samostatne podpole v kontejneru
            if (!i3.isEmptyString(tempTag.field)) {
              containerNode.appendChild(new Ext.tree.TreeNode({
                id : tempTag.tag + tempTag.field,
                text : tempTag.field + ': ' + (tempTag.fieldLabel || tempTag.title) + ' {' + tempTag.tag + tempTag.field + '}',
                formPartType : 'field',
                formProperties : tempTag,
                checked : formContent[i].items[k].checked,
                allowDrag : true,
                allowDrop : true,
                leaf : true,
                iconCls : 'icon-details'
              }));
            } else {
              tagNode = containerNode.appendChild(new Ext.tree.TreeNode({
                id : tempTag.tag,
                text : tempTag.tag + ': ' + tempTag.tagLabel,
                formPartType : 'tag',
                formProperties : tempTag,
                allowDrop : true,
                iconCls : 'icon-book'
              }));

              // 28.01.22 on; podminka - pole v kontejneru bez podpoli
              if (formContent[i].items[k].items && formContent[i].items[k].items.length) {
                for ( j = 0; j < formContent[i].items[k].items.length; j++) {
                  tempField = formContent[i].items[k].items[j].formProperties;
                  tagNode.appendChild(new Ext.tree.TreeNode({
                    id : tempField.tag + tempField.field,
                    text : tempField.field + ': ' + (tempField.fieldLabel || tempField.title),
                    formPartType : 'field',
                    formProperties : tempField,
                    checked : formContent[i].items[k].items[j].checked,

                    allowDrag : true,
                    allowDrop : true,
                    leaf : true,
                    iconCls : 'icon-details'
                  }));
                }
              }
            }
          }
        }
        formTreeNode.appendChild(containerNode);
      } else {
        tempTag = formContent[i].formProperties;
        tagNode = new Ext.tree.TreeNode({
          id : tempTag.tag,
          text : tempTag.tag + ': ' + tempTag.tagLabel,
          formPartType : 'tag',
          formProperties : tempTag,

          allowDrop : true,
          iconCls : 'icon-book'
        });

        // 11.07.19 on; nemusi mit zadne uzly
        if (formContent[i].items) {
          for ( j = 0; j < formContent[i].items.length; j++) {
            tempField = formContent[i].items[j].formProperties;
            tagNode.appendChild(new Ext.tree.TreeNode({
              id : tempField.tag + tempField.field,
              text : tempField.field + ': ' + (tempField.fieldLabel || tempField.title),
              formPartType : 'field',
              formProperties : tempField,
              checked : formContent[i].items[j].checked,

              allowDrag : true,
              allowDrop : true,
              leaf : true,
              iconCls : 'icon-details'
            }));
          }
        }
        formTreeNode.appendChild(tagNode);
      }
    }

    (this.getPropertyGridPanel()).updatePropertyGridPanel(formTreeNode);

    var tagListRootNode = this.getTagListTreePanel().getRootNode();
    tagListRootNode.removeAll(true);

    // 23.01.20 on; zmena nazvu - sufix Int
    epca.WsTagMap.getTagListInt(this.unFormat, this, this.processTagList);
  },
  /**
   * Lazy inicializacia zoznamu tagov
   */
  getTagListTreePanel : function() {

    if (!Ext.isDefined(this.tagListTreePanel)) {
      this.tagListTreePanel = new Ext.tree.TreePanel({
        id : "tagListTreePanel",
        iconCls : 'epca-loader',
        //iconAlign: 'right',
        title : epca.L10n.designerTagList,
        region : 'north',
        split : true,
        height : 350,
        minSize : 200,
        autoScroll : true,
        enableDD : true,
        rootVisible : false,
        lines : false,
        singleExpand : true,
        useArrows : true,
        tbar : {
          xtype : 'toolbar',
          layout : 'fit',
          items : {
            xtype : 'trigger',
            id : 'textBoxFind',
            emptyText : epca.L10n.designerSearchTag,
            autoWidth : false,
            enableKeyEvents : true,
            triggerClass : 'x-form-clear-trigger',
            onTriggerClick : function() {
              this.setValue('');
              this.filter.clear();
            },
            listeners : {
              keyup : {
                buffer : 150,
                fn : function(field, e) {
                  if (Ext.EventObject.ESC === e.getKey()) {
                    field.onTriggerClick();
                  } else {
                    var re = new RegExp('.*' + field.getRawValue() + '.*', 'i');
                    field.filter.filter(re, 'text');
                  }
                }
              }
            }
          }
        },
        root : {
          nodeType : 'async',
          text : 'Tagy',
          draggable : false
        },
        listeners : {
          nodedragover : function(dragOverEvent) {
            if (dragOverEvent.point === 'append') {
              return false;
            }

            // Z praveho stromu do laveho mozeme vratit iba tagy
            if (dragOverEvent.dropNode.attributes.formPartType === 'tag') {
              return true;
            }

            return false;
          },
          beforeinsert : function(tree, parent, node, refNode) {
            // remove all fields from tag, ina noda by sa nemala dat vobec dropnut.
            node.removeAll(true);
          },
          beforeappend : function(tree, parent, node) {
            // append dovoleny len tagu do priestoru panela
            node.removeAll(true);
          },
          click : function(node) {
            epca.WsTagMap.getTagHelp(this.unFormat, node.id, this, this.processTagHelp);
          },
          scope : this
        },
        dropConfig : {
          allowContainerDrop : true,
          onContainerDrop : function(source, e, data) {
            if (data.node.attributes.formPartType === 'field') {
              return false;
            }

            (this.tree.getRootNode()).appendChild(data.node);
            return true;
          },
          onContainerOver : function(source, e, data) {
            return this.dropAllowed;
          }
        }
      });

      var searchField = this.tagListTreePanel.topToolbar.getComponent('textBoxFind');
      searchField['filter'] = new Ext.tree.TreeFilter(this.tagListTreePanel, {
        clearBlank : true,
        autoClear : true
      });
    }
    return this.tagListTreePanel;
  },
  /**
   * Nacitanie opisu tagu
   * @param {Object} tagHelp
   */
  processTagHelp : function(tagHelp) {
    var tagDetail;
    if (!Ext.isDefined(this.tagDetail)) {
      var body = Ext.getCmp('details-panel').body;
      body.update('').setStyle('background', '#fff');
      tagDetail = body.createChild();
    }

    var helpHTML = Ext.isDefined(tagHelp) ? '<h2>Tag ' + tagHelp.tag + '</h2>' + '<p>' + tagHelp.help + '</p>' : '';
    helpHTML = helpHTML.replace(/\\n/g, '<br />');

    tagDetail.hide().update(helpHTML).slideIn('l', {
      stopFx : true,
      duration : 0.2
    });
  },
  /**
   * Lazy inicializacia stromu formulara
   */
  getFormTreePanel : function() {
    if (!Ext.isDefined(this.formTreePanel)) {
      this.formTreePanel = new epca.designer.TagTreePanel({
        id : 'formTreePanel',
        title : epca.L10n.designerDesignedForm,
        region : 'center',
        autoScroll : true,
        enableDD : true,
        // tree-specific configs:
        rootVisible : true,
        lines : false,
        singleExpand : false,
        useArrows : true,
        // 29.03.16 on; povinna pole nepotrebuju, stejne to nefunguje
        //dataUrl : 'MandatoryTags.json',
        dataUrl : ' ',

        root : {
          nodeType : 'async',
          text : epca.L10n.formName,
          draggable : false,
          expanded : true,
          iconCls : 'icon-form',
          formPartType : 'form',

          formProperties : {
            formName : epca.L10n.formName,
            formDate : (new Date()).format("d.m.Y"),
            formAuthor : i3.Login.ctx.userName,
            // 19.07.11 on; zmeneny default
            //formDBTable: epca.Config.dbAuth
            formDBTable : epca.Config.User.dbCat,
            formTablesdCache : epca.Config.User.tablesdCache,
            formDFST : ''
          }
        },
        listeners : {
          click : {
            fn : function(node, eventObject) {
              (this.getPropertyGridPanel()).updatePropertyGridPanel(node);
              this.selectedNode = node;
              if (node.attributes.formProperties['customCode'] !== undefined) {
                (this.getSourceCodeTextArea()).setValue(node.attributes.formProperties['customCode']);
              } else {
                (this.getSourceCodeTextArea()).setValue('isValid = true;');
              }
            },
            scope : this
          }
        }
      });
    }
    return this.formTreePanel;
  },
  getSourceCodeTextArea : function() {
    if (!Ext.isDefined(this.sourceCodeTextArea)) {
      this.sourceCodeTextArea = new Ext.form.TextArea({
        id : 'sourceCodeTextArea',
        html : '',
        anchor : '100%',
        allowBlank : true,
        grow : false,
        height : 250,
        width : 300
      });
    }
    return this.sourceCodeTextArea;
  },
  /**
   * Lazy inicializacia tabulky nastaveni
   */
  getPropertyGridPanel : function() {
    if (!Ext.isDefined(this.propertyGridPanel)) {

      this.propertyGridPanel = new epca.designer.FormPropertyGrid({
        id : 'propertyGridPanel'
      });
    }
    return this.propertyGridPanel;
  },
  /**
   * CSS
   *
   * 03.03.20 on;
   */
  csOnCssListLoad : function(a, pStore, pCombo) {
    if (pStore && pStore.data) {
      pCombo.setVisible(pStore.data.length > 1);
    }
  },
  /**
   * 03.03.20 on; prepne styl
   */
  csSwitchCSS : function(cmp, a, b, psSkin) {
    var sValue;
    // novy styl
    if (!i3.isEmptyString(psSkin)) {
      sValue = psSkin;
    } else {
      sValue = cmp.getValue();
    }

    // pouze pokud se lisi od aktualniho
    if (epca.designer.c.sActualCssStyle !== sValue) {
      //Replace all occurences "oldstyle.css" with "newstyle.css"
      replacejscssfile(epca.designer.c.sActualCssStyle, sValue);
      epca.designer.c.sActualCssStyle = sValue;

      var d = new Date();
      d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
      // platnost rok
      Ext.util.Cookies.set('i3styledesigner', sValue, d);
    }
  },
  // 04.03.20 on; vrati skin
  csGetSkinFromUrl : function() {
    var sSkin = this.getURLParam('skin');
    if (!sSkin) {
      sSkin = '';
    }
    // 29.05.19 on; pripadna kotva
    sSkin = sSkin.piece('#', 1);
    return sSkin;
  },
  /*
   * Vrati hodnotu predaneho parametru v URL.
   *
   */
  getURLParam : function(param) {
    // separating the GET parameters from the current URL
    var getParams = document.URL.split("?");
    // transforming the GET parameters into a dictionnary
    var urlParams = {};
    if (getParams.length > 1) {
      urlParams = Ext.urlDecode(getParams[1]);
    }
    return urlParams[param];
  }
});
