/*
 * Konfigurace importu.
 *
 * 29.09.21 on; nastaveni indexu
 * 24.09.21 on; doplneny nove parametry
 * 10.09.21 on; oprava ulozeni zaznamu
 * 08.09.21 on; drobne upravy
 * 07.09.21 on; t200f nesmi byt prazdne - povinne pole
 * 02.06.20 on; zmena uploadu souboru na server
 * 07.50.20 on; linky na texty
 * 09.09.19 on; druha verze
 * 22.08.19 on; prvni verze
 */
/*global Ext,i3,alert,window, document */
Ext.ns('i3.ui.Import');
i3.ui.Import.tx = { //
    txClose: 'Zavrieť#Zavřít#Close###أغلق'.ls(),
    txImportCfg: 'Konfigurácia importu#Konfigurace importu#Import configuration'.ls(),
    txImportRules: 'Záznam s pravidlami pre import#Záznam s pravidly pro import#Record containing import rules'.ls(),
    txCSVFile: 'CSV súbor#CSV soubor#CSV file'.ls(),
    txSelectFile: 'Vybrať súbor#Vybrat soubor#Select file'.ls(),
    txHeader: 'Hlavička CSV súboru#Hlavička CSV souboru#Header of CSV file'.ls(),
    txRecordsAsNew: 'Záznamy vkladať ako nové#Záznamy vkládat jako nové#Records insert as new'.ls(),
    txRecordsUpdate: 'Vyhľadať a aktualizovať existujúce záznamy#Vyhledat a aktualizovat existující záznamy#Search for and update existing records'.ls(),
    txSettings: 'Nastavenie#Nastavení#Settings'.ls(),
    txField: 'Pole#Pole#Field'.ls(),
    txI1: 'I1'.ls(),
    txI2: 'I2'.ls(),
    txSubfield: 'Podpole#Podpole#Subfield'.ls(),
    txValue: 'Hodnota#Hodnota#Value'.ls(),
    txSave: 'Uložiť#Uložit#Save'.ls(),
    txRead: 'Načítať#Načíst#Read'.ls(),
    txFilterNameEmpty: 'Názov filtru je prázdny!#Název filtru je prázdný!#Filter name is epmty!'.ls(),
    txSaveFilter: 'Ukladám záznam filtra...#Ukládám záznam filtru...#Saving filter record...'.ls(),
    txLoadFilter: 'Načítam záznam filtra...#Načítám záznam filtru...#Getting filter record...'.ls(),
    txSearchParams: 'Parametry vyhľadávania#Parametry vyhledávání#Search parameters'.ls(),
    txColumnId: 'Identifikátor v stĺpci#Identifikátor ve sloupci#Identifier in the column'.ls(),
    txSearchBy: 'Vyhľadať podľa#Vyhledat podle#SearchBy'.ls(),
    txColumn: 'Stĺpec#Sloupec#Column'.ls(),
    txInsertIntoNewRec: 'Vkladať len do nového záznamu#Vkládat pouze do nového záznamu#Insert into new record only'.ls(),
    txInsertIntoExistingRecToo: 'Vkladať aj do aktualizovaného záznamu#Vkládat i do aktualizovaného záznamu#Insert into existing record too'.ls(),
    txInsertIntoExistingRecOnly: 'Vkladať len do aktualizovaného záznamu#Vkládat pouze do aktualizovaného záznamu#Insert in the updated record only'.ls(),
    txColumnPart: 'Výber časti stĺpca#Výběr části sloupce#Part of column selection'.ls(),
    txDelimiter: 'Oddeľovač#Oddělovač#Delimiter'.ls(),
    txOrder: 'Poradie#Pořadí#Order'.ls(),
    txValueRepetition: 'Opakovanie hodnoty#Opakování hodnoty#Value repetition'.ls(),
    txSeparateField: 'Do samostatného poľa#Do samostatného pole#Into a separate field'.ls(),
    txSeparateSubfield: 'Do samostatného podpoľa#Do samostatného podpole#Into a separate subfield'.ls(),
    txPredefinedValue: 'Preddefinovaná hodnota#Předdefinovaná hodnota#Predefined value'.ls(),
    txFilter: 'Záznam filtra#Záznam filtru#Filter name'.ls(),
    txFilterValidatorError: 'Názov filtra musí začínať na "FILTER_" a povolené sú znaky: A-Z, 0-9, -, _#Název filtru musí začínat na "FILTER_" a povolené jsou znaky: A-Z, 0-9, -, _#Filter name must begin with "FILTER_" and only this chracters are allowed: A-Z, 0-9, -, _'.ls(),
    txDatabase: 'Databáza#Databáze#Database'.ls(),
    txRun: 'Spustiť import#Spustit import#Run import'.ls(),
    txUploading: 'Odosielam súbor#Odesílám soubor#Sending file'.ls(),
    txUploadErr: 'Chyba pri uploadu súboru#Chyba při uploadu souboru#File upload error'.ls(),
    txSelectCSVFile: 'Vyberte CSV súbor#Vyberte CSV soubor.#Select CSV file.'.ls(),
    txDbEmpty: 'Názov databázy je prázdny.#Název databáze je prázdný.#Database name is empty.'.ls(),
    txImporting: 'Prebieha import#Probíhá import#Import is running'.ls(),
    txErrGetURL: 'Chyba pri načítaní URL_REPORTS z ARLDIR.#Chyba při načtení URL_REPORTS z ARLDIR.#Error getting URL_REPORTS from ARLDIR.'.ls(),
    txUpdateOK: 'Úspešne aktualizované#Úspěšně aktualizováno#Update OK!'.ls(),
    txUpdate: 'Aktualizácia#Aktualizace#Update'.ls(),
    txIctxNeeded: 'Nastavte najskôr ICTX v URL Web admina napr.<br>%s#Nastavte nejprve ICTX v URL Web admina např. %s#Please set ICTX in Web admin URL first e.g. %s'.ls(),
    txCreateNewRecord: 'Vytvoriť nový záznam, ak sa nič nenájde#Vytvořte nový záznam, pokud se nic nanajde#Create a new record if nothing found'.ls(),
    txDeleteExistingField: 'Vymazať existujúce pole#Smazat existující pole#Delete existing field'.ls()
};
i3.ui.Import.c = {
    sImportFilterPrefix: 'IMPORTCSV_',
    sMgsId: 'IMPORT_MSG'
};
/**
 * @class i3.ui.Import.Panel
 * Formular konfigurace importu.
 *
 */
