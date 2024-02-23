/* 
 * Combo box zobrazujici vlajecky a texty jazyku, nastavuje vybrany jazyk podle i3.language
 * https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
 */
/*jslint plusplus: true, sloppy: true, vars: true, white: true */
/*global Ext,i3,document,window,event */
Ext.ns('i3.ui');
/**
 * @class i3.ui.ComboboxLang
 */
i3.ui.ComboboxLang = Ext.extend(Ext.form.ComboBox, {
    /**
     * @param {Object} config
     */
    constructor: function(config) {
        config = config || {};
        // ciselnik zemi napevno
        var countries = [
            ['sk', '1', 'Slovensky'],
            ['cz', '2', 'Česky'],
            ['gb', '3', 'English'],
            ['de', '4', 'Deutsch'],
            ['hu', '5', 'Magyar'],
            ['ae', '6', 'العربية'] // arabstina
        ];
        var langStore = new Ext.data.ArrayStore({
            id: 'langStore',
            fields: ['abr', 'code', 'name'],
            data: countries
        });
        Ext.applyIf(config, {
            lazyInit: true,
            triggerAction: 'all',
            forceSelection: true,
            allowBlank: false,
            autoSelect: true,
            value: i3.language, // defaultni vyber jazyka
            mode: 'local',
            displayField: 'name',
            valueField: 'code',
            store: langStore,
            width: 100,
            tpl: '<tpl for="."><div class="x-combo-list-item"><img src="../images/flags/{abr}.gif" align="left">&nbsp;&nbsp;{name}</div></tpl>'
        });
        i3.ui.ComboboxLang.superclass.constructor.call(this, config);
    }
});
Ext.reg('cs_combo_lang', i3.ui.ComboboxLang);
