/*
 * Kniznica najzakladnejsich univerzalnych komponent dorobenych Ext-u.
 * Mala by byt nacitana po i3.UI.Ext.js.
 *
 * 11.10.23 on; pokud je zprava uz zobrazena, nebud zobrazovat znova
 * 23.08.23 on; pokud se dotahuje ze subtagu $b - vybere spravnou mutaci
 * 01.11.22 on; csDeduplicateID - moznost pridat ke kodu polozky ciselniku odlisujici retezec (deduplikace kodu ciselniku) 
 * 07.10.22 on; je pouzit sufix pobocky?
 * 10.06.22 on; metoda csUncheck
 * 03.06.22 on; moznost nezobrazit chybovou zpravu, kdyz se zaznam nenajde - pouzito pri nacteni ciselniku comboboxu
 * 18.03.22 on; vyber polozky z nabidky - moznost zapisu do jinych podpoli zaznamu
 * 03.05.21 on; potrebuju aby se scope v fppar prepsalo i kdyz uz existuje a myslim, ze to tak ma byt pro vsechny promenne, zmena z applyIf na apply
 * 07.12.20 on; csLoadMarcRecordEnd doLayout
 * 06.04.20 on; oprava predani store
 * 24.01.20 lo; request na subor home.json, kvoli tomu ze na IIS .js subor hadzal chybu 406
 * 06.12.19 on; DateField2: podpora mezer ve vstupnim datumu (d. m. rrrr)
 * 03.07.19 on; oprava csHomeAppLink
 * 02.07.19 on; tady potrebuju minimalne nastavit puvodni sirku a vysku okna
 * 02.07.19 on; sirka alert dialogu
 * 01.07.19 on; pri kliknuti na text o(d)znaci checkbox
 * 17.05.19 on; phonenumber
 * 16.11.18 lo; odkaz na domovsku stranku i3 aplikacii (ikona "domcek")
 * 30.08.18 on; tlacitko Insert all v PB
 * 04.10.17 on; ContentServerLink rozsiren o sso
 * 26.07.17 on; doplneno vyhledavani v PB primo z hlavniho formulare
 * 19.06.17 on; csBeforePopulate doplneno i do cs_auth_select_fs
 * 16.06.17 on; rozsirena funkce csLoadMarcRecordEnd
 * 07.04.17 on; rozsirena funkce msg
 * 02.11.16 on; rozsiren csOnLoadCallBack
 * 12.04.16 on; DateField2: podpora datumu v iso formatu
 * 05.04.16 on; msg rozsirena o moznost animace
 * 01.03.16 on; uprava setMarc metody
 * 18.02.16 on; uprava onTriggerClick
 * 18.02.16 on; uprava msgOff
 * 21.01.16 on; do cs_combo_st doplnen parametr csHideQtip
 * 14.01.16 on; rozsireno msg
 * 12.01.16 on; rozsireno onTriggerClick
 * 03.12.15 on; rozsirena podpora csDisplayID
 * 30.10.15 on; cs_auth_select_form rozsirena o moznost vyhledvat po enteru
 * 15.09.15 on; zakazany rok 0
 * 11.09.15 on; doplnen urlText
 * 10.09.15 on; do csShowAbout doplnen parametr
 * 06.08.15 on; DateField2 - podpora zapornych datumu
 * 24.07.15 on; AuthSelectForm - doplneno predani parametru
 * 19.06.15 on; rozsireni csShowAbout
 * 08.04.15 on; zvysen interval zobrazeni zpravy v msg
 * 25.02.15 kp; přidan text txNoRecordFound
 * 16.02.15 on; do TreePanelST doplnen callback
 * 02.12.14 on; rozsireno AuthSelect
 * 28.11.14 on; v ContentServerLink odlisena test verze
 * 24.11.14 on; podpora pro opakovatelne cs_auth_select_fs
 * 23.10.14 on; do funkce displayHTMLInIframe doplnena moznost nastavit callback
 * 02.09.14 on; displayHTMLInIframe
 * 25.08.14 on; opravene predani callbacku v onTriggerClick
 * 11.08.14 on; prelozene tlacitko Ext.Msg.OK v Ext.Msg.show
 * 24.07.14 on; uprava onTriggerClick
 * 28.05.14 on; oprava cs_contentserverlink pro IE
 * 17.04.14 on; zmena validace cs_combo_st (csOnValidate)
 * 10.04.14 on; cs_contentserverlink
 * 20.03.14 on; arabstina
 * 27.02.14 on; uprava msg
 * 27.02.14 on; uprava ComboboxST
 * 06.02.14 on; ASCII
 * 24.01.14 on; doplnena funkce csGetIdPrefix
 * 11.12.13 on; vyhledavani v cs_combo_st
 * 11.11.13 on; rozsireni getSingleWin
 * 07.11.13 on; uprava ComboboxST
 * 21.10.13 on; doplneni csFillItems
 * 24.09.13 on; rozsireni AuthSelectForm
 * 23.09.13 on; funkce pro zobrazeni about okna s cislem verze
 * 20.09.13 on; oznaceni browse popup pole, ktere neni editovatelne
 * 19.09.13 on; uprava slovenske verze "Nápoveda" -> "Pomoc"
 * 07.06.13 on; upraveno csSetDefault v cs_checkboxgroup_st
 * 14.05.13 on; do cs_combo_st pridano csDefault
 * 14.05.13 on; pro cs_treepanel_st a cs_checkboxgroup_st pridana moznost oznacit defaultni hodnoty
 * 07.03.13 jk; doplnen pId, pokud je vyplnen okno se nezavre, zalozeno i3.msgOn a i3.msgOff
 * 18.02.13 on; cs_datefield - zmeneno zobrazeno datumu
 * 08.02.13 on; predelane volani csGetFields2Load
 * 09.01.12 on; rozsirena podminka v csAutoSelectFirst
 * 08.01.12 on; formalni upravy
 * 01.11.12 on; cs_auth_select_fs rozsirena o vyvolani udalosti change
 * 20.08.12 on; osetrena chyba v csLoadMarcRecord
 * 13.08.12 on; prelozene tlacitka Ext.Msg.YESNO v Ext.Msg.show
 * 10.08.12 on; prelozene tlacitka Ext.Msg.YESNOCANCEL, Ext.Msg.OKCANCEL v Ext.Msg.show
 * 17.07.12 on; cs_combo_st - moznost nezobrazovat varovani pri neexistenci ciselniku, moznost predat onload callback
 * 27.06.12 on; opraven prevod datumu z d.m.r na rrrrmmdd
 * 11.06.12 on; cs_auth_select_fs doplnena podpora opakovatelnych podpoli
 * 21.05.12 on; rozsirena metoda setMarc v cs_select_auth
 * 17.05.12 on; cs_auth_select_form doplneno o clearfields (kvuli generatoru formularu)
 * 19.03.12 on; rozsiren ComboboxST
 * 08.02.12 on; doplnene zobrazeni nazvu ciselniku pri chybe v ComboboxST
 * 18.01.12 on; popup scan
 * 30.11.11 on; cs_treepanel_st
 * 29.11.11 on; csload v CheckboxGroupST
 * 28.11.11 on; QTip doplneny do cs_auth_select (zatim jenom sem)
 * 02.11.11 on; komponenta CheckboxGroupST
 * 27.10.11 on; rozsiren objekt cs_auth_select_form
 * 13.10.11 on; doplnena funkce i3.displayError
 * 11.10.11 on; do cs_combo_st doplneny parametr csValidate
 * 04.10.11 on; do ComboboxST doplneny parametr csTextField
 * 10.08.11 on; uprava cs_combo_st
 * 22.07.11 on; opravena validace ComboboxST
 * 06.05.11 jk; rozsireno o plneni data
 * 06.05.11 jk; pridana fce csGetRecord
 * 05.05.11 on; uprava onTriggerClick v DateField
 * 15.04.11 on; doplnen progressbar
 * 20.10.10 on; zmena chovani pole cs_auth_select_form
 * 29.06.10 on; doplneny text Read only
 * 02.02.10 on; prechod na ext 3.1
 * 07.12.09 on; doplneny ComboboxST2
 * 27.11.09 rs; col_trigger registracia pola ako aktualneho po kliknuti na trigger
 * 25.11.09 on; do csGetFields2Load doplnena moznost zadat podminku
 * 24.11.09 on; upravena metoda csLoadMarcRecord
 * 19.10.09 rs; pridana validacia nonewline
 * 07.10.09 rs; upravy dokumentacia
 * 05.10.09 rs; pridane abstract poistky na funkcie, kt. maju byt redefinovane
 * 05.10.09 rs; formalne upravy pre dokumentaciu
 * 02.10.09 rs; formalne upravy
 * 23.09.09 rs; pre cs_combo_st osetrenie vymazu internej hodnoty pri vymaze
 *              textu pre evente blur
 * 16.09.09 rs; datefield: zmena testu na isInteger
 * 25.08.09 rs; intError - oprava preklepu
 * 24.08.09 rs; zasadnejsie vylepsenia v cs_combo_st
 * 12.08.09 rs; drobnosti v cs_combo_st
 * 07.08.09 rs; pridane test hlasky; metoda intError
 * 22.07.09 rs; drobne upozornenie na chybajucu dynf kniznicu
 * 21.04.09 rs; formalne preformatovanie pre jslint
 * 01.04.09 rs; formalne preformatovanie
 * 03.02.09 rs; pridanych zopar tx sprav; i3.msg zvyseny cas zobrazenia na 2 sek.
 * 30.01.09 rs; rozne drobne upravy v suvislosti s SCD
 * 23.01.09 rs; pridane displayHelp; zrusenie setValuesX()
 * 21.01.09 rs; cestu pre s.gif menit len vtedy. ak uz nebola dopredu zmenena
 * 15.01.09 rs; doplnenie tretieho parametra pParams + novy system zadavania prametrov via fillInParams
 * 28.10.08 rs; zmena adresara pre s.gif na extjs22
 * 24.07.08 rs; pridany i3.ui.GridRowChecker - alternativa CheckboxSelectionModel-u zatial experimentalne
 * 24.07.08 rs; doplnene CsGridPanel, CsWindow
 * 04.06.08 rs;
 */
/*global Ext,window,alert,document,i3,epca */
Ext.ns('i3.ui');
// zakladne texty, ktore sa typicky opakuju na roznych miestach
// patria sem len texty, ktore maju pomerne jednoznacny preklad a nema ich vyznam
// individualne upravovat (napr. pre instituciu XY)
// t.j. netreba sem toho davat nasilu privela, ale zasa je zbytocne aby sa slovo Help
// prekladalo na 20-tich miestach
i3.tx = {
    txHelp: 'Pomoc#Nápověda#Help###مساعدة'.ls(),
    txError: 'Chyba#Chyba#Error###خطأ'.ls(),
    txSearch: 'Vyhľadať#Vyhledat#Search###بحث'.ls(),
    txSave: 'Uložiť#Uložit#Save###حفظ'.ls(),
    txNew: 'Nový#Nový#New###جديد'.ls(),
    txNoRecordFound: 'Nebol nájdený žiadny záznam.#Nebyl nalezen žádný záznam.#No record found.###'.ls(),
    txBrowse: 'Listovať#Listovat#Browse###تصفح'.ls(),
    txASCII: 'ASCII#ASCII#ASCII###ASCII'.ls(),
    txCancel: 'Zrušiť#Zrušit#Cancel###إلغاء'.ls(),
    txInformation: 'Informácia#Informace#Information###معلومات'.ls(),
    txInfo: 'Info#Info#Info###معلومات'.ls(),
    txMessage: 'Správa#Správa#Message###رسالة'.ls(),
    txRecord: 'Záznam#Záznam#Record###سجل'.ls(),
    txVTypePwDflt: ('Heslo musí mať aspon 7 znakov a musí obsahovať aspon jedno číslo alebo špeciálny znak (!@$%^&*()-_=+).##' + 'Passwords must be at least 7 characters, containing either a number, or a valid special character (!@$%^&*()-_=+)###يجب أن تتكون كلمة المرور من 7 حروف على الأقل، بحيث تتضمن عددا أو حرفا مميزا صالح الاستعمال مثل  (!@$%^&*()-_=+))').ls(),
    txVTypePwNoMatch: 'Pole "Opakovanie hesla" sa nezhoduje s poľom "Heslo".##Confirmation does not match your initial password entry.###التأكيد لا يتوافق مع كلمة المرور المدخلة أولا.'.ls(),
    txLogout: 'Odhlásiť#Odhlásit#Logout###الخروج'.ls(),
    txVTypeNoNewLines: 'Znak nového riadka nie je povolený.#Znak nového řádku není povolen.#No newline character allowed.###حرف سطر جديد غير مسموح'.ls(),
    txReadOnly: 'Len čítanie#Pouze pro čtení#Read only###مقروء فقط'.ls(),
    txYes: 'Áno#Ano#Yes###نعم'.ls(),
    txNo: 'Nie#Ne#No###لا'.ls(),
    txOK: 'OK#OK#OK###موافق'.ls(),
    txDisplayFmtFailed: 'Požadavok na zobrazovací formát zlyhal: #Požadavek na zobrazovací formát selhal: #Display format request failed: ###فشل طلب صيغة العرض: '.ls(),
    txVersion: 'Verze#Verze#Version###إصدارة'.ls(),
    txAbout: "<br><br><div style='background-color:white;padding:5px;width:300px;min-height:100px;'><img height='95' width='300' src='//www.cosmotron.cz/skins/cosmotron_cz/img/logo.jpg' alt='Logo'><br><br><a target='_blank' rel='external' href='http://www.cosmotron.cz/'>© Cosmotron Slovakia & Bohemia</a></div>",
    txDateZeroText: 'Rok 0 nie je platný.#Rok 0 není platný.#Year 0 is not valid.'.ls(),
    txVTypePhoneNumber: 'Telefónne číslo nie je platné.#Telefonní číslo není platné.#Phone number is not valid.'.ls()
};
Ext.form.VTypes.emailText = 'Pole by malo obsahovať emailovú adresu v tvare meno@domena.xy.#Pole by mělo obsahovat emailovou adresu ve tvaru jmeno@domena.cz.#This field should be an e-mail address in the format "user@domain.com"###يجب أن يكون هذا الحقل عنوان بريد إلكتروني بصيغة "user@domain.com"'.ls();
Ext.form.VTypes.urlText = 'Pole by malo obsahovať URL v tvare "http://www.example.com".#Pole by mělo obsahovat URL ve tvaru "http://www.example.com".#This field should be a URL in the format "http://www.example.com"'.ls();
/**
 * @class i3.ui
 * @singleton
 *
 * Instant message
 * Niekolko variant metody na zobrazenie sprav.
 */
