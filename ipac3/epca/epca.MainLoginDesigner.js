/**
 * Main okno pre epca
 *
 * 07.06.23 on; json5
 * 17.05.19 on; zmena security opravneni
 * 20.04.17 on; zmena security objektu
 * 11.09.12 on; kontrola povolenych cookies
 * 23.05.12 on; oprava chyby
 */
/*global i3,Ext,alert,document,window,location,epca */
if (!i3.version) {
    i3.version = 'developers version';
}
/**
 * @class epca.Main
 * Riadiaci panel. Bez vizualu len so spravou "sprav".
 *
 * pSubPanelCfg je konfig pre podpanely, mal by obsahovat len csXXXX parametre
 *              bude aplikovany na dcerske panely, ale aj na main panel
 *              potom cez i3.Login.mainApp sa vieme dostat na main okno
 *              a aj na konfig params
 *
 */
Ext.ns('epca');
Ext.ns('epca.Config.User');
/**
 * Hlavne okna dizajnera
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
                    fn: function(pRec) {
                        var m = i3.Login.mainApp();
                        if (m) {
                            m.hide();
                        }
                        var fId = 'cat_main',
                            c = Ext.getCmp(fId);
                        if (!c) {
                            //now always create new copy
                            //alert('no '+fId+' panel found! (will create new copy)');
                            //c = new i3.muz.AuthP.Panel(Ext.apply({}, {
                            c = new epca.MainPanel();
                            var designer = new epca.designer.DesignerPanel();
                            designer.initializeNewForm();
                            c.getChangeableContentPanel().setPanel(designer);
                        } else {
                            c.show();
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
                        //i3.Login.app_logout(0);
                        i3.WS.req({
                            success: function(response, options) {
                                // reload musi byt tu, pretoze sa snazilo
                                // prihlasit skoro ako skoncilo odhlasovanie
                                this.destroy();
                                location.reload();
                            },
                            params: {
                                method: 'version',
                                username: '_logout',
                                auth: '1,'
                            },
                            scope: this
                        });
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
    if (typeof i3.ictx === 'undefined') {
        i3.ictx = '';
    }
    i3.debug = 0;
    i3.WS.baseParams.language = i3.language;
    return {
        /** Hlavna spustacia funkcia celej aplikacie
         *
         */
        csInit: function() {
            var getPropValue = function(pStore, psId) {
                var n = pStore.findExact('id', psId);
                if (n < 0) {
                    return '';
                } else {
                    var o = pStore.getAt(n);
                    return o.data.value;
                }
            };
            // nacte konfigurace z jsonu do storu a pak ji preda do epca.Config.User objektu (kvuli zpetne kompatibilite)
            var propertyStore = new Ext.data.JsonStore({
                autoLoad: true, //autoload the data
                // 07.06.23 on; json5
                //url: 'config_' + i3.ictx.toLowerCase() + '.json',
                url: 'config_' + i3.ictx.toLowerCase() + '.json5',
                root: 'data',
                fields: ['id', 'value'],
                listeners: {
                    load: {
                        fn: function(store, records, options) {
                            epca.Config.User.ictx = getPropValue(store, 'ictx');
                            i3.WS.baseParams.ictx = epca.Config.User.ictx.toLowerCase();
                            epca.Config.User.dbCat = getPropValue(store, 'dbCat');
                            epca.Config.User.dbAuth = getPropValue(store, 'dbAuth');
                            epca.Config.User.dbEpca = getPropValue(store, 'dbEpca');
                            // 23.01.12 on;
                            epca.Config.User.dbTab = getPropValue(store, 'dbTab');
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
                            epca.Config.User.tablesdCache = getPropValue(store, 'tablesdCache');
                            // 19.02.13 on;
                            epca.Config.User.appHeader = getPropValue(store, 'appHeader');
                            // nazev stanky v jazykove mutaci
                            if (epca.Config.User.appHeader && (epca.Config.User.appHeader !== '')) {
                                document.title = epca.Config.User.appHeader;
                            }
                            // vyminky textov v standardnych komponentach
                            //i3.ui.FlexPop.tx.txLimits = 'Spresnenie#Zpřesnění#Limits'.ls();
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
                            //i3.checkBrowserFF();
                            var loginConfig = {
                                csReqRight: {
                                    // 17.05.19 on; zmena z "a" na "w"
                                    // 20.04.17 on; zmena security objektu
                                    //name: epca.Config.User.dbCat,
                                    //value: 'w'
                                    name: 'Cmd' + i3.ictx + 'WebepcaentryAdmin',
                                    value: 'w'
                                },
                                csCallback: function() {
                                    i3.Login.mainAppFireEvent('cs_openedit');
                                }
                                //csHelp : 'V případe ztráty hesla se prosím obraťte na administrátora: xy@mail.com'   // 19.09.13 on; zrusene, neni potreba
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
        }
    };
}());
Ext.onReady(i3.csInit, i3);
