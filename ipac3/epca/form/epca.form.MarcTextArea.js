/**
 * 04.02.25 on; jina hlaska pro povinne pole
 * 04.01.17 on; rozsireni funkce clearFields
 * 19.07.16 on; formular nemusi byt v tabu
 *
 * TEXTAREA
 */
/*global Ext,i3,epca */

Ext.ns('epca.form');

/**
 * Textove pola marc s funkciami getMarc, setMarc
 */
epca.form.TextArea = Ext.extend(Ext.form.TextArea, {

  repeatable: false,

  tag: '200',
  field: 'a',

  // v pripade ze obsah textoveho pola nie je validny, je potrebne nastavit hodnotu premennej 'isValid' na false
  //customCode : 'if (typeof parseInt(this.getValue()) == "number") isValid = true;',
  customCode: 'isValid = true;',

  constructor: function(config) {
    config = config || {};

    // 21.01.16 on; divne, zruseno
    //Ext.apply(config, {});

    config.listeners = config.listeners || {};
    Ext.applyIf(config.listeners, {
      change: function() {
        // 21.01.16 on; na urovni aktivni zalozky vyvola udalost
        var tab;
        tab = epca.WsForm.csGetActiveTab();
        // 19.07.16 on; tab nemusi existovat - napr. formular v popup okne
        if (tab) {
          tab.fireEvent('form_changed', this, tab);
        }
      }
    });

    epca.form.TextArea.superclass.constructor.call(this, config);

    // pridanie custom eventu
    this.addEvents('fieldValidatedEvent');
  },
  getCodedData: function() {
    return this.getValue();
  },
  setCodedData: function(codedData) {
    var data = epca.trimCodedData(codedData);

    if (data === '') {
      return;
    }

    this.setValue(data);
  },
  getMarc: function() {
    var s, retVal = {};
    s = this.getValue();
    // 25.09.15 on; podminka
    if (s !== undefined) {
      // prechod na novy radek je nahrazen '\n'
      s = s.strswap('\n', '\\n');
      // zamena CR,LF,TAB v stringu za mezery
      s = i3.fixLF(s);
      retVal[this.field] = s;
    }
    return retVal;
  },
  // @param {Object} db nazev DB, ze ktere se zaznam dotahuje
  setMarc: function(marc, convert, convertGroup, db, selectedRecord) {
    // convertMap nastavuje sa z mapy tagov $g

    // 01.10.15 on; dotazeni ZF
    if (epca.form.Helper.csIsDFSMethod(this.convertMap, convertGroup)) {
      // pokud uz nebyl dotazen v RepeatableEncapsulation
      if (i3.isEmptyString(marc[this.tag]) || i3.isEmptyString(marc[this.tag][this.field])) {
        // 01.10.15 on; vlozeno do funkce
        epca.form.Helper.csGetDFValue(this.convertMap, convertGroup, selectedRecord, undefined, this.csSetMarc0, this);
        return;
      }
    }

    var value = epca.form.Helper.getMarcValue(marc, {
      'db': db, // 23.01.12 on;
      'tag': this.tag,
      'field': this.field,
      'convert': convert,
      'group': convertGroup,
      'map': this.convertMap
    });

    // 01.03.16 on; pokud vrati funkce null, nebudu nastavovat nic
    if (value === null) {
      return;
    }

    // 21.10.15 on; osetreni undefined stavu
    if (value === undefined) {
      value = '';
    }

    this.csSetMarc0(value);
  },
  csSetMarc0: function(value) {
    // 07.09.15 on; zrusena podminka, nekdy  potrebuju  zapsat i ""
    //if (!Ext.isEmpty(value)) {
    // vyvolanie eventu validacie bude napr. v metode setMarc
    this.fireEvent('fieldValidatedEvent', this, value);

    // retezec \n zmeni za odradkovani
    if (value && value.strswap) {
      value = value.strswap('\\n', '\n');
    }

    this.setValue(value);
    //}
  },
  setPropertyTitle: function(titles) {
    // 25.10.11 on; preda uzivatelsky nazev pole
    if (this.label) {
      this.label.update(epca.form.Helper.findTitle(titles, this.tag + epca.formatFieldId(this.field, this.position, this.dataLength), this));
    }
  },
  validate: function() {
    // 05.03.14 on; property Required
    var bValidReq;
    if (this.required) { 
      bValidReq = (this.getValue() !== '');
    } else {
      bValidReq = true;
    }

    // 04.02.25 on; jina hlaska pro povinne pole
    if (!bValidReq) {
    	this.invalidText = i3.ui.ext.tx.txBlankText;
    } else {
    	this.invalidText = i3.ui.ext.tx.txInvalidText;
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
  clearFields: function() {
    // 04.01.17 on; moznost zakazat vymaz pole pomoci tlacitka '-' u fieldsetu
    if (!this.fldDoNotErase) {
      this.setValue('');
    }
  }
});

Ext.reg('epca.marc_textarea', epca.form.TextArea);
