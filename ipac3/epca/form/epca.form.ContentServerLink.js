/**
 * @author Laco Clementis, Michal Namesny
 *
 *
 * 23.01.12 on; rozsireni setMarc
 */
/*global epca,Ext,i3*/

Ext.ns('epca.form');

/**
 * Textove pola marc s funkciami getMarc, setMarc
 */
epca.form.DisplayField = Ext.extend(Ext.form.DisplayField, {
  //repeatable : false,

  //tag : '200',
  //field : 'a',

  // v pripade ze obsah textoveho pola nie je validny, je potrebne nastavit hodnotu premennej 'isValid' na false
  //customCode : 'if (typeof parseInt(this.getValue()) == "number") isValid = true;',
  //customCode : 'isValid = true;',

  constructor : function(config) {
    config = config || {};

    Ext.apply(config, {
      hideLabel : true // skryje popis pole
      //disabled : true
    });

    epca.form.DisplayField.superclass.constructor.call(this, config);

    // pridanie custom eventu
    //this.addEvents('fieldValidatedEvent');
  },
  getCodedData : function() {
    //return this.getValue();
  },
  setCodedData : function(codedData) {
    /*var data = epca.trimCodedData(codedData);

     if(data == '')
     return;

     this.setValue(data);*/
  },
  getMarc : function() {
    /*var retVal = {};
     retVal[this.field] = this.getValue();
     return retVal;*/
  },
  // @param {Object} db nazev DB, ze ktere se zaznam dotahuje
  setMarc : function(marc, convert, convertGroup, db) {
    // tady bude natvrdo zapisovat text z nastaveni

    /*var value = epca.form.Helper.getMarcValue(marc, {
     'db' : db,  // 23.01.12 on;
     'tag' : this.tag,
     'field' : this.field,
     'convert' : convert,
     'group' : convertGroup,
     'map' : this.convertMap
     });

     if(!Ext.isEmpty(value))
     {
     // vyvolanie eventu validacie bude napr. v metode setMarc
     this.fireEvent('fieldValidatedEvent', this, value);

     this.setValue(value);
     }*/
    var panel, sId, sDb, sIctx, sLanguage;
    // dotanu se az na hlavni panel
    panel = this.ownerCt.ownerCt.ownerCt.ownerCt;
    // 05.03.14 on; podminka kvuli nahledu
    if (panel) {
      // id zaznamu
      sId = panel.recordId;
      // class
      sDb = i3.className2LName(panel.form.targetDb);
    }
    // ictx
    sIctx = i3.WS.baseParams.ictx;
    // jazyk
    sLanguage = i3.WS.baseParams.language;

    if (!panel || !panel.recordId) {
      // zaznam jeste nebyl ulozen do db
      this.setValue(this.contentText);
      this.disable();
    } else {
      // zaznam uz byl ulozen do db
      this.setValue('<a target="_blank" href="' + this.contentURL + '?ictx=' + sIctx + '&language=' + sLanguage + '&op=uploader&idx=' + sDb + '*' + sId + '">' + this.contentText + '</a>');
      this.enable();
    }

  },
  setPropertyTitle : function(titles) {
    // preda uzivatelsky nazev pole
    /*if (this.label) {
     this.label.update(epca.form.Helper.findTitle(titles, this.tag + epca.formatFieldId(this.field, this.position, this.dataLength),this));
     }*/
  },
  validate : function() {
    /*if(Ext.isEmpty(this.customCode))
     return true;

     var isValid = true;
     eval(this.customCode);

     // 25.10.11 on; pokud validace neprojde, zvyrazni cervene prvek
     if (!isValid) {
     this.markInvalid();
     } else {
     this.clearInvalid();
     }

     return isValid;*/
    return true;
  },
  // 11.08.11 on; smaze pole
  clearFields : function() {
    //this.setValue('');
  }
});

Ext.reg('cs_content_server_link', epca.form.DisplayField);
