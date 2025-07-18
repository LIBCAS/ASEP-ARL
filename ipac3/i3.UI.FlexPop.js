/*
 * Obrazovka flexpop.
 *
 * 13.06.24 on; moznost zmenit text ZF
 * 30.04.24 on; zakaze tooltip - je stejne prazdny
 * 26.04.24 on; muze jit o pole (id db a nazev db)
 * 23.02.24 on; moznost omezit vklad do kosiku pro vybrane db
 * 21.09.23 on; pri zmene tridy si musim predat download metodu
 * 25.08.22 on; moznost nastavit limity globalne pro vsechna vyhledavani v aplikaci
 * 18.01.22 on; limity vazane na db
 * 13.01.22 on; zjisti, jestli jsou vybrane nejake limity, aby se spustil search i bez terminu
 * 06.01.22 on; ikona lupy
 * 08.12.21 on; uprava limit
 * 26.11.21 on; rozsireni donwloadExtRec
 * 04.11.21 on; moznost skryt globalne browse
 * 22.10.21 on; potrebuju predat i cislo indexu - nAttrNo
 * 08.06.20 on; moznost skryt globalne scan a checkbox fraze
 * 12.05.20 on; zmena popisku tlacitka OK
 * 06.11.19 on; zmena ikony
 * 02.07.19 on; tabpanel width
 * 01.07.19 on; zmena velikosti hlavniho okna (epca vystupy)
 * 28.05.19 on; nastaveni velikosti pro mobily apod.
 * 21.05.19 on; SPAN
 * 10.01.19 on; zozbrazeni zpravy, ze probiha vyhledavani
 * 30.08.18 on; tlacitko Insert all
 * 22.11.17 on; pro autority knihovny Petra Bezruce v Opave se musi upravit 001
 * 21.11.17 on; moznost vynutit ascii vyhledavani
 * 20.11.17 on; zmena ulozeni parametru - budou v poli
 * 02.11.17 on; rozsireni downloadExtRec
 * 22.09.17 on; uprava v csSetupStore
 * 22.09.17 on; csOnValueLoad
 * 12.06.17 on; uprava csOnSearch metody
 * 18.11.16 on; moznost skryt scan a atributy
 * 26.09.16 on; upraveno zobrazeni okna
 * 11.08.16 on; moznost skryt help individualne
 * 11.05.16 on; okno se nebude vertikalne zarovnat na stred, ale bude odsazeno od horniho okraje
 * 31.07.15 on; uprava chovani pri prepinani mezi databazema
 * 23.07.15 on; rozsirena podpora vyhledavani ve vice db
 * 10.04.15 on; upraveno zobrazeni poctu vyhledanych zaznamu
 * 08.04.15 on; tlacitka Harmonizovat a Stahnout budou viditelna, jenom kdyz jsou funkcni
 * 20.11.14 on; opraveno usrDoSearch
 * 15.08.14 on; opraveno autoReturn
 * 14.08.14 on; moznost prednastavit atributy vyhledavani
 * 31.07.14 on; rozsireni usrDoSearch o parametr autoReturn
 * 15.05.14 on; arabstina
 * 18.04.14 on; podpora RTL
 * 21.03.14 on; arabstina
 * 07.02.14 on; oprava preklepu
 * 06.02.14 on; checkbox ASCII + ikony misto textu pro dalsi zaznamy
 * 23.01.14 on; doplneny parametry csNewRecWinWidth a csNewRecWinY
 * 09.09.13 on; moznost odlisit stejne cisla indexu v comboboxu indexu
 * 29.08.13 on; parametr initUseAttr a CSNewRecPanelInt
 * 30.07.13 on; osetreny vyber zadneho zaznamu
 * 13.08.12 on; predelane cteni ZF
 * 13.08.12 on; prelozene tlacitka Ext.Msg.YESNO v Ext.Msg.show
 * 03.07.12 on; atribut indexu nemusi byt jenom cislo
 * 22.06.12 on; doplneno zobrazeni poctu vyhledanych zaznamu
 * 22.06.12 on; pri dvojkliku na zaznam v gridu slovnik se spusti search
 * 11.04.12 on; doplneny podminky, aby bylo mozne zapojit skryte limity
 * 06.04.12 on; moznost zmenit atribut pro kompletni termin (C3)
 * 22.02.12 on; upravena reakce na klieknuti do ZF (csOnDFClick)
 * 10.02.12 on; csSearchStoreLoadException: doplnene zobrazeni chybove hlasky
 * 18.01.12 on; popup scan
 * 12.04.11 on; zmena ZF po vyberu z comboboxu bez nutnosti klikat na tlacitko Zmenit
 * 04.11.10 on; doplnena moznost nastavit ruzne ZF pro ruzne DB
 * 06.05.10 on; doplnen vymaz ZF pro zalozku scan
 * 29.04.10 on; zapojene linky i do lokalni DB v ZF
 * 19.03.10 on; upravene nastaveni panelu se ZF
 * 05.02.10 on; preklep
 * 29.01.10 on; upravene zobrazeni tooltipu
 * 20.01.10 on; odstranena carka za 'tbfill'
 * 25.11.09 rs; doplnenie moznosti spustenia vyhladavania klavesou enter
 * 25.11.09 rs; zmena pomeru velkosti grid vysledky vs. ZF na cca 40%/60%
 * 25.11.09 rs; ladiace kolecko zobrazit len v debug rezime
 * 05.11.09 rs; formalne drobnosti
 * 19.10.09 rs; "tlacitko listovania vo flexpope" - docasne zakomentovane
 * 19.10.09 rs; pre vyhladavanim: reset panelu zo ZF
 *              zmena pomeru velkosti casti okna vysledky/ZF
 * 13.10.09 rs; rozpracovane pridane tlacitko listovania vo flexpope
 * 05.10.09 rs; formalne upravy pre dokumentaciu
 * 02.10.09 rs; formalne upravy
 * 25.09.09 rs; doplnenie moznosti zobrazit zahlavie zdroj.zaznamu pri harmonizacii
 * 23.09.09 rs; preklad niektorych hlasok
 * 07.09.09 rs; default pre frazu na true
 * 24.08.09 rs; upravy harmonizacie s NK
 * 07.08.09 rs; rozne drobnosti, osetrenie chyb
 * 29.07.09 rs; oprava preklepu
 * 23.07.09 rs; dopracovana aktualizacia zaznamu pri jeho stiahnuti
 * 26.05.09 rs; preklad textov
 * 27.04.09 rs; pri vyvolani flexpopu dopracovana option autoReturn (povodne bolo defaultne zapnute),
 *              teraz je predvolene vypnute - robilo problemy pri volani flxp zo zaznamu
 * 24.04.09 rs; dopracovanie moznosti vratit zaznam v MARC formate (option wannaMarcRes)
 * 03.04.09 rs; uprava formatovania + zrusenie tried i3.ui.cs*
 * 30.01.09 rs; rozne drobne upravy v suvislosti s SCD
 * 24.07.08 rs; zmena window na i3.ui.CsWindow, a gridov na i3.ui.CsGridPanel
 * 04.06.08 rs;
 */
/*global Ext,i3,alert,console,window*/
Ext.ns('i3.ui.FlexPop');
/**
 * Obrazovka flexpop.
 * @class i3.ui.FlexPop
 *
 * Zaklad hierarchie Flexpop.<br><br>
 *
 * Priklad vyvolania flexpop:
 * <!-- dvojbodka musi byt zapisana ako &#58;, inak to robi problem Aptane -->
 * <pre><code>// flexpop window
 *      var fpwin = i3.ui.FlexPop.getWin();
 *      fpwin.usrDoSearch({
 *        classn: sClass,
 *        displayFmt&#58; 'ISBD',
 *        idxlistStoreId&#58; 'UnTablesd*I3_FLDLIST_CAT',
 *        initUseAttr: 4,
 *        initTerm&#58; '',
 *        searchMode: 2,
 *        callback: this.flexpopLoadRecord,
 *        scope: this
 *      });
 *    }</code></pre>
 */
