// Registracia uzivatelov
//
// 04.03.20 on; sha512
// 05.03.18 on; povinna pole oznacena *
// 01.03.18 on; autoHeight
// 03.02.16 on; zrusen fax
// 19.09.13 on; uprava slovenske verze "Nápoveda" -> "Pomoc"
// 16.04.13 on; osetreno padani Ext.util.JSON.decode
// 22.10.10 on; zmena hlasky
// 05.10.09 rs; upravy dokumentacia
// 05.02.09 rs; formalne drobnosti (poznamka a texty k prvkom formulara)
// 30.01.09 rs; rozne drobne upravy v suvislosti s SCD
// 21.01.08 rs; oprava diakritiky
// 20.01.08 rs; pre insert citatela zatial zrusene nastavovanie 100k
// 15.01.09 jt; reload captcha obrazku a ine upravy
// 11.01.09 jt; registracia cez captchu
// 08.01.09 jt; prva verzia - obrazovka
// --
// jslint params
/*global Ext,i3,alert */
// texty UI, ktore je treba prekladat
//
i3.Reg = {
    txCancel: 'Zrušiť#Zrušit#Cancel'.ls(),
    txConfPass: 'potvrdené heslo#potvrzené heslo#confirmed password'.ls(),
    txConfPassNo: 'Heslo a potvrdené heslo nesúhlasia#Heslo a potvrzené heslo nesouhlasí#Password and confirmation do not match'.ls(),
    txDataReg: 'Údaje pre registráciu#Údaje pro registraci#Údaje pre registráciu'.ls(),
    txDifPicture: 'Iný obrázok#Jiný obrázek#Different picture'.ls(),
    txError: 'Chyba#Chyba#Error'.ls(),
    txError1: 'Zadali ste nesprávny kontrolný text. Zopakujte prosím zadanie, prípadne si vyźiadajte nový obrázok kliknutím na príslušné tlačítko. Kontrolný text slúži ako ochrana proti spamu.#Zadali jste nesprávný kontrolní text. Zopakujte prosím zadání, případně si vyžádejte nový obrázek kliknutím na příslušné tlačítko. Kontrolní text slouží jako ochrana proti spamu.#Zadali jste nesprávný kontrolní text. Zopakujte prosím zadání, případně si vyžádejte nový obrázek kliknutím na příslušné tlačítko. Kontrolní text slouží jako ochrana proti spamu.'.ls(),
    txError2: 'Používateľ so zadaným emailom už existuje. Duplicitná registrácia nie je možná. Ak Vám nie je známe prístupové heslo, prosím kontaktujte správcu aplikácie.#Uživatel se zadaným emailem již existuje. Duplicitní registrace není možná. Pokud Vám není známo přístupové heslo, prosím kontaktujte správce aplikace.#Uživatel se zadaným emailem již existuje. Duplicitní registrace není možná. Pokud Vám není známo přístupové heslo, prosím kontaktujte správce aplikace.'.ls(),
    txError3: 'Používateľ so zadaným menom+dátumom narodenia už v databáze existuje. Duplicitná registrácia nie je možná. Ak Vám nie je známe prístupové heslo, prosím kontaktujte správcu aplikácie.#Uživatel se zadaným jménem + datem narození již v databázi existuje. Duplicitní registrace není možná. Pokud Vám není známo přístupové heslo, prosím kontaktujte správce aplikace.#Uživatel se zadaným jménem + datem narození již v databázi existuje. Duplicitní registrace není možná. Pokud Vám není známo přístupové heslo, prosím kontaktujte správce aplikace.'.ls(),
    txError4: 'Interná chyba pri zápise záznamu registrácie. Zopakujte pokus o registráciu, alebo kontaktujte správcu aplikácie.#Interní chyba při zápisu záznamu registrace. Zopakujte pokus o registraci, nebo kontaktujte správce aplikace.#Interní chyba při zápisu záznamu registrace. Zopakujte pokus o registraci, nebo kontaktujte správce aplikace.'.ls(),
    // 03.02.16 on; zruseno NCD
    //txFax : 'Fax#Fax#Fax'.ls(),
    txHelp: 'Pomoc#Nápověda#Help'.ls(),
    txInfo3: 'Vyplňte všetky povinné polia. V políčku "Text v obrázku" opíšte zobrazené písmená a čísla. Funkcia slúži na ochranu proti automatickým registráciám spamovými robotmi. V prípade, že text na obrázku nejde prečítať, alebo ho systém odmieta prijať, vyźiadajte si nový obrázok, kliknutím na príslušné tlačítko.#Vyplňte všechna povinná pole. V kolonce "Text v obrázku" opište zobrazeny písmena a čísla. Funkce slouží k ochraně proti automatickým registracím spamování. V případě, že text na obrázku nejde přečíst, nebo jej systém odmítá přijmout, vyžádejte si nový obrázek, kliknutím na příslušné tlačítko.#Vyplňte všechna povinná pole. V kolonce "Text v obrázku" opište zobrazeny písmena a čísla. Funkce slouží k ochraně proti automatickým registracím spamování. V případě, že text na obrázku nejde přečíst, nebo jej systém odmítá přijmout, vyžádejte si nový obrázek, kliknutím na příslušné tlačítko.'.ls(),
    txName: 'Meno#Jméno#Name'.ls(),
    txPass: 'Heslo#Heslo#Password'.ls(),
    txPassRep: 'Opakovanie hesla#Opakovaní hesla#Repeat password'.ls(),
    txPhone: 'Telefon#Telefon#Phone'.ls(),
    txRegIsOK: 'Registrácia prebehla úspešne.#Registrace proběhla úspěšně.#Registration was successful.'.ls(),
    txRegNew: 'Registrácia nového používateľa#Registrace nového uživatele#New user registration'.ls(),
    txReqired: 'Toto pole je povinné#Toto pole je povinné#This field is required'.ls(),
    txReqiredInfo: 'Vyplňte tieto povinné polia:#Vyplňte tyto povinné pole:#Complete the required fields'.ls(),
    txRequired: 'Povinné polia sú označené <b>*</b>. Minimálna dĺžka hesla 7 znakov. Heslo by malo obsahovať aspoň jednu číslicu alebo špeciálny znak.#Povinná pole jsou označena <b>*</b>. Minimální délka hesla 7 znaků. Heslo by mělo obsahovat alespoň jednu číslici nebo speciální znak.#Povinná pole jsou označena <b>*</b>. Minimální délka hesla 7 znaků. Heslo by mělo obsahovat alespoň jednu číslici nebo speciální znak.'.ls(),
    txSurname: 'Priezvisko#Přijmení#Surname'.ls(),
    txTextInImg: 'Text v obrázku#Text v obrázku#Text in picture'.ls(),
    txVerCode: 'Overovací kód#Ověřovací kód#Verification code'.ls()
};
i3.Reg.c = {
    sRequiredField: '<b>*</b>' // 05.03.18 on;
};
/**
 * @class i3.Reg.Panel
 *
 * Panel na registraciu.<br/>
 * Verzia 1.2009 od J.Tešlára.
 *
 * @param {Object} config
 */
