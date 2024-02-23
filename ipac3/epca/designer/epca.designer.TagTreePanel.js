/**
 *
 * 19.09.17 on; doplneno kvparams
 * 28.04.17 on; rozsirena funkce pro aktualizaci tagu
 *
 */

/*global i3,Ext,epca */

Ext.ns('epca.designer');

/**
 * Strom (stredny) - navrhnuty formular
 */
epca.designer.TagTreePanel = Ext.extend(Ext.tree.TreePanel, {

  unFormat : epca.UnFormat.B,

  constructor : function(config) {
    config = config || {};
    config.listeners = config.listeners || {};

    // pridani tagu
    var csInsertNodeHandler = function(menuItem) {
      var node;
      //var selectedNode = myTree.selModel.selNode;
      node = menuItem.csContextNode;
      if (!node) {
        node = menuItem.parentMenu.csContextNode;
      }
      if (node) {
        var newNode = new Ext.tree.TreeNode({
          //id : tempTag.tag,
          text : 'Kontejner',
          formPartType : 'container',
          formProperties : {
            csContainer : true, // poznaci si, ze jde o kontejner
            containerLabelUser : '',
            xtype : 'epca.marc_fieldset',
            disabled : false,
            hidden : false
          },
          //csTag : pLinRec.t100a,
          //csValue : pLinRec.t100a, // pamatuju si cely tag
          allowDrop : true,
          iconCls : 'icon-group',
          leaf : false
        });
        if (node.parentNode) {
          node.parentNode.insertBefore(newNode, node);
        } else {
          node.appendChild(newNode);
        }
        newNode.select();
      }
    };

    // 23.09.16 on; zatim zrusene
    // pridani vazboveho pole
    /*var csInsertBindNodeHandler = function(menuItem) {
    var node;
    //var selectedNode = myTree.selModel.selNode;
    node = menuItem.csContextNode;
    if (!node) {
    node = menuItem.parentMenu.csContextNode;
    }
    if (node) {
    var newNode = new Ext.tree.TreeNode({
    //id : tempTag.tag,
    text: 'Kontejner vazbových polí',
    formPartType: 'container',
    formProperties: {
    csContainer: true, // poznaci si, ze jde o kontejner
    containerLabelUser: '',
    xtype: 'epca.marc_fieldset',
    disabled: false,
    hidden: false
    },
    //csTag : pLinRec.t100a,
    //csValue : pLinRec.t100a, // pamatuju si cely tag
    allowDrop: true,
    iconCls: 'icon-group',
    leaf: false
    });
    if (node.parentNode) {
    node.parentNode.insertBefore(newNode, node);
    } else {
    node.appendChild(newNode);
    }
    newNode.select();
    }
    };*/

    // duplikovani subtagu
    var csDuplicateNodeHandler = function(menuItem) {
      var node;
      //var selectedNode = myTree.selModel.selNode;
      node = menuItem.csContextNode;
      if (!node) {
        node = menuItem.parentMenu.csContextNode;
      }
      if (node) {
        var newNode = new Ext.tree.TreeNode({
          id : node.attributes.id,
          text : node.attributes.text,
          formPartType : node.attributes.formPartType,
          formProperties : node.attributes.formProperties,
          checked : node.attributes.checked,

          allowDrag : node.attributes.allowDrag,
          allowDrop : node.attributes.allowDrop,
          leaf : node.attributes.leaf,
          iconCls : node.attributes.iconCls
        });

        if (node.parentNode) {
          node.parentNode.insertBefore(newNode, node);
        } else {
          node.appendChild(newNode);
        }
        newNode.select();
      }
    };

    // vymaz tagu/subtagu
    var csDeleteNodeHandler = function(menuItem) {
      var node;

      //var selectedNode = myTree.selModel.selNode;

      node = menuItem.csContextNode;
      if (!node) {
        node = menuItem.parentMenu.csContextNode;
      }
      if (node) {
        node.parentNode.removeChild(node);
      }
    };

    var csUpdateTagCallback = function(poTag, pbAll) {
      var i,
          j,
          fieldNode,
          bFound,
          nodeold,
          nodenew,
          c;

      // 27.04.17 on;
      var updateProperties = function(o, p) {
        var prop;

        // 19.09.17 on; doplneno kvparams
        // seznam parametru, ktere se maji aktualizovat z mapy poli
        var sList = 'field#tag#fieldLabel#convertMap#convertGroup#repeatable#xtype#csStatTableN#csCBParams#title#kvparams';

        for (prop in p) {
          if (p.hasOwnProperty(prop)) {
            // prepise pouze ty, ktere jsou v seznamu
            if (sList.fieldLocate('#', prop) > 0) {
              o.attributes.formProperties[prop] = p[prop];
            }
          }
        }
        // aktualizuje popis prvku v treepanelu
        o.setText(p.field + ': ' + (p.fieldLabel || p.title));
      };

      for ( i = 0; i < poTag.fields.length; i++) {
        bFound = false;
        nodeold = undefined;
        nodenew = undefined;
        // zkusi najit subtag mezi poduzly
        for ( j = 0; j < this.parentMenu.csContextNode.childNodes.length; j++) {
          if (poTag.fields[i].field === this.parentMenu.csContextNode.childNodes[j].attributes.formProperties.field) {
            bFound = true;
            nodeold = this.parentMenu.csContextNode.childNodes[j];
            nodenew = poTag.fields[i];
            break;
          }
        }

        // subtag nebyl nalezen, prida ho
        if (!bFound) {
          fieldNode = new Ext.tree.TreeNode({
            id : poTag.tagId + poTag.fields[i].field,
            text : poTag.fields[i].field + ': ' + (poTag.fields[i].fieldLabel || poTag.fields[i].title),
            formPartType : 'field',

            checked : false, // nebudu je oznacovat
            allowDrag : true,
            allowDrop : true,
            leaf : true,
            iconCls : 'icon-details',

            formProperties : poTag.fields[i]
          });

          this.parentMenu.csContextNode.appendChild(fieldNode);
        } else {
          // 28.04.17 on; aktualizovat existujici subtagy bude jen pokud si to uzivatel preje
          // 27.04.17 on; pokud byl nalezen, zaktualizuje ho
          //              nesmi prepsat uplne vsechny atributy
          if (pbAll) {
            //Ext.apply(nodeold.attributes.formProperties, nodenew);
            updateProperties(nodeold, nodenew);
          }
        }
      }

      // aktualizace popisu tagu - pouze pokud si to uzivatel preje
      if (pbAll) {
        this.parentMenu.csContextNode.setText(poTag.tagId + ': ' + poTag.title);
        this.parentMenu.csContextNode.attributes.formProperties.tagLabel = poTag.title;
        this.parentMenu.csContextNode.attributes.formProperties.repeatable = poTag.repeatable;
        // zobrazi zmeny v gridpanelu (vpravo)
        c = Ext.getCmp('propertyGridPanel');
        if (c) {
          c.updatePropertyGridPanel(this.parentMenu.csContextNode);
        }
      }

      i3.msg('Hotovo!');
    };

    // aktualizuje seznam subtagu v tagu - pouze prida nove
    var csUpdateTagHandler = function(menuItem, pbAll) {
      var node;

      //var selectedNode = myTree.selModel.selNode;

      node = menuItem.csContextNode;
      if (!node) {
        node = menuItem.parentMenu.csContextNode;
      }

      // jenom pro tag
      if (node && (node.attributes.formPartType === 'tag')) {
        var c = Ext.getCmp('formTreePanel');
        // skor call procesFunction with undefined
        epca.WsTagMap.getValue(epca.WsTagMap.getTagId(c.unFormat, node.attributes.formProperties.tag), epca.WsTagMap.processTag.createDelegate(epca.WsTagMap), menuItem, csUpdateTagCallback.createDelegate(menuItem, [pbAll], 1), epca.WsTagMap.getTagIdAll(node.attributes.formProperties.tag));
      } else {
        i3.alert('Funkci lze použít pouze nad tagem!');
      }
    };

    // aktualizuje seznam subtagu v tagu - vsechny polozky i tag
    var csUpdateTagHandlerAll = function(menuItem) {
      csUpdateTagHandler(menuItem, true);
    };

    // aktualizuje seznam subtagu v tagu - pouze prida nove
    var csUpdateTagHandlerNew = function(menuItem) {
      csUpdateTagHandler(menuItem, false);
    };

    //Creation of my contextmenu
    var contextMenu = new Ext.menu.Menu({
      items : [{
        text : 'Vložit uzel',
        iconCls : 'icon-insert',
        handler : csInsertNodeHandler
        //id : 'cxmenuInsert',
        //disabled : true
      },
      // 23.09.16 on; zatim zrusene
      /*
       {
       text: 'Vložit vazbová pole',
       iconCls: 'icon-insert',
       handler: csInsertBindNodeHandler
       //id : 'cxmenuInsert',
       //disabled : true
       },*/
      {
        text : 'Duplikovat uzel',
        iconCls : 'icon-copy',
        handler : csDuplicateNodeHandler
        //id : 'cxmenuInsert',
        //disabled : true
      }, {
        text : 'Smazat uzel',
        iconCls : 'icon-delete',
        handler : csDeleteNodeHandler
        //id : 'cxmenuDelete',
        //disabled : true
      }, '-', {
        text : 'Aktualizovat tag (všechny položky)',
        iconCls : 'icon-refresh',
        handler : csUpdateTagHandlerAll
      }, {
        text : 'Aktualizovat tag (pouze načíst nové subtagy)',
        iconCls : 'icon-refresh',
        handler : csUpdateTagHandlerNew
      }]
    });

    function treeContextHandler(node, e) {
      node.select();
      contextMenu.csContextNode = node;
      //contextMenu.show(node.ui.getAnchor());
      contextMenu.showAt(e.getXY());
    }

    // 21.09.16 on; kopiruje uzel
    /*var copyDropNode = function(node) {
     var newNode;
     newNode = new Ext.tree.TreeNode(Ext.apply({}, node.attributes));
     //for ( i = 0; i < node.childNodes.length; i++) {
     //  n = node.childNodes[i];
     //  if (n) {
     //    newNode.appendChild(copyDropNode(n));
     //  }
     //}

     return newNode;
     };*/

    Ext.applyIf(config.listeners, {
      nodedragover : function(dragOverEvent) {
        // 05.08.15 on; mimo kontejner
        if ((dragOverEvent.point === 'append') && (dragOverEvent.target.attributes.formPartType !== 'container')) {
          return false;
        }

        var retVal = true;

        switch (dragOverEvent.target.attributes.formPartType) {
        case 'form':
        case 'tag':
          if (dragOverEvent.dropNode.attributes.formPartType === 'field') {
            retVal = false;
          }
          break;
        case 'field':
          if ((dragOverEvent.dropNode.attributes.formPartType !== 'field') || (dragOverEvent.target.parentNode !== dragOverEvent.dropNode.parentNode)) {
            retVal = false;
          }
          break;
        }

        return retVal;
      },
      insert : function(tree, parent, node, refNode) {
        if ((node.attributes.formPartType === 'tag') && !(node.hasChildNodes())) {
          epca.WsTagMap.getTag(this.unFormat, node, tree.processTagFields, node.attributes.id);
        }
      },
      append : function(tree, parent, node, index) {
        if ((node.attributes.formPartType === 'tag') && !(node.hasChildNodes())) {
          epca.WsTagMap.getTag(this.unFormat, node, tree.processTagFields, node.attributes.id);
        }
      },
      contextMenu : {
        fn : treeContextHandler
      }
    });

    Ext.apply(config, {
      dropConfig : {
        allowContainerDrop : true,
        onContainerDrop : function(source, e, data) {
          // 21.09.16 on; tag v seznamu tagu zustane - jeste musim doresit, nechova se idealne pro stejna pole ve formulari
          this.tree.getRootNode().appendChild(data.node);
          // TODO
          //this.tree.getRootNode().appendChild(copyDropNode(data.node));
          return true;
        },
        onContainerOver : function(/*source, e, data*/) {
          return this.dropAllowed;
        }
      }
    });

    epca.designer.TagTreePanel.superclass.constructor.call(this, config);
  },
  /**
   * Po pretiahnuti tagu z ponuky sa dynamicky nacitaju obsahujuce podpolia a ich inicializacne hodnoty
   * @param {Object} tag
   */
  processTagFields : function(tag) {
    var i,
        fieldNode;
    if (!tag) {
      return;
    }
    //this = uzol tagu
    this.attributes.formProperties['repeatable'] = tag.repeatable;
    this.attributes.formProperties['type'] = tag.type;

    //var position = 0;

    for ( i = 0; i < tag.fields.length; i++) {

      fieldNode = new Ext.tree.TreeNode({
        id : tag.tagId + tag.fields[i].field,
        text : tag.fields[i].field + ': ' + (tag.fields[i].fieldLabel || tag.fields[i].title),
        formPartType : 'field',

        checked : true,
        allowDrag : true,
        allowDrop : true,
        leaf : true,
        iconCls : 'icon-details',

        formProperties : tag.fields[i]
      });

      this.appendChild(fieldNode);
    }
  },
  /**
   * Navrhnuty formular, nie formular samotny, treba ho z tejto definicie vygenerovat.
   * epca.Form.generate();
   */
  getDesignedFormContent : function() {
    var i,
        node = this.getRootNode();
    var items = [];

    for ( i = 0; i < node.childNodes.length; i++) {
      /// 06.08.15 on; kontejner
      if (node.childNodes[i].attributes.formPartType === 'container') {
        items.push(this.getDesignedFormContainerContent(node.childNodes[i]));
      } else {
        items.push(this.getDesignedFormTagContent(node.childNodes[i]));
      }
    }

    return items;
  },
  /// 06.08.15 on; kontejner
  getDesignedFormContainerContent : function(node) {
    var i;

    // osetri sirku - prazdny text dela problem
    this.csFixWrongValuesTag(node.attributes.formProperties);
    var designedTreeContainer = {
      formProperties : epca.cloneObject(node.attributes.formProperties),
      items : []
    };

    for ( i = 0; i < node.childNodes.length; i++) {
      // muze jit o podole v kontejneru
      if (node.childNodes[i].attributes.formPartType === 'field') {
        designedTreeContainer.items.push(this.getDesignedFormFieldContent(node.childNodes[i]));
      } else {
        designedTreeContainer.items.push(this.getDesignedFormTagContent(node.childNodes[i]));
      }
    }

    return designedTreeContainer;
  },
  getDesignedFormTagContent : function(node) {
    var i;
    // osetri sirku - prazdny text dela problem
    this.csFixWrongValuesTag(node.attributes.formProperties);

    var designedTreeTag = {
      formProperties : epca.cloneObject(node.attributes.formProperties),
      items : []
    };

    for ( i = 0; i < node.childNodes.length; i++) {
      designedTreeTag.items.push(this.getDesignedFormFieldContent(node.childNodes[i]));
    }

    return designedTreeTag;
  },
  getDesignedFormFieldContent : function(node) {
    this.csFixWrongValuesField(node.attributes.formProperties);
    return {
      formProperties : epca.cloneObject(node.attributes.formProperties),
      checked : node.attributes.checked
    };
  },
  // osetri sirku - prazdny text dela problem
  csFixWrongValuesTag : function(o) {
    if (o.width === '') {
      o.width = undefined;
    }
  },
  // osetri sirku - prazdny text dela problem
  csFixWrongValuesField : function(o) {
    // 05.02.16 on; nastavi radsi anchor na -5
    if (i3.isEmptyString(o.width) && i3.isEmptyString(o.anchor)) {
      //o.width = 400;
      o.anchor = epca.c.nAnchor;
    }
  }
});

Ext.reg('epca.designer_tagtreepanel', epca.designer.TagTreePanel);
