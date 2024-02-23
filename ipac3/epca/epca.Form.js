/**
 *
 * 27.02.23 on; minus na poli
 * 04.11.21 on; html kod v labelu
 * 06.01.21 on; sirka musi byt jako cislo
 * 21.12.20 on; zmena, pokud neco zapise do pole a da enter, tak uz se pole netvari jako prazdne
 * 28.02.20 on; zapojeno volani funkce po dotazeni autoroity
 * 30.01.20 on; osetreni prazdnych kontejneru
 * 17.12.19 on; pridana podminka, aby se nove opakovani pridavalo pouze pokud jde o nove opakovani pole (nejde o aktualizaci pole)
 * 26.11.19 on; potrebuju docilit toho, aby se subtagy v objektu neprehazovaly - doplnim do nazvu subtagu prefix
 * 11.07.19 on; osetreno getDesignedTag
 * 10.08.17 on; skryte limity pro vyhledavani
 * 06.04.17 on; uprava getFormRecodId
 * 04.04.17 on; oprava kodovanych udaju
 * 10.02.17 on; uprava csLoadFlexPopupRecord
 * 20.10.16 on; pri automatickem pridanavi noveho fieldsetu vynucena aktualizace tlacitek
 * 22.09.16 on; rozsirena csLoadFlexPopupRecord
 * 11.07.16 on; rozsireno AddNewFieldsetRepetition
 * 02.06.16 on; fldDoNotDisable
 * 24.05.16 on; uprava kodovanych udaju
 * 20.05.16 on; uprava csLoadFlexPopupRecord
 * 18.02.16 on; uprava getDesignedField
 * 07.03.14 on; podpora jazykovych mutaci v nazvu formulare
 * 24.02.14 on; moznost zadat uzivatelsky nazev ciselniku
 * 21.05.12 on; oprava dotazeni zaznamu  v csLoadFlexPopupRecord
 * 09.12.11 on; uprava metody generate, getDesignedTag a getDesignedField
 */
// jslint params
/*global epca, Ext, i3, setTimeout*/
epca.Form = function(config) {
    config = config || {};
    Ext.apply(this, config);
};
/**
 * Trieda pre formular, ktora obsahuje okrem jeho definicie, dalsie udaje
 */
