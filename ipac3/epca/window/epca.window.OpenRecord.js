Ext.ns('epca.window');

epca.window.OpenRecord = Ext.extend(Ext.Window, {

    marcRecord: undefined,
    
    constructor: function(config){
    
        config = config || {};
        
        config.listeners = config.listeners || {};
        
        Ext.applyIf(config.listeners, {
            close: function(){
                this.destroy();
            }
        });
        
        Ext.apply(config, {
            width: 500,
            height: 250,
            title: 'Otvoriť - zatial NEFUNKCNE!!!',
            autoScroll: true,
            layout: 'form',
            padding: 10,
            items: [{
                xtype: 'combo',
                id: 'windowOpenRecordDbSelect',
                fieldLabel: 'Databáza',
                triggerAction: 'all',
                mode: 'local',
                typeAhead: false,
                allowBlank: false,
                editable: false,
                autoSelect: true,
                forceSelection: true,
                store: new Ext.data.JsonStore({
                    autoDestroy: true,
                    autoLoad: true,
                    url: 'UnDatabases.json',
                    fields: ['id', 'text']
                }),
                valueField: 'id',
                displayField: 'text',
                width: 300
            }, {
                xtype: 'combo',
                id: 'windowOpenRecordIndexSelect',
                fieldLabel: 'Index',
                triggerAction: 'all',
                mode: 'local',
                typeAhead: false,
                allowBlank: false,
                editable: false,
                autoSelect: true,
                forceSelection: true,
                store: new Ext.data.JsonStore({
                    autoDestroy: true,
                    autoLoad: true,
                    url: 'UnIndex.json',
                    fields: ['id', 'text']
                }),
                valueField: 'id',
                displayField: 'text',
                width: 300,
                listeners: {
                    select: function(combo, record, index){
                    	var searchCombo = this.getComponent('windowOpenRecordComboBoxForm');
						searchCombo.setDb(this.getUnDatabase());
						searchCombo.index = combo.getValue();
                    },
                    scope: this
                }
            }, {
                xtype: 'epca.marc_search_combobox',
                id: 'windowOpenRecordComboBoxForm',
                fieldLabel: 'Záznam',
				minQueryLength : 1,
                width: 300
            }],
            buttonAlign: 'center',
            getMarc: function(){
                return this.marcRecord;
            },
            setMarc: function(marc){
                this.marcRecord = marc;
            },
            getUnDatabase: function(){
                return (this.getComponent('windowOpenRecordDbSelect')).getValue();
            },
            getRecordId: function(){
                return (this.getComponent('windowOpenRecordComboBoxForm')).getValue();
            }
        });
        
        epca.window.OpenRecord.superclass.constructor.call(this, config);
    }
});
