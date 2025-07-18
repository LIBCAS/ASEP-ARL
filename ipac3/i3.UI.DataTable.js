/*
 * Zakladna obrazovka na editaciu zaznamov.
 * Zodpoveda "WINDOW" z terminologie AREVu.
 *
 * 09.04.25 on; funkce tisk a copy jen pokud funkce existuji
 * 29.08.24 on; pokud je titul readonly, nekontrolovat ztratu poli
 * 08.03.24 on; objekt s dalsimi parametry
 * 17.02.23 on; kopie zaznamu + uprava menu
 * 07.10.22 on; poznaci si, ze ciselnik ma sufix pobocky a ze pripadne nacist ciselnik bez ni
 * 30.08.22 on; zmena na ikonu v souboru
 * 17.03.22 on; podpora pro info zpravy
 * 11.02.22 on; ciselniky csDfltFormList doplneno nacteni celeho tagu
 * 14.01.22 on; pokud oRec neexistuje, neudelam nic - ve flex popup okne nenajdu zadny zaznam a dam OK
 * 06.01.22 on; ikona lupy
 * 17.12.21 on; doplneny ikony
 * 25.11.21 on; Otevreneni noveho zaznamu uz pri vyberu z comboboxu.
 * 04.11.21 on; moznost skryt tlacitko Listovat globalne
 * 02.06.20 on; zmena hashovani
 * 08.04.20 on; velikost kosiku 800 -> 900
 * 01.03.18 on; zobrazeni infa o session
 * 05.10.17 on; doplneni hintu do pole, kde neni videt cely text
 * 22.09.17 on; do zobrazeni URL doplneno username a sso
 * 10.08.17 on; kosik presunut do standardu
 * 08.08.17 on; zmena poradi polozek v menu
 * 14.07.17 on; zapojeno odchyceni zmeny kazdeho pole
 * 03.03.17 on; rozsirena funkce pro zmenu hesla
 * 11.08.16 on; rozsirena moznost skryti helpu
 * 08.04.16 on; do csRecord2Form zapojena moznost nacteni defaultniho formulare
 * 10.09.15 on; csOnSaveMarc rozsirena o moznost zadat vlastni OK hlasku
 * 30.07.15 on; rozsireni csOnSaveMarc
 * 23.07.15 on; upraveno csOnSearch
 * 19.06.15 on; ikona k tlacitku ulozit
 * 08.04.15 on; upraveno zamykani zaznamu
 * 21.05.14 on; komponenta i3.ui.DataTablePnl.Panel
 * 18.04.14 on; preklad OK a Zrusit
 * 21.03.14 on; arabstina
 * 06.02.14 on; tlacitko pro ascii vyhledavani
 * 07.11.13 on; uprava pupanelu
 * 01.11.13 on; pridane odemknuti zaznamu pri odhlaseni
 * 18.10.13 on; upravene dedeni listeners
 * 23.09.13 on; rozsireni about okna
 * 19.09.13 on; uprava slovenske verze "Nápoveda" -> "Pomoc"
 * 16.08.13 on; doplneny parametr csSetDataIndexFld
 * 16.04.13 on; osetreno padani Ext.util.JSON.decode
 * 14.03.13 on; moznost pridat pres konfiguraci (CLIENT_CFG) dalsi polozky do menu s odkazem na www stranky (stejne jako je u webovych vypujcek)
 * 25.10.12 on; doplnena funkce csIsRecordChanged, ktera zjisti, jestli byl zaznam zmenen
 * 11.10.12 on; moznost skryt dalsi polozky toolbaru
 * 13.08.12 on; prelozene tlacitka Ext.Msg.OKCANCEL v Ext.Msg.show
 * 26.06.12 on; moznost skryt tlacitko Search
 * 25.06.12 on; tucny text tlacitka save
 * 02.03.12 on; upravene zobrazeni readonly stavu
 * 17.02.12 on; uprava csIsReadOnly
 * 10.02.12 on; moznost volby polozek v menu
 * 08.02.12 on; csOnSearch: podminka kvuli vypujckam
 * 23.08.11 on; do menu doplnena verze programu
 * 02.05.11 on; v metode csLoadMarcRec nastavena kontrola ztraty poli ze zaznamu
 * 20.04.11 on; zapojena funkce pro zmenu hesla
 * 13.10.10 on; nastaveni zamykani zaznamu v panelu - csCanLockRecord
 * 22.09.10 on; dokoncene zamykani zaznamu
 * 21.09.10 on; moznost zakazat zobrazeni ikony helpu
 * 03.08.10 on; dokoncene zamykani zaznamu
 * 26.07.10 on; opravena funkce csUnlockRecord
 * 29.06.10 on; zamykani zaznamu
 * 25.06.10 on; metoda csLockRecord pro zamykani zaznamu
 * 22.03.10 on; pri zobrazeni helpu zruseny duplicitni radky (onToolsHelp)
 * 10.02.10 on; na pole termin v toolbaru zapojena reakce enter
 * 01.12.09 rs; preklad niektorych textov
 * 01.12.09 rs; zmena policka s textom helpu na editovatelne - inak zasedava a je zle citatelne
 * 27.11.09 rs; zobrazenie zoznamu poli pre napovedu: pridana jednoducha deduplikacia poli
 * 25.11.09 rs; ladiace volby budu zobrazene len v debug rezime (i3.debug)
 * 05.11.09 rs; dalsie formalne upravy pre dokumentaciu
 * 05.10.09 rs; formalne upravy pre dokumentaciu
 * 22.09.09 rs; preklad zopar hlasok
 * 07.09.09 rs; zmena helpwin id
 * 18.08.09 rs; pridelenie id pbNew
 * 12.08.09 rs; neuspesny pokus o umiestnenie csOnNew do initComponent a OnRender
 * 23.07.09 rs; oprava vymazu zaznamov
 * 19.05.09 rs; doplnenie PopUp verzie
 * 07.04.09 rs; prepracovanie prace s Marc zaznamami
 * 01.04.09 rs; formalne preformatovanie
 * 04.06.08 rs;
 */
/*global Ext,i3,alert,clearTimeout,setTimeout,window */
Ext.ns('i3.ui.DataTable');
Ext.ns('i3.ui.DataTablePnl');
i3.ui.DataTable.tx = { //
    // sem pridu preklady textov
    txDeleteRec: 'Vymazať záznam#Vymazat záznam#Delete record###احذف التسجيلة'.ls(),
    txCopyRec: 'Kopírovať záznam#Kopírovat záznam#Copy record'.ls(),
    txPrintRecord: 'Vytlačiť záznam#Vytisknout záznam#Print record'.ls(),
    // titulok okienka so zlyhanim zapisu zaznamu
    txUpdateFailedMsgTit: 'Zápis záznamu neúspešný#Zápis záznamu neúspěšný#Database update failed###فشل تحديث قاعدة البيانات'.ls(),
    txDeletedMsg: 'Výmaz záznamu OK!#Výmaz záznamu OK!#Delete OK!###إحذف أوافق!'.ls(),
    txLogoutMsgTit: 'Odhlásenie#Odhlášení#Logout###خروج'.ls(), // menu
    txLogoutQ: 'Odhlásiť z aplikácie?#Odhlásit z aplikace?#Are you sure to logout?###هل أنت متأكد من الخروج؟'.ls(), // otazka po volbe z menu
    txUpdateOK: 'Aktualizácia OK!#Aktualizace OK!#Update OK!###تحديث أوافق!'.ls(),
    txUpdate: 'Aktualizovať#Aktualizovat#Update###تحديث'.ls(),
    txLockFailed: 'Chyba pri zamykání záznamu: %s/%s#Chyba při zamykání záznamu: %s/%s#Record lock failed: %s/%s###فشل قفل التسجيلة: %s/%s'.ls(),
    txUnlockFailed: 'Chyba pri odemykání záznamu: %s/%s#Chyba při odemykání záznamu: %s/%s#Record unlock failed: %s/%s###فشل فتح التسجيلة: %s/%s'.ls(),
    txLockRecError: 'Chyba pri zamykání záznamu (%s).#Chyba při zamykání záznamu (%s).#Error locking Record (%s).###خطأ في قفل التسجيلة (%s).'.ls(),
    txLockRecChanged: 'Záznam bol zmenený v DB. Aktualizujte ho prosím.#Záznam byl změněný v DB. Aktualizujte ho prosím.#.Record is changed in DB. Refresh it please.###تم تغيير التسجيلة في قاعدة البيانات. الرجاء تحديثها.'.ls(),
    txLockUser: 'Užívateľ: #Uživatel: #User: ###المستخدم: '.ls(),
    txLockIP: 'IP: #IP: #IP: ###IP: ',
    txLockSN: 'SN: #SN: #SN: ###SN: ',
    txChangePassword: 'Zmeniť heslo#Změnit heslo#Change password###تغيير كلمة المرور'.ls(),
    txChangePassword2: 'Zmena hesla#Změna hesla#Change of password###تغيير كلمة المرور'.ls(),
    txActualPassword: 'Aktuálne heslo#Aktuální heslo#Actual password###كلمة المرور الفعلية'.ls(),
    txNewPassword: 'Nové heslo#Nové heslo#New password###كلمة مرور جديدة'.ls(),
    txConfirmation: 'Potvrdenie#Potvrzení#Confirmation###تأكيد'.ls(),
    txERROldEmpty: 'Aktuálne heslo nemôže byť prázdne.#Aktuální heslo nemůže být prázdné.#Actual password could not be empty.###كلمة المرور الفعلية لا يمكن أن تكون فارغة.'.ls(),
    txERRNewEmpty: 'Nové heslo nemôže byť prázdne.#Nové heslo nemůže být prázdné.#New password could not be empty.###كلمة المرور الجديدة لا يمكن أن تكون فارغة.'.ls(),
    txERRNewShort: 'Nové heslo je príliš krátke.#Nové heslo je příliš krátké.#New password is too short.'.ls(),
    txERRNoPass: 'Heslá nie sú zhodné.#Hesla nejsou shodná.#Password is not equal.###كلمة المرور ليست مساوية.'.ls(),
    txPassShort: 'Príliš krátke#Příliš krátké#Too short###قصيرة جدا'.ls(),
    txPassQuality: 'Kvalita hesla#Kvalita hesla#Password quality###جودة كلمة المرور'.ls(),
    txAbout: 'O programe#O programu#About###عن'.ls(),
    //txVersion : 'Verze#Verze#Version'.ls(),
    txInventoryName: 'Názov inventarizácie#Název inventarizace#Inventory name###اسم الجرد'.ls(),
    txInventory: 'Inventarizácia#Inventarizace#Inventory###الجرد'.ls(),
    txInventoryInit: 'Inicializácia inventarizácie#Inicializace inventarizace#Inventory init###البدء بالجرد'.ls(),
    txHelp: 'Pomoc#Nápověda#Help###مساعدة'.ls(),
    // 18.04.14 on;
    txOK: 'OK#OK#OK###أوافق'.ls(),
    txCancel: 'Zrušiť#Zrušit#Cancel###إلغاء'.ls(),
    // 10.08.17 on;
    txInBasket: 'V košíku#V košíku#In the basket'.ls(),
    txBasket: 'Košík#Košík#Basket'.ls(),
    txCantCopyNewRec: 'Nie je možné kopírovať nový záznam!#Nelze kopírovat nový záznam!#Can\'t copy new record!'.ls(),
    txReallyCopy: 'Naozaj chcete kopírovať záznam?#Opravdu chcete kopírovat záznam?#Are you sure to copy the record?'.ls(),
    txCopyCreated: 'Kópia záznamu bola vytvorená.#Kopie záznamu byla vytvořena.#A copy of the record has been created.'.ls()
};
/**
 * @class i3.ui.DataTable
 *
 * Zakladna obrazovka na editaciu zaznamov.
 * Zodpoveda "WINDOW" z terminologie AREVu.
 *
 * Teda jedna sa o obrazovku editujucu jeden zaznam z datovej tabulky. Pod formularom je zaznam v internej datovej
 * strukture - "linearizovana podoba zaznamu". Zaznam v databaze moze byt v inej podobe, zatial su poskytnute
 * mechanizmy na konverziu z a do MARCu.
 * Poskytuje toolbar na jednoduchu standardnu manipulaciu so zaznamom.
 *
 *  i3.ui.DataTable.PUPanel je upravena verzia bez toolbaru pre pouzitie v popup okienkach.
 *
 */