i3.ui.FlexPop = {
    /**
     * @private
     */
    tx: { //
        // sem pridu preklady textov
        txCompleteness: 'Úplný termín#Úplný termín#Completeness###إكتمال'.ls(),
        txRecord: 'Záznam#Záznam#Record###سجل'.ls(),
        txTruncation: 'Rozšírenie#Rozšíření#Truncation###بتر'.ls(),
        txPhrase: 'Fráza#Fráze#Phrase###عبارة'.ls(),
        txNewSE: 'Nový SE##New SE###SE جديدة'.ls(),
        // 22.06.12 on; prejmenovane
        //txBrowse : 'Listovanie (browse)#Listování (browse)#Browse'.ls(),
        txBrowse: 'Listovanie#Listování#Browse###تصفح'.ls(),
        txASCII: 'ASCII#ASCII#ASCII###ASCII'.ls(),
        txLimits: 'Limity#Limity#Limits###حدود'.ls(),
        txSearch: 'Vyhľadávanie#Vyhledávání#Search###بحث'.ls(),
        txSearchField: 'Vyhľadávacie pole#Vyhledávací pole#Search field###حقل البحث'.ls(),
        txSearchBrowse: 'Vyhľadať#Vyhledat#Search###بحث'.ls(),
        txDatabase: 'Databáza#Databáze#Database###قاعدة البيانات'.ls(),
        txNewRec: 'Nový záznam##New record###تسجيلة جديدة'.ls(),
        txTerm: 'Termín##Term###مصطلح'.ls(),
        txHits: 'Počet z.#Počet z.#Hits###نتائج'.ls(),
        txDisplayPanelTitle: 'Zobrazenie#Zobrazení#Display format###صيغة العرض'.ls(),
        txOK: 'OK#OK#OK###أوافق'.ls(),
        txCancel: 'Zrušiť#Zrušit#Cancel###إلغاء'.ls(),
        txFlexWinTitle: 'Vyhľadávanie#Vyhledávání#Search###بحث'.ls(),
        txRecDownload: 'Stiahnuť#Stáhnout#Download###تنزيل'.ls(),
        txRecHarmonz: 'Harmonizovať#Harmonizovat#Harmonize###توافق'.ls(),
        txDisplayFmt: 'Zobrazovací formát##Display format###صيغة العرض'.ls(),
        txDisplayFmtChg: 'Zmeniť#Změnit#Change###تغيير'.ls(),
        txScanPB: 'Slovník##Scan###مسح'.ls(),
        txScanPnl: 'Slovník (scan)##Scan###مسح'.ls(),
        txID: 'ID#ID#ID###رقم تعرفة'.ls(),
        txSearching: 'Vyhľadávam...#Vyhledávám...#Searching...'.ls(),
        txToBasket: 'Do košíka#Do košíku#To the basket'.ls(),
        txInsertAllRecords: 'Vložiť všetko#Vložit všechno#Insert all'.ls(),
        // 22.06.12 on; zobrazi pouze pocet vyhledanych zaznamu
        //txHitCount : 'Ok, %s záznamov, %s s.#Ok, %s záznamů, %s s.#Ok, %s hits, %s s.'.ls(),
        txHitCount: '%s položiek#%s položek#%s hits###%s نتائج'.ls(),
        txNoSearchTerm: 'Chýba vyhl.termín#Chybí vyhl.termín#No search term.###لا يوجد مصطلح بحث.'.ls(),
        txNoIndexSelected: 'Nie je vybrané pole pre vyhľadávanie - vyhľadanie nie je možné.#Není vybrané pole pro vyhledávání – vyhledávání není možné.#No index selected - search not possible.###لم يتم اختيار كشاف - البحث غير ممكن.'.ls(),
        txNoIndexNoScan: 'Nie je vybrané pole pre vyhľadávanie - listovanie nie je možné.#Není vybrané pole pro vyhledávání – listování není možné.#No index selected - scan not possible.###لم يتم اختيار كشاف - المسح غير ممكن.'.ls(),
        txDownloadLocExist: 'Záznam zodpovedajúci %s z externej db už v lokálnej báze existuje - vykonajte stiahnutie, nie harmonizáciu.#Záznam odpovídající %s z externí db už v lokální bázi existuje – proveďte stáhnutí, ne harmonizaci.#External database record matching to %s already exists - use download, not harmonization.###يوجد حاليا تسجيلة من قاعدة بيانات خارجية مطابقة لـ %s - استخدم تنزيل، وليس توافق.'.ls(),
        txRecDownload2: 'Stiahnutie záznamu#Stáhnutí záznamu.####تنزيل التسجيلة.'.ls(),
        txRecDownloadLokExistUpdt: 'Záznam už v lokálnej databáze existuje. Chcete lokálny záznam aktualizovať?<br><br>Pozn. sťahuje sa vždy do ostrej databázy.#Záznam už v lokální databázi existuje. Chcete lokální záznam aktualizovat?<br><br>Pozn. stahuje se vždy do ostré databáze.#Record already exists in local database. Do you want to update the record?<br><br>Note: record is downloaded to live database.###التسجيلة موجودة حاليا في قاعدة البيانات المحلية. هل تريد تحديث التسجيلة؟<br><br>ملاحظة: تم تنزيل التسجيلة إلى قاعدة بيانات حية ومباشرة.'.ls(),
        txRecDownloadLokNExistNew: 'Vybraný záznam v lokálnej databáze neexistuje. Chcete záznam stiahnuť a vytvoriť z neho nový záznam v lokálnej databáze?#Vybraný záznam v lokální databázi neexistuje.Chcete záznam stáhnout a vytvořit z něho nový záznam v lokální databázi?#Selected records doesn\'t exist in local database. Do you want do download record and create new record in local database?###التسجيلات المختارة غير موجودة في قاعدة البيانات المحلية. هل تريد تنزيل التسجيلة وتنشئ تسجيلة جديدة في قاعدة البيانات المحلية؟'.ls(),
        txSavedToLocAs: 'Záznam bol uložený do lokálnej bázy pod číslom: #Záznam byl uložen do lokální báze pod číslem: #Record has been saved to local database with ID: ###تم حفظ التسجيلة في قاعدة البيانات المحلية برقم تعرفة: '.ls(),
        txRecDownloadFailed: 'Stiahnutie záznamu nebolo úspešné. Popis: %s/%s#Stáhnutí záznamu nebylo úspěšné. Popis: %s/%s#Downloading of record was unsuccessful. Description: %s/%s###فشل تنزيل التسجيلة. الوصف: %s/%s'.ls(),
        txHarmRecQ: 'Chcete záznam práve teraz otvorený vo formulári (%s) harmonizovať vybraným záznamom? Upozornenie: operácia je nevratná.#Chcete záznam právě teď otevřený ve formuláři (%s) harmonizovat s vybraným záznamem? Upozornění: operace je nevratná.#Do you want to harmonize currently opened record (%s) with selected record? Warning: Operation is irreversible.###هل تريد توافق التسجيلة المفتوحة حاليا (%s) مع التسجيلة المختارة؟ تحذير: العملية نهائية غير قابلة للرجوع.'.ls(),
        txHarmRecTitle: 'Harmonizácia záznamov#Harmonizace záznamů#Harmonization of records###توافق التسجيلات'.ls(),
        txNextRecs: 'Ďalšie záznamy#Další záznamy#Next records###التسجيلات التالية'.ls(),
        txNext: 'Ďalšie#Další#Next###التالي'.ls(),
        txPrevious: 'Predošlé#Předchozí#Previous###السابق'.ls(),
        txDfNotFound: 'Zobrazovací formát %s nebol nájdený.#Zobrazovací formát %s nenalezen.#Display format %s not found.###لم يتم إيجاد صيغة العرض %s'.ls(),
        txSelectRecFirst: 'Najprv vyberte záznam zo zoznamu!#Nejprve vyberte záznam ze seznamu!#Select record first!'.ls(),
        txGetRecs: 'Načítam záznamy ... prosím čakajte#Načítám záznamy ... prosím čekejte#Getting records ... please wait'.ls()
    },
    /**
     * @private
     */
    // global window id & prefix
    winid: 'flxp',
    /**
     * Globalna funkcia na ziskanie objektu flexpop okna
     * zatial vyzera, ze by mohlo stacit jedno pre celu app.
     * Neskor sa moze pripadne upravit
     */
    getWin: function(config) {
        return i3.ui.getSingleWin(i3.ui.FlexPop.winid, i3.ui.FlexPop.Win, config);
    },
    /*
     * konstanty
     *
     * 22.11.17 on;
     */
    c: {
        C_SPACE_CHAR: '\xa4',
        sMsgId: 'IMPORTALL',
        sMsgIdSearch: 'MSGSEARCH'
    }
};
// scan grid
//
i3.ui.FlexPop.PanelGScan = Ext.extend(Ext.grid.GridPanel, {
    /**
     * @private
     */
    constructor: function(config) {
        config = config || {};
        var idpref = i3.getIdPrefFn(config.idpref);
        Ext.applyIf(config, {
            store: new i3.WS.StoreScan({
                autoLoad: false
                //,usrDebug:1
            }), //
            //,plugins: [ new i3.ui.GridRowChecker() ]
            columns: [{
                id: idpref('term'),
                header: i3.ui.FlexPop.tx.txTerm, // 'Term'
                width: 350,
                sortable: true,
                dataIndex: 'term',
                resizeable: true
            }, {
                id: idpref('hits'),
                header: i3.ui.FlexPop.tx.txHits, // 'Hits'
                width: 60,
                sortable: true,
                dataIndex: 'hits',
                fixed: false,
                resizable: true,
                align: 'right'
            }],
            stripeRows: true,
            autoExpandColumn: idpref('term'),
            height: 230,
            width: 420,
            border: true,
            listeners: {
                rowdblclick: {
                    fn: function(grid) {
                        // 18.01.12 on; scan
                        if (this.csGetParentWin().openParams.csOnlyScan) {
                            // vybere termin
                            this.csDoRecordFnc('S');
                        } else {
                            var rec = grid.getSelectionModel().getSelected();
                            this.getCmp('term').setValue(rec.data.term);
                            // 22.06.12 on; spusti vyhledani
                            this.csGetParentWin().csOnSearch();
                        }
                    },
                    scope: this,
                    buffer: 100
                }
            },
            tbar: [{
                    xtype: 'checkbox',
                    id: idpref('cbScanCompl'),
                    checked: true,
                    // 06.02.14 on;
                    boxLabel: i3.ui.FlexPop.tx.txCompleteness, // 'Completeness'
                    style: 'margin-top: 0px'
                },
                /* {
                 xtype : 'tbtext',
                 text : i3.ui.FlexPop.tx.txCompleteness // 'Completeness'
                 },*/
                {
                    xtype: 'tbfill'
                }, {
                    xtype: 'tbbutton',
                    // 06.11.19 on; zmena ikony
                    //html: '<div class="x-btn"><button type="button" title="' + i3.ui.FlexPop.tx.txPrevious + '" class="x-btn-text i-btn"><span class="icon-prev" aria-hidden="true"></span></button></div>',
                    html: '<div class="x-btn"><button type="button" title="' + i3.ui.FlexPop.tx.txPrevious + '" class="x-btn-text i-btn"><span class="icon-up" aria-hidden="true"></span></button></div>',
                    id: idpref('pbScanB'),
                    //disabled : true,
                    listeners: {
                        click: function() {
                            this.csGetParentWin().csOnScan('B');
                            // 18.01.12 on; scan backward
                        },
                        scope: this
                    }
                }, {
                    xtype: 'tbbutton',
                    // 06.11.19 on; zmena ikony
                    //html: '<div class="x-btn"><button type="button" title="' + i3.ui.FlexPop.tx.txNext + '" class="x-btn-text i-btn"><span class="icon-next" aria-hidden="true"></span></button></div>',
                    html: '<div class="x-btn"><button type="button" title="' + i3.ui.FlexPop.tx.txNext + '" class="x-btn-text i-btn"><span class="icon-down" aria-hidden="true"></span></button></div>',
                    id: idpref('pbScanF'),
                    //disabled : true,
                    listeners: {
                        click: function() {
                            this.csGetParentWin().csOnScan('F');
                            // 18.01.12 on; scan forward
                        },
                        scope: this
                    }
                }
            ], //
            /**
             * Setup parameters
             * bude volane vzdy pred otvorenim flexpop na nastavenie triedy, kt.
             * sa ma prehladavat +zobrazovacieho formatu
             *
             * @param {Object} pFlexPopParams
             */
            setStoreParams: function(pFlexPopParams) {
                var db = pFlexPopParams.classn;
                // 23.07.05 on; podpora pro popis db
                if (Ext.isArray(db)) {
                    db = db[0];
                }
                if (db.indexOf(',') > -1) {
                    db = db.split(',');
                }
                this.store.baseParams.db = db;
                // cleanup old data
                this.store.removeAll();
            }
        });
        i3.ui.FlexPop.PanelGScan.superclass.constructor.call(this, config);
    },
    /**
     * Funkce s aktualnim scan terminem
     *
     * S - select record
     *
     * @param {Object} pFnc
     * @private
     */
    csDoRecordFnc: function() {
        var rec = this.getSelectionModel().getSelected();
        // okno dialogu
        var w = this.csGetParentWin();
        if (w && rec) {
            // vyber zaznamu double clickom
            // ak je povolene tlacitko OK - spravime "editaciu zaznamu"
            var c = w.getCmp('pbOK');
            if (c && (!c.disabled)) {
                w.csDoRecordFnc('E');
                //w.csReturnRecord(rec.data); // vratit vybrany zaznam
                return;
            }
            // 10.12.14 on; nebude se zobrazovat
            // sem by sa realne nemal dostat
            //i3.alert('OK button not available now..');
        }
    },
    /**
     * Vratit objekt hlavneho okna
     * @private
     */
    csGetParentWin: function() {
        var w = this.findParentByType(i3.ui.FlexPop.Win);
        i3.assert(w);
        return w;
    }
});
// search grid
//
i3.ui.FlexPop.PanelGSearch = Ext.extend(Ext.grid.GridPanel, {
    /**
     * @private
     */
    constructor: function(config) {
        config = config || {};
        var idpref = i3.getIdPrefFn(config.idpref);
        Ext.applyIf(config, {
            store: new i3.WS.StoreSearch({
                autoLoad: false,
                listeners: {
                    load: {
                        fn: this.csSearchStoreLoad,
                        scope: this
                    },
                    loadexception: {
                        fn: this.csSearchStoreLoadException,
                        scope: this
                    },
                    beforeload: {
                        fn: function() {
                            // vizualna vychytavka - zakazat tlacitko po dobehnuti search
                            var w = this.csGetParentWin();
                            // pred nacitanim vzdy zablokujeme obe tlacitka
                            w.getCmp('pbSearch').setDisabled(true);
                            w.getCmp('pbSearchN').setDisabled(true);
                            // 10.01.19 on; zozbrazeni zpravy, ze probiha vyhledavani
                            i3.msgOn('', i3.ui.FlexPop.tx.txSearching, '', i3.ui.FlexPop.c.sMsgIdSearch, true);
                            this.csSearchStartTime = new Date().getTime();
                        },
                        scope: this
                    }
                }
            }), //
            //,selModel: new Ext.grid.CheckboxSelectionModel({singleSelect:false})
            //,plugins: [ new i3.ui.GridRowChecker() ]
            columns: [{
                id: idpref('record'),
                header: i3.ui.FlexPop.tx.txRecord, // Record
                width: 350,
                sortable: true,
                dataIndex: 'data',
                resizeable: true,
                // 25.07.12 on; potrebuju sem dostat spravny ZF
                renderer: function(value, metaData, record) {
                    // zkusim nacist ZF z uzlu ZF, jinak pouzije uzel data (puvodni funkcnost)
                    var s = this.ownerCt.ownerCt.csGetDFStore(record.data, this.ownerCt.ownerCt.openParams.displayFmt[0]);
                    if (s === '') {
                        s = value;
                    }
                    return s;
                },
                scope: this
            }, {
                id: idpref('t001'),
                header: i3.ui.FlexPop.tx.txID,
                width: 60,
                sortable: true,
                dataIndex: 't001',
                // 07.12.15 on; moznost skryt sloupec
                hidden: i3.csHideColumnID,
                fixed: false,
                resizeable: true
            }],
            stripeRows: true,
            autoExpandColumn: idpref('record'),
            height: 230,
            width: 420,
            border: false,
            tbar: [{
                    xtype: 'checkbox',
                    id: idpref('cbSearchTrunc'),
                    checked: true,
                    boxLabel: i3.ui.FlexPop.tx.txTruncation, // 'Truncation' // 06.02.14 on; presunute z tbtext
                    style: 'margin-top: 0px'
                },
                /* {
                 xtype : 'tbtext',
                 text : i3.ui.FlexPop.tx.txTruncation // 'Truncation'
                 },*/
                '  ', {
                    xtype: 'checkbox',
                    id: idpref('cbSearchPhrase'),
                    boxLabel: i3.ui.FlexPop.tx.txPhrase, // 'Phrase' // 06.02.14 on; presunute z tbtext
                    checked: true,
                    style: 'margin-top: 0px'
                }, '  ',
                /* {
                xtype : 'tbtext',
                text : i3.ui.FlexPop.tx.txPhrase // 'Phrase'
                }, ' ',*/ //{ xtype: 'checkbox',
                //  id: idpref('cbSearchNewSE'),
                //  checked: false },
                //{
                //  xtype: 'tbtext',
                //  text: i3.ui.FlexPop.tx.txNewSE // 'New SE'
                //},' ',
                {
                    xtype: 'checkbox',
                    id: idpref('cbBrowse'),
                    checked: false,
                    boxLabel: i3.ui.FlexPop.tx.txBrowse, // 'Browse' // 06.02.14 on; presunute z tbtext
                    style: 'margin-top: 0px'
                },
                /*{
                 xtype : 'tbtext',
                 text : i3.ui.FlexPop.tx.txBrowse // 'Browse'
                 },*/
                '  ', {
                    xtype: 'checkbox',
                    id: idpref('cbASCII'),
                    boxLabel: i3.ui.FlexPop.tx.txASCII, // 'Ascii'
                    checked: false,
                    style: 'margin-top: 0px'
                }, {
                    xtype: 'tbfill'
                }, {
                    xtype: 'tbbutton',
                    // 06.11.19 on; zmena ikony
                    //html: '<div class="x-btn"><button type="button" title="' + i3.ui.FlexPop.tx.txNextRecs + '" class="x-btn-text i-btn"><span class="icon-next" aria-hidden="true"></span></button></div>',
                    html: '<div class="x-btn"><button type="button" title="' + i3.ui.FlexPop.tx.txNextRecs + '" class="x-btn-text i-btn"><span class="icon-down" aria-hidden="true"></span></button></div>',
                    tooltip: i3.ui.FlexPop.tx.txNextRecs,
                    id: idpref('pbSearchN'),
                    disabled: true,
                    listeners: {
                        click: function() {
                            var p = this.store.baseParams;
                            var nHits = this.store.csHits;
                            if (!nHits) {
                                return;
                            }
                            if (this.store.totalLength >= nHits) {
                                i3.alert('no more hits');
                                return;
                            }
                            p.from = p.to + 1;
                            p.to = p.from + 19;
                            this.store.load({
                                add: true
                            });
                            //alert('par='+Ext.encode(this.store.baseParams));
                        },
                        scope: this
                    }
                }
            ],
            listeners: {
                rowdblclick: {
                    fn: function() {
                        this.csDoRecordFnc('S');
                        //  select record
                    },
                    scope: this,
                    buffer: 100
                },
                rowclick: {
                    fn: function() {
                        this.csDoRecordFnc('D');
                        // update display
                    },
                    scope: this,
                    buffer: 100
                }
            }
        });
        // pridame single time event handler, ktory vyberie prvy zaznam hned po nacitani dat
        //config.store.on('load', this.csSearchStoreLoad, this, {
        //  single: false
        //});
        // toto pomoze v pripade zlyhania "load"
        //config.store.on('loadexception', this.csSearchStoreLoadException, this, {
        //  single: false
        //});
        i3.ui.FlexPop.PanelGSearch.superclass.constructor.call(this, config);
    },
    /**
     * Funkcie s aktualnym zaznamom
     *
     * S - select record
     * D - update display
     *
     * @param {Object} pFnc
     * @private
     */
    csDoRecordFnc: function(pFnc) {
        var rec = this.getSelectionModel().getSelected();
        // okno dialogu
        var w = this.csGetParentWin();
        // 06.05.10 on; toto musi byt funkcni jenom pro aktivni zalozku search (ne pro scan)
        if (w.csTabPanel.getActiveTab() === w.csPanelScan) {
            return;
        }
        // 31.07.15 on; zmenena podminka
        //if (w && rec) {
        if (w) {
            if (pFnc === 'D') {
                // 31.07.15 on; vymaz ZF, pokud neexistuje zaznam
                if (rec) {
                    w.csDispRecord(rec.data);
                } else {
                    w.csDispRecord('');
                }
                // updatnut display
            } else {
                // vyber zaznamu double clickom
                // ak je povolene tlacitko OK - spravime "editaciu zaznamu"
                var c = w.getCmp('pbOK');
                if (c && (!c.disabled)) {
                    w.csDoRecordFnc('E');
                    //w.csReturnRecord(rec.data); // vratit vybrany zaznam
                    return;
                }
                // inak ak je povolene stiahnutie, spravime ako default stiahnutie (pred tym bude zobrazena otazka,
                // ci chce zaznam naozaj stiahnut)
                c = w.getCmp('pbRecDownload');
                if (c && (!c.disabled)) {
                    w.csDoRecordFnc('W');
                    return;
                }
                // 10.12.14 on; nebude se zobrazovat
                // sem by sa realne nemal dostat
                //i3.alert('OK button not available now..');
            }
        }
    },
    /**
     * Setup parameters. Bude volane vzdy pred otvorenim flexpop na nastavenie triedy, kt.
     * sa ma prehladavat
     * +zobrazovacieho formatu
     * @param {Object} pFlexPopParams
     * @private
     */
    setStoreParams: function(pFlexPopParams) {
        //console.log('i3.ui.FlexPop.PanelGSearch setStoreParams:', pFlexPopParams);
        var db = pFlexPopParams.classn;
        // 23.07.05 on; podpora pro popis db
        if (Ext.isArray(db)) {
            db = db[0];
        }
        if (db.indexOf(',') > -1) {
            db = db.split(',');
        }
        this.store.baseParams.db = db;
        // 25.07.12 on; budou se odesilat vsechny ZF pouzite v okne flexpopup
        //this.store.baseParams.fmt = pFlexPopParams.displayFmt;
        this.csSetupStoreFmt(this.store, pFlexPopParams.displayFmt, pFlexPopParams.displayFmtPnl, pFlexPopParams.csSetupCallback, pFlexPopParams.csSetupScope);
        // cleanup old data
        this.store.removeAll();
    },
    /**
     * Vrati v poli seznam vsech ZF v flexpopup okne
     * @param {object} pStore store s vyhledanymi zaznamy
     * @param {string} psDislayFmt nazev ZF pouzity v prehledu vyhledanych zaznamu (zkraceny)
     * @param {string} psDislayFmtPnl nazev ciselniku se ZF v prave casti okna
     * @param {function} pCallback callback funkce
     * @param {object} pScope scope callback funkce
     *
     * @private
     */
    csSetupStoreFmt: function(pStore, psDislayFmt, psDislayFmtPnl, pCallback, pScope) {
        var aDFList = [];
        aDFList.push(psDislayFmt);
        // nacte ciselnik ZF
        i3.WS.getRecord({
            classn: i3.WS.getDfltUnTablesd(),
            t001: psDislayFmtPnl,
            success: function(pRec) {
                var aTag200 = pRec.getTag('200', -1);
                // sekvencny search po riadkoch
                Ext.each(aTag200, function(li) {
                    var s = i3.Marc.getSubTagStr(li, 'a');
                    if (s !== '') {
                        aDFList.push(s);
                    }
                });
                pStore.baseParams.fmt = aDFList;
                if (pCallback) {
                    var scope = pScope || this;
                    pCallback.call(scope);
                }
            },
            failure: function() {
                pStore.baseParams.fmt = aDFList;
                if (pCallback) {
                    var scope = pScope || this;
                    pCallback.call(scope);
                }
            },
            scope: this
        });
    },
    /**
     * Vratit objekt hlavneho okna
     * @private
     */
    csGetParentWin: function() {
        var w = this.findParentByType(i3.ui.FlexPop.Win);
        i3.assert(w);
        return w;
    },
    /**
     * Search store load exception
     * nastavuje sa po kliknuti na search tlacitko. v pripade chyby vyhladavania povoli
     * tlacitko vyhladavania
     * (tlacitko vyhladavania zakazeme pri spusteni hladania)
     * viz. tiez csSearchStoreLoad
     * @private
     */
    csSearchStoreLoadException: function(pProxy, pOptions, pResponse, pError) {
        // vizualna vychytavka - povolit tlacitko po dobehnuti search
        var w = this.csGetParentWin();
        w.getCmp('pbSearch').setDisabled(false);
        // 10.01.19 on; zozbrazeni zpravy, ze probiha vyhledavani
        i3.msgOff(i3.ui.FlexPop.c.sMsgIdSearch);
        //w.getCmp('pbSearchN').setDisabled(false); // pri chybe neodblokujeme
        //alert('load except');
        this.store.un('load', this.csSearchStoreLoad);
        // 10.02.12 on; doplnene zobrazeni chybove hlasky z predka
        this.store.superclass().csOnLoadException.call(this.store, pProxy, pOptions, pResponse, pError);
    },
    /**
     * Search store on load
     * nastavuje sa po kliknuti na search tlacitko. v pracom paneli vyvola zobrazenie
     * prveho zaznamu a tiez povoli tlacitko vyhladavania
     * (tlacitko vyhladavania zakazeme pri spusteni hladania)
     * viz. tiez csSearchStoreLoadException
     * @private
     */
    csSearchStoreLoad: function(a, b, args) {
        // vizualna vychytavka - povolit tlacitko po dobehnuti search
        var w = this.csGetParentWin();
        w.getCmp('pbSearch').setDisabled(false);
        // 10.01.19 on; zozbrazeni zpravy, ze probiha vyhledavani
        i3.msgOff(i3.ui.FlexPop.c.sMsgIdSearch);
        this.getSelectionModel().selectFirstRow();
        this.csDoRecordFnc('D');
        this.store.un('loadexception', this.csSearchStoreLoadException);
        var nTime = (new Date().getTime()) - this.csSearchStartTime;
        nTime = (nTime > 0) ? (nTime / 1000.0).toFixed(1) : '';
        //console.log('search ' +  + ' sec.');
        var oJSON = this.store.reader.jsonData;
        var nHits = oJSON.hits || 0;
        var nLoadedHits = this.store.totalLength;
        this.store.csHits = nHits;
        // su este nenacitane hity?
        if (nLoadedHits < nHits) {
            w.getCmp('pbSearchN').setDisabled(false);
        }
        if ((nHits > 0) && (nLoadedHits > 0) && (nLoadedHits < nHits)) {
            nHits = nLoadedHits + '/' + nHits;
        }
        // 'ok, %s hits, %s s.'
        // 22.06.12 on; zobrazi jenom pocet vyhledanych zaznamu
        //w.csShowStatus(i3.fillInParams(i3.ui.FlexPop.tx.txHitCount, [nHits, nTime]));
        w.csShowStatus(i3.fillInParams(i3.ui.FlexPop.tx.txHitCount, [nHits]));
        // 29.08.18 on; moznost zapojeni callbacku
        if (args && args.callback) {
            args.callback();
        }
    }
});
/**
 * Obrazovka flexpop/window.
 * @class i3.ui.FlexPop.Win
 *
 */
