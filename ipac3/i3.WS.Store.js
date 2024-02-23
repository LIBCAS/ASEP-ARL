/*
 * Objekty Store zalozene na WS
 * Kod v tomto subore je pokracovanim i3.WS.js
 *
 * 01.11.22 on; moznost pridat ke kodu polozky ciselniku odlisujici retezec (deduplikace kodu ciselniku)
 * 07.10.22 on; reakce na nenalezeni zaznamu, pokud jde o ciselnik se sufixem pobocky, zkusi to bez ni?
 * 03.06.22 on; moznost nezobrazit chybovou zpravu, kdyz se zaznam nenajde - pouzito pri nacteni ciselniku comboboxu
 * 03.12.15 on; rozsirena podpora csDisplayID
 * 02.10.15 on; querytype kvuli WOS, SCOPUS
 * 10.06.14 on; rozsireno setSearchQuery
 * 15.05.14 on; doresena arabstina
 * 20.03.14 on; arabstina
 * 20.12.12 on; uprava createSearchQuery
 * 24.07.12 on; doplneno pole ZF
 * 07.06.12 on; uprava podminky v setScanQuery
 * 02.03.12 on; formalni zmeny zapisu
 * 18.01.12 on; doplneny backward scan
 * 04.10.11 on; rozsiren WSSTProxy
 * 08.07.11 on; zapojeno nacteni diferenci pro StoreST
 * 06.05.11 jk; rozsireno o plneni data
 * 11.10.10 on; zpusob zobrazeni prazdneho vyhledavani
 * 19.10.09 rs; i3.WS.Store: skopiruje aj language z baseParams
 * 05.10.09 rs; upravy dokumentacia
 * 08.09.09 rs; oprava csOnBeforeLoad nastavoval omylom parameter "v" do WS
 * 24.08.09 rs; formalne upravy
 * 22.04.09 rs; formalne upravy
 * 04.02.09 rs; premenovana option usrDebug na csDebug; pridanie option csShowInfo0Rec
 * 24.01.09 rs; podmienka pre zobrazenie onLoad spravy pri nulovom pocete zaznamov
 * 05.01.09 rs; i3.WS.StoreScan.setScanQuery: pridany param psQueryLimit
 * 08.07.08 rs; oddelenie od i3.WS.js
 * --
 */
/*global Ext,i3 */
Ext.ns('i3.WS.tx');
Ext.apply(i3.WS.tx, {
    // N zaznamov (teoreticky pripad)
    txWarningNRecFound: ('Upozornenie: počet nájdených záznamov: %s!#' + 'Upozornění: počet nalezených záznamů: %s!#' + 'Warning: count of found values: %s!###تحذير: عدد القيم التي تم إيجادها: %s!').ls(),
    // prave 0 zaznamov (pozn. spravu je mozne predefinovat pouzitim config option)
    txWarning0RecFound: ('Upozornenie: zadanými selekčnými kritériami neboli nájdené žiadne záznamy.#' + 'Upozornění: zadanými selekčními kritérii nebyli nalezeny žádné záznamy.#' + 'Warning: no records found by given search criteria.###تحذير: لم يتم إيجاد أي سجلات حسب معايير البحث المعطاة.').ls()
});
Ext.ns('i3.WS');
/**
 * @class i3.WS.Store
 * Zakladne ARL WS store - nepouzivat priamo.
 */
