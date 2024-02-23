/**
 * 17.12.20 on; pokus zamezit odskoku nahoru - skoci na nove pole
 * 09.01.19 on; vraceny layout table
 * 18.12.19 on; zmena layoutu
 * 10.02.17 on; uprava vymazu fieldsetu
 * 25.01.17 on; uprava csSetDefaultValues
 * 13.07.16 on; zamykani i pro opakovani podpoli
 * 11.07.16 on; cislovani fieldsetu
 * 11.05.16 on; osetreno padani
 * 27.04.16 on; osetreno padani
 * 24.03.16 on; oprava poradi poli pri +
 * 23.03.16 on; uprava dotazeni defaultu
 * 18.02.16 on; predelane kvuli velkym formularum
 * 29.11.12 on; osetrena chyba v getMarc
 * 23.05.12 on; oprava chyby
 * 23.01.12 on; rozsireni setMarc
 * Opakovatelne komponenta (tabulka -> item, - , +)
 * Klonuje nastaveny prvok - item
 *
 */

/*global epca, Ext, i3, setTimeout*/

Ext.ns('epca.form');
Ext.ns('epca.form.RepEnc');

epca.form.RepEnc.c = {
  columns : 5,
  iconUp : 'icon-up',
  iconDown : 'icon-down'
};

