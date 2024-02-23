/*
 * Simulace odesilani notifikaci z ARL na zvoleneho ctenare
 * Komponentu lze zapojit do I3 apliaci viz. dm
 * 
 * 17.05.23 jk; id prvku prefixovano 'nts'
 * 19.01.23 jk; zalozeno
 */
Ext.ns('i3.ui.NotifySim');
i3.ui.NotifySim.tx = {
    txClose: 'Zavrieť#Zavřít#Close'.ls(),
    txNotifySim: (i3.ictx + 'IsUser - ' + 'test odoslania notifikácie#' + i3.ictx + 'IsUser - ' + 'test odeslání notifikace#' + i3.ictx + 'IsUser - ' + 'test of sending a notify').ls(),
    txNotifylist: 'Notifikácie#Notifikace#Notify'.ls(),
    txNoFindRecNOTIFY: 'Záznam IctxUnTablesd NOTIFY nebol nájdený, kontaktujte správcu ARL#Nenalezen záznam IctxUnTablesd NOTIFY, kontaktujte správce aRL#Record IctxUnTablesd NOTIFY was not found. Contact ARL administrator'.ls(),
    txSelectNotify: 'Vyberte notifikáciu#Vyberte notifikaci#Select the notify'.ls(),
    txSelectT001: 'Zadajte T001 testovacieho čitateľa#Zadejte T001 testovacího čtenáře#Set the T001 of the test reader'.ls(),
    txIctxNeeded: 'Nastavte najskôr ICTX v URL Správca dat napr.<br>%s#Nastavte nejprve ICTX v URL Správce dat např. %s#Please set ICTX in Data Manager URL first e.g. %s'.ls(),
    txRun: 'Odoslať#Odeslat#Run export'.ls(),
    txRunSimErr: 'Chyba pri spustení testu#Chyba při spuštění testu#Error starting test'.ls(),
    txSpace: 'Položky formulára nesmú obsahovať medzery#Položky formuláře nesmí obsahovat mezery#Form items cannot contain spaces'.ls(),
    txUser: 'T001 čitatelia#T001 čtenáře#T001 user'.ls(),
};
i3.ui.NotifySim.c = {
    sMgsId: 'NOTIFYSIM_MSG'
};
/**
 * @class i3.ui.NotifySim.Panel
 * Formular konfigurace.
 */
