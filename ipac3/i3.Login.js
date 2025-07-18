/*
* Login do aplikacie a suvislosti.
*
* 09.07.25 on; doplnena moznost vlozit do titulku login dialogu nazev aplikace
* 10.06.24 on; tlacitko pro prepinani jazyku (pro UMB)
* 25.08.20 on; moznost vynutit prihlaseni pres plain pw
* 21.10.19 on; doplneno csFixLocationHrefLogout
* 26.04.19 on; hesovani arl uctu
* 05.04.18 on; sha512
* 28.02.18 on; nastaveni pobocky do session
* 14.02.17 on; osetren pristup k localStorage
* 01.02.17 on; do logininfa doplnen link na autoritu
* 06.01.15 on; doplneno nastaveni isLoggedIn a localstorage, ze byl uzivatel porihlasen, csFixLocationHrefLogout
* 26.11.15 on; moznost zrusit login dialog a zobrazit pouze text
* 24.09.15 on; v logininfo doplnen carovy kod ctenare
* 27.08.15 on; csGetLoginInfo
* 28.05.15 on; csFixLocationHrefLogout
* 02.12.14 on; prihlaseni pro carovy kod
* 22.07.14 on; rozsireni csPostLogin
* 21.03.14 on; arabstina
* 19.12.13 on; remember me
* 15.11.13 on; hlaska pri zamnkutem uctu
* 06.11.13 on; csPreCallback
* 10.01.13 on; csExistsUserLoginOptions
* 19.09.13 on; ve slovenske verzi zmena "Nápoveda" na "Pomoc"
* 04.09.13 on; moznost omezit pristu uzivatelum v IsUser
* 30.08.13 on; uprava prihlaseni pres IsUser
* 16.04.13 on; osetreno padani Ext.util.JSON.decode - melo by se osetrit vsude
* 10.02.12 on; aktualizace parametru z CLIENT_CFG
* 15.11.11 jk; doplneny ceske verze textu
* 21.04.11 on; doplnene predani parametru pro viewport
* 20.01.11 on; doplnene parametry csForgottenPw a csWidth
* 29.01.10 on; prechod na extjs 3.1
* 21.01.10 on; opravena reakce na ENTER
* 18.01.10 on; osetrena velikost textfieldu
* 27.11.09 rs; focus login fieldu po zobrazeni okna
* 25.11.09 rs; doplnenie moznosti odoslania klavesou enter
* 02.10.09 rs; formalne upravy dokumentacia
* 23.09.09 rs; texty hlasok upravene
* 24.08.09 rs; dopracovana moznost otvorenia okna len pre ziskanie mena a hesla
* 04.06.09 rs; doplnenie zistenia username aj v pripade uz existujuceho prihlasenia
* 12.05.09 rs; doplnenie explicitne zarovnanie labelov v login dlg dolava
* 02.04.09 rs; formatovanie, plus funkcia mainApp()
* 03.02.09 rs; implementacia show_version a osetrenie logininfo pre login cez bezne username
* 28.01.09 rs; zmena sposobu zaverecnej likvidacie okna
* 23.01.09 rs; pridanie mainAppFireEvent
* 20.01.09 rs; uprava textu tlacitka registracia + preklad; drobne formalne upravy pre jslint
* 19.01.09 rs; synchronizacia zmien od js
* 16.01.09 rs; doplnenie deklaracie panelCfg
* 16.01.09 js; uprava prefixov config options pridanych 12.01
* 16.01.09 jt; drobne upravy - zmena nazvov premennych
* 15.01.09 rs; experimentalna verzia lokalizacie
* 12.01.09 jt; doplnene optiony pre prepojenie s registracnym dialogom
* 27.12.08 rs; doplnena moznost urcit nazov prava potrebneho pre login
/ 04.06.08 rs; osamostatnene do login.js
*
*/
/*global Ext,i3,alert,window,document,location, localStorage*/
/**
 * @class i3.Login
 * @singleton
 *
 * Login dialog s volitelnou moznostou registracie pouzivatela.
 * Zatial experimentalna verzia.<br>
 * Rozne aplikacie mozu pouzit ine required pravo pre login.
 * (aktualne: ine pre "is" a ine pre "admin").
 *
 */
