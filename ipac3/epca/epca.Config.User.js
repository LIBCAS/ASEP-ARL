/**
 * Ruzne uzivatelske metodu s tesnou vazbou na kod aplikace
 *
 * 20.02.25 on; bude se volat existujici metoda
 * 05.11.24 on; konfigurace pro SAV (kopie CAV)
 * 14.07.23 on; zrusena vyjimka pro individualniho uzivatele
 * 30.06.23 on; upraveno csOnSendClick
 * 28.06.23 on; upraveno csOnSendClick 
 * 22.06.23 on; udalost pri odeslani datoveho zaznamu
 * 08.02.23 on; uprava csOnCheck
 * 11.11.21 on; doplnena udalost pri zmene checkboxu
 * 10.11.21 on; udalost pri oznaceni checkboxu
 * 29.03.17 on; doplneny vujimkove metody pro CAV
 */
/*global epca, Ext, i3*/
Ext.ns('epca.Config.User');
// konfigurace pro CAV
if (i3.ictx.toLowerCase() === 'cav') { // TODO zmenit na cav
    epca.Config.User = {
        csPreSave: function(record, pTab) {
            var i, bFirst701Found = false;
            // funkce, ktera upravi zaznam tesne pred ulozenim do db
            if (record.data) {
                for (i = 0; i < record.data.length; i++) {
                    // osetreni 7xx
                    if (!bFirst701Found && (record.data[i].substring(0, 3) === '701')) {
                        record.data[i] = '700' + record.data[i].substring(3);
                        bFirst701Found = true;
                    }
                }
                // zapise "1" do U99a
                if (record.getTag('U99a') === '') {
                    record.setTag('U99    ' + i3.c.SF + 'a1');
                }
                // zapise "1" do U99b, pokud jde o formular OHLASY
                if (pTab && pTab.form && (pTab.form.formId === 'OHLASY')) {
                    // podle predchoziho kodu U99 existuje vzdy
                    var tU99 = record.getTag('U99');
                    tU99 = record.setSubTagStr(tU99, 'b', '1');
                    record.setTag(tU99);
                }
            }
        },
        csPreOpen: function(record) {
            var i;
            // funkce, ktera upravi zaznam tesne pred ulozenim do db
            if (record.data) {
                for (i = 0; i < record.data.length; i++) {
                    // osetreni 7xx
                    if (record.data[i].substring(0, 3) === '700') {
                        record.data[i] = '701' + record.data[i].substring(3);
                    }
                }
            }
        },
        // 14.07.23 on; nepouziva se
        /*csSetIndividualInterface: function(pbValue) {
            // jen individualni uzivatel
            var c = Ext.getCmp('tabPanelForms');
            if (!c) {
                return;
            }
            if (!c.ownerCt.csIsIndividualUser()) {
                return;
            }
            var cmpSave = Ext.getCmp('maintb_save');
            if (cmpSave) {
                if (pbValue) {
                    cmpSave.setTooltip('Odoslať spracovateľovi#Odeslat zpracovateli#Submit to processor'.ls());
                    // po ulozeni zavre zalozku
                    cmpSave.handler = function() {
                        this.save(true);
                    };
                } else {
                    cmpSave.setTooltip('Uložiť#Uložit#Save'.ls());
                    cmpSave.handler = function() {
                        this.save(false);
                    };
                }
            }
        },*/
        // 14.07.23 on; zrusena vyjimka pro individualniho uzivatele
        /*csUpdateInterfaceUser: function(activTab) {
            // jen individualni uzivatel
            if (!this.csIsIndividualUser()) {
                return;
            }
            var cmpSave = Ext.getCmp('maintb_save');
            if (!cmpSave) {
                return;
            }
            //var formRecord = epca.convertToMarc(activTab.marcToSet);
            var marcData = this.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
            this.mergeMarc(activTab.marcCloneToSet, marcData);
            if (activTab.form.unFormat === 'E') {
                if (marcData && marcData.U95 && (marcData.U95.sta === '1')) {
                    cmpSave.setTooltip('Odoslať spracovateľovi#Odeslat zpracovateli#Submit to processor'.ls());
                    // po ulozeni zavre zalozku
                    cmpSave.handler = function() {
                        this.save(true);
                    };
                } else {
                    cmpSave.setTooltip('Uložiť#Uložit#Save'.ls());
                    cmpSave.handler = function() {
                        this.save(false);
                    };
                }
            } else {
                cmpSave.setTooltip('Uložiť#Uložit#Save'.ls());
                cmpSave.handler = function() {
                    this.save(false);
                };
            }
        },*/
        // 10.11.21 on; udalost pri oznaceni checkboxu
        csOnCheck: function(checked) {
            var cmpSave = Ext.getCmp('maintb_save');
            // 08.02.23 on; jen pri oznaceni
            if (checked) {
                // individualni uzivatel ma vyjimku
                var c = Ext.getCmp('tabPanelForms');
                if (!c) {
                    return;
                }
                var mainForm = c.ownerCt;
                var activTab = mainForm.getTabPanelForms().getActiveTab();
                if (mainForm.csIsIndividualUser()) {
                    var marcData = mainForm.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
                    mainForm.mergeMarc(activTab.marcCloneToSet, marcData);
                    if (activTab.form.unFormat === 'E') {
                        if (marcData && marcData.U95 && (marcData.U95.sta === '1')) {
                            cmpSave.setTooltip('Odoslať spracovateľovi#Odeslat zpracovateli#Submit to processor'.ls());
                            // po ulozeni zavre zalozku
                            cmpSave.handler = function() {
                                this.save(true);
                            };
                        } else {
                            cmpSave.setTooltip('Uložiť#Uložit#Save'.ls());
                            cmpSave.handler = function() {
                                this.save(false);
                            };
                        }
                    } else {
                        cmpSave.setTooltip('Uložiť#Uložit#Save'.ls());
                        cmpSave.handler = function() {
                            this.save(false);
                        };
                    }
                }
                var e = null;
                // we don't have any event, so let's use nothing
                Ext.callback(cmpSave.handler, cmpSave.scope, [cmpSave, e], 0, cmpSave);
            }
        },
        // 22.06.23 on; udalost pri odeslani datoveho zaznamu
        csOnSendClick: function() {
            var cmpSave = Ext.getCmp('maintb_save');
            var c = Ext.getCmp('tabPanelForms');
            if (!c) {
                return;
            }
            var mainForm = c.ownerCt;
            var activTab = mainForm.getTabPanelForms().getActiveTab();
            // 28.06.23 on; musi byt oznacen checkbox tzn U95a===1
            var marcData = mainForm.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
            mainForm.mergeMarc(activTab.marcCloneToSet, marcData);
            // 30.06.23 on; vse se bude kontrolovat na serveru
            //if (!marcData || !marcData.U95 || (marcData.U95.sta !== '1')) {
            //    epca.notify('Před odesláním nejprve potvrďte souhlas!', epca.L10n.messageError, "icon-error-epca");
            //    return;
            //}
            // 28.06.23 on; doplni do zaznamu U95c=1
            if (!marcData['U95']) {
                marcData['U95'] = {};
            }
            marcData['U95'][epca.form.Helper.c.sSubtagPrefix + 'c'] = '1';
            // individualni uzivatel - vedec
            // pokud budou chyby zobrazit upozornění, pokud nebudou, tak záznam zmizí + hlaska
            if (mainForm.csIsIndividualUser()) {
                //var marcData = mainForm.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
                //mainForm.mergeMarc(activTab.marcCloneToSet, marcData);
                if (activTab.form.unFormat === 'E') {
                    // po ulozeni zavre zalozku, vynuti kontrolu a zobrazi hlasku
                    mainForm.save(true, marcData, true, 'Děkujeme, že ukládáte data do datového repozitáře ASEP. O zveřejnění budete informováni e-mailem.');
                }
            } else
                // zpracovatek nebo superuzivatel
                // pokud budou chyby zobrazit upozornění
                if (mainForm.csIsProcessorUser() || mainForm.csIsSuperUser()) {
                    //var marcData = mainForm.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
                    //mainForm.mergeMarc(activTab.marcCloneToSet, marcData);
                    if (activTab.form.unFormat === 'E') {
                        // pri ulozeni vynuti kontrolu 
                        mainForm.save(false, marcData, true);
                    }
                }
        }
        /**
         * Prevodni tabulka pro prebirani zaznamu z WOS/SCOPUS
         *
         * 03.11.16 on; zrusen popup prebiraci formular, zatim neni potreba
         */
        /*csMarcConvDefUN: {
         fmtPrefix: 'UN',
         map: ['000.', '001', '005.', //
         //'200i1', '200a', '200b', '200c', '200d', '200e', '200f', '200g', '200h', '200i', '200z', '200v', '2005', '205a', '205b', '205d', '205f', '205g', //
         '300a', //
         'C99a', 'C99b', 'C99c', 'C99d', 'C99e', 'C99f' //
         ]
         }*/
    };
    // 21.07.16 on; zruseno, bude se pouzivat formular navrzeny v designeru
    // 27.05.16 on; formular pro import zaznamu z WOS/SCOPUS
    /**
     * @class epca.Config.User.pnlWosScopus
     *
     */
    /*epca.Config.User.pnlWosScopus = Ext.extend(i3.ui.ColPanel, {
     constructor: function(config) {
     config = config || {};

     Ext.apply(config, {
     items: [{
     xtype: 'panel',
     width: '100%',
     layout: 'form',
     labelAlign: 'left',
     items: [{
     xtype: 'fieldset',
     title: 'Názvové údaje',
     //width : '100%',
     anchor: '-5',
     labelAlign: 'left',
     items: [{
     xtype: 'textfield',
     fieldLabel: '<a href="https://www.lib.cas.cz/asep/pro-zpracovatele/manual/popis-poli/#T200a" onclick="window.open(\'https://www.lib.cas.cz/asep/pro-zpracovatele/manual/popis-poli/#T200a\',\'_blank\',\'resizable=yes,scrollbars=yes,width=1000,height=600\'); return false">Název práce</a>',
     labelSeparator: '',
     name: 't200a',
     nameSpace: 'a',
     anchor: '-5'
     }, {
     xtype: 'textfield',
     fieldLabel: '<a href="https://www.lib.cas.cz/asep/pro-zpracovatele/manual/popis-poli/#T5410a" onclick="window.open(\'https://www.lib.cas.cz/asep/pro-zpracovatele/manual/popis-poli/#T541a\',\'_blank\',\'resizable=yes,scrollbars=yes,width=1000,height=600\'); return false">Překlad názvu do AJ</a>',
     labelSeparator: '',
     name: 't541a',
     nameSpace: 'a',
     anchor: '-5'
     }]
     }]
     }, {
     xtype: 'panel',
     width: '50%',
     layout: 'form',
     items: [{
     xtype: 'textfield',
     fieldLabel: '300a',
     labelSeparator: '',
     name: 't300a',
     nameSpace: 'a',
     anchor: '-5'
     }]
     }, {
     xtype: 'panel',
     width: '100%',
     layout: 'form',
     items: [{
     xtype: 'cs_combo_st',
     fieldLabel: 'Defaultní formulář',
     anchor: i3.c.anchorBase,
     csStatTableN: 'STABLE_UN_C99D',
     name: 'tC99d',
     nameSpace: 'a',
     allowBlank: false
     }]
     }]
     });
     epca.Config.User.pnlWosScopus.superclass.constructor.call(this, config);
     },
     csRecord2Form: function() {
     this.csLinRecord.tC99d = '';

     // inherited method
     this.constructor.superclass.csRecord2Form.call(this);
     // validace formulare
     this.form.isValid();
     }
     });*/
} else
    // 05.11.24 on; konfigurace pro SAV (kopie CAV)
    if (i3.ictx.toLowerCase() === 'sav') {
        epca.Config.User = {
            csPreSave: function(record, pTab) {
                var i, bFirst701Found = false;
                // funkce, ktera upravi zaznam tesne pred ulozenim do db
                if (record.data) {
                    for (i = 0; i < record.data.length; i++) {
                        // osetreni 7xx
                        if (!bFirst701Found && (record.data[i].substring(0, 3) === '701')) {
                            record.data[i] = '700' + record.data[i].substring(3);
                            bFirst701Found = true;
                        }
                    }
                    // zapise "1" do U99a
                    if (record.getTag('U99a') === '') {
                        record.setTag('U99    ' + i3.c.SF + 'a1');
                    }
                    // zapise "1" do U99b, pokud jde o formular OHLASY
                    if (pTab && pTab.form && (pTab.form.formId === 'OHLASY')) {
                        // podle predchoziho kodu U99 existuje vzdy
                        var tU99 = record.getTag('U99');
                        tU99 = record.setSubTagStr(tU99, 'b', '1');
                        record.setTag(tU99);
                    }
                }
            },
            csPreOpen: function(record) {
                var i;
                // funkce, ktera upravi zaznam tesne pred ulozenim do db
                if (record.data) {
                    for (i = 0; i < record.data.length; i++) {
                        // osetreni 7xx
                        if (record.data[i].substring(0, 3) === '700') {
                            record.data[i] = '701' + record.data[i].substring(3);
                        }
                    }
                }
            },
            // 09.12.24 on; nepouziva se
            // 10.11.21 on; udalost pri oznaceni checkboxu
            /*csOnCheck: function(checked) {
                var cmpSave = Ext.getCmp('maintb_save');
                // 08.02.23 on; jen pri oznaceni
                if (checked) {
                    // individualni uzivatel ma vyjimku
                    var c = Ext.getCmp('tabPanelForms');
                    if (!c) {
                        return;
                    }
                    var mainForm = c.ownerCt;
                    var activTab = mainForm.getTabPanelForms().getActiveTab();
                    if (mainForm.csIsIndividualUser()) {
                        var marcData = mainForm.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
                        mainForm.mergeMarc(activTab.marcCloneToSet, marcData);
                        if (activTab.form.unFormat === 'E') {
                            if (marcData && marcData.U95 && (marcData.U95.sta === '1')) {
                                cmpSave.setTooltip('Odoslať spracovateľovi#Odeslat zpracovateli#Submit to processor'.ls());
                                // po ulozeni zavre zalozku
                                cmpSave.handler = function() {
                                    this.save(true);
                                };
                            } else {
                                cmpSave.setTooltip('Uložiť#Uložit#Save'.ls());
                                cmpSave.handler = function() {
                                    this.save(false);
                                };
                            }
                        } else {
                            cmpSave.setTooltip('Uložiť#Uložit#Save'.ls());
                            cmpSave.handler = function() {
                                this.save(false);
                            };
                        }
                    }
                    var e = null;
                    // we don't have any event, so let's use nothing
                    Ext.callback(cmpSave.handler, cmpSave.scope, [cmpSave, e], 0, cmpSave);
                }
            },*/
            // 22.06.23 on; udalost pri odeslani datoveho zaznamu
            csOnSendClick: function() {
                var cmpSave = Ext.getCmp('maintb_save');
                var c = Ext.getCmp('tabPanelForms');
                if (!c) {
                    return;
                }
                var mainForm = c.ownerCt;
                var activTab = mainForm.getTabPanelForms().getActiveTab();
                // 28.06.23 on; musi byt oznacen checkbox tzn U95a===1
                var marcData = mainForm.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
                mainForm.mergeMarc(activTab.marcCloneToSet, marcData);
                // 30.06.23 on; vse se bude kontrolovat na serveru
                //if (!marcData || !marcData.U95 || (marcData.U95.sta !== '1')) {
                //    epca.notify('Před odesláním nejprve potvrďte souhlas!', epca.L10n.messageError, "icon-error-epca");
                //    return;
                //}
                // 28.06.23 on; doplni do zaznamu U95c=1
                if (!marcData['U95']) {
                    marcData['U95'] = {};
                }
                marcData['U95'][epca.form.Helper.c.sSubtagPrefix + 'c'] = '1';
                // individualni uzivatel - vedec
                // pokud budou chyby zobrazit upozornění, pokud nebudou, tak záznam zmizí + hlaska
                if (mainForm.csIsIndividualUser()) {
                    //var marcData = mainForm.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
                    //mainForm.mergeMarc(activTab.marcCloneToSet, marcData);
                    if (activTab.form.unFormat === 'E') {
                        // po ulozeni zavre zalozku, vynuti kontrolu a zobrazi hlasku
                        mainForm.save(true, marcData, true, 'Ďakujeme, že ukladáte dáta do dátového repozitára ASEP. O zverejnení budete informovaní e-mailom.');
                    }
                } else
                    // zpracovatek nebo superuzivatel
                    // pokud budou chyby zobrazit upozornění
                    if (mainForm.csIsProcessorUser() || mainForm.csIsSuperUser()) {
                        //var marcData = mainForm.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
                        //mainForm.mergeMarc(activTab.marcCloneToSet, marcData);
                        if (activTab.form.unFormat === 'E') {
                            // pri ulozeni vynuti kontrolu 
                            mainForm.save(false, marcData, true);
                        }
                    }
            },
            csOnLoadLicenseClick: function() {
                // 20.02.25 on; bude se volat existujici metoda
                /*var sURL, psDB, ps001;

          var c = Ext.getCmp('tabPanelForms');
          if (!c) {
              return;
          }
          var mainForm = c.ownerCt;
          var activTab = mainForm.getTabPanelForms().getActiveTab();
          ps001 = activTab.recordId;
          psDB = i3.className2LName(activTab.form.targetDb);	  
          if (!ps001 || (ps001 === 'new')) {
            i3.displayError('Prosím najskôr záznam uložte!#Prosím nejdříve záznam uložte!#Please save record first!'.ls());
            return;
          }
	  // vyskladam URL
          if (window.location.href.toLowerCase().indexOf('/i3t/') >= 0) {
	    sURL = '/i2t/i2.entry.cls';
	  } else {
            sURL = '/i2/i2.entry.cls';
	  }
	  sURL += '?ictx='+i3.ictx.toLowerCase()+'&language=' + i3.language + '&op=uploader&idx=' + psDB + '*' + ps001;
          // pri prihlaseni pres ucet ctenare nefunguje
          //'&_arlsso=' + encodeURIComponent(i3.WS.csSecurity.username) + '&_arlssopw=' + encodeURIComponent(i3.WS.csSecurity.arlsso);
          window.open(sURL, "_blank");*/
                var c = Ext.getCmp('tabPanelForms');
                if (!c) {
                    return;
                }
                var mainForm = c.ownerCt;
                mainForm.csUploadContentServer();
            }
        };
    }