Ext.apply(i3.ui.DataTable, {
    /** Globalna funkcia na ziskanie objektu help okna
     * zatial vyzera, ze by mohlo stacit jedno pre celu app.
     * Neskor sa moze pripadne upravit
     */
    getHelpWin: function() {
        return i3.ui.getSingleWin('dt_help', i3.ui.DataTable.HelpWin);
    },
    /**
     * Toto je trocha mimo objektovu hierarchiu - zatial neviem,
     * ako inak to sikovne vyriesit - proste zalozi nejake komponenty & objekty do config
     * a nieto sa potom pouziju v "i3.ui.DataTable.Panel", ale mozu sa priamo pouzit aj v inych
     * oknach neodvodenych od "i3.ui.DataTable.Panel"
     * Napr. v okne vypoziciek chceme podobne ovladacie prvky, ale okno nie je dedene z ".. .Panel"
     *
     * (!)Funkcia je volana v scope panelu na ktorom komponenty budu umiestnene.
     *
     * @param {Object} config
     *   usrSearchFlds:     nazov UnTablesd ciselnika so zoznamom poli
     *   idpref:            id prefix
     */
    baseComp: function(config) {
        config = config || {};
        // makra na jednoduche prefixovanie id-ciek elementov
        var idpref = i3.getIdPrefFn(config.idpref);
        // zobrat prve idx store z flexpop params; idxlistStoreId bude bud string (ak je jedna databaza
        // alebo pole s hodnotami
        var sIdxStore = config.csFlexPopParams.idxlistStoreId;
        if (Ext.isArray(sIdxStore)) {
            sIdxStore = sIdxStore[0];
        }
        Ext.apply(config, {
            // komponenta comboboxu indexoveho pola pre vyber zaznamov
            csCbIndex: {
                xtype: 'cs_combo_st',
                csStatTableN: sIdxStore,
                name: 'index',
                id: idpref('index'),
                //title: 'Search field',
                editable: false,
                displayField: 'text',
                allowBlank: false,
                lazyInit: false,
                forceSelection: true,
                csAutoSelectFirst: true,
                // 11.10.12 on; moznost skryt pole index
                hidden: config.csHideIndexFld,
                // 16.08.13 on; moznost nastavit promennou csData
                csData: config.csSetDataIndexFld,
                // 07.10.22 on; poznaci si, ze ciselnik ma sufix pobocky a ze pripadne nacist ciselnik bez ni
                csBranchSufix: config.csBranchSufix
            }, // 
            // komponenta datoveho policka pre zapis termu
            csFldTerm: {
                xtype: 'textfield',
                fieldLabel: 'Term',
                name: 'term',
                id: idpref('term'),
                // 11.10.12 on; moznost skryt pole termin
                hidden: config.csHideTermFld,
                listeners: { // 10.02.10 on; doplnena reakce na enter
                    specialkey: function(field, el) {
                        if (el.getKey() === Ext.EventObject.ENTER) {
                            // 26.06.12 on; pokud je skryte pole search, pouzije listovani
                            if (config.csHideSearchBtn) {
                                this.csOnSearch(2);
                            } else {
                                this.csOnSearch(1);
                            }
                        }
                    },
                    scope: this
                }
            }, // tlacitko na search
            csPbSearch: {
                xtype: 'button',
                text: i3.tx.txSearch,
                // 26.06.12 on; moznost skryt tlacitko Search (pouzite ve www vypujckach)
                hidden: config.csHideSearchBtn,
                // 06.01.21 on; ikona lupy
                iconCls: 'icon-search-img',
                handler: function() {
                    this.csOnSearch(1);
                },
                scope: this
            },
            // tlacitko na browse
            csPbBrowse: {
                xtype: 'button',
                text: i3.tx.txBrowse,
                // 04.11.21 on; moznost skryt tlacitko Listovat globalne
                // 11.10.12 on; moznost skryt tlacitko Listovat
                //hidden: config.csHideBrowseBtn,
                hidden: i3.csHideBrowseBtn,
                //name:'scan',
                handler: function() {
                    this.csOnSearch(2);
                },
                scope: this
            },
            // tlacitko na ascii vyhledavani
            csPbAscii: {
                xtype: 'button',
                text: i3.tx.txASCII,
                hidden: !(i3.csUseASCII || false),
                //name:'scan',
                handler: function() {
                    this.csOnSearch(3);
                },
                scope: this
            }
        });
    },
    /***
     * Funkce vrati toolbar
     *
     * 21.05.14 on;
     */
    csGetToolbar: function(config, idpref) {
        var toolBarMenu = [];
        // 08.08.17 on; zmena poradi
        // 05.06.12 on; moznost zapojit inventarizaci
        if (config.csInventoryMenu) {
            // 15.06.12 on; zatim neimplementovane
            /*toolBarMenu = toolBarMenu.concat([{
             text : i3.ui.DataTable.tx.txInventoryInit,
             handler : function() {
             i3.Inventory.csOnInventoryInit();
             alert(i3.Inventory.csGetInventoryName());
             },
             scope : this
             }]);*/
            // 17.02.23 on; oddelovac
            toolBarMenu = toolBarMenu.concat([{
                xtype: 'menuseparator'
            }]);
            toolBarMenu = toolBarMenu.concat([{
                text: i3.ui.DataTable.tx.txInventoryName,
                handler: function() {
                    i3.Inventory.csOnInventoryName.call(this, this.csClassSrchBib + 'H');
                },
                scope: this
            }]);
            toolBarMenu = toolBarMenu.concat([{
                text: i3.ui.DataTable.tx.txInventory,
                handler: function() {
                    // 08.03.24 on; objekt s dalsimi parametry
                    i3.Inventory.csOnInventory(this.csClassSrchBib + 'H', this.csBranch, {
                        csInventoryUseOnlyExistingTag500: this.csInventoryUseOnlyExistingTag500
                    });
                },
                scope: this
            }]);
        }
        // 17.03.23 on; oddelovac
        if (!config.csSkipDeleteRecMenu || !config.csSkipCopyRecMenu || !config.csSkipDeleteRecMenu) {
            toolBarMenu = toolBarMenu.concat([{
                xtype: 'menuseparator'
            }]);
        }
        // 09.04.25 on; doplnena podmnika this.csPrintDF
        // 17.02.23 on; tisk zaznamu
        if ((!config.csSkipPrintRecMenu) && (this.csPrintDF)) {
            toolBarMenu = toolBarMenu.concat([{
                html: '<span class="icon-print" aria-hidden="true"></span> ' + i3.ui.DataTable.tx.txPrintRecord,
                //handler: this.csPrintDF.createDelegate(this)
                handler: function() {
                    this.csPrintDF();
                },
                scope: this
            }]);
        }
        // 09.04.25 on; doplnena podmnika this.csOnCopy
        // 17.02.23 on; kopie zaznamu
        if ((!config.csSkipCopyRecMenu) && (this.csOnCopy)) {
            toolBarMenu = toolBarMenu.concat([{
                handler: function() {
                    this.csOnCopy();
                },
                // vlozena std. ikona - iconCls, pri pouziti fontu se zobrazi obe najednou
                //html: '<span class="icon-copy" aria-hidden="true"></span> ' + i3.ui.DataTable.tx.txCopyRec,
                iconCls: "icon-copy",
                text: i3.ui.DataTable.tx.txCopyRec,
                scope: this
            }]);
        }
        if (!config.csSkipDeleteRecMenu) {
            toolBarMenu = toolBarMenu.concat([{
                handler: function() {
                    this.csOnDelete();
                },
                html: '<span class="icon-list-remove" aria-hidden="true"></span> ' + i3.ui.DataTable.tx.txDeleteRec,
                scope: this
            }]);
        }
        // 17.03.23 on; oddelovac
        if (!config.csSkipDeleteRecMenu || !config.csSkipCopyRecMenu || !config.csSkipDeleteRecMenu) {
            toolBarMenu = toolBarMenu.concat([{
                xtype: 'menuseparator'
            }]);
        }
        // 08.08.17 on; zmena poradi
        if (!config.csSkipChangePassMenu) {
            toolBarMenu = toolBarMenu.concat([{
                handler: function() {
                    this.csOnChangePassword();
                },
                html: '<span class="icon-key" aria-hidden="true"></span> ' + i3.ui.DataTable.tx.txChangePassword,
                scope: this
            }]);
            // 08.08.17 on; pridano
            toolBarMenu = toolBarMenu.concat([{
                xtype: 'menuseparator'
            }]);
        }
        if (!config.csSkipLogoutMenu) {
            toolBarMenu = toolBarMenu.concat([{
                handler: function() {
                    this.csOnLogout();
                    // may be overriden later
                },
                html: '<span class="icon-logout" aria-hidden="true"></span> ' + i3.tx.txLogout,
                scope: this
            }]);
        }
        if (!config.csSkipAboutMenu) {
            toolBarMenu = toolBarMenu.concat([{
                // 23.08.11 on; verze aplikace
                handler: function() {
                    // 10.09.15 on; moznost zavolat si svoje about okno
                    if (this.csShowAbout) {
                        this.csShowAbout();
                    } else {
                        // 23.09.13 on; rozsireni about okna
                        //i3.alert(i3.ui.DataTable.tx.txVersion, i3.version);
                        i3.ui.csShowAbout();
                    }
                },
                // 14.09.15 on;
                html: '<span class="icon-info" aria-hidden="true"></span> ' + i3.ui.DataTable.tx.txAbout,
                scope: this
            }]);
        }
        // 11.10.12 on; help
        if (config.csShowHelpMenu) {
            toolBarMenu = toolBarMenu.concat([{
                text: i3.ui.DataTable.tx.txHelp,
                handler: function() {
                    this.csOnHelp();
                },
                scope: this
            }]);
        }
        // 14.03.13 on; moznost pridat pres konfiguraci (CLIENT_CFG) dalsi polozky do menu s odkazem na www stranky (stejne jako je u webovych vypujcek)
        var i,
            s1,
            s2;
        if (this.csShowURL) {
            for (i = 1; i <= 3; i++) {
                s1 = i3.WS.sXlate('CLIENT_CFG', 'WebMenuURL' + i);
                if (s1 !== '') {
                    s2 = i3.WS.sXlate('CLIENT_CFG', 'WebMenuURLName' + i);
                    if (s2 === '') {
                        s2 = s1;
                    }
                    // oddelovac jenom pro prvni polozku menu
                    if (i === 1) {
                        toolBarMenu.push(new Ext.menu.Separator());
                    }
                    toolBarMenu.push({
                        text: s2,
                        handler: this.csShowURL.createDelegate(this, [s1])
                        //scope : this
                    });
                }
            }
        }
        // 25.11.09 rs; ladiace polozny do menu pridat, len v debug rezime
        if (i3.debug > 0) {
            toolBarMenu = toolBarMenu.concat([{
                text: '(dev) Show current int.record',
                handler: function() {
                    this.csShowObj(this.csLinRecord);
                },
                scope: this
            }, {
                text: '(dev) Show load-time int.record',
                handler: function() {
                    this.csShowObj(this.csOrigLinRecord);
                },
                scope: this
            }, {
                text: '(dev) Show current MARC record',
                handler: function() {
                    // ziskat zaznam v MARC formate
                    var oRec = this.csGetMarc();
                    if (!oRec) {
                        i3.alert('no data');
                    }
                    this.csShowObj(oRec);
                },
                scope: this
            }, {
                text: '(dev) Show load-time MARC record',
                handler: function() {
                    this.csShowObj(this.csOrigMarcRecord);
                },
                scope: this
            }, {
                text: '(dev) WS debug on',
                handler: function() {
                    i3.WS.setDebug(1);
                    i3.msg('Ws debug ON');
                },
                scope: this
            }, {
                text: '(dev) Flexpop debug on',
                handler: function() {
                    i3.setOption('flexpop_debug', true);
                    i3.msg('Flexpop debug ON');
                },
                scope: this
            }]);
        }
        var toolBar = [config.csCbIndex, {
                xtype: 'tbspacer'
            }, config.csFldTerm, config.csPbSearch, config.csPbBrowse, config.csPbAscii, {
                xtype: 'tbseparator'
            }, {
                xtype: 'button',
                // 11.10.12 on; moznost skryt tlacitko ulozit
                hidden: config.csHideSaveBtn,
                id: idpref('pbSave'),
                // 17.12.21 on; zruseno
                //html: '<div style="width:70px;" class="x-btn"><button id="menu-save" type="button" class="x-btn-text i-btn"><span class="icon-save" aria-hidden="true"></span>&nbsp; ' + i3.tx.txSave + '</button></div>',
                text: i3.tx.txSave,
                iconCls: 'icon-save',
                handler: function() {
                    this.csOnSave();
                },
                scope: this
            }, {
                xtype: 'tbseparator' // 17.10.13 on; oddelovac mezi Ulozit a Novy
            }, {
                // 17.10.13 on; do standardu doplnen combobox se seznamem defaultnich formularu
                xtype: 'cs_combo_st',
                csAutoSelectFirst: true,
                width: config.csDfltFormListWidth || 200,
                id: idpref('csDfltFormList'),
                csStatTableN: config.csDfltFormList,
                // 07.10.22 on; je pouzit sufix pobocky?
                csBranchSufix: config.csBranchSufix,
                hidden: config.csHideDfltFormList,
                csData: true, // 11.02.22 on; 
                listeners: {
                    // 25.11.21 on; Otevreneni noveho zaznamu uz pri vyberu z comboboxu.
                    select: {
                        fn: function( /*combo, record , index*/ ) {
                            this.csOnNew();
                        },
                        scope: this
                    }
                }
            }, {
                xtype: 'button',
                text: i3.tx.txNew,
                id: idpref('pbNew'),
                iconCls: 'icon-new-img', // 30.08.22 on; zmena na ikonu v souboru
                handler: function() {
                    this.csOnNew();
                },
                scope: this
            }, {
                xtype: 'tbseparator'
            }, {
                html: '<div style="width:50px;"><button id="menu-ic" type="button" class="x-btn-text i-btn"><span class="icon-menu" aria-hidden="true"></span> Menu</button></div>',
                id: idpref('pmMenu'), // 10.02.12 on; pristup k menu
                menu: toolBarMenu
            }, '->', {
                text: i3.ui.DataTable.tx.txInBasket,
                id: 'pbBasket',
                iconCls: 'icon-basket',
                hidden: !i3.csBasket,
                handler: function() {
                    this.csOnBasket();
                },
                scope: this
            }
            // 22.09.10 on; presunute do tool baru
            /*, '->', { // 29.06.10 on; na konec vlozi label pro zobrazeni Read only
             xtype: 'label',
             text: i3.tx.txReadOnly,
             hidden: true,
             id: idpref('lblReadOnly'),
             style: 'font-weight: bold; font-size: medium; color: red'
             }*/
        ];
        return toolBar;
    },
    /**
     * Funkce vrati tools ikony
     *
     * 21.05.14 on;
     */
    csGetWintools: function(config) {
        // 25.11.09 rs; zoznam tools pre hlave okno
        var winTools = [];
        // 22.09.10 on; na zacatek vlozi ikonu zamku
        winTools.push({
            id: 'csReadonly', // !! pri zmene id pozor, pouziva se na vice mistech
            //qtip: i3.tx.txReadOnly, // neni treba, pozdej se prepise udaji o tom, kdo ma zaznam zamknuty
            hidden: true,
            handler: function() {
                this.onToolsReadonly();
            },
            scope: this
        });
        // 11.08.16 on; doplneno i3.csSkipHelpIcon
        if ((!config.csSkipHelpIcon) && (!i3.csSkipHelpIcon)) {
            winTools.push({
                id: 'help',
                handler: function() {
                    this.onToolsHelp();
                },
                scope: this
            });
        }
        // kolecko je urcene na ladanie - zobrazime len v debug rezime
        if (i3.debug > 0) {
            winTools.push({
                id: 'gear',
                handler: function() {
                    this.onToolsGear();
                },
                scope: this
            });
        }
        return winTools;
    }
});
/*
 *  panel pro zmenu helsa
 */
