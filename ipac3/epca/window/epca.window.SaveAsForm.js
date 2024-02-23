/**
 * Okno na vytvorenie noveho formular - definovanie noveho formatu a nazvu formulara
 * @param {Object} config
 *
 * 15.05.17 on; id
 * 21.12.16 on; moznost zmenit texty
 */

/*global Ext,i3,epca */
Ext.ns('epca.window');

epca.window.SaveAsForm = Ext.extend(Ext.Window, {

  constructor: function(config) {
    config = config || {};

    config.listeners = config.listeners || {};

    Ext.applyIf(config.listeners, {
      close: function() {
        this.destroy();
      }
    });

    Ext.apply(config, {
      width: 600,
      height: 250,
      title: config.csTitle || epca.L10n.titleSaveAs,
      autoScroll: true,
      closable: false,
      layout: 'form',
      padding: 10,
      items: [{
        xtype: 'textfield',
        id: 'windowSaveAsFormTextFieldFormTitle',
        fieldLabel: config.csFieldLabel || epca.L10n.formName,
        anchor: i3.c.anchorBase
      }, {
        xtype: 'textfield',
        id: 'windowSaveAsFormTextFieldFormId',
        fieldLabel: epca.L10n.formId,
        anchor: i3.c.anchorBase,
        allowBlank: false
      }],
      buttonAlign: 'center',

      getFormTitle: function() {
        return (this.getComponent('windowSaveAsFormTextFieldFormTitle')).getValue();
      },
      // 15.05.17 on; doplneno
      getFormId: function() {
        return (this.getComponent('windowSaveAsFormTextFieldFormId')).getValue();
      }
    });

    epca.window.SaveAsForm.superclass.constructor.call(this, config);
  }
});
