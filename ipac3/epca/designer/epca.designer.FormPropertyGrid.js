/**
 * Tabulka nastaveni
 * Editovatelne polia su konfigurovane suborom properties.json5
 *
 * Po kliknuti na uzol sa naplnia podla typu jeho prislusne atributy
 * Po zmene sa tieto nastavenia aplikuju naspat do zvoleneho uzla
 * @param {Object} config
 *
 * 07.06.23 on; json5
 * 21.02.23 on; jazykova mutace nazvu formulare
 * 28.02.28 on; updatePropertyGridPanel - opraveno prepisovani parametru se stejnym nazvem
 * 14.07.16 on; upraveno zobrazeni vlastnosti prvku
 * 04.03.14 on; uprava createComboBox
 * 19.09.13 on; predelane
 * 23.05.12 on; oprava chyby
 */
/*global epca, Ext, i3*/

Ext.ns('epca.designer');

epca.designer.FormPropertyGrid = Ext.extend(Ext.grid.PropertyGrid, {

  propertyJsonStore: undefined,

  constructor: function(config) {

    config = config || {};
    config.listeners = config.listeners || {};

    var i, property, values, combo, editableProperties = [];
    var customComboBoxEditors = {};

    var store = new Ext.data.JsonStore({
      autoDestroy: true,
      autoLoad: true,
      // 07.06.23 on; json5
      //url: 'properties.json',
      url: 'properties.json5',
      fields: ['id', 'text', 'editable', 'values'],
      listeners: {
        load: function(store, records, options) {
          // vyber vlastnosti, ktore su editovatelne
          store.filter('editable', 'true', true, true);
          for ( i = 0; i < store.data.items.length; i++) {

            editableProperties.push(store.data.items[i].data.text);

            property = store.data.items[i].data.id;
            values = store.data.items[i].data.values;

            // vlastnosti s vyberom hodnot (comboBox)
            if (Ext.isDefined(values) && Ext.isArray(values)) {
              combo = this.createComboBox(property, values);
              if (combo !== null) {
                customComboBoxEditors[store.data.items[i].data.text] = new Ext.grid.GridEditor(combo);
              }
            }
          }
        },
        scope: this
      }
    });

    Ext.applyIf(config.listeners, {
      afteredit: function(grid) {
        var o, j, nWidth, propertyName, selectedTreeNode = this.selectedTreeNode;

        store = new Ext.data.JsonStore({
          autoDestroy: true,
          autoLoad: true,
          // 07.06.23 on; json5
          //url: 'properties.json',
          url: 'properties.json5',
          fields: ['id', 'variable', 'text', 'editable', 'values'],
          listeners: {
            load: function(store, records, options) {
              store.filter('text', grid.record.id, true, true);
              propertyName = store.getAt(0).data.variable;

              // nastavenie hodnoty pre vlastnot
              if (this.editingNodeId === this.selectedTreeNode.id) {

                if (propertyName === 'convertMap') {
                  selectedTreeNode.attributes.formProperties[propertyName] = Ext.decode(grid.record.data.value);
                } else {
                  selectedTreeNode.attributes.formProperties[propertyName] = grid.record.data.value;
                }

                // hack pre searchComboBox ;)
                //if (selectedTreeNode.attributes.formProperties.xtype == "epca.marc_search_combobox") {
                //  this.updatePropertyGridPanel(selectedTreeNode);
                //}
                //musi se volat pri kazde zmene typu komponenty
                if (propertyName === 'xtype') {
                  this.updatePropertyGridPanel(selectedTreeNode);
                }

                // 19.09.13 on; zmenene
                //if (grid.record.id == "názov formulára") {
                if (propertyName === 'formName') {
                  // 21.02.23 on; jazykova mutace nazvu formulare
                  selectedTreeNode.setText(grid.record.data.value.ls());
                }

                // 14.10.15 on; zmena velikosti pole - pokud jde o kodovane pole, musim to nastavit u vsech potomku
                if (propertyName === 'width') {
                  // 05.02.16 on; pokud neni nastavena velikost, nastavi anchor na -5 - zmena neni hned videt v gridu, ale neumim to nastavit :(
                  nWidth = parseInt(selectedTreeNode.attributes.formProperties.width, 10);
                  if (isNaN(nWidth)) {
                    selectedTreeNode.attributes.formProperties.anchor = epca.c.nAnchor;
                  } else {
                    selectedTreeNode.attributes.formProperties.anchor = undefined;
                  }

                  if (selectedTreeNode.attributes.formProperties.codedItems) {
                    nWidth = parseInt(selectedTreeNode.attributes.formProperties.width, 10);
                    //  08.02.16 on; vyjimka pro kodovane udaje, vnitrni fieldset zaporovnam k vnejsimu
                    /*if (isNaN(nWidth)) {
                     //nWidth = 400;
                     selectedTreeNode.attributes.formProperties.anchor = epca.c.nAnchor;
                     } else {
                     selectedTreeNode.attributes.formProperties.anchor = '';
                     selectedTreeNode.attributes.formProperties.width = nWidth;
                     }*/
                    selectedTreeNode.attributes.formProperties.anchor = epca.c.nAnchor;

                    // nastavi stejnou velikost u vsech
                    for ( j = 0; j < selectedTreeNode.attributes.formProperties.codedItems.length; j++) {
                      o = selectedTreeNode.attributes.formProperties.codedItems[j];
                      //o.width = nWidth;
                      if (isNaN(nWidth)) {
                        o.anchor = epca.c.nAnchor;
                        o.width = undefined;
                      } else {
                        o.anchor = '';
                        o.width = nWidth;
                      }
                    }
                  }
                }
              }
            },
            scope: this
          }
        });
      },

      beforeedit: function(grid) {
        // povolit editovanie stlpcov (okrem prveho - nazov vlastnosti)
        if (grid.column !== 1) {
          return true;
        }
        // povolit editovat iba definovane vlastnosti
        if ((editableProperties.indexOf(grid.record.id)) > -1) {
          this['editingNodeId'] = this.selectedTreeNode.id;
          return true;
        }
        return false;
      },

      scope: this
    });

    Ext.apply(config, {
      customEditors: customComboBoxEditors,
      title: epca.L10n.titleProperties,
      closable: false,
      hideHeaders: false,
      source: {},
      colModel: {
        config: [{
          sortable: false,
          header: 'Názov vlastnosti'
        }, {
          sortable: false,
          header: 'Hodnota'
        }],
        nameText: "Názov vlastnosti",
        valueText: "Hodnota",
        dateFormat: "d.m.Y"
      }
    });

    epca.designer.FormPropertyGrid.superclass.constructor.call(this, config);
  },

  createComboBox: function(property, values) {

    var comboBox = new Ext.form.ComboBox({
      name: property + '_comboBox',
      triggerAction: 'all',
      mode: 'local',
      typeAhead: false,
      allowBlank: false,
      editable: true, // 04.03.14 on; nekdy je potreba zapsat svuj text (false -> true)
      autoSelect: true,
      store: new Ext.data.JsonStore({
        autoDestroy: true,
        autoLoad: true,
        fields: ['id', 'text'],
        data: values
      }),
      valueField: 'id',
      displayField: 'text'
    });

    return comboBox;
  },

  getPropertyJsonStore: function() {
    if (!Ext.isDefined(this.propertyJsonStore)) {

      this.propertyJsonStore = new Ext.data.JsonStore({
        autoDestroy: true,
        autoLoad: true,
        // 07.06.23 on; json5
        //url: 'properties.json',
        url: 'properties.json5',
        // 21.08.15 on; defaultni hodnota
        // 19.09.13 on; 'bind' - vazba na na kontretni typ komponenty
        fields: ['id', 'variable', 'text', 'editable', 'values', 'bindedXtype', 'defaultValue']

      });
    }
    return this.propertyJsonStore;
  },

  // 28.02.17 on; opraveno prepisovani parametru se stejnym nazvem
  // update property panelu pre vybrany uzol v strome (form/tag/field)
  updatePropertyGridPanel: function(selectedNode) {
    // 19.09.13 on; predelane
    /*var store;
     this['selectedTreeNode'] = selectedNode;

     store = this.getPropertyJsonStore();
     if (Ext.isDefined(store)) {

     store.filter('id', selectedNode.attributes.formPartType, true, true);

     propertiesJSON = {};

     for (var i = 0; i < store.data.items.length; i++) {
     propertyValue = selectedNode.attributes.formProperties[store.data.items[i].data.variable];
     if (Ext.isDefined(propertyValue)) {
     propertiesJSON[store.data.items[i].data.text] = propertyValue;
     }
     // hack pre searchComboBox ;)
     else if ((selectedNode.attributes.formProperties.xtype === "epca.marc_search_combobox") || (selectedNode.attributes.formProperties.xtype === "epca.link_entry")) {
     if (Ext.isDefined(store.data.items[i].data.values) && store.data.items[i].data.values[0]) {
     propertiesJSON[store.data.items[i].data.text] = store.data.items[i].data.values[0].text;
     selectedNode.attributes.formProperties[store.data.items[i].data.variable] = store.data.items[i].data.values[0].id;
     } else
     propertiesJSON[store.data.items[i].data.text] = '';
     }
     }

     this.setSource(propertiesJSON);
     }*/
    var i, store, propertiesJSON, propertyValue, bDefValue;
    this['selectedTreeNode'] = selectedNode;

    store = this.getPropertyJsonStore();
    if (Ext.isDefined(store)) {
      // 14.07.16 on; budu brat jenom polozky zacinajici na dany retezec (form/tag/field/container)
      //store.filter('id', selectedNode.attributes.formPartType, true, true);
      store.filter('id', selectedNode.attributes.formPartType, false, true);
      propertiesJSON = {};

      // 28.02.17 on; smazu vsechny parametry, ktere maji bindedXtype a jsou jineho typu - puvodne se delalo niz, ale nefungovalo to spravne
      //              pro stejne parametry "text" nebo "variable" ruznych typu
      for ( i = 0; i < store.data.items.length; i++) {
        if (store.data.items[i].data.bindedXtype) {
          if (store.data.items[i].data.bindedXtype.indexOf(selectedNode.attributes.formProperties.xtype) === -1) {
            // toto neni treba
            //propertiesJSON[store.data.items[i].data.text] = undefined;
            selectedNode.attributes.formProperties[store.data.items[i].data.variable] = undefined;
          }
        }
      }

      for ( i = 0; i < store.data.items.length; i++) {
        bDefValue = false;
        propertyValue = selectedNode.attributes.formProperties[store.data.items[i].data.variable];
        if (!Ext.isDefined(propertyValue)) {
          if (Ext.isDefined(store.data.items[i].data.defaultValue)) {
            propertyValue = store.data.items[i].data.defaultValue;
            if (store.data.items[i].data.defaultValue !== '') {
              // nejde o prazdny retezec, v konfigu je neco nastaveno, zapamatuju si
              bDefValue = true;
            }

          } else {
            propertyValue = '';
          }
        }
        // pokud pole nema vazbu na konkretni typ prvku, tak ho zobrazi vzdy, pokud vazbu ma, tak zkontroluje, jestli jde o pozadovany typ
        if (store.data.items[i].data.bindedXtype) {
          if (store.data.items[i].data.bindedXtype.indexOf(selectedNode.attributes.formProperties.xtype) >= 0) {
            propertiesJSON[store.data.items[i].data.text] = propertyValue;
            if (bDefValue) {
              // zaktualizuje uzel tree panelu
              selectedNode.attributes.formProperties[store.data.items[i].data.variable] = propertyValue;
            }
          }
          // 28.02.17 on; presunuto do cyklu vys
          /*else {
           // smazu to
           propertiesJSON[store.data.items[i].data.text] = undefined;
           // 05.02.16 on; pridano
           selectedNode.attributes.formProperties[store.data.items[i].data.variable] = undefined;
           }*/
        } else {
          // vyjimka pro convertMap
          if (store.data.items[i].data.variable === 'convertMap') {
            if (!i3.isEmptyString(propertyValue)) {
              propertiesJSON[store.data.items[i].data.text] = Ext.encode(propertyValue);
            } else {
              propertiesJSON[store.data.items[i].data.text] = propertyValue;
            }
          } else {
            propertiesJSON[store.data.items[i].data.text] = propertyValue;
          }
          if (bDefValue) {
            // zaktualizuje uzel tree panelu
            selectedNode.attributes.formProperties[store.data.items[i].data.variable] = propertyValue;
          }
        }
      }

      this.setSource(propertiesJSON);
    }
  }
});

Ext.reg('epca.form_property_grid', epca.designer.FormPropertyGrid);

