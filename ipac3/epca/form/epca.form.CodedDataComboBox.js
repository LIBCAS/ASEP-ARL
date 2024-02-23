/**
 * @author Michal Namesny
 *
 * 23.11.22 on; csCBParams - jazykova mutace
 * 18.11.22 on; oprava csCBParams
 * 25.02.20 on; moznost zakazat validaci podle ciselniku
 * 30.03.17 on; podpora dotazeni do jinych subtagu
 * 14.02.17 on; oprava kontroly na cislo/retezec - nefungovalo v IE11
 * 04.01.17 on; rozsireni funkce clearFields
 * 19.07.16 on; formular nemusi byt v tabu
 * 25.01.16 on; vyjimka pro CAV
 * 21.01.16 on; moznost skryt qtip/tooltip
 * 05.03.14 on; rozsirena validace
 * 23.01.12 on; rozsireni setMarc
 */
/*global Ext,i3,epca,document,window */

Ext.ns('epca.form');

/**
 * @class ComboBox na kodovane udaje
 *
 * Povodene podedeny od comboboxu so statickou tabulkou z i3.UI.Base.js, kvoli eventu po nacitani store
 * bola tato funkcionalita skopirovana sem
 *
 *
 */
epca.form.CodedDataComboBox = Ext.extend(Ext.form.ComboBox, {

  tag: '100',
  field: 'a',
  position: 0,
  dataLength: 0,

  constructor: function(config) {
    config = config || {};
    config.listeners = config.listeners || {};

    // 13.01.17 on; nove tu dostanu retezec
    if (config.csDisplayID) {
      // 14.02.17 on; metoda Number.isInteger neni podporovana v IE11
      //if (!Number.isInteger(config.csDisplayID)) {
      if ( typeof config.csDisplayID === 'string') {
        config.csDisplayID = parseInt(config.csDisplayID, 10);
      }
    }
    var storeObj = Ext.StoreMgr.key(config.csStatTableN);
    if (!storeObj) {
      // vytvarame nove store
      // treba si byt vedomy toho, ze data sa nacitaju async a teda nebudu hned k dispozicii
      storeObj = new i3.WS.StoreST({
        csStatTableN: config.csStatTableN,
        autoLoad: true, // kvoli validacii nechame autoload
        csDisplayID: config.csDisplayID || 0,
        csData: '1' // 30.03.17 on; doplneno kvuli ciselnikum, kde se dotahuji udaje i do jinych podpoli
      });
    }

    Ext.applyIf(config.listeners, {
      /**
       * funkcia blur
       * pouzivame na detekciu vymazu pola, aby sa vymazala skryta kodovana hodnota
       * ide o rucny vymaz obsahu pola
       *
       */
      blur: {
        fn: function() {
          // volame ale nie getValue comboboxu ale podriadenej funkcie - to je prave ten text,ktory
          // v policku fyzicky zapisany - a ten ked je prazdny tak fyzicky pole vymazeme
          // ak by sme pouzili getValue comba, vratilo by nam prave povodnu hodnotu, pred vymazom
          // textu
          var fldValue = Ext.form.ComboBox.superclass.getValue.call(this);

          if (i3.isEmptyString(fldValue)) {// pole je prazdne?
            if (this.hiddenField) {// vsetko vymazat
              //console.log('blur clearing fld');
              this.hiddenField.value = '';
            }
            this.value = '';
          }
        },
        scope: this
      },
      change: function() {
        // 21.01.16 on; na urovni aktivni zalozky vyvola udalost
        var tab;
        tab = epca.WsForm.csGetActiveTab();
        // 19.07.16 on; tab nemusi existovat - napr. formular v popup okne
        if (tab) {
          tab.fireEvent('form_changed', this, tab);
        }
      },
      /// 30.03.17 on; vyber polozky z nabidky
      select: function(cmp, record) {
        var i, fld, flds, src, dest, s1, marc;
        // pokud je vyplneny parametr csCBParams, budu dotahovat udaje i do dalsich poli
        if (!i3.isEmptyString(cmp.csCBParams)) {
          flds = cmp.csCBParams.split('|');
          marc = {};
          marc[cmp.tag] = {};

          for ( i = 0; i < flds.length; i++) {
            fld = flds[i];
            // ignoruju nastaveni OnlyNew
            fld = fld.piece('-', 1);
            // prvni znak je zdrojovy subtag
            src = fld.substr(0, 1);
            dest = fld.substr(1, 2);
            s1 = i3.Marc.getSubTagStr(record.data.data, src);
            // 23.11.22 on; jazykova mutace
            // 18.11.22 on; oprava
            //marc[cmp.tag][dest] = s1;
            //marc[cmp.tag][epca.form.Helper.c.sSubtagPrefix + dest] = s1;
            marc[cmp.tag][epca.form.Helper.c.sSubtagPrefix + dest] = i3.languageSel(s1);
          }
          if (this.ownerCt) {
            if ((this.ownerCt.xtype === 'epca.repeatable_encapsulation') && (this.ownerCt.ownerCt)) {
              // odporovat zatim budu pouze neopakovatelny ciselnik, vcetne tech cilovych subtagu
              ///this.ownerCt.ownerCt.setMarc(marc);
            }
            else {
              this.ownerCt.csSetValues(marc);
            }
          }
        }
      }
    });

    Ext.apply(config, {
      hideTrigger: false,

      // 27.08.15 on; potrebuju mit moznost obsah pole vymazat
      //editable : false,
      //forceSelection : false,
      editable: true,
      // 25.02.20 on; moznost zakazat validaci podle ciselniku
      //forceSelection: true,
      forceSelection: !config.csDisableValidation,

      // 05.03.14 on; zrusene
      //valueNotFoundText : 'Daná hodnota nebola nájdená',

      store: storeObj,
      lazyInit: true,

      displayField: 'text',
      valueField: 'id',
      // value field bude default neurceny, vtedy sa combo sprava ako naozaj "editable" t.j., to co je
      // zapisane vo fielde ma naozaj prioritu a zoznam hodnot je len ako pomocka

      // 11.12.13 on; podpora pro vyhledavani zapisem do pole
      typeAhead: true,
      //minChars : 99,
      minChars: 0,

      mode: 'local',
      triggerAction: 'all'
    });

    if (i3.isUnEmptyString(config.valueField) && (!config.validator)) {
      // dalo by sa prerobit na "vtype" - zvazit do buducna
      config.validator = this.csOnValidate;
    }

    // 21.01.16 on; moznost skryt qtip/tooltip
    if (!config.csHideQtip) {
      var sQtipStr = 'ext:qtip="{text}" ';

      Ext.applyIf(config, {
        tpl: '<tpl for=".">' + '<div ' + sQtipStr + 'class="x-combo-list-item">{text}</div>' + '</tpl>'
      });
    }

    epca.form.CodedDataComboBox.superclass.constructor.call(this, config);

    var thisCombo = this;

    storeObj.on('load', function() {
      if (thisCombo.valueCache && !Ext.isEmpty(thisCombo.valueCache)) {
        // hodnota sa iba zacachuje a pocka sa na nacitanie ciselnika
        thisCombo.setValue(thisCombo.valueCache);
        thisCombo.valueCache = undefined;
      }
    }, storeObj);
  },
  getCodedData: function() {
    // 11.07.16 on; odstranena undefined hodnota
    var s = this.getValue();
    if (!s) {
      s = '';
    }
    return s;
  },
  setCodedData: function(codedData) {
    var data = epca.trimCodedData(codedData);

    if (data === '') {
      return;
    }

    this.setValue(data);
  },
  getMarc: function() {
    var retVal = {};
    retVal[this.field] = this.getValue();
    return retVal;
  },
  // @param {Object} db nazev DB, ze ktere se zaznam dotahuje
  setMarc: function(marc, convert, convertGroup, db, selectedRecord) {

    // 01.10.15 on; dotazeni ZF
    if (epca.form.Helper.csIsDFSMethod(this.convertMap, convertGroup)) {
      // pokud uz nebyl dotazen v RepeatableEncapsulation
      if (i3.isEmptyString(marc[this.tag]) || i3.isEmptyString(marc[this.tag][this.field])) {
        // 01.10.15 on; vlozeno do funkce
        epca.form.Helper.csGetDFValue(this.convertMap, convertGroup, selectedRecord, undefined, this.csSetMarc0, this);
        return;
      }
    }

    // convertMap nastavuje sa z mapy tagov $g
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
    //if (!Ext.isEmpty(value))// (Ext.isEmpty(this.getValue()) || this.overwrite)
    //{
    this.valueCache = value;
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

    // 05.03.14 on; zrusene
    //if(Ext.isEmpty(this.customCode))
    //  return true;

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

Ext.reg('epca.codeddata_combobox', epca.form.CodedDataComboBox);
