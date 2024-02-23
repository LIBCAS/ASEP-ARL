/**
 * 260.6.19 on; osetreni kotvy
 * 01.12.16 on; reakce na kliknuti na label
 */

/**
 * LABEL
 */
/*global Ext,i3,epca */

Ext.ns('epca.form');

/**
 * Label
 */
epca.form.Label = Ext.extend(Ext.form.Label, {

  repeatable : false,

  //tag : '200',
  //field : 'a',

  // v pripade ze obsah textoveho pola nie je validny, je potrebne nastavit hodnotu premennej 'isValid' na false
  //customCode : 'if (typeof parseInt(this.getValue()) == "number") isValid = true;',
  customCode : 'isValid = true;',

  constructor : function(config) {
    config = config || {};

    Ext.apply(config, {
      listeners : {
        render : {
          fn : function(cmp) {
            // 01.12.16 on; odchyti kliknutina href v labelu
            cmp.getEl().on('click', function(e) {
              var c = Ext.getCmp('tabPanelForms');
              if (c) {
                // vyuiziju stejne funkce pri kliknuti na link v ZF
                c.ownerCt.csOnDFClick(e);
              }
            }, this, {});
          },
          scope : this
        }
      }
    });

    epca.form.Label.superclass.constructor.call(this, config);

    // pridanie custom eventu
    this.addEvents('fieldValidatedEvent');
  },
  getCodedData : function() {
    return '';
  },
  setCodedData : function() {
  },
  getMarc : function() {
    var retVal = {};
    return retVal;
  },
  // @param {Object} db nazev DB, ze ktere se zaznam dotahuje
  setMarc : function(/*marc, convert, convertGroup, db*/) {
  },
  setPropertyTitle : function(titles) {
    // 25.10.11 on; preda uzivatelsky nazev pole
    if (this.label) {
      // 26.06.19 on; uprava kotvy
      this.csFixAnchor();

      var s = epca.form.Helper.findTitle(titles, this.tag + epca.formatFieldId(this.field, this.position, this.dataLength), this);
      this.label.update(s);
    }
  },
  validate : function() {
    return true;
  },
  // 11.08.11 on; smaze pole
  clearFields : function() {
  },
  /*
   * 25.06.19 on; osetri kotvu
   */
  csFixAnchor : function() {
    if (this && this.el && this.el.dom && (this.el.dom.innerHTML.indexOf('#ANCH') >= 0)) {
      var c = Ext.getCmp('tabPanelForms');
      if (c && c.ownerCt && c.ownerCt.nTabCount) {
        this.el.dom.innerHTML = this.el.dom.innerHTML.strswap('#ANCH', '#ANCH' + c.ownerCt.nTabCount);
      }
    }
  }
});

Ext.reg('epca.label', epca.form.Label);
