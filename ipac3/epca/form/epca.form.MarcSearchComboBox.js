/**
 * Vyhladavaci ComboBox
 *
 * 08.11.22 on; konfigurace se bude brat z hlavniho vyhledavani tzn. nastaveni je spolecne a je potreba, aby v hlavnim vyhledavani byla db definovana
 * 07.01.21 on; icon-error-epca
 * 12.02.20 on; csDoFnAfterLinkToRecord
 * 04.01.17 on; rozsireni funkce clearFields
 * 19.07.16 on; formular nemusi byt v tabu
 * 20.05.16 on; uprava volani convertToObject
 * 05.03.14 on; rozsirena validace
 * 24.01.12 on; opravene PB v opakovatelnem poli
 * 23.01.12 on; rozsireni setMarc
 *
 *
 * Priklad pouzitia:
 {
 xtype: 'epca.marc_search_combobox',
 fieldLabel: 'Personal name',
 tag: '200',
 field: 'b',
 db: epca.Config.dbAuth,
 index: '1',		// '1': 'Autorské údaje' -> umb_config.json
 fmt: 'LINEMARC', // 'UNA_BASIC'
 width: 400
 }
 */
/*global epca, Ext, i3*/

Ext.ns('epca.form');

/**
 * Vyhladavaci combobox
 */
