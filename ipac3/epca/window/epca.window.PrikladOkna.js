/*
 * 	ESTE HO TREBA ZAREGITROVAT V index.csp
 */

Ext.ns('epca.window');
epca.window.PrikladOkna = Ext.extend(Ext.Window, {

    constructor: function(config){
    
        config = config || {};
        config.listeners = config.listeners || {};
        
        Ext.applyIf(config.listeners, {});
        
        Ext.apply(config, {});
        
        
        epca.window.PrikladOkna.superclass.constructor.call(this, config);
    }

});

