/*
 * Changes (may be located by searching for the date of change):
 *
 * 26.02.18 on; +- u fileuploadfield
 * 11.10.17 on; volitelne treti tlacitko 
 * 07.07.17 on; skryti ikony minus
 * 11.02.16 on; upraveno zarovnani ikon
 * 02.02.16 on; uprava csIconMinusCallback
 * 09.03.15 on; osetreni clones
 * 07.11.14 on; defaultni odchyceni prekroceni poctu opakovani
 * 08.10.14 on; osetrena situace, kdy i3.isRTL nemusi existovat
 * 15.04.14 on; podpora pro RTL
 * 10.04.14 on; pridano + do vsech opakovani
 * 20.03.14 on; arabstina
 * 12.02.13 on; osetreno prepsani listeneru v klonech
 * 25.01.13 on; dotaz pred vymazem pole
 * 29.11.12 on; doplneny callback pro tisk ikony plus a minus
 * 28.11.12 on; moznost skryt ikonu plus (csHidePlusIcon) - pro textfield aj.
 * 06.11.12 on; moznost skryt ikonu plus (csHidePlusIcon) - zatim jenom pro trigger, combo a datefield
 * 16.08.12 on; ve funkci clones doplneno prebirani indikatoru
 * 25.11.11 on; moznost zobrazit qtip u ikonek plus a minus pomocti vlastnosti csIconPlusQTip a csIconMinusQTip
 * 13.04.11 on; doplnena ikonka minus pro vymaz prvniho prvku
 * 21.10.10 on; zmena fileuploadfield
 * 21.09.10 on; doplnena vyjimka pro fileuploadfield
 * 10.02.10 on; dalsi uprava kvuli prechodu na ext 3.1
 * 01.02.10 on; prechod na ext 3.1
 * 16.04.09 rs; small fix in alignIcon (trigger)
 * 16.04.09 rs; hide label for clones
 * --
 */