Ext.apply(i3.ui, function() {
    // private variables
    var msgCt;
    // DOM element for quick messages (i3.msg())
    // object to be applied to i3
    return {
        // funkcia, ktora vrati funkciu na jednoduchu konstrukciu id elementov s prefixom
        // viz. napr okno Microedit
        getIdPrefFn: function(idpref) {
            // idbase je zaklad id-cka
            // pouzitie napr.:
            //   var idpref=i3.getIdPrefFn(config.idpref);
            //   ...
            //   { ..., id:idpref('xy'), ...}
            //
            return function(idbase) {
                return idpref + '_' + idbase;
            };
        }, // toto je alternativna verzia k getIdPrefFn
        // pre pripady, ked nie je vyhodne pouzit makro getIdPrefFn()
        //,getPrefId: function(idpref,idbase) {
        //   return idpref+'_'+idbase;
        //}
        // toto je detto to same, makro na ziskanie objektu komponenty, pricom posielame zaklad mena
        // a automaticky sa pridava prefix
        getCmpFn: function(idpref) {
            return function(idbase) {
                return Ext.getCmp(idpref + '_' + idbase);
            };
        },
        /**
         * Vrati prefix id prc vybrany collector
         * @param {String} psPrefix defaultni prefix
         * @param {String} psItemID id jednoho prvku na panelu (pokud na danem panelu neni zadny prvek s ID, neni toto potreba vubec volat)
         *
         * 24.01.14 on;
         */
        csGetIdPrefix: function(psPrefix, psItemID) {
            // bude v cyklu hledat s ruznymi prefix komponentu a kdyz ju nenajde, vrati prefix
            var c,
                bFound = false,
                i = 1;
            while (!bFound) {
                c = Ext.getCmp(psPrefix + i + '_' + psItemID);
                if (!c) {
                    bFound = true;
                    return psPrefix + i;
                }
                i++;
            }
            // sem se nikdy nedostanu
            return psPrefix;
        },
        /** instantna hlaska na vrchu okna browsera
         * prebrane a prisposobene podla jsext/examples/examples.js
         *
         *  @param {String} pId  pokud je uveden, okno se zavre az provolanim i3.msgOff(), pouziti pres i3.msgON() a i3.msgOff()
         *  @param {Boolean} pbShowImmediately moznost zobrazit dialog bez animace (nasunovani) // 14.01.16 on;
         *
         *  Priklad:
         *  i3.msg('sprava');
         *  i3.msg('titulok','sprava');
         *  i3.msg('titulok','sprava %s xxxx %s',['A','BB']);
         *
         *  07.04.17 on; moznost nastavit cas
         *  07.03.13 jk; doplnen pId, pokud je vyplnen okno se nezavre, zalozeno i3.msgOn a i3.msgOff
         *  15.01.09 rs; doplnenie tretieho parametra pParams + novy system zadavania prametrov via fillInParams
         */
        msg: function(pTitle, pFormat, pParams, pId, pbShowImmediately, pbShowIcon, pnTimeout) {
            pId = pId || '';

            function createBox(pMsgTitle, pMsgText, pbShowIcon) {
                var s = '';
                // 05.04.16 on; moznost zobrazit ikonu
                if (pbShowIcon) {
                    s = '<img src="../images/loading.gif" style="margin-right: 4px">';
                }
                return ['<div class="msg">', '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>', //
                    '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', pMsgTitle, '</h3>', s + pMsgText, '</div></div></div>', '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>', '</div>'
                ].join('');
            }
            if (!msgCt) {
                msgCt = Ext.DomHelper.insertFirst(document.body, {
                    id: 'msg-div'
                }, true);
            }
            msgCt.alignTo(document, 't-t');
            var sMsgText;
            // umoznime zadat prazdny titulok (vtedy sa vyplni len prvy parameter)
            if (pFormat === undefined) {
                sMsgText = pTitle;
                pTitle = '';
            } else {
                // toto je povodny kod z example z Extu, pre nase potreby ale aspon zatial bude vyhodnejsie pozuit
                // i3.fillInParams
                //
                // /// divocinka
                // /// slice spravi pole z parametrov s vynimkou prveho parametra (titulok okna)
                // //sMsgText=String.format.apply(String, Array.prototype.slice.call(arguments, 1));
                // upravena verzia na system parametrov pouzivany v IS_RETURN_CODE
                if (!pParams) {
                    sMsgText = pFormat;
                } // nie su parametre
                else {
                    sMsgText = i3.fillInParams(pFormat, pParams);
                }
            }
            var m;
            if (pId !== '') {
                m = Ext.DomHelper.append(msgCt, {
                    id: pId,
                    html: createBox(pTitle, sMsgText, pbShowIcon)
                }, true);
            } else {
                m = Ext.DomHelper.append(msgCt, {
                    html: createBox(pTitle, sMsgText, pbShowIcon)
                }, true);
            }
            // niekedy sa stava akoby sa msg. nezobrazil; vtedy mozeme odkomentovat
            // nasledovny ladiaci riadok
            //if (console) {   console.log('i3.msg: ' + pTitle + ' ' + sMsgText);    }
            if (pId === '') {
                // 07.04.17 on; moznost nastavit dobu zobrazeni pnTimeout
                // 14.01.16 on; moznost zobrazit dialog bez animace (nasunovani)
                // 08.04.15 on; vracen interval na 2
                // 27.02.14 on; zkracen interval zobrazeni zpravy z 2 na 1
                var nTime = pnTimeout || 2;
                if (pbShowImmediately) {
                    m.show().pause(nTime).ghost("t", {
                        remove: true
                    });
                } else {
                    m.slideIn('t').pause(nTime).ghost("t", {
                        remove: true
                    });
                }
            }
        },
        /**
         * Instatna hlaska na vrcho okna prohlizece, ktera sama nezmizi, az porovolanim i3.msgOff.
         * Viz. i3.msg() a i3.msgOff
         *
         * 07.03.13 jk; zalozeno
         */
        msgOn: function(pTitle, pFormat, pParams, pId, pbShowIcon) {
            // 11.10.23 on; pokud je zprava uz zobrazena, nebud zobrazovat znova
            var m;
            if (!i3.isEmptyString(pId)) {
                m = Ext.get(pId);
                if (m) {
                    return;
                }
            }
            i3.msg(pTitle, pFormat, pParams, pId, undefined, pbShowIcon);
        },
        /**
         * Uzavreni instatna hlasky na vrcho okna prohlizece.
         * Viz. i3.msgOn()
         *
         * 07.01.13 jk; zalozeno
         */
        msgOff: function(id) {
            var m = Ext.get(id);
            // 18.02.16 on; podminka, pokud se uz skryva, nebudu to volat podruhe
            if (m && !m.csSlideOut) {
                m.csSlideOut = true;
                m.slideOut('t', {
                    remove: true
                });
            }
        },
        /**
         * just a shortcut
         * dalej oproti Ext-u povolime prazdny titulok.
         * Takze ak sa uvedie len jeden param, sprava bude mat defaultny titulok a prvy param bude text
         * Dalej je podporovany treti parameter pole parametrov. Toto je vyhodne hlavne pre prekladane stringy.
         *
         *
         * 15.01.09 rs; doplnenie tretieho parametra pParams + novy system zadavania prametrov via fillInParams
         *
         * @param {Object} pTitle
         * @param {Object} pFormat
         * @param {Object} pParams
         */
        alert: function(pTitle, pFormat, pParams) {
            // riesenia nezadania druheho parametra )v tom pripade titulok okna je defaultny a prvy parameter
            // ide ako text spravy
            if (pFormat === undefined) {
                pFormat = pTitle;
                // 15.05.14 on; preklad
                pTitle = i3.tx.txInfo;
            }
            var sMsgText;
            // upravena verzia na system parametrov pouzivany v IS_RETURN_CODE
            if (!pParams) {
                sMsgText = pFormat;
            } // nie su parametre
            else {
                sMsgText = i3.fillInParams(pFormat, pParams);
            }
            // 02.07.19 on; sirka zobrazovaneho dialogu
            Ext.Msg.maxWidth = 600;
            // default
            if (Ext.Msg.maxWidth > Ext.getBody().getViewSize().width) {
                Ext.Msg.maxWidth = Ext.getBody().getViewSize().width - 10;
                if (Ext.Msg.maxWidth < 100) { // pojistka
                    Ext.Msg.maxWidth = 100;
                }
            }
            Ext.Msg.alert(pTitle, sMsgText);
        },
        /**
         * Hlasenie internej chyby. Natvrdo cez alert, aby bolo synchronne.
         * Pre hlasenie int.chyb nie je vhodne pouzit i3.alert, pretoze je async a program za nim pokracuje.
         *
         * @param {Object} pFormat
         * @param {Object} pParams
         */
        intError: function(pFormat, pParams) {
            var sMsgText;
            if (!pParams) {
                sMsgText = pFormat;
            } // nie su parametre
            else {
                sMsgText = i3.fillInParams(pFormat, pParams);
            }
            var s = sMsgText.toLowerCase();
            if (s.indexOf('internal e') < 0) {
                sMsgText = 'Internal error: ' + sMsgText;
            }
            alert(sMsgText);
        },
        /**
         * Zobrazenie okienka s chybou
         *
         * @param {Object} pErrorTx
         */
        displayError: function(pErrorTx, pParams) {
            i3.alert(i3.tx.txError, pErrorTx, pParams);
        },
        /**
         * Zobrazenie okienka s napovedou
         * neskor sa mozu dorobit dalsie funkcie, scrolovanie atd.
         * zatial takto jednoducho
         *
         * @param {Object} pHelpTx
         */
        displayHelp: function(pHelpTx) {
            i3.alert(i3.tx.txHelp, pHelpTx);
        },
        /**
         * Zobrazeni HTML stringu v iframe
         *
         * 02.09.14 on;
         *
         * @param {String} psHtml html string
         * @param {Object} poParams parametry okna
         */
        displayHTMLInIframe: function(psHtml, poParams) {
            poParams = poParams || {};
            var w = new Ext.Window({
                title: poParams.csTitle,
                width: poParams.csWidth || 640,
                height: poParams.csHeight || 100,
                layout: 'form',
                items: [{
                    xtype: 'component',
                    id: 'ifrejm',
                    autoEl: {
                        tag: 'iframe',
                        height: '100%',
                        width: '100%',
                        border: '0',
                        frameborder: '0'
                    },
                    listeners: {
                        render: function(c) {
                            c.getEl().on({
                                load: function() {
                                    w.show();
                                    // posune okno nahoru
                                    var a = w.getPosition();
                                    w.setPosition(a[0], 60);
                                    // Odkaz na dokument v  iframe
                                    var D = document.getElementById('ifrejm').contentWindow.document;
                                    // Výška dokumentu v iframe (v různých prohlížečích - vyberu největší hodnotu)
                                    var heightDI = Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight);
                                    // Přidáme 20 pixelů pro nezobrazení vertikální lišty
                                    heightDI = (heightDI + 20);
                                    // Přidáme pixely pro tlacitko OK
                                    heightDI = (heightDI + 50);
                                    // Předáme výšku IFRAME značce
                                    //document.getElementById('ifrejm').style.height = (heightDI + 'px');
                                    w.setHeight(heightDI);
                                    // Zrušíme neviditelnost značky IFRAME
                                    //document.getElementById('ifrejm').style.visibility = "visible";
                                    // Schováme hlášku či ikonku o načítání stránky.
                                    //document.getElementById('loading').style.display = "none";
                                }
                            });
                        }
                    }
                }],
                buttons: [{
                    text: i3.tx.txOK,
                    handler: function() {
                        w.close();
                    }
                }],
                listeners: {
                    // 23.10.14 on; moznost nastavit callback
                    close: function() {
                        if (poParams && poParams.csCallback) {
                            poParams.csCallback.call(poParams.csScope || this);
                        }
                    }
                }
            });
            // divne
            w.show();
            w.hide();
            //var doc = w.items.items[0].getEl().dom.contentWindow.document;
            var doc = document.getElementById('ifrejm').contentWindow.document;
            doc.open();
            doc.write(psHtml);
            doc.close();
        },
        /**
         * Viz i3.ui.ColWin.csOpenColWin
         */
        csOpenColWin: function() {
            alert('i3.ui.csOpenColWin: abstract definition');
            // funkcia by neskor mala byt redefinovana
        },
        /**
         * Viz i3.ui.ColWin.csOpenDataWin
         */
        csOpenDataWin: function() {
            alert('i3.ui.csOpenDataWin: abstract definition');
            // funkcia by neskor mala byt redefinovana
        },
        /**
         * Zobrazeni About okna s cislem verze.
         *
         * 10.09.15 on; moznost zadat verzi v parametru
         * 23.09.13 on;
         */
        csShowAbout: function(psVersion) {
            Ext.Msg.show({
                title: Ext.get('meta-description').getAttribute('data-name'),
                msg: Ext.get('about-app').dom.innerHTML,
                buttons: Ext.Msg.OK,
                width: 340
            });
        },
        /**
         * Prida odkaz "domcek" na domovsku i3 aplikaciu (home) ak existuje aj domovska /i2 stranka
         *
         * 24.01.20 lo; request na subor home.json, kvoli tomu ze na IIS .js subor hadzal chybu 406
         * 16.11.18 lo; odkaz na domovsku stranku i3 aplikacii (ikona "domcek")
         */
        csHomeAppLink: function() {
            var i3AliasMatch = window.location.href.toLowerCase().match(/\/i3([a-z]\/)/);
            // 24.01.20 lo; request na subor home.json, kvoli tomu ze na IIS .js subor hadzal chybu 406
            // 03.07.19 on; kdyz je i3AliasMatch null, tak to tady pada
            //var i3Alias = i3AliasMatch[0] || '/i3/';
            var i3Alias = i3AliasMatch ? i3AliasMatch[0] : '/i3/';
            Ext.Ajax.request({
                url: window.location.origin + i3Alias + '/home/home.json?ictx=' + i3.ictx.toLowerCase(),
                success: function(res) {
                    if (res.status == 200) {
                        var lang = i3.language || 1;
                        var urlString = window.location.origin;
                        urlString += i3Alias;
                        urlString += 'home/home.csp?ictx=' + i3.ictx.toLowerCase() + '&language=' + lang + '&_arlsso=' + encodeURIComponent(i3.WS.csSecurity.username) + '&_arlssopw=' + encodeURIComponent(i3.WS.csSecurity.arlsso);
                        Ext.DomHelper.append(Ext.getBody(), {
                            tag: 'a',
                            id: 'home-app-link',
                            cls: 'icon-home',
                            href: urlString
                        });
                    }
                }
            });
        }
    };
    // return
}());
// toto je trocha nestastne - skopirovanie funkcii z package ui do
// i3, kvoli spatnej kompatibilite
// v tomto subore mi nejde pridavat info do baiika i3 napriamo, kvoli generovanej dokumentaci
Ext.apply(i3, {
    getIdPrefFn: i3.ui.getIdPrefFn,
    getCmpFn: i3.ui.getCmpFn,
    msg: i3.ui.msg,
    msgOn: i3.ui.msgOn,
    msgOff: i3.ui.msgOff,
    alert: i3.ui.alert,
    intError: i3.ui.intError,
    displayHelp: i3.ui.displayHelp,
    displayError: i3.ui.displayError,
    displayHTMLInIframe: i3.ui.displayHTMLInIframe
});
Ext.ns('i3.ui');
Ext.apply(i3.ui, {
    /**
     Jednoduche makro na nastavenie stavu enabled/disabled
     * s kontrolou na aktualny stav
     *
     * Pravdepodobne duplikuje existujucu Ext funkciu "setDisabled" (preverit).
     *
     * @param {Object} pComp
     * @param {Object} pEnabled
     *
     */
    compSetEnabledState: function(pComp, pEnabled) {
        var curr = !pComp.disabled;
        if (curr === pEnabled) {
            return;
        }
        if (pEnabled) {
            pComp.enable();
        } else {
            pComp.disable();
        }
    },
    /**
     * Jednoduche makro na najdenie, pripadne vytvorenie okna, ktore
     * sa instancuje len 1x. Teda ma napevno urcene 'id' okna a 'idpref'.
     *
     * @param {String} pPrefix       idpref okna a zaroven id okna
     * @param {Function} PConstructor  konstuktor okna
     * @param {Object} config inicializacni konfigurace
     *
     */
    getSingleWin: function(pPrefix, PConstructor, config) {
        var fp = Ext.getCmp(pPrefix);
        if (!fp) {
            // 11.11.13 on; config
            //fp = new PConstructor({
            //  idpref : pPrefix + '_'
            //});
            config = config || {};
            Ext.apply(config, {
                idpref: pPrefix + '_'
            });
            fp = new PConstructor(config);
        }
        return fp;
    }
});
/**
 * @class i3.ui.TextareaNoWrap
 * Komponenta memo bez zalamovania textu.
 */
