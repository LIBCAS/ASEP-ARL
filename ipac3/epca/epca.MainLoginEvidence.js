/**
 * Main okno pre epca
 *
 * 18.12.23 on; podpora EPCA_CFG zaznamu
 * 07.06.23 on; json5
 * 18.11.22 on; moznost omezit tlacitko copy na vybrane typy formulářů (oddělovač #).
 * 09.11.22 on; cteni pobocky
 * 04.11.21 on; jazykove mutace
 * 06.01.21 on; tlacitko pro vymaz zaznamu
 * 25.08.20 on; prihlaseni pres plain pw
 * 06.12.19 on; zobrazi dialog pro otevreni formulare pri prazdnem okne
 * 17.05.19 on; zmena security opravneni
 * 27.11.17 on; nazev filtru z IctxUnTablesd
 * 03.05.17 on; csShowWosScopusBtnFnParam
 * 23.09.16 on; otherDbList
 * 21.07.16 on; import WOS/SCOPUS
 * 12.12.14 on; rozsireni aplikace
 * 03.12.14 on; rozsireno prihlasovani
 * 19.09.13 on; moznost konfigurace helpu pri prihlaseni
 * 30.08.13 on; moznost prihlaseni pres IsUser zaznam
 * 11.09.12 on; kontrola povolenych cookies
 * 23.05.12 on; oprava chyby
 */
/*global i3,Ext,document,window,epca,location */
if (!i3.version) {
    i3.version = 'developers version';
}
/**
 * @class epca.Main
 * Riadiaci panel. Bez vizualu len so spravou "sprav".
 *
 * pSubPanelCfg je konfig pre podpanely, mal by obsahovat len cs... parametre
 *              bude aplikovany na dcerske panely, ale aj na main panel
 *              potom cez i3.Login.mainApp sa vieme dostat na main okno
 *              a aj na konfig params
 *
 */
Ext.ns('epca');
Ext.ns('epca.Config.User');
/**
 * Hlavne okno evidencie
 * @param {Object} config
 * @param {Object} pSubPanelCfg
 */
