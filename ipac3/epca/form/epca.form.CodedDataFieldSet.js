/**
 * @author Michal Namesny
 *
 * 23.05.16 on; rightPad
 * 23.01.12 on; rozsireni setMarc
 */
/*global epca,Ext,i3*/

Ext.ns('epca.form');

epca.form.CodedDataFieldSet = Ext.extend(epca.form.FieldSet, {

  dataLength : 0,

  constructor : function(config) {
    var i;

    Ext.apply(config, {});

    if (config.disabled && config.disabled === true) {
      config.disabled = false;

      for ( i = 0; i < config.items.length; i++) {
        config.items[i].disabled = true;
      }
    }

    epca.form.CodedDataFieldSet.superclass.constructor.call(this, config);
  },
  getMarc : function() {
    var i, codedDataCmp, retVal = {}, s;

    retVal[this.field] = '';

    for ( i = 0; i < this.items.length; i++) {
      codedDataCmp = this.get(i);

      // 23.05.16 on; doplnovat se bude zprava
      // 21.10.15 on; zmena vyplnoveho znaku z $ na mezeru
      // doplnanie znakmy do celeho stringu by mala robit az opakovatelna komponenta !!!
      // ale pre istotu to este skontrolujeme a doplnime
      //retVal[this.field] += String.leftPad(codedDataCmp.getCodedData(), codedDataCmp.dataLength, ' ');
      retVal[this.field] += this.rightPad(codedDataCmp.getCodedData(), codedDataCmp.dataLength, ' ');
    }

    // pokud obsahuje pouze $, neni nic vyplneno, vratim ''
    s = retVal[this.field];
    // 21.10.15 on; swap $ asi neni potreba, ale kvuli zpetne kompatibilite
    s = s.strswap('$', '');
    s = s.strswap(' ', '');
    if (s === '') {
      retVal[this.field] = '';
    }

    return retVal;
  },
  // @param {Object} db nazev DB, ze ktere se zaznam dotahuje
  setMarc : function(marc, convert, convertGroup, db) {
    var i, cmp, nFirst, nLast, nDiff = 0;

    var codedData = epca.form.Helper.getMarcValue(marc, {
      'db' : db, // 23.01.12 on;
      'tag' : this.tag,
      'field' : this.field,
      'convert' : convert,
      'group' : convertGroup,
      'map' : this.convertMap
    });

    // 01.03.16 on; pokud vrati funkce null, nebudu nastavovat nic
    if (codedData === null) {
      return;
    }

    if (!Ext.isDefined(codedData) || Ext.isEmpty(codedData)) {
      return;
    }

    for ( i = 0; i < this.items.length; i++) {
      cmp = this.get(i);

      nFirst = cmp.position + nDiff;
      nDiff = nDiff + this.csGetFieldLengthDiff(codedData, cmp, nDiff);
      nLast = cmp.position + cmp.dataLength + nDiff;

      // 23.05.16 on; zapojena funkce
      //cmp.setCodedData(epca.trimCodedData(codedData.substring(cmp.position, cmp.position + cmp.dataLength)));
      cmp.setCodedData(epca.trimCodedData(codedData.substring(nFirst, nLast)));
    }
  },
  setPropertyTitle : function(titles) {
    var i;

    // 25.10.11 on; preda uzivatelsky nazev pole
    //this.setTitle(epca.form.Helper.findTitle(titles, this.tag, this));
    this.setTitle(epca.form.Helper.findTitle(titles, this.tag + epca.formatFieldId(this.field, this.position, this.dataLength), this));

    for ( i = 0; i < this.items.length; i++) {
      this.get(i).setPropertyTitle(titles);
    }
  },
  // 11.08.11 on; smaze pole
  clearFields : function() {
    var i;

    for ( i = 0; i < this.items.length; i++) {
      this.get(i).clearFields('');
    }
  },
  /**
   *
   * @param {Object} cmp
   *
   * 23.05.16 on; vrati pocet znaku o kolik ma posunout cteni pro dane pole
   */
  csGetFieldLengthDiff : function(data, cmp, actdiff) {
    var CnDate = '%DATEYY';

    // pro runtine nic
    if (!epca.designer) {
      return 0;
    }

    // pro designer musim osetrit %DATEYYYYMMDD%, %DATEYYMMDD% atd.
    if (data.substring(cmp.position + actdiff, cmp.position + actdiff + CnDate.length) === CnDate) {
      var n = data.indexOf('%', cmp.position + actdiff + 1) + 1;
      n = n - cmp.position - actdiff;
      if (n > cmp.dataLength) {
        return (n - cmp.dataLength);
      }
    }
    return 0;
  },
  /**
   * 23.05.16 on; prevzato podle leftPad
   *
   * @param {Object} val
   * @param {Object} size
   * @param {Object} ch
   */
  rightPad : function(val, size, ch) {
    var result = String(val);
    if (!ch) {
      ch = " ";
    }
    while (result.length < size) {
      result = result + ch;
    }
    return result;
  }
});

Ext.reg('epca.codeddata_fieldset', epca.form.CodedDataFieldSet);