i3.ui.DataTable.ChangePasswordPnl = Ext.extend(i3.ui.ColPanel, {
    constructor: function(config) {
        config = config || {};
        //var appWin = i3.Login.mainApp();
        var idpref = i3.getIdPrefFn(config.idpref);
        // jednoduche makro na prefixy id-ciek
        var thisref = this;
        Ext.apply(config, {
            layout: 'form',
            items: [{
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: i3.ui.DataTable.tx.txActualPassword,
                    anchor: '-5',
                    inputType: 'password',
                    name: 't100a',
                    nameSpace: 'a',
                    invalidText: i3.ui.DataTable.tx.txERROldEmpty,
                    // 03.03.17 on; moznost skryt pole pro aktualni heslo
                    hidden: config.csHideActualPassword,
                    validator: function(s) {
                        // 03.03.17 on; pokud ne pole skryte, nevalidovat
                        if (this.hidden) {
                            return true;
                        }
                        // aktualni heslo nesmi byt prazdne
                        return s !== '';
                    }
                }, {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: i3.ui.DataTable.tx.txNewPassword,
                        anchor: '-5',
                        inputType: 'password',
                        name: 't100b',
                        id: idpref('csNewPass'),
                        nameSpace: 'a',
                        invalidText: i3.ui.DataTable.tx.txERRNewEmpty,
                        validator: function(s) {
                            // nove heslo nesmi byt prazdne a musi splnovat aspon zakladni pozadavek na delku
                            var n = i3.getPasswordQuality(s);
                            return (s !== '') && (n > 0);
                        },
                        enableKeyEvents: true,
                        listeners: {
                            keyup: {
                                fn: function(pFld /*, pEvent*/ ) {
                                    var pbar1 = this.getCmp('csStrongPass');
                                    if (!pbar1) {
                                        return;
                                    }
                                    var n = i3.getPasswordQuality(pFld.getValue());
                                    var s = n > 0 ? ' ' : i3.ui.DataTable.tx.txPassShort;
                                    // musi byt mezera
                                    var progPerc = (n / 4);
                                    // 03.03.17 on; aktualizace hintu
                                    if (n === 0) {
                                        if (i3.isEmptyString(pFld.getValue())) {
                                            pFld.invalidText = i3.ui.DataTable.tx.txERRNewEmpty;
                                        } else {
                                            pFld.invalidText = i3.ui.DataTable.tx.txERRNewShort;
                                        }
                                    }
                                    pbar1.updateProgress(progPerc, s, true);
                                },
                                scope: this
                                //buffer: 100
                            }
                        }
                    }]
                }, {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: i3.ui.DataTable.tx.txConfirmation,
                        anchor: '-5',
                        inputType: 'password',
                        name: 't100c',
                        nameSpace: 'a',
                        invalidText: i3.ui.DataTable.tx.txERRNoPass,
                        validator: function( /*s*/ ) {
                            // heslo musi byt shodne
                            var c = thisref.getCmp('csNewPass');
                            if (!c) {
                                return false;
                            }
                            var sPass1 = c.getValue();
                            var sPass2 = this.getValue();
                            return (sPass1 === sPass2);
                        }
                    }]
                }, {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'form',
                    items: [{
                        fieldLabel: i3.ui.DataTable.tx.txPassQuality,
                        xtype: 'progressbar',
                        id: idpref('csStrongPass'),
                        anchor: '-5'
                    }]
                }]
            }],
            listeners: {
                clientvalidation: function(form, isValid) {
                    isValid = false;
                }
            }
        });
        i3.ui.DataTable.ChangePasswordPnl.superclass.constructor.call(this, config);
    }
});
/**
 * @class i3.ui.DataTable.Panel
 * Panel pre i3.ui.DataTable
 */