i3.ui.FlexPop.Win = Ext.extend(Ext.Window, {
    /**
     *
     * @param {Object} config
     *   idpref: id prefix of the window
     */
    constructor: function(config) {
        config = config || {};
        // makra na jednoduche prefixovanie id-ciek elementov
        var idpref = i3.getIdPrefFn(config.idpref);
        // 28.05.19 on; nastaveni velikosti pro mobily apod.
        // defaulty
        var nWinWidth = config.width || 800;
        var nDFPanelWidth = 470;
        var nTabpanelWidth = 'auto';
        var nIndexWidth, nTermWidth;
        if (nWinWidth > Ext.getBody().getViewSize().width) {
            // pokud je velikost okna vetsi nez moznosti zobrazeni, prepocita to
            nWinWidth = Ext.getBody().getViewSize().width - 5;
            // zhruba 50% velikosti okna (je to neco vic, ale to je v poradku)
            nDFPanelWidth = Math.round(0.5 * nWinWidth);
            nTabpanelWidth = Math.round(0.4 * nWinWidth);
            // 02.07.19 on;
            // pole index, termin, tlacitka - aspon toto by melo byt videt
            nIndexWidth = Math.round(0.3 * nWinWidth);
            nTermWidth = Math.round(0.3 * nWinWidth);
        }
        var nWinHeight = config.height || 500;
        if (nWinHeight > Ext.getBody().getViewSize().height) {
            nWinHeight = Ext.getBody().getViewSize().height - 5;
        }
        var panelScan = new i3.ui.FlexPop.PanelGScan({
            title: i3.ui.FlexPop.tx.txScanPnl, // 'Scan'
            height: 300,
            idpref: config.idpref
        });
        var panelSearch = new i3.ui.FlexPop.PanelGSearch({
            title: i3.ui.FlexPop.tx.txSearch, // 'Search'
            height: 300,
            idpref: config.idpref
        });
        var storeIndex = new i3.WS.StoreST({
                csStatTableN: ''
            }),
            storeClassN = new i3.WS.StoreST({
                csStatTableN: ''
            }),
            storeFMT = new i3.WS.StoreST({
                csStatTableN: ''
            });
        var tabPanel = new Ext.TabPanel({
            deferredRender: false,
            activeTab: 0,
            region: 'center',
            width: nTabpanelWidth, // 02.07.19 on;
            items: [panelSearch, panelScan],
            listeners: {
                'tabchange': { // 06.05.10 on; reakce na prepinani mezi zalozkami
                    fn: function(tabPanel, tab) {
                        if (tab === this.csPanelScan) {
                            this.csDispRecord('');
                            // smazat display
                        } else {
                            this.csPanelSearch.csDoRecordFnc('D');
                            // redisp
                        }
                    },
                    scope: this
                }
            }
        });
        var panelDisplay = new Ext.Panel({ // @@
            title: i3.ui.FlexPop.tx.txDisplayPanelTitle, // 'Display'
            // 18.04.14 on; podpora RTL
            //region : 'east',
            region: i3.isRTL() ? 'west' : 'east',
            split: true,
            width: nDFPanelWidth, // 19.10.09 rs; zmena pomeru casti vysledky/ZF; zmena 25.11.09 cca 40%:60% podla CITEM
            collapsible: true,
            //collapsed: true,  // 19.03.10 on; zrusene, ve verzi 3.1.1 se ztracela sipka pro rozbaleni panelu
            autoScroll: true,
            id: idpref('pnlDisplay'), // 18.01.12 on;
            //margins: '3 0 3 3',cmargins: '3 3 3 3'
            tbar: [{
                    xtype: 'combo',
                    id: idpref('fmt'),
                    editable: false,
                    typeAhead: true,
                    store: storeFMT,
                    // 13.06.24 on; toto je tu asi k nicemu - zruseno
                    // 13.06.24 on; moznost zmenit text ZF
                    //title: config.csDisplayFormatText || i3.ui.FlexPop.tx.txDisplayFmt, // 'Display format'
                    displayField: 'text',
                    valueField: 'id',
                    mode: 'local',
                    triggerAction: 'all',
                    allowBlank: false,
                    lazyInit: false,
                    width: 170,
                    forceSelection: true,
                    listeners: {
                        // 12.04.11 on; zmena udalosti na select
                        //change: {
                        select: {
                            fn: function() {
                                this.csPanelSearch.csDoRecordFnc('D');
                                // redisp
                            },
                            scope: this
                        }
                    }
                }
                // 12.04.11 on; zrusene zobrazeni tlacitka Zmenit
                /*{
                 xtype: 'button',
                 text: i3.ui.FlexPop.tx.txDisplayFmtChg, // 'Zmeniť',
                 //id: idpref('pbSearch'),
                 listeners: {
                 // pouzijeme onclick, nie handler, aby sme mohli posielat eventy
                 click: {
                 fn: function(event){
                 this.csPanelSearch.csDoRecordFnc('D'); // redisp
                 },
                 scope: this
                 }
                 }

                 }*/
            ],
            listeners: {
                'render': function(cmp) {
                    cmp.getEl().on('click', function(e) {
                        this.csOnDFClick(e);
                        // may be overriden later
                    }, this, {});
                },
                scope: this
            }
        });
        /*var panelLimits = new Ext.Panel({
         title: 'Limits',
         region: 'north',
         split: true,
         height: 100,
         collapsible: true,
         collapsed: false,
         autoScroll: false,
         layout:'form',
         items: [{
         xtype: 'checkbox',
         id: idpref('limDbNavrhy'),
         boxLabel:'Návrhy'
         }, {
         xtype: 'checkbox',
         id: idpref('limDbSchvalene'),
         boxLabel:'Schválené'
         },{
         xtype: 'textfield',
         id: idpref('limUser'),
         fieldLabel:'Uživatel'
         }]
         });*/
        var cmbIndex = {
            xtype: 'combo',
            id: idpref('index'),
            editable: false,
            typeAhead: true,
            // tu je eventualne potreba najst prve id z prveho zaznamu v Store
            // zatial netreba pretoze pri search sa nastavi
            //value:2000,
            store: storeIndex,
            title: i3.ui.FlexPop.tx.txSearchField, // 'Search field'
            displayField: 'text',
            valueField: 'id',
            mode: 'local',
            triggerAction: 'all',
            allowBlank: false,
            lazyInit: false,
            forceSelection: true,
            width: nIndexWidth || 'auto'
        };
        var toolBarClassNTx = new Ext.Toolbar.TextItem('Db:');
        var toolBarMsg = new Ext.Toolbar.TextItem('');
        var toolBar = [cmbIndex, ' ', {
            xtype: 'textfield',
            id: idpref('term'),
            allowBlank: false,
            width: nTermWidth || 'auto'
        }, ' ', {
            xtype: 'button',
            text: i3.ui.FlexPop.tx.txSearchBrowse, // 'Search/Browse'
            id: idpref('pbSearch'),
            // 06.01.21 on; ikona lupy
            iconCls: 'icon-search-img',
            //hidden: true,
            listeners: {
                // pouzijeme onclick, nie handler, aby sme mohli posielat eventy
                click: {
                    fn: function() {
                        this.csOnSearch();
                    },
                    scope: this
                }
            }
        }, ' ', {
            xtype: 'button',
            text: i3.ui.FlexPop.tx.txScanPB, // 'Scan'
            id: idpref('pbScan'),
            listeners: {
                // pouzijeme onclick, nie handler, aby sme mohli posielat eventy
                click: {
                    fn: function() {
                        this.csOnScan();
                    },
                    scope: this
                }
            }
        }, ' ', ' ', toolBarClassNTx, {
            xtype: 'combo',
            id: idpref('classn'),
            editable: false,
            typeAhead: true,
            store: storeClassN,
            title: i3.ui.FlexPop.tx.txDatabase, // 'Database'
            displayField: 'text',
            valueField: 'id',
            mode: 'local',
            triggerAction: 'all',
            allowBlank: false,
            lazyInit: false,
            width: config.csClassnWidth || 130,
            forceSelection: true,
            listeners: {
                change: {
                    fn: this.csOnChangeClass,
                    scope: this
                }
            }
        }, {
            xtype: 'tbseparator',
            id: idpref('pbNewS')
        }, {
            xtype: 'button',
            text: i3.ui.FlexPop.tx.txNewRec, // 'New record'
            id: idpref('pbNew'),
            listeners: {
                // pouzijeme onclick, nie handler, aby sme mohli posielat eventy
                click: {
                    fn: function() {
                        this.csOnNew();
                    },
                    scope: this
                }
            }
        }, ' ', ' ', ' ', {
            xtype: 'cs_col_trigger',
            width: 150,
            displayVal: ['symDisplay'],
            id: idpref('colLimits'),
            hidden: true,
            csColTitle: i3.ui.FlexPop.tx.txLimits,
            csDataForm: this,
            csColWidth: config.csColWidth || 680,
            csOnAfterColOK: function() {
                // toto uz je brutalna motanica - funkcia bude volana pri kliknuti na OK
                // v collector window a v scope combo boxu
                //console.log('col OK');
                // po update limit spustit search
                this.csDataForm.csOnSearch();
            }
        }, toolBarMsg];
        Ext.apply(config, {
            defaultButton: idpref('term'),
            id: i3.ui.FlexPop.winid, // ZATIAL predpokladame len jeden
            layout: 'border',
            title: '<span class="icon-search" aria-hidden="true"></span> ' + i3.ui.FlexPop.tx.txFlexWinTitle, // 'Vyhladavanie: xx'
            // 28.06.19 on; velikost pro mobily
            //width : config.width || 800,
            width: nWinWidth,
            //height: config.height || 500,
            height: nWinHeight,
            //autoHeight: true,
            // 28.06.19 on; zruseno
            //minWidth : 600,
            // 28.06.19 on; zruseno
            //minHeight: 300,
            closable: true,
            plain: true,
            resizable: true,
            modal: true, //
            // 26.09.16 on; uveznim okno v jeho rodici a tim nebude okno odskakovat napr. v importu z wosu/scopusu
            constrain: true,
            y: 10, // 11.05.16 on; okno se nebude vertikalne zarovnat na stred, ale bude odsazeno od horniho okraje
            // closeAction je specificke pre Window (The action to take when the close button is clicked. The default
            // action is 'close' which will actually remove the window from the DOM and destroy it. The other
            // valid option is 'hide' which will simply hide the window by setting visibility to hidden and
            // applying negative offsets, keeping the window available to be redisplayed via the show method.
            //
            // viz. tiez hideMode definovane v Component
            closeAction: 'hide',
            tbar: toolBar,
            items: [tabPanel, panelDisplay], // vypustene: panelLimits
            buttons: [{
                text: i3.ui.FlexPop.tx.txToBasket, // Do kosika
                //id : idpref('pbRecDownload'),
                iconCls: 'icon-basket',
                // 23.02.24 on; podle db povoli tlacitko
                //hidden: !i3.csBasket,
                hidden: !this.csBasketEnabled(config.classn),
                listeners: {
                    click: {
                        fn: function() {
                            this.csDoRecordFnc('B');
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ui.FlexPop.tx.txRecDownload, // 'Stiahnut/Harm.'
                id: idpref('pbRecDownload'),
                listeners: {
                    click: {
                        fn: function() {
                            this.csDoRecordFnc('W');
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ui.FlexPop.tx.txRecHarmonz, // 'Harmonizovat'
                id: idpref('pbRecHarmonz'),
                listeners: {
                    click: {
                        fn: function() {
                            this.csDoRecordFnc('H');
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ui.FlexPop.tx.txInsertAllRecords, // 28.08.18 on; vlozit vsechny zaznamy
                id: idpref('pbInsertAll'),
                listeners: {
                    click: {
                        fn: function() {
                            this.csDoRecordFnc('A');
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ui.FlexPop.tx.txOK, // 'OK'
                id: idpref('pbOK'),
                listeners: {
                    click: {
                        fn: function() {
                            this.csDoRecordFnc('E');
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ui.FlexPop.tx.txCancel, // 'Cancel'
                listeners: {
                    click: {
                        fn: function() {
                            this.csDoRecordFnc('C');
                        },
                        scope: this
                    }
                }
            }],
            //
            //listeners: {
            //  render: {
            //    fn: function(){
            //    },
            //    scope: this
            //  }
            //},
            // 25.11.09 rs; ladiace kolecko zobrazit len v debug rezime
            tools: (i3.debug > 0) ? [{
                id: 'gear',
                handler: function() {
                    this.csOnToolsGear();
                },
                scope: this
            }] : undefined,
            csStoreIndex: storeIndex, // store pre index combo
            csStoreClassN: storeClassN,
            csStoreFMT: storeFMT,
            // store pre class combo
            // panely & tab panel
            csPanelScan: panelScan,
            csPanelSearch: panelSearch,
            csPanelDisplay: panelDisplay,
            csTabPanel: tabPanel, //
            // textove pole v toolbari - nejde odchytit cez "id"
            // neviem z akeho dovodu
            csToolBarClassNTx: toolBarClassNTx,
            csToolBarMsg: toolBarMsg,
            // 25.11.09 rs; doplnenie moznosti spustenia vyhladavania klavesou enter
            keys: [{
                key: Ext.EventObject.ENTER,
                fn: function() {
                    // 18.01.12 on; podpora pouze Scanu
                    if (this.openParams.csOnlyScan) {
                        this.csOnScan();
                    } else {
                        this.csOnSearch();
                    }
                },
                scope: this
            }]
            // 01.07.19 on; zruseno, pri zobrazeni klavesnice na mobilu se formular uplne minimalizoval
            //listeners : {
            //// 01.07.19 on; zmena velikosti hlavniho okna (epca vystupy)
            //  main_resize : function() {
            //    if (this.width > Ext.getBody().getViewSize().width) {
            //      this.setWidth(Ext.getBody().getViewSize().width);
            //    }
            //    if (this.height > Ext.getBody().getViewSize().height) {
            //      this.setHeight(Ext.getBody().getViewSize().height);
            //    }
            //  }
            //}
        });
        i3.ui.FlexPop.Win.superclass.constructor.call(this, config);
    },
    /**
     * Vyvolanie zadanej funkcie nad vybranym zaznamom
     *
     * E - editacia zaznamu (t.j. tlacitko OK)
     * W - record download (stiahnutie zaznamu)
     * H - harmonizacia
     * C - close/cancel
     * A - vrati vsechny vyhledane zaznamy
     *
     */
    csDoRecordFnc: function(pFnc) {
        // C-cko je bokom, pretoze nepozaduje vybrany zaznam
        if (pFnc === 'C') {
            // uschovat pracovne data limit
            this.csSaveLimitsData();
            // uzatvorit okno flexpopu
            this.close();
            return;
        }
        // 18.01.12 on; scan
        var grid, selRec;
        if (this.openParams.csOnlyScan) {
            grid = this.csPanelScan;
            selRec = grid.getSelectionModel().getSelected();
        } else {
            grid = this.csPanelSearch;
            selRec = grid.getSelectionModel().getSelected();
        }
        // 09.09.09 rs; pokial nie je vybrany ziadan zaznam odoslat NULL
        // toto v combo umozni vybrat "prazdnu hodnotu" - t.j. vymaz prveho opakovania
        if ((!selRec) && (pFnc === 'E')) {
            this.csReturnRecord(null);
            return;
        }
        // 28.08.18 on; vrati vsechny vyhledane zaznamy
        if (pFnc === 'A') {
            this.csReturnSetRecords();
            return;
        }
        if (!selRec) {
            i3.alert(i3.ui.FlexPop.tx.txSelectRecFirst);
            return;
        }
        if ((pFnc === 'W') || (pFnc === 'H')) { // stiahnut/harmonizovat
            if (!this.currentRecDwnCfg) { // toto by nemalo nastat, pretoze normalne je tlacitko bloknute
                i3.intError('No download config available.');
            }
            this.csRecordDownload(this.currentRecDwnCfg, selRec.data, pFnc);
            return;
        }
        if (pFnc === 'E') { // edit record
            this.csReturnRecord(selRec.data);
            return;
        }
        // 11.08.17 on; vlozeni zaznamu do kosiku
        if (pFnc === 'B') {
            this.csAddToBasket(selRec.data);
            return;
        }
        i3.intError('Fnc="' + pFnc + '" not supported!');
    },
    /**
     * Prida zaznam do kosiku.
     *
     * 11.08.17 on;
     */
    csAddToBasket: function(psData) {
        var s = i3.className2LName(psData.classn) + '*' + psData.t001;
        i3.ui.Basket.csAddToBasket(s, {
            csOKCallback: this.csAddToBasket2.createDelegate(this)
        });
    },
    csAddToBasket2: function(psResult) {
        if (!i3.isEmptyString(psResult) && (psResult.piece('#', 1) === i3.ui.Basket.c.txOK)) {
            // aktualizuje zobrazeni poctu holdingu v kosiku
            i3.ui.Basket.csSetBasketTitle();
        } else {
            var m = new i3.WS.Msg(psResult);
            i3.displayError(m.userText);
        }
    },
    /**
     * Nastavenie obsahu zadaneho store podla zadaneho "StoreId".
     * Pouziva sa pre index store a pre display fmt.store.
     *
     * 1, Bud najdeme alebo vytvoreme nove store podla pStoreId
     * 2, Potom odstraniem vsetky existujuce data z pStore a naplnime ho novymi datami
     *    prekopirovanymi z bodu 1
     *
     *
     * @param {Object} pStore
     * @param {Object} pStoreId  - string identifikujuci store; moze by undefined
     *                             (vtedy len vyprazdnime exist.obsah)
     * @param {String} pCombo    - id-cko comboboxu. Ak sa najdu data, nastavime poziciu comboboxu
     *                             na prvy udaj z dat
     */
    csSetupStore: function(pStore, pStoreId, pCombo) {
        // specialny pripad, kedy nemame ziaden obsah
        if (!pStoreId) {
            // 30.07.15 on; doplneni uchovani ciselniku s indexy
            pStore.csIdxListStoreId = '';
            pStore.removeAll();
            // vycisti nas store
            return;
        }
        // pStoreId je storeId bazoveho store
        // najdeme ho cez store manager a data indexStore (t.j. store pripnuteho na nas index combo)
        // vymenime za data zdrojoveho store
        var srcStore = Ext.StoreMgr.get(pStoreId);
        //var aSourceDT;
        // 22.09.17 on; cele, predelane
        if (srcStore) {
            // 22.09.17 on;
            //aSourceDT = srcStore.getRange();
            this.getCmp(pCombo).bindStore(srcStore);
        } else {
            // Ak zdrojove store neexistuje, tak jedno vytvorime
            // (automaticky sa zaregistuje v StoreMgr & nabuduce uz bude k dispozicii)
            // Potom nase store naplnime jeho datami.
            // Nemozeme ich jednoducho vymenit, pretoze 'csStoreIndex' ma binding na combobox.
            srcStore = new i3.WS.StoreST({
                csStatTableN: pStoreId,
                autoLoad: false,
                listeners: {
                    load: {
                        // 22.09.17 on; zapojeno nastaveni ciselniku po dotazeni dat
                        fn: this.csOnValueLoad.createDelegate(this, [pCombo], 0),
                        scope: this
                    }
                }
            });
            // vyzera, ze to autoLoad:true sice zavola load, ale nejako neskor (asi async(?))
            // pokial zavolam load() priamo, zda sa, ze to funguje ..
            srcStore.load();
            // Pozor! Ak tu dame i3.alert() - nezobrazi sa - zrejme sa prebija
            // viac alertov async volanych
            // cez seba.
            // 22.09.17 on;
            /*aSourceDT = srcStore.getRange();
             if (!aSourceDT) {
             i3.intError('source store for ' + pStoreId + ' NOT found in store manager ' + '& we got not data after store.load');
             }*/
        }
        // 22.09.17 on;
        // vycisti nas store
        /*pStore.removeAll();
        // a napln ho datami zo zdroja
        pStore.add(aSourceDT);

        // 31.07.15 on; zapamatuje si pouzity ciselnik
        pStore.csIdxListStoreId = pStoreId;

        // ak sa nasli nejake zaznamy (t.j. nejaky zoznam indexov)
        if (aSourceDT && aSourceDT[0] && pCombo) {
        // zoberieme z prveho zaznamu "id"; aSourceDT[0] je typu Ext.data.Record
        var firstID = aSourceDT[0].data.id;

        // Ak uz existuje komponenta & nasli sme prvy id z dat, nastavit ho.
        var comp = this.getCmp(pCombo);
        if (comp && firstID) {
        comp.setValue(firstID);
        // nastavit obsah combo na prvy hodnotu z dat
        }
        }*/
        // 31.07.15 on; zapamatuje si pouzity ciselnik
        pStore.csIdxListStoreId = pStoreId;
        // ak sa nasli nejake zaznamy (t.j. nejaky zoznam indexov)
        if (srcStore && srcStore.data.items[0] && pCombo) {
            // zoberieme z prveho zaznamu "id"
            var firstID = srcStore.data.items[0].data.id;
            // Ak uz existuje komponenta & nasli sme prvy id z dat, nastavit ho.
            var cmp = this.getCmp(pCombo);
            if (cmp && firstID) {
                // nastavit obsah combo na prvy hodnotu z dat
                cmp.setValue(firstID);
            }
        }
    },
    /**
     * Pri zmene triedy flexpopu - inicializuje Store pre index combo
     * Je volane na uvode csSetupClassN()
     * @private
     */
    csSetupIdxStore: function(psIdxlistStoreId) {
        this.csSetupStore(this.csStoreIndex, psIdxlistStoreId, 'index');
    },
    /**
     * Metoda volana po dotazeni ciselniku
     *
     * 22.09.17 on;
     */
    csOnValueLoad: function(pCombo, store) {
        var cmp = this.getCmp(pCombo);
        if (!cmp) {
            return;
        }
        cmp.bindStore(store);
        // nastavi prvni polozku
        if (store && store.data.items[0]) {
            // zoberieme z prveho zaznamu "id"
            var firstID = store.data.items[0].data.id;
            // Ak uz existuje komponenta & nasli sme prvy id z dat, nastavit ho.
            if (cmp && firstID) {
                // nastavit obsah combo na prvy hodnotu z dat
                cmp.setValue(firstID);
            }
        }
    },
    /*
     * 04.11.10 on; vrati nazev ciselniku se seznamem ZF
     */
    csGetDisplayFmtPnl: function(psDisplayFmtPnl, i) {
        // seznam ZF nemusi byt vubec definovany
        if (!psDisplayFmtPnl) {
            return psDisplayFmtPnl;
        }
        // seznam ZF muze byt nastaveny pouze jeden pro vsechny tridy
        if (typeof psDisplayFmtPnl === 'string') {
            return psDisplayFmtPnl;
        }
        var s = psDisplayFmtPnl[i];
        if (!s) {
            s = psDisplayFmtPnl[0];
        }
        return s;
    },
    /**
     * Vola sa po zmene triedy (+suvisiacich params)
     *
     * pParams je lokalny objekt (nesuvisi s usrDoSearch/pParams):
     *   classn:         trieda na ktorej mam aktualne flexpop bezat
     *   displayFmt:     aktualny ZF pre search/browse
     *   idxlistStoreId: identifikacia bazoveho store pre combo indexov
     *   downloadCfg:    record download config, alebo null
     *   dbOptions:      ruzna nastaveni db (podobne jako db_options v client_xx.ini)
     *
     * @private
     */
    csSetupClassN: function(pParams) {
        //console.log('i3.ui.FlexPop.Win.csSetupClassN: ', pParams)
        // 31.07.15 on; bude se menit jenom pri zmene ciselniku, jinak se pri zmene DB zbytecne meni prednastaveny index
        if (this.csStoreIndex.csIdxListStoreId !== pParams.idxlistStoreId) {
            this.csSetupIdxStore(pParams.idxlistStoreId);
        }
        this.csPanelScan.setStoreParams(pParams);
        this.csPanelSearch.setStoreParams(pParams);
        // 31.07.15 on; smaze pocet vyhledanych zaznamu
        this.csShowStatus('');
        // 31.07.15 on; bude se menit jenom pri zmene ciselniku, jinak se pri zmene DB zbytecne meni prednastaveny format
        // 04.11.10 on; presunute sem, protoze se musi volat po zmeny tridy (v seznamu trid muze byt nadefinovana autoritni i bibliograficka DB)
        // nastavit store pre zoznam ZF
        if (this.csStoreFMT.csIdxListStoreId !== pParams.displayFmtPnl) {
            this.csSetupStore(this.csStoreFMT, pParams.displayFmtPnl, 'fmt');
        }
        // 31.07.15 on; doplnen vymaz ZF
        this.csDispRecord('');
        // panel zobrazit alebo schovat
        if (pParams.displayFmtPnl) {
            this.csPanelDisplay.expand(true);
        } else {
            this.csPanelDisplay.collapse(true);
        }
        // 16.11.16 on; presunuto vys - pouzito napr. v csShowCHBBrowse
        // 06.04.12 on;
        this.currentDbOptions = pParams.dbOptions;
        // povolit/zakazat tlacitko stiahnut/harmonizovat
        var d = pParams.downloadCfg;
        this.currentRecDwnCfg = d;
        // tlacitka stiahnut/harm a OK su navzajom vylucne, t.j. akonahle je download konfig, nepovolime OK
        this.getCmp('pbRecDownload').setDisabled(!d);
        // 08.04.15 on; budu to i skryvat
        this.getCmp('pbRecDownload').setVisible(d);
        // 10.12.14 on; moznost zakazat tlacitko OK
        //this.getCmp('pbOK').setDisabled(d);
        this.getCmp('pbOK').setDisabled(d || this.openParams.csDisabledOKBtn);
        // harmonizacia je povolena, ak je povolene stiahnutie a zaroven mame definovany target
        d = d && d.harmnzTarget;
        this.getCmp('pbRecHarmonz').setDisabled(!d);
        // 08.04.15 on; budu to i skryvat
        this.getCmp('pbRecHarmonz').setVisible(d);
        // 16.11.16 on; moznost skryt checkbox browse
        i3.setVisibility(this.getCmp('cbBrowse'), this.csShowCHBBrowse());
        // 16.11.16 on; moznost skryt checkbox ascii
        i3.setVisibility(this.getCmp('cbASCII'), this.csShowCHBAscii(i3.csUseASCII));
        // 18.11.16 on; moznost skryt checkbox truncation
        i3.setVisibility(this.getCmp('cbSearchTrunc'), this.csShowCHBTruncation());
        // 18.11.16 on; moznost skryt checkbox fraze
        i3.setVisibility(this.getCmp('cbSearchPhrase'), this.csShowCHBPhrase());
        // 16.11.16 on; doplneno
        i3.setVisibility(this.getCmp('pbScan'), this.csShowScan());
        if (this.csShowScan()) {
            this.csTabPanel.unhideTabStripItem(this.csPanelScan);
        } else {
            this.csTabPanel.hideTabStripItem(this.csPanelScan);
        }
        // 16.11.16 on; rozsireno a presunuto do csSetupClassN
        //i3.setVisibility(this.getCmp('pbSearch'), !pParams.csOnlyScan);
        //i3.setVisibility(this.getCmp('pnlDisplay'), !pParams.csOnlyScan);
        i3.setVisibility(this.getCmp('pbSearch'), this.csShowSearch(pParams.csOnlyScan));
        i3.setVisibility(this.getCmp('pnlDisplay'), this.csShowSearch(pParams.csOnlyScan));
        if (this.csShowSearch(pParams.csOnlyScan)) {
            this.csTabPanel.unhideTabStripItem(this.csPanelSearch);
        } else {
            this.csTabPanel.hideTabStripItem(this.csPanelSearch);
        }
        // 30.08.18 on; tlacitko vsechny zaznamy
        this.getCmp('pbInsertAll').setDisabled(!pParams.showInsertAllBtn);
        this.getCmp('pbInsertAll').setVisible(pParams.showInsertAllBtn);
        // 2.11.21 on;
        this.csDownloadDNUser = pParams.csDownloadDNUser;
        // 18.01.22 on; limity vazane na db
        this.ColLimits = pParams.ColLimits;
        this.colLimitsData = pParams.colLimitsData;
        this.colLimitsApplyCB = pParams.colLimitsApplyCB;
        // 18.01.22 on; schovat alebo povolit combo "Limits" & pripadne mu nastavit collector object
        var compLimits = this.getCmp('colLimits');
        i3.setVisibility(compLimits, this.ColLimits);
        compLimits.csColPanel = this.ColLimits;
        compLimits.values = this.colLimitsData;
    },
    /**
     * Toto je volane z usrDoSearch pred otvorenim flexpopu na nacitanie store pouziteho pre zoznam tried.
     * Classn combo na rozdiel od indexoveho a ZF sa neplni zo statickej tabulky z DB, ale obsah store
     * sa vytvare dynamicky zo zdrojovych dat zadanych ako pole.
     * @private
     */
    csSetupClassNCombo: function(pParams) {
        // pokial v parametroch je len jeden udaj, prekonvertujeme typ na pole
        // aby sme mohli pouzit jednotny pristup
        if (typeof pParams.classn === 'string') {
            pParams.classn = [pParams.classn];
            pParams.displayFmt = [pParams.displayFmt];
            pParams.idxlistStoreId = [pParams.idxlistStoreId];
        }
        // dynamicky naplnime combo s triedami
        var aClassDT = [];
        this.csStoreClassN.removeAll();
        // vycistit nase store
        // pre kazdu triedu z parametrov pridat jeden riadok do combobox/store
        Ext.each(pParams.classn, function(pClassN) {
            // 23.07.05 on; moznost zadat popisek db
            if (Ext.isArray(pClassN)) {
                aClassDT.push(new this.csStoreClassN.Record({
                    id: pClassN[0],
                    text: pClassN[1]
                }));
            } else {
                aClassDT.push(new this.csStoreClassN.Record({
                    id: pClassN,
                    text: pClassN
                }));
            }
        }, this);
        this.csStoreClassN.add(aClassDT);
        // a napln ho datami zo zdroja
    },
    /**
     * Otvorenie dialogu flexpopu s materskeho okna.
     * 1. odosle uvodny search (pripadne browse/scan)
     * 2. v pripade, ze sa najde prave jeden zaznam, tento zaznam sa okamzite vrati
     *    volajucej aplikacii
     *    (?) toto je mozne este do buducna prehodnotit - usetri sa uzivatelovi jeden
     *    klik, ale moze ma nezelany efekt (pripadne sa moze spravit nastavitelne
     * 3. zobrazia sa vysledky - uzivatel moze spustat scan/search/browse podla potreby
     * 4. po kliknuti na riadok v search sa vysledky predaju volajucej aplikacii
     *    via config option "callback"
     *
     * @param {Object} pParams
     *   trojica poli, kt. sa moze opakovat pre viacere databazy:<br>
     *     classn:           trieda na ktorej spustit search. Neskor by mohlo byt pole so zoznamom tried<br>
     *     displayFmt:       nazov display formatu pre WS search (I2_EXPORT)<br>
     *     idxlistStoreId:   store id najlepsie existujuceho store so zoznamom hodnot pre combo s vyberom poli<br><br>
     *
     *
     *   displayFmtPnl     store id so stat.dabulkou udavajucou zoznam ZF pre pravy panel<br>
     *                     ak nebude uvedene panel nebude dostupny<br>
     *   initUseAttr:      cislo atributu, na ktory otvorit zoznam poli<br>
     *                     neskor mozeme dorobit moznost toto neuviest a zoberie sa prve zo store<br>
     *   initUseAttrInt:   stejne jako initUseAttr, ale ma vyssi prioritu (pouzito v digitalni kronice)<br>
     *   initTerm:         init term - moze byt prazdny<br>
     *   searchMode:       search mode (0 - scan,1 - search, 2 - browse)<br>
     *   callback:         callback function to call on selection<br>
     *   scope:            callback scope<br>
     *   wannaMarcRes      true/false ci chceme ako vysledok zaznam v MARC<br>
     *                     default false: vratit zaznam v ZF<br>
     *                     true: vratit zaznam v MARC<br>
     *   autoReturn        true/false, ci v pripade najdenia prave jedneho zaznamu ho hned mame vratit<br>
     *                     zatial default false<br>
     *
     *   CSNewRecPanel:    trieda panelu, ktora bude pouzita na vytvorenie noveho zaznamu<br>
     *   CSNewRecPanelInt: stejne jako CSNewRecPanel, ale s vyssi prioritou - ve specialnich pripadech lze nastavit jiny (zadny) formular pro zapis noveho zaznamu (napr. 2 ruzna flexpopup okna v 1 fieldsetu)
     *   csNewRecTitle:    titulok okienka pre novy zaznam<br>
     *                     POZOR: aktualne je napevno, ze trieda do kt. sa budu zaznamy vkladat, je prva trieda
     *                     zo zoznamu pre search. Ak bude v zozname viac databaz, insert pojde do prvej z nich.<br>
     *
     *   csNewRecWinWidth  moznost nastavit sirku okna, default je 800px<br>
     *   csNewRecWinY      moznost nastavit pozici okna, vzdalenost od vrchu<br>
     *
     *   ColLimits:        constructor panelu pre editor limit<br>
     *   colLimitsData     vstupne data pre collector limit<br>
     *   colLimitsApplyCB  callback, ktory ma aplikovat limity na search store<br>
     *                     + tiez do colLimitsData vygenerovat pomocne pole symDisplay, ktore obsahuje textovu sumarizaciu
     *                     limit pre ucely zobrazenia uzivatelovi<br>
     *   csOnlyScan        true/false, povoli pouze scan v DB (obdoba popup scan obrazovky ze zclienta)
     *                     default false<br>
     */
    usrDoSearch: function(pParams) {
        if (i3.getOption('flexpop_debug')) {
            console.log('flx usrDoSearch', pParams, ', srch-store', this.csPanelSearch.store, '; v=', this.csPanelSearch.store.baseParams.v);
        }
        var s;
        // kopia parametrov pri volani search - t.j. aktualny rezim FlexPopu
        // pouziva sa prakticky len pri zmene triedy (ak je multi-class flexpop)
        this.openParams = pParams;
        // 20.11.14 on; vraceno sem a zaroven skryto (jinak to neumim), v metode csSetupClassN musi byt uz vygenerovany DOM, problem byl v muz aplikaci, Narozeni, Misto, Novy zaznam, vyhkledani geo zaznamu
        // 31.07.14 on; presunute niz
        // setvalue je mozne robit az po "show", pretoze az "show" vygeneruje komponenty do DOM
        this.show();
        this.hide();
        // vygenerovanie obsahu comboboxu pre zoznam tried
        this.csSetupClassNCombo(pParams);
        // 04.11.10 on; presunute jinam
        /*// nastavit store pre zoznam ZF
        this.csSetupStore(this.csStoreFMT, pParams.displayFmtPnl, 'fmt');
        // panel zobrazit alebo schovat
        if (pParams.displayFmtPnl) {
        this.csPanelDisplay.expand(true);
        }
        else {
        this.csPanelDisplay.collapse(true);
        }*/
        // flexpop windows title
        if (pParams.flexWinTitle) {
            s = i3.ui.FlexPop.tx.txFlexWinTitle + ': ' + pParams.flexWinTitle;
            // customized
        } else {
            s = i3.ui.FlexPop.tx.txFlexWinTitle;
            // standard
        }
        this.setTitle('<span class="icon-search" aria-hidden="true"></span> ' + s);
        // 12.05.20 on; zmena popisku tlacitka OK
        if (pParams.csBtnOkCaption) {
            this.getCmp('pbOK').setText(pParams.csBtnOkCaption);
        }
        var csCallback = (pParams.searchMode > 0) ? this.csOnSearch : this.csOnScan;
        // 26.07.12 on; doplni parametry o callback - vyvolani seacrh metody
        // prestavenie flexpopu na prvu triedu z parametrov
        this.csSetupClassN({
            classn: pParams.classn[0],
            displayFmt: pParams.displayFmt[0],
            idxlistStoreId: pParams.idxlistStoreId[0],
            displayFmtPnl: this.csGetDisplayFmtPnl(pParams.displayFmtPnl, 0), // 04.11.10 on;
            csSetupCallback: csCallback, // 26.07.12 on; doplneno
            csSetupScope: this, // 26.07.12 on; doplneno
            dbOptions: Ext.isArray(pParams.dbOptions) ? pParams.dbOptions[0] : null, // 16.11.16 on;
            showInsertAllBtn: pParams.showInsertAllBtn, // 30.08.18 on;
            csDownloadDNUser: pParams.csDownloadDNUser,
            // 23.11.21 on; doplneno
            downloadCfg: Ext.isArray(pParams.downloadCfg) ? pParams.downloadCfg[0] : null,
            // 18.01.22 on; limity vazane na db
            ColLimits: Ext.isArray(pParams.ColLimits) ? pParams.ColLimits[0] : pParams.ColLimits,
            colLimitsData: Ext.isArray(pParams.colLimitsData) ? pParams.colLimitsData[0] : pParams.colLimitsData,
            colLimitsApplyCB: Ext.isArray(pParams.colLimitsApplyCB) ? pParams.colLimitsApplyCB[0] : pParams.colLimitsApplyCB
        });
        // v pripade, ze zoznam tried je len jednoclenny, tak schovame combo so zoznamom,
        // zbytocne by plietlo
        var compClass1 = this.getCmp('classn'),
            bMultiClassSel = pParams.classn.length > 1;
        i3.setVisibility(compClass1, bMultiClassSel);
        i3.setVisibility(this.csToolBarClassNTx, bMultiClassSel);
        // 23.07.15 on; podpora popisku tridy
        if (Ext.isArray(pParams.classn[0])) {
            compClass1.setValue(pParams.classn[0][0]);
        } else {
            compClass1.setValue(pParams.classn[0]);
        }
        // 29.08.13 on; ve specialnich pripadech lze nastavit jiny (zadny) formular pro zapis noveho zaznamu (napr. 2 ruzna flexpopup okna v 1 fieldsetu) - CSNewRecPanelInt
        if (pParams.CSNewRecPanelInt !== undefined) {
            pParams.CSNewRecPanel = pParams.CSNewRecPanelInt;
        }
        // schovat alebo povolit tlacitko "New"
        i3.setVisibility(this.getCmp('pbNew'), pParams.CSNewRecPanel);
        // 18.01.12 on; stejne nastavi i separator
        i3.setVisibility(this.getCmp('pbNewS'), pParams.CSNewRecPanel);
        // 16.11.16 on; nema vyznam
        // 18.01.12 on; povolit pouze Scan v PB
        //if (pParams.csOnlyScan === undefined) {
        //  pParams.csOnlyScan = false;
        //}
        // 16.11.16 on; rozsireno a presunuto do csSetupClassN
        /*//i3.setVisibility(this.getCmp('pbSearch'), !pParams.csOnlyScan);
        //i3.setVisibility(this.getCmp('pnlDisplay'), !pParams.csOnlyScan);
        i3.setVisibility(this.getCmp('pbSearch'), this.csShowSearch(pParams.csOnlyScan));
        i3.setVisibility(this.getCmp('pnlDisplay'), this.csShowSearch(pParams.csOnlyScan));
        if (this.csShowSearch(pParams.csOnlyScan)) {
        this.csTabPanel.unhideTabStripItem(this.csPanelSearch);
        } else {
        this.csTabPanel.hideTabStripItem(this.csPanelSearch);
        }*/
        // 13.06.24 on; moznost zmenit text ZF
        var cmp = this.getCmp('pnlDisplay');
        if (cmp) {
            cmp.setTitle(pParams.csDisplayFormatText || i3.ui.FlexPop.tx.txDisplayPanelTitle);
        }
        // schovat alebo povolit combo "Limits" & pripadne mu nastavit collector object
        var compLimits = this.getCmp('colLimits');
        // 18.01.22 on; limity podle tridy
        //i3.setVisibility(compLimits, pParams.ColLimits);
        //compLimits.csColPanel = pParams.ColLimits;
        //compLimits.values = pParams.colLimitsData;
        i3.setVisibility(compLimits, this.ColLimits);
        compLimits.csColPanel = this.ColLimits;
        compLimits.values = this.colLimitsData;
        var compLimitsTT = this.getCmp('colLimitsTT');
        if (!compLimitsTT) {
            //alert('creating tt');
            var xxx = new Ext.ToolTip({
                target: this.getIdPref('pbSearch'),
                //width: 400,
                autoWidth: true, // 29.01.10 on; nastaveno autoWidth
                id: this.getIdPref('colLimitsTT'),
                html: '',
                dismissDelay: 10000, // auto hide
                //closable: true,
                autoHide: true,
                trackMouse: true
            });
        }
        // 29.08.13 on; ve specialnich pripadech lze nastavit jiny index (napr. 2 ruzna flexpopup okna v 1 fieldsetu) - initUseAttrInt
        // use atribut parameter nie je povinny (ak sa neuvedie, potom v class setupe
        // sa nastavi combo na prvu polozku z index store)
        if (pParams.initUseAttrInt) {
            this.getCmp('index').setValue(pParams.initUseAttrInt);
        } else if (pParams.initUseAttr) {
            this.getCmp('index').setValue(pParams.initUseAttr);
        }
        this.getCmp('term').setValue(pParams.initTerm);
        this.getCmp('cbBrowse').setValue(pParams.searchMode === 2);
        // 16.11.16 on; presunuto do csSetupClassN
        // 06.02.14 on; ASCII vyhledavani
        //i3.setVisibility(this.getCmp('cbASCII'), i3.csUseASCII);
        this.getCmp('cbASCII').setValue(pParams.searchMode === 3);
        // 14.08.14 on; prednastavi atributy vyhledavani, pokud jsou nastaveny
        // truncation
        if (i3.csCheckboxTruncation !== undefined) {
            this.getCmp('cbSearchTrunc').setValue(i3.csCheckboxTruncation);
        }
        // phrase
        if (i3.csCheckboxPhrase !== undefined) {
            this.getCmp('cbSearchPhrase').setValue(i3.csCheckboxPhrase);
        }
        // browse - nastaveni browse pouze pokud nejde o browse vyhledavani
        if (pParams.searchMode !== 2) {
            if (i3.csCheckboxBrowse !== undefined) {
                this.getCmp('cbBrowse').setValue(i3.csCheckboxBrowse);
            }
        }
        // ascii - nastaveni ascii pouze pokud nejde o ascii vyhledavani
        if (pParams.searchMode !== 3) {
            if (i3.csCheckboxASCII !== undefined) {
                this.getCmp('cbASCII').setValue(i3.csCheckboxASCII);
            }
        }
        // 26.07.12 on; presunuto do callbacku csSetupClassN
        /*// najst componentu tlacitka a poslat jej spravu
        var elPB = this.getCmp((pParams.searchMode > 0) ? 'pbSearch' : 'pbScan');
        // spustime uvodny search (v podstate akoby uzivatel klikol na search)
        elPB.fireEvent('click');*/
        // 31.07.14 on; funkce aktivovana
        // 26.07.12 on; funkce znefunkcnena nevyuziva se a funkcnost byla zmenene, pripadne je nutne dopracovat
        // Chceme dosiahnut, aby v pripade, ked sa v uvodnom searchi (spustanom automaticky
        // hned po otvoreni flexpopu) najde prave jeden zaznam
        // aby sa tento zaznam automaticky otvoril
        // Zalozim 'onload' na search store a v pripade, ze na prvy pokus (single:true)
        // pride prave jeden zaznam, nastavim v search gride prvy riadok ako vybrany (on tam ziaden
        // iny aj tak neni) a poslem search gridu rowclick.
        //
        // funkciu, ale vyvolame len, ak bola aktivovana pomocou option
        var panelSearch = this.csPanelSearch;
        // neplati pro "vyhledavani" bez terminu - nevyvola se totiz 'load' event
        if (pParams.autoReturn && !i3.isEmptyString(pParams.initTerm)) {
            // 20.11.14 on; presunuto vys
            // 31.07.14 on; nestatne, ale jinak to neumim, musim formular zobrazit, aby se spravne vygenerovaly komponenty, nemelo by to byt postrehnutelne, ze se na chvilku zobrazi
            //this.show();
            //this.hide();
            // 11.01.19 on; preneseno do beforeload
            // zozbrazeni zpravy, ze probiha vyhledavani
            //var msgId = this.idpref + 'msg' + Math.floor((Math.random() * 1000) + 1);
            //i3.msgOn(i3.ui.FlexPop.tx.txSearching, '', '', msgId);
            panelSearch.store.on('load', function(pStore) {
                // 11.01.19 on; preneseno do beforeload
                //i3.msgOff(msgId);
                // pokud najde prave jeden zaznam
                if (pStore.getCount() === 1) {
                    panelSearch.getSelectionModel().selectRow(0);
                    panelSearch.fireEvent('rowdblclick', panelSearch, 0);
                } else {
                    this.show();
                }
            }, this /*panelSearch.store*/ , {
                single: true // just one time
            });
        } else {
            // 31.07.14 on; presunute sem
            this.show();
        }
        // 18.01.12 on; po zmenach prekresli okno
        this.doLayout();
    },
    /**
     * Vrati true pokud se ma zobrazit search
     */
    csShowSearch: function(pbOnlyScan) {
        // 20.11.17 on; zmena ulozeni parametru - budou v poli
        //var bVisible = (!this.currentDbOptions || (this.currentDbOptions.fieldLocate(',', 'HIDESEARCH') === 0));
        var bVisible = (!this.currentDbOptions || (this.currentDbOptions.indexOf('HIDESEARCH') === -1));
        bVisible = bVisible && !pbOnlyScan;
        return bVisible;
    },
    /**
     * Vrati true pokud se ma zobrazit scan
     */
    csShowScan: function() {
        // 08.06.20 on; podminka csHideFlexPopupScan
        // 20.11.17 on; zmena ulozeni parametru - budou v poli
        //var bVisible = (!this.currentDbOptions || (this.currentDbOptions.fieldLocate(',', 'HIDESCAN') === 0));
        var bVisible = ((!this.currentDbOptions || (this.currentDbOptions.indexOf('HIDESCAN') === -1)) && !i3.csHideFlexPopupScan);
        return bVisible;
    },
    /**
     * Vrati true pokud se ma zobrazit checkbox browse
     */
    csShowCHBBrowse: function() {
        // 04.11.21 on; moznost skryt globalne browse
        // 20.11.17 on; zmena ulozeni parametru - budou v poli
        //var bVisible = (!this.currentDbOptions || (this.currentDbOptions.fieldLocate(',', 'HIDECHBBROWSE') === 0));
        var bVisible = ((!this.currentDbOptions || (this.currentDbOptions.indexOf('HIDECHBBROWSE') === -1)) && !i3.csHideFlexPopupBrowse);
        return bVisible;
    },
    /**
     * Vrati true pokud se ma zobrazit checkbox ascii
     */
    csShowCHBAscii: function(pbUseAscii) {
        if (!pbUseAscii) {
            return false;
        }
        // 20.11.17 on; zmena ulozeni parametru - budou v poli
        //var bVisible = (!this.currentDbOptions || (this.currentDbOptions.fieldLocate(',', 'HIDECHBASCII') === 0));
        var bVisible = (!this.currentDbOptions || (this.currentDbOptions.indexOf('HIDECHBASCII') === -1));
        return bVisible;
    },
    /**
     * Vrati true pokud se ma zobrazit checkbox truncation
     */
    csShowCHBTruncation: function() {
        // 20.11.17 on; zmena ulozeni parametru - budou v poli
        //var bVisible = (!this.currentDbOptions || (this.currentDbOptions.fieldLocate(',', 'HIDECHBTRUNCATION') === 0));
        var bVisible = (!this.currentDbOptions || (this.currentDbOptions.indexOf('HIDECHBTRUNCATION') === -1));
        return bVisible;
    },
    /**
     * Vrati true pokud se ma zobrazit checkbox phrase
     */
    csShowCHBPhrase: function() {
        // 08.06.20 on; podminka csHideFlexPopupPhrase
        // 20.11.17 on; zmena ulozeni parametru - budou v poli
        //var bVisible = (!this.currentDbOptions || (this.currentDbOptions.fieldLocate(',', 'HIDECHBPHRASE') === 0));
        var bVisible = ((!this.currentDbOptions || (this.currentDbOptions.indexOf('HIDECHBPHRASE') === -1)) && !i3.csHideFlexPopupPhrase);
        return bVisible;
    },
    /**
     * Kliknutie na tlacitko Search. Vyvola request search alebo browse.
     * a prepne na zalozku so zoznamom vysledkov vyhladavania.
     *
     */
    csOnSearch: function() {
        this.csShowStatus('');
        var bFlxDebug = i3.getOption('flexpop_debug');
        var panelSearch = this.csPanelSearch;
        if (bFlxDebug) {
            console.log('flx csOnSearch before limits panelSearch.store.baseParams:', panelSearch.store.baseParams, '; v=', panelSearch.store.baseParams.v);
        }
        var c;
        var nAttrNo = this.getCmp('index').getValue(),
            sSrchTerm = this.getCmp('term').getValue();
        var bTrunc, bPhrase, bBrowse, cmpTerm = this.getCmp('term');
        // 18.11.16 on; pridana kontrola, jestli je checkbox viditelny
        //bTrunc = this.getCmp('cbSearchTrunc').getValue();
        c = this.getCmp('cbSearchTrunc');
        // 12.06.17 on; pokud je cely formular skryty, je i isVisible === false
        //if (c.isVisible()) {
        if (!c.hidden) {
            bTrunc = c.getValue();
        } else {
            bTrunc = false;
        }
        // 18.11.16 on; pridana kontrola, jestli je checkbox viditelny
        //bPhrase = this.getCmp('cbSearchPhrase').getValue();
        c = this.getCmp('cbSearchPhrase');
        // 12.06.17 on; pokud je cely formular skryty, je i isVisible === false
        //if (c.isVisible()) {
        if (!c.hidden) {
            bPhrase = c.getValue();
        } else {
            bPhrase = false;
        }
        // 06.02.14 on; zruseno nepouziva se
        //c = this.getCmp('cbSearchNewSE');
        // pole moze byt nepouzite
        //var bNewSE = c ? c.getValue() : false;
        // 21.01.14 on; moznost nastavit novy SE pro konkretni PB v konfiguraci
        //bNewSE = bNewSE || this.openParams.csUseNewSE;
        var bNewSE = i3.csUseNewSE || false;
        // 18.11.16 on; pridana kontrola, jestli je checkbox viditelny
        //var bBrowse = this.getCmp('cbBrowse').getValue();
        c = this.getCmp('cbBrowse');
        // 12.06.17 on; pokud je cely formular skryty, je i isVisible === false
        //if (c.isVisible()) {
        if (!c.hidden) {
            bBrowse = c.getValue();
        } else {
            bBrowse = false;
        }
        // 06.02.14 on; podpora ascii vyhledavani
        var bASCII;
        c = this.getCmp('cbASCII');
        if (c) {
            // 21.11.17 on; potrebuju, aby vyhledavani pres ascii fungovalo, i kdyz neni ASCII tlactiko videt
            //              pres i3.csCheckboxASCII vynutim vyhledavani ASCII, ale na formulari to nebude videt - nnei to tam potreba
            //bASCII = i3.csUseASCII && c.getValue();
            bASCII = c.getValue();
        } else {
            bASCII = false;
        }
        // 09.09.13 on; kvuli tomu, ze nekdy potrebuju mit v seznamu indexu stejnou hodnotu, musim si ji v ciselniku rozsirit o "-n"
        //              a tady musi druhou cast odseknout
        nAttrNo = this.csGetIndexNo(nAttrNo);
        // 03.07.12 on; attr nemusi byt jneom cislo napr. 1c
        //if (!(nAttrNo > 0)) {
        if (nAttrNo === '') {
            // 'No index selected - search not possible.'
            i3.msg(i3.ui.FlexPop.tx.txNoIndexSelected);
            return;
        }
        // poskladat vybrane PQF atributy pre search
        var oAttParams = {
            "1": nAttrNo
        };
        if (bTrunc) {
            oAttParams[5] = 1;
        }
        if (bNewSE) {
            oAttParams[98] = 2;
        }
        if (bPhrase) {
            oAttParams[4] = 1;
        }
        if (bBrowse) {
            oAttParams[98] = 1;
        }
        if (bASCII) {
            oAttParams[99] = 1;
        }
        var sPQF = panelSearch.store.createSearchQuery(oAttParams, sSrchTerm);
        panelSearch.store.setSearchQueryPQF(sPQF);
        // kazdopadne vymazat data
        //panelSearch.store.removeAll();
        // 31.07.14 on; pridana podminka
        // reset panelu zo ZF (19.10.09 rs)
        if (this.csPanelDisplay.body) {
            this.csPanelDisplay.body.update('');
        }
        // 18.01.12 on; moznost pouzit pouze Scan
        if (this.openParams.csOnlyScan) {
            this.csTabPanel.activate(this.csPanelScan);
        } else {
            this.csTabPanel.activate(panelSearch);
        }
        // aplikovat limity, ak nejake su otvorene
        var p = this.openParams;
        //console.log('csOnSearch before limits panelSearch.store.baseParams:', panelSearch.store.baseParams);
        // pomocka pre vynimku - pozriet aktualne vybrane DB
        var sDB = panelSearch.store.baseParams.db;
        if (Ext.isArray(sDB)) {
            sDB = sDB.join(',');
        }
        ///// ZATIAL NATVRDO VYNIMKA - DORIESIT
        // flexpop poriesit vynimku pre I2e triedy
        // (toto je skuska eclipse TODo komentara, kt. ale nefunguje (??)
        // ,alo by pridat text do taskov)
        if (bFlxDebug) {
            console.log('flexpop store-baseparams=', panelSearch.store.baseParams, '; v=', panelSearch.store.baseParams.v);
        }
        // 13.01.22 on; promenna uchova, jestly byly vybrany nejake limity
        var bLimitUsed = false;
        // 13.01.22 on; vrati povinnost vyplneni terminu
        cmpTerm.allowBlank = false;
        cmpTerm.validate();
        // 29.01.10 on; nacte tooltip
        var px = this.getCmp('colLimitsTT');
        // 25.08.22 on; moznost nastavit limity globalne pro vsechna vyhledavani v aplikaci
        // 18.01.22 on; zmena - limity budou zavisle na vybrane db
        //if (p.colLimitsApplyCB && (sDB.indexOf('I2e') === -1)) {
        //if (this.colLimitsApplyCB && (sDB.indexOf('I2e') === -1)) {
        if ((this.colLimitsApplyCB || i3.colLimitsApplyCB) && (sDB.indexOf('I2e') === -1)) {
            this.csSaveLimitsData();
            //                              uschovat pracovne data limit
            // apply limits to the search store
            //console.log('p.colLimitsApplyCB');
            if (bFlxDebug) {
                console.log('flexpop store-baseparams-w-limits=', panelSearch.store.baseParams, '; v=', panelSearch.store.baseParams.v);
            }
            // 25.08.22 on; moznost nastavit limity globalne pro vsechna vyhledavani v aplikaci
            // 18.01.22 on; zmena - limity budou zavisle na vybrane db
            // 22.10.21 on; potrebuju predat i cislo indexu - nAttrNo
            //p.colLimitsApplyCB(panelSearch.store, p.colLimitsData, nAttrNo);
            //this.colLimitsApplyCB(panelSearch.store, this.colLimitsData, nAttrNo);
            if (this.colLimitsApplyCB) {
                this.colLimitsApplyCB(panelSearch.store, this.colLimitsData, nAttrNo);
            } else if (i3.colLimitsApplyCB) {
                i3.colLimitsApplyCB(panelSearch.store, this.colLimitsData, nAttrNo);
            }
            // troska divocinka. callback updatne internu premennu symDisplay a tu ju nechame zobrazit
            var compLimits = this.getCmp('colLimits');
            // 11.04.12 on; podminka
            if (compLimits) {
                compLimits.updateDisplayVal();
                // 11.04.12 on; podminka
                // precitat telo qtipu a updatnut ho
                if (compLimits.values) {
                    var s = compLimits.values.symDisplay;
                    //console.log('qtip setup ', px, s);
                    if (px) {
                        if (px.body) {
                            px.body.update(s);
                        } else {
                            px.html = s;
                        }
                        // 29.01.10 on; pokud je text prazdny, zakaze tooltip
                        px.setDisabled(s === '');
                    }
                    // 13.01.22 on; zjisti, jestli jsou vybrane nejake limity, aby se spustil search i bez terminu
                    //              je potreba v colLimitsApplyCB nastvit promenou bLimitUsed
                    bLimitUsed = compLimits.values.bLimitUsed;
                    cmpTerm.allowBlank = bLimitUsed;
                    cmpTerm.validate();
                } else {
                    // 30.04.24 on; zakaze tooltip - je stejne prazdny
                    if (px) {
                        px.setDisabled(true);
                    }
                }
            }
        } else {
            // 29.01.10 on; nejsou pouzite limity, zakaze tooltip
            if (px) {
                px.setDisabled(true);
            }
        }
        // 13.01.22 on; ani termin ani limity
        // 08.09.09 rs; default search term zruseny
        //if (sSrchTerm === '') {
        if ((sSrchTerm === '') && (!bLimitUsed)) {
            // 22.06.12 on; viz. metoda csShowStatus
            //this.csShowStatus(i3.ui.FlexPop.tx.txNoSearchTerm); // 'No search term.'
            // 13.01.22 on; smaze vyhledane zaznamy
            panelSearch.store.removeAll();
            return;
        }
        // 13.01.22 onl pokud je ale temin prazdny a ja nastaveny novy SE, musim ho pridat
        if ((sSrchTerm === '') && bNewSE) {
            panelSearch.store.baseParams.query = '@attr 98=2 ' + panelSearch.store.baseParams.query;
        }
        // toto je tu zatial natvrdo - neskor sa da vylepsit
        panelSearch.store.baseParams.from = 1;
        panelSearch.store.baseParams.to = 20;
        // loading the store starts the search
        panelSearch.store.load({
            add: false
        });
    },
    /**
     * Kliknutie na tlaciko Scan.
     * Odosle scan request a prepne do panelu scan.
     *
     * @param {String} psOptions nastaveni pro scan Forward a Back (F/B)
     */
    csOnScan: function(psOptions) {
        var nAttrNo = this.getCmp('index').getValue(),
            term = this.getCmp('term').getValue(),
            bCompl = this.getCmp('cbScanCompl').getValue(),
            o, p_bBackward;
        // 09.09.13 on; kvuli tomu, ze nekdy potrebuju mit v seznamu indexu stejnou hodnotu, musim si ji v ciselniku rozsirit o "-n"
        //              a tady musi druhou cast odseknout
        nAttrNo = this.csGetIndexNo(nAttrNo);
        // 03.07.12 on; attr nemusi byt jneom cislo napr. 1c
        //if (!(nAttrNo > 0)) {
        if (nAttrNo === '') {
            // 'No index selected - scan not possible.'
            i3.msg(i3.ui.FlexPop.tx.txNoIndexNoScan);
            return;
        }
        if (psOptions === 'F') {
            this.csPanelScan.getSelectionModel().selectLastRow();
            o = this.csPanelScan.getSelectionModel().getSelected();
            if (this.csPanelScan.getSelectionModel().getCount() > 0) {
                o = this.csPanelScan.getSelectionModel().getSelected();
                term = o.data.term;
            }
        } else if (psOptions === 'B') {
            this.csPanelScan.getSelectionModel().selectFirstRow();
            if (this.csPanelScan.getSelectionModel().getCount() > 0) {
                o = this.csPanelScan.getSelectionModel().getSelected();
                term = o.data.term;
            }
            p_bBackward = true;
            // backward scan
        }
        var panelScan = this.csPanelScan;
        // 06.04.12 on; zapojena funkce pro vyhodnoceni atributu kompletniho terminu
        //panelScan.store.setScanQuery(nAttrNo, term, ( bCompl ? 2 : 1), undefined, p_bBackward);
        panelScan.store.setScanQuery(nAttrNo, term, this.csComplTermAttr(bCompl, this.currentDbOptions), undefined, p_bBackward);
        panelScan.store.load();
        this.csTabPanel.activate(panelScan);
        panelScan.getSelectionModel().selectFirstRow();
    },
    /**
     * Zmena triedy na flexpop-e
     * Ma vyznam ak je flexpop vyvolany s moznostou zmeny triedy (napr. vyber z bazy
     * holdingov alebo z bazy titulov). Poriesi prestavenie flexpopu na vybranu triedu.
     */
    csOnChangeClass: function(form, pNewClass) {
        var bOK = false,
            p = this.openParams;
        // prejst vstupnu sadu poli, najst triedu na kt. menime a zavolat prislusnu funkciu na zmenu kontextu okna
        Ext.each(p.classn, function(pClass, i) {
            // podpora pro popisek tridy
            if (Ext.isArray(pClass)) {
                pClass = pClass[0];
            }
            if (pNewClass === pClass) {
                this.csSetupClassN({
                    classn: pClass,
                    // 23.07.15 on; pokud neni definovano, pouziju prvni
                    displayFmt: (p.displayFmt[i] === undefined) ? p.displayFmt[0] : p.displayFmt[i],
                    idxlistStoreId: (p.idxlistStoreId[i] === undefined) ? p.idxlistStoreId[0] : p.idxlistStoreId[i],
                    downloadCfg: Ext.isArray(p.downloadCfg) ? p.downloadCfg[i] : null,
                    displayFmtPnl: this.csGetDisplayFmtPnl(p.displayFmtPnl, i), // 04.11.10 on;
                    dbOptions: Ext.isArray(p.dbOptions) ? p.dbOptions[i] : null, // 06.04.12 on;
                    // 18.01.22 on; limity vazane na db
                    ColLimits: Ext.isArray(p.ColLimits) ? p.ColLimits[i] : p.ColLimits,
                    colLimitsData: Ext.isArray(p.colLimitsData) ? p.colLimitsData[i] : p.colLimitsData,
                    colLimitsApplyCB: Ext.isArray(p.colLimitsApplyCB) ? p.colLimitsApplyCB[i] : p.colLimitsApplyCB,
                    // 21.09.23 on; pri zmene tridy si musim predat download metodu
                    csDownloadDNUser: p.csDownloadDNUser
                });
                bOK = true;
                return false;
            }
        }, this);
        if (!bOK) {
            // Toto je interna chyba; zatial neprekladat, nemalo by nastat
            i3.msg('Class change to ' + pNewClass + ' FAILED!');
        }
    },
    /**
     * Uschovat pracovne data limit do volajucej komponenty
     * (ak si ona komponenta zadala data limit)
     * T.j. aktualne data limit su drzane vo "values" casti col_triggera colLimits, tato metoda
     * ich ulozi do pola, ktore poskytla volajuca komponenta.
     * Tak mozu zostat zachovane po uzavreti okna.
     */
    csSaveLimitsData: function() {
        // uchovat pracovne data limit (ak boli na vstupe zadane)
        var compLimits = this.getCmp('colLimits');
        // 18.01.22 on; limity vazane na db
        //if (this.openParams.colLimitsData) {
        //  this.openParams.colLimitsData = compLimits.values;
        //}
        if (this.colLimitsData) {
            this.colLimitsData = compLimits.values;
        }
    },
    /**
     * Vratit najdeny zaznam volajucej aplikacii.
     * V podstate zavola callback poskytnuty volajucou komponantou a preda jej vybrany zaznam.
     * Flexpop drzi v search gride zaznamy v ZF formate. Niekedy chceme vratit najdeny zaznam v MARC.
     * Toto sa dosahuje volbou "wannaMarcRes".
     *
     * @param {i3.Marc} pRecord Zaznam, ktory chceme vratit.
     */
    csReturnRecord: function(pRecord) {
        var s, sZF, oRec;
        this.csSaveLimitsData();
        //                              uschovat pracovne data limit
        // ma nastavenu callback funkciu?
        if (this.openParams.callback) {
            // schovat flexpop
            this.hide();
            var op = this.openParams;
            // zavolame callback s uvedenim vybraneho zaznamu v prislusnom scope
            var scope = op.scope || this;
            // 18.01.12 on; scan
            if (op.csOnlyScan) {
                // return record 1:1 (in selected display format)
                op.callback.call(scope, pRecord);
            } else {
                // 30.07.13 on; pokud uzivatel nevybere zadny zaznam
                if (!pRecord) {
                    op.callback.call(scope, null);
                    return;
                }
                // pozaduje sa vratit zaznam v MARC formate?
                if (op.wannaMarcRes && pRecord) {
                    // 27.07.12 on; zaznam zkusi nacist z uzlu ZF, predpokladam, ze ZF v marc formatu ma nazev LINEMARC
                    sZF = 'LINEMARC';
                    s = this.csGetDFStore(pRecord, sZF);
                    if (s !== '') {
                        oRec = new i3.Marc({
                            data: s,
                            fmt: sZF,
                            t001: pRecord.t001,
                            classn: pRecord.classn
                        });
                        op.callback.call(scope, oRec);
                    } else {
                        // reload record in MARC format
                        // volame WS search a callback jednoducho posunieme na dalsiu uroven
                        i3.WS.getRecord({
                            classn: pRecord.classn,
                            t001: pRecord.t001,
                            scope: scope,
                            success: op.callback
                        });
                    }
                    return;
                }
                // 27.07.12 on; zaznam zkusi nacist z uzlu ZF
                // return record 1:1 (in selected display format)
                //op.callback.call(scope, pRecord);
                sZF = this.getCmp('fmt').getValue();
                s = this.csGetDFStore(pRecord, sZF);
                if (s !== '') {
                    oRec = new i3.Marc({
                        data: s,
                        fmt: sZF,
                        t001: pRecord.t001,
                        classn: pRecord.classn
                    });
                    op.callback.call(scope, oRec);
                } else {
                    // jinak chyba
                    i3.msg(i3.fillInParams(i3.ui.FlexPop.tx.txDfNotFound, [sZF]));
                }
            }
        }
    },
    /**
     * Aktualizacia zadaneho zaznamu v okientu zobrazovacieho formatu.
     * @param {Object} pRecord
     *
     * 06.05.10 on; doplnena moznost vymazat ZF
     */
    csDispRecord: function(pRecord) {
        var p = this.csPanelDisplay;
        // 31.07.15 on; osetreno tady - jeste nebylo vykresleno
        if (!p.body) {
            return;
        }
        // 06.05.10 on; smazat
        if (pRecord === '') {
            p.body.update('');
            return;
        }
        var s = Ext.encode(pRecord);
        p.body.update('loading..');
        // zobrazit load-time message
        // precita aktualne vybrany ZF z comboboxu ZF
        var sZF = this.getCmp('fmt').getValue();
        // 24.07.12 on; nedrive se pokusi nacist zaznamu ze store
        s = this.csGetDFStore(pRecord, sZF);
        if (s !== '') {
            // vytvorime fiktivni zaznam
            var oRec = new i3.Marc({
                data: s,
                fmt: sZF,
                t001: pRecord.t001
            });
            s = i3.WS.zf2HTML(oRec);
            // zaktualizovat html obsah panelu "display"
            p.body.update(s);
        } else {
            // precitat z DB zaznam vo vybranom formate
            i3.WS.getRecord({
                classn: pRecord.classn,
                t001: pRecord.t001,
                fmt: sZF,
                //scope: scope,
                success: function(pRec) {
                    s = i3.WS.zf2HTML(pRec);
                    // zaktualizovat html obsah panelu "display"
                    p.body.update(s);
                }
            });
        }
    },
    /**
     * Funkce vrati ZF, pokud ho najde ve store.
     *
     * 24.07.12 on;
     */
    csGetDFStore: function(pRecord, psDF) {
        var i;
        // 30.07.13 on; podminka
        if (!pRecord) {
            return '';
        }
        for (i = 0; i < pRecord.zf.length; i += 1) {
            if (pRecord.zf[i].name === psDF) {
                return pRecord.zf[i].data;
            }
        }
        return '';
    },
    /**
     * Klik na tlacitko vytvorenia noveho zaznamu.
     * Vola nove popup okienko pre novy zaznam so zadanym vnutrom panelu; trieda sa pouzije aktualna trieda.
     */
    csOnNew: function() {
        var p = this.openParams,
            flexWin = this;
        // classn je pole, z ktoreho je mozne vyberat v comboboxe
        // ale toto zatial ignorujeme a berieme vzdy natvrdo prvy vyskyt. neskor sa to da vylepsit
        // uprava: v okamziku kliknutia na new zavrieme flexpop okienko
        // toto nam umozni volat singleton verziu flexpopu opakovane z dialogu pre vstup novej autority
        // neskor by sa to dalo vylepsit
        flexWin.close();
        // 23.07.15 on; moznost zadat jakoukoliv db
        var sClassInsert = p.csClassInsertDB || p.classn[0];
        if (sClassInsert.indexOf(',') > -1) {
            sClassInsert = sClassInsert.piece(',', 1);
        }
        // volat popup okienko pre vstup zaznamu
        i3.ui.csOpenDataWin({
            title: p.csNewRecTitle,
            CsPanel: p.CSNewRecPanel,
            // 23.01.14 on; moznost predat velikost a pozici okna v parametru panelu
            // toto bude potreba predavat parametrom!!
            width: p.csNewRecWinWidth || 800,
            y: p.csNewRecWinY,
            // 23.08.16 on; moznost zakazat help individualne
            csHideHelp: p.csNewRecHideHelp
        }, { // panel config
            csClassDflt: sClassInsert,
            csDisplayFmt: p.displayFmt,
            csOkCallback: function() {
                // call callback to return the data to caller
                // method apply() is same as method call() but uses arguments
                p.callback.apply(p.scope, arguments);
            },
            // forwardneme collectoru aj komplet flexpop parametre, mozu sa hodit
            // 05.11.09 rs; nesmieme forwardnut vsetko! takze to tame len do ineho uzla
            //              ten sa zatial na nic nepouziva; mozno by sa niekedy mohol hodit
            csFlexPopParamsCall: p,
            // toto potrebuju popup okienka s toolbarom
            csFlexPopParams: {
                classn: p.classn,
                idxlistStoreId: p.idxlistStoreId,
                displayFmt: p.displayFmt
            }
        });
    },
    /**
     * Stiahnutie alebo harmonizacia zaznamu. Aktivuje sa pri dodani vhodneho konfigu.
     * na vybrany zaznam.
     * Funkcia najprv zisti, ci sa uz dany externy zaznam v lokalnej baze nachadza a ak hej,
     * ponukne aktualizaciu, ak nie ponukne stiahnutie ako novy zaznam.
     *
     * @param {Object} pRecDownloadCfg  - konfiguracia stahovania pre tuto externu bazu (prichadza z params
     *                                    udanych pri otvarani flexpopu
     * @param {Object} pRecord          - zaznam zo zoznamu oznaceny pri otvoreni zaznamu
     * @param {String} pFnc             - W-download,
     *                                    H-harmonizacia
     */
    csRecordDownload: function(pRecDownloadCfg, pRecord, pFnc) {
        // 26.11.21 on; moznost preskocit vyhledani existujiciho zaznamu - vzdy zalozi novy zaznam
        if (pRecDownloadCfg.onlyInsert) {
            if (pFnc === 'W') {
                // je to stiahnutie - chcete zaznam stiahnut? t.j. vytvorit novy lokalny zaznam z externeho vzoru
                this.csRecordDownloadDN(pRecDownloadCfg, pRecord);
            } else {
                this.csRecordHarmonz(pRecDownloadCfg, pRecord);
            }
            return;
        }
        var sQuery = '@attr 1=2434 ' + pRecord.t001.singleQuote();
        if (!i3.isUnEmptyString(pRecDownloadCfg.destClass)) {
            i3.intError('csRecordDownload: Destination class is blank');
            return;
        }
        i3.WS.search({
            classn: pRecDownloadCfg.destClass,
            query: sQuery,
            // zaznam s danym NKID najdeny v lokalnej DB
            success: function() {
                if (pFnc === 'W') {
                    // je to stiahnutie - chcete lokalny zaznam aktualizovat?
                    this.csRecordDownloadUPD(pRecDownloadCfg, pRecord);
                } else {
                    // fillinparams doplni parameter aby sa string dal lahsie prelozit
                    // 'Záznam zodpovedajúci %s z externej db už v lokálnej báze existuje - vykonajte stiahnutie, nie harmonizáciu.
                    var sMsg = i3.fillInParams(i3.ui.FlexPop.tx.txDownloadLocExist, [pRecord.t001]);
                    i3.alert(sMsg);
                }
            },
            // zaznam s danym NKID nenajdeny v lokalnej DB
            failure: function(errmsg, o) {
                if (o && (o.ret_code === "0")) {
                    if (pFnc === 'W') {
                        // je to stiahnutie - chcete zaznam stiahnut? t.j. vytvorit novy lokalny zaznam z externeho vzoru
                        this.csRecordDownloadDN(pRecDownloadCfg, pRecord);
                    } else {
                        this.csRecordHarmonz(pRecDownloadCfg, pRecord);
                    }
                } else {
                    // Sem by sa nemal dostat; t.j. hlasku neprekladame (interna chyba)
                    i3.intError('sending search req. msg=' + errmsg);
                }
            },
            scope: this
        });
    },
    /**
     * Aktualizacia zaznamu - kontrolna otazka
     * @private
     */
    csRecordDownloadUPD: function(pRecDownloadCfg, pRecord) {
        Ext.Msg.show({
            // 'Stiahnutie záznamu'
            title: i3.ui.FlexPop.tx.txRecDownload2,
            // 'Záznam už lokálnej databáze existuje. Chcete lokálny záznam aktualizovať?<br><br>Pozn. sťahuje sa vždy do ostrej databázy.'
            msg: i3.ui.FlexPop.tx.txRecDownloadLokExistUpdt,
            // 13.08.12 on; lokalizace
            //buttons : Ext.Msg.YESNO,
            buttons: i3.ui.YesNo,
            fn: function(pButtonId) {
                if (pButtonId === 'yes') {
                    this.csRecordDownloadUPD2(pRecDownloadCfg, pRecord);
                }
            },
            icon: 'icon-question',
            scope: this
        });
    },
    /**
     * Aktualizacia zaznamu - spustenie operacie
     *
     * @param {Object} pRecDownloadCfg
     * @param {Object} pRecord
     * @private
     */
    csRecordDownloadUPD2: function(pRecDownloadCfg, pRecord) {
        // aspon zatial je kod na stiahnutie novej a aktualizaciu existujucej totozny
        // rozdiel je len v serverovej casti, takze proste zavolame metodu pre download zaznamu
        //
        // treti param je '1'-povolene prepisanie exist.zaznamu
        this.csRecordDownloadDN2(pRecDownloadCfg, pRecord, '1');
    },
    /**
     * Stiahnutie zaznamu - kontrolna otazka
     * @private
     */
    csRecordDownloadDN: function(pRecDownloadCfg, pRecord) {
        // 26.11.21 on; bez dotazu, pokud se zadny zaznam nehledal
        if (pRecDownloadCfg.onlyInsert) {
            // treti param je '2'-vlozeni zaznamu bez kontroly exist. zaznamu
            // 24.11.21 on; uzivatelska metoda pro stazeni zaznamu
            if (this.csDownloadDNUser) {
                this.csDownloadDNUser(pRecDownloadCfg, pRecord, '2');
            } else {
                this.csRecordDownloadDN2(pRecDownloadCfg, pRecord, '2');
            }
            return;
        }
        Ext.Msg.show({
            // 'Stiahnutie záznamu'
            title: i3.ui.FlexPop.tx.txRecDownload2,
            // 'Vybraný záznam v lokálnej databáze neexistuje. Chcete záznam stiahnuť a vytvoriť z neho nový záznam v lokálnej databáze?'
            msg: i3.ui.FlexPop.tx.txRecDownloadLokNExistNew,
            // 13.08.12 on; lokalizace
            //buttons : Ext.Msg.YESNO,
            buttons: i3.ui.YesNo,
            fn: function(pButtonId) {
                if (pButtonId === 'yes') {
                    // treti param je '0'-nepovolene prepisanie exist.zaznamu
                    // 24.11.21 on; uzivatelska metoda pro stazeni zaznamu
                    if (this.csDownloadDNUser) {
                        this.csDownloadDNUser(pRecDownloadCfg, pRecord, '0');
                    } else {
                        this.csRecordDownloadDN2(pRecDownloadCfg, pRecord, '0');
                    }
                }
            },
            icon: 'icon-question',
            scope: this
        });
    },
    /**
     * Stiahnutie zaznamu - vykonanie operacie
     *
     * @param {Object} pRecDownloadCfg - download config viz. vyssie metody
     * @param {Object} pRecord         - zaznam vybrany vo flexpop ako zaznam na stiahnutie
     * @param {Object} pUpdateOptions  -
     *   '0' - insert zaznamu
     *   '1' - update zaznamu
     *   'lname*t001' - identifikacia lokalneho zaznamu ktorym chceme harmonizovat zadanym externym zaznamom
     * @private
     */
    csRecordDownloadDN2: function(pRecDownloadCfg, pRecord, pUpdateOptions) {
        var sParams, aDbOptions, psPQF = '.',
            t001;
        // 02.11.17 on; moznost seskladat t001 z jinych poli - napr. 910a a 910x
        aDbOptions = this.currentDbOptions;
        if (!Ext.isArray(aDbOptions)) {
            aDbOptions = [aDbOptions];
        }
        if (aDbOptions.indexOf('T001SKC') !== -1) {
            sParams = pRecord.classn + '*' + this.csGet001SKC(pRecord) + ' ' + pUpdateOptions;
        } else
            // 22.11.17 on; pro autority knihovny Petra Bezruce v Opave se musi upravit 001
            //              pole 001 fyzicky v datech neexistuje a generuje se z TCISLO, je nutné tedy vzít 10 pozic zprava z generovaného pole 001
            //              KN4384800000472719  --> 0000472719
            if (this.currentDbOptions && (this.currentDbOptions.indexOf('T001OPAAUT') > -1)) {
                t001 = pRecord.t001.substring(pRecord.t001.length - 10, pRecord.t001.length);
                sParams = pRecord.classn + '*' + t001 + ' ' + pUpdateOptions;
                psPQF = '@attr 1=12 @attr 4=1 \'' + t001 + '\'';
                psPQF = i3.ui.FlexPop.c.C_SPACE_CHAR + psPQF.strswap(' ', i3.ui.FlexPop.c.C_SPACE_CHAR);
            } else {
                sParams = pRecord.classn + '*' + pRecord.t001 + ' ' + pUpdateOptions;
            }
        sParams += ' ' + psPQF;
        i3.WS.command({
            db: pRecDownloadCfg.destClass,
            params: sParams,
            command: 'downloadExtRec',
            // o-je cely JSON s vysledkom
            success: function(o) {
                if (o && (o.ret_code === "0") && Ext.isArray(o.records)) {
                    // zda sa, ze download prebehol uspesne
                    var oRecord = new i3.Marc(o.records[0]);
                    Ext.Msg.show({
                        // 'Stiahnutie záznamu'
                        title: i3.ui.FlexPop.tx.txRecDownload2,
                        // 'Záznam bol uložený do lokálnej bázy pod číslom: '
                        msg: i3.ui.FlexPop.tx.txSavedToLocAs + oRecord.t001,
                        buttons: Ext.Msg.OK,
                        fn: function() {
                            this.csReturnRecord(oRecord);
                        },
                        icon: 'icon-question',
                        scope: this
                    });
                    return;
                }
                // 'Stiahnutie záznamu nebolo úspešné. Popis: %s/%s'
                i3.alert(i3.fillInParams(i3.ui.FlexPop.tx.txRecDownloadFailed, [o.ret_code, o.ret_msg]));
            },
            scope: this
        });
    },
    /**
     * Vysklada t001 pro SKC
     *
     * 02.11.17 on;
     */
    csGet001SKC: function(pRecord) {
        var sData = this.csGetDFStore(pRecord, 'LINEMARC');
        var oRec = new i3.Marc({
            data: sData,
            t001: pRecord.t001,
            classn: pRecord.classn
        });
        return oRec.getTag('910a') + oRec.getTag('910x');
    },
    /**
     * Harmonizacia zaznamu - kontrolna otazka
     *
     * 25.09.09 rs; doplnenie moznosti zobrazit zahlavie zdroj.zaznamu pri harmonizacii
     * @private
     */
    csRecordHarmonz: function(pRecDownloadCfg, pRecord) {
        // harmnzTarget je lname*t001 zaznamu otvoreneho vo formulari pod flexpop-om a ten urcuje
        // zaznam s ktorym sa ideme spajat
        var sHarmTg = pRecDownloadCfg.harmnzTarget;
        // v message box prioritne zobrazit zahlavie - nielek kod, ak mame dany udaj k dispozicii
        var sHarmTgHdr = pRecDownloadCfg.harmnzTargetHdr;
        if (!sHarmTgHdr) {
            sHarmTgHdr = sHarmTg;
        }
        // toto je nudzova poistka - malo by byt predtym osetrene, aby sa sem nedostal
        if (!i3.isUnEmptyString(sHarmTg)) {
            // intrna chyba
            i3.intError('destination record missing!?');
            // netreba prekladat
            return;
        }
        // fillinparams doplni parameter aby sa string dal lahsie prelozit
        // 'Chcete záznam práve teraz otvorený vo formulári (%s) harmonizovať vybraným záznamom? Upozornenie: operácia je nevratná.'
        var sMsg = i3.fillInParams(i3.ui.FlexPop.tx.txHarmRecQ, [sHarmTgHdr]);
        Ext.Msg.show({
            // 'Harmonizácia záznamov'
            title: i3.ui.FlexPop.tx.txHarmRecTitle,
            msg: sMsg,
            // 13.08.12 on; lokalizace
            //buttons : Ext.Msg.YESNO,
            buttons: i3.ui.YesNo,
            fn: function(pButtonId) {
                if (pButtonId === 'yes') {
                    this.csRecordDownloadDN2(pRecDownloadCfg, pRecord, sHarmTg);
                }
            },
            icon: 'icon-question',
            scope: this
        });
    },
    /**
     * Vypis internych ladiacich info
     */
    csOnToolsGear: function() {
        i3.msg('debug info');
        if (console) {
            console.log('fxl open params=', this.openParams);
        } else {
            i3.msg('open params=' + Ext.encode(this.openParams));
        }
    },
    /**
     * Display status message
     * Temporary implementation
     *
     * @param {Object} pMsg
     *
     * 22.06.12 on; csShowStatus se bude pouzivat pro zobrazeni poctu zaznamu v gridu
     */
    csShowStatus: function(pMsg) {
        //this.csToolBarMsg.el.innerHTML = pMsg;
        // 10.04.15 on; je potreba i pocet smazat
        if (i3.isEmptyString(pMsg)) {
            pMsg = i3.ui.FlexPop.tx.txRecord;
        } else {
            pMsg = ' (' + pMsg + ')';
            pMsg = i3.ui.FlexPop.tx.txRecord + pMsg;
        }
        this.csPanelSearch.getColumnModel().setColumnHeader(0, pMsg);
    },
    /**
     * Reakce na kliknuti mysi do ZF
     * Je vytiahnute zvlast, aby ho bolo mozne prepisat v potomkoch
     * @param {Event} e
     */
    csOnDFClick: function(e) {
        e.stopEvent();
        // zastavi provadeni
        var target = e.getTarget();
        var href = target.href;
        var targetEl, anchor;
        // 22.02.12 on; predelane kvuli chovani v IE
        // zjisti odkaz
        /*if((!href) && (target.tagName === 'IMG')) {// pokud jde o obrazek (lupu), zkusi nacist jinak
         targetEl = Ext.fly(target);
         var anchor = targetEl.up("a");
         if(anchor) {
         href = anchor.dom.href;
         }
         }*/
        if (target.tagName === 'IMG') { // pokud jde o obrazek (mozna lupu?), zkusi nacist jinak
            href = '';
            // musim smazat href
            targetEl = Ext.fly(target);
            anchor = targetEl.up("a");
            if (anchor) {
                href = anchor.dom.href;
            }
        } else
            // 21.05.19 on; SPAN
            if (target.tagName === 'SPAN') {
                href = '';
                // musim smazat href
                targetEl = Ext.fly(target);
                anchor = targetEl.up("a");
                if (anchor) {
                    href = anchor.dom.href;
                }
            }
        if (href) {
            // 29.04.10 on; predelane - ze serveru dostanu kompletni link i se zobrazeni v novem okne
            //              kvuli externim linkum se to musi takto parsovat viz. vyse
            /*// zjisti, jestli jde o link do lolakniho ipacu nebo externi link
             var a = target.baseURI.split('/');
             var sServer = a[2];

             //href = "http://localhost/i3/cat/12**1%20m0002444";
             href = i3.urlDecode(href);
             a = href.split('/'); // rozdelit na podpolia
             if (sServer === a[2]) {
             i3.alert('Zobrazování interních odkazů ve výstavbě.');
             }
             else {
             e.stopEvent();
             window.open(href, "i2window");
             }*/
            window.open(href, "i3window");
            // zobrazi v novem okne
        }
    },
    /**
     * Funkce vrati hodnotu atributu pro kompletni termin
     * Je vytiahnute zvlast, aby ho bolo mozne prepisat v potomkoch
     * @param {boolean} pbComplet   je nastaven kompletni termin
     * @param {array} paDbOptions   pole s nastavenim pro db, pokud obsahuje "C3", tak se pro vyhledavani s kompletnim terminem
     *                              pouzije "attr 6=3" (standardně se používá pro kompletní termín "attr 6=2")
     *
     * 06.04.12 on;
     */
    csComplTermAttr: function(pbComplet, paDbOptions) {
        if (pbComplet) {
            if (paDbOptions) {
                if (!Ext.isArray(paDbOptions)) {
                    paDbOptions = [paDbOptions];
                }
                if (paDbOptions.indexOf('C3') !== -1) {
                    return 3;
                }
                return 2;
            }
            return 2;
        }
        return 1;
    },
    /**
     * Funkce vrati hodnotu indexu - ve specialnich pripadech se v ciselniku indexu rozsituji cila o "-n"
     * @param {string} sIndex   cislo indexu z ciselniku
     *
     * 09.09.13 on;
     */
    csGetIndexNo: function(psIndex) {
        // 09.09.13 on; kvuli tomu, ze nekdy potrebuju mit v seznamu indexu stejnou hodnotu, musim si ji v ciselniku rozsirit o "-n"
        //              a tady musi druhou cast odseknout
        //              sIndex muze byt integer - podminka
        if (psIndex.piece) {
            psIndex = psIndex.piece('-', 1);
        }
        return psIndex;
    },
    /**
     * Vrati vsechny zaznamy setu.
     *
     * 28.08.18 on;
     */
    csReturnSetRecords: function() {
        var p = this.csPanelSearch.store.baseParams;
        var nHits = parseInt(this.csPanelSearch.store.csHits, 10);
        // schovat flexpop
        this.hide();
        if (!nHits) {
            return;
        }
        i3.msgOn(i3.ui.FlexPop.tx.txGetRecs, '', '', i3.ui.FlexPop.c.sMsgId);
        var that = this;
        (function() {
            var self = arguments.callee;
            if (p.to < nHits) {
                p.from = p.to + 1;
                p.to = p.from + 19;
                that.csPanelSearch.store.load({
                    add: true,
                    callback: self
                });
            } else {
                // 27.07.17 on; vrati i cely zaznam
                that.csReturnSetRecords2();
            }
        })();
    },
    csReturnSetRecords2: function() {
        var i, sZF, s, oRec, rec, aRecArr = [];
        if (this.csPanelSearch.store.totalLength >= this.csPanelSearch.store.csHits) {
            var op = this.openParams;
            // zavolame callback s uvedenim vybraneho zaznamu v prislusnom scope
            var scope = op.scope || this;
            if (this.openParams.callback) {
                sZF = 'LINEMARC';
                for (i = 0; i < this.csPanelSearch.store.data.items.length; i++) {
                    // zaznam zkusi nacist z uzlu ZF, predpokladam, ze ZF v marc formatu ma nazev LINEMARC
                    // pokud tam marc neneajdu, zatim to nijak neresim
                    rec = this.csPanelSearch.store.data.items[i];
                    s = this.csGetDFStore(rec.data, sZF);
                    if (s !== '') {
                        oRec = new i3.Marc({
                            data: s,
                            fmt: sZF,
                            t001: rec.data.t001,
                            classn: rec.data.classn
                        });
                        aRecArr.push(oRec);
                    } else {
                        i3.msg(i3.fillInParams(i3.ui.FlexPop.tx.txDfNotFound, [sZF]));
                    }
                }
            }
            op.callback.call(scope, aRecArr);
            i3.msgOff(i3.ui.FlexPop.c.sMsgId);
        }
    },
    // 23.02.24 on; povolit vlozeni do kosiku?
    csBasketEnabled: function(pClass) {
        var sClass;
        // 26.04.24 on;
        if (!pClass) {
            return false;
        }
        if (typeof pClass === 'string') {
            pClass = [pClass];
        }
        // staci prvni db
        sClass = pClass[0];
        if (!sClass) {
            return false;
        }
        // 26.04.24 on; muze jit o pole (id db a nazev db)
        if (Ext.isArray(sClass)) {
            sClass = sClass[0];
        }
        if (!sClass) {
            return false;
        }
        // jde o db holdingu a kosik je povolen pro holdingy
        if (sClass.toLowerCase().indexOf('uscath') >= 0) {
            return i3.csBasketHolding;
        }
        // jde o db titulu a kosik je povolen pro tituly
        if (sClass.toLowerCase().indexOf('uscat') >= 0) {
            return i3.csBasketTitle;
        }
        return false;
    }
});