i3.ui.Import.Panel = Ext.extend(i3.ui.ColPanel, {
    constructor: function(config) {
        config = config || {};
        Ext.apply(config, {
            layout: 'column',
            items: [{
                xtype: 'panel',
                width: '40%',
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: i3.ui.Import.tx.txImportRules,
                    anchor: i3.c.anchorBase,
                    //name : 't100a',
                    //nameSpace : 'a',
                    id: 'csFilterName',
                    listeners: {
                        change: {
                            fn: function(obj, newValue, oldValue) {
                                // prevod na velke pismena
                                newValue = newValue.toUpperCase();
                                obj.setValue(newValue);
                            }
                        }
                    }
                }]
            }, {
                xtype: 'panel',
                width: '10%',
                layout: 'form',
                items: [{
                    xtype: 'button',
                    //text : i3.ui.Import.tx.txRead,
                    text: '<span class="icon-open" aria-hidden="true"></span> ' + i3.ui.Import.tx.txRead,
                    anchor: i3.c.anchorBase,
                    style: 'padding-top: 18px',
                    handler: function() {
                        this.csGetFilter();
                    },
                    scope: this
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                items: [{
                    xtype: 'fileuploadfield',
                    fieldLabel: i3.ui.Import.tx.txCSVFile,
                    name: 't100b',
                    nameSpace: 'a',
                    buttonText: '<span class="icon-open" aria-hidden="true"></span> ' + i3.ui.Import.tx.txSelectFile,
                    anchor: '-5',
                    id: 'csFile',
                    //anchor : '100%',
                    //hideButton : true,
                    //buttonOffset : 10,
                    //dynamic : true,
                    //buttonOnly: true,
                    //hideLabel : true,
                    //emptyText : 'Browse a file',
                    //buttonCfg : {
                    //text : '...',
                    //iconCls : 'upload-icon'
                    //},
                    listeners: {
                        fileselected: {
                            fn: function(cmp /*, filename*/ ) {
                                // zjisti priponu souboru
                                //function getExt(filename) {
                                //  var ext = filename.split('.').pop();
                                //  if (ext === filename) {
                                //    return "";
                                //  }
                                //  return ext;
                                //}
                                //var sExt;
                                // zjisti priponu souboru
                                //sExt = getExt(filename);
                                //alert(filename);
                                var reader = new window.FileReader();
                                var fileUpload = cmp.fileInput.dom.files[0];
                                //var fileUpload = document.getElementById("filesxxx-file").files[0];
                                reader.onload = function(e) {
                                    var sText = e.target.result;
                                    var q = sText.indexOf('\n');
                                    if (q > 0) {
                                        sText = sText.substring(0, q);
                                    }
                                    // neprilepi hlavicku k nazvu souboru, ale pujde do samostatneho pole
                                    //cmp.setValue(cmp.getValue() + ' (' + sText + ')');
                                    var c = Ext.getCmp('csHeader');
                                    if (c) {
                                        c.setValue(sText);
                                    }
                                };
                                reader.readAsText(fileUpload /*, "UTF-8"*/ );
                                // 02.06.20 on; odesle soubor na server hned po vyberu v dialogu
                                this.csUploadFile0(cmp.fileInput.dom.files[0]);
                            },
                            scope: this
                        }
                    }
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                items: [{
                    //xtype : 'textfield',
                    xtype: 'textarea',
                    fieldLabel: i3.ui.Import.tx.txHeader,
                    anchor: i3.c.anchorBase,
                    name: 't100c',
                    nameSpace: 'a',
                    id: 'csHeader',
                    readOnly: true,
                    grow: true,
                    //growMax: 100,
                    height: 20,
                    growMin: 20
                    //disabled : true
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: i3.ui.Import.tx.txFilter,
                    anchor: '-20',
                    name: 't100g',
                    nameSpace: 'a',
                    validator: function(v) {
                        // FILTER_*
                        if (i3.isEmptyString(v)) {
                            return true;
                        }
                        return /^FILTER_[A-Z0-9][A-Z0-9\-\_]*$/.test(v) ? true : i3.ui.Import.tx.txFilterValidatorError;
                    },
                    listeners: {
                        change: {
                            fn: function(obj, newValue, oldValue) {
                                // prevod na velke pismena
                                newValue = newValue.toUpperCase();
                                obj.setValue(newValue);
                            }
                        }
                    }
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: i3.ui.Import.tx.txDatabase,
                    anchor: '-5',
                    name: 't100h',
                    nameSpace: 'a'
                }]
            }, {
                // 01.06.20 on; oddělovač hodnot (default je ,) - skryto
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                hidden: true,
                items: [{
                    xtype: 'textfield',
                    //fieldLabel: i3.ui.Import.tx.txDatabase,
                    anchor: '-5',
                    name: 't100i',
                    nameSpace: 'a'
                }]
            }, {
                // 01.06.20 on; zapouzdření hodnot (default je "") - skryto
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                hidden: true,
                items: [{
                    xtype: 'textfield',
                    //fieldLabel: i3.ui.Import.tx.txDatabase,
                    anchor: '-5',
                    name: 't100j',
                    nameSpace: 'a'
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                items: [{
                    xtype: 'panel',
                    layout: 'column',
                    anchor: '-5',
                    items: [{
                        xtype: 'radiogroup',
                        columns: [0.5, 0.5],
                        //columnWidth: 1,
                        width: '90%',
                        nameSpace: 'a',
                        name: 't100d',
                        items: [{
                            boxLabel: i3.ui.Import.tx.txRecordsAsNew,
                            name: 't100d',
                            inputValue: '0',
                            checked: true
                        }, {
                            boxLabel: i3.ui.Import.tx.txRecordsUpdate,
                            name: 't100d',
                            inputValue: '2'
                        }],
                        listeners: {
                            change: {
                                fn: this.csSetupInterface,
                                scope: this
                            }
                        }
                    }, {
                        xtype: 'button',
                        text: '<span class="icon-settings" aria-hidden="true"></span> ' + i3.ui.Import.tx.txSettings,
                        id: 'csBtnSetting',
                        handler: function() {
                            this.csSearchSetting();
                        },
                        scope: this
                    }]
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                items: [{
                    dynamic: true,
                    xtype: 'fieldset',
                    style: 'padding-left: 5px',
                    title: ' ',
                    nameSpace: 'a200',
                    autoHeight: true,
                    //name : 't410', // just for help
                    layout: 'column',
                    //width : '100%',
                    anchor: '-5',
                    items: [{
                        xtype: 'panel',
                        width: '20%',
                        layout: 'form',
                        labelAlign: 'top',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: i3.ui.Import.tx.txField,
                            anchor: i3.c.anchorBase,
                            name: 't200a',
                            listeners: {
                                change: {
                                    fn: function(cmp, newValue, oldValue) {
                                        this.csSetIndicators(cmp, newValue);
                                    },
                                    scope: this
                                }
                            }
                        }]
                    }, {
                        xtype: 'panel',
                        width: '10%',
                        layout: 'form',
                        labelAlign: 'top',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: i3.ui.Import.tx.txI1,
                            anchor: i3.c.anchorBase,
                            name: 't200b'
                            //nameSpace : 'a'
                        }]
                    }, {
                        xtype: 'panel',
                        width: '10%',
                        layout: 'form',
                        labelAlign: 'top',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: i3.ui.Import.tx.txI2,
                            anchor: i3.c.anchorBase,
                            name: 't200c'
                            //nameSpace : 'a'
                        }]
                    }, {
                        xtype: 'panel',
                        width: '10%',
                        layout: 'form',
                        labelAlign: 'top',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: i3.ui.Import.tx.txSubfield,
                            anchor: i3.c.anchorBase,
                            name: 't200d'
                            //nameSpace : 'a'
                        }]
                    }, {
                        xtype: 'panel',
                        width: '50%',
                        layout: 'form',
                        labelAlign: 'top',
                        items: [{
                            xtype: 'dyntrigger',
                            //xtype: 'cs_col_trigger',
                            name: 't200X',
                            fieldLabel: i3.ui.Import.tx.txValue,
                            triggerClass: 'x-form-search-trigger',
                            anchor: i3.c.anchorBase,
                            nameSpace: 'a',
                            //displayVal : ['t300e'],
                            csDataForm: this,
                            onTriggerClick: function() {
                                i3.ui.csOpenColWin({
                                    title: i3.ui.Import.tx.txValue,
                                    CsPanel: i3.ui.Import.ValuePanel,
                                    csHideHelp: true,
                                    width: 600 // pozn. tu musi byt sirka inak to blbne
                                    //y : 60 // okno se nebude vertikalne zarovnat na stred, ale bude odsazeno od horniho okraje - zruseno, pri editaci radku dole na formulari, to zbytecne skakalo
                                }, {
                                    csLinRecord: this.csDataForm.csGetValues(this), // datova cast z dyntrigera
                                    csMainForm: this.csDataForm,
                                    csOnAfterOKScope: this,
                                    csOnAfterOK: this.csDataForm.csSetValues,
                                    csPDynTrigger: this
                                });
                            }
                        }]
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 't200e',
                        name: 't200e',
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 't200f',
                        name: 't200f',
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 't200g',
                        name: 't200g',
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 't200h',
                        name: 't200h',
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 't200i',
                        name: 't200i',
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 't200j',
                        name: 't200j',
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 't200k',
                        name: 't200k',
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 't200l',
                        name: 't200l',
                        hidden: true
                    }]
                }]
            }],
            // predefinuje tlacitka
            buttons: [{
                text: i3.ui.Import.tx.txRun,
                listeners: {
                    click: {
                        fn: function() {
                            this.csOnRun();
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ui.Import.tx.txSave,
                listeners: {
                    click: {
                        fn: function() {
                            this.csOnOK();
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ui.Import.tx.txClose,
                listeners: {
                    click: {
                        fn: function() {
                            this.csOnCancel();
                        },
                        scope: this
                    }
                }
            }]
            /*listeners: {
             render: function() {
             // 10.10.16 on; nacteni zaznamu do gridu
             this.csOnFetch({
             csCallback: this.csAddRecordsToGrid,
             csScope: this
             });
             }
             }*/
        });
        i3.ui.Import.Panel.superclass.constructor.call(this, config);
    },
    csSetIndicators: function(cmp, psValue) {
        var bEnabled = (psValue !== '.');
        // indikator 1
        var oI1 = cmp.ownerCt.ownerCt.items.items[1].items.items[0];
        if (oI1) {
            oI1.setDisabled(!bEnabled);
            if (!bEnabled) {
                oI1.setValue('');
            }
        }
        // indikator 2
        var oI2 = cmp.ownerCt.ownerCt.items.items[2].items.items[0];
        if (oI2) {
            oI2.setDisabled(!bEnabled);
            if (!bEnabled) {
                oI2.setValue('');
            }
        }
    },
    /**
     * Nacte zaznam filtru z db.
     */
    csGetFilter: function() {
        var c = Ext.getCmp('csFilterName');
        if (!c) {
            return;
        }
        var sFilterName = c.getValue();
        if (i3.isEmptyString(sFilterName)) {
            i3.alert(i3.ui.Import.tx.txFilterNameEmpty);
            return;
        }
        i3.msgOn('', i3.ui.Import.tx.txLoadFilter, '', i3.ui.Import.c.sMgsId, true);
        i3.WS.getRecord({
            classn: i3.WS.getDfltUnTablesd(),
            t001: i3.ui.Import.c.sImportFilterPrefix + sFilterName,
            scope: this,
            success: function(pRec) {
                i3.msgOff(i3.ui.Import.c.sMgsId);
                this.csLoadLoadFilter(pRec);
            },
            failure: function(msg) {
                i3.msgOff(i3.ui.Import.c.sMgsId);
                i3.displayError(msg);
            }
        });
    },
    csLoadLoadFilter: function(pRec) {
        var oErr = {};
        this.csLinRecord = i3.DataFmt.fromMarc(this.csMarcConvDef, pRec, oErr, true);
        if (oErr.tx) {
            i3.alert('Error linearizing MARC record: ' + oErr.tx);
            this.csLinRecord = {};
            return;
        }
        this.csRecord2Form();
        this.csSetupInterface(undefined, undefined);
    },
    /**
     * @function fncWrite
     * @desc Update alebo delete zaznamu
     * @param {string} psOperation=update operacia update|delete|insert
     */
    csSaveFilter: function(pLinRec) {
        var sDb = i3.WS.getDfltUnTablesd();
        var sT001;
        var c = Ext.getCmp('csFilterName');
        if (!c) {
            return;
        }
        var sFilterName = c.getValue();
        if (i3.isEmptyString(sFilterName)) {
            i3.alert(i3.ui.Import.tx.txFilterNameEmpty);
            return;
        }
        sT001 = i3.ui.Import.c.sImportFilterPrefix + sFilterName;
        var oErr = {};
        var oRec = i3.DataFmt.toMarc(this.csMarcConvDef, pLinRec, oErr);
        if (oErr.tx) {
            i3.alert('Error converting linearized record to MARC: ' + oErr.tx);
            return null;
        }
        oRec.classn = sDb;
        oRec.t001 = sT001;
        // 26.08.10 on; tady bude asi lepsi prevod vzdy
        // 26.08.10 on; podle nastaveni v menu
        //var bSFFixup = this.getCmp('mnuSFFixup').checked;
        //rec.setDataStr(elRecord.getValue(), 1);
        // update nebo insert
        var sOperation;
        // 10.09.21 on; zmena podminky
        //if (i3.isEmptyString(pLinRec.t999a)) {
        if (sT001 !== pLinRec.t001) {
            sOperation = 'insert';
        } else {
            sOperation = 'update';
        }
        i3.msgOn('', i3.ui.Import.tx.txSaveFilter, '', i3.ui.Import.c.sMgsId, true);
        i3.WS.update({
            operation: sOperation,
            success: function(pRec) {
                i3.msgOff(i3.ui.Import.c.sMgsId);
                i3.msg(i3.ui.Import.tx.txUpdateOK, '');
                this.csLoadLoadFilter(pRec);
                //var sIcon;
                //if (sOperation === 'insert') {
                //  sIcon = '<span class="icon-list-insert" aria-hidden="true"></span> ';
                //} else {
                //  sIcon = '<span class="icon-save" aria-hidden="true"></span> ';
                //}
            },
            failure: function(msg) {
                i3.msgOff(i3.ui.Import.c.sMgsId);
                Ext.Msg.show({
                    title: i3.tx.txError,
                    msg: '<h3>' + i3.ui.Import.tx.txUpdate + '</h3>' + msg,
                    buttons: Ext.Msg.OK,
                    icon: 'icon-error',
                    cls: 'shake',
                    minWidth: 350
                });
            },
            scope: this
        }, oRec);
    },
    /**
     * Rohrani podle vybraneho prepinace
     */
    csSetupInterface: function(cmpRadioGroup, cmpCheckedRadio) {
        var c,
            sValue;
        c = Ext.getCmp('csBtnSetting');
        if (!c) {
            return;
        }
        // pokud nejde o udalost vyvolanou zmenou stavu
        if (cmpCheckedRadio) {
            sValue = cmpCheckedRadio.inputValue;
        } else {
            sValue = this.csLinRecord.t100d;
        }
        if (sValue === '2') {
            c.setDisabled(false);
        } else {
            c.setDisabled(true);
        }
    },
    /*
     * Nastaveni vyhledavani
     */
    csSearchSetting: function() {
        i3.ui.csOpenColWin({
            title: '<span class="icon-settings " aria-hidden="true"></span> ' + i3.ui.Import.tx.txSearchParams,
            CsPanel: i3.ui.Import.SearchPanel,
            width: 800,
            csHideHelp: true,
            y: 50 // okno se nebude vertikalne zarovnat na stred, ale bude odsazeno od horniho okraje
        }, {
            csLinRecord: {
                t100a: this.csLinRecord.t100e,
                t100b: this.csLinRecord.t100f,
                t100c: this.csLinRecord.t100D // 24.09.21 on;
            },
            csOnAfterOK: function(pLinRec) {
                this.csLinRecord.t100e = pLinRec.t100a;
                this.csLinRecord.t100f = pLinRec.t100b;
                this.csLinRecord.t100D = pLinRec.t100c; // 24.09.21 on;
            },
            csOnAfterOKScope: this,
            //csMainForm : this,
            idpref: 'import'
        });
    },
    /**
     * nacte z aktualniho fieldsetu udaje do doplnkove obrazovky
     */
    csGetValues: function(cmpDyntrigger) {
        var i,
            cmpFS = cmpDyntrigger.ownerCt.ownerCt,
            cmpItem,
            oRes = {};
        if (!cmpFS) {
            return {};
        }
        // projdu pres vsechny textfieldy (bez panelu) - jsou skryte a vyctu jejich hodnotu
        for (i = 0; i < cmpFS.items.length; i++) {
            cmpItem = cmpFS.items.items[i];
            if (cmpItem.xtype === 'textfield') {
                oRes[cmpItem.name] = cmpItem.getValue();
            }
        }
        // 24.09.21 on; hodnota v poli Pole
        oRes['t200a'] = cmpFS.items.items[0].items.items[0].getValue();
        return oRes;
    },
    /**
     * prenese data z doplnkove obrazovky do aktualniho fieldsetu
     */
    csSetValues: function(psLinRecord) {
        var i,
            cmpItem,
            sValue;
        // this = dyntrigger
        var cmpFS = this.ownerCt.ownerCt;
        if (!cmpFS) {
            return {};
        }
        // projdu pres vsechny textfieldy (bez panelu) - jsou skryte a vyctu jejich hodnotu
        for (i = 0; i < cmpFS.items.length; i++) {
            cmpItem = cmpFS.items.items[i];
            if (cmpItem.xtype === 'textfield') {
                cmpItem.setValue(psLinRecord[cmpItem.name]);
            }
        }
        sValue = this.csDataForm.csGetDtDf(psLinRecord);
        this.setValue(sValue);
    },
    csGetDtDf: function(pLinRec200) {
        // vyklada ZF do dyntriggeru
        var sValue = '',
            s;
        // sloupec
        s = pLinRec200.t200e;
        if (s !== '') {
            sValue += ', ' + s;
        }
        // pouze novy zaznam
        s = pLinRec200.t200f;
        if (s !== '') {
            sValue += ', ' + s;
        }
        // oddelovac casti
        s = pLinRec200.t200g;
        if (s !== '') {
            sValue += ', ' + s;
        }
        // poradi casti
        s = pLinRec200.t200h;
        if (s !== '') {
            sValue += ', ' + s;
        }
        // oddelovac opakovanych hodnot
        s = pLinRec200.t200i;
        if (s !== '') {
            sValue += ', ' + s;
        }
        // samostatne pole
        s = pLinRec200.t200j;
        if (s !== '') {
            sValue += ', ' + s;
        }
        // default
        s = pLinRec200.t200k;
        if (s !== '') {
            sValue += ', ' + s;
        }
        // 29.09.21 on; moznost vymazat existujici opakovani daneho pole
        s = pLinRec200.t200l;
        if (s !== '') {
            sValue += ', ' + s;
        }
        sValue = sValue.substring(2);
        return sValue;
    },
    csSetDyntriggerDfLinrec: function(pLinRecord) {
        var i,
            o,
            sDF;
        if (!pLinRecord.t200) {
            return;
        }
        for (i = 0; i < pLinRecord.t200.length; i++) {
            o = pLinRecord.t200[i];
            sDF = this.csGetDtDf(o);
            o.t200X = sDF;
        }
    },
    csOnRun: function() {
        // 29.09.21 on; predelane
        //this.csForm2Record(); 
        var f = this.extract('a', 'field');
        //var sParams = this.csLinRecord.t100b;
        var sParams = f.t100b;
        if (i3.isEmptyString(sParams)) {
            i3.displayError(i3.ui.Import.tx.txSelectCSVFile);
            return;
        }
        //var sDb = this.csLinRecord.t100h;
        var sDb = f.t100h;
        if (i3.isEmptyString(sDb)) {
            i3.displayError(i3.ui.Import.tx.txDbEmpty);
            return;
        }
        // 01.06.20 on; zruseno, nebude se uz posilat soubor na server, ten uz tam musi byt ulozeny pri tvorbe konfigurace
        /*
         sParams = C_SPACE_CHAR + sParams.strswap(' ', C_SPACE_CHAR);
         var c = Ext.getCmp('csFile');
         if (!c) {
         i3.displayError(i3.ui.Import.tx.txSelectCSVFile);
         return;
         }
         if (c.fileInput.dom.files.length === 0) {
         i3.displayError(i3.ui.Import.tx.txSelectCSVFile);
         return;
         }
         var msgId = 'uploadmsg';
         i3.msgOn('', i3.ui.Import.tx.txUploading, '', msgId, true);
         i3.WS.command({
         db: sDb,
         form: this.getForm().getEl(),
         isUpload: true,
         params: sParams,
         command: 'upload',
         bDontHandleErr: true, // aby nepouzil defautni osetreni chyby (nove vznikle)
         // o-je cely JSON s vysledkom
         success: function(o) {
         i3.msgOff(msgId);
         var m;
         if (o && (o.ret_code === "0")) {
         // zda sa, ze import prebehl uspesne
         if (o.data[0].piece('#', 1) === 'OKUPD001') {
         // tady se zavola metoda pro zpracovani souboru
         // parametr - nazev souboru
         this.csRunImport(o.data[0].piece('#', 2));
         return;
         }
         m = new i3.WS.Msg(o.data[0]);
         i3.alert(m.userText);
         return;
         }
         // chyba
         m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
         // 09.06.16 on; rozsireno o ret_msg
         i3.alert(i3.ui.Import.tx.txUploadErr, m.userText);
         },
         // kvuli i3.msgOff(msgId);
         failure: function(emsg) {
         i3.msgOff(msgId);
         if (emsg && emsg.statusText) {
         Ext.Msg.alert('Info', emsg.statusText);
         } else {
         Ext.Msg.alert('Info', emsg);
         }
         },
         scope: this
         });*/
        this.csRunImport(sParams, sDb);
    },
    /**
     * Spusti na serveru import zaznamu z CSV na zaklade konfiguracniho zaznamu
     */
    csRunImport: function(psFileName, psDb) {
        var C_SPACE_CHAR = '\xa4';
        if (i3.isEmptyString(psFileName)) {
            return;
        }
        psFileName = psFileName.strswap(' ', C_SPACE_CHAR);
        psFileName = C_SPACE_CHAR + psFileName;
        var sRepName = 'report ImportCSVFile';
        // 29.09.21 on; predelane
        //var sDb = this.csLinRecord.t100h;
        var sDb = psDb;
        if (sDb === '') {
            return;
        }
        var c = Ext.getCmp('csFilterName');
        if (!c) {
            return;
        }
        var sCfgName = c.getValue();
        if (sCfgName === '') {
            return;
        }
        sCfgName = i3.ui.Import.c.sImportFilterPrefix + sCfgName;
        var sType = sRepName.piece(' ', 1);
        var sCmd = 'ImportCSVFile ' + sDb + ' ' + sCfgName + ' ' + psFileName;
        i3.msgOn('', i3.ui.Import.tx.txImporting, '', i3.ui.Import.c.sMgsId, true);
        //var sSecClass = i3.WS.getCommandGroupClass(sRepName, i3.WS.getDfltUnTablesd());
        var sSecClass = i3.WS.getCommandGroupClass(sRepName);
        if (sSecClass === '') {
            i3.msgOff(i3.ui.Import.c.sMgsId);
            return;
        }
        i3.WS.commandURC({
            command: sCmd,
            classn: sSecClass,
            type: sType, // jde o report
            success: function(psResp) {
                i3.msgOff(i3.ui.Import.c.sMgsId);
                var m;
                var sURL = i3.WS.sXlate('UnTablesd*ARLDIR', 'URL_REPORTS');
                if (sURL === '') {
                    i3.alert(i3.ui.Import.tx.txErrGetURL);
                    return;
                }
                if (psResp.substring(0, 3) === 'ERR') {
                    // chyba, konec
                    m = new i3.WS.Msg(psResp);
                    i3.displayError(m.userText);
                    return;
                }
                if (psResp.substring(0, 4) === 'rep_') {
                    // vsechno v poradku otevre html stranku
                    // jen cast po prvni mezeru
                    psResp = psResp.piece(' ', 1);
                    psResp = sURL + psResp;
                    window.open(psResp, "_blank");
                    return;
                }
                m = new i3.WS.Msg(psResp);
                i3.displayError(m.userText);
            }, // kvuli i3.msgOff(msgId);
            failure: function(emsg) {
                i3.msgOff(i3.ui.Import.c.sMgsId);
                if (emsg && emsg.statusText) {
                    i3.displayError(emsg.statusText);
                } else {
                    i3.displayError(emsg);
                }
            },
            scope: this
        });
    },
    /**
     * Upload souboru.
     *
     *  02.06.20 on;
     */
    csUploadFile0: function(pFile) {
        var C_SPACE_CHAR = '\xa4';
        if (!pFile) {
            i3.displayError(i3.ui.Import.tx.txSelectCSVFile);
            return;
        }
        var sParams = pFile.name;
        if (i3.isEmptyString(sParams)) {
            i3.displayError(i3.ui.Import.tx.txSelectCSVFile);
            return;
        }
        sParams = C_SPACE_CHAR + sParams.strswap(' ', C_SPACE_CHAR);
        var msgId = 'uploadmsg';
        i3.msgOn('', i3.ui.Import.tx.txUploading, '', msgId, true);
        i3.WS.command({
            db: i3.ictx + 'UnTablesd',
            form: this.getForm().getEl(),
            isUpload: true,
            params: sParams,
            command: 'upload',
            bDontHandleErr: true, // aby nepouzil defautni osetreni chyby (nove vznikle)
            // o-je cely JSON s vysledkom
            success: function(o) {
                i3.msgOff(msgId);
                var m;
                if (o && (o.ret_code === "0")) {
                    // zda sa, ze import prebehl uspesne
                    if (o.data[0].piece('#', 1) === 'OKUPD001') {
                        // nazev souboru zapise do pole
                        var c = Ext.getCmp('csFile');
                        if (c) {
                            c.setValue(o.data[0].piece('#', 2));
                        }
                        return;
                    }
                    m = new i3.WS.Msg(o.data[0]);
                    i3.alert(m.userText);
                    return;
                }
                // chyba
                m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
                // 09.06.16 on; rozsireno o ret_msg
                i3.alert(i3.ui.Import.tx.txUploadErr, m.userText);
            },
            // kvuli i3.msgOff(msgId);
            failure: function(emsg) {
                i3.msgOff(msgId);
                if (emsg && emsg.statusText) {
                    Ext.Msg.alert('Info', emsg.statusText);
                } else {
                    Ext.Msg.alert('Info', emsg);
                }
            },
            scope: this
        });
    },
    csForm2Record: function() {
        var i, o, f = this.extract('a', 'field'),
            // skratka na funkciu
            fFixRep = i3.ui.AuthSelectForm.prototype.csFixRepeatedValues;
        f.t200 = this.extract('a200', 'fieldset');
        fFixRep(f.t200);
        Ext.apply(this.csLinRecord, f);
        // 24.09.21 on; specialitka pro aktualizaci zaznamu
        if (this.csLinRecord.t100d === '0') {
            this.csLinRecord.t100D = '';
        }
        if (this.csLinRecord.t100D === 'A') {
            this.csLinRecord.t100d = '1';
            this.csLinRecord.t100D = '';
        }
        // 24.09.21 on; pro vsechna opakovani 200, pokud je 200a '' nebo '.', smazu 200l
        for (i = 0; i < this.csLinRecord.t200.length; i++) {
            o = this.csLinRecord.t200[i];
            if ((o.t200a === '') || (o.t200a === '.')) {
                o.t200l = '';
            }
        }
    },
    /**
     * Prevod zo zaznamu do formulara
     */
    csRecord2Form: function() {
        // 24.09.21 on; specialitka pro aktualizaci zaznamu
        if (this.csLinRecord.t100d === '1') {
            this.csLinRecord.t100d = '2';
            this.csLinRecord.t100D = 'A';
        }
        this.csSetDyntriggerDfLinrec(this.csLinRecord);
        var o = {
            setupAll: true
        };
        this.populate(this.csLinRecord, 'a', 'field', o);
        // 200
        this.populate(this.csLinRecord.t200, 'a200', 'fieldset', o);
        // 03.06.20 on; je to potreba
        this.doLayout();
    },
    /**
     * Reakcia na OK
     * 08.09.21 on; prevzato z predka, abych zrusil zavreni okna
     */
    csOnOK: function() {
        // 09.12.15 on; pokud je fomular nevalidni, skonci - nekdy se tlacitko OK zakaze az pozdej a uzivatel stihne kliknout
        if (!this.form.isValid()) {
            return;
        }
        this.csForm2Record();
        //              update internal record
        this.csBuildDisplayField();
        //        update display field if any
        this.csUpdateParent();
        //             update parent
        //var w = this.findParentByType(i3.ui.ColWin); w.close();
        // ked je definovany callback, ktory ma byt volany po stlaceni OK
        // vybavit ho
        if (this.csOnAfterOK) {
            this.csOnAfterOK.call(this.csOnAfterOKScope || this, this.csLinRecord);
        }
        //this.ownerCt.close();   // 08.09.21 on; zruseno
    },
    /**
     * Konverzni tabulka.
     */
    csMarcConvDef: {
        fmtPrefix: 'UN',
        map: ['001', '000.', '005.', //
            '100a', '100b', '100c', '100d', '100D', '100e', '100f', '100g', '100h', '100i', '100j', //
            {
                tag: '200',
                subfields: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'X']
            }, '999a', '999b', '999c', '999d', '999e', '999f', //
            'C99a', 'C99b', 'C99c', 'C99d', 'C99e', 'C99f', 'Tdia', 'T00a'
        ]
    }
});
/**
 * @class i3.ui.Import
 *
 */
Ext.apply(i3.ui.Import, {
    /**
     * Konfigurace importu zaznamu z CSV souboru
     */
    csImportCfg: function() {
        var sDelim;
        if (i3.isEmptyString(i3.ictx)) {
            if (document.URL.indexOf('?') >= 0) {
                sDelim = '&';
            } else {
                sDelim = '?';
            }
            i3.displayError(i3.fillInParams(i3.ui.Import.tx.txIctxNeeded, [document.URL + sDelim + 'ictx=cs']));
            return;
        }
        i3.ui.csOpenColWin({
            title: '<span class="icon-open" aria-hidden="true"></span> ' + i3.ui.Import.tx.txImportCfg,
            CsPanel: i3.ui.Import.Panel,
            width: 800,
            y: 20 // okno se nebude vertikalne zarovnat na stred, ale bude odsazeno od horniho okraje
        }, {
            //csBtnOkCaption : i3.ui.Import.tx.txSave,
            csLinRecord: {
                // default - zaznamy vkladat jako nove
                t100d: '0'
            },
            csOnAfterOK: function(pLinRec) {
                this.csSaveFilter(pLinRec);
            },
            // 24.09.21 on; link na help
            onToolsHelp: function() {
                var s = 'https://arl2.library.sk/wiki_arl/index.php/Manu%C3%A1ly:Rozhran%C3%AD_pro_import_dat_ve_form%C3%A1tu_CSV';
                window.open(s, s);
            },
            //csOnAfterOKScope : this,
            //csMainForm : this,
            idpref: 'import'
        });
    }
});
/**
 * @class i3.ui.Import.SearchPanel
 *
 * Formular konfigurace vyhledavani.
 *
 */
i3.ui.Import.SearchPanel = Ext.extend(i3.ui.ColPanel, {
    constructor: function(config) {
        config = config || {};
        Ext.apply(config, {
            layout: 'column',
            items: [{
                    xtype: 'panel',
                    width: '50%',
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: i3.ui.Import.tx.txColumnId,
                        anchor: i3.c.anchorBase,
                        name: 't100a',
                        nameSpace: 'a'
                    }]
                }, {
                    xtype: 'panel',
                    width: '50%',
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: i3.ui.Import.tx.txSearchBy,
                        anchor: i3.c.anchorBase,
                        name: 't100b',
                        nameSpace: 'a'
                    }]
                },
                // 24.09.21 on; moznost zakladat nove zaznamy, pokud se nic nenajde
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'form',
                    items: [{
                        xtype: 'checkboxgroup',
                        hideLabel: true,
                        name: 't100c',
                        nameSpace: 'a',
                        anchor: i3.c.anchorBase,
                        items: [{
                            inputValue: 'A',
                            boxLabel: i3.ui.Import.tx.txCreateNewRecord
                        }]
                    }]
                }
            ]
        });
        i3.ui.Import.SearchPanel.superclass.constructor.call(this, config);
    }
});
/**
 * @class i3.ui.Import.ValuePanel
 *
 * Formular konfigurace pro jednotliva pole.
 *
 * 20.08.19 on; pole Hodnota
 */
