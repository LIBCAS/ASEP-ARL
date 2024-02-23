/**
 * 26.03.21 on; zmena cteni taglistu
 * 23.01.20 on; getTagList, processTagListRecord
 * 13.09.17 on; podpora KV
 * 30.03.17 on; rozsireni ciselniku o csCBParams
 * 06.06.16 on; uprava isRepeatable
 * 24.05.16 on; kodovane udaje
 * 05.03.14 on; field required
 * 28.11.12 on; podpora STX
 * 23.01.12 on; nastaveni options
 * 20.01.12 on; podpora cteni z TAGMAP_ALL_*
 * 09.12.11 on; doplnene hidden pro podpole
 * 23.03.2010 - upravena WS, kvoli potrebe tejto triedy i3.WS.getRecord() bere o parameter viac
 * ku ktorym chceme mat pristup potom v listenery onSuccess
 *
 * Trieda na pracu s mapou tagov
 */
/*global Ext,i3,epca */
Ext.ns('epca');
epca.WsTagMap = {
    RepeatableValues: {
        0: false,
        1: true
        //3 : doporucene neopakovatelny
        //4 : doporucene opakovatelny
    },
    TagType: {
        R: 'mandatory',
        Q: 'recommended',
        O: 'optional'
    },
    isRepeatable: function(value) {
        // 06.06.16 on; porovnavat je potreba retezce, navic indikatory nemaji vubec vyplneny subtag pro opakovatelnost, takze default bude neopakovatelny
        //return (value === 0) ? false : true;
        return (value === '1') ? true : false;
    },
    /**
     * Funkcia ktora vnutorne spracuje zoznam tagov a prekonvertuje ich na json objekt
     * @param {Object} selectedRecord
     * 
     * 23.01.20
     */
    processTagListRecord: function(selectedRecord) {
        var i,
            tagTitle,
            retVal = [];
        var tags = selectedRecord.getTag('200', -1);
        for (i = 0; i < tags.length; i++) {
            tagTitle = i3.Marc.getSubTagStr(tags[i], 'a', 0);
            retVal.push(tagTitle);
        }
        return retVal;
    },
    /**
     * Vrati zoznam tagov v DB (CMCONFIG_TAGLIST_FMT), podla definovaneho formatu
     * @param {Object} unFormat
     * @param {Object} scope scope
     * @param {Object} callbackFunction funkcia, ktora ma spracovat vrateny zoznam tagov
     * 
     * 23.01.20 on; 
     */
    getTagList: function(unFormat, scope, callbackFunction) {
        var recordId = 'CMCONFIG_TAGLIST_' + epca.UnFormat.getValue(unFormat);
        // funkce getValue prida na konec "_", odmazu ho
        recordId = recordId.substring(0, recordId.length - 1);
        this.getValue(recordId, this.processTagListRecord.createDelegate(this), scope, callbackFunction);
    },
    /**
     * Vrati zoznam tagov v DB, podla definovaneho formatu
     * @param {Object} unFormat
     * @param {Object} scope scope
     * @param {Object} callbackFunction funkcia, ktora ma spracovat vrateny zoznam tagov
     */
    getTagListInt: function(unFormat, scope, callbackFunction) {
        // 26.03.21 on; slouceni taglistu
        //var recordId = 'CMCONFIG_TAGLIST_INT_' + epca.UnFormat.getValue(unFormat) + epca.Config.getLanguage();
        //this.getValue(recordId, this.processTagList.createDelegate(this), scope, callbackFunction);
        var recordId = 'TAGLIST_INT_' + epca.UnFormat.getValue(unFormat);
        // funkce getValue prida na konec "_", odmazu ho
        recordId = recordId.substring(0, recordId.length - 1);
        this.getValue(recordId, this.processTagList2.createDelegate(this), scope, this.getTagListInt0.createDelegate(this, [unFormat, scope, callbackFunction], 0));
    },
    /**
     * Vrati zoznam tagov v DB, podla definovaneho formatu
     * @param {Object} unFormat
     * @param {Object} scope scope
     * @param {Object} callbackFunction funkcia, ktora ma spracovat vrateny zoznam tagov
     * 
     * 26.03.21 on;
     */
    getTagListInt0: function(unFormat, scope, callbackFunction, tagList) {
        // pokud nenajdu novy format, zkusim to postaru
        if (tagList === undefined) {
            var recordId = 'CMCONFIG_TAGLIST_INT_' + epca.UnFormat.getValue(unFormat) + epca.Config.getLanguage();
            this.getValue(recordId, this.processTagList.createDelegate(this), scope, callbackFunction);
        } else {
            callbackFunction.call(scope, tagList);
        }
    },
    /**
     * Funkcia ktora vnutorne spracuje zoznam tagov a prekonvertuje ich na json objekt
     * @param {Object} selectedRecord
     */
    processTagList: function(selectedRecord) {
        var i,
            tagTitle,
            retVal = [];
        var tags = selectedRecord.getTag('200', -1);
        for (i = 0; i < tags.length; i++) {
            tagTitle = i3.Marc.getSubTagStr(tags[i], 'a', 0).split('#');
            retVal.push({
                'id': tagTitle[0],
                'title': tagTitle[1]
            });
        }
        return retVal;
    },
    /**
     * Funkcia ktora vnutorne spracuje zoznam tagov a prekonvertuje ich na json objekt
     * @param {Object} selectedRecord - pracuje nad novym formatem taglistu
     * 
     * 26.03.21 on; 
     */
    processTagList2: function(selectedRecord) {
        var i,
            sId, sTitle,
            retVal = [];
        var tags = selectedRecord.getTag('200', -1);
        for (i = 0; i < tags.length; i++) {
            sId = i3.Marc.getSubTagStr(tags[i], 'a');
            sTitle = i3.Marc.getSubTagStr(tags[i], 'b');
            retVal.push({
                'id': sId,
                'title': i3.languageSel(sTitle)
            });
        }
        return retVal;
    },
    /**
     * Vrati napovedu pre tag
     * @param {Object} unFormat Vstupny format
     * @param {Object} tag tag
     * @param {Object} scope
     * @param {Object} callbackFunction funkcia, ktora spracuje vrateny vysledok
     */
    getTagHelp: function(unFormat, tag, scope, callbackFunction) {
        // zaznam s helpom pre tag UN_100: 'STABLE_HELP_UN_T100'
        var recordId = 'STABLE_HELP_' + epca.UnFormat.getValue(unFormat) + 'T' + tag;
        this.getValue(recordId, this.processTagHelp.createDelegate(this), scope, callbackFunction);
    },
    /**
     * Vnutorne spracuje zaznam pomoci a prekonvertuje ho na json objekt
     * @param {Object} selectedRecord
     */
    processTagHelp: function(selectedRecord) {
        //var retVal = [];
        var recordId = selectedRecord.t001;
        var tag = recordId.substring(recordId.lastIndexOf('T') + 1, recordId.length);
        var tagHelps = selectedRecord.getTag('200', -1);
        //i3.language
        return {
            'tag': tag,
            'help': i3.Marc.getSubTagStr(tagHelps[i3.language - 1], 'a', 0)
        };
    },
    /**
     * Vrati nazov tagu podla mapy tagov
     * @param {Object} unFormat
     * @param {Object} tag
     */
    getTagId: function(unFormat, tag) {
        if (epca.UnFormat.getValue(unFormat)) {
            return 'TAGMAP_' + epca.UnFormat.getValue(unFormat) + tag;
        }
        return "";
    },
    /**
     * Vrati nazov tagu podla mapy tagov z TAGMAP_ALL
     * @param {Object} unFormat
     * @param {Object} tag
     *
     * 20.01.12 on; TAGMAP_ALL
     */
    getTagIdAll: function(tag) {
        return 'TAGMAP_ALL_' + tag;
    },
    /**
     * Vrati tag z mapy tagov
     * @param {Object} unFormat format
     * @param {Object} scope
     * @param {Object} callbackFunction funkcia, ktora spracuje vrateny vysledok
     * @param {Object} tag
     */
    getTag: function(unFormat, scope, callbackFunction, tag) {
        if (!unFormat || !scope || !callbackFunction || !tag) {
            return undefined;
        }
        // 20.01.12 on; pridana vyjimka pro nacteni TAGMAP_ALL_* zaznamu
        // skor call procesFunction with undefined
        this.getValue(this.getTagId(unFormat, tag), this.processTag.createDelegate(this), scope, callbackFunction, this.getTagIdAll(tag));
    },
    /**
     * Funkcia, ktora vnutorne spracuje zaznam a rozparsuje mapu tagov
     * @param {Object} selectedRecord
     */
    processTag: function(selectedRecord) {
        var i,
            j,
            field,
            tag = {},
            sSTH,
            sLastGroupId,
            sGroupDataLength,
            sGroupId,
            storeObj;
        tag['tagId'] = selectedRecord.getTag('001', 0);
        tag['tagId'] = tag['tagId'].substring(tag['tagId'].length - 3);
        tag['title'] = (selectedRecord.getTag('100a', 0)).ls();
        tag['repeatable'] = this.isRepeatable(selectedRecord.getTag('100c', 0));
        tag['type'] = selectedRecord.getTag('100d', 0);
        var fields = [];
        var unFields = selectedRecord.getTag('200', -1);
        // spracovanie podpoli
        for (i = 0; i < unFields.length; i++) {
            field = {};
            field['tag'] = tag.tagId;
            // field.field = id podpola
            field['field'] = i3.Marc.getSubTagStr(unFields[i], 'a', 0);
            field['fieldLabel'] = (i3.Marc.getSubTagStr(unFields[i], 'b', 0)).ls();
            field['fieldLabelUser'] = '';
            // 25.10.11 on; uzivatelsky nazev
            //field.field + ': ' +
            field['type'] = i3.Marc.getSubTagStr(unFields[i], 'c', 0);
            field['repeatable'] = this.isRepeatable(i3.Marc.getSubTagStr(unFields[i], 'd', 0));
            field['labelWidth'] = 200;
            // 05.02.16 on; zruseno, default bude anchor = -5
            //field['width'] = 400;
            field['anchor'] = '-5';
            field['disabled'] = false;
            // 09.12.11 on; doplnene hidden pro podpole
            field['hidden'] = false;
            // 05.03.14 on; required
            field['required'] = false;
            // 05.03.14 on; moznosta prednastavit aktualni datum
            field['setActDate'] = false;
            this.processOptionField(field, i3.Marc.getSubTagStr(unFields[i], 'e', 0));
            this.processPBField(field, i3.Marc.getSubTagStr(unFields[i], 'g', 0));
            this.processDefaultValueField(field, i3.Marc.getSubTagStr(unFields[i], 'i', 0));
            // set xtype, if is empty
            field['xtype'] = field.xtype || 'epca.marc_textfield';
            if ((field.field.length === 1) || (field.field === 'i1') || (field.field === 'i2')) {
                // field je normalne podpole alebo indikator
                fields.push(field);
            } else {
                // field je kodovany udaj, v tvare napr. a01-04
                field.field = field.field[0];
                // 24.05.16 on; rozsireni podpory kodovanych udaju
                sSTH = i3.Marc.getSubTagStr(unFields[i], 'h', 0);
                sGroupId = sSTH.piece(',', 2);
                if (sGroupId !== '') {
                    // zapamatuju si skupinu
                    field['convertGroup'] = sGroupId;
                    sSTH = sSTH.piece(',', 1);
                }
                if (sGroupId !== sLastGroupId) {
                    sGroupDataLength = 0;
                    sLastGroupId = sGroupId;
                }
                field['dataLength'] = parseInt(sSTH, 10);
                // 24.05.16 on; zmena - skupiny
                //field['position'] = fields[fields.length - 1].dataLength || 0;
                field['position'] = sGroupDataLength || 0;
                // validacia dlzky textboxov
                if (field['xtype'] === 'epca.marc_textfield') {
                    field['maxLength'] = field['dataLength'];
                    field['maxLengthText'] = i3.fillInParams(epca.L10n.txMaxFieldLength, [field['dataLength']]);
                }
                for (j = 0; j < fields.length; j++) {
                    if (fields[j].field === field.field) {
                        // kontrola na kodovane opakovatelne udaje
                        storeObj = new i3.WS.StoreST({
                            csStatTableN: field.csStatTableN,
                            autoLoad: true,
                            listeners: {
                                load: function(store, records, options) {
                                    if (records && records.length === 0) {
                                        return;
                                    }
                                    this['valueLength'] = records[0].data.id.length;
                                },
                                scope: field
                            }
                        });
                        if (fields[j].codedItems) {
                            fields[j].codedItems.push(field);
                            fields[j]['dataLength'] += field.dataLength || 0;
                            // 24.05.16 on; cislovani pro skupinu
                            sGroupDataLength += field.dataLength || 0;
                        } else {
                            fields[j]['codedItems'] = [field];
                            fields[j]['dataLength'] = field.dataLength || 0;
                            // 24.05.16 on; cislovani pro skupinu
                            sGroupDataLength = field.dataLength || 0;
                        }
                        break;
                    }
                }
            }
        }
        tag['fields'] = fields;
        return tag;
    },
    /**
     * Rozparsovanie option pola v mape tagov
     * @param {Object} field
     * @param {Object} option
     */
    processOptionField: function(field, option) {
        var tableIndexPair;
        if (!field || !option) {
            return;
        }
        // 13.09.17 on; podpora KV
        // 23.01.12 on; pokud je rozliseno nastaveni podle formulare, tak veznu posledni volbu
        if (option.piece(',', 1) === 'KV') {
            // nebudu brat posledni volbu
        } else if (option.fieldcount('#') > 1) {
            option = option.piece('#', option.fieldcount('#'));
        }
        var i,
            tableIndexPairs,
            options = option.split(',');
        if (options.length === 0) {
            return;
        }
        switch (options[0]) {
            case 'ST':
            case 'ST2':
            case 'STC':
                field['xtype'] = 'epca.codeddata_combobox';
                field['csStatTableN'] = i3.WS.getDfltUnTablesd() + "*STABLE_" + options[1];
                // 30.03.17 on; nastaveni pro combobox - dotazeni do jineho pole
                field['csCBParams'] = options[2];
                break;
                // 28.11.12 on; podpora STX
            case 'STX':
            case 'STX2':
                field['xtype'] = 'epca.codeddata_combobox';
                field['csStatTableN'] = i3.WS.getDfltUnTablesd() + "*" + options[1];
                // 30.03.17 on; nastaveni pro combobox - dotazeni do jineho pole
                field['csCBParams'] = options[2];
                break;
            case 'CD':
                field['xtype'] = 'epca.codeddata_fieldset';
                field['title'] = field.fieldLabel;
                delete field.fieldLabel;
                field['autoHeight'] = true;
                // 08.02.16 on; predelano
                //field['autoWidth'] = true;
                field['anchor'] = '-5';
                delete field.width;
                break;
            case 'PB':
            case 'PBS':
                // PB,TABLE1^INDEX1|TABLE2^INDEX2|...,DFLT_FORM1|DFLT_FORM2|...,TagSubtag_TagSubtag,Tag
                // options[1] - TABLE1^INDEX1
                // options[2] - default forms - zbytocne zrejme
                field['xtype'] = 'epca.marc_search_combobox';
                tableIndexPairs = options[1].split('|');
                for (i = 0; i < tableIndexPairs.length; i++) {
                    tableIndexPair = tableIndexPairs[i].split('^');
                    field['db'] = epca.Config.getDbName(tableIndexPair[0]);
                    //bereme iba prvu DB pre jeden combobox; Zatial
                    field['index'] = tableIndexPair[1];
                    break;
                }
                break;
            case 'SELECT_DATE':
                // chyba definicia v mape tagov
                // bolo by fajn aj uviest format v ktorom datum ocakava
                field['xtype'] = 'epca.codeddata_datefield';
                break;
            case 'LINK_ENTRY':
                // LINK_ENTRY,UN_CAT^2442
                // options[1] - UN_CAT^2442
                field['xtype'] = 'epca.link_entry';
                // podpole 1, opakuje sa podla poctu dotiahnutych tagov, zabezpecene programovo
                field['repeatable'] = false;
                tableIndexPair = (options.length >= 2) ? options[1].split('^') : [epca.Config.User.DbNameCat, '1'];
                field['db'] = epca.Config.getDbName(tableIndexPair[0]);
                field['index'] = tableIndexPair[1];
                break;
                // 13.09.17 on; KV
            case 'KV':
                field['xtype'] = 'epca.kindvalue';
                field['kvparams'] = option;
                break;
        }
    },
    /**
     * Rozparsovanie PB pola v mape tagov
     * @param {Object} field
     * @param {Object} value
     */
    processPBField: function(field, value) {
        var i,
            convert;
        if (!field || !value) {
            return;
        }
        //value = 200a
        //value = 200d,2|210b,1
        field['convertMap'] = {};
        var groups = value.split('|');
        for (i = 0; i < groups.length; i++) {
            convert = groups[i].split(',');
            if (convert.length === 1) {
                field.convertMap['tag'] = convert[0].substring(0, 3);
                field.convertMap['field'] = convert[0].substring(3);
                return;
            } else {
                //group=convert[1]
                field.convertMap[convert[1]] = {
                    tag: convert[0].substring(0, 3),
                    field: convert[0].substring(3)
                };
                // 19.01.12 on; pouze pri prvnim pruchodu se bude nastavovat resp. pouze pokud neni nastavene
                //              protoze platna je prvni polozka v seznamu
                if ((!field['convertGroup']) && (field.xtype && field.xtype === 'epca.marc_search_combobox')) {
                    field['convertGroup'] = convert[1];
                }
            }
        }
    },
    /**
     * Rozparsovanie default pola v mape tagov
     * @param {Object} field
     * @param {Object} value
     */
    processDefaultValueField: function(field, value) {
        var valueOverwrite;
        if (!field || !value) {
            return;
        }
        //value,1 1=not overwrite
        valueOverwrite = value.split(',');
        if (valueOverwrite[0] != "''" && !Ext.isEmpty(valueOverwrite[0])) {
            field['defaultValue'] = valueOverwrite[0];
            if (valueOverwrite.length > 1) {
                field['overwrite'] = !(valueOverwrite[1] === '1');
            }
        }
    },
    getLinkEntry: function(unFormat, scope, callbackFunction, tag) {
        if (!unFormat || !scope || !callbackFunction || !tag) {
            return undefined;
        }
        // skor call procesFunction with undefined
        this.getValue(this.getLinkEntryId(unFormat, tag), this.processLinkEntry.createDelegate(this), scope, callbackFunction);
    },
    getLinkEntryId: function(unFormat, tag) {
        return this.getTagId(unFormat, tag || '4XX') + '_LE';
    },
    /**
     * Rozparsovanie LinkEntry pola v mape tagov
     * @param {Object} field
     * @param {Object} value
     */
    processLinkEntry: function(selectedRecord) {
        var i,
            a,
            g,
            retVal = [];
        var linkEntries = selectedRecord.getTag('200', -1);
        for (i = 0; i < linkEntries.length; i++) {
            a = i3.Marc.getSubTagStr(linkEntries[i], 'a', 0);
            g = i3.Marc.getSubTagStr(linkEntries[i], 'g', 0);
            retVal[a] = g;
            //i3.Marc.getSubTagStr(linkEntries[i], 'f', 0); //zoznam povinnych poli/podpoli/indikatorov.
            //i3.Marc.getSubTagStr(linkEntries[i], 'o', 0); //doporucene polozky
        }
        return retVal;
    },
    /**
     * Funkcia pre pracu s WS
     * @param {Object} recordId id zaznamu
     * @param {Object} processFunction funkcia ktora spracuje UNIMARC zaznam do objektu
     * @param {Object} scope callbackFunction
     * @param {Object} callbackFunction funkcia ktora ocakava udaje z WS ako objekt
     * @param {Object} recordIdAll id zaznamu v TAGMAP_ALL_* - v pripade kdyz ctema tag v mapy tagu
     */
    // TODO
    getValue: function(recordId, processFunction, scope, callbackFunction, recordIdAll) {
        var that = this;
        i3.WS.getRecord({
            classn: i3.WS.getDfltUnTablesd(),
            fmt: 'LINEMARC',
            t001: recordId,
            success: function(selectedRecord, processFunction) {
                //this = callbackFunction
                this(processFunction(selectedRecord));
            },
            failure: function(errmsg, o) {
                // 20.01.12 on; vyjimka pro ctemi tagu v mapy tagu - pokud se napodari nacist a je predam parametr s TAGMAP_ALL_*
                //              zkusi nacist tento zaznam
                if (recordIdAll) {
                    that.getValue(recordIdAll, processFunction, scope, callbackFunction);
                } else {
                    this(undefined, o);
                }
            },
            scope: callbackFunction.createDelegate(scope),
            options: 'd' // 20.09.11 on;
        }, processFunction.createDelegate(this));
    }
};
