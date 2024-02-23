/*
 * Export zaznamu z ARL - prikaz ^X("ex")
 * Komponentu lze zapojit do I3 apliaci viz. dm
 * 
 * 10.01.22 jk; zalozeno 
 */
/*global Ext,i3,alert,window, document */
Ext.ns('i3.ui.ExportRec');
i3.ui.ExportRec.tx = {
    txClose: 'Zavrieť#Zavřít#Close'.ls(),
    txExportRec: 'Export záznamov#Export záznamů#Export records'.ls(),
    txFileFormat: 'Formát súboru#Formát souboru#File format'.ls(),
    txFileFormatUTF8: 'UTF-8#UTF-8#UTF-8'.ls(),
    txFileFormatUTF8Bom: 'UTF-8 BOM#UTF-8 BOM#UTF-8 BOM'.ls(),
    txFileFormatUnicode: 'Unicode 16bit#Unicode 16bit#Unicode 16bit'.ls(),
    txFileFormatCP1250: 'CP 1250#CP 1250#CP 1250'.ls(),
    txSavelist: 'Savelist#Savelist#Savelist'.ls(),
    txSelectSl: 'Vyberte savelist#Vyberte savelist#Select savelist'.ls(),
    txSelectTags: 'Zoznam polí je prázdny#Seznam polí je prázdný#The tag list is empty'.ls(),
    txRecFormat: 'Formát záznamov#Formát záznamů#Record format'.ls(),
    txRecFormatCsv: 'CSV#CSV#CSV'.ls(),
    txRecFormatParams: 'Zoznam polí#Seznam polí#Tag list'.ls(),
    txRecFormatIso: 'ISO2709#ISO2709#ISO2709'.ls(),
    txRecFormatXls: 'XLS#XLS#XLS'.ls(),
    txRecFormatXml: 'XML#XML#XML'.ls(),
    txRecFormatXmlParams: 'Formát#Formát#Format'.ls(),
    txRecFormatLinemarc: 'LINEMARC#LINEMARC#LINEMARC'.ls(),
    txRecFormatXmlHtml: 'HTML#HTML#HTML'.ls(),
    txRecFormatXmlSlim: 'SLIM#SLIM#SLIM'.ls(),
    txOptSort: 'Zoradiť pole#Setřídit pole#Sort tags'.ls(),
    txOptShowId: 'Uviest id záznamu do hlavičky#Vypsat ID záznamu do hlavičky#Write the record ID to the header'.ls(),
    txOptCrypt: 'Šifrovať záznamy užívateľov#Šifrovat záznamy uživatelů#Encrypt user records'.ls(),
    txOptDecrypt: 'Dešifrovať security záznamy#Dešifrovat security záznamy#Decrypt security records'.ls(),
    txOptFilter: 'Exportný filter#Exportní filtr#Export filter'.ls(),
    txIctxNeeded: 'Nastavte najskôr ICTX v URL Správca dat napr.<br>%s#Nastavte nejprve ICTX v URL Správce dat např. %s#Please set ICTX in Data Manager URL first e.g. %s'.ls(),
    txOptions: 'Nastavenie #Nastavení#Options'.ls(),
    txRun: 'Spustiť export#Spustit export#Run export'.ls(),
    txRunExportErr: 'Chyba pri spustení exportu#Chyba při spuštění exportu#Error starting export'.ls(),
    txSpace: 'Položky formulára nesmú obsahovať medzery#Položky formuláře nesmí obsahovat mezery#Form items cannot contain spaces'.ls(),
};
i3.ui.ExportRec.c = {
    sMgsId: 'EXPORT_MSG'
};
/**
 * @class i3.ui.ExportRec.Panel
 * Formular konfigurace exportu.
 */