i3.WS.Store = Ext.extend(Ext.data.JsonStore, {
    /**
     * @param {Object} config
     * config options:
     * csDebug:         debug rezim (vcetne: zobrazovat info spravy)
     * csShowInfo0Rec:  zobrazit info spravu u 0 najdenych zaznamoch
     *                  aktualne detto ako csDebug - neskor sa moze zmysel
     *                  zjemnit - chcem mat debug oddelene od info sprav
     *                  typ: boolean, default: false
     * csTxInfo0Rec:    volitelny text spravy o 0 zaznamoch (ak sa neuvedie,
     *                  pouzije sa default; aby sa sprava zobrazila
     *                  treba sucasne zapnut csShowInfo0Rec)
     *                  parameter je mozne menit aj pocas runtime priamo nastavenim
     *                  (nebudem zatial na to robit metodu)
     */
    constructor: function(config) {
        config = config || {};
        // defaulty z objektu WS sluzby
        Ext.apply(config, {
            url: i3.WS.baseURL,
            baseParams: (config.baseParams || {})
        });
        Ext.applyIf(config.baseParams, i3.WS.baseParams);
        // defaulty zakladneho WS store
        Ext.applyIf(config, {
            root: 'data',
            listeners: {}
        });
        Ext.applyIf(config.listeners, {
            loadexception: {
                fn: this.csOnLoadException,
                scope: this
            },
            load: {
                fn: this.csOnLoad,
                scope: this
            },
            beforeload: {
                fn: this.csOnBeforeLoad,
                scope: this
            }
        });
        i3.WS.Store.superclass.constructor.call(this, config);
    },
    /**
     *
     * zobrazenie info o nulovom pocte najdenych zaznamov
     * toto asi do buducna nebudeme chciet ako default - zatial experimentalne
     *
     *  03.02.09 rs; drobne vylepsenie + preklad sprav
     *  24.01.09 rs; podmienka pre zobrazenie onLoad spravy pri nulovom pocete zaznamov
     *               zmenena na debug OR nulovy pocet
     *               (predtym bolo OR)
     * @param {Object} store
     * @param {Object} records
     * @param {Object} options
     */
    csOnLoad: function(store, records, options) {
        //i3.msg('Store','load');
        var c = records.length,
            bS = (this.csDebug > 0) || this.csShowInfo0Rec;
        // upozornime, ak sa nenasli ziadne zaznamy
        if ((c < 0) && bS) {
            // 15.05.14 on; oprava hlasky
            //i3.msg(i3.WS.tx.txWarningNRecFound, c);
            i3.msg(i3.fillInParams(i3.WS.tx.txWarningNRecFound, [c]));
        }
        if ((c === 0) && bS) {
            // 02.03.12 on; zmena zapisu
            // 11.10.10 on; zmena na i3.alert
            // zobrazime bud uzivatelsky upravenu spravu pre dane store, alebo
            // defaultnu spravu
            //i3.msg(this.csTxInfo0Rec ? this.csTxInfo0Rec : i3.WS.tx.txWarning0RecFound);
            //i3.alert(this.csTxInfo0Rec ? this.csTxInfo0Rec : i3.WS.tx.txWarning0RecFound);
            i3.alert(this.csTxInfo0Rec || i3.WS.tx.txWarning0RecFound);
        }
    },
    /**
     * Metoda volana pred odoslanim requestu na server
     * skopiruje globalny debug flag pre ucely tohto store
     *
     * 19.10.09 rs; skopiruje aj language
     * 25.06.09 rs; pridane aj kopirovanie ictx
     * 18.06.09 rs
     */
    csOnBeforeLoad: function() {
        if (i3.WS.baseParams.debug !== undefined) {
            this.baseParams.debug = i3.WS.baseParams.debug;
        }
        // pri prvom req.skopiruje aj ictx
        if ((i3.WS.baseParams.ictx !== undefined) && (!this.baseParams.ictx)) {
            this.baseParams.ictx = i3.WS.baseParams.ictx;
        }
        // aj language
        if ((i3.WS.baseParams.language !== undefined) && (!this.baseParams.language)) {
            this.baseParams.language = i3.WS.baseParams.language;
        }
    },
    /**
     * Zobrazenie chybovej spravy z WS
     *
     * JSOnStore.loadexception: Fires if an exception occurs in the
     * Proxy during loading. Called with the signature of the Proxy's "loadexception"
     * event.
     *
     * Proxy by mala byt HttpProxy. Ta ma onloadexception definovany ako: (viz. nizsie)
     *
     */
    csOnLoadException: function(pProxy, pOptions, pResponse, pError) {
        i3.msg('Store', 'loadexception');
        var sInfo = '(data from WS server not available)',
            oJSON;
        if (!pError) {
            sInfo = 'seems there were no data received from server (no reply)';
        } else {
            // seems there is reply - some info should be in pError
            if ((pError.name === 'TypeError') && this.reader && this.reader.jsonData && (this.reader.jsonData.ret_code !== undefined)) {
                oJSON = this.reader.jsonData;
                // seems we got data, reader even got it, but there is some problem
                sInfo = 'WS request error: code=' + oJSON.ret_code;
                if (oJSON.ret_msg !== undefined) {
                    sInfo += ' msg: ' + oJSON.ret_msg;
                }
                if (oJSON.ret_code === '0') {
                    // pokial je oJSON.ret_code uvedene a je ine ako '0', potom WS sluzba
                    // vratila chybu a ta byh mala byt snad dostatocne popisna
                    // v opacnom pripade vypiseme aj data z 'reader-a'
                    sInfo += ' here is what data-reader tries to tell us:' + pError.name + ' - ' + pError.message;
                }
            } else {
                // seems we got data, but reader has a problem
                sInfo = 'error in data got from server: ' + pError.name + ' - ' + pError.message;
            }
            //if (this.reader && this.reader.jsonData) {
            //dt=this.reader.jsonData;
            //sInfo='';
            //if (dt.ret_code) { sInfo+=' code: '+dt.ret_code; }
            //if (dt.ret_msg)  { sInfo+=' msg: '+dt.ret_msg; }
            //if (sInfo==='') {
            //sInfo='got JSON data from WS, but seems basic info ret_code/msg is not present';
            //}
            //}
            // spravu zobrazime aj ak je ret_code===0 - aj vtedy mozu b=byt data neplatne
        }
        Ext.Msg.alert('Store', 'Load exception: ' + sInfo);
    }
});
/**
 * @class i3.WS.StoreScan
 *
 * Zakladne WS scan store
 * Pouziva sa pre napr. comboboxy
 */
