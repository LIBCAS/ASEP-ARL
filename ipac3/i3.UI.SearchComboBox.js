/**
 * Vyhladavaci ComboBox
 *
 * 20.03.25 on; podpora skryte limity
 * 27.09.23 on; moznost vracet pouze obsah pole jako retezec (ne cely objekt)
 * 27.08.23 on; pridana podminka
 * 29.03.22 on; dotazeni i do jinych poli
 * 03.03.22 on; uprava populate pro opakovatelna pole
 * 24.01.22 on; pridan hledany termin
 * 13.12.21 on; doplnen scan
 * 09.11.21 on; pokud je hodnota shodna s tim, co uz v poli je (bylo dotazeno vyberem z comboboxu), nebudu nic menit
 * 14.10.21 on; prevzato z epca
 */
/*global Ext, i3*/
Ext.ns('i3.ui');
/**
 * Vyhladavaci combobox ve fieldsetu
 */
i3.ui.SearchComboBoxFs = Ext.extend(Ext.form.ComboBox, {
    /*typeAhead : false,
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
     customCode : 'isValid = true',*/
    minQueryLength: 1,
    pageSize: 20,
    typeAhead: false,
    //loadingText : epca.L10n.titleSearching,
    hideTrigger: true,
    //itemSelector : 'div.search-item',
    //tpl : new Ext.XTemplate('<tpl for="."><div class="search-item"><p>{data}</p></div></tpl>'),
    constructor: function(config) {
        var oStore,
            oTpl,
            sDisplayField,
            oItemSelector;
        config = config || {};
        // 29.02.16 on; zmena nazvu promenny v designeru
        /*if (!config.db && config.search_db) {
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
         });*/
        var sDb = config.db || config.csFlexPopParams.classn;
        // 20.10.21 on; scan varianta
        if (config.csScan || config.csScanAndSearch) {
            oStore = new i3.WS.StoreScan({
                autoLoad: false,
                baseParams: {
                    db: sDb,
                    index: config.csFlexPopParams.initUseAttr
                }
            });
            oTpl = undefined;
            sDisplayField = 'term';
            oItemSelector = '';
        } else {
            oStore = new i3.WS.StoreSearch({
                autoLoad: false,
                root: 'records',
                totalProperty: 'hits',
                baseParams: {
                    db: sDb,
                    fmt: config.fmt || config.csFlexPopParams.displayFmt,
                    from: 1,
                    to: this.pageSize,
                    index: config.csFlexPopParams.initUseAttr
                },
                listeners: {
                    beforeload: {
                        fn: function(store, options) {
                            if (options.params.start) {
                                store.baseParams.from = options.params.start + 1;
                                store.baseParams.to = options.params.start + this.pageSize;
                            } else {
                                store.baseParams.from = 1;
                                store.baseParams.to = this.pageSize;
                            }
                        },
                        scope: this
                    }
                }
            });
            oTpl = new Ext.XTemplate('<tpl for="."><div class="search-item"><p>{data}</p></div></tpl>');
            sDisplayField = '';
            oItemSelector = 'div.search-item';
        }
        Ext.apply(config, {
            store: oStore,
            tpl: oTpl,
            displayField: sDisplayField,
            itemSelector: oItemSelector
        });
        i3.ui.SearchComboBoxFs.superclass.constructor.call(this, config);
        this.setDb(sDb);
    },
    setDb: function(db) {
        this.db = db;
        this.store.baseParams.db = this.db;
    },
    listeners: {
        beforequery: function() {
            var sValue;
            // vyjimka pro cs_search_combobox
            if (this.xtype === 'cs_search_combobox') {
                sValue = this.getValue1();
            } else {
                sValue = this.getValue();
            }
            if (sValue && (sValue.length > this.minQueryLength)) {
                // 20.10.21 on; scan
                if (this.csScan || this.csScanAndSearch) {
                    this.store.setScanQuery(this.store.baseParams.index, sValue);
                } else {
                    this.store.setSearchQuery({
                        1: this.store.baseParams.index, //'1',
                        5: '1' // // 05.09.11 on; zmena z 4 na 5 = truncation
                    }, sValue);
                }
                // 20.03.25 on; podpora skryte limity
                var sDB = this.store.baseParams.db;
                var nAttrNo = this.store.baseParams.index;
                if ((this.colLimitsApplyCB || i3.colLimitsApplyCB) && (sDB.indexOf('I2e') === -1)) {
                    if (this.colLimitsApplyCB) {
                        this.colLimitsApplyCB(this.store, /*this.colLimitsData*/ undefined, nAttrNo);
                    } else if (i3.colLimitsApplyCB) {
                        i3.colLimitsApplyCB(this.store, /*this.colLimitsData*/ undefined, nAttrNo);
                    }
                }
                //this.store.baseParams.query = "@attr 1=1 @attr 5=1 @attr 4=1 '" + this.getValue() + "'";
                this.store.load({
                    add: false
                });
                return false;
            }
        },
        select: function(combo, record, index) {
            // csScan - moznost dotahnou pouze obsah indexu
            if (this.csScan) {
                return;
            }
            // 21.10.21 on; vyjimka pro scan
            if (this.csScanAndSearch) {
                // provedu search s vybranym terminem nad stejnym indexem
                var pqf = '@attr 1=' + this.store.baseParams.index + ' ' + record.data.term.singleQuote();
                i3.WS.search({
                    classn: combo.db,
                    query: pqf,
                    success: function(pRecords) {
                        if (pRecords && pRecords[0]) {
                            this.csLoadMarcRecord(pRecords[0]);
                        }
                    },
                    failure: function(msg) {
                        i3.displayError(msg);
                    },
                    scope: this
                });
                return;
            }
            i3.WS.getRecord({
                classn: this.db,
                fmt: 'LINEMARC',
                t001: record.data.t001,
                success: function(selectedRecord) {
                    this.csLoadMarcRecord(selectedRecord);
                    // 20.05.16 on; zmena
                    //var marc = epca.convertToObject(selectedRecord.data, epca.Config.getUnFormat(this.db));
                    /*var marc = epca.convertToObject(selectedRecord.data, epca.Config.getDbFormat(this.db));

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
                     }*/
                },
                failure: function(msg) {
                    //Ext.example.msg('Error', 'Pri vyhľadávaní záznamu sa vyskytla chyba. ' + errmsg);
                    i3.displayError(msg);
                },
                scope: this
            });
        },
        render: function() {
            var wrap = this.el.up('div.x-form-field-wrap');
            this.wrap.applyStyles({
                position: 'relative'
            });
            this.el.addClass('search-combo-input');
            this.flag = Ext.DomHelper.append(wrap, {
                tag: 'div',
                style: 'position:absolute'
            });
            this.flag.className = 'search-combo-icon icon-search';
        }
    },
    /**
     * (Private method used in populate())
     * Receives array of fields and corresponding array of values to be set.
     *
     * @param {Object} pFields - array of fields (usually master+clones)
     * @param {Object} pValues - corresponding array of values to be set
     *
     * 11.06.12 on; kompletne prevzato z Ext.form.FormPanel.js
     */
    setValues: function(pFields, pValues) {
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
            // (checkboxgroup has "clones" bud has not "dymanic" set to true)
            if (fldMaster.clones && fldMaster.dynamic) { // if field is dynamic, then setup right amount of clones
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
        var i,
            sValue;
        for (i = 0; i < pValues.length; i++) {
            // 21.10.10 on; pokud byl zapojeny combobox, ktery mel store === null, tak tu tady padalo
            if ((pFields[i].xtype === 'cs_combo_st') && (pFields[i].store === null)) {
                continue;
            }
            sValue = pValues[i];
            // 27.08.23 on; pridana podminka
            if (sValue && sValue.csDeleteInterpunction) {
                sValue = sValue.csDeleteInterpunction();
            }
            pFields[i].setValue(sValue);
            // 24.09.13 on; rucne vyvola udalost zmeny - pouzite v DK (i Interpi)
            pFields[i].fireEvent('change', pFields[i], sValue);
        }
    },
    /**
     * Populate fields inside of given fieldset by given values
     *
     * @param {Object} pFieldSet
     * @param {Object} pLinRec
     */
    populate: function(pFieldSet, pLinRec) {
        // 03.03.22 on; zrusena 1. podminka - pracuju tu s cs_search_combobox
        // 24.11.14 on; specialita pro opakovatelny popup v ramci fieldsetu, u tohoto popupu se predpoklada dotazeni udaju pouze do sebe - zatim
        //              ta prvni podminka by tu asi nemusela byt, ale nemam ted cas to overit...
        //if ((this.xtype === 'cs_auth_select_fs') && (this.dynamic)) {
        if (this.dynamic) {
            this.setValue(pLinRec[this.name]);
            return;
        }
        i3.eachProp(pLinRec, function(pValue, pName) {
            var fields = pFieldSet.findBy(function(pField) {
                if (!pField.isFormField) {
                    return false;
                }
                if (pField.name === pName) {
                    return true;
                }
            });
            if (Ext.isArray(fields)) {
                fields = fields[0];
                if (fields) {
                    // 11.06.12 on; kvuli opakovatelnym podpolim zapojena funkce z dyntrigeru
                    //fields.setValue(pValue);
                    this.setValues(fields, pValue);
                }
            }
        }, this);
    },
    /**
     * Prevezme MARC zaznam autority
     * @param {Object} pRecord - MARC zaznam vybrany uzivatelom vo flexpope
     *
     * 08.02.13 on; rozdelene na 2 metody, kvuli asynchronimu volani v csGetFields2Load
     */
    csLoadMarcRecord: function(pRecord) {
        this.csGetFields2Load(pRecord);
    },
    /**
     * Dokonceni csLoadMarcRecord
     */
    csLoadMarcRecordEnd: function(lin, pRecord) {
        if (!lin) {
            lin = [{}];
        }
        if (lin) {
            var ownerFS = this.findParentByType('fieldset');
            if (ownerFS) {
                // 19.06.17 on; pokud je potreba nejak osetrit data pred dotazenim, lze to pres metodu
                if (ownerFS.csBeforePopulate) {
                    // 24.01.22 on; pridan hledany termin
                    ownerFS.csBeforePopulate(lin, pRecord, this.value, this.subtag);
                }
                this.populate(ownerFS, lin);
                // 20.08.12 on; podminka
                if (this.csDataForm) {
                    // 11.06.12 on;
                    this.csDataForm.doLayout();
                }
                // 07.12.20 on; doplneno
                if (ownerFS) {
                    ownerFS.doLayout();
                }
                // 24.09.13 presunuto do setValues() - aby se funguvalo pro vsechny dotahovane pole (ne pouze cs_auth_select_fs)
                // 01.11.12 on; rucne vyvola udalost zmeny (zatim jenom pro cs_auth_select_fs) - odchytam to napr. v interpi aplikaci
                // pokud by s tim byly problemy, muzu tu vyvolat nejakou jinou udalost
                //this.fireEvent('change', this, this.value);
            }
        }
    },
    /**
     * Private pre csLoadMarcRecord
     * Extrakcia poli z MARC zaznamu podla nastavenia - vysledkom je objekt k prvkami na vlozenie do formulara
     * @param {Object} pRecord - MARC zaznam vybrany uzivatelom vo flexpope
     */
    csGetFields2Load: function(pRecord) {
        // 05.05.11 on; var lin
        var lin;
        // ak pride null forwardnut null (09.09.09 rs - napr. prazdny zaznam z flexpopu)
        if (pRecord) {
            //i3.alert('loading record ' + Ext.encode(pRecord));
            var oErr = {};
            var marcConv = this.csMarcConvDef;
            if (!marcConv) {
                i3.intError('i3.ui.AuthSelectForm.csGetFields2Load: marc conv table is null!');
                return;
            }
            lin = i3.DataFmt.fromMarc(this.csMarcConvDef, pRecord, oErr);
            if (oErr.tx) {
                i3.alert('Error linearizing MARC record: ' + oErr.tx);
                return null;
            }
        } else {
            // toto je specialny pripad, kedy z flexpopu resp. "zo zdroja" pride null zaznam
            // vtedy vygenerujeme "clear all" lin2 zaznam a ten potom prenesieme do formulara
            // vlastne take pomocne nudzove riesenie
            lin = {};
        }
        // predelane - Musi se volat rekurzivne, protoze bylo pridane nacteni ZF ze serveru
        // transformacia autority do cieloveho tagu
        /*var lin2 = {},
         Ext.each(this.csLoadMarcMap, function(pMap) {
         // 25.11.09 on; na treti pozici muze byt podminka - zatim pouze nazev pole a
         //              kotroluje se, zda je vyplnene
         var cond = pMap[2] ? ((pMap[2]) && (lin[pMap[2]] !== '')) : true;
         if (cond) {
         // zdrojove data z linearizovanej verzie MARC zaznamu, niektore polia mozu byt opakovatelne
         var src = lin[pMap[1]];
         // 11.06.12 on; reseni opakovatelnych podpoli
         // ma aktualne pole viac ako jedno opakovanie?
         //if(Ext.isArray(src)) {
         // opakovania zlucime pomocnym oddelovacom
         //src = src.join(i3.c.SFFldsDelim);
         //}
         // pole lin2 tak uz nebude obsahovat opakovane hodnoty
         lin2[pMap[0]] = src;
         }
         });*/
        var cond,
            that = this,
            lin2 = {};
        // musim si udelat kopii
        var aMarcMap = i3.c.cloneObject(that.csLoadMarcMap);
        // 27.09.23 on;
        if (aMarcMap.length === 0) {
            that.csLoadMarcRecordEnd(null, pRecord);
        }
        if (!!aMarcMap.length) {
            (function() {
                var pMap,
                    self = arguments.callee;
                pMap = aMarcMap.shift();
                if (pMap) {
                    cond = pMap[2] ? ((pMap[2]) && (lin[pMap[2]] !== '')) : true;
                    if (cond) {
                        // 07.02.13 on; moznost dotazeni ZF
                        if (pMap[1].piece(',', 1) === '@DFS') {
                            if (pRecord) {
                                i3.WS.display({
                                    success: function(pRec) {
                                        //console.log('success');
                                        lin2[pMap[0]] = pRec.data[0];
                                        // zavola rekurzivne funkci pro dalsi instanci
                                        //setTimeout(self, 10);
                                        self();
                                    },
                                    failure: function(msg) {
                                        //console.log('failure');
                                        // 'Display format request failed: '
                                        i3.displayError(i3.tx.txDisplayFmtFailed + msg);
                                        // zavola rekurzivne funkci pro dalsi instanci
                                        //setTimeout(self, 10);
                                        self();
                                    },
                                    scope: this
                                }, pRecord, pMap[1].piece(',', 2));
                            } else {
                                lin2[pMap[0]] = undefined;
                                self();
                            }
                        } else {
                            //console.log('x');
                            // zdrojove data z linearizovanej verzie MARC zaznamu, niektore polia mozu byt opakovatelne
                            var src = lin[pMap[1]];
                            // 11.06.12 on; reseni opakovatelnych podpoli
                            /*// ma aktualne pole viac ako jedno opakovanie?
                            if(Ext.isArray(src)) {
                            // opakovania zlucime pomocnym oddelovacom
                            src = src.join(i3.c.SFFldsDelim);
                            }*/
                            // pole lin2 tak uz nebude obsahovat opakovane hodnoty
                            lin2[pMap[0]] = src;
                            // zavola rekurzivne funkci pro dalsi instanci
                            //setTimeout(self, 10);
                            self();
                        }
                    } else {
                        // zavola rekurzivne funkci pro dalsi instanci
                        //setTimeout(self, 10);
                        self();
                    }
                } else {
                    // 27.07.17 on; vrati i cely zaznam
                    that.csLoadMarcRecordEnd(lin2, pRecord);
                }
            })();
        }
    },
    setValue: function(pValue) {
        // 21.10.21 on; moznost zapojit callback pro upravu hodnoty
        if (this.csSetValueCallback) {
            pValue = this.csSetValueCallback.call(this.csScope || this, pValue);
        }
        Ext.form.ComboBox.superclass.setValue.call(this, pValue);
    }
    /*getMarc : function() {
    var retVal = {};
    retVal[this.field] = this.getValue();
    return retVal;
    },*/
    // @param {Object} db nazev DB, ze ktere se zaznam dotahuje
    /*setMarc : function(marc, convert, convertGroup, db) {
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
     },*/
    /*setPropertyTitle : function(titles) {
     // 25.10.11 on; preda uzivatelsky nazev pole
     if (this.label) {
     this.label.update(epca.form.Helper.findTitle(titles, this.tag + this.field, this));
     }
     },*/
    /*validate : function() {
     // 05.03.14 on; property Required
     var bValidReq;
     if (this.required) {
     bValidReq = (this.getValue() !== '');
     } else {
     bValidReq = true;
     }

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
     }*/
});
Ext.reg('cs_search_combobox_fs', i3.ui.SearchComboBoxFs);
i3.ui.SearchComboBox = Ext.extend(i3.ui.SearchComboBoxFs, {
    /** constructor: zadanie defaultov
     *
     * @param {Object} config
     *
     * 02.12.14 on; zalozeno
     */
    constructor: function(config) {
        config = config || {};
        /*Ext.applyIf(config, {
         // 02.12.14 on; muze byt editovatelny
         //              browse popup a dyntrigger
         cls: config.editable ? '' : this.csTriggerEditCls,
         listeners: { // 26.07.17 on; doplnena reakce na enter
         specialkey: function(field, el) {
         if (el.getKey() === Ext.EventObject.ENTER) {
         this.csOnSearch(1);
         }
         },
         scope: this
         }
         });*/
        i3.ui.SearchComboBox.superclass.constructor.call(this, config);
    },
    /**
     * Prevezme MARC zaznam autority
     * @param {Object} pRecord - MARC zaznam vybrany uzivatelom vo flexpope
     */
    csLoadMarcRecord: function(pRecord) {
        /*if (Ext.isArray(pRecord)) {
         this.csLoadMarcRecordArr(pRecord);
         } else {*/
        this.csGetFields2Load(pRecord);
        //}
    },
    /**
     * Dokonceni csLoadMarcRecord
     * 
     */
    csLoadMarcRecordEnd: function(lin, pRecord) {
        if (lin) {
            this.values = lin;
            this.updateDisplayVal();
        } else {
            lin = {};
        }
        // 29.03.22 on; dotazeni i do jinych poli
        if (lin) {
            var namsp = this.nameSpace || 'a';
            // 16.06.17 on; pokud je potreba nejak osetrit data pred dotazenim, lze to pres metodu
            if (this.csBeforePopulate) {
                this.csBeforePopulate(lin, pRecord, this.values[this.subtag], this.subtag);
            } else
            if (this.csDataForm && this.csDataForm.csBeforePopulate) {
                // 26.09.23 on; pridan hledany termin
                this.csDataForm.csBeforePopulate(lin, pRecord, this.values[this.subtag], this.subtag);
            }
            this.csDataForm.populate(lin, namsp, 'field', {
                setupAll: false
            });
            this.csDataForm.doLayout();
        }
        // 27.07.17 on; moznost zavolat metodu po nahrani zaznamu do hlavniho formulare
        if (this.csAfterLoadRecord) {
            this.csAfterLoadRecord(pRecord);
        }
    },
    /**
     * Private pre csLoadMarcRecord
     * Extrakcia poli z MARC zaznamu podla nastavenia - vysledkom je objekt k prvkami na vlozenie do formulara
     * @param {Object} pRecord - MARC zaznam vybrany uzivatelom vo flexpope
     */
    csGetFields2Load: function(pRecord) {
        // 05.05.11 on; var lin
        var lin;
        // ak pride null forwardnut null (09.09.09 rs - napr. prazdny zaznam z flexpopu)
        if (pRecord) {
            //i3.alert('loading record ' + Ext.encode(pRecord));
            var oErr = {};
            var marcConv = this.csMarcConvDef;
            if (!marcConv) {
                i3.intError('i3.ui.AuthSelectForm.csGetFields2Load: marc conv table is null!');
                return;
            }
            lin = i3.DataFmt.fromMarc(this.csMarcConvDef, pRecord, oErr);
            if (oErr.tx) {
                i3.alert('Error linearizing MARC record: ' + oErr.tx);
                return null;
            }
        } else {
            // toto je specialny pripad, kedy z flexpopu resp. "zo zdroja" pride null zaznam
            // vtedy vygenerujeme "clear all" lin2 zaznam a ten potom prenesieme do formulara
            // vlastne take pomocne nudzove riesenie
            lin = {};
        }
        // predelane - Musi se volat rekurzivne, protoze bylo pridane nacteni ZF ze serveru
        // transformacia autority do cieloveho tagu
        /*var lin2 = {},
         Ext.each(this.csLoadMarcMap, function(pMap) {
         // 25.11.09 on; na treti pozici muze byt podminka - zatim pouze nazev pole a
         //              kotroluje se, zda je vyplnene
         var cond = pMap[2] ? ((pMap[2]) && (lin[pMap[2]] !== '')) : true;
         if (cond) {
         // zdrojove data z linearizovanej verzie MARC zaznamu, niektore polia mozu byt opakovatelne
         var src = lin[pMap[1]];
         // 11.06.12 on; reseni opakovatelnych podpoli
         // ma aktualne pole viac ako jedno opakovanie?
         //if(Ext.isArray(src)) {
         // opakovania zlucime pomocnym oddelovacom
         //src = src.join(i3.c.SFFldsDelim);
         //}
         // pole lin2 tak uz nebude obsahovat opakovane hodnoty
         lin2[pMap[0]] = src;
         }
         });*/
        var cond,
            that = this,
            lin2 = {};
        // musim si udelat kopii
        var aMarcMap = i3.c.cloneObject(that.csLoadMarcMap);
        // 27.09.23 on;
        if (aMarcMap.length === 0) {
            that.csLoadMarcRecordEnd(null, pRecord);
        }
        if (!!aMarcMap.length) {
            (function() {
                var pMap,
                    self = arguments.callee;
                pMap = aMarcMap.shift();
                if (pMap) {
                    cond = pMap[2] ? ((pMap[2]) && (lin[pMap[2]] !== '')) : true;
                    if (cond) {
                        // 07.02.13 on; moznost dotazeni ZF
                        if (pMap[1].piece(',', 1) === '@DFS') {
                            if (pRecord) {
                                i3.WS.display({
                                    success: function(pRec) {
                                        //console.log('success');
                                        var data;
                                        data = pRec.data[0];
                                        // 27.08.23 on; pridana podminka
                                        // 14.10.21 on;
                                        if (data && data.csDeleteInterpunction) {
                                            data = data.csDeleteInterpunction();
                                        }
                                        lin2[pMap[0]] = data;
                                        // zavola rekurzivne funkci pro dalsi instanci
                                        //setTimeout(self, 10);
                                        self();
                                    },
                                    failure: function(msg) {
                                        //console.log('failure');
                                        // 'Display format request failed: '
                                        i3.displayError(i3.tx.txDisplayFmtFailed + msg);
                                        // zavola rekurzivne funkci pro dalsi instanci
                                        //setTimeout(self, 10);
                                        self();
                                    },
                                    scope: this
                                }, pRecord, pMap[1].piece(',', 2));
                            } else {
                                lin2[pMap[0]] = undefined;
                                self();
                            }
                        } else {
                            //console.log('x');
                            // zdrojove data z linearizovanej verzie MARC zaznamu, niektore polia mozu byt opakovatelne
                            var src = lin[pMap[1]];
                            // 11.06.12 on; reseni opakovatelnych podpoli
                            /*// ma aktualne pole viac ako jedno opakovanie?
                            if(Ext.isArray(src)) {
                            // opakovania zlucime pomocnym oddelovacom
                            src = src.join(i3.c.SFFldsDelim);
                            }*/
                            // 27.08.23 on; pridana podminka
                            // 14.10.21 on;
                            if (src && src.csDeleteInterpunction) {
                                src = src.csDeleteInterpunction();
                            }
                            // pole lin2 tak uz nebude obsahovat opakovane hodnoty
                            lin2[pMap[0]] = src;
                            // zavola rekurzivne funkci pro dalsi instanci
                            //setTimeout(self, 10);
                            self();
                        }
                    } else {
                        // zavola rekurzivne funkci pro dalsi instanci
                        //setTimeout(self, 10);
                        self();
                    }
                } else {
                    // 27.07.17 on; vrati i cely zaznam
                    that.csLoadMarcRecordEnd(lin2, pRecord);
                }
            })();
        }
    },
    /**
     * Update displayed value according to internal hidden 'values'.
     * Which fields from 'values' will be displayed is set by displayVal property (array).
     * Values to display will be concatenated by ', '.
     *
     * 20.04.09 rs; added support for format 'xx[idx].yy' needed for nested data structures
     */
    updateDisplayVal: function() {
        var sDisp = '',
            i,
            av,
            that;
        var aValues = this.values || {};
        // 05.05.20 on; moznost zobrazit pole z celeho zaznamu
        if (this.displayValFromLinRecord) {
            aValues = this.csDataForm.csLinRecord;
        }
        if (!Ext.isArray(this.displayVal)) {
            return;
        }
        that = this;
        Ext.each(this.displayVal, function(s1) {
            var v = null,
                v1;
            if (s1.indexOf('.') >= 0) {
                // Expected format: 'xx[idx].yy'
                // don;t want to use eval, so do simple parsing instead
                // fixed format expected
                var f1 = s1.piece('.', 1).piece('[', 1);
                var fIDX = s1.piece('[', 2).piece(']', 1);
                var f2 = s1.piece('.', 2);
                if ((f1 === '') || (fIDX === '') || (f2 === '')) {
                    return;
                }
                var a = aValues[f1];
                if (!Ext.isArray(a) || (typeof a[fIDX] !== 'object')) {
                    return;
                }
                v = a[fIDX][f2];
            } else {
                // Expected format: 'xx'
                v = aValues[s1];
            }
            if (v && (v !== '')) {
                if (sDisp !== '') {
                    sDisp = sDisp.trim();
                    // don't append ',' if the string already ends with a comma
                    if (sDisp[sDisp.length - 1] !== ',') {
                        sDisp += ',';
                    }
                    // append space
                    sDisp += ' ';
                }
                // 08.03.12 on; osetri opakovatelne hodnoty
                if (v.indexOf(i3.c.SFFldsDelim) > 0) {
                    av = v.split(i3.c.SFFldsDelim);
                    v = '';
                    for (i = 0; i < av.length; i += 1) {
                        v1 = av[i];
                        // presun do csGetFields2Load
                        /*if (v1.csDeleteInterpunction) {
                         v1 = v1.csDeleteInterpunction();
                         }*/
                        if (v !== '') {
                            v += ', ';
                        }
                        v = v + v1;
                    }
                } else {
                    // presun do csGetFields2Load
                    // 26.01.12 on; doplnene odstraneni intepunkce na konci pole - zatim tady pro vsechny hodnoty
                    /*if (v.csDeleteInterpunction) {
                    v = v.csDeleteInterpunction();
                    }*/
                    // 08.10.13 on; moznost upravit zobrazenou hodnotu - zatim jenom tady - pouzito v digitalni kronice
                    if (that.csShowValueFn) {
                        v = that.csShowValueFn(v);
                    }
                }
                // append value to display
                sDisp += v;
            }
        });
        sDisp = sDisp.trim();
        Ext.ux.DynTriggerField.superclass.setValue.call(this, sDisp);
        // 12.02.13 on; vyvolam udalost change - v interpi na ni odchytavam zmenu hintu
        this.fireEvent('change', this, this.value);
    },
    /**
     * Get value for dynamic trigger field.
     * May be used in Ext.form.FormPanel.extract()
     *
     * @return hidden data of the dyn.trigger field
     */
    getValue: function() {
        // 27.09.23 on; moznost vracet pouze obsah pole jako retezec (ne cely objekt)
        if (this.csGetSimpleValueOnly) {
            return Ext.form.ComboBox.superclass.getValue.call(this);
        }
        return this.values;
    },
    /**
     * obsah pole
     */
    getValue1: function() {
        return Ext.form.ComboBox.superclass.getValue.call(this);
    },
    /**
     * Set value of dynamic trigger field.
     * May be used in Ext.form.FormPanel.populate()
     *
     * @param {Object} pValue - value to be set
     *    1, one string value: just calls Ext.form.TriggerField.setValue
     *    2, object:
     */
    setValue: function(pValue) {
        // 13.12.21 on; scan zapojen
        if (this.csScan || this.csScanAndSearch) {
            // zavola callback s novym heslem
            if (this.csSetValueCallback) {
                pValue = this.csSetValueCallback.call(this.csScope || this, pValue);
            }
            if (!this.values) {
                this.values = {};
            }
            // po vyberu z nabidky nebo zapisem do pole
            if (typeof pValue === 'string') {
                // pokud je hodnota shodna s tim, co uz v poli je (bylo dotazeno vyberem z comboboxu), nebudu nic menit
                //if (this.values[this.subtag] === pValue) {
                //  return;
                //}
                this.values[this.subtag] = pValue;
            } else {
                // pri otevreni zaznamu
                this.values = pValue;
            }
            this.updateDisplayVal();
            return;
        }
        // pokud uzivatel zadal text a nevybral nic z nabicky, ponecha pouze text
        if (typeof pValue === 'string') {
            if (!this.values) {
                this.values = {};
            }
            // 09.11.21 on; pokud je hodnota shodna s tim, co uz v poli je (bylo dotazeno vyberem z comboboxu), nebudu nic menit
            if (this.values[this.subtag] === pValue) {
                return;
            }
            /*Ext.ux.DynTriggerField.superclass.setValue.call(this, pValue);
            // 12.05.09 rs; synchronize displayed value & underlying data
            this.updateDisplayVal();*/
            // smaze vse krome indikatoru
            //this.values = {};
            var prop;
            for (prop in this.values) {
                if (this.values.hasOwnProperty(prop)) {
                    if ((prop.substring(prop.length - 2, prop.length) !== 'i1') && (prop.substring(prop.length - 2, prop.length) !== 'i2')) {
                        this.values[prop] = '';
                    }
                }
            }
            if (!this.values) {
                this.values = {};
            }
            this.values[this.subtag] = pValue;
            this.updateDisplayVal();
            return;
        }
        if (typeof pValue !== 'object') {
            return;
        }
        this.values = {};
        // new object
        // make a copy of the passed values
        Ext.apply(this.values, pValue);
        this.updateDisplayVal();
    }
    /**
     * Prevezme postupne vsechny zaznamy v poli
     * @param {Array} pRecord - pole zaznamu
     *
     * 30.08.18 on;
     */
    /*csLoadMarcRecordArr: function(paRecords) {
     var i;
     var panel = this.ownerCt;
     var idx = panel.items.indexOf(this);
     if (paRecords.length > 0) {
     // prvni prvek vlozime to existuiciho pole
     this.csGetFields2Load(paRecords[0]);
     for (i = (paRecords.length - 1); i > 0; i -= 1) {
     // vytvorime nove opakovani
     this.fireEvent('onIconPlus', this);
     // nahrajeme zaznam
     this.csGetFields2Load.call(panel.items.items[idx + 1], paRecords[i]);
     }
     }
     }*/
});
Ext.reg('cs_search_combobox', i3.ui.SearchComboBox);
