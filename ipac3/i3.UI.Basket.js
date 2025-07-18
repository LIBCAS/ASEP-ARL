/*
 * Kosik.
 *
 * 23.02.24 on; kontroly a skryti poli
 * 08.04.20 on; vyrazeni exemplaru
 * 21.01.19 on; mozna kontrola lokace
 * 07.01.19 on; vymaz zaznamu
 * 24.10.17 on; spojeni zaznamu, refresh kosiku
 * 21.11.16 on; limita pri vyhledavani
 */
/*global Ext,i3,alert,window,setTimeout */
Ext.ns('i3.ui.Basket');
i3.ui.Basket.tx = { //
    txHoldingsToBasket: 'Načítanie holdingov do košíka#Načtení holdingů do košíku#Read holdings to the basket'.ls(),
    txIndex: 'Index#Index#Index'.ls(),
    txValue: 'Hodnota#Hodnota#Value'.ls(),
    txAdd: 'Pridať#Přidat#Add'.ls(),
    txClose: 'Zavrieť#Zavřít#Close###أغلق'.ls(),
    rsERRFoundMoreHol: 'Chyba: bolo najdených viac holdingov ({0}) s \"{1}={2}\".#Chyba: bylo nalezeno více holdingů ({0}) s \"{1}={2}\".#Error: found more Holdings ({0}) with \"{1}={2}\".###العثور على مقتنيات أخرى  ({0}) بـ {1}={2}'.ls(),
    rsERRNotFound: 'Chyba: holding s \"{0}={1}\" nebol nájdený.#Chyba: holding s \"{0}={1}\" nenalezen.#Error: holding with \"{0}={1}\" not found.###لم يتم العثور على مقتنيات بـ {0}={1}'.ls(),
    rsINFAdded: 'Holding s \"{0}={1}\" bol pridaný do košíka.#Holding s \"{0}={1}\" byl přidán do košíku.#Holding with \"{0}={1}\" was added to the Basket.'.ls(),
    txName: 'Názov#Název#Name'.ls(),
    txRemove: 'Odstraniť z košíka#Odstranit z košíku#Remove from basket'.ls(),
    txClear: 'Vysypať košík#Vysypat košík#Clear basket'.ls(),
    txPreliminaryDisposeList: 'Predbežný vyraďovací zoznam#Předběžný vyřazovací seznam#Preliminary dispose list'.ls(),
    //txNoRow: 'Nebol vybraný žiaden riadok.#Nebyl vybraný žádný řádek.#No row selected.###لم يتم اختيار صفوف'.ls(),
    txNoRecord: 'Nebol vybraný žiaden záznam.#Nebyl vybraný žádný záznam.#No record selected.###لم يتم اختيار صفوف'.ls(),
    txAtLeast2: 'Prosím zvoľte aspoň dva záznamy.#Vyberte prosím alespoň 2 záznamy.#Select at least two records, please.'.ls(),
    txDbName: 'Databáza#Databáze#Database###قاعدة البيانات'.ls(),
    txDisposeListName: 'Názov vyraďovacieho zoznamu#Název vyřazovacího seznamu#Dispose list name'.ls(),
    txReason: 'Dôvod vyradeni#Důvod vyřazení#Reason of dispose'.ls(),
    txDocumentCondition: 'Stav dokumentu#Stav dokumentu#Document condition'.ls(),
    txBlock: 'Blokovanie#Blokování#Block'.ls(),
    txNextProcTitle: 'Dalšie zpracovanie (titul)#Další zpracování (titul)#Next processing (Title)'.ls(),
    txNextProcHolding: 'Dalšie zpracovanie (holding)#Další zpracování (holding)#Next processing (Holding)'.ls(),
    txErrDisEmpty: 'Názov vyraďovacieho zoznamu nemôže byť prázdny.#Název vyřazovacího seznamu nemůže být prázdný.#Dispose list name could not be empty.'.ls(),
    txErrDBEmpty: 'Názov DB nemôže byť prázdný.#Název DB nemůže být prázdný.#DB name could not be empty.'.ls(),
    txRequestLong: 'Too much Records selected. Request will be distributed among several parts.'.ls(),
    txQUECont: 'Do you want to continue?'.ls(),
    tx969fHelp: '<table border=\\"1\\"><tr><th>&apos;&apos;</th><th>znamená A->K, K->nič, P->nič + vymazať všetky iné hodnoty v 969f</th></tr><tr><th>%U</th><th>znamená A->K, K->nič, P->nič</th></tr><tr><th>%UA</th><th>znamená A->nič, K->nič, P->nič</th></tr><tr><th>%K</th><th>znamená A->K</th></tr></table>#<table border=\\"1\\"><tr><th>&apos;&apos;</th><th>znamená A->K, K->nic, P->nic + smazat všechny jiné hodnoty v 969f</th></tr><tr><th>%U</th><th>znamená A->K, K->nic, P->nic</th></tr><tr><th>%UA</th><th>znamená A->nic, K->nic, P->nic</th></tr><tr><th>%K</th><th>znamená A->K</th></tr></table>#<table border=\\"1\\"><tr><th>&apos;&apos;</th><th>means A->K, K->nothing, P->nothing + clear all other values in 969f</th></tr><tr><th>%U</th><th>means A->K, K->nothing, P->nothing</th></tr><tr><th>%UA</th><th>means A->nothing, K->nothing, P->nothing</th></tr><tr><th>%K</th><th>means A->K</th></tr></table>'.ls(),
    txInfo: 'Info:<br>prázdne pole = hodnota zostane nezmenená<br>\'\' = hodnota bude vymazaná#Info:<br>prázdné pole = hodnota zůstane nezměněná<br>\'\' = hodnota bude vymazána#Info:<br>empty field = value will be unchanged<br>\'\' = value will be cleared'.ls(),
    txGenerateDisposeList: 'Generujem vyraďovací zoznam...#Generuji vyřazovací seznam...#Generate dispose list...'.ls(),
    txMoveUp: 'Posune riadok hore#Posune řádek nahoru#Move the row up'.ls(),
    txMoveDown: 'Posune vybraný riadok dole#Posune vybraný řádek dolů#Move the selected row down'.ls(),
    txJoinRecords: 'Spojenie záznamov#Spojení záznamů#Join records'.ls(),
    txJoinMoreDb: 'Prosím zvoľte záznamy len z jednej databázy!#Prosím vyberte záznamy pouze z jedné databáze!#Please select records only from one database!'.ls(),
    txWithSysno: '"%s" s kódom "%s"#"%s" s kódem "%s"#"%s" with sysno "%s"'.ls(),
    txReallyJoin: 'Skutočne chcete spojiť následujúce záznamy?#Opravdu chcete spojit následující záznamy?#Do you really want to join this records?'.ls(),
    txRefreshBasket: 'Obnoviť košík#Obnovit košík#Refresh basket'.ls(),
    txDeleteRecords: 'Vymazať záznamy#Vymazat záznamy#Delete records'.ls(),
    txReallyDelete: 'Skutočne chcete vymazať vybrané záznamy?#Opravdu chcete vymazat vybrané záznamy?#Do you really want to delete selected records?'.ls(),
    txDeletedMsg: 'Výmaz záznamu OK!#Výmaz záznamu OK!#Delete OK!###إحذف أوافق!'.ls(),
    txWrongLocation: 'Nie je možné vymazať exemplár z lokácie %s.#Nelze vymazat exemplář z lokace %s.#You can\'t delete holding from location %s.'.ls(),
    txHoldingDisposal: 'Vyradiť exempláre#Vyřadit exempláře#Holding disposal'.ls(),
    txNoHoldingRecord: 'Záznam "%s" nie je holdingový záznam.#Záznam "%s" není holdingový záznam.#Record "%s" is not a holding record.'.ls()
};
i3.ui.Basket.c = {
    txOK: 'OKBSKT001',
    C_CRITERIA_DELIM: '\xab',
    sMsgId: 'BASKETMSGID'
};
// search grid
//
i3.ui.Basket.Grid = Ext.extend(Ext.grid.GridPanel, {
    /**
     * @private
     */
    constructor: function(config) {
        config = config || {};
        var idpref = i3.getIdPrefFn(config.idpref);
        var oSelModel = new Ext.grid.CheckboxSelectionModel({
            singleSelect: false
        });
        Ext.applyIf(config, {
            store: new Ext.data.Store({}),
            id: idpref('gridpnl'),
            sm: oSelModel,
            columns: [oSelModel, {
                // 24.10.17 on;
                //id : idpref('df'),
                id: 'df',
                header: i3.ui.Basket.tx.txName,
                //width: 350,
                sortable: true,
                dataIndex: 'df',
                resizeable: true
                // 25.07.12 on; potrebuju sem dostat spravny ZF
                /*renderer: function(value, metaData, record) {
                 // zkusim nacist ZF z uzlu ZF, jinak pouzije uzel data (puvodni funkcnost)
                 var s = this.ownerCt.ownerCt.csGetDFStore(record.data, this.ownerCt.ownerCt.openParams.displayFmt[0]);
                 if (s === '') {
                 s = value;
                 }

                 return s;
                 },
                 scope: this*/
            }, {
                // 24.10.17 on;
                //id : idpref('idx'),
                id: 'idx',
                //header: i3.ui.FlexPop.tx.txID,
                //width: 60,
                //sortable: true,
                dataIndex: 'idx',
                hidden: true
                //fixed: false,
                //resizeable: true
            }, {
                // 24.10.17 on;
                //id : idpref('record'),
                id: 'record',
                //header: i3.ui.FlexPop.tx.txID,
                //width: 60,
                //sortable: true,
                dataIndex: 'record',
                // 07.12.15 on; moznost skryt sloupec
                hidden: true
                //fixed: false,
                //resizeable: true
            }],
            stripeRows: true,
            // 24.10.17 on;
            //autoExpandColumn : idpref('df'),
            autoExpandColumn: 'df',
            //height: 230,
            //width: 420,
            border: false,
            tbar: [{
                    xtype: 'tbbutton',
                    //tooltip: i3.ui.Basket.tx.txRemove,
                    text: i3.ui.Basket.tx.txRemove,
                    iconCls: 'icon-basket-delete',
                    //icon: '../images/previous_records.png',
                    //id: idpref('pbScanB'),
                    //disabled : true,
                    listeners: {
                        click: function() {
                            this.ownerCt.csRemoveRecords();
                        },
                        scope: this
                    }
                }, '-', {
                    xtype: 'tbbutton',
                    //tooltip: i3.ui.Basket.tx.txRemove,
                    text: i3.ui.Basket.tx.txClear,
                    iconCls: 'icon-basket',
                    //icon: '../images/previous_records.png',
                    //id: idpref('pbScanB'),
                    //disabled : true,
                    listeners: {
                        click: function() {
                            this.ownerCt.csClearBasket();
                        },
                        scope: this
                    }
                },
                // 04.01.19 on; vymaz zaznamu
                {
                    xtype: 'tbseparator',
                    hidden: !i3.csBasketDeleteRecords
                },
                /**
                 * Vymaz zaznamu
                 *
                 * 04.01.19 on;
                 */
                {
                    xtype: 'tbbutton',
                    //tooltip: i3.ui.Basket.tx.txRemove,
                    text: i3.ui.Basket.tx.txDeleteRecords,
                    iconCls: 'icon-delete',
                    hidden: !i3.csBasketDeleteRecords,
                    listeners: {
                        click: function() {
                            this.ownerCt.csDeleteRecords();
                        },
                        scope: this
                    }
                }, {
                    xtype: 'tbseparator',
                    hidden: !i3.csBasketPreliminaryDisposeList
                },
                // predbezny vyrazovaci seznam
                {
                    xtype: 'tbbutton',
                    //tooltip: i3.ui.Basket.tx.txRemove,
                    text: i3.ui.Basket.tx.txPreliminaryDisposeList,
                    iconCls: 'icon-disp-list',
                    hidden: !i3.csBasketPreliminaryDisposeList,
                    //icon: '../images/previous_records.png',
                    //id: idpref('pbScanB'),
                    //disabled : true,
                    listeners: {
                        click: function() {
                            this.ownerCt.csPreliminaryDisposeList();
                        },
                        scope: this
                    }
                }, {
                    xtype: 'tbseparator',
                    hidden: !i3.csBasketJoinRecords
                },
                /**
                 * Spojovani zaznamu
                 *
                 * 08.04.20 on;
                 */
                {
                    xtype: 'tbbutton',
                    //tooltip: i3.ui.Basket.tx.txRemove,
                    text: i3.ui.Basket.tx.txJoinRecords,
                    iconCls: 'icon-join',
                    hidden: !i3.csBasketJoinRecords,
                    listeners: {
                        click: function() {
                            this.ownerCt.csJoinRecords();
                        },
                        scope: this
                    }
                }, {
                    xtype: 'tbseparator',
                    hidden: !i3.csBasketHoldingDisposal
                },
                /**
                 * Vyrazeni exemplaru
                 *
                 * 08.04.20 on;
                 */
                {
                    xtype: 'tbbutton',
                    //tooltip: i3.ui.Basket.tx.txRemove,
                    text: i3.ui.Basket.tx.txHoldingDisposal,
                    iconCls: 'icon-dispose-book',
                    hidden: !i3.csBasketHoldingDisposal,
                    listeners: {
                        click: function() {
                            this.ownerCt.csHoldingDisposal();
                        },
                        scope: this
                    }
                }, {
                    xtype: 'tbfill'
                },
                /**
                 * Refresh kosiku
                 *
                 * 24.10.17 on;
                 */
                {
                    xtype: 'tbbutton',
                    //tooltip: i3.ui.Basket.tx.txRemove,
                    text: i3.ui.Basket.tx.txRefreshBasket,
                    iconCls: 'icon-refresh',
                    listeners: {
                        click: function() {
                            this.ownerCt.csRefreshBasket();
                        },
                        scope: this
                    }
                }
            ],
            bbar: [{
                xtype: 'tbbutton',
                //text : 'UP',
                tooltip: i3.ui.Basket.tx.txMoveUp,
                iconCls: 'icon-up',
                listeners: {
                    click: function() {
                        this.ownerCt.csMoveSelectedRow(this, -1);
                    },
                    scope: this
                }
            }, {
                xtype: 'tbbutton',
                //text : 'DOWN',
                tooltip: i3.ui.Basket.tx.txMoveDown,
                iconCls: 'icon-down',
                listeners: {
                    click: function() {
                        this.ownerCt.csMoveSelectedRow(this, 1);
                    },
                    scope: this
                }
            }]
        });
        i3.ui.Basket.Grid.superclass.constructor.call(this, config);
    }
});
/**
 * @class i3.ui.Basket
 * Formular pro kosik.
 *
 */