i3.ui.DataTable.Panel = Ext.extend(Ext.form.FormPanel, {
    /**
     * @param {Object} config options
     *   csFlexPopParams
     *      idxlistStoreId:     nazov UnTablesd ciselnika so zoznamom poli
     *      displayFmt:         display format for search/browse
     *      +moze obsahovat dalsie params pre flexpop, viz. flexpop metoda usrDoSearch()
     *
     *   csFormData:        items pre formular, incl. layoutu atd.
     *   csClassDflt:       classname datoveho zaznamu pre nove zaznamy (a default pre search)
     *   csMarcConvDef      definicne pole pre konverziu MARC na interny format a naopak
     *   csSkipToolbar:     true/false; ak true nevytvarat tooolbar s ovladanim
     *   csSkipHelpIcon:    true/false; ak true nevytvarat ikonu napovedy (otaznik)
     *   csCanLockRecord:   true/false; pokud je true, umozni zamykani zaznamu nactenych do panelu
     *
     *   idpref:            id prefix
     *
     *   13.10.10 on; nastaveni zamykani zaznamu v panelu - csCanLockRecord
     */
    constructor: function(config) {
        config = config || {};
        // makra na jednoduche prefixovanie id-ciek elementov
        var idpref = i3.getIdPrefFn(config.idpref);
        if (!config.csSkipToolbar) {
            // vytvorit niektore spolocne prvky (ulozia sa do config)
            // 03.04.09 rs; toto este mozno bude treba prehodnotit
            i3.ui.DataTable.baseComp.call(this, config);
            // 21.05.14 on; vytvoreni toolbaru vlozeno do funkce
            // 10.02.12 on; moznost volby polozek v menu
            /*var toolBarMenu = [];
             if (!config.csSkipChangePassMenu) {
             toolBarMenu = toolBarMenu.concat([{
             text : i3.ui.DataTable.tx.txChangePassword, // 'Change password'
             handler : function() {
             this.csOnChangePassword();
             },
             scope : this
             }]);
             }

             if (!config.csSkipDeleteRecMenu) {
             toolBarMenu = toolBarMenu.concat([{
             text : i3.ui.DataTable.tx.txDeleteRec, // 'Delete record'
             handler : function() {
             this.csOnDelete();
             },
             scope : this
             }]);
             }

             // 05.06.12 on; moznost zapojit inventarizaci
             if (config.csInventoryMenu) {
             // 15.06.12 on; zatim neimplementovane
             toolBarMenu = toolBarMenu.concat([{
             text : i3.ui.DataTable.tx.txInventoryName,
             handler : function() {
             i3.Inventory.csOnInventoryName.call(this, this.csClassSrchBib + 'H');
             },
             scope : this
             }]);
             toolBarMenu = toolBarMenu.concat([{
             text : i3.ui.DataTable.tx.txInventory,
             handler : function() {
             i3.Inventory.csOnInventory(this.csClassSrchBib + 'H', this.csBranch);
             },
             scope : this
             }]);
             }

             if (!config.csSkipLogoutMenu) {
             toolBarMenu = toolBarMenu.concat([{
             text : i3.tx.txLogout, // 'Logout'
             handler : function() {
             this.csOnLogout();
             // may be overriden later
             },
             iconCls : 'bmenu',
             scope : this
             }]);
             }

             if (!config.csSkipAboutMenu) {
             toolBarMenu = toolBarMenu.concat([{
             // 23.08.11 on; verze aplikace
             text : i3.ui.DataTable.tx.txAbout,
             handler : function() {
             // 23.09.13 on; rozsireni about okna
             //i3.alert(i3.ui.DataTable.tx.txVersion, i3.version);
             i3.ui.csShowAbout();
             },
             scope : this
             }]);
             }

             // 11.10.12 on; help
             if (config.csShowHelpMenu) {
             toolBarMenu = toolBarMenu.concat([{
             text : i3.ui.DataTable.tx.txHelp,
             handler : function() {
             this.csOnHelp();
             },
             scope : this
             }]);
             }

             // 14.03.13 on; moznost pridat pres konfiguraci (CLIENT_CFG) dalsi polozky do menu s odkazem na www stranky (stejne jako je u webovych vypujcek)
             var i, s1, s2;
             for ( i = 1; i <= 3; i++) {
             s1 = i3.WS.sXlate('CLIENT_CFG', 'WebMenuURL' + i);
             if (s1 !== '') {
             s2 = i3.WS.sXlate('CLIENT_CFG', 'WebMenuURLName' + i);
             if (s2 === '') {
             s2 = s1;
             }
             // oddelovac jenom pro prvni polozku menu
             if (i === 1) {
             toolBarMenu.push(new Ext.menu.Separator());
             }

             toolBarMenu.push({
             text : s2,
             handler : this.csShowURL.createDelegate(this, [s1])
             //scope : this
             });
             }
             }

             // 25.11.09 rs; ladiace polozny do menu pridat, len v debug rezime
             if (i3.debug > 0) {
             toolBarMenu = toolBarMenu.concat([{
             text : '(dev) Show current int.record',
             handler : function() {
             this.csShowObj(this.csLinRecord);
             },
             scope : this
             }, {
             text : '(dev) Show load-time int.record',
             handler : function() {
             this.csShowObj(this.csOrigLinRecord);
             },
             scope : this
             }, {
             text : '(dev) Show current MARC record',
             handler : function() {
             // ziskat zaznam v MARC formate
             var oRec = this.csGetMarc();
             if (!oRec) {
             i3.alert('no data');
             }

             this.csShowObj(oRec);
             },
             scope : this
             }, {
             text : '(dev) Show load-time MARC record',
             handler : function() {
             this.csShowObj(this.csOrigMarcRecord);
             },
             scope : this
             }, {
             text : '(dev) WS debug on',
             handler : function() {
             i3.WS.setDebug(1);
             i3.msg('Ws debug ON');
             },
             scope : this
             }, {
             text : '(dev) Flexpop debug on',
             handler : function() {
             i3.setOption('flexpop_debug', true);
             i3.msg('Flexpop debug ON');
             },
             scope : this
             }]);
             }

             var toolBar = [config.csCbIndex, {
             xtype : 'tbspacer'
             }, config.csFldTerm, config.csPbSearch, config.csPbBrowse, config.csPbAscii, {
             xtype : 'tbseparator'
             }, {
             xtype : 'button',
             // 25.06.12 on; tucny text
             text : '<b>' + i3.tx.txSave + '</b>',
             // 11.10.12 on; moznost skryt tlacitko ulozit
             hidden : config.csHideSaveBtn,
             id : idpref('pbSave'),
             handler : function() {
             this.csOnSave();
             },
             scope : this
             }, {
             xtype : 'tbseparator' // 17.10.13 on; oddelovac mezi Ulozit a Novy
             }, {
             // 17.10.13 on; do standardu doplnen combobox se seznamem defaultnich formularu
             xtype : 'cs_combo_st',
             csAutoSelectFirst : true,
             width : config.csDfltFormListWidth || 200,
             id : idpref('csDfltFormList'),
             csStatTableN : config.csDfltFormList,
             hidden : config.csHideDfltFormList
             }, {
             xtype : 'button',
             text : i3.tx.txNew,
             id : idpref('pbNew'),
             handler : function() {
             this.csOnNew();
             },
             scope : this
             }, {
             xtype : 'tbseparator'
             }, {
             text : 'Menu',
             iconCls : 'bmenu',
             id : idpref('pmMenu'), // 10.02.12 on; pristup k menu
             menu : toolBarMenu
             }];*/
            var toolBar = i3.ui.DataTable.csGetToolbar.call(this, config, idpref);
            Ext.applyIf(config, {
                tbar: toolBar
            });
        }
        // 21.05.14 on; vlozeno do metody
        /*// 25.11.09 rs; zoznam tools pre hlave okno
         var winTools = [];
         // 22.09.10 on; na zacatek vlozi ikonu zamku
         winTools.push({
         id : 'csReadonly', // !! pri zmene id pozor, pouziva se na vice mistech
         //qtip: i3.tx.txReadOnly, // neni treba, pozdej se prepise udaji o tom, kdo ma zaznam zamknuty
         hidden : true,
         handler : function() {
         this.onToolsReadonly();
         },
         scope : this
         });

         if (!config.csSkipHelpIcon) {
         winTools.push({
         id : 'help',
         handler : function() {
         this.onToolsHelp();
         },
         scope : this
         });
         }
         // kolecko je urcene na ladanie - zobrazime len v debug rezime
         if (i3.debug > 0) {
         winTools.push({
         id : 'gear',
         handler : function() {
         this.onToolsGear();
         },
         scope : this
         });
         }*/
        var winTools = i3.ui.DataTable.csGetWintools.call(this, config);
        Ext.applyIf(config, { //
            // default for the record
            csLinRecord: {},
            //labelAlign: 'top',
            //layout: 'form',
            frame: true,
            //autoScroll: true,
            monitorValid: true,
            defaults: {
                labelSeparator: '',
                // 14.07.17 on; ke vsem prvkum na formularu prida odchyceni udalosti change
                //              TODO: jeste v jich aplikacich nez DKM zkusit, jestli se neznefunkcni existujici change udalosti
                listeners: {
                    add: function(me, component, index) {
                        if (component.isFormField) {
                            component.on('change', this.csOnFieldChanged, this);
                        }
                    },
                    scope: this
                }
            },
            bodyStyle: 'padding: 5px 5px 5px 5px',
            deferredRender: false,
            //autoHeight: true,
            xtype: 'form',
            items: config.csFormData,
            tools: winTools,
            csCanLockRecord: false // 13.10.10 on; defaulne nezamykat zaznamy
            // 18.10.13 on; takto se listeners pokud uz nejkay jiny existuje, nepouzil
            //listeners : {
            /**
             * sprava notifikujuca okno o validite dat
             * pouzijeme na zablokovanie, alebo naopak povolenie tlacitka "Save"
             */
            // clientvalidation : {
            //   fn : this.csOnClientValidation
            // }
            //}
        });
        // 18.10.13 on; upravene dedeni listeners
        config.listeners = config.listeners || {};
        Ext.applyIf(config.listeners, {
            /**
             * sprava notifikujuca okno o validite dat
             * pouzijeme na zablokovanie, alebo naopak povolenie tlacitka "Save"
             */
            clientvalidation: {
                fn: this.csOnClientValidation
            }
        });
        i3.ui.DataTable.Panel.superclass.constructor.call(this, config);
    },
    /**
     * Linear version of the record - internal storage for the record
     */
    csLinRecord: null,
    /**
     * Linear version of the record - after first decode of loaded marc (=before any edits)
     */
    csOrigLinRecord: null,
    /**
     * MARC version of the record which was loaded in form (=source of csOrigLinRecord)
     */
    csOrigMarcRecord: null,
    /**
     * Timer pro zamykani zaznamu.
     */
    csTimer: null,
    /**
     * Inicializacia komponenty.
     * 15.04.09 rs
     */
    initComponent: function() {
        this.csLinRecord = {};
        // tu este nemoze byt naplnenie poli, pretoze formular este nie je vyrendrovany
        //this.csOnNew();
        i3.ui.DataTable.Panel.superclass.initComponent.call(this);
    },
    /** Kliknutie na tlacitko Search alebo Browse
     *
     * callback csOnPreSearch umoznuje testne pred vyhladavanim upravit parametre vyvolania flexpopu
     *
     * pbSearch: podla 'i3.ui.FlexPop.usrDoSearch()'
     *   0 - scan
     *   1 - search
     *   2 - browse
     */
    csOnSearch: function(pbSearch) {
        var ix = this.getCmp('index').getValue(),
            term = this.getCmp('term').getValue();
        // 13.07.15 on; predani paramnetru
        var fpwin = i3.ui.FlexPop.getWin(this.csFlexPopParams);
        var fppar = Ext.apply({}, this.csFlexPopParams);
        Ext.applyIf(fppar, {
            // trieda na ktorej spustit search
            // je ale len default, mozem byt zadana explicitne (napr. moze byt zadany iny default pre novy zaznam
            // a iny (napr. zoznam) pre search
            classn: this.csClassDflt,
            initUseAttr: ix, //                        init atributy (nepovinne)
            initTerm: term,
            searchMode: pbSearch, //                   search mode 0: scan,1: search, 2: browse,3: ascii
            wannaMarcRes: true, //                     request result in MARC
            callback: this.csLoadMarcRec,
            scope: this
        });
        // 08.02.12 on; podminka kvuli vypujckam
        if (this.csOnPreSearch) {
            // callback pred vyhladavanim - moze napr. upravit parametre flexpop pred spustenim aktualneho vyhladavania
            if (!this.csOnPreSearch(fppar)) {
                return;
            }
        }
        // Otvorit flexpop so search/browse
        fpwin.usrDoSearch(fppar);
    },
    /**
     * Callback pred vyhladavanim - moze napr. upravit parametre flexpop pred spustenim aktualneho vyhladavania
     * Return:
     *   true  - search may continue
     *   false - abandon search
     *
     * @param {Object} pFlexPopParams
     */
    csOnPreSearch: function( /*pFlexPopParams*/ ) {
        // abstract
        return true;
        // search can continue
    },
    /**
     * Vymaz zaznamu
     */
    csOnDelete: function() {
        // **
        var t001 = this.csLinRecord.t001;
        if ((!i3.isUnEmptyString(t001)) || (t001 === 'new')) {
            i3.alert('Can\'t delete now..');
            return;
        }
        this.csOnSave({
            csOperation: 'delete'
        });
    },
    /**
     * Akcia "novy zaznam". Nacitanie prazdneho zaznamu do formulara.
     */
    csOnNew: function() {
        this.csLoadMarcRec(new i3.Marc({
            t001: 'new',
            classn: this.csClassDflt
        }));
    },
    /**
     * Zobrazi kosik.
     *
     */
    csOnBasket: function() {
        i3.ui.csOpenColWin({
            title: '<span class="icon-basket" aria-hidden="true"></span> ' + i3.ui.DataTable.tx.txBasket,
            CsPanel: i3.ui.Basket.Panel,
            // 08.04.20 on; velikost kosiku 800 -> 900
            width: 900
        }, {
            /*csOnAfterOK: function(pLinRec) {
             },
             csOnAfterOKScope: this,*/
            csMainForm: this,
            idpref: 'basket'
        });
    },
    csOnFieldChanged: function(cmp) {
        // abstract
        // ZF aktualizovat az po nahrani zaznamu do formualare!!!
        // jinak se nenahral cely zaznam - nahravani bylo preruseno dotazem na ZF
        // 05.10.17 on; doplni hint do pole, kde neni videt cely text
        var el = cmp.getEl();
        if (!i3.isEmptyString(cmp.value) && el && (el.dom.scrollWidth > el.dom.offsetWidth)) {
            Ext.QuickTips.register({
                target: cmp,
                text: cmp.value
            });
        } else {
            Ext.QuickTips.unregister(cmp);
        }
    },
    /**
     * Vrati aktualny obsah formulara v MARC formate (ako datovy tym i3.Marc)
     * Pred konverziou spravi aktualizaciu linear verzie zaznamu z poli formulara, teda ziska sa aktualny stav.
     * Plus triedu urci z povodneho zaznamu, ktory bol do formulara nacitany (csOrigMarcRecord).
     * Triedu je mozne este v dalsom ktoku eventualne zmenit prepisanim csOnSave.
     *
     */
    csGetMarc: function() {
        this.csForm2Record();
        if (!this.csLinRecord) {
            return null;
        }
        // teraz by sme mali mat aktualizovany zaznam v csLinRecord
        var oErr = {};
        var oRec = i3.DataFmt.toMarc(this.csMarcConvDef, this.csLinRecord, oErr);
        if (oErr.tx) {
            i3.alert('Error converting linearized record to MARC: ' + oErr.tx);
            return null;
        }
        // trieda pre ulozenie sa pouzije nie this.csClass, ale povodna trieda zo zaznamu
        // napr. search moze vyhladat zaznam aj z inej bazy, nez je default
        oRec.classn = this.csOrigMarcRecord ? this.csOrigMarcRecord.classn : this.csClassDflt;
        return oRec;
    },
    /**
     * Akcia Save ulozi obsah formulara do databazy.
     *
     * pOptions
     *   csOperation: nepovinny parameter - UCP operacie pre WS update
     *                vyuzije sa len pri vymaze a vtedy ma obsahovat 'delete'
     *                nepovinne; default je update
     *   csCallback:  callback, kt. bude vyvolany po uspesnom ulozeni zaznam
     *                parametrom callbacku bude vytvoreny zaznam
     *                nepovinne
     *   csScope:     scope pre callback
     *                nepovinne
     */
    csOnSave: function(pOptions) {
        // ziskat zaznam v MARC formate
        pOptions = pOptions || {};
        var oRec = this.csGetMarc();
        this.csOnSaveMarc(pOptions, oRec);
    },
    /**
     * Pokracovanie csOnSave - prvu cast je mozne zmenit v potomkoch a dorobit nejaku
     * pre save logiku
     * Popis parametrov: viz. csOnSave
     *
     * @param {Object} pOptions
     * @param {Object} oRec
     */
    csOnSaveMarc: function(pOptions, oRec) {
        var lOperation = pOptions.csOperation;
        var t001 = oRec.t001;
        // kontrola platnosti requestu
        if (t001 === '') {
            i3.alert('Can\'t update the record now..');
            return;
        }
        // pOperation je nepovinny parameter
        if (lOperation === undefined) {
            lOperation = (t001 === 'new') ? 'insert' : 'update';
        }
        i3.WS.update({
            operation: lOperation,
            success: function(oMARC_rec, oResponse) {
                // 10.09.15 on; moznost zadat hlasku v pOptions
                var sMsg = pOptions.txOKText || i3.ui.DataTable.tx.txUpdateOK;
                // ak bol zaznam zmazany (& operacia prebehla OK)
                // nechame nacitat prazdny MARC
                if (lOperation === 'delete') {
                    oMARC_rec = new i3.Marc();
                    // 10.09.15 on; moznost zadat hlasku v pOptions
                    sMsg = pOptions.txOKText || i3.ui.DataTable.tx.txDeletedMsg;
                }
                // 17.03.22 on; podpora pro info zpravy
                if (!i3.isEmptyString(oResponse.ret_msg)) {
                    var m = new i3.WS.Msg(oResponse.ret_msg);
                    sMsg += '<br><br>' + m.userText;
                }
                i3.msg(sMsg);
                /// 30.07.15 on; predani options - pouzito v nra
                /// VRATENIE NOVEHO ZAZNAMU callbacku
                this.csLoadMarcRec(oMARC_rec, pOptions);
                // nacitat aktualizovany zaznam do formulara
                if (pOptions.csCallback) {
                    pOptions.csCallback.call(pOptions.csScope || this, oMARC_rec);
                }
            },
            failure: function(msg) {
                // db update failed
                // 10.02.12 on; preklad zpravy
                //i3.alert(i3.ui.DataTable.tx.txUpdateFailedMsgTit, msg);
                var m = new i3.WS.Msg(msg);
                i3.alert(i3.ui.DataTable.tx.txUpdateFailedMsgTit, m.userText);
            },
            scope: this
        }, oRec);
    },
    /** Nacitanie prvkov formulara do linearizovaneho zaznamu.
     *  Moze byt prepisane v potomkoch, ale pre jednoduche pripady default moze postacovat.
     *
     *  07.04.09 rs
     */
    csForm2Record: function() {
        var f = this.extract('a', 'field');
        Ext.apply(this.csLinRecord, f);
    },
    /** Nacitanie linearizovaneho zaznamu do formulara.
     *  Moze byt prepisane v potomkoch, ale pre jednoduche pripady default moze postacovat.
     *
     *  07.04.09 rs
     */
    csRecord2Form: function() {
        // 07.04.16 on; defaultni formular pro nove zaznamy
        if (this.csFlexPopParamsCall && this.csFlexPopParamsCall.csDfltForm && (this.csLinRecord.t001 === 'new')) {
            this.csLoadDfltForm(this.csFlexPopParamsCall.csDfltForm);
        } else {
            this.csRecord2FormEnd();
        }
    },
    csRecord2FormEnd: function() {
        this.populate(this.csLinRecord, 'a', 'field', {
            setupAll: true
        });
        this.doLayout();
    },
    /*
     * nahraje obsah defaultni formulare
     */
    csLoadDfltForm: function(psDfltForm) {
        if (!i3.isEmptyString(psDfltForm)) {
            // pokud je vybrany formular, nacteme ho
            i3.WS.getRecord({
                classn: i3.WS.getDfltUnTablesd(),
                t001: 'CMCONFIG_' + psDfltForm,
                scope: this,
                success: function(rec) {
                    rec = i3.csFixDefaultForm(rec);
                    this.csLoadDfltFormEnd(rec);
                },
                failure: function(msg) {
                    // pokud doslo k chybe, zobrazi hlasku a skonci
                    i3.alert(msg);
                    return 0;
                }
            });
        } else {
            this.csRecord2FormEnd();
        }
    },
    /**
     * Vytvori zaznam podle predaneho parametru.
     *
     * @param {Object} pOptions
     *
     */
    csLoadDfltFormEnd: function(poRecord) {
        var oRec = new i3.Marc({
            t001: poRecord.t001 || 'new',
            classn: this.csClassDflt,
            data: poRecord.data || []
        });
        var oErr = {};
        // ulozim k tabu i defaultni hodnoty
        this.csLinRecord = i3.DataFmt.fromMarc(this.csMarcConvDef, oRec, oErr, true);
        this.csRecord2FormEnd();
    },
    /**
     *  Nacitanie MARC zaznamu do formulara.
     *  Vola sa pri:
     *    1, kliknuti na novy zaznam
     *    2, po vybere zaznamu via search
     *    3, po update zaznamu v db na nacitanie zmeneneho zaznamu z db
     *
     *  Vstupujuci zaznam sa naparsuje do internej struktury. Tato sa ulozi do this.csLinRecord.
     *  Nasledne sa zavola funkcia csRecord2Form, kt. je zodpovedna za nacitanie interneho formatu do
     *  datovych prvkov formulara.
     *
     *  csOrigMarcRecord - ulozi sa zaznam, ktory sa uspesne nacital do formulara
     *  csLinRecord      - ulozi sa aktualny stav v linearizovanej verzii - tento sa dynamicky meni pri praci s oknom
     *  csOrigLinRecord  - ulozi sa originalna verzia csLinRecord z okamihu nacitania do formulara
     *                     tato ma zmysel hlavne pre ladenie
     *
     *  @param {i3.Marc} oRec - MARC zaznam na nacitanie do formulara
     *
     *  07.04.09 rs;
     */
    csLoadMarcRec: function(oRec) {
        // 14.01.22 on; pokud oRec neexistuje, neudelam nic - ve flex popup okne nenajdu zadny zaznam a dam OK
        if (!oRec) {
            return;
        }
        // nastavit T001 zaznamu - robime rucne, pretoze pole je disabled
        //this.getCmp('t001').setValue(oRec.t001);
        // 29.06.10 on; odemkne editovany zaznam
        this.csUnlockRecord(this.csLinRecord);
        var oErr = {};
        this.csOrigMarcRecord = null;
        // 29.08.24 on; pokud je titul readonly, nekontrolovat ztratu poli
        // 02.05.11 on; pridany parametr pro kontrolu ztraty poli
        //this.csLinRecord = i3.DataFmt.fromMarc(this.csMarcConvDef, oRec, oErr, true);
        this.csLinRecord = i3.DataFmt.fromMarc(this.csMarcConvDef, oRec, oErr, !this.csTitleReadOnly);
        // encode/decode vyrobi klon (sice mierne nasilne; zatial ma nic lepsie nenapada)
        // ak by sme nespravili klon, da sa cez pointer (via csLinRecord) pomenit obsah csOrigLinRecord
        this.csOrigLinRecord = Ext.decode(Ext.encode(this.csLinRecord));
        if (oErr.tx) {
            i3.alert('Error linearizing MARC record: ' + oErr.tx);
            this.csLinRecord = {};
            return;
        }
        this.csRecord2Form();
        // tu nemusime robit klon, pretoze oRec sa neuchovava (takze nam ho nema kto pod rukami zmenit)
        this.csOrigMarcRecord = oRec;
        // po uspesnom nacitani zaznamu aktualizovat titulok/status okna
        this.csSetupStatusLine();
        // 25.06.10 on; zamkne editovany zaznam
        this.csLockRecordMain();
    },
    /**
     * Internal helper of converting JSON object to string for debug display purposes.
     * Very simplified.
     * @param {Object} o
     */
    csEncode: function(o) {
        var s = Ext.encode(o);
        s = s.strswap(' ', '.').strswap(i3.c.SFstr, '&lt;SF&gt;');
        s = s.strswap(',', ', ');
        return s;
    },
    /**
     * Jednoduche vizualne zobrazenie danehoi pola. Pre debug ucely.
     * @param {Object} o
     */
    csShowObj: function(o) {
        //i3.alert('<font face="Courier">' + this.csEncode(o) + '</font>');
        i3.alert(this.csEncode(o));
    },
    /**
     * Reakcia na validation message formulara. Moze napr. povolit/zakazat "save" stacitko atd.
     * @param {Object} form
     * @param {Object} bIsValid
     */
    csOnClientValidation: function(form, bIsValid) {
        var pbSave = this.getCmp('pbSave'),
            bSaveState = !bIsValid;
        // 21.09.10 on; doplnena podminka, pbSave nemusi na formulari vubec byt
        if (pbSave) {
            if (pbSave.disabled !== bSaveState) {
                //console.log('changing state to ' + bSaveState)
                pbSave.setDisabled(bSaveState);
            }
        }
    },
    /**
     * Aktualizacia status resp. titulneho riadka.
     * Tu je prazdna, ale moze byt doplnena v potomkoch.
     */
    csSetupStatusLine: function() {
        // abstract
        // 10.08.17 on; aktualizuje pocet zaznamu v kosiku
        if (i3.csBasket) {
            i3.ui.Basket.csSetBasketTitle();
        }
    },
    /**
     * Zobrazenie pracovnych verzii zaznamu. Pre debug ucely.
     */
    onToolsGear: function() {
        var prop,
            s1 = '';
        this.csForm2Record();
        var s = 'csLinRecord: ' + this.csEncode(this.csLinRecord);
        var oRec = this.csGetMarc();
        if (oRec) {
            s += '<br><br>csGetMarc(): ' + this.csEncode(oRec);
        }
        // 01.03.18 on; nstaveni session
        if (i3.Login && i3.Login.ctx) {
            for (prop in i3.Login.ctx) {
                if (i3.Login.ctx.hasOwnProperty(prop)) {
                    if (s1 !== '') {
                        s1 += '<br>';
                    }
                    s1 += prop + ':' + i3.Login.ctx[prop];
                }
            }
            if (s1 !== '') {
                s += '<hr>' + s1;
            }
        }
        i3.alert('Internal debug listing', s);
    },
    /**
     * Zobrazenie helpu po kliku na ikonku otaznika v titulku okna
     *
     * 27.11.09 rs; pridana jednoducha deduplikacia poli
     */
    onToolsHelp: function() {
        //alert('last field was: ' + this.csCurrentFld);
        var fldItems = [];
        var fmtPrefix1 = '';
        // default is undefined
        // konverzna tabulka (bude fungovat u datovych okien)
        var marcConv = this.csMarcConvDef;
        // ak sa nenasla - skusime pozriet ci mame odkaz na main form a ak hej, skusime to pohladat tam
        // bude fungovat pre collectory
        if ((!marcConv) && this.csMainForm) {
            marcConv = this.csMainForm.csMarcConvDef;
        }
        if (marcConv) {
            fmtPrefix1 = marcConv.fmtPrefix;
        }
        // opakovane polia sa nam vratia viac krat; spravime deta jednoduchu deduplikaciu
        // podla nazvu pola
        var deDup = {};
        // 22.03.10 on; prehozene poradi, nejdrive nacte fieldsety vcetne jejich fieldu
        //              a az potom fieldy, aby se fieldy neopakovaly 2x
        // then find any fieldsets
        var c = this.findFormComponents(null, 'fieldset');
        // fieldsets in any namespace
        Ext.each(c, function(pItem) {
            // 22.03.10 on; osetreny nedefinovany nazev
            if (pItem.name === undefined) {
                return;
            }
            // 22.03.10 on; odstranene duplicitni polozky v nabidce
            //if (deDup[pItem.name]) { return; }
            if (deDup[pItem.name] !== undefined) {
                return;
            }
            deDup[pItem.name] = '';
            // register the fieldset itself
            fldItems.push({
                id: pItem.name,
                text: pItem.title + ' - ' + pItem.name
            });
            // register any childs the fieldset has (fields)
            var c2 = this.findField(pItem, '*');
            Ext.each(c2, function(pItem2) {
                if (deDup[pItem2.name]) {
                    return;
                }
                deDup[pItem2.name] = '';
                fldItems.push({
                    id: pItem2.name,
                    text: pItem.title + '/' + pItem2.fieldLabel + ' - ' + pItem2.name
                });
            }, this);
        }, this);
        // first we will find all field components on this form
        // loop trough them
        var ns = 'a';
        c = this.findFormComponents(ns, 'field');
        Ext.each(c, function(pItem) {
            // 22.03.10 on; odstranene duplicitni polozky v nabidce
            //if (deDup[pItem.name]) { return; }
            if (deDup[pItem.name] !== undefined) {
                return;
            }
            deDup[pItem.name] = '';
            fldItems.push({
                id: pItem.name,
                text: pItem.fieldLabel + ' - ' + pItem.name
            });
        });
        var w = i3.ui.DataTable.getHelpWin();
        w.csShowHelp({
            flds: fldItems,
            fmtPrefix: fmtPrefix1,
            csCurrentFld: this.csCurrentFld // posledne aktivne pole vo formulari
        });
    },
    /**
     * Odhlasenie.
     * Je vytiahnute zvlast, aby ho bolo mozne prepisat v potomkoch
     */
    csOnLogout: function() {
        Ext.Msg.show({
            // 'Odhlásenie'
            title: '<span class="icon-logout" aria-hidden="true"></span> ' + i3.ui.DataTable.tx.txLogoutMsgTit,
            // 'Odhlásiť z aplikácie?'
            msg: i3.ui.DataTable.tx.txLogoutQ,
            // 13.08.12 on; lokalizace
            //buttons : Ext.Msg.OKCANCEL,
            buttons: i3.ui.OKCancel,
            fn: function(pButtonId) {
                if (pButtonId === 'ok') {
                    this.csOnLogout2();
                }
            },
            icon: 'icon-question',
            scope: this
        });
    },
    /**
     * Vykonna cast
     */
    csOnLogout2: function() {
        // 01.11.13 on; odemkne editovany zaznam - pripadne lze predefinovat v podedene tride na uzavreni vsech zaznamu v zalozkach
        this.csUnlockRecords();
        this.destroy();
        i3.Login.mainAppFireEvent('app_logout');
    },
    /**
     *  Zamkne aktualne nacteny zaznam. Obalka s timerem.
     *
     *  03.08.10 on;
     */
    csLockRecordMain: function() {
        if (this.csTimer) {
            clearTimeout(this.csTimer);
            // zrusi timer
        }
        // 08.04.15 on; predelane
        // 03.08.10 on; pokud je povoleno zamykani zaznamu, spusti timer
        //if (this.csLockRecord(this.csLinRecord)) {
        if (this.csIsLockRecordAble(this.csLinRecord)) {
            this.csLockTimer();
        }
    },
    /**
     *  Zjisti, zda je mozne zamknout zaznam
     *
     *  @param {i3.Marc} oRec - MARC zaznam zaznamu ve formulari
     *
     *  08.04.15 on;
     */
    csIsLockRecordAble: function(oRec) {
        // 13.10.10 on; pokud neni nastaveno zamykani zaznamu v tomto panelu, tak preskoci
        if (!this.csCanLockRecord) {
            return false;
        }
        // v CHANGE_LOGu je mozne zamykani vypnout
        var sChangeLog = i3.WS.sTablesdCacheGet('CHANGE_LOG');
        if (sChangeLog && (sChangeLog.getTag('210g') === '1')) {
            // skryje napis Read only
            this.csShowReadOnlyLabel('');
            return false;
        }
        // 14.01.22 on; kontrola
        if (!oRec || (!oRec.t001)) {
            return false;
        }
        // pouze zaznamy ulozene v DB
        if (oRec.t001.substring(0, 3) === 'new') {
            // skryje napis Read only
            this.csShowReadOnlyLabel('');
            return false;
        }
        // zamykat se budou pouze lokalni zaznamy
        if (!i3.WS.isLocalClass(oRec.lname)) {
            // skryje napis Read only
            this.csShowReadOnlyLabel('');
            return false;
        }
        return true;
    },
    /**
     *  Zamkne aktualne nacteny zaznam. Aktaulne nejsou resene zaznamy cm_chronology!
     *
     *  @param {i3.Marc} oRec - MARC zaznam zaznamu ve formulari
     *
     *  25.06.10 on;
     */
    csLockRecord: function(oRec) {
        // typ zamku:  "r" - zamek na cely zaznam
        //             "s" - zamek na radek zaznamu (SIGS)
        var sLockType = 'r';
        // lockType*db*T001*200a#005#999a
        var sCmd = sLockType + '*' + oRec.lname + '*' + oRec.t001 + '*' + '#' + oRec['t005.'] + '#' + oRec.t999a;
        this.csLockRecords0(oRec.lname, sCmd);
    },
    /**
     *  Vlastni zamknuti zaznamu.
     *
     *  @param {i3.Marc} oRec - MARC zaznam zaznamu ve formulari
     *
     *  25.06.10 on;
     */
    csLockRecords0: function(psTbl, psParams) {
        //rsINFLockRec = 'Locking record(s) ... please wait';
        //var result = 'Unexpected error.';
        // v CHANGE_LOGu je mozne zamykani vypnout
        var sChangeLog = i3.WS.sTablesdCacheGet('CHANGE_LOG');
        if (sChangeLog && (sChangeLog.getTag('210g') === '1')) {
            // skryje napis Read only
            this.csShowReadOnlyLabel('');
            return;
        }
        // zavola metodu na serveru
        i3.WS.command({
            db: psTbl,
            params: psParams,
            command: 'lock',
            // o-je cely JSON s vysledkom
            success: function(o) {
                if (o && (o.ret_code === '0')) {
                    if (o.data[0] === 'OK') {
                        // zamknuti probehlo v poradku
                        // skryje napis Read only
                        this.csShowReadOnlyLabel('');
                        return;
                    }
                    if (o.data[0].substring(0, 3) === 'ERR') {
                        // chyba pri zamykani zaznamu
                        // stringovu hodnotu WS/SP vysledku rozkodujeme do vhodnej datovej struktury
                        var m = new i3.WS.Msg(o.data[0]);
                        i3.alert(m.userText);
                    } else {
                        // zaznam ma zamknuty nekdo jiny
                        this.csLockRecordsPost(o.data[0]);
                    }
                } else {
                    // Zamknuti zaznamu nebylo uspesne. Popis: %s/%s'
                    i3.alert(i3.fillInParams(i3.ui.DataTable.tx.txLockFailed, [o.ret_code, o.ret_msg]));
                }
            },
            scope: this
        });
    },
    /**
     *  Reaguje na navratovou zpravu ze zamykani zaznamu.
     *
     *  @param {String} psResult - zprava ze zamykani zaznamu
     *
     *  29.06.10 on;
     */
    csLockRecordsPost: function(psResult) {
        // psResult: lockType*db*t001*200a#005#999a#username*ip*clientSN#err|lockType*db*t001####
        var bReadOnly = (psResult !== '');
        var sReason = psResult;
        // a) 5. parametr (err) je vyplneny - chyba - zobrazi hlasku a nastavi zaznam na readonly
        // b) 2. parametr (005) je vyplneny - zobrazi dotaz, zda dotahnout zaznam aktualni zaznam na serveru
        // c) jinak zaznam read only
        // sprava rozdelena na "#"
        var aMsg = psResult.split('#');
        if ((aMsg[4]) && (aMsg[4] !== '')) { // paty parametr
            i3.msg('', i3.ui.DataTable.tx.txLockRecError, [aMsg[4]]);
            sReason = aMsg[4];
        } else if ((aMsg[1]) && (aMsg[1] !== '')) {
            // zazman neni zamknuty, pouze byl zmeneny nekym jinym
            // zobrazi zpravu, at se zaznam refreshne
            // zaznam zustane v db read only
            i3.msg(i3.ui.DataTable.tx.txLockRecChanged);
            sReason = i3.ui.DataTable.tx.txLockRecChanged;
        }
        // pokud se nepodarilo zaznam zamknout nastavi atribut ReadOnly
        if (bReadOnly) {
            this.csShowReadOnlyLabel(sReason);
        }
    },
    /**
     *  Zobrazi/skryje napsi Read only.
     *
     *  @param {Boolean} visible - zobrazit=true, skryt=false
     *
     *  29.06.10 on;
     */
    csShowReadOnlyLabel: function(psReason) {
        // 22.09.10 on; presunuto do toolbaru
        /*// 26.07.10 on; pridana podminka
        var c = this.getCmp('lblReadOnly');
        if (c) {
        c.setVisible(visible);
        }*/
        // 11.11.12 on; kontrola
        if (!this.tools.csReadonly) {
            return false;
        }
        if (psReason === '') {
            // 02.03.12 on; pokud je nadefinovana funkce csIsRecReadOnly a zaznam uz je z nejakeho duvodu readonly (na vyssi urovni aplikace),
            //              nebude se zamek rusit
            if ((this.csIsRecReadOnly) && (this.csIsRecReadOnly())) {
                return;
            }
            this.tools.csReadonly.setVisible(false);
            this.tools.csReadonly.dom.qtip = '';
            this.header.dom.className = 'x-panel-header';
        } else {
            this.tools.csReadonly.setVisible(true);
            this.tools.csReadonly.dom.qtip = this.csGetInfoFromHint(psReason);
            this.header.dom.className = 'x-panel-header-readonly';
        }
    },
    /**
     * Zobrazi info o tom, kdo ma zaznam zamknuty ve zprave
     *
     */
    onToolsReadonly: function() {
        i3.alert(this.tools.csReadonly.dom.qtip);
    },
    /**
     *  Naformatuje info o zamknutem zaznamu.
     *
     */
    csGetInfoFromHint: function(s) {
        if (s === '') {
            return '';
        }
        // pokud obsahuje vice nez 3 mrizky
        if (s.split('#').length > 4) {
            var aFields = s.split('*');
            var sUserName = aFields[3].split('#')[3];
            var sIP = aFields[4];
            var sSN = aFields[5].split('#')[0];
            return i3.ui.DataTable.tx.txLockUser + sUserName + '<br>' + i3.ui.DataTable.tx.txLockIP + sIP + '<br>' + i3.ui.DataTable.tx.txLockSN + sSN + '<br>' + s;
            // komplet info
        }
        return s;
    },
    /**
     *  Vrati true pokud je zaznam readonly.
     *
     *  03.08.10 on;
     */
    csIsReadOnly: function() {
        // 22.09.10 on; presunuto do toolbaru
        /*// 26.07.10 on; pridana podminka
        var c = this.getCmp('lblReadOnly');
        if (!c) {
        return false;
        }*/
        // 17.02.12 on; podminka
        if (this.tools.csReadonly) {
            return this.tools.csReadonly.isVisible();
        }
        return false;
    },
    /**
     *  Odemkne zaznam. Aktaulne nejsou resene zaznamy cm_chronology!
     *
     *  @param {i3.Marc} oRec - MARC zaznam zaznamu ve formulari
     *
     *  25.06.10 on;
     */
    csUnlockRecord: function(oRec) {
        // 13.10.10 on; pokud neni nastaveno zamykani zaznamu v tomto panelu, tak preskoci
        if (!this.csCanLockRecord) {
            return;
        }
        // skryje napis Read only
        this.csShowReadOnlyLabel('');
        // v CHANGE_LOGu je mozne zamykani vypnout
        var sChangeLog = i3.WS.sTablesdCacheGet('CHANGE_LOG');
        if (sChangeLog && (sChangeLog.getTag('210g') === '1')) {
            return;
        }
        // 26.07.10 on; upravene
        // pouze zaznamy ulozene v DB
        if (oRec.t001 === undefined) {
            return;
        }
        var sT001;
        if (Ext.isArray(oRec.t001)) {
            sT001 = oRec.t001[0];
        } else {
            sT001 = oRec.t001;
        }
        if (sT001.substring(0, 3) === 'new') {
            return;
        }
        // zamykat se budou pouze lokalni zaznamy
        if (!i3.WS.isLocalClass(oRec.lname)) {
            return;
        }
        // typ zamku:  "r" - zamek na cely zaznam
        //             "s" - zamek na radek zaznamu (SIGS)
        var sLockType = 'r';
        // lockType*db*T001*200a|options
        // options se zatim nepouziva
        var sCmd = sLockType + '*' + oRec.lname + '*' + oRec.t001 + '*';
        this.csUnlockRecord0(oRec.lname, sCmd);
    },
    /**
     *  Vlastni odemknuti zaznamu.
     *
     *  @param {i3.Marc} oRec - MARC zaznam zaznamu ve formulari
     *
     *  25.06.10 on;
     */
    csUnlockRecord0: function(psTbl, psParams) {
        // v CHANGE_LOGu je mozne zamykani vypnout
        var sChangeLog = i3.WS.sTablesdCacheGet('CHANGE_LOG');
        if (sChangeLog && (sChangeLog.getTag('210g') === '1')) {
            return;
        }
        // zavola metodu na serveru
        i3.WS.command({
            db: psTbl,
            params: psParams,
            command: 'unlock',
            // o-je cely JSON s vysledkom
            success: function(o) {
                if (o && (o.ret_code === '0')) {
                    if (o.data[0] === 'OK') {
                        // odemknuti probehlo v poradku
                        return;
                    }
                    if (o.data[0].substring(0, 3) === 'ERR') {
                        // chyba pri odemknuti zaznamu
                        // stringovu hodnotu WS/SP vysledku rozkodujeme do vhodnej datovej struktury
                        var m = new i3.WS.Msg(o.data[0]);
                        i3.alert(m.userText);
                    }
                } else {
                    // Zamknuti zaznamu nebylo uspesne. Popis: %s/%s'
                    i3.alert(i3.fillInParams(i3.ui.DataTable.tx.txUnlockFailed, [o.ret_code, o.ret_msg]));
                }
            },
            scope: this
        });
    },
    /**
     * Timer, ktery bude v nekonecne smycce volat zmknuti aktualniho zaznamu.
     *
     * @class i3.ui.DataTable.csLockTimer
     */
    csLockTimer: function() {
        // pokud je zaznam jednou zamknuty, zustane zamknuty na furt
        if (this.csIsReadOnly()) {
            return;
        }
        var inst = this;
        // obnovi zamek
        if (this.csIsLockRecordAble(this.csLinRecord)) {
            this.csLockRecord(this.csLinRecord);
        }
        // zavola sama sebe na X sekund
        this.csTimer = setTimeout(function() {
            inst.csLockTimer();
        }, 600000);
        // pocka 10 minut
    },
    /**
     * Zmena hesla
     */
    csOnChangePassword: function() {
        i3.ui.csOpenDataWin({
            title: i3.ui.DataTable.tx.txChangePassword2,
            CsPanel: i3.ui.DataTable.ChangePasswordPnl,
            width: 300
        }, {
            idpref: this.idpref,
            csOnAfterOK: function(pLinRec) {
                var sOldPass = pLinRec.t100a;
                var sNewPass = pLinRec.t100b;
                // 02.06.20 on; zmena hashovani
                //sOldPass = Ext.util.base64.encode(Ext.util.MD5(sOldPass, true));
                //sNewPass = Ext.util.base64.encode(Ext.util.MD5(sNewPass, true));
                sOldPass = i3.WS.csHashPwSHA(sOldPass);
                sNewPass = i3.WS.csHashPwSHA(sNewPass);
                this.csOnChangePassword0(sOldPass, sNewPass);
            },
            csOnAfterOKScope: this,
            csOnNew: function() {
                this.csLinRecord = {};
            }
        });
    },
    /**
     * Zmena hesla
     */
    csOnChangePassword0: function(psOldPassMD5, psNewPassMD5) {
        // zatim takto natvrdo nazev db
        var sLName = i3.className2LName(this.csDbAuth);
        var sGroup = i3.WS.getCommandGroup('securitySet');
        var sTbl = i3.lName2className('CMD_' + i3.ictx.toUpperCase() + '_' + sGroup);
        i3.WS.commandURC({
            command: 'securitySet ' + sLName + ' . 3 ' + psNewPassMD5 + ' ' + psOldPassMD5,
            classn: sTbl,
            success: function(psResp) {
                // prelozi kod do srozumitelne podoby
                var m = new i3.WS.Msg(psResp);
                i3.alert(m.userText);
            },
            scope: this
        });
    },
    /**
     * Zmena/Nastaveni uzivatelskeho hesla v zaznamu 400w
     *
     * 03.03.17 on;
     */
    csChangeUserPassword: function(config) {
        i3.ui.csOpenDataWin({
            title: '<span class="icon-key" aria-hidden="true"></span> ' + i3.ui.DataTable.tx.txChangePassword2,
            CsPanel: i3.ui.DataTable.ChangePasswordPnl,
            width: 300
        }, {
            idpref: this.idpref,
            csOnAfterOK: function(pLinRec) {
                var sNewPass = pLinRec.t100b;
                sNewPass = Ext.util.base64.encode(Ext.util.MD5(sNewPass, true));
                // zavola callback s novym heslem
                if (config.csCallback) {
                    config.csCallback.call(config.csScope || this, sNewPass);
                }
            },
            csOnAfterOKScope: this,
            csOnNew: function() {
                this.csLinRecord = {};
            },
            // nezobrazi pole pro zadani aktualniho hesla
            csHideActualPassword: true
        });
    },
    /**
     * Zjisti, jestli byl zaznam zmenen. Vrati true, pokud zmenen byl.
     *
     */
    csIsRecordChanged: function() {
        this.csForm2Record();
        // porovna oba objekty
        if (!i3.c.equalObjects(this.csOrigLinRecord, this.csLinRecord)) {
            return true;
        }
        return false;
    },
    /**
     * Zobrazi predanou url v novem okne.
     *
     * @param {String} sURL
     */
    csShowURL: function(sURL) {
        // pokud je potreba nahradit v URL id pobocky
        if (sURL.find('%BRANCHID%')) {
            /*Katedra skladovania a spracovanie rastlinnĂ˝ch produktov
            http://arl4.library.sk/i2/i2.entry.cls?ictx=spu&ipac25=0&language=1&logout=1&src=spu_us_cat-45*/
            // pobocka
            var sValue = i3.WS.sXlate('IS_BRANCH', this.csBranch, 'k');
            sURL = sURL.strswap('%BRANCHID%', sValue);
        }
        // 22.09.17 on; username a sso
        // username
        if (sURL.find('%USERNAME%')) {
            sURL = sURL.strswap('%USERNAME%', encodeURIComponent(i3.WS.csSecurity.username));
        }
        // sso
        if (sURL.find('%ARLSSO%')) {
            sURL = sURL.strswap('%ARLSSO%', encodeURIComponent(i3.WS.csSecurity.arlsso));
        }
        window.open(sURL, sURL);
    },
    /**
     * odemkne editovany zaznam - pripadne lze predefinovat v podedene tride na uzavreni vsech zaznamu v zalozkach
     *
     * 01.11.13 on;
     */
    csUnlockRecords: function() {
        this.csUnlockRecord(this.csLinRecord);
    },
    /**
     * Vytvori kopii existujiciho zaznamu a nacte ho do editoru
     *
     * 17.02.23 on;
     */
    csOnCopy: function() {
        var t001 = this.csLinRecord.t001;
        if ((!i3.isUnEmptyString(t001)) || (t001 === 'new')) {
            i3.alert(i3.ui.DataTable.tx.txCantCopyNewRec);
            return;
        }
        Ext.Msg.show({
            title: i3.ui.DataTable.tx.txCopyRec,
            msg: i3.ui.DataTable.tx.txReallyCopy,
            buttons: i3.ui.YesNoCancel,
            fn: function(pButtonId) {
                if (pButtonId !== 'yes') {
                    return;
                }
                this.csOnCopy0();
            },
            icon: 'icon-question',
            scope: this
        });
    },
    csOnCopy0: function() {
        // ziskat zaznam v MARC formate
        var pOptions = {
            txOKText: i3.ui.DataTable.tx.txCopyCreated
        };
        var oRec = this.csGetMarc();
        // ulozit jako novy
        oRec.t001 = 'new';
        this.csOnSaveMarc(pOptions, oRec);
    }
    /*
     *  09.09.16 on; aktualizuje pocet zaznamu v kosiku
     *
     */
    /*csSetBasketTitle : function() {
     i3.ui.Basket.csBasketInfo(this.csDbCat || this.csMainPanel.csDbCat, {
     csOKCallback : this.csSetBasketTitle2,
     csOKCallbackScope : this
     });
     },
     csSetBasketTitle2 : function(psResult) {
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
     }*/
});
Ext.reg('cs_datatable_pnl', i3.ui.DataTable.Panel);
/**
 * @class i3.ui.DataTable.PUPanel
 * Doplnena verzia zakladneho DataTable panelu pre ucely pouzitia v jednoduchych popup oknach
 * Bez toolbaru (aspon zatial), s pridanymi tlacitkami naspodu (aspon zatial).
 * Pouziva sa na popup okienka, ktore maju editovat/vkladat zaznam, ale maju mat len
 * jednoduchu logiku.
 * Priklad je skratene vkladanie napr. geo autorit alebo korporacii.
 *
 * (PUPanel = PopUpPanel)
 *
 * @param {Object} config
 *     csOkCallback - callback, kt. bude zavolany s novo vytvorenym zaznamom po stlaceni OK
 *     osOkScope    - detto
 *     +vsetky platne pre i3.ui.DataTable.Panel
 *
 */
