/**
 * 07.01.21 on; icon-error-epca
 * 22.09.20 on; razeni pro 4xx pole
 * 20.03.20 on; defaultni hodnoty
 * 04.02.20 on; kontrola validniho formulare pred ulozenim
 * 16.01.20 on; osetreno zavreni okna
 * 09.12.19 on; uchovam si nastaveni pro 4XX
 * 12.07.19 on; aktualizuje nazvy poli
 * 11.07.19 on; setPropertyTitle
 * 07.08.17 on; PB vyhledavani
 * 28.07.17 on; zfunkcneno pro vlozeny formular
 * 02.03.16 on; zmena nazvu promenne pro nazev formulare
 * 03.09.13 on; rozsahle upravy
 * 30.08.13 on; tlacitko pro vymaz zruseno - bude se pouzivat minus
 * 29.08.13 on; validate
 * 23.01.12 on; rozsireni setMarc
 */
/*global Ext, epca, i3 */

Ext.ns('epca.form');

epca.form.LinkEntry = Ext.extend(Ext.Panel, {

  repeatable : false,

  tag : undefined,
  field : undefined,

  marcValue : undefined,

  constructor : function(config) {
    config = config || {};

    // 02.09.13 on; predelane na dyntrigger
    /*Ext.apply(config, {
     border : false,
     header : false,
     layout : 'hbox',
     layoutConfig : {
     pack : 'start',
     align : 'middle',
     defaultMargins : {
     top : 0,
     bottom : 0,
     left : 0,
     right : 5
     }
     },
     items : [{
     xtype : 'label',
     text : '',
     flex : 1
     }, {
     xtype : 'button',
     text : epca.L10n.txSelect,
     listeners : {
     click : function() {
     var win = new epca.window.LinkEntryDefault({
     db : config.db,
     index : config.index,
     buttons : [{
     text : epca.L10n.messageOK,
     listeners : {
     click : function() {
     this.marcValue = win.getMarc();

     //Ak nema definovane 001 tak sa vytvori novy zaznam do config.db
     this.setLabel();
     this.doLayout();

     win.close();
     },
     scope : this
     }
     }, {
     text : epca.L10n.titleClose,
     listeners : {
     click : function() {
     win.close();
     },
     scope : this
     }
     }]
     });

     win.show();
     if (this.marcValue) {
     win.setMarc(this.marcValue);
     }
     },
     scope : this
     }
     }
     // 30.08.13 on; tlacitko pro vymaz zruseno - bude se pouzivat minus
     //{
     // xtype : 'button',
     // text : epca.L10n.titleDelete,
     /// margins : '0',
     // listeners : {
     // click : function() {
     // this.marcValue = undefined;
     // (this.get(0)).setText('');
     // this.doLayout();
     // },
     // scope : this
     // }
     // }
     ]
     });*/

    Ext.apply(config, {
      layout : 'form',
      border : false,
      header : false,
      items : [{
        xtype : 'dyntrigger',
        triggerClass : 'x-form-search-trigger',
        hideLabel : true,
        anchor : '-0',
        onTriggerClick : this.csLinkEntryOnTrigger.createDelegate(this, [config])
      }]
    });

    epca.form.LinkEntry.superclass.constructor.call(this, config);
    epca.WsTagMap.getLinkEntry('B', this, this.processLinkEntry, this.tag);
  },
  processLinkEntry : function(/*linkEntry*/) {
  },
  /**
   * Seradi zaznam podle seznamu
   * @param {Object} psTagList
   * @param {Object} paRecord
   *
   * 22.09.20 on; razeni pro 4xx pole (prevzato z epca.evidence.EvidencePanel.js a upraveno)
   */
  csRecordSort : function(psTagList, paRecord) {
    function pad(num, size) {
      var s = num + "";
      while (s.length < size) {
        s = " " + s;
      }
      return s;
    }

    var i,
        nResult,
        sLine,
        aPomRecord = [],
        nPos,
        sShift,
        sn,
        sTag,
        aTagOrder;

    if (!psTagList) {
      // ok
      return 0;
    }
    if (!paRecord || !paRecord.st1) {
      // chyba
      return -999;
    }
    
    aTagOrder = psTagList.split('#');
    
    if (!aTagOrder || (aTagOrder.length===0)) {
      return 0;
    }

    for ( i = 0; i < paRecord.st1.length; i++) {
      nResult = -(i + 1);
      sLine = paRecord.st1[i];

      if (i3.isEmptyString(sLine)) {
        continue;
      }

      if (sLine.length < 7) {
        return nResult;
        // exit & lineerr setup
      }

      sTag = sLine.substring(0, 3);
      // 22.09.20 on; toto tu nesmi byt, kdyz ma pole indikator, tak podminka neplati
      /*if (sLine[3] !== ' ') {
        return nResult;
        // exit & lineerr setup
      }*/

      nPos = aTagOrder.indexOf(sTag);
      if (nPos === -1) {
        nPos = 999;
      }
      sShift = pad(nPos, 3);
      sn = pad(i, 4);

      // to ensure proper seq.ordering of tags
      aPomRecord.push(sShift + sLine.substring(0, 3) + sn + sLine.substring(3));
    }

    // seradi pole
    aPomRecord.sort();

    paRecord.st1 = [];

    for ( i = 0; i < aPomRecord.length; i++) {
      sLine = aPomRecord[i];
      paRecord.st1.push(sLine.substring(3, 6) + sLine.substring(10));
    }
    // ok
    return 0;
  },
  /**
   * Link Entry marc
   * opakovatelne podpole, kde na kazdom mieste sa nachadza cely riadok z linkovaneho zaznamu
   */
  getMarc : function() {
    if (this.marcValue) {
      var retVal = {},
          i;
      retVal[this.field] = [];

      var marcRecord = epca.convertToMarc(this.marcValue, true);

      for ( i = 0; i < marcRecord.data.length; i++) {
        retVal[this.field].push(marcRecord.data[i]);
      }

      // 20.09.20 on; serazeni poli podle zadaneho poradi
      if (!i3.isEmptyString(this.tagOrder)) {
        this.csRecordSort(this.tagOrder, retVal);
      } else {
        if (retVal && retVal[1]) {
          // 03.09.13 on; seradi pole, aby se na zacatek dostal tag 001
          retVal[1].sort();
        }
      }

      return retVal;
    }
    return {};
  },
  // @param {Object} db nazev DB, ze ktere se zaznam dotahuje
  setMarc : function(marc, convert, convertGroup, db) {
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

    if (Ext.isEmpty(value)) {
      return;
    }

    // 31.08.15 on; predelane
    /*this.marcValue = {};
     for ( i = 0; i < value.length; i++) {
     // 03.09.13 on; bude se volat metoda pro 4XX tagy
     //Ext.apply(this.marcValue, epca.convertToObject([value[i]]));
     Ext.apply(this.marcValue, epca.convertToObject4XX([value[i]]));
     }*/
    this.marcValue = epca.convertToObject4XX(value);

    this.setLabel();
  },
  setLabel : function() {
    var sText = '',
        sST,
        marcRecord,
        marcValue;

    // 16.12.19 on; podpora ZF
    if (!i3.isEmptyString(this.leDFName)) {
      marcValue = epca.cloneObject(this.marcValue);
      this.csFix4XXsettings2Form(marcValue, this.le4XXsettings);

      marcRecord = epca.convertToMarc(marcValue, true);
      marcRecord.classn = this.db;
      marcRecord.t001 = 'new';
      marcRecord.setTag('001    new');

      i3.WS.display({
        success : function(pRec) {
          if (pRec && pRec.data) {
            (this.get(0)).setValue(pRec.data[0]);
          }
        },
        scope : this
      }, marcRecord, this.leDFName);

      return;
    }

    if (this.marcValue['001']) {
      // 02.09.13 on; prechod na dyntrigger
      //(this.get(0)).setText(this.marcValue['001']['.']);
      sText = this.marcValue['001']['.'];
    }
    if (this.marcValue['200']) {
      sST = epca.form.Helper.c.sSubtagPrefix + 'a';
      if (this.marcValue['200'][sST] && (this.marcValue['200'][sST] !== '')) {
        if (sText !== '') {
          sText += ', ';
        }
        sText = sText + this.marcValue['200'][sST];
      }

      sST = epca.form.Helper.c.sSubtagPrefix + 'b';
      if (this.marcValue['200'][sST] && (this.marcValue['200'][sST] !== '')) {
        if (sText !== '') {
          sText += ', ';
        }
        sText = sText + this.marcValue['200'][sST];
      }
    }
    (this.get(0)).setValue(sText);
  },
  setPropertyTitle : function(titles) {
    // 11.07.19 on; doplneno
    if (this.label) {
      this.label.update(epca.form.Helper.findTitle(titles, this.tag + epca.formatFieldId(this.field, this.position, this.dataLength), this));
    }
  },
  // 11.08.11 on; smaze pole
  clearFields : function() {
    this.marcValue = {};
    this.setLabel();
    //this.doLayout();
  },
  validate : function() {// 29.08.13 on; doplnena validace
    // dodelat
    return true;
  },
  csLinkEntryOnTrigger : function(config) {
    var c;
    var win = new epca.window.LinkEntryDefault({
      taglist : config.taglist,
      // 28.07.17 on;
      leFormName : config.leFormName,
      // 07.08.17 on; parametry pro vyhledavani pro browse popup
      //db : config.search_db,
      index : config.index,
      db : config.db,
      csMarcConvDef : config.csMarcConvDef,
      displayFmtList : config.displayFmtList,
      fmt : config.fmt,
      idxlistStoreId : config.idxlistStoreId,
      // 29.11.19 on; zapamatuju si this.marcValue
      marcValueOrig : epca.cloneObject(this.marcValue),
      // 11.12.19 on;
      marcCloneToSetOrig : epca.WsForm.csGetActiveTab() ? epca.cloneObject(epca.WsForm.csGetActiveTab().marcCloneToSet) : undefined,
      // 14.06.17 on;
      y : 20, // okno se nebude vertikalne zarovnat na stred, ale bude odsazeno od horniho okraje
      buttons : [{
        text : epca.L10n.messageOK,
        listeners : {
          click : function() {
            // 04.02.20 on; kontrola validniho formulare pred ulozenim
            var mainFS = Ext.getCmp('windowLinkEntryMainFieldSet');
            if (mainFS && (!mainFS.validate())) {
              epca.notify(epca.L10n.evidenceFormNotValidCommon, epca.L10n.evidenceFormValidation, "icon-error-epca");
              return;
            }

            this.marcValue = win.getMarc();

            var tab;
            tab = epca.WsForm.csGetActiveTab();
            if (tab) {
              // 09.12.19 on; moznost vyhodit pole z obsahu 4XX
              this.csFix4XXsettings2Record(tab, this.le4XXsettings);
            }

            //Ak nema definovane 001 tak sa vytvori novy zaznam do config.db
            this.setLabel();
            this.doLayout();

            // 16.01.20 on; poznacim si, ze uz nemam delat zadne akce v OnClose okna
            win.csOnlyDestroy = true;
            win.close();

            // 28.07.17 on; na urovni aktivni zalozky vyvola udalost
            // tab nemusi existovat - napr. formular v popup okne
            if (tab) {
              tab.fireEvent('form_changed', this, tab);
            }
          },
          scope : this
        }
      }, {
        text : epca.L10n.titleClose,
        listeners : {
          click : function() {
            // 16.01.20 on; presunuto do OnClose okna
            // 29.11.19 on; pri kliku na zavrit dochazelo ke ztrate celeho 4xx tagu!
            /*this.marcValue = win.marcValueOrig;

             win.close();

             // 29.11.19 on; doplneno i sem
             var tab;
             tab = epca.WsForm.csGetActiveTab();
             // tab nemusi existovat - napr. formular v popup okne
             if (tab) {
             // 11.12.19 on;
             tab.marcCloneToSet = win.marcCloneToSetOrig;

             tab.fireEvent('form_changed', this, tab);
             }*/
            win.close();
          },
          scope : this
        }
      }],
      listeners : {
        close : function() {
          if (!win.csOnlyDestroy) {
            // 29.11.19 on; pri kliku na zavrit dochazelo ke ztrate celeho 4xx tagu!
            this.marcValue = win.marcValueOrig;

            // 29.11.19 on; doplneno i sem
            var tab;
            tab = epca.WsForm.csGetActiveTab();
            // tab nemusi existovat - napr. formular v popup okne
            if (tab) {
              // 11.12.19 on;
              tab.marcCloneToSet = win.marcCloneToSetOrig;

              tab.fireEvent('form_changed', this, tab);
            }
          }

          win.csOnlyDestroy = false;

          win.destroy();
        },
        scope : this
      }
    });

    // 02.03.16 on; zmena nazvu promenne
    // vlozi existujici fomrular
    //if (!i3.isEmptyString(config.formName)) {
    if (!i3.isEmptyString(config.leFormName)) {
      c = Ext.getCmp('tabPanelForms');
      var actTab = c.getActiveTab();

      // 02.03.16 on; zmena nazvu promenne
      //epca.WsForm.getForm(config.formName, actTab.form.unFormat, this, this.csGetFormItems.createDelegate(this, [win], 1));
      epca.WsForm.getForm(config.leFormName, actTab.form.unFormat, this, this.csGetFormItems.createDelegate(this, [win, actTab.recordId], 1));
    } else
    // vyhleda zaznamy v db
    if (config.taglist) {
      var sQuery = this.csMakeQuery(config.taglist);
      i3.WS.search({
        classn : i3.WS.getDfltUnTablesd(),
        query : sQuery,
        to : 50, // potrebuju urcite vic nez 10 zaznamu
        success : function(pRecords) {
          // v pRecords mam nactene vsechny tagy pro 4xx pole, ted to musim prevest na formularove prvky a vybrat subtagy
          var aItems = this.csGetItems(pRecords, config.taglist);

          c = Ext.getCmp('windowLinkEntryMainFieldSet');
          c.add(aItems);
          //c.doLayout();
          //c.ownerCt.doLayout();

          win.show();
          if (this.marcValue) {
            win.setMarc(this.marcValue);
          }
        },
        scope : this
      });

    } else {
      win.show();
      if (this.marcValue) {
        win.setMarc(this.marcValue);
      }
    }
  },
  csMakeQuery : function(psTaglist) {
    var c,
        sQuery = '',
        i,
        fld,
        sTag,
        aTaglist = psTaglist.split('#');

    c = Ext.getCmp('tabPanelForms');
    var actTab = c.getActiveTab();

    for ( i = 0; i < aTaglist.length; i++) {
      fld = aTaglist[i];
      sTag = fld.substring(0, 3);
      if (sQuery !== '') {
        sQuery = '@or ' + sQuery + ' ';
      }
      sQuery = sQuery + '@attr 1=12 \'' + epca.WsTagMap.getTagId(actTab.form.unFormat, sTag) + '\'';
    }
    return sQuery;
  },
  csGetItems : function(paRecords, psTaglist) {
    var sTag,
        fld,
        o,
        o1,
        bFound,
        i,
        j,
        oTagmapField,
        aTaglist = psTaglist.split('#'),
        retVal = [];

    var c = Ext.getCmp('tabPanelForms');
    var actTab = c.getActiveTab();

    for ( i = 0; i < aTaglist.length; i++) {
      fld = aTaglist[i];
      sTag = fld.substring(0, 3);

      // najde definici pole
      bFound = false;
      for ( j = 0; j < paRecords.length; j++) {
        oTagmapField = paRecords[j];

        if (oTagmapField.t001.piece('_', 3) === sTag) {
          bFound = true;
          break;
        }
      }
      if (bFound) {
        // prevede
        o = epca.WsTagMap.processTag(oTagmapField);
        o.items = o.items || [];
        // do items presune jenom zadane subtagy
        for ( j = 0; j < o.fields.length; j++) {
          o1 = o.fields[j];
          if (fld.indexOf(o1.field) >= 0) {
            // 29.11.19 on; prefix
            if (o1.field !== '.') {
              o1.field = epca.form.Helper.c.sSubtagPrefix + o1.field;
            }

            o.items.push(o1);
          }
        }
        o.fields = undefined;
        //o.tagLabel = o.title;
        Ext.apply(o, {
          xtype : 'epca.marc_fieldset',
          tag : o.tagId,
          autoHeight : true,
          autoWidth : true,
          labelWidth : 200
        });

        retVal.push(o);
      } else {
        // pokud zaznam nenajde
        i3.alert('Tagmap record ' + epca.WsTagMap.getTagId(actTab.form.unFormat, sTag) + ' not found!');
      }
    }
    return retVal;
  },
  csGetFormItems : function(form, win, recordId) {
    var genForm = form.generate(true),
        defaultValues;
    var mainFS = Ext.getCmp('windowLinkEntryMainFieldSet');
    mainFS.add(genForm.items);
    //mainFS.doLayout();
    //mainFS.ownerCt.doLayout();

    // 10.12.19 on;
    this.csFix4XXsettings2Form(this.marcValue, this.le4XXsettings);

    win.show();
    if (this.marcValue && (Object.keys(this.marcValue).length > 0)) {
      win.setMarc(this.marcValue);
    } else
    // 20.03.20 on; defaultni hodnoty
    if ((recordId === 'new') && form.defaultValues) {
      epca.csAddStPrefixes(form.defaultValues);
      defaultValues = epca.cloneObject(form.defaultValues);
      epca.WsForm.csSwapDefaultValues(defaultValues);
      win.setMarc(defaultValues);
    }

    // 12.07.19 on; aktualizuje nazvy poli
    var c = Ext.getCmp('tabPanelForms');
    if (c) {
      c.ownerCt.csUpdateFieldNames(form, mainFS);
    }

    // 03.02.20 on; spusti validaci, aby "zcervenala" povinna pole
    mainFS.validate();
  },
  // 09.12.19 on; moznost vyhodit pole z obsahu 4XX
  csFix4XXsettings2Record : function(actTab, ps4XXsettings) {
    var i,
        aTags,
        tag;
    if (i3.isEmptyString(ps4XXsettings)) {
      return;
    }
    aTags = ps4XXsettings.split('#');
    for ( i = 0; i < aTags.length; i++) {
      tag = aTags[i];

      if (this.marcValue.hasOwnProperty(tag)) {
        // vlozi tag do hlavniho formulare
        actTab.marcCloneToSet[tag] = this.marcValue[tag];
        delete this.marcValue[tag];
      }
    }
  },
  // 09.12.19 on; moznost pridat pole do obsahu 4XX
  csFix4XXsettings2Form : function(marcValue, ps4XXsettings) {
    var i,
        aTags,
        tag;
    if (i3.isEmptyString(ps4XXsettings)) {
      return;
    }
    var actTab;
    actTab = epca.WsForm.csGetActiveTab();
    if (!actTab) {
      return;
    }

    aTags = ps4XXsettings.split('#');
    for ( i = 0; i < aTags.length; i++) {
      tag = aTags[i];

      if (actTab.marcCloneToSet.hasOwnProperty(tag)) {
        // vlozi tag do 4xx formulare
        marcValue[tag] = actTab.marcCloneToSet[tag];
      }
    }
  }
});

Ext.reg('epca.link_entry', epca.form.LinkEntry);
