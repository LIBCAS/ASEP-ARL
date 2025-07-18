/*
 * Prace se SOAP
 *
 * 23.05.12 on; oprava chyby
 * 02.03.12 on; oprava syntaxe
 * 20.01.12 on; oprava URL pro GetErrText
 * 24.08.11 on; pridany preklad zprav
 */
/*global Ext,i3 */
Ext.ns('i3.SOAP.tx');
Ext.apply(i3.SOAP.tx, {
    /*// N zaznamov (teoreticky pripad)
     txWarningNRecFound: ('Upozornenie: počet nájdených záznamov: %s!#' +
     'Upozornění: počet nalezených záznamů: %s!#' +
     'Warning: count of found values: %s!').ls(),
     // prave 0 zaznamov (pozn. spravu je mozne predefinovat pouzitim config option)
     txWarning0RecFound: ('Upozornenie: zadanými selekčnými kritériami neboli nájdené žiadne záznamy.#' +
     'Upozornění: zadanými selekčními kritérii nebyli nalezeny žádné záznamy.#' +
     'Warning: no records found by given search criteria.').ls()*/
});
Ext.ns('i3.SOAP');
/*****************************************************************************************************
 * IMPLEMENTACE SOAP KLIENTA
 *
 * prevzato z http://www.codeproject.com/KB/ajax/JavaScriptSOAPClient.aspx
 *
 *****************************************************************************************************/
/*
 * class for the definition of the parameters to be passed to the Web method
 */
function SOAPClientParameters() {
    var _pl = new Array(),
        p;
    this.add = function(name, value) {
        _pl[name] = value;
        return this;
    };
    this.toXml = function() {
        var xml = "";
        for (p in _pl) {
            if (typeof(_pl[p]) !== "function") {
                xml += "<" + p + ">" + SOAPClientParameters._serialize(_pl[p]) + "</" + p + ">";
            }
        }
        return xml;
    };
}
SOAPClientParameters._serialize = function(o) {
    var s = "",
        p;
    switch (typeof(o)) {
        case "string":
            s += o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            break;
        case "number":
        case "boolean":
            s += o.toString();
            break;
        case "object":
            // Date
            if (o.constructor.toString().indexOf("function Date()") > -1) {
                var year = o.getFullYear().toString();
                var month = (o.getMonth() + 1).toString();
                month = (month.length === 1) ? "0" + month : month;
                var date = o.getDate().toString();
                date = (date.length === 1) ? "0" + date : date;
                var hours = o.getHours().toString();
                hours = (hours.length === 1) ? "0" + hours : hours;
                var minutes = o.getMinutes().toString();
                minutes = (minutes.length === 1) ? "0" + minutes : minutes;
                var seconds = o.getSeconds().toString();
                seconds = (seconds.length === 1) ? "0" + seconds : seconds;
                var milliseconds = o.getMilliseconds().toString();
                var tzminutes = Math.abs(o.getTimezoneOffset());
                var tzhours = 0;
                while (tzminutes >= 60) {
                    tzhours++;
                    tzminutes -= 60;
                }
                tzminutes = (tzminutes.toString().length === 1) ? "0" + tzminutes.toString() : tzminutes.toString();
                tzhours = (tzhours.toString().length === 1) ? "0" + tzhours.toString() : tzhours.toString();
                var timezone = ((o.getTimezoneOffset() < 0) ? "+" : "-") + tzhours + ":" + tzminutes;
                s += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
            }
            // Array
            else if (o.constructor.toString().indexOf("function Array()") > -1) {
                for (p in o) {
                    if (!isNaN(p)) // linear array
                    {
                        (/function\s+(\w*)\s*\(/ig).exec(o[p].constructor.toString());
                        var type = RegExp.$1;
                        switch (type) {
                            case "":
                                type = typeof(o[p]);
                            case "String":
                                type = "string";
                                break;
                            case "Number":
                                type = "int";
                                break;
                            case "Boolean":
                                type = "bool";
                                break;
                            case "Date":
                                type = "DateTime";
                                break;
                        }
                        s += "<" + type + ">" + SOAPClientParameters._serialize(o[p]) + "</" + type + ">";
                    } else {
                        // associative array
                        s += "<" + p + ">" + SOAPClientParameters._serialize(o[p]) + "</" + p + ">";
                    }
                }
            }
            // Object or custom function
            else {
                for (p in o) {
                    s += "<" + p + ">" + SOAPClientParameters._serialize(o[p]) + "</" + p + ">";
                }
            }
            break;
        default:
            throw new Error(500, "SOAPClientParameters: type '" + typeof(o) + "' is not supported");
    }
    return s;
};
/**
 * Let's define the "SOAPClient" class, which can only contain static methods in order to allow
 * async calls, and the only "public" method within this class: "SOAPClient.invoke".
 *
 * Note: since JavaScript does not foresee access modifiers - such as "public", "private",
 * "protected", etc. - we'll use the "_" prefix to indicate private methods.
 */
function SOAPClient() {}
/*
 * The "SOAPClient.invoke" method checks whether the call is async (call result will be passed to the callback method)
 * or sync (call result will be directly returned).
 */
SOAPClient.invoke = function(url, method, parameters, async, callback, callbackcallback, callbackscope) {
    if (async) {
        SOAPClient._loadWsdl(url, method, parameters, async, callback, callbackcallback, callbackscope);
    } else {
        return SOAPClient._loadWsdl(url, method, parameters, async, callback, callbackcallback, callbackscope);
    }
};
/**
 * The call to the Web Service begins by invoking the "SOAPClient._loadWsdl" method
 */
SOAPClient._loadWsdl = function(url, method, parameters, async, callback, callbackcallback, callbackscope) {
    // load from cache?
    var wsdl = SOAPClient_cacheWsdl[url];
    // 04.08.11 on; toto neni podporovano IE, pokus o zmenu
    //if (wsdl + "" != "" && wsdl + "" != "undefined")
    if ((wsdl) && (wsdl !== "")) {
        return SOAPClient._sendSoapRequest(url, method, parameters, async, callback, wsdl, callbackcallback, callbackscope);
    }
    // get wsdl
    var xmlHttp = SOAPClient._getXmlHttp();
    xmlHttp.open("GET", url + "?wsdl", async);
    if (async) {
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                SOAPClient._onLoadWsdl(url, method, parameters, async, callback, xmlHttp, callbackcallback, callbackscope);
            }
        };
    }
    xmlHttp.send(null);
    if (!async) {
        return SOAPClient._onLoadWsdl(url, method, parameters, async, callback, xmlHttp, callbackcallback, callbackscope);
    }
};
/*
 * The method searches the cache for the same WSDL in order to avoid repetitive calls
 */
