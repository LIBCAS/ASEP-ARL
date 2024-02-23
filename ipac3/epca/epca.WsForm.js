/**
 * 12.02.20 on; chybova zprava pri nenalezeni formulare
 * 06.04.17 on; uprava vytvoreni zaznamu do IctxUnTablesd
 * 10.02.17 on; oprava getForm
 * 10.01.17 on; oprava getForm
 * 14.12.16 on; ukladani formularu pres nase WS
 * 29.11.16 on; volani pres std. WS - zatim nefunkcni
 */
/*global Ext,i3,epca */
Ext.ns('epca');
/**
 * Sluzna na pracu s formularmi a DB
 * @param {Object} unFormat
 */
epca.WsForm = {
    //formPrefix : "EPCA_FORM_",
    //getFormRecordIdPrefix : function(unFormat) {
    //  return this.formPrefix + unFormat;
    //},
    /**
     * Pridanie formulara do DB
     * @param {Object} form
     */
    addForm: function(form, formId) {
        form.createdBy = i3.Login.ctx.userName;
        // 24.08.15 on; restove volani
        if (!i3.isEmptyString(epca.Config.User.webformURLrest)) {
            i3.SOAP.writeFormSOAP({
                url: epca.Config.User.webformURLrest,
                method: 'POST',
                params: {
                    soap_method: 'WriteForm',
                    inFormType: form.unFormat,
                    inIctx: epca.Config.User.ictx,
                    inIdForm: form.getFormRecodId(),
                    inData: Ext.encode(form),
                    inReWrite: 'N' // zakaze prepis
                },
                callbackscope: form
            });
        } else if (!i3.isEmptyString(epca.Config.User.webformURL)) {
            // soupove volani
            i3.SOAP.writeFormSOAP({
                url: epca.Config.User.webformURL,
                method: 'WriteForm',
                params: {
                    inFormType: form.unFormat,
                    inIctx: epca.Config.User.ictx,
                    inIdForm: form.getFormRecodId(),
                    inData: Ext.encode(form),
                    inReWrite: 'N' // zakaze prepis
                },
                callbackscope: form
            });
        } else {
            // 14.12.16 on; je to tu debilni, ale nic lepsiho mne nenapada
            // nastavim Id do formulare (formId) uz tady, protoze niz uz je pozde, formId pak neni soucasti Ext.encode(form) a neposle se na server
            form.getFormRecodId(formId);
            // 29.11.16 on; volani pres std. WS
            i3.WS.command({
                db: epca.Config.User.dbTab,
                command: 'webformswrite',
                bDontHandleErr: true,
                // 06.04.17 on; na server se nesmi posilat title ale id
                // 13.12.16 on; nebudu volat getFormRecodId, protoze v ni se nastavi formId a i kdyz se zaznam nepodari ulozit, podruhe uz to projde..
                //params: 'new|' + form.unFormat + '|' + form.getFormRecodId() + '|' + Ext.encode(form),
                params: 'new|' + form.unFormat + '|' + formId + '|' + Ext.encode(form),
                success: function(o) {
                    var m;
                    if (o && (o.ret_code === '0')) {
                        var oResult = o.data[0];
                        if (!i3.isEmptyString(oResult.ErrorMessage)) {
                            // zobrazi chybu a skonci
                            m = new i3.WS.Msg(oResult.ErrorMessage + '#' + oResult.ErrorMessageDef);
                            i3.alert(m.userText);
                            return;
                        }
                        ///vypada to, ze je vse OK
                        // 13.12.16 on; nastavi id
                        //form.getFormRecodId();
                        epca.notify("Formulár bol úspešne uložený.", "Úspech", "icon-accept");
                    } else {
                        // pokud se ulozeni nepodari, zrusim formId, podle toho totiz na jinem miste zjistuju, jestli byl formular uz ulozen
                        form.formId = undefined;
                        m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
                        i3.displayError(m.userText);
                    }
                },
                failure: function(emsg) {
                    // pokud se ulozeni nepodari, zrusim formId, podle toho totiz na jinem miste zjistuju, jestli byl formular uz ulozen
                    form.formId = undefined;
                    if (emsg && emsg.statusText) {
                        i3.displayError(emsg.statusText);
                    } else {
                        i3.displayError(emsg);
                    }
                },
                scope: form
            });
        }
    },
    /**
     * Aktualizacia formulra v DB
     * @param {Object} form
     */
    updateForm: function(form) {
        form.createdBy = i3.Login.ctx.userName;
        // 24.08.15 on; restove volani
        if (!i3.isEmptyString(epca.Config.User.webformURLrest)) {
            i3.SOAP.writeFormSOAP({
                url: epca.Config.User.webformURLrest,
                method: 'POST',
                params: {
                    soap_method: 'WriteForm',
                    inFormType: form.unFormat,
                    inIctx: epca.Config.User.ictx,
                    inIdForm: form.getFormRecodId(),
                    inData: Ext.encode(form),
                    inReWrite: 'Y' // povoli prepis
                },
                callbackscope: form
            });
        } else if (!i3.isEmptyString(epca.Config.User.webformURL)) {
            // soupove volani
            i3.SOAP.writeFormSOAP({
                url: epca.Config.User.webformURL,
                method: 'WriteForm',
                //resultElement : 'ReadFormResult',      // tag, kde bude odpoved - tady neni potreba
                params: {
                    inFormType: form.unFormat,
                    inIctx: epca.Config.User.ictx,
                    inIdForm: form.getFormRecodId(),
                    inData: Ext.encode(form),
                    inReWrite: 'Y' // povoli prepis
                },
                callbackscope: form
            });
        } else {
            // 29.11.16 on; volani pres std. WS
            i3.WS.command({
                db: epca.Config.User.dbTab,
                command: 'webformswrite',
                params: 'set|' + form.unFormat + '|' + form.getFormRecodId() + '|' + Ext.encode(form),
                success: function(o) {
                    var m;
                    if (o && (o.ret_code === '0')) {
                        var oResult = o.data[0];
                        if (!i3.isEmptyString(oResult.ErrorMessage)) {
                            // zobrazi chybu a skonci
                            m = new i3.WS.Msg(oResult.ErrorMessage + '#' + oResult.ErrorMessageDef);
                            i3.alert(m.userText);
                            return;
                        }
                        ///vypada to, ze je vse OK
                        epca.notify("Formulár bol úspešne uložený.", "Úspech", "icon-accept");
                    } else {
                        m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
                        i3.displayError(m.userText);
                    }
                },
                scope: form
            });
        }
    },
    /**
     * Zmazanie formulara z DB
     * @param {Object} form
     */
    deleteForm: function(form, formType) {
        form.createdBy = i3.Login.ctx.userName;
        // 24.08.15 on; restove volani
        if (!i3.isEmptyString(epca.Config.User.webformURLrest)) {
            Ext.Ajax.request({
                url: epca.Config.User.webformURLrest,
                method: 'POST',
                params: {
                    soap_method: 'DeleteForm',
                    inFormType: formType,
                    inIctx: epca.Config.User.ictx,
                    inIdForm: form.getFormRecodId()
                },
                success: function(response) {
                    if (response.statusText === 'OK') {
                        epca.notify("Formulár bol vymazaný.", "Úspech", "icon-accept");
                    } else {
                        Ext.Msg.alert('Error', response.statusText);
                    }
                }
                /*failure : function(response) {
                 var o = Ext.decode(response.responseText);
                 console.dir(o);
                 if (config.callback) {
                 config.callback(o);
                 }
                 }*/
            });
        } else if (!i3.isEmptyString(epca.Config.User.webformURL)) {
            // soupove volani
            i3.SOAP.GetSoapResponse({
                url: epca.Config.User.webformURL,
                method: 'DeleteForm',
                params: {
                    inFormType: formType,
                    inIctx: epca.Config.User.ictx,
                    inIdForm: form.getFormRecodId()
                },
                callback: function( /*psResult*/ ) {
                    epca.notify("Formulár bol vymazaný.", "Úspech", "icon-accept");
                },
                callbackscope: this
            });
        } else {
            // 29.11.16 on; volani pres std. WS
            i3.WS.command({
                db: epca.Config.User.dbTab,
                command: 'webformswrite',
                params: 'delete|' + form.unFormat + '|' + form.getFormRecodId(),
                success: function(o) {
                    var m;
                    if (o && (o.ret_code === '0')) {
                        var oResult = o.data[0];
                        if (!i3.isEmptyString(oResult.ErrorMessage)) {
                            // zobrazi chybu a skonci
                            m = new i3.WS.Msg(oResult.ErrorMessage + '#' + oResult.ErrorMessageDef);
                            i3.alert(m.userText);
                            return;
                        }
                        ///vypada to, ze je vse OK
                        epca.notify("Formulár bol vymazaný.", "Úspech", "icon-accept");
                    } else {
                        m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
                        i3.displayError(m.userText);
                    }
                },
                scope: form
            });
        }
    },
    /**
     * Zmena id formulara z DB
     * @param {Object} form
     *
     * zatim nepouzite
     */
    /*changeidForm: function(form, formType, psNewId) {
    form.createdBy = i3.Login.ctx.userName;

    // 24.08.15 on; restove volani
    if (!i3.isEmptyString(epca.Config.User.webformURLrest)) {
    i3.alert('Operace změny id je podporována pouze pro zapojení přes WS ARL!');
    return;
    }
    if (!i3.isEmptyString(epca.Config.User.webformURL)) {
    // soupove volani
    i3.alert('Operace změny id je podporována pouze pro zapojení přes WS ARL!');
    return;
    }
    // 29.11.16 on; volani pres std. WS
    i3.WS.command({
    db: epca.Config.User.dbTab,
    command: 'webformswrite',
    params: 'rename|' + form.unFormat + '|' + form.getFormRecodId() + '|' + psNewId,
    success: function(o) {
    var m;
    if (o && (o.ret_code === '0')) {
    var oResult = o.data[0];

    if (!i3.isEmptyString(oResult.ErrorMessage)) {
    // zobrazi chybu a skonci
    m = new i3.WS.Msg(oResult.ErrorMessage + '#' + oResult.ErrorMessageDef);
    i3.alert(m.userText);
    return;
    }

    ///vypada to, ze je vse OK
    epca.notify("ID formuláre bylo změněno na "+psNewId+".", "Úspech", "icon-accept");
    } else {
    m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
    i3.displayError(m.userText);
    }
    },
    scope: form
    });
    },*/
    /**
     * Ziskanie formularu z DB na zaklade Id a Typu formulara
     * @param {Object} formId
     * @param {Object} formType
     * @param {Object} scope
     * @param {Object} callbackFunction
     * @param {string} formName
     *
     * pokud je vyplneno formname, bude se vyhledavat podle nazvu formulare, jinak podle ID
     */
    getForm: function(formId, formType, scope, callbackFunction, formName) {
        var that = this,
            sFormType1, aFormTypes, sDelim;
        if (!formName) {
            formName = '';
        }
        // 05.11.15 on; podporovat budu # (v json) a , (v url)
        if (formType.indexOf(',') > 0) {
            sDelim = ',';
        } else {
            sDelim = '#';
        }
        aFormTypes = formType.split(sDelim);
        sFormType1 = aFormTypes.shift();
        // 24.08.15 on; restove volani
        if (!i3.isEmptyString(epca.Config.User.webformURLrest)) {
            Ext.Ajax.request({
                url: epca.Config.User.webformURLrest,
                method: 'POST',
                params: {
                    soap_method: (formName !== '') ? 'ReadFormByName' : 'ReadFormById',
                    inFormType: sFormType1,
                    inIctx: epca.Config.User.ictx,
                    inIdForm: (formName !== '') ? undefined : formId,
                    inFormName: (formName !== '') ? formName : undefined
                },
                success: function(response) {
                    var o;
                    if (formName !== '') {
                        o = response.responseXML.getElementsByTagName('ReadFormByNameResult');
                    } else {
                        o = response.responseXML.getElementsByTagName('ReadFormByIdResult');
                    }
                    o = o[0].textContent;
                    // chyba?
                    if (o.substring(0, 3) === 'ERR') {
                        // 05.11.15 on; pokud mam v zasobe jeste dalsi typy, zkusim jeste je
                        if (aFormTypes.length > 0) {
                            // vola se tato metoda s upravenym jednom parametrem
                            that.getForm(formId, aFormTypes.join('#'), scope, callbackFunction, formName);
                            return;
                        }
                        // preklad kodu chyby na text - zatim takto natvrdo
                        epca.WsForm.csShowErrorTextRest(o);
                        return;
                    }
                    // dekoduje formular z odpovedi
                    var oForm = Ext.decode(o);
                    //this = callbackFunction
                    var form = new epca.Form(oForm);
                    callbackFunction.call(scope, form);
                }
                /*failure : function(response) {
                 var o = Ext.decode(response.responseText);
                 console.dir(o);
                 if (config.callback) {
                 config.callback(o);
                 }
                 }*/
            });
        } else if (!i3.isEmptyString(epca.Config.User.webformURL)) {
            // soupove volani
            i3.SOAP.GetSoapResponse({
                url: epca.Config.User.webformURL,
                // pokud je vyplneno formname, bude se vyhledavat podle nazvu formulare, jinak podle ID
                method: (formName !== '') ? 'ReadFormByName' : 'ReadFormById',
                //resultElement : 'ReadFormResult',      // tag, kde bude odpoved - tady neni potreba
                params: {
                    // 10.01.17 on; zmena, posilat budu pouze prvni typ
                    //inFormType: formType,
                    inFormType: sFormType1,
                    inIctx: epca.Config.User.ictx,
                    inIdForm: (formName !== '') ? undefined : formId,
                    inFormName: (formName !== '') ? formName : undefined
                },
                callback: function(psResult) {
                    // dekoduje formular z odpovedi
                    var oForm = Ext.decode(psResult);
                    //this = callbackFunction
                    var form = new epca.Form(oForm);
                    this(form);
                },
                callbackscope: callbackFunction.createDelegate(scope)
            });
        } else {
            // 11.02.20 on; chybova hlaska pri prazdnem ID formulare 
            if (i3.isEmptyString(formId)) {
                i3.displayError(epca.L10n.txFormIdEmpty);
                return;
            }
            // 29.11.16 on; volani pres std. WS
            i3.WS.command({
                db: epca.Config.User.dbTab,
                command: 'webformsread',
                // 10.01.17 on; zmena, posilat budu pouze prvni typ
                //params: 'get|' + formType + '|' + formId,
                params: 'get|' + sFormType1 + '|' + formId,
                bDontHandleErr: true, // 10.02.17 on;
                success: function(o) {
                    var m;
                    if (o && (o.ret_code === '0')) {
                        var oResult = o.data[0];
                        if (!i3.isEmptyString(oResult.ErrorMessage)) {
                            // zobrazi chybu a skonci
                            m = new i3.WS.Msg(oResult.ErrorMessage + '#' + oResult.ErrorMessageDef);
                            i3.alert(m.userText);
                            return;
                        }
                        // dekoduje formular z odpovedi
                        var oForm = Ext.decode(oResult);
                        //this = callbackFunction
                        var form = new epca.Form(oForm);
                        this(form);
                    } else {
                        // chyba?
                        // 10.02.17 on; pokud mam v zasobe jeste dalsi typy, zkusim jeste je
                        if (aFormTypes.length > 0) {
                            // vola se tato metoda s upravenym jednom parametrem
                            that.getForm(formId, aFormTypes.join('#'), scope, callbackFunction, formName);
                            return;
                        }
                        // 12.02.20 on; neda se spolehat na to, co dostanu ze serveru 
                        //m = new i3.WS.Msg(o.ret_code + '#' + o.ret_msg);
                        //i3.displayError(m.userText);
                        i3.displayError(i3.fillInParams(epca.L10n.txErrorGetForm, [formId]));
                    }
                },
                scope: callbackFunction.createDelegate(scope)
            });
        }
    },
    csShowErrorTextRest: function(err) {
        Ext.Ajax.request({
            url: epca.Config.User.webformURLrest,
            method: 'POST',
            params: {
                soap_method: 'GetErrText',
                InErrId: err, // kod chyby
                InLang: epca.Config.getLanguage() // jazykova verze
            },
            success: function(response) {
                var o;
                o = response.responseXML.getElementsByTagName('GetErrTextResult');
                o = o[0].textContent;
                Ext.Msg.alert('Error', o);
            }
            /*failure : function(response) {
             var o = Ext.decode(response.responseText);
             console.dir(o);
             if (config.callback) {
             config.callback(o);
             }
             }*/
        });
    },
    csGetActiveTab: function() {
        var c = Ext.getCmp('tabPanelForms');
        // napr. v designeru
        if (!c) {
            return undefined;
        }
        var actTab = c.getActiveTab();
        return actTab;
    },
    /**
     * projde defaultni hodnoty a nahradi definove retezce aktualnim udajem
     *
     * 16.12.15 on; presun
     * 20.01.12 on;
     */
    csSwapDefaultValues: function(poDefValues) {
        var tag, subtag;
        for (tag in poDefValues) {
            if (poDefValues.hasOwnProperty(tag)) {
                for (subtag in poDefValues[tag]) {
                    if (poDefValues[tag].hasOwnProperty(subtag)) {
                        // vyswapuje definovane retezce za aktualni hodnoty
                        poDefValues[tag][subtag] = i3.csSwapDefaultValues(poDefValues[tag][subtag]);
                    }
                }
            }
        }
    }
};