i3.Reg.Panel = function(config) {
    config = config || {};
    // ziskanie captcha obrazku cez WS pri nacitani panela registracie
    var captchaImg = new Ext.form.Label();
    this.GetCaptcha = function() {
        i3.WS.req({
            success: function(response, options) {
                // 16.04.13 on; osetreno padani Ext.util.JSON.decode
                //var o = Ext.util.JSON.decode(response.responseText);
                var o = i3.csJsonDecode(response.responseText);
                if (!o) {
                    return;
                }
                if (o.ret_code !== '0') {
                    Ext.Msg.alert(i3.Reg.txError, 'Info: ' + o.ret_code + '/' + o.ret_msg);
                    return;
                }
                captchaImg.setText(o.data, false);
            },
            params: {
                method: 'command',
                command: 'captcha',
                db: 'CmdCaptcha'
            }
        });
    };
    this.GetCaptcha();
    // button na reload captcha obrazku
    var captchaReload = new Ext.Button();
    captchaReload.setText(i3.Reg.txDifPicture, false);
    captchaReload.on('click', this.GetCaptcha);
    // parametre a polia panelu registracie
    Ext.apply(config, {
        frame: true,
        width: 400,
        autoHeight: true, // 01.03.18 on;
        labelAlign: 'right',
        bodyStyle: 'padding: 5px 5px 5px 5px',
        monitorValid: true,
        labelWidth: 130,
        defaults: {
            labelSeparator: ' '
        },
        items: [{
            xtype: 'fieldset',
            title: i3.Reg.txDataReg,
            autoHeight: true,
            defaults: {
                width: 200
            },
            defaultType: 'textfield',
            items: [{
                    // 05.03.18 on; pouze hvezdicka
                    //fieldLabel : i3.Reg.txName + ' (*)',
                    fieldLabel: i3.Reg.txName + i3.Reg.c.sRequiredField,
                    name: 'name',
                    id: 'reg_name',
                    allowBlank: false,
                    blankText: i3.Reg.txReqired,
                    maxLength: 30
                }, {
                    // 05.03.18 on; pouze hvezdicka
                    fieldLabel: i3.Reg.txSurname + i3.Reg.c.sRequiredField,
                    name: 'surname',
                    id: 'reg_surname',
                    allowBlank: false,
                    blankText: i3.Reg.txReqired,
                    maxLength: 30
                }, {
                    // 05.03.18 on; pouze hvezdicka
                    fieldLabel: 'Email' + i3.Reg.c.sRequiredField,
                    name: 'mail',
                    id: 'reg_mail',
                    allowBlank: false,
                    blankText: i3.Reg.txReqired,
                    maxLength: 30,
                    vtype: 'email'
                }, {
                    fieldLabel: i3.Reg.txPhone,
                    name: 'phone',
                    id: 'reg_phone',
                    maxLength: 30
                },
                // 03.02.16 on; zruseno NCD
                /*{
                 fieldLabel : i3.Reg.txFax,
                 name : 'fax',
                 id : 'reg_fax',
                 maxLength : 30
                 }, */
                {
                    // 05.03.18 on; pouze hvezdicka
                    fieldLabel: i3.Reg.txPass + i3.Reg.c.sRequiredField,
                    inputType: 'password',
                    name: 'password',
                    id: 'reg_password',
                    allowBlank: false,
                    maxLength: 20,
                    minLength: 7,
                    vtype: 'password'
                }, {
                    // pouze hvezdicka
                    fieldLabel: i3.Reg.txPassRep + i3.Reg.c.sRequiredField,
                    inputType: 'password',
                    name: 'password2',
                    id: 'reg_password2',
                    allowBlank: false,
                    maxLength: 20,
                    initialPasswordField: 'reg_password',
                    vtype: 'password'
                }, {
                    xtype: 'label',
                    // 05.03.18 on;  
                    //text : i3.Reg.txRequired
                    html: i3.Reg.txRequired
                }
            ]
        }, {
            xtype: 'fieldset',
            title: i3.Reg.txVerCode,
            autoHeight: true,
            items: [{
                layout: 'column',
                style: 'padding: 10px 10px 10px 10px',
                items: [{
                    columnWidth: 0.6,
                    layout: 'form',
                    items: [captchaImg]
                }, {
                    columnWidth: 0.4,
                    layout: 'form',
                    style: 'padding-top: 17px',
                    items: [captchaReload]
                }]
            }, {
                xtype: 'textfield',
                fieldLabel: i3.Reg.txTextInImg,
                inputType: 'text',
                name: 'captcha',
                id: 'reg_captcha',
                width: 200,
                allowBlank: false
            }]
        }],
        buttons: [{
            text: 'OK',
            id: 'reg_ok',
            formBind: true,
            listeners: {
                click: {
                    fn: this.RegHandler,
                    scope: this
                }
            }
        }, {
            text: i3.Reg.txHelp,
            listeners: {
                click: {
                    fn: function() {
                        i3.alert(i3.Login.txHelp, config.csHelp);
                    },
                    scope: this
                }
            }
        }, {
            text: i3.Reg.txCancel,
            handler: function() {
                Ext.getCmp('reg_win').close();
            }
        }]
    });
    i3.Reg.Panel.superclass.constructor.call(this, config);
};
Ext.extend(i3.Reg.Panel, Ext.form.FormPanel);
i3.Reg.Panel.prototype.RegHandler = function() {
    // ziskanie udajov z formularu
    var name = Ext.getCmp('reg_name').getValue();
    var surname = Ext.getCmp('reg_surname').getValue();
    var mail = Ext.getCmp('reg_mail').getValue();
    var phone = Ext.getCmp('reg_phone').getValue();
    // 03.02.16 on; zruseno
    //var fax = Ext.getCmp('reg_fax').getValue();
    var password = Ext.getCmp('reg_password').getValue();
    var confPassword = Ext.getCmp('reg_password2').getValue();
    var captchaText = Ext.getCmp('reg_captcha').getValue();
    var reqFields = '';
    // zaznamenanie  nevyplnenych poli
    if (name === '') {
        reqFields = reqFields + '<li>' + i3.Reg.txName + '</li>';
    }
    if (surname === '') {
        reqFields = reqFields + '<li>' + i3.Reg.txSurname + '</li>';
    }
    if (mail === '') {
        reqFields = reqFields + '<li>e-mail</li>';
    }
    if (password === '') {
        reqFields = reqFields + '<li>' + i3.Reg.txPass + '</li>';
    }
    if (confPassword === '') {
        reqFields = reqFields + '<li>' + i3.Reg.txConfPass + '</li>';
    }
    if (captchaText === '') {
        reqFields = reqFields + '<li>' + i3.Reg.txTextInImg + '</li>';
    }
    // chybove hlasky
    if (reqFields !== '') {
        Ext.Msg.alert(i3.Reg.txError, i3.Reg.txReqiredInfo + reqFields);
        return;
    }
    if (password !== confPassword) {
        Ext.Msg.alert(i3.Reg.txError, i3.Reg.txConfPassNo);
        return;
    }
    //datumy platnosti preukazu
    var date1 = new Date();
    var duration = 365;
    var date2 = date1.add(Date.DAY, duration);
    // 03.02.16 on; telefon neni povinny
    if (phone !== '') {
        phone = i3.c.SF + 'f' + phone;
    }
    // 03.02.16 on; zrusen fax
    // MARC zaznam o novom uzivatelovi
    var marcData = ['100    ' + i3.c.SF + 'a' + surname + ', ' + name + i3.c.SF + 'b.' + i3.c.SF + 'e' + mail + phone /*+ i3.c.SF + 'g' + fax*/ , //+ i3.c.SF + 'k' + i3.category  // zatial zrusene 20.01.08 rs
        // 04.03.20 on; sha512
        //'400    ' + i3.c.SF + 'c' + duration + i3.c.SF + 'd' + date1.format('Ymd') + i3.c.SF + 'z' + date2.format('Ymd') + i3.c.SF + 'w' + Ext.util.base64.encode(Ext.util.MD5(password, true)),
        '400    ' + i3.c.SF + 'c' + duration + i3.c.SF + 'd' + date1.format('Ymd') + i3.c.SF + 'z' + date2.format('Ymd') + i3.c.SF + 'w' + i3.WS.csHashPwSHA(password), '969    ' + i3.c.SF + 'fW', '999    ' + i3.c.SF + 'escd_is_user*new'
    ];
    var marcRecord = new i3.Marc({
        t001: 'new',
        classn: i3.ictx + 'IsUser',
        data: marcData
    });
    // registracia cez WS - autorizacia cez captcha + insert do prislusnej databazy uzivatelov
    i3.WS.update({
        operation: 'insert',
        username: 'defaulth',
        auth: '1,' + captchaText.toUpperCase(),
        success: function() {
            Ext.Msg.show({
                title: 'Info',
                // 22.10.10 on; zmena hlasky
                //msg: 'Boli ste úspešne zaregistrovaný.',
                msg: ' ' + i3.Reg.txRegIsOK,
                width: 300,
                buttons: Ext.MessageBox.OK,
                animEl: 'reg_ok',
                fn: function() {
                    Ext.getCmp('reg_win').close();
                }
            });
        },
        failure: function(msg) {
            // chyba autoritzacie - tu znamena chybny captcha obrazok
            if (msg.indexOf('ERRWS1001') !== -1) {
                Ext.Msg.alert(i3.Reg.txError, i3.Reg.txError1);
            }
            // duplicita emailu
            else if (msg.indexOf('|ERRIT027#em#') !== -1) {
                Ext.Msg.alert(i3.Reg.txError, i3.Reg.txError2);
            }
            // duplicita 100a+100d+100l
            else if (msg.indexOf('|ERRIT044#') !== -1) {
                Ext.Msg.alert(i3.Reg.txError, i3.Reg.txError3);
            }
            // ina chyba zapisu
            else if (msg.indexOf('ERRWS2304') !== -1) {
                Ext.Msg.alert(i3.Reg.txError, i3.Reg.txError4);
            }
            // ina chyba
            else {
                Ext.Msg.alert(i3.Reg.txError, msg);
            }
            // reload captcha
            // captcha je na jedno pouzitie, takze ta co bola doteraz zobrazena uz je aj tak neplatna
            this.GetCaptcha();
        },
        scope: this
    }, marcRecord);
};
/**
 * @class i3.Reg.Win
 * Okienko k registracii citatelov.
 *
 * backWin:   referencia na okno/obrazovku, kde sa program vrati po registracii/zruseni registracie
 *
 * @param {Object} config
 * @param {Object} pBackWin
 */
i3.Reg.Win = function(config, pBackWin) {
    config = config || {};
    var panelCfg = {
        csHelp: i3.Reg.txInfo3
    };
    var panel = new i3.Reg.Panel(panelCfg);
    //config.csPanel=panel;
    Ext.apply(config, {
        id: 'reg_win',
        layout: 'fit',
        // 01.03.18 on;
        //height : 470,
        autoHeight: true,
        width: 420,
        headerAsText: true,
        title: i3.Reg.txRegNew,
        bodyBorder: false,
        border: false,
        closable: true,
        plain: true,
        items: [panel],
        buttons: [],
        listeners: {
            close: {
                fn: function() {
                    pBackWin.show();
                }
            }
        }
    });
    i3.Reg.Win.superclass.constructor.call(this, config);
};
Ext.extend(i3.Reg.Win, Ext.Window);
