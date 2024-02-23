/* podpora pre "zberatelske okna" (collectors)
 *
 * 11.08.16 on; moznost zakazat help globalne
 * 10.12.15 on; kontrola platnosti formulare
 * 17.03.15 on; txDoplnkovaObrazovka
 * 21.03.14 on; arabstina
 * 24.01.14 on; moznost predefinovat popisek tlacitka OK
 * 15.11.13 on; ikona helpu se skryje, pokud je skryta v hlavnim okne
 * 15.03.13 jk; ikona helpu lze skryt parametrem csHideHelp
 * 15.03.13 jk; doplneny jazykove vezre k tlacitku Zrusit
 * 13.06.12 on; osetreno volani csOpenColWin
 * 28.11.09 rs; pridane xtype:form pre colwin formulare
 * 25.11.09 rs; ladiacu volbu zobrazit len v debug rezime
 * 05.10.09 rs; redefinicia funkcii v i3.ui
 * 05.10.09 rs; formalne upravy pre dokumentaciu
 * 28.08.09 rs; doplnenych par komentarov a volanie helpov
 * 09.04.09 rs;
 */
/*global Ext,i3,alert */
Ext.ns('i3.ui');
// 21.03.14 on;
Ext.ns('i3.ui.ColPnl');
i3.ui.ColPnl.tx = { //
    // sem pridu preklady textov
    txOK: 'OK#OK#OK###أوافق'.ls(),
    txCancel: 'Zrušiť#Zrušit#Cancel###إلغاء'.ls(),
    txDoplnkovaObrazovka: 'Doplnková obrazovka#Doplňková obrazovka#Supplementary form'.ls()
};
/**
 * @class i3.ui.ColPanel
 * Zaklad collector panelu, abstraktna trieda bez formularovych prvkov
 *
 * properties
 *   csColWindow  - bude pointer na materske okno (teda z panelu aby sa pohodlne dalo dostat o uroven vyssie)
 */
