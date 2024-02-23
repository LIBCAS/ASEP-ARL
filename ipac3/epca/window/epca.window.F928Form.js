/**
 * @file epca.window.F928Form
 * @desc <pre>
 * funkce na poli 928
 *
 * 14.02.20 on; zalozeno
 * </pre>
 */

// jslint params
/*global Ext,i3,alert,epca */

Ext.ns('epca.window.Fn928');

epca.window.Fn928.winid = 'fn928id';

epca.window.Fn928.tx = {
  // texty UI, ktore je treba prekladat
  txOK : 'OK#OK#OK###أوافق'.ls(),
  txCancel : 'Zrušiť#Zrušit#Cancel###حذف'.ls(),
  txVariantName : 'Variantný názov#Variantní název#Variant name'.ls(),
  txVariantNames : 'Variantné názvy#Variantní názvy#Variant names'.ls()
};

// panel
epca.window.Fn928.Panel = Ext.extend(Ext.grid.EditorGridPanel, {
  /**
   * Konstruktor
   * @param {Object} config
   */
  constructor : function(config) {
    config = config || {};
    var idpref = i3.getIdPrefFn(config.idpref);
    // idpref makra
    var oSelModel = new Ext.grid.CheckboxSelectionModel({
      singleSelect : true,
      // nechcu v hlavicce checkbox
      header : ''
    });

    Ext.applyIf(config, {
      store : new Ext.data.Store({}),
      sm : oSelModel,
      columns : [oSelModel, {
        id : idpref('title'),
        header : epca.window.Fn928.tx.txVariantName,
        width : 200,
        //sortable: false,
        dataIndex : 'title'
        //fixed: false,
        //resizable: true
      }, {
        id : idpref('value'),
        header : 'value',
        width : 200,
        //sortable: false,
        dataIndex : 'value',
        hidden : true
      }],
      stripeRows : true,
      autoExpandColumn : idpref('title'),
      //height : 340,
      //anchor : '-5',
      border : false,
      // zakaze menu v hlavicce sloupce
      enableHdMenu : false,
      csCallback : config.callback,
      csCallbackScope : config.callbackScope,
      buttons : [{
        text : epca.window.Fn928.tx.txOK,
        //iconCls: 'icon-ok',
        listeners : {
          click : {
            fn : function() {
              // zoznam vybranych zaznamov
              var pRecs = this.getSelectionModel().getSelections();
              if ((!pRecs) || (pRecs.length <= 0)) {
                // nic nebylo vybrano, zavru okno
                this.ownerCt.close();
                return;
              }
              this.csCallback.call(this.csCallbackScope, pRecs);
              this.ownerCt.close();
            },
            scope : this
          }
        }
      }, {
        text : epca.window.Fn928.tx.txCancel,
        //iconCls: 'icon-cross',
        listeners : {
          click : {
            fn : function() {
              // zavrit okno
              this.ownerCt.close();
            },
            scope : this
          }
        }
      }],
      csShowVariantNameList : function(params) {
        var i,
            oRec,
            aRecList = [],
            aItem;
        for ( i = 0; i < params.items.length; i++) {
          aItem = params.items[i];

          oRec = new this.VariantRecord({
            title : aItem[0],
            value : aItem[1]
          });
          aRecList.push(oRec);
        }
        // ak sa nieco naslo pridat do store
        if (aRecList.length > 0) {
          this.store.add(aRecList);
        }
      }
    });
    epca.window.Fn928.Panel.superclass.constructor.call(this, config);
  },
  // konstruktor pre manualne pridavane zaznamy
  VariantRecord : Ext.data.Record.create([{
    name : 'title',
    type : 'string'
  }, {
    name : 'value',
    type : 'string'
  }])
});
// window wrapping
//
// config options:
//  idpref: id prefix of the window
//
epca.window.Fn928.Win = Ext.extend(Ext.Window, {
  /**
   * Konstruktor
   * @param {Object} config
   */
  constructor : function(config) {
    config = config || {};
    var oGrid = new epca.window.Fn928.Panel({//csParentWin: this
      callback : config.callback,
      callbackScope : config.callbackScope
    });
    Ext.apply(config, {
      id : epca.window.Fn928.winid, // ZATIAL predpokladame len jedno okno
      layout : 'fit',
      title : epca.window.Fn928.tx.txVariantNames,
      height : 540,
      //autoHeight : true,
      //minWidth : 200,
      //minHeight : 250,
      //border : false,
      width : 600,
      closable : true,
      plain : true,
      resizable : true,
      modal : true,
      closeAction : 'close', //,                                               tbar:        toolBar
      csGrid : oGrid, // toto je pre referenciu v metodach (vyzera ze obsah items
      // nie je v runtime pristupny)
      items : [oGrid]
    });
    epca.window.Fn928.Win.superclass.constructor.call(this, config);
  },
  /**
   Vyvolanie okna pre daneho
   */
  csOpen : function(params) {
    this.csGrid.csShowVariantNameList(params);
    this.show();
  }
});
// Globalna funkcia na ziskanie objektu okna
// zatial vyzera, ze by mohlo stacit jedno pre celu app.
// Neskor sa moze pripadne upravit
//
epca.window.Fn928.getWin = function(config) {
  return i3.ui.getSingleWin(epca.window.Fn928.winid, epca.window.Fn928.Win, config);
};