SOAPClient_cacheWsdl = new Array();
/*
 * If the WSDL is not found in the cache (it's the first call in the current context),
 * it is requested from the server using an XMLHttpRequest, according to the required mode (sync or not).
 * Once an answer is obtained from the server, the "SOAPClient._onLoadWsdl" method is invoked
 */
SOAPClient._onLoadWsdl = function(url, method, parameters, async, callback, req, callbackcallback, callbackscope) {
    var wsdl = req.responseXML;
    // 04.08.11 on; pokud server nevrati wsdl, je neco spatne
    if (!wsdl) {
        if (callback) {
            callback.call(callbackscope || this, null, req.responseText, callbackcallback);
        }
        return;
    }
    SOAPClient_cacheWsdl[url] = wsdl;
    // save a copy in cache
    return SOAPClient._sendSoapRequest(url, method, parameters, async, callback, wsdl, callbackcallback, callbackscope);
};
/*
 * A WSDL copy is stored into the cache and then the "SOAPClient._sendSoapRequest" method is executed
 */
SOAPClient._sendSoapRequest = function(url, method, parameters, async, callback, wsdl, callbackcallback, callbackscope) {
    // get namespace
    var ns = (wsdl.documentElement.attributes["targetNamespace"] + "" === "undefined") ? wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue : wsdl.documentElement.attributes["targetNamespace"].value;
    // build SOAP request
    var sr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + "<soap:Envelope " + "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " + "xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " + "xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" + "<soap:Body>" + "<" + method + " xmlns=\"" + ns + "\">" + parameters.toXml() + "</" + method + "></soap:Body></soap:Envelope>";
    // send request
    var xmlHttp = SOAPClient._getXmlHttp();
    xmlHttp.open("POST", url, async);
    var soapaction = ((ns.lastIndexOf("/") !== ns.length - 1) ? ns + "/" : ns) + method;
    xmlHttp.setRequestHeader("SOAPAction", soapaction);
    xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    if (async) {
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                SOAPClient._onSendSoapRequest(method, async, callback, wsdl, xmlHttp, callbackcallback, callbackscope);
            }
        };
    }
    xmlHttp.send(sr);
    if (!async) {
        return SOAPClient._onSendSoapRequest(method, async, callback, wsdl, xmlHttp, callbackcallback, callbackscope);
    }
};
/*
 * The service namespace is taken out of the WSDL (using different XPath queries for Internet Explorer and
 * Mozilla / FireFox), then a SOAP v. 1.1 request is created and submitted.
 * The "SOAPClient._onSendSoapRequest" method will be invoked upon receiving the server response.
 */