i3.Login = { //
    // texty UI, ktore je treba prekladat
    txLogout: 'Odhlásenie#Odhlásení#Logout###الخروج'.ls(),
    txLogin: 'Prihlásenie#Přihlášení#Login###الدخول'.ls(),
    txLogoutReqSent: 'Požiadavka na odhlásenie bola odoslaná#Požadavek na odhlášení byl odeslán#Logout req. sent###تم إرسال طلب الخروج'.ls(),
    txLogoutMsg: 'Kliknete na odhlásenie ... a budete odhlásený.#Kliknete na odhlášení ... a budete odhlášeni.#You clicked on logout... and you will be logged out.###لقد نقرت على الخروج ... وسيتم إخراجك.'.ls(),
    txPleaseLogin: 'Prihláste sa#Přihlaste se#Please login###الرجاء الدخول'.ls(),
    txBadUserNamePw: 'Nesprávne meno užívateľa alebo heslo#Chybné uživatelské jméno nebo heslo#Bad username and/or password!###اسم المستخدم و/أو كلمة المرور غير صحيحة'.ls(),
    txNoRights2UseApp: 'Overenie mena a hesla prebehlo úspešne, ale vaše prístupové práva neumožňujú spustenie aplikácie#Ověření jména a hesla proběhlo úspěšně, ale vaše přístupové práva neumožňují spuštění aplikace#Login OK, but you have no rights to use this application!###الدخول صحيح، ولكن ليس لديك الصلاحية باستخدام هذا التطبيق.'.ls(),
    txLoginLockout: 'Uzamknutý účet!#Účet uzamčen!#Account lockout!###قفل الحساب!'.ls(),
    txLoginFailed: 'Prihlásenie neúspešné. Info: %s/%s#Přihlášení neúspěšné. Info: %s/%s#Login failed. Info: %s/%s###فشل الدخول. معلومات: %s/%s'.ls(),
    txUsername: 'Meno#Jméno#Username###اسم المستخدم'.ls(),
    txEmail: 'E-mail#E-mail#E-mail###البريد الإلكتروني'.ls(),
    txPassword: 'Heslo#Heslo#Password###كلمة المرور'.ls(),
    txNewRegistration: 'Nová registrácia#Nová registrace#New registration###تسجيل جديد'.ls(),
    txHelp: 'Pomoc#Nápověda#Help###مساعدة'.ls(),
    txForgottenPw: 'Zabudnuté heslo#Zapomenuté heslo#Forgotten Password###نسيت كلمة المرور'.ls(), // 20.01.11 on;
    txLoginBarcodeMail: 'Číslo preukazu/email#Číslo průkazu/e-mail#User card ID/e-mail'.ls(),
    // 10.06.24 on; texty pro prepinani jazyku UMB
    txSlovak: 'Slovak',
    txEnglish: 'English',
    /* Tu pokracuju rozne globalne funkcie tykajuce sa loginu a suvisiacich zalezitosti */
    /**
     * Odhlasenie z aplikacie.
     *
     * @param {Boolean} pbLogoutMsg T/F ci zobrazit hlasku o odhlaseni. - zrusene
     *
     */
    app_logout: function() {
        // 10.02.12 on; zrusene
        /*if(pbLogoutMsg) {
         i3.msg('Click', i3.Login.txLogoutMsg);
         }*/
        i3.WS.req({
            success: function( /*response, options*/ ) {
                //i3.alert(i3.Login.txLogout,i3.Login.txLogoutReqSent);
                // reload page (?nefunguje dobre)
                //window.location=window.location+'#';
            },
            // dummy request - logout simulation
            params: {
                method: 'version',
                username: '_logout',
                auth: '1,'
            }
        });
    },
    /**
     *  Vrati komponentu hlavneho okna.
     *  Podmienkou je architektura aplikacie taka, ze hlavne riadiace okno ma id rovne 'main'.<br><br>
     *
     *  02.04.09 rs
     */
    mainApp: function() {
        return Ext.getCmp('main');
    },
    /**
     *
     * Zaslanie spravy hlavnemu oknu aplikacie
     * musi sa dodrzat interna konvencia, ze id hlavneho okna je prave 'main'.<br>
     * Umiestenie funkcie do i3.Login asi nie je uplne stastne, este neskor prehodnotit.<br><br>
     *
     * 23.01.09 rs
     *
     * @param {Object} pMsgName
     * @param {Object} pPar1 pPar1,pPar2 su volitelne parametre (asi by sa dalo spravit tak, aby forwardol
     *  vsetky parametre, aktualne si nespominam ako sa to robi - asi vyuzit pole "arguments".
     * @param {Object} pPar2 Viz. pPar1.
     *
     */
    mainAppFireEvent: function(pMsgName, pPar1, pPar2) {
        var vp = this.mainApp();
        if (!vp) {
            alert('i3.Login.mainAppFireEvent: Component with id=main not found?!');
        }
        vp.fireEvent(pMsgName, pPar1, pPar2);
    },
    // 28.05.15 on; osetri URL pri odhlaseni (ponecha jen vyuzivane parametry psUsedParams a prida logout)
    csFixLocationHrefLogout: function(psUsedParams, pbDoNotAddLogout) {
        //location.replace(newURL);
        var i,
            sURL,
            fld,
            flds,
            sParams = '';
        sURL = location.href.piece('?', 1);
        flds = location.href.piece('?', 2).split('&');
        for (i = 0; i < flds.length; i++) {
            fld = flds[i];
            if (psUsedParams.fieldLocate('#', fld.piece('=', 1)) > 0) {
                if (sParams !== '') {
                    sParams += '&';
                }
                sParams += fld;
            }
        }
        // 06.01.16 on; pres parametr
        // nakonec prida logout=1
        if (!pbDoNotAddLogout) {
            if (sParams !== '') {
                sParams += '&';
            }
            sParams += 'logout=1';
        }
        // 21.10.19 on; poznamena odhlaseni do localstorage
        if (localStorage) {
            // zmena stavu na "0"
            localStorage.setItem("loginarl", '');
            localStorage.setItem("loginarl", '0');
        }
        location.href = sURL + '?' + sParams;
    }
};
/**
 * @private
 * login panel
 *
 * pViewPort je odkaz na construktor viewportu, ktory sa ma vytvorit po uspesnom logine
 *
 * config.csReqRight:   je volitelna option udavajuca pozadovane prava pre uspecny
 *                      login do aplikacie zadava sa ako objekt s dvojicou (name, value)
 *                      rozne aplikacie teda mozu mat rozne vstupne vyzadovane prist.pravo
 *                      default je 'SysClass' a pravo r
 *                      Rozne aplikacie mozu pouzit ine required pravo pre login
 *                      (aktualne: ine pre "is" a ine pre "admin")//
 * config.csIsUserAuth:   volitelna option, ktora urcuje ci ide o prihlasenie citatela
 * config.csOnlyEmailAuth: volitelna option, ktera povoli prihlaseni pouze pres email ctenare (NE pres carovy kod)
 * config.csLoginText: moznost zadat nazev pole pro Username
 *
 * config.csForgottenPw: volitena moznost zobrazit tlacitko s linkem do I2 na zmenu hesla
 *
 * config.csWidth:     muze volitelne obsahovat sirku login okna
 * config.csLabelWidth:  muze volitelne obsahovat sirku popisku
 *
 * 12.01.09 jt; doplneny option csIsUserAuth
 * 27.12.08 rs; doplnena moznost urcit nazov prava potrebneho pre login
 */
