/**
 * 02.05.24 on; moznost skryt vybrane formaty db
 * 07.06.23 on; json5
 * 13.12.16 on; volani pres nase WS
 * 09.10.15 on; filtrovani nabidky db
 * 09.12.11 on; zrusene zobrazeni ID pro GetListForm
 *
 */
/*global Ext,i3,epca */

Ext.ns('epca.window');

/**
 * Okna na vyber unimarc formatu a Id existujuceho formulara
 * @param {Object} config
 *
 * 20.01.12 on; automaticky vyber formatu
 *
 */
epca.window.FormatForm = Ext.extend(Ext.Window, {
  constructor: function(config) {
    var oStore;

    config = config || {};

    config.listeners = config.listeners || {};

    Ext.applyIf(config.listeners, {
      close: function() {
        this.destroy();
      }
    });

    if (!i3.isEmptyString(epca.Config.User.webformURLrest) || !i3.isEmptyString(epca.Config.User.webformURL)) {
      oStore = new i3.SOAP.StoreST({
        //csDisplayID: 1,   // 09.12.11 on; zrusene zobrazeni ID
        baseParams: {
          method: 'GetListForm',
          ictx: epca.Config.User.ictx,
          url: epca.Config.User.webformURL,
          urlrest: epca.Config.User.webformURLrest
        }
      });
    } else {
      oStore = new epca.window.StoreProc({});
    }

    Ext.apply(config, {
      width: 600,
      height: 250,
      title: epca.L10n.titleOpen,
      autoScroll: true,
      closable: false,
      layout: 'form',
      padding: 10,
      items: [{
        xtype: 'combo',
        id: 'windowFormatFormComboBoxUnFormat',
        fieldLabel: epca.L10n.titleUnimarcFormat,
        triggerAction: 'all',
        mode: 'local',
        typeAhead: false,
        allowBlank: false,
        editable: false,
        autoSelect: true,
        forceSelection: true,
        store: new Ext.data.JsonStore({
          autoDestroy: true,
          autoLoad: true,
          triggerAction: 'all',
          lastQuery: '',
          // 07.06.23 on; json5
          // 31.08.15 on;
          //url : 'UnFormat.json',
          //url: 'UnFormat_' + i3.ictx.toLowerCase() + '.json',
          url: 'UnFormat_' + i3.ictx.toLowerCase() + '.json5',
          // 09.10.15 on; doplneno
          fields: ['id', 'text', 'formList', 'userGroupList', 'hidden'],
          listeners: {
            load: function(pStore) {
              var i, j, record, aGrpList, bFound, grp, recIx = -1;

              // 02.05.24 on; moznost skryt vybrane formaty db
              if (!epca.designer) {
                for ( i = pStore.data.items.length - 1; i >= 0; i--) {
                  record = pStore.data.items[i];

                  if (record.data.hidden) {
                    pStore.remove(record);
                  }
                }
              }
              
              // 09.10.15 on; filtrovani nabidky db pro CAV, pres filterby jaksi nefungovalo
              //              jen pro evidenci
              if ((i3.ictx.toLowerCase() === 'cav') && !epca.designer) {
                for ( i = pStore.data.items.length - 1; i >= 0; i--) {
                  record = pStore.data.items[i];

                  // db bez omezeni
                  if (!i3.isEmptyString(record.data.userGroupList)) {
                    // pokud uzivatel nema logincontext
                    if (!i3.Login.ctx.isUserLoginOptions) {
                      pStore.remove(record);
                    } else {
                      // pres vsechny skupiny, zkusi najit skupinu v loginkontextu (600i) uzivatele
                      aGrpList = record.data.userGroupList.split('#');
                      bFound = false;
                      for ( j = 0; j < aGrpList.length; j++) {
                        grp = aGrpList[j];
                        if (i3.Login.ctx.isUserLoginOptions.fieldLocate(',', grp) > 0) {
                          bFound = true;
                          break;
                        }
                      }
                      if (!bFound) {
                        pStore.remove(record);
                      }
                    }
                  }
                }
              }
              
              // 20.01.12 on; po nahrani automaticky vybere prvni polozku
              var thisCombo = Ext.getCmp('windowFormatFormComboBoxUnFormat');
              // 14.12.15 on; moznost nastavit jakoukoliv polozku
              if (this.csFormType) {
                recIx = pStore.findExact('id', this.csFormType.toUpperCase(), 0);
              }
              if (recIx >= 0) {
                record = pStore.getAt(recIx);
              } else {
                record = pStore.getAt(0);
              }

              if (!record) {
                return;
              }

              if ((!record) || (thisCombo.getValue() !== '')) {
                return;
              }

              var val = record.data[thisCombo.valueField || thisCombo.displayField];
              thisCombo.setValue(val);
            },
            scope: this
          }
        }),
        valueField: 'id',
        displayField: 'text',
        anchor: i3.c.anchorBase,
        listeners: {
          change: function(/*field, newValue, oldValue*/) {
            var comboBoxForm = this.findById('windowFormatFormComboBoxForm');
            comboBoxForm.clearValue();
          },
          scope: this
        }
      }, {
        xtype: 'combo',
        id: 'windowFormatFormComboBoxForm',
        fieldLabel: epca.L10n.formName,
        triggerAction: 'all',
        anchor: i3.c.anchorBase,
        typeAhead: true,
        allowBlank: false,
        editable: false,
        loadingText: epca.L10n.titleSearching,
        valueField: 'id',
        displayField: 'text',
        // 13.12.16 on; nacteni vysledku proc do store
        store: oStore,
        listeners: {
          beforequery: function(/*event*/) {
            // 08.12.16 on; moznost volani pres WS
            var record, unFormat = this.getUnFormat(), formList = '';

            if (!Ext.isDefined(unFormat) || Ext.isEmpty(unFormat)) {
              return false;
            }

            var cmpFormat = this.findById('windowFormatFormComboBoxUnFormat');
            // 08.09.15 on; predelane
            //var record = cmpFormat.store.getAt(0);
            var sValue = cmpFormat.getValue();
            var recIx = cmpFormat.store.findExact('id', sValue, 0);
            if (recIx >= 0) {
              record = cmpFormat.store.getAt(recIx);
              formList = record.data.formList;
            }

            var comboBoxForm = this.findById('windowFormatFormComboBoxForm');

            comboBoxForm.store.load({
              format: unFormat,
              formList: this.csEvidencePanel ? formList : ''
            });
            return false;

          },
          scope: this
        }
      }],
      buttonAlign: 'center',

      getUnFormat: function() {
        return (this.getComponent('windowFormatFormComboBoxUnFormat')).getValue();
      },
      getFormId: function() {
        return (this.getComponent('windowFormatFormComboBoxForm')).getValue();
      }
    });

    epca.window.FormatForm.superclass.constructor.call(this, config);
  }
});