i3.ui.ColPanel = Ext.extend(Ext.form.FormPanel, {
    /**
     * @param {Object} config
     *
     *       csOnAfterOK:      callback after OK
     *       csOnAfterOKScope  dtto
     */
    constructor: function(config) {
        config = config || {};
        Ext.applyIf(config, {
            // 28.11.98 rs
            xtype: 'form', // toto je potrebne pre funkcnost csAddOnFocus u Field viz i3.UI.Ext.js
            labelAlign: 'top',
            layout: 'column',
            frame: true,
            monitorValid: true,
            defaults: {
                labelSeparator: '',
                labelAlign: 'top'
            },
            bodyStyle: 'padding: 5px 5px 5px 5px',
            deferredRender: false, //
            // sirka bude podla okna (dynamicky mi to neslo (uz len kvoli column layoutu))
            autoHeight: true,
            buttons: [{
                text: config.csBtnOkCaption || i3.ui.ColPnl.tx.txOK, // 24.01.14 on; moznost predefinovat popisek tlacitka OK
                formBind: true,
                listeners: {
                    click: {
                        fn: function() {
                            this.csOnOK();
                        },
                        scope: this
                    }
                }
            }, {
                text: i3.ui.ColPnl.tx.txCancel,
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
        i3.ui.ColPanel.superclass.constructor.call(this, config);
    },
    /**
     * Reakcia na OK
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
        this.ownerCt.close();
    },
    /**
     * Reakcia na Cancel
     */
    csOnCancel: function() {
        //var w = this.findParentByType(i3.ui.ColWin); w.close();
        this.ownerCt.close();
    },
    /**
     * TOTO BOL LEN NAPAD - asi na zrusenie
     * =====
     *
     * Generovanie "display" verzie, nieco ako symbolickeho pola, ktore je potom nasledne mozne
     * pouzit pre zobrazenie v napr. cs_col_trigger.
     * To je dobre pre pripady, kedy chceme rucne urcit, co zobrazit v col_triggeri.
     *
     * Ono vhodnejsie by asi bolo prepisat v potomkovi updateDisplayVal z Ext.ux.DynTriggerField,
     * ale bolo by to prakticky zlozitejsie.
     */
    csBuildDisplayField: function() {
        // abstract
    },
    /**
     * Prevod zo zaznamu do formulara
     */
    csRecord2Form: function() {
        this.populate(this.csLinRecord, 'a', 'field', {
            setupAll: true
        });
        this.doLayout();
    },
    /**
     * Prevod zaznamu z formulara hlavneho okna do interneho tvaru (this.linRecord)
     */
    csForm2Record: function() {
        var f = this.extract('a', 'field');
        Ext.apply(this.csLinRecord, f);
    },
    /**
     * Update parent component after user pressed OK in the collector window.
     * May be overriden in child classes.
     *
     * Zatial mame implementovane 2 pripady:
     *   1. bud robime s dyntriggerom
     *   2. alebo s hlavnym oknom & kolektorom
     *
     */
    csUpdateParent: function() {
        // update caller dyn triger (if any present)
        if (this.csPDynTrigger) {
            this.csPDynTrigger.updateDisplayVal();
            return;
            // don't continue (jedna sa o pripad "1." (viz. description metody)
        }
        // update the main form (if any present)
        if (this.csMainForm) {
            this.csMainForm.csRecord2Form();
        }
    },
    /**
     * Display various debug info
     */
    onToolsGear: function() {
        this.csForm2Record();
        var s = '<font face="Courier">' + Ext.encode(this.csLinRecord).strswap(' ', '.') + '</font>';
        i3.alert('Linearized record', s);
    },
    /**
     * Klik na Help
     */
    onToolsHelp: function() {
        i3.ui.DataTable.Panel.prototype.onToolsHelp.call(this);
    }
});
/**
 * @class i3.ui.ColWin
 */
i3.ui.ColWin = Ext.extend(Ext.Window, {
    /**
     *
     * @param {Object} config
     *   CsPanel - costruktor panelu, kt. chceme umiestnit dovnutra
     *   csHideHelp - true skryje ikonu otazniku vpravo nahore win okna, default false
     *
     * 15.03.13 jk; ikona helpu lze skryt parametrem csHideHelp
     */
    constructor: function(config, pPanelCfg) {
        config = config || {};
        pPanelCfg = pPanelCfg || {};
        // 15.11.13 on;
        // create new instance of panel which should form center of the collector window
        var oPanel = new config.CsPanel(pPanelCfg);
        oPanel.csColWindow = this;
        // v paneli pointer na collector okno
        // 15.11.13 on; pokud je skryty help v cele apliakce, skryje ho i tu
        var bSkipHelpMainForm;
        if (pPanelCfg.csMainForm) {
            bSkipHelpMainForm = pPanelCfg.csMainForm.csSkipHelpIcon;
        } else {
            bSkipHelpMainForm = false;
        }
        // 11.08.16 on; moznost zakazat globalne pres i3.csSkipHelpIcon
        // 15.03.13 jk; ikona helpu lze skryt parametrem csHideHelp
        var winTools = [];
        if ((!config.csHideHelp) && (!bSkipHelpMainForm) && (!i3.csSkipHelpIcon)) {
            winTools.push({
                id: 'help',
                handler: function() {
                    oPanel.onToolsHelp();
                },
                scope: this
            });
        }
        // 25.11.09 rs; ladiacu volbu zobrazit len v debug rezime
        if (i3.debug > 0) {
            winTools.push({
                id: 'gear',
                handler: function() {
                    oPanel.onToolsGear();
                }
            });
        }
        // podmienene defaulty
        Ext.applyIf(config, { //
            width: 600, // "auto" mi zatial nejako nefunguje (?) - default uvedeny tu, je mozne pri volani prepisat
            title: i3.ui.ColPnl.tx.txDoplnkovaObrazovka,
            deferredRender: false, //
            layout: 'fit',
            bodyBorder: false,
            border: false,
            closeAction: 'close',
            closable: true, //
            //autoScroll :true, // ani toto mi moc nefungovalo
            modal: true,
            plain: true,
            items: [oPanel],
            tools: winTools,
            //buttons: [],
            listeners: {
                close: {
                    fn: function() {}
                }
            }
        });
        i3.ui.ColWin.superclass.constructor.call(this, config);
    }
});
Ext.apply(i3.ui.ColWin, {
    /**
     * Varianta otvorenie collectora z main okna na editaciu casti "lin record".
     * Synonymum: i3.ui.csOpenColWin
     *
     * @param {Object} pWinConfig
     *    Parametre pre panel collector okienka
     *    Popis u i3.ui.ColWin
     *    hlavny parameter: CsPanel - konstructor vnutorneho panelu
     * @param {Object} pPanelCfg
     *    csLinRecord  - linearizovana verzia zaznamu - tu su zdrojove data a sem treba zapisat vysledok
     *    csMainForm   - hlavny formular (bude refreshnuty po potvrdeni OK)
     */
    csOpenColWin: function(pWinConfig, pPanelCfg) {
        // save changes in main form info internal record
        // for some cases (dyntrigger) we don't work directly with the main form
        //
        // toto este treba trocha premysliet. pokial robime s dyntrigger, tak sice dostaneme pointer na csMainForm
        // ale csLinRecord obsahuje obsah dyntriggera a nie hlavneho okna
        // no uvidime vlastne by tu konkretne volanie form2rec nic nepokazilo
        // 13.06.12 on; rozsirena podminka
        if (pPanelCfg.csMainForm && (!pPanelCfg.csPDynTrigger) && pPanelCfg.csMainForm.csForm2Record) {
            pPanelCfg.csMainForm.csForm2Record();
        }
        // create new collector window
        var w = new i3.ui.ColWin(pWinConfig, pPanelCfg);
        // render window so we can setup their values
        w.show();
        // get data panel, setup linear record object & load with data
        var pnl = w.items.items[0];
        pnl.csRecord2Form();
    },
    /**
     * Varianta otvorenie nezavisleho datoveho okienka ako "pop up". Obycajne na vytvorenie noveho zaznamu.
     * Pouziva sa napr. z Flexpop na otvorenie okienka pre novy zaznam.
     * Synonymum: i3.ui.csOpenDataWin
     *
     * @param {Object} pWinConfig
     *    hlavny parameter: CsPanel - konstructor vnutorneho panelu
     * @param {Object} pPanelCfg
     */
    csOpenDataWin: function(pWinConfig, pPanelCfg) {
        // create new collector window
        var w = new i3.ui.ColWin(pWinConfig, pPanelCfg);
        // render window so we can setup their values
        w.show();
        // get data panel
        var pnl = w.items.items[0];
        // inicializacne volanie
        pnl.csOnNew();
    }
});
// redefinicia funkcii v i3.ui
// t.j. funkcie su 2x; v i3.ui.ColWin je original a v i3.ui su shorcuty
// shortcuty treba, pretoze uz su historicky pouzivane
// a dlhsiu verziu treba kvoli generatoru dokumentacie
// 05.10.09 rs
Ext.apply(i3.ui, {
    csOpenColWin: i3.ui.ColWin.csOpenColWin,
    csOpenDataWin: i3.ui.ColWin.csOpenDataWin
});