// 19.12.13 on; zmena na Panel, kvuli funkci "remember me"
//i3.Login.Panel = Ext.extend(Ext.FormPanel, {
i3.Login.Panel = Ext.extend(Ext.Panel, {
    constructor: function(config) {
        config = config || {};
        // 27.12.08 rs
        Ext.applyIf(config, {
            csReqRight: {
                name: 'SysClass',
                value: 'r'
            },
            csIsUserAuth: false
        });
        // 26.11.15 on; moznost zrusit login dialog a zobrazit pouze text
        if (!i3.isEmptyString(config.csShowOnlyText)) {
            Ext.apply(config, {
                //el : null,
                frame: true,
                //layout : 'form',
                //labelWidth : config.csLabelWidth || 80,
                html: config.csShowOnlyText
            });
        } else {
            var buttonList = [{
                text: i3.Login.txLogin,
                id: 'login_btn',
                // po preechodu na Panel nefunguje
                //formBind : true, // vazba povolenia pola na validaciu formulara
                listeners: {
                    click: {
                        fn: function() {
                            this.csLoginHandler();
                        },
                        scope: this
                    }
                }
            }];
            // ak ma byt sucastou link na registraciu
            if (config.csReg) {
                buttonList.push({
                    text: i3.Login.txNewRegistration,
                    listeners: {
                        click: {
                            fn: function() {
                                //thiswin.hide();
                                //config={};
                                var regWin = new i3.Reg.Win({}, this);
                                regWin.show();
                            },
                            scope: this
                        }
                    }
                });
            }
            // 20.01.11 on; tlacitko pro zmenu hesla
            if (config.csForgottenPw) {
                buttonList.push({
                    text: i3.Login.txForgottenPw,
                    listeners: {
                        click: {
                            fn: function() {
                                window.open(config.csForgottenPw, "i3window");
                                // link zobrazi v novem okne
                            },
                            scope: this
                        }
                    }
                });
            }
            if (config.csHelp) {
                buttonList.push({
                    text: i3.Login.txHelp,
                    listeners: {
                        click: {
                            fn: function() {
                                i3.alert(i3.Login.txHelp, config.csHelp);
                            },
                            scope: this
                        }
                    }
                });
            }
            // 10.06.24 on; tlacitko pro prepinani jazyku (pro UMB)
            if (config.csLanguageSwitcher) {
                buttonList.push({
                    text: (i3.language === '3') ? i3.Login.txSlovak : i3.Login.txEnglish,
                    iconCls: (i3.language === '3') ? "icon-flag-sk" : "icon-flag-gb",
                    listeners: {
                        click: {
                            fn: function() {
                                // zmeni jazyk a refreshne stranku
                                var i,
                                    sURL,
                                    fld,
                                    flds,
                                    sParams = '',
                                    bFound = false;
                                sURL = location.href.piece('?', 1);
                                flds = location.href.piece('?', 2).split('&');
                                for (i = 0; i < flds.length; i++) {
                                    fld = flds[i];
                                    if (fld.piece('=', 1) === 'language') {
                                        bFound = true;
                                        if (i3.language === '3') {
                                            fld = 'language=1';
                                        } else {
                                            fld = 'language=3';
                                        }
                                    }
                                    if (sParams !== '') {
                                        sParams += '&';
                                    }
                                    sParams += fld;
                                }
                                if (!bFound) {
                                    sParams += '&language=3';
                                }
                                location.href = sURL + '?' + sParams;
                            },
                            scope: this
                        }
                    }
                });
            }
            // 02.12.14 on; popis pole login_name
            var sLoginTitle;
            if (config.csLoginText) {
                sLoginTitle = config.csLoginText;
            } else {
                if (config.csIsUserAuth) {
                    // prihlaseni pres zaznam v IctxIsUser
                    if (config.csOnlyEmailAuth) {
                        // pouze pres email
                        sLoginTitle = i3.Login.txEmail;
                    } else {
                        // pres carovy kod nebo email
                        sLoginTitle = i3.Login.txLoginBarcodeMail;
                    }
                } else {
                    sLoginTitle = i3.Login.txUsername;
                }
            }
            Ext.apply(config, {
                // 19.12.13 on; remember me
                //id : 'login_form',
                el: document.getElementById('login_formx') ? 'login_formx' : null,
                layout: 'form',
                labelWidth: config.csLabelWidth || 80,
                frame: true,
                //title: sLoginTit,
                //width : 230,
                //padding: 200,     // 29.01.10 on; zruseno kvuli verzi 3.1
                defaultType: 'textfield',
                monitorValid: true,
                labelAlign: 'left', // default je totiz "top"
                defaults: {
                    labelSeparator: ' '
                },
                items: [{
                    // 02.12.14 on; dalsi varianty prihlasovani
                    //fieldLabel : config.csIsUserAuth ? i3.Login.txEmail : i3.Login.txUsername, // 30.08.13 on; popis Email pro prihlaseni pres IsUser
                    fieldLabel: sLoginTitle,
                    id: 'login_name',
                    allowBlank: false,
                    anchor: '-20',
                    // 02.12.14 on; moznost prihlasit pres email nebo barcode
                    //vtype : config.csIsUserAuth ? 'email' : '',
                    vtype: config.csOnlyEmailAuth ? 'email' : '',
                    // 19.12.13 on; remember me
                    el: document.getElementById('login_formx') ? 'login_namex' : null,
                    autoShow: true,
                    //name : 'username',   // asi neni potreba
                    enableKeyEvents: true, // 02.12.14 on; potrebuju odchytit zmenu pole
                    listeners: { // 21.01.10 on; doplnena reakce na enter
                        specialkey: function(field, el) {
                            // 19.12.13 on; prechod na Panel
                            //if ((el.getKey() === Ext.EventObject.ENTER) && (this.getForm().isValid())) {// odoslat len ak je form validny (t.j. tu vyplnene povinne polia)
                            if ((el.getKey() === Ext.EventObject.ENTER) && (this.csIsLoginFormValid())) { // odoslat len ak je form validny (t.j. tu vyplnene povinne polia)
                                this.csLoginHandler();
                            }
                        },
                        // 02.12.14 on; disablovani tlacitka pro Login
                        keyup: function() {
                            this.csCheckLoginBtn();
                        },
                        change: function() {
                            this.csLoginFormValidate();
                            this.csCheckLoginBtn();
                        },
                        focus: function() {
                            this.csCheckLoginBtn();
                        },
                        blur: function() {
                            this.csCheckLoginBtn();
                        },
                        scope: this
                    }
                }, {
                    fieldLabel: i3.Login.txPassword,
                    id: 'login_pwd',
                    inputType: 'password',
                    anchor: '-20',
                    allowBlank: false,
                    // 19.12.13 on; remember me
                    el: document.getElementById('login_pwdx') ? 'login_pwdx' : null,
                    autoShow: true,
                    //name : 'password', // asi neni potreba
                    enableKeyEvents: true, // 02.12.14 on; potrebuju odchytit zmenu pole
                    listeners: { // 21.01.10 on; doplnena reakce na enter
                        specialkey: function(field, el) {
                            // 19.12.13 on; prechod na Panel
                            //if ((el.getKey() === Ext.EventObject.ENTER) && (this.getForm().isValid())) {// odoslat len ak je form validny (t.j. tu vyplnene povinne polia)
                            if ((el.getKey() === Ext.EventObject.ENTER) && (this.csIsLoginFormValid())) { // odoslat len ak je form validny (t.j. tu vyplnene povinne polia)
                                this.csLoginHandler();
                            }
                        },
                        // 02.12.14 on; disablovani tlacitka pro Login
                        keyup: function() {
                            this.csCheckLoginBtn();
                        },
                        change: function() {
                            this.csLoginFormValidate();
                            this.csCheckLoginBtn();
                        },
                        focus: function() {
                            this.csCheckLoginBtn();
                        },
                        blur: function() {
                            this.csCheckLoginBtn();
                        },
                        scope: this
                    }
                }],
                buttons: buttonList,
                buttonAlign: 'center', // 29.01.10 on; zarovnani na stred
                listeners: {
                    // 02.12.14 on; osetreni tlacitka Login po startu aplikace
                    render: function() {
                        this.csCheckLoginBtn();
                    },
                    // 02.12.14 on; zatim zakomentovane
                    // 02.12.14 on; zvaliduje pole login a heslo - lepsi udalost nez afterlayout jsem nenasel
                    //afterlayout : function() {
                    //  this.csLoginFormValidate();
                    //  this.csCheckLoginBtn();
                    //},
                    scope: this
                }
            });
        }
        i3.Login.Panel.superclass.constructor.call(this, config);
    },
    /**
     * @private
     */
    csPostLogin: function() {
        var scope;
        // 28.02.18 on; po uspesnem prihlaseni provede nastaveni session parametru (zatim pouze pobocky)
        this.csSetSessionParams();
        if (this.CSViewPort) {
            // 10.02.12 on; aktualizace parametru z CLIENT_CFG
            if (this.csSetClientCfgParams) {
                i3.WS.getClientCfg({
                    params: this.csVPParams,
                    csSetClientCfgMethod: this.csSetClientCfgParams,
                    // 22.07.14 on; moznost nacist dalsi zaznam napr. WEBREP_CFG
                    csCfgRecordName: this.csCfgRecordName,
                    csCallback: function() {
                        // 21.04.11 on; doplnena moznost predat parametry
                        var params = this.csVPParams || {};
                        var vp = new this.CSViewPort({}, params);
                    },
                    csScope: this
                });
            } else {
                // 06.11.13 on; toto tu potrebuju pro interpi - pred vytvoreni viewportu zrusit existujici
                if (this.csPreCallback) {
                    scope = this.csPreScope || this;
                    this.csPreCallback.call(scope);
                }
                // 21.04.11 on; doplnena moznost predat parametry
                var params = this.csVPParams || {};
                var vp = new this.CSViewPort({}, params);
            }
        } else if (this.csCallback) {
            scope = this.csScope || this;
            this.csCallback.call(scope);
        } else {
            alert('login OK, but there is nothing to do afterwards?');
        }
        // len poistka (ak nastane je interna chyba)
    },
    /**
     * @private
     */
    csPostLoginX: function() {
        // 06.01.15 on; tady uz bych mel byt vzdy prihlaseny - poznacim si to
        if (!i3.Login.ctx) {
            i3.Login.ctx = {};
        }
        i3.Login.ctx.isLoggedIn = true;
        // 14.02.17 on; v MS Edge pristup k localStorage vyvola interni chybu, proto to aspon takto osetrim
        try {
            // 06.01.16 on; pokud je definovano ssoIctx (v csp souboru), nastavim hodnotu na 1 (jsem prihlasen)
            if (window.ssoIctx) {
                // pokud jeste neni '1'
                if (localStorage.getItem(window.ssoIctx) !== '1') {
                    localStorage.setItem(window.ssoIctx, '1');
                }
            }
        } catch (ignore) {
            //i3.displayError('error fetching localStorage: ' + e.message);
        }
        // 27.08.15 on; doplneno csGetLoginInfo (pro NRA)
        // poziadavky na ziskanie info o pouzivatelovi a jeho prihlasok
        if (this.csIsUserAuth || this.csGetLoginInfo) {
            i3.WS.command({
                command: 'logininfo',
                db: this.csReqRight.name,
                success: function(o) {
                    if (o.ret_code !== '0') {
                        Ext.Msg.alert('Chyba logininfo', 'Info: ' + o.ret_code + '/' + o.ret_msg);
                        return;
                    }
                    if (!o.data) {
                        o.data = [];
                    }
                    // 27.08.15 on; upravene kvuli NRA
                    // nastavime globalne premenne prostredia
                    /*i3.Login.ctx = {
                     isUserT001 : o.data[2], // cislo citatela z XxxIsUser
                     isUserClass : o.data[3], // XxxIsUser
                     isUserEmail : o.data[4], // email
                     isUserName : o.data[0],
                     isUserLoginOptions : o.data[1] // informace o prihlaseni
                     };*/
                    if (!i3.Login.ctx) {
                        i3.Login.ctx = {};
                    }
                    Ext.apply(i3.Login.ctx, {
                        isUserT001: o.data[2], // cislo citatela z XxxIsUser
                        isUserClass: o.data[3], // XxxIsUser
                        isUserEmail: o.data[4], // email
                        isUserName: o.data[0],
                        isUserLoginOptions: o.data[1], // informace o prihlaseni
                        isUserBarcode: o.data[10], // 24.09.15 on; carovy kod
                        isUserAutLink: o.data[11] // 01.02.17 on; link na autoritu
                    });
                    // 04.09.13 on; pokud je nastavena kontrola login options, provede ji
                    if (this.csIsUserOptions && (this.csIsUserOptions !== '')) {
                        // 10.10.13 on; zapojena funkce, protoze v poli 600i muze byt vice paranetru
                        //if (!i3.Login.ctx.isUserLoginOptions || (i3.Login.ctx.isUserLoginOptions.piece(',', 2) !== this.csIsUserOptions)) {
                        if (!this.csExistsUserLoginOptions(this.csIsUserOptions, i3.Login.ctx.isUserLoginOptions)) {
                            //i3.displayError(i3.Login.txNoRights2UseApp);
                            Ext.Msg.show({
                                title: i3.tx.txError,
                                msg: i3.Login.txNoRights2UseApp,
                                buttons: Ext.Msg.OK,
                                fn: function( /*pButtonId*/ ) {
                                    // provede odhlaseni z aplikace
                                    i3.Login.mainAppFireEvent('app_logout');
                                },
                                icon: Ext.MessageBox.ERROR,
                                scope: this
                            });
                            return;
                        }
                    }
                    this.csPostLogin();
                },
                scope: this
            });
            return;
        }
        // post login actions now
        this.csPostLogin();
    },
    /**
     * zjisti, jestli ma uzivatel opravneni k prihlaseni do aplikace
     *
     * @param {String} psRequiredOptions pozadovane nastaveni pro prihlaseni
     * @param {String} psAvailOptions aktualni nastaveni uzivatele
     * @private
     *
     * 10.10.13 on;
     */
    csExistsUserLoginOptions: function(psRequiredOptions, psAvailOptions) {
        var i,
            s;
        // pokud neni zadne opravneni pozadovano, nemusim nic hledat
        if (!psRequiredOptions || (psRequiredOptions === '')) {
            return true;
        }
        // neco je pozadovano, ale uzivatel nema zadne opravneni, konec s false
        if (!psAvailOptions) {
            return false;
        }
        for (i = 1; i <= psAvailOptions.fieldcount(','); i += 1) {
            s = psAvailOptions.piece(',', i);
            // naslo se dodpovidajici opravneni?
            if (s === psRequiredOptions) {
                return true;
            }
        }
        // nic se nenaslo
        return false;
    },
    /**
     * vrati okienko
     * @private
     */
    csGetParentWin: function() {
        var w = this.findParentByType(i3.Login.Win);
        i3.assert(w);
        return w;
    },
    /**
     * @private
     */
    csLoginHandler: function(config) {
        config = config || {};
        // 29.03.18 on;
        var sPwHash,
            that = this;
        var self = arguments.callee;
        // 19.12.13 on;
        if (!this.csIsLoginFormValid()) {
            return;
        }
        // 19.12.13 on; remember me
        /*var c = document.getElementById('login_formx');  // toto funguje jinak
         var c = Ext.get('login_formx');
         c.dom.submit();*/
        var c = Ext.get('login_submitx');
        if (c) {
            c.dom.click();
        }
        if (!i3.Login.ctx) {
            i3.Login.ctx = {};
            // globalny objekt s prostredim
        }
        var sLoginName = Ext.getCmp('login_name').getValue();
        var p = Ext.getCmp('login_pwd').getValue();
        // kontrola, ci nejde o prihlasovanie citatela => doplnenie objektu pred login
        // 20.01.09 rs; odstranene ==true (netreba)
        if (this.csIsUserAuth) {
            sLoginName = i3.ictx + 'IsUser,' + sLoginName;
        }
        // 25.08.20 on; moznost vynutit prihlaseni pres plain pw
        // 26.04.19 on; zruseno prihlaseni pres plain pw
        // 05.04.18 on;
        if (this.csPlainPw) {
            // plain pw
            sPwHash = '1,' + p;
        } else {
            // sha512 se soli
            // 26.04.19 on; vyjimka pro alr ucet
            if ((sLoginName === 'arl') || (sLoginName === 'test-arl')) {
                sPwHash = i3.WS.csHashPwSHAArl(p);
            } else {
                sPwHash = i3.WS.csHashPwSHA(p);
            }
            if (sPwHash === '') {
                return;
            }
            sPwHash = '2,' + sPwHash;
        }
        i3.WS.req({
            success: function(response /*, options*/ ) {
                i3.Login.ctx.userName = sLoginName;
                // 15.04.13 on; osetreno padani Ext.util.JSON.decode
                //var o = Ext.util.JSON.decode(response.responseText);
                var o = i3.csJsonDecode(response.responseText);
                if (!o) {
                    return;
                }
                if (!i3.WS.checkRetFmtBasic(o)) {
                    i3.alert(i3.Login.txLogin, 'error parsing data');
                    return;
                }
                // pozor na zacykleni!!!
                // 29.03.18 on; prihlaseni bez nonce, zkusi poslat znovu
                if (!config.bRetry && ((o.ret_code === 'ERRWS1002') || (o.ret_code === 'ERRWS1004') || (o.ret_code === 'ERRWS1005'))) {
                    config.bRetry = true;
                    self.call(that, config);
                    return;
                }
                // 26.04.19 on; md5 zruseno
                // 05.04.18 on; prihlaseni pres MD5
                /*if (!config.bPlainPw && (o.ret_code !== '0')) {
                config.bPlainPw = true;
                self.call(that, config);
                return;
                }*/
                // chybne meno alebo heslo
                //
                // ERRWS1000 - I2WSErrAuthRequired - toto su rovne vaznejsie problemy
                //                                   neplatna trieda, nespravny email pri user autorizacii atd.
                //                                   ..realne je to prilis siroke kriterium, ale zatial to ponechajme takto
                //      1001 - I2WSErrAuthFailed   - chybne meno/heslo
                if ((o.ret_code === 'ERRWS1001') || (o.ret_code === 'ERRWS1000')) {
                    i3.alert(i3.Login.txLogin, i3.Login.txBadUserNamePw);
                    return;
                }
                // login OK (overenie mena a hesla OK), ale pristupove prava nepostacuju na login
                if (o.ret_code === 'ERRWS1007') {
                    i3.alert(i3.Login.txLogin, i3.Login.txNoRights2UseApp);
                    return;
                }
                // login OK, ale ucet uzamncen
                if (o.ret_code === 'ERRWS1008') {
                    i3.alert(i3.Login.txLogin, i3.Login.txLoginLockout);
                    return;
                }
                // ina chyba?
                if (o.ret_code !== '0') {
                    // login neuspesny chyba: xx/xx
                    i3.alert(i3.Login.txLogin, i3.Login.txLoginFailed, [o.ret_code, o.ret_msg]);
                    return;
                }
                // 05.04.18 on; nakonec neni potreba
                // 05.04.18 on; pokud se povedlo prihlaseni pres MD5, provede zahesovani hesla sha512
                //              pouze docasne - po upgrade 2019 se muze vyhodit
                //if (config.bMD5) {
                //  this.csRehashPw(p);
                //}
                // uzatvorit login okienko a zrusit ho
                //Ext.getCmp('login_win').close();
                this.csGetParentWin().destroy();
                // 28.01.09 rs
                this.csPostLoginX();
                // post login incl. login info
            },
            scope: this,
            params: {
                method: 'rights',
                right: this.csReqRight.value,
                db: this.csReqRight.name,
                username: sLoginName,
                // 04.04.18 on; zruseno prihlaseni s otevrenym heslem i md5, nastaveno SHA512
                //auth : '1,' + p
                //auth : '2,' + i3.WS.csHashPwMd5(p)
                auth: sPwHash
            }
        });
    },
    /**
     *  Rucni validace formulare (nahrada getForm().isValid())
     */
    csIsLoginFormValid: function() {
        var c;
        c = Ext.getCmp('login_name');
        if (c) {
            if (!c.isValid()) {
                return false;
            }
        }
        c = Ext.getCmp('login_pwd');
        if (c) {
            if (!c.isValid()) {
                return false;
            }
        }
        return true;
    },
    /**
     *  Rucni vyvolani validace formulare
     */
    csLoginFormValidate: function() {
        var c;
        c = Ext.getCmp('login_name');
        if (c) {
            c.validate();
        }
        c = Ext.getCmp('login_pwd');
        if (c) {
            c.validate();
        }
    },
    /**
     * Osetri chovani tlacitka Login
     */
    csCheckLoginBtn: function() {
        var c = Ext.getCmp('login_btn');
        c.setDisabled(!this.csIsLoginFormValid());
    },
    /**
     * 28.02.18 on; po uspesnem prihlaseni provede nastaveni session parametru (zatim pouze pobocky)
     *
     */
    csSetSessionParams: function() {
        // zjisti domovskou pobocku pro aktualne prihlaseneho uzivatele z CLIENT_CFG T01p
        i3.WS.sTablesdCacheInit({
            t001: ['CLIENT_CFG'],
            // funkcia bude volana po uspesnom nacitani dat
            followup: function() {
                // zjisti domovskou pobocku pro aktualne prihlaseneho uzivatele
                var sBranch = i3.WS.sTablesdCacheGet('CLIENT_CFG').getTag('T01p');
                if (sBranch !== '') {
                    // pokud je nastavena zavolam funkci pro nastaveni do session
                    this.csSetSessionParams0(sBranch);
                }
            },
            failure: function() {
                // pri chybe nic nezobrazovat!
            },
            // scope pre success & followup funkciu
            // pozor success musi explicitne volat followup
            scope: this
        });
    },
    /**
     * 28.02.18 on; nastaveni pobocky do session
     */
    csSetSessionParams0: function(psBranch) {
        if (i3.isEmptyString(psBranch)) {
            return;
        }
        // zavola metodu na serveru
        i3.WS.command({
            db: i3.WS.getDfltUnTablesd(),
            params: 'branch#' + psBranch,
            command: 'setSesParams',
            bDontHandleErr: true,
            // o-je cely JSON s vysledkom
            success: function(o) {
                //i3.alert(o.ret_code+'#'+o.ret_msg);
                // server vrati seznam vsech nastavenych parametru
                // uchovam si je v promenne
                if (o && o.data && o.data[0]) {
                    if (!i3.Login.ctx) {
                        i3.Login.ctx = {};
                    }
                    Ext.apply(i3.Login.ctx, {
                        sessionData: o.data[0]
                    });
                }
            },
            failure: function() {
                // nezobrazovat chybu
            },
            scope: this
        });
    }
    // 05.04.18 on; nakonec neni potreba
    // 05.04.18 on; docasne prehesovani hesla (do U2019)
    /*csRehashPw : function(p) {
     //i3.alert('prihlaseni pres MD5, provedu prehesovani');
     var sOldPassHash, sNewPassHash, sIctx;

     sOldPassHash = Ext.util.base64.encode(Ext.util.MD5(p, true));
     sNewPassHash = i3.WS.csHashPwSHA(p);

     if (i3.isEmptyString(i3.ictx)) {
     sIctx = 'base';
     } else {
     sIctx = i3.ictx.toLowerCase();
     }

     var sLName = sIctx + '_un_tablesd';

     //var sGroup = i3.WS.getCommandGroup('securitySet');
     var sGroup = 'COMMON';
     var sTbl = i3.lName2className('CMD_' + sIctx.toUpperCase() + '_' + sGroup);
     i3.WS.commandURC({
     command : 'securitySet ' + sLName + ' . 3 ' + sNewPassHash + ' ' + sOldPassHash,
     classn : sTbl,
     success : function() {
     // nic nezobrazovat
     // prelozi kod do srozumitelne podoby
     //var m = new i3.WS.Msg(psResp);
     //i3.alert(m.userText);
     },
     failure : function() {
     // nic nezobrazovat
     },
     scope : this
     });
     }*/
});
/**
 * dialog
 * @private
 *
 * config
 *  csReg:     - volitelna option, ktora umoznuje prekliknutie z login dialogu na registraciu
 *  csCallback - callback
 *  csScope    - callback scope
 *  CSViewPort - vp to open after login
 *
 * 16.01.09 rs; doplnenie deklaracie panelCfg
 * 12.01.09 jt; doplneny option, ci ma okno obsahovat odkaz na registraciu
 *
 */