i3.ui.TextareaNoWrap = Ext.extend(Ext.form.TextArea, {
    // zial to takto lahko nejde, pretoze v originalnom textarea
    // sa cele defaultAutoCreate prepraskava
    //
    //onRender : function(ct, position){
    //    i3.ui.TextareaNoWrap.superclass.onRender.call(this, ct, position);
    //    if (!this.el) { this.defaultAutoCreate.wrap="off"; }
    //}
    // private
    // KOPIA 1:1 z Ext.form.TextArea.onRender s doplnenim jedneho riadka "wrap:off"
    onRender: function(ct, position) {
        if (!this.el) {
            this.defaultAutoCreate = {
                tag: "textarea",
                style: "width:100px;height:60px;",
                autocomplete: "off",
                wrap: "off" // 17.06.08 rs
            };
        }
        // tu nevolame onRender naseho predchodcu, ale predchodcu predchodcu
        // prave zdedeny onRender potrebujeme preskocit
        Ext.form.TextArea.superclass.onRender.call(this, ct, position);
        if (this.grow) {
            this.textSizeEl = Ext.DomHelper.append(document.body, {
                tag: "pre",
                cls: "x-form-grow-sizer"
            });
            if (this.preventScrollbars) {
                this.el.setStyle("overflow", "hidden");
            }
            this.el.setHeight(this.growMin);
        }
    }
});
Ext.reg('cs_textarea_nw', i3.ui.TextareaNoWrap);
/**
 * @class i3.ui.DateField
 * Zatial v podstate kopia datoveho policka, s niekolkymi defaultami vhodnymi pre nasu app.
 * Neskor bude treba vylepsit, napr. aby sa format mohol zadavat v tvare dd.mm.yyyy,
 * ale vnutri sa cital v internom tvare YYYYMMDD. Pre kratkost casu som to zatial neriesil.
 *
 * Aktualne nepovoli datumy v tvare YYYY alebo YYYYMM
 *
 * Detto vazba na cz/sk kalendar.
 */
i3.ui.DateField = Ext.extend(Ext.form.DateField, {
    /** constructor: zadanie defaultov
     *
     * @param {Object} config
     */
    constructor: function(config) {
        config = config || {};
        Ext.applyIf(config, {
            width: 90,
            // 18.02.13 on; predelane, aby se zobrazoval datum v eu formatu
            //format : i3.c.dateFmtInt,
            format: i3.c.dateFmtEu,
            //altFormats : i3.c.dateFmtEu
            altFormats: i3.c.dateFmtInt
        });
        i3.ui.DateField.superclass.constructor.call(this, config);
    },
    /**
     * Upravena verzia, ktora vracia datum v nastavenom formate
     * Normalne getValue() vracia typ 'Date' (coz sa niekedy nehodi)
     *
     * 13.05.09 rs;
     */
    getValue: function() {
        var dt = i3.ui.DateField.superclass.getValue.call(this);
        if (!dt) {
            // prazdny datum
            return '';
        }
        // 18.02.13 on; potrebuju datum v internim formatu
        //return dt.format(this.format);
        return dt.format(i3.c.dateFmtInt);
    },
    /**
     * Toto je len velmi priamo prebrane a upravene, aby picker dostat datovy typ date,
     * ale vsetci iny string.
     *
     * Problem je v tom, ze dynform potrebuje aby getValue vracalo string
     * u Datefieldu ale vracia Date, s cim picker pocita.
     *
     * T.j. je to zamotane
     *
     * 05.05.11 on; uprava kvuli kompatibilite s ext 331
     * 18.06.09 rs
     *
     */
    onTriggerClick: function() {
        if (this.disabled) {
            return;
        }
        // oprava 29.06.09 rs: povodne bolo "this.menu==null" coz fungovalo aj na undefined
        // ale po oprave na "===" pre jslint prestalo brat undefined a zacalo padat..
        if (!this.menu) {
            this.menu = new Ext.menu.DateMenu({
                hideOnClick: false,
                focusOnSelect: false
            });
        }
        this.onFocus();
        Ext.apply(this.menu.picker, {
            minDate: this.minValue,
            maxDate: this.maxValue,
            disabledDatesRE: this.disabledDatesRE,
            disabledDatesText: this.disabledDatesText,
            disabledDays: this.disabledDays,
            disabledDaysText: this.disabledDaysText,
            format: this.format,
            showToday: this.showToday,
            startDay: this.startDay,
            minText: String.format(this.minText, this.formatDate(this.minValue)),
            maxText: String.format(this.maxText, this.formatDate(this.maxValue))
        });
        var dtDT = this.parseDate(this.getValue());
        this.menu.picker.setValue(dtDT || new Date());
        this.menu.show(this.el, "tl-bl?");
        this.menuEvents('on');
    },
    validate: function() {
        var bRes = i3.ui.DateField.superclass.validate.call(this);
        if (bRes) {
            // 14.09.15 on; rok "0" neexistuje
            var s = this.getValue();
            if (s.substring(0, 4) === '0000') {
                this.markInvalid(i3.tx.txDateZeroText);
                return false;
            }
        }
        return bRes;
    }
});
Ext.reg('cs_datefield', i3.ui.DateField);
/**
 * @class i3.ui.DateField2
 * Upravene standardne textove policko, bez menu na vyber datumov.
 * Umoznuje vstup datumu v tvare DD.MM.YYYY/d.m.yyyy alevo YYYYMMDD
 * Datum sa pri blur preformatuje na interny format YYYYMMDD.
 * Dalsie pripustne formaty: YYYY, YYYYMM a -YYYY a -YYYYMM
 *
 * Naobsahuje menu na vyber datumu - neskor by sa dalo doplnit.
 *
 * @param {Object} config
 *
 * 06.12.19 on; podpora mezer ve vstupnim datumu (d. m. rrrr)
 */
i3.ui.DateField2 = Ext.extend(Ext.form.TextField, {
    constructor: function(config) {
        config = config || {};
        Ext.applyIf(config, {
            width: 90,
            listeners: {
                blur: {
                    fn: function(f) {
                        var dt,
                            s1,
                            s = f.getValue();
                        // 06.12.19 on; zrusi mezery uvnitr datumu
                        s = s.strswap(' ', '');
                        // 06.08.15 on; podpora zapornych datumu
                        var bMinus = false;
                        if (s.substring(0, 1) === '-') {
                            bMinus = true;
                            s = s.substring(1);
                        }
                        // 12.04.16 on; podpora ISO 8601 YYYY-MM a YYYY-MM-DD
                        if (this.csAcceptIsoFmt) {
                            s1 = '';
                            if ((s.length === 10) && (s.substring(4, 5) === '-') && (s.substring(7, 8) === '-')) {
                                s1 = s.strswap('-', '');
                            }
                            if ((s.length === 7) && (s.substring(4, 5) === '-')) {
                                s1 = s.strswap('-', '');
                                s1 += '01';
                            }
                            dt = Date.parseDate(s1, 'Ymd');
                            if (dt) {
                                if (s1 === dt.format('Ymd')) {
                                    s = s.strswap('-', '');
                                    if (bMinus) {
                                        s = '-' + s;
                                    }
                                    f.setValue(s);
                                    return;
                                }
                            }
                        }
                        //i3.msg('received blur event val=' + s);
                        if (s.indexOf('.') > 0) {
                            var fm;
                            // 27.06.12 on; doplnen format dd.mm.rr  (j.n.y a d.m.y) a upravene poradi testovani datumu
                            // vo funkcii parseDate je jedna neprijemna vlastnost, ze povoli aj napr. mesiac 13
                            // pricom to spravi tak, ze zvysi rok o jedno. Toto ale nemusi byt zelane
                            // takze preverime, ze datum sa po parse+format nezmenil
                            fm = 'd.m.Y';
                            dt = Date.parseDate(s, fm);
                            if (!dt) {
                                fm = 'j.n.Y';
                                dt = Date.parseDate(s, fm);
                            }
                            if (!dt) {
                                fm = 'd.m.y';
                                dt = Date.parseDate(s, fm);
                            }
                            if (!dt) {
                                fm = 'j.n.y';
                                dt = Date.parseDate(s, fm);
                            }
                            s1 = dt.format(fm);
                            if (dt && (s1 === s)) {
                                s = dt.format('Ymd');
                                if (bMinus) {
                                    s = '-' + s;
                                }
                                f.setValue(s);
                            }
                        }
                    },
                    scope: this
                }
            }
        });
        i3.ui.DateField.superclass.constructor.call(this, config);
    },
    /**
     * Validacia datumu
     *
     * YYYY
     * YYYYMM
     * YYYYMMDD
     * d.m.YYYY
     * dd.mm.YYYY
     * pripadne s minus na zaciatku
     *
     * 16.09.09 rs; zmena testu na isInteger
     *
     * @param {Object} s
     */
    validator: function(s) {
        // 02.02.10 on; pokud je retezec prazdny, nebude nic validovat a vrati ok (kvuli prechodu na ext 3.1)
        if (s === '') {
            return true;
        }
        //var bMinus = false;
        if (s.substring(0, 1) === '-') {
            //bMinus = true;
            s = s.substring(1, s.length);
        }
        // 16.09.09 rs; zmena testu na isInteger
        if (i3.isInteger(s)) {
            // 14.09.15 on; rok "0" neexistuje
            if (s.substring(0, 4) === '0000') {
                return false;
            }
            if (s.length === 4) {
                s += '01';
            }
            if (s.length === 6) {
                s += '01';
            }
        }
        // 12.04.16 on; podpora ISO 8601 YYYY-MM a YYYY-MM-DD
        if (this.csAcceptIsoFmt) {
            if ((s.length === 10) && (s.substring(4, 5) === '-') && (s.substring(7, 8) === '-')) {
                s = s.strswap('-', '');
            }
            if ((s.length === 7) && (s.substring(4, 5) === '-')) {
                s = s.strswap('-', '');
                s += '01';
            }
        }
        // teraz by sa to malo zvalidovat na datum
        // 'j' je 'd' bez leading zeros
        // 'n' je 'm'  dtto
        var dt = Date.parseDate(s, 'Ymd');
        var s1,
            fm;
        if (dt) {
            return s === dt.format('Ymd');
        }
        // vo funkcii parseDate je jedna neprijemna vlastnost, ze povoli aj napr. mesiac 13
        // pricom to spravi tak, ze zvysi rok o jedno. Toto ale nemusi byt zelane
        // takze preverime, ze datum sa po parse+format nezmenil
        fm = 'd.m.Y';
        dt = Date.parseDate(s, fm);
        if (dt) {
            s1 = dt.format(fm);
            return s === s1;
        }
        fm = 'j.n.Y';
        dt = Date.parseDate(s, fm);
        if (dt) {
            s1 = dt.format(fm);
            return s === s1;
        }
        return false;
    }
});
Ext.reg('cs_datefield2', i3.ui.DateField2);
// derived from http://extjs.com/forum/showthread.php?p=146457
// plugin by Animal
/*
i3.ui.GridRowChecker = Ext.extend(Object, {
//header: "",
width: 23,
sortable: false,
fixed: true,
menuDisabled: true,
dataIndex: '',
id: 'selection-checkbox',
rowspan: undefined,

init: function(grid){
this.grid = grid;
this.gridSelModel = this.grid.getSelectionModel();
this.gridSelModel.originalMouseDown = this.gridSelModel.handleMouseDown;
this.gridSelModel.handleMouseDown = this.onGridMouseDown;

// unshift vklada prvok na zaciatok pola (vraj nefunguje dobre pod IE <5.5)
grid.getColumnModel().config.unshift(this);
grid.getChecked = this.getChecked.createDelegate(this);
grid.checkAll = this.checkAll.createDelegate(this);
grid.uncheckAll = this.uncheckAll.createDelegate(this);
},

renderer: function(){
return '<input class="x-row-checkbox" type="checkbox">';
},

getChecked: function(){
var result = [];
var cb = this.grid.getEl().query("div.x-grid3-col-selection-checkbox > input[type=checkbox]");
var idx = 0;
this.grid.store.each(function(rec){
if (cb[idx++].checked) {
result.push(rec);
}
});
//delete cb; // jslint-u toto vadi (zrejme chybka)
return result;
},

checkAll: function(){
this.grid.getEl().select("div.x-grid3-col-selection-checkbox > input[type='checkbox']").each(function(e){
e.dom.checked = true;
});
},

uncheckAll: function(){
this.grid.getEl().select("div.x-grid3-col-selection-checkbox > input[type='checkbox']").each(function(e){
e.dom.checked = false;
});
},

onGridMouseDown: function(g, rowIndex, e){
if (e.getTarget('div.x-grid3-col-selection-checkbox')) {
e.stopEvent();
return false;
}
this.originalMouseDown.apply(this, arguments);
}
});
*/
//
/**
 * @class i3.ui.ComboboxST
 * Jednoduche combo s nacitanim hodnot a validaciou zo statickej tabulky.
 *
 *  csStatTableN      - nazov statickej tabulky s obsahom comboboxu
 *  csDisplayID       - sposob zobrazenia kodov (id) - zatial exterimentalne 0/1/2
 *                      0=nezobrazit id; 1=zobrazit na zacatku; 2=zobrazit na konci
 *                      parameter sa len forwardne pouzitemu store
 *                      t.j. pokial si volajuci vytvara store rucne, musi parameter
 *                      zadat priamo vytvorenemu store - inak nebude mat ucinok
 *  csData            - '0' nebo '1' zda naplni i polozku Data v store, obsahem celych radku zaznamu
 *  ///zrusene//csQTip- ci zobrazit cely text v qtipe - zatial funguje len vo vazbe na csDisplayID
 *
 *  csAutoSelectFirst - ci po obdrzani dat automaticky nastavit prvy hodnotu z dat
 *                      (vhodne napr. pre combo so zoznamom indexov, kde prvy je default)
 *  csHideNotFoundWarning - neozbrazi varovani, ze ciselnik nebyl nalezen (uplatni se jen pri csAutoSelectFirst)
 *  csTextField       - subtag, ze ktereho se nacte text zobrazeny v comboboxu (defaultne se pouzije 'b')
 *
 *  csValidate        - false/true (default true) - moznost zrusit validaci hodnotu podle ciselniku
 *  csDefault         - po nacteni ciselniku automaticky nastavit zadanou hodnotu
 *  csHideQtip        - skryje zobrazeni qtipu/tooltipu
 *  csDeduplicateID   - moznost pridat ke kodu polozky ciselniku odlisujici retezec (deduplikace kodu ciselniku) - pouzi to ve vystupech
 */