i3.WS.StoreScan = Ext.extend(i3.WS.Store, {
    /**
     *
     * @param {Object} config
     * prebera vsetky cs* options z i3.WS.Store
     */
    constructor: function(config) {
        config = config || {};
        // defaulty zakladneho WS store
        Ext.applyIf(config, {
            fields: ['term', 'hits'],
            baseParams: {},
            // Nastavenie scan clause PQF zadanim jednotlivych parametrov
            //
            // pnAttrib        - PQF Bib-1 use atribut
            // psTerm          - termin na vyhladavanie
            // pnCompletteness - kompletny termin, udava obsah atributu 6
            //                   ak je undefined alebo 0 - potom parameter do scan clause nebude uvedeny
            // psQueryLimit    - moznost uviest query limit
            // psBackward      - backward scan  false/true
            //
            // 18.01.12 on; psBackward
            // 05.01.09 rs; pridany param psQueryLimit
            setScanQuery: function(pnAttrib, psTerm, pnCompletteness, psQueryLimit, psBackward) {
                // use
                var s = '@attr 1=' + pnAttrib;
                // completeness
                if ((pnCompletteness !== undefined) && pnCompletteness) {
                    s = s + ' @attr 6=' + pnCompletteness;
                }
                // term
                if (psTerm === '') {
                    psTerm = 'a';
                } // defaultny term
                s = s + ' ' + psTerm.singleQuote();
                // 07.06.12 on; rozsirena podminka
                // pridat limitu
                // este by sa tu malo poriesit %NOT% ale to nechajme na neskor
                if ((psQueryLimit !== undefined) && (psQueryLimit !== '')) {
                    s = '@and ' + s + ' ' + psQueryLimit;
                }
                this.baseParams.scanClause = s;
                // 18.01.12 on;
                if (psBackward) {
                    this.baseParams.responsePosition = this.baseParams.maximumTerms;
                } else {
                    // default
                    this.baseParams.responsePosition = 1;
                }
            }
        });
        // defaulty URL zakladneho WS store
        Ext.applyIf(config.baseParams, {
            method: 'scan',
            responsePosition: 1,
            maximumTerms: 50
        });
        i3.WS.StoreScan.superclass.constructor.call(this, config);
        // defaultna scan query
        if (!this.baseParams.scanClause) {
            this.setScanQuery(12, '');
        }
    }
});
/**
 * @class i3.WS.StoreSearch
 * Zakladne WS search store
 *
 */
