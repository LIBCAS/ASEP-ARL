/**
 *
 * 21.06.23 on; aNestedContainerList - pokud je v kontejneru vnoreny kontejner, ktery obsahuje stejne pole, budu predpokladat, ze vsechny subtagy tohoto pole jsou v nem nadefinovane
 *              a nebudu je tedy mazat, kdyby to byl problem, musel bych si v aNestedContainerList pamatovat konkretni subtagy z toho vnoreneho kontejneru 
 * 13.01.21 on; tag nemusi existovat
 * 25.06.19 on; osetreni kotvy
 * 13.09.18 on; uprava csSetValues
 * 30.03.17 on; metoda csSetValues
 * 10.02.17 on; uprava vymazu fieldsetu
 * 20.10.16 on; uprava funkce setMarc pro dotahovani zaznamu do pole
 * 01.07.16 on; rozsireno nastaveni nazvu fieldsetu
 * 03.09.13 on; csGetFieldSetWidth
 * 23.05.12 on; oprava chyby
 * @author Michal Namesny
 */
/*global epca, Ext, i3*/

Ext.ns('epca.form');

/**
 * Zakladny panel predstavujuci cely formular, alebo jednotlive tagy
 *
 * Obsahuje ako zvysne komponenty tieto hlavne metody:
 * getMarc - vrati marc hodnotu z vyplnenych udajov
 * setMarc - naplni zadanymi udajmi
 * setPropertyTitle - aktualizuje nadpis, podla aktualnych hodnot v mape tagov
 * validate - validacia
 */
