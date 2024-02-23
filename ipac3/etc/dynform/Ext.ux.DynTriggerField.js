/*
 * Dynform extension
 * Changes (may be located by searching for the date of change):
 *
 * 05.05.20 on; moznost zobrazit pole z celeho zaznamu
 * 11.02.16 on; editovatelny dyntrigger
 * 02.12.14 on; moznost prime editace pole
 * 08.10.13 on; moznost upravit zobrazenou hodnotu csShowValueFn
 * 20.09.13 on; doplneni cls do dyntriggera
 * 12.02.13 on; doplnene vyvolani udalosti change
 * 11.02.13 on; moznost nastavit hint presunuta sem
 * 16.08.12 on; funkce getIndicators()
 * 08.03.12 on; osetrene zobrazeni opakovatelnych podpoli v updateDisplayVal
 * 26.01.12 on; doplnene odstraneni intepunkce na konci pole
 * 02.02.10 on; prechod na ext 3.1
 * 12.05.09 rs; another experimental fix in setValue; incoming string will now not
 *              reset internal "values" object
 * 20.04.09 rs; added support for format 'xx[idx].yy' needed for nested data
 *              structures
 * 29.04.09 rs; added reset of internal object if string value is set
 * 20.04.09 rs; first version
 * --
 */
/*global Ext,window,alert,i3 */
Ext.ns('Ext.ux');
Ext.override(Ext.form.TriggerField, {
    /**
     * @cfg onDisable
     * If true, trigger will be disabled if the field is disabled.
     * If false, triiger will be enabled always, even if field is disabled.
     * This changes default value compared to (modified) Ext.form.TriggerField.
     */
    disableTrigger: true,
    // private
    // same implementation as in original, but disabling of the trigger is optional
    // default is same as original
    onDisable: function() {
        Ext.form.TriggerField.superclass.onDisable.call(this);
        // following line will disable the trigger
        if (this.wrap && this.disableTrigger) {
            this.wrap.addClass(this.disabledClass);
            this.el.removeClass(this.disabledClass);
        }
    },
    // private
    // see note on onDisable()
    onEnable: function() {
        Ext.form.TriggerField.superclass.onEnable.call(this);
        // following line would re-enable the trigger
        if (this.wrap && this.disableTrigger) {
            this.wrap.removeClass(this.disabledClass);
        }
    }
});
/**
 * @class Ext.ux.DynTriggerField
 * @extends Ext.form.TriggerField
 *
 *
 *
 */
