/**
 *
 * 07.01.21 on; icon-error-epca
 * 20.05.16 on; zmena volani convertToObject
 * 20.07.11 on; doplneno nastaveni zkracene ZF podle vybrane DB
 *
 *
 * Vyhladavaci ComboBox
 * Priklad pouzitia:
 {
 xtype: 'epca.evidence_search_combobox',
 fieldLabel: 'Personal name',
 tag: '200',
 field: 'b',
 db: epca.Config.dbAuth,
 index: '1',		// '1': 'Autorské údaje' -> umb_config.json
 fmt: 'LINEMARC', // 'UNA_BASIC'
 width: 400
 }
 *
 */
/*global Ext,i3,epca,document,window */
Ext.ns('epca.evidence');

epca.evidence.SearchComboBox = Ext.extend(Ext.form.ComboBox, {

  typeAhead : false,
  loadingText : 'Vyhľadávam...',
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
  minQueryLength : 3,

  convertMap : undefined,

  constructor : function(config) {
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
  setDb : function(db, fmt) {
    this.db = db;
    this.store.baseParams.db = this.db;

    // 04.11.15 on; moznost predat zkraceny ZF
    if (fmt !== '') {
      this.fmt = fmt;
    } else {
      // 20.07.11 on; nastavi zkraceny ZF
      this.fmt = epca.UnFormat.getSDFName(db);
    }
    this.store.baseParams.fmt = this.fmt;
  },
  listeners : {
    beforequery : function() {
      if (this.getValue() && this.getValue().length > this.minQueryLength) {

        this.store.setSearchQuery({
          1 : this.index, //'1',
          5 : '1' // 05.09.11 on; zmena z 4 na 5 = truncation
        }, this.getValue());

        //this.store.baseParams.query = "@attr 1=1 @attr 5=1 @attr 4=1 '" + this.getValue() + "'";
        this.store.load({
          add : false
        });

        return false;
      }
    },
    select : function(combo, record) {
      i3.WS.getRecord({
        classn : this.db,
        fmt : 'LINEMARC',
        t001 : record.data.t001,
        success : function(selectedRecord) {
          // 20.05.16 on; zmena
          //epca.convertToObject(selectedRecord.data, epca.Config.getUnFormat(this.db));
          epca.convertToObject(selectedRecord.data, epca.Config.getDbFormat(this.db));
        },
        failure : function(errmsg) {
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
  }
});

Ext.reg('epca.evidence_search_combobox', epca.evidence.SearchComboBox);
