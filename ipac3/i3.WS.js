/**
 * 20.01.25 on; zf obaleny div s id  
 * 07.06.24 on; muze byt rovno 0
 * 26.04.24 on; znacka body muze mit i nejake parametry
 * 21.09.23 on; moznost predat zaznam
 * 21.06.23 on; moznost zrusit kontrolu pri ulozeni
 * 01.12.22 on; CLIENT_CFG se sufixem pobocky
 * 03.06.22 on; moznost nezobrazit chybovou zpravu, kdyz se zaznam nenajde - pouzito pri nacteni ciselniku comboboxu
 * 02.02.22 on; doplnen IS_BRANCH
 * 12.11.21 on; vynucena kontrola
 * 31.03.20 on; sXlateWithGetRecord
 * 20.11.19 on; osetren vysledek commandU
 * 26.04.19 on; zahesuje heslo SHA512 - pro ucet arl
 * 07.06.18 on; rozsireno getCommandGroup a i3.WS.Msg
 * 03.05.18 on; i3 aplikace pouzivaji cookies
 * 04.04.18 on; hesovani hesla
 * 21.11.17 on; i3.WS.Msg: nastavitelny delimiter
 * 22.09.17 on; uchovani sso udaju
 * 20.09.17 on; rozsireni sXlate
 * 13.09.17 on; pri update pridano vraceni vysledku kontrol
 * 27.07.17 on; osetreni Cross-Site Request Forgery (CSRF)
 * 09.06.16 on; defaultni osetreni chyby v commandu
 * 11.05.16 on; v metode update doplnen prenos runtime error vys
 * 20.10.15 on; command: moznost odeslat form
 * 14.08.15 on; upraven preklad zprav a kontrola zaznamu
 * 13.08.15 on; i3.WS.Msg: zvetsen limit kodu zpravy
 * 24.07.15 on; getRecord: podpora pro novy SE
 * 25.02.15 kp; lokalizovan text txNoRecordFound
 * 21.01.14 on; getDisplayFormatFromRecord
 * 30.07.14 on; display: defaultni osetreni chyby
 * 22.07.14 on; rozsireni getClientCfg
 * 11.07.14 on; uprava getCommandGroupClass
 * 21.05.14 on; rozsireno getClientCfg
 * 15.05.14 on; doresena arabstina
 * 20.03.14 on; arabstina
 * 02.07.13 on; rozsirena funkce zf2HTML
 * 16.04.13 on; osetreno padani Ext.util.JSON.decode
 * 08.04.13 on; doplneny popis ke client_info
 * 11.03.13 jk; pridan callback do WS
 * 13.06.12 on; rozsirena metoda getRecord
 * 15.03.12 on; metoda getCommandGroupClass
 * 01.03.12 on; drobna uprava defaultFailureFn
 * 10.02.12 on; metoda getClientCfg, zruseny ciselnik IS_RETURN_CODE_USER
 * 09.12.11 on; v zf2HTML odstraneny duplicitni tag 001
 * 01.12.11 on; podpora options do update
 * 19.10.11 on; rozsiren commandURC
 * 23.08.11 on; rozsirena metoda failure pro odeslani requestu
 * 09.08.11 on; osetrena funkce zf2HTML
 * 08.07.11 on; podpora pro cteni diferenci z ciselniku
 * 20.04.11 on; doplnena metoda getCommandGroup
 * 30.07.10 on; metoda getRecord rozsirena o parametr args, ktere se pravana callback funkci
 * 28.06.10 on; doplnena metoda command
 * 25.06.10 on; doplnena metoda isLocalClass, ktera vrati true, pokud je predana trida lokalni
 * 29.04.10 on; doplnene odesilani ifmt: 'href' kvuli linku v ZF
 * 17.03.10 on; rozsirena hlaska o nenalezeni zaznamu
 * 02.10.09 rs; formalne upravy kvoli dokumentacii
 * 30.09.09 rs; uprava vizualneho konca zaznamu v ZF MARC
 * 23.09.09 rs; predane vizualne ukazovatko konca zaznamu v ZF
 * 28.08.09 rs; osetrenie lt/gt v ZF; drobnosti;
 *              pridany followup call pre sTablesdCacheInit
 * 12.08.09 rs; display: osetrenie prazdneho t001
 * 30.07.09 rs; update: oprava config.failure na failureFn
 * 27.05.09 rs; precistenie pre jslint
 * 25.03.09 rs; pridane return false i3.WS.Msg
 * 25.03.09 rs; sXlate: doplnenie return value
 * 29.01.09 rs; info firebug
 * 24.01.09 rs; oprava volania i3.WS.checkRetFmtBasic
 * 22.01.09 rs; pre zatial posielame vo WS req. vzdy aj pfmt=json parameter
 * 21.01.09 rs; oprava obsahu i3.WS.command(); povodne nebolo funkcne)
 * 15.01.09 rs; drobne formalne upravy autorizacie i3.WS.update()
 * 15.01.09 rs; presunutie funkcie fillInParams do i3.Base pre pouzitie aj na vyssich urovniach
 * 12.01.09 jt; doplnenie moznosti autorizacie do i3.WS.update
 * 06.06.08 rs;
 * --
 */
/*global Ext,i3,alert */
/**
 * @class i3.WS
 * @singleton
 *
 * Objekty pre pracu s WS. WS request wrapper libraryzz.
 */