i3.ui.Basket.Panel = Ext.extend(i3.ui.ColPanel, {
    constructor: function(config) {
        config = config || {};
        var panelBasket = new i3.ui.Basket.Grid({
            //title: i3.ui.FlexPop.tx.txSearch, // 'Search'
            title: '',
            height: 500,
            //width: '100%',
            idpref: config.idpref
        });
        Ext.apply(config, {
            layout: 'form',
            items: [panelBasket
                /*, {
                 xtype: 'panel',
                 width: 100,
                 layout: 'form',
                 items: [{
                 xtype: 'button',
                 text: i3.ui.Basket.tx.txInfo,
                 anchor: i3.c.anchorBase,
                 //name : 't100a',
                 //nameSpace : 'a',
                 handler: function() {
                 this.csOnInfo();
                 },
                 scope: this
                 }]
                 }*/
            ],
            // predefimnuje tlacitka
            buttons: [{
                text: i3.ui.Basket.tx.txClose,
                listeners: {
                    click: {
                        fn: function() {
                            this.ownerCt.close();
                        },
                        scope: this
                    }
                }
            }],
            listeners: {
                render: function() {
                    // 10.10.16 on; nacteni zaznamu do gridu
                    this.csOnFetch({
                        csCallback: this.csAddRecordsToGrid,
                        csScope: this
                    });
                }
            }
        });
        i3.ui.Basket.Panel.superclass.constructor.call(this, config);
    },
    /**
     * nacteni zaznamu do kosiku
     *
     * psList .. ve tvaru: pocet|idx1,idx2,idx3....
     */
    csAddRecordsToGrid: function(psList) {
        var i,
            idx,
            idxs;
        if (i3.isEmptyString(psList)) {
            return;
        }
        if (psList.piece('#', 1) !== i3.ui.Basket.c.txOK) {
            var m = new i3.WS.Msg(psList);
            i3.displayError(m.userText);
            return;
        }
        psList = psList.piece('#', 3);
        if (i3.isEmptyString(psList)) {
            return;
        }
        idxs = psList.split(',');
        for (i = 0; i < idxs.length; i++) {
            idx = idxs[i];
            this.csAdd1RecordToGrid(idx);
        }
    },
    /**
     * jeden zaznam do kosiku
     *
     * idx .. ve tvaru: lname*t001
     */
    csAdd1RecordToGrid: function(idx) {
        var sDfName = this.csGetShortDfName(idx);
        // nacte zaznam v marcu i v zf
        i3.WS.getRecord({
            idx: idx,
            fmt: ['LINEMARC', sDfName],
            success: function(pRec) {
                var sDF = i3.WS.getDisplayFormatFromRecord(pRec, sDfName);
                this.csAdd1RecordToGrid2(pRec, sDF);
            },
            scope: this
        });
    },
    csGetShortDfName: function(idx) {
        var sDb = idx.piece('*', 1);
        if (sDb.indexOf('_cat_h') > 0) {
            // holdingy
            return 'HOLD_BASIC';
        }
        if (sDb.indexOf('un_auth') > 0) {
            // autority unm
            return 'UNA_BASIC';
        }
        if (sDb.indexOf('us_auth') > 0) {
            // autority m21
            return 'USA_BASIC';
        }
        if (sDb.indexOf('us_cat') > 0) {
            // katalog m21
            return 'US_BASIC';
        }
        // zbytek
        return 'UN_BASIC';
    },
    /**
     * pokracovani
     */
    csAdd1RecordToGrid2: function(pRec, psDF) {
        //alert(psDF);
        // konstruktor pre manualne pridavane zaznamy
        var Record = Ext.data.Record.create([{
            name: 'idx'
        }, {
            name: 'df'
        }, {
            name: 'record'
        }]);
        var grid = this.getCmp('gridpnl');
        grid.store.add(new Record({
            idx: i3.className2LName(pRec.classn) + '*' + pRec.t001,
            df: psDF[0],
            record: pRec
        }));
    },
    /**
     * Vymaz kosiku.
     */
    csOnClear: function(config) {
        var m;
        // zavola metodu na serveru
        i3.WS.command({
            db: this.csMainForm.csDbCat,
            params: 'clear',
            command: 'basket',
            // o-je cely JSON s vysledkom
            success: function(o) {
                if (o && (o.ret_code === '0')) {
                    var oResult = o.data[0];
                    if (!i3.isEmptyString(oResult.ErrorMessage)) {
                        // zobrazi chybu a skonci
                        m = new i3.WS.Msg(oResult.ErrorMessage + '#' + oResult.ErrorMessageDef);
                        i3.alert(m.userText);
                        return;
                    }
                    /*var s = oResult.OKMessage;
                     s = s.strswap('#', ' - ');
                     s = s.strswap('|', '<br>');*/
                    if (config.csCallback) {
                        var scope = config.csScope || this;
                        config.csCallback.call(scope, oResult);
                    }
                } else {
                    m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
                    i3.displayError(m.userText);
                }
            },
            scope: this
        });
    },
    /**
     * Nacteni kosiku.
     */
    csOnFetch: function(config) {
        var m;
        // zavola metodu na serveru
        i3.WS.command({
            //db: this.csMainForm.csDbCat,
            db: i3.WS.getDfltUnTablesd(),
            params: 'fetch',
            command: 'basket',
            // o-je cely JSON s vysledkom
            success: function(o) {
                if (o && (o.ret_code === '0')) {
                    var oResult = o.data[0];
                    if (!i3.isEmptyString(oResult.ErrorMessage)) {
                        // zobrazi chybu a skonci
                        m = new i3.WS.Msg(oResult.ErrorMessage + '#' + oResult.ErrorMessageDef);
                        i3.alert(m.userText);
                        return;
                    }
                    /*var s = oResult.OKMessage;
                     s = s.strswap('#', ' - ');
                     s = s.strswap('|', '<br>');*/
                    if (config.csCallback) {
                        var scope = config.csScope || this;
                        config.csCallback.call(scope, oResult);
                    }
                } else {
                    m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
                    i3.displayError(m.userText);
                }
            },
            scope: this
        });
    },
    /*
     * vymaz z kosiku
     */
    csOnDelete: function(psIdxList, config) {
        var m;
        if (i3.isEmptyString(psIdxList)) {
            return;
        }
        // zavola metodu na serveru
        i3.WS.command({
            db: this.csMainForm.csDbCat,
            params: 'del|' + psIdxList,
            command: 'basket',
            // o-je cely JSON s vysledkom
            success: function(o) {
                if (o && (o.ret_code === '0')) {
                    var oResult = o.data[0];
                    if (!i3.isEmptyString(oResult.ErrorMessage)) {
                        // zobrazi chybu a skonci
                        m = new i3.WS.Msg(oResult.ErrorMessage + '#' + oResult.ErrorMessageDef);
                        i3.alert(m.userText);
                        return;
                    }
                    /*var s = oResult.OKMessage;
                     s = s.strswap('#', ' - ');
                     s = s.strswap('|', '<br>');*/
                    if (config.csCallback) {
                        var scope = config.csScope || this;
                        config.csCallback.call(scope, oResult);
                    }
                } else {
                    m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
                    i3.displayError(m.userText);
                }
            },
            scope: this
        });
    },
    // odstrani oznacene zaznamy z kosiku
    csRemoveRecords: function() {
        var i,
            oRec,
            grid = this.getCmp('gridpnl'),
            sIdxList = '';
        // zoznam vybranych zaznamov
        var pRecs = grid.getSelectionModel().getSelections();
        if ((!pRecs) || (pRecs.length <= 0)) {
            //i3.alert(i3.Is.BorrowList.tx.txNoRow);
            return;
        }
        for (i = 0; i < pRecs.length; i++) {
            oRec = pRecs[i];
            sIdxList += sIdxList + ',' + oRec.data.idx;
        }
        sIdxList = sIdxList.substring(1);
        this.csOnDelete(sIdxList, {
            csCallback: this.csRemoveRecords2,
            csScope: this
        });
    },
    csRemoveRecords2: function(psResult) {
        var grid,
            selection;
        if (i3.isEmptyString(psResult)) {
            return;
        }
        if (psResult.piece('#', 1) !== i3.ui.Basket.c.txOK) {
            var m = new i3.WS.Msg(psResult);
            i3.displayError(m.userText);
            return;
        }
        // zoznam vybranych zaznamov
        grid = this.getCmp('gridpnl');
        selection = grid.getSelectionModel().getSelections();
        grid.store.remove(selection);
        // aktualizuje zobrazeni poctu holdingu v kosiku
        //this.csMainForm.csSetBasketTitle();
        i3.ui.Basket.csSetBasketTitle();
    },
    // vycisti kosik
    csClearBasket: function() {
        this.csOnClear({
            csCallback: this.csClearBasket2,
            csScope: this
        });
    },
    csClearBasket2: function(psResult) {
        var grid;
        if (i3.isEmptyString(psResult)) {
            return;
        }
        if (psResult.piece('#', 1) !== i3.ui.Basket.c.txOK) {
            var m = new i3.WS.Msg(psResult);
            i3.displayError(m.userText);
            return;
        }
        // pokud vse probehlo, smaze cely store
        grid = this.getCmp('gridpnl');
        grid.store.removeAll();
        // aktualizuje zobrazeni poctu holdingu v kosiku
        //this.csMainForm.csSetBasketTitle();
        i3.ui.Basket.csSetBasketTitle();
    },
    /*
     * Predbezny vyrazovaci seznam.
     */
    csPreliminaryDisposeList: function() {
        var i,
            oRec,
            grid = this.getCmp('gridpnl'),
            sIdxList = '',
            sDb = '',
            sDf;
        // sezznam vybranych zaznamu
        var pRecs = grid.getSelectionModel().getSelections();
        if ((!pRecs) || (pRecs.length <= 0)) {
            i3.alert(i3.ui.Basket.tx.txNoRecord);
            return;
        }
        for (i = 0; i < pRecs.length; i++) {
            oRec = pRecs[i];
            if (sDb === '') {
                sDb = oRec.data.idx.piece('*', 1);
            }
            // 23.02.24 on; doplneny kontroly
            // pouze holdingy
            if (i3.csGetDbFormat(oRec.data.idx.piece('*', 1)) !== 'H') {
                sDf = oRec.data.df;
                if (i3.isEmptyString(sDf)) {
                    sDf = oRec.data.idx;
                }
                i3.alert(i3.fillInParams(i3.ui.Basket.tx.txNoHoldingRecord, [sDf]));
                return;
            }
            // musi jit o zaznamy ze stejne db
            if (sDb !== oRec.data.idx.piece('*', 1)) {
                i3.alert(i3.ui.Basket.tx.txJoinMoreDb);
                return;
            }
            sIdxList += ',' + oRec.data.idx.piece('*', 2);
        }
        sIdxList = sIdxList.substring(1);
        this.csPreliminaryDisposeList2(sDb, sIdxList);
    },
    csPreliminaryDisposeList2: function(psDb, psIdxList) {
        // zjistim nazev db, zatim predpokladam, ze jde o zaznamy z jedne db
        if (i3.isEmptyString(psIdxList)) {
            return;
        }
        // volat popup okienko pre vstup zaznamu
        i3.ui.csOpenColWin({
            title: i3.ui.Basket.tx.txPreliminaryDisposeList,
            CsPanel: i3.ui.Basket.DisposeListForm,
            width: 600,
            csHideHelp: true
            //y: 20 // okno se nebude vertikalne zarovnat na stred, ale bude odsazeno od horniho okraje
        }, {
            csLinRecord: {
                t100a: psDb
            },
            csMainForm: this,
            csOnAfterOK: function(pLinRec) {
                this.csPreliminaryDisposeList3(psDb, psIdxList, pLinRec);
            },
            csOnAfterOKScope: this
        });
    },
    /*
     * pLinRec = {
     *   t100a - nazev db
     *   t100b - nazev vyrazovaciho seznamu
     *   t100c - duvod vyrazeni
     *   t100d - stav dokumentu
     *   t100e - blokovani
     *   t100f - dalsi zpracovani (titul)
     *   t100g - dalsi zpracovani (holding)
     * }
     */
    csPreliminaryDisposeList3: function(psDb, psIdxList, pLinRec) {
        var sParams;
        if (i3.isEmptyString(psDb)) {
            i3.displayError(i3.ui.Basket.tx.txErrDBEmpty);
            return;
        }
        sParams = this.csGetDisposeListParams(pLinRec);
        // pokud nejsou parametry vyplneny spravne, skonci
        if (sParams === '') {
            return;
        }
        // info
        i3.msgOn('', i3.ui.Basket.tx.txGenerateDisposeList, '', i3.ui.Basket.c.sMsgId, true);
        this.csPreliminaryDisposeList4(psDb, psIdxList, sParams, true, '');
    },
    csPreliminaryDisposeList4: function(psDb, psIdxList, psParams, pbFirst, psResult) {
        var n,
            sList = '';
        var nMaxLen = 16000;
        while (!i3.isEmptyString(psIdxList)) {
            n = psIdxList.indexOf(',');
            if (n > 0) {
                sList += ',' + psIdxList.substring(0, n);
                psIdxList = psIdxList.substring(n + 1);
            } else {
                sList += ',' + psIdxList;
                psIdxList = '';
            }
            if (sList.length > nMaxLen) {
                // 26.02.08 on; pridany dotaz
                if (pbFirst) {
                    Ext.Msg.show({
                        //title: epca.L10n.evidenceReallyCloseTit,
                        msg: i3.ui.Basket.tx.txRequestLong + '\n' + i3.ui.Basket.tx.txQUECont,
                        buttons: i3.ui.YesNo,
                        fn: function(pButtonId) {
                            if (pButtonId === 'yes') {
                                sList = sList.substring(1);
                                this.csPreliminaryDisposeList5(psDb, psIdxList, psParams, sList, psResult);
                                return;
                            }
                            i3.msgOff(i3.ui.Basket.c.sMsgId);
                            return;
                        },
                        icon: 'icon-question',
                        scope: this
                    });
                    return;
                }
                sList = sList.substring(1);
                this.csPreliminaryDisposeList5(psDb, psIdxList, psParams, sList, psResult);
                return;
            }
        }
        sList = sList.substring(1);
        this.csPreliminaryDisposeList5(psDb, psIdxList, psParams, sList, psResult);
    },
    csPreliminaryDisposeList5: function(psDb, psIdxList, psParams, psList2Send, psResult) {
        var sSecClass;
        sSecClass = i3.WS.getCommandGroupClass('changeholdings');
        if (sSecClass === '') {
            i3.msgOff(i3.ui.Basket.c.sMsgId);
            return;
        }
        if (psList2Send === '') {
            i3.msgOff(i3.ui.Basket.c.sMsgId);
            return;
        }
        i3.WS.commandURC({
            command: 'changeholdings ' + psDb + ' ' + psParams + ' 0 ' /*generate TRX*/ + psList2Send + ' 0',
            classn: sSecClass,
            success: function(psResp) {
                var m;
                if (psResp.substring(0, 3) === 'ERR') {
                    // chyba, konec
                    i3.msgOff(i3.ui.Basket.c.sMsgId);
                    m = new i3.WS.Msg(psResp);
                    if (!i3.isEmptyString(psResult)) {
                        psResult += '<br>';
                    }
                    psResult += m.userText;
                    i3.displayError(psResult);
                    return;
                }
                m = new i3.WS.Msg(psResp);
                if (!i3.isEmptyString(psResult)) {
                    psResult += '<br>';
                }
                psResult += m.userText;
                // jeste je co odesilat nebo konec?
                if (i3.isEmptyString(psIdxList)) {
                    i3.msgOff(i3.ui.Basket.c.sMsgId);
                    i3.alert(psResult);
                } else {
                    this.csPreliminaryDisposeList4(psDb, psIdxList, psParams, false, psResult);
                }
            }, // kvuli i3.msgOff(msgId);
            failure: function(emsg) {
                i3.msgOff(i3.ui.Basket.c.sMsgId);
                if (emsg && emsg.statusText) {
                    i3.displayError(emsg.statusText);
                } else {
                    i3.displayError(emsg);
                }
            },
            scope: this
        });
    },
    csGetDisposeListParams: function(pLinRec) {
        var sBlock,
            sDispListName,
            sCondition,
            sNextProcTitle,
            sNextProcHold,
            sReason;
        if (!pLinRec) {
            return '';
            // toto snad nikdy nenastane
        }
        // nazev vyrazovaciho seznamu
        sDispListName = pLinRec.t100b.trim();
        if (i3.isEmptyString(sDispListName)) {
            // chyba
            i3.displayError(i3.ui.Basket.tx.txErrDisEmpty);
            return '';
        }
        sDispListName = sDispListName.strswap(' ', '_');
        // duvod vyrazeni
        sReason = pLinRec.t100c.trim();
        if (i3.isEmptyString(sReason)) {
            sReason = '.';
        }
        if ((sReason === '\'\'') || (sReason === '"') || (sReason === '""')) {
            sReason = '';
        }
        sReason = sReason.strswap(' ', '_');
        // blokovani
        sBlock = pLinRec.t100e.trim();
        if (i3.isEmptyString(sBlock)) {
            sBlock = '.';
        }
        if ((sBlock === '\'\'') || (sBlock === '"') || (sBlock === '""')) {
            sBlock = '';
        }
        // stav dokumentu
        sCondition = pLinRec.t100d.trim();
        if (i3.isEmptyString(sCondition)) {
            sCondition = '.';
        }
        if ((sCondition === '\'\'') || (sCondition === '"') || (sCondition === '""')) {
            sCondition = '';
        }
        // dalsi zpracovani (titul)
        sNextProcTitle = pLinRec.t100f.trim();
        if (i3.isEmptyString(sNextProcTitle)) {
            sNextProcTitle = '.';
        }
        if ((sNextProcTitle === '\'\'') || (sNextProcTitle === '"') || (sNextProcTitle === '""')) {
            sNextProcTitle = '';
        }
        // dalsi zpracovani (holding)
        sNextProcHold = pLinRec.t100g.trim();
        if (i3.isEmptyString(sNextProcHold)) {
            sNextProcHold = '.';
        }
        if ((sNextProcHold === '\'\'') || (sNextProcHold === '"') || (sNextProcHold === '""')) {
            sNextProcHold = '';
        }
        return i3.ui.Basket.c.C_CRITERIA_DELIM + '.' + // location
            i3.ui.Basket.c.C_CRITERIA_DELIM + '.' + // dislocation
            i3.ui.Basket.c.C_CRITERIA_DELIM + '.' + // period
            i3.ui.Basket.c.C_CRITERIA_DELIM + sBlock + // block
            i3.ui.Basket.c.C_CRITERIA_DELIM + sDispListName + // vyrazovaci seznam
            i3.ui.Basket.c.C_CRITERIA_DELIM + sReason + // duvod
            i3.ui.Basket.c.C_CRITERIA_DELIM + '.' + // int. code
            i3.ui.Basket.c.C_CRITERIA_DELIM + '.' + // account
            i3.ui.Basket.c.C_CRITERIA_DELIM + '.' + // cost centre
            i3.ui.Basket.c.C_CRITERIA_DELIM + '.' + // pack list
            i3.ui.Basket.c.C_CRITERIA_DELIM + sNextProcTitle + // UN_969f
            i3.ui.Basket.c.C_CRITERIA_DELIM + sNextProcHold + // UNH_969f
            i3.ui.Basket.c.C_CRITERIA_DELIM + sCondition + // fyzicky stav dokumentu = 300s
            // inventarizace = 500a
            i3.ui.Basket.c.C_CRITERIA_DELIM + '.';
    },
    /**
     * presun radku v gridu
     *
     * 15.08.17 on;
     */
    csMoveSelectedRow: function(grid, direction) {
        var record = grid.getSelectionModel().getSelected();
        if (!record) {
            return;
        }
        var index = grid.getStore().indexOf(record);
        if (direction < 0) {
            index--;
            if (index < 0) {
                return;
            }
        } else {
            index++;
            if (index >= grid.getStore().getCount()) {
                return;
            }
        }
        grid.getStore().remove(record);
        grid.getStore().insert(index, record);
        grid.getSelectionModel().selectRow(index, true);
    },
    /*
     * Spojeni zaznamu
     *
     * 15.08.17 on;
     */
    csJoinRecords: function() {
        var i,
            oRec,
            grid = this.getCmp('gridpnl'),
            sIdxList = '',
            sDb = '',
            sDfList = '';
        // sezznam vybranych zaznamu
        var pRecs = grid.getSelectionModel().getSelections();
        if ((!pRecs) || (pRecs.length <= 0)) {
            i3.alert(i3.ui.Basket.tx.txNoRecord);
            return;
        }
        // musi vybrat aspon 2 zaznamy
        if (pRecs.length < 2) {
            i3.alert(i3.ui.Basket.tx.txAtLeast2);
            return;
        }
        for (i = 0; i < pRecs.length; i++) {
            oRec = pRecs[i];
            if (sDb === '') {
                sDb = oRec.data.idx.piece('*', 1);
            } else {
                // musi jit o zaznamy ze stejne db
                if (sDb !== oRec.data.idx.piece('*', 1)) {
                    i3.alert(i3.ui.Basket.tx.txJoinMoreDb);
                    return;
                }
            }
            sIdxList += '#' + oRec.data.idx.piece('*', 2);
            sDfList += '<br>' + i3.fillInParams(i3.ui.Basket.tx.txWithSysno, [oRec.data.df, oRec.data.idx.piece('*', 2)]);
        }
        sIdxList = sIdxList.substring(1);
        sDfList = sDfList.substring(4);
        Ext.Msg.show({
            msg: i3.ui.Basket.tx.txReallyJoin + '<br>' + sDfList,
            buttons: i3.ui.YesNo,
            fn: function(pButtonId) {
                if (pButtonId === 'yes') {
                    this.csJoinRecords2(sDb, sIdxList);
                    return;
                }
                return;
            },
            icon: 'icon-question',
            scope: this
        });
    },
    /**
     * Pokracovani spojeni zaznamu, po dotazu
     */
    csJoinRecords2: function(psDb, psIdxList) {
        if (i3.isEmptyString(psIdxList)) {
            return;
        }
        var sRepName = 'report joinRecords';
        var sClass = i3.WS.getCommandGroupClass(sRepName);
        if (sClass === '') {
            return;
        }
        var sType = sRepName.piece(' ', 1);
        var sCmd = 'joinRecords ' + psDb + ' ' + psIdxList;
        i3.WS.commandURC({
            command: sCmd,
            classn: sClass,
            type: sType,
            success: function(psResp) {
                var sURL = i3.WS.sXlate('UnTablesd*ARLDIR', 'URL_REPORTS');
                if (sURL === '') {
                    i3.alert(i3.rep.RepForm.tx.txErrGetURL);
                    return;
                }
                // vsechno v poradku otevre html stranku
                if (psResp.substring(0, 4) === 'rep_') {
                    // pouze cast po prvni mezeru
                    psResp = psResp.piece(' ', 1);
                    psResp = sURL + psResp;
                    // zobrazi vysledek v novem okne
                    window.open(psResp, psResp);
                    // 24.10.17 on; k aktualizaci lze pouzit tlacitko, nebude se delat automaticky - neni jasne, kdy proces spojovani dobehne
                    // 23.10.17 on; aktualizuje obsah kosiku
                    //this.csRefreshBasket();
                } else {
                    // prelozi kod do srozumitelne podoby
                    var m = new i3.WS.Msg(psResp);
                    i3.alert(m.userText);
                    return;
                }
            },
            scope: this
        });
    },
    /**
     * Aktualizace obsahu kosiku po provedeni napr. spojeni zaznamu
     * - resim jenom situaci, kdy v kosiku na serveru je vic zaznamu nez v gridu
     * - opacny stav asi ani nemuze nastat
     *
     */
    csRefreshBasket: function() {
        // 10.10.16 on; nacteni zaznamu do gridu
        this.csOnFetch({
            csCallback: this.csRefreshBasket2,
            csScope: this
        });
    },
    csRefreshBasket2: function(psList) {
        var idxs,
            idx1,
            i;
        if (i3.isEmptyString(psList)) {
            return;
        }
        psList = psList.piece('#', 3);
        if (i3.isEmptyString(psList)) {
            return;
        }
        idxs = psList.split(',');
        for (i = 0; i < idxs.length; i++) {
            idx1 = idxs[i];
            i3.WS.getRecord({
                idx: idx1,
                fmt: ['LINEMARC'],
                success: function( /*pRec*/ ) {
                    //alert('ok');
                },
                failure: this.csRefreshBasket3.createDelegate(this, [idx1]),
                scope: this
            });
        }
    },
    csRefreshBasket3: function(idx) {
        this.csRemoveRecordByIdx(idx);
    },
    /**
     * Odstrani vybrany zaznam z kosiku (gridu i kosiku na serveru)
     *
     * 24.10.17 on;
     */
    csRemoveRecordByIdx: function(idx) {
        var i,
            oRec,
            grid = this.getCmp('gridpnl');
        // vymaz z gridu
        for (i = (grid.store.data.length - 1); i >= 0; i--) {
            oRec = grid.store.data.items[i];
            if (oRec.data.idx === idx) {
                grid.store.remove(oRec);
            }
        }
        // vymaz z kosiku na serveru
        this.csOnDelete(idx, {
            csCallback: i3.ui.Basket.csSetBasketTitle,
            csScope: this
        });
    },
    /*
     * Vymaz zaznamu.
     *
     * 04.01.19 on;
     */
    csDeleteRecords: function() {
        var i,
            sLoc;
        var grid = this.getCmp('gridpnl');
        // seznam vybranych zaznamu
        var pRecs = grid.getSelectionModel().getSelections();
        if ((!pRecs) || (pRecs.length <= 0)) {
            i3.alert(i3.ui.Basket.tx.txNoRecord);
            return;
        }
        // 21.01.19 on; mozna kontrola lokace
        if (!i3.isEmptyString(this.csMainForm.csBasketDeleteHoldingLocationLimit)) {
            for (i = 0; i < pRecs.length; i++) {
                sLoc = pRecs[i].data.record.getTag('100l');
                if (this.csMainForm.csBasketDeleteHoldingLocationLimit.toUpperCase() !== sLoc.toUpperCase()) {
                    i3.alert(i3.fillInParams(i3.ui.Basket.tx.txWrongLocation, [sLoc]));
                    return;
                }
            }
        }
        // dotaz na vymaz
        Ext.Msg.show({
            msg: i3.ui.Basket.tx.txReallyDelete,
            buttons: i3.ui.YesNo,
            fn: function(pButtonId) {
                if (pButtonId === 'yes') {
                    this.csDeleteRecords2(pRecs);
                    return;
                }
                return;
            },
            icon: 'icon-question',
            scope: this
        });
    },
    csDeleteRecords2: function(pRecs) {
        var sResult = '';
        (function() {
            var node,
                self = arguments.callee;
            node = pRecs.shift();
            if (node) {
                i3.WS.update({
                    operation: 'delete',
                    success: function( /*oMARC_rec*/ ) {
                        // ok
                        if (sResult !== '') {
                            sResult += '<br>';
                        }
                        sResult += node.data.df + ': ' + i3.ui.Basket.tx.txDeletedMsg;
                        // pokud probehl vymaz v poradku, zavola rekurzivne funkci pro dalsi holding
                        setTimeout(self, 10);
                    },
                    failure: function(msg) {
                        // db update failed
                        var m = new i3.WS.Msg(msg);
                        //i3.alert(i3.ui.DataTable.tx.txUpdateFailedMsgTit, m.userText);
                        if (sResult !== '') {
                            sResult += '<br>';
                        }
                        sResult += node.data.df + ': ' + m.userText;
                    },
                    scope: this
                }, node.data.record);
            } else {
                // vymaz vsech zaznamu byl v poradku, zobrazi dialog
                i3.alert(sResult);
            }
        })();
    },
    /*
     * Vyrazeni exemplaru.
     * 
     * 08.04.20 on; 
     */
    csHoldingDisposal: function() {
        var i,
            oRec,
            grid = this.getCmp('gridpnl'),
            aIdArr = [],
            sDb = '',
            sDf;
        // seznam vybranych zaznamu
        var pRecs = grid.getSelectionModel().getSelections();
        if ((!pRecs) || (pRecs.length <= 0)) {
            i3.alert(i3.ui.Basket.tx.txNoRecord);
            return;
        }
        for (i = 0; i < pRecs.length; i++) {
            oRec = pRecs[i];
            if (sDb === '') {
                sDb = oRec.data.idx.piece('*', 1);
            }
            // pouze holdingy
            if (i3.csGetDbFormat(oRec.data.idx.piece('*', 1)) !== 'H') {
                sDf = oRec.data.df;
                if (i3.isEmptyString(sDf)) {
                    sDf = oRec.data.idx;
                }
                i3.alert(i3.fillInParams(i3.ui.Basket.tx.txNoHoldingRecord, [sDf]));
                return;
            }
            // musi jit o zaznamy ze stejne db
            if (sDb !== oRec.data.idx.piece('*', 1)) {
                i3.alert(i3.ui.Basket.tx.txJoinMoreDb);
                return;
            }
            aIdArr.push(oRec.data.idx.piece('*', 2));
        }
        this.csHoldingDisposal2(sDb, aIdArr);
    },
    csHoldingDisposal2: function(psDb, paIdArr) {
        // zjistim nazev db, zatim predpokladam, ze jde o zaznamy z jedne db
        if (!paIdArr || (paIdArr.length === 0)) {
            return;
        }
        // dialog pro zadani parametru
        i3.ui.csOpenColWin({
            title: i3.cat.hold.form.tx.txDisposal,
            CsPanel: i3.comp.catHoldingDisposeForm,
            width: 600,
            csHideHelp: true
            //y: 20 // okno se nebude vertikalne zarovnat na stred, ale bude odsazeno od horniho okraje
        }, {
            csLinRecord: {
                //t100a : '',
                //t100b : '<new>'
                //t100c : ''
            },
            csMainForm: this,
            csOnAfterOK: function(pLinRec) {
                this.csHoldingDisposal3(psDb, paIdArr, pLinRec);
            },
            csOnAfterOKScope: this
        });
    },
    csHoldingDisposal3: function(psDb, paArrID, pLinRec) {
        if (!pLinRec) {
            return;
        }
        var CDELIM = '\x1f';
        var CSPACECHAR = '\xa4';
        // pobocka
        var sBranch = this.csMainForm.csBranch || '';
        sBranch = sBranch.strswap(' ', CSPACECHAR);
        if (sBranch === '') {
            sBranch = '.';
        }
        var sSecClass = i3.WS.getCommandGroupClass('disposal');
        // stav
        var sStatus = pLinRec.t100a;
        //sStatus = sStatus.strswap(' ', CSPACECHAR);
        //if (sStatus === '') {
        //  sStatus = '.';
        //}
        // ubytkove cislo
        var sTrNo = pLinRec.t100b;
        //sTrNo = sTrNo.strswap(' ', CSPACECHAR);
        //if (sTrNo === '') {
        //  sTrNo = '.';
        //}
        // info
        var sInfo = pLinRec.t100c;
        // vyradit titul?
        var sDispose = '2';
        // natvrdo - Titul nevyřadit a neoznačit jako deziderátum
        // vyradit holdingu s trx
        var sDisposeTRX = '1';
        // natvrdo - Vyřadit holdingy s transakcí
        // vysledek vyrazeni
        var sResult = '';
        var that = this;
        (function() {
            var t001,
                self = arguments.callee;
            t001 = paArrID.shift();
            if (t001) {
                i3.WS.commandURC({
                    command: 'disposal ' + psDb + ' ' + CDELIM + 'dis' + CDELIM + t001 + CDELIM + sTrNo + CDELIM + sStatus + CDELIM + sInfo + CDELIM + sDispose + CDELIM + sBranch + CDELIM + sDisposeTRX,
                    classn: sSecClass,
                    success: function(psResp) {
                        // prelozi kod do srozumitelne podoby
                        var m = new i3.WS.Msg(psResp);
                        if (sResult !== '') {
                            sResult += '<br>';
                        }
                        sResult += m.userText;
                        // pokud probehlo vyrazeni v poradku, zavola rekurzivne funkci pro dalsi holding
                        setTimeout(self, 10);
                    },
                    scope: this
                });
            } else {
                // vyrazeni vsech zaznamu bylo v poradku, zobrazi dialog
                i3.alert(sResult);
            }
        })();
    }
});
/**
 * @class i3.ui.Basket
 *
 */
