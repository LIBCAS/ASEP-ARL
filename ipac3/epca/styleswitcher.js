// 18.02.25 on; cteni boosteru pri zmene skinu
// 19.06.24 on; zmena css pouze pokud jde o spravnou ictx
// 29.04.24 on; zjisti aktualni styl - vychazi z funkce replacejscssfile
// 26.04.24 on; webserver pridava do url random retezec, musim se ho nejprve zbavit
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
// 18.02.25 on; prida booster do url
function addBooster2Url(url, booster) {
    if (!booster) {
        booster = '';
    }
    if (booster !== '') {
        url = url.replace('.css', '.' + booster + '.css');
    }
    return url;
}
// 18.02.25 on; booster
function replacejscssfile(oldfilename, newfilename, psBooster) {
    var i,
        newelement;
    var targetelement = "link";
    var targetattr = "href";
    var allsuspects = document.getElementsByTagName(targetelement);
    var css, tmp;
    if (!psBooster) {
        psBooster = '';
    }
    for (i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
        // 26.04.24 on; webserver pridava do url random retezec, musim se ho nejprve zbavit
        if (allsuspects[i] && (allsuspects[i].getAttribute(targetattr) !== null)) {
            css = allsuspects[i].getAttribute(targetattr);
            tmp = css.piece('.', css.fieldcount('.') - 1);
            if (tmp.substring(0, 2) === 'v-') {
                css = css.strswap('.' + tmp + '.', '.');
            }
            if (css.indexOf(oldfilename) !== -1) {
                // 18.02.25 on; booster
                newfilename = addBooster2Url(newfilename, psBooster);
                newelement = createjscssfile(newfilename);
                allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
            }
        }
    }
}
// 29.04.24 on; zjisti aktualni styl - vychazi z funkce replacejscssfile
function getActCss(poParams) {
    var i,
        newelement;
    var targetelement = "link";
    var targetattr = "href";
    var allsuspects = document.getElementsByTagName(targetelement);
    var css = '',
        tmp = '';
    poParams = poParams || {};
    for (i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
        // 26.04.24 on; webserver pridava do url random retezec, musim se ho nejprve zbavit
        if (allsuspects[i] && (allsuspects[i].getAttribute(targetattr) !== null)) {
            tmp = allsuspects[i].getAttribute(targetattr);
            tmp = tmp.piece('?', 1);
            if (tmp.piece('.', tmp.fieldcount('.')) === 'css') {
                css = tmp;
                tmp = css.piece('.', css.fieldcount('.') - 1);
                if (tmp.substring(0, 2) === 'v-') {
                    // 18.02.25 on; booster
                    poParams.sBooster = tmp;
                    css = css.strswap('.' + tmp + '.', '.');
                }
                // prvni css
                break;
            }
        }
    }
    return css;
}
// 18.02.25 on; booster
function fileExists(url, psBooster) {
    if (url) {
        url = addBooster2Url(url, psBooster);
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.status == 200;
    } else {
        return false;
    }
}
// 19.06.24 on; porovnani ictx
function isSameIctx(sCss) {
    if (sCss) {
        sCss = sCss.piece('/', sCss.fieldcount('/'));
        sCss = sCss.piece('.', 1);
        sCss = sCss.replace(/[0-9]/g, '');
        return (i3.ictx.toLowerCase() === sCss);
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
        d,
        oParams = {};
    // 29.04.24 on; predelane
    // 04.03.20 on; podpora pro designer
    if (this.document.URL.indexOf('indexDesigner') > 0) {
        sCookiesName = 'i3styledesigner';
        //sActualStyle = epca.designer.c.sActualCssStyle;
    } else {
        sCookiesName = 'i3style';
        //sActualStyle = epca.evidence.c.sActualCssStyle;
    }
    sActualStyle = getActCss(oParams);
    if (Ext.util.Cookies.get(sCookiesName)) {
        sValue = Ext.util.Cookies.get(sCookiesName);
        // pokud css z cookies neexistuje, nebudu nic menit
        if (!fileExists(sValue, oParams.sBooster)) {
            // neexistujici css smazu z cookies
            d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
            Ext.util.Cookies.set(sCookiesName, '', d);
            return;
        }
        // 19.06.24 on; zmena css pouze pokud jde o spravnou ictx
        if ((sActualStyle !== sValue) && isSameIctx(sValue)) {
            //Replace all occurences "oldstyle.css" with "newstyle.css"
            // 18.02.25 on; booster
            replacejscssfile(sActualStyle, sValue, oParams.sBooster);
            // 29.04.24 on; neni potreba
            //if (this.document.URL.indexOf('indexDesigner') > 0) {
            //    epca.designer.c.sActualCssStyle = sValue;
            //} else {
            //    epca.evidence.c.sActualCssStyle = sValue;
            //}
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
