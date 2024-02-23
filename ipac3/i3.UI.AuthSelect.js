/**
 Vyber autority do zaznamu.
 08.02.18 on; doplnen focus na pole termin
 08.02.18 on; moznost samostatne skryt tlaciko pro pridani fakturacnich udaju
 22.02.17 on; rozsireni o datum narozeni
 17.12.14 on; predani konfigu v csOnNewRecord
 21.12.11 on; moznost skryt tlacitko pro pridani fakturacnich udaju
 01.12.10 on; v csOnSelectRecord moznost vratit prazdny zaznam
 05.10.10 on; zmena metodiky
 03.04.09 rs; uprava formatovania + zrusenie tried i3.ui.cs*
 03.03.09 rs; doplnenie moznosti zadat defaultny formular pre nove autority C99$d
 30.01.09 rs; rozne drobne upravy v suvislosti s SCD
 */
/*global Ext,i3,alert */
Ext.ns('i3.ui.AuthSelect');
i3.ui.AuthSelect = {
    // id-cko globalneho okna (neprekladat!
    winid: 'authsel',
    txAddBillInfo: 'Pridať fakturačné údaje#Pridat fakturační údaje#Add billing information'.ls(),
    txCompany: 'Spoločnosť/korporácia#Spoločnost/korporace#The company/corporation'.ls(),
    txCreateNewRec: 'Vytvoriť nový záznam#Vytvorit nový záznam#Create a new record'.ls(),
    txErr1: 'Nie je vybraný index. Hľadanie nie je možné.#Není vybrán index. Hledání není možné.#No index selected - search not possible.'.ls(),
    txInfo1: 'Do políčka pre vstup údajov, zadajte slovo alebo začiatok slova z názvu hľadanej autority. Následne kliknite na "Vyhľadať", zobrazia sa nájdené záznamy. V zozname potom 2x kliknite na vyhovujúci záznam - tento sa následne prenesie do formulára.#Do políčka pro vstup údajů, zadejte slovo nebo začátek slova z názvu hledané autority. Následně klikněte na "Vyhledat", zobrazí se nalezené záznamy. V seznamu pak 2x klikněte na vyhovující záznam - tento se následně přenese do formuláře.#Do políčka pre vstup údajov, zadajte slovo alebo začiatok slova z názvu hľadanej autority. Následne kliknite na "Vyhľadať", zobrazia sa nájdené záznamy. V zozname potom 2x kliknite na vyhovujúci záznam - tento sa následne prenesie do formulára.'.ls(),
    txInfo2: 'Vyplňte všetky povinné polia a následne kliknite na tlačítko "Vytvoriť nový záznam". V niektorých prípadoch môžete vybrať, či chcete založiť záznam fyzickej osoby alebo spoločnosti (korporácie).#Vyplňte všechna povinná pole a následně klikněte na tlačítko "Vytvořit nový záznam". V některých případech můžete vybrat, zda chcete založit záznam fyzické osoby nebo společnosti (korporace).#Vyplňte všetky povinné polia a následne kliknite na tlačítko "Vytvoriť nový záznam". V niektorých prípadoch môžete vybrať, či chcete založiť záznam fyzickej osoby alebo spoločnosti (korporácie).'.ls(),
    txNaturalPerson: 'Fyzická osoba#Fyzická osoba#Natural person'.ls(),
    txNotSelectedRec: 'Nie je vybraný žiadny záznam#Není vybraný žádný záznam#Not selected record'.ls(),
    txSearchResults: 'Výsledky vyhľadávania#Výsledky vyhledávání#Search results'.ls(),
    txSearchTerm: 'Hľadaný výraz:#Hledaný výraz:#Search term:'.ls(),
    txSelectRecFromDB: 'Výber záznamu z databázy#Výběr záznamu z databáze#Selecting record from database'.ls(),
    txBirthday: 'Dátum narodenia:#Datum narození:#Birthday:'.ls(),
    txBirthdayEmpty: 'Dátum narodenia nemôže byť prázdny.#Datum narození nemůže být prázdný.#Birthday could not be epmty.'.ls()
};
// search grid
//
i3.ui.AuthSelect.PanelGSearch = function(config) {
    config = config || {};
    var idpref = i3.getIdPrefFn(config.idpref);
    //getCmp = i3.getCmpFn(config.idpref);
    // idpref makra
    Ext.applyIf(config, {
        store: new i3.WS.StoreSearch({
            autoLoad: false,
            csShowInfo0Rec: true
        }),
        columns: [{
            id: idpref('record'),
            header: i3.tx.txRecord, // Record
            width: 500,
            sortable: true,
            dataIndex: 'data',
            resizeable: true
        }, {
            id: idpref('t001'),
            header: 'ID',
            width: 60,
            sortable: true,
            dataIndex: 't001',
            fixed: false,
            resizeable: true
        }],
        stripeRows: true,
        autoExpandColumn: idpref('record'),
        height: 230,
        width: 570,
        border: false, //,tbar:[ {
        //        xtype:      'checkbox',
        //        id:idpref('cbSearchTrunc'),
        //        checked:true
        //       },  ]
        listeners: {
            // 29.09.10 on; zmena na double click
            //rowclick: {
            rowdblclick: {
                fn: function( /*grid, rowIndex, event*/ ) {
                    // 29.09.10 on; presunute do metody
                    /*var rec = grid.getSelectionModel().getSelected();

                     // okno dialogu
                     var w = this.csGetParentWin();

                     // vratit zaznam
                     w.csReturnRecord(rec.data);*/
                    var w = this.csGetParentWin();
                    w.csOnSelectRecord();
                },
                scope: this,
                buffer: 100
            }
        }
    });
    i3.ui.AuthSelect.PanelGSearch.superclass.constructor.call(this, config);
};
Ext.extend(i3.ui.AuthSelect.PanelGSearch, Ext.grid.GridPanel, {
    // vrati hlavny panel
    csGetParentWin: function() {
        var w = this.findParentByType(i3.ui.AuthSelect.Win);
        i3.assert(w);
        return w;
    }
});
/**
 Okno pre vyber autorit.

 config options: tu nie su ziadne, len zakladne. Viz. pmetodu csSetupAndShow().
 idpref:     id prefix of the window
 */
