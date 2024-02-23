// 04.03.20 on; podpora pro designer
// 21.01.16 on; prepinani stylu
/*global Ext,i3,epca,document,window*/
function createjscssfile(filename) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
    return fileref;
}

function replacejscssfile(oldfilename, newfilename) {
    var i,
        newelement;
    var targetelement = "link";
    var targetattr = "href";
    var allsuspects = document.getElementsByTagName(targetelement);
    for (i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
        if ((allsuspects[i] && allsuspects[i].getAttribute(targetattr) !== null) && (allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) !== -1)) {
            newelement = createjscssfile(newfilename);
            allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
        }
    }
}

function fileExists(url) {
    if (url) {
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.status == 200;
    } else {
        return false;
    }
}
window.onload = function(e) {
    /*var cookie = readCookie("i3style");
     var title = cookie ? cookie : getPreferredStyleSheet();
     setActiveStyleSheet(title);*/
    var sValue,
        sCookiesName,
        sActualStyle,
        d;
    // 04.03.20 on; podpora pro designer
    if (this.document.URL.indexOf('indexDesigner') > 0) {
        sCookiesName = 'i3styledesigner';
        sActualStyle = epca.designer.c.sActualCssStyle;
    } else {
        sCookiesName = 'i3style';
        sActualStyle = epca.evidence.c.sActualCssStyle;
    }
    if (Ext.util.Cookies.get(sCookiesName)) {
        sValue = Ext.util.Cookies.get(sCookiesName);
        // pokud css z cookies neexistuje, nebudu nic menit
        if (!fileExists(sValue)) {
            // neexistujici css smazu z cookies
            d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
            Ext.util.Cookies.set(sCookiesName, '', d);
            return;
        }
        if (sActualStyle !== sValue) {
            //Replace all occurences "oldstyle.css" with "newstyle.css"
            replacejscssfile(sActualStyle, sValue);
            if (this.document.URL.indexOf('indexDesigner') > 0) {
                epca.designer.c.sActualCssStyle = sValue;
            } else {
                epca.evidence.c.sActualCssStyle = sValue;
            }
            d = new Date();
            // platnost rok
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
            Ext.util.Cookies.set(sCookiesName, sValue, d);
        }
    }
};
/*window.onunload = function(e) {
 var title = getActiveStyleSheet();
 createCookie("i3style", title, 365);
 }*/
/*var cookie = readCookie("i3style");
 var title = cookie ? cookie : getPreferredStyleSheet();
 setActiveStyleSheet(title);*/