i3.ui.DataTable.PUPanel = Ext.extend(i3.ui.DataTable.Panel, {
    constructor: function(config) {
        config = config || {};
        Ext.applyIf(config, {
            csSkipToolbar: true,
            // 07.11.13 on; defaultne skryje i nektere polozky menu a seznam def. formularu
            csHideDfltFormList: true,
            csSkipChangePassMenu: true,
            csSkipLogoutMenu: true,
            csSkipAboutMenu: true,
            buttons: [{
                text: i3.ui.DataTable.tx.txOK,
                formBind: true,
                listeners: {
                    click: {
                        fn: function() {
                            // call save & forward of the returned record
                            this.csOnSave({
                                csCallback: config.csOkCallback,
                                csScope: config.csOkScope
                            });
                            // close windows (note: window will pre physicaly closed before the record is returned)
                            this.ownerCt.close();
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ui.DataTable.tx.txCancel,
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
        i3.ui.DataTable.PUPanel.superclass.constructor.call(this, config);
    },
    // v prvej faze akurat zrusime zdedenu metodu
    csOnClientValidation: function( /*form, bIsValid*/ ) {}
});
Ext.reg('cs_datatable_pupnl', i3.ui.DataTable.PUPanel);
/**
 * @class i3.ui.DataTable.HelpPanel
 * Panel pre napovedu k polickam formulara
 */
i3.ui.DataTable.HelpPanel = Ext.extend(Ext.form.FormPanel, {
    /**
     * Config options
     *   c
     *   idpref:            id prefix
     */
    constructor: function(config) {
        config = config || {};
        // makra na jednoduche prefixovanie id-ciek elementov
        var idpref = i3.getIdPrefFn(config.idpref);
        // store pre combobox - bude naplnene polom z config-u
        var st = new i3.WS.StoreST({
            csStatTableN: '',
            csDisplayID: 1
        });
        Ext.applyIf(config, { //
            frame: true,
            monitorValid: true,
            defaults: {
                labelSeparator: ''
            },
            //bodyStyle: 'padding: 5px 5px 5px 5px',
            deferredRender: false,
            tbar: [{
                xtype: 'cs_combo_st',
                fieldLabel: 'Pole',
                labelSeparator: '',
                name: 'form_field',
                //nameSpace: 'a',
                width: 300,
                id: idpref('cbFld'),
                displayField: 'text',
                valueField: 'id',
                mode: 'local',
                store: st // store - tu bude este prazdne (naplnime v metode csShowHelp v materskom okienku)
            }, {
                xtype: 'button',
                text: 'Otevřít',
                listeners: {
                    // pouzijeme onclick, nie handler, aby sme mohli posielat eventy
                    // dal by sa dat aj onChange event na combo, ale takto mi to pripadalo efektivnejsie
                    click: {
                        fn: function( /*event*/ ) {
                            // klik na zmenit
                            this.csFldChange();
                        },
                        scope: this
                    }
                }
            }, {
                xtype: 'button',
                text: 'Otevřít ext.',
                listeners: {
                    // pouzijeme onclick, nie handler, aby sme mohli posielat eventy
                    // dal by sa dat aj onChange event na combo, ale takto mi to pripadalo efektivnejsie
                    click: {
                        fn: function( /*event*/ ) {
                            // klik na zmenit
                            this.csFldChange(true);
                        },
                        scope: this
                    }
                }
            }],
            items: [{ // pole pre help a jeho editaciu
                xtype: 'textarea',
                name: 'elHelp',
                id: idpref('elHelp'),
                readonly: true, // toto zial moc nefunguje
                disabled: false, // edit box nechame vzdy povoleny viz pozn. u csSetupUpdateBtn()
                anchor: '-3 -3',
                width: 545,
                height: 300,
                hideLabel: true,
                nameSpace: 'a'
            }],
            csFldsStore: st
        });
        i3.ui.DataTable.HelpPanel.superclass.constructor.call(this, config);
    },
    /**
     * Inicializacia komponenty - v podstate len preverime pristupove prava a podla toho povolime
     * alebo zakazeme update
     */
    initComponent: function() {
        i3.WS.req({
            success: function(response /*, options*/ ) {
                this.csUpdateOK = false;
                // 16.04.13 on; osetreno padani Ext.util.JSON.decode
                //var o = Ext.util.JSON.decode(response.responseText);
                var o = i3.csJsonDecode(response.responseText);
                if (!o) {
                    return;
                }
                if (!i3.WS.checkRetFmtBasic(o)) {
                    i3.alert('rights check', 'error parsing data');
                    return;
                }
                if (o.ret_code === '0') {
                    this.csUpdateOK = true;
                    //i3.alert('update permited'); // nothing to do
                    return;
                }
                // OK prava nie su - zakazeme polia editacie
            },
            scope: this,
            // preverujeme "w" prava k XxxUnTablesd
            params: {
                method: 'rights',
                right: 'w',
                db: i3.WS.getDfltUnTablesd()
            }
        });
        i3.ui.DataTable.HelpPanel.superclass.initComponent.apply(this, arguments);
    },
    /**
     * Zmena hodnoty v comboboxe policok
     */
    csFldChange: function(pbExtHelp) {
        var c = this.getCmp('cbFld'),
            elHelp = this.getCmp('elHelp');
        if ((!c) || (!elHelp)) {
            return;
        }
        var sFld = c.getValue();
        if (pbExtHelp) {
            this.csShowExtHelp(sFld);
            return;
        }
        var sRecHelp = 'HELP_I3_' + this.csFmtPrefix + '_' + sFld.toUpperCase();
        var sClassN = i3.WS.getDfltUnTablesd();
        elHelp.setValue('');
        this.csLastRecord = null;
        // precitat zaznam helpu
        i3.WS.getRecord({
            classn: sClassN,
            t001: sRecHelp,
            success: function(sRecHelp) {
                // nastavit help do formulara
                var s = sRecHelp.getTag('200a');
                s = s.strswap('\\n', '\n');
                elHelp.setValue(s);
                this.csLastRecord = sRecHelp;
                this.csSetupUpdateBtn();
            },
            failure: function( /*sMsg*/ ) {
                this.csLastRecord = new i3.Marc({
                    classn: i3.WS.getDfltUnTablesd(),
                    t001: '!' + sRecHelp
                });
                this.csSetupUpdateBtn();
            },
            scope: this
        });
    },
    /**
     * Povolit/zakazat update tlacitka
     */
    csSetupUpdateBtn: function() {
        // kod ktory robi disable/enable tlacitka podla moznosti editacie
        // pri disable je ale text sedy a mene citatelny; takze nechame tx vzdy editvatelny
        // budeme zakazovat len update tlacitko (+prava su samozrejme vynutene na serveri)
        var c;
        // = this.getCmp('elHelp');
        //c.setDisabled(!this.csUpdateOK);
        c = this.getCmp('pbUpdate');
        c.setDisabled(!this.csUpdateOK);
    },
    csFldUpdate: function() {
        var elHelp = this.getCmp('elHelp');
        var oRec = this.csLastRecord;
        if (!oRec) {
            i3.alert('nothing to update');
            return;
        }
        var s = elHelp.getValue();
        s = s.strswap('\n', '\\n');
        oRec.setTag('200    ' + i3.c.SF + 'a' + s);
        i3.WS.update({
            operation: 'update',
            success: function(pORecUpdt) {
                i3.alert(i3.ui.DataTable.tx.txUpdateOK);
                // 'Update OK.'
                this.csLastRecord = pORecUpdt;
            },
            scope: this
        }, oRec);
    },
    // OTVORI HELP
    // 14.04.05 rs; uprava rozmeru+focus
    // 28.02.05 jj; uprava rozmeru
    csShowExtHelp: function(psAnchor) {
        i3.Login.mainAppFireEvent('show_ext_help', psAnchor);
    }
});
Ext.reg('cs_datatable_helppnl', i3.ui.DataTable.HelpPanel);
/**
 * @class i3.ui.DataTable.HelpWin
 * @param {Object} config
 */
i3.ui.DataTable.HelpWin = Ext.extend(Ext.Window, {
    constructor: function(config) {
        config = config || {};
        var idpref = i3.getIdPrefFn(config.idpref);
        var panel = new i3.ui.DataTable.HelpPanel({
            idpref: config.idpref
        });
        Ext.apply(config, {
            id: 'helpwin', // ZATIAL predpokladame len jeden (07.09.09 rs)
            //layout: 'border',
            title: i3.tx.txHelp,
            width: 600,
            height: 400,
            minWidth: 600,
            minHeight: 300,
            closable: true,
            plain: true,
            resizable: true,
            modal: true, //
            closeAction: 'close',
            items: [panel],
            buttons: [{
                xtype: 'button',
                text: i3.ui.DataTable.tx.txUpdate, // 'Update'
                disabled: true,
                id: idpref('pbUpdate'),
                listeners: {
                    // pouzijeme onclick, nie handler, aby sme mohli posielat eventy
                    click: {
                        fn: function( /*event*/ ) {
                            panel.csFldUpdate();
                        },
                        scope: this
                    }
                }
            }],
            csPanel: panel
        });
        i3.ui.DataTable.HelpWin.superclass.constructor.call(this, config);
    },
    /**
     *
     * @param {Object} pParams
     */
    csShowHelp: function(pParams) {
        var flds = pParams.flds;
        var st = this.csPanel.csFldsStore;
        var addDT = [];
        Ext.each(flds, function(pFld) {
            addDT.push(new st.Record(pFld));
        });
        st.removeAll();
        // cleanup old data
        st.add(addDT);
        // a napln ho datami zo zdroja
        this.csPanel.csFmtPrefix = pParams.fmtPrefix;
        // prefix formatu
        this.show();
        // najst combobox so zoznamom poli
        // je zname posledne aktivne pole?
        var c = this.getCmp('cbFld');
        if (pParams.csCurrentFld && c) {
            // pokusit sa nasavit combo na hodnotu posledne aktivneho pola
            c.setValue(pParams.csCurrentFld);
            // poslat request na update okna podla current field
            this.csPanel.csFldChange(false);
        }
    }
});
/**
 * @class i3.ui.DataTablePnl.Panel
 * podobny panel jako je i3.ui.DataTable.Panel, ale dedi z Ext.Panel
 *
 * vyuziva se ve formularovych aplikacicich s vice zalozkami - IE8 nedovole formpanel vnoreny v jinech formpanelu
 *
 */
i3.ui.DataTablePnl.Panel = Ext.extend(Ext.Panel, {
    /**
     * @param {Object} config options
     *
     * pamatetry jsous shodne s i3.ui.DataTable.Panel
     */
    constructor: function(config) {
        config = config || {};
        // makra na jednoduche prefixovanie id-ciek elementov
        var idpref = i3.getIdPrefFn(config.idpref);
        if (!config.csSkipToolbar) {
            // vytvorit niektore spolocne prvky (ulozia sa do config)
            // 03.04.09 rs; toto este mozno bude treba prehodnotit
            i3.ui.DataTable.baseComp.call(this, config);
            // 21.05.14 on; vytvoreni toolbaru vlozeno do funkce
            var toolBar = i3.ui.DataTable.csGetToolbar.call(this, config, idpref);
            Ext.applyIf(config, {
                tbar: toolBar
            });
        }
        // 21.05.14 on; vlozeno do metody
        var winTools = i3.ui.DataTable.csGetWintools.call(this, config);
        Ext.applyIf(config, { //
            //labelAlign: 'top',
            //layout: 'form',
            frame: true,
            //autoScroll: true,
            defaults: {
                labelSeparator: ''
            },
            bodyStyle: 'padding: 5px 5px 5px 5px',
            deferredRender: false,
            //autoHeight: true,
            xtype: 'form',
            items: config.csFormData,
            tools: winTools,
            csCanLockRecord: false // 13.10.10 on; defaulne nezamykat zaznamy
        });
        i3.ui.DataTablePnl.Panel.superclass.constructor.call(this, config);
    },
    /** Kliknutie na tlacitko Search alebo Browse
     *
     * callback csOnPreSearch umoznuje testne pred vyhladavanim upravit parametre vyvolania flexpopu
     *
     * pbSearch: podla 'i3.ui.FlexPop.usrDoSearch()'
     *   0 - scan
     *   1 - search
     *   2 - browse
     */
    csOnSearch: function(pbSearch) {
        // volam metodu z formpanelu
        i3.ui.DataTable.Panel.prototype.csOnSearch.call(this, pbSearch);
    },
    /**
     * Callback pred vyhladavanim - moze napr. upravit parametre flexpop pred spustenim aktualneho vyhladavania
     * Return:
     *   true  - search may continue
     *   false - abandon search
     *
     * @param {Object} pFlexPopParams
     */
    csOnPreSearch: function(pFlexPopParams) {
        // volam metodu z formpanelu
        return i3.ui.DataTable.Panel.prototype.csOnPreSearch.call(this, pFlexPopParams);
    },
    /**
     * Vymaz zaznamu
     */
    csOnDelete: function() {
        // mohl by tu byt nejaky default, ale zatim nevim jaky
        alert('csOnDelete not implemented');
    },
    /**
     * Akcia "novy zaznam". Nacitanie prazdneho zaznamu do formulara.
     */
    csOnNew: function() {
        // mohl by tu byt nejaky default, ale zatim nevim jaky
        alert('csOnNew not implemented');
    },
    /**
     * Zobrazi kosik.
     */
    csOnBasket: function() {
        // volam metodu z formpanelu
        i3.ui.DataTable.Panel.prototype.csOnBasket.call(this);
    },
    csGetMarc: function() {
        // mohl by tu byt nejaky default, ale zatim nevim jaky
        alert('csGetMarc not implemented');
    },
    csOnSave: function( /*pOptions*/ ) {
        // mohl by tu byt nejaky default, ale zatim nevim jaky
        alert('csOnSave not implemented');
    },
    csOnSaveMarc: function( /*pOptions, oRec*/ ) {
        // mohl by tu byt nejaky default, ale zatim nevim jaky
        alert('csOnSaveMarc not implemented');
    },
    csLoadMarcRec: function( /*oRec*/ ) {
        // mohl by tu byt nejaky default, ale zatim nevim jaky
        alert('csLoadMarcRec not implemented');
    },
    /**
     * Aktualizacia status resp. titulneho riadka.
     * Tu je prazdna, ale moze byt doplnena v potomkoch.
     */
    csSetupStatusLine: function() {
        // abstract
        alert('csSetupStatusLine not implemented');
    },
    /**
     * Zobrazenie pracovnych verzii zaznamu. Pre debug ucely.
     */
    onToolsGear: function() {
        // mohl by tu byt nejaky default, ale zatim nevim jaky
        alert('csOnClientValidation not implemented');
        this.csForm2Record();
    },
    /**
     * Zobrazenie helpu po kliku na ikonku otaznika v titulku okna
     *
     * 27.11.09 rs; pridana jednoducha deduplikacia poli
     */
    onToolsHelp: function() {
        // mohl by tu byt nejaky default, ale zatim nevim jaky
        alert('csOnClientValidation not implemented');
    },
    /**
     * Odhlasenie.
     * Je vytiahnute zvlast, aby ho bolo mozne prepisat v potomkoch
     */
    csOnLogout: function() {
        i3.ui.DataTable.Panel.prototype.csOnLogout.call(this);
    },
    /**
     * Vykonna cast
     */
    csOnLogout2: function() {
        i3.ui.DataTable.Panel.prototype.csOnLogout2.call(this);
    },
    /**
     * Zmena hesla
     */
    csOnChangePassword: function() {
        // volam metodu z formpanelu
        i3.ui.DataTable.Panel.prototype.csOnChangePassword.call(this);
    },
    /**
     * Zmena hesla
     */
    csOnChangePassword0: function(psOldPassMD5, psNewPassMD5) {
        // volam metodu z formpanelu
        i3.ui.DataTable.Panel.prototype.csOnChangePassword0.call(this, psOldPassMD5, psNewPassMD5);
    }
});