epca.form.FieldSet = Ext.extend(Ext.form.FieldSet, {
  tag : undefined,

  // v pripade ze obsah komponentu nie je validny, je potrebne nastavit hodnotu premennej 'isValid' na false
  customCode : 'isValid = true;',

  constructor : function(config) {
    var i;

    Ext.apply(config, {});

    //  31.08.15 on; vyjimka pro linkentry formular
    // pokud nejde o ten hlavni fieldset a zaroven neni opakovatelny, upravi velikost ramecku
    if (!config.formAuthor && !config.repeatable && (config.id !== 'windowLinkEntryMainFieldSet')) {
      // 08.02.16 on; zruseno
      //Ext.apply(config, {
      //autoWidth : false,
      //width : this.csGetFieldSetWidth(config)
      //});
    }

    if (config.disabled && (config.disabled === true)) {
      config.disabled = false;

      for ( i = 0; i < config.items.length; i++) {
        config.items[i].disabled = true;
      }
    }

    // moznost presunovat fieldsety- nakonec reseno pomoci sipek
    /*Ext.apply(config, {
     draggable : true
     });*/

    epca.form.FieldSet.superclass.constructor.call(this, config);
  },
  /**
   * Zkusi zjistit velikost fieldsetu. Aso by to slo resit nejak elegantne pres layout, ale nedosel jsem na to, a tak
   * jsem musel pouzit ruzne konstanty.
   *
   * 08.02.16 on; zruseno
   * 03.09.13 on;
   *
   */
  /*csGetFieldSetWidth : function(config) {
  var i, o, nConst1 = 27, nConst2 = 71, nMaxWidth = 0, nWidth, nDefault = 200 + 400 + 27, nConst3 = 110; //fieldset muze obsahovat 4 tlacitka
  if (config.items) {
  for ( i = 0; i < config.items.length; i++) {
  o = config.items[i];
  // jenom viditelne polozky
  if (!o.hidden) {
  if (o.xtype === 'epca.repeatable_encapsulation') {
  if (o.item.xtype === 'epca.marc_fieldset') {
  nWidth = this.csGetFieldSetWidth(o.item) + nConst3;
  } else if (o.item.xtype === 'epca.codeddata_fieldset') {
  nWidth = this.csGetFieldSetWidth(o.item) + nConst2;
  } else {
  nWidth = o.item.width + o.item.labelWidth + nConst2;
  }
  } else {
  if ((o.xtype === 'epca.marc_fieldset') || (o.xtype === 'epca.codeddata_fieldset')) {
  nWidth = this.csGetFieldSetWidth(o) + nConst1;
  } else {
  nWidth = o.width + o.labelWidth + nConst1;
  }
  }
  if (nWidth > nMaxWidth) {
  nMaxWidth = nWidth;
  }
  }
  }
  }
  // default, pokud neni ve fiedsetu viditelna zadna komponenta
  if (nMaxWidth === 0) {
  nMaxWidth = nDefault;
  }
  return nMaxWidth;
  },*/
  /**
   * Override, setDisabled na kazdy podkomponent, kvoli designu
   * @param {Object} bool
   */
  setDisabled : function(bool) {
    var i;

    for ( i = 0; i < this.items.length; i++) {
      this.get(i).setDisabled(bool);
    }
  },
  getMarc : function(marc, bSkipDefaultValue) {
    var csMergeMarc = function(pValue, pMarc) {
      var prop,
          o;
      for (prop in pMarc) {
        if (pMarc.hasOwnProperty(prop)) {
          o = pMarc[prop];
          if (pValue.hasOwnProperty(prop)) {
            Ext.apply(pValue[prop], o);
          } else {
            pValue[prop] = o;
          }
        }
      }
    };

    var csFixContainerValue = function(pRetValue, pValue) {
      var prop,
          o;
      for (prop in pValue) {
        if (pValue.hasOwnProperty(prop)) {
          o = pValue[prop];
          if (pRetValue.hasOwnProperty(prop)) {
            if (Ext.isArray(pRetValue[prop])) {
              pRetValue[prop].push(o);
            } else {
              pRetValue[prop] = [pRetValue[prop]];
              if (Ext.isArray(o)) {
                pRetValue[prop] = pRetValue[prop].concat(o);
              } else {
                pRetValue[prop].push(o);
              }
            }
          } else {
            pRetValue[prop] = o;
          }
        }
      }
    };

    var i,
        value = {},
        retVal = {},
        bSubfieldsInContainer = false,
        prop,
        pTag,
        oTag;

    // 16.12.15 on; pokud jde o pole, ktere bylo naplneno defaultem a zarovem mam takove pole preskakovat (typicky pri porovnani zaznamu), tak
    //              vratim ''
    if (bSkipDefaultValue && this.csIsDefault) {
      return '';
    }

    for ( i = 0; i < this.items.length; i++) {
      if (this.csContainer && !i3.isEmptyString(this.items.items[i].field)) {
        marc = this.get(i).getMarc(marc, bSkipDefaultValue);

        if (epca.isEmpty(retVal[this.items.items[i].tag])) {
          retVal[this.items.items[i].tag] = {};
        }
        Ext.apply(retVal[this.items.items[i].tag], marc);
        bSubfieldsInContainer = true;
      } else {
        // 17.08.15 on; do fielsetu pridane tlacitka
        if (this.get(i).getMarc) {
          // 11.08.11 on; zrusena podminka, nevim, proc tu je, ale zpusobuje to, ze se ze zaznamu ztrati subtagy nastavene jako disabled
          //only if is editable
          //if(this.get(i).disabled == false) {
          //Ext.apply(value, (this.get(i)).getMarc(marc));
          marc = this.get(i).getMarc(marc, bSkipDefaultValue);

          // kvuli moznemu pouziti kontejneru protrebuju zjistit, jestli takove pole uz nebylo v jinem kontejneru pouzito a kdyz ano, prida subtagy tam
          //Ext.apply(value, marc);
          csMergeMarc(value, marc);
          //}
        }
      }
    }

    if (bSubfieldsInContainer) {
      // 04.09.15 on; je potreba nacist i subtagy, co nejsou na formulari
      if (this.csNotPresentedFields && !i3.isEmptyObj(this.csNotPresentedFields)) {
        for (pTag in this.csNotPresentedFields) {
          if (this.csNotPresentedFields.hasOwnProperty(pTag)) {
            oTag = this.csNotPresentedFields[pTag];
            // Go through all the properties of the passed-in object
            for (prop in oTag) {
              if (oTag.hasOwnProperty(prop)) {
                if (oTag[prop] !== '') {
                  // policka, ktera nejsou na formualari
                  // 13.01.21 on; tag nemusi existovat
                  if (!retVal[pTag]) {
                    retVal[pTag] = {};
                  }
                  retVal[pTag][prop] = oTag[prop];
                }
              }
            }
          }
        }
      }
      // silenosti s kontejnerem - kontejner, ktery obsahuje jiny kontejner
      csFixContainerValue(retVal, value);
      //Ext.apply(retVal, value);
      return retVal;
    }
    if (this.tag) {
      // 03.09.15 on; je potreba nacist i subtagy, co nejsou na formulari
      if (this.csNotPresentedFields && !i3.isEmptyObj(this.csNotPresentedFields)) {
        oTag = this.csNotPresentedFields[this.tag];
        // tady muze byt pouze jeden tag
        // Go through all the properties of the passed-in object
        for (prop in oTag) {
          if (oTag.hasOwnProperty(prop)) {
            if (oTag[prop] !== '') {
              // policka, ktera nejsou na formualari
              value[prop] = oTag[prop];
            }
          }
        }
      }

      retVal[this.tag] = value;
      return retVal;
    }
    return value;
  },
  /**
   * Set Marc
   * @param {Object} marc zaznam
   * @param {Object} convertGroup skupina podla ktorej konvertovat
   * @param {Object} db nazev DB, ze ktere se zaznam dotahuje
   */
  setMarc : function(marc, convert, convertGroup, db, selectedRecord) {
    var i,
        prop,
        o,
        aTaglist,
        sTag,
        oTag,
        aNestedContainerList;
    for ( i = 0; i < this.items.length; i++) {
      // 17.08.15 on; doo fielsetu pridane tlacitka
      if (this.get(i).setMarc) {
        (this.get(i)).setMarc(marc, convert, convertGroup, db, selectedRecord);
      }
    }

    // 20.10.16 on; pouze pokud nedotahuju jiny zaznam do pole (!convert)
    // 03.09.15 on; pokud nebyly vlozeny vsechny subtagy, musi si poznacit ty, ktere ve fieldsetu nejsou
    if (!convert) {
      if (this.tag) {
        this.csNotPresentedFields = {};
        oTag = {};
        o = marc[this.tag];
        for (prop in o) {
          if (o.hasOwnProperty(prop)) {
            if (o[prop] !== '') {
              oTag[prop] = o[prop];
              // odmaze podpole ze zaznamu - protoze si ho pamatujeme
              delete marc[this.tag][prop];
            }
          }
        }
        this.csNotPresentedFields[this.tag] = oTag;
      } else
      // pokud  se  jedna  o kontejner, budu uchovat subtagy pouzitych tagu, ktere uz nejsou v dalsim kontejneru na formulari (ve stejne urovni)
      if (this.csContainer) {
        this.csNotPresentedFields = {};
        aTaglist = [];
        aNestedContainerList = [];

        //  zjistim  pouzite  tagy  ve  fieldetu
        for ( i = 0; i < this.items.length; i++) {
          oTag = this.items.items[i];

          //if (oTag.tag && (aTaglist.indexOf(oTag.tag) < 0) && (!this.unstoredTags || (this.unstoredTags.fieldLocate('#', oTag.tag) === 0))) {
          if (oTag.tag && (aTaglist.indexOf(oTag.tag) < 0) && !this.csIsTagInAnotherContainer(this, oTag.tag)) {
            aTaglist.push(oTag.tag);
          }
          
          // 21.06.23 on; zapamatuju si tagy ve vnorenych opakovatelnych kontejnerech, predpokladam, ze tam muze byt pouze jeden tag
          //              reseno kvuli formulari DFLT_CZ_EPCA_B na CAV - pole U10
          if (oTag && oTag.items && oTag.items.item && oTag.items.items[0] && oTag.items.items[0].csContainer && oTag.items.items[0].items.items[0].tag) {
          	sTag = oTag.items.items[0].items.items[0].tag;
          	if (aNestedContainerList.indexOf(sTag) < 0) {
              aNestedContainerList.push(sTag);
            }
          }
        }

        for ( i = 0; i < aTaglist.length; i++) {
          sTag = aTaglist[i];
          oTag = {};

          o = marc[sTag];
          for (prop in o) {
            if (o.hasOwnProperty(prop)) {
              // 21.06.23 on; aNestedContainerList - pokud je v kontejneru vnoreny kontejner, ktery obsahuje stejne pole, budu predpokladat, ze vsechny subtagy tohoto pole jsou v nem nadefinovane
              //              a nebudu je tedy mazat, kdyby to byl problem, musel bych si v aNestedContainerList pamatovat konkretni subtagy z toho vnoreneho kontejneru 
              //              reseno kvuli formulari DFLT_CZ_EPCA_B na CAV - pole U10
              // "o" muze obsahovat i funkce napr. remove
              // nebudu vkladat ani kontejner (objekt) v kontejneru
              if (!Ext.isObject(o[prop]) && !Ext.isFunction(o[prop]) && (o[prop] !== '') && (aNestedContainerList.indexOf(sTag) < 0)) {
                oTag[prop] = o[prop];
                // odmaze podpole ze zaznamu - protoze si ho pamatujeme
                delete marc[sTag][prop];
              }
            }
          }
          this.csNotPresentedFields[sTag] = oTag;
        }
      }
    }
  },
  setTagMapValue : function(titles) {
    var i;
    for ( i = 0; i < this.items.length; i++) {
      (this.get(i)).setPropertyTitle(titles);
    }
  },
  /**
   * Aktualizuje nadpis, podla aktualnych hodnot v mape tagov
   * @param {Object} titles
   */
  setPropertyTitle : function(titles, number) {
    var i,
        s;

    // preda uzivatelsky nazev pole
    s = epca.form.Helper.findTitle(titles, this.tag, this);

    // 01.07.16 on; nahradi %NUMBER% za poradi opakovani fieldsetu
    s = this.csFixFieldsetNumbering(s, number);

    // 25.06.19 on; osetri kotvy
    s = this.csFixAnchor(s);

    this.setTitle(s);
    // 03.12.15 on; pokud je retezec prazdny, skryju legend element viz. https://www.sencha.com/forum/showthread.php?89278-FieldSet-title-Solved
    if (!s) {
      var legend = this.el.child('legend');
      if (legend) {
        legend.setVisibilityMode(Ext.Element.DISPLAY);
        legend.hide();
      }
    }

    for ( i = 0; i < this.items.length; i++) {
      // 17.08.15 on; do fielsetu pridane tlacitka
      if (this.get(i).setPropertyTitle) {
        this.get(i).setPropertyTitle(titles);
      }
    }
  },
  /**
   *
   */
  validate : function() {
    var i,
        bValid = true;
    // validate each child component
    if (this.items.length === 1) {
      if ((this.get(0)).validate() !== true) {
        return false;
      }
    } else {
      for ( i = 0; i < this.items.length; i++) {
        // 17.08.15 on; do fielsetu pridane tlacitka
        if (this.get(i).validate && (this.get(i)).validate() !== true) {
          // return false;   // 27.10.11 on; potrebuju projit vsechna pole
          bValid = false;
        }
      }
    }
    if (!bValid) {
      return false;
    }

    if (Ext.isEmpty(this.customCode)) {
      return true;
    }
    var isValid = true;
    eval(this.customCode);
    return isValid;
  },
  /**
   * Disable nie uplne nacitanych opakovatelnych tagov
   * (takych ktore neobsahuju vsetky podpolia, ktore sa nachadzaju v zazname)
   *
   * Disable opakovatelnej komponenty
   * @param {Object} marc
   */
  disableFields : function(marc) {
    var i;
    for ( i = 0; i < this.items.length; i++) {
      if (this.get(i) instanceof epca.form.RepeatableEncapsulation) {
        (this.get(i)).disableFields(marc);
      }
    }
  },

  /**
   * Smaze obsah poli
   *
   * 10.02.17 on; moznost odmazat opakovatelne fieldsety ve vnorenem fieldsetu
   * 11.08.11 on;
   *
   */
  clearFields : function(pbRemoveRepeatedFieldsets) {
    var i;

    for ( i = 0; i < this.items.length; i++) {
      (this.get(i)).clearFields(pbRemoveRepeatedFieldsets);
    }

    // 03.09.15 on; nevim, jestli tu musi byt podminka, ale nicemu tu neuskodi
    if (this.csNotPresentedFields) {
      this.csNotPresentedFields = {};
    }
  },
  // zjisti jestli neni zadany tag jeste v jinem kontejneru (na stejne urovni)
  csIsTagInAnotherContainer : function(actItem, psTag) {
    var i,
        j,
        o,
        o1,
        bFound = false;

    for ( i = 0; i < this.ownerCt.items.length; i++) {
      o = this.ownerCt.items.items[i];

      // musim hledat az za aktualni kontejnerem
      if (!bFound && (actItem === o)) {
        bFound = true;
      } else if (bFound && o.csContainer) {
        for ( j = 0; j < o.items.length; j++) {
          o1 = o.items.items[j];
          if (psTag === o1.tag) {
            return true;
          }
        }
      }
    }
    return false;
  },
  /*
   * 11.07.16 on; cislovani opakovani fieldsetu
   */
  csFixFieldsetNumbering : function(psTitle, pnNumber) {
    var sNumber;
    if (psTitle && psTitle.strswap && pnNumber && (psTitle.indexOf('%NUMBER%') >= 0)) {
      // prevod na string
      sNumber = '' + pnNumber;
      psTitle = psTitle.strswap('%NUMBER%', sNumber);
    }
    return psTitle;
  },
  /**
   * Set values
   * altervativa k setMarc - nechce se mne do toho uz vrtat
   * nastavi pouze subtagy, ktere byt predane v marc
   * pouzite zatim pouze u dotazeni dalsich hodnot pri dotazeni ciselniku
   */
  csSetValues : function(marc) {
    var i,
        c;
    for ( i = 0; i < this.items.length; i++) {
      c = this.get(i);
      // odporovat zatim budu pouze neopakovatelny ciselnik, vcetne tech cilovych subtagu
      // pouze pokud je pole v marc definovane (muze byt i prazdne)
      if (c.setMarc && marc && marc[c.tag] && (marc[c.tag][c.field] !== undefined)) {
        // 13.09.18 on; pokud se z ciselniku predala honodta '', ma se udaj smazat - nefunguje pro opakovatelna pole
        if (marc[c.tag][c.field] === '\'\'') {
          marc[c.tag][c.field] = '';
        }
        c.setMarc(marc);
      }
    }
  },
  /*
   * 25.06.19 on; osetri kotvy
   */
  csFixAnchor : function(psTitle) {
    if (psTitle && psTitle.strswap && (psTitle.indexOf('\"ANCH') >= 0)) {
      var c = Ext.getCmp('tabPanelForms');
      if (c && c.ownerCt && c.ownerCt.nTabCount) {
        psTitle = psTitle.strswap('\"ANCH', '\"ANCH' + c.ownerCt.nTabCount);
      }
    }
    return psTitle;
  }
});

Ext.reg('epca.marc_fieldset', epca.form.FieldSet);