Ext.ux.DynTriggerField = Ext.extend(Ext.form.TriggerField, {
    /**
     * Disabled is true by default. Field itself disabled, but trigger is enabled.
     */
    // 02.02.10 on; ve verzi extu 3.1 zpusobilo "disabled: true", ze se nezmenil kurzor na triggeru
    //disabled: true,
    editable: false,
    // 11.02.16 on; presunoto do constructoru
    // 20.09.13 on; potrebuju oznacit (a pak v v css souboru zasednout) pole, ktere neni editovatelne, ale pouze
    //              browse popup a dyntriger, tady to muzu udelat takto jednoduse, protoze dyntrigger neni zadny editovatelny
    //cls : 'cs-x-trigger-noedit',
    csTriggerEditCls: 'cs-x-trigger-noedit',
    /**
     * Internal storage for hidden values
     */
    values: null,
    /**
     * @cfg displayVal
     * Sets which values from 'values' will be displayed in the trigger data part.
     * Example:
     *    data structure as got by extract()
     *    {
     *      name: 'John X.',
     *      address: [{
     *        city: 'Q',
     *        street: 'Abc',
     *        no: '17'
     *        }, {
     *          city: 'NN',
     *          street: 'Xy',
     *          no: '21'
     *     }]
     *    }
     *  Then display values for field 'address' may be: ['street','no','city']
     *
     *  Data structure of the dynamic field sets may have more levels.
     *  Currently also format:
     *    ['address[0].street','address[0].no','address[0].city','aa'] is supported
     *  This is for cases where repeatable group also contains repeatable group of fields.
     *  Data structure then may look like:
     *  {
     *    fieldX:'data',
     *    person: [ {
     *       ..person data..
     *        },{
     *        ..another person.. }
     *        ]
     *  }
     *  Then you can use dyntrigger for the field "person" and in it display the first address
     *
     */
    displayVal: null,
    /**
     * If true, trigger will be disabled if the field is disabled.
     * If false, triiger will be enabled always, even if field is disabled.
     * This changes default value compared to (modified) Ext.form.TriggerField.
     */
    disableTrigger: false,
    enableKeyEvents: true,
    // 02.12.14 on; moznost editovat primo pole
    listeners: {
        keyup: {
            fn: function() {
                if (this.editable) {
                    // pokud pisu rucne do pole, musim vedet, do ktereho podpole to pujde
                    if (!this.csEditFieldName) {
                        alert('Ext.ux.DynTriggerField: csEditFieldName must not be emty!');
                        return;
                    }
                    // pokud zapisuju rucne, smazu vsechna pole, ktera mohla byt dotazena
                    this.values = {};
                    // a doplnil jenom editovatelny subtag
                    this.values[this.csEditFieldName] = this.getRawValue();
                }
            }
        }
    },
    /** constructor: zadanie defaultov
     *
     * @param {Object} config
     *
     * 11.02.16 on; zalozeno
     */
    constructor: function(config) {
        config = config || {};
        Ext.applyIf(config, {
            // 11.02.16 on; potrebuju oznacit (a pak v v css souboru zasednout) pole, ktere neni editovatelne, ale pouze
            //              browse popup a dyntrigger
            cls: config.editable ? '' : this.csTriggerEditCls
        });
        Ext.ux.DynTriggerField.superclass.constructor.call(this, config);
    },
    /**
     * Init of the values
     */
    initComponent: function() {
        // create data storage object
        if (!this.values) {
            this.values = {};
        }
        Ext.ux.DynTriggerField.superclass.initComponent.call(this);
    },
    /**
     * Get value for dynamic trigger field.
     * May be used in Ext.form.FormPanel.extract()
     *
     * @return hidden data of the dyn.trigger field
     */
    getValue: function() {
        return this.values;
    },
    /**
     * Vrati pouze indikatory - pouziva se pro kopirovani poli - indikatory se prenaseji.
     *
     * @return hidden data of the dyn.trigger field
     *
     * 16.08.12 on; zalozeno
     */
    getIndicators: function() {
        var o = {},
            prop;
        for (prop in this.values) {
            if (this.values.hasOwnProperty(prop)) {
                if ((prop.substring(4, 6) === 'i1') || (prop.substring(4, 6) === 'i2')) {
                    o[prop] = this.values[prop];
                }
            }
        }
        return o;
    },
    /**
     * Set value of dynamic trigger field.
     * May be used in Ext.form.FormPanel.populate()
     *
     * @param {Object} pValue - value to be set
     *    1, one string value: just calls Ext.form.TriggerField.setValue
     *    2, object:
     */
    setValue: function(pValue) {
        // if parameter is string, just call inherited code - this should not happen anyway
        if (typeof pValue === 'string') {
            Ext.ux.DynTriggerField.superclass.setValue.call(this, pValue);
            // 12.05.09 rs; discard
            ///// new object  // 29.04.09 rs; added reset of internal object if string value is set
            ///// warning: may cause problems if the text field of the triggerfld is not disabled
            ////this.values = {};
            // 12.05.09 rs; synchronize displayed value & underlying data
            this.updateDisplayVal();
            return;
        }
        if (typeof pValue !== 'object') {
            return;
        }
        this.values = {};
        // new object
        // make a copy of the passed values
        Ext.apply(this.values, pValue);
        this.updateDisplayVal();
    },
    /**
     * Simple string helper.
     * Would go info String object, but not to complicate things here.
     *
     * @param {Object} del  - delimiter
     * @param {Object} n    - 1=first occurence,2-second etc.
     */
    piece: function(del, n) {
        if (del === '') {
            alert('Ext.ux.DynTriggerField.piece: invalid delimiter');
        }
        var a = this.split(del, 60);
        if (a.length > 50) {
            alert('Ext.ux.DynTriggerField.prototype.piece: do not use this for long strings');
        }
        a = a[n - 1];
        if (typeof a !== 'string') {
            return '';
        }
        return a;
    },
    /**
     * Update displayed value according to internal hidden 'values'.
     * Which fields from 'values' will be displayed is set by displayVal property (array).
     * Values to display will be concatenated by ', '.
     *
     * 20.04.09 rs; added support for format 'xx[idx].yy' needed for nested data structures
     */
    updateDisplayVal: function() {
        var sDisp = '',
            i,
            av,
            that;
        var aValues = this.values || {};
        // 05.05.20 on; moznost zobrazit pole z celeho zaznamu
        if (this.displayValFromLinRecord) {
            aValues = this.csDataForm.csLinRecord;
        }
        if (!Ext.isArray(this.displayVal)) {
            return;
        }
        that = this;
        Ext.each(this.displayVal, function(s1) {
            var v = null,
                v1;
            if (s1.indexOf('.') >= 0) {
                // Expected format: 'xx[idx].yy'
                // don;t want to use eval, so do simple parsing instead
                // fixed format expected
                var f1 = s1.piece('.', 1).piece('[', 1);
                var fIDX = s1.piece('[', 2).piece(']', 1);
                var f2 = s1.piece('.', 2);
                if ((f1 === '') || (fIDX === '') || (f2 === '')) {
                    return;
                }
                var a = aValues[f1];
                if (!Ext.isArray(a) || (typeof a[fIDX] !== 'object')) {
                    return;
                }
                v = a[fIDX][f2];
            } else {
                // Expected format: 'xx'
                v = aValues[s1];
            }
            if (v && (v !== '')) {
                if (sDisp !== '') {
                    sDisp = sDisp.trim();
                    // don't append ',' if the string already ends with a comma
                    if (sDisp[sDisp.length - 1] !== ',') {
                        sDisp += ',';
                    }
                    // append space
                    sDisp += ' ';
                }
                // 08.03.12 on; osetri opakovatelne hodnoty
                if (v.indexOf(i3.c.SFFldsDelim) > 0) {
                    av = v.split(i3.c.SFFldsDelim);
                    v = '';
                    for (i = 0; i < av.length; i += 1) {
                        v1 = av[i];
                        if (v1.csDeleteInterpunction) {
                            v1 = v1.csDeleteInterpunction();
                        }
                        if (v !== '') {
                            v += ', ';
                        }
                        v = v + v1;
                    }
                } else {
                    // 26.01.12 on; doplnene odstraneni intepunkce na konci pole - zatim tady pro vsechny hodnoty
                    if (v.csDeleteInterpunction) {
                        v = v.csDeleteInterpunction();
                    }
                    // 08.10.13 on; moznost upravit zobrazenou hodnotu - zatim jenom tady - pouzito v digitalni kronice
                    if (that.csShowValueFn) {
                        v = that.csShowValueFn(v);
                    }
                }
                // append value to display
                sDisp += v;
            }
        });
        sDisp = sDisp.trim();
        Ext.ux.DynTriggerField.superclass.setValue.call(this, sDisp);
        // 12.02.13 on; vyvolam udalost change - v interpi na ni odchytavam zmenu hintu
        this.fireEvent('change', this, this.value);
    },
    // 11.02.13 on; moznost nastavit hint
    onRender: function(ct, position) {
        // tu nevolame onRender naseho predchodcu, ale predchodcu predchodcu
        // prave zdedeny onRender potrebujeme preskocit
        Ext.ux.DynTriggerField.superclass.onRender.call(this, ct, position);
        // 28.11.11 on; pokud je nastaveny qtip, tak ho zaregistruje
        if (this.csQTip) {
            Ext.QuickTips.register({
                target: this, // komponente
                text: this.csQTip
            });
            Ext.QuickTips.register({
                target: this.trigger, // ikone
                text: this.csQTip
            });
        }
    },
    /**
     * Do qtipu nacte obsah pole.
     *
     * 12.02.13 on;
     */
    csUpdateQTip: function() {
        if (this.value === '') {
            Ext.QuickTips.unregister(this);
            // komponenta
            Ext.QuickTips.unregister(this.trigger);
            // ikona
        } else {
            Ext.QuickTips.register({
                target: this, // komponente
                text: this.value
            });
            Ext.QuickTips.register({
                target: this.trigger, // ikone
                text: this.value
            });
        }
    }
});
Ext.reg('dyntrigger', Ext.ux.DynTriggerField);
