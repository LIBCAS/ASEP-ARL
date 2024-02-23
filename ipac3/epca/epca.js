/**
 * 30.06.23 on; vetsi font 
 * 14.02.20 on; csIsM21
 * 23.01.20 on; zruseno volani getTagList
 * 26.11.19 on; prefix subtagu
 * 20.05.16 on; uprava convertToObject
 * 03.09.13 on; convertToObject4XX
 * 23.05.12 on; oprava chyby
 * 15.08.11 on; uprava processMarcValue
 * 20.07.11 on; metoda getSDFName vrati nastaveny ZF pro danou DB
 * 19.07.11 on; doplnena metoda getDBName
 * 18.07.11 on; opraveny prenos indokarotu do MARC zaznamu (convertToMarc)
 */
/*global epca, Ext, i3, document*/
Ext.ns('epca');
/**
 * Staticka trieda s pomocnymi funkciami
 */
Ext.apply(epca, {
    // 05.02.16 on; konstanty
    c: {
        nAnchor: '-5'
    },
    /**
     * Enum definuje UNIMARC Formaty
     */
    UnFormat: {
        A: 'A', //Authorities
        B: 'B', //Bibliographic
        //C: 'C', //Classification - NOT IMPLEMENT
        //H: 'H', //Holdings - NOT IMPLEMENT
        /*values : {
         A : epca.Config.User.dbAuthFmt+'_',  // 02.09.11 on; nastaveni presunuto do epca.config.js
         B : epca.Config.User.dbCatFmt+'_'
         //C: 'not implement',
         //H: 'not implement'
         },*/
        getValue: function(unFormat) {
            // 21.10.11 on; predelane
            //return this.values[unFormat];
            switch (unFormat) {
                case this.A:
                    return epca.Config.User.dbAuthFmt + '_';
                case this.B:
                    return epca.Config.User.dbCatFmt + '_';
                default:
                    // 03.09.15 on; zmena defaultu
                    //return undefined + '_';
                    return epca.Config.User.dbCatFmt + '_';
            }
        },
        /**
         * podle formatu vrati nazev DB
         */
        getDBName: function(unFormat) {
            switch (unFormat) {
                case this.A:
                    return epca.Config.User.dbAuth;
                case this.B:
                    return epca.Config.User.dbCat;
                default:
                    // 03.09.15 on; zmena defaultu
                    //return undefined;
                    return epca.Config.User.dbCat;
            }
        },
        /**
         * podle nazvu db vrati zkraceny zobrazovaci format
         */
        getSDFName: function(sDNName) {
            switch (sDNName) {
                case epca.Config.User.dbAuth:
                    return epca.Config.User.displayFmtAuth;
                case epca.Config.User.dbCat:
                    return epca.Config.User.displayFmt;
                default:
                    return epca.Config.User.displayFmt;
            }
        }
    },
    /**
     * Metoda v objekte 'object' atributu 'property' priradi hodnotu 'newValue'
     * @param {Object} object Objekt do ktoreho vlozi udaj
     * @param {Object} property Do ktorej property, ak neexistuje, vytvori novu a priradi objekt.
     * Ak Existuje vlozi staru a novu hodnotu do pola, ktory priradi danemu atributu.
     * @param {Object} newValue nova hodnota
     */
    processMarcValue: function(object, property, newValue) {
        // 27.10.11 on; prazdne retezce zpracuje (kvuli nastaveni defaultniho formulare - pradnastavene 2 prazdne subtagy)
        //if(!Ext.isDefined(newValue) || Ext.isEmpty(newValue))
        if (!Ext.isDefined(newValue)) {
            return;
        }
        if (object.hasOwnProperty(property)) {
            if (Ext.isArray(object[property])) {
                object[property].push(newValue);
            } else {
                // 27.10.11 on; vraceno puvodni reseni - kvuli nastaveni deafultnich hodnot u opakovatelnych podpoli
                // 15.08.11 on; zmena, prida property k existujicimu objektu
                //Ext.applyIf(object[property], newValue);
                object[property] = [object[property], newValue];
            }
        } else
            // 07.05.15 on; kontejner
            if (property === undefined) {
                if (epca.isEmpty(object)) {
                    Ext.apply(object, newValue);
                } else {
                    i3.eachProp(newValue, function(pProp, pPropN) {
                        if (object.hasOwnProperty(pPropN)) {
                            // 01.09.15 on; pokud mam opakovatelny kontejner s polickama, vlozim to vsechno do jednoho tagu - zatim nereseno - problem vidim v nacteni zaznamu do formulare
                            if (Ext.isArray(object[pPropN])) {
                                object[pPropN].push(pProp);
                            } else {
                                object[pPropN] = [object[pPropN], pProp];
                            }
                        } else {
                            object[pPropN] = pProp;
                        }
                    });
                }
            } else {
                object[property] = newValue;
            }
    },
    /**
     * Skonvertuje marc zaznam na objekt
     * @param {Object} marc Marc zaznam (pole stringov),
     * string = tag + medzera + indikator1, indikator2 + medzera + podpolia oddelene i3.c.SF (na zaciatku nazov)
     *
     * 20.05.16 on; zmenen vyznam 2. parametru
     */
    convertToObject: function(marc, dbFormat) {
        var i,
            j,
            tagVal,
            tag,
            fields,
            retVal = {};
        for (i = 0; i < marc.length; i++) {
            tagVal = {};
            tag = marc[i].substring(0, 3);
            if (marc[i][4] !== ' ') { // neprazny 1.indikator
                // 26.11.19 on;
                //tagVal['i1'] = marc[i][4];
                tagVal[epca.form.Helper.c.sSubtagPrefix + 'i1'] = marc[i][4];
            }
            if (marc[i][5] !== ' ') { // neprazny 2.indikator
                tagVal[epca.form.Helper.c.sSubtagPrefix + 'i2'] = marc[i][5];
            }
            // 20.05.16 on; zmena
            //if (unFormat && (unFormat === 'B') && (tag[0] === '4')) {
            if (dbFormat && (dbFormat === 'UN') && (tag[0] === '4')) {
                // tagy 4xx - specialny format linkentry
                fields = marc[i].substring(7).split(i3.c.SF + '1');
                for (j = 0; j < fields.length; j++) {
                    if (fields[j]) {
                        // 26.11.19 on;
                        //epca.processMarcValue(tagVal, '1', fields[j]);
                        epca.processMarcValue(tagVal, epca.form.Helper.c.sSubtagPrefix + '1', fields[j]);
                    }
                }
            } else {
                fields = marc[i].substring(7).split(i3.c.SF);
                if (fields.length === 1) {
                    tagVal['.'] = fields[0];
                } else {
                    for (j = 0; j < fields.length; j++) {
                        if (fields[j]) {
                            // 26.11.19 on;
                            //epca.processMarcValue(tagVal, fields[j][0], fields[j].substring(1));
                            epca.processMarcValue(tagVal, epca.form.Helper.c.sSubtagPrefix + fields[j][0], fields[j].substring(1));
                        }
                    }
                }
            }
            epca.processMarcValue(retVal, tag, tagVal);
        }
        return retVal;
    },
    /**
     * Skonvertuje marc zaznam na objekt pro pole v ramci 4XX
     * @param {Object} marc Marc zaznam (pole stringov),
     * string = tag + indikator1, indikator2 + podpolia oddelene i3.c.SF (na zaciatku nazov)
     *
     * 03.09.13 on; zalozeno
     */
    convertToObject4XX: function(marc) {
        var i,
            j,
            tagVal,
            tag,
            fields,
            retVal = {};
        for (i = 0; i < marc.length; i++) {
            tagVal = {};
            tag = marc[i].substring(0, 3);
            if (marc[i][3] !== ' ') { // neprazny 1.indikator
                // 29.11.19 on; prefix
                //tagVal['i1'] = marc[i][3];
                tagVal[epca.form.Helper.c.sSubtagPrefix + 'i1'] = marc[i][3];
            }
            if (marc[i][4] !== ' ') { // neprazny 2.indikator
                // 29.11.19 on; prefix
                //tagVal['i2'] = marc[i][4];
                tagVal[epca.form.Helper.c.sSubtagPrefix + 'i2'] = marc[i][4];
            }
            fields = marc[i].substring(5).split(i3.c.SF);
            if (fields.length === 1) {
                tagVal['.'] = fields[0];
            } else {
                for (j = 0; j < fields.length; j++) {
                    if (fields[j]) {
                        // 26.11.19 on;
                        //epca.processMarcValue(tagVal, fields[j][0], fields[j].substring(1));
                        epca.processMarcValue(tagVal, epca.form.Helper.c.sSubtagPrefix + fields[j][0], fields[j].substring(1));
                    }
                }
            }
            epca.processMarcValue(retVal, tag, tagVal);
        }
        return retVal;
    },
    /**
     * Konvertuje object do marc zaznamu
     * @param {Object} object
     * @param {Object} linkEntry ak true vynecha medzery pred a za indikatormi
     */
    convertToMarc: function(object, linkEntry) {
        var key,
            j,
            subtagy;
        var retVal = new i3.Marc({ //t001: 'new',
            //classn: i3.WS.getDfltUnTablesd(),
        });
        var separator = (linkEntry || false) ? '' : ' ';
        var temp = [];
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                if ((key !== undefined) && key) {
                    //opakovatelnost
                    if (Ext.isArray(object[key])) {
                        for (j = 0; j < object[key].length; j++) {
                            subtagy = this.spracujSubtagy(object[key][j]);
                            if (subtagy === '') {
                                continue;
                            }
                            // 26.11.19 on;
                            //temp.push(key + separator + ((Ext.isDefined(object[key][j].i1) && (object[key][j].i1 !== '')) ? object[key][j].i1 : ' ') + ((Ext.isDefined(object[key][j].i2) && (object[key][j].i2 !== '')) ? object[key][j].i2 : ' ') + separator + subtagy);
                            temp.push(key + separator + ((Ext.isDefined(object[key][j][epca.form.Helper.c.sSubtagPrefix + 'i1']) && (object[key][j][epca.form.Helper.c.sSubtagPrefix + 'i1'] !== '')) ? object[key][j][epca.form.Helper.c.sSubtagPrefix + 'i1'] : ' ') + ((Ext.isDefined(object[key][j][epca.form.Helper.c.sSubtagPrefix + 'i2']) && (object[key][j][epca.form.Helper.c.sSubtagPrefix + 'i2'] !== '')) ? object[key][j][epca.form.Helper.c.sSubtagPrefix + 'i2'] : ' ') + separator + subtagy);
                        }
                    } else {
                        subtagy = this.spracujSubtagy(object[key]);
                        if ((subtagy === undefined) || (subtagy === '')) {
                            continue;
                        }
                        // 26.11.19 on;
                        //temp.push(key + separator + ((Ext.isDefined(object[key].i1) && (object[key].i1)) ? object[key].i1 : ' ') + ((Ext.isDefined(object[key].i2) && (object[key].i2 !== '')) ? object[key].i2 : ' ') + separator + subtagy);
                        temp.push(key + separator + ((Ext.isDefined(object[key][epca.form.Helper.c.sSubtagPrefix + 'i1']) && (object[key][epca.form.Helper.c.sSubtagPrefix + 'i1'])) ? object[key][epca.form.Helper.c.sSubtagPrefix + 'i1'] : ' ') + ((Ext.isDefined(object[key][epca.form.Helper.c.sSubtagPrefix + 'i2']) && (object[key][epca.form.Helper.c.sSubtagPrefix + 'i2'] !== '')) ? object[key][epca.form.Helper.c.sSubtagPrefix + 'i2'] : ' ') + separator + subtagy);
                    }
                }
            }
        }
        retVal.data = temp;
        return retVal;
    },
    spracujSubtagy: function(tag) {
        var j,
            field,
            retVal = '',
            sST;
        // 09.08.11 on; pokud nejde o object vrati tag a skonci
        if (!Ext.isObject(tag)) {
            return tag;
        }
        for (field in tag) {
            if (tag.hasOwnProperty(field)) {
                if (!field) {
                    continue;
                }
                // 26.11.19 on;
                sST = field.substr(epca.form.Helper.c.sSubtagPrefix.length);
                if (Ext.isArray(tag[field])) {
                    for (j = 0; j < tag[field].length; j++) {
                        // 26.11.19 on;
                        //if ((tag[field][j] === 'i1') || (tag[field][j] === 'i2')) {
                        if ((tag[field][j] === epca.form.Helper.c.sSubtagPrefix + 'i1') || (tag[field][j] === epca.form.Helper.c.sSubtagPrefix + 'i2')) {
                            continue;
                        }
                        if (tag[field][j] === '.') {
                            retVal += tag[field][j];
                            break;
                        }
                        if (!Ext.isEmpty(tag[field][j])) {
                            // 26.11.19 on;
                            //retVal += i3.c.SF + field + tag[field][j];
                            retVal += i3.c.SF + sST + tag[field][j];
                        }
                    }
                } else {
                    // 26.11.19 on;
                    //if ((field === 'i1') || (field === 'i2')) {
                    if ((field === epca.form.Helper.c.sSubtagPrefix + 'i1') || (field === epca.form.Helper.c.sSubtagPrefix + 'i2')) {
                        continue;
                    }
                    if (field === '.') {
                        retVal += tag[field];
                        break;
                    }
                    if (!Ext.isEmpty(tag[field])) {
                        // 26.11.19 on;
                        //retVal += i3.c.SF + field + tag[field];
                        retVal += i3.c.SF + sST + tag[field];
                    }
                }
            }
        }
        return retVal;
    },
    cloneObject: function(obj) {
        var i,
            newObj = (obj instanceof Array) ? [] : {};
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                if (!i) {
                    continue;
                }
                if (obj[i] && (typeof obj[i] === "object")) {
                    newObj[i] = this.cloneObject(obj[i]);
                } else {
                    newObj[i] = obj[i];
                }
            }
        }
        return newObj;
    },
    trimCodedData: function(codedData) {
        var regExp = /\$+|\s+|\ł+/g;
        return codedData.replace(regExp, '');
    },
    /**
     * Naformatuje parametre do tvaru a00-04
     * ak dataLength == 1, tak do tvaru a05
     * @param {Object} field
     * @param {Object} position
     * @param {Object} dataLength
     */
    formatFieldId: function(field, position, dataLength) {
        // 28.11.19 on; odmaze prefix "st"
        if (field.substr(0, epca.form.Helper.c.sSubtagPrefix.length) === epca.form.Helper.c.sSubtagPrefix) {
            field = field.substr(epca.form.Helper.c.sSubtagPrefix.length);
        }
        if (dataLength === undefined || dataLength === 0) {
            return field;
        }
        if (position === undefined) {
            return field;
        }
        var retVal = field;
        if (position < 10) {
            retVal += '0';
        }
        retVal += position;
        if (dataLength === 1) {
            return retVal;
        }
        retVal += '-';
        if (position + dataLength < 10) {
            retVal += '0';
        }
        return retVal + (position + dataLength - 1);
    },
    /**
     * Notifikacia o udalosti
     * @param {Object} message HTML sprava
     * @param {Object} title titul
     * @param {Object} icon ikona
     */
    notify: function(message, title, icon) {
        message = message.replace('\n', "<br /><br />");
        new epca.window.Notification({
            iconCls: icon,
            title: title,
            // 30.06.23 on; vetsi font 
            //html: '<b>' + message + '</b>',
            html: '<p style="font-size:22px">' + message + '</p>',
            autoDestroy: false
            //hideDelay:  5000,
        }).show(document);
    },
    isEmpty: function(obj) {
        var prop;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    },
    /*
     * nacte seznam tagu v objektu
     *
     * 23.01.20 on; funkce zrusena - pouziva se - pripadne prejmenovat
     */
    /*getTagList: function(obj) {
    var prop,
    s = '';
    for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
    if (s !== '') {
    s += ', ';
    }
    s += prop;
    }
    }
    return s;
    },*/
    /**
     * Funkce doplni do nazvu podpoli prefix "st", kvuli razeni
     * @param {Object} pDefaultValues
     */
    csAddStPrefixes: function(pDefaultValues) {
        var bOk,
            j,
            propTag;
        for (propTag in pDefaultValues) {
            if (pDefaultValues.hasOwnProperty(propTag)) {
                //opakovatelnost
                if (Ext.isArray(pDefaultValues[propTag])) {
                    for (j = 0; j < pDefaultValues[propTag].length; j++) {
                        bOk = this.csAddStPrefixes0(pDefaultValues[propTag][j]);
                        if (!bOk) {
                            return false;
                        }
                    }
                } else {
                    bOk = this.csAddStPrefixes0(pDefaultValues[propTag]);
                    if (!bOk) {
                        return false;
                    }
                }
            }
        }
        return true;
    },
    csAddStPrefixes0: function(poTag) {
        var j,
            field;
        for (field in poTag) {
            if (poTag.hasOwnProperty(field)) {
                // pokud uz pole obsahuje prefix "st", tak neni co prevadet
                if (field.substr(0, epca.form.Helper.c.sSubtagPrefix.length) === epca.form.Helper.c.sSubtagPrefix) {
                    return false;
                }
                if (Ext.isArray(poTag[field])) {
                    poTag[epca.form.Helper.c.sSubtagPrefix + field] = [];
                    for (j = 0; j < poTag[field].length; j++) {
                        poTag[epca.form.Helper.c.sSubtagPrefix + field].push(poTag[field][j]);
                    }
                    delete poTag[field];
                } else {
                    if (field !== '.') {
                        poTag[epca.form.Helper.c.sSubtagPrefix + field] = poTag[field];
                        delete poTag[field];
                    }
                }
            }
        }
        return true;
    },
    /**
     * Vrati true pokud jde o M21
     */
    csIsM21: function(psClass) {
        // class - pocitam, ze jde o db katalogu nebo autorit
        var sLname = i3.className2LName(psClass);
        return (sLname.indexOf('_un_') < 0);
    }
});