i3.WS.StoreSearch = Ext.extend(i3.WS.Store, {
    /**
     *
     * @param {Object} config
     *   prebera vsetky cs* options z i3.WS.Store
     */
    constructor: function(config) {
        config = config || {};
        // defaulty zakladneho WS store
        Ext.applyIf(config, {
            root: 'records',
            baseParams: {},
            // defaultne mapovanie: berie pre store ako "data" prvy prvok z pola data
            fields: [ //
                //{name:'data',mapping:'data[0]'},
                {
                    name: 'data',
                    mapping: 'data.join(\' \').trim();'
                }, {
                    name: 'classn'
                }, {
                    name: 't001'
                }, {
                    // 24.07.12 on; doplneno vraceni vice ZF
                    name: 'zf'
                }
            ],
            /**
             * Len ciste zlozenie jednoduchej otazky.
             * Popis parametrov viz. setSearchQuery
             *
             *
             * @param {Object} paAttribs
             * @param {Object} psTerm
             * @param {String} psLimits - moznost predat limity ve forme PQF dotazu, ktery se pripoji k terminu pres @and, vyuzito v generatoru v runtime casti
             *
             * 10.06.14 on; psLimits
             */
            createSearchQuery: function(paAttribs, psTerm, psLimits) {
                // 20.12.12 on; pokud je termin prazdny, nic neskladat a vratit ''
                if (i3.isEmptyString(psTerm)) {
                    // 10.06.14 on;
                    if (!i3.isEmptyString(psLimits)) {
                        return psLimits;
                    }
                    return '';
                }
                var s = '',
                    i,
                    lnAttrVal;
                for (i in paAttribs) {
                    if (paAttribs.hasOwnProperty(i)) {
                        if (s !== '') {
                            s = s + ' ';
                        }
                        lnAttrVal = paAttribs[i];
                        if (!lnAttrVal) {
                            continue;
                        }
                        // 20.12.12 on; zrusena mezera
                        //s = s + ' @attr ' + i + '=' + lnAttrVal;
                        s = s + '@attr ' + i + '=' + lnAttrVal;
                    }
                }
                if (s !== '') {
                    s = s + ' ';
                }
                s = s + psTerm.singleQuote();
                // 10.06.14 on; podpora limit
                if (!i3.isEmptyString(psLimits)) {
                    s = '@and ' + s + ' ' + psLimits;
                }
                return s;
            },
            /**
             * Nastavenie search clause PQF zadanim jednotlivych parametrov
             *
             * @param {Object} paAttribs  - PQF Bib-1 atributy
             *                              priklad: paAttribs[1]=2000, paAttribs[6]=2;
             *                              => @attr 1=2000 @attr 6=2
             * @param {Object} psTerm     - termin na vyhladavanie
             * @param {String} psLimits   - moznost predat limity ve forme PQF dotazu, ktery se pripoji k terminu pres @and, vyuzito v generatoru v runtime casti
             *
             * 10.06.14 on; psLimist
             */
            setSearchQuery: function(paAttribs, psTerm, psLimits) {
                var s = this.createSearchQuery(paAttribs, psTerm, psLimits);
                this.baseParams.query = s;
            },
            /**
             * len 1:1 nastavenie parametra
             * @param {Object} pPQF
             */
            setSearchQueryPQF: function(pPQF) {
                this.baseParams.query = pPQF;
            }
        });
        // defaulty URL zakladneho WS store
        Ext.applyIf(config.baseParams, {
            method: 'search',
            querytype: 'PQF', // 02.10.15 on; kvuli vyhledavani WOS, SCOPUS, snad to nebude nikde vadit
            from: 1,
            to: 20
        });
        i3.WS.StoreSearch.superclass.constructor.call(this, config);
    }
});
/**
 * Store proxy, ktore vie ziskat data statickej tabulky via WS
 * Interne zatial pouzijeme ArrayReader, i ked je to tu viac menej zbytocne,
 * data sa konvertuju 2x.
 */