SOAPClient._onSendSoapRequest = function(method, async, callback, wsdl, req, callbackcallback, callbackscope) {
    var o = null;
    var nd = SOAPClient._getElementsByTagName(req.responseXML, method + "Result");
    if (nd.length === 0) {
        if (req.responseXML.getElementsByTagName("faultcode").length > 0) {
            if (async ||callback) {
                o = new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
            } else {
                throw new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
            }
        }
    } else {
        o = SOAPClient._soapresult2object(nd[0], wsdl);
    }
    if (callback) {
        callback.call(callbackscope || this, o, req.responseXML, callbackcallback);
    }
    if (!async) {
        return o;
    }
};
/**
 * The server response is processed looking for faults: if found, an error is raised.
 * Instead, if a correct result is obtained, a recursive function will generate the return type by using
 * the service description.
 */
SOAPClient._soapresult2object = function(node, wsdl) {
    var wsdlTypes = SOAPClient._getTypesFromWsdl(wsdl);
    return SOAPClient._node2object(node, wsdlTypes);
};
SOAPClient._node2object = function(node, wsdlTypes) {
    var i;
    // null node
    if (node === null) {
        return null;
    }
    // text node
    if (node.nodeType === 3 || node.nodeType === 4) {
        return SOAPClient._extractValue(node, wsdlTypes);
    }
    // leaf node
    if (node.childNodes.length === 1 && (node.childNodes[0].nodeType === 3 || node.childNodes[0].nodeType === 4)) {
        return SOAPClient._node2object(node.childNodes[0], wsdlTypes);
    }
    var isarray = SOAPClient._getTypeFromWsdl(node.nodeName, wsdlTypes).toLowerCase().indexOf("arrayof") !== -1;
    // object node
    if (!isarray) {
        // 04.08.11 on; nebude vracet objekt (stejne nefungovalo dobre), ale vrati primo text
        /*var obj = null;
         if(node.hasChildNodes())
         obj = new Object();
         for(var i = 0; i < node.childNodes.length; i++) {
         var p = SOAPClient._node2object(node.childNodes[i], wsdlTypes);
         obj[node.childNodes[i].nodeName] = p;
         }
         return obj;*/
        return node.textContent;
    }
    // list node
    else {
        // create node ref
        var l = new Array();
        for (i = 0; i < node.childNodes.length; i++) {
            l[l.length] = SOAPClient._node2object(node.childNodes[i], wsdlTypes);
        }
        return l;
    }
    return null;
};
SOAPClient._extractValue = function(node, wsdlTypes) {
    var value = node.nodeValue;
    switch (SOAPClient._getTypeFromWsdl(node.parentNode.nodeName, wsdlTypes).toLowerCase()) {
        default:
        case "s:string":
            return (value != null) ? value + "" : "";
        case "s:boolean":
            return value + "" == "true";
        case "s:int":
        case "s:long":
            return (value != null) ? parseInt(value + "", 10) : 0;
        case "s:double":
            return (value != null) ? parseFloat(value + "") : 0;
        case "s:datetime":
            if (value == null) return null;
            else {
                value = value + "";
                value = value.substring(0, (value.lastIndexOf(".") == -1 ? value.length : value.lastIndexOf(".")));
                value = value.replace(/T/gi, " ");
                value = value.replace(/-/gi, "/");
                var d = new Date();
                d.setTime(Date.parse(value));
                return d;
            }
    }
};
SOAPClient._getTypesFromWsdl = function(wsdl) {
    var wsdlTypes = new Array();
    // IE
    var ell = wsdl.getElementsByTagName("s:element");
    var useNamedItem = true;
    // MOZ
    if (ell.length == 0) {
        ell = wsdl.getElementsByTagName("element");
        useNamedItem = false;
    }
    for (var i = 0; i < ell.length; i++) {
        if (useNamedItem) {
            if (ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("type") != null) wsdlTypes[ell[i].attributes.getNamedItem("name").nodeValue] = ell[i].attributes.getNamedItem("type").nodeValue;
        } else {
            if (ell[i].attributes["name"] != null && ell[i].attributes["type"] != null) wsdlTypes[ell[i].attributes["name"].value] = ell[i].attributes["type"].value;
        }
    }
    return wsdlTypes;
};
SOAPClient._getTypeFromWsdl = function(elementname, wsdlTypes) {
    var type = wsdlTypes[elementname] + "";
    return (type == "undefined") ? "" : type;
};
/**
 * The "SOAPClient._getElementsByTagName" method optimizes XPath queries according to the available XML parser.
 */
SOAPClient._getElementsByTagName = function(document, tagName) {
    try {
        // trying to get node omitting any namespaces (latest versions of MSXML.XMLDocument)
        return document.selectNodes(".//*[local-name()=\"" + tagName + "\"]");
    } catch (ex) {}
    // old XML parser support
    return document.getElementsByTagName(tagName);
};
/**
 * A factory function returns the XMLHttpRequest according to the browser type.
 */