i3.WS = {
    /** @private */
    tx: {
        // sem pridu preklady textov
        txDbUpdateFailed: 'Zápis záznamu neúspešný. Info:#Zápis záznamu neúspěšný. Info:#Database update failed. Info:###فشل تحديث قاعدة البيانات. معلومات:'.ls(),
        txCmdGrpEmpty: 'Nemôžem nájsť \'{0}\' v zázname COMMAND_GROUPS v {1}.#Nenalezen \'{0}\' v záznamu COMMAND_GROUPS v {1}.#Could not find \'{0}\' in table COMMAND_GROUPS in {1}.###عدم استطاعة إيجاد {0} في الجدول COMMAND_GROUPS في {1}.'.ls()
    },
    /*
     * Zakladne parametre pre WS sluzbu
     * pouziju sa aj ako default pre "WS based store"
     */
    /**
     * URL WS sluzby
     * @type {String}
     */
    baseURL: 'i2.ws.cls',
    /**
     * Defaultne parametre pre vsetky WS requesty
     * pouziju sa pre req() aj pre 'WS enabled stores'
     * @type {Object}
     */
    baseParams: {
        // 08.04.13 on; toto client_info se nesmi zmenit, na serveru se podle tohoto retezce testuje,
        //              zda jde o i3 aplikaci
        client_info: 'aRL i3 web client 1.0', //
        //,debug:'1'  // nemalo by sa pouzit pre ostru verziu u zakaznika
        pfmt: 'json', // (riesene cez MIME type header); ale pre istotu pridavame aj req.para,
        ifmt: 'href', // 29.04.10 on; href – funkční html odkaz ve formě absolutního url + target=_blank
        // 21.01.09 rs; zdalo sa mi, ze niekedy pri store default headers neposle (?)
        // 03.04.18 on;
        //CSPCHD : '',   // 03.05.18 on; i3 aplikace pouzivaji cookies
        //OCSPCHD : '',  // 03.05.18 on; i3 aplikace pouzivaji cookies
        nonce: '',
        // 04.04.18 on; sha512
        ictx: i3.ictx ? i3.ictx.toLowerCase() : ''
    },
    // 22.09.17 on; uchovani username a arlsso z odpovedi WS
    csSecurity: {
        username: '',
        arlsso: ''
    },
    /**
     * Nastavenie debug option pre WS prikazy a pre store
     * @param {Boolean} pDebug
     */
    setDebug: function(pDebug) {
        i3.WS.baseParams.debug = pDebug;
        //i3.WS.Store.baseParams.debug=pDebug; /// toto nejde, pretoze kazde store ma svoju option
    },
    /**
     * @private
     * Defaultna failure funkcia.
     * Pre pripad, ked WS sluzba vrati korektny vysledok,
     * ale ret_code je chybovy stav.
     */
    defaultFailureFn: function(emsg) {
        // 01.03.12 on; emsg nemusi byt primo text
        if (emsg && emsg.statusText) {
            Ext.Msg.alert('Info', emsg.statusText);
        } else {
            Ext.Msg.alert('Info', emsg);
        }
    },
    /**
     * Zahesuje heslo
     *
     * 03.04.18 on;
     */
    csHashPwMd5: function(p) {
        return Ext.util.base64.encode(Ext.util.MD5(Ext.util.base64.encode(Ext.util.MD5(p, true)) + ':' + this.baseParams.nonce, true));
    },
    /**
     * Zahesuje heslo SHA512
     *
     * 04.04.18 on;
     */
    csHashPwSHA: function(p) {
        var sIctx;
        if (i3.isEmptyString(i3.ictx)) {
            // pokud neznam ictx, pouziju "base"
            //alert('Ictx is empty!');
            //return '';
            sIctx = 'base';
        } else {
            sIctx = i3.ictx.toLowerCase();
        }
        return i3.c.csSHA512(p + sIctx + '7g]_N' + sIctx.reverse());
    },
    /**
     * Zahesuje heslo SHA512 - pro ucet arl
     *
     * 26.04.19 on;
     */
    csHashPwSHAArl: function(p) {
        return i3.c.csSHA512(p + 'dk7.G~]b5' + p.reverse());
    },
    /**
     * Request na WS sluzbu ARL
     * Obsahuje URL adresu sluzby + niektore defaultne parametre
     *
     * parametre:
     * @param {Object} rq Objekt s parametrami pre "Ext.Ajax.request" s tym, ze niektore parametre
     *                    mozu byt vynechane (doplnia sa tu)
     */
    req: function(rq) {
        var sARLCSRF;
        // 04.04.18 on; pred kazdou udalost success doplneno ulozeni parametru
        //rq.success = Ext.createInterceptor(rq.success, function(response) {
        //  alert('a');
        //  return true;
        //});
        rq.success = (Ext.isFunction(rq.success) ? rq.success : function() {}).createInterceptor(function(response) {
            var o = i3.csJsonDecode(response.responseText);
            if (!o) {
                return;
            }
            // zapamatuje si obsah vybranych udaju z odpovedi (headeru)
            this.csRememberResponseData(o);
        }, this);
        // doplnime este dalsie specificky pre ajax req.
        Ext.applyIf(rq, {
            url: this.baseURL,
            // toto je low level failure funkcia, kt. sa uplatni de facto
            // len v pripade, ze WS sluzba nevrati korektnu odpoved.
            // ak WS sluzba odpovie korektne (len napr. dany konkretny prikaz
            // zlyha), funkcia sa neuplatni a vola sa successfn s vysledkom
            // WS requestu - ten sa potom interne deli na success/failure
            // podla err_code z WS
            failure: function(response, o) {
                var sErr = '';
                if (o) {
                    if (o.url) {
                        sErr = sErr + '<br>URL: ' + o.url;
                    }
                    if (o.params) {
                        sErr = sErr + '<br>ictx: ' + o.params.ictx + '; DB: ' + o.params.db + '; method: ' + o.params.method + '; pfmt: ' + o.params.pfmt;
                    }
                }
                if (response) {
                    if (response.status) {
                        sErr = sErr + '<br>Status: ' + response.status;
                    }
                    if (response.statusText) {
                        sErr = sErr + '<br>StatusText: ' + response.statusText;
                    }
                    if (response.responseText) {
                        sErr = sErr + '<br><br>ResponseText:<br>' + response.responseText;
                    }
                    if (sErr !== '') {
                        sErr = '<br>' + sErr;
                    }
                }
                i3.alert('Server', 'WS1: error getting data (i3.WS.req)' + sErr);
                // ak pada na tuto hlasku skuste vypnut Firebug
                // pozn. 29.01.09 rs
                //debugger;
            },
            scope: this // default scope is WS object
        });
        // doplnime zakladne parametre
        Ext.applyIf(rq.params, this.baseParams);
        // 27.07.17 on; osetreni Cross-Site Request Forgery (CSRF)
        sARLCSRF = Ext.util.Cookies.get('arlcsrf');
        Ext.Ajax.defaultHeaders = {
            Accept: 'application/json',
            // 27.07.17 on; osetreni Cross-Site Request Forgery (CSRF)
            ARLCSRF: sARLCSRF
        };
        // timeout se nastavuje v i3.UI.Ext.js - Ext.Ajax.timeout = 65000
        Ext.Ajax.request(rq);
    },
    /**
     * Kontrola objektu obsahujuceho vysledok requestu na WS sluzbu
     * testuje existenciu zakladnych properties, ktore by mali byt
     * v kazdom response.
     *
     * @param {Object} JSON kod obdrzany ako vysledok WS requestu.
     * @return 0-failed, 1-ok
     */
    checkRetFmtBasic: function(o) {
        // prve prezije aj ked premenna vobec nie je deklarovana
        // nie som si isty, ci to konkretne tu ma vyznam
        // 15.05.14 on; neni potreba
        /*if ( (o) === 'undefined') {
         return 0;
         }*/
        if (o === undefined) {
            return 0;
        }
        if ((o.ret_code === undefined) || (o.ret_msg === undefined)) {
            return 0;
        }
        return 1;
    },
    /**
     * Kontrola objektu obsahujuceho vysledok search requestu na WS sluzbu
     * kontroluje existenciu zakladnych properties (hits,records a strukturu prveho
     * zaznamu).
     *
     *
     * @param {Object} o    JSON kod obdrzany ako vysledok WS requestu.
     * @param {Object} err  Objekt do ktoreho (property msg) bude zapisany text chyby.
     *
     * @return 0-failed, 1-ok
     */
    checkRetFmtSearch: function(o, err) {
        err = err || {};
        // poistka na inicializaciu
        err.msg = '';
        if (!i3.WS.checkRetFmtBasic(o)) {
            return 0;
        }
        // err_code ine ako 0
        var isErr = (o.ret_code !== '0');
        // chybaju hity
        isErr = isErr || (o.hits === undefined);
        // hits>0, ale chyba niektora datova cast
        isErr = isErr || ((o.hits > 0) && ((o.records === undefined) || (o.records[0].t001 === undefined) || (o.records[0].classn === undefined) || (o.records[0].data === undefined)));
        if (isErr) {
            // ak return code je ine ako '0', vratit v property err.msg
            // kod + text chyby
            if (o.ret_code !== '0') {
                err.msg = o.ret_code + ' ' + o.ret_msg;
            }
            return 0;
        }
        return 1;
    },
    /**
     * Toto je shortcut na metodu search.
     * Namiesto parametra "query" ocakavame property "t001" ako pole identifikatorov zaznamov.
     * Vsetky zvysne parametre su totozne z metodou getRecord a search.
     * Nie je potreba uvadzat property 'from','to', pretoze sa daju urcit z dlzky pola "t001".
     *
     * V getRecord() je mozne namiesto classn,t001 pouzit property idx (pre zjednodusenie volania pre
     * pripad, kedy mame 'idx'. Tu to zatial nie je implemenovane, ale samozrejme da sa neskor dorobit.
     *
     * @param {Object} Parametre ako pre "search" ale namiesto "query" sa vyplni "t001". "t001"
     *                 musi byt pole stringov.
     *                 Pre podrobnejsi popis viz. metoda getRecord().
     */
    getRecords: function(config) {
        var t001list = config.t001,
            s = t001list[0].singleQuote(),
            i;
        for (i = 1; i < t001list.length; i++) {
            s = '@or ' + s + ' ' + t001list[i].singleQuote();
        }
        Ext.apply(config, {
            query: '@attr 1=12 ' + s,
            from: 1,
            to: t001list.length
        });
        // prejdeme na metodu search, pricom vysledok ocakavame v callbackoch
        this.search(config);
    },
    /**
     * Get a record by class & T001. Takze specialna aplikacia metody search.

     * @param {Object} config<br>
     *   classn:    trieda v ktorej ideme vyhladavat<br>
     *   t001:      identifikacia zaznamu, kt. chceme najst<br>
     *   idx:       namiesto 'classn,t001' je mozne zadat identifikaciu do property 'idx'<br>
     *              v tvare 'classn*t001' alebo tiez 'tablename*t001'<br>
     *              (zatial tu predpokladame lname=tablename)<br><br>
     *
     *   fmt:       nepovinna specifikacia formatu (viz. metoda search())<br>
     *   success:   function (record)
     *              record:    found record - i3.Marc
     *   failure:   callback pri chybe (definicia viz. search)
     *   scope:     scope for callbacks; nepovinne. Ak nie je uvedene pouzijeme 'this'.
     *   args:      nepovinny paramert, ktery se posune do callbacku
     *   index:     moznost zmenit cislo indexu, defaultne se pouzije 12 (kod zaznamu)
     *
     *   13.06.12 on; doplnena moznost zmenit index (vyhledat 1 zaznam podle jineho indexu)
     *   30.07.10 on; pridany parametr args (vyuzity ve studentske aplikaci)
     */
    getRecord: function(config, args) {
        //console.log('i3.WS.getRecord');
        var successFn = config.success,
            scope = config.scope || this,
            sIndex /*, sNewSE = ''*/ ;
        // 24.07.15 pokud je nastaven novy SE, pouzije ho
        //if (i3.csUseNewSE) {
        //  sNewSE = '@attr 98=2 ';
        //}
        // ak existuje property idx, vygenerujeme z nej classn.t001
        if (config.idx) {
            config.classn = config.idx.piece('*', 1);
            config.t001 = config.idx.piece('*', 2);
            delete config.idx;
            if (config.classn.indexOf('_') > 0) {
                config.classn = i3.lName2className(config.classn);
            }
        }
        if (config.index) {
            sIndex = config.index;
        } else {
            sIndex = '12';
        }
        Ext.apply(config, {
            // 13.06.12 on; doplnena moznost zmenit index (vyhledat 1 zaznam podle jineho indexu)
            //query : '@attr 1=12 \'' + config.t001 + '\'',
            query: /*sNewSE +*/ '@attr 1=' + sIndex + ' \'' + config.t001 + '\'',
            // Callback redefinujeme, pretoze "success" u "search" nam preda zoznam zaznamov,
            // ale nas callback chce len jeden zaznam
            // T.j. defacto len forwardneme success call nasemu callbacku s tym, ze vratime len
            // prvy zaznam.
            success: function(recordlist) {
                //console.log('i3.WS.getRecord/success');
                // Ak sme v success a nasiel sa iny pocet zaznamov ako 1
                // potom je to chyba
                // Nie je dovod, aby podla kodu zaznamu nasiel viac ako jeden zaznam
                // a pokial by nenasiel nic, nema co volat success metodu.
                i3.assert(recordlist.length === 1, 'i3.WS.getRecord/success: record count != 1');
                successFn.call(scope, recordlist[0], args);
            },
            from: 1,
            to: 1,
            // 03.06.22 on; moznost nezobrazit chybovou zpravu, kdyz se zaznam nenajde - pouzito pri nacteni ciselniku comboboxu
            csNoErrMsg: config.csNoErrMsg
        });
        //if (config.XX) debugger;
        // prejdeme na metodu search, pricom vysledok ocakavame v callbackoch
        this.search(config);
    },
    /**
     * WS method search
     *
     * @param {Object} config<br>
     *  callback: nepovinne, vyuziva se pro zavreni hlasky i3.msgOff()<br>
     *   failure: function(errmsg)<br>
     *            ak sa neuvedie, vytvorime default<br>
     *            errmsg: textova hlaska o probleme - string<br>
     *   success: function(records)<br>
     *             records: found records - array of i3.Marc<br>
     * --<br>
     *   classn:  trieda, na ktorej sa bude vyhladavat<br>
     *   query:   PQF query<br>
     *   scope:   scope for callbacks; nepovinne. Ak nie je uvedene pouzijeme 'this'.<br>
     *   from:    poradove cislo prveho zaznamu (prvy zaznam v podari ma cislo 1 (nie 0 ako by bolo zvykom v JS))
     *            default: 1<br>
     *   to:      poradove cislo posledneho zaznamu na vratenie default: 10<br>
     *   fmt:     nepovinny parameter urcujuci format (lze zadat pole so zoznamom formatov)<br>
     *
     * 11.03.13 jk; pridan callback
     */
    search: function(config) {
        // ak 'failure' nie je uvedene, vyrobime default
        var failureFn = config.failure || this.defaultFailureFn;
        // 03.06.22 on; moznost nezobrazit chybovou zpravu, kdyz se zaznam nenajde - pouzito pri nacteni ciselniku comboboxu
        if (config.csNoErrMsg) {
            failureFn = function( /*emsg*/ ) {};
        }
        var oParams = {
            method: 'search',
            db: config.classn,
            query: config.query,
            from: config.from || 1,
            to: config.to || 10,
            options: config.options // 08.07.11 on; moznost predat nacteni diferenci
        };
        if (config.fmt) {
            oParams.fmt = config.fmt;
        }
        // konfig.objekt pre 'req()'. Nie je totozny s config objektom tejto funkcie
        // (ciastocne sa prekryvaju, ale nie uplne)
        i3.WS.req({
            success: function(response, options) {
                var aRecords = [],
                    i,
                    e = {};
                var scope = config.scope || this;
                // 16.04.13 on; osetreno padani Ext.util.JSON.decode
                //var o = Ext.util.JSON.decode(response.responseText);
                var o = i3.csJsonDecode(response.responseText);
                if (!o) {
                    return;
                }
                // 03.04.18 on; presunuto do createInterceptor
                // 22.09.17 on; zapamatuje si obsah vybranych udaju z odpovedi (headeru)
                //this.csRememberResponseData(o);
                // tu uz nemozeme pouzit this, pretoze moze ukazovat inde
                if (!this.checkRetFmtSearch(o, e)) {
                    failureFn.call(scope, 'Error parsing data. Msg: ' + e.msg, o);
                    return;
                }
                if (o.hits <= 0) {
                    // seems OK, but no hits (ie. no record found)
                    failureFn.call(scope, i3.tx.txNoRecordFound + ' (db=' + options.params.db + '; query=' + options.params.query + ').', o);
                    return;
                }
                var rec;
                // seems OK - pass records to 'success' callback
                // ocakame, ze data pridu vo formate vhodnom pre konfig zaznam i3.Marc,
                // ale jedna sa len o data, nie o objekty triedy "i3.Marc"
                // takze proste prejdeme cele pole a pre kazdy prvok zavolame "new" na triedu Marc
                // a vytvorime nove pole
                for (i = 0; i < o.records.length; i++) {
                    rec = new i3.Marc(o.records[i]);
                    if (oParams.fmt) {
                        rec.fmt = oParams.fmt;
                    }
                    aRecords.push(rec);
                }
                config.success.call(scope, aRecords);
            }, //
            //,failure: neuvadzame - pouzijeme - defaulnu urcenu nizsie
            //         aktivuje sa len pre pripady, kde WS req. fyzicky zlyha
            //         t.j. dodanu failure funkciu volame len explicitne, z vnutra "success"
            //
            params: oParams, // zostavavame v objekte "WS", callbacky potom volame rucne vial call()
            callback: config.callback,
            scope: this
        });
    },
    /**
     * Zapisat zaznam (WS method update)
     * @param {Object} config<br>
     *  callback:         nepovinne, vyuziva se pro zavreni hlasky i3.msgOff()<br>
     * operation:         viz. ucpOperation<br>
     *   success:         funkcia, ktora bude volana po uspesnom zapise<br>
     *     parametre:<br>
     *       rec: i3.Marc<br>
     *   failure:         funkcia, kt. bude volana po neuspesnom zapise<br>
     *     parametre:<br>
     *       msg: text chybovej spravy<br>
     *   scope:           scope pre callbacky (success/failure)<br>
     *   username:        volba username vo WS<br>
     *   auth:            autorizacia<br>
     *
     * @param {i3.Marc} pRecord: zaznam na zapis (object i3.Marc) - nesie classn/t001 + obsah zaznamu
     *
     * 11.03.13 jk; pridan callback
     * 30.07.09 rs; oprava config.failure na failureFn
     * 15.01.09 rs; drobne formalne upravy autorizacie
     * 12.01.09 jt; doplnenie autorizacie
     */
    update: function(config, pRecord) {
        // ak 'failure' nie je uvedene vyrobime default
        var failureFn = config.failure || this.defaultFailureFn;
        var op = config.operation || 'update';
        var rec = {};
        Ext.apply(rec, pRecord);
        // clone
        // pri inserte, ak kod zaznamu je iny ako 'new'
        // pridat prefix vynuteneho pridelenia zaznamu
        if ((op === 'insert') && (rec.t001 !== 'new')) {
            rec.t001 = '!' + rec.t001;
        }
        // vymazat Txx tagy, ak trieda nie je Cm*
        if (rec.classn.substring(0, 2) !== 'Cm') {
            rec.delTag('T**');
        }
        var oWsParams = {
            method: 'update',
            ucpOperation: op,
            db: rec.classn,
            record_id: rec.t001,
            options: config.options, // 01.12.11 on; options
            // 21.06.23 on; moznost zrusit kontrolu pri ulozeni
            //check: '1' 
            check: config.check || '1' // 12.11.21 on; vynucena kontrola
        };
        // 12.01.09 jt; doplnenie autorizacie
        // 15.01.09 rs; formalne upravy
        if (config.username && config.auth) {
            Ext.apply(oWsParams, {
                username: config.username,
                auth: config.auth
            });
        }
        // k parametrom WS pridat (pre ucely WS) zakodovany zaznam
        Ext.apply(oWsParams, rec.dataToWsRecord());
        this.req({
            success: function(response) {
                var e = {};
                var scope = config.scope || this;
                // 16.04.13 on; osetreno padani Ext.util.JSON.decode
                //var o = Ext.util.JSON.decode(response.responseText);
                var o = i3.csJsonDecode(response.responseText);
                if (!o) {
                    return;
                }
                // 03.04.18 on; presunuto do createInterceptor
                // 22.09.17 on; zapamatuje si obsah vybranych udaju z odpovedi (headeru)
                //this.csRememberResponseData(o);
                if (!i3.WS.checkRetFmtBasic(o, e)) {
                    // 30.07.09 rs; oprava config.failure na failureFn
                    failureFn.call(scope, 'Error parsing data. Msg: ' + e.msg);
                    return;
                }
                if (o.ret_code === '0') {
                    // OK
                    // 14.08.15 on; vyjimka pro operaci "check" - potrebuju vysledky kontrol - vrati cely json
                    if (op === "check") {
                        config.success.call(scope, o);
                    } else {
                        // 13.09.17 on; potrebuju si predat vysledky kontrol (o)
                        config.success.call(scope, new i3.Marc(o.records[0]), o);
                    }
                } else {
                    // 30.07.09 rs; oprava config.failure na failureFn
                    var sM = o.ret_code + '#' + o.ret_msg;
                    var m = new i3.WS.Msg(sM),
                        s = m.userText;
                    if (i3.isEmptyString(s)) { // toto by nemalo nastat (viac menej nudzova poistka)
                        s = 'Database update failed.';
                    }
                    // 11.05.16 on; pokud je soucasti ret_msg text "runtime error", tak vratim zpravu v puvodnim zneni
                    if (o.ret_msg && (o.ret_msg.indexOf('runtime error') > 0)) {
                        s += '<br><br>' + sM;
                    }
                    // 13.09.17 on; potrebuju si predat vysledky kontrol (o)
                    // s je text spravy prelozeny na uzivatelsky citatelnu spravu
                    failureFn.call(scope, s, o);
                }
            }, //
            //,failure: neuvazame - pouzijeme - defaulnu urcenu nizsie
            //          aktivuje sa len pre pripady, kde WS req. fyzicky zlyha
            callback: config.callback,
            params: oWsParams
        });
    },
    /**
     * WS operacia display
     *
     * @param {Object} config
     *  callback:        nepovinne, vyuziva se pro zavreni hlasky i3.msgOff()<br>
     * @param {i3.Marc} pRecord  Zaznam
     * @param {String} pFmt      Display format (later may also be array of many formats)
     *
     * 11.03.13 jk; pridan callbck
     */
    display: function(config, pRecord, pFmt) {
        // 30.07.14 on; ak 'failure' nie je uvedene vyrobime default
        var failureFn = config.failure || this.defaultFailureFn;
        var t001 = pRecord.t001;
        // niekedy mozeme mat rucne vytvoreny record bez t001-ky; tato je povinna pre WS request,
        // takze tu si umelo pridame
        if (i3.isEmptyString(t001)) {
            t001 = 'new';
        }
        var oWsParams = {
            method: 'display',
            db: pRecord.classn,
            record_id: t001,
            fmt: pFmt
        };
        // k parametrom WS pridat (pre ucely WS) zakodovany zaznam
        Ext.apply(oWsParams, pRecord.dataToWsRecord());
        this.req({
            success: function(response) {
                var e = {};
                var scope = config.scope || this;
                // 16.04.13 on; osetreno padani Ext.util.JSON.decode
                //var o = Ext.util.JSON.decode(response.responseText);
                var o = i3.csJsonDecode(response.responseText);
                if (!o) {
                    return;
                }
                // 03.04.18 on; presunuto do createInterceptor
                // 22.09.17 on; zapamatuje si obsah vybranych udaju z odpovedi (headeru)
                //this.csRememberResponseData(o);
                if (!i3.WS.checkRetFmtBasic(o, e)) {
                    // 30.07.14 on; zapojeno volani defaultFailureFn
                    //config.failure.call(scope, 'Method display: error parsing data. Msg: ' + e.msg);
                    failureFn.call(scope, 'Method display: error parsing data. Msg: ' + e.msg);
                    return;
                }
                if (o.ret_code === '0') {
                    // OK
                    var oRec = new i3.Marc(o.records[0]);
                    oRec.fmt = pFmt;
                    //                        forwardneme pouzity ZF dole do zaznamu
                    config.success.call(scope, oRec);
                } else {
                    // 30.07.14 on; zapojeno volani defaultFailureFn
                    //config.failure.call(scope, 'Method display failed. Msg: ' + o.ret_code + ': ' + o.ret_msg);
                    failureFn.call(scope, 'Method display failed. Msg: ' + o.ret_code + ': ' + o.ret_msg);
                }
            }, //,failure: neuvazame - pouzijeme - defaulnu urcenu nizsie
            //         aktivuje sa len pre pripady, kde WS req. fyzicky zlyha
            callback: config.callback,
            params: oWsParams
        });
    },
    /**
     * Konverzia ZF ziskaneho z metody display do HTMl stringu
     * neskor sa da vylepsovat.
     *
     * @param {i3.Marc} oRec
     */
    zf2HTML: function(pRec) {
        var s = pRec.data[0],
            sDel = '<br>',
            q;
        // <html>
        // 02.07.13 on; rozsireno o <!DOCTYPE html>
        // 09.08.11 on; s muze byt undefined
        var bHTML = s ? (s.substring(0, 5) === '<html') || (s.substring(0, 14) === '<!DOCTYPE html') : false;
        if (bHTML) {
            // uprava formatovania do HTML - proste zoberieme cast medzi <body></body>
            s = pRec.data.join('');
            // 26.04.24 on; znacka body muze mit i nejake parametry (znacek body tam muze byt i vic, ale zatim to neresim)
            //q = s.indexOf('<body>');
            //if (q > 0) {
            //    s = s.substring(q + 6, 999999);
            //}
            q = s.indexOf('<body');
            if (q > 0) {
                s = s.substring(q + 5, 999999);
            }
            q = s.indexOf('>');
            // 07.06.24 on; muze byt rovno 0
            if (q >= 0) {
                s = s.substring(q + 1, 999999);
            }
            q = s.indexOf('</body>');
            if (q > 0) {
                s = s.substring(0, q);
            }
            // 20.01.25 on; div s id
            s = '<div id="i3-display-format">' + s + '</div>';
            //if (console) {
            //   console.log('HTML=' + s);
            //}
            return s;
        }
        if (pRec.fmt === 'LINEMARC') {
            s = pRec.dataToStr(true);
            // 09.12.11 on; zrusi pole 001 (pokud tam je), protoze pak se prida na zacatek
            s = s.strswap('\n001    ' + pRec.t001, '');
            s = s.strswap('001    ' + pRec.t001 + '\n', '');
            s = s.strswap('001    ' + pRec.t001, '');
            s = s.strswap('>', '&gt;');
            s = s.strswap('<', '&lt;');
            s = s.strswap('\n', '<br>');
            s = '001    ' + pRec.t001 + '<br>' + s;
            // 16.09.09
            s = s.strswap(' ', '&nbsp;');
            s = '<font face="courier">' + s + '</font>';
            // pridat vizualny koniecc zaznamu - neskor sa event.moze zrusit
            // uprava na suvislejsiu ciaru 30.09.09 rs
            s = s + '<br><hr>';
        } else {
            s = pRec.data.join(sDel);
        }
        return s;
    },
    /**
     * @private
     * Zastupny znak pre medzeru pre command requesty
     * moze byt v podstate lubovolny, jedinou podmienkou je
     * ze by sa nemal vyskytnut v texte (t.j. treba vhodne zvolit)
     */
    cCmdUSpaceChar: '~',
    /**
     * @private
     * Jednoducha pomocka pre upravu udajov vstupujucich do parametrov pre "commandU"
     * v podstate ide o to prazdnu hodnotu nahradit medzerou
     * a volitelne upravu medzier
     */
    commandUParamFix: function(s, pSpaceFixup) {
        // logicka hodnota (obicajne z checkboxov)
        if (typeof s === 'boolean') {
            if (s) {
                return '1';
            }
            return '0';
        }
        // inak ocakavame len string
        // bud prazdny alebo neprazdny
        if (s === '') {
            return '.';
        }
        if (pSpaceFixup) {
            // textove pole so zastupnym znakom pre medzeru
            s = this.cCmdUSpaceChar + s.strswap(' ', this.cCmdUSpaceChar);
        } else {
            // inak eventualne pritomne medzery proste natvrdo vypustime
            // oni by tam normalne ziadne nemali byt (!)
            s = s.strswap(' ', '');
        }
        return s;
    },
    /**
     * Prikaz na WS zabaleny do WS-metody update (t.j. stary sposob zasielania prikazov)
     * viz. tiez metoda command()
     *
     * @param {Object} config
     * callback: nepovinne, vyuziva se pro zavreni hlasky i3.msgOff()<br>   * command: text prikazu<br>
     * failure: function(errmsg)<br>
     *    ak sa neuvedie, vytvorime default<br>
     *    errmsg: textova hlaska o probleme - string<br>
     * success: function(result)<br>
     * result: text vysledku (string)<br>
     * scope:   scope for callbacks; nepovinne. Ak nie je uvedene pouzijeme 'this'.<br>
     * classn:  trieda, na ktorej sa bude spustat prikaz<br>
     *
     * 11.03.13 jk; pridan callback
     */
    commandU: function(config) {
        //var oParams={
        //      method:      'update'
        //      ,db:         config.classn
        //     };
        // skonstruujeme zaznam pre zaslanie prikazu WS-metode update
        var recUpdt = new i3.Marc({
            classn: config.classn,
            t001: 'cmd',
            data: ['002    bydb ' + config.command]
        });
        // zasleme prikaz update
        this.update({
            operation: 'update', // Callback success metody update, dostane vysledny MARC zaznam,
            // ale nasa metoda chcel aby callback dostal uz len vysledok prikazu.
            // Takze tu urobime len easy obalku, ktora preberie zaznam,
            // vyberie z neho tag 002 (vysledok command/update)
            // a forwardne ho nasej 'success' metode
            success: function(pResRec) {
                var sResult = pResRec.getTag('002.');
                // prefix "ok" zatial odrezieme
                // "ok: "
                if (sResult.substring(0, 4) === 'ok: ') {
                    sResult = sResult.substring(4, sResult.length);
                } else
                    // 20.11.19 on; vysledek muze byt i "ok:" (bez mezery)
                    if (sResult === 'ok:') {
                        sResult = '';
                    }
                // forwardnut vysledok
                config.success.call(config.scope, sResult);
            }, // failure zatial nechavame 1:1 (eventualne moze byt aj undefined)
            failure: config.failure,
            callback: config.callback,
            // a predat dalej zaslanu scope
            scope: config.scope || this
        }, recUpdt);
    },
    /**
     * Command tyou "update" do ReportCommon

     * @param {Object} config
     *
     * 19.10.11 on; doplnena podpora pro reporty
     */
    commandURC: function(config) {
        var sType;
        if ((config.type) && (config.type !== '')) {
            sType = config.type;
        } else {
            sType = 'proc';
        }
        config.command = sType + ' ReportCommon ' + config.command;
        this.commandU(config);
    },
    /**
     * WS metoda command
     *
     * @param {Object} config
     * db:       trieda na kt. spustat prikaz<br>
     * command:  prikaz<br>
     * callback: nepovinne, vyuziva se pro zavreni hlasky i3.msgOff()<br>
     * params:   parametre<br>
     * paramsX:  objekt s dalsimi parametrami, tieto budu 1:1 posunute do WS sluzby,
     *           napr. sa takto da poslat "record" alebo pripadne dalsie info,
     *           ktore by dany command mohol event.potrebovat<br>
     * failure:  function(errmsg) - nepovinna, ak sa neuvedie, vygeneruje sa default<br>
     * success:  function(pJSON)  - bude volana s dekodovanymi JSON datami vysledku<br>
     *           success bude volana aj v pripade, ak command vratil iny ret_code ako 0,
     *           teda aj v pripade "zlyhania"
     * bDontHandleErr:   moznost oserit uzivatelsky i ret_code <> 0
     *
     * <br>
     * 11.03.13 jk; doplnen callback
     * 18.08.09 rs; dalsie parametre<br>
     * 21.01.09 rs; oprava obsahu (povodne nebolo funkcne)
     */
    command: function(config) {
        var sucessFn = config.success;
        // ak 'failure' nie je uvedene vyrobime default
        var failureFn = config.failure || this.defaultFailureFn;
        var scope = config.scope || this;
        // 28.06.10 on; doplneny prevod na classname
        var sDb = config.db;
        if (sDb.find('_')) {
            sDb = i3.lName2className(sDb);
        }
        // pevne urcene parametre
        var cmdParams = {
            method: 'command',
            command: config.command,
            db: sDb,
            params: config.params || ''
        };
        // volitelne nepovinne parametre - budu len akopirovane 1;1
        if (config.paramsX) {
            Ext.apply(cmdParams, config.paramsX);
        }
        // 21.09.23 on; moznost predat zaznam
        var rec = {};
        if (config.record) {
            // kopie objektu
            Ext.apply(rec, config.record);
            // vymazat Txx tagy, ak trieda nie je Cm*
            if (rec.classn.substring(0, 2) !== 'Cm') {
                rec.delTag('T**');
            }
            Ext.apply(cmdParams, rec.dataToWsRecord());
        }
        //var that = this;
        this.req({
            params: cmdParams,
            // 20.10.15 on; predani formu
            form: config.form,
            isUpload: config.isUpload,
            success: function(response) {
                var e = {};
                // 16.04.13 on; osetreno padani Ext.util.JSON.decode
                //var o = Ext.util.JSON.decode(response.responseText);
                var o = i3.csJsonDecode(response.responseText);
                if (!o) {
                    return;
                }
                // 03.04.18 on; presunuto do createInterceptor
                // 22.09.17 on; zapamatuje si obsah vybranych udaju z odpovedi (headeru)
                //that.csRememberResponseData(o);
                if (!i3.WS.checkRetFmtBasic(o, e)) {
                    failureFn.call(scope, 'Error parsing data. Msg: ' + e.msg);
                    return;
                }
                // 09.06.16 on; predelane, zkusim defaultne vracet chybovou zpravu - at je to vsude stejne
                if (!config.bDontHandleErr && o && (o.ret_code !== "0")) {
                    var m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
                    i3.displayError(m.userText);
                    return;
                }
                sucessFn.call(scope, o);
            },
            failure: failureFn,
            callback: config.callback,
            scope: scope
        });
    },
    /**
     * Odoslanie requestu na kontrolu prist.prav
     *
     * @param {Object} config<br>
     *   db            - objekt, pre ktore ideme testovat prava<br>
     *   right         - testovane pravo, nepovinne default 'w'<br>
     *   username,auth - nepovinna autorizacia<br>
     *   success       - funkcia, kt. bude volana v pripade uspechu (pozor musi este pomocou
     *                   (o.ret_code !== '0') rozlisit, ci bolo pravo OK alebo nie)
     *                   povinne<br>
     *   failure       - nepovinna funkcia pre pripad zlyhania na urovni WS
     *
     */
    rights: function(config) {
        Ext.applyIf(config, {
            right: 'w'
        });
        var cmdParams = {
            method: 'rights',
            db: config.db,
            right: config.right
        };
        var scope = config.scope || this;
        // moze prist aj autorizacia, ale nemusi
        if (config.username) {
            Ext.apply(cmdParams, {
                username: config.username,
                auth: config.auth
            });
        }
        var sucessFn = config.success;
        // ak 'failure' nie je uvedene vyrobime default
        var failureFn = config.failure || this.defaultFailureFn;
        //var that = this;
        this.req({
            params: cmdParams,
            success: function(response) {
                var e = {};
                // 16.04.13 on; osetreno padani Ext.util.JSON.decode
                //var o = Ext.util.JSON.decode(response.responseText) ;
                var o = i3.csJsonDecode(response.responseText);
                if (!o) {
                    return;
                }
                // 03.04.18 on; presunuto do createInterceptor
                // 22.09.17 on; zapamatuje si obsah vybranych udaju z odpovedi (headeru)
                //that.csRememberResponseData(o);
                if (!i3.WS.checkRetFmtBasic(o, e)) {
                    failureFn.call(scope, 'Error parsing data. Msg: ' + e.msg);
                    return;
                }
                sucessFn.call(scope, o);
            },
            failure: failureFn,
            scope: scope
        });
    },
    /**
     * Ziskat nazov Untablesd triedy.<br><br>
     *
     * Da sa pouzit niekolkymi sposobmi:<br>
     * pokial metodu volame bez parametrov (pICtx===undefined) potom sa vrati nazov defaultnej
     * UnTablesd tabulky - to je XxxUnTablesd (pre globalny kontext Xxx) alebo len 'UnTablesd'
     * ak by globalny kontext i3.ictx nebol nastaveny - nemusi byt pre aplikacie, kt. nemaju kontext
     * (napr. centralna admin app).
     *
     * @param {String} pICtx   Nepovinny parameter ictx.
     */
    getDfltUnTablesd: function(pICtx) {
        if (pICtx === undefined) {
            pICtx = i3.ictx;
        }
        return (pICtx || '') + 'UnTablesd';
    },
    /**
     * Nacte kofiguraci ze serveru (CLIENT_CFG)
     *
     * 10.02.12 on;
     */
    getClientCfg: function(pCfg) {
        // 02.02.22 on; doplnen IS_BRANCH
        var aT001List = ['CLIENT_CFG', 'COMMON' /*jazykova mutace ciselniku se musi nacist na zacatku*/ , 'IS_BRANCH'],
            aCustom;
        aCustom = pCfg.csCfgRecordName;
        if (aCustom) {
            if (!Ext.isArray(aCustom)) {
                aCustom = [aCustom];
            }
            aT001List = aT001List.concat(aCustom);
        }
        i3.WS.sTablesdCacheInit({
            classn: i3.WS.getDfltUnTablesd(),
            t001: aT001List,
            // funkcia bude volana po uspesnom nacitani dat
            followup: function() {
                // 01.12.22 on; zkusi nacist zaznam se sufixem pobocky
                var sBranch = i3.WS.sTablesdCacheGet('CLIENT_CFG').getTag('T01p');
                if (sBranch !== '') {
                    i3.WS.sTablesdCacheInit({
                        classn: i3.WS.getDfltUnTablesd(),
                        t001: ['CLIENT_CFG_' + sBranch],
                        // nemusi existovat
                        //csNoErrMsg : true,
                        // funkcia bude volana po uspesnom nacitani dat
                        followup: function() {
                            pCfg.csSetClientCfgMethod(pCfg.params);
                            if (pCfg.csCallback) {
                                var scope = pCfg.csScope || this;
                                pCfg.csCallback.call(scope);
                            }
                        },
                        failure: function() {
                            // i kdyz nic nenajde, vola callback              
                            pCfg.csSetClientCfgMethod(pCfg.params);
                            if (pCfg.csCallback) {
                                var scope = pCfg.csScope || this;
                                pCfg.csCallback.call(scope);
                            }
                        }
                    });
                    return;
                }
                pCfg.csSetClientCfgMethod(pCfg.params);
                if (pCfg.csCallback) {
                    var scope = pCfg.csScope || this;
                    pCfg.csCallback.call(scope);
                }
            },
            // scope pre success & followup funkciu
            // pozor success musi explicitne volat followup
            scope: this
        });
    },
    /**
     * Pole s cache zaznamov z UnTablesd
     * Interna premenna pre metody spravujuce cache
     *
     * @private
     */
    sTablesdCache: [],
    /**
     * Pridanie zaznamu do cache
     * @private
     * pRecord:
     * t001   - pole kodov zaznamov, ktore chceme precitat
     * classn - nepovinne - nazov UnTablesd - ak sa neuvedie pouzije sa default XxxUnTablesd
     *          podla globalneho ictx
     */
    sTablesdCacheAdd: function(pRecord) {
        this.sTablesdCache[pRecord.classn + '*' + pRecord.t001] = pRecord;
    },
    /**
     * Precitanie zaznamu z record cache. Zaznam je potreba nejaku dobu predytm nacitat
     * kedze pride asynchronne.
     *
     * @param {String} pKey  classn*key    (classn je XxxUntablesd)
     */
    sTablesdCacheGet: function(pKey) {
        // ak nebol zadany prefix UnTablesd, tak pridame defaultny
        if (pKey.indexOf('*') < 0) {
            pKey = this.getDfltUnTablesd() + '*' + pKey;
        }
        return this.sTablesdCache[pKey];
    },
    /**
     * Datove pole cache
     * Interna privatna premenna.
     * @private
     */
    sXlateCache: [],
    /**
     * Pridat udaj jeden MARC riadok do sXlate cache
     * @private
     */
    sSXlateCacheAdd: function(pSTable, pKey, pMarcLine) {
        var s = pSTable + '*' + pKey;
        this.sXlateCache[s] = pMarcLine;
    },
    /**
     * Precitat udaj z sXlate cache (MARC riadok)
     * @private
     */
    sSXlateCacheGet: function(pSTable, pKey) {
        var s = pSTable + '*' + pKey;
        return this.sXlateCache[s];
    },
    /**
     * Zadany zoznam zaznam nacitat do cache zaznam. Nerobi sa reset cache, takze
     * Moze sa volat viac krat s roznym zoznamom. Zaznamy zo zoznamu budu async pridane do cache.
     *
     * @param {Object} config <br>
     *     t001: pole kodov zaznamov z XxxUnTablesd
     */
    sTablesdCacheInit: function(config) {
        if (!config.classn) {
            config.classn = this.getDfltUnTablesd();
        }
        // pridat sucess funkciu
        Ext.apply(config, {
            success: function(pRecList) {
                Ext.each(pRecList, function(pRecord /*, pIndex, pAllItems*/ ) {
                    // teraz sme vo funkcii ktora dostane jednotlive zaznamy
                    i3.WS.sTablesdCacheAdd(pRecord);
                    return true;
                }, this);
                if (config.followup) {
                    config.followup.call(config.scope);
                }
            }
        });
        this.getRecords(config);
        // precitat zaznamy
    },
    /**
     * Static table xlate
     *
     * @param {String} pSTable   Nazov statickej tabulky
     * @param {String} pKey      Kluc, ktory v tabulke hladame
     * @param {String} pSubTag   Nepovinny param, pole, ktore hladam v stat.tabulke. Default 'b'
     * @param {String} pLanguage Nepovinny param, jazyk v ktorom vratit hodnotu. Default - globalny jazyk. Pro 999 nebude vracet jazykovou verzi, ale vrati cely obsah
     *
     ***<br>
     * POZOR: aktualne funguje len na Tablesd zaznamy, ktore uz predtym boli nacitane
     * via sTablesdCacheInit() !!!<br>
     * Ak by zaznam nebol nacitany - vrati '';<br>
     ***
     * <br>
     * 25.03.09 rs; doplnenie return value
     */
    sXlate: function(pSTable, pKey, pSubTag, pLanguage) {
        // podprogram na vratenie spravnej hodnoty podpole+jazyk
        // pre dany MARC riadok tagu 200 (uz zodpovedajuci pSTable+pKey)
        function prvGetValue(pLine) {
            if (pSubTag === undefined) {
                pSubTag = 'b';
            } // default subtag is 'b'
            var sValue = i3.Marc.getSubTagStr(pLine, pSubTag);
            // 20.09.17 on; pokud zadam jazyk 999, tak nechcu jazykove verze
            if (pLanguage !== '999') {
                sValue = i3.languageSel(sValue, pLanguage);
            }
            return sValue;
        }
        // do cache pouzivame kluc s prefixom XxxUnTablesd - aby nedoslo k chyba, pri
        // prepinani ictx
        if (pSTable.indexOf('*') < 0) {
            pSTable = this.getDfltUnTablesd() + '*' + pSTable;
        }
        // najprv pozrieme, ci tako konkretna hodnota uz nahodou nie je cachovana
        var s = this.sSXlateCacheGet(pSTable, pKey);
        if (s !== undefined) {
            return prvGetValue(s);
        }
        // precitame Tablesd zaznam v cache - aktualne sxlate funguje len na zaznamy, ktore
        // uz dopredu boli nacitane (!)
        var oRecord = this.sTablesdCacheGet(pSTable);
        if (oRecord === undefined) {
            return '';
        }
        // nacitat vsetky riadky tagu 200
        var sTag200 = oRecord.getTag('200', -1),
            sLine = '';
        // sekvencny search po riadkoch
        Ext.each(sTag200, function(li) {
            s = i3.Marc.getSubTagStr(li, 'a');
            if (s === pKey) {
                sLine = li;
                return false;
            }
            return true;
            // 25.03.09 rs; doplnenie return value
        });
        // do cache ulozime cely MARC riadok (t.j. vsetky podpolia a vsetky jazyky)
        this.sSXlateCacheAdd(pSTable, pKey, sLine);
        return prvGetValue(sLine);
    },
    /**
     * Vrati true pokud je zadana trida lokalni.<br><br>
     *
     * @param {String} pClass   Nazev tridy.
     */
    isLocalClass: function(pClass) {
        // 08.10.10 on; doplnena kontrola pClass
        // 25.06.10 on; zatim jenom takto jednoduse
        return (pClass && (pClass.piece('_', 1).toUpperCase() === i3.ictx.toUpperCase()));
    },
    /**
     * @class i3.WS.getCommandGroup
     * @param {String} psCommand Název commandu. Pokud nejde o proc, musí se zadat kopletní obsah $a z COMMAND_GROUPS např. "report orderSub"
     *
     * Vráti skupinu pro zadaný command.
     *
     */
    getCommandGroup: function(psCommand, psUnTablesd) {
        // nacte skupinu z COMMAND_GROUPS
        var s001;
        // pokud nebylo zadane "proc", doplni ho - "proc" je default
        if (psCommand.fieldcount(' ') < 2) {
            psCommand = 'proc ' + psCommand;
        }
        // 07.06.18 on; moznost predat IcxtUnTablesd
        if (psUnTablesd) {
            s001 = psUnTablesd + '*COMMAND_GROUPS';
        } else {
            s001 = 'COMMAND_GROUPS';
        }
        var sTranslMsgTx = i3.WS.sXlate(s001, psCommand);
        return sTranslMsgTx;
    },
    /**
     * @class i3.WS.getCommandGroupClass
     * @param {String} psCommand Název commandu. Pokud nejde o proc, musí se zadat kopletní obsah $a z COMMAND_GROUPS např. "report orderSub"
     *
     * Vráti security tridu pro dany prikaz nebo nic.
     *
     */
    getCommandGroupClass: function(psCommand) {
        var sGroup = i3.WS.getCommandGroup(psCommand);
        if (sGroup === '') {
            if (psCommand.fieldcount(' ') < 2) {
                psCommand = 'proc ' + psCommand;
            }
            i3.displayError(String.format(i3.WS.tx.txCmdGrpEmpty, psCommand, i3.lName2className(i3.ictx.toUpperCase() + '_UN_TABLESD')));
            // 11.07.14 on; pokud nic nenajde, vrati prazdny retezec
            return '';
        }
        return i3.lName2className('CMD_' + i3.ictx.toUpperCase() + '_' + sGroup);
    },
    /*
     * Pomocna funkce vrati pozadovany ZF z objektu, ktery vrati i3.WS.getRecord
     *
     */
    getDisplayFormatFromRecord: function(pRecord, psDFName) {
        var i;
        if (pRecord && pRecord.zf) {
            for (i = 0; i < pRecord.zf.length; i++) {
                if (psDFName === pRecord.zf[i].name) {
                    return pRecord.zf[i].data;
                }
            }
        }
        return [];
    },
    /**
     * Uchova si vybrane udaje z posledni odpovedi serveru
     *
     * 22.09.17 on;
     */
    csRememberResponseData: function(poResponse) {
        // zatim
        if (poResponse.header) {
            if (!i3.isEmptyString(poResponse.header.username)) {
                this.csSecurity.username = poResponse.header.username;
            }
            if (!i3.isEmptyString(poResponse.header.arlsso)) {
                this.csSecurity.arlsso = poResponse.header.arlsso;
            }
            // 03.04.18 on; CSPCHD a nonce
            this.baseParams.nonce = poResponse.header.nonce;
            // 03.05.18 on; i3 aplikace pouzivaji cookies
            //this.baseParams.CSPCHD = poResponse.header.sessioncookie;
            //this.baseParams.OCSPCHD = poResponse.header.sessioncookie;
        }
    },
    /**
     * @class i3.WS.csGetSpecOptions
     *
     * 30.03.20 on; vrati options z mapy poli (v callbacku - config.callback)
     */
    csGetSpecOptions: function(config) {
        var s001 = 'TAGMAP_' + config.fmt + '_' + config.tag;
        // sXlate s nactenim zaznamu, pokud neni v cache
        i3.WS.sXlateWithGetRecord(s001, config.subtag, config.prefix, config);
    },
    /**
     * Static table xlate i pokud neni zaznam v cache
     *
     * @param {String} pSTable   Nazov statickej tabulky
     * @param {String} pKey      Klic, obsah podpole $a
     * @param {String} pPrefix   Prefix v podpoli $k
     * @param {String} config    objekt s callbackem a scope
     *
     * 31.03.20 on;
     */
    sXlateWithGetRecord: function(pSTable, pKey, pPrefix, config) {
        // do cache pouzivame kluc s prefixom XxxUnTablesd - aby nedoslo k chyba, pri
        // prepinani ictx
        if (pSTable.indexOf('*') < 0) {
            pSTable = this.getDfltUnTablesd() + '*' + pSTable;
        }
        // nacte zaznam z cache, pokud tam neni nacte ho z db
        var oRecord = this.sTablesdCacheGet(pSTable);
        if (oRecord === undefined) {
            i3.WS.sTablesdCacheInit({
                classn: i3.WS.getDfltUnTablesd(),
                t001: [pSTable.piece('*', 2)],
                options: 'd', // 01.04.20 on; kvuli cteni tagmap
                // funkcia bude volana po uspesnom nacitani dat
                followup: function() {
                    this.sXlateWithGetRecord1(pSTable, pKey, pPrefix, config);
                },
                // scope pre success & followup funkciu
                // pozor success musi explicitne volat followup
                scope: this
            });
            return;
        }
        this.sXlateWithGetRecord1(pSTable, pKey, pPrefix, config);
    },
    /**
     * Static table xlate i pokud neni zaznam v cache - pokracovani
     *
     * @param {String} pSTable   Nazov statickej tabulky
     * @param {String} pKey      Klic, obsah podpole $a
     * @param {String} pPrefix   Prefix v podpoli $k
     * @param {String} config    objekt s callbackem a scope
     *
     * 31.03.20 on;
     */
    sXlateWithGetRecord1: function(pSTable, pKey, pPrefix, config) {
        // vrati dany prefix z podpole $k
        function prvProcessValue(pLine) {
            var i,
                sValue = i3.Marc.getSubTagStr(pLine, 'k');
            if (pPrefix !== '') {
                i = sValue.prefixLocate('#', pPrefix);
                if (i > 0) {
                    sValue = sValue.piece('#', i);
                } else {
                    sValue = '';
                }
            }
            if (config.callback) {
                var scope = config.scope || this;
                config.callback.call(scope, sValue);
            }
        }
        var oRecord = this.sTablesdCacheGet(pSTable);
        if (oRecord === undefined) {
            // toto uz by nemelo nastat
            return;
        }
        // najprv pozrieme, ci tako konkretna hodnota uz nahodou nie je cachovana
        var s = this.sSXlateCacheGet(pSTable, pKey);
        if (s !== undefined) {
            prvProcessValue(s);
            return;
        }
        // nacitat vsetky riadky tagu 200
        var sTag200 = oRecord.getTag('200', -1),
            sLine = '';
        // sekvencny search po riadkoch
        Ext.each(sTag200, function(li) {
            s = i3.Marc.getSubTagStr(li, 'a');
            if (s === pKey) {
                sLine = li;
                return false;
            }
            // 25.03.09 rs; doplnenie return value
            return true;
        });
        // do cache ulozime cely MARC riadok (t.j. vsetky podpolia a vsetky jazyky)
        this.sSXlateCacheAdd(pSTable, pKey, sLine);
        prvProcessValue(sLine);
        return;
    }
};
/**
 * @class i3.WS.Msg
 * @param {String} pMsgTx Text spravy na dekodovanie.

 * Dekodovanie WS spravy
 *
 * 07.06.18 on; moznost predat UnTablesd
 * 21.11.17 on; moznost nastavit oddelovac psDelim
 * 25.03.09 rs; pridane return false
 */