i3.WSSTProxy = Ext.extend(Ext.data.DataProxy, {
    /**
     * constructor (default)
     *  config:
     *    csDisplayID: popis viz. i3.WS.StoreST
     *    csData: popis viz. i3.WS.StoreST
     *    csTextField: popis viz. i3.WS.StoreST
     *    @private
     */
    constructor: function(config) {
        config.csTest = 1;
        i3.WSSTProxy.superclass.constructor.call(this);
    },
    load: function(params, reader, callback, scope, arg) {
        //02.03.12 on; zmena zapisu
        //var sClassN = i3.WS.getDfltUnTablesd(), t001 = params.t001 ? params.t001 : '';
        var sClassN = i3.WS.getDfltUnTablesd(),
            t001 = params.t001 || '';
        if (t001 === '') {
            return;
        } // nothing to load now
        if (t001.indexOf('*') > -1) {
            sClassN = t001.piece('*', 1);
            t001 = t001.piece('*', 2);
        }
        //if (t001==='USA_TXXXW_1') { debugger;}
        // POZOR preto je zatial lokalne, aby mohlo pouzit parametre z load()
        //
        // Funkcia, ktora prijme zaznam zo statickej tabulky, spracuje ho
        // a naplni nase store.
        // Pouziju sa paramere z "load()"
        //
        // OK mame precitany jeden zaznam statickej tabulky s tagmi 200 $a,$b
        // prekonvertujeme jeho strukturu do tvaru vhodneho pre ArrayReader
        var processRecFn = function(oRec) {
            var t200 = oRec.getTag("200", -1),
                i,
                arrayData = [],
                sA,
                sB,
                sLine,
                sTextField;
            for (i = 0; i < t200.length; i++) {
                sLine = t200[i];
                // riadok z tagu 200
                sA = oRec.getSubTagStr(sLine, 'a');
                // 04.10.11 on; moznost nacist text z jineho subtagu
                if (scope.csTextField) {
                    sTextField = scope.csTextField;
                } else {
                    sTextField = 'b';
                }
                sB = oRec.getSubTagStr(sLine, sTextField);
                // ak $b nie je vyplnene, kod a text budu totozne
                if (sB === '') {
                    sB = sA;
                }
                // vyber jazykovej mutacie; pouzije globalne defaulty
                sB = i3.languageSel(sB);
                // toto zabezpeci, ze text cast bude obsahovat aj 'id'
                // pozn.: vyzera, ze load je volane v inom scope ako "this" (=proxy)
                // scope je ale nastavene na suvisiace i3.WS.StoreST,
                // takze toto vyuzijeme a pouzijeme jeho parametre
                if (scope.csDisplayID && (sA !== sB)) {
                    // 03.12.15 on; moznost vlozit ID na konec
                    if (scope.csDisplayID === 2) {
                        sB = sB + ' - ' + sA;
                    } else {
                        sB = sA + ' - ' + sB;
                    }
                }
                // 01.11.22 on; moznost pridat ke kodu polozky ciselniku odlisujici retezec (deduplikace kodu ciselniku)
                if (scope.csDeduplicateID) {
                    sA = i.toString().padStart(3, "0") + sA;
                }
                // 06.05.11 jk; rozsireno o plneni data
                // podle parametru csData se naplni id,text,data nebo jen id,text
                if (scope.csData) {
                    arrayData.push([sA, sB, sLine]);
                    // 3 stlpce
                } else {
                    arrayData.push([sA, sB]);
                    // 2 stlpce
                }
            }
            // malo by to byt - odovzdame data dalej
            // a ArrayReader ich prekonvertuje do tvaru Ext.data.Record[]
            var result = reader.readRecords(arrayData);
            callback.call(scope, result, arg, true);
        };
        // 07.10.22 on; reakce na nenalezeni zaznamu, pokud jde o ciselnik se sufixem pobocky, zkusi to bez ni?
        var failureFn = function() {
            var i,
                s = '';
            // pokud se nepodarilo nacist a jde o cteni "pobockoveho" zaznamu, zkusi to bez sufixu pobocky
            for (i = 1; i < t001.fieldcount('_'); i += 1) {
                if (!i3.isEmptyString(s)) {
                    s += '_';
                }
                s += t001.piece('_', i);
            }
            // nazev ciselniku bez sufixu
            t001 = s;
            /*var oRecord = i3.WS.sTablesdCacheGet(sClassN + '*' + t001);
            if (oRecord) {
              // got record from cache?
              processRecFn.call(this, oRecord);
              // we are done here - nie je potreba spustat search na databaze
              return;
            }*/
            i3.WS.getRecord({
                classn: sClassN,
                t001: (t001 !== '') ? t001 : 'UNKNOWN_ST_TABLEN',
                success: processRecFn,
                scope: this,
                options: params.options, // 08.07.11 on; preda options - kvuli nacteni diferenci
                // 03.06.22 on; moznost nezobrazit chybovou zpravu, kdyz se zaznam nenajde - pouzito pri nacteni ciselniku comboboxu
                csNoErrMsg: scope.csNoErrMsg
            });
        };
        // teraz mozu nastat dve situacie - zaznam uz mame v Tablesd cache
        // v tom pripade ho len zoberieme a nechame nacitat do store
        // inak async spustime vyhladavanie a spracujucu funkciu nechame vyvolat
        // ako callback
        var oRecord = i3.WS.sTablesdCacheGet(sClassN + '*' + t001);
        if (oRecord) {
            // got record from cache?
            processRecFn.call(this, oRecord);
            // we are done here - nie je potreba spustat search na databaze
            return;
        }
        i3.WS.getRecord({
            classn: sClassN,
            t001: (t001 !== '') ? t001 : 'UNKNOWN_ST_TABLEN',
            success: processRecFn,
            // 07.10.22 on; reakce na nenalezeni zaznamu, pokud jde o ciselnik se sufixem pobocky, zkusi to bez ni?
            failure: params.csBranchSufix ? failureFn : undefined,
            scope: this,
            options: params.options, // 08.07.11 on; preda options - kvuli nacteni diferenci
            // 03.06.22 on; moznost nezobrazit chybovou zpravu, kdyz se zaznam nenajde - pouzito pri nacteni ciselniku comboboxu
            csNoErrMsg: scope.csNoErrMsg
        });
    }
});
/**
 * @class i3.WS.StoreST
 * Store pre staticke tabulky
 *
 */