Ext.apply(i3.ui.Basket, {
    /*
     * Funkce pro nacteni holdingu do kosiku
     *
     */
    csOnHoldingsToBasket: function() {
        // volat popup okienko pre vstup zaznamu
        i3.ui.csOpenDataWin({
            title: i3.ui.Basket.tx.txHoldingsToBasket,
            CsPanel: i3.ui.Basket.H2BForm,
            width: 600
            //y: 20 // okno se nebude vertikalne zarovnat na stred, ale bude odsazeno od horniho okraje
        }, {
            csHolDBName: this.csDbCat + 'H',
            csBranch: this.csBranch, // 21.11.16 on;
            //csShortDFBibAuto: this.csShortDFBib,
            //csTitleRec: {},
            csMainForm: this,
            csOnAfterOK: function() {
                /*i3.Inventory.csInventoryName = pLinRec.t100a;
                 // aktualizovat titulok/status okna*/
                this.csSetupStatusLine();
            },
            csOnAfterOKScope: this,
            csOnNew: function() {
                this.csLinRecord = {};
            }
        });
    },
    csAddToBasket: function(idx, config) {
        var m,
            sDb;
        sDb = idx.piece('*', 1);
        // zavola metodu na serveru
        i3.WS.command({
            db: sDb,
            params: 'add|' + idx,
            command: 'basket',
            // o-je cely JSON s vysledkom
            success: function(o) {
                if (o && (o.ret_code === '0')) {
                    var oResult = o.data[0];
                    if (!i3.isEmptyString(oResult.ErrorMessage)) {
                        // zobrazi chybu a skonci
                        m = new i3.WS.Msg(oResult.ErrorMessage + '#' + oResult.ErrorMessageDef);
                        i3.alert(m.userText);
                        return;
                    }
                    /*var s = oResult.OKMessage;
                    s = s.strswap('#', ' - ');
                    s = s.strswap('|', '<br>');*/
                    // vybavit ho
                    if (config && config.csOKCallback) {
                        config.csOKCallback.call(config.csOKCallbackScope || this, oResult);
                    }
                } else {
                    m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
                    i3.displayError(m.userText);
                }
            },
            scope: this
        });
    },
    /**
     * Info o kosiku.
     */
    csBasketInfo: function(psDbName, config) {
        var m;
        // zavola metodu na serveru
        i3.WS.command({
            db: psDbName,
            params: 'info',
            command: 'basket',
            // o-je cely JSON s vysledkom
            success: function(o) {
                if (o && (o.ret_code === '0')) {
                    var oResult = o.data[0];
                    if (!i3.isEmptyString(oResult.ErrorMessage)) {
                        // zobrazi chybu a skonci
                        m = new i3.WS.Msg(oResult.ErrorMessage + '#' + oResult.ErrorMessageDef);
                        i3.alert(m.userText);
                        return;
                    }
                    /*var s = oResult.OKMessage;
                    s = s.strswap('#', ' - ');
                    s = s.strswap('|', '<br>');*/
                    //i3.alert(oResult);
                    // vybavi callback
                    if (config && config.csOKCallback) {
                        config.csOKCallback.call(config.csOKCallbackScope || this, oResult);
                    }
                } else {
                    m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
                    i3.displayError(m.userText);
                }
            },
            scope: this
        });
    },
    /*
     * 11.08.17 on; presun sem
     * 09.09.16 on; aktualizuje pocet zaznamu v kosiku
     */
    csSetBasketTitle: function() {
        i3.ui.Basket.csBasketInfo(i3.WS.getDfltUnTablesd(), {
            //csOKCallback : this.csSetBasketTitle2,
            csOKCallback: i3.ui.Basket.csSetBasketTitle2,
            csOKCallbackScope: this
        });
    },
    csSetBasketTitle2: function(psResult) {
        if ((!i3.isEmptyString(psResult)) && (psResult.piece('#', 1) === i3.ui.Basket.c.txOK)) {
            var s = psResult.piece('#', 2);
            // kosik nemusi byt zapojeny
            var c = Ext.getCmp('pbBasket');
            if (c) {
                c.setText(i3.ui.DataTable.tx.txInBasket + ' (' + s + ')');
            }
        } else {
            var m = new i3.WS.Msg(psResult);
            i3.displayError(m.userText);
        }
    }
});
/**
 * @class i3.ui.Basket.H2BForm
 * Formular pro nacteni holdingu do kosiku.
 *
 */
