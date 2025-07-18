/*
 * Inventarizacni funkce.
 *
 * 08.03.24 on; moznost nastavit, aby pri nenalezeni tagu 500 vratil chybu
 * 19.10.22 on; moznost nevalidovat nazev inventarizace
 * 26.09.19 on; vynucen vyber existujiciho nazvu inventarizace
 * 21.06.18 on; generovani pole 500
 * 02.05.16 on; uprava pole pro ZF
 * 20.10.14 on; oprava inventarisation
 * 15.05.14 on; doresena arabstina
 * 21.03.14 on; arabstina
 * 05.06.13 on; oprava textu signature -> call number
 * 09.07.12 on; doplneno oznaceni Hodnoty po inventarizaci + rolovani logu
 * 15.06.12 on; prvni verze
 */
/*global Ext,i3 */
Ext.ns('i3.Inventory');
i3.Inventory.tx = { //
    txInventoryName: 'Názov inventarizácie#Název inventarizace#Inventory name###اسم الجرد'.ls(),
    txInventory: 'Inventarizácia#Inventarizace#Inventory###الجرد'.ls(),
    txInventory2: 'inventarizácia#inventarizace#inventory###الجرد'.ls(),
    txInventoryInit: 'Inicializácia inventarizácie#Inicializace inventarizace#Inventory init###البدء بالجرد'.ls(),
    txDbName: 'Databáza#Databáze#Database###قاعدة البيانات'.ls(),
    txIndex: 'Index#Index#Index###كشاف'.ls(),
    txValue: 'Hodnota#Hodnota#Value###قيمة'.ls(),
    txRun: 'Spustiť inventarizáciu#Spustit inventarizaci#Run Inventory###تنفيذ الجرد'.ls(),
    txChangeValues: 'Zmeniť hodnoty#Změnit hodnoty#Change values###تغيير القيم'.ls(),
    txInvStatus: 'Status inventarizácie#Status inventarizace#Inventory Status###وضع الجرد'.ls(),
    txSignature: 'Signatúra#Signatura#Call number###رقم الطلب'.ls(),
    txTrNo: 'Prírastkové číslo#Přírůstkové číslo#Track Number###رقم المسار'.ls(),
    txBarcode: 'Čiarový kód#Čárový kód#Barcode###الباركود'.ls(),
    txNote: 'Poznámka#Poznámka#Note###ملاحظة'.ls(),
    txSaveRecord: 'Uložiť záznam#Uložit záznam#Save Record###احفظ التسجيلة'.ls(),
    txClose: 'Zavrieť#Zavřít#Close###أغلق'.ls(),
    txErrorLog: 'Chybový log#Chybový log#Error log###خطأ في الدخول'.ls(),
    rsErrIndexEmpty: 'Index je prázdny.#Index je prázdný.#Index is empty.###الكشاف فارغ.'.ls(),
    rsErrDbEmpty: 'Názov databázy je prázdny.#Název databáze je prázdný.#Database name is empty.###اسم قاعدة البيانات فارغ.'.ls(),
    rsErrInvNameEmpty: 'Názov invetarizácie nie je nastavený.#Název inventarizace není nastavený.#Inventory name isn\'t set.###لم يتم إعداد اسم الجرد.'.ls(),
    rsErrValueEmpty: 'Pole Hodnota nemôže byť prázdne.#Pole Hodnota nemůže být prázdné.#Field Value could not be empty.###لا يمكن لقيمة الحقل أن تكون فارغة.'.ls(),
    rsERRFoundMoreHol: 'Bolo najdených viac holdingov ({0}) s \'{1}={2}\'.#Bylo nalezeno více holdingů ({0}) s \'{1}={2}\'.#Found more Holdings ({0}) with \'{1}={2}\'.###العثور على مقتنيات أخرى  ({0}) بـ {1}={2}'.ls(),
    rsERRNotFound: 'Holding s \'{0}={1}\' nebol nájdený.#Holding s \'{0}={1}\' nenalezen.#Holding with \'{0}={1}\' not found.###لم يتم العثور على مقتنيات بـ {0}={1}'.ls(),
    rsERRInvTagNotFound: 'Inventarizačný tág s názvom \'{0}\' nebol nájdený v záznamu holdingu.#Inventarizační tag s názvem \'{0}\' nebyl nelezen v záznamu holdingu.#Inventory tag with Inventory name \'{0}\' not found in holding record.###لم يتم العثور على علامة الجرد مع اسم الجرد {0} في سجل المقتنيات.'.ls(),
    rsINFNoChange: 'Žiadna zmena v zázname.#Žádná změna v záznamu.#Nothing changes in record.###لم يتغير شئ في التسجيلة.'.ls(),
    rsINFRecSaved: 'Záznam bol uložený.#Záznam byl uložen.#Record saved.###تم حفظ التسجيلة.'.ls(),
    rsINFRecOK: 'Inventarizácia prebehla úspešne zo statusom \'{0}\'.#Inventarizace proběhla úspěšně se statusem \'{0}\'.#Inventarisation finished successfully with Status \'{0}\'.###انتهت عملية الجرد بنجاح بالحالة {0}.'.ls(),
    rsCAPTitle: 'Názov#Název#Title###العنوان'.ls(),
    rsCAPLocation: 'Lokácia#Lokace#Location###مكان'.ls(),
    rsCAPDisLocation: 'Dislokácia#Dislokace#Dislocation###إزالة المكان'.ls(),
    rsCAPTrackno: 'Prírastkové číslo#Přírůstkové číslo#Trackno###رقم المسار'.ls(),
    rsCAPSignature: 'Signatúra#Signatura#Call number###رقم الطلب'.ls(),
    rsCAPBarcode: 'Čiarový kód#Čárový kód#Barcode###الباركود'.ls(),
    rsCAPNote: 'Poznámka#Poznámka#Note###ملاحظة'.ls()
};
/**
 * @class i3.Inventory.invNameForm
 * Formular pro vyber nazvu inventarizace.
 *
 */