i3.ui.NotifySim.Panel = Ext.extend(i3.ui.ColPanel, {
    constructor: function(config) {
        config = config || {};
        var db = config.db;
        var storeCmb = new Ext.data.ArrayStore({
            id: 'ntsStoreCmb',
            fields: ['s200a', 'text'],
            data: []
        });
        var storeNotify = new i3.WS.StoreSearch({
            storeId: 'ntsStoreNotify',
            autoLoad: true,
            baseParams: {
                db: i3.ictx + 'UnTablesd',
                query: '@attr 98=2 @attr 1=12 ' + 'NOTIFY'.singleQuote()
            },
            fields: [{
                name: 'data'
            }, {
                name: 'classn'
            }, {
                name: 't001'
            }],
            listeners: {
                'load': {
                    fn: function(store, records, options) {
                        if (records.length < 1) {
                            // vazna chyba, na serveru nebyl nalezen zaznam IctxUnTablesd NOTIFY
                            i3.alert(i3.ui.NotifySim.tx.txNoFindRecNOTIFY);
                        } else {
                            var aNotify = [];
                            var rec = new i3.Marc(records[0].data);
                            var a200all = rec.getTag('200', -1);
                            Ext.each(a200all, function(li) {
                                var s200a = i3.Marc.getSubTagStr(li, 'a');
                                if (s200a !== '') {
                                    var s200b = i3.Marc.getSubTagStr(li, 'b');
                                    aNotify.push([s200a, s200a + ' - ' + s200b.ls()]);
                                }
                            });
                            Ext.getCmp('ntsNtfCombo').getStore().loadData(aNotify, true);
                        }
                    }
                },
                scope: this
            }
        });
        Ext.apply(config, {
            layout: 'column',
            id: 'ntsMain',
            items: [{
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                labelAlign: 'left',
                labelWidth: 90,
                items: [{
                    xtype: 'combo',
                    id: 'ntsNtfCombo',
                    fieldLabel: i3.ui.NotifySim.tx.txNotifylist + ':',
                    triggerAction: 'all',
                    mode: 'local',
                    anchor: '-10',
                    store: storeCmb,
                    valueField: 's200a',
                    displayField: 'text'
                }, {
                    xtype: 'textfield',
                    id: 'ntsTxtT001',
                    fieldLabel: i3.ui.NotifySim.tx.txUser + ' :',
                    value: '',
                    anchor: '-10',
                }, {
                    xtype: 'label',
                    text: 'Log :'
                }, {
                    xtype: 'cs_textarea_nw', // non wrap textarea
                    id: 'ntsNotifySimLog',
                    hideLabel: true,
                    cls: 'cs-fixed-font', // css class (nastavuje font)
                    readOnly: false,
                    anchor: i3.c.anchorBase,
                    //grow: true,
                    //growMax: 500,
                    //growMin: 20,
                    //autoHeight: true,
                    height: 550
                }]
            }],
            // predefinuje tlacitka
            buttons: [{
                text: i3.ui.NotifySim.tx.txRun,
                listeners: {
                    click: {
                        fn: function() {
                            this.csOnRun();
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ui.NotifySim.tx.txClose,
                listeners: {
                    click: {
                        fn: function() {
                            this.csOnCancel();
                        },
                        scope: this
                    }
                }
            }]
        });
        i3.ui.NotifySim.Panel.superclass.constructor.call(this, config);
    },
    csOnRun: function() {
        var dD = '\xab'; // oddelovac parametru do WS;
        var notifyID = Ext.getCmp('ntsNtfCombo').getValue();
        var t001 = Ext.getCmp('ntsTxtT001').getValue();
        if (i3.isEmptyString(notifyID)) {
            i3.displayError(i3.ui.NotifySim.tx.txSelectNotify);
            return;
        }
        if (i3.isEmptyString(t001)) {
            i3.displayError(i3.ui.NotifySim.tx.txSelectT001);
            return;
        }
        var cmd = dD + this.db + dD + notifyID + dD + t001
        this.csRunNotifySim(this.db, cmd);
    },
    /**
     * Spusti na serveru odeslani testovaci notifikace
     */
    csRunNotifySim: function(db, cmd) {
        var msgId = 'MsgWsCommandXnotifysim' + Math.floor((Math.random() * 1000) + 1);
        i3.msgOn('Running xnotifysim ...', '', '', msgId);
        i3.WS.command({
            db: db,
            params: cmd,
            command: 'xnotifysim',
            callback: function(o) {
                i3.msgOff(msgId); // bud tady, nebo u success i failure
            },
            // o-je cely JSON s vysledkom
            success: function(o) {
                debugger;
                if (o && (o.data.length > 0)) {
                    var log = '';
                    Ext.each(o.data, function(li) {
                        log = log + Ext.util.Format.htmlEncode(li) + '\n';
                    });
                    Ext.getCmp('ntsNotifySimLog').setValue(log);
                } else if (o) {
                    i3.alert(i3.ui.NotifySim.tx.txRunSimErr + ' Ret_code=' + o.ret_code + ' ret_msg=' + o.ret_msg);
                } else {
                    i3.alert(i3.ui.NotifySim.tx.txRunSimErr);
                }
            },
            scope: this
        });
    },
});
/**
 * @class i3.ui.NotifySim
 *
 */
Ext.apply(i3.ui.NotifySim, {
    /**
     * Simulace odesilani notifikaci z ARL na zvoleneho ctenare
     */
    csNotifySimCfg: function(db) {
        var sDelim;
        if (i3.isEmptyString(i3.ictx)) {
            if (document.URL.indexOf('?') >= 0) {
                sDelim = '&';
            } else {
                sDelim = '?';
            }
            i3.displayError(i3.fillInParams(i3.ui.NotifySim.tx.txIctxNeeded, [document.URL + sDelim + 'ictx=cs']));
            return;
        }
        i3.ui.csOpenColWin({
            title: '<span class="icon-open" aria-hidden="true"></span> ' + i3.ui.NotifySim.tx.txNotifySim,
            CsPanel: i3.ui.NotifySim.Panel,
            resizable: false,
            width: 700,
            y: 20 // okno se nebude vertikalne zarovnavat na stred, ale bude odsazeno od horniho okraje
        }, {
            //csBtnOkCaption : i3.ui.NotifySim.tx.txSave,
            csLinRecord: {},
            csOnAfterOK: function(pLinRec) {},
            onToolsHelp: function() {
                var s = 'https://arl2.library.sk/wiki_arl/index.php/Spr%C3%A1vce_dat';
                window.open(s, s);
            },
            //csOnAfterOKScope : this,
            //csMainForm : this,
            idpref: 'notifysim',
            db: db //trida
        });
    }
});
