/**
 *  05.12.23 on; timeout obecne zvysen, vyjimka pro VY nema smysl
 */
/* Ruzna uzivatelska nastaveni */
// separating the GET parameters from the current URL
var getParams = document.URL.split("?");
// transforming the GET parameters into a dictionnary
var urlParams = {};
if (getParams.length > 1) {
    urlParams = Ext.urlDecode(getParams[1]);
}
var ictx;
if (urlParams.ictx) {
    ictx = urlParams.ictx.toUpperCase();
}
// 05.12.23 on; timeout obecne zvysena na 185s, toto ztraci smysl
// 16.07.12 on; zvyseny timeout zatim pro VY (na 2 minuty)
/*if (ictx === 'VY') {
    Ext.Ajax.timeout = 125000;
} else {
    Ext.Ajax.timeout = 65000;
}*/
