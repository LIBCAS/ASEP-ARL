/*
 * Import zaznamu do ARL - prikaz ^X("im")
 * Komponentu lze zapojit do I3 apliaci viz. dm
 * 
 * 10.01.22 jk; zalozeno 
 */
/*global Ext,i3,alert,window, document */
Ext.ns('i3.ui.ImportRec');
i3.ui.ImportRec.tx = { //
    txClose: 'Zavrieť#Zavřít#Close'.ls(),
    txConf: 'Konfigurácia#Konfigurace#Configration'.ls(),
    txDatabase: 'Trieda (databáza)#Třída (databáze)#Class (database0)'.ls(),
    txDbEmpty: 'Názov databázy je prázdny.#Název databáze je prázdný.#Database name is empty.'.ls(),
    txErrGetURL: 'Chyba pri načítaní URL_LOGS z ARLDIR.#Chyba při načtení URL_LOGS z ARLDIR.#Error getting URL_LOGS from ARLDIR.'.ls(),
    txFileFormat: 'Formát súboru#Formát souboru#File format'.ls(),
    txFileFormatUTF8: 'UTF-8#UTF-8#UTF-8'.ls(),
    txFileFormatUnicode: 'Unicode 16bit#Unicode 16bit#Unicode 16bit'.ls(),
    txFileFormatCP1250: 'CP 1250#CP 1250#CP 1250'.ls(),
    txFillOneOnly: 'Iba jedna z položiek Indexy/Konfigurácia môže byť vyplnená#Pouze jedna z položek Indexy/Konfigurace může být vyplněna#Only one of the Indexes/Configuration items can be filled'.ls(),
    txOptFilter: 'Importný filter#Importní filtr#Import filter'.ls(),
    txCheckDupl: 'Kontrola duplicít (duplcheck)#Kontrola duplicit (duplcheck)#Duplicate control (duplcheck)'.ls(),
    txCheckDuplNum: 'Kontrolné číslo#Kontrolní číslo#Control number'.ls(),
    txCheckduplnumErr: 'Kontrolné číslo alebo \'new\' musí byť zadané#Kontrolní číslo nebo \'new\' musí být zadáno#Control number or \'new\' must be entered'.ls(),
    txCheckSkipAllowSave: 'Vypnúť kontroly pred uložením (skipallowsave) #Vypnout kontroly před uložením (skipallowsave)#Skip allow save'.ls(),
    txCheckSkipOnError: 'Pokračovať pri chybe (skiponerror) #Pokračovat při chybě (skiponerror)#Skipp on error'.ls(),
    txCheckT005: 'Kontrola#Kontrola 005#Check 005'.ls(),
    txChronology: 'Nastavenie chronológie zmien#Nastavení chronologie změn#Setting of changes chronology'.ls(),
    txChronology0: '"0" bez chronológie#"0" bez chronologie#"0" without chronology'.ls(),
    txChronology1: '"1" minichronológia (aktualizácia poľa 005 a 999)#"1" minichronologie (aktualizace polí 005 a 999)#"1" minichronology (update of field 005 and 999)'.ls(),
    txChronology2: '"2" minichronológia a chronológia "U" (kópia záznamu pred zmenou)#"2" minichronologie a chronologie "U" (kopie záznamu před změnou)#"2" minichronology and chronology "U" (copy of record before change)'.ls(),
    txChronology3: '"3" minichronológia a chronológia "U" + "UB" (kópia záznamu pred zmenou aj po zmene)#"3" minichronologie a chronologie "U" + "UB" (kopie záznamu před zmenou i po změně)"#"3" minichronology and chronology "U" + "UB" (copy of record before change and after change)'.ls(),
    txChronologyDescription: 'Popis hromadnej zmeny do chronológie#Popis hromadné změny do chronologie#Description of global change to chronology'.ls(),
    txIctxNeeded: 'Nastavte najskôr ICTX v URL Správca dat napr.<br>%s#Nastavte nejprve ICTX v URL Správce dat např. %s#Please set ICTX in Data Manager URL first e.g. %s'.ls(),
    txImporting: 'Prebieha import#Probíhá import#Import is running'.ls(),
    txImportRec: 'Importu záznamov#Importu záznamů#Import records'.ls(),
    txIndices: 'Indexy#Indexy#Indices'.ls(),
    txNumSer: 'T001 číselný rad#T001 číselná řada#T001 Number serie'.ls(),
    txOperation: 'Operácia#Operace#Operation'.ls(),
    txOperationInsert: 'Insert#Insert#Insert'.ls(),
    txOperationUpdate: 'Update#Update#Update'.ls(),
    txOperationUpdateOnly: 'Iba update#Pouze update#Update only'.ls(),
    txOptions: 'Nastavenie #Nastavení#Options'.ls(),
    txOptBase: 'Základný číselník#Base číselník#Base codelist'.ls(),
    txOptDispeach: 'Zobraziť info o každom importovanom zázname #Zobrazit info o každém importovaném záznamu#Display each import record info'.ls(),
    txOptJointaglines: 'Spojiť riadky jedného poľa (jointaglines) #Spojit řádky jednoho pole (jointaglines)#Join tag lines'.ls(),
    txOptNoui: 'Bez aktualizácie indexov (noui)#Bez aktualizace indexů (noui)#No update indices'.ls(),
    txOptPrefix: 'T001 prefix#T001 prefix#T001 prefix'.ls(),
    txOptSkipto: 'Import od záznamu (skipto) #Import od záznamu (skipto)#Skip to'.ls(),
    txOptXmllog: 'Log importu XML#Log importu XML#XML import log'.ls(),
    txOptXmllog1: 'Adresár ARLDIR#Adresář ARLDIR#Folder ARLDIR'.ls(),
    txRecFile: 'Súbor#Soubor#File'.ls(),
    txRecFormat: 'Formát záznamov#Formát záznamů#Record format'.ls(),
    txRecFormatLinemarc: 'LINEMARC#LINEMARC#LINEMARC'.ls(),
    txRecFormatXmlSlim: 'XML-SLIM#XML-SLIM#XML-SLIM'.ls(),
    txRun: 'Spustiť import#Spustit import#Run import'.ls(),
    txRunImportErr: 'Chyba pri spustení importu#Chyba při spuštění importu#Error starting import'.ls(),
    txSelectFile: 'Vybrať súbor#Vybrat soubor#Select file'.ls(),
    txSelectFile1: 'Vyberte súbor#Vyberte soubor.#Select file.'.ls(),
    txSpace: 'Položky formulára nesmú obsahovať medzery#Položky formuláře nesmí obsahovat mezery#Form items cannot contain spaces'.ls(),
    txTagCheck: 'Kontroly#Kontroly#Checks'.ls(),
    txTagOperation: 'Operácia s poľami #Operace s poli#Tag operation'.ls(),
    txTagOperationApp: 'Pripojiť k existujúcim (append)#Připojit k existujícím (append)#Append'.ls(),
    txTagOperationRep: 'Vymazať existujúce (replace)#Vymazat existující (replace)#Replace'.ls(),
    txUploading: 'Odosielam súbor#Odesílám soubor#Sending file'.ls(),
    txUploadErr: 'Chyba pri uploadu súboru#Chyba při uploadu souboru#File upload error'.ls(),
};
i3.ui.ImportRec.c = {
    sMgsId: 'IMPORT_MSG'
};
/**
 * @class i3.ui.ImportRec.Panel
 * Formular konfigurace importu.
 */
