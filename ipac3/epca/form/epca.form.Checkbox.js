/**
 * 10.11.21 on; moznost zapojit reakci na check event 
 * 04.01.17 on; rozsireni funkce clearFields
 * 19.07.16 on; formular nemusi byt v tabu
 *
 * CHECKBOX
 */
/*global Ext,i3,epca */

Ext.ns('epca.form');

/**
 * Checkbox
 */
epca.form.Checkbox = Ext.extend(Ext.form.Checkbox, {

  repeatable : false,

  tag : '200',
  field : 'a',

  // v pripade ze obsah textoveho pola nie je validny, je potrebne nastavit hodnotu premennej 'isValid' na false
  //customCode : 'if (typeof parseInt(this.getValue()) == "number") isValid = true;',
  customCode : 'isValid = true;',

  constructor : function(config) {
    config = config || {};

    // 21.01.16 on; divne, zruseno
    //Ext.apply(config, {});

    config.listeners = config.listeners || {};
    Ext.applyIf(config.listeners, {
      change : function() {
        // 21.01.16 on; na urovni aktivni zalozky vyvola udalost
        var tab;
        tab = epca.WsForm.csGetActiveTab();
        // 19.07.16 on; tab nemusi existovat - napr. formular v popup okne
        if (tab) {
          tab.fireEvent('form_changed', this, tab);
        }
      },
      check : function(cmp, checked) {
        // 10.11.21 on; moznost zapojit funkci v designeru - neni to asi moc bezpecne..
        if (!this.csStopOnCheck) {
          if (!i3.isEmptyString(this.csOnCheckEvent)) {
            eval(this.csOnCheckEvent)(checked);
          }
        }
      }
    });

    epca.form.Checkbox.superclass.constructor.call(this, config);

    // pridanie custom eventu
    this.addEvents('fieldValidatedEvent');
  },
  getCodedData : function() {
    if (this.getValue()) {
      return this.inputValue;
    }
    return '';
  },
  setCodedData : function(codedData) {
    var data = epca.trimCodedData(codedData);

    if (data === '') {
      return;
    }

    // 10.11.21 on; potebuju odlisit nacteni zaznamu do formulare od kluknuti uzivatelem na checkbox
    try {
      this.csStopOnCheck = true;
      this.setValue(data);
    } finally {
      this.csStopOnCheck = false;
    }
  },
  getMarc : function() {
    var retVal = {};
    if (this.getValue()) {
      retVal[this.field] = this.inputValue;
    } else {
      retVal[this.field] = '';
    }
    return retVal;
  },
  // @param {Object} db nazev DB, ze ktere se zaznam dotahuje
  setMarc : function(marc, convert, convertGroup, db) {
    // convertMap nastavuje sa z mapy tagov $g

    var value = epca.form.Helper.getMarcValue(marc, {
      'db' : db, // 23.01.12 on;
      'tag' : this.tag,
      'field' : this.field,
      'convert' : convert,
      'group' : convertGroup,
      'map' : this.convertMap
    });

    // 01.03.16 on; pokud vrati funkce null, nebudu nastavovat nic
    if (value === null) {
      return;
    }

    // 07.09.15 on; zrusena podminka, nekdy  potrebuju  zapsat i ""
    //if (!Ext.isEmpty(value)) {
    // vyvolanie eventu validacie bude napr. v metode setMarc
    this.fireEvent('fieldValidatedEvent', this, value);

    // 10.11.21 on; potebuju odlisit nacteni zaznamu do formulare od kluknuti uzivatelem na checkbox
    try {
      this.csStopOnCheck = true;
      this.setValue(value);
    } finally {
      this.csStopOnCheck = false;
    }

    //}
  },
  setPropertyTitle : function(titles) {
    // 25.10.11 on; preda uzivatelsky nazev pole
    if (this.label) {
      this.label.update(epca.form.Helper.findTitle(titles, this.tag + epca.formatFieldId(this.field, this.position, this.dataLength), this));
    }
  },
  validate : function() {
    var bValidReq;
    if (this.required) {
      bValidReq = this.getValue();
    } else {
      bValidReq = true;
    }

    // 05.03.14 on; zrusene
    /*if(Ext.isEmpty(this.customCode)) {
     return true;
     }*/

    var isValid = true;
    eval(this.customCode);

    // 05.03.14 on; required
    isValid = isValid && bValidReq;

    // 25.10.11 on; pokud validace neprojde, zvyrazni cervene prvek
    if (!isValid) {
      this.markInvalid();
    } else {
      this.clearInvalid();
    }

    return isValid;
  },
  // 11.08.11 on; smaze pole
  clearFields : function() {
    // 04.01.17 on; moznost zakazat vymaz pole pomoci tlacitka '-' u fieldsetu
    if (!this.fldDoNotErase) {
      // 10.11.21 on; potebuju odlisit nacteni zaznamu do formulare od kluknuti uzivatelem na checkbox
      try {
        this.csStopOnCheck = true;
        this.setValue('');
      } finally {
        this.csStopOnCheck = false;
      }
    }
  }
});

Ext.reg('epca.checkbox', epca.form.Checkbox);