Ext.extend(Ext.Window, {
    constructor: i3.Login.Win = function(config, panelCfg) {
        config = config || {};
        var panel = new i3.Login.Panel(Ext.apply({}, panelCfg));
        // 26.11.15 on; moznost zrusit login dialog a zobrazit pouze text
        if (!i3.isEmptyString(panelCfg.csShowOnlyText)) {
            Ext.applyIf(config, {
                //id : 'login_win', // login okno bude single, takze moze mat pevne id
                //layout : 'fit',
                //width : panelCfg.csWidth || 300, // 20.01.11 on; moznost zmenit sirku okna
                //height : 150,
                //closeAction : 'close',
                closable: false,
                plain: true, // True to render the window body with a transparent background so that it will blend into the framing elements..
                items: [panel],
                csPanel: panel,
                //defaultButton : 'login_name', // auto focus field
                title: panelCfg.csPanelTitle || ''
            });
        } else {
            var sLoginTit;
            // 09.07.25 on; doplnena moznost vlozit do titulku login dialogu nazev aplikace
            //var sLoginTit = config.csPanelTitle || i3.Login.txPleaseLogin;
            if (config.csPanelTitle) {
                sLoginTit = config.csPanelTitle;
            } else
            if (config.csAppName) {
                sLoginTit = i3.Login.txPleaseLogin + ' - ' + config.csAppName;
            } else {
                sLoginTit = i3.Login.txPleaseLogin;
            }
            if (i3.urlParams.show_version > 0) {
                sLoginTit += ' - ' + i3.version;
            }
            Ext.applyIf(config, {
                id: 'login_win', // login okno bude single, takze moze mat pevne id
                layout: 'fit',
                // 09.07.25 on; default zvetsen z 300 na 350
                width: panelCfg.csWidth || 350, // 20.01.11 on; moznost zmenit sirku okna
                height: 150,
                closeAction: 'close',
                closable: false,
                plain: true, // True to render the window body with a transparent background so that it will blend into the framing elements..
                items: [panel],
                csPanel: panel,
                defaultButton: 'login_name', // auto focus field
                title: sLoginTit
            });
        }
        i3.Login.Win.superclass.constructor.call(this, config);
    }
});
Ext.apply(i3.Login, {
    /**
     * Globalna funkcia na vyvolanie pwd okienka.
     * Moze sa pouzit aj samostatne mimo hlavneho loginu do aplikacie - napr. pre ziskanie
     * mena/hesla na externy server - trebars server bandasky v muzejnej aplikacii.
     *
     * @param {Object} pLoginCfg     Parametre pre login panel.
     * @param {Object} pLoginWinCfg  Parametre pre Window
     */
    pwdDialog: function(pLoginPnlCfg, pLoginWinCfg) {
        var w = new i3.Login.Win(pLoginWinCfg || {}, pLoginPnlCfg);
        // pozor parametre su tu naopak! (z hist.dovodov)
        w.show();
    },
    /**
     * Globalna funkcia na vyvolanie loginu do aplikacie.
     *
     * @param {Object} pLoginPnlCfg
     *      csReqRight: objekt s pozadovanymi konfig pravami
     *                  povinne
     *      csIsUserAuth: T/F ci je povolena autorizacia cez login pouzivatela (email namiesto loginu)
     *      csReg:        T/F ci je povolena registracia citatelov
     *      csHelp:       undefined alebo text s helpom
     *      csCallback:   undefined alebo callback po uspesnom logine
     *      csScope:      undefine alebo scope pre callback
     *      CSViewPort:   undefined alebo nazov vieportu, kt. bude otvoreny po uspesnom logine
     *      csVPParams:   parametry pro ViewPort    // 21.04.11 on;
     *      csPanelTitle: undefined, alebo prepis titulku okna
     *      +lubovolne config optiony pre LoginPanel
     * @param {Object} pAcceptPrevLogin - ci akceptovat eventualne existujuci login kontext, alebo ci VZDY
     *      zobrazil login box
     * @param {Object} pLoginWinCfg - parametre pre login window
     */
    doLogin: function(pLoginPnlCfg, pAcceptPrevLogin, pLoginWinCfg) {
        // 06.01.15 on; tady uz bych mel byt vzdy prihlaseny - poznacim si to
        if (!i3.Login.ctx) {
            i3.Login.ctx = {};
        }
        i3.Login.ctx.isLoggedIn = false;
        var w = new i3.Login.Win(pLoginWinCfg, pLoginPnlCfg);
        // pozor parametre su tu naopak! (z hist.dovodov)
        if (!pAcceptPrevLogin) {
            // unconditional login
            w.show();
            return;
        }
        // rozsirena verzia s testom na pripadne existujuce predchadzajuce prihlasenie
        // t.j. preskocime login box, v pripade, ze uz uzivatel je prihlaseny
        // 06.01.15 on; presunuto vys
        /*if (!i3.Login.ctx) {
         i3.Login.ctx = {}; // globalny objekt s prostredim
         }*/
        i3.WS.req({
            success: function(response /*, options*/ ) {
                // 15.04.13 on; osetreno padani Ext.util.JSON.decode
                var o = i3.csJsonDecode(response.responseText);
                if (!o) {
                    return;
                }
                if (!i3.WS.checkRetFmtBasic(o)) {
                    Ext.Msg.alert('Login', 'error parsing data');
                    return;
                }
                if (o.ret_code !== '0') {
                    // login required
                    w.show();
                } else {
                    // seems to be already logged in
                    i3.Login.ctx = {};
                    // globalny objekt s prostredim
                    // nastavime username z headera WS response (az od verzie WS 4.6.09)
                    if (o.header && o.header.username) {
                        i3.Login.ctx.userName = o.header.username;
                    } else {
                        i3.Login.ctx.userName = 'unknown-username';
                    }
                    w.csPanel.csPostLoginX();
                }
            },
            params: {
                method: 'rights',
                right: pLoginPnlCfg.csReqRight.value,
                db: pLoginPnlCfg.csReqRight.name
            }
        });
    }
});