i3.ui.ComboboxST = Ext.extend(Ext.form.ComboBox, {
    constructor: function(config) {
        // pozrieme, ci zadana staticka tabulka uz bola instancovana ako store (via store manager)
        // ak bola len znovu pouzijeme existujuce store a negenerujeme nove
        var storeObj = Ext.StoreMgr.key(config.csStatTableN);
        var bCreated;
        if (!storeObj) {
            bCreated = true;
            // vytvarame nove store
            // treba si byt vedomy toho, ze data sa nacitaju async a teda nebudu hned k dispozicii
            // eventualne by sa mozno dala urobit varianta, ze data nacitame "nejako" dopredu
            // a pri vytvarani comba ich "podstrcime" viz. i3.WS.sTablesdCacheInit()
            storeObj = new i3.WS.StoreST({
                csStatTableN: config.csStatTableN,
                // 07.10.22 on; je pouzit sufix pobocky?
                csBranchSufix: config.csBranchSufix,
                autoLoad: true, // kvoli validacii nechame autoload
                csDisplayID: config.csDisplayID || 0,
                // 06.05.11 jk; rozsireno o plneni data
                csData: config.csData || 0,
                // 04.10.11 on; moznost nastavit subtag pro zobrazeni textu v comboboxu
                csTextField: config.csTextField,
                // 03.06.22 on; moznost nezobrazit chybovou zpravu, kdyz se zaznam nenajde - pouzito pri nacteni ciselniku comboboxu
                csNoErrMsg: config.csNoErrMsg,
                // 01.11.22 on; moznost pridat ke kodu polozky ciselniku odlisujici retezec (deduplikace kodu ciselniku)
                csDeduplicateID: config.csDeduplicateID
            });
            storeObj.csIsLoaded = false;
            // 09.01.12 on;
        } else {
            bCreated = false;
            //i3.msg('existing store reused: ' + config.csStatTableN);
        }
        Ext.applyIf(config, {
            store: storeObj,
            lazyInit: true,
            displayField: 'text',
            valueField: 'id',
            // value field bude default neurceny, vtedy sa combo sprava ako naozaj "editable" t.j., to co je
            // zapisane vo fielde ma naozaj prioritu a zoznam hodnot je len ako pomocka
            //valueField: 'id',
            mode: 'local',
            editable: true,
            forceSelection: false,
            triggerAction: 'all',
            // 11.12.13 on; podpora pro vyhledavani zapisem do pole
            typeAhead: true,
            // 11.12.13 on; podpora pro vyhledavani zapisem do pole
            //minChars : 99, // toto je zatial ?docasne - deaktivuje auto reload po X znakoch
            minChars: 0,
            listeners: {
                /**
                 * funkcia blur
                 * pouzivame na detekciu vymazu pola, aby sa vymazala skryta kodovana hodnota
                 * ide o rucny vymaz obsahu pola
                 *
                 */
                blur: {
                    fn: function() {
                        // volame ale nie getValue comboboxu ale podriadenej funkcie - to je prave ten text,ktory
                        // v policku fyzicky zapisany - a ten ked je prazdny tak fyzicky pole vymazeme
                        // ak by sme pouzili getValue comba, vratilo by nam prave povodnu hodnotu, pred vymazom
                        // textu
                        var fldValue = Ext.form.ComboBox.superclass.getValue.call(this);
                        //console.log('blur value=' + fldValue);
                        if (i3.isEmptyString(fldValue)) { // pole je prazdne?
                            if (this.hiddenField) { // vsetko vymazat
                                //console.log('blur clearing fld');
                                this.hiddenField.value = '';
                            }
                            // 07.12.09 on; volat se musi metoda, jinak se vymaz pole neprojevi
                            //this.value = '';
                            this.setValue('');
                        }
                    },
                    scope: this
                },
                // 18.03.22 on; vyber polozky z nabidky - moznost zapisu do jinych podpoli zaznamu
                select: {
                    fn: function(cmp, record) {
                        var i,
                            fld,
                            flds,
                            src,
                            dest,
                            s1,
                            f = {},
                            sNS = config.csNS || 'a';
                        // pokud je vyplneny parametr csCBParams, budu dotahovat udaje i do dalsich poli
                        if (!i3.isEmptyString(cmp.csCBParams)) {
                            flds = cmp.csCBParams.split('|');
                            for (i = 0; i < flds.length; i++) {
                                fld = flds[i];
                                // ignoruju nastaveni OnlyNew
                                fld = fld.piece('-', 1);
                                // prvni znak je zdrojovy subtag
                                src = fld.substr(0, 1);
                                dest = fld.substr(1, 2);
                                s1 = i3.Marc.getSubTagStr(record.data.data, src);
                                // 23.08.23 on; pokud se dotahuje ze subtagu $b - vybere spravnou mutaci
                                if (!i3.isEmptyString(s1) && (src === 'b')) {
                                    s1 = s1.ls();
                                }
                                // reseni pro webcat
                                //config.csMainWin.csLinRecord[cmp.name.substring(0, 4) + dest] = s1;
                                f[cmp.name.substring(0, 4) + dest] = s1;
                            }
                            config.csMainWin.populate(f, sNS, 'field', {
                                setupAll: false
                            });
                        }
                    },
                    scope: this
                }
            }
        });
        // pokial je prazdny valuefield - nebudeme davat validaciu
        // 22.09.09 rs; prepisat validaciu, len ak nie je manualne prepisana v konfigu pola
        if (i3.isUnEmptyString(config.valueField) && (!config.validator)) {
            // dalo by sa prerobit na "vtype" - zvazit do buducna
            config.validator = this.csOnValidate;
        }
        // uzivatelske listenery
        //Ext.applyIf(config.listeners, {
        //   csDefault: {
        //      fn: function() {
        //        i3.msg('received csDefault event');
        //      }
        //      ,scope:this
        //   }
        // }
        //);
        // volitelne podla parametra "csDisplayID" nastavime zobrazenie aj kodovanej hodnoty,
        // neskor sa moze spravit niekolko variant
        //if (config.csDisplayID) {
        //var sQtipStr = config.csQTip ? 'ext:qtip="{text}" ' : '';
        if (!config.csHideQtip) {
            var sQtipStr = 'ext:qtip="{text}" ';
            Ext.applyIf(config, {
                tpl: '<tpl for=".">' + '<div ' + sQtipStr + 'class="x-combo-list-item">{text}</div>' + '</tpl>'
            });
        }
        //}
        //console.log('combo: tpl=' + config.tpl)
        // zavolame konstruktor predka
        i3.ui.ComboboxST.superclass.constructor.call(this, config);
        // a teraz postprocessing
        var thisCombo = this,
            scope;
        // mierna divocinka :)
        // pre store nastavime onload, ktory v okamihu dostupnosti dat nastavi do comba
        // prvu hodnotu z dat. Na jednoduchsiu variantu sa mi nepodarilo prist. Problem je, ze
        // data pridu async a neskor, nez sa konstruuje combo.
        if (config.csAutoSelectFirst) {
            // podminka rozsirena o storeObj.data.length=0
            // 09.01.12 on; rozsirena podminka - stale cekame na data
            if ((bCreated || !storeObj.csIsLoaded) && (storeObj.data.length === 0)) {
                // takze toto sa fyzicky vykona az "post", az ked prisli data
                storeObj.on('load', function() {
                    storeObj.csIsLoaded = true;
                    // 09.01.12 on;
                    var record = this.getAt(0);
                    // prva polozka z dat
                    //var c=getCmp('index');
                    //i3.msg('store '+config.csStatTableN+' onload');
                    //if (!thisCombo) {  i3.msg('Warning', 'index store onLoad - combo component not found?!'); }
                    // 17.07.12 on; moznost nezobrazovat varovani
                    // 08.02.12 on; pridane zobrazeni nazvu ciselniku
                    if ((!record) && (!config.csHideNotFoundWarning)) {
                        i3.msg('Warning', 'index store onLoad - record data missing (' + this.csStatTableN + ')');
                    }
                    if ((!record) || (thisCombo.getValue() !== '')) {
                        //return;
                    } else {
                        var val = record.data[thisCombo.valueField || thisCombo.displayField];
                        thisCombo.setValue(val);
                    }
                    // 17.07.12 on; moznost predat callback
                    if (config.csOnLoadCallBack) {
                        scope = config.csOnLoadScope || this;
                        // 02.11.16 on; doplneno predani storu (this) a comba
                        config.csOnLoadCallBack.call(scope, bCreated, this, thisCombo);
                    }
                }, storeObj);
            } else {
                // 10.08.11 on; osetrena situace, kdy je ciselnik pouzity vicekrat a dalsich komponent nedojde k eventu load
                var record = storeObj.getAt(0);
                // prva polozka z dat
                if (!record) {
                    // 17.07.12 on; moznost nezobrazovat varovani
                    if (!config.csHideNotFoundWarning) {
                        i3.msg('Warning', 'csAutoSelectFirst - record data missing (' + storeObj.csStatTableN + ')');
                    }
                } else {
                    if ((!record) || (thisCombo.getValue() !== '')) {
                        //return;
                    } else {
                        var val = record.data[thisCombo.valueField || thisCombo.displayField];
                        thisCombo.setValue(val);
                    }
                }
                // 17.07.12 on; callback se bude volat i pokud ciselnik uz byl nacten
                if (config.csOnLoadCallBack) {
                    scope = config.csOnLoadScope || this;
                    // 06.04.20 on; oprava predani store
                    // 02.11.16 on; doplneno predani storu (this) a comba (thisCombo)
                    //config.csOnLoadCallBack.call(scope, bCreated, this, thisCombo);
                    config.csOnLoadCallBack.call(scope, bCreated, storeObj, thisCombo);
                }
            }
        } else
            // 14.05.13 on; moznost zadat defaultni hodnotu pres csDefault
            if (!i3.isEmptyString(config.csDefault)) {
                // stale cekame na data
                if (bCreated || !storeObj.csIsLoaded) {
                    // takze toto sa fyzicky vykona az "post", az ked prisli data
                    storeObj.on('load', function() {
                        storeObj.csIsLoaded = true;
                        thisCombo.setValue(config.csDefault);
                        // 17.07.12 on; moznost predat callback
                        if (config.csOnLoadCallBack) {
                            scope = config.csOnLoadScope || this;
                            // 02.11.16 on; doplneno predani storu (this) a comba (thisCombo)
                            config.csOnLoadCallBack.call(scope, bCreated, this, thisCombo);
                        }
                    }, storeObj);
                } else {
                    // situace, kdy je ciselnik pouzity vicekrat a dalsich komponent nedojde k eventu load
                    thisCombo.setValue(config.csDefault);
                    // callback se bude volat i pokud ciselnik uz byl nacten
                    if (config.csOnLoadCallBack) {
                        scope = config.csOnLoadScope || this;
                        // 06.04.20 on; oprava predani store
                        // 02.11.16 on; doplneno predani storu (this) a comba (thisCombo)
                        //config.csOnLoadCallBack.call(scope, bCreated, this, thisCombo);
                        config.csOnLoadCallBack.call(scope, bCreated, storeObj, thisCombo);
                    }
                }
            } else {
                // 27.02.14 on; rozsirena podminka - kvuli holdingove obrazovce na SCD - preklad defaultnich hodnot na text
                //if (bCreated) {
                if (bCreated || !storeObj.csIsLoaded) {
                    // 19.03.12 on; snaha osetrit situaci, kdy ma prvek preddefinovanou hodnotu a ta se nastavi jeste pred nactenim store
                    // takze toto sa fyzicky vykona az "post", az ked prisli data
                    storeObj.on('load', function() {
                        storeObj.csIsLoaded = true;
                        if (thisCombo.getValue() !== '') {
                            thisCombo.setValue(thisCombo.getValue());
                        }
                        // 17.07.12 on; moznost predat callback
                        if (config.csOnLoadCallBack) {
                            scope = config.csOnLoadScope || this;
                            // 02.11.16 on; doplneno predani storu (this) a comba (thisCombo)
                            config.csOnLoadCallBack.call(scope, bCreated, this, thisCombo);
                        }
                    }, storeObj);
                } else {
                    // 17.07.12 on; callback se bude volat i pokud ciselnik uz byl nacten
                    if (config.csOnLoadCallBack) {
                        scope = config.csOnLoadScope || this;
                        // 06.04.20 on; oprava predani store
                        // 02.11.16 on; doplneno predani storu (this) a comba (thisCombo)
                        //config.csOnLoadCallBack.call(scope, bCreated, this, thisCombo);
                        config.csOnLoadCallBack.call(scope, bCreated, storeObj, thisCombo);
                    }
                }
            }
    },
    /**
     * 01.11.22 on; potreba odmazat odliseni duplicitnich radku na zacatku retezce, pokud je natavene
     * 
     * pbWithId - moznost vratit kod i s odlisovacem 
     */
    getValue: function(pbWithId) {
        var sValue;
        sValue = i3.ui.ComboboxST.superclass.getValue.call(this);
        // odmaze 3 znaky na zacataku, pokud se pridavaly  
        if (this.csDeduplicateID && !pbWithId) {
            sValue = sValue.substring(3);
        }
        return sValue;
    },
    /*
     * //KOPIA z ComboBox pre ucely ladenia, nic som realne nemenil//
     *
     * Sets the specified value into the field.  If the value finds a match, the corresponding record text
     * will be displayed in the field.
     *
     * If the value does not match the data value of an existing item,
     * and the valueNotFoundText config option is defined, it will be displayed as the default field text.
     *
     * Otherwise the field will be blank (although the value will still be set).
     *
     * @param {String} value The value to match
     */
    /*
    setValue: function(pValue){
    //console.log('i3.ui.ComboboxST.setValue: ' + this.name + '=' + pValue)

    var text = pValue;
    if (this.valueField) {
    var r = this.findRecord(this.valueField, pValue);
    if (r) {
    text = r.data[this.displayField];
    }
    else if (this.valueNotFoundText !== undefined) {
    text = this.valueNotFoundText;
    }
    }
    this.lastSelectionText = text;
    if (this.hiddenField) {
    this.hiddenField.value = pValue;
    }
    Ext.form.ComboBox.superclass.setValue.call(this, text);
    this.value = pValue;
    },
    */
    /**
     * Validacia oproti statickej tabulke
     *
     * @param {Object} fldValue
     */
    csOnValidate: function(fldValue) {
        var bRet = true;
        var csFindInArr = function(psValue, paArr) {
            var i;
            for (i = 0; i < paArr.length; i += 1) {
                if ((paArr[i][0] === psValue) || (paArr[i][1] === psValue)) {
                    return true;
                }
            }
            return false;
        };
        // 11.10.11 on; moznost zakazat validaci (POZOR muze byt undefined)
        if (this.csValidate === false) {
            return true;
        }
        // 02.02.10 on; pokud jde o prazdny retezec, validace ok a konec (kvuli extu 3.1)
        if (fldValue === '') {
            return true;
        }
        // 17.04.14 on; predelane, pri pouzivani autocomplete (typeAhead) se meni obsah store podle zadaneho retezcu, cos
        //              zpusobuje chybou validaci u jineho opakovani pole
        /*// if the store already has data - perform validation
        // else just respond with true (no real validation performed)
        // toto osetruje specialnu situaciu, ked sa do komba zapisuje hodnota z programu (zvycajne tesne po zobrazeni
        // komponenty a este nestihli async dorazit data)
        if (this.store && this.store.getCount()) {

        // 22.07.11 on; zapojeno findExact, protoze find hleda podretezec a kdyz byli v ciselniku sutazna kategoria a sutaz, tak to nefungovalo
        // Ext.data.Store.find(property,value,startIndex,anyMatch,caseSensitive)
        dataFld = this.valueField;
        //var recIx = this.store.find(dataFld, fldValue, 0, false, true);
        var recIx = this.store.findExact(dataFld, fldValue, 0);

        if (recIx < 0) {
        dataFld = this.displayField;
        //recIx = this.store.find(dataFld, fldValue, 0, false, true);
        recIx = this.store.findExact(dataFld, fldValue, 0);
        }

        //console.log('combo: searching by '+fldValue+' index='+recIx)
        bRet = recIx >= 0;

        // find najde aj podla starting with - tu preverime, ci je to "exact match"
        if (bRet) {
        var rec = this.store.getAt(recIx);
        var recVal = rec.get(dataFld);
        bRet = recVal === fldValue;
        }
        }
        //console.log('validating value=' + fldValue + ' ret=' + bRet);*/
        // toto osetruje specialnu situaciu, ked sa do komba zapisuje hodnota z programu (zvycajne tesne po zobrazeni
        // komponenty a este nestihli async dorazit data)
        if (this.store.reader.arrayData && (this.store.reader.arrayData.length > 0)) {
            bRet = csFindInArr(fldValue, this.store.reader.arrayData);
        }
        return bRet;
    },
    // 06.05.11 jk; pridana fce csGetRecord
    /**
     * Vraci cely prave vybrany record (obsahujici id,text nebo id,text,data)
     */
    csGetRecord: function() {
        var value = this.getValue();
        return this.findRecord(this.valueField || this.displayField, value);
    }
});
// zaregistrujeme pre lazy instantiation
Ext.reg('cs_combo_st', i3.ui.ComboboxST);
/**
 * @class i3.ui.ComboboxST2
 * Jednoduche combo s nacitanim hodnot bez validace.
 *
 *  csStatTableN      - nazov statickej tabulky s obsahom comboboxu
 *  csDisplayID       - sposob zobrazenia kodov (id) - zatial exterimentalne 0/1/2
 0=nezobrazit id; 1=zobrazit na zacatku; 2=zobrazit na konci
 *                      parameter sa len forwardne pouzitemu store
 *                      t.j. pokial si volajuci vytvara store rucne, musi parameter
 *                      zadat priamo vytvorenemu store - inak nebude mat ucinok
 *
 *  ///zrusene//csQTip- ci zobrazit cely text v qtipe - zatial funguje len vo vazbe na csDisplayID
 *
 *  csAutoSelectFirst - ci po obdrzani dat automaticky nastavit prvy hodnotu z dat
 *                      (vhodne napr. pre combo so zoznamom indexov, kde prvy je default)
 *  csHideNotFoundWarning - neozbrazi varovani, ze ciselnik nebyl nalezen (uplatni se jen pri csAutoSelectFirst)
 */