epca.form.SearchComboBox = Ext.extend(Ext.form.ComboBox, {

  typeAhead : false,
  loadingText : epca.L10n.titleSearching,
  hideTrigger : true,
  pageSize : 15,
  itemSelector : 'div.search-item',
  tpl : new Ext.XTemplate('<tpl for="."><div class="search-item"><p>{data}</p></div></tpl>'),

  //new variables
  tag : '700',
  field : 'a',
  db : '', //epca.Config.User.dbAuth,
  index : '1',
  fmt : 'UNA_BASIC',
  minQueryLength : 1,

  convertMap : undefined,

  // v pripade ze obsah vyhladavacieho pola nie je validny, je potrebne nastavit hodnotu premennej 'isValid' na false
  customCode : 'isValid = true',

  constructor : function(config) {
    config = config || {};

    // 29.02.16 on; zmena nazvu promenny v designeru
    if (!config.db && config.search_db) {
      config.db = config.search_db;
    }

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
      }
    });

    Ext.apply(config, {
      store : new i3.WS.StoreSearch({
        autoLoad : false,
        root : 'records',
        totalProperty : 'hits',
        baseParams : {
          db : config.db,
          fmt : config.fmt || this.fmt,
          from : 1,
          to : this.pageSize
        },
        listeners : {
          beforeload : {
            fn : function(store, options) {
              if (options.params.start) {
                store.baseParams.from = options.params.start + 1;
                store.baseParams.to = options.params.start + this.pageSize;
              } else {
                store.baseParams.from = 1;
                store.baseParams.to = this.pageSize;
              }
            },
            scope : this
          }
        }
      })
    });

    epca.form.SearchComboBox.superclass.constructor.call(this, config);
  },

  setDb : function(db) {
    this.db = db;
    this.store.baseParams.db = this.db;
  },

  listeners : {
    beforequery : function() {
      var limits = '',
          comboDbBox,
          n,
          record;

      if (this.getValue() && this.getValue().length > this.minQueryLength) {
        // 08.11.22 on; konfigurace se bude brat z hlavniho vyhledavani tzn. nastaveni je spolecne a je potreba, aby v hlavnim vyhledavani byla db definovana 
        comboDbBox = Ext.ComponentMgr.get('topDbSelect');
        n = comboDbBox.store.findExact('id', this.db);
        if (n >= 0) {
          record = comboDbBox.store.getAt(n);
          if (record) {
            // moznost zadat limity globalce v konfigu UnDatabases.json
            limits = record.data['limits'];
            if (!i3.isEmptyString(limits)) {
              // vyswapuje definovane retezce za aktualni hodnoty
              limits = i3.csSwapDefaultValues(limits, epca.Config.User.csBranch);
            }
          }
        }

        this.store.setSearchQuery({
          1 : this.index, //'1',
          5 : '1' // // 05.09.11 on; zmena z 4 na 5 = truncation
        }, this.getValue(), limits);

        //this.store.baseParams.query = "@attr 1=1 @attr 5=1 @attr 4=1 '" + this.getValue() + "'";
        this.store.load({
          add : false
        });

        return false;
      }
    },
    select : function(combo, record, index) {
      i3.WS.getRecord({
        classn : this.db,
        fmt : 'LINEMARC',
        t001 : record.data.t001,
        success : function(selectedRecord) {
          // 20.05.16 on; zmena
          //var marc = epca.convertToObject(selectedRecord.data, epca.Config.getUnFormat(this.db));
          var marc = epca.convertToObject(selectedRecord.data, epca.Config.getDbFormat(this.db));

          // 24.01.12 on; opravene PB v opakovatelnem poli
          // 23.01.12 on; predany nazev db
          if (this.ownerCt) {
            if ((this.ownerCt.xtype === 'epca.repeatable_encapsulation') && (this.ownerCt.ownerCt)) {
              this.ownerCt.ownerCt.setMarc(marc, true, this.convertGroup, selectedRecord.classn);
            } else {
              this.ownerCt.setMarc(marc, true, this.convertGroup, selectedRecord.classn);
            }
          }
          // 12.02.20 on; funkce po dotazeni zaznamu (autority) do pole
          var c = Ext.getCmp('tabPanelForms');
          if (c) {
            c.ownerCt.csDoFnAfterLinkToRecord(this, selectedRecord);
          }
        },
        failure : function(errmsg, o) {
          //Ext.example.msg('Error', 'Pri vyhľadávaní záznamu sa vyskytla chyba. ' + errmsg);
          epca.notify("Pri vyhľadávaní záznamu sa vyskytla chyba.: " + errmsg, "Chyba", "icon-error-epca");
        },
        scope : this
      });
    },
    render : function() {
      var wrap = this.el.up('div.x-form-field-wrap');
      this.wrap.applyStyles({
        position : 'relative'
      });
      this.el.addClass('search-combo-input');
      this.flag = Ext.DomHelper.append(wrap, {
        tag : 'div',
        style : 'position:absolute'
      });
      this.flag.className = 'search-combo-icon icon-search';

    }
  },
  getMarc : function() {
    var retVal = {};
    retVal[this.field] = this.getValue();
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
    //if (!Ext.isEmpty(value)) {// (Ext.isEmpty(this.getValue()) || this.overwrite)
    this.setValue(value);
    //}

    // 03.09.15 on; zakaze vsechny prvky na stejne urovni, ktere byly dotazeny - podle convertMap
    epca.form.Helper.csDisableLinkedFields(value, this);
  },
  setPropertyTitle : function(titles) {
    // 25.10.11 on; preda uzivatelsky nazev pole
    if (this.label) {
      this.label.update(epca.form.Helper.findTitle(titles, this.tag + this.field, this));
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

    // 05.03.14 on; zruseno
    /*if (Ext.isEmpty(this.customCode)) {
     return true;
     }*/

    var isValid = true;
    eval(this.customCode);

    // 05.03.14 on; required
    isValid = isValid && bValidReq;

    // 05.03.14 on; pokud validace neprojde, zvyrazni cervene prvek
    if (!isValid) {
      this.markInvalid();
    } else {
      this.clearInvalid();
    }

    return isValid;
  },
  // 26.08.11 on; smaze pole
  clearFields : function() {
    // 04.01.17 on; moznost zakazat vymaz pole pomoci tlacitka '-' u fieldsetu
    if (!this.fldDoNotErase) {
      this.setValue('');
    }
    // 03.09.15 on; povoli vsechny prvky na stejne urovni, ktere byly dotazeny - podle convertMap
    epca.form.Helper.csDisableLinkedFields('', this);
  }
});

Ext.reg('epca.marc_search_combobox', epca.form.SearchComboBox);