SOAPClient._getXmlHttp = function() {
    try {
        if (window.XMLHttpRequest) {
            var req = new XMLHttpRequest();
            // some versions of Moz do not support the readyState property and the onreadystate event so we patch it!
            if (req.readyState == null) {
                req.readyState = 1;
                req.addEventListener("load", function() {
                    req.readyState = 4;
                    if (typeof req.onreadystatechange == "function") req.onreadystatechange();
                }, false);
            }
            return req;
        }
        if (window.ActiveXObject) return new ActiveXObject(SOAPClient._getXmlHttpProgID());
    } catch (ex) {}
    throw new Error("Your browser does not support XmlHttp objects");
};
SOAPClient._getXmlHttpProgID = function() {
    if (SOAPClient._getXmlHttpProgID.progid) return SOAPClient._getXmlHttpProgID.progid;
    var progids = ["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
    var o;
    for (var i = 0; i < progids.length; i++) {
        try {
            o = new ActiveXObject(progids[i]);
            return SOAPClient._getXmlHttpProgID.progid = progids[i];
        } catch (ex) {};
    }
    throw new Error("Could not find an installed XML parser");
};
/**
 * ********************************************************************************
 */
/**
 * @class i3.SOAP.runSOAPMethod
 * Spusteni SOAP metody - volani pre parametry v URL - nepouzite
 *
 */
/*i3.SOAP.runSOAPMethod = function(config, args) {
config = config || {};
var successFn = config.success, scope = config.scope || this;
var resultElement = config.resultElement;

Ext.applyIf(config, {
method : 'POST'
});

if((!args) || (args.overrideSuccess)) {
Ext.apply(config, {
success : function(response, o) {
// osetreni chyby sluzby
if((!response) || (!response.responseXML)) {
var sErr = 'Error calling WS method ' + o.params.soap_method + '. URL: ' + o.url;
if(response) {
sErr += '; ' + 'statusText: ' + response.status + ' - ' + response.statusText + '; ' + 'responseText: ' + response.responseText;
}

Ext.Msg.alert('Error', sErr);
return;
}

if(response.responseXML.getElementsByTagName('faultstring').length == 1) {
var text = response.responseXML.getElementsByTagName('faultstring')[0].textContent;
Ext.Msg.alert('SOAP - ' + text, response.responseText);
return;
}

if(response.responseXML.getElementsByTagName(resultElement).length == 0) {
var sErr = 'Error calling WS method ' + o.params.soap_method + '. URL: ' + o.url;
if(response) {
sErr += '; ' + 'statusText: ' + response.status + ' - ' + response.statusText + '; ' + 'responseText: ' + response.responseText;
}

Ext.Msg.alert('Error', sErr);
return;
}

// chybu muze vrati i WS
var sResult = response.responseXML.getElementsByTagName(resultElement)[0].textContent;
if(sResult.substring(0, 3) === 'ERR') {
Ext.Msg.alert('Error', sResult);
return;
}

// vypada to ok, spustim callback success metody
successFn.call(scope, sResult, args);
}
});
};

// default chybova hlaska
Ext.applyIf(config, {
failure : function(response, o) {
var sErr = 'Error calling WS method ' + o.params.soap_method + '. URL: ' + o.url + '; ' + 'statusText: ' + response.status + ' - ' + response.statusText + '; ' + 'responseText: ' + response.responseText;
Ext.Msg.alert('Error', sErr);
}
});

Ext.Ajax.request(config);
};*/
/**
 * @class i3.SOAP.writeForm
 * Metoda pro ulozeni formulare. Formular je potreba rozdelit po cca 16kB na vic casti. - nepouzite
 *
 */
/*i3.SOAP.writeForm = function(config, poRestData) {
// data formulare
var self = arguments.callee, i;
var nMaxLen = 16000;
var bFirst;

if(poRestData) {
bFirst = false;
this.sData = poRestData.data;
this.i = poRestData.index;
} else {
this.sData = config.params.inData;
this.i = 1;
bFirst = true;
}

if(this.sData !== '') {
config.params.inData = this.sData.substring(0, nMaxLen);
this.sData = this.sData.substring(nMaxLen);
config.params.inRowData = this.i;
this.i += 1;
that = this;

// pri prvnim volani nastav success
if(bFirst) {
Ext.apply(config, {
success : function(psResult, args) {
if(psResult !== 'OK') {
// melo by byt osetreno v runSOAPMethod
epca.notify("Pri manipulácií s formulárom sa vyskytla chyba: " + psResult, "Chyba", "icon-error");
} else {

if(that.sData === '') {
/// pokud uz nejsou zadna data k posilani, tak je to asi OK
epca.notify("Formulár bol úspešne uložený.", "Úspech", "icon-accept");
} else {
// pokud probehlo ulozeni v poradku a jsou jeste data k ulozeni, zavola rekurzivne funkci pro dalsi instanci
var oParams = {
data : that.sData,
index : that.i
};
//setTimeout("self(config,oParams)", 10);
self(config, oParams);
}
}
}
})
}

i3.SOAP.runSOAPMethod(config, {
overrideSuccess : bFirst
});
}
};*/
/**
 * VOLANI SOAP SLUZEB
 */
i3.SOAP.GetSoapResponse = function(config) {
    var pl = new SOAPClientParameters();
    for (var param in config.params) {
        if ((typeof(config.params[param]) != "function") && (config.params[param] !== undefined)) {
            pl.add(param, config.params[param]);
        }
    }
    SOAPClient.invoke(config.url, config.method, pl, true, GetSoapResponse_callBack, config.callback, config.callbackscope);
};

function GetSoapResponse_callBack(r, soapResponse, callback) {
    if (!r) {
        // pokud je r === null, tak mame v soapResponse ulozeny text, ktery vratila stranka
        Ext.Msg.alert('Error', soapResponse);
        return;
    }
    // chyba soapu
    if (r.name === 'Error') {
        Ext.Msg.alert('SOAP ' + r.toString(), r.fileName);
        return;
    }
    /*var sResponse;
    if(soapResponse.xml)    // IE
    sResponse = soapResponse.xml;
    else    // MOZ
    sResponse = (new XMLSerializer()).serializeToString(soapResponse);*/
    // osetreni chyby sluzby
    /*if((!response) || (!response.responseXML)) {
    var sErr = 'Error calling WS method ' + o.params.soap_method + '. URL: ' + o.url;
    if(response) {
    sErr += '; ' + 'statusText: ' + response.status + ' - ' + response.statusText + '; ' + 'responseText: ' + response.responseText;
    }

    Ext.Msg.alert('Error', sErr);
    return;
    }

    if(response.responseXML.getElementsByTagName('faultstring').length == 1) {
    var text = response.responseXML.getElementsByTagName('faultstring')[0].textContent;
    Ext.Msg.alert('SOAP - ' + text, response.responseText);
    return;
    }

    if(response.responseXML.getElementsByTagName(resultElement).length == 0) {
    var sErr = 'Error calling WS method ' + o.params.soap_method + '. URL: ' + o.url;
    if(response) {
    sErr += '; ' + 'statusText: ' + response.status + ' - ' + response.statusText + '; ' + 'responseText: ' + response.responseText;
    }

    Ext.Msg.alert('Error', sErr);
    return;
    }*/
    // chybu muze vrati i WS
    if (r.substring(0, 3) === 'ERR') {
        // preklad kodu chyby na text - zatim takto natvrdo
        i3.SOAP.GetSoapResponse({
            url: epca.Config.User.webformURL, // 20.01.12 on; oprava
            method: 'GetErrText',
            params: {
                InErrId: r, // kod chyby
                InLang: epca.Config.getLanguage() // jazykova verze
            },
            callback: function(psResult) {
                Ext.Msg.alert('Error', psResult);
            }
        });
        return;
    }
    if (callback) {
        callback.call(this, r);
    }
};
/**
 * @class i3.SOAP.writeFormSOAP
 * Metoda pro ulozeni formulare pres SOAP. Formular je potreba rozdelit po cca 16kB na vic casti.
 *
 */
i3.SOAP.writeFormSOAP = function(config, poRestData) {
    // data formulare
    var self = arguments.callee,
        i;
    var nMaxLen = 16000;
    var bFirst;
    if (poRestData) {
        bFirst = false;
        this.sData = poRestData.data;
        this.i = poRestData.index;
    } else {
        this.sData = config.params.inData;
        this.i = 1;
        bFirst = true;
    }
    if (this.sData !== '') {
        config.params.inData = this.sData.substring(0, nMaxLen);
        this.sData = this.sData.substring(nMaxLen);
        config.params.inRowData = this.i;
        this.i += 1;
        that = this;
        // pri prvnim volani nastav success
        if (bFirst) {
            Ext.apply(config, {
                callback: function(psResult, o, poRestResult) {
                    if (config.method === 'POST') {
                        psResult = poRestResult.statusText;
                    }
                    if (psResult !== 'OK') {
                        // melo by byt osetreno v runSOAPMethod
                        epca.notify("Pri manipulácií s formulárom sa vyskytla chyba: " + psResult, "Chyba", "icon-error");
                    } else {
                        if (that.sData === '') {
                            /// pokud uz nejsou zadna data k posilani, tak je to asi OK
                            epca.notify("Formulár bol úspešne uložený.", "Úspech", "icon-accept");
                        } else {
                            // pokud probehlo ulozeni v poradku a jsou jeste data k ulozeni, zavola rekurzivne funkci pro dalsi instanci
                            var oParams = {
                                data: that.sData,
                                index: that.i
                            };
                            //setTimeout("self(config,oParams)", 10);
                            self(config, oParams);
                        }
                    }
                }
            });
        }
        // 24.08.15 on; restove  volani
        if (config.method === 'POST') {
            Ext.Ajax.request(config);
        } else {
            i3.SOAP.GetSoapResponse(config);
        }
    }
};
/**
 * @class i3.SOAP.Store
 * Zakladne ARL SOAP store - nepouzivat priamo.
 */
i3.SOAP.Store = Ext.extend(Ext.data.Store, {
    /**
     * @param {Object} config
     * config options:
     * csShowInfo0Rec:  zobrazit info spravu u 0 najdenych zaznamoch
     *                  aktualne detto ako csDebug - neskor sa moze zmysel
     *                  zjemnit - chcem mat debug oddelene od info sprav
     *                  typ: boolean, default: false
     * csTxInfo0Rec:    volitelny text spravy o 0 zaznamoch (ak sa neuvedie,
     *                  pouzije sa default; aby sa sprava zobrazila
     *                  treba sucasne zapnut csShowInfo0Rec)
     *                  parameter je mozne menit aj pocas runtime priamo nastavenim
     *                  (nebudem zatial na to robit metodu)
     */
    constructor: function(config) {
        config = config || {};
        // defaulty z objektu WS sluzby
        Ext.apply(config, {
            baseParams: (config.baseParams || {})
        });
        //Ext.applyIf(config.baseParams, i3.SOAP.baseParams);
        // defaulty zakladneho SOAP store
        Ext.applyIf(config, {
            listeners: {}
        });
        Ext.applyIf(config.listeners, {
            loadexception: {
                fn: this.csSOAPOnLoadException,
                scope: this
            },
            load: {
                fn: this.csSOAPOnLoad,
                scope: this
            },
            beforeload: {
                fn: this.csSOAPOnBeforeLoad,
                scope: this
            }
        });
        i3.SOAP.Store.superclass.constructor.call(this, config);
    },
    /**
     *
     * zobrazenie info o nulovom pocte najdenych zaznamov
     * toto asi do buducna nebudeme chciet ako default - zatial experimentalne
     *
     *  03.02.09 rs; drobne vylepsenie + preklad sprav
     *  24.01.09 rs; podmienka pre zobrazenie onLoad spravy pri nulovom pocete zaznamov
     *               zmenena na debug OR nulovy pocet
     *               (predtym bolo OR)
     * @param {Object} store
     * @param {Object} records
     * @param {Object} options
     */
    csSOAPOnLoad: function(store, records, options) {
        /*//i3.msg('Store','load');

         var c = records.length, bS = (this.csDebug > 0) || this.csShowInfo0Rec;

         // upozornime, ak sa nenasli ziadne zaznamy
         if((c < 0) && bS) {
         i3.msg(i3.WS.tx.txWarningNRecFound, c);
         }
         if((c === 0) && bS) {
         // 11.10.10 on; zmena na i3.alert
         // zobrazime bud uzivatelsky upravenu spravu pre dane store, alebo
         // defaultnu spravu
         //i3.msg(this.csTxInfo0Rec ? this.csTxInfo0Rec : i3.WS.tx.txWarning0RecFound);
         i3.alert(this.csTxInfo0Rec ? this.csTxInfo0Rec : i3.WS.tx.txWarning0RecFound);
         }*/
    },
    /**
     * Metoda volana pred odoslanim requestu na server
     *
     * zatim prazdna
     */
    csSOAPOnBeforeLoad: function() {
        /*if (i3.WS.baseParams.debug !== undefined) {
         this.baseParams.debug = i3.WS.baseParams.debug;
         }
         // pri prvom req.skopiruje aj ictx
         if ((i3.WS.baseParams.ictx !== undefined) && (!this.baseParams.ictx)) {
         this.baseParams.ictx = i3.WS.baseParams.ictx;
         }

         // aj language
         if ((i3.WS.baseParams.language !== undefined) && (!this.baseParams.language)) {
         this.baseParams.language = i3.WS.baseParams.language;
         }*/
    },
    /**
     * Zobrazenie chybovej spravy ze SOAP
     *
     * prevzate z WS
     *
     */
    csSOAPOnLoadException: function(pProxy, pOptions, pResponse, pError) {
        i3.msg('Store', 'loadexception');
        var sInfo = '(data from SOAP server not available)',
            oJSON;
        if (!pError) {
            sInfo = 'seems there were no data received from server (no reply)';
        } else {
            // seems there is reply - some info should be in pError
            if ((pError.name === 'TypeError') && this.reader && this.reader.jsonData && (this.reader.jsonData.ret_code !== undefined)) {
                oJSON = this.reader.jsonData;
                // seems we got data, reader even got it, but there is some problem
                sInfo = 'SOAP request error: code=' + oJSON.ret_code;
                if (oJSON.ret_msg !== undefined) {
                    sInfo += ' msg: ' + oJSON.ret_msg;
                }
                if (oJSON.ret_code === '0') {
                    // pokial je oJSON.ret_code uvedene a je ine ako '0', potom WS sluzba
                    // vratila chybu a ta byh mala byt snad dostatocne popisna
                    // v opacnom pripade vypiseme aj data z 'reader-a'
                    sInfo += ' here is what data-reader tries to tell us:' + pError.name + ' - ' + pError.message;
                }
            } else {
                // seems we got data, but reader has a problem
                sInfo = 'error in data got from server: ' + pError.name + ' - ' + pError.message;
            }
        }
        Ext.Msg.alert('Store', 'Load exception: ' + sInfo);
    }
});
/**
 * Store proxy, ktore vie ziskat data statickej tabulky via WS
 * Interne zatial pouzijeme ArrayReader, i ked je to tu viac menej zbytocne,
 * data sa konvertuju 2x.
 */
i3.SOAPSTProxy = Ext.extend(Ext.data.DataProxy, {
    /**
     * constructor (default)
     *  config:
     *    csDisplayID: popis viz. i3.WS.StoreST
     *    @private
     */
    constructor: function(config) {
        config.csTest = 1;
        i3.SOAPSTProxy.superclass.constructor.call(this);
    },
    load: function(params, reader, callback, scope, arg) {
        // OK mame precitany jeden zaznam statickej tabulky s tagmi 200 $a,$b
        // prekonvertujeme jeho strukturu do tvaru vhodneho pre ArrayReader
        var processRecFn = function(response) {
            var sErr, arrayData = [],
                sA, sB, text, x, i, sLine, aFormList, fld, arr, aSortedArr = [];
            if (!i3.isEmptyString(params.urlrest)) {
                //  restove volani
                if ((!response) || (!response.responseXML) || (!response.responseXML.getElementsByTagName('GetListFormResult'))) {
                    sErr = '';
                    if (response) {
                        sErr = ':\n\n' + response.responseText;
                    }
                    alert('wrong response' + sErr);
                    return;
                } else {
                    x = response.responseXML.getElementsByTagName('GetListFormResult')[0].textContent;
                    x = Ext.decode(x);
                }
            } else {
                x = Ext.decode(response);
            }
            for (i = 0; i < x.list.dform.length; i++) {
                sLine = x.list.dform[i];
                // id
                sA = sLine.IdForm;
                // text
                sB = sLine.FormName;
                // vyber jazykovej mutacie; pouzije globalne defaulty
                sB = i3.languageSel(sB);
                // toto zabezpeci, ze text cast bude obsahovat aj 'id'
                // pozn.: vyzera, ze load je volane v inom scope ako "this" (=proxy)
                // scope je ale nastavene na suvisiace i3.WS.StoreST,
                // takze toto vyuzijeme a pouzijeme jeho parametre
                if (scope.csDisplayID && (sA !== sB)) {
                    sB = sA + ' - ' + sB;
                }
                arrayData.push([sA, sB]);
            }
            // 31.08.15 on; moznost filtrovat a seradit podle predaneho seznamu
            if (!i3.isEmptyString(arg.formList)) {
                aFormList = arg.formList.split('#');
                for (i = 0; i < aFormList.length; i++) {
                    fld = aFormList[i];
                    arr = arrayData.filter(function(o) {
                        return o[0] == fld
                    });
                    if (arr[0]) {
                        aSortedArr.push(arr[0]);
                    }
                }
                arrayData = aSortedArr;
            }
            // malo by to byt - odovzdame data dalej
            // a ArrayReader ich prekonvertuje do tvaru Ext.data.Record[]
            var result = reader.readRecords(arrayData);
            callback.call(scope, result, arg, true);
        };
        /// 24.08.15 on; restove volani
        if (!i3.isEmptyString(params.urlrest)) {
            Ext.Ajax.request({
                url: params.urlrest,
                method: 'POST',
                params: {
                    soap_method: params.method,
                    inIctx: params.ictx,
                    inFormType: arg.format
                },
                success: processRecFn,
                scope: this
                //failure : function(response) {
                // do something else on failed call
                //alert('error');
                //}
            });
        } else {
            // soap volani
            i3.SOAP.GetSoapResponse({
                url: params.url,
                method: params.method,
                params: {
                    inIctx: params.ictx,
                    inFormType: arg.format
                },
                callback: processRecFn,
                callbackscope: this
            });
        }
    }
});
/**
 * @class i3.SOAP.StoreST
 * Store pre staticke tabulky
 *
 */
i3.SOAP.StoreST = Ext.extend(i3.SOAP.Store, {
    /**
     *
     * @param {Object} config
     *   csStatTableN: nazov stat.tabulky na nacitanie
     *                 v sucasnej verzii BEZ prefixu nazvu UnTablesd triedy
     *   csDisplayID
     *     '0' alebo '1' ci do textovej casti zahrnut aj zobrazenie id
     *     je to trocha nesystemove, pretoze su tam 2 polozky text/id a pri csDisplayID=1
     *     vlozime id duplicitne aj to "text" ale dosiahne sa tym velmi prijemny zelany
     *     efekt v comboboxoch
     *
     *   csData
     *     '0' nebo '1' zda naplni i polozku Data v store, obsahem celych radku zaznamu
     */
    constructor: function(config) {
        config = config || {};
        // defaulty zakladneho WS store
        Ext.applyIf(config, {
            //root: 'records',
            baseParams: {}
        });
        // vytvorit id pre registraciu v StoreManager-i
        var stId = '';
        //config.csStatTableN; //.strswap('*','');
        // default pre fields
        Ext.applyIf(config, {
            fields: ['id', 'text'],
            // storeId zaregistruje Store v StoreManageri - pokial je potreba viac krat
            // to iste store, pouzije sa len jedna kopia a nevytvara sa ich viac.
            storeId: (stId !== '') ? stId : undefined,
            autoLoad: false
            /*baseParams : {
             t001 : config.csStatTableN,
             options : 'd'   // 08.07.11 on; bude se nacitat vcetne diferenci
             }*/
        });
        // napevno reader
        Ext.apply(config, {
            reader: new Ext.data.ArrayReader({
                    id: config.id
                }, //
                // construktor zaznamov
                Ext.data.Record.create(config.fields)),
            proxy: new i3.SOAPSTProxy({
                csDisplayID: config.csDisplayID ? config.csDisplayID : 0
            })
        });
        i3.SOAP.StoreST.superclass.constructor.call(this, config);
    },
    // constructor pre manualne vkladane zaznamy
    Record: Ext.data.Record.create([{
        name: 'id',
        type: 'string'
    }, {
        name: 'text',
        type: 'string'
    }])
});
/**
 * @class i3.SOAP.runSOAPMethod
 * Spusteni SOAP metody
 *
 */
i3.SOAP.runSOAPMethod = function(config, args) {
    config = config || {};
    var successFn = config.success,
        scope = config.scope || this;
    var resultElement = config.resultElement;
    Ext.applyIf(config, {
        method: 'POST'
    });
    if ((!args) || (args.overrideSuccess)) {
        Ext.apply(config, {
            success: function(response, o) {
                // osetreni chyby sluzby
                if ((!response) || (!response.responseXML)) {
                    var sErr = 'Error calling WS method ' + o.params.soap_method + '. URL: ' + o.url;
                    if (response) {
                        sErr += '; ' + 'statusText: ' + response.status + ' - ' + response.statusText + '; ' + 'responseText: ' + response.responseText;
                    }
                    Ext.Msg.alert('Error', sErr);
                    return;
                }
                if (response.responseXML.getElementsByTagName('faultstring').length == 1) {
                    var text = response.responseXML.getElementsByTagName('faultstring')[0].textContent;
                    Ext.Msg.alert('SOAP - ' + text, response.responseText);
                    return;
                }
                if (response.responseXML.getElementsByTagName(resultElement).length == 0) {
                    var sErr = 'Error calling WS method ' + o.params.soap_method + '. URL: ' + o.url;
                    if (response) {
                        sErr += '; ' + 'statusText: ' + response.status + ' - ' + response.statusText + '; ' + 'responseText: ' + response.responseText;
                    }
                    Ext.Msg.alert('Error', sErr);
                    return;
                }
                // chybu muze vrati i WS
                var sResult = response.responseXML.getElementsByTagName(resultElement)[0].textContent;
                if (sResult.substring(0, 3) === 'ERR') {
                    Ext.Msg.alert('Error', sResult);
                    return;
                }
                // vypada to ok, spustim callback success metody
                successFn.call(scope, sResult, args);
            }
        });
    };
    // default chybova hlaska
    Ext.applyIf(config, {
        failure: function(response, o) {
            var sErr = 'Error calling WS method ' + o.params.soap_method + '. URL: ' + o.url + '; ' + 'statusText: ' + response.status + ' - ' + response.statusText + '; ' + 'responseText: ' + response.responseText;
            Ext.Msg.alert('Error', sErr);
        }
    });
    Ext.Ajax.request(config);
};