i3.Inventory.invNameForm = Ext.extend(i3.ui.ColPanel, {
    constructor: function(config) {
        config = config || {};
        Ext.apply(config, {
            layout: 'form',
            items: [{
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                items: [{
                    xtype: 'combo',
                    fieldLabel: i3.Inventory.tx.txInventoryName,
                    anchor: i3.c.anchorBase,
                    name: 't100a',
                    nameSpace: 'a',
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
                            db: config.csDbName
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
                    // 19.10.22 on; moznost nevalidovat nazev inventarizace
                    // 26.09.19 on; zmena false -> true, potrebuju jen uz existujici inventarizace
                    //forceSelection: true, // True to restrict the selected value to one of the values in the list..
                    forceSelection: config.csInventoryValidateName,
                    autoSelect: false, // 01.09.11 on; toto se mne zda lepsi, ze se v seznamu automaticky neoznaci prvni prvek, ale musi si uzivatel sam vybrat,
                    // navic pri true skocil sem tam vyber na druhou polozku seznamu - zatim nefunguje
                    queryDelay: 50 // 01.09.11 on;
                }]
            }]
        });
        i3.Inventory.invNameForm.superclass.constructor.call(this, config);
    },
    /**
     * Nastavi parametry store pri hledani nazvu inventarizace.
     *
     */
    csSetupStore: function(pStore, psValue) {
        pStore.setScanQuery(2418, psValue, 0, '');
        pStore.load();
    }
});
/**
 * @class i3.Inventory.invControlForm
 * Formular pro rucni inventarizaci.
 *
 */
