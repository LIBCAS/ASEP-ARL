/**
 * Okno na vytvorenie noveho formular - definovanie noveho formatu a nazvu formulara
 * @param {Object} config
 *
 * 07.06.23 on; json5
 * 23.05.12 on; oprava chyby
 * 20.01.12 on; automaticky vyber formatu
 */
/*global Ext,i3,epca */

Ext.ns('epca.window');

epca.window.NewForm = Ext.extend(Ext.Window, {

  constructor : function(config) {
    config = config || {};

    config.listeners = config.listeners || {};

    Ext.applyIf(config.listeners, {
      close : function() {
        this.destroy();
      }
    });

    Ext.apply(config, {
      width : 600,
      height : 250,
      title : epca.L10n.titleNew,
      autoScroll : true,
      closable : false,
      layout : 'form',
      labelWidth : 120,
      padding : 10,
      items : [{
        xtype : 'combo',
        id : 'windowNewFormComboBoxUnFormat',
        fieldLabel : epca.L10n.titleUnimarcFormat,
        triggerAction : 'all',
        mode : 'local',
        typeAhead : false,
        allowBlank : false,
        editable : false,
        autoSelect : true,
        forceSelection : true,
        store : new Ext.data.JsonStore({
          autoDestroy : true,
          autoLoad : true,
          // 07.06.23 on; json5
          // 31.08.15 on; zmena
          //url : 'UnFormat.json',
          //url : 'UnFormat_' + i3.ictx.toLowerCase() + '.json',
          url : 'UnFormat_' + i3.ictx.toLowerCase() + '.json5',
          fields : ['id', 'text'],
          listeners : {
            load : function(pStore) {
              // 20.01.12 on; po nahrani automaticky vybere prvni polozku
              var thisCombo = Ext.getCmp('windowNewFormComboBoxUnFormat');
              var record = pStore.getAt(0);

              if (!record) {
                return;
              }

              if ((!record) || (thisCombo.getValue() !== '')) {
                return;
              }

              var val = record.data[thisCombo.valueField || thisCombo.displayField];
              thisCombo.setValue(val);
            }
          }
        }),
        valueField : 'id',
        displayField : 'text',
        //width : 300
        anchor : i3.c.anchorBase
      }, {
        xtype : 'textfield',
        id : 'windowNewFormTextFieldFormTitle',
        fieldLabel : epca.L10n.formName,
        //width : 300
        anchor : i3.c.anchorBase
      }, {
        xtype : 'textfield',
        id : 'windowNewFormTextFieldFormId',
        fieldLabel : epca.L10n.formId,
        //width : 300
        anchor : i3.c.anchorBase,
        allowBlank : false
      }],
      buttonAlign : 'center',

      getUnFormat : function() {
        return (this.getComponent('windowNewFormComboBoxUnFormat')).getValue();
      },
      getFormTitle : function() {
        return (this.getComponent('windowNewFormTextFieldFormTitle')).getValue();
      },
      getFormId : function() {
        return (this.getComponent('windowNewFormTextFieldFormId')).getValue();
      }
    });

    epca.window.NewForm.superclass.constructor.call(this, config);
  }
});
