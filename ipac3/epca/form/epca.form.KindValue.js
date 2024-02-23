/**
 * @author cosmotron (on)
 *
 * 22.12.20 on; oprava
 * 18.12.20 on; doplneny prefixy st
 * 12.03.18 on; prednacte vsechny ciselniky
 * 22.02.18 on; preklad hodnoty ciselniku po nacteni zaznamu
 * 20.09.17 on; zalozeno
 *
 */
/*global Ext,i3,epca,document,window */

Ext.ns('epca.form');

/**
 * @class KindValue pro https://cosmo2/wiki/index.php/Cl:tagmap_doc_txt/200e#KV
 *
 */
epca.form.KindValue = Ext.extend(Ext.form.ComboBox, {

  tag : '100',
  field : 'a',
  position : 0,
  dataLength : 0,

  constructor : function(config) {
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

    /*var oST = this.csGetDefaultOption(config.kvparams);
    config.csCBParams = oST.csCBParams;

    var storeObj = Ext.StoreMgr.key(oST.csStatTableN);
    if (!storeObj) {
    // vytvarame nove store
    // treba si byt vedomy toho, ze data sa nacitaju async a teda nebudu hned k dispozicii
    storeObj = new i3.WS.StoreST({
    csStatTableN : oST.csStatTableN,
    autoLoad : true, // kvoli validacii nechame autoload
    csDisplayID : config.csDisplayID || 0,
    csData : '1' // 30.03.17 on; doplneno kvuli ciselnikum, kde se dotahuji udaje i do jinych podpoli
    });
    }*/

    // vytvarame nove store - zatim prazdne
    var storeObj = new i3.WS.StoreST({
      csStatTableN : '',
      autoLoad : true, // kvoli validacii nechame autoload
      csDisplayID : config.csDisplayID || 0,
      csData : '1' // doplneno kvuli ciselnikum, kde se dotahuji udaje i do jinych podpoli
    });

    // nacte aktualni obsah $e
    this.csUpdateKVParams(config);

    Ext.applyIf(config.listeners, {
      /**
       * funkcia blur
       * pouzivame na detekciu vymazu pola, aby sa vymazala skryta kodovana hodnota
       * ide o rucny vymaz obsahu pola
       *
       */
      blur : {
        fn : function() {
          // volame ale nie getValue comboboxu ale podriadenej funkcie - to je prave ten text,ktory
          // v policku fyzicky zapisany - a ten ked je prazdny tak fyzicky pole vymazeme
          // ak by sme pouzili getValue comba, vratilo by nam prave povodnu hodnotu, pred vymazom
          // textu
          var fldValue = epca.form.KindValue.superclass.getValue.call(this);

          if (i3.isEmptyString(fldValue)) {// pole je prazdne?
            if (this.hiddenField) {// vsetko vymazat
              //console.log('blur clearing fld');
              this.hiddenField.value = '';
            }
            this.value = '';
          }
        },
        scope : this
      },
      change : function() {
        // 21.01.16 on; na urovni aktivni zalozky vyvola udalost
        var tab;
        tab = epca.WsForm.csGetActiveTab();
        // 19.07.16 on; tab nemusi existovat - napr. formular v popup okne
        if (tab) {
          tab.fireEvent('form_changed', this, tab);
        }
      },
      /// 30.03.17 on; vyber polozky z nabidky
      select : function(cmp, record) {
        var i,
            fld,
            flds,
            src,
            dest,
            s1,
            marc;
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
            // 22.12.20 on; oprava
            //marc[cmp.tag][dest] = s1;
            marc[cmp.tag][epca.form.Helper.c.sSubtagPrefix + dest] = s1;
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
      },
      // 14.09.17 on; aktualizuje ciselnik podle aktualniho stavu
      focus : function() {
        this.csSetupStoreByActValues();
      }
    });

    Ext.apply(config, {
      hideTrigger : false,

      // 27.08.15 on; potrebuju mit moznost obsah pole vymazat
      //editable : false,
      //forceSelection : false,
      editable : true,
      forceSelection : true,

      // 05.03.14 on; zrusene
      //valueNotFoundText : 'Daná hodnota nebola nájdená',

      store : storeObj,
      lazyInit : true,

      displayField : 'text',
      valueField : 'id',
      // value field bude default neurceny, vtedy sa combo sprava ako naozaj "editable" t.j., to co je
      // zapisane vo fielde ma naozaj prioritu a zoznam hodnot je len ako pomocka

      // 11.12.13 on; podpora pro vyhledavani zapisem do pole
      typeAhead : true,
      //minChars : 99,
      minChars : 0,

      mode : 'local',
      triggerAction : 'all'
    });

    if (i3.isUnEmptyString(config.valueField) && (!config.validator)) {
      // dalo by sa prerobit na "vtype" - zvazit do buducna
      config.validator = this.csOnValidate;
    }

    // 21.01.16 on; moznost skryt qtip/tooltip
    if (!config.csHideQtip) {
      var sQtipStr = 'ext:qtip="{text}" ';

      Ext.applyIf(config, {
        tpl : '<tpl for=".">' + '<div ' + sQtipStr + 'class="x-combo-list-item">{text}</div>' + '</tpl>'
      });
    }

    epca.form.KindValue.superclass.constructor.call(this, config);

    var thisCombo = this;

    storeObj.on('load', function() {
      if (thisCombo.valueCache && !Ext.isEmpty(thisCombo.valueCache)) {
        // hodnota sa iba zacachuje a pocka sa na nacitanie ciselnika
        thisCombo.setValue(thisCombo.valueCache);
        thisCombo.valueCache = undefined;
      }
    }, storeObj);
  },
  getCodedData : function() {
    // 11.07.16 on; odstranena undefined hodnota
    var s = this.getValue();
    if (!s) {
      s = '';
    }
    return s;
  },
  setCodedData : function(codedData) {
    var data = epca.trimCodedData(codedData);

    if (data === '') {
      return;
    }

    this.setValue(data);
  },
  getMarc : function() {
    var retVal = {};
    retVal[this.field] = this.getValue();
    return retVal;
  },
  // @param {Object} db nazev DB, ze ktere se zaznam dotahuje
  setMarc : function(marc, convert, convertGroup, db, selectedRecord) {

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

    // 21.10.15 on; osetreni undefined stavu
    if (value === undefined) {
      value = '';
    }

    this.csSetMarc0(value);
  },
  csSetMarc0 : function(value) {
    // 07.09.15 on; zrusena podminka, nekdy  potrebuju  zapsat i ""
    //if (!Ext.isEmpty(value))// (Ext.isEmpty(this.getValue()) || this.overwrite)
    //{
    this.valueCache = value;
    this.setValue(value);
    //}
  },
  setPropertyTitle : function(titles) {
    // 25.10.11 on; preda uzivatelsky nazev pole
    if (this.label) {
      this.label.update(epca.form.Helper.findTitle(titles, this.tag + epca.formatFieldId(this.field, this.position, this.dataLength), this));
    }
  },
  validate : function() {
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
  clearFields : function() {
    // 04.01.17 on; moznost zakazat vymaz pole pomoci tlacitka '-' u fieldsetu
    if (!this.fldDoNotErase) {
      this.setValue('');
    }
  },
  /**
   * vrati defaultni nastaveni
   *
   * 14.09.17 on;
   */
  /*csGetDefaultOption : function(psParams) {
  // zbavi se "KV," na zacatku
  psParams = psParams.substr(3);
  var s,
  param,
  i,
  aParams = psParams.split('#'),
  sPrefix;

  for ( i = 0; i < aParams.length; i++) {
  param = aParams[i];

  if (param.indexOf('*') === -1) {
  sPrefix = this.csGetSTPrefix(param.piece(',', 1));
  s = param.piece(',', 2);
  return {
  csStatTableN : sPrefix + s,
  csCBParams : param.piece(',', 3)
  }

  }
  }
  return {
  csStatTableN : '',
  csCBParams : ''
  }
  },*/
  /**
   * na zaklade konfigurace a vyplnenych udaju, vrati ciselnik
   *
   */
  csGetSTByValue : function(poRecord, poTag) {
    // zbavi se "KV," na zacatku
    var sParams = this.kvparams.substr(3);
    var sField,
        param,
        i,
        j,
        aParams = sParams.split('#'),
        oData,
        sValue,
        sST,
        sValueList,
        s1,
        aValues,
        sPrefix;

    for ( i = 0; i < aParams.length; i++) {
      param = aParams[i];

      // pokud nastaveni neobsahuje *, jsme na konci a jde o default, ktery vratim
      if (param.indexOf('*') === -1) {
        sPrefix = this.csGetSTPrefix(param.piece(',', 1));
        sST = param.piece(',', 2);
        return {
          csStatTableN : sPrefix + sST,
          csCBParams : param.piece(',', 3)
        };
      }

      // zjistim, jestli jde o tag nebo subtag, ze ktereho budu cist hodnotu
      sField = param.piece(',', 1);
      param = param.substr(sField.length + 1);
      if (sField.length < 3) {
        // aktualni tag
        sField = this.tag + sField;
        oData = poTag;
      } else {
        // cely zaznam
        oData = poRecord;
      }
      // 18.12.20 on; doplneno "st"
      // v sValue mam hodnotu pole a zkusim ji najit v seznamu v nastaveni
      //sValue = oData[sField.substr(0,3)][sField.substr(3, 4)];
      sValue = oData[sField.substr(0,3)][epca.form.Helper.c.sSubtagPrefix + sField.substr(3, 4)];

      // jinak projdu vsechny hodnoty a porovnam je
      sValueList = param.piece('*', 1);
      aValues = sValueList.split(',');
      for ( j = 0; j < aValues.length; j++) {
        s1 = aValues[j];

        if (s1 === sValue) {
          // nasli jsme stejnou hodnotu, vratim odpovidajici ciselnik
          param = param.piece('*', 2);
          sPrefix = this.csGetSTPrefix(param.piece(',', 1));
          sST = param.piece(',', 2);
          return {
            csStatTableN : sPrefix + sST,
            csCBParams : param.piece(',', 3)
          };
        }
      }
    }
    return {
      csStatTableN : '',
      csCBParams : ''
    };
  },
  /**
   * nastavi do store spravny ciselnik
   *
   * 14.09.17 on;
   */
  csSetupStore : function(pCombo, config) {
    var pStoreId = config.csStatTableN;

    pCombo.csCBParams = config.csCBParams;

    // specialny pripad, kedy nemame ziaden obsah
    if (!pStoreId) {
      pCombo.store.removeAll();
      // vycisti nas store
      return;
    }

    // pStoreId je storeId bazoveho store
    // najdeme ho cez store manager a data indexStore (t.j. store pripnuteho na nas index combo)
    // vymenime za data zdrojoveho store
    var srcStore = Ext.StoreMgr.get(pStoreId);
    //var aSourceDT;

    if (srcStore) {
      /*aSourceDT = srcStore.getRange();
       pCombo.store.removeAll();
       // vycisti nas store
       pCombo.store.add(aSourceDT);
       // a napln ho datami zo zdroja*/
      pCombo.bindStore(srcStore);
    } else {
      srcStore = new i3.WS.StoreST({
        csStatTableN : pStoreId,
        autoLoad : false,
        csDisplayID : pCombo.csDisplayID || 0,
        csData : '1', // 30.03.17 on; doplneno kvuli ciselnikum, kde se dotahuji udaje i do jinych podpoli
        listeners : {
          load : {
            fn : this.csOnValueLoad,
            scope : pCombo
          }
        }
      });
      srcStore.load();
    }
  },
  /**
   * Metoda volana po dotazeni ciselniku v poli hodnota u selekcnich kriterii.
   */
  csOnValueLoad : function(store) {
    this.bindStore(store);
    // 22.02.18 on; nastaveni hodnoty (preklad hodnoty ciselniku)
    if (this.valueCache && !Ext.isEmpty(this.valueCache)) {
      this.setValue(this.valueCache);
      this.valueCache = undefined;
    }
  },
  csGetSTPrefix : function(psST) {
    var sPrefix = '';
    switch (psST) {
    case 'ST':
    case 'ST2':
    case 'STC':
      sPrefix = 'STABLE_';
      //field['csCBParams'] = options[2];
      break;
    case 'STX':
    case 'STX2':
      sPrefix = '';
      //field['csCBParams'] = options[2];
      break;
    }
    return sPrefix;
  },
  /**
   * Podle hodnoty v zaznamu a nastaveni v poli $e, nastavi store
   */
  csSetupStoreByActValues : function() {
    var fs,
        oActTagMarc = {},
        oRecordMarc = {},
        oST,
        form;
    // nacte aktualni tag
    if (this.repeatable) {
      fs = this.ownerCt.ownerCt;
    } else {
      fs = this.ownerCt;
    }
    oActTagMarc = fs.getMarc();

    // nacte cely zaznam
    var tab;
    tab = epca.WsForm.csGetActiveTab();
    if (tab) {
      form = tab.get(1).get(0);
      oRecordMarc = form.getMarc(epca.cloneObject(tab.marcToSet));
      //this.mergeMarc(tab.marcCloneToSet, oRecordMarc);
    }

    // aktualizuje ciselnik v comboboxu
    oST = this.csGetSTByValue(oRecordMarc, oActTagMarc);
    this.csSetupStore(this, oST);
  },
  /**
   *
   * nacte aktualni obsah $e z mapy poli (prepise to, co je ulozene v definici formulare)
   */
  csUpdateKVParams : function(config) {
    //var that = this;
    var cmp,
        bFound = false,
        sDb = '';

    // zkusi se dostat na nejvyssi uroven definice formulare a najit formDBTable
    cmp = config;
    while (!bFound && (cmp.ownerCt)) {
      cmp = cmp.ownerCt;
      if (cmp.formDBTable) {
        bFound = true;
        sDb = cmp.formDBTable;
      }
    }
    if (bFound) {
      var recordId = 'TAGMAP_' + epca.Config.getDbFormat(sDb) + '_' + config.tag;
      i3.WS.getRecord({
        classn : i3.WS.getDfltUnTablesd(),
        fmt : 'LINEMARC',
        t001 : recordId,
        options : 'd',
        success : function(selectedRecord) {
          var i,
              s,
              sSubtag,
              unFields = selectedRecord.getTag('200', -1);

          // najde odpovidajici definici
          for ( i = 0; i < unFields.length; i++) {
            sSubtag = i3.Marc.getSubTagStr(unFields[i], 'a', 0); 
            // 18.12.20 on; doplnen prefix st
            //if (sSubtag === config.field) {
            if ((epca.form.Helper.c.sSubtagPrefix + sSubtag) === config.field) {              
              
              // vrati obsah podpole $e
              s = i3.Marc.getSubTagStr(unFields[i], 'e', 0);
              // nastavi pro jistotu oba objekty
              this.kvparams = s;
              config.kvparams = s;
              break;
            }
          }

          // 12.03.18 on; musi byt pred csGetAllSTs - je tu napojena reakce na nacteni ciselniku pri otevreni zaznamu a preklad kodu na formulari
          // 22.02.18 on; po aktualizazi parametru KV, aktualizuje store na zaklade akt. stavu
          this.csSetupStoreByActValues();
          
          // 12.03.18 on; prednacte vsechny ciselniky 
          this.csGetAllSTs();
        },
        // nebudu resit, v tomto pripade o TAGMAP_ALL_* nepujde
        /*failure : function(errmsg, o) {
         // 20.01.12 on; vyjimka pro ctemi tagu v mapy tagu - pokud se napodari nacist a je predam parametr s TAGMAP_ALL_*
         //              zkusi nacist tento zaznam
         if (recordIdAll) {
         that.getValue(recordIdAll, processFunction, scope, callbackFunction);
         } else {
         this(undefined, o);
         }
         },*/
        scope : this
      });
    }
  },
  /**
   * Nakesuje si vsechny ciselniky zapsane v konfiguraci
   *
   * 12.03.18 on; 
   */
  csGetAllSTs : function() {
    // zbavi se "KV," na zacatku
    var i, param, aParams, sParams, sPrefix, sST, aSTList = [], srcStore;
    
    sParams = this.kvparams.substr(3);
    aParams = sParams.split('#');
    
    for (i = 0; i < aParams.length; i++) {
      param = aParams[i];

      if (param.indexOf('*') > 0) {
        param = param.piece('*', 2);
      }
        
      sPrefix = this.csGetSTPrefix(param.piece(',', 1));
      sST = param.piece(',', 2);
      
      sST = sPrefix + sST;
      
      // pridam jenom, pokud ciselnik, jeste nemame
      if (aSTList.indexOf(sST) === -1) {
        aSTList.push(sST);
      }
    }

    for (i = 0; i < aSTList.length; i++) {
      sST = aSTList[i];

      srcStore = Ext.StoreMgr.get(sST);
 
      if (!srcStore) {
        srcStore = new i3.WS.StoreST({
          csStatTableN : sST,
          autoLoad : true,
          csDisplayID : this.csDisplayID || 0,
          csData : '1' // 30.03.17 on; doplneno kvuli ciselnikum, kde se dotahuji udaje i do jinych podpoli
        });
      }
    }
  }
});

Ext.reg('epca.kindvalue', epca.form.KindValue);