i3.ui.Import.ValuePanel = Ext.extend(i3.ui.ColPanel, {
    constructor: function(config) {
        config = config || {};
        Ext.apply(config, {
            layout: 'column',
            items: [{
                    xtype: 'panel',
                    width: '50%',
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: i3.ui.Import.tx.txColumn,
                        anchor: i3.c.anchorBase,
                        name: 't200e',
                        nameSpace: 'a'
                    }]
                }, {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'form',
                    items: [{
                        xtype: 'panel',
                        layout: 'column',
                        items: [{
                            xtype: 'radiogroup',
                            //columns : [0.5, 0.5],
                            columns: [1],
                            columnWidth: 1,
                            nameSpace: 'a',
                            name: 't200f',
                            items: [{
                                boxLabel: i3.ui.Import.tx.txInsertIntoNewRec,
                                name: 't200f',
                                inputValue: '0',
                                checked: true
                            }, {
                                boxLabel: i3.ui.Import.tx.txInsertIntoExistingRecToo,
                                name: 't200f',
                                inputValue: '1'
                            }, {
                                boxLabel: i3.ui.Import.tx.txInsertIntoExistingRecOnly,
                                name: 't200f',
                                inputValue: '2'
                            }]
                        }]
                    }]
                }, {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'form',
                    style: 'padding-top: 10px',
                    items: [{
                        xtype: 'fieldset',
                        style: 'padding-left: 5px',
                        title: i3.ui.Import.tx.txColumnPart,
                        autoHeight: true,
                        layout: 'column',
                        anchor: '-5',
                        //dynamic : true,
                        //nameSpace : 'a200',
                        //name : 't410', // just for help
                        //width : '100%',
                        items: [{
                            xtype: 'panel',
                            width: '50%',
                            layout: 'form',
                            labelAlign: 'top',
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: i3.ui.Import.tx.txDelimiter,
                                anchor: i3.c.anchorBase,
                                name: 't200g',
                                nameSpace: 'a'
                            }]
                        }, {
                            xtype: 'panel',
                            width: '50%',
                            layout: 'form',
                            labelAlign: 'top',
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: i3.ui.Import.tx.txOrder,
                                anchor: i3.c.anchorBase,
                                name: 't200h',
                                nameSpace: 'a'
                            }]
                        }]
                    }]
                }, {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'form',
                    items: [{
                        //dynamic : true,
                        xtype: 'fieldset',
                        style: 'padding-left: 5px',
                        title: i3.ui.Import.tx.txValueRepetition,
                        autoHeight: true,
                        layout: 'column',
                        anchor: '-5',
                        //nameSpace : 'a200',
                        //name : 't410', // just for help
                        //width : '100%',
                        items: [{
                            xtype: 'panel',
                            width: '40%',
                            layout: 'form',
                            labelAlign: 'top',
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: i3.ui.Import.tx.txDelimiter,
                                anchor: '-20',
                                name: 't200i',
                                nameSpace: 'a',
                                listeners: {
                                    // 08.09.21 on; pri vymazu hodnoty odznaci radiobtn
                                    //              pri zapisu hodnoty oznaci prvni radiobtn
                                    change: function(pFld) {
                                        var sValue = pFld.getValue();
                                        var c = Ext.getCmp('separatef');
                                        if (c && i3.isEmptyString(sValue)) {
                                            c.setValue('');
                                        } else {
                                            if (c && !i3.isEmptyString(sValue) && i3.isEmptyString(c.getValue())) {
                                                c.setValue('1');
                                                // default
                                            }
                                        }
                                    }
                                }
                            }]
                        }, {
                            xtype: 'panel',
                            width: '60%',
                            layout: 'form',
                            items: [{
                                xtype: 'panel',
                                layout: 'column',
                                items: [{
                                    xtype: 'radiogroup',
                                    style: 'padding-top: 12px',
                                    columns: [0.5, 0.5],
                                    columnWidth: 1,
                                    nameSpace: 'a',
                                    name: 't200j',
                                    id: 'separatef',
                                    items: [{
                                        boxLabel: i3.ui.Import.tx.txSeparateField,
                                        name: 't200j',
                                        inputValue: '1' // 08.09.21 on; zmena hodnoty 0->1
                                    }, {
                                        boxLabel: i3.ui.Import.tx.txSeparateSubfield,
                                        name: 't200j',
                                        inputValue: '0' // 08.09.21 on; zmena hodnoty 1->0
                                    }]
                                }]
                            }]
                        }]
                    }]
                }, {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: i3.ui.Import.tx.txPredefinedValue,
                        anchor: i3.c.anchorBase,
                        name: 't200k',
                        nameSpace: 'a'
                    }]
                },
                // 24.09.21 on; moznost vymazat existujici opakovani daneho pole
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'form',
                    items: [{
                        xtype: 'checkboxgroup',
                        hideLabel: true,
                        name: 't200l',
                        nameSpace: 'a',
                        anchor: i3.c.anchorBase,
                        id: 'cmpDelExtField',
                        items: [{
                            inputValue: '1',
                            boxLabel: i3.ui.Import.tx.txDeleteExistingField
                        }]
                    }]
                }
            ]
        });
        i3.ui.Import.ValuePanel.superclass.constructor.call(this, config);
    },
    /**
     * 08.09.21 on; rozsireni metody predka
     */
    csRecord2Form: function() {
        // 07.09.21 on; t200f nesmi byt prazdne - povinne pole
        if (i3.isEmptyString(this.csLinRecord.t200f)) {
            this.csLinRecord.t200f = '0';
        }
        this.populate(this.csLinRecord, 'a', 'field', {
            setupAll: true
        });
        this.doLayout();
        // 24.09.21 on; aktualizuje rozhrani
        this.csSetupInterface200();
    },
    /**
     * Prevod zaznamu z formulara hlavneho okna do interneho tvaru (this.linRecord)
     *
     * 08.09.21 on; rozsireni metody predka
     */
    csForm2Record: function() {
        var f = this.extract('a', 'field');
        // pokud je prazdne pole delim, nesmi byt oznaceny radiobtn
        if (i3.isEmptyString(f.t200i) && !i3.isEmptyString(f.t200j)) {
            f.t200j = '';
        }
        Ext.apply(this.csLinRecord, f);
    },
    /**
     * 24.09.21 on; nastavi editaci checkboxu podle hodnoty Pole 
     */
    csSetupInterface200: function() {
        var bEnabled = (this.csLinRecord.t200a !== '') && (this.csLinRecord.t200a !== '.');
        var c = Ext.getCmp('cmpDelExtField');
        if (c) {
            c.setDisabled(!bEnabled);
            if (!bEnabled) {
                c.setValue('');
            }
        }
    }
});