i3.WS.StoreST = Ext.extend(Ext.data.Store, {
    /**
     *
     * @param {Object} config
     *   csStatTableN: nazov stat.tabulky na nacitanie
     *                 v sucasnej verzii BEZ prefixu nazvu UnTablesd triedy
     *   csDisplayID
     *     '0' alebo '1' ci do textovej casti zahrnut aj zobrazenie id
     *     je to trocha nesystemove, pretoze su tam 2 polozky text/id a pri csDisplayID=1
     *     vlozime id duplicitne aj to "text" ale dosiahne sa tym velmi prijemny zelany
     *     efekt v comboboxoch
     *
     *   csData
     *     '0' nebo '1' zda naplni i polozku Data v store, obsahem celych radku zaznamu
     *   csTextField
     *     subtag, ze ktereho se nacte text zobrazeny v comboboxu (defaultne se pouzije 'b')
     */
    constructor: function(config) {
        // vytvorit id pre registraciu v StoreManager-i
        var stId = config.csStatTableN;
        //.strswap('*','');
        // default pre fields
        Ext.applyIf(config, {
            // 06.05.11 jk; rozsireno o plneni data
            fields: config.csData ? ['id', 'text', 'data'] : ['id', 'text'],
            // storeId zaregistruje Store v StoreManageri - pokial je potreba viac krat
            // to iste store, pouzije sa len jedna kopia a nevytvara sa ich viac.
            storeId: (stId !== '') ? stId : undefined,
            autoLoad: false,
            baseParams: {
                t001: config.csStatTableN,
                options: 'd', // 08.07.11 on; bude se nacitat vcetne diferenci
                // 07.10.22 on; je pouzit sufix pobocky?
                csBranchSufix: config.csBranchSufix
            }
        });
        // napevno reader
        Ext.apply(config, {
            reader: new Ext.data.ArrayReader({
                    id: config.id
                }, //
                // construktor zaznamov
                Ext.data.Record.create(config.fields)),
            proxy: new i3.WSSTProxy({
                // 02.03.12 on; zmena zapisu
                //csDisplayID : config.csDisplayID ? config.csDisplayID : 0,
                csDisplayID: config.csDisplayID || 0,
                // 02.03.12 on; zmena zapisu
                // 06.05.11 jk; rozsireno o plneni data
                //csData : config.csData ? config.csData : 0,
                csData: config.csData || 0,
                // 04.10.11 on; moznost nastavit subtag pro zobrazeni textu v comboboxu
                csTextField: config.csTextField,
                // 03.06.22 on; moznost nezobrazit chybovou zpravu, kdyz se zaznam nenajde - pouzito pri nacteni ciselniku comboboxu
                csNoErrMsg: config.csNoErrMsg
            })
        });
        i3.WS.StoreST.superclass.constructor.call(this, config);
    },
    // 06.05.11 jk; rozsireno o plneni data
    // constructor pre manualne vkladane zaznamy
    Record: Ext.data.Record.create([{
        name: 'id',
        type: 'string'
    }, {
        name: 'text',
        type: 'string'
    }, {
        name: 'data',
        type: 'string'
    }])
});