i3.WS.Msg = function(pMsgTx, psDelim, psUnTablesd) {
    this.msg = [];
    // pole s indexom kodu spravy a RAW textom
    this.msgUser = [];
    // detto, ale texty sprav su uz prelozene a parametre nahradene
    this.userText = '';
    // 21.11.17 on; moznost nastavit oddelovac psDelim
    if (!psDelim) {
        psDelim = '<br>';
    }
    Ext.each(pMsgTx.split('|'), function(pMsg) {
        var s001;
        if (pMsg === '') {
            return true;
        }
        // sprava rozdelena na "#"
        var aMsg = pMsg.split('#');
        // kod spravy
        var sMsgCode = aMsg[0];
        if ((sMsgCode === undefined) || (sMsgCode === '')) {
            return true;
        }
        // text spravy
        var sMsgTx = aMsg.slice(1).join('#');
        var nMsgCodeLen = sMsgCode.length;
        // 10.09.15 on; zvysen limit kodu zpravy z 15
        if ((nMsgCodeLen > 4) && (nMsgCodeLen < 20)) {
            // Vyzera to na platny kod spravy
            // ulozime raw text spravy do property pola 'msg'
            this.msg[sMsgCode] = sMsgTx;
            // prefix kodu spravy
            var sPrefix = sMsgCode.substring(0, 3);
            // spravy s niektorymi prefixami nesu priamo data a tak ich nema vyznam prekladat
            // preto sa ulozia len 1:1 do pola 'msg'
            if (sPrefix !== 'DAT') {
                // 10.02.12 on; uzivatelsky ciselnik zruseny
                // Nacitat uzivatelsky text spravy. Najprv pozrieme do uzivatelskeho ciselnika
                // sprav, ak sa text nenajde potom do standardneho.
                //var sTranslMsgTx = i3.WS.sXlate('IS_RETURN_CODE_USER', sMsgCode);
                //if(sTranslMsgTx === '') {
                //  sTranslMsgTx = i3.WS.sXlate('IS_RETURN_CODE', sMsgCode);
                //}
                // 07.06.18 on; moznost predat IcxtUnTablesd
                if (psUnTablesd) {
                    s001 = psUnTablesd + '*IS_RETURN_CODE';
                } else {
                    s001 = 'IS_RETURN_CODE';
                }
                var sTranslMsgTx = i3.WS.sXlate(s001, sMsgCode);
                // vyplnit parametre v texte spravy - viz. popis formatu IS_RETURN_CODE vo wiki
                sTranslMsgTx = i3.fillInParams(sTranslMsgTx, aMsg.slice(1));
                this.msgUser[sMsgCode] = sTranslMsgTx;
                // 21.11.17 on; volitelny oddelovac
                // 14.08.15 on; lepsi je mit kazdou zpravu na samostatnem radku (EPCA CAV)
                //this.userText = this.userText + ((this.userText !== '') ? ' ' : '') + sTranslMsgTx;
                //this.userText = this.userText + ((this.userText !== '') ? '<br>' : '') + sTranslMsgTx;
                this.userText = this.userText + ((this.userText !== '') ? psDelim : '') + sTranslMsgTx;
            }
        }
        return true;
        // 25.03.09 rs; pridane return false
    }, this);
    // ak sa nic nedekodovalo, potom do user textu 1:1 dame, co nam prislo
    // toto je pre stare neformatovane spravy
    if (this.userText === '') {
        this.userText = pMsgTx;
    }
};
/*
 * Dekodovanie WS spravy
 * metody objektu
 *
 */
i3.WS.Msg.prototype = {
    /** Z dekodovanej spravy, precitat text podspravy v prelozenom tvare.
     Prekladom sa mysli, dotiahnutie textu spravy z IS_RETURN_CODE a doplnenie parametrov.

     Priklad pouzitia:
     m=new i3.WS.Msg(pSprava);
     s=m.getSubMsgUser('XY');

     @param {String} pCode Kod spravy.
     */
    getSubMsgUser: function(pCode) {
        var s = this.msgUser[pCode];
        if (s === undefined) {
            return '';
        }
        return s;
    },
    /**
     * Z dekodovanej spravy, precitat text podspravy v neprelozenom (povodnom) tvare.
     *
     * @param {String} pCode - Kod spravy.
     */
    getSubMsg: function(pCode) {
        var s = this.msg[pCode];
        if (s === undefined) {
            return '';
        }
        return s;
    }
};
/*eof*/