epca.form.RepeatableEncapsulation = Ext.extend(Ext.Panel, {

  // init component config
  tag : undefined,
  field : undefined,

  item : undefined,
  minCount : 1,
  maxCount : undefined,

  isDisabled : false,

  constructor : function(config) {
    var i;
    config = config || {};
    Ext.apply(config, {
      border : false,
      header : false,
      // 09.01.20 on; vraceno table
      // TODO: 18.12.19 on; zmena layoutu - jeste musim probrat s tt
      layout : 'table',
      //layout: 'column',
      layoutConfig : {
        columns : epca.form.RepEnc.c.columns // 12.08.15 on; 3 -> 5
      },
      defaults : {
        style : 'margin:0px 0px 2px 0px' // velmi neupravovat
      },
      listeners : {
        resize : this.csSetItemWidth,
        // 08.02.16 on; toto je tu kvuli kodovanym udaju
        afterlayout : function() {
          var nWidth;
          // 11.05.16 on; try catch
          try {
            nWidth = this.getWidth();
          } catch(ignore) {
          }

          this.csSetItemWidth(this, null, null, nWidth);
        }
      }
    });

    if (config.disabled && config.disabled === true) {
      config.disabled = false;
      this.isDisabled = true;
    }

    // 30.10.15 on;
    this.onlyMinusBtn = config.onlyMinusBtn;

    // 15.12.15 on;
    //if (config.minCount) {
    // prevod stringu na cislo
    //this.minCount = parseInt(config.minCount, 10);
    config.minCount = config.minCount ? parseInt(config.minCount, 10) : 1;
    //}

    if (config.item) {
      config.tag = config.item.tag;
      config.field = config.item.field;
      config.item.disabled = this.isDisabled;

      for ( i = 0; i < this.minCount; i++) {
        config['items'] = [epca.cloneObject(config.item), this.getButtonPlus(), this.getButtonMinus(), this.getButtonUp(), this.getButtonDown()];
      }
    }

    epca.form.RepeatableEncapsulation.superclass.constructor.call(this, config);

    // 12.08.15 on; aktualizuje zobrazeni tlacitek up, down
    this.csUpdateUpDownButtons();
  },
  /**
   * Vytvori nove tlacitko +
   */
  getButtonPlus : function() {
    return {
      xtype : 'button',
      iconCls : 'icon-plus',
      disabled : this.isDisabled,
      hidden : this.onlyMinusBtn,
      //style : 'margin-top:5px', // TODO: 18.12.19 on; zmena layoutu - jeste musim probrat s tt
      listeners : {
        click : function(component) {
          // index nejakeho tlacika plus
          var index = this.items.indexOf(component);
          // index na ktory vlozit komponentu
          this.addItem(index + 4, true);
          // 11.07.16 on; je potreba precislovat fieldsety, pokud je nastaveno cislovani
          this.csFieldsetReNumbering();
          // 16.12.15 on; nastavi defaultni hodnoty do noveho opakovani
          this.csSetDefaultValues(index + 4);
          // 17.12.20 on; pokus zamezit odskoku nahoru - skoci na nove pole
          epca.form.Helper.csSetOnFirstFieldInNewFieldset(this, index + 4, 1);
        },
        scope : this
      }
    };
  },
  /**
   * Vytvori nove tlacitko -
   */
  getButtonMinus : function() {
    return {
      xtype : 'button',
      iconCls : 'icon-minus',
      disabled : this.isDisabled,
      //style : 'margin-top:5px', // TODO: 18.12.19 on; zmena layoutu - jeste musim probrat s tt
      listeners : {
        click : function(component) {
          // index nejakeho tlacika minus
          var index = this.items.indexOf(component);
          // index komponenty
          this.removeItem(index - 2);

          // 11.07.16 on; je potreba precislovat fieldsety, pokud je nastaveno cislovani
          this.csFieldsetReNumbering();
        },
        scope : this
      }
    };
  },
  /**
   * Vytvori nove tlacitko -  sipka nahoru
   */
  getButtonUp : function(config) {
    config = config || {};
    return {
      xtype : 'button',
      iconCls : epca.form.RepEnc.c.iconUp,
      csIndex : 3,
      disabled : this.isDisabled,
      hidden : !config.csShowBtn, // 14.04.16 on; nastaveni pres parametr
      //style : 'margin-top:5px', // TODO: 18.12.19 on; zmena layoutu - jeste musim probrat s tt
      listeners : {
        click : {
          fn : this.csBtnUpDownHandler,
          scope : this
        }
      }
    };
  },
  /**
   * Vytvori nove tlacitko -  sipka dolu
   */
  getButtonDown : function(config) {
    config = config || {};
    return {
      xtype : 'button',
      iconCls : epca.form.RepEnc.c.iconDown,
      csIndex : 4,
      disabled : this.isDisabled,
      hidden : !config.csShowBtn, // 14.04.16 on; nastaveni pres parametr
      //style : 'margin-top:5px', // TODO: 18.12.19 on; zmena layoutu - jeste musim probrat s tt
      listeners : {
        click : {
          fn : this.csBtnUpDownHandler,
          scope : this
        }
      }
    };
  },
  csBtnUpDownHandler : function(component) {
    var oMarc,
        oMarc2,
        index,
        c,
        c2;
    if (component.iconCls === epca.form.RepEnc.c.iconUp) {
      // UP
      // index tlacika
      index = this.items.indexOf(component);
      // index komponenty
      index = index - component.csIndex;
      c = this.get(index);
      oMarc = c.getMarc();
      c2 = this.get(index - epca.form.RepEnc.c.columns);
      oMarc2 = c2.getMarc();
      c2.clearFields();
      c2.setMarc(oMarc);
      c.clearFields();
      c.setMarc(oMarc2);
    } else {
      // DOWN
      // index tlacika
      index = this.items.indexOf(component);
      // index komponenty
      index = index - component.csIndex;
      c = this.get(index);
      oMarc = c.getMarc();
      c2 = this.get(index + epca.form.RepEnc.c.columns);
      oMarc2 = c2.getMarc();
      c2.clearFields();
      c2.setMarc(oMarc);
      c.clearFields();
      c.setMarc(oMarc2);
    }
    // 12.08.15 on; aktualizuje zobrazeni tlacitek up, down
    this.csUpdateUpDownButtons();

    var tab = epca.WsForm.csGetActiveTab();
    // 19.07.16 on; tab nemusi existovat - napr. formular v popup okne
    if (tab) {
      tab.fireEvent('form_changed', this, tab);
    }
  },
  /**
   * Pridanie noveho riadku
   * @param {Object} index index polozky
   */
  addItem : function(index, pbDoLayout) {
    var nWidth;

    if (this.maxCount && this.maxCount === (this.items.getCount() / epca.form.RepEnc.c.columns)) {
      return;
    }

    var newItem = epca.cloneObject(this.item);

    // 14.12.15 on; pokud nezadam nic, vlozi se na konec
    if (index === undefined) {
      //index = this.items.length;
      // 14.04.16 on; pokud nejde o podpole, zobrazim tam zrovna vsechny tlacitka
      this.add([newItem, this.getButtonPlus(), this.getButtonMinus(), this.getButtonUp({
        csShowBtn : i3.isEmptyString(newItem.field)
      }), this.getButtonDown({
        csShowBtn : i3.isEmptyString(newItem.field)
      })]);
    } else {
      this.insert(index, newItem);
      //this.items.items[index].doLayout();
      this.insert(index + 1, this.getButtonPlus());
      this.insert(index + 2, this.getButtonMinus());
      this.insert(index + 3, this.getButtonUp());
      this.insert(index + 4, this.getButtonDown());
     //this.insert(index, [newItem, this.getButtonPlus(), this.getButtonMinus(), this.getButtonUp(), this.getButtonDown()]);
    }

    //this.doLayout();
    //this.forceLayout = true;
    this.doLayout();
    //this.ownerCt.forceLayout = true;
    //this.ownerCt.doLayout();
    
    // pri vetsim mnozstvi pridavanych prvku je lepsi, kdyz to bude bude volat az po pridani vsech
    if (pbDoLayout) {
      // 24.03.16 on; musi to tu byt, aby se pridavane pole nezaradilo na konec, ale za aktualni pole
      if (this.layout.renderAll) {
        //var start = new Date().getTime();
        // 09.01.20 on; vraceno
        // TODO: 18.12.19 on; zmena layoutu - jeste musim probrat s tt
        this.layout.renderAll(this, this.getEl());
        //this.layout.renderAll(this, this.items.items[index].getEl());
        //this.onLayout(this, this.getEl());
        //this.layout.layout();

        //var end = new Date().getTime();
        //var time = end - start;
        //alert('Execution time: ' + time + ' ms');
      }

      // 12.08.15 on; aktualizuje zobrazeni tlacitek up, down
      this.csUpdateUpDownButtons();
      // 08.02.16 on; nastaveni sirky podle zobrazenych tlacitek
      // 11.05.16 on; try catch
      try {
        nWidth = this.getWidth();
      } catch(ignore) {
      }
      this.csSetItemWidth(this, null, null, nWidth);
    }
  },
  /**
   * Odstrani riadok
   * @param {Object} index
   */
  removeItem : function(index) {
    var tab = epca.WsForm.csGetActiveTab(),
        nWidth;
    if (this.minCount === (this.items.getCount() / epca.form.RepEnc.c.columns)) {
      // 10.02.17 on; pri kliknuti na tlacitko "-" potrebuju odstranit z pole i vsechny vnorene opakovatelne fieldsety (treti parametr)
      // 30.08.13 on; pokud jde o posledni vyskyt pole, smaze jeho obsah
      this.clearFieldContent(index, undefined, true);

      // 19.07.16 on; podminka
      // 22.01.16 on; vyvola udalost
      if (tab) {
        tab.fireEvent('form_changed', this, tab);
      }

      return;
    }

    this.remove(this.items.items[index + 4]);
    this.remove(this.items.items[index + 3]);
    this.remove(this.items.items[index + 2]);
    this.remove(this.items.items[index + 1]);
    this.remove(this.items.items[index]);
    // 12.08.15 on; aktualizuje zobrazeni tlacitek up, down
    this.csUpdateUpDownButtons();

    // 08.02.16 on; nastaveni sirky podle zobrazenych tlacitek
    // 11.05.16 on; try catch
    try {
      nWidth = this.getWidth();
    } catch(ignore) {
    }
    this.csSetItemWidth(this, null, null, nWidth);

    // 19.07.16 on; podminka
    // 22.01.16 on; vyvola udalost
    if (tab) {
      tab.fireEvent('form_changed', this, tab);
    }
  },
  /**
   * ked enkapsuluje kodovany komponent
   * podobna funknost ako getMarc: function() v codovanom fieldsete
   * returnuje iba string !!!
   */
  getCodedData : function() {
    var retVal = '',
        i;

    for ( i = 0; i < this.items.length; i += epca.form.RepEnc.c.columns) {
      retVal += (this.get(i)).getCodedData();
    }

    return retVal;
  },
  /**
   * ked enkapsuluje kodovany komponent
   * podobna funknost ako setMarc: function() v codovanom fieldsete
   * @param {Object} codedData string hodnota
   */
  setCodedData : function(codedData) {
    var itemsCount,
        i,
        startIndex;
    // troska to zefektivnit, potom pridavanie prvkov je drahe
    this.removeAll();
    itemsCount = (this.valueLength) ? parseInt(codedData.length / this.valueLength, 10) : 1;

    for ( i = 0; i < Math.max(this.minCount, itemsCount); i++) {
      this.addItem(i * epca.form.RepEnc.c.columns, true);
    }
    startIndex = 0;
    for ( i = 0; i < Math.max(this.minCount, itemsCount) * epca.form.RepEnc.c.columns; i += epca.form.RepEnc.c.columns) {
      this.get(i).setCodedData(codedData.substring(startIndex, startIndex + this.valueLength));
      startIndex += this.valueLength;
    }
  },
  /**
   * Vrati hodnotu marc
   * @param {Object} marc
   */
  getMarc : function(marc, bSkipDefaultValue) {
    var retVal = {},
        i,
        val,
        value;

    for ( i = 0; i < this.items.length; i += epca.form.RepEnc.c.columns) {
      // 07.08.15 on; kontejner
      if (!this.field && !this.tag) {
        value = (this.get(i).getMarc(undefined, bSkipDefaultValue));
      } else {
        // 16.12.15 on; bSkipDefaultValue
        value = (this.get(i).getMarc(undefined, bSkipDefaultValue))[this.field || this.tag];
      }

      if (epca.isEmpty(value) && (this.tag !== undefined) && (this.field === undefined)) {
        // 29.11.12 on; osetrena chyba
        val = epca.form.Helper.getMarcValue(marc, {
          'tag' : this.tag,
          'field' : this.field
        });
        if (val) {
          val = val[i / epca.form.RepEnc.c.columns];
        }
        epca.processMarcValue(retVal, this.tag, val);
      } else {
        epca.processMarcValue(retVal, this.field || this.tag, value);
      }
    }
    return retVal;
  },
  /**
   * Nastavi marc, ak obsahuje viac poloziek, automaticky sa vytvori prislusny pocet riadkov
   * @param {Object} marc
   * @param {Object} convert
   * @param {Object} convertGroup
   * @param {Object} db nazev DB, ze ktere se zaznam dotahuje
   */
  setMarc : function(marc, convert, convertGroup, db, selectedRecord) {
    var sTag,
        value;

    // 30.10.15 on; zatim nedovolim opakovatelny kontejner (resp. nefunguje to s nim), ale musim aspon takto dovolit
    //              kontejner s minusem
    if (this.item.csContainer && this.item.minusBtn) {
      this.get(0).setMarc(marc, convert, convertGroup, db, selectedRecord);
      return;
    }

    // 02.09.15 on; zapouzdreny kontejner sice muze obsahovat ruzna pole, ale budu zatim predpokladat,
    //              ze jde pouze o pole z jednoho tagu (zatim jiny opakovatelny pripad nemam)
    if (this.item.csContainer) {
      sTag = this.item.items[0].tag;
    } else {
      sTag = this.tag;
    }

    // 01.10.15 on; nacte ZF
    if (epca.form.Helper.csIsDFSMethod(this.convertMap, convertGroup)) {
      // 01.10.15 on; vlozeno do funkce
      epca.form.Helper.csGetDFValue(this.convertMap, convertGroup, selectedRecord, sTag, this.csSetMarc0, this);
      return;
    }

    value = epca.form.Helper.getMarcValue(marc, {
      'db' : db, // 23.01.12 on;
      'tag' : sTag,
      'field' : this.field,
      'convert' : convert,
      'group' : convertGroup,
      'map' : this.convertMap,
      'selectedRecord' : selectedRecord
    });

    // 01.10.15 on; vlozeno do funkce
    this.csSetMarc0(value, sTag);
  },
  /*
   * 01.10.15 on;
   */
  csSetMarc0 : function(value, psTag) {
    var n,
        nLength,
        nNewItems,
        i,
        bAdded = false;

    // 07.09.15 on; zmena
    if (!value) {
      //return;
      value = [''];
    }

    if (!Ext.isArray(value)) {
      value = [value];
    }

    // 13.07.16 on; je potreba nejak osetrit situaci, kdy je na formulari pouze jedno neopakovatelne pole
    //              a to obsahuje opakovatelne subtagy, potom zadny semafor nevznikne a skonci pred nacteni udaju do formulare
    // 18.02.16 on; poznacim, ze jdu pridavat opakovani tagu
    if (epca.semafor) {
      if (i3.isEmptyString(this.field)) {
        // tag
        epca.semafor[psTag] = true;
      } else {
        // subtag  // 13.07.16 on; pridane
        epca.semafor[psTag + this.field] = true;
      }
    }

    // 17.02.16 on; zrusene, budu odebirat nebo pridavat jenom potrebny pocet, viz. nize
    // troska to zefektivnit, potom pridavanie prvkov je drahe
    //this.removeAll();

    // 02.09.15 on; pokud jde o kontejner, vyberu jenom ta opakovani pole, ktera maji aspon jeden subtag z fieldsetu vyplneny - hruza!
    if (this.item.csContainer) {
      value = this.csSelectOnlyContainerItems(value);
    }

    nLength = value.length;
    if (epca.Config.User.AddNewFieldsetRepetition && (this.item.xtype === 'epca.marc_fieldset') && this.item.repeatable && !this.item.csContainer) {
      // vynecham nove zaznamy - tam muzou byt defaulty
      // zatim to necham pro vsehcny opakovatelne tady
      // a obsahuje componentu s linkem na zaznam
      if (!this.csIsNewRecord() && ((nLength > 1) || !i3.csIsEmptyArrayOfObj(value)/* && this.csContainsLinkedField()*/)) {
        nLength++;

        // 22.03.16 on; zapamatuju si, ze bylo pridano jedno opakovani
        if (nLength > this.minCount) {
          bAdded = true;
        }
      }
    }

    nNewItems = Math.max(this.minCount, nLength);

    // 16.02.16 on; pro vetsi mnozstvi prvku zpusobovalo zamrznuti prohlizece
    /*for ( i = 0; i < nNewItems; i++) {
    this.addItem(i * epca.form.RepEnc.c.columns, false);
    }*/

    //var end, time, start, s = '', start1, end1, start2, time2;

    //var start1 = new Date().getTime();

    n = this.items.length / epca.form.RepEnc.c.columns;

    // 17.02.16 on; pokud ma byt polozek min, odmaze je (nevim, jestli toto nekdy nastane)
    if (nNewItems < n) {
      for ( i = n; i > nNewItems; i--) {
        this.removeItem((i - 1) * epca.form.RepEnc.c.columns);
      }
    }

    (function(scope, pnI, pnNewItems, psTag, psValue, pbAdded) {
      var self = arguments.callee,
          nWidth;

      if (pnI < pnNewItems) {
        //start = new Date().getTime();

        // 04.04.16 on; pouziju add misto insert - je to rychlejsi
        //scope.addItem(pnI * epca.form.RepEnc.c.columns, false);
        scope.addItem(undefined, false);
        pnI++;

        //end = new Date().getTime();
        //time = end - start;
        //s += '; ' + time;

        setTimeout(function() {
          self(scope, pnI, pnNewItems, psTag, psValue, pbAdded);
        }, 1);
      } else {
        //var s = '', total = 0;
        // 24.06.16 on; pridane i kdyz to tu asi nemusi byt, protoze se pole pridavaji postupne za sebe, takze jsou ve spravnem poradi
        //              je to tu spis pro jistotu, zabere to kolem 200ms pri velkem mnoztsi opakovani pole
        if (scope.layout.renderAll) {

          //var start = new Date().getTime();
          scope.layout.renderAll(scope, scope.getEl());
          //var end = new Date().getTime();
          //var time = end - start;
          //total += time;
          //s = 'renderAll time ' + psTag + ': ' + time + ' ms';
          //alert('Execution time '+psTag+': ' + time + ' ms');
        }
        //var end1 = new Date().getTime();
        //var time1 = end1 - start1;
        //total += time1;
        //s += '\ninsert fields time ' + psTag + ': ' + time1 + ' ms';

        //var start = new Date().getTime();
        // 12.08.15 on; aktualizuje zobrazeni tlacitek up, down
        scope.csUpdateUpDownButtons();
        //var end = new Date().getTime();
        //var time = end - start;
        //total += time;
        //s += '\ncsUpdateUpDownButtons time ' + psTag + ': ' + time + ' ms';

        //if (time1 > 1000) {
        //  s += '\nTOTAL: ' + total + ' ms';
        //  alert(s);
        //}

        // 08.02.16 on; nastaveni sirky podle zobrazenych tlacitek
        try {
          nWidth = scope.getWidth();
        } catch(ignore) {
        }
        //var psValueDupl;
        /*if (psValue[0].sta) {
          psValueDupl = [{'sta' : 'misto1','stc' : 'nakladate1'}];
          psValueDupl = JSON.parse(JSON.stringify(psValue));
        } else {
        	psValueDupl = psValue;
        }*/
        //psValueDupl = JSON.parse(JSON.stringify(psValue));
        scope.csSetItemWidth(scope, null, null, nWidth, scope.csSetValues.createDelegate(scope, [pnNewItems, psValue, psTag, pbAdded]));

        /*start = new Date().getTime();
         // naplni prvky hodnotami
         scope.csSetValues(pnNewItems, psValue, psTag, pbAdded);
         end = new Date().getTime();
         time = end - start;
         total += time;
         s += '\ncsSetValues time ' + psTag + ': ' + time + ' ms';*/
      }
    })(this, n, nNewItems, psTag, value, bAdded);
  },
  /**
   * 16.02.16 on; samostatna funkce
   */
  csSetValues : function(pnNewItemsCount, value, psTag, pbLastRepetionAdded) {
    var i,
        sValue,
        marcValue;
    for ( i = 0; i < pnNewItemsCount * epca.form.RepEnc.c.columns; i += epca.form.RepEnc.c.columns) {
      marcValue = {};

      if (this.field) {
        marcValue[this.tag] = {};
        sValue = value[i / epca.form.RepEnc.c.columns];
        marcValue[this.tag][this.field] = sValue;
      } else {
        sValue = value[i / epca.form.RepEnc.c.columns];
        marcValue[psTag] = sValue;
      }

      // 16.12.15 on; pouze v pripade, kdy je neco definovane - aby se neprepisovaly def. hodnoty
      if (sValue) {
        this.get(i).setMarc(marcValue);
      } else {
        // 22.03.16 on; toto je tu divne, nejradsi bych to uplne zakazal, vkladat do ecistujici zaznamu nejake defaulty
        //              pouze v pripade, kde bylo pridano pres nastaveni AddNewFieldsetRepetition nove opakovani, doplni defaulty
        // 16.12.15 on; nastavi defaultni hodnoty do noveho opakovani
        //this.csSetDefaultValues(i, true);
        if (pbLastRepetionAdded && ((i + epca.form.RepEnc.c.columns) >= (pnNewItemsCount * epca.form.RepEnc.c.columns))) {
          this.csSetDefaultValues(i, true);
        }
      }
    }

    // 13.07.16 on; je potreba nejak osetrit situaci, kdy je na formulari pouze jedno neopakovatelne pole
    //              a to obsahuje opakovatelne subtagy, potom zadny semafor nevznikne a skonci pred nacteni udaju do formulare
    // 18.02.16 on; poznacim, ze jsem skoncil s pridavanim opakovani tagu
    if (epca.semafor) {
      if (i3.isEmptyString(this.field)) {
        // tag
        epca.semafor[psTag] = false;
      } else {
        // subtag    // 13.07.16 on;
        epca.semafor[psTag + this.field] = false;
      }
    }
  },
  /**
   * projde vsechny items a zjisti, jestli obsahuji linkovane pole
   */
  /*csContainsLinkedField : function() {
  var i, o, sType;
  o = this.item.items;
  for ( i = 0; i < o.length; i++) {
  if (o[i].item) {
  sType = o[i].item.xtype;
  } else {
  sType = o[i].xtype;
  }
  if ((sType === 'cs_auth_select_form') || (sType === 'epca.marc_search_combobox')) {
  return true;
  }
  }
  return false;
  },*/
  /**
   * Nastavenie nadpisu
   * @param {Object} titles
   */
  setPropertyTitle : function(titles) {
    var i;
    // ak je opakovatelny field
    if (this.field !== undefined) {
      // 25.10.11 on; preda uzivatelsky nazev pole
      if (this.label) {
        this.label.update(epca.form.Helper.findTitle(titles, this.tag + epca.formatFieldId(this.field, this.position, this.dataLength), this));
      } else
      // 14.10.15 on; opakovatelne kodovane udaje
      if (this.item.xtype === 'epca.codeddata_fieldset') {
        for ( i = 0; i < this.items.length; i += epca.form.RepEnc.c.columns) {
          this.get(i).setPropertyTitle(titles);
        }
      }
      return;
    }

    // ak je opakovatelny tag
    for ( i = 0; i < this.items.length; i += epca.form.RepEnc.c.columns) {
      // 01.07.16 on; preda poradi fieldsetu
      this.get(i).setPropertyTitle(titles, (i / epca.form.RepEnc.c.columns) + 1);

      // u objektu this.item a jeho prvkum nastavi spravne nazvy, protoze tento objekt (this.item) se pouziva pro duplikovani poli
      // jinak by bylo u kopii poli a podpoli defaultni nazvy
      //this.item nie je komponenta !!!
      this.setPropertyTitleToItem(titles);
    }

  },
  /**
   * Nastavenie nadpisu vnorenym polozkam
   * @param {Object} titles
   */
  setPropertyTitleToItem : function(titles) {
    var i;
    this.item.title = epca.form.Helper.findTitle(titles, this.tag, this.item);

    for ( i = 0; i < this.item.items.length; i++) {
      // 15.10.15 on; vyjimka pro kodovane udaje, tam je nezadouci nastavovat fieldLabel
      if (this.item.items[i].xtype !== 'epca.codeddata_fieldset') {
        this.item.items[i].fieldLabel = epca.form.Helper.findTitle(titles, this.tag + this.item.items[i].field, this.item.items[i]);
      }
    }
  },
  /**
   * Znefunkcnenie poloziek, ak nacitame neuplny zaznam
   * @param {Object} marc
   */
  disableFields : function(marc) {
    if (!Ext.isEmpty(marc[this.tag]) && (this.items.length !== 0)) {

      var i;
      // 02.09.15 on; zakaze jenom fiedlsety - tlacitka necha povolene
      /*for ( i = 0; i < this.items.length - 2; i++) {// posledne '+' chceme nechat enabled
       this.get(i).setDisabled(true);
       }
       this.get(i + 1).setDisabled(true);*/
      for ( i = 0; i < this.items.length; i += epca.form.RepEnc.c.columns) {
        this.get(i).setDisabled(true);
      }
    }
  },
  validate : function() {
    var i,
        bValid = true;
    for ( i = 0; i < this.items.length; i += epca.form.RepEnc.c.columns) {
      if ((this.get(i)).validate() !== true) {
        bValid = false;
      }
    }

    return bValid;
  },
  // 11.08.11 on; smaze obsah poli
  clearFields : function(pbRemoveRepeatedFieldsets) {
    // 03.12.15 on; predelane
    /*this.removeAll();
     // vsechny smaze a prida jedno opakovani
     this.addItem(0);*/

    var bAddDefault,
        bPoleNavic;

    bPoleNavic = (this.items.length / epca.form.RepEnc.c.columns) > this.minCount;

    var i;
    for ( i = (this.items.length - epca.form.RepEnc.c.columns); i > 0; i -= epca.form.RepEnc.c.columns) {
      // 22.03.16 on; jen pro posledni opakovani (pvni volani - jdu od konce) dovolim vlozeni defaultu
      // 17.02.16 on; nebudu odstranovat zadny prvek - dlouho to trva pri ulozeni zaznamu (hlavne pak trva opetovne pridavani prvku)
      if (pbRemoveRepeatedFieldsets) {
        this.removeItem(i);
      }

      // defaulty tam vlozi jenom v pripade, kdy jde o posledni opakovani pole, ktere je navic pridane oproti definici
      bAddDefault = bPoleNavic && (i === (this.items.length - epca.form.RepEnc.c.columns));
      this.clearFieldContent(i, bAddDefault);
    }

    this.clearFieldContent();
  },
  /**
   * Smaze obsah posledniho pole
   *
   * pbRemoveRepeatedFieldsets .. moznost smazat opakovatelne fieldsety
   */
  clearFieldContent : function(index, pbSetDefaults, pbRemoveRepeatedFieldsets) {
    index = index || 0;
    // smazat pole (tlacitka mazat nemusi)
    var c;
    c = this.get(index);

    if (c) {
      // 10.02.17 on; predam si parametr, ze jde u rucni vymaz a maji se smazat opakovatelne fieldsety
      c.clearFields(pbRemoveRepeatedFieldsets);
    }

    // 22.03.16 on; defaulty dovoli jenom pro posledni opakovani
    // 16.12.15 on; nastavi defaultni hodnoty do smazaneho pole
    if (pbSetDefaults) {
      this.csSetDefaultValues(index);
    }
  },
  // 12.08.15 on;  aktulizuje  stav  tlacitek up,  down
  csUpdateUpDownButtons : function() {
    var i,
        c1,
        c2;

    // zatim zakazu pro opakovatelne podpole - muselo by se doresit
    if (this.field) {
      return;
    }

    for ( i = 0; i < this.items.length; i += epca.form.RepEnc.c.columns) {
      // up
      c1 = this.get(i + 3);
      c1.setVisible(i >= epca.form.RepEnc.c.columns);

      // down
      c2 = this.get(i + 4);

      c2.setVisible(i < (this.items.length - epca.form.RepEnc.c.columns));

      // standard
      c1.setIconClass(epca.form.RepEnc.c.iconUp);
      c2.setIconClass(epca.form.RepEnc.c.iconDown);

      // pokud je viditelny jenom down button, zmenim ho na down
      if (c1.hidden && !c2.hidden) {
        c1.setIconClass(epca.form.RepEnc.c.iconDown);
        c1.setVisible(true);
        c2.setVisible(false);
      }
    }
  },
  /// vrati pocet zabalenych poli
  csGetCount : function() {
    return this.items.length / epca.form.RepEnc.c.columns;
  },
  /// vrati poadovane pole
  csGetItem : function(n) {
    n = epca.form.RepEnc.c.columns * n;
    return this.get(n);
  },
  csSelectOnlyContainerItems : function(pValue) {
    var i,
        j,
        oValue1,
        prop,
        bFound,
        o,
        retVal = [];
    // prres vsechny opakovani tagu v zaznamu
    for ( i = 0; i < pValue.length; i++) {
      oValue1 = pValue[i];
      bFound = false;
      // zjistim, jestli je aspon subtag ve fieldsetu na formulare
      for (prop in oValue1) {
        if (oValue1.hasOwnProperty(prop)) {
          for ( j = 0; j < this.item.items.length; j++) {
            o = this.item.items[j];
            if (o.field === prop) {
              bFound = true;
              break;
            }
          }
          if (bFound) {
            break;
          }
        }
      }
      if (bFound) {
        retVal.push(oValue1);
      }
    }
    return retVal;
  },
  /**
   * Nastavi deafultni hodnoty do noveho opakovani - to se pak prepise pozdejc.
   */
  csSetDefaultValues : function(index, bSetDefaultFlag) {
    // 25.01.17 on; zrusena podminka pro tag, defaulty muze obsahovat i kontejner
    // 24.01.17 on; zrusena nutnost AddNewFieldsetRepetition, musi fungovat, i kdyz uzivatel nepouziva toto nastaveni
    //if ((this.item.xtype !== 'epca.marc_fieldset') || !this.item.repeatable || !this.tag || !epca.Config.User.AddNewFieldsetRepetition) {
    //if ((this.item.xtype !== 'epca.marc_fieldset') || !this.item.repeatable || !this.tag) {
    if ((this.item.xtype !== 'epca.marc_fieldset') || !this.item.repeatable) {
      return;
    }

    var values,
        c,
        form,
        actTab = epca.WsForm.csGetActiveTab();
    // napr. v designeru
    if (!actTab) {
      return;
    }

    form = actTab.form;
    if (!form) {
      return;
    }

    var defaultValues = epca.cloneObject(form.defaultValues);
    epca.WsForm.csSwapDefaultValues(defaultValues);
    c = this.get(index);
    if (c) {
      // 23.03.16 on; kvuli tomu, ze defaultni hodnota muze byt opakovatelny tag, tak tu musim vybrat jenom prvni opakovani
      if (!i3.isEmptyString(c.tag)) {
        values = defaultValues[c.tag];
        if (Ext.isArray(values)) {
          defaultValues[c.tag] = values[0];
        }
      }
      c.setMarc(defaultValues);
      if (bSetDefaultFlag) {
        c.csIsDefault = true;
      }
    }
  },
  /**
   * vrati jestli jde o novy zaznam
   */
  csIsNewRecord : function() {
    var actTab = epca.WsForm.csGetActiveTab();
    // napr. v designeru
    if (!actTab) {
      return true;
    }
    return (i3.isEmptyString(actTab.recordId) || (actTab.recordId === 'new'));
  },
  /**
   * Vypocte velikost vstupniho prvku
   */
  csSetItemWidth : function(cmp, a, b, nWidth, csCallback) {
    var n,
        i,
        nMax;
    // 05.04.16 on; nebudu resit ani skryte polozky
    // pouze pokud neni nastavena pevna velikost
    if (cmp.hidden || !i3.isEmptyString(cmp.item.width) || !nWidth) {
      // musim zavolat funkci pro nacteni hodnot do pole
      if (csCallback) {
        csCallback();
      }
      return;
    }

    try {
      nMax = 0;
      for ( i = 0; i < this.items.length; i += epca.form.RepEnc.c.columns) {
        n = cmp.items.items[i + 1].getWidth() + cmp.items.items[i + 2].getWidth() + cmp.items.items[i + 3].getWidth() + cmp.items.items[i + 4].getWidth();
        // 01.04.16 on; pokud se cislo nezvetsuje, tak neni potreba pokracovat
        if (n === nMax) {
          break;
        }
        if (n > nMax) {
          nMax = n;
        }
      }
    } catch(err) {
      // pokud se nedari zjistit velikost, konec
      // musim zavolat funkci pro nacteni hodnot do pole
      if (csCallback) {
        csCallback();
      }
      return;
    }

    if (!i3.isEmptyString(cmp.field)) {
      // pri vetsim poctu opakovani zamrzne prohlizec - predelane
      for ( i = 0; i < this.items.length; i += epca.form.RepEnc.c.columns) {
        //
        cmp.items.items[i].setWidth(nWidth - nMax);
      }
      if (csCallback) {
        csCallback();
      }

    } else {
      (function(scope, cmp, pnI, pnWidth) {
        var self = arguments.callee;

        // 14.04.16 on; lepsi je zmena od vrchu formulare
        // budu to menit od konca, aby to lip vypadalo
        //if (pnI >= 0) {
        if (pnI < scope.items.length) {
          cmp.items.items[pnI].setWidth(pnWidth);
          pnI += epca.form.RepEnc.c.columns;

          setTimeout(function() {
            self(scope, cmp, pnI, pnWidth);
          }, 1);
        } else {
          if (csCallback) {
            //var end = new Date().getTime();
            //var time = end - start;
            //if (time > 5000) {
            //  alert('csSetItemWidth time: ' + time + ' ms');
            //}
            //start = new Date().getTime();

            csCallback();
          }
        }
      })(this, cmp, 0, nWidth - nMax);
    }
  },
  /*
   * 11.07.16 on; je potreba precislovat fieldsety, pokud je nastaveno cislovani
   */
  csFieldsetReNumbering : function() {
    var i,
        c,
        sTitle,
        s;

    // pouze pro opakovatelne pole - fieldsety
    if (this.field) {
      return;
    }

    // pokud nazev pole neobsahuje '%NUMBER%', neni treba nic delat
    sTitle = this.item.title;
    if (!sTitle || !sTitle.strswap || (sTitle.indexOf('%NUMBER%') < 0)) {
      return;
    }

    for ( i = 0; i < this.items.length; i += epca.form.RepEnc.c.columns) {
      // up
      c = this.get(i);
      if (c) {
        s = sTitle;
        // 01.07.16 on; nahradi %NUMBER% za poradi opakovani fieldsetu
        s = c.csFixFieldsetNumbering(s, (i / epca.form.RepEnc.c.columns) + 1);
        c.setTitle(s);
      }
    }
  }
});
Ext.reg('epca.repeatable_encapsulation', epca.form.RepeatableEncapsulation);