i3.ui.Basket.H2BForm = Ext.extend(i3.ui.ColPanel, {
    constructor: function(config) {
        config = config || {};
        Ext.apply(config, {
            //layout: 'form',
            layout: 'column',
            items: [{
                //xtype: 'panel',
                //width: '100%',
                //layout: 'column',
                //items: [{
                xtype: 'panel',
                width: '25%',
                layout: 'form',
                labelAlign: 'top',
                items: [{
                    xtype: 'cs_combo_st',
                    id: 'basket_index',
                    fieldLabel: i3.ui.Basket.tx.txIndex,
                    anchor: '-5',
                    csStatTableN: 'CAT_BASKETINDEXLIST',
                    csAutoSelectFirst: true
                }]
            }, {
                xtype: 'panel',
                width: '55%',
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    id: 'basket_value',
                    fieldLabel: i3.ui.Basket.tx.txValue,
                    anchor: '-5',
                    listeners: { // reakce na enter
                        specialkey: function(field, el) {
                            if (el.getKey() === Ext.EventObject.ENTER) {
                                this.csSearchAndAddToBasket();
                            }
                        },
                        render: function(cmp) {
                            // nastavi focus na pole pro zapis caroveho kodu
                            cmp.focus(true, 100);
                        },
                        scope: this
                    }
                }]
            }, {
                xtype: 'panel',
                width: '20%',
                layout: 'form',
                items: [{
                    xtype: 'button',
                    text: i3.ui.Basket.tx.txAdd,
                    style: 'padding-top: 20px',
                    anchor: '-5',
                    listeners: {
                        click: {
                            fn: function() {
                                this.csSearchAndAddToBasket();
                            },
                            scope: this
                        }
                    }
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                height: 20,
                items: [{
                    xtype: 'label',
                    text: '',
                    id: 'basket_lbl',
                    //style: 'font-weight: bold; font-size: medium; color: red'
                    style: 'font-size: small'
                }]
            }],
            buttons: [{
                text: i3.ui.Basket.tx.txClose,
                listeners: {
                    click: {
                        fn: function() {
                            this.ownerCt.close();
                        },
                        scope: this
                    }
                }
            }]
        });
        i3.ui.Basket.H2BForm.superclass.constructor.call(this, config);
    },
    /**
     * Zapise text do labelu na formulari.
     */
    csSetLabelText: function(text) {
        var c;
        c = Ext.getCmp('basket_lbl');
        if (c) {
            if (text === '') {
                c.setVisible(false);
            } else {
                c.setText(text);
                c.setVisible(true);
            }
        }
    },
    csSearchAndAddToBasket: function() {
        var c,
            sIndex = '',
            sIndexName = '',
            sValue = '';
        this.csSetLabelText('');
        c = Ext.getCmp('basket_index');
        if (c) {
            sIndex = c.getValue();
            sIndexName = c.lastSelectionText;
        }
        c = Ext.getCmp('basket_value');
        if (c) {
            sValue = c.getValue();
        }
        this.csSearchAndAddToBasket2(this.csHolDBName, sIndex, sIndexName, sValue, this.csBranch);
        // vybere text v poli, aby se mohlo snimat dal
        if (c) {
            c.selectText();
        }
    },
    /**
     * Vyhleda zaznam podle indexu v db a pokud ho najde, prida ho do kosiku
     *
     * @param {Object} psDbName
     * @param {Object} psIndex
     * @param {Object} psValue
     */
    csSearchAndAddToBasket2: function(psDbName, psIndex, psIndexName, psValue, psBranch) {
        // vyhleda zaznam holdingu
        var store = new i3.WS.StoreSearch({});
        var that = this;
        // poskladat vybrane PQF atributy pre search
        var oAttParams = {
            "1": psIndex
        };
        store.setSearchQuery(oAttParams, psValue);
        store.baseParams.db = psDbName;
        // nastavi skrytou limitu
        this.csSetupSearchLimits(store, psBranch);
        store.on('load', function() {
            var oJSON = this.reader.jsonData;
            // ocakame, ze data pridu vo formate vhodnom pre konfig zaznam i3.Marc,
            // ale jedna sa len o data, nie o objekty triedy "i3.Marc"
            // muze prijit maximalne jeden zaznam
            if (oJSON.records.length > 1) {
                //i3.displayError(String.format(i3.ui.Basket.tx.rsERRFoundMoreHol, oJSON.records.length, psIndexName, psValue));
                that.csSetLabelText(String.format(i3.ui.Basket.tx.rsERRFoundMoreHol, oJSON.records.length, psIndexName, psValue));
                return;
            }
            if (oJSON.records.length === 0) {
                //i3.displayError(String.format(i3.ui.Basket.tx.rsERRNotFound, psIndexName, psValue));
                that.csSetLabelText(String.format(i3.ui.Basket.tx.rsERRNotFound, psIndexName, psValue));
                return;
            }
            var s = i3.className2LName(oJSON.records[0].classn) + '*' + oJSON.records[0].t001;
            i3.ui.Basket.csAddToBasket(s, {
                csOKCallback: that.csSearchAndAddToBasket3.createDelegate(that, [psIndexName, psValue], 1)
                // neni potreba diky createdelegate
                //csOKCallbackScope: that
            });
        }, store, {});
        // loading the store starts the search
        store.load();
    },
    csSearchAndAddToBasket3: function(s, psIndexName, psValue) {
        if (!i3.isEmptyString(s) && (s.piece('#', 1) === i3.ui.Basket.c.txOK)) {
            this.csSetLabelText(String.format(i3.ui.Basket.tx.rsINFAdded, psIndexName, psValue));
        } else {
            var m = new i3.WS.Msg(s);
            i3.displayError(m.userText);
        }
        // aktualizuje zobrazeni poctu holdingu v kosiku
        //this.csMainForm.csSetBasketTitle();
        i3.ui.Basket.csSetBasketTitle();
    },
    /**
     * Nastavenie limit
     * @param {Object} pStore        - search store
     * @param {String} psBranch      - data limit
     *
     * 11.04.12 on;
     */
    csSetupSearchLimits: function(pStore, psBranch) {
        // zjisti jestli jsou nastavene sktyte limity pro danou db
        var s = i3.WS.sXlate('CLIENT_CFG', 'Webcat' + pStore.baseParams.db + 'Limits');
        if (s !== '') {
            // nahradi pobocku
            if (psBranch === undefined) {
                psBranch = '';
            }
            s = s.strswap('%BRANCH%', psBranch);
            pStore.baseParams.query = this.csAddLimit(s, pStore.baseParams.query);
        }
    },
    /**
     * Makro pre skladanie limit casti PQF query<br>
     *
     * @param {Object} pLim
     * @param {Object} pPQF
     *
     * 11.04.12 on;
     */
    csAddLimit: function(pLim, pPQF, pOper) {
        if (pPQF === '') { // pokud je zaslana otazka prazdna, vratime limitu
            return pLim;
        }
        if (pLim === '') { // pokud je prazdna, proste vratime PQF
            return pPQF;
        }
        if (!pOper) {
            pOper = '@and';
        }
        // pridavame limitu cez AND
        return pOper + ' ' + pLim + ' ' + pPQF;
    }
});
/**
 * @class i3.ui.Basket.DisposeListForm
 * Formular pro kriteria predbezneho vyrazovaciho seznamu.
 *
 */