i3.Inventory.invControlForm = Ext.extend(i3.ui.ColPanel, {
    constructor: function(config) {
        config = config || {};
        Ext.apply(config, {
            layout: 'column',
            // predefimnuje tlacitka
            buttons: [{
                text: i3.Inventory.tx.txClose,
                listeners: {
                    click: {
                        fn: function() {
                            this.ownerCt.close();
                        },
                        scope: this
                    }
                }
            }],
            items: [{
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: i3.Inventory.tx.txDbName,
                    anchor: i3.c.anchorBase,
                    name: 't100a',
                    nameSpace: 'a',
                    disabled: true
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: i3.Inventory.tx.txInventoryName,
                    anchor: i3.c.anchorBase,
                    name: 't100b',
                    nameSpace: 'a',
                    disabled: true
                }]
            }, {
                xtype: 'panel',
                width: '25%',
                layout: 'form',
                labelAlign: 'top',
                items: [{
                    xtype: 'cs_combo_st',
                    fieldLabel: i3.Inventory.tx.txIndex,
                    // k poli se musi pristupovat pres ID, protoze jinak dochazi k jeho vymazu pri 2. zobrazeni formulare
                    //name : 't100c',
                    //nameSpace : 'a',
                    anchor: i3.c.anchorBase,
                    id: 'inv_index',
                    csStatTableN: 'CAT_INVENTORY_INDEX',
                    csAutoSelectFirst: true
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: i3.Inventory.tx.txValue,
                    anchor: i3.c.anchorBase,
                    name: 't100d',
                    nameSpace: 'a',
                    id: 'inv_value',
                    listeners: { // reakce na enter
                        specialkey: function(field, el) {
                            if (el.getKey() === Ext.EventObject.ENTER) {
                                this.csForm2Record();
                                config.csMainForm.csOnInventoryRun(this.csLinRecord, this.csBranch, this.baseParams);
                            }
                        },
                        scope: this
                    }
                }]
            }, {
                xtype: 'panel',
                width: '25%',
                layout: 'form',
                items: [{
                    xtype: 'button',
                    text: i3.Inventory.tx.txRun,
                    anchor: i3.c.anchorBase,
                    style: 'padding-top: 18px', // zarovnani tlacitka
                    handler: function() {
                        this.csForm2Record();
                        config.csMainForm.csOnInventoryRun(this.csLinRecord, this.csBranch, this.baseParams);
                    },
                    scope: this
                }]
            }, {
                //xtype : 'panel', // nazev
                //width : '100%',
                //layout : 'form',
                // labelAlign : 'top', // musi byt uvedene explicitne (inak nefunguje u klonov)
                // items : [{
                xtype: 'displayfield',
                fieldLabel: '',
                anchor: i3.c.anchorBase,
                height: 115, // 02.05.16 on; zvetsena velikost
                id: 'inv_table',
                width: '100%',
                autoScroll: true // 02.05.16 on; doplnen scrollbar
                //grow : true,
                //growMax : 100
                //}]
            }, {
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                items: [{
                    //dynamic : true,
                    xtype: 'fieldset',
                    style: 'padding-left: 5px',
                    title: i3.Inventory.tx.txChangeValues,
                    nameSpace: 'a200',
                    autoHeight: true,
                    name: 't200', // just for help
                    layout: 'column',
                    width: '100%',
                    items: [{
                        xtype: 'panel',
                        width: '34%',
                        layout: 'form',
                        labelAlign: 'top',
                        items: [{
                            xtype: 'cs_combo_st',
                            fieldLabel: i3.Inventory.tx.txInvStatus,
                            //name : 't200a',
                            //nameSpace : 'a',
                            anchor: i3.c.anchorBase,
                            csStatTableN: 'INVENTORY_STATUS',
                            csAutoSelectFirst: true,
                            csDisplayID: true,
                            id: 'inv_status'
                        }]
                    }, {
                        xtype: 'panel',
                        width: '33%',
                        layout: 'form',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: i3.Inventory.tx.txSignature,
                            anchor: i3.c.anchorBase,
                            //name : 't200b'
                            //nameSpace : 'a'
                            id: 'inv_signature'
                        }]
                    }, {
                        xtype: 'panel',
                        width: '33%',
                        layout: 'form',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: i3.Inventory.tx.txTrNo,
                            anchor: i3.c.anchorBase,
                            //name : 't200c'
                            //nameSpace : 'a'
                            id: 'inv_trnumber'
                        }]
                    }, {
                        xtype: 'panel',
                        width: '34%',
                        layout: 'form',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: i3.Inventory.tx.txBarcode,
                            anchor: i3.c.anchorBase,
                            //name : 't200d'
                            //nameSpace : 'a'
                            id: 'inv_barcode'
                        }]
                    }, {
                        xtype: 'panel',
                        width: '33%',
                        layout: 'form',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: i3.Inventory.tx.txNote,
                            anchor: i3.c.anchorBase,
                            //name : 't200e'
                            //nameSpace : 'a'
                            id: 'inv_note'
                        }]
                    }, {
                        xtype: 'panel',
                        width: '33%',
                        layout: 'form',
                        items: [{
                            xtype: 'button',
                            text: i3.Inventory.tx.txSaveRecord,
                            anchor: i3.c.anchorBase,
                            style: 'padding-top: 18px', // zarovnani tlacitka
                            id: 'inv_saverecbtn',
                            handler: function() {
                                this.csForm2Record();
                                // ulozi udaje do holdingu
                                config.csMainForm.csOnSaveRecord(this.csLinRecord);
                            },
                            scope: this
                        }]
                    }]
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                labelAlign: 'top',
                items: [{
                    xtype: 'textarea',
                    fieldLabel: i3.Inventory.tx.txErrorLog,
                    anchor: i3.c.anchorBase,
                    height: 100,
                    id: 'inv_errlog'
                }]
            }]
        });
        i3.Inventory.invControlForm.superclass.constructor.call(this, config);
    },
    /**
     * Nastavi parametry store pri hledani nazvu inventarizace.
     *
     */
    csSetupStore: function(pStore, psValue) {
        pStore.setScanQuery(2418, psValue, 0, '');
        pStore.load();
    }
});
/**
 * @class i3.Inventory

 *
 * Inventarizacni funkce.
 *
 */
