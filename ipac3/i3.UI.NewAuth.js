/**
 * Obrazovka pre zalozenie autoritneho zaznamu
 *
 * 24.04.18 on; zruseno omezeni adresy
 * 20.04.18 on; oprava nastaveni validace formulare
 * 01.02.16 on; narodnost
 * 07.01.15 on; kvuli NCD 2016 doplnena povinnost telefonu
 * 10.01.12 on; doplnena moznost zmenit povinnost poli
 * 04.12.12 on; kvuli NCD 2013 doplnena povinnost adresy a mailu
 * 28.11.12 on; zmeny kvuli NCD 2013
 * 02.03.12 on; zrusene *jslint laxbreak: true *
 * 21.12.11 on; moznost skryt fakturacni udaje
 * 08.10.10 on; odstranene generovani 980xX
 * 05.10.10 on; zmena metodiky
 * 03.04.09 rs; uprava formatovania + zrusenie tried i3.ui.cs*
 * 03.02.09 rs; generovanie C99$d
 * 30.01.09 rs; rozne drobne upravy v suvislosti s SCD
 *  29.01.09 rs; zmena v nastavovani 969f
 * ---
 */
/*global Ext,i3,alert */
Ext.ns('i3.ui.NewAuth');
// formular
//
i3.ui.NewAuth.Panel = function(config) {
    config = config || {};
    // makra na jednoduche prefixovanie id-ciek elementov
    var idpref = i3.getIdPrefFn(config.idpref);
    //var getCmp = i3.getCmpFn(config.idpref);  // 10.01.12 on; zruseno
    Ext.apply(config, {
        frame: true,
        autoScroll: true,
        labelAlign: 'left',
        bodyStyle: 'padding: 5px 5px 5px 5px',
        monitorValid: true, //,title: 'Vytvorenie nového záznamu'
        deferredRender: false,
        defaults: {
            labelSeparator: ' ',
            labelWidth: 120
        },
        autoHeight: true,
        items: [{
            xtype: 'fieldset',
            title: 'Identifikačné údaje',
            autoHeight: true, //,width:       470
            id: idpref('fldset_id'),
            items: [{
                    xtype: 'radio',
                    id: idpref('rbAuthtype0'),
                    fieldLabel: 'Fyzická osoba',
                    name: 'authtype',
                    inputValue: '0',
                    listeners: {
                        check: {
                            fn: function(cmp, checked) {
                                // 20.04.18 on; pouze pri oznaceni
                                if (checked) {
                                    this.csGetParentWin().csSetupFields();
                                }
                            },
                            scope: this
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Priezvisko (*)',
                    //width : 360,
                    anchor: '-5',
                    id: idpref('t200a'),
                    name: 'auth_t200a',
                    maxLength: 30,
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Meno  (*)',
                    //width : 360,
                    anchor: '-5',
                    id: idpref('t200b'),
                    name: 'auth_t200b',
                    maxLength: 30,
                    allowBlank: false
                },
                // 04.12.12 on; zmena na datum narozeni
                /*{
                 xtype : 'numberfield',
                 fieldLabel : 'Rok narodenia',
                 width : 360,
                 maxLength : 30,
                 minLength : 4,
                 minValue : 1900,
                 maxValue : 2013,
                 id : idpref('t200f'), // 24.09.10 on; zmena z 200d
                 name : 'auth_t200f'
                 },*/
                {
                    xtype: 'cs_datefield2',
                    // 10.01.12 on; moznost nastavit
                    fieldLabel: config.csFormDateOptional ? 'Dátum narodenia (formát RRRRMMDD)' : 'Dátum narodenia (*) (formát RRRRMMDD)',
                    width: 220,
                    id: idpref('t200f'), // 24.09.10 on; zmena z 200d
                    name: 'auth_t200f',
                    // 10.01.12 on; moznost nastavit
                    allowBlank: config.csFormDateOptional || false
                }, {
                    // 01.02.16 on; narodnost
                    xtype: 'cs_combo_st',
                    fieldLabel: 'Národnosť',
                    width: 220,
                    //anchor : '-5',
                    id: idpref('t102a'), // 24.09.10 on; zmena z 200d
                    name: 'auth_t102a',
                    csStatTableN: 'STABLE_UT_COUNTRIES'
                }, {
                    xtype: 'radio',
                    id: idpref('rbAuthtype1'),
                    fieldLabel: 'Spoločnosť (korporácia)',
                    name: 'authtype',
                    inputValue: '1',
                    // 20.04.18 on;
                    listeners: {
                        check: {
                            fn: function(cmp, checked) {
                                // pouze pri oznaceni
                                if (checked) {
                                    this.csGetParentWin().csSetupFields();
                                }
                            },
                            scope: this
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Názov  (*)',
                    //width : 360,
                    anchor: '-5',
                    maxLength: 150,
                    id: idpref('t210a'),
                    name: 'auth_t210a',
                    allowBlank: false
                }, {
                    xtype: 'label',
                    text: 'Názov je možné vyplniť len pre záznamy spoločností.'
                }
            ]
        }, {
            xtype: 'fieldset',
            title: 'Kontaktné údaje',
            autoHeight: true, //,width:       400
            id: idpref('fldset_kontakt'),
            items: [{
                    xtype: 'textfield',
                    // 10.01.12 on; moznost nastavit
                    fieldLabel: config.csFormAddressOptional ? 'Adresa' : 'Adresa (*)',
                    //width : 360,
                    anchor: '-5',
                    // 24.04.18 on; zruseno omezeni adresy
                    //maxLength : 30,
                    id: idpref('t980a'), // 24.09.10 on; zmena z C01b
                    name: 'auth_980a',
                    // 10.01.12 on; moznost nastavit
                    allowBlank: config.csFormAddressOptional || false
                }, {
                    xtype: 'textfield',
                    // 10.01.12 on; moznost nastavit
                    fieldLabel: config.csFormCityOptional ? 'Mesto' : 'Mesto (*)',
                    maxLength: 30,
                    //width : 360,
                    anchor: '-5',
                    id: idpref('t980b'), // 24.09.10 on; zmena z C01c
                    name: 'auth_980b',
                    // 10.01.12 on; moznost nastavit
                    allowBlank: config.csFormCityOptional || false
                }, {
                    xtype: 'textfield',
                    // 10.01.12 on; moznost nastavit
                    fieldLabel: config.csFormPSCOptional ? 'PSČ' : 'PSČ (*)',
                    maxLength: 8,
                    // pozor nesmie byt number field pretoze by neslo zapisat cislo v tvare 0xxxxx
                    // aplikacia v poli number field totiz filtruje uvodne nuly
                    minLength: 4,
                    //width : 360,
                    anchor: '-5',
                    id: idpref('t980d'), // 24.09.10 on; zmena z C01n
                    name: 'auth_980d',
                    // 10.01.12 on; moznost nastavit
                    allowBlank: config.csFormPSCOptional || false
                },
                // 28.11.12 on; zrusena krajina (NCD 2013)
                /*{
                 xtype : 'textfield', // 24.09.10 on; doplnene
                 fieldLabel : 'Krajina',
                 maxLength : 30,
                 width : 360,
                 id : idpref('t980e'),
                 name : 'auth_980e'
                 },*/
                {
                    xtype: 'textfield',
                    fieldLabel: config.csFormTelefonOptional ? 'Telefón' : 'Telefón (*)', // 07.01.15 on; povinne (NCD)
                    maxLength: 30,
                    //width : 360,
                    anchor: '-5',
                    id: idpref('t981c'), // 24.09.10 on; zmena z C01d
                    name: 'auth_981c',
                    allowBlank: config.csFormTelefonOptional || false // 07.01.15 on; povinne (NCD)
                }, {
                    xtype: 'textfield',
                    // 10.01.12 on; moznost nastavit
                    fieldLabel: config.csFormMailOptional ? 'Email' : 'Email (*)',
                    maxLength: 30,
                    //width : 360,
                    anchor: '-5',
                    id: idpref('t981e'), // 24.09.10 on; zmena z C01f
                    name: 'auth_981e',
                    vtype: 'email',
                    // 10.01.12 on; moznost nastavit
                    allowBlank: config.csFormMailOptional || false
                } // 24.09.10 on; fax zruseny
                /* {
                xtype: 'textfield',
                fieldLabel: 'Fax',
                maxLength: 30,
                width: 360,
                id: idpref('tC01e'),
                name: 'auth_C01e'
                }, */
                // 28.11.12 on; zrusene WWW (NCD 2013)
                // 24.09.10 on; doplnene www
                /*{
                xtype : 'textfield',
                fieldLabel : 'WWW',
                maxLength : 200,
                width : 360,
                id : idpref('t981f'),
                name : 'auth_981f'
                }*/
                // 24.09.10 on; zrusene
                /*{
                 xtype: 'textfield',
                 fieldLabel: 'Kontaktná osoba',
                 maxLength: 100,
                 width: 360,
                 id: idpref('t981a'),
                 name: 'auth_981a'
                 }, */
            ]
        }, {
            xtype: 'fieldset',
            title: 'Fakturačné údaje',
            autoHeight: true, //,width:       400
            id: idpref('fsInvData'),
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Adresa',
                //width : 360,
                anchor: '-5',
                // 24.04.18 on; zruseno omezeni adresy
                //maxLength : 30,
                id: idpref('t982b'),
                name: 'auth_982b'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Číslo účtu',
                //width : 360,
                anchor: '-5',
                maxLength: 30,
                id: idpref('t982c'),
                name: 'auth_982c'
            }, {
                xtype: 'textfield',
                fieldLabel: 'IČO',
                //width : 360,
                anchor: '-5',
                maxLength: 30,
                id: idpref('t982d'),
                name: 'auth_982d'
            }, {
                xtype: 'textfield',
                fieldLabel: 'DIČ',
                //width : 360,
                anchor: '-5',
                maxLength: 30,
                id: idpref('t982e'),
                name: 'auth_982e'
            }, {
                xtype: 'textfield',
                fieldLabel: 'IČ DPH',
                //width : 360,
                anchor: '-5',
                maxLength: 30,
                id: idpref('t982i'),
                name: 'auth_982i'
            }, {
                xtype: 'label',
                text: 'IČO, DIČ a IČ DPH je možné vyplniť len pre záznamy spoločností.'
            }]
        }],
        buttons: [{
                text: 'Vytvoriť nový záznam',
                formBind: true,
                id: idpref('app_newrec'),
                listeners: {
                    click: {
                        fn: function() {
                            var w = this.csGetParentWin();
                            // parent window
                            w.csSaveRecord();
                        },
                        scope: this
                    }
                }
            }, //
            // 28.11.12 on; pro NCD 2013
            {
                text: 'Zapísať',
                formBind: true,
                hidden: true,
                id: idpref('app_write'),
                listeners: {
                    click: {
                        fn: function() {
                            var w = this.csGetParentWin();
                            // parent window
                            w.csGetRecord();
                        },
                        scope: this
                    }
                }
            }, {
                text: 'Pridať',
                id: idpref('app_inv'),
                hidden: true,
                listeners: {
                    click: {
                        fn: function() {
                            var w = this.csGetParentWin();
                            // parent window
                            w.csSaveRecordInv();
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.tx.txHelp,
                formBind: false,
                id: idpref('app_help'),
                listeners: {
                    click: {
                        fn: function() {
                            var w = this.csGetParentWin();
                            // parent window
                            var h = w.openParams.csHelp || w.csHelp;
                            // aktualny help alebo window help
                            i3.displayHelp(h);
                        },
                        scope: this
                    }
                }
            }, {
                text: 'Zrušiť',
                listeners: {
                    click: {
                        fn: function() {
                            var w = this.csGetParentWin();
                            // parent window
                            w.close();
                        },
                        scope: this
                    }
                }
            }
        ]
    });
    i3.ui.NewAuth.Panel.superclass.constructor.call(this, config);
};
Ext.extend(i3.ui.NewAuth.Panel, Ext.form.FormPanel, {
    csGetParentWin: function() {
        return this.findParentByType(i3.ui.NewAuth.Win);
    }
});
// config options
//   csHelp - text napovedy
//            text je mozne urcit aj pri volani csSetupAndShow() - ten ma potom prednost
//   idpref - id prefix (normalne nie je potreba menit)
//
i3.ui.NewAuth.Win = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        idpref: 'nauth', // nastavit idpref hlavnemu oknu (pouzijeme udaj z configu alebo default
        csHelp: 'Vyplňte všetky povinné polia a následne kliknite na tlačítko "Vytvoriť nový záznam".'
    });
    // 10.01.12 on; zrusene - bude se predavat primo config
    /*var panelCfg = {
     idpref : config.idpref
     //,csParentWin: this      // ukazovatko na materske okno (pre pristup z podriadeneho panelu)
     //,csHelp:config.csHelp
     };*/
    Ext.apply(config, {
        id: config.idpref,
        layout: 'fit',
        //height:       570,
        title: 'Vytvorenie nového záznamu',
        width: 530, // 21.12.11 on; 520->530
        //headerAsText: false,
        bodyBorder: false,
        border: false,
        closeAction: 'close',
        closable: true,
        modal: true,
        plain: true,
        // 10.01.12 on; panelCfg -> config
        items: [new i3.ui.NewAuth.Panel(config)],
        buttons: [],
        listeners: {
            close: {
                fn: function() {}
            }
        }
    });
    i3.ui.NewAuth.Win.superclass.constructor.call(this, config);
};
Ext.extend(i3.ui.NewAuth.Win, Ext.Window, {
    /**
     * Inicializacia dialogu
     * config options:
     *  csAuthType:       viz. i3.ui.AuthSelect.Win.usrDoSearch()
     *  csAuthTypeSel:    nepovinny prameter, kt. urcuje, ktory typ autority ma byt predvoleny
     *                    ak sa nepouzije, predvoleny bude prvy prvok z pola csAuthType
     *  classn:           trieda databazy autorit, kde budeme vytvarat zaznamy
     *  callback:         funkcia, ktora bude volana po ulozeni zaznamu
     *                    parametrom bude vytvoreny zaznam
     *  scope:            callback scope
     *  displayFmt:       ak je zadany ZF - vrateny zaznam bude predany ako vysledok zadaneho ZF
     *                    v pripade prazdneho ZF bude zaznam vrateny v MARC formate
     *  csDlftFormPrefix: prefix defaultneho formulara pre autority (za text sa prida 200/210 podla typu autority)
     *  csDlftFormSufix:  sufix defaultneho formulara pre autority
     */
    csSetupAndShow: function(pParams) {
        var c;
        this.openParams = pParams;
        if (!pParams.csAuthType) {
            pParams.csAuthType = ['0', '1'];
        }
        // 21.12.11 on; moznost skryt fieldset fakturacni udaje
        if (pParams.csHideInvData) {
            c = this.getCmp('fsInvData');
            if (c) {
                c.setVisible(false);
            }
        }
        // 28.11.12 on; moznost zmenit text tlacitka Newrec
        if (pParams.csGetRecOnly) {
            c = this.getCmp('app_newrec');
            c.setVisible(false);
            c = this.getCmp('app_write');
            c.setVisible(true);
            // skryje tlacitko help
            c = this.getCmp('app_help');
            c.setVisible(false);
        }
        // 28.11.12 on; moznost zmenit titulek formulare
        if (pParams.csFormTitle) {
            this.setTitle(pParams.csFormTitle);
        }
        // 28.11.12 on; vstupni data
        if (pParams.csInputData) {
            this.csPopulate(pParams.csInputData);
        }
        // setvalue je mozne robit az po "show", pretoze az "show" vygeneruje komponenty do DOM
        this.show();
        // vhodne nastavit vyber typu autority
        var rb0 = this.getCmp('rbAuthtype0');
        // osobne autority
        var rb1 = this.getCmp('rbAuthtype1');
        // korporacie
        var t = pParams.csAuthType.join('');
        rb0.setDisabled(t.indexOf('0') === -1);
        rb1.setDisabled(t.indexOf('1') === -1);
        // 28.11.12 on; moznost predvoleni typu podle vstupnich dat
        // pokial nie je explicitne urceny, ktory typ autority ma byt predvoleny
        // zoberie sa prvy prvok pola
        if (this.csGetAuthType(pParams.csInputData) !== '') {
            rb0.setValue(this.csGetAuthType(pParams.csInputData));
        } else {
            if (!pParams.csAuthTypeSel) {
                pParams.csAuthTypeSel = pParams.csAuthType[0];
            }
            rb0.setValue(pParams.csAuthTypeSel);
        }
        this.csSetupFields();
    },
    /**
     * Inicializacia dialogu pro pridani fakturacnich udaju
     * config options:
     *  csRec:            zaznam pri pridani fakturacnich udaju
     *  classn:
     *  callback:         funkcia, ktora bude volana po ulozeni zaznamu
     *                    parametrom bude vytvoreny zaznam
     *  displayFmt:       ak je zadany ZF - vrateny zaznam bude predany ako vysledok zadaneho ZF
     *                    v pripade prazdneho ZF bude zaznam vrateny v MARC formate
     *  scope:            callback scope
     */
    csSetupAndShowInv: function(pParams) {
        this.openParams = pParams;
        // setvalue je mozne robit az po "show", pretoze az "show" vygeneruje komponenty do DOM
        this.show();
        this.setTitle('Pridať fakturačné údaje');
        // vhodne nastavit vyber typu autority
        var rb0 = this.getCmp('rbAuthtype0');
        // osobne autority
        var rb1 = this.getCmp('rbAuthtype1');
        // korporacie
        var t = pParams.csAuthType.join('');
        rb0.setDisabled(t.indexOf('0') === -1);
        rb1.setDisabled(t.indexOf('1') === -1);
        // pokial nie je explicitne urceny, ktory typ autority ma byt predvoleny
        // zoberie sa prvy prvok pola
        if (!pParams.csAuthTypeSel) {
            pParams.csAuthTypeSel = pParams.csAuthType[0];
        }
        rb0.setValue(pParams.csAuthTypeSel);
        this.csSetupFields();
        var c = this.getCmp('app_newrec');
        // skryje tlacitko novy zaznam
        c.setVisible(false);
        c = this.getCmp('app_help');
        // skryje tlacitko help
        c.setVisible(false);
        c = this.getCmp('fldset_id');
        // skryje fieldset identifikacni udaje
        c.setVisible(false);
        c = this.getCmp('fldset_kontakt');
        // skryje fieldset kontaktni udaje
        c.setVisible(false);
        c = this.getCmp('app_inv');
        // zobrazi tlacitko pridat
        c.setVisible(true);
        this.syncSize();
    },
    /** 0/1 ci sme v rezime "korporacia"
     */
    csIsCorp: function() {
        var rb0 = this.getCmp('rbAuthtype0');
        // osobne autority
        var v = rb0.getGroupValue();
        return v !== '0';
        // korporacia?
    },
    csSetupFields: function() {
        var isCorp = this.csIsCorp(),
            f1,
            f2,
            f3,
            f4;
        f1 = this.getCmp('t200a');
        f1.setDisabled(isCorp);
        f2 = this.getCmp('t200b');
        f2.setDisabled(isCorp);
        f3 = this.getCmp('t200f');
        // 24.09.10 on; zmena z 200d
        f3.setDisabled(isCorp);
        f4 = this.getCmp('t102a');
        f4.setDisabled(isCorp);
        // zneplatnovane polia vymazeme, aby to neplietlo
        if (isCorp) {
            f1.setValue('');
            f2.setValue('');
            f3.setValue('');
            f4.setValue('');
        }
        f1 = this.getCmp('t210a');
        f1.setDisabled(!isCorp);
        // 24.09.10 on; kontaktni osoba zrusena
        /*f2 = this.getCmp('t981a');
        f2.setDisabled(!isCorp);*/
        // 24.09.10 on; pridane ICO, DIC, IC DPH
        f2 = this.getCmp('t982d');
        f2.setDisabled(!isCorp);
        f3 = this.getCmp('t982e');
        f3.setDisabled(!isCorp);
        f4 = this.getCmp('t982i');
        f4.setDisabled(!isCorp);
        if (!isCorp) {
            f1.setValue('');
            f2.setValue('');
            f3.setValue('');
            f4.setValue('');
        }
    }, //
    // 28.11.12 on; moznost zapisu do jineho podpole nez je nazev pole
    // shortcut macro na precitanie obsahu componenty pre danu tag a podpole
    csSaveRecordGetF: function(pTag, pSF, pSFn) {
        var cn = 't' + pTag + pSF,
            c = this.getCmp(cn);
        if (!c) {
            alert('component ' + cn + ' not found');
            return '';
        }
        var s1 = c.getValue();
        if (s1 === '') {
            return '';
        }
        if (pSFn && (pSFn !== '')) {
            return i3.c.SF + pSFn + s1;
        }
        return i3.c.SF + pSF + s1;
    },
    // 28.11.12 on; moznost predvyplnit pole
    csSetField: function(pTag, pSF, pValue) {
        var cn = 't' + pTag + pSF,
            c = this.getCmp(cn);
        if (!c) {
            alert('component ' + cn + ' not found');
            return;
        }
        c.setValue(pValue);
    },
    csSaveRecord: function() {
        var isCorp = this.csIsCorp(),
            s,
            s1,
            sAuthT = '200';
        if (isCorp) {
            sAuthT = '210';
            s = [sAuthT + ' 0  ' + this.csSaveRecordGetF(sAuthT, 'a')];
        } else {
            // 24.09.10 on; zmena na 200f
            s = [sAuthT + '  1 ' + this.csSaveRecordGetF(sAuthT, 'a') + this.csSaveRecordGetF(sAuthT, 'b') + this.csSaveRecordGetF(sAuthT, 'f')];
            // 01.02.16 on; doplnena narodnost
            s1 = this.csSaveRecordGetF('102', 'a');
            if (s1 !== '') {
                s.push('102    ' + s1);
            }
        }
        // 24.09.10 on; zmenene
        /*s1 = this.csSaveRecordGetF('C01', 'b') +
         this.csSaveRecordGetF('C01', 'n') +
         this.csSaveRecordGetF('C01', 'c') +
         this.csSaveRecordGetF('C01', 'f') +
         this.csSaveRecordGetF('C01', 'd') +
         this.csSaveRecordGetF('C01', 'e');
         if (s1 !== '') {
         s.push('C01    ' + s1);
         }*/
        s1 = this.csSaveRecordGetF('980', 'a') + // adresa
            this.csSaveRecordGetF('980', 'd') + // PSC
            this.csSaveRecordGetF('980', 'b');
        // mesto
        // 28.11.12 on; zrusena krajina (NCD 2013)
        //this.csSaveRecordGetF('980', 'e'); // krajina
        // 08.10.10 on; zrusene
        // 24.09.10 on; doplni 980xX
        //s1 = s1 + i3.c.SF + 'xX';
        if (s1 !== '') {
            s.push('980    ' + s1);
        }
        s1 = this.csSaveRecordGetF('981', 'e') + // email
            this.csSaveRecordGetF('981', 'c');
        // telefon
        // 28.11.12 on; zrusene WWW (NCD 2013)
        //this.csSaveRecordGetF('981', 'f'); // www
        //this.csSaveRecordGetF('C01', 'e');      // fax - zrusene
        if (s1 !== '') {
            s.push('981    ' + s1);
        }
        // 24.09.10 on; kontaktna osoba zrusena
        /*s1 = this.csSaveRecordGetF('981', 'a');
        if (s1 !== '') {
        s.push('981    ' + s1);
        }*/
        // 24.09.10 on; fakturacni udaje
        s1 = this.csSaveRecordGetF('982', 'b') + // adresa
            this.csSaveRecordGetF('982', 'c') + // ucet
            this.csSaveRecordGetF('982', 'd') + // ICO
            this.csSaveRecordGetF('982', 'e') + // DIC
            this.csSaveRecordGetF('982', 'i');
        // IC DPH
        if (s1 !== '') {
            s1 = s1 + i3.c.SF + 'xS';
            s.push('982    ' + s1);
        }
        s1 = '969    ' + i3.c.SF + 'f' + this.openParams.cs969fForNewRec;
        s.push(s1);
        s1 = '999    ' + i3.c.SF + 'e' + i3.className2LName(i3.Login.ctx.isUserClass) + '*' + i3.Login.ctx.isUserT001;
        s.push(s1);
        // defaultny formular, ak bol pozadovany + pridame prefix
        if ((this.openParams.csDlftFormPrefix) || (this.openParams.csDlftFormSufix)) {
            s1 = '';
            if (this.openParams.csDlftFormPrefix) {
                s1 = s1 + this.openParams.csDlftFormPrefix;
            }
            s1 = s1 + sAuthT;
            if (this.openParams.csDlftFormSufix) {
                s1 = s1 + this.openParams.csDlftFormSufix;
            }
            s1 = 'C99    ' + i3.c.SF + 'd' + s1;
            s.push(s1);
        }
        var marcRec = new i3.Marc({
            t001: 'new',
            classn: this.openParams.classn,
            data: s
        });
        i3.WS.update({
            operation: (marcRec.t001 === 'new') ? 'insert' : 'update',
            success: function(pRec) {
                i3.msg('Záznam bol uložený.');
                this.csReturnRecord(pRec);
            },
            scope: this,
            failure: function(msg) {
                Ext.Msg.alert('Chyba', msg);
            }
        }, marcRec);
    },
    // 29.09.10 on; prida fakturacni udaje
    csSaveRecordInv: function() {
        // fakturacni udaje
        var s1 = this.csSaveRecordGetF('982', 'b') + // adresa
            this.csSaveRecordGetF('982', 'c') + // ucet
            this.csSaveRecordGetF('982', 'd') + // ICO
            this.csSaveRecordGetF('982', 'e') + // DIC
            this.csSaveRecordGetF('982', 'i');
        // IC DPH
        if (s1 !== '') {
            s1 = s1 + i3.c.SF + 'xS';
            s1 = '982    ' + s1;
            this.openParams.csRec.appendTag(s1);
        } else {
            i3.alert('Neboly zadané žiadne údaje.');
            return;
        }
        i3.WS.update({
            operation: 'update',
            success: function(pRec) {
                i3.msg('Záznam bol uložený.');
                this.csReturnRecord(pRec);
            },
            scope: this,
            failure: function(msg) {
                Ext.Msg.alert('Chyba', msg);
            }
        }, this.openParams.csRec);
    },
    // pRec je novo vytvoreny MARC zaznam (vysledok insert operacie)
    //
    csReturnRecord: function(pRec) {
        // ma nastavenu callback funkciu?
        if (this.openParams.callback) {
            // zavolane callback s uvedenim vybraneho zaznamu v prislusnom scope
            var scope = this.openParams.scope || this,
                callback = this.openParams.callback;
            // uzavriet okno
            this.close();
            if (this.openParams.displayFmt) {
                // ak bolo zadany ZF - dame zaznam vyhladat v danom ZF a vratime ho vo formate ZF
                i3.WS.getRecord({
                    classn: pRec.classn,
                    t001: pRec.t001,
                    fmt: this.openParams.displayFmt,
                    success: function(pRec) {
                        callback.call(scope, pRec);
                    },
                    scope: this
                });
                return;
            }
            // ak nebol zadany ZF - vratime MARC zaznam
            callback.call(scope, pRec);
        }
    },
    /**
     * 28.11.12 on; pro NCD 2013
     */
    csGetRecord: function() {
        var isCorp = this.csIsCorp(),
            s,
            sAuthT;
        if (isCorp) {
            sAuthT = '210';
            s = ['U99' + '    ' + this.csSaveRecordGetF(sAuthT, 'a', 'd')];
        } else {
            sAuthT = '200';
            s = ['U99' + '    ' + this.csSaveRecordGetF(sAuthT, 'a') + this.csSaveRecordGetF(sAuthT, 'b') + this.csSaveRecordGetF(sAuthT, 'f', 'c')];
        }
        // adresa
        s += this.csSaveRecordGetF('980', 'a', 'e');
        // mesto
        s += this.csSaveRecordGetF('980', 'b', 'f');
        // PSC
        s += this.csSaveRecordGetF('980', 'd', 'g');
        // telefon
        s += this.csSaveRecordGetF('981', 'c', 'h');
        // email
        s += this.csSaveRecordGetF('981', 'e', 'i');
        // fakturacni udaje
        // adresa
        s += this.csSaveRecordGetF('982', 'b', 'j');
        // cislo uctu
        s += this.csSaveRecordGetF('982', 'c', 'k');
        // ICO
        s += this.csSaveRecordGetF('982', 'd', 'l');
        // DIC
        s += this.csSaveRecordGetF('982', 'e', 'm');
        // IC DPH
        s += this.csSaveRecordGetF('982', 'i', 'n');
        this.csReturnRecord(s);
    },
    /**
     * 28.11.12
     */
    csPopulate: function(psTag) {
        var s;
        s = i3.Marc.getSubTagStr(psTag, 'a');
        this.csSetField('200', 'a', s);
        s = i3.Marc.getSubTagStr(psTag, 'b');
        this.csSetField('200', 'b', s);
        s = i3.Marc.getSubTagStr(psTag, 'c');
        this.csSetField('200', 'f', s);
        s = i3.Marc.getSubTagStr(psTag, 'd');
        this.csSetField('210', 'a', s);
        s = i3.Marc.getSubTagStr(psTag, 'e');
        this.csSetField('980', 'a', s);
        s = i3.Marc.getSubTagStr(psTag, 'f');
        this.csSetField('980', 'b', s);
        s = i3.Marc.getSubTagStr(psTag, 'g');
        this.csSetField('980', 'd', s);
        s = i3.Marc.getSubTagStr(psTag, 'h');
        this.csSetField('981', 'c', s);
        s = i3.Marc.getSubTagStr(psTag, 'i');
        this.csSetField('981', 'e', s);
        s = i3.Marc.getSubTagStr(psTag, 'j');
        this.csSetField('982', 'b', s);
        s = i3.Marc.getSubTagStr(psTag, 'k');
        this.csSetField('982', 'c', s);
        s = i3.Marc.getSubTagStr(psTag, 'l');
        this.csSetField('982', 'd', s);
        s = i3.Marc.getSubTagStr(psTag, 'm');
        this.csSetField('982', 'e', s);
        s = i3.Marc.getSubTagStr(psTag, 'n');
        this.csSetField('982', 'i', s);
    },
    /**
     * Podle vstupnich dat zjist typ zaznamu
     */
    csGetAuthType: function(psTag) {
        if ((!psTag) || (psTag === '')) {
            return '';
        }
        if (i3.Marc.getSubTagStr(psTag, 'd') !== '') {
            return '1';
        }
        return '0';
    }
});
