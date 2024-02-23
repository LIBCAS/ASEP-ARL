/**
 * 10.17.23 on; typ musi byt "button", jinak se pri stisku enteru kdekoliv na formulari vyvola "click" tlacitka
 * 23.06.21 on; zalozeno
 */

/**
 * BUTTON
 */
/*global Ext,i3,epca */

Ext.ns('epca.form');

/**
 * Button
 */
epca.form.Button = Ext.extend(Ext.Button, {
  repeatable : false,
  
  customCode : 'isValid = true;',

  constructor : function(config) {
    config = config || {};

   config.listeners = config.listeners || {};
    Ext.applyIf(config.listeners, {
      /*change : function() {
        // 21.01.16 on; na urovni aktivni zalozky vyvola udalost
        var tab;
        tab = epca.WsForm.csGetActiveTab();
        // 19.07.16 on; tab nemusi existovat - napr. formular v popup okne
        if (tab) {
          tab.fireEvent('form_changed', this, tab);
        }
      },*/
      click : function(cmp, a, b, c) {
        // 10.11.21 on; moznost zapojit funkci v designeru - neni to asi moc bezpecne..
        //if (!this.csStopOnCheck) {
          if (!i3.isEmptyString(this.csOnClickEvent)) {
            eval(this.csOnClickEvent)();
          }
        //}
      }
    }); 
    
    // 10.17.23 on; typ musi byt "button", jinak se pri stisku enteru kdekoliv na formulari vyvola "click" tlacitka
    config.type = "button";

    epca.form.Button.superclass.constructor.call(this, config);

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
  setMarc : function(marc, convert, convertGroup, db) {
  	// marc zaznam nebudu menit - vytorim si kopii
  	var marcDupl = JSON.parse(JSON.stringify(marc));
  	
    var value = epca.form.Helper.getMarcValue(marcDupl, {
      'db': db, // 23.01.12 on;
      'tag': this.tag,
      'field': this.field,
      'convert': convert,
      'group': convertGroup,
      'map': this.convertMap
    });

    // pokud vrati funkce null, nebudu nastavovat nic
    if (value === null) {
      return;
    }

    // osetreni undefined stavu
    if (value === undefined) {
      value = '';
    }
    
    // zatim natvrdo, pokud je hodnota pole "1", bude tlacitko disablovane
    this.setDisabled(value === "1");
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

Ext.reg('epca.button', epca.form.Button);