i3.ui.Basket.DisposeListForm = Ext.extend(i3.ui.ColPanel, {
    constructor: function(config) {
        var sHiddenFields;
        // 23.02.on; moznost skryt vybrana pole
        sHiddenFields = i3.csBasketPreliminaryDisposeListHiddenFields || '';
        config = config || {};
        Ext.apply(config, {
            //layout: 'form',
            layout: 'column',
            items: [{
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                hidden: (sHiddenFields.indexOf('100a') >= 0),
                items: [{
                    xtype: 'textfield',
                    fieldLabel: i3.ui.Basket.tx.txDbName,
                    anchor: '-5',
                    name: 't100a',
                    nameSpace: 'a',
                    disabled: true
                }]
            }, {
                xtype: 'panel',
                width: 0,
                cls: 'x-form-clear-left'
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                hidden: (sHiddenFields.indexOf('100b') >= 0),
                items: [{
                    xtype: 'combo',
                    fieldLabel: i3.ui.Basket.tx.txDisposeListName,
                    anchor: '-5',
                    name: 't100b',
                    nameSpace: 'a',
                    allowBlank: false,
                    listeners: {
                        beforequery: function(queryEvent) {
                            this.csSetupStore(queryEvent.combo.store, queryEvent.combo.getValue());
                            return true;
                        },
                        scope: this
                    },
                    store: new i3.WS.StoreScan({
                        autoLoad: false,
                        baseParams: {
                            db: i3.lName2className(config.csLinRecord.t100a)
                        }
                    }),
                    displayField: 'term',
                    typeAhead: false, // 01.09.11 on; zmena na false - divne se to chovalo, kdyz jsem rucne psat db, ktera neexistovala
                    //triggerAction : 'all',  // 25.01.12 on; zrusene - problem s prepisovanim obsahu po tomto postupu:
                    // 1) vepsat CmConfig
                    // 2) rozkliknout (tim se to sroluje)
                    // 3) znovu rozkliknout
                    // 4) pomalu psat
                    minChars: 99, // toto je zatial ?docasne - deaktivuje auto reload po X znakoch
                    selectOnFocus: true,
                    //allowBlank : false, //,lazyInit: true
                    resizable: true,
                    // 29.07.10 on; zrusene, toto zpusobovalo, ze se nedal zapsat nazev DB rucne pred nactenim comboboxu true -> false
                    forceSelection: false, // True to restrict the selected value to one of the values in the list..
                    autoSelect: false, // 01.09.11 on; toto se mne zda lepsi, ze se v seznamu automaticky neoznaci prvni prvek, ale musi si uzivatel sam vybrat,
                    // navic pri true skocil sem tam vyber na druhou polozku seznamu - zatim nefunguje
                    queryDelay: 50 // 01.09.11 on;
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                labelAlign: 'top',
                hidden: (sHiddenFields.indexOf('100c') >= 0),
                items: [{
                    xtype: 'cs_combo_st',
                    fieldLabel: i3.ui.Basket.tx.txReason,
                    anchor: '-5',
                    csStatTableN: 'DISPOSE',
                    name: 't100c',
                    nameSpace: 'a',
                    csValidate: false
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                labelAlign: 'top',
                hidden: (sHiddenFields.indexOf('100d') >= 0),
                items: [{
                    xtype: 'cs_combo_st',
                    fieldLabel: i3.ui.Basket.tx.txDocumentCondition,
                    anchor: '-5',
                    csStatTableN: 'CONDITION',
                    name: 't100d',
                    nameSpace: 'a',
                    csValidate: false
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                labelAlign: 'top',
                hidden: (sHiddenFields.indexOf('100e') >= 0),
                items: [{
                    xtype: 'cs_combo_st',
                    fieldLabel: i3.ui.Basket.tx.txBlock,
                    anchor: '-5',
                    csStatTableN: 'UNH_200L',
                    name: 't100e',
                    nameSpace: 'a',
                    csValidate: false
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                labelAlign: 'top',
                hidden: (sHiddenFields.indexOf('100f') >= 0),
                items: [{
                    xtype: 'cs_combo_st',
                    fieldLabel: i3.ui.Basket.tx.txNextProcTitle + " <img src='../images/icons/help.png' onclick='i3.alert(\"" + i3.ui.Basket.tx.tx969fHelp + "\")' onmouseover='' style='cursor: pointer;' />",
                    anchor: '-5',
                    csStatTableN: 'UN_T969F',
                    name: 't100f',
                    nameSpace: 'a',
                    csValidate: false
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                labelAlign: 'top',
                hidden: (sHiddenFields.indexOf('100g') >= 0),
                items: [{
                    xtype: 'cs_combo_st',
                    fieldLabel: i3.ui.Basket.tx.txNextProcHolding,
                    anchor: '-5',
                    csStatTableN: 'STABLE_ST_UNH_969f',
                    name: 't100g',
                    nameSpace: 'a',
                    csValidate: false
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                //height: 20,
                items: [{
                    xtype: 'label',
                    html: i3.ui.Basket.tx.txInfo,
                    style: 'font-size: small'
                }]
            }]
        });
        i3.ui.Basket.DisposeListForm.superclass.constructor.call(this, config);
    },
    /**
     * Nastavi parametry store pri hledani nazvu vyrazovacich seznamu.
     *
     */
    csSetupStore: function(pStore, psValue) {
        pStore.setScanQuery(2415, psValue, 0, '');
        pStore.load();
    }
});