/*global Ext,i3 */
Ext.ns('Ext.ux');
// 25.01.12 on; zalozeno
Ext.ux.tx = {
    txReallyDel: 'Naozaj chcete zmazať pole?#Opravdu chcete smazat pole?#Do you really want to delete this field?###هل تريد حقا أن تحذف هذا الحقل؟',
    txFieldDel: 'Vymazanie poľa#Výmaz pole#Field deletion###حذف الحقل',
    txMaxOccurs: 'Bol dosiahnutý maximálny počet opakovaní (%s).#Byl dosažen maximální počet opakování (%s).#The maximum number of repetitions was reached (%s).'
};
Ext.override(Ext.form.TriggerField, {
    alignErrorIcon: function() {
        this.errorIcon.alignTo(this.wrap, 'tl-tr', [2 + this.dicon ? this.dicon.getWidth() + 4 : 0, 0]);
    }
});
Ext.override(Ext.form.Field, {
    dynamic: false,
    // 07.11.14 on; defaultni odchyceni prekroceni poctu opakovani
    listeners: {
        maxoccurs: {
            fn: function() {
                i3.alert(i3.fillInParams(i3.languageSel(Ext.ux.tx.txMaxOccurs), [this.maxOccurs]));
            }
        }
    },
    /**
     * Clones a field until the required amount specified is reached
     * @param {Number} card  Number of clones required. When no card is specified, the current clones will be returned
     * @return {Array}  required clones of type {Ext.form.Field}
     */
    clones: function(card) {
        var panel = this.ownerCt;
        var master = this;
        if (this.template) {
            master = this.template;
        }
        var cmps = panel.findBy(function(cmp) {
            if (cmp.template) {
                return cmp.template === this.template;
            }
        }, {
            template: master
        });
        if (Ext.isEmpty(card)) {
            return cmps;
        }
        // 08.04.14 on; vlozeno do metody
        /*var csOnIcon = function(field, panel) {
        var item = Ext.get(field.el.findParent('.x-form-item'));
        panel.remove(field);
        item.remove();
        panel.doLayout();
        };*/
        //
        // sanitize amount of clones untill cardinality is reached
        if (!Ext.isEmpty(card)) {
            //
            // add clones untill card is reached
            var i,
                oListeners,
                clone,
                idx;
            for (i = cmps.length; i < card; i++) {
                // 12.02.13 on; osetreno prepsani listeneru v klonech
                oListeners = {
                    'onIconPlus': {
                        fn: this.onIconPlusMain
                    },
                    // 08.04.14 on;
                    //'onIcon' : {
                    'onIconMinus': {
                        // vlozeno do metody
                        fn: this.onIconMinusMain
                    },
                    // 10.10.17 on;
                    'onIconThird': {
                        // vlozeno do metody
                        fn: this.onIconThirdMain
                    }
                };
                Ext.applyIf(oListeners, master.initialConfig.listeners);
                clone = master.cloneConfig({
                    clone: true,
                    template: master,
                    // 08.04.14 on; prejmenovane
                    //iconCfg : {
                    iconCfgMinus: {
                        cls: 'x-tool x-tool-minus',
                        clsOnOver: 'x-tool-minus-over'
                    },
                    // 08.04.14 on; plus i u klonu
                    iconCfgPlus: {
                        cls: 'x-tool x-tool-plus',
                        clsOnOver: 'x-tool-plus-over'
                    },
                    // 11.10.17 on; treti ikona
                    iconCfgThird: {
                        cls: 'x-tool x-tool-third',
                        clsOnOver: 'x-tool-third-over'
                    },
                    // 16.08.12 on; prebirani indikatoru (pokud jde o dyntrider a funkce je definovana)
                    values: master.getIndicators ? master.getIndicators() : null,
                    listeners: oListeners
                });
                // 16.04.09 rs; -begin
                // for top-aligned labels hide label completelly
                // else (left/right) set label to ''
                if (panel.labelAlign === 'top') {
                    clone.hideLabel = true;
                } else {
                    clone.fieldLabel = '';
                }
                // 10.04.14 on; pole vlozi za aktualni (NE na konec)
                /*var idx = panel.items.indexOf(master);
                 panel.insert(idx + 1 + i, clone);*/
                idx = panel.items.indexOf(this);
                panel.insert(idx + 1, clone);
            }
            //
            // remove clones until cardinality is reached
            //var i;
            var field,
                item;
            for (i = cmps.length; i > card; i--) {
                field = cmps[i - 1];
                // 09.03.15 on; podminka, nekdy to pada, nevim proc
                if (field.el) {
                    item = Ext.get(field.el.findParent('.x-form-item'));
                } else {
                    item = null;
                }
                panel.remove(field);
                // 10.02.10 on; presunute vys kvuli extjs 3.1
                if (item) {
                    item.remove();
                }
                //panel.remove(field);   // 10.02.10 on; presunute vys kvuli extjs 3.1
            }
            cmps = panel.findBy(function(cmp) {
                if (cmp.template) {
                    return cmp.template === this.template;
                }
            }, {
                template: master
            });
        }
        return cmps;
    },
    onIconPlus: function( /*e, icon*/ ) {
        this.fireEvent('onIconPlus', this);
    },
    // 12.04.11 on; ikona minus u prvniho prvku
    onIconMinus: function( /*e, icon*/ ) {
        this.fireEvent('onIconMinus', this);
    },
    // 10.10.17 on; treti ikona u prvniho prvku
    onIconThird: function( /*e, icon*/ ) {
        this.fireEvent('onIconThird', this);
    },
    getIconCt: function(el) {
        return el.findParent('.x-form-element', 5, true) || // use form element wrap if available
            el.findParent('.x-form-field-wrap', 5, true);
        // else direct field wrap
    },
    alignIcon: function() {
        // 08.10.14 on; i3.isRTL nemusi existovat
        // 15.04.14 on; podpora pro RTL
        if (i3.isRTL && i3.isRTL()) {
            if (this.isXType('textfield', true)) {
                this.dicon.alignTo(this.el, 'tr-tl', [-2, 3]);
            } else {
                this.dicon.alignTo(this.el, 'tr-tl', [-19, 3]);
            }
        } else {
            // 11.02.16 on; doplnena vyjimka pro trigger s hideTrigger
            if (this.isXType('trigger')) {
                if (this.hideTrigger) {
                    this.dicon.alignTo(this.el, 'tl-tr', [2, 3]);
                } else {
                    this.dicon.alignTo(this.el, 'tl-tr', [19, 3]);
                }
            } else if (this.isXType('combo') || this.isXType('datefield')) {
                this.dicon.alignTo(this.el, 'tl-tr', [19, 3]);
            } else if (this.isXType('fileuploadfield')) { // 21.10.10 on; zmenene aby vyhovovaloi pro vsechny jazykove mutace
                this.dicon.alignTo(this.el, 'tl-tr', [51, 3]); // 26.02.18 on; 57 -> 51
            } else {
                this.dicon.alignTo(this.el, 'tl-tr', [2, 3]);
            }
        }
    },
    /*
     * zarovnani pro ikonu "-" u prvniho prvku
     *
     * 12.04.11 on;
     */
    alignIconMinus: function() {
        // 08.10.14 on; i3.isRTL nemusi existovat
        // 15.04.14 on; podpora pro RTL
        if (i3.isRTL && i3.isRTL()) {
            if (this.isXType('textfield', true)) {
                this.diconMinus.alignTo(this.el, 'tr-tl', [-19, 3]);
            } else {
                this.diconMinus.alignTo(this.el, 'tr-tl', [-36, 3]);
            }
        } else {
            // 11.02.16 on; doplnena vyjimka pro trigger s hideTrigger
            if (this.isXType('trigger')) {
                if (this.hideTrigger) {
                    // 06.11.12 on; pokud neni plus ikona (je skryta pres csHidePlusIcon), posune minus bliz k poli
                    if (!this.dicon) {
                        this.diconMinus.alignTo(this.el, 'tl-tr', [1, 3]);
                    } else {
                        this.diconMinus.alignTo(this.el, 'tl-tr', [19, 3]);
                    }
                } else {
                    if (!this.dicon) {
                        this.diconMinus.alignTo(this.el, 'tl-tr', [19, 3]);
                    } else {
                        this.diconMinus.alignTo(this.el, 'tl-tr', [36, 3]);
                    }
                }
            } else if (this.isXType('combo') || this.isXType('datefield')) {
                // 06.11.12 on; pokud neni plus ikona (je skryta pres csHidePlusIcon), posune minus bliz k poli
                if (!this.dicon) {
                    this.diconMinus.alignTo(this.el, 'tl-tr', [19, 3]);
                } else {
                    this.diconMinus.alignTo(this.el, 'tl-tr', [36, 3]);
                }
            } else if (this.isXType('fileuploadfield')) { // 21.10.10 on; zmenene aby vyhovovaloi pro vsechny jazykove mutace
                this.diconMinus.alignTo(this.el, 'tl-tr', [68, 3]); // 26.02.18 on; 74 -> 68
            } else {
                // 06.11.12 on; pokud neni plus ikona (je skryta pres csHidePlusIcon), posune minus bliz k poli
                if (!this.dicon) {
                    this.diconMinus.alignTo(this.el, 'tl-tr', [3, 3]);
                } else {
                    this.diconMinus.alignTo(this.el, 'tl-tr', [19, 3]);
                }
            }
        }
    },
    /*
     * zarovnani pro treti ikonu u prvniho prvku
     *
     * 10.10.17 on;
     */
    alignIconThird: function() {
        // 08.10.14 on; i3.isRTL nemusi existovat
        // 15.04.14 on; podpora pro RTL
        if (i3.isRTL && i3.isRTL()) {
            if (this.isXType('textfield', true)) {
                this.diconThird.alignTo(this.el, 'tr-tl', [-36, 3]);
            } else {
                this.diconThird.alignTo(this.el, 'tr-tl', [-53, 3]);
            }
        } else {
            // 11.02.16 on; doplnena vyjimka pro trigger s hideTrigger
            if (this.isXType('trigger')) {
                if (this.hideTrigger) {
                    // 06.11.12 on; pokud neni plus ikona (je skryta pres csHidePlusIcon), posune minus bliz k poli
                    if (!this.dicon) {
                        this.diconThird.alignTo(this.el, 'tl-tr', [19, 3]);
                    } else {
                        this.diconThird.alignTo(this.el, 'tl-tr', [36, 3]);
                    }
                } else {
                    if (!this.dicon) {
                        this.diconThird.alignTo(this.el, 'tl-tr', [36, 3]);
                    } else {
                        this.diconThird.alignTo(this.el, 'tl-tr', [53, 3]);
                    }
                }
            } else if (this.isXType('combo') || this.isXType('datefield')) {
                // 06.11.12 on; pokud neni plus ikona (je skryta pres csHidePlusIcon), posune minus bliz k poli
                if (!this.dicon) {
                    this.diconThird.alignTo(this.el, 'tl-tr', [36, 3]);
                } else {
                    this.diconThird.alignTo(this.el, 'tl-tr', [53, 3]);
                }
            } else if (this.isXType('fileuploadfield')) { // 21.10.10 on; zmenene aby vyhovovaloi pro vsechny jazykove mutace
                this.diconThird.alignTo(this.el, 'tl-tr', [91, 3]);
            } else {
                // 06.11.12 on; pokud neni plus ikona (je skryta pres csHidePlusIcon), posune minus bliz k poli
                if (!this.dicon) {
                    this.diconThird.alignTo(this.el, 'tl-tr', [20, 3]);
                } else {
                    this.diconThird.alignTo(this.el, 'tl-tr', [36, 3]);
                }
            }
        }
    },
    alignErrorIcon: function() {
        this.errorIcon.alignTo(this.el, 'tl-tr', [2 + this.dicon ? this.dicon.getWidth() + 4 : 0, 0]);
    },
    afterRender: Ext.form.Field.prototype.afterRender.createSequence(function() {
        if (this.dynamic && Ext.isEmpty(this.clone)) {
            // 06.11.12 on; moznost skryt +
            if (!this.csHidePlusIcon) {
                // 08.04.14 on; prejmenovane
                //this.addIcon({
                this.addIconPlus({
                    cls: 'x-tool x-tool-plus',
                    clsOnOver: 'x-tool-plus-over'
                });
                // 25.11.11 on; qtip (plus)
                if (this.csIconPlusQTip) {
                    Ext.QuickTips.register({
                        target: this.dicon,
                        text: this.csIconPlusQTip
                    });
                }
                this.addListener('onIconPlus', this.onIconPlusMain
                    // 10.04.14 on; vlozeno do funkce
                    /*function(field) {
                     var cnt = this.clones().length;
                     if (!Ext.isEmpty(this.maxOccurs)) {
                     if (this.maxOccurs <= cnt + 1) {
                     field.fireEvent('maxoccurs', this);
                     return;
                     }
                     }
                     var panel = this.ownerCt;
                     this.clones(cnt + 1);

                     // 29.11.12 on; callback
                     if (this.csIconPlusCallback) {
                     this.csIconPlusCallback.call(this.csIconPlusCallbackScope || this);
                     }

                     panel.doLayout();
                     }*/
                );
            }
            // 07.07.17 on; moznost skryt -
            if (!this.csHideMinusIcon) {
                // 12.04.11 on; prida ikonu minus k prvnimu prvku
                this.addIconMinus({
                    cls: 'x-tool x-tool-minus',
                    clsOnOver: 'x-tool-minus-over'
                });
                // 25.11.11 on; qtip (minus)
                if (this.csIconMinusQTip) {
                    Ext.QuickTips.register({
                        target: this.diconMinus,
                        text: this.csIconMinusQTip
                    });
                }
                this.addListener('onIconMinus', this.onIconMinusMain
                    // 09.04.14 on; vlozeno do metody
                    /*function(field) {
                     // 24.01.13 on; moznost zobrazit dotaz pred vymazem
                     if (this.csConfirmDel) {
                     Ext.Msg.show({
                     title : i3.languageSel(Ext.ux.tx.txFieldDel),
                     msg : this.csConfirmDelText || i3.languageSel(Ext.ux.tx.txReallyDel),
                     buttons : i3.ui.YesNo,
                     fn : function(pButtonId) {
                     if (pButtonId === 'yes') {
                     this.onIconMinusMain();
                     }
                     },
                     icon : Ext.MessageBox.QUESTION,
                     scope : this
                     });
                     } else {
                     this.onIconMinusMain();
                     }
                     }*/
                );
            }
            // 10.10.17 on; moznost pridat ikonu jeste za minus (MUZ)
            if (this.csShowThirdIcon) {
                // prida ikonu k prvnimu prvku
                this.addThirdIcon({
                    cls: 'x-tool x-tool-third',
                    clsOnOver: 'x-tool-third-over'
                });
                // qtip (minus)
                if (this.csThirdIconQTip) {
                    Ext.QuickTips.register({
                        target: this.diconThird,
                        text: this.csThirdIconQTip
                    });
                }
                this.addListener('onIconThird', this.onIconThirdMain);
            }
        } else {
            // 07.07.17 on; zruseno i u klonu
            if (!this.csHidePlusIcon) {
                // 08.04.14 on; plus bude i u klonu
                this.addIconPlus(this.iconCfgPlus);
                // 07.07.17 on; presunuto hned pod generovani ikony
                // 01.02.16 on; qtip (plus)
                if (this.csIconPlusQTip) {
                    Ext.QuickTips.register({
                        target: this.dicon,
                        text: this.csIconPlusQTip
                    });
                }
            }
            // 07.07.17 on; zruseno i u klonu
            if (!this.csHideMinusIcon) {
                // 08.04.14 on; prejmenovane
                //this.addIcon(this.iconCfg);
                this.addIconMinus(this.iconCfgMinus);
                // 07.07.17 on; presunuto hned pod generovani ikony
                // 25.11.11 on; qtip (minus)
                if (this.csIconMinusQTip) {
                    Ext.QuickTips.register({
                        target: this.diconMinus,
                        text: this.csIconMinusQTip
                    });
                }
            }
            // 10.10.17 on; moznost pridat ikonu jeste za minus (MUZ)
            if (this.csShowThirdIcon) {
                // prida ikonu k prvnimu prvku
                this.addThirdIcon(this.iconCfgThird);
                // qtip (minus)
                if (this.csThirdIconQTip) {
                    Ext.QuickTips.register({
                        target: this.diconThird,
                        text: this.csThirdIconQTip
                    });
                }
                this.addListener('render', this.csTest);
            }
        }
    }),
    /**
     *  Vymaz prvku vlozen do funkce
     */
    onIconMinusMain: function(field) {
        // field === this
        if (this.csConfirmDel) {
            Ext.Msg.show({
                title: i3.languageSel(Ext.ux.tx.txFieldDel),
                msg: this.csConfirmDelText || i3.languageSel(Ext.ux.tx.txReallyDel),
                buttons: i3.ui.YesNo,
                fn: function(pButtonId) {
                    if (pButtonId === 'yes') {
                        // 08.04.14 on;
                        //csOnIcon(field, panel);
                        this.onIconMinusMain2(field);
                    }
                },
                icon: Ext.MessageBox.QUESTION,
                scope: this
            });
        } else {
            // 08.04.14 on;
            //csOnIcon(field, panel);
            this.onIconMinusMain2(field);
        }
    },
    /**
     *  Vymaz prvku vlozen do funkce (2 .cast)
     *
     */
    onIconMinusMain2: function(field) {
        // field === this
        // 12.04.11 on; zjisti pocet dynamicky vytvorenych poli
        var p = this.clones(),
            item;
        var panel = this.ownerCt;
        if (p.length > 0) {
            // pokud bylo dynamicky pridano pole, tak prenese obsah prvniho v poradi
            // do aktualniho a smaze ho
            /*this.setValue(p[0].getValue());

             //var item = Ext.get(field.el.findParent('.x-form-item'));
             //panel.remove(field);
             var item = Ext.get(p[0].el.findParent('.x-form-item'));
             panel.remove(p[0]);
             item.remove();*/
            if (field.clone) {
                // jde o klon - neni prvni v poradi
                // smaze aktualni pole
                item = Ext.get(field.el.findParent('.x-form-item'));
                panel.remove(field);
                item.remove();
            } else {
                // je prvni v poradi
                // obsah nahradi obsahem nasledujiciho pole
                field.setValue(p[0].getValue());
                // nasledujici pole smaze
                item = Ext.get(p[0].el.findParent('.x-form-item'));
                panel.remove(p[0]);
                item.remove();
            }
        } else {
            // pokud ne, smaze obsah aktivniho prvku
            if (Ext.isObject(field.getValue())) {
                field.setValue({});
            } else {
                field.setValue('');
            }
        }
        // 29.11.12 on; callback
        if (this.csIconMinusCallback) {
            // 02.02.16 on; vrati pocet klonu pred smazanim
            this.csIconMinusCallback.call(this.csIconMinusCallbackScope || this, p.length);
        }
        panel.doLayout();
    },
    /**
     * Kliknuti na treti ikonu
     *
     * 10.10.17 on;
     */
    onIconThirdMain: function( /*field*/ ) {
        // field === this
        if (this.csThirdIconClick) {
            this.csThirdIconClick();
        }
    },
    /**
     * Add icon on rightside of field to create the ability to implement dynamic behaviour in the context of the specified field.
     * Example of its usage : see implementation of clones method of {Ext.form.Field}
     * @param {Object}
     *
     * 08.04.14 on; prejmenovane
     */
    addIconPlus: function(iconCfg) {
        if (!this.rendered || this.preventMark || Ext.isEmpty(iconCfg)) { // not rendered
            return;
        }
        if (!this.dicon) {
            var elp = this.getIconCt(this.el);
            if (!elp) { // field has no container el
                return;
            }
            this.dicon = elp.createChild({
                cls: iconCfg.cls
            });
            this.dicon.setStyle({
                position: 'absolute'
            });
            this.dicon.addClassOnOver(iconCfg.clsOnOver);
            this.dicon.addListener('click', this.onIconPlus, this);
            this.alignIcon();
            this.on('resize', this.alignIcon, this);
        }
    },
    /**
     * 'Prida ikonu "-" (minus) napravo od "+"
     *
     * @param {Object}
     */
    addIconMinus: function(iconCfg) {
        if (!this.rendered || this.preventMark || Ext.isEmpty(iconCfg)) { // not rendered
            return;
        }
        if (!this.diconMinus) {
            var elp = this.getIconCt(this.el);
            if (!elp) { // field has no container el
                return;
            }
            this.diconMinus = elp.createChild({
                cls: iconCfg.cls
            });
            this.diconMinus.setStyle({
                position: 'absolute'
            });
            this.diconMinus.addClassOnOver(iconCfg.clsOnOver);
            this.diconMinus.addListener('click', this.onIconMinus, this);
            this.alignIconMinus();
            this.on('resize', this.alignIconMinus, this);
        }
    },
    /**
     * 'Prida treti ikonu napravo od "-"
     *
     * @param {Object}
     *
     * 10.10.17 on;
     */
    addThirdIcon: function(iconCfg) {
        if (!this.rendered || this.preventMark || Ext.isEmpty(iconCfg)) { // not rendered
            return;
        }
        if (!this.diconThird) {
            var elp = this.getIconCt(this.el);
            if (!elp) { // field has no container el
                return;
            }
            this.diconThird = elp.createChild({
                cls: iconCfg.cls
            });
            this.diconThird.setStyle({
                position: 'absolute'
            });
            this.diconThird.addClassOnOver(iconCfg.clsOnOver);
            this.diconThird.addListener('click', this.onIconThird, this);
            this.alignIconThird();
            this.on('resize', this.alignIconThird, this);
            // 12.10.17 on; nekdy se icona vytvori az po udalosti 'change' hlavniho prvku 
            if (this.csThirdIconRender) {
                this.csThirdIconRender(this);
            }
        }
    },
    /**
     *  Pridani prvku vlozeno do funkce
     *
     */
    onIconPlusMain: function(field) {
        // field === this
        var cnt = field.clones().length;
        if (!Ext.isEmpty(field.maxOccurs)) {
            if (field.maxOccurs <= cnt + 1) {
                field.fireEvent('maxoccurs', field);
                return;
            }
        }
        var panel = field.ownerCt;
        field.clones(cnt + 1);
        // 29.11.12 on; callback
        if (this.csIconPlusCallback) {
            this.csIconPlusCallback.call(this.csIconPlusCallbackScope || this);
        }
        panel.doLayout();
        // 12.04.11 on; zjisti pocet dynamicky vytvorenych poli
        /*var p = this.clones();
         var panel = this.ownerCt;
         if (p.length > 0) {
         // pokud bylo dynamicky pridano pole, tak prenese obsah prvniho v poradi
         // do aktualniho a smaze ho
         this.setValue(p[0].getValue());

         //var item = Ext.get(field.el.findParent('.x-form-item'));
         //panel.remove(field);
         var item = Ext.get(p[0].el.findParent('.x-form-item'));
         panel.remove(p[0]);
         item.remove();
         } else {
         // pokud ne, smaze obsah aktivniho prvku
         if (Ext.isObject(this.getValue())) {
         this.setValue({});
         } else {
         this.setValue('');
         }
         }

         // 29.11.12 on; callback
         if (this.csIconMinusCallback) {
         this.csIconMinusCallback.call(this.csIconMinusCallbackScope || this);
         }
         panel.doLayout();*/
    }
});
