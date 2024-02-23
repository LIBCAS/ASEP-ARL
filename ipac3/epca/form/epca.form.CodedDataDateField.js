/**
 * @author Michal Namesny
 *
 * 05.01.17 on; moznost nastavit datum nabizeny v kalendari
 * 04.01.17 on; rozsireni funkce clearFields
 * 28.11.16 on; validace datumu a alternativni formaty
 * 19.07.16 on; fomrular nemusi byt v tabu
 * 05.03.14 on; rozsirena validace, moznost nastavit aktualni datum
 * 19.07.12 on; oprava getMarc()
 * 17.07.12 on; opraveno setMarc
 * 23.01.12 on; rozsireni setMarc
 */
/*global Ext,epca,i3*/

Ext.ns('epca.form');

epca.form.CodedDataDateField = Ext.extend(Ext.form.DateField, {

  tag: '100',
  field: 'a',
  position: 0,
  dataLength: 0,

  format: 'd.m.Y',
  // 25.11.16 on; musi to tu byt, jinak se bere default, ktery preklapi rok na nesmyslny datum, podpora d.m.yy
  altFormats: i3.c.dateFmtInt + '|j.n.y|d.m.y|d.m.Y|j.n.Y',

  constructor: function(config) {
    if ((config.editableField === undefined) || (config.editableField === '')) {
      config.editable = true;
    } else {
      config.editable = config.editableField;
    }

    Ext.apply(config, {
      dataFormat: config.dataFormat || 'Ymd'
    });

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

    epca.form.CodedDataDateField.superclass.constructor.call(this, config);
  },

  getCodedData: function() {
    var datetime = this.getValue();
    if (datetime) {
      return datetime.format(this.dataFormat);
    }
  },
  setCodedData: function(codedData) {
    var data = epca.trimCodedData(codedData);

    if (data === '') {
      return;
    }

    this.setValue(data);
  },
  getMarc: function() {
    var retVal, datetime;

    // 25.01.16 on; pokud jsme dostali nekorektni datum (setMarc) a nedoslo ke zmene, pouziju ho (vyjimka pro cav)
    if (!i3.isEmptyString(this.csDefaultRawValue)) {
      datetime = this.getRawValue();
      if (datetime === this.csDefaultRawValue) {
        retVal = {};
        retVal[this.field] = datetime;
        return retVal;
      }
    }

    datetime = this.getValue();
    if (datetime) {
      retVal = {};
      retVal[this.field] = datetime.format(this.dataFormat);
      return retVal;
    }
    // 23.09.15 on; v poli nemusi byt jenom validni datum
    datetime = this.getRawValue();
    if (datetime) {
      retVal = {};
      retVal[this.field] = datetime;
      return retVal;
    }
    return '';
  },
  // @param {Object} db nazev DB, ze ktere se zaznam dotahuje
  setMarc: function(marc, convert, convertGroup, db) {
    var datetime;
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

    // 25.01.16 on; pokud jde o cav a neni nastaven zadny specialni format a neni datum ve formatu YYYYMMDD, zapamatuju si to
    // funkce Number prevede/neprevede pouze cely retezec, parseInt i cast retezce
    //var n = parseInt(value, 10);
    this.csDefaultRawValue = '';
    var n = Number(value);
    if (!Ext.isEmpty(value) && (i3.ictx.toLowerCase() === 'cav') && (this.dataFormat === 'Ymd') && ((value.length !== 8) || isNaN(n))) {
      this.setRawValue(value);
      this.csDefaultRawValue = value;
      return;
    }

    if (!Ext.isEmpty(value)) {
      // 17.07.12 on; doplnen prevod na format d.m.r
      datetime = i3.csGetDate(value);
      this.setValue(datetime);
      // 23.09.15 on; moznost zapsat nevalidni datum (jakykoliv text)
      if (!this.getValue()) {
        this.setRawValue(datetime);
      }
    } else {
      // 07.09.15 on; potrebuju i vymazat hodnotu
      this.setValue('');
    }
  },
  onRender: function(ct, position) {
    epca.form.CodedDataDateField.superclass.onRender.call(this, ct, position);
    // 05.03.14 on; nastavi aktualni datum
    if (this.setActDate) {
      var dt = new Date();
      this.setValue(dt);
    }
  },
  setPropertyTitle: function(titles) {
    // 25.10.11 on; preda uzivatelsky nazev pole
    if (this.label) {
      this.label.update(epca.form.Helper.findTitle(titles, this.tag + epca.formatFieldId(this.field, this.position, this.dataLength), this));
    }
  },
  validate: function() {
    // 05.03.14 on; property Required
    var bValidReq, sErr = '';

    if (this.required) {
      // 25.11.16 on; doplnen getRawValue, aby se braly v uvahu i ruzne texty
      bValidReq = ((this.getValue() !== '') || (this.getRawValue() !== ''));
      if (!bValidReq) {
        sErr = epca.L10n.txEmptyDate;
      }
    } else {
      bValidReq = true;
    }

    // 25.11.16 on; validni datum
    if (bValidReq && this.validateDate) {
      if (this.getRawValue() === '') {
        bValidReq = bValidReq && true;
      } else {
        bValidReq = bValidReq && (this.getValue() !== '');
      }
      if (!bValidReq) {
        sErr = String.format(epca.L10n.txInvalidDate, this.getRawValue());
      }
    }

    // 05.03.14 on; zruseno
    /*if (Ext.isEmpty(this.customCode))
     return true;*/

    var isValid = true;
    eval(this.customCode);

    // 05.03.14 on; required
    isValid = isValid && bValidReq;

    // 25.10.11 on; pokud validace neprojde, zvyrazni cervene prvek
    if (!isValid) {
      this.markInvalid(sErr);
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
  },
  /*
   * 05.01.17 on; toto cele je tu kvuli moznosti zadat datum, co se nabidne v kalendari
   */
  onTriggerClick: function() {
    var tab, dtInitialDateToShowOnPicker;

    if (this.disabled) {
      return;
    }

    tab = epca.WsForm.csGetActiveTab();
    // tab nemusi existovat - napr. formular v popup okne
    if (tab) {
      dtInitialDateToShowOnPicker = tab.initialDateToShowOnPicker;
    }

    // nesmi tu byt === !!!!
    if (this.menu == null) {
      this.menu = new Ext.menu.DateMenu({
        hideOnClick: false,
        focusOnSelect: false
      });
    }
    this.onFocus();
    Ext.apply(this.menu.picker, {
      minDate: this.minValue,
      maxDate: this.maxValue,
      disabledDatesRE: this.disabledDatesRE,
      disabledDatesText: this.disabledDatesText,
      disabledDays: this.disabledDays,
      disabledDaysText: this.disabledDaysText,
      format: this.format,
      showToday: this.showToday,
      startDay: this.startDay,
      minText: String.format(this.minText, this.formatDate(this.minValue)),
      maxText: String.format(this.maxText, this.formatDate(this.maxValue)),
      initialDateToShowOnPicker: dtInitialDateToShowOnPicker // Date() type
    });
    this.menu.picker.setValue(this.getValue() || dtInitialDateToShowOnPicker || new Date());
    this.menu.show(this.el, "tl-bl?");
    this.menuEvents('on');
  },
  /**
   * Standardni metoda rozsirena - zamapatuje si pro aktualni formular posledni vybrane datum
   *
   * 05.01.17 on;
   */
  setValue: function(psValue) {
    epca.form.CodedDataDateField.superclass.setValue.call(this, psValue);

    var tab;
    tab = epca.WsForm.csGetActiveTab();
    // tab nemusi existovat - napr. formular v popup okne
    if (tab) {
      tab.initialDateToShowOnPicker = this.getValue();
    }
  }
});

Ext.reg('epca.codeddata_datefield', epca.form.CodedDataDateField);
