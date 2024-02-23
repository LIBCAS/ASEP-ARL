/**
 * Seznam polozek pro vyber jednoho radku
 *
 */
// jslint params
/*global Ext,i3,alert */
Ext.ns('i3.ItemList');
i3.ItemList.tx = {
    // texty UI, ktore je treba prekladat
    /*txTitle : 'Názov#Název#Title###العنوان'.ls(),
     txTrxDate : 'Dátum výpožičky#Datum výpůjčky#Trx date###تاريخ Trx'.ls(),
     txRetDate : 'Dátum návratu#Datum návratu#Date of return###تاريخ الإرجاع'.ls(),
     txProlCount : 'Prolongácií#Prolongací#Prol. count###عد مطول'.ls(),
     txClaimCount : 'Upomienok#Upomínek#Claim count###عد المطالبات'.ls(),
     txLocation : 'Lokácia#Lokace#Location###مكان'.ls(),
     txDislocation : 'Dislokácia#Dislokace#Dislocation###إزالة المكان'.ls(),
     txSignature : 'Signatúra#Signatura#Call number###رقم الطلب'.ls(),
     txTrno : 'Prír. číslo#Přír. číslo#Tr. no###Tr. no'.ls(),
     txTrxId : 'Kód Trx#Kód Trx#Trx Id###Trx Id'.ls(),*/
    txNoRow: 'Nebol vybraný žiaden riadok.#Nebyl vybraný žádný řádek.#No row selected.###لم يتم اختيار صفوف'.ls(),
    txOK: 'OK#OK#OK###أوافق'.ls(),
    txCancel: 'Zrušiť#Zrušit#Cancel###حذف'.ls()
};
i3.ItemList.winid = 'itemlst';
// panel
i3.ItemList.Panel = Ext.extend(Ext.grid.GridPanel, {
    /**
     * Konstruktor
     * @param {Object} config
     */
    constructor: function(config) {
        config = config || {};
        var idpref = i3.getIdPrefFn('itemlist');
        // idpref makra
        var oSelModel = new Ext.grid.CheckboxSelectionModel({
            // vyber jednoho radku
            singleSelect: true,
            // skryje checkbox v hlavicce
            header: ''
        });
        Ext.applyIf(config, {
            store: new Ext.data.Store({}), //       plugins: [ new i3.ui.GridRowChecker() ]
            //disableSelection:true,                         // riesene pluginom
            sm: oSelModel,
            columns: [oSelModel, {
                id: idpref('column1'),
                header: config.csTitleRow1,
                width: 100,
                sortable: false,
                dataIndex: 'column1',
                fixed: false,
                resizable: true
            }, {
                id: idpref('column2'),
                header: config.csTitleRow2,
                width: 100,
                sortable: false,
                dataIndex: 'column2',
                fixed: false,
                resizable: true
            }, {
                id: idpref('column3'),
                header: config.csTitleRow3,
                width: 100,
                sortable: false,
                dataIndex: 'column3',
                fixed: false,
                resizable: true
            }, {
                id: idpref('column4'),
                header: config.csTitleRow4,
                width: 100,
                sortable: false,
                dataIndex: 'column4',
                fixed: false,
                resizable: true
            }, {
                id: idpref('column5'),
                header: config.csTitleRow5,
                width: 100,
                sortable: false,
                dataIndex: 'column5',
                fixed: false,
                resizable: true
            }],
            stripeRows: true,
            autoExpandColumn: idpref('column1'),
            height: 230,
            width: 900,
            border: true,
            buttons: [{
                text: i3.ItemList.tx.txOK,
                listeners: {
                    click: {
                        fn: function() {
                            // zoznam vybranych zaznamov
                            var pRecs = this.getSelectionModel().getSelections();
                            if ((!pRecs) || (pRecs.length <= 0)) {
                                i3.alert(i3.ItemList.tx.txNoRow);
                                return;
                            }
                            // return data to caller
                            this.csOpenParams.callback.call(this.csOpenParams.scope, pRecs);
                            // uzatvorit okienko
                            if (this.csParentWin) {
                                this.csParentWin.hide();
                            }
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ItemList.tx.txCancel,
                listeners: {
                    click: {
                        fn: function() {
                            // zavrit okno
                            this.ownerCt.close();
                        },
                        scope: this
                    }
                }
            }],
            // setup parameters
            // bude volane vzdy pred otvorenim flexpop na nastavenie triedy,   kt.
            // sa ma prehladavat
            // +zobrazovacieho formatu
            csInit: function(pParams) {
                var c, cm, i, aItem, oRec, aRecList = [];
                this.width = pParams.width || this.width;
                // cleanup old data
                this.store.removeAll();
                this.csOpenParams = pParams;
                // jednotlive polozky nacte do gridu
                for (i = 0; i < pParams.csItems.length; i++) {
                    aItem = pParams.csItems[i];
                    if (!Ext.isArray(aItem)) {
                        aItem = [aItem];
                    }
                    oRec = new this.TrxRecord({
                        column1: aItem[0],
                        column2: aItem[1],
                        column3: aItem[2],
                        column4: aItem[3],
                        column5: aItem[4]
                    });
                    aRecList.push(oRec);
                }
                // ak sa nieco naslo pridat do store
                if (aRecList.length > 0) {
                    this.store.add(aRecList);
                }
                cm = this.getColumnModel();
                for (i = 1; i < cm.getColumnCount(); i++) {
                    c = cm.getColumnAt(i);
                    c.hidden = !(pParams.csColumnsVisibility[i - 1] || false);
                    c.header = pParams.csColumnsCaptions[i - 1] || '';
                }
                //alert(psResp);
            },
            scope: this
        });
        i3.ItemList.Panel.superclass.constructor.call(this, config);
    },
    // konstruktor pre manualne pridavane zaznamy
    TrxRecord: Ext.data.Record.create([{
            name: 'column1',
            type: 'string'
        } // 1
        , {
            name: 'column2',
            type: 'string'
        } // 2
        , {
            name: 'column3',
            type: 'string'
        }, {
            name: 'column4',
            type: 'string'
        }, {
            name: 'column5',
            type: 'string'
        }
    ])
});
// window wrapping
//
// config options:
//  idpref: id prefix of the window
//
i3.ItemList.Win = Ext.extend(Ext.Window, {
    /**
     * Konstruktor
     * @param {Object} config
     */
    constructor: function(config) {
        config = config || {};
        // makra na jednoduche prefixovanie id-ciek elementov
        //var idpref = i3.getIdPrefFn(config.idpref), getCmp = i3.getCmpFn(config.idpref);
        var oGrid = new i3.ItemList.Panel({
            csParentWin: this
        });
        Ext.apply(config, {
            id: i3.ItemList.winid, // ZATIAL predpokladame len jedno okno
            layout: 'fit',
            title: config.csTitle,
            height: 380,
            minWidth: 200,
            minHeight: 250,
            closable: true,
            plain: true,
            resizable: true,
            modal: true,
            closeAction: 'hide', //,        tbar:        toolBar
            csItemGrid: oGrid, // toto je pre referenciu v metodach (vyzera ze obsah items
            // nie je v runtime pristupny)
            items: oGrid
        });
        i3.ItemList.Win.superclass.constructor.call(this, config);
    },
    /**
     Vyvolanie okna pre daneho
     */
    csOpen: function(pParams) {
        this.csItemGrid.csInit(pParams);
        // titulok okienka
        if (pParams.wintitle) {
            this.setTitle(pParams.wintitle);
        }
        this.show();
    }
});
// Globalna funkcia na ziskanie objektu okna
// zatial vyzera, ze by mohlo stacit jedno pre celu app.
// Neskor sa moze pripadne upravit
//
i3.ItemList.getWin = function() {
    return i3.ui.getSingleWin(i3.ItemList.winid, i3.ItemList.Win);
};