Ext.apply(i3.Inventory, {
    // tady bude ulozeny nastaveny nazev inventarizace
    //csInventoryName : '',
    /*
     *  Inicializace inventarizace.
     *
     */
    csOnInventoryInit: function() {
        //alert('ba');
    },
    /*
     *  Vyber nazvu inventarizace.
     *
     */
    csOnInventoryName: function(psDB) {
        // volat popup okienko pre vstup zaznamu
        i3.ui.csOpenDataWin({
            title: i3.Inventory.tx.txInventoryName,
            CsPanel: i3.Inventory.invNameForm,
            width: 300
        }, {
            csDbName: psDB,
            // 19.10.22 on; moznost nevalidovat nazev inventarizace
            csInventoryValidateName: this.csInventoryValidateName,
            csOnAfterOK: function(pLinRec) {
                i3.Inventory.csInventoryName = pLinRec.t100a;
                // aktualizovat titulok/status okna
                this.csSetupStatusLine();
            },
            csOnAfterOKScope: this,
            csOnNew: function() {
                this.csLinRecord = {};
            }
        });
    },
    /*
     *  vrati nastaveny nazev inventarizace
     *
     */
    csGetInventoryName: function() {
        if (!this.csInventoryName) {
            this.csInventoryName = '';
        }
        return this.csInventoryName;
    },
    /*
     *  Rucni inventarizace.
     *
     */
    csOnInventory: function(psDB, psBranch, params) { // volat popup okienko pre vstup zaznamu
        i3.ui.csOpenColWin({
            title: i3.Inventory.tx.txInventory,
            CsPanel: i3.Inventory.invControlForm,
            width: 700
        }, {
            csDbName: psDB,
            csOnAfterOK: function(pLinRec) {},
            //csOnAfterOKScope : this,
            csLinRecord: {
                t100a: i3.className2LName(psDB),
                t100b: this.csInventoryName
            },
            csMainForm: this,
            csBranch: psBranch,
            baseParams: params
        });
        // init
        this.csUpdateActRec();
    },
    /**
     * Vlastni inventarizace podle zadaneho croveho kodu (sign., pr. c., atd)
     */
    csOnInventoryRun: function(pLinRec, psBranch, baseParams) {
        // pLinRec.t100a .. db
        // pLinRec.t100b .. nazev inventarizace
        // pLinRec.t100d .. vyhl. hodnota
        var sDb,
            sInvName,
            sIndex,
            sIndexName,
            sValue;
        // db
        sDb = pLinRec.t100a;
        if ((!sDb) || (sDb === '')) {
            i3.displayError(i3.Inventory.tx.rsErrDbEmpty);
            return 0;
        }
        sDb = i3.lName2className(sDb);
        // nazev inventarizace
        sInvName = pLinRec.t100b;
        if ((!sInvName) || (sInvName === '')) {
            i3.displayError(i3.Inventory.tx.rsErrInvNameEmpty);
            return 0;
        }
        // index
        var c = Ext.getCmp('inv_index');
        if (c) {
            sIndex = c.getValue();
            sIndexName = c.getRawValue();
        } else {
            sIndex = '';
            sIndexName = '';
        }
        if ((!sIndex) || (sIndex === '')) {
            i3.displayError(i3.Inventory.tx.rsErrIndexEmpty);
            return 0;
        }
        // hodnota
        sValue = pLinRec.t100d;
        if ((!sValue) || (sValue === '')) {
            i3.displayError(i3.Inventory.tx.rsErrValueEmpty);
            return 0;
        }
        // vyhleda zaznam holdingu
        var store = new i3.WS.StoreSearch({});
        var that = this;
        // vyhledavat se bude podle kodu zaznamu
        // poskladat vybrane PQF atributy pre search
        var oAttParams = {
            "1": sIndex
        };
        // truncation
        store.setSearchQuery(oAttParams, sValue);
        store.baseParams.db = sDb;
        // nastavi skrytou limitu
        this.csSetupSearchLimits(store, psBranch);
        store.on('load', function() {
            var oJSON = this.reader.jsonData;
            var rec;
            // ocakame, ze data pridu vo formate vhodnom pre konfig zaznam i3.Marc,
            // ale jedna sa len o data, nie o objekty triedy "i3.Marc"
            // muze prijit maximalne jeden zaznam
            if (oJSON.records.length > 1) {
                // pujde do logu
                //i3.displayError(String.format(i3.Inventory.tx.rsERRFoundMoreHol, sIndexName, sValue));
                that.csLog(String.format(i3.Inventory.tx.rsERRFoundMoreHol, oJSON.records.length, sIndexName, sValue));
                that.csOnInventoryEnd();
                return 0;
            }
            if (oJSON.records.length === 0) {
                // pujde do logu
                //i3.displayError(String.format(i3.Inventory.tx.rsERRNotFound, sIndexName, sValue));
                that.csLog(String.format(i3.Inventory.tx.rsERRNotFound, sIndexName, sValue));
                that.csOnInventoryEnd();
                return 0;
            }
            rec = new i3.Marc(oJSON.records[0]);
            that.csOnInventoryRun2(rec, sInvName, baseParams);
        }, store, {});
        // loading the store starts the search
        store.load();
    },
    /**
     * Pokracovani inventarizace
     */
    csOnInventoryRun2: function(pRec, psInvName, baseParams) {
        var sNewTag500;
        this.csUpdateActRec(pRec);
        // nacte aktualni udaje do poli pro moznou aktualizaci
        Ext.getCmp('inv_signature').setValue(pRec.getTag('100s'));
        Ext.getCmp('inv_trnumber').setValue(pRec.getTag('100t'));
        Ext.getCmp('inv_barcode').setValue(pRec.getTag('100b'));
        Ext.getCmp('inv_status').setValue('');
        Ext.getCmp('inv_note').setValue('');
        // vyhleda v zaznamu tag s nazvem inventarizace, ktery odpovida zadane inv.
        var aT500 = pRec.getTag('500', -1),
            i,
            sTag,
            sA,
            nI = -1;
        for (i = 0; i < aT500.length; i += 1) {
            sTag = aT500[i];
            sA = pRec.getSubTagStr(sTag, 'a');
            // nazev inventarizace (pole $a) odpovida zadanemu nazvu inven.
            if (sA.trim().toUpperCase() === psInvName.trim().toUpperCase()) {
                nI = i;
                Ext.getCmp('inv_status').setValue(pRec.getSubTagStr(sTag, 'b'));
                Ext.getCmp('inv_note').setValue(pRec.getSubTagStr(sTag, 'n'));
                break;
            }
        }
        // status je vzdy 1
        var sStatus = '1';
        // nasel odpovidajici tag 500?
        if (nI === -1) {
            // 08.03.24 on; moznost nastavit, aby pri nenalezeni tagu 500 vratil chybu
            // 21.06.18 on; pokud nenajde odpovidajici tag, vytvori novy
            // pujde do logu
            if (baseParams.csInventoryUseOnlyExistingTag500) {
                this.csLog(String.format(i3.Inventory.tx.rsERRInvTagNotFound, psInvName));
                this.csOnInventoryEnd();
                return;
            }
            sNewTag500 = '500    ' + i3.c.SF + 'a' + psInvName.trim() + // nazev inventarizace
                i3.c.SF + 'b' + sStatus + // status
                i3.c.SF + 'c' + i3.c.dateTimeInt() + // aktualni datum
                i3.c.SF + 'e' + i3.Login.ctx.userName;
            // username
            pRec.appendTag(sNewTag500);
        } else {
            sTag = aT500[nI];
            // aktualizuje v tagu 500 status a datum
            sTag = pRec.setSubTagStr(sTag, 'b', sStatus);
            // datum je aktualni
            sTag = pRec.setSubTagStr(sTag, 'c', i3.c.dateTimeInt());
            aT500[nI] = sTag;
            pRec.setTag(aT500);
        }
        this.csSaveRecord(pRec, {
            // pokud se podari zaznam ulozit, zmeni status ve formulari
            csOKCallback: function() {
                Ext.getCmp('inv_status').setValue(sStatus);
                this.csOnInventoryEnd();
            },
            csOkScope: this,
            csOKMsg: i3.Inventory.tx.rsINFRecOK,
            csMsgParam: sStatus
        });
    },
    /**
     * Po dokonceni inventarizace.
     *
     */
    csOnInventoryEnd: function() {
        // 09.07.12 on; oznaci nasnimany carovy kod
        Ext.getCmp('inv_value').focus(true);
    },
    /**
     * Aktualizuje aktualni zaznam hodlingu
     */
    csUpdateActRec: function(pRec) {
        this.csActRecord = pRec;
        // aktualni zaznam
        var c = Ext.getCmp('inv_saverecbtn');
        if (!c) {
            return 0;
        }
        c.setDisabled(i3.isEmptyObj(pRec));
        this.csLoadRecordDF(pRec);
    },
    /**
     * Aktualizuje zobrazovaci format
     */
    csLoadRecordDF: function(pRec) {
        var sDF = '';
        if (!i3.isEmptyObj(pRec)) {
            /*sDF = sDF + this.csGetTableLine(i3.Inventory.tx.rsCAPTitle, pRec.getTag('T03a'), '', '', '', '');
             sDF = sDF + this.csGetTableLine(i3.Inventory.tx.rsCAPLocation, pRec.getTag('100l'), i3.Inventory.tx.rsCAPSignature, pRec.getTag('100s'));
             sDF = sDF + this.csGetTableLine(i3.Inventory.tx.rsCAPDisLocation, pRec.getTag('100d'), i3.Inventory.tx.rsCAPTrackno, pRec.getTag('100t'));
             sDF = sDF + this.csGetTableLine(i3.Inventory.tx.rsCAPBarcode, pRec.getTag('100b'), i3.Inventory.tx.rsCAPNote, pRec.getTag('300n'));**/
            sDF = sDF + this.csGetTableLine(i3.Inventory.tx.rsCAPTitle, pRec.getTag('T03a'));
            sDF = sDF + this.csGetTableLine(i3.Inventory.tx.rsCAPLocation, pRec.getTag('100l'));
            sDF = sDF + this.csGetTableLine(i3.Inventory.tx.rsCAPSignature, pRec.getTag('100s'));
            sDF = sDF + this.csGetTableLine(i3.Inventory.tx.rsCAPDisLocation, pRec.getTag('100d'));
            sDF = sDF + this.csGetTableLine(i3.Inventory.tx.rsCAPTrackno, pRec.getTag('100t'));
            sDF = sDF + this.csGetTableLine(i3.Inventory.tx.rsCAPBarcode, pRec.getTag('100b'));
            sDF = sDF + this.csGetTableLine(i3.Inventory.tx.rsCAPNote, pRec.getTag('300n'));
        }
        // nahraje ZF
        this.csLoadDF(sDF);
    },
    /**
     * nahraje tabulku do komponenty
     */
    csLoadDF: function(s) {
        /*s = '<html>' + '<head>' + '<title></title>' + '<meta http-equiv="Content-Type" content="text/html; charset=windows-1250">' + //
         '<style type="text/css">' + '<!--' + 'td{font-family: Times New Roman CE; font-size: 11pt; text-align: left;}' + '--->' + '</style>' + //
         '</head>' + '<body topmargin="0" leftmargin="0" rightmargin="0" bottommargin="0" marginheight="0" marginwidth="0">' + //
         '<table border="1" cellpadding="2" cellspacing="1" width="100%">' + s + '</table>' + '</body>' + '</html>';*/
        s = '<table style="border:0; width:100%" cellpadding="2" cellspacing="0">' + s + '</table>';
        var c = Ext.getCmp('inv_table');
        if (!c) {
            return 0;
        }
        c.setValue(s);
    },
    /**
     * vytvori radek tabulky
     */
    /*csGetTableLine : function(psCaption1, psValue1, psCaption2, psValue2) {
     var cNic = '&nbsp;';

     if (!i3.isEmptyString(psCaption1) || !i3.isEmptyString(psValue1) || !i3.isEmptyString(psCaption2) || !i3.isEmptyString(psValue2)) {
     if (i3.isEmptyString(psCaption2) && i3.isEmptyString(psValue2)) {
     // vyjimka pro titul
     return '<tr><td><b>' + psCaption1 + '</b></td><td COLSPAN=5>' + psValue1 + '</td></tr>';
     }

     if (i3.isEmptyString(psCaption1)) {
     psCaption1 = cNic;
     }
     if (i3.isEmptyString(psValue1)) {
     psValue1 = cNic;
     }
     if (i3.isEmptyString(psCaption2)) {
     psCaption2 = cNic;
     }
     if (i3.isEmptyString(psValue2)) {
     psValue2 = cNic;
     }
     return '<tr><td><b>' + psCaption1 + '</b></td><td>' + psValue1 + '</td>' + '<td><b>' + psCaption2 + '</b></td><td>' + psValue2 + '</td></tr>';
     }
     return '';
     },*/
    csGetTableLine: function(psCaption1, psValue1) {
        var cNic = '&nbsp;';
        if (!i3.isEmptyString(psCaption1) || !i3.isEmptyString(psValue1)) {
            if (i3.isEmptyString(psCaption1)) {
                psCaption1 = cNic;
            }
            if (i3.isEmptyString(psValue1)) {
                psValue1 = cNic;
            }
            return '<tr><td><b>' + psCaption1 + '</b></td><td>' + psValue1 + '</td></tr>';
        }
        return '';
    },
    /**
     * Nastavenie limit    *
     * @param {Object} pStore        - search store
     * @param {Object} pLimitsDT     - data limit
     *
     * 11.04.12 on;
     */
    csSetupSearchLimits: function(pStore, psBranch) {
        // zjisti jestli jsou nastavene sktyte limity pro danou db
        var s = i3.WS.sXlate('CLIENT_CFG', 'Inventory' + pStore.baseParams.db + 'Limits');
        if (s !== '') {
            // nahradi pobocku
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
        if (pPQF === '') { // ak je zaslana otazka prazdna, vratime povodnu query - ziadna zmena
            return pLim;
        }
        if (pLim === '') { // ak sucasna limita prazdna, proste vratime pridavany PQF
            return pPQF;
        }
        if (!pOper) {
            pOper = '@and';
        }
        // pridavame limitu cez AND
        return pOper + ' ' + pLim + ' ' + pPQF;
    },
    /**
     * Ulozi zmeny do zaznamu holdingu
     */
    csOnSaveRecord: function(pLinRec) {
        var sDb,
            sInvName,
            sTag,
            sOldTag,
            tmp;
        // cely zaznam
        var oRec = this.csActRecord;
        var bRecChanged = false;
        // db
        sDb = pLinRec.t100a;
        if ((!sDb) || (sDb === '')) {
            i3.displayError(i3.Inventory.tx.rsErrDbEmpty);
            return 0;
        }
        sDb = i3.lName2className(sDb);
        // nazev inventarizace
        sInvName = pLinRec.t100b;
        if ((!sInvName) || (sInvName === '')) {
            i3.displayError(i3.Inventory.tx.rsErrInvNameEmpty);
            return 0;
        }
        // tag 100
        sTag = oRec.getTag('100');
        sOldTag = sTag;
        // signatura
        tmp = Ext.getCmp('inv_signature').getValue().trim();
        if (tmp !== oRec.getSubTagStr(sTag, 's')) {
            sTag = oRec.setSubTagStr(sTag, 's', tmp);
        }
        // pr. cislo
        tmp = Ext.getCmp('inv_trnumber').getValue().trim();
        if (tmp !== oRec.getSubTagStr(sTag, 't')) {
            sTag = oRec.setSubTagStr(sTag, 't', tmp);
        }
        // carovy kod
        tmp = Ext.getCmp('inv_barcode').getValue().trim();
        if (tmp !== oRec.getSubTagStr(sTag, 'b')) {
            sTag = oRec.setSubTagStr(sTag, 'b', tmp);
        }
        if (sTag !== sOldTag) {
            bRecChanged = true;
            oRec.setTag(sTag);
        }
        // vyhleda v zaznamu tag s nazvem inventarizace, ktery odpovida zadane inv.
        var aT500 = oRec.getTag('500', -1),
            i,
            sA,
            nPos = -1,
            bFound = false;
        for (i = 0; i < aT500.length; i += 1) {
            sTag = aT500[i];
            sA = oRec.getSubTagStr(sTag, 'a');
            // nazev inventarizace (pole $a) odpovida zadanemu nazvu inven.
            if (sA.trim().toUpperCase() === sInvName.trim().toUpperCase()) {
                bFound = true;
                nPos = i;
                break;
            }
        }
        if (!bFound) {
            i3.displayError(String.format(i3.Inventory.tx.rsERRInvTagNotFound, sInvName));
            return 0;
        }
        sOldTag = sTag;
        // status
        tmp = Ext.getCmp('inv_status').getValue();
        if (tmp !== oRec.getSubTagStr(sTag, 'b')) {
            sTag = oRec.setSubTagStr(sTag, 'b', tmp);
        }
        // poznamka
        tmp = Ext.getCmp('inv_note').getValue();
        if (tmp !== oRec.getSubTagStr(sTag, 'n')) {
            sTag = oRec.setSubTagStr(sTag, 'n', tmp);
        }
        // nahradim aktualni tag v zaznamu
        i3.assert((nPos >= 0), 'csOnSaveRecord: nPos === 0');
        // nemelo by nastat
        if (sTag !== sOldTag) {
            bRecChanged = true;
            aT500[nPos] = sTag;
            oRec.setTag(aT500);
        }
        if (bRecChanged) {
            // ulozi zaznam do DB
            this.csSaveRecord(oRec);
        } else {
            i3.msg(i3.Inventory.tx.rsINFNoChange);
        }
    },
    /**
     * Ulozi zaznam.
     */
    csSaveRecord: function(pRec, config) {
        i3.WS.update({
            operation: 'update',
            success: function(pRec) {
                if (config && config.csOKMsg) {
                    i3.msg(String.format(config.csOKMsg, config.csMsgParam));
                } else {
                    i3.msg(i3.Inventory.tx.rsINFRecSaved);
                }
                this.csUpdateActRec(pRec);
                if (config && config.csOKCallback) {
                    config.csOKCallback.call(config.csOkScope || this);
                }
            },
            scope: this,
            failure: function(msg) {
                i3.displayError(msg);
            }
        }, pRec);
    },
    /**
     * Prida radek do logu.
     *
     */
    csLog: function(psText) {
        var c = Ext.getCmp('inv_errlog');
        if (c) {
            // 09.07.12 on; zapojen rychlejsi kod (netestoval jsem)
            /*{var s = c.getValue();
             if (s !== '') {
             s = s + '\n';
             }
             s = s + psText;
             c.setValue(s);*/
            var s = c.getValue();
            if (s !== '') {
                psText = '\n' + psText;
            }
            var ta = c.getEl().dom;
            ta.value += psText;
            // rolovani dolu
            ta.scrollTop = ta.scrollHeight;
        }
    }
});