epca.Form.prototype = {
    formId: undefined,
    unFormat: '',
    title: '',
    targetDb: '',
    formDFST: '',
    createdBy: '',
    defaultValues: undefined,
    content: [],
    customCode: '',
    t005: undefined,
    t999: undefined,
    /**
     * Formular skonvertovany do triedy i3.Marc
     */
    getFormRecord: function() {
        var i,
            record = {
                100: {
                    a: this.unFormat
                },
                200: {
                    a: this.title
                },
                300: {
                    a: this.targetDb
                },
                400: {
                    a: this.createdBy
                },
                450: {
                    a: Ext.util.JSON.encode(this.defaultValues || {})
                },
                500: []
            };
        for (i = 0; i < this.content.length; i++) {
            record['500'].push({
                a: Ext.util.JSON.encode(this.content[i]) //,
                //b : "" // custom code pre jednotlive tagy pojdu sem,
                //aj ked by to bolo dobre pamatat pre jednotlive polia
            });
        }
        record['500'].push({
            b: '"' + Ext.encode(this.customCode) + '"'
        });
        if (this.formId) {
            record['001'] = {
                '.': this.formId
            };
        }
        if (this.t005) {
            record['005'] = {
                '.': this.t005
            };
        }
        if (this.t999) {
            record['999'] = {
                '.': this.t999
            };
        }
        return epca.convertToMarc(record);
    },
    /**
     * Inicializacia instancie, nacitanie udajov zo zaznamu
     * @param {Object} formRecord
     */
    setFormRecord: function(formRecord) {
        var i;
        this.formId = formRecord.getTag('001.', 0);
        this.unFormat = formRecord.getTag('100a', 0);
        this.title = formRecord.getTag('200a', 0);
        this.targetDb = formRecord.getTag('300a', 0);
        this.createdBy = formRecord.getTag('400a', 0);
        var value = formRecord.getTag('450a', 0);
        this.defaultValues = Ext.util.JSON.decode(Ext.isEmpty(value) ? "''" : value);
        this.content = [];
        value = formRecord.getTag('500a', -1);
        for (i = 0; i < value.length; i++) {
            this.content.push(Ext.util.JSON.decode(value[i]));
        }
        this.customCode = formRecord.getTag('500b', 0);
        this.t005 = formRecord.getTag('005.', 0);
        this.t999 = formRecord.getTag('999.', 0);
    },
    getContent: function() {
        return this.content;
    },
    /**
     * Vrati zoznam tagov, ktore obsahuje formular, kvoli aktualizacii nadpisov
     */
    getContentTags: function() {
        var i,
            j,
            k,
            l,
            tag,
            tag1,
            contentTag,
            codedItem,
            retVal = [],
            bTagFound;
        // zjisti, jestli tag uz neexistuje
        var findTag = function(retVal, psTag) {
            var m,
                o;
            for (m = 0; m < retVal.length; m++) {
                o = retVal[m];
                if (o.id === psTag) {
                    return o;
                }
            }
            return undefined;
        };
        for (i = 0; i < this.content.length; i++) {
            tag = this.content[i];
            // 06.08.15 on; podpora pro kontejnery
            if (tag.formProperties.csContainer) {
                // 30.01.20 on; kontejner muze byt prazdny
                if (tag.items) {
                    for (l = 0; l < tag.items.length; l++) {
                        tag1 = tag.items[l];
                        contentTag = findTag(retVal, tag1.formProperties.tag);
                        if (!contentTag) {
                            bTagFound = false;
                            contentTag = {
                                id: tag1.formProperties.tag,
                                fields: ['']
                            };
                        } else {
                            bTagFound = true;
                        }
                        // podpole v kontejneru
                        if (!i3.isEmptyString(tag1.formProperties.field)) {
                            contentTag.fields.push(tag1.formProperties.field);
                            if (tag1.formProperties.codedItems) {
                                for (k = 0; k < tag1.formProperties.codedItems.length; k++) {
                                    codedItem = tag1.formProperties.codedItems[k];
                                    // 24.05.16 on; podminka
                                    if (codedItem.convertGroup === tag1.formProperties.convertGroup) {
                                        contentTag.fields.push(epca.formatFieldId(codedItem.field, codedItem.position, codedItem.dataLength));
                                    }
                                }
                            }
                        } else {
                            // 30.01.20 on; tag bez subtagu
                            if (tag1.items) {
                                for (j = 0; j < tag1.items.length; j++) {
                                    if (tag1.items[j].checked) {
                                        contentTag.fields.push(tag1.items[j].formProperties.field);
                                        if (tag1.items[j].formProperties.codedItems) {
                                            for (k = 0; k < tag1.items[j].formProperties.codedItems.length; k++) {
                                                codedItem = tag1.items[j].formProperties.codedItems[k];
                                                // 24.05.16 on; podminka  // TOD
                                                if (codedItem.convertGroup === tag1.items[j].formProperties.convertGroup) {
                                                    contentTag.fields.push(epca.formatFieldId(codedItem.field, codedItem.position, codedItem.dataLength));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (!bTagFound) {
                            retVal.push(contentTag);
                        }
                    }
                }
            } else {
                contentTag = {
                    id: tag.formProperties.tag,
                    fields: ['']
                };
                // 30.01.20 on; tag muze byt prazdny
                if (tag.items) {
                    for (j = 0; j < tag.items.length; j++) {
                        if (tag.items[j].checked) {
                            contentTag.fields.push(tag.items[j].formProperties.field);
                            if (tag.items[j].formProperties.codedItems) {
                                for (k = 0; k < tag.items[j].formProperties.codedItems.length; k++) {
                                    codedItem = tag.items[j].formProperties.codedItems[k];
                                    // 24.05.16 on; podminka
                                    if (codedItem.convertGroup === tag.items[j].formProperties.convertGroup) {
                                        contentTag.fields.push(epca.formatFieldId(codedItem.field, codedItem.position, codedItem.dataLength));
                                    }
                                }
                            }
                        }
                    }
                }
                retVal.push(contentTag);
            }
        }
        return retVal;
    },
    /**
     * Vrati hlavne parametre formulara
     */
    getProperties: function() {
        return {
            formName: this.title,
            formId: this.formId,
            formDate: (new Date()).format("d.m.Y"), // cas z t005
            formAuthor: this.createdBy,
            formDBTable: this.targetDb,
            formTablesdCache: this.formTablesdCache,
            // 16.05.15 on;
            formDFST: this.formDFST
        };
    },
    /**
     * Vrati id formulara, ak neexistuje vygeneruje novy
     * Tvar id: Format_Uzivatel_DatumCasVytvorenia
     *
     * 06.04.17 on; pridany parametr psFormId - pouzite pri ulozeni noveho formulare
     */
    getFormRecodId: function(psFormId) {
        if (this.formId) {
            return this.formId;
        }
        // 06.04.17 on;
        if (psFormId) {
            this.formId = psFormId;
            return this.formId;
        }
        // 02.08.11 on; pro id formulare se pouzije jeho prvni nazev (zatim)
        //this.formId = epca.WsForm.getFormRecordIdPrefix(this.unFormat) + '_' + i3.Login.ctx.userName + '_' + (new Date().format('U'));
        this.formId = this.title;
        return this.formId;
    },
    /**
     * Vygeneruje z definicie formular kod vhodny pre zobrazenie
     * @param {Object} dontShowHiddenTags ak true, nezobrazi tagy s nastavenym parametrom hidden = true
     *
     * 09.12.11 on; predelane - donRenderHiddenTags -> dontShowHiddenTags
     */
    generate: function(dontShowHiddenTags) {
        var i,
            tagProperties,
            retVal = epca.cloneObject(this.getProperties());
        Ext.apply(retVal, {
            xtype: 'epca.marc_fieldset',
            autoHeight: true,
            // 14.01.16 on; nefunguje spravne v IE, osetreno v bodyresize panelu
            //autoWidth : true,
            labelWidth: 200,
            // 07.03.14 on; jazykove mutace
            title: retVal.formName.ls(),
            items: []
        });
        dontShowHiddenTags = dontShowHiddenTags || false;
        for (i = 0; i < this.content.length; i++) {
            tagProperties = this.content[i].formProperties;
            if (dontShowHiddenTags === false) {
                delete tagProperties.hidden;
            }
            // 09.12.11 on; potrebuju aby byl i skryty tag na formulari kvuli defaultnim hodnotam
            retVal.items.push(this.getDesignedTag(this.content[i], dontShowHiddenTags));
        }
        return retVal;
    },
    /**
     * Vygeneruje z definicie tag - kod vhodny pre zobrazenie do formulara
     * @param {Object} item
     * @param {Object} dontShowHiddenFields ak true, nezobrazi pole s nastavenym parametrom hidden = true
     */
    getDesignedTag: function(item, dontShowHiddenFields) {
        var i,
            k,
            designedTag,
            o = epca.cloneObject(item.formProperties);
        // 06.08.15 on; podpora kontejneru
        if (o.csContainer) {
            // kontejner
            Ext.apply(o, {
                autoHeight: true,
                // 08.02.16 on; zmena
                //autoWidth : true,
                anchor: '-5',
                labelWidth: 200,
                title: o.containerLabelUser || '',
                items: []
            });
            dontShowHiddenFields = dontShowHiddenFields || false;
            // 11.07.19 on; nemusi mit poduzly
            if (item.items) {
                // tagy - nemusi vubec existovat
                for (k = 0; k < item.items.length; k++) {
                    if (!i3.isEmptyString(item.items[k].formProperties.field)) {
                        designedTag = this.getDesignedField(item.items[k]);
                    } else {
                        Ext.apply(item.items[k].formProperties, {
                            autoHeight: true,
                            // 08.02.16 on; zmena
                            //autoWidth : true,
                            anchor: '-5',
                            labelWidth: 200,
                            // 03.12.15 on; osetreny undefined hodnoty
                            //title : item.items[k].formProperties.tag + ' ' + item.items[k].formProperties.tagLabel,
                            title: item.items[k].formProperties.tag ? item.items[k].formProperties.tag + ' ' + item.items[k].formProperties.tagLabel : ' ', // zatim tu necham mezeru, skryje se to pripadne pozdej v setPropertyTitle
                            items: []
                            // zruseno kvuli chybe "too much recursion"
                            /*tools : [{
                             id : 'csCheckError', // !! pri zmene id pozor, pouziva se na vice mistech
                             //qtip: i3.tx.txReadOnly, // neni treba, pozdej se prepise udaji o tom, kdo ma zaznam zamknuty
                             hidden : true,
                             handler : function(e, tool) {
                             this.onToolsCheck(tool);
                             },
                             scope : this
                             }, {
                             id : 'csCheckWarning', // !! pri zmene id pozor, pouziva se na vice mistech
                             //qtip: i3.tx.txReadOnly, // neni treba, pozdej se prepise udaji o tom, kdo ma zaznam zamknuty
                             hidden : true,
                             handler : function(e, tool) {
                             this.onToolsCheck(tool);
                             },
                             scope : this
                             }, {
                             id : 'csCheckInfo', // !! pri zmene id pozor, pouziva se na vice mistech
                             //qtip: i3.tx.txReadOnly, // neni treba, pozdej se prepise udaji o tom, kdo ma zaznam zamknuty
                             hidden : true,
                             handler : function(e, tool) {
                             this.onToolsCheck(tool);
                             },
                             scope : this
                             }]*/
                        });
                        //designedTag.items.push(item.items[k].formProperties);
                        designedTag = item.items[k].formProperties;
                        // subtagy
                        // 30.01.20 on; tag v kontejneru bez subtagu
                        if (item.items[k] && item.items[k].items) {
                            for (i = 0; i < item.items[k].items.length; i++) {
                                if (item.items[k].items[i].checked) {
                                    if (dontShowHiddenFields === false) {
                                        delete item.items[k].items[i].formProperties.hidden;
                                    }
                                    // 09.12.11 on; potrebuju aby byl i skryty subtag na formulari kvuli defaultnim hodnotam
                                    //designedTag.items[k].items.push(this.getDesignedField(item.items[k].items[i]));
                                    designedTag.items.push(this.getDesignedField(item.items[k].items[i]));
                                }
                            }
                        }
                        // opakovatelny tag/kontejner
                        if (designedTag.repeatable && designedTag.repeatable === true) {
                            // mozno zmazat nepotrebne prvky z fieldov ako sirka labelu a podobne
                            designedTag = {
                                xtype: 'epca.repeatable_encapsulation',
                                autoHeight: true,
                                // 08.02.16 on; zmena
                                //autoWidth : true,
                                anchor: '-5',
                                labelWidth: 200,
                                item: designedTag,
                                disabled: designedTag.disabled || false,
                                // 30.09.15 on; prenos convertMap a doNotDisable
                                convertMap: designedTag.convertMap,
                                doNotDisable: designedTag.doNotDisable,
                                hidden: designedTag.hidden || false // 09.12.11 on; prenos hidden property
                            };
                        }
                    }
                    o.items.push(designedTag);
                }
            }
            // 30.10.15 on; podpora pro tlacitko minus
            // opakovatelny kontejner
            if ((o.repeatable && o.repeatable === true) || o.minusBtn) {
                // mozno zmazat nepotrebne prvky z fieldov ako sirka labelu a podobne
                return {
                    xtype: 'epca.repeatable_encapsulation',
                    autoHeight: true,
                    // 08.02.16 on; zmena
                    //autoWidth : true,
                    anchor: '-5',
                    labelWidth: 200,
                    item: o,
                    disabled: o.disabled || false,
                    hidden: o.hidden || false, // 09.12.11 on; prenos hidden property
                    onlyMinusBtn: o.minusBtn // 30.10.15 on; prenos
                };
            }
        } else {
            Ext.apply(o, {
                autoHeight: true,
                // 08.02.16 on; zmena
                //autoWidth : true,
                anchor: '-5',
                labelWidth: 200,
                title: o.tag + ' ' + o.tagLabel,
                items: [],
                tools: [{
                    id: 'csCheckError', // !! pri zmene id pozor, pouziva se na vice mistech
                    //qtip: i3.tx.txReadOnly, // neni treba, pozdej se prepise udaji o tom, kdo ma zaznam zamknuty
                    hidden: true,
                    handler: function(e, tool) {
                        this.onToolsCheck(tool);
                    },
                    scope: this
                }, {
                    id: 'csCheckWarning', // !! pri zmene id pozor, pouziva se na vice mistech
                    //qtip: i3.tx.txReadOnly, // neni treba, pozdej se prepise udaji o tom, kdo ma zaznam zamknuty
                    hidden: true,
                    handler: function(e, tool) {
                        this.onToolsCheck(tool);
                    },
                    scope: this
                }, {
                    id: 'csCheckInfo', // !! pri zmene id pozor, pouziva se na vice mistech
                    //qtip: i3.tx.txReadOnly, // neni treba, pozdej se prepise udaji o tom, kdo ma zaznam zamknuty
                    hidden: true,
                    handler: function(e, tool) {
                        this.onToolsCheck(tool);
                    },
                    scope: this
                }]
                //collapsible: true,
                //iconCls : 'icon-add'
                //style : 'margin: 30px auto;' + 'position: relative;' // support the [+] button
                //style : 'margin: 30px auto; position: relative;' // support the [+] button
            });
            /*var oIcon = {// [Add] button
             xtype : 'button',
             name : 'AddDirectAttr',
             style : 'position: absolute; top: ' + (Ext.isGecko ? -5 : 0) + 'px; right: 10px;',
             iconCls : 'icon-add'
             }// eo [Add] button
             ;
             o.items.push(oIcon);*/
            dontShowHiddenFields = dontShowHiddenFields || false;
            // 11.07.19 on; nemusi mit poduzly
            if (item.items) {
                for (i = 0; i < item.items.length; i++) {
                    if (item.items[i].checked) {
                        if (dontShowHiddenFields === false) {
                            delete item.items[i].formProperties.hidden;
                        }
                        // 09.12.11 on; potrebuju aby byl i skryty subtag na formulari kvuli defaultnim hodnotam
                        o.items.push(this.getDesignedField(item.items[i]));
                    }
                }
            }
            // 30.10.15 on; tlacitko minus
            // opakovatelny tag
            if ((o.repeatable && (o.repeatable === true)) || o.minusBtn) {
                // mozno zmazat nepotrebne prvky z fieldov ako sirka labelu a podobne
                return {
                    xtype: 'epca.repeatable_encapsulation',
                    autoHeight: true,
                    // 08.02.16 on; zmena
                    //autoWidth : true,
                    anchor: '-5',
                    labelWidth: 200,
                    item: o,
                    disabled: o.disabled || false,
                    hidden: o.hidden || false, // 09.12.11 on; prenos hidden property
                    onlyMinusBtn: o.minusBtn, // 30.10.15 on; prenos
                    minCount: o.minCount // 15.12.15 on; minimalni pocet opakovani
                    // 30.09.15 on; prenos convertMap - zatim jsem to zapojil jenom do kontejneru,
                    //              ale asi by to bylo dobre i tady (zatim ale neni potreba)
                    //convertMap : o.convertMap
                };
            }
        }
        return o;
    },
    /**
     * Vygeneruje z definicie podpole - kod vhodny pre zobrazenie do tagu
     * @param {Object} item
     */
    getDesignedField: function(item) {
        var i,
            designedField = epca.cloneObject(item.formProperties),
            flds,
            fld,
            aList,
            bCodedFieldFound = false,
            sHtmlCode;
        /*Ext.apply(designedField, {
        msgTarget : 'side',
        afterLabelTextTpl : 'Test 2'

        });*/
        //designedField.afterLabelTextTpl = '<img src="images/information.png" class="info_image" data-qtip="your help text or even html comes here...."></img>';
        // 26.11.19 on; potrebuju docilit toho, aby se subtagy v objektu neprehazovaly - doplnim do nazvu subtagu prefix
        if (designedField.field !== '.') {
            designedField.field = epca.form.Helper.c.sSubtagPrefix + designedField.field;
        }
        // 04.04.17 on; dostanu vsechno jako string
        if (typeof designedField.labelWidth === 'string') {
            designedField.labelWidth = parseInt(designedField.labelWidth, 10);
        }
        if (typeof designedField.dataLength === 'string') {
            designedField.dataLength = parseInt(designedField.dataLength, 10);
        }
        // 06.01.21 on; sirka musi byt jako cislo
        if (typeof designedField.width === 'string') {
            designedField.width = parseInt(designedField.width, 10);
        }
        // kodovane podpolia
        if (designedField.xtype === 'epca.codeddata_combobox') {
            // 24.02.14 on; moznost zadat uzivatelsky nazev ciselniku
            if (!i3.isEmptyString(designedField.fieldComboboxSTName)) {
                if (designedField.fieldComboboxSTName.indexOf('*') < 0) {
                    designedField.fieldComboboxSTName = i3.WS.getDfltUnTablesd() + '*' + designedField.fieldComboboxSTName;
                }
                designedField.csStatTableN = designedField.fieldComboboxSTName;
            }
            // 21.01.16 on; moznost zakazat tooltip v comboboxu
            designedField.csHideQtip = epca.Config.User.csHideTooltipInCombobox;
            designedField = this.getDesignedCodedField(designedField);
        } else
            // 27.10.11 on; flex popup
            if (designedField.xtype === 'cs_auth_select_form') {
                designedField.csFlexPopParams = {};
                // seznam db
                if (designedField.db) {
                    aList = [];
                    flds = designedField.db.split('|');
                    for (i = 0; i < flds.length; i++) {
                        fld = flds[i];
                        if (fld.piece('#', 2) !== '') {
                            aList.push([fld.piece('#', 1), fld.piece('#', 2)]);
                        } else {
                            aList.push(fld);
                        }
                    }
                    designedField.csFlexPopParams.classn = aList;
                }
                // seznam ZF
                if (designedField.displayFmtList) {
                    aList = [];
                    flds = designedField.displayFmtList.split('|');
                    for (i = 0; i < flds.length; i++) {
                        fld = flds[i];
                        aList.push(fld);
                    }
                    designedField.csFlexPopParams.displayFmtPnl = aList;
                }
                // seznam indexu
                if (designedField.idxlistStoreId) {
                    aList = [];
                    flds = designedField.idxlistStoreId.split('|');
                    for (i = 0; i < flds.length; i++) {
                        fld = flds[i];
                        aList.push(fld);
                    }
                    designedField.csFlexPopParams.idxlistStoreId = aList;
                }
                // seznam zkracenych ZF
                if (designedField.fmt) {
                    aList = [];
                    flds = designedField.fmt.split('|');
                    for (i = 0; i < flds.length; i++) {
                        fld = flds[i];
                        aList.push(fld);
                    }
                    designedField.csFlexPopParams.displayFmt = aList;
                }
                // 21.11.16 on; dboptions
                if (designedField.dbOptions) {
                    aList = [];
                    flds = designedField.dbOptions.split('|');
                    for (i = 0; i < flds.length; i++) {
                        fld = flds[i];
                        fld = fld.strswap('#', ',');
                        aList.push(fld);
                    }
                    designedField.csFlexPopParams.dbOptions = aList;
                }
                // 10.08.17 on; skryte limity pro vyhledavani
                if (!i3.isEmptyString(designedField.searchLimits)) {
                    //designedField.csFlexPopParams.searchLimits = designedField.searchLimits;
                    designedField.csFlexPopParams.colLimitsApplyCB = function(pStore) {
                        if (pStore.baseParams.query === '') {
                            pStore.baseParams.query = designedField.searchLimits;
                            return;
                        }
                        pStore.baseParams.query = '@and ' + designedField.searchLimits + ' ' + pStore.baseParams.query;
                    };
                }
                designedField.csFlexPopParams.initUseAttr = designedField.index;
                designedField.csLoadMarcRecord = this.csLoadFlexPopupRecord;
                designedField.csLoadMarcMap = [];
                //designedField.csFlexPopParams.scope = this;
                //designedField.csFlexPopParams.flexWinTitle = 'text';
                // 18.02.16 on; zmena z autoReturn na autoSearch
                // 12.01.16 on; pro cav automaticke vyhledavani i pri kliknuti  na  ikonu
                if (i3.ictx.toLowerCase() === 'cav') {
                    designedField.csFlexPopParams.autoSearch = true;
                }
            } else
                // 04.11.21 on; html kod v labelu
                if (designedField.xtype === 'epca.label') {
                    if (i3.language === '2') {
                        // cz
                        sHtmlCode = designedField.html2;
                    } else
                    if (i3.language === '3') {
                        // eng
                        sHtmlCode = designedField.html3;
                    } else {
                        // sk
                        sHtmlCode = designedField.html;
                    }
                    if (i3.isEmptyString(sHtmlCode)) {
                        // default sk
                        sHtmlCode = designedField.html;
                    }
                    designedField.html = sHtmlCode;
                    designedField.html2 = '';
                    designedField.html3 = '';
                }
        // kodovane vnorene podpolia
        if (designedField.codedItems) {
            designedField['items'] = [];
            for (i = 0; i < designedField.codedItems.length; i++) {
                // 24.05.16 on; podminka, jen pro moji skupinu
                if (designedField.convertGroup === designedField.codedItems[i].convertGroup) {
                    bCodedFieldFound = true;
                    designedField.items.push(this.getDesignedCodedField(designedField.codedItems[i]));
                }
            }
            // 24.05.16 on; pokud nenajde zadne pole, zkusi jeste skupinu "1"
            if (!bCodedFieldFound) {
                for (i = 0; i < designedField.codedItems.length; i++) {
                    if ('1' === designedField.codedItems[i].convertGroup) {
                        bCodedFieldFound = true;
                        designedField.items.push(this.getDesignedCodedField(designedField.codedItems[i]));
                    }
                    if (bCodedFieldFound) {
                        // pokud nasel, poznaci si to
                        item.formProperties.convertGroup = '1';
                    }
                }
            }
            delete designedField.codedItems;
        }
        // opakovatelne podpole
        // 27.02.23 on; pouze minus
        //if (designedField.repeatable && designedField.repeatable === true) {
        if ((designedField.repeatable && designedField.repeatable === true) || designedField.minusBtn) {
            // mozno zmazat nepotrebne prvky z fieldov ako sirka labelu a designedField.fieldLabel a podobne
            return {
                xtype: 'epca.repeatable_encapsulation',
                autoHeight: true,
                // 08.02.16 on; zmena
                //autoWidth : true,
                anchor: '-5',
                labelWidth: 200,
                fieldLabel: designedField.fieldLabel,
                fieldLabelUser: designedField.fieldLabelUser, // 25.10.11 on; uzivatelsky nazev
                tag: designedField.tag,
                field: designedField.field,
                item: designedField,
                disabled: designedField.disabled || false,
                convertMap: designedField.convertMap, // 20.09.11 on;
                hidden: designedField.hidden || false, // 09.12.11 on; prenos hidden property
                fldDoNotDisable: designedField.fldDoNotDisable, // 02.06.16 on; moznost zakazat zneplatneni podpole
                onlyMinusBtn: designedField.minusBtn // 27.02.23 on; prenos
            };
        }
        //Ext.apply(designedField, {});
        return designedField;
    },
    /**
     * Vygeneruje z definicie kodovane podpole - kod vhodny pre zobrazenie do tagu
     * @param {Object} field
     */
    getDesignedCodedField: function(field) {
        // 03.04.17 on; nove dostanu vsechno jako string
        if (typeof field.dataLength === 'string') {
            field.dataLength = parseInt(field.dataLength, 10);
        }
        if (typeof field.maxLength === 'string') {
            field.maxLength = parseInt(field.maxLength, 10);
        }
        if (typeof field.position === 'string') {
            field.position = parseInt(field.position, 10);
        }
        if (typeof field.valueLength === 'string') {
            field.valueLength = parseInt(field.valueLength, 10);
        }
        if (typeof field.labelWidth === 'string') {
            field.labelWidth = parseInt(field.labelWidth, 10);
        }
        if (field.valueLength && field.dataLength && (field.valueLength !== field.dataLength) && field.valueLength !== 0) {
            return {
                xtype: 'epca.repeatable_encapsulation',
                autoHeight: true,
                // 08.02.16 on; zmena
                //autoWidth : true,
                anchor: '-5',
                labelWidth: 200,
                item: field,
                fieldLabel: field.fieldLabel,
                fieldLabelUser: field.fieldLabelUser, // 25.10.11 on; uzivatelsky nazev
                maxCount: parseInt(field.dataLength / field.valueLength, 10),
                dataLength: field.dataLength,
                valueLength: field.valueLength,
                position: field.position,
                disabled: field.disabled || false
            };
            //dataLength, valueLength, position, fieldLabel - sa duplikuju mozu sa vymazat
        }
        return field;
    },
    /*
     * zpracuje zaznam nacteny z flexpopupu
     */
    csLoadFlexPopupRecord: function(selectedRecord) {
        // 10.02.17 on;
        function csWaitForSemafor(o) {
            var prop,
                v;
            for (prop in o) {
                if (o.hasOwnProperty(prop)) {
                    v = o[prop];
                    if (v) {
                        return true;
                    }
                }
            }
            // uz se nemusi cekat
            return false;
        }
        // 10.02.17 on;
        function csAddFormWait(cmp, tab, selectedRecord) {
            (function() {
                var self = arguments.callee;
                if (csWaitForSemafor(epca.semafor)) {
                    setTimeout(self, 1000);
                } else {
                    if (tab) {
                        // 28.02.20 on; zapojeno volani funkce po dotazeni autority
                        tab.ownerCt.ownerCt.csDoFnAfterLinkToRecord(cmp, selectedRecord);
                        tab.fireEvent('form_changed', this, tab);
                    }
                }
            })();
        }
        var marc = {},
            sClass = '',
            cmpOwner,
            bIsEmpty;
        if (selectedRecord) {
            sClass = selectedRecord.classn;
            // 20.05.16 on; zmena
            //marc = epca.convertToObject(selectedRecord.data, epca.Config.getUnFormat(sClass));
            marc = epca.convertToObject(selectedRecord.data, epca.Config.getDbFormat(sClass));
        }
        // 22.05.12 on; opravene PB v opakovatelnem poli
        // 21.05.12 on; pridane predani nazvu DB
        if (this.ownerCt) {
            // 21.12.20 on; zmena, pokud neco zapise do pole a da enter, tak uz se pole netvari jako prazdne 
            // 17.12.19 on; zapamatuju si, jestli se fieldset (aktualni pole) prazdny
            //bIsEmpty = i3.isEmptyString(this.getValue());
            bIsEmpty = !this.disabled;
            // 01.10.15 on; pridany parametr selectedRecord
            if ((this.ownerCt.xtype === 'epca.repeatable_encapsulation') && (this.ownerCt.ownerCt)) {
                cmpOwner = this.ownerCt.ownerCt.ownerCt;
                this.ownerCt.ownerCt.setMarc(marc, true, this.convertGroup, sClass, selectedRecord);
            } else {
                cmpOwner = this.ownerCt.ownerCt;
                this.ownerCt.setMarc(marc, true, this.convertGroup, sClass, selectedRecord);
            }
            // 17.12.19 on; pridana podminka, aby se nove opakovani pridavalo pouze pokud jde o nove opakovani pole (nejde o aktualizaci pole)
            // 22.09.16 on; moznost zakazat pridavani noveho opakovani pole primo v definici linkovatelneho podpole (noNewRepetition)
            // 06.01.16 on; jenom pro opakovatelne pole
            // 14.12.15 on; moznost pridat nove opakovani pole po dotazeni
            if (epca.Config.User.AddNewFieldsetRepetition && cmpOwner && (cmpOwner.xtype === "epca.repeatable_encapsulation") && cmpOwner.item && cmpOwner.item.repeatable && !this.noNewRepetition && bIsEmpty) {
                var n = cmpOwner.items.length;
                // 20.10.16 on; vynucena aktualizace tlacitek
                cmpOwner.addItem(undefined, true);
                // 11.07.16 on; je potreba precislovat fieldsety, pokud je nastaveno cislovani
                cmpOwner.csFieldsetReNumbering();
                // 16.12.15 on; nastavi defaultni hodnoty do noveho opakovani
                cmpOwner.csSetDefaultValues(n);
                // 11.07.16 on; presune se na prvni viditelny prvek
                epca.form.Helper.csSetOnFirstFieldInNewFieldset(cmpOwner, n);
            }
            // 21.01.16 on; na urovni aktivni zalozky vyvola udalost
            var tab;
            tab = epca.WsForm.csGetActiveTab();
            // 22.09.16 on; kvuli popup prebiracimu formulari, tam to zatim nepotrebuju
            if (tab) {
                // 10.02.17 on; event musim vyvolat az po nacteni vsech dotahovanych polozek
                //tab.fireEvent('form_changed', this, tab);
                csAddFormWait(this, tab, selectedRecord);
            }
        }
    },
    onToolsCheck: function(tool) {
        i3.alert(tool.dom.qtip);
    }
};