epca.Main = Ext.extend(Ext.Panel, {
    constructor: function(config, pSubPanelCfg) {
        // ulozime aj do hlavneho okna
        Ext.apply(config, pSubPanelCfg);
        Ext.apply(config, {
            deferredRender: false,
            id: 'main',
            //autoHeight: true,
            height: window.outerHeight,
            //width: 850,
            frame: true,
            listeners: {
                cs_openedit: {
                    /**
                     * @event cs_openedit
                     * Otvorenie hlavneho okna aplikacie
                     * @param {Object} pRec
                     */
                    fn: function() {
                        var m = i3.Login.mainApp();
                        if (m) {
                            m.hide();
                        }
                        var fId = 'cat_main',
                            c = Ext.getCmp(fId),
                            ev_panel;
                        if (!c) {
                            //now always create new copy
                            //alert('no '+fId+' panel found! (will create new copy)');
                            //c = new i3.muz.AuthP.Panel(Ext.apply({}, {
                            c = new epca.MainPanel();
                            ev_panel = new epca.evidence.EvidencePanel();
                            c.getChangeableContentPanel().setPanel(ev_panel);
                        } else {
                            c.show();
                        }
                        //when we have formId from URL we load it directly into EvidencePanel
                        if (Ext.isDefined(Ext.getUrlParam('formId'))) {
                            epca.WsForm.getForm(Ext.getUrlParam('formId'), ev_panel, ev_panel.addForm);
                        }
                        //c.csLoadData();
                    },
                    scope: this
                },
                app_logout: {
                    /**
                     * @event app_logout
                     * Odhlasenie + reload formulara.
                     */
                    fn: function() {
                        // 03.12.15 on; nevolat logout pri prihlaseni pres sso
                        if (location.href.indexOf('_arlsso=') < 0) {
                            i3.WS.req({
                                success: function() {
                                    // reload musi byt tu, pretoze sa snazilo
                                    // prihlasit skoro ako skoncilo odhlasovanie
                                    this.destroy();
                                    //location.reload();
                                    i3.Login.csFixLocationHrefLogout('ictx#language');
                                },
                                params: {
                                    method: 'version',
                                    username: '_logout',
                                    auth: '1,'
                                },
                                scope: this
                            });
                            return;
                        }
                        this.destroy();
                        i3.Login.csFixLocationHrefLogout('ictx#language');
                    },
                    scope: this
                },
                show_ext_help: {
                    /**
                     * @event show_ext_help
                     * Zobrazenie externeho helpu.
                     * Upravene na mieru pre muzejnu aplikaciu.
                     *
                     * @param {Object} psAnchor
                     */
                    fn: function(psAnchor) {
                        var url = 'http://mzm.cz/Autority/Metodika.htm#' + psAnchor;
                        var helpwin = window.open(url, 'Muzea nápověda', 'width=900,height=650,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,directories=no,status=no,copyhistory=no, top=50,left=50');
                        helpwin.focus();
                    },
                    scope: this
                }
            }
        });
        epca.Main.superclass.constructor.call(this, config);
    }
});
Ext.apply(i3, function() {
    if (i3.ictx === undefined) {
        i3.ictx = '';
    }
    i3.debug = 0;
    i3.WS.baseParams.language = i3.language;
    return {
        /** Hlavna spustacia funkcia celej aplikacie
         *
         */
        csInit: function() {
            var getPropValue = function(pStore, psId, psParamName) {
                psParamName = psParamName || 'value';
                var n = pStore.findExact('id', psId);
                if (n < 0) {
                    return '';
                }
                var o = pStore.getAt(n);
                return o.data[psParamName];
            };
            /***
             * Konfigurace (pobocka) z CLIENT_CFG
             *
             * 09.11.22 on;
             */
            var csSetBaseParams = function(params) {
                // zjisti domovskou pobocku pro aktualne prihlaseneho uzivatele
                epca.Config.User.csBranch = i3.WS.sTablesdCacheGet('CLIENT_CFG').getTag('T01p');
                if (epca.Config.User.csBranch === '') {
                    epca.Config.User.csBranch = '.';
                }
            };
            // nacte konfigurace z jsonu do storu a pak ji preda do epca.Config.User objektu (kvuli zpetne kompatibilite)
            var getProperties = function() {
                var propertyStore = new Ext.data.JsonStore({
                    autoLoad: true, //autoload the data
                    // 07.06.23 on; json5
                    //url: 'config_' + i3.ictx.toLowerCase() + '.json',
                    url: 'config_' + i3.ictx.toLowerCase() + '.json5',
                    root: 'data',
                    // 18.11.22 on; param5
                    fields: ['id', 'value', 'param', 'param2', 'param3', 'param4', 'param5'],
                    listeners: {
                        load: {
                            fn: function(store) {
                                var s;
                                epca.Config.User.ictx = getPropValue(store, 'ictx');
                                i3.WS.baseParams.ictx = epca.Config.User.ictx.toLowerCase();
                                epca.Config.User.dbCat = getPropValue(store, 'dbCat');
                                epca.Config.User.dbAuth = getPropValue(store, 'dbAuth');
                                epca.Config.User.dbEpca = getPropValue(store, 'dbEpca');
                                // 23.01.12 on;
                                epca.Config.User.dbTab = getPropValue(store, 'dbTab');
                                // 22.09.16 on; seznam dalsich pouzitych db vcetne jejich formatu (UN, US ...)
                                epca.Config.User.otherDbList = getPropValue(store, 'otherDbList');
                                epca.Config.User.LinkDbCat = getPropValue(store, 'LinkDbCat');
                                epca.Config.User.LinkDbAuth = getPropValue(store, 'LinkDbAuth');
                                epca.Config.User.DbNameCat = getPropValue(store, 'DbNameCat');
                                epca.Config.User.DbNameAuth = getPropValue(store, 'DbNameAuth');
                                epca.Config.User.DbNameEpca = getPropValue(store, 'DbNameEpca');
                                // 23.01.12 on;
                                epca.Config.User.dbCatFmt = getPropValue(store, 'dbCatFmt');
                                epca.Config.User.dbAuthFmt = getPropValue(store, 'dbAuthFmt');
                                epca.Config.User.displayFmt = getPropValue(store, 'displayFmt');
                                epca.Config.User.displayFmtAuth = getPropValue(store, 'displayFmtAuth');
                                epca.Config.User.defaultCatForm = getPropValue(store, 'defaultCatForm');
                                epca.Config.User.defaultAuthForm = getPropValue(store, 'defaultAuthForm');
                                epca.Config.User.webformURL = getPropValue(store, 'webformURL');
                                epca.Config.User.webformURLrest = getPropValue(store, 'webformURLrest');
                                epca.Config.User.helpURL = getPropValue(store, 'helpURL');
                                // 04.11.21 on; jazykove mutace
                                epca.Config.User.helpURLCze = getPropValue(store, 'helpURLCze');
                                epca.Config.User.helpURLEng = getPropValue(store, 'helpURLEng');
                                epca.Config.User.tablesdCache = getPropValue(store, 'tablesdCache');
                                // 19.02.13 on;
                                epca.Config.User.appHeader = getPropValue(store, 'appHeader');
                                // 30.08.13 on; login pres IsUser
                                epca.Config.User.IsUserAuth = (getPropValue(store, 'IsUserAuth') !== '');
                                epca.Config.User.IsUserOptions = getPropValue(store, 'IsUserAuth');
                                if (epca.Config.User.IsUserOptions === '.') {
                                    epca.Config.User.IsUserOptions = '';
                                }
                                // 02.12.14 on; moznost nastavit popis v login obrazovce u Username
                                epca.Config.User.LoginText = getPropValue(store, 'LoginText');
                                // 03.12.14 on; login pouze pres email
                                epca.Config.User.csOnlyEmailAuth = (getPropValue(store, 'OnlyEmailAuth') !== '');
                                // 03.12.14 on; sktyje vyhledavani existujicich zaznamu
                                epca.Config.User.csHideMainSearch = (getPropValue(store, 'HideMainSearch') === 'true');
                                // 09.12.14 on; nastavi popup browse vyhledavani
                                epca.Config.User.csPBMainSearch = (getPropValue(store, 'PBMainSearch') === 'true');
                                // 09.12.14 on; zakaze vyber zaznamu v popup browse (skryje tlacitko ok)
                                epca.Config.User.csPBMainSearchOnlyView = (getPropValue(store, 'PBMainSearchOnlyView') === 'true');
                                // 11.12.15 on; nastavi vyhledavani podle prani cavky
                                epca.Config.User.csCAVMainSearch = (getPropValue(store, 'CAVMainSearch') === 'true');
                                // 12.12.14 on; tlacitko pro nastaveni 969f v zaznamu
                                epca.Config.User.csSet969f = getPropValue(store, 'FnSet969f');
                                epca.Config.User.csSet969fText = getPropValue(store, 'FnSet969f', 'param');
                                epca.Config.User.csSet969fHint = getPropValue(store, 'FnSet969f', 'param2');
                                epca.Config.User.csSet969fTitleAllowedFormTypes = getPropValue(store, 'FnSet969f', 'param3');
                                // 09.11.15 on; prepsat existujici 969f
                                epca.Config.User.csSet969fOverwriteAll = getPropValue(store, 'FnSet969f', 'param4');
                                // 12.12.14 on; tlacitko pro odmazani 969f ze zaznamu
                                epca.Config.User.csClear969f = getPropValue(store, 'FnClear969f');
                                epca.Config.User.csClear969fText = getPropValue(store, 'FnClear969f', 'param');
                                epca.Config.User.csClear969fHint = getPropValue(store, 'FnClear969f', 'param2');
                                epca.Config.User.csClear969fAllowedFormTypes = getPropValue(store, 'FnClear969f', 'param3');
                                epca.Config.User.csClear969fCloseTab = getPropValue(store, 'FnClear969f', 'param4');
                                // 12.12.14 on; moznost zobrazit username
                                epca.Config.User.csShowUsername = (getPropValue(store, 'ShowUsername') === 'true');
                                // 12.12.14 on; moznost vynutit vyhledavani bez diakritiky
                                i3.csUseASCII = (getPropValue(store, 'ForceAsciiSearch') === 'true');
                                // 12.12.14 on; novy SE
                                i3.csUseNewSE = (getPropValue(store, 'UseNewSE') === 'true');
                                // 19.12.14 on; kontrola prav k zaznamu
                                epca.Config.User.csCheckRightsToRecord = getPropValue(store, 'CheckRightsToRecord');
                                epca.Config.User.loginHelp = getPropValue(store, 'loginHelp');
                                // jazykova verze
                                if (epca.Config.User.loginHelp) {
                                    epca.Config.User.loginHelp = epca.Config.User.loginHelp.ls();
                                }
                                // nazev stanky v jazykove mutaci
                                if (epca.Config.User.appHeader && (epca.Config.User.appHeader !== '')) {
                                    document.title = epca.Config.User.appHeader;
                                }
                                // 13.08.15 on; funkce do menu pro kontrolu zaznamu
                                epca.Config.User.ShowCheckRecordMenuFn = (getPropValue(store, 'ShowCheckRecordMenuFn') === 'true');
                                // 15.09.15 on; funkce pro kontrolu zaznamu jako tlacitko
                                epca.Config.User.ShowCheckRecordBtnFn = (getPropValue(store, 'ShowCheckRecordBtnFn') === 'true');
                                epca.Config.User.ShowCheckRecordBtnText = getPropValue(store, 'ShowCheckRecordBtnFn', 'param');
                                epca.Config.User.ShowCheckRecordBtnHint = getPropValue(store, 'ShowCheckRecordBtnFn', 'param2');
                                // 20.08.15 on; funkce do menu pro link na vystupy - zatim nepouzite, kdyby se to zapojovalo,
                                //              udelat to podle ShowContentServerMenuFn
                                //epca.Config.User.ShowReportsFn = getPropValue(store, 'ShowReportsFn');
                                // 08.09.15 on; funkce do menu pro vytvoreni kopie zaznamu
                                epca.Config.User.ShowCopyRecordMenuFn = (getPropValue(store, 'ShowCopyRecordMenuFn') === 'true');
                                // 15.09.15 on; funkce jako tlacitko pro vytvoreni kopie zaznamu
                                epca.Config.User.ShowCopyRecordBtnFn = (getPropValue(store, 'ShowCopyRecordBtnFn') === 'true');
                                epca.Config.User.ShowCopyRecordBtnText = getPropValue(store, 'ShowCopyRecordBtnFn', 'param');
                                epca.Config.User.ShowCopyRecordBtnHint = getPropValue(store, 'ShowCopyRecordBtnFn', 'param2');
                                epca.Config.User.ShowCopyRecordBtn969f = getPropValue(store, 'ShowCopyRecordBtnFn', 'param3');
                                // 27.11.17 on; nazev filtru z IctxUnTablesd
                                epca.Config.User.ShowCopyRecordBtnFilter = getPropValue(store, 'ShowCopyRecordBtnFn', 'param4');
                                // 18.11.22 on; moznost omezit tlacitko na vybrane typy formulářů (oddělovač #).
                                epca.Config.User.csShowCopyRecordBtnParam = getPropValue(store, 'ShowCopyRecordBtnFn', 'param5');
                                // 09.09.15 on; funkce do menu pro odkaz na content server
                                epca.Config.User.ShowContentServerMenuFn = (getPropValue(store, 'ShowContentServerMenuFn') === 'true');
                                // 15.09.15 on; funkce jako tlacitko pro odkaz na content server
                                epca.Config.User.ShowContentServerBtnFn = (getPropValue(store, 'ShowContentServerBtnFn') === 'true');
                                epca.Config.User.ShowContentServerBtnText = getPropValue(store, 'ShowContentServerBtnFn', 'param');
                                epca.Config.User.ShowContentServerBtnHint = getPropValue(store, 'ShowContentServerBtnFn', 'param2');
                                epca.Config.User.ShowContentServerBtnFnParam = getPropValue(store, 'ShowContentServerBtnFn', 'param3');
                                // 25.02.16 on; libovolne URL na CS
                                epca.Config.User.ShowContentServerBtnURL = getPropValue(store, 'ShowContentServerBtnFn', 'param4');
                                // 20.11.15 on; funkce jako tlacitko pro libovolny odkaz
                                epca.Config.User.ShowURLBtnFn = getPropValue(store, 'ShowURLBtn');
                                epca.Config.User.ShowURLBtnFnText = getPropValue(store, 'ShowURLBtn', 'param');
                                epca.Config.User.ShowURLBtnFnHint = getPropValue(store, 'ShowURLBtn', 'param2');
                                // 10.12.15 on; zmena textu tlacitka New
                                epca.Config.User.NewBtnFnText = getPropValue(store, 'NewBtnText', 'param');
                                epca.Config.User.NewBtnFnHint = getPropValue(store, 'NewBtnText', 'param2');
                                // 10.12.15 on; zmena textu tlacitka Print
                                epca.Config.User.PrintBtnFnText = getPropValue(store, 'PrintBtnText', 'param');
                                epca.Config.User.PrintBtnFnHint = getPropValue(store, 'PrintBtnText', 'param2');
                                // 10.12.15 on; zmena textu tlacitka Save
                                epca.Config.User.SaveBtnFnText = getPropValue(store, 'SaveBtnText', 'param');
                                epca.Config.User.SaveBtnFnHint = getPropValue(store, 'SaveBtnText', 'param2');
                                // 10.12.15 on; zmena textu tlacitka Logout
                                epca.Config.User.LogoutBtnFnText = getPropValue(store, 'LogoutBtnText', 'param');
                                epca.Config.User.LogoutBtnFnHint = getPropValue(store, 'LogoutBtnText', 'param2');
                                // 26.11.15 on; moznost skryt login dialog - prihlaseni bude probihat pouze pres ipac pres sso
                                epca.Config.User.HideLoginDialog = getPropValue(store, 'HideLoginDialog');
                                epca.Config.User.HideLoginDialogText = getPropValue(store, 'HideLoginDialog', 'param');
                                // 14.12.15 on; nove opakovani tagu po dotazeni
                                epca.Config.User.AddNewFieldsetRepetition = (getPropValue(store, 'AddNewFieldsetRepetition') === 'true');
                                // 11.07.16 on; doplnen novy parametr
                                epca.Config.User.AddNewFieldsetRepetitionParam = getPropValue(store, 'AddNewFieldsetRepetition', 'param');
                                // 18.05.16 on; import zaznamu z WOS a SCOPUS (pro CAV)
                                epca.Config.User.csShowWosScopusBtn = getPropValue(store, 'ShowWosScopusBtn');
                                epca.Config.User.csShowWosScopusBtnText = getPropValue(store, 'ShowWosScopusBtn', 'param');
                                epca.Config.User.csShowWosScopusBtnHint = getPropValue(store, 'ShowWosScopusBtn', 'param2');
                                // 03.05.17 on; nastaveni jen pro vybrane skupiny/typy formularu
                                epca.Config.User.csShowWosScopusBtnFnParam = getPropValue(store, 'ShowWosScopusBtn', 'param3');
                                // rozsireni
                                s = getPropValue(store, 'CheckboxTruncation');
                                // jen pokud je nastaveno false/true, jinak bude undefined
                                if (!i3.isEmptyString(s)) {
                                    i3.csCheckboxTruncation = (s === 'true');
                                }
                                // fraze
                                s = getPropValue(store, 'CheckboxPhrase');
                                // jen pokud je nastaveno false/true, jinak bude undefined
                                if (!i3.isEmptyString(s)) {
                                    i3.csCheckboxPhrase = (s === 'true');
                                }
                                // browse
                                s = getPropValue(store, 'CheckboxBrowse');
                                // jen pokud je nastaveno false/true, jinak bude undefined
                                if (!i3.isEmptyString(s)) {
                                    i3.csCheckboxBrowse = (s === 'true');
                                }
                                // sloupec ID v browse okne
                                i3.csHideColumnID = (getPropValue(store, 'HideColumnID') === 'true');
                                // 21.01.16 on; skryje tooltip v comboboxu
                                epca.Config.User.csHideTooltipInCombobox = (getPropValue(store, 'HideTooltipInCombobox') === 'true');
                                // 06.12.19 on; zobrazi dialog pro otevreni formulare pri prazdnem okne
                                epca.Config.User.csShowOpenFormDialog = (getPropValue(store, 'ShowOpenFormDialog') === 'true');
                                epca.Config.User.csShowOpenFormDialogFormat = getPropValue(store, 'ShowOpenFormDialog', 'param');
                                // 25.08.20 on; prihlaseni pres plain pw
                                epca.Config.User.UsePlainPw = (getPropValue(store, 'UsePlainPw') === 'true');
                                // 06.01.21 on; tlacitko pro vymaz zaznamu
                                epca.Config.User.csShowDeleteBtn = getPropValue(store, 'ShowDeleteBtn');
                                epca.Config.User.csShowDeleteBtnText = getPropValue(store, 'ShowDeleteBtn', 'param');
                                epca.Config.User.csShowDeleteBtnHint = getPropValue(store, 'ShowDeleteBtn', 'param2');
                                Ext.QuickTips.init();
                                // 11.09.12 on; kontrola povolenych cookies
                                if (!i3.checkCookies(true)) {
                                    // hlaska se zobrazi v ramci kontroly
                                }
                                // open control window, if it doesn't already exist (csInit may be called also after logout)
                                if (!i3.Login.mainApp()) {
                                    var w = new epca.Main({
                                        renderTo: document.body
                                    });
                                }
                                var loginConfig = {
                                    csReqRight: {
                                        // 17.05.19 on; zmena z "a" na "w"
                                        // 12.12.14 on; zmena objektu pro zjisteni opravneni
                                        //name : epca.Config.User.dbCat,
                                        //value : 'w'
                                        name: 'Cmd' + i3.ictx + 'Webepcaentry',
                                        value: 'w'
                                    },
                                    csCallback: function() {
                                        i3.WS.getClientCfg({
                                            //params: this.csVPParams,
                                            csSetClientCfgMethod: csSetBaseParams,
                                            // 22.07.14 on; moznost nacist dalsi zaznam napr. WEBREP_CFG
                                            //csCfgRecordName: this.csCfgRecordName,
                                            csCallback: function() {
                                                i3.Login.mainAppFireEvent('cs_openedit');
                                            },
                                            csScope: this
                                        });
                                    },
                                    // 18.12.23 on; moznost konfigurace v EPCA_CFG
                                    // 19.09.13 on; heslp se bude zapisovat do konfigurace
                                    //csHelp : 'V případe ztráty hesla se prosím obraťte na administrátora: firma@cosmotron.cz',
                                    csHelp: i3.WS.sXlate('EPCA_CFG', 'LoginHelp') || epca.Config.User.loginHelp,
                                    csIsUserAuth: epca.Config.User.IsUserAuth, // moznost nastavit prihlaseni pres IsUser zaznam
                                    csIsUserOptions: epca.Config.User.IsUserOptions, // udaj z pole 600i zaznamu IsUser, ktery musi uzivatel mit, pro uspesne prihlaseni
                                    csWidth: 370, // 02.12.14 on; kvuli moznosti prihlaseni pres email
                                    csLabelWidth: 130, // 02.12.14 on; kvuli moznosti prihlaseni pres email
                                    // 18.12.23 on; moznost konfigurace v EPCA_CFG
                                    csLoginText: i3.WS.sXlate('EPCA_CFG', 'LoginText') || epca.Config.User.LoginText, // 02.12.14 on; moznost nastavit popis v login obrazovce u Username
                                    csOnlyEmailAuth: epca.Config.User.csOnlyEmailAuth, // 03.12.14 on; prihlaseni pouze pres mail
                                    // 18.12.23 on; moznost konfigurace textu v EPCA_CFG 
                                    csShowOnlyText: (epca.Config.User.HideLoginDialog === 'true') ? (i3.WS.sXlate('EPCA_CFG', 'HideLoginDialogText') || epca.Config.User.HideLoginDialogText) : '', // 26.11.15 on; misto login dialogu zobrazit pouze text
                                    csPlainPw: epca.Config.User.UsePlainPw // 25.08.20 on; prihlaseni pres plain pw
                                };
                                i3.Login.doLogin(loginConfig, 1);
                            }
                        },
                        loadexception: {
                            fn: function(pProxy, pOptions, pResponse, pError) {
                                i3.alert('Error', pResponse.responseText);
                            },
                            scope: this
                        }
                    }
                });
            };
            /**
             * Nacte kofiguraci ze serveru (EPCA_CFG)
             *
             * 18.12.23 on;
             */
            var getEpcaCfg = function(pCfg) {
                var aT001List = ['EPCA_CFG'];
                i3.WS.sTablesdCacheInit({
                    classn: i3.WS.getDfltUnTablesd(),
                    t001: aT001List,
                    // funkcia bude volana po uspesnom nacitani dat
                    followup: function() {
                        //alert('a');
                        getProperties();
                    },
                    failure: function() {
                        // nezobrazovat chybu cteni - nemusi existovat - a pokracovat dal
                        getProperties();
                    },
                    // scope pre success & followup funkciu
                    // pozor success musi explicitne volat followup
                    scope: this
                });
            };
            // zkusim nacist konfiguraci v zaznamu EPCA_CFG - jeste pred prihlasenim
            // pote pokracuje ctenim json souboru s konfiguraci a po jeho nacteni zavola login
            getEpcaCfg();
        }
    };
}());
Ext.onReady(i3.csInit, i3);