i3.ui.AuthSelect.Win = function(config) {
    config = config || {};
    // makra na jednoduche prefixovanie id-ciek elementov
    var idpref = i3.getIdPrefFn(config.idpref);
    //getCmp = i3.getCmpFn(config.idpref);
    var panelSearch = new i3.ui.AuthSelect.PanelGSearch({
            title: i3.ui.AuthSelect.txSearchResults, // "Search results"
            idpref: config.idpref,
            csTxInfo0Rec: config.csTxInfo0Rec
        }),
        // toolbar
        toolBar = [new Ext.Toolbar.TextItem(i3.ui.AuthSelect.txSearchTerm), // 'tbtext'
            {
                xtype: 'textfield',
                id: idpref('term'),
                listeners: { // 21.01.10 on; doplnena reakce na enter
                    specialkey: function(field, el) {
                        // 17.12.14 on; reakce na enter
                        if (el.getKey() === Ext.EventObject.ENTER) {
                            this.csOnSearch();
                        }
                    },
                    scope: this
                }
            },
            // 22.02.17 on; zadani datumu narozeni - datumove pole
            {
                xtype: 'tbtext',
                text: i3.ui.AuthSelect.txBirthday,
                id: idpref('birthdatetext'),
                hidden: true
            }, {
                xtype: 'cs_datefield',
                //fieldLabel: 'Dátum narodenia (formát RRRRMMDD)',
                id: idpref('birthdate'),
                hidden: true,
                listeners: { // 21.01.10 on; doplnena reakce na enter
                    specialkey: function(field, el) {
                        // 17.12.14 on; reakce na enter
                        if (el.getKey() === Ext.EventObject.ENTER) {
                            this.csOnSearch();
                        }
                    },
                    scope: this
                }
            }, ' ', {
                xtype: 'tbbutton',
                text: i3.tx.txSearch, // Search
                id: idpref('pbSearch'),
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
                xtype: 'tbseparator'
            }, ' ', ' ', {
                xtype: 'radio',
                boxLabel: i3.ui.AuthSelect.txNaturalPerson,
                name: 'authtype',
                inputValue: '0',
                id: idpref('rbAuthtype0'),
                listeners: {
                    check: {
                        fn: function() {
                            // 22.02.17 on; osetri zatim pouze pole datum narozeni
                            this.csSetupFields();
                        },
                        scope: this
                    }
                }
            }, ' ', ' ', ' ', ' ', {
                xtype: 'radio',
                boxLabel: i3.ui.AuthSelect.txCompany,
                name: 'authtype',
                inputValue: '1',
                id: idpref('rbAuthtype1'),
                listeners: {
                    check: {
                        fn: function() {
                            // 22.02.17 on; osetri zatim pouze pole datum narozeni
                            this.csSetupFields();
                        },
                        scope: this
                    }
                }
            }
        ];
    Ext.apply(config, {
        id: i3.ui.AuthSelect.winid, // ZATIAL predpokladame len jeden
        layout: 'fit',
        title: i3.ui.AuthSelect.txSelectRecFromDB,
        width: 600,
        height: 380,
        minWidth: 500,
        minHeight: 250,
        closable: true,
        plain: true,
        resizable: true,
        modal: true,
        closeAction: 'hide',
        tbar: toolBar,
        items: panelSearch,
        csPanelSearch: panelSearch,
        buttons: [{
            xtype: 'button',
            text: i3.ui.AuthSelect.txCreateNewRec,
            id: idpref('pbNew'),
            listeners: {
                click: {
                    fn: function() {
                        this.csOnNewRecord();
                    },
                    scope: this
                }
            }
        }, {
            xtype: 'button',
            text: i3.ui.AuthSelect.txAddBillInfo,
            id: idpref('pbAddInvData'),
            listeners: {
                click: {
                    fn: function() {
                        this.csOnAddInvData();
                    },
                    scope: this
                }
            }
        }, {
            xtype: 'button',
            text: i3.tx.txHelp, // Help
            id: idpref('pbHelp'),
            listeners: {
                click: {
                    fn: function() {
                        var h = this.openParams.csHelp;
                        if (!h) {
                            h = i3.ui.AuthSelect.txInfo1;
                        }
                        i3.displayHelp(h);
                    },
                    scope: this
                }
            }
        }, {
            xtype: 'button',
            text: 'OK',
            id: idpref('pbOK'),
            listeners: {
                click: {
                    fn: function() {
                        this.csOnSelectRecord();
                    },
                    scope: this
                }
            }
        }, {
            xtype: 'button',
            text: i3.tx.txCancel, // Cancel
            id: idpref('pbCancel'),
            listeners: {
                click: {
                    fn: function() {
                        this.close();
                    },
                    scope: this
                }
            }
        }]
    });
    i3.ui.AuthSelect.Win.superclass.constructor.call(this, config);
};
Ext.extend(i3.ui.AuthSelect.Win, Ext.Window, {
    /**
     *  pParams:
     *       csHelp:     volitelny help text (ak saneuvedie, pouzije sa default)
     *       classn:     trieda autorit na ktorej spustame okno
     *                   neskor by mohlo byt pole so zoznamom tried
     *       displayFmt: nazov ZF pouzitelny pre WS search pre zoznam zaznamov
     *                   (I2_EXPORT)
     *       csAuthType: pole so zoznamom povolenych typov autorit
     *                   Priklad: ['0'] alebo ['1','0']
     *                   0 su osobne autority (UN_200)
     *                   1 su korporacie (UN_210)
     *                   prvy udaj sa potom berie ako default
     *
     *       cs969fForNewRec: ako budu v 969$f oznacene novo vytvorene zaznamy
     *
     *       csAttrAuth*:  atributy pre search, ak sa neuvedu, pouzije sa default
     *         csAttrAuth0:     { "1":2032, "5":0 }
     *         csAttrAuth1:     { "1":2033, "5":0 }
     *       csTxInfo0Rec:    warn. sprava pri 0 zaznamoch, nepovinna (ak sa neuvedie, bude
     *                        default. toto prebubla az k i3.WS.Store
     *       csDlftFormPrefix: prefix defaultneho formulara pre osobne autority (za text sa prida 200/210 podla typu autority)
     *       csDlftFormSufix:  sufix defaultneho formulara autority
     *       callback:        co bude volane po vybere zaznamu/resp. vytvoreni noveho
     *                        callback dostane ako prvy param handle vytvoreneho zaznamu
     *                        pozrite si priklad
     *       scope:           scope pre callback
     */
    csSetupAndShow: function(pParams) {
        var c;
        this.openParams = pParams;
        if (!pParams.csAuthType) {
            pParams.csAuthType = ['0', '1'];
        }
        // 08.02.18 on; rozsireno o csHideAddInvBtn
        // 21.12.11 on; moznost skryt tlacitko pro pridani fakturacnich udaju
        if (pParams.csHideInvData || pParams.csHideAddInvBtn) {
            c = this.getCmp('pbAddInvData');
            if (c) {
                c.setVisible(false);
            }
        }
        // 22.02.17 on; moznost zobrazit datum narozeni
        if (pParams.csShowBirthDate) {
            c = this.getCmp('birthdatetext');
            if (c) {
                c.setVisible(true);
            }
            c = this.getCmp('birthdate');
            if (c) {
                c.setVisible(true);
            }
        }
        // 22.02.17 on; moznost zmenit velikost okna
        if (pParams.csWidth && pParams.csHeight) {
            this.setSize(pParams.csWidth, pParams.csHeight);
        } else if (pParams.csWidth) {
            this.setWidth(pParams.csWidth);
        } else if (pParams.csHeight) {
            this.setHeight(pParams.csHeight);
        }
        // setvalue je mozne robit az po "show", pretoze az "show" vygeneruje komponenty do DOM
        this.show();
        // 08.02.18 on; doplnen focus na pole termin
        c = this.getCmp('term');
        if (c) {
            c.focus(true, 100);
        }
        // vhodne nastavit vyber typu autority
        var rb0 = this.getCmp('rbAuthtype0');
        // osobne autority
        var rb1 = this.getCmp('rbAuthtype1');
        // korporacie
        var t = pParams.csAuthType.join('');
        rb0.setDisabled(t.indexOf('0') === -1);
        rb1.setDisabled(t.indexOf('1') === -1);
        // typ autority, kt. je v poli prvy bude predvoleny
        var sDefaultAuthT = pParams.csAuthType[0];
        // nastavime radia do zelaneho stavu
        rb0.setValue(sDefaultAuthT);
        // kontrola, ci nacitane vysledky nie su nahodou ineho typu ako chceme mat
        // predvolbu - ak ano odmazat obsah (naopak ak su rovnakeho typu, nechajme
        // ich nacitane)
        if (this.csLastSearchAT && (this.csLastSearchAT !== sDefaultAuthT)) {
            // ak su nacitane vysledky z ineho typu autorit, ako je teraz predvoleny
            // vymazat obsah store
            this.csPanelSearch.store.removeAll();
        }
        var store = this.csPanelSearch.store;
        // trieda na ktorej sa bude vyhladavat
        store.baseParams.db = pParams.classn;
        store.baseParams.fmt = pParams.displayFmt;
        // ci uz parameter prisiel, alebo nie, forwardneme nizsie do store
        store.csTxInfo0Rec = pParams.csTxInfo0Rec;
    }, //
    /** Kliknutie na tlacitko Search. Vyvola search request
     */
    csOnSearch: function() {
        var c,
            oAttr,
            oAttParams,
            term = this.getCmp('term').getValue(), //bTrunc=1,
            rb0 = this.getCmp('rbAuthtype0'),
            sSelAuthType;
        // co je vybrane v radio-volbach
        sSelAuthType = rb0.getGroupValue();
        // 1: aup
        // 2: auc
        // prevziat predane cisla atributov alebo defaulty
        if (sSelAuthType === '1') {
            // korporacia
            oAttr = this.openParams.csAttrAuth1;
            oAttParams = oAttr || {
                "1": 2,
                "5": 1
            };
        } else {
            // osobna
            oAttr = this.openParams.csAttrAuth0;
            oAttParams = oAttr || {
                "1": 1,
                "5": 1
            };
            // 22.02.17 on; datum narozeni je povinne pro osoby (pokud je zobrazene)
            c = this.getCmp('birthdate');
            if (c && c.isVisible()) {
                if (i3.isEmptyString(c.getValue())) {
                    i3.alert(i3.ui.AuthSelect.txBirthdayEmpty);
                    return;
                }
                if (!i3.isEmptyString(term)) {
                    term += ' ';
                }
                // prida datum k terminu
                term += c.getValue();
            }
        }
        // ak neboli params
        if (!oAttParams["1"]) {
            i3.msg(i3.ui.AuthSelect.txErr1);
            return;
        }
        //if (bTrunc)  { oAttParams[5]=1; }
        if (term === '') {
            term = 'a';
        }
        var panelSearch = this.csPanelSearch;
        panelSearch.store.setSearchQuery(oAttParams, term);
        panelSearch.store.load();
        panelSearch.getSelectionModel().selectFirstRow();
        // odpamatat typ autority posledneho search
        this.csLastSearchAT = sSelAuthType;
    },
    // klik na tlacitko novy zaznam
    // vyvola dialog pre zadanie noveho zaznamu a nastavi call back na odovzdanie vrateneho zaznamu
    csOnNewRecord: function() {
        // co je vybrane v radio-volbach
        var rb0 = this.getCmp('rbAuthtype0'),
            sSelAuthType = rb0.getGroupValue();
        var x = new i3.ui.NewAuth.Win(this.openParams.csConfig);
        x.csSetupAndShow({
            classn: this.openParams.classn,
            csAuthType: this.openParams.csAuthType,
            csAuthTypeSel: sSelAuthType,
            displayFmt: this.openParams.displayFmt,
            cs969fForNewRec: this.openParams.cs969fForNewRec,
            csHelp: i3.ui.AuthSelect.txInfo2,
            callback: this.csReturnRecord,
            csDlftFormPrefix: this.openParams.csDlftFormPrefix,
            csDlftFormSufix: this.openParams.csDlftFormSufix,
            csHideInvData: this.openParams.csHideInvData, // 21.12.11 on; predani parametru
            scope: this
        });
    },
    // 29.09.10 on; klik na tlacitko vyvola dialog pre pridani fakturacnich udaju
    csOnAddInvData: function() {
        // nacte zaznam aktualni zaznam
        var rec = this.csPanelSearch.getSelectionModel().getSelected();
        if (rec === undefined) {
            i3.alert(i3.ui.AuthSelect.txNotSelectedRec);
            return;
        }
        // nacte zaznam
        i3.WS.getRecord({
            classn: rec.data.classn,
            t001: rec.data.t001,
            fmt: '',
            failure: function(s) {
                alert(s);
            },
            success: function(pRec) {
                var x = new i3.ui.NewAuth.Win();
                //var sHeading = pRec.getTag('200');
                x.csSetupAndShowInv({
                    csAuthType: pRec.getTag('200') === '' ? ['1'] : ['0'],
                    classn: pRec.classn,
                    callback: this.csReturnRecord,
                    csRec: pRec,
                    scope: this,
                    displayFmt: this.openParams.displayFmt
                });
            },
            scope: this
        });
    },
    // pRec moze byt bud datovy riadok z gridu alebo MARC zaznam
    // kazdopadne z nemo mozeme pouzit classn a t001
    csReturnRecord: function(pRec) {
        // ma nastavenu callback funkciu?
        if (this.openParams.callback) {
            // schovat AuthSelect
            this.hide();
            // zavolane callback s uvedenim vybraneho zaznamu v prislusnom scope
            var scope = this.openParams.scope || this;
            this.openParams.callback.call(scope, pRec);
        }
    },
    // 29.09.10 on; klik na tlacitko nacte zaznam do formulare
    csOnSelectRecord: function() {
        // nacte zaznam aktualni zaznam
        var rec = this.csPanelSearch.getSelectionModel().getSelected();
        var rec1;
        if (rec === undefined) {
            // 01.12.10 on; nezobrazi se hlaska, ale vrati prazdny zaznam - slouzi k vymazu zaznamu z pole
            /*i3.alert(i3.ui.AuthSelect.txNotSelectedRec);
             return;*/
            rec1 = null;
        } else {
            rec1 = rec.data;
        }
        // vratit zaznam
        this.csReturnRecord(rec1);
    },
    // 22.02.17 on; osetri zatim pouze pole datum narozeni
    csSetupFields: function() {
        var c = this.getCmp('birthdatetext');
        if (c && c.isVisible()) {
            c.setDisabled(this.csIsCorp());
        }
        c = this.getCmp('birthdate');
        if (c && c.isVisible()) {
            c.setDisabled(this.csIsCorp());
            c.setValue('');
        }
    },
    /** 0/1 ci sme v rezime "korporacia"
     */
    csIsCorp: function() {
        var rb0 = this.getCmp('rbAuthtype0');
        // osobne autority
        var v = rb0.getGroupValue();
        return v !== '0';
        // korporacia?
    }
});
/**  Globalna funkcia na ziskanie objektu AuthSelect okna
 *  zatial vyzera, ze by mohlo stacit jedno pre celu app.
 *  Neskor sa moze pripadne upravit
 */
i3.ui.AuthSelect.getWin = function() {
    return i3.ui.getSingleWin(i3.ui.AuthSelect.winid, i3.ui.AuthSelect.Win);
};