i3.ui.ImportRec.Panel = Ext.extend(i3.ui.ColPanel, {
    constructor: function(config) {
        config = config || {};
        var cbFilter = {
            xtype: 'combo',
            fieldLabel: 'Class',
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
            width: 212
        };
        Ext.apply(config, {
            layout: 'column',
            id: 'main',
            items: [{
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                items: [{
                    xtype: 'fileuploadfield',
                    id: 'fileupload',
                    fieldLabel: i3.ui.ImportRec.tx.txRecFile,
                    buttonText: '<span class="icon-open" aria-hidden="true"></span> ' + i3.ui.ImportRec.tx.txSelectFile,
                    anchor: '-5',
                    csFileNameOnServer: '',
                    listeners: {
                        fileselected: {
                            fn: function(cmp) {
                                this.csUploadFile0(cmp.fileInput.dom.files[0]);
                            },
                            scope: this
                        }
                    }
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    id: 'database',
                    fieldLabel: i3.ui.ImportRec.tx.txDatabase,
                    anchor: '-5'
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                items: [{
                    xtype: 'fieldset',
                    title: i3.ui.ImportRec.tx.txFileFormat,
                    items: [{
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'radio',
                            boxLabel: i3.ui.ImportRec.tx.txFileFormatUTF8,
                            name: 'ff01',
                            id: 'ffutf8',
                            inputValue: 'utf8',
                            width: '100',
                            checked: true
                        }, {
                            xtype: 'radio',
                            boxLabel: i3.ui.ImportRec.tx.txFileFormatUnicode,
                            name: 'ff01',
                            id: 'ffunicode',
                            inputValue: 'unicode',
                            width: '150'
                        }, {
                            xtype: 'radio',
                            boxLabel: i3.ui.ImportRec.tx.txFileFormatCP1250,
                            name: 'ff01',
                            id: 'ffcp1250',
                            inputValue: 'cp1250',
                            width: '100'
                        }]
                    }]
                }]
            }, {
                xtype: 'panel',
                width: '50%',
                layout: 'form',
                items: [{
                    xtype: 'fieldset',
                    title: i3.ui.ImportRec.tx.txRecFormat,
                    hideLabel: true,
                    items: [{
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'radio',
                            boxLabel: i3.ui.ImportRec.tx.txRecFormatLinemarc,
                            name: 'rf01',
                            id: 'rflinemarc',
                            inputValue: 'linemarc',
                            width: '100',
                            checked: true
                        }, {
                            xtype: 'radio',
                            boxLabel: i3.ui.ImportRec.tx.txRecFormatXmlSlim,
                            name: 'rf01',
                            id: 'rfxmlslim',
                            inputValue: 'xml-slim',
                            width: '100',
                            listeners: {
                                'check': {
                                    fn: function(comp, checked) {
                                        if (checked === true) {
                                            Ext.getCmp('optxmllog').enable();
                                            Ext.getCmp('optxmlloglabel').enable();
                                            Ext.getCmp('optxmllogadr').enable();
                                        } else {
                                            Ext.getCmp('optxmllog').disable();
                                            Ext.getCmp('optxmlloglabel').disable();
                                            Ext.getCmp('optxmllogadr').disable();
                                        }
                                    }
                                },
                                scope: this
                            }
                        }]
                    }]
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                bodyStyle: 'padding-bottom:4px',
                items: [{
                    xtype: 'fieldset',
                    title: i3.ui.ImportRec.tx.txOperation,
                    collapsible: true,
                    collapsed: true,
                    items: [{
                        xtype: 'compositefield',
                        hideLabel: true,
                        items: [{
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txOperationInsert,
                            name: 'opr01',
                            id: 'opins',
                            inputValue: 'insert',
                            width: '100',
                            listeners: {
                                'check': {
                                    fn: function(comp, checked) {
                                        if (checked === true) {
                                            Ext.getCmp('tgopapp').disable();
                                            Ext.getCmp('tgoprep').disable();
                                            Ext.getCmp('checkdupl').disable();
                                            Ext.getCmp('checkduplnum').disable();
                                            Ext.getCmp('checkduplnumlabel').disable();
                                            Ext.getCmp('optbase').disable();
                                            Ext.getCmp('optprefix').disable();
                                            Ext.getCmp('optprefixlabel').disable();
                                            Ext.getCmp('checkt005').disable();
                                            Ext.getCmp('opins1').enable();
                                            Ext.getCmp('opinsnew').enable();
                                            Ext.getCmp('opinsnew2').enable();
                                            var opup = Ext.getCmp('opup');
                                            opup.disable();
                                            opup.setValue(false);
                                            var opuponly = Ext.getCmp('opuponly');
                                            opuponly.disable();
                                            opuponly.setValue(false);
                                        } else {
                                            Ext.getCmp('checkt005').enable(); // dale se muze zakazat podle tgopapp a tgoprep
                                            var tgopapp = Ext.getCmp('tgopapp');
                                            var tgoprep = Ext.getCmp('tgoprep');
                                            if (tgopapp.checked === false) {
                                                tgoprep.enable();
                                            } else {
                                                Ext.getCmp('checkt005').disable();
                                            }
                                            if (tgoprep.checked === false) {
                                                tgopapp.enable();
                                            } else {
                                                Ext.getCmp('checkt005').disable();
                                            }
                                            var checkdupl = Ext.getCmp('checkdupl');
                                            checkdupl.enable();
                                            if (checkdupl.getValue()) {
                                                Ext.getCmp('checkduplnum').enable();
                                                Ext.getCmp('checkduplnumlabel').enable();
                                            }
                                            Ext.getCmp('optprefix').enable();
                                            Ext.getCmp('optprefixlabel').enable();
                                            Ext.getCmp('optbase').enable();
                                            Ext.getCmp('opins1').disable();
                                            Ext.getCmp('opinsnew').disable();
                                            Ext.getCmp('opinsnew2').disable();
                                            Ext.getCmp('opup').enable();
                                            Ext.getCmp('opuponly').enable();
                                        }
                                    }
                                },
                                scope: this
                            }
                        }, {
                            xtype: 'label',
                            width: '100',
                            id: 'opins1',
                            text: i3.ui.ImportRec.tx.txNumSer,
                            style: 'padding-top: 4px',
                            disabled: true
                        }, {
                            xtype: 'radio',
                            id: 'opinsnew',
                            boxLabel: 'NEW',
                            name: 'ntins01',
                            inputValue: 'new',
                            width: '50',
                            disabled: true,
                            checked: true
                        }, {
                            xtype: 'radio',
                            id: 'opinsnew2',
                            boxLabel: 'NEW2',
                            name: 'ntins01',
                            width: '60',
                            disabled: true,
                            inputValue: 'new2'
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        items: [{
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txOperationUpdate,
                            name: 'opr01',
                            id: 'opup',
                            inputValue: 'update',
                            width: '100',
                            listeners: {
                                'check': {
                                    fn: function(comp, checked) {
                                        if (checked === true) {
                                            Ext.getCmp('opup1').enable();
                                            Ext.getCmp('opupind').enable();
                                            Ext.getCmp('opup2').enable();
                                            Ext.getCmp('opupconf').enable();
                                            Ext.getCmp('opup3').enable();
                                            Ext.getCmp('opupnew').enable();
                                            Ext.getCmp('opupnew2').enable();
                                            Ext.getCmp('optbase').disable();
                                            var opins = Ext.getCmp('opins');
                                            opins.disable();
                                            opins.setValue(false);
                                            var opuponly = Ext.getCmp('opuponly');
                                            opuponly.disable();
                                            opuponly.setValue(false);
                                        } else {
                                            Ext.getCmp('opup1').disable();
                                            Ext.getCmp('opupind').disable();
                                            Ext.getCmp('opup2').disable();
                                            Ext.getCmp('opupconf').disable();
                                            Ext.getCmp('opup3').disable();
                                            Ext.getCmp('opupnew').disable();
                                            Ext.getCmp('opupnew2').disable();
                                            Ext.getCmp('optbase').enable();
                                            Ext.getCmp('opins').enable();
                                            Ext.getCmp('opuponly').enable();
                                        }
                                    }
                                },
                                scope: this
                            }
                        }, {
                            xtype: 'label',
                            id: 'opup1',
                            text: i3.ui.ImportRec.tx.txIndices,
                            style: 'padding-top: 4px',
                            disabled: true
                        }, {
                            xtype: 'textfield',
                            id: 'opupind',
                            anchor: i3.c.anchorBase,
                            disabled: true
                        }, {
                            xtype: 'label',
                            id: 'opup2',
                            text: i3.ui.ImportRec.tx.txConf,
                            style: 'padding-top: 4px',
                            disabled: true
                        }, {
                            xtype: 'textfield',
                            id: 'opupconf',
                            anchor: i3.c.anchorBase,
                            disabled: true
                        }, {
                            xtype: 'label',
                            id: 'opup3',
                            text: i3.ui.ImportRec.tx.txNumSer,
                            style: 'padding-top: 4px',
                            disabled: true
                        }, {
                            xtype: 'radio',
                            id: 'opupnew',
                            boxLabel: 'NEW',
                            name: 'ntup01',
                            inputValue: 'new',
                            disabled: true,
                            checked: true
                        }, {
                            xtype: 'radio',
                            id: 'opupnew2',
                            boxLabel: 'NEW2',
                            name: 'ntup01',
                            disabled: true,
                            inputValue: 'new2'
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        items: [{
                            xtype: 'checkbox',
                            id: 'opuponly',
                            boxLabel: i3.ui.ImportRec.tx.txOperationUpdateOnly,
                            name: 'opr01',
                            inputValue: 'updateonly',
                            width: '100',
                            listeners: {
                                'check': {
                                    fn: function(comp, checked) {
                                        if (checked === true) {
                                            Ext.getCmp('opuponly1').enable();
                                            Ext.getCmp('opuponlyind').enable();
                                            Ext.getCmp('opuponly2').enable();
                                            Ext.getCmp('opuponlyconf').enable();
                                            Ext.getCmp('optbase').disable();
                                            var opins = Ext.getCmp('opins');
                                            opins.disable();
                                            opins.setValue(false);
                                            var opup = Ext.getCmp('opup');
                                            opup.disable();
                                            opup.setValue(false);
                                        } else {
                                            Ext.getCmp('opuponly1').disable();
                                            Ext.getCmp('opuponlyind').disable();
                                            Ext.getCmp('opuponly2').disable();
                                            Ext.getCmp('opuponlyconf').disable();
                                            Ext.getCmp('optbase').enable();
                                            Ext.getCmp('opins').enable();
                                            Ext.getCmp('opup').enable();
                                        }
                                    }
                                },
                                scope: this
                            }
                        }, {
                            xtype: 'label',
                            id: 'opuponly1',
                            text: i3.ui.ImportRec.tx.txIndices,
                            style: 'padding-top: 4px',
                            disabled: true
                        }, {
                            xtype: 'textfield',
                            id: 'opuponlyind',
                            anchor: i3.c.anchorBase,
                            disabled: true
                        }, {
                            xtype: 'label',
                            id: 'opuponly2',
                            text: i3.ui.ImportRec.tx.txConf,
                            style: 'padding-top: 4px',
                            disabled: true
                        }, {
                            xtype: 'textfield',
                            id: 'opuponlyconf',
                            anchor: i3.c.anchorBase,
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
                    title: i3.ui.ImportRec.tx.txTagOperation,
                    collapsible: true,
                    collapsed: true,
                    items: [{
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txTagOperationApp,
                            id: 'tgopapp',
                            width: '200',
                            listeners: {
                                'check': {
                                    fn: function(comp, checked) {
                                        if (checked === true) {
                                            Ext.getCmp('tgoprep').disable();
                                            Ext.getCmp('checkt005').disable();
                                        } else {
                                            Ext.getCmp('tgoprep').enable();
                                            Ext.getCmp('checkt005').enable();
                                        }
                                    }
                                },
                                scope: this
                            }
                        }, {
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txTagOperationRep,
                            id: 'tgoprep',
                            width: '200',
                            listeners: {
                                'check': {
                                    fn: function(comp, checked) {
                                        if (checked === true) {
                                            Ext.getCmp('tgopapp').disable();
                                            Ext.getCmp('checkt005').disable();
                                        } else {
                                            Ext.getCmp('tgopapp').enable();
                                            Ext.getCmp('checkt005').enable();
                                        }
                                    }
                                },
                                scope: this
                            }
                        }]
                    }]
                }]
            }, {
                xtype: 'panel',
                width: '100%',
                layout: 'form',
                items: [{
                    xtype: 'fieldset',
                    title: i3.ui.ImportRec.tx.txTagCheck,
                    collapsible: true,
                    collapsed: true,
                    items: [{
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txCheckSkipAllowSave,
                            id: 'checksas',
                            width: '300'
                        }, {
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txCheckSkipOnError,
                            id: 'checksoe',
                            width: '230'
                        }, {
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txCheckT005,
                            id: 'checkt005',
                            width: '100'
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txCheckDupl,
                            id: 'checkdupl',
                            width: '200',
                            listeners: {
                                'check': {
                                    fn: function(comp, checked) {
                                        if (checked === true) {
                                            Ext.getCmp('checkduplnumlabel').enable();
                                            Ext.getCmp('checkduplnum').enable();
                                        } else {
                                            Ext.getCmp('checkduplnumlabel').disable();
                                            Ext.getCmp('checkduplnum').disable();
                                        }
                                    }
                                },
                                scope: this
                            }
                        }, {
                            xtype: 'label',
                            id: 'checkduplnumlabel',
                            width: '90',
                            text: i3.ui.ImportRec.tx.txCheckDuplNum,
                            style: 'padding-top: 4px',
                            disabled: true
                        }, {
                            xtype: 'textfield',
                            id: 'checkduplnum',
                            value: 'new',
                            anchor: i3.c.anchorBase,
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
                    title: i3.ui.ImportRec.tx.txOptions,
                    collapsible: true,
                    collapsed: true,
                    items: [{
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txOptNoui,
                            id: 'optnoui',
                            width: '200'
                        }, {
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txOptJointaglines,
                            id: 'optjointaglines',
                            width: '250'
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txOptBase,
                            id: 'optbase',
                            width: '200'
                        }, {
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txOptDispeach,
                            id: 'optdisplayeach',
                            width: '300'
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'label',
                            id: 'optprefixlabel',
                            width: '170',
                            text: i3.ui.ImportRec.tx.txOptPrefix,
                            style: 'padding-top: 4px'
                        }, {
                            xtype: 'textfield',
                            id: 'optprefix',
                            anchor: i3.c.anchorBase,
                            width: '204'
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'label',
                            id: 'optskiptolabel',
                            width: '170',
                            text: i3.ui.ImportRec.tx.txOptSkipto,
                            style: 'padding-top: 4px'
                        }, {
                            xtype: 'textfield',
                            id: 'optskipto',
                            anchor: i3.c.anchorBase,
                            width: '204'
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'label',
                            id: 'optfilterlabel',
                            width: '170',
                            text: i3.ui.ImportRec.tx.txOptFilter,
                            style: 'padding-top: 4px'
                        }, cbFilter]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            xtype: 'checkbox',
                            boxLabel: i3.ui.ImportRec.tx.txOptXmllog,
                            id: 'optxmllog',
                            disabled: true,
                            width: '130'
                        }, {
                            xtype: 'label',
                            id: 'optxmlloglabel',
                            width: '100',
                            text: i3.ui.ImportRec.tx.txOptXmllog1,
                            style: 'padding-top: 4px',
                            disabled: true
                        }, {
                            xtype: 'textfield',
                            id: 'optxmllogadr',
                            anchor: i3.c.anchorBase,
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
                    title: i3.ui.ImportRec.tx.txChronology,
                    collapsible: true,
                    collapsed: true,
                    items: [{
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            boxLabel: i3.ui.ImportRec.tx.txChronology0,
                            xtype: 'radio',
                            id: 'runPnlChrono0',
                            name: 'runPnlChrono',
                            checked: true,
                            listeners: {
                                'check': function(obj, checked) {
                                    if (checked === true) {
                                        Ext.getCmp('runPnlChronoDesc').disable();
                                    }
                                },
                                scope: this
                            }
                        }],
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            boxLabel: i3.ui.ImportRec.tx.txChronology1,
                            xtype: 'radio',
                            id: 'runPnlChrono1',
                            name: 'runPnlChrono',
                            listeners: {
                                'check': function(obj, checked) {
                                    if (checked === true) {
                                        Ext.getCmp('runPnlChronoDesc').disable();
                                    }
                                },
                                scope: this
                            }
                        }],
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            boxLabel: i3.ui.ImportRec.tx.txChronology2,
                            xtype: 'radio',
                            id: 'runPnlChrono2',
                            name: 'runPnlChrono',
                            listeners: {
                                'check': function(obj, checked) {
                                    if (checked === true) {
                                        Ext.getCmp('runPnlChronoDesc').enable();
                                    }
                                },
                                scope: this
                            }
                        }],
                    }, {
                        xtype: 'compositefield',
                        hideLabel: true,
                        msgTarget: 'side',
                        items: [{
                            boxLabel: i3.ui.ImportRec.tx.txChronology3,
                            xtype: 'radio',
                            id: 'runPnlChrono3',
                            name: 'runPnlChrono',
                            listeners: {
                                'check': function(obj, checked) {
                                    if (checked === true) {
                                        Ext.getCmp('runPnlChronoDesc').enable();
                                    }
                                },
                                scope: this
                            }
                        }]
                    }, {
                        xtype: 'compositefield',
                        hideLabel: false,
                        msgTarget: 'side',
                        disabled: true,
                        items: [{
                            xtype: 'textarea',
                            id: 'runPnlChronoDesc',
                            fieldLabel: i3.ui.ImportRec.tx.txChronologyDescription,
                            allowBlank: true,
                            width: '98%',
                            //anchor: '-15'
                        }]
                    }]
                }]
            }],
            // predefinuje tlacitka
            buttons: [{
                text: i3.ui.ImportRec.tx.txRun,
                listeners: {
                    click: {
                        fn: function() {
                            this.csOnRun();
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ui.ImportRec.tx.txClose,
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
        i3.ui.ImportRec.Panel.superclass.constructor.call(this, config);
    },
    csOnRun: function() {
        var append = '0';
        var base = '0';
        var cp1250 = '0';
        var displayeach = '0';
        var duplcheck = '';
        var filter = '';
        var chgtrx = '0'; // nepouziva se uz
        var chronology = '0';
        var insert = '0';
        var iso = ''; // neimplementovano
        var jointaglines = '0';
        var nochgtrx = ''; // nepouziva se uz
        var noui = '0';
        var prefix = '';
        var replace = '0';
        var skipallowsave = '0';
        var skiponerr = '0';
        var skipto = '';
        var t005check = '0';
        var unicode = '0';
        var update = '0';
        var updateonly = '0';
        var xml = '';
        var xmllog = '0';
        var C_SPACE_CHAR = '\xa4';
        var dD = '\xab'; // oddelovac parametru do WS;
        var fileName = Ext.getCmp('fileupload').csFileNameOnServer;
        if (i3.isEmptyString(fileName)) {
            i3.displayError(i3.ui.ImportRec.tx.txSelectFile1);
            return;
        }
        var sDb = Ext.getCmp('database').getValue();
        if (i3.isEmptyString(sDb)) {
            i3.displayError(i3.ui.ImportRec.tx.txDbEmpty);
            return;
        }
        // dalsi nepovinne polozky prikazu
        if (Ext.getCmp('ffunicode').getValue()) {
            unicode = '1';
        } else if (Ext.getCmp('ffcp1250').getValue()) {
            cp1250 = '1';
        }
        if (Ext.getCmp('rfxmlslim').getValue()) {
            xml = 'slim';
        }
        if (Ext.getCmp('opins').getValue()) {
            insert = '1';
            var new1 = Ext.getCmp('opinsnew').getValue();
            if (new1) {
                insert = insert + '-new';
            } else {
                insert = insert + '-new2';
            }
        } else if (Ext.getCmp('opup').getValue()) {
            update = '1';
            var indx = Ext.getCmp('opupind').getValue();
            var conf = Ext.getCmp('opupconf').getValue();
            var new1 = Ext.getCmp('opupnew').getValue();
            if ((!i3.isEmptyString(indx)) && (!i3.isEmptyString(conf))) {
                i3.displayError(i3.ui.ImportRec.tx.txFillOneOnly);
                return;
            }
            if (!i3.isEmptyString(indx)) {
                if (indx.indexOf(' ') >= 0) {
                    i3.displayError(i3.ui.ImportRec.tx.txSpace);
                    return;
                }
                update = update + "-" + indx + '-';
            } else if (!i3.isEmptyString(conf)) {
                if (conf.indexOf(' ') >= 0) {
                    i3.displayError(i3.ui.ImportRec.tx.txSpace);
                    return;
                }
                update = update + '--' + conf;
            } else {
                // pouzije se default conf
                update = update + '--';
            }
            if (new1) {
                update = update + '-new';
            } else {
                update = update + '-new2';
            }
        } else if (Ext.getCmp('opuponly').getValue()) {
            updateonly = '1';
            var indx = Ext.getCmp('opuponlyind').getValue();
            var conf = Ext.getCmp('opuponlyconf').getValue();
            if ((!i3.isEmptyString(indx)) && (!i3.isEmptyString(conf))) {
                i3.displayError(i3.ui.ImportRec.tx.txFillOneOnly);
                return;
            }
            if (!i3.isEmptyString(indx)) {
                if (indx.indexOf(' ') >= 0) {
                    i3.displayError(i3.ui.ImportRec.tx.txSpace);
                    return;
                }
                updateonly = updateonly + '-' + indx + '-';
            } else if (!i3.isEmptyString(conf)) {
                if (conf.indexOf(' ') >= 0) {
                    i3.displayError(i3.ui.ImportRec.tx.txSpace);
                    return;
                }
                updateonly = updateonly + '--' + conf;
            } else {
                // pouzije se default conf
                updateonly = updateonly + '--' + conf;
            }
        }
        var tgopapp = Ext.getCmp('tgopapp');
        var tgoprep = Ext.getCmp('tgoprep');
        if (!tgopapp.disabled && tgopapp.getValue()) {
            append = '1';
        } else if (!tgoprep.disabled && tgoprep.getValue()) {
            replace = '1'
        }
        var checksas = Ext.getCmp('checksas');
        var checksoe = Ext.getCmp('checksoe');
        var checkt005 = Ext.getCmp('checkt005');
        var checkdupl = Ext.getCmp('checkdupl');
        var checkduplnum = Ext.getCmp('checkduplnum');
        if (!checksas.disabled && checksas.getValue()) {
            skipallowsave = '1';
        }
        if (!checksoe.disabled && checksoe.getValue()) {
            skiponerr = '1';
        }
        if (!checkt005.disabled && checkt005.getValue()) {
            t005check = '1';
        }
        if (!checkdupl.disabled && checkdupl.getValue()) {
            var num1 = checkduplnum.getValue();
            if (num1 !== 'new') {
                var num1 = parseInt(num1); // bacha pusti desetinnou tecku protoze prevede '12.5' -> 12
                if (!Number.isInteger(num1)) {
                    i3.displayError(i3.ui.ImportRec.tx.txCheckduplnumErr);
                    return;
                }
            }
            duplcheck = num1;
        }
        var optnoui = Ext.getCmp('optnoui');
        var optjointaglines = Ext.getCmp('optjointaglines');
        var optbase = Ext.getCmp('optbase');
        var optdisplayeach = Ext.getCmp('optdisplayeach');
        var optprefix = Ext.getCmp('optprefix');
        var optskipto = Ext.getCmp('optskipto');
        var optfilter = Ext.getCmp('optcmbfilter');
        var optxmllog = Ext.getCmp('optxmllog');
        var optxmllogadr = Ext.getCmp('optxmllogadr');
        if (!optnoui.disabled && optnoui.getValue()) {
            noui = '1'
        }
        if (!optjointaglines.disabled && optjointaglines.getValue()) {
            jointaglines = '1'
        }
        if (!optbase.disabled && optbase.getValue()) {
            base = '1';
        }
        if (!optdisplayeach.disabled && optdisplayeach.getValue()) {
            displayeach = '1';
        }
        if ((!optprefix.disabled) && (!i3.isEmptyString(optprefix.getValue()))) {
            var val1 = optprefix.getValue()
            if (val1.indexOf(' ') >= 0) {
                i3.displayError(i3.ui.ImportRec.tx.txSpace);
                return;
            }
            prefix = val1;
        }
        if ((!optskipto.disabled) && (!i3.isEmptyString(optskipto.getValue()))) {
            var val1 = optskipto.getValue()
            if (val1.indexOf(' ') >= 0) {
                i3.displayError(i3.ui.ImportRec.tx.txSpace);
                return;
            }
            skipto = val1;
        }
        if ((!optfilter.disabled) && (!i3.isEmptyString(optfilter.getValue()))) {
            var val1 = optfilter.getValue()
            if (val1.indexOf(' ') >= 0) {
                i3.displayError(i3.ui.ImportRec.tx.txSpace);
                return;
            }
            if (val1.indexOf('*') === -1) {
                val1 = i3.ictx + 'UnTablesd*' + val1; 
            }   
            filter = val1;
        }
        if (!optxmllog.disabled && optxmllog.getValue()) {
            var val1 = optxmllogadr.getValue();
            xmllog = '1';
            if (!i3.isEmptyString(val1)) {
                if (val1.indexOf(' ') >= 0) {
                    i3.displayError(i3.ui.ImportRec.tx.txSpace);
                    return;
                }
                xmllog = xmllog + '-' + val1;
            }
        }
        var runPnlChrono0 = Ext.getCmp('runPnlChrono0');
        var runPnlChrono1 = Ext.getCmp('runPnlChrono1');
        var runPnlChrono2 = Ext.getCmp('runPnlChrono2');
        var runPnlChrono3 = Ext.getCmp('runPnlChrono3');
        var runPnlChronoDesc = Ext.getCmp('runPnlChronoDesc');
        if (runPnlChrono0.getValue()) {
            chronology = '0';
        } else if (runPnlChrono1.getValue()) {
            chronology = '1';
        } else if (runPnlChrono2.getValue()) {
            chronology = '2';
        } else if (runPnlChrono3.getValue()) {
            chronology = '3';
        }
        if (!runPnlChronoDesc.disabled) {
            var chrdsc = runPnlChronoDesc.getValue();
            if (!i3.isEmptyString(chrdsc)) {
                chrdsc = C_SPACE_CHAR + chrdsc.strswap(' ', C_SPACE_CHAR);
                chronology = chronology + '-' + chrdsc;
            }
        }
        var cmd = dD + append + dD + base + dD + i3.className2LName(sDb) + dD + cp1250 + dD + displayeach + dD + duplcheck + dD + filter + dD + chgtrx + dD + chronology + dD + insert + dD + iso + dD + jointaglines + dD + nochgtrx + dD + noui + dD + prefix + dD + replace + dD + skipallowsave + dD + skiponerr + dD + skipto + dD + t005check + dD + unicode + dD + update + dD + updateonly + dD + xml + dD + xmllog + dD + fileName;
        this.csRunImport(sDb, cmd);
    },
    /**
     * Spusti na serveru import zaznamu
     */
    csRunImport: function(db, cmd) {
        var msgId = 'MsgWsCommandXimport' + Math.floor((Math.random() * 1000) + 1);
        i3.msgOn('Running ximport ...', '', '', msgId);
        i3.WS.command({
            db: db,
            params: cmd,
            command: 'ximport',
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
    /**
     * Upload souboru.
     */
    csUploadFile0: function(pFile) {
        var C_SPACE_CHAR = '\xa4';
        if (!pFile) {
            i3.displayError(i3.ui.ImportRec.tx.txSelectFile1);
            return;
        }
        var sParams = pFile.name;
        if (i3.isEmptyString(sParams)) {
            i3.displayError(i3.ui.ImportRec.tx.txSelectFile1);
            return;
        }
        sParams = C_SPACE_CHAR + sParams.strswap(' ', C_SPACE_CHAR);
        var msgId = 'uploadmsg';
        i3.msgOn('', i3.ui.ImportRec.tx.txUploading, '', msgId, true);
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
                        // nazev souboru na serveru zapisu do vlastni property
                        Ext.getCmp('fileupload').csFileNameOnServer = o.data[0].piece('#', 2);
                        return;
                    }
                    m = new i3.WS.Msg(o.data[0]);
                    i3.alert(m.userText);
                    return;
                }
                // chyba
                m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
                // rozsireno o ret_msg
                i3.alert(i3.ui.ImportRec.tx.txUploadErr, m.userText);
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
});
/**
 * @class i3.ui.ImportRec
 *
 */
Ext.apply(i3.ui.ImportRec, {
    /**
     * Importu zaznamu ze souboru
     */
    csImportCfg: function() {
        var sDelim;
        if (i3.isEmptyString(i3.ictx)) {
            if (document.URL.indexOf('?') >= 0) {
                sDelim = '&';
            } else {
                sDelim = '?';
            }
            i3.displayError(i3.fillInParams(i3.ui.ImportRec.tx.txIctxNeeded, [document.URL + sDelim + 'ictx=cs']));
            return;
        }
        i3.ui.csOpenColWin({
            title: '<span class="icon-open" aria-hidden="true"></span> ' + i3.ui.ImportRec.tx.txImportRec,
            CsPanel: i3.ui.ImportRec.Panel,
            width: 800,
            y: 20 // okno se nebude vertikalne zarovnat na stred, ale bude odsazeno od horniho okraje
        }, {
            //csBtnOkCaption : i3.ui.ImportRec.tx.txSave,
            csLinRecord: {},
            csOnAfterOK: function(pLinRec) {},
            // 24.09.21 on; link na help
            onToolsHelp: function() {
                var s = 'https://arl2.library.sk/wiki_arl/index.php/Spr%C3%A1vce_dat';
                window.open(s, s);
            },
            //csOnAfterOKScope : this,
            //csMainForm : this,
            idpref: 'import'
        });
    }
});
