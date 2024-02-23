/// 16.11.22 on; musim projit vsechny listenery
/// 29.07.19 on; podminka v clones
/// 22.05.18 on; osetreno vraceni noveho klonu
/// 19.02.18 on; id u klonu
/// 09.02.18 on; doslo k stiknuti tlacitka plus
/// 02.02.18 on; pokud existuje tools, tak neprepisovat
/// 05.10.17 on; doplneni onchange eventu do klonu
/// 25.07.17 on; prenos onchange eventu do klonu
/// 15.02.17 on; moznost zobrazit pouze minus
/// 07.11.14 on; defaultni odchyceni prekroceni poctu opakovani
/// 10.04.14 on; pridano + do vsech opakovani
/// 30.10.13 on; osetreno duplikovani pro radiogroup
/// 22.10.13 on; osetreno duplikovani pro radiogroup
/// 18.10.13 on; odstranena chyba v clones
/// 26.09.13 on; csGetCloneNumber
/// 01.02.13 on; doplnena moznost prenosu obsahu poli do fieldsetu
/// 25.01.13 on; dotaz pred vymazem pole
/// 01.11.12 on; vymaz poli rozsiren o vyvolani udalosti change
/// 20.08.12 on; pridana ikona minus do prvniho fieldsetu
/// 17.08.12 on; doplneno prebirani indikatoru pri duplikovani fieldsetu
/// 26.01.12 on; osetrene duplikovani fieldsetu
/// 02.06.11 on; doplnene cislovani klonu - csNumber
/*global Ext,i3 */
Ext.override(Ext.form.FieldSet, {
  dynamic : false,
  csNumber : 0, // 02.06.11 on; poradi klonu
  // 07.11.14 on; defaultni odchyceni prekroceni poctu opakovani
  listeners : {
    maxoccurs : {
      fn : function() {
        i3.alert(i3.fillInParams(i3.languageSel(Ext.ux.tx.txMaxOccurs), [this.maxOccurs]));
      }
    }
  },
  /**
   * Clones a fieldset untill the required amount specified is reached
   * @param {Number} card  Number of clones required. When no card is specified, the current clones will be returned
   * @return {Array}  required clones of type {Ext.form.FieldSet}
   *
   * 22.05.18 on; pbReturnNewClone - vratit nove vytvoreny klon? na vetsine mist se nepocita, ze funkce neco vrati s vyplnenym parametrem card
   */
  clones : function(card, pbReturnNewClone) {
    var idx,
        clone,
        obj,
        sInd1,
        sInd2,
        fs,
        fieldset,
        o,
        p,
        oOnChangeScope,
        oOnChangeFn,
        i;

    var panel = this.ownerCt;
    var master = this;
    if (this.template) {
      master = this.template;
    }
    var cmps = panel.findBy(function(cmp) {
      // 20.08.12 on; rozsirena podminka, kvuli pridani ikony minus do prvniho fieldsetu
      if (cmp.template) {
        return (cmp.template === this.template) && (cmp.clone);
      }
    }, {
      template : master
    });
    if (Ext.isEmpty(card)) {
      return cmps;
    }
    //
    // sanitize amount of clones untill cardinality is reached
    if (!Ext.isEmpty(card)) {
      // 25.07.17 on; zkusi najit onchange event prvniho prvku, pokud jde o metodu csOnFieldChanged
      //if (master && master.items && master.items.items && master.items.items[0] && master.items.items[0].items && master.items.items[0].items.items && master.items.items[0].items.items[0]) {
      if (master && master.items && master.items.items && master.items.items[0]) {
        o = master.items.items[0];
        if (o && o.events && o.events.change && o.events.change.listeners && o.events.change.listeners[0]) {
          // 16.11.22 on; musim projit vsechny listenery
          for ( i = 0; i < o.events.change.listeners.length; i++) {
            p = o.events.change.listeners[i];
            if (p.fn.name === 'csOnFieldChanged') {
              oOnChangeFn = p.fn;
              oOnChangeScope = p.scope;
              break;
            }
          }
        } else
        // 05.10.17 on; zkusim jeste o uroven niz, mozna se nachazim v panelu
        if (o && o.items && o.items.items && o.items.items[0]) {
          o = o.items.items[0];
          if (o && o.events && o.events.change && o.events.change.listeners && o.events.change.listeners[0]) {
            // 16.11.22 on; musim projit vsechny listenery
            for ( i = 0; i < o.events.change.listeners.length; i++) {
              p = o.events.change.listeners[i];
              if (p.fn.name === 'csOnFieldChanged') {
                oOnChangeFn = p.fn;
                oOnChangeScope = p.scope;
                break;
              }
            }
          }
        }
      }
      // add clones untill card is reached
      for ( i = cmps.length; i < card; i++) {
        // 20.08.12 on; kvuli pridani ikony minus, se muze stat, ze master uz neexistuje, upraveno
        //var idx = panel.items.indexOf(master);
        idx = panel.items.indexOf(this);
        clone = master.cloneConfig({
          clone : true,
          template : master
        });
        // 26.09.13 on; vlozeno do funkce - nebylo uplne idealni
        //clone.csNumber = i + 1;
        clone.csNumber = master.csGetCloneNumber();
        // 02.06.11 on; poradi klonu
        // 02.06.11 on; pokud nektera dcerinna komponenta obsahuje property "id" zadane uzivatelem (nema prefix "ext-"),
        // tak prida na konec csNumber (aby byly odlisene prvky pri duplikovani fieldsetu
        if (clone.csNumber > 0) {
          //var sNumber = clone.csNumber;
          Ext.each(clone.items.items, function(pItem) {
            // 26.01.12 on; pridane podminky
            if (pItem && (pItem.items) && (pItem.items.items) && (pItem.items.items[0].id.substring(0, 4) !== ('ext-'))) {
              pItem.items.items[0].id += clone.csNumber;
            }
            // 18.10.13 on; odstranena chyba
            // 26.09.13 on; rozsireno (aplikace digitalni kronika)
            if (pItem && (pItem.items) && (pItem.items.items) && (pItem.items.items[0]) && (pItem.items.items[0].items) && (pItem.items.items[0].items.items) && (pItem.items.items[0].items.items[0]) && (pItem.items.items[0].items.items[0].id.substring(0, 4) !== ('ext-'))) {
              Ext.ComponentMgr.unregister(pItem.items.items[0].items.items[0]);
              pItem.items.items[0].items.items[0].id += clone.csNumber;
              //pItem.items.items[0].items.items[0].getEl().id = pItem.items.items[0].items.items[0].id;
              //pItem.items.items[0].items.items[0].getEl().dom.id = pItem.items.items[0].items.items[0].id;
              Ext.ComponentMgr.register(pItem.items.items[0].items.items[0]);
            }
            if (pItem && (pItem.items) && (pItem.items.items) && (pItem.items.items[1]) && (pItem.items.items[1].items) && (pItem.items.items[1].items.items) && (pItem.items.items[1].items.items[0]) && (pItem.items.items[1].items.items[0].id.substring(0, 4) !== ('ext-'))) {
              Ext.ComponentMgr.unregister(pItem.items.items[1].items.items[0]);
              pItem.items.items[1].items.items[0].id += clone.csNumber;
              //pItem.items.items[1].items.items[0].getEl().id = pItem.items.items[1].items.items[0].id;
              //pItem.items.items[1].items.items[0].getEl().dom.id = pItem.items.items[1].items.items[0].id;
              Ext.ComponentMgr.register(pItem.items.items[1].items.items[0]);
            }
            // 22.10.13 on; pokud jde o radiogroup osetrim podobne vlastnost "name" (pouzite v interpi)
            if (pItem && (pItem.items) && (pItem.items.items) && (pItem.items.items[0]) && (pItem.items.items[0].items) && (pItem.items.items[0].items.items) && (pItem.items.items[0].items.items[0]) && (pItem.items.items[0].items.items[0].xtype === 'radiogroup')) {
              // nazev radiogroup se nesmi menit, podle jeho nazvu se zapisuje hodnota do pole
              //pItem.items.items[0].items.items[0].name += clone.csNumber;
              // musim upravit nazvy jednotlivych radio
              Ext.each(pItem.items.items[0].items.items[0].items, function(pItem) {
                pItem.name += clone.csNumber;
              });
            }
            // 25.07.17 on; nastavi onchange event, pokud ho driv nasel
            if (oOnChangeFn) {
              if (pItem && (pItem.items) && (pItem.items.items) && (pItem.items.items[0])) {
                pItem.items.items[0].on('change', oOnChangeFn, oOnChangeScope);
              }
            }
          });
          // 14.02.18 on; nastavi id u klonu
          if (master && master.id && (master.id.substring(0, 4) !== ('ext-'))) {
            clone.id = master.id + clone.csNumber;
            Ext.ComponentMgr.register(clone);
          }
        }
        // 01.02.13 on; pokud je nastaveno, zkopiruje i obsah jednotlivych policek (vcetne indikatoru)
        if (this.csCopyData) {
          obj = this.extractFs();
          clone.populateFs(obj);
        } else {
          // 17.08.12 on; pokusi se prebrat z masteru indikatory
          sInd1 = '';
          sInd2 = '';
          fs = this.findBy(function(cmp) {
            return cmp.isFormField;
          });
          Ext.each(fs, function(f) {
            // 29.07.19 on; podminka
            // nacte hodnoty indikatoru
            if (f.name && (f.name.substring(4, 6) === 'i1')) {
              sInd1 = f.getValue();
            } else if (f.name && (f.name.substring(4, 6) === 'i2')) {
              sInd2 = f.getValue();
            }
          }, this);
          // pokud jsou indikatory vyplnene, vlozi je do nove vznikleho fieldsetu
          if ((sInd1 !== '') || (sInd2 !== '')) {
            fs = clone.findBy(function(cmp) {
              return cmp.isFormField;
            });
            Ext.each(fs, function(f) {
              // zapise hodnoty indikatoru (i kdyz je treba prazdny tzn. === '')
              if (f.name.substring(4, 6) === 'i1') {
                f.setValue(sInd1);
              } else if (f.name.substring(4, 6) === 'i2') {
                f.setValue(sInd2);
              }
            }, this);
          }
        }
        // 10.04.14 on; pole vlozi za aktualni (NE na konec)
        //panel.insert(idx + 1 + i, clone);
        panel.insert(idx + 1, clone);
        // 30.10.13 on; pridane kvuli interpi, pro vice nez 2 variantni nazvy
        panel.doLayout();
        // 22.05.18 on; jenom, pokud si ho vyzadam
        // 14.02.18 on; vrati novy fs
        if (pbReturnNewClone) {
          return clone;
        }
      }
      //
      // remove clones untill cardinality is reached
      //var i;
      for ( i = cmps.length; i > card; i--) {
        fieldset = cmps[i - 1];
        panel.remove(fieldset, true);
      }
      cmps = panel.findBy(function(cmp) {
        // 20.08.12 on; rozsirena podminka
        if ((cmp.clone) && (cmp.template)) {
          return cmp.template === this.template;
        }
      }, {
        template : master
      });
    }
    return cmps;
  },
  csGetPlusIconMain : function() {
    var oPlus = {
      id : 'plus',
      handler : function(event, toolEl, fieldset) {
        var oNewFs,
            cnt = fieldset.clones().length;
        if (!Ext.isEmpty(fieldset.maxOccurs)) {
          if (fieldset.maxOccurs <= cnt + 1) {
            fieldset.fireEvent('maxoccurs', fieldset);
            return;
          }
        }
        var panel = fieldset.ownerCt;
        // 22.05.18 on; vyzadam si novy klon
        oNewFs = fieldset.clones(cnt + 1, true);
        panel.doLayout();
        // 09.02.18 on; doslo k stiknuti tlacitka plus
        fieldset.fireEvent('onIconPlus', fieldset, oNewFs);
      }
    };
    return oPlus;
  },
  csGetMinusIconMain : function() {
    var oMinus = {
      id : 'minus',
      handler : function(event, toolEl, fieldset) {
        // 25.01.13 on; dotaz
        if (this.csConfirmDel) {
          Ext.Msg.show({
            title : i3.languageSel(Ext.ux.tx.txFieldDel),
            msg : this.csConfirmDelText || i3.languageSel(Ext.ux.tx.txReallyDel),
            buttons : i3.ui.YesNo,
            fn : function(pButtonId) {
              if (pButtonId === 'yes') {
                // 14.02.18 on; volat to budu pred smazanim pole (po vymazu se to uz nezavola)
                // 15.02.17 on; doslo k stiknuti tlacitka minus
                this.fireEvent('onIconMinus', this);
                this.onMinusMain(fieldset, this.csGetPlusIconMain(), oMinus);
              }
            },
            icon : Ext.MessageBox.QUESTION,
            scope : this
          });
        } else {
          // 14.02.18 on; volat to budu pred smazanim pole (po vymazu se to uz nezavola)
          // 15.02.17 on; doslo k stiknuti tlacitka minus
          this.fireEvent('onIconMinus', this);
          this.onMinusMain(fieldset, this.csGetPlusIconMain(), oMinus);
        }
      },
      scope : this
    };
    return oMinus;
  },
  /**
   * Vymaz fieldsetu - klonu
   *
   */
  onMinusClone : function(fieldset) {
    var panel = fieldset.ownerCt;
    panel.remove(fieldset, true);
    panel.doLayout();
  },
  /**
   * Vymaz fieldsetu - hlavniho (prvniho) prvku
   */
  onMinusMain : function(fieldset /*, poPlus, poMinus*/ ) {
    // 10.04.14 on; klon smaze
    if (fieldset.clone) {
      this.onMinusClone(fieldset);
      return;
    }
    // 12.04.11 on; zjisti pocet dynamicky vytvorenych poli
    var panel = fieldset.ownerCt;
    var clones = fieldset.clones();
    if (clones.length > 0) {
      // 10.04.14 on; + ikona je i v klonech
      // pokud bylo dynamicky pridano pole, tak prida ikony +- do nasledujiciho fieldsetu a prvni smaze
      panel.remove(fieldset, true);
      // 10.04.14 on; + ikona je i v klonech
      /*clones[0].tools.minus.remove();
       delete clones[0].tools['minus'];

       clones[0].addTool(poPlus);
       clones[0].addTool(poMinus);*/
      clones[0].clone = false;
    } else {
      // pokud ne, smaze obsah fieldsetu
      var fs = fieldset.findBy(function(cmp) {
        return cmp.isFormField;
      });
      Ext.each(fs, function(f) {
        if (Ext.isObject(f.getValue())) {
          f.setValue({});
        } else {
          f.setValue('');
        }
        // 01.11.12 on; rucne vyvola udalost zmeny - odchytam to napr. v interpi aplikaci USA5517
        // pokud by s tim byly problemy, muzu tu vyvolat nejakou jinou udalost
        f.fireEvent('change', f, f.value);
      });
      // smaze i pole ktera nejsou na formulari
      fieldset.csNotPresentedFields = {};
    }
    panel.doLayout();
  },
  onRender : Ext.form.FieldSet.prototype.onRender.createInterceptor(function(ct, position) {
    /*var oMinusClone = {
     id : 'minus',
     handler : function(event, toolEl, fieldset) {
     // 25.01.13 on; dotaz
     if (this.csConfirmDel) {
     Ext.Msg.show({
     title : i3.languageSel(Ext.ux.tx.txFieldDel),
     msg : this.csConfirmDelText || i3.languageSel(Ext.ux.tx.txReallyDel),
     buttons : i3.ui.YesNo,
     fn : function(pButtonId) {
     if (pButtonId === 'yes') {
     this.onMinusClone(fieldset);
     }
     },
     icon : Ext.MessageBox.QUESTION,
     scope : this
     });
     } else {
     this.onMinusClone(fieldset);
     }
     },
     scope : this
     };*/
    if (this.dynamic) {
      // 10.04.14 on; + bude u vsech opakovani - predelane
      // 31.01.13 on; moznost zobrazit u klonu i ikonu +
      /*if ((this.clone) && (!this.csClonePlusMinusIcon)) {
      this.tools = [oMinusClone];
      } else
      if (this.clone) {
      this.tools = [this.csGetPlusIconMain(), oMinusClone];
      } else {
      this.tools = [this.csGetPlusIconMain(), this.csGetMinusIconMain()];
      }*/
      // 02.02.18 on; pokud existuje tools, tak neprepisovat
      if (this.tools) {
        this.tools.push(this.csGetPlusIconMain());
        this.tools.push(this.csGetMinusIconMain());
      } else {
        this.tools = [this.csGetPlusIconMain(), this.csGetMinusIconMain()];
      }
    } else
    // 15.02.17 on; moznost zobrazit pouze minus
    if (this.onlyMinusBtn) {
      // 02.02.18 on; pokud existuje tools, tak neprepisovat
      if (this.tools) {
        this.tools.push(this.csGetMinusIconMain());
      } else {
        this.tools = [this.csGetMinusIconMain()];
      }
    }
  }),
  /** prevzato z Ext.form.FormPanel
   * Adds value to collection In case of single value collection a single value is returned Otherwise an array of values will be returned
   * @param {Mixed}  coll  Required collection to which the value should be added
   * @param {String}  v Required value that should be added to the collection
   * @return Returns mixed elements of collection
   */
  aggregateFs : function(coll, v) {
    if ((coll === undefined) || (coll === null)) {
      // 21.04.09 rs; if 'v' is object then make array envelope around it
      //              this is for fields, which on getvalue return objects, not string
      //              we want resulting data structure same as for fieldset (so even 1 member fieldset
      //              returns one member array
      if ( typeof v === 'object') {
        return [v];
      }
      return v;
    } 
    // 16.11.22 on; kosmeticka uprava
    if (Ext.isArray(coll)) {
      coll.push(v);
      return coll;
    } 
    
    coll = [coll];
    coll.push(v);
    return coll;
  },
  /** prevzato z Ext.form.FormPanel
   * (Private method used in populate())
   * Find master field by name inside of a fieldset or inside of array of fields.
   *
   * @param {Object} pMulti  - array of fields or container with fields (fieldset)
   * @param {Object} pName   - field which we are searching for;
   *                           may be literal '*' (selects all master fields in fieldset)
   */
  findFieldFs : function(pMulti, pName) {
    var fields = [];
    if (Ext.isArray(pMulti)) {
      // find field in array of fields based on it's name
      Ext.each(pMulti, function(field) {
        if ((!Ext.isEmpty(field.template)) || (!field.isFormField)) {// skip
          return true;
        }
        if (((field.dataIndex === pName) || (field.id === pName) || (field.name === pName))) {
          fields.push(field);
          // take this one
        }
      }, this);
    } else {
      // find field under this component based on it's name
      fields = pMulti.findBy(function(cmp) {
        // if it is clone or no a form field, skip
        if ((!Ext.isEmpty(cmp.template)) || (!cmp.isFormField)) {
          return false;
        }
        if ((pName === '*') || (cmp.dataIndex === pName) || (cmp.id === pName) || (cmp.name === pName)) {
          return true;
        }
      });
    }
    if (pName === '*') {
      return fields;
    }// return array 1:1
    // searched for name & something were found?
    if (fields.length > 0) {
      return fields[0];
    }
    return null;
    // not found
  },
  /** prevzato z Ext.form.FormPanel
   * (Private method used in populate())
   * Receives array of fields and corresponding array of values to be set.
   *
   * @param {Object} pFields   - array of fields (usually master+clones)
   * @param {Object} pValues   - corresponding array of values to be set
   */
  setValuesFs : function(pFields, pValues) {
    if (Ext.isEmpty(pValues)) {
      pValues = '';
    }
    if (!Ext.isArray(pValues)) {
      pValues = [pValues];
    }
    // acquire required amount of fields
    if (!Ext.isArray(pFields)) {
      var fldMaster = pFields;
      // given field will be master field
      pFields = [fldMaster];
      // convert into array
      // 21.04.09 rs; we only create clones if "clones" member function is present & if dynamic option is set
      //              (checkboxgroup has "clones" bud has not "dymanic" set to true)
      if (fldMaster.clones && fldMaster.dynamic) {// if field is dynamic, then setup right amount of clones
        pFields = pFields.concat(fldMaster.clones(pValues.length - 1));
      }
    }
    // this is special case, where field is not dynamic, but receives more than one value
    // currently only occurs for checkboxgroup
    // ?? not very elegant - may need rewrite in the future
    if ((pFields.length === 1) && (pValues.length > 1)) {
      pFields[0].setValue(pValues);
      return;
    }
    // populate fields
    var i;
    for ( i = 0; i < pValues.length; i++) {
      // 21.10.10 on; pokud byl zapojeny combobox, ktery mel store === null, tak tu tady padalo
      if ((pFields[i].xtype === 'cs_combo_st') && (pFields[i].store === null)) {
        continue;
      }
      pFields[i].setValue(pValues[i]);
      // 09.11.12 on; rucne vyvola udalost zmeny - odchytam to napr. v interpi aplikaci USA5517
      // pokud by s tim byly problemy, muzu tu vyvolat nejakou jinou udalost
      pFields[i].fireEvent('change', pFields[i], pValues[i]);
    }
  },
  /**
   * Zkopiruje obsah fieldsetu do objektu.
   */
  extractFs : function() {
    var obj = {};
    var fs = this.findBy(function(cmp) {
      return cmp.isFormField;
    });
    Ext.each(fs, function(f) {
      obj[f.name] = this.aggregateFs(obj[f.name], f.getValue());
    }, this);
    return obj;
  },
  /**
   * Naplni obsah fieldsetu podle predaneho objektu.
   */
  populateFs : function(pObj) {
    // get all master fields under current fieldset
    var fields = this.findFieldFs(this, '*');
    // for all master fields in current fieldset
    Ext.each(fields, function(pField) {
      var values = pObj[pField.name];
      // data to be set-up (may be null)
      if (!values) {// fix for null
        values = '';
      }
      // setup values for any case (even if not present in input data)
      this.setValuesFs(pField, values);
    }, this);
  },
  /**
   * Funkce vrati cislo klonu
   *
   * 26.09.13 on;
   */
  csGetCloneNumber : function() {
    // csMaxNumber uchovava posledni pouzite cislo
    if (!this.csMaxNumber) {
      this.csMaxNumber = 1;
    } else {
      this.csMaxNumber += 1;
    }
    return this.csMaxNumber;
  }
});