i3.ui.ExportRec.Panel = Ext.extend(i3.ui.ColPanel, {
    constructor: function(config) {
        config = config || {};
        var slStore = new Ext.data.ArrayStore({
            id: 0,
            fields: ['slname', 'slval'],
            data: []
        });
        var slarray = [];
        Ext.each(config.sl, function(li) {
            slarray.push([li, li]);
        });
        slStore.loadData(slarray);
        var db = config.db;
        var bDbIsu = false;
        var bDbSec = db === 'CmSecurity';
        if (db.indexOf('IsUser') >= 0) {
            bDbIsu = true;
        };
        var cbFilter = {
            xtype: 'combo',
            id: 'optcmbfilter',
            store: new i3.WS.StoreScan({
                storeId: 'store_filter',
                autoLoad: false,
                baseParams: {
                    db: i3.ictx + 'UnTablesd',
                    maximumTerms: 100 // nacteme jen 100 zaznamu
                },
                listeners: {
                    load: function(store, records, options) {
                        // procistime store aby zustaly jen FILTER_*
                        var recordsDupl = records.slice();
                        var i = 0;
                        Ext.each(recordsDupl, function(li) {
                            var term = li.data.term;
                            var x = term.substring(0, 6);
                            if (term.substring(0, 7) !== 'FILTER_') {
                                store.removeAt(i);
                            } else {
                                i = i + 1;
                            }
                        });
                    },
                    scope: this
                }
            }),
            listeners: {
                beforequery: function() {
                    // vzdy nacitame od zaznamu FILTER_, ve scanu se tedy nebude dat posouvat
                    var cb = Ext.getCmp('optcmbfilter');
                    var value = 'FILTER_';
                    cb.store.setScanQuery(12, value, 0, '');
                    cb.store.load();
                    return true;
                },
                select: function(cb, rec, indx) {},
                scope: this
            },
            displayField: 'term',
            typeAhead: false,
            minChars: 99, // toto je zatial ?docasne - deaktivuje auto reload po X znakoch
            selectOnFocus: true,
            allowBlank: true,
            resizable: true,
            forceSelection: false, // True to restrict the selected value to one of the values in the list..
            autoSelect: false, // v seznamu automaticky neoznaci prvni prvek, ale musi si uzivatel sam vybrat,
            queryDelay: 50,
            width: 250
        };
        Ext.apply(config, {
            layout: 'column',
            id: 'main',
            items: [{
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                items: [{
                    xtype: 'fieldset',
                    width: '100%',
                    title: i3.ui.ExportRec.tx.txSavelist,
                    items: [{
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'combo',
                            id: 'slCombo',
                            triggerAction: 'all',
                            mode: 'local',
                            width: 300,
                            store: slStore,
                            valueField: 'slval',
                            displayField: 'slname'
                        }]
                    }]
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                items: [{
                    xtype: 'fieldset',
                    title: i3.ui.ExportRec.tx.txFileFormat,
                    items: [{
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'radio',
                            boxLabel: i3.ui.ExportRec.tx.txFileFormatUTF8,
                            name: 'ff01',
                            id: 'ffutf8',
                            inputValue: 'utf8',
                            width: '90',
                            checked: true
                        }, {
                            xtype: 'radio',
                            boxLabel: i3.ui.ExportRec.tx.txFileFormatUTF8Bom,
                            name: 'ff01',
                            id: 'ffutf8bom',
                            inputValue: 'utf8',
                            width: '120'
                        }, {
                            xtype: 'radio',
                            boxLabel: i3.ui.ExportRec.tx.txFileFormatUnicode,
                            name: 'ff01',
                            id: 'ffunicode',
                            inputValue: 'unicode',
                            width: '130'
                        }, {
                            xtype: 'radio',
                            boxLabel: i3.ui.ExportRec.tx.txFileFormatCP1250,
                            name: 'ff01',
                            id: 'ffcp1250',
                            inputValue: 'cp1250',
                        }]
                    }]
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                items: [{
                    xtype: 'fieldset',
                    title: i3.ui.ExportRec.tx.txRecFormat,
                    hideLabel: true,
                    items: [{
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'radio',
                            boxLabel: i3.ui.ExportRec.tx.txRecFormatLinemarc,
                            name: 'rf01',
                            id: 'rflinemarc',
                            width: '100',
                            checked: true,
                            listeners: {
                                'check': {
                                    fn: function(comp, checked) {
                                        if (checked === true) {
                                            Ext.getCmp('rfxmllbl').disable();
                                            Ext.getCmp('rfxmlslim').disable();
                                            Ext.getCmp('rfxmlhtml').disable();
                                            Ext.getCmp('rfcsvlbl').disable();
                                            Ext.getCmp('rfcsvtxt').disable();
                                            Ext.getCmp('rfxlslbl').disable();
                                            Ext.getCmp('rfxlstxt').disable();
                                            Ext.getCmp('optshowid').enable();
                                            if (bDbIsu === true) {
                                                Ext.getCmp('optcrypt').enable();
                                            }
                                        }
                                    }
                                },
                                scope: this
                            }
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'radio',
                            boxLabel: i3.ui.ExportRec.tx.txRecFormatIso,
                            name: 'rf01',
                            id: 'rfiso',
                            width: '100',
                            listeners: {
                                'check': {
                                    fn: function(comp, checked) {
                                        if (checked === true) {
                                            Ext.getCmp('rfxmllbl').disable();
                                            Ext.getCmp('rfxmlslim').disable();
                                            Ext.getCmp('rfxmlhtml').disable();
                                            Ext.getCmp('rfcsvlbl').disable();
                                            Ext.getCmp('rfcsvtxt').disable();
                                            Ext.getCmp('rfxlslbl').disable();
                                            Ext.getCmp('rfxlstxt').disable();
                                            Ext.getCmp('optshowid').disable();
                                            Ext.getCmp('optcrypt').disable();
                                        }
                                    }
                                },
                                scope: this
                            }
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'radio',
                            boxLabel: i3.ui.ExportRec.tx.txRecFormatXml,
                            name: 'rf01',
                            id: 'rfxml',
                            width: '100',
                            listeners: {
                                'check': {
                                    fn: function(comp, checked) {
                                        if (checked === true) {
                                            Ext.getCmp('rfxmllbl').enable();
                                            Ext.getCmp('rfxmlslim').enable();
                                            Ext.getCmp('rfxmlhtml').enable();
                                            Ext.getCmp('rfcsvlbl').disable();
                                            Ext.getCmp('rfcsvtxt').disable();
                                            Ext.getCmp('rfxlslbl').disable();
                                            Ext.getCmp('rfxlstxt').disable();
                                            Ext.getCmp('optshowid').disable();
                                            Ext.getCmp('optcrypt').disable();
                                        }
                                    }
                                },
                                scope: this
                            }
                        }, {
                            xtype: 'label',
                            id: 'rfxmllbl',
                            text: i3.ui.ExportRec.tx.txRecFormatXmlParams,
                            style: 'padding-top: 4px',
                            width: '70',
                            disabled: true
                        }, {
                            xtype: 'radio',
                            boxLabel: i3.ui.ExportRec.tx.txRecFormatXmlSlim,
                            name: 'rfxml',
                            id: 'rfxmlslim',
                            checked: true,
                            disabled: true
                        }, {
                            xtype: 'radio',
                            boxLabel: i3.ui.ExportRec.tx.txRecFormatXmlHtml,
                            name: 'rfxml',
                            id: 'rfxmlhtml',
                            disabled: true
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'radio',
                            boxLabel: i3.ui.ExportRec.tx.txRecFormatCsv,
                            name: 'rf01',
                            id: 'rfcsv',
                            width: '100',
                            listeners: {
                                'check': {
                                    fn: function(comp, checked) {
                                        if (checked === true) {
                                            Ext.getCmp('rfxmllbl').disable();
                                            Ext.getCmp('rfxmlslim').disable();
                                            Ext.getCmp('rfxmlhtml').disable();
                                            Ext.getCmp('rfcsvlbl').enable();
                                            Ext.getCmp('rfcsvtxt').enable();
                                            Ext.getCmp('rfxlslbl').disable();
                                            Ext.getCmp('rfxlstxt').disable();
                                            Ext.getCmp('optshowid').disable();
                                            Ext.getCmp('optcrypt').disable();
                                        }
                                    }
                                },
                                scope: this
                            }
                        }, {
                            xtype: 'label',
                            id: 'rfcsvlbl',
                            text: i3.ui.ExportRec.tx.txRecFormatParams,
                            style: 'padding-top: 4px',
                            width: '70',
                            disabled: true
                        }, {
                            xtype: 'textfield',
                            id: 'rfcsvtxt',
                            anchor: i3.c.anchorBase,
                            width: '550',
                            disabled: true
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'radio',
                            boxLabel: i3.ui.ExportRec.tx.txRecFormatXls,
                            name: 'rf01',
                            id: 'rfxls',
                            width: '100',
                            listeners: {
                                'check': {
                                    fn: function(comp, checked) {
                                        if (checked === true) {
                                            Ext.getCmp('rfxmllbl').disable();
                                            Ext.getCmp('rfxmlslim').disable();
                                            Ext.getCmp('rfxmlhtml').disable();
                                            Ext.getCmp('rfcsvlbl').disable();
                                            Ext.getCmp('rfcsvtxt').disable();
                                            Ext.getCmp('rfxlslbl').enable();
                                            Ext.getCmp('rfxlstxt').enable();
                                            Ext.getCmp('optshowid').disable();
                                            Ext.getCmp('optcrypt').disable();
                                        }
                                    }
                                },
                                scope: this
                            }
                        }, {
                            xtype: 'label',
                            id: 'rfxlslbl',
                            text: i3.ui.ExportRec.tx.txRecFormatParams,
                            style: 'padding-top: 4px',
                            width: '70',
                            disabled: true
                        }, {
                            xtype: 'textfield',
                            id: 'rfxlstxt',
                            anchor: i3.c.anchorBase,
                            width: '550',
                            disabled: true
                        }]
                    }]
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                items: [{
                    xtype: 'fieldset',
                    title: i3.ui.ExportRec.tx.txOptions,
                    collapsible: true,
                    collapsed: true,
                    items: [{
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ExportRec.tx.txOptSort,
                            id: 'optsort',
                            width: '200',
                            checked: true
                        }, {
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ExportRec.tx.txOptShowId,
                            id: 'optshowid',
                            width: '250'
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ExportRec.tx.txOptCrypt,
                            id: 'optcrypt',
                            width: '200',
                            disabled: !bDbIsu
                        }, {
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ExportRec.tx.txOptDecrypt,
                            id: 'optdecrypt',
                            width: '300',
                            disabled: !bDbSec
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'label',
                            id: 'optfilterlabel',
                            width: '100',
                            text: i3.ui.ExportRec.tx.txOptFilter,
                            style: 'padding-top: 4px'
                        }, cbFilter]
                    }]
                }]
            }],
            // predefinuje tlacitka
            buttons: [{
                text: i3.ui.ExportRec.tx.txRun,
                listeners: {
                    click: {
                        fn: function() {
                            this.csOnRun();
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ui.ExportRec.tx.txClose,
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
        i3.ui.ExportRec.Panel.superclass.constructor.call(this, config);
    },
    csOnRun: function() {
        var sl = ''; // savelist nebo 'all'
        var ff = 'utf8'; // format souboru
        var rf = 'rflinemarc'; // format zaznamu
        var sort = 1; // defaultne setridit pole do exportu
        var showid = 0; // default nevypisovat ID do hlavicky zaznamu 
        var crypt = 0; // default nesifrovat ISU zaznamy
        var decrypt = 0; // default nedesifrovat, jen pro CmSecrutiy zaznamy
        var filter = ''; // exportni filter
        var dD = '\xab'; // oddelovac parametru do WS;
        var slCombo = Ext.getCmp('slCombo');
        sl = slCombo.getValue();
        if (i3.isEmptyString(sl)) {
            i3.displayError(i3.ui.ExportRec.tx.txSelectSl);
            return;
        } else {
            if (sl.indexOf(' ') >= 0) {
                i3.displayError(i3.ui.ExportRec.tx.txSpace);
                return;
            }
        }
        if (Ext.getCmp('ffutf8').getValue()) {
            ff = 'utf8';
        } else if (Ext.getCmp('ffutf8bom').getValue()) {
            ff = 'utf8bom';
        } else if (Ext.getCmp('ffunicode').getValue()) {
            ff = 'unicode';
        } else if (Ext.getCmp('ffcp1250').getValue()) {
            ff = 'cp1250';
        }
        if (Ext.getCmp('rflinemarc').getValue()) {
            rf = 'linemarc';
        } else if (Ext.getCmp('rfiso').getValue()) {
            rf = 'iso';
        } else if (Ext.getCmp('rfxml').getValue()) {
            rf = 'xml';
            if (Ext.getCmp('rfxmlslim').getValue()) {
                rf = rf + '-slim'
            } else if (Ext.getCmp('rfxmlhtml').getValue()) {
                rf = rf + '-html'
            }
        } else if (Ext.getCmp('rfcsv').getValue()) {
            rf = 'csv';
            var parms = Ext.getCmp('rfcsvtxt').getValue();
            if (i3.isEmptyString(parms)) {
                i3.displayError(i3.ui.ExportRec.tx.txSelectTags);
                return;
            } else if (parms.indexOf(' ') >= 0) {
                i3.displayError(i3.ui.ExportRec.tx.txSpace);
                return;
            }
            rf = rf + '-' + parms;
        } else if (Ext.getCmp('rfxls').getValue()) {
            rf = 'xls';
            var parms = Ext.getCmp('rfxlstxt').getValue();
            if (i3.isEmptyString(parms)) {
                i3.displayError(i3.ui.ExportRec.tx.txSelectTags);
                return;
            } else if (parms.indexOf(' ') >= 0) {
                i3.displayError(i3.ui.ExportRec.tx.txSpace);
                return;
            }
            rf = rf + '-' + parms;
        }
        if (Ext.getCmp('optsort').getValue()) {
            sort = 1;
        } else {
            sort = 0;
        }
        var optshowid = Ext.getCmp('optshowid');
        if (!optshowid.disabled && optshowid.getValue()) {
            showid = 1;
        } else {
            showid = 0;
        }
        var optcrypt = Ext.getCmp('optcrypt');
        if (!optcrypt.disabled && optcrypt.getValue()) {
            crypt = 1;
        } else {
            crypt = 0;
        }
        var optdecrypt = Ext.getCmp('optdecrypt');
        if (!optdecrypt.disabled && optdecrypt.getValue()) {
            decrypt = 1;
        } else {
            decrypt = 0;
        }
        var filter = Ext.getCmp('optcmbfilter').getValue();
        if (filter.indexOf(' ') >= 0) {
            i3.displayError(i3.ui.ExportRec.tx.txSpace);
            return;
        }
        var x = filter.indexOf('*');
        if (!i3.isEmptyString(filter)) {
            if (filter.indexOf('*') === -1) {
                filter = i3.ictx + 'UnTablesd*' + filter; 
            }    
        }


        var cmd = dD + sl + dD + ff + dD + rf + dD + sort + dD + showid + dD + crypt + dD + decrypt + dD + filter
        this.csRunExport(this.db, cmd);
    },
    /**
     * Spusti na serveru export zaznamu
     */
    csRunExport: function(db, cmd) {
        var msgId = 'MsgWsCommandXexport' + Math.floor((Math.random() * 1000) + 1);
        i3.msgOn('Running xexport ...', '', '', msgId);
        i3.WS.command({
            db: db,
            params: cmd,
            command: 'xexport',
            callback: function(o) {
                i3.msgOff(msgId); // bud tady, nebo u success i failure
            },
            // o-je cely JSON s vysledkom
            success: function(o) {
                if (o && (o.ret_code === "0")) {
                    var sURL = o.file;
                    window.open(sURL, "_blank");
                    return;
                } else if (o) {
                    i3.alert(i3.ui.ExportRec.tx.txRunExportErr + ' Ret_code=' + o.ret_code + ' ret_msg=' + o.ret_msg);
                } else {
                    i3.alert(i3.ui.ExportRec.tx.txRunExportErr);
                }
            },
            scope: this
        });
    },
});
/**
 * @class i3.ui.ExportRec
 *
 */
Ext.apply(i3.ui.ExportRec, {
    /**
     * Export zaznamu ze souboru
     */
    csExportCfg: function(savelists, db) {
        var sDelim;
        if (i3.isEmptyString(i3.ictx)) {
            if (document.URL.indexOf('?') >= 0) {
                sDelim = '&';
            } else {
                sDelim = '?';
            }
            i3.displayError(i3.fillInParams(i3.ui.ExportRec.tx.txIctxNeeded, [document.URL + sDelim + 'ictx=cs']));
            return;
        }
        i3.ui.csOpenColWin({
            title: '<span class="icon-open" aria-hidden="true"></span> ' + i3.ui.ExportRec.tx.txExportRec,
            CsPanel: i3.ui.ExportRec.Panel,
            width: 800,
            y: 20 // okno se nebude vertikalne zarovnat na stred, ale bude odsazeno od horniho okraje
        }, {
            //csBtnOkCaption : i3.ui.ExportRec.tx.txSave,
            csLinRecord: {},
            csOnAfterOK: function(pLinRec) {},
            // 24.09.21 on; link na help
            onToolsHelp: function() {
                var s = 'https://arl2.library.sk/wiki_arl/index.php/Spr%C3%A1vce_dat';
                window.open(s, s);
            },
            //csOnAfterOKScope : this,
            //csMainForm : this,
            idpref: 'export',
            sl: savelists, // pole savelistu
            db: db //trida
        });
    }
});