i3.ui.ComboboxST2 = Ext.extend(i3.ui.ComboboxST, {
    /**
     * Validacia oproti statickej tabulke
     *
     * @param {Object} fldValue
     */
    csOnValidate: function(fldValue) {
        var bRet = true,
            dataFld;
        // rozdil proti ComboboxST je validace i kdyz neexistuje ciselnik
        // pouzite v holdingove obrazovce
        //if (this.store && this.store.getCount()) {
        // Ext.data.Store.find(property,value,startIndex,anyMatch,caseSensitive)
        dataFld = this.valueField;
        var recIx = this.store.find(dataFld, fldValue, 0, false, true);
        if (recIx < 0) {
            dataFld = this.displayField;
            recIx = this.store.find(dataFld, fldValue, 0, false, true);
        }
        //console.log('combo: searching by '+fldValue+' index='+recIx)
        bRet = recIx >= 0;
        // find najde aj podla starting with - tu preverime, ci je to "exact match"
        if (bRet) {
            var rec = this.store.getAt(recIx);
            var recVal = rec.get(dataFld);
            bRet = recVal === fldValue;
        }
        //}
        //console.log('validating value=' + fldValue + ' ret=' + bRet);
        // pokud hodnota neni z ciselniku, zapise pomoci setValue
        if ((!bRet) && (this.getValue() !== fldValue)) {
            this.setValue(fldValue);
        }
        //return bRet;
        return true;
        // vrati vzdy true, aby se nezvyraznoval text v holdingove obrazovce
        // hodnotu bRet musi zjistit, aby mohl nastavit hodnotu, ktera neni v ciselniku
    }
});
// zaregistrujeme pre lazy instantiation
Ext.reg('cs_combo_st2', i3.ui.ComboboxST2);
// validuje i pokud neexistuje cislenik - pouzite v holdingove obrazovce
/*
* tento kod sa da pouzit na ladenie uvedenej metody (umozni lahko vlozit breakpoint)
*
Ext.override(Ext.form.TextField, {
setValue: function(v){
console.log('Ext.form.TextField.setValue: ' + this.name + '=' + v)

if (this.emptyText && this.el && v !== undefined && v !== null && v !== '') {
this.el.removeClass(this.emptyClass);
}
Ext.form.TextField.superclass.setValue.apply(this, arguments);
this.applyEmptyText();
this.autoSize();
}
});
*/
/**
 * @class Ext.form.VTypes
 * Rozsirenie validacii.
 */
