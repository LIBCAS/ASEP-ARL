/**
 * 04.11.21 on; vyber jazykove mutace
 * 17.12.20 on; doplneno csSetOnFirstFieldInNewFieldset
 * 28.11.19 on; prefix nazvu subtagu
 * 22.11.16 on; uprava csAddHelpHref
 * 11.07.16 on; csSetOnFirstFieldInNewFieldset
 * 02.06.16 on; fldDoNotDisable
 * 03.02.15 on; doplnena funkce csGetActTagObj
 * 04.03.14 on; pdopora jazykove mutace v csGetUserTitle
 * 29.11.12 on; oprava getTagFieldValue
 * 17.07.12 on; funkce pro cteni uzivatelskeho nazvu - csGetUserTitle
 * 23.05.12 on; rozsirena funkce findTitle
 * 24.01.12 on; doplnene dotazni lname pred pole 001, predelane getTagFieldValue
 * 20.01.12 on; opraveno nacteni opakovaneho tagu (getTagFieldValue)
 *
 */
/*global Ext,epca,i3*/

Ext.ns('epca.form');

epca.form.Helper = {
  findTitle : function(titles, tag, item) {
    // 23.05.12 on; rozsireno: pokud pole neni v seznamu vracenych nazvu, tak jeste zkontroluje obsah uzivatelskeho nazvu
    var i,
        sTitle = '';
    var bFound = false;

    // 03.12.19 on; odmaze st - v nekterych pripadech je uz odmazane, ale ne uplne vsude
    if (tag && (tag.substr(3, epca.form.Helper.c.sSubtagPrefix.length) === epca.form.Helper.c.sSubtagPrefix)) {
      tag = tag.substr(0, 3) + tag.substr(3 + epca.form.Helper.c.sSubtagPrefix.length);
    }

    for ( i = 0; i < titles.length; i++) {
      if (titles[i].id === tag) {
        bFound = true;
        // 23.05.12 on;
        // 25.10.11 on; podpora pro uzivatelske nezvy poli
        if (tag.length === 3) {
          if ((item.tagLabelUser) && (item.tagLabelUser !== '')) {
            sTitle = this.csGetUserTitle(item.tagLabelUser);
          } else {
            sTitle = tag + ' ' + titles[i].title;
          }
        } else {
          if ((item.fieldLabelUser) && (item.fieldLabelUser !== '')) {
            sTitle = this.csGetUserTitle(item.fieldLabelUser);
          } else {
            sTitle = titles[i].title;
          }
        }

        // 11.08.15 on;
        //return sTitle;
        return epca.form.Helper.csAddHelpHref(sTitle, item);
      }
    }
    // 23.05.12 on; pole nebylo nazeleno, vrati uzivatelsky popis
    if (!bFound) {
      // 06.08.15 on; podpora pro kontejnery
      if (item.csContainer) {
        // 04.11.21 on; vyber jazykove mutace
        //sTitle = item.containerLabelUser;
        sTitle = item.containerLabelUser.ls();
      } else if (tag.length === 3) {
        if ((item.tagLabelUser) && (item.tagLabelUser !== '')) {
          sTitle = this.csGetUserTitle(item.tagLabelUser);
        } else {
          sTitle = tag;
        }
      } else {
        if ((item.fieldLabelUser) && (item.fieldLabelUser !== '')) {
          sTitle = this.csGetUserTitle(item.fieldLabelUser);
        } else {
          // 03.12.15 on; pokud nic nenajdu, vratim puvodni nazev
          //sTitle = '';
          sTitle = item.fieldLabel;
        }
      }
      // 11.08.15 on;
      //return sTitle;
      return epca.form.Helper.csAddHelpHref(sTitle, item);
    }
  },
  /**
   * Vrati uzivatelsky popis.
   *
   * @param {String} psTitle = zadany nazev pole
   */
  csGetUserTitle : function(psTitle) {
    if ((psTitle === '""') || (psTitle === '\'\'')) {
      psTitle = '';
    }
    // 04.03.14 on; vyber jazykove verze
    return psTitle.ls();
  },
  /**
   * Vrati help podle jazykove mutace
   *
   * 04.11.21 on;
   */
  csGetHelp : function(item) { 
    var sHelp;
    // jazykove mutace helpu
    if (i3.language === '2') {
      // cz
      sHelp = item.fieldHelp2;
    } else if (i3.language === '3') {
      // eng
      sHelp = item.fieldHelp3;
    } else {
      // sk
      sHelp = item.fieldHelp;
    }
    if (i3.isEmptyString(sHelp)) {
      // default sk
      sHelp = item.fieldHelp;
    }
    
    return sHelp;
  },
  /**
   * Vrati URL helpu podle jazykove mutace
   *
   * 04.11.21 on;
   */
  csGetHelpURL : function() { 
    var sHelpURL;
    // jazykove mutace helpu
    if (i3.language === '2') {
      // cz
      sHelpURL = epca.Config.User.helpURLCze;
    } else if (i3.language === '3') {
      // eng
      sHelpURL = epca.Config.User.helpURLEng;
    } else {
      // sk
      sHelpURL = epca.Config.User.helpURL;
    }
    if (i3.isEmptyString(sHelpURL)) {
      // default sk
      sHelpURL = epca.Config.User.helpURL;
    }
    
    return sHelpURL;
  },  
  // 11.08.15 on; prida do pole odkaz na help
  csAddHelpHref : function(title, item) {
    var sURL,
        sHelp;

    if (item.xtype === 'epca.repeatable_encapsulation') {
      // 04.11.21 on; zapojena metoda
      //if (i3.isEmptyString(item.item.fieldHelp)) {
      if (i3.isEmptyString(this.csGetHelp(item.item))) {
        return title;
      }
      sHelp = this.csGetHelp(item.item);
    } else {
      // 04.11.21 on; zapojena metoda
      //if (i3.isEmptyString(item.fieldHelp)) {
      if (i3.isEmptyString(this.csGetHelp(item))) {
        return title;
      }
      sHelp = this.csGetHelp(item);
    }

    // 22.11.16 on; pokud sHelp zasina na http:// nebo https://, tak nebudu pridavat prefix
    if ((sHelp.substring(0, 7) === 'http://') || (sHelp.substring(0, 8) === 'https://')) {
      sURL = sHelp;
    } else {
      sURL = this.csGetHelpURL() + sHelp;
    }

    //return '<a href="https://www.lib.cas.cz/asep/pro-zpracovatele/manual/popis-poli/#T70xa" target="_blank">'+title+'</a>';
    //return '<a href="https://www.lib.cas.cz/asep/pro-zpracovatele/manual/popis-poli/#T70xa" onclick="window.open(\'https://www.lib.cas.cz/asep/pro-zpracovatele/manual/popis-poli/#T70xa\',\'_blank\',\'menubar=no,top=10\'); return false">'+title+'</a>';
    //<a href="index.html" onclick="window.open('index.html'); return false">odkaz do nového okna javascriptem</a>

    return '<a href="' + sURL + '" onclick="window.open(\'' + sURL + '\',\'_blank\',\'resizable=yes,scrollbars=yes,width=1000,height=600\'); return false">' + title + '</a>';
  },

  /**
   *
   * @param {Object} object
   * @param {Object} option = 'tag': tag, 'field' : field, 'group': convertGroup, 'map': convertMap, 'convert':convert
   */
  getMarcValue : function(object, option) {
    var sTag,
        sField,
        o,
        s;

    if (!object) {
      return undefined;
    }

    if (!option) {
      return object;
    }

    if (!option.convert) {
      return this.getTagFieldValue(object, option.tag, option.field, option.db, option.convert, option.selectedRecord);
    }

    if (!option.map) {
      // 01.03.16 on; toto je podle mne spatne, pokud neni nastavene dotahovani v convertMap, nemelo by se ani nic dotahovat
      //              ale protoze je se toto mozna uz nekde vyuziva, pokud se neco dotahne, tak to preberu, jinak vrati null
      //              i kdyz bych to do budoucna radsi uplne zrusil a vracel vzdy null
      //return this.getTagFieldValue(object, option.tag, option.field, option.db, option.convert, option.selectedRecord);
      s = this.getTagFieldValue(object, option.tag, option.field, option.db, option.convert, option.selectedRecord);
      if (s) {
        return s;
      }
      // 01.03.16 on; potrebuju odlisit undefined od null
      return null;
    }

    if (!option.group && option.map.tag && option.map.field) {
      o = option.map;
      if (o) {
        if (o.field && (o.field.indexOf('@') > 0)) {
          return this.getTagFieldValueMulti(object, option, o);
        }
        sTag = o.tag;
        sField = o.field;
      }

      return this.getTagFieldValue(object, sTag, sField, option.db, option.convert, option.selectedRecord);
    }

    if (!option.group) {
      o = option.map[0];
      if (o) {
        if (o.field && (o.field.indexOf('@') > 0)) {
          return this.getTagFieldValueMulti(object, option, o);
        }
        sTag = o.tag;
        sField = o.field;
      }

      return this.getTagFieldValue(object, sTag, sField, option.db, option.convert, option.selectedRecord);
    }

    o = option.map[option.group];
    if (o) {
      if (o.field && (o.field.indexOf('@') > 0)) {
        return this.getTagFieldValueMulti(object, option, o);
      }
      sTag = o.tag;
      sField = o.field;
    } else {
      // 01.03.16 on; musim nejak odlisit, ze se nema dotahovat ani prazdny retezec
      return null;
    }

    // 23.01.12 on; predane convert kvuli pridavani lname pred pole 001
    return this.getTagFieldValue(object, sTag, sField, option.db, option.convert, option.selectedRecord);
  },
  /**
   * Dotazeni hodnoty s nastavim vice poli pres @
   */
  getTagFieldValueMulti : function(object, option, o) {
    var sTag,
        sField,
        aFields,
        i,
        sValue,
        s;

    if (!o || !o.field) {
      return '';
    }

    aFields = o.field.split('@');
    for ( i = 0; i < aFields.length; i++) {
      s = aFields[i];
      if (i === 0) {
        sTag = o.tag;
        sField = s;
      } else {
        sTag = s.substring(0, 3);
        sField = s.substring(3);
      }

      sValue = this.getTagFieldValue(object, sTag, sField, option.db, option.convert, option.selectedRecord);
      if (!i3.isEmptyString(sValue)) {
        return sValue;
      }
    }
    return '';
  },

  /**
   * Vrati hodnotu tagu, alebo konkretneho podpola z objektu
   * @param {Object} object
   * @param {Object} tag
   * @param {Object} field
   * @param {Object} db
   * @param {Object} convert
   */
  getTagFieldValue : function(object, tag, field, db, convert, selectedRecord) {
    var retVal;

    // 19.01.12 on; zmena
    //if(!tag) return object;
    if (!tag) {
      return undefined;
    }

    if (!object.hasOwnProperty(tag)) {
      return undefined;
    }

    if (!field) {
      return object[tag];
    }

    // 24.01.12 on; predelane
    /*// 20.01.12 on; osetreno dotazeni hodnoty z tagu s vice opakovanimi
    //             bude se nacitat z prvniho opakovani tagu
    if(object[tag] && object[tag][0]) {
    if(!object[tag][0].hasOwnProperty(field))
    return undefined;
    else {
    var retVal = object[tag][0][field];
    delete object[tag][0][field];
    return this.checkDBLink(retVal,tag,field,db,convert);   // 24.01.12 on; doplneni lname
    }
    } else if(!object[tag].hasOwnProperty(field))
    return undefined;
    else {
    //return object[tag][field];
    var retVal = object[tag][field];
    delete object[tag][field];
    return this.checkDBLink(retVal,tag,field,db,convert);      // 24.01.12 on; doplneni lname
    }*/

    // 02.12.19 on; prefix subtagu
    field = epca.form.Helper.csAddPrefixST(field);

    // ziskam puvodni subtag $g - toto je tu nestastne, ale neda se jinak (spoji to, co bylo nekde nahore rozpojeno)
    var lsSTG = tag + field,
        i,
        fld,
        sResult;

    // @ muze byt oddeleno vice opakovani tagu
    var laSTG = lsSTG.split('@');

    // zaciname na '1' cim preskakujeme prvy index, kde je cislo tagu a podpole
    for ( i = 0; i < laSTG.length; i++) {
      fld = laSTG[i];
      if ((!fld) || (fld === '')) {
        continue;
      }

      tag = fld.substring(0, 3);
      field = fld.substring(3);

      // 29.11.12 on; nesmi tu byt test [0], protoze pokud tag odsahuje podpole $0, dojde k chybe
      //if (object[tag] && object[tag][0]) {
      if (object[tag] && ( typeof object[tag][0] === 'object')) {
        if (!object[tag][0].hasOwnProperty(field)) {
          continue;
        }

        retVal = object[tag][0][field];
        delete object[tag][0][field];
        sResult = this.checkDBLink(retVal, tag, field, db, convert);
        // 24.01.12 on; doplneni lname
        break;
      }

      if (!object[tag] || !object[tag].hasOwnProperty(field)) {
        continue;
      }
      retVal = object[tag][field];
      delete object[tag][field];
      sResult = this.checkDBLink(retVal, tag, field, db, convert);
      // 24.01.12 on; doplneni lname
      break;
    }
    return sResult;
  },
  // nacte ZF
  csGetDFValue : function(map, group, pRecord, psTag, pCallBack, pScope) {
    var o,
        sDF;

    if (!map) {
      return;
    }

    if (i3.isEmptyString(group)) {
      o = map;
    } else {
      o = map[group];
    }

    if (!o) {
      return;
    }

    if (!o.tag) {
      return;
    }

    if (o.tag.substring(0, 4) !== '@DFS') {
      return;
    }

    if (!pRecord) {
      return;
    }

    sDF = o.tag.substring(5);

    i3.WS.display({
      success : function(pRec) {
        if (pCallBack && pRec && pRec.data) {
          pCallBack.call(pScope || this, pRec.data[0], psTag);
        }
      },
      scope : this
    }, pRecord, sDF);
  },
  /**
   * Doplni pred vracenou hodnotu lname db, pokud je to potreba
   * @param {Object} value
   * @param {Object} tag
   * @param {Object} field
   * @param {Object} db
   * @param {Object} convert
   */
  checkDBLink : function(value, tag, field, db, convert) {
    if (convert && db && value && (tag === '001')) {
      db = i3.className2LName(db);
      return db + '*' + value;
    }

    return value;
  },
  /***
   * @param {Object} poItem pole reprezentujici subtag v ramci fieldsetu, pouziva se pri validaci, kdyz je nektery subtag povinny, pokud je jiny v ramci tagu vyplneny
   *                       viz. https://cosmo2/wiki/index.php/Concepts/ext_form_generator/doc/validation
   *
   * 03.02.15 on; vrati aktualni tag (objekt)
   */
  csGetActTagObj : function(poItem) {
    var o = {};
    while (poItem.ownerCt) {
      poItem = poItem.ownerCt;
      if (poItem.xtype === 'epca.marc_fieldset') {
        break;
      }
    }
    if (poItem && poItem.getMarc) {
      o = poItem.getMarc();
    }
    return o;
  },
  // 03.09.15 on; zakaze vsechny prvky na stejne urovni, ktere byly dotazeny - podle convertMap
  // POZOR: pole s PB nesmi byt opakovatelne!!!
  csDisableLinkedFields : function(value, cmp) {
    var i,
        fld,
        o,
        nGroup;

    // 07.09.15 on; pokud neni  vyplneno,  povoli  pole
    // pokud neni vyplnena hodnota, tam zatim nedelam nic
    //if (i3.isEmptyString(value)) {
    //  return;
    //}

    if (cmp.convertMap) {
      // zjistim si skupinu z convertMap - nemusi byt urcena viz. niz
      nGroup = parseInt(cmp.convertGroup, 10);

      for ( i = 0; i < cmp.ownerCt.items.items.length; i++) {
        fld = cmp.ownerCt.items.items[i];

        // pokud je nastaveno disabled nebo je zakazano zakazovat, tak nebudu nic menit
        if (fld.convertMap && !fld.initialConfig.disabled && !fld.doNotDisable && !fld.fldDoNotDisable) {
          // nebyla urctena skupina - v $g neni cislo (napr. "001.,1")
          if (!cmp.convertGroup) {
            o = fld.convertMap;
            // nemusi existovat $g bez cisla
            if (o.tag) {
              // nebudu zakazovat 000x
              if (o && ((o.tag !== '000') || (o.field !== 'x'))) {
                fld.setDisabled(!i3.isEmptyString(value));
              }
            }
          } else {
            o = fld.convertMap[nGroup];
            // nebudu zakazovat 000x
            if (o && ((o.tag !== '000') || (o.field !== 'x'))) {
              fld.setDisabled(!i3.isEmptyString(value));
            }
          }
        }
      }
    }
  },
  csIsDFSMethod : function(map, group) {
    var o;
    if (!map) {
      return false;
    }

    if (i3.isEmptyString(group)) {
      o = map;
    } else {
      o = map[group];
    }
    if (!o) {
      return false;
    }

    // synchroni volani ZF
    if (o.tag && (o.tag.substring(0, 4) === '@DFS')) {
      return true;
    }
    return false;
  },
  /**
   *
   * @param {Object} cmp
   * @param {Object} index
   *
   * 11.07.16 on; v novem fieldsetu se nastavi na x-te pole
   */
  csSetOnFirstFieldInNewFieldset : function(cmp, index, pos) {
    var i,
        nCount = 0,
        c,
        nPosition;

    // 17.12.20 on; moznost predat pozici kurzoru v parametru
    if (pos) {
      nPosition = pos;
    } else {
      nPosition = parseInt(epca.Config.User.AddNewFieldsetRepetitionParam, 10);
    }
    if (!nPosition) {
      return;
    }

    c = cmp.get(index);
    //tab.items.items[1].body.dom.scrollTop = 150;

    // 17.12.20 on; doplnen odrolovani az na posledni prvek ve fieldsetu a az pak navrat na pozadovanou pozici
    //              kvuli lepsimu vzhledu
    for ( i = 0; i < c.items.items.length; i++) {
      if (!c.items.items[i].hidden) {
        if (c.items.items[i].xtype === "epca.repeatable_encapsulation") {
          c.items.items[i].items.items[0].el.dom.focus();
        } else {
          c.items.items[i].el.dom.focus();
        }
      }
    }

    // pozadovana pozice
    for ( i = 0; i < c.items.items.length; i++) {
      if (!c.items.items[i].hidden) {
        if (c.items.items[i].xtype === "epca.repeatable_encapsulation") {
          c.items.items[i].items.items[0].el.dom.focus();
        } else {
          c.items.items[i].el.dom.focus();
        }
        nCount++;
        if (nCount === nPosition) {
          break;
        }
      }
    }
  },
  csAddPrefixST : function(psField) {
    var sResult = psField;
    if (!i3.isEmptyString(psField) && (psField !== '.') && (psField.substr(0, epca.form.Helper.c.sSubtagPrefix.length) !== epca.form.Helper.c.sSubtagPrefix)) {
      sResult = epca.form.Helper.c.sSubtagPrefix + psField;
    }
    return sResult;
  },
  /**
   * 28.11.19 on; prefix nazvu subtagu
   *
   */
  c : {
    sSubtagPrefix : 'st'
  }
};

Ext.reg('epca.form.Helper', epca.form.Helper);