epca.window.WSProcProxy = Ext.extend(Ext.data.DataProxy, {
  load: function(params, reader, callback, scope, arg) {
    var processRecFn = function(psList) {
      var i, arrayData = [], s, sA, sB, aFormList, fld, arr, aSortedArr = [];
      var aList = psList.split('|');
      for ( i = 0; i < aList.length; i++) {
        s = aList[i];
        // id
        sA = s.piece('#', 1);
        // nazev
        sB = s.piece('#', 2);

        // id (sA) nesmi byt prazdne
        if (!i3.isEmptyString(sA)) {
          arrayData.push([sA, sB]);
        }
      }

      // 21.12.16 on; moznost filtrovat a seradit podle predaneho seznamu
      if (!i3.isEmptyString(arg.formList)) {
        aFormList = arg.formList.split('#');

        for ( i = 0; i < aFormList.length; i++) {
          fld = aFormList[i];
          arr = arrayData.filter(function(o) {
            return o[0].toUpperCase() === fld.toUpperCase();
          });
          if (arr[0]) {
            aSortedArr.push(arr[0]);
          }
        }
        arrayData = aSortedArr;
      }

      // malo by to byt - odovzdame data dalej
      // a ArrayReader ich prekonvertuje do tvaru Ext.data.Record[]
      var result = reader.readRecords(arrayData);
      callback.call(scope, result, arg, true);
    };

    i3.WS.command({
      db: epca.Config.User.dbTab,
      command: 'webformsread',
      params: 'list|' + arg.format,
      success: function(o) {
        var oResult = '';
        if (o && (o.ret_code === '0')) {
          if (o.data && o.data[0]) {
            oResult = o.data[0];
          }
          processRecFn(oResult);
        }
      }
    });
  }
});

/**
 * store s vysledkem procesu
 */
epca.window.StoreProc = Ext.extend(Ext.data.Store, {
  constructor: function(config) {
    Ext.applyIf(config, {
      fields: ['id', 'text'],
      autoLoad: false
    });
    // napevno reader
    Ext.apply(config, {
      reader: new Ext.data.ArrayReader({
        id: config.id
      }, //
      // construktor zaznamov
      Ext.data.Record.create(config.fields)),
      proxy: new epca.window.WSProcProxy({})
    });

    epca.window.StoreProc.superclass.constructor.call(this, config);
  },
  Record: Ext.data.Record.create([{
    name: 'id',
    type: 'string'
  }, {
    name: 'text',
    type: 'string'
  }])
});