Ext.apply(Ext.form.VTypes, {
    /**
     * Rozsirenie validacie o datovy typ 'password'
     *
     * Pouzitie:<br/>
     * 1, vzdy je potreba, aby vo formulari boli 2 policka<br/>
     * a, prve policko bude mat len vtype='password'
     *    bude validovane na dlzku a zlozitost hesla (viz. nizsie v kode)<br/>
     * b, druhe policko bude mat nastavenu config option initialPasswordField
     *    na id prveho pwd policka + bude validovane na totoznost obsahu
     *    s prvym polom<br/>
     *<br/><br/>
     * Inspirovane clankom: http://blog.adampresley.com/2008/05/08/advanced-data-validation-using-extjs/
     *
     * @param {Object} value
     * @param {Object} field
     */
    password: function(value, field) {
        if (field.initialPasswordField) {
            var pwd = Ext.getCmp(field.initialPasswordField);
            this.passwordText = i3.tx.txVTypePwNoMatch;
            // text hesla nesedi
            return (value === pwd.getValue());
        }
        this.passwordText = i3.tx.txVTypePwDflt;
        // validacna hlaska - heslo musi byt min 7 znakov a obsahovat ...
        var hasSpecial = value.match(/[0-9!@#\$%\^&\*\(\)\-_=\+]+/i);
        var hasLength = (value.length >= 7);
        return (hasSpecial && hasLength);
    },
    /**
     * @private
     */
    passwordText: i3.tx.txVTypePwDflt,
    'nonewline': function() {
        var re = /^[^\n]+$/;
        return function(v) {
            return re.test(v);
        };
    }(),
    'nonewlineText': i3.tx.txVTypeNoNewLines,
    /**
     * Rozsireni validace o telefonni cislo
     *
     * 17.05.19 on;
     */
    phonenumber: function(v) {
        return /^[+]?[()\/0-9. \-]{9,}$/.test(v);
        // validace (od kp)
    },
    phonenumberText: i3.tx.txVTypePhoneNumber, // chybova hlaska
    phonenumberMask: /[\d\+\ \(\)\/\.\-]/i // povolene vstupni znaky
});
/**
 * @class i3.ui.AuthSelectForm
 * Univerzalna komponenta formularoveho prvku umoznujuca vyber zaznamu z autoritnej databazy
 * pomocou flexpop, pricom vysledok sa zapise do formulara.
 * Prvky formulara by potom mali byt bud hidden alebo disabled.
 *
 * @class i3.ui.AuthSelectForm
 * @extends Ext.form.TriggerField
 */
i3.ui.AuthSelectForm = Ext.extend(Ext.form.TriggerField, {
    /**
     * @cfg csFlexPopParams - parametre pre flexpop
     */
    /**
     * @cfg csLoadMarcMap - konverzna tabulka pre nacitanie autority do cielovych prvkov
     * Priklad: [['t500a','t100a'],['t500b','t100b']]
     */
    /**
     * @cfg csMarcConvDef - linearizacna tabulka pre konverziu MARCu funkciou i3.DataFmt.fromMarc
     */
    /**
     * @cfg csDataForm    - ukazovatko na matersky formular, ktory ideme naplnat
     *                      asi by sa dalo zistit aj nejako automaticky
     */
    // defaults
    triggerClass: 'x-form-world-trigger',
    // 20.10.10 on; zmena chovani pole
    /**
     disabled: true,
     disableTrigger: false
     */
    editable: false,
    csTriggerEditCls: 'cs-x-trigger-noedit',
    // 24.09.13 on; zde se uchovava hodnota pole, ktera ma jit do zaznamu v pripade, ze se ma zobrazovat neco jineho
    csValue: undefined,
    /** constructor: zadanie defaultov
     *
     * @param {Object} config
     *
     * 20.09.13 on; zalozeno
     */
    constructor: function(config) {
        config = config || {};
        Ext.applyIf(config, {
            // 20.09.13 on; potrebuju oznacit (a pak v v css souboru zasednout) pole, ktere neni editovatelne, ale pouze
            //              browse popup a dyntrigger
            cls: config.editable ? '' : this.csTriggerEditCls,
            listeners: { // 30.10.15 on; doplnena reakce na enter
                specialkey: function(field, el) {
                    if (el.getKey() === Ext.EventObject.ENTER) {
                        this.csOnSearch(1);
                    }
                },
                scope: this
            }
        });
        i3.ui.AuthSelectForm.superclass.constructor.call(this, config);
    },
    /**
     * Vyhledavani po enteru v editovatelnem poli.!
     *
     * pbSearch: podla 'i3.ui.FlexPop.usrDoSearch()'
     *   0 - scan
     *   1 - search
     *   2 - browse
     *
     * 30.10.15 on;
     */
    csOnSearch: function(pbSearch) {
        var ix = this.index,
            term = this.getValue();
        // 26.07.17 on; pokud jde o cs_auth_select, veznu odpovidajici hodnotu
        if (this.csEditFieldName) {
            term = term[this.csEditFieldName];
        }
        if (!this.csMarcConvDef) {
            i3.intError('i3.ui.AuthSelectForm.onTriggerClick: csMarcConvDef is null');
            return;
        }
        if (!this.csLoadMarcMap) {
            i3.intError('i3.ui.AuthSelectForm.onTriggerClick: csLoadMarcMap is null');
            return;
        }
        // 13.07.15 on; predani paramnetru
        var fpwin = i3.ui.FlexPop.getWin(this.csFlexPopParams);
        var fppar = Ext.apply({}, this.csFlexPopParams);
        // 03.05.21 on; potrebuju aby se scope v fppar prepsalo i kdyz uz existuje a myslim, ze to tak ma byt pro vsechny promenne, zmena z applyIf na apply
        //Ext.applyIf(fppar, {
        Ext.apply(fppar, {
            // 03.05.21 on; index prevezne z defaultu - po zruseni applyIf
            //initUseAttr: ix,
            initUseAttr: ix || fppar.initUseAttr,
            initTerm: term,
            searchMode: pbSearch, // search mode 0: scan,1: search, 2: browse,3: ascii
            wannaMarcRes: true, // request result in MARC
            autoReturn: true, // pokud vyhleda prave jeden zaznam, primo ho vrati
            callback: this.csFlexPopParams.csMainCallback || this.csLoadMarcRecord,
            scope: this
        });
        // Otvorit flexpop so search/browse
        fpwin.usrDoSearch(fppar);
    },
    /**
     * Moznost za behu pridat cls 'cs-x-trigger-noedit'
     *
     * 23.09.13 on;
     */
    csAddNoEditCls: function() {
        // kontrola, jestli trida uz neexistuje
        var el = Ext.get(this.getEl());
        if (!el.hasClass(this.csTriggerEditCls)) {
            // neexistuje, pridame
            this.addClass(this.csTriggerEditCls);
        }
    },
    /**
     * Moznost za behu pridat cls 'cs-x-trigger-noedit'
     *
     * 23.09.13 on;
     */
    csRemoveNoEditCls: function() {
        this.removeClass(this.csTriggerEditCls);
    },
    /**
     * Metoda rozsirena o pridani/odebrani cls
     *
     * 23.09.13 on;
     */
    setEditable: function(pbEditable) {
        i3.ui.AuthSelectForm.superclass.setEditable.call(this, pbEditable);
        if (pbEditable) {
            this.csRemoveNoEditCls();
        } else {
            this.csAddNoEditCls();
        }
    },
    /**
     * Standardni metoda rozsirena - moznost zobrazit jinou hodnotu nez je v zaznamu
     *
     * 24.09.13 on;
     */
    setValue: function(psValue) {
        // pojkud je nadefinovana funkce csShowValueFn, ulozi si hodnotu ze zaznamu do pomocne promenne a zobrazi upravenou verzi
        if (this.csShowValueFn) {
            this.csValue = psValue;
            i3.ui.AuthSelectForm.superclass.setValue.call(this, this.csShowValueFn(psValue));
        } else {
            // standard
            i3.ui.AuthSelectForm.superclass.setValue.call(this, psValue);
        }
    },
    /**
     * Standardni metoda rozsirena - moznost zobrazit jinou hodnotu nez je v zaznamu
     *
     * 24.09.13 on;
     */
    getValue: function() {
        if (this.csShowValueFn) {
            return this.csValue;
        } else {
            // standard
            return i3.ui.AuthSelectForm.superclass.getValue.call(this);
        }
    },
    /**
     * Vyvolanie flexpopu a nastavenie callback funkcie pre nacitanie vysledkov.
     */
    onTriggerClick: function() {
        this.csRegCurrentField();
        // monitoring current fieldu (viz. i3.UI.Ext.js/Ext.form.Field)
        //alert('current data='+Ext.encode(this.values));
        if (!this.csMarcConvDef) {
            i3.intError('i3.ui.AuthSelectForm.onTriggerClick: csMarcConvDef is null');
            return;
        }
        if (!this.csLoadMarcMap) {
            i3.intError('i3.ui.AuthSelectForm.onTriggerClick: csLoadMarcMap is null');
            return;
        }
        // 02.07.19 on;
        var nOrigWidth,
            nOrigHeight;
        if (this.csFlexPopParams) {
            nOrigWidth = this.csFlexPopParams.width;
            nOrigHeight = this.csFlexPopParams.height;
        }
        // 23.07.15 onl doplneno predani parametru
        var fpwin = i3.ui.FlexPop.getWin(this.csFlexPopParams);
        // 25.08.14 on; opravene predani callbacku
        // 24.07.14 on; ve webovych vystupech si potrebuju callback predat jiny
        Ext.apply(this.csFlexPopParams, {
            wannaMarcRes: true, //                     request result in MARC
            callback: this.csFlexPopParams.csMainCallback || this.csLoadMarcRecord,
            scope: this
        });
        Ext.applyIf(this.csFlexPopParams, {
            searchMode: 1 // 1:search
        });
        // 18.02.16 on; zmena autoReturn na autoSearch
        // 12.01.16 on; pokud je nastaveno autoSearch, bude hledat hned po kliknuti na trigger
        //              vyuzito v EPCA na CAV
        if (this.csFlexPopParams.autoSearch) {
            Ext.apply(this.csFlexPopParams, {
                initTerm: this.getValue()
            });
        }
        // Otvorit flexpop so search/browse
        fpwin.usrDoSearch(this.csFlexPopParams);
        // 02.07.19 on; tady potrebuju minimalne nastavit puvodni sirku a vysku okna
        this.csFlexPopParams.width = nOrigWidth;
        this.csFlexPopParams.height = nOrigHeight;
    },
    /**
     * Private pre csLoadMarcRecord
     * Extrakcia poli z MARC zaznamu podla nastavenia - vysledkom je objekt k prvkami na vlozenie do formulara
     * @param {Object} pRecord - MARC zaznam vybrany uzivatelom vo flexpope
     */
    csGetFields2Load: function(pRecord) {
        // 18.01.12 on; podpora pro scan
        if (this.csFlexPopParams.csOnlyScan) {
            return pRecord;
        }
        // 05.05.11 on; var lin
        var lin;
        // ak pride null forwardnut null (09.09.09 rs - napr. prazdny zaznam z flexpopu)
        if (pRecord) {
            //i3.alert('loading record ' + Ext.encode(pRecord));
            var oErr = {};
            var marcConv = this.csMarcConvDef;
            if (!marcConv) {
                i3.intError('i3.ui.AuthSelectForm.csGetFields2Load: marc conv table is null!');
                return;
            }
            lin = i3.DataFmt.fromMarc(this.csMarcConvDef, pRecord, oErr);
            if (oErr.tx) {
                i3.alert('Error linearizing MARC record: ' + oErr.tx);
                return null;
            }
        } else {
            // toto je specialny pripad, kedy z flexpopu resp. "zo zdroja" pride null zaznam
            // vtedy vygenerujeme "clear all" lin2 zaznam a ten potom prenesieme do formulara
            // vlastne take pomocne nudzove riesenie
            lin = {};
        }
        // predelane - Musi se volat rekurzivne, protoze bylo pridane nacteni ZF ze serveru
        // transformacia autority do cieloveho tagu
        /*var lin2 = {},
         Ext.each(this.csLoadMarcMap, function(pMap) {
         // 25.11.09 on; na treti pozici muze byt podminka - zatim pouze nazev pole a
         //              kotroluje se, zda je vyplnene
         var cond = pMap[2] ? ((pMap[2]) && (lin[pMap[2]] !== '')) : true;
         if (cond) {
         // zdrojove data z linearizovanej verzie MARC zaznamu, niektore polia mozu byt opakovatelne
         var src = lin[pMap[1]];
         // 11.06.12 on; reseni opakovatelnych podpoli
         // ma aktualne pole viac ako jedno opakovanie?
         //if(Ext.isArray(src)) {
         // opakovania zlucime pomocnym oddelovacom
         //src = src.join(i3.c.SFFldsDelim);
         //}
         // pole lin2 tak uz nebude obsahovat opakovane hodnoty
         lin2[pMap[0]] = src;
         }
         });*/
        var cond,
            that = this,
            lin2 = {};
        // musim si udelat kopii
        var aMarcMap = i3.c.cloneObject(that.csLoadMarcMap);
        if (!!aMarcMap.length) {
            (function() {
                var pMap,
                    self = arguments.callee;
                pMap = aMarcMap.shift();
                if (pMap) {
                    cond = pMap[2] ? ((pMap[2]) && (lin[pMap[2]] !== '')) : true;
                    if (cond) {
                        // 07.02.13 on; moznost dotazeni ZF
                        if (pMap[1].piece(',', 1) === '@DFS') {
                            if (pRecord) {
                                i3.WS.display({
                                    success: function(pRec) {
                                        //console.log('success');
                                        lin2[pMap[0]] = pRec.data[0];
                                        // zavola rekurzivne funkci pro dalsi instanci
                                        //setTimeout(self, 10);
                                        self();
                                    },
                                    failure: function(msg) {
                                        //console.log('failure');
                                        // 'Display format request failed: '
                                        i3.displayError(i3.tx.txDisplayFmtFailed + msg);
                                        // zavola rekurzivne funkci pro dalsi instanci
                                        //setTimeout(self, 10);
                                        self();
                                    },
                                    scope: this
                                }, pRecord, pMap[1].piece(',', 2));
                            } else {
                                lin2[pMap[0]] = undefined;
                                self();
                            }
                        } else {
                            //console.log('x');
                            // zdrojove data z linearizovanej verzie MARC zaznamu, niektore polia mozu byt opakovatelne
                            var src = lin[pMap[1]];
                            // 11.06.12 on; reseni opakovatelnych podpoli
                            /*// ma aktualne pole viac ako jedno opakovanie?
                            if(Ext.isArray(src)) {
                            // opakovania zlucime pomocnym oddelovacom
                            src = src.join(i3.c.SFFldsDelim);
                            }*/
                            // pole lin2 tak uz nebude obsahovat opakovane hodnoty
                            lin2[pMap[0]] = src;
                            // zavola rekurzivne funkci pro dalsi instanci
                            //setTimeout(self, 10);
                            self();
                        }
                    } else {
                        // zavola rekurzivne funkci pro dalsi instanci
                        //setTimeout(self, 10);
                        self();
                    }
                } else {
                    // 27.07.17 on; vrati i cely zaznam
                    that.csLoadMarcRecordEnd(lin2, pRecord);
                }
            })();
        }
    },
    /**
     * Reverzia docasneho zlucenia opakovanych hodnot v prvkoch formulara
     * Ocakava sa pole objektov z fieldsetu.
     *
     * Prejde cely objekt (prvok pola), pre prvky ktore su string a obsahuju i3.c.SFFldsDelim
     * rozdeli string na danom oddelovaci a spravi z hodnoty pole
     *
     * priklad: vstupu
     * [{
     *   x:'aaaa',
     *   y:'fffff||wwwww'
     *   }]
     * priklad: vystupu
     * [{
     *   x:'aaaa',
     *   y:['fffff','wwwww'
     *   ]}]
     * funkcia nevracia nic, ale meni sa priamo zadany objekt
     *
     */
    csFixRepeatedValues: function(pLinR) {
        var sDel = i3.c.SFFldsDelim;
        if (!Ext.isArray(pLinR)) {
            return;
        }
        //var res = [];
        //@@
        Ext.each(pLinR, function(pLin) {
            i3.eachProp(pLin, function(pProp, pPropN) {
                if (typeof pProp === 'string') {
                    if (pProp.indexOf(sDel) > 0) {
                        pProp = pProp.split(sDel);
                        pLin[pPropN] = pProp;
                        // update
                    }
                }
            });
        });
    },
    /**
     * Prevezme MARC zaznam autority
     * @param {Object} pRecord - MARC zaznam vybrany uzivatelom vo flexpope
     */
    csLoadMarcRecord: function(pRecord) {
        this.csGetFields2Load(pRecord);
    },
    /**
     * Dokonceni csLoadMarcRecord
     */
    csLoadMarcRecordEnd: function(lin, pRecord) {
        if (lin) {
            // 24.11.09 on; natvrdo byla namespace 'a', zmeneno
            var namsp = this.nameSpace || 'a';
            // 16.06.17 on; pokud je potreba nejak osetrit data pred dotazenim, lze to pres metodu
            if (this.csDataForm.csBeforePopulate) {
                this.csDataForm.csBeforePopulate(lin, pRecord);
            }
            this.csDataForm.populate(lin, namsp, 'field', {
                setupAll: false
            });
            this.csDataForm.doLayout();
        }
    },
    /**
     *  Metoda volana z EPCA generatoru formularu (nastaveni hodnoty do prvku)
     *
     * 27.10.11 on;
     */
    setMarc: function(marc, convert, convertGroup, db) {
        // convertMap nastavuje sa z mapy tagov $g
        var value = epca.form.Helper.getMarcValue(marc, {
            'db': db, // 23.01.12 on;
            'tag': this.tag,
            'field': this.field,
            'convert': convert,
            'group': convertGroup,
            'map': this.convertMap
        });
        // 01.03.16 on; pokud vrati funkce null, nebudu nastavovat nic
        if (value === null) {
            return;
        }
        // 07.09.15 on; zrusena podminka, nekdy  potrebuju  zapsat i ""
        //if (!Ext.isEmpty(value)) {
        this.setValue(value);
        //}
        // 03.09.15 on; zakaze vsechny prvky na stejne urovni, ktere byly dotazeny - podle convertMap
        epca.form.Helper.csDisableLinkedFields(value, this);
    },
    /***
     * Metoda volana z EPCA generatoru formularu (prejmenovani nazvu pole)
     *
     * 27.10.11 on;
     */
    setPropertyTitle: function(titles) {
        // 27.10.15 on; podminka
        if (this.label) {
            this.label.update(epca.form.Helper.findTitle(titles, this.tag + this.field, this));
        }
    },
    /*
     * Metoda volana z EPCA generatoru (nacte hodnotu prvku)
     *
     * 31.10.11 on;
     */
    getMarc: function() {
        var retVal = {};
        retVal[this.field] = this.getValue();
        return retVal;
    },
    /*
     * Metoda volana z EPCA generatoru (smaze obsah pole)
     *
     * 17.05.12 on;
     */
    clearFields: function() {
        this.setValue('');
        // 14.12.15 on; povoli vsechny prvky na stejne urovni, ktere byly dotazeny - podle convertMap
        epca.form.Helper.csDisableLinkedFields('', this);
    }
});
Ext.reg('cs_auth_select_form', i3.ui.AuthSelectForm);
/**
 * @class i3.ui.AuthSelectFldSet
 * Univerzalna komponenta formularoveho prvku umoznujuca vyber zaznamu z autoritnej databazy
 * pomocou flexpop, pricom vysledok sa zapise do fieldset-oveho prvku formulara.
 *
 * @class i3.ui.AuthSelectForm
 * @extends Ext.form.TriggerField
 */
i3.ui.AuthSelectFldSet = Ext.extend(i3.ui.AuthSelectForm, {
    /**
     * (Private method used in populate())
     * Receives array of fields and corresponding array of values to be set.
     *
     * @param {Object} pFields - array of fields (usually master+clones)
     * @param {Object} pValues - corresponding array of values to be set
     *
     * 11.06.12 on; kompletne prevzato z Ext.form.FormPanel.js
     */
    setValues: function(pFields, pValues) {
        if (Ext.isEmpty(pValues)) {
            pValues = '';
        }
        if (!Ext.isArray(pValues)) {
            pValues = [pValues];
        }
        // acquire required amount of fields
        if (!Ext.isArray(pFields)) {
            var fldMaster = pFields;
            // given field will be master field
            pFields = [fldMaster];
            // convert into array
            // 21.04.09 rs; we only create clones if "clones" member function is present & if dynamic option is set
            // (checkboxgroup has "clones" bud has not "dymanic" set to true)
            if (fldMaster.clones && fldMaster.dynamic) { // if field is dynamic, then setup right amount of clones
                pFields = pFields.concat(fldMaster.clones(pValues.length - 1));
            }
        }
        // this is special case, where field is not dynamic, but receives more than one value
        // currently only occurs for checkboxgroup
        // ?? not very elegant - may need rewrite in the future
        if ((pFields.length === 1) && (pValues.length > 1)) {
            pFields[0].setValue(pValues);
            return;
        }
        // populate fields
        var i;
        for (i = 0; i < pValues.length; i++) {
            // 21.10.10 on; pokud byl zapojeny combobox, ktery mel store === null, tak tu tady padalo
            if ((pFields[i].xtype === 'cs_combo_st') && (pFields[i].store === null)) {
                continue;
            }
            pFields[i].setValue(pValues[i]);
            // 24.09.13 on; rucne vyvola udalost zmeny - pouzite v DK (i Interpi)
            pFields[i].fireEvent('change', pFields[i], pValues[i]);
        }
    },
    /**
     * Populate fields inside of given fieldset by given values
     *
     * @param {Object} pFieldSet
     * @param {Object} pLinRec
     */
    populate: function(pFieldSet, pLinRec) {
        // 24.11.14 on; specialita pro opakovatelny popup v ramci fieldsetu, u tohoto popupu se predpoklada dotazeni udaju pouze do sebe - zatim
        //              ta prvni podminka by tu asi nemusela byt, ale nemam ted cas to overit...
        if ((this.xtype === 'cs_auth_select_fs') && (this.dynamic)) {
            this.setValue(pLinRec[this.name]);
            return;
        }
        i3.eachProp(pLinRec, function(pValue, pName) {
            var fields = pFieldSet.findBy(function(pField) {
                if (!pField.isFormField) {
                    return false;
                }
                if (pField.name === pName) {
                    return true;
                }
            });
            if (Ext.isArray(fields)) {
                fields = fields[0];
                if (fields) {
                    // 11.06.12 on; kvuli opakovatelnym podpolim zapojena funkce z dyntrigeru
                    //fields.setValue(pValue);
                    this.setValues(fields, pValue);
                }
            }
        }, this);
    },
    /**
     * Prevezme MARC zaznam autority
     * @param {Object} pRecord - MARC zaznam vybrany uzivatelom vo flexpope
     *
     * 08.02.13 on; rozdelene na 2 metody, kvuli asynchronimu volani v csGetFields2Load
     */
    /**
     * Prevezme MARC zaznam autority
     * @param {Object} pRecord - MARC zaznam vybrany uzivatelom vo flexpope
     *
     * 08.02.13 on; rozdelene na 2 metody, kvuli asynchronimu volani v csGetFields2Load
     */
    csLoadMarcRecord: function(pRecord) {
        this.csGetFields2Load(pRecord);
    },
    /**
     * Dokonceni csLoadMarcRecord
     */
    csLoadMarcRecordEnd: function(lin, pRecord) {
        if (!lin) {
            lin = [{}];
        }
        if (lin) {
            var ownerFS = this.findParentByType('fieldset');
            if (ownerFS) {
                // 19.06.17 on; pokud je potreba nejak osetrit data pred dotazenim, lze to pres metodu
                if (ownerFS.csBeforePopulate) {
                    ownerFS.csBeforePopulate(lin, pRecord);
                }
                this.populate(ownerFS, lin);
                // 20.08.12 on; podminka
                if (this.csDataForm) {
                    // 11.06.12 on;
                    this.csDataForm.doLayout();
                }
                // 07.12.20 on; doplneno
                if (ownerFS) {
                    ownerFS.doLayout();
                }
                // 24.09.13 presunuto do setValues() - aby se funguvalo pro vsechny dotahovane pole (ne pouze cs_auth_select_fs)
                // 01.11.12 on; rucne vyvola udalost zmeny (zatim jenom pro cs_auth_select_fs) - odchytam to napr. v interpi aplikaci
                // pokud by s tim byly problemy, muzu tu vyvolat nejakou jinou udalost
                //this.fireEvent('change', this, this.value);
            }
        }
    }
});
Ext.reg('cs_auth_select_fs', i3.ui.AuthSelectFldSet);
/**
 * @class i3.ui.AuthSelect
 * Univerzalna komponenta formularoveho prvku umoznujuca vyber zaznamu z autoritnej databazy
 * pomocou flexpop, pricom vysledok sa vklada priamo do tohoto formularoveho prvku.
 *
 * Zasadnejsi rozdiel je v tom, ze musime odvodzovat po "dyntriggeri", ktory ma vlastnu storage
 * pre X datovych prvkov. Inak je kod velmi podobny na predchadzajucu komponentu.
 *
 * @class i3.ui.AuthSelect
 * @extends Ext.ux.DynTriggerField
 */
// 15.07.09 rs; TEMPORARY test
if (!Ext.ux.DynTriggerField) {
    alert('i3.ui.AuthSelect: missing Ext.ux.DynTriggerField - you should include dynform!');
}
i3.ui.AuthSelect = Ext.extend(Ext.ux.DynTriggerField, {
    // defaults
    triggerClass: 'x-form-world-trigger',
    csTriggerEditCls: 'cs-x-trigger-noedit',
    /** constructor: zadanie defaultov
     *
     * @param {Object} config
     *
     * 02.12.14 on; zalozeno
     */
    constructor: function(config) {
        config = config || {};
        Ext.applyIf(config, {
            // 02.12.14 on; muze byt editovatelny
            //              browse popup a dyntrigger
            cls: config.editable ? '' : this.csTriggerEditCls,
            listeners: { // 26.07.17 on; doplnena reakce na enter
                specialkey: function(field, el) {
                    if (el.getKey() === Ext.EventObject.ENTER) {
                        this.csOnSearch(1);
                    }
                },
                scope: this
            }
        });
        i3.ui.AuthSelect.superclass.constructor.call(this, config);
    },
    /**
     * @cfg csFlexPopParams - parametre pre flexpop
     */
    /**
     * @cfg csLoadMarcMap - konverzna tabulka pre nacitanie autority do cielovych prvkov
     * Priklad: [['t500a','t100a'],['t500b','t100b']]
     */
    /**
     * @cfg csMarcConvDef - linearizacna tabulka pre konverziu MARCu funkciou i3.DataFmt.fromMarc
     */
    /**
     * @cfg csDataForm    - ukazovatko na matersky formular, ktory ideme naplnat
     *                      asi by sa dalo zistit aj nejako automaticky
     */
    // Konstruktor - aplikovat defaulty na config objekt.
    //constructor: function(config){
    //  i3.ui.FlexPopTrigger.superclass.constructor.apply(this, arguments);
    //},
    // methods
    //initComponent: function(){ i3.ui.FlexPopTrigger.superclass.initComponent.apply(this, arguments); },
    // 2 funkcie su totozne, ale nemozeme ich napriamo zdedit
    // takze takato rucna kopia
    onTriggerClick: i3.ui.AuthSelectForm.prototype.onTriggerClick,
    csGetFields2Load: i3.ui.AuthSelectForm.prototype.csGetFields2Load,
    // 26.07.17 on;
    csOnSearch: i3.ui.AuthSelectForm.prototype.csOnSearch,
    /**
     * Prevezme MARC zaznam autority
     * @param {Object} pRecord - MARC zaznam vybrany uzivatelom vo flexpope
     */
    csLoadMarcRecord: function(pRecord) {
        if (Ext.isArray(pRecord)) {
            this.csLoadMarcRecordArr(pRecord);
        } else {
            this.csGetFields2Load(pRecord);
        }
    },
    /**
     * Dokonceni csLoadMarcRecord
     */
    csLoadMarcRecordEnd: function(lin, pRecord) {
        this.values = lin;
        this.updateDisplayVal();
        // 27.07.17 on; moznost zavolat metodu po nahrani zaznamu do hlavniho formulare
        if (this.csAfterLoadRecord) {
            this.csAfterLoadRecord(pRecord);
        }
        //i3.alert(this.name+': this.getValue() is '+Ext.encode(this.getValue()));
    },
    /**
     * Prevezme postupne vsechny zaznamy v poli
     * @param {Array} pRecord - pole zaznamu
     *
     * 30.08.18 on;
     */
    csLoadMarcRecordArr: function(paRecords) {
        var i;
        var panel = this.ownerCt;
        var idx = panel.items.indexOf(this);
        if (paRecords.length > 0) {
            // prvni prvek vlozime to existuiciho pole
            this.csGetFields2Load(paRecords[0]);
            for (i = (paRecords.length - 1); i > 0; i -= 1) {
                // vytvorime nove opakovani
                this.fireEvent('onIconPlus', this);
                // nahrajeme zaznam
                this.csGetFields2Load.call(panel.items.items[idx + 1], paRecords[i]);
            }
        }
    }
    // 11.02.13 on; presunuto do dyntrigeru
    /*onRender : function(ct, position) {
     // tu nevolame onRender naseho predchodcu, ale predchodcu predchodcu
     // prave zdedeny onRender potrebujeme preskocit
     Ext.ux.DynTriggerField.superclass.onRender.call(this, ct, position);
     // 28.11.11 on; pokud je nastaveny qtip, tak ho zaregistruje
     if (this.csQTip) {
     Ext.QuickTips.register({
     target : this, // komponente
     text : this.csQTip
     });
     Ext.QuickTips.register({
     target : this.trigger, // ikone
     text : this.csQTip
     });
     }
     }*/
});
Ext.reg('cs_auth_select', i3.ui.AuthSelect);
/**
 * @class i3.ui.ColTrigger
 * dyntrigger s volanim collector okna
 */
i3.ui.ColTrigger = Ext.extend(Ext.ux.DynTriggerField, {
    // defaults
    triggerClass: 'x-form-search-trigger',
    //anchor: '-25', // zrusene - v niektorych pouzitiach nechceme ziaden anchor
    // collector setup
    // **
    // titulok collector okna
    csColTitle: 'collector title',
    // constructor collector panelu
    csColPanel: null,
    // nepovinna sirka pre collector (ak sa neuvedie bude default)
    // je to sirka pre Window (nie pre collector panel)
    csColWidth: null,
    // odkaz na datovy form s tymto prvkom (asi by sa dalo ziskat programove)
    // pozor nemusi ist o hlavne okno aplikacie(!)
    csDataForm: null,
    // dodatocne volitelne parametre, kt. by mali byt aplikovane na otvarany collector
    // napr. nejake options specificke pre dany collector. Mozu napr. specifikovat,
    // ktore polia ma ako nastavit (napr. skryt a pod.)
    // pozor su to data pre panel (vnutro collectora)
    csColParams: null,
    onTriggerClick: function() {
        this.csRegCurrentField();
        // monitoring current fieldu (viz. i3.UI.Ext.js/Ext.form.Field)
        //alert('cs_col_trigger/values='+Ext.encode(this.values))
        var config = {
            title: this.csColTitle,
            CsPanel: this.csColPanel
        };
        if (this.csColWidth) {
            config.width = this.csColWidth;
        }
        var panelConfig = {
            csLinRecord: this.values, // datova cast z dyntrigera
            csMainForm: this.csDataForm,
            csPDynTrigger: this,
            // call back, called after user clicks OK in the collector window
            csOnAfterOK: this.csOnAfterColOK,
            csOnAfterOKScope: this.csOnAfterColOKScope || this
        };
        // lubovolne dodatkove parametre
        if (this.csColParams) {
            Ext.apply(panelConfig, this.csColParams);
        }
        i3.ui.csOpenColWin(config, panelConfig);
    },
    /**
     * Funkcia, kt. bude volana po stlaceni OK v collector okienku.
     */
    csOnAfterColOK: function() {
        // abstract
    }
});
Ext.reg('cs_col_trigger', i3.ui.ColTrigger);
/**
 * @class i3.ui.progressbar
 * @extends Ext.ProgressBar
 *
 * Progres bar.
 *
 * 15.04.11 on; doplneno
 */
i3.ui.progressbar = Ext.extend(Ext.ProgressBar, {
    initComponent: function() {
        // call parent
        i3.ui.progressbar.superclass.initComponent.apply(this, arguments);
    }
});
// eo extend
// register xtype
Ext.reg('progressbar', i3.ui.progressbar);
/**
 * @class i3.ui.CheckboxGroupST
 * Checkboxgroup s nacitanim hodnot ze staticke tabulky.
 *
 *  csStatTableN      - nazov statickej tabulky s obsahom comboboxu
 *  csDisplayID       - zobrazit i ID (subtag $a)? - 0/1
 *                      parameter sa len forwardne pouzitemu store
 *                      t.j. pokial si volajuci vytvara store rucne, musi parameter
 *                      zadat priamo vytvorenemu store - inak nebude mat ucinok
 */
i3.ui.CheckboxGroupST = Ext.extend(Ext.form.CheckboxGroup, {
    constructor: function(config) {
        // pozrieme, ci zadana staticka tabulka uz bola instancovana ako store (via store manager)
        // ak bola len znovu pouzijeme existujuce store a negenerujeme nove
        var storeObj = Ext.StoreMgr.key(config.csStatTableN);
        var bCreated;
        if (!storeObj) {
            bCreated = true;
            // vytvarame nove store
            // treba si byt vedomy toho, ze data sa nacitaju async a teda nebudu hned k dispozicii
            // eventualne by sa mozno dala urobit varianta, ze data nacitame "nejako" dopredu
            // a pri vytvarani comba ich "podstrcime" viz. i3.WS.sTablesdCacheInit()
            storeObj = new i3.WS.StoreST({
                csStatTableN: config.csStatTableN,
                autoLoad: true, // kvoli validacii nechame autoload
                csDisplayID: config.csDisplayID || 0,
                csDisplayOnlyID: config.csDisplayOnlyID || 0,
                csDisplayTextInQtip: config.csDisplayTextInQtip || 0
                // 06.05.11 jk; rozsireno o plneni data
                //csData: config.csData ? config.csData : 0,
                // 04.10.11 on; moznost nastavit subtag pro zobrazeni textu v comboboxu
                //csTextField : config.csTextField
            });
        } else {
            bCreated = false;
            //i3.msg('existing store reused: ' + config.csStatTableN);
        }
        Ext.applyIf(config, {
            lazyInit: false,
            //mode: 'local',
            itemCls: 'x-check-group-alt',
            // Put all controls in a single column with width 100%
            //columns: 1,
            //style: 'padding-top: 9px',
            //hideLabel: true,
            //allowBlank: true,
            items: [{
                    /*hidden : true*/
                }
                /*{
                 //name: 't950a',
                 boxLabel: 'Rozpracovan',
                 inputValue: 'R'
                 //csAddOnFocus: true,
                 //csOwnerForm: this
                 }*/
            ]
        });
        // 21.12.12 on; posunute vys
        // zavolame konstruktor predka
        i3.ui.CheckboxGroupST.superclass.constructor.call(this, config);
        // a teraz postprocessing
        var thisGroup = this;
        // 14.05.13 on; nastavi default
        thisGroup.on('csload', function() {
            thisGroup.csSetDefault(thisGroup);
        }, thisGroup);
        if (bCreated) {
            // takze toto sa fyzicky vykona az "post", az ked prisli data
            storeObj.on('load', function() {
                thisGroup.csFillItems(thisGroup, storeObj);
            }, storeObj);
        } else {
            // osetrena situace, kdy je ciselnik pouzity vicekrat a dalsich komponent nedojde k eventu load
            if (storeObj.data.items.length === 0) {
                // takze toto sa fyzicky vykona az "post", az ked prisli data
                storeObj.on('load', function() {
                    thisGroup.csFillItems(thisGroup, storeObj);
                }, storeObj);
            } else {
                // 21.12.12 on; musi se volat az po vykresleni
                //thisGroup.csFillItems(thisGroup, storeObj);
                thisGroup.on('render', function() {
                    thisGroup.csFillItems(thisGroup, storeObj);
                }, storeObj);
            }
        }
    },
    /**
     * Vygeneruje do boxu checkboxy.
     */
    csFillItems: function(pGroup, pStore) {
        var i,
            oTmp,
            checkbox,
            col,
            sText;
        pGroup.panel.items.get(0).remove(0);
        pGroup.items.clear();
        // pres vsechny prvky store
        for (i = 0; i < pStore.data.items.length; i++) {
            oTmp = pStore.data.items[i];
            // zobrazit pouze id
            if (this.csDisplayOnlyID) {
                sText = oTmp.data.id;
            } else {
                sText = oTmp.data.text;
                // zobrazi i id?
                if (this.csDisplayID) {
                    sText = oTmp.data.id + ' - ' + sText;
                }
            }
            // zobrazit text v hintu?
            if (this.csDisplayTextInQtip) {
                sText = '<span ext:qtip="' + oTmp.data.text + '">' + sText + '</span>';
            }
            checkbox = new Ext.form.Checkbox({
                inputValue: oTmp.data.id,
                boxLabel: sText
            });
            col = pGroup.panel.items.get(pGroup.items.getCount() % pGroup.panel.items.getCount());
            pGroup.items.add(checkbox);
            col.add(checkbox);
            pGroup.panel.doLayout();
        }
        this.fireEvent('csload');
        // vyvola udalost, aby bylo mozne odchytit, kdy uz byly prvky nahrane
    },
    /**
     * Prednastavi defaultni hodnoty.
     *
     * 14.05.13 on;
     */
    csSetDefault: function(pGroup) {
        // pokud neni default nastaveny, skonci
        if (i3.isEmptyString(pGroup.csDefault)) {
            return;
        }
        var arr = pGroup.csDefault.split(',');
        pGroup.setValue(arr);
        // 07.06.13 on; pokud se neco prednastavi, tak se posune scrollbar po prvni oznacene, aby bylo videt, ze se neco oznacilo
        var i;
        for (i = 0; i < pGroup.items.length; i++) {
            if (pGroup.items.items[i].checked) {
                // predpokladam, ze cs_checkboxgroup_st bude vzdy v panelu
                if (pGroup.ownerCt && pGroup.ownerCt.body) {
                    pGroup.ownerCt.body.dom.scrollTop = pGroup.items.items[i].getPosition()[1] - pGroup.getPosition()[1];
                    // pozice checkboxu - pozice checkboxgroupu
                    break;
                }
            }
        }
    }
});
// zaregistrujeme pre lazy instantiation
Ext.reg('cs_checkboxgroup_st', i3.ui.CheckboxGroupST);
/**
 * @class i3.ui.TreePanelST
 * Treepanel s nacitanim hodnot ze staticke tabulky s moznosti zmenit poradi prvku
 *
 *  csStatTableN      - nazov statickej tabulky s obsahom comboboxu
 *  csDisplayID       - zobrazit i ID (subtag $a)? - 0/1
 *                      parameter sa len forwardne pouzitemu store
 *                      t.j. pokial si volajuci vytvara store rucne, musi parameter
 *                      zadat priamo vytvorenemu store - inak nebude mat ucinok
 */
i3.ui.TreePanelST = Ext.extend(Ext.tree.TreePanel, {
    constructor: function(config) {
        // pozrieme, ci zadana staticka tabulka uz bola instancovana ako store (via store manager)
        // ak bola len znovu pouzijeme existujuce store a negenerujeme nove
        var storeObj = Ext.StoreMgr.key(config.csStatTableN);
        var bCreated,
            scope;
        if (!storeObj) {
            bCreated = true;
            // vytvarame nove store
            // treba si byt vedomy toho, ze data sa nacitaju async a teda nebudu hned k dispozicii
            // eventualne by sa mozno dala urobit varianta, ze data nacitame "nejako" dopredu
            // a pri vytvarani comba ich "podstrcime" viz. i3.WS.sTablesdCacheInit()
            storeObj = new i3.WS.StoreST({
                csStatTableN: config.csStatTableN,
                autoLoad: true, // kvoli validacii nechame autoload
                csDisplayID: config.csDisplayID || 0
                // 06.05.11 jk; rozsireno o plneni data
                //csData: config.csData ? config.csData : 0,
                // 04.10.11 on; moznost nastavit subtag pro zobrazeni textu v comboboxu
                //csTextField : config.csTextField
            });
        } else {
            bCreated = false;
            //i3.msg('existing store reused: ' + config.csStatTableN);
        }
        Ext.applyIf(config, {
            lazyInit: false
            //itemCls : 'x-check-group-alt'
            //items : [{}]
        });
        // 21.12.12 on; posunute vys
        // zavolame konstruktor predka
        i3.ui.TreePanelST.superclass.constructor.call(this, config);
        // a teraz postprocessing
        var thisTree = this;
        // 14.05.13 on; nastavi default
        thisTree.on('csload', function() {
            thisTree.csSetDefault(thisTree);
            // 16.02.15 on; moznost predat callback
            if (config.csOnLoadCallBack) {
                scope = config.csOnLoadScope || this;
                // 02.11.16 on; doplneno predani storu (this)
                config.csOnLoadCallBack.call(scope, bCreated, this);
            }
        }, thisTree);
        if (bCreated) {
            // takze toto sa fyzicky vykona az "post", az ked prisli data
            storeObj.on('load', function() {
                thisTree.csFillItems(storeObj);
                // 16.02.15 on; moznost predat callback
                if (config.csOnLoadCallBack) {
                    scope = config.csOnLoadScope || this;
                    // 02.11.16 on; doplneno predani storu (this)
                    config.csOnLoadCallBack.call(scope, bCreated, this);
                }
            }, storeObj);
        } else {
            if (storeObj.data.items.length === 0) {
                // takze toto sa fyzicky vykona az "post", az ked prisli data
                storeObj.on('load', function() {
                    thisTree.csFillItems(storeObj);
                    // 16.02.15 on; moznost predat callback
                    if (config.csOnLoadCallBack) {
                        scope = config.csOnLoadScope || this;
                        // 02.11.16 on; doplneno predani storu (this)
                        config.csOnLoadCallBack.call(scope, bCreated, this);
                    }
                }, storeObj);
            } else {
                thisTree.csFillItems(storeObj);
                // 16.02.15 on; moznost predat callback
                if (config.csOnLoadCallBack) {
                    scope = config.csOnLoadScope || this;
                    // 02.11.16 on; doplneno predani storu (this)
                    config.csOnLoadCallBack.call(scope, bCreated, this);
                }
            }
        }
        // 01.07.19 on; pri kliknuti na text o(d)znaci checkbox (epca vystupy)
        if (thisTree.csCheckOnClick) {
            thisTree.on('click', function(node) {
                var bValue = node.attributes.checked;
                var ui = node.getUI();
                ui.toggleCheck(!bValue);
            });
        }
    },
    /**
     * Vygeneruje do boxu checkboxy.
     */
    csFillItems: function(pStore) {
        var i,
            oTmp,
            fieldNode;
        // pres vsechny prvky store
        for (i = 0; i < pStore.data.items.length; i++) {
            oTmp = pStore.data.items[i];
            fieldNode = new Ext.tree.TreeNode({
                id: oTmp.data.id,
                text: oTmp.data.text,
                //iconCls :'no-icon',   // bez ikonky
                checked: false,
                allowDrag: true,
                allowDrop: true,
                leaf: true
            });
            this.getRootNode().appendChild(fieldNode);
        }
        // vyvola udalost, aby bylo mozne odchytit, kdy uz byly prvky nahrane
        this.fireEvent('csload');
    },
    /**
     * Vrati pole hodnot.
     */
    getValue: function() {
        var i,
            oTmp,
            aRes;
        aRes = [];
        // pres vsechny oznacene prvky
        for (i = 0; i < this.getChecked().length; i++) {
            oTmp = this.getChecked()[i];
            aRes.push(oTmp.id);
        }
        return aRes;
    },
    /**
     * Zapise pole hodnot.
     *
     * 14.05.13 on;
     */
    setValue: function(paValues) {
        if (!Ext.isArray(paValues)) {
            paValues = [paValues];
        }
        var node,
            tree;
        tree = this;
        Ext.each(paValues, function(psId) {
            node = tree.getNodeById(psId);
            if (node) {
                //node.attributes.checked = true;
                node.getUI().toggleCheck(true);
            }
        });
    },
    /**
     * Prednastavi defaultni hodnoty.
     *
     * 14.05.13 on;
     */
    csSetDefault: function(pTree) {
        // pokud neni default nastaveny, skonci
        if (i3.isEmptyString(pTree.csDefault)) {
            return;
        }
        var arr = pTree.csDefault.split(',');
        pTree.setValue(arr);
    },
    /**
     * Odznaci vsechny polozky v treepanelu
     * 
     * 10.06.22 on;  
     */
    csUncheck: function() {
        this.getRootNode().cascade(function(n) {
            var ui = n.getUI();
            ui.toggleCheck(false);
        });
    }
});
// zaregistrujeme pre lazy instantiation
Ext.reg('cs_treepanel_st', i3.ui.TreePanelST);
Ext.apply(i3.ui, {
    /*
     * Prelozene tlacitka Ext.Msg.YESNOCANCEL v Ext.Msg.show
     *
     * 10.08.12 on;
     */
    YesNoCancel: {
        yes: i3.tx.txYes,
        no: i3.tx.txNo,
        cancel: i3.tx.txCancel
    },
    /*
     * Prelozene tlacitka Ext.Msg.OK v Ext.Msg.show
     *
     * 11.08.14 on;
     */
    OK: {
        ok: i3.tx.txOK
    },
    /*
     * Prelozene tlacitka Ext.Msg.OKCANCEL v Ext.Msg.show
     *
     * 10.08.12 on;
     */
    OKCancel: {
        ok: i3.tx.txOK,
        cancel: i3.tx.txCancel
    },
    /*
     * Prelozene tlacitka Ext.Msg.YESNO v Ext.Msg.show
     *
     * 13.08.12 on;
     */
    YesNo: {
        yes: i3.tx.txYes,
        no: i3.tx.txNo
    }
});
/**
 * @class i3.ui.ContentServerLink
 * Checkboxgroup s nacitanim hodnot ze staticke tabulky.
 *
 *  csStatTableN      - nazov statickej tabulky s obsahom comboboxu
 *  csDisplayID       - zobrazit i ID (subtag $a)? - 0/1
 *                      parameter sa len forwardne pouzitemu store
 *                      t.j. pokial si volajuci vytvara store rucne, musi parameter
 *                      zadat priamo vytvorenemu store - inak nebude mat ucinok
 */
i3.ui.ContentServerLink = Ext.extend(Ext.form.DisplayField, {
    constructor: function(config) {
        config = config || {};
        Ext.applyIf(config, {
            hideLabel: true
        });
        // zavolame konstruktor predka
        i3.ui.ContentServerLink.superclass.constructor.call(this, config);
    },
    csUpdate: function(psDB, ps001) {
        // 05.03.14 on; podminka kvuli nahledu
        // ictx
        var sIctx = i3.WS.baseParams.ictx;
        // jazyk
        var sLanguage = i3.WS.baseParams.language;
        var psURL;
        // 28.05.14 on; neni potreba cist nazev serveru
        /*// 28.05.14 on; IE nema pristup k window.location.origin
        if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        var psURL = window.location.origin + '/i2/i2.entry.cls';*/
        // 28.11.14 on; odliseni test verze
        // vyskladam URL
        if (window.location.href.toLowerCase().indexOf('/i3t/') >= 0) {
            psURL = '/i2t/i2.entry.cls';
        } else {
            psURL = '/i2/i2.entry.cls';
        }
        if (!ps001 || (ps001 === '') || (ps001 === 'new')) {
            // zaznam jeste nebyl ulozen do db
            this.setValue(this.csContentText);
            this.disable();
        } else {
            // zaznam uz byl ulozen do db
            // 04.10.17 on; doplneno sso
            this.setValue('<a target="_blank" href="' + psURL + '?ictx=' + sIctx + '&language=' + sLanguage + '&op=uploader&idx=' + psDB + '*' + ps001 + '&_arlsso=' + encodeURIComponent(i3.WS.csSecurity.username) + '&_arlssopw=' + encodeURIComponent(i3.WS.csSecurity.arlsso) + '">' + this.csContentText + '</a>');
            this.enable();
        }
    }
});
// zaregistrujeme pre lazy instantiation
Ext.reg('cs_contentserverlink', i3.ui.ContentServerLink);
