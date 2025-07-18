/**
 * Zakladna kniznica funkcii - nezavisla na Ext.
 *
 * 15.04.25 on; nova verze csDeleteInterpunction
 * 24.03.22 on; zruseno omezeni ve 4 funkcich
 * 17.01.22 on; podminka pro parametr objektu, pokud jde o indikator, tak neporovnavat
 * 16.12.21 on; nastavi scope udalosti listeners.select/change, pokud je nadefinovana
 * 19.11.21 on; do csSwapDefaultValues doplnena pobocka
 * 15.10.21 on; doplneno equalObjects
 * 14.10.21 on; doplneno csDeleteInterpunction
 * 13.10.21 on; cs_search_combobox_fs
 * 09.04.20 on; zvysen limit v piece
 * 29.11.19 on; prefix subtagu
 * 03.10.19 on; doplneni cloneObject
 * 10.07.19 on; predelane fillInParams
 * 28.06.19 on; csIsPhone
 * 06.06.19 on; pripadna kotva
 * 04.04.18 on; reverse
 * 19.02.18 on; uprava piece
 * 09.09.15 on; funkce getURLParam
 * 31.07.15 on; rozsireni equalObjects
 * 19.05.15 on; dateTimeInt0
 * 08.04.15 on; logovani do equalObjects
 * 19.12.14 on; osetreno csSwapDefaultValues
 * 08.12.14 on; rozsireno csSwapDefaultValues
 * 03.11.14 on; funkce csGetShortDate
 * 04.09.14 on; moznost nastavit v *.csp souboru defaultni jazyk
 * 29.08.14 onl rozsireni csGetDbFormat
 * 06.08.14 on; rozsireno csGetDbFormat o objednavky a faktury
 * 24.07.14 on; funkce csGetDbFormat a csFixLname
 * 25.06.14 on; csFilterUnsupChars zatim netreba, osetreno na serveru
 * 25.06.14 on; zapojena metoda csFilterUnsupChars
 * 20.05.14 on; osetrana situace v languageSel
 * 30.04.14 on; moznost zmenit default jazyk pro languageSel
 * 15.04.14 on; isRTL
 * 20.03.14 on; arabstina
 * 05.02.14 on; rozsirena metoda cloneObject
 * 08.10.13 on; oprava funkce fieldcount
 * 18.06.13 jk; doplnena funkce csSetUrlParam
 * 13.06.13 jk; doplnen parametr bDefLang
 * 23.04.13 on; osetrena funkce csSwapDefaultValues
 * 16.04.13 on; metoda csJsonDecode
 * 05.02.13 on; funkce fieldLocate
 * 15.01.13 on; rozsireni applyComp kvuli interpi
 * 15.11.12 on; csIsEmptyArrayOfObj
 * 06.11.12 on; anchorMinus
 * 05.11.12 on; isEmptyTagSet: kontrola vnorenych objektu
 * 25.10.12 on; doplnena funkce equalObjects, ktera porovna objekty podle obsahu
 * 07.09.12 on; kontrola povolenych cookies
 * 15.06.12 on; doplnen format datumu a casu YYYYMMDDHHNNSS
 * 06.06.12 jk; doplneni moznosti zaescapovani znaku, ktery je pouzity jako oddelovac
 * 12.03.12 on; funkce csGetDate pro prevod datumu z YYYYMMDD na DD.MM.YYYY
 * 12.03.12 jk; i3.ictx, prvni pismenko se prevadi na velke
 * 20.02.12 on; metoda prefixLocate
 * 26.01.12 on; metoda csDeleteInterpunction
 * 19.10.11 on; setfield
 * 12.07.11 on; cloneObject
 * 08.07.11 on; funkce pro osetreni defaultniho formulare csFixDefaultForm
 * 07.06.11 on; rozsireno applyComp
 * 03.05.11 on; pridane anchorBase
 * 21.04.11 on; rozsireno applyComp
 * 15.04.11 on; pridana funkce getPasswordQuality
 * 13.04.11 on; pridana konstanta anchorPlusMinus
 * 12.04.11 on; rozsirena applyComp
 * 16.12.10 on; uprava fieldcount
 * 24.11.10 on; uprava v i3.assert
 * 01.04.10 on; urlDecode
 * 19.03.10 on; osetren bug
 * 11.03.10 on; zapojena funkce csSwapDefaultValues
 * 16.12.09 on; doplnena funkce dateIntShort, year
 * 16.12.09 on; upravena funkce date(), aby vracela datum v evropskem formatu
 * 16.12.09 on; rozsireni applyComp
 * 14.12.09 on; rozsireni applyComp
 * 25.11.09 rs; pridanie chybajuceho prebratia debug flagu z URL
 *              oprava niekolkych bodkociarok/premennych podla jslint testu (v applyComp)
 * 10.11.09 on; doplnena funkce i3.c.dateInt
 * 09.11.09 on; rozsirena funkcnost applyComp
 * 04.11.09 on; rozsireny applyComp
 * 29.10.09 on; rozsireny applyComp
 * 23.10.09 on; uprava nastaveni parametru Flexpopup v applyComp
 * 13.10.09 on; rozsirene applyComp
 * 05.10.09 rs; pridane abstract poistky na funkcie, kt. maju byt redefinovane
 * 05.10.09 rs; oprava definicie funkcie String.ls
 * 05.10.09 rs; formalne upravy pre dokumentaciu
 * 22.09.09 rs; pridanie applyComp
 * 16.09.09 rs; pridana funkcia i3.isInteger
 * 04.09.09 rs; pridanie get/setOption
 * 11.08.09 rs; pridanie isEmptyString
 * 23.07.09 rs; formalne drobnosti
 * 07.04.09 rs; formalna uprava podmienky kvoli jslint
 * 01.04.09 rs; formalne preformatovanie
 * 25.03.09 rs; uprava podmienky na Ext
 * 05.02.09 rs; i3.debug flag je mozne nastavit dopredu
 * 05.02.09 rs; zrusenie debugger v i3.assert
 * 03.02.09 rs; zapisat kopiu startup url params do i3.urlParams
 * 30.01.09 rs; rozne drobne upravy v suvislosti s SCD
 * 23.01.09 rs; pridany globalny debug flag
 * 20.01.09 rs; pevny default na jazyk aplikacie (na 1)
 * 15.01.09 rs; presunutie fillInParams z i3.
 * 15.01.09 rs; doplnenie String.ls()
 * 18.08.08 rs; prehodenie Marc triedy do samostatneho suboru
 * 24.07.08 rs; uprava className2LName
 * 12.06.08
 --
 */
// Ext pouzijeme, len ak je k dispozicii
/*jslint debug: true */
/*global i3,console,Ext,alert,document,window,navigator */
// 23.01.09 rs; pridany globalny debug flag
// 05.02.09 rs; debug flag je mozne nastavit este dopredu, takze i3 prepisujeme
//              len ak uz nie je predtym definovany
//if (typeof i3 ==='undefined') { i3={}; }
// 25.03.09 rs; verzia bez "window" hlasi vo FB chybu pri volbe "strict warnings: on"
if (window.i3 === undefined) {
    window.i3 = {};
}
if (i3.debug === undefined) {
    i3.debug = 0;
}
// temporary definicia kvoli nasledujucim IF-om; neskor sa prepise
i3.abort = function(msg) {
    alert(msg);
};
/**
 * @class String
 *
 * Dodatky k objektu String.
 */
if (String.prototype.escapeRegEx) {
    i3.abort('String.prototype.escapeRegEx defined twice');
}
if (String.prototype.singleQuote) {
    i3.abort('String.prototype.singleQuote defined twice');
}
if (String.prototype.strswap) {
    i3.abort('String.strswap defined twice');
}
if (String.prototype.find) {
    i3.abort('String.find defined twice');
}
if (String.prototype.piece) {
    i3.abort('String.prototype.piece defined twice');
}
if (String.prototype.fieldcount) {
    i3.abort('String.prototype.fieldcount defined twice');
}
if (String.prototype.ls) {
    i3.abort('String.prototype.ls defined twice');
}
// 19.10.11 on;
if (String.prototype.setfield) {
    i3.abort('String.prototype.setfield defined twice');
}
// 04.04.18 on;
if (String.prototype.reverse) {
    i3.abort('String.prototype.reverse defined twice');
}
//if ((typeof(Ext)!=='undefined') && Ext.escapeRe) { String.prototype.escapeRegEx=Ext.escapeRe; }
//else {
Ext.apply(String.prototype, {
    /**
     * Zaescapovanie specialnych znakov v retazci, ak sa tento neskor chce
     * pouzit ako literal v regex
     *
     * pozri tiez: http://simonwillison.net/2006/Jan/20/escape/
     */
    escapeRegEx: (function() {
        var re = /([.*+?\^=!:${}()|\[\]\/\\])/g;
        return function() {
            return this.replace(re, '\\$1');
        };
    }()),
    // ina moznost:
    //RegExp.escape = function(text) {
    //  if('string' !== typeof s) { return s; }
    //  if (!arguments.callee.sRE) {
    //    var specials = ['/', '.', '*', '+', '?', '|','(', ')', '[', ']', '{', '}', '\\'];
    //    arguments.callee.sRE = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
    //  }
    //  return text.replace(arguments.callee.sRE, '\\$1');
    //}
    /**
     * Uzavretie retazca do single quotes
     * pokial sa vyskytnu apostrofy vo vnutri retazca, budu oznacene spatnym lomitkom
     *
     * "aaaaa'bbb" => "'aaaaa\'bb'"
     */
    singleQuote: function() {
        return '\'' + this.strswap('\'', '\\\'') + '\'';
    },
    /** Nahradenie retazca s1 retazcom s2
     */
    strswap: function(s1, s2) {
        // $ ma specialny vyznam, je nutne ho zdvojit
        if (s2.indexOf('$') >= 0) {
            s2 = s2.replace(/\$/g, '$$$$');
        }
        return this.replace(new RegExp(s1.escapeRegEx(), 'g'), s2);
        // slucka s indexOf() a replace bez regex
        // je problematicka, ak sa 's1' nachadza v 's2'
    },
    /** Najdenie podretazca podla vzoru $f() z COS
     ak nenajde podretazec vracia 0
     ak najde vrati poziciu znaku ZA podretazcom

     Toto je len pomocka na priblizenie sa k Cache Object Scriptu, inak moc nema vyznam.

     // String.substring():
     // stringObjectToTakeAPartOf.substring(start_index,stop_index)
     //   start_index: (Required,numeric) - where to start the extraction (0 based)
     //   stop_index: (Optional,numeric)  - where to stop the extraction (0 based)
     //
     //   Character at position of stop_index will be not included in result
     //     'abcd'.substring(1,3)==='bc'

     */
    find: function(s) {
        if (s === '') {
            return 0;
        }
        var r = this.indexOf(s);
        return ((r < 0) ? 0 : (r + s.length + 1));
    },
    /**
     * Jednoducha implementacia funkcie $p() z COS
     * s:   string, z ktoreho chceme ziskat pole
     * del: oddelovac poli
     * n:   index (1=prve pole, atd.)
     *
     * s='aa*bb'; s.piece('*',2) => 'bb'
     *
     * Upozornenie: vzhladom k implementacii, je funkcia vhodna len na kratke
     * niekolko prvkove polia. V pripade, ze je potreba pouzit slucku cez kazdy prvok
     * je vyhodnejsie pouzit priavo split().
     *
     * Funkcia vzdy vrati datovy typ string (t.j. nikdy nie null alebo undefined).
     */
    piece: function(del, n) {
        //var delx=del.escapeRegEx(); // netreba, pretoze metode split posielame string a nie regex
        if (del === '') {
            i3.abort('piece: invalid delimiter');
        }
        if (this === '') {
            return this;
        }
        // 24.03.22 on; zruseno omezeni
        // 09.04.20 on; 100->200
        // 19.02.18 on; 60->110, 50->100
        /*var a = this.split(del, 210);
         if (a.length > 200) {
         i3.abort('String.prototype.piece: do not use this for long strings');
         }*/
        var a = this.split(del);
        a = a[n - 1];
        if (typeof a !== 'string') {
            return '';
        }
        return a;
    },
    /** Toto je implementacia $l(this,del)
     Pozor: pre prazdny string vracia 1 (zodpoveda chovaniu v COS)
     */
    fieldcount: function(del) {
        if (del === '') {
            i3.abort('fieldcount: invalid delimiter');
        }
        if (this === '') {
            return 1;
        } // !! zodpoveda chovaniu $l(string,del) v COS !
        // 16.12.10 on; zruseno omezeni
        /*var a = this.split(del.escapeRegEx(), 510);
        if (a.length > 500) {
        i3.abort('String.prototype.fieldcount: do not use this for long strings');
        }*/
        // 08.10.13 on; zrusene escapeRegEx - pro lname*001 nefungovalo dobre
        //var a = this.split(del.escapeRegEx());
        var a = this.split(del);
        return a.length;
    },
    /**
     * Language selection - Viz i3.languageSel
     */
    ls: function() {
        // abstract
    },
    /**
     * Jednoducha implementace funkce cmn_SetField z Delphi
     * del: oddelovac poli
     * n:   index (1=prve pole, atd.)
     * val: zapisovana hodnota
     *
     * Upozornenie: vzhladom k implementacii, je funkcia vhodna len na kratke
     * niekolko prvkove polia. V pripade, ze je potreba pouzit slucku cez kazdy prvok
     * je vyhodnejsie pouzit priavo split().
     *
     * Funkcia vzdy vrati datovy typ string (t.j. nikdy nie null alebo undefined).
     */
    setfield: function(del, n, val) {
        if (del === '') {
            i3.abort('setfield: invalid delimiter');
        }
        // 24.03.22 on; zruseno omezeni
        /*var a = this.split(del, 60);
         if (a.length > 50) {
         i3.abort('String.prototype.setfield: do not use this for long strings');
         }*/
        var a = this.split(del);
        a[n - 1] = val;
        var s = a.join(del);
        // vrati zpet do stringu
        return s;
    },
    /**
     * Jednoducha implementace funkce cmn_PrefixLocate z Delphi
     * del: oddelovac poli
     * fld: hledany prefix pole
     *
     * 20.02.12 on;
     */
    prefixLocate: function(del, fld) {
        if ((fld === '') || (this === '')) {
            return 0;
        }
        if (del === '') {
            i3.abort('prefixLocate: invalid delimiter');
        }
        // 24.03.22 on; zruseno omezeni
        /*var a = this.split(del, 60);
         if (a.length > 50) {
         i3.abort('String.prototype.prefixLocate: do not use this for long strings');
         }*/
        var a = this.split(del);
        var i;
        for (i = 0; i < a.length; i++) {
            if (fld === a[i].substring(0, fld.length)) {
                return i + 1;
            }
        }
        // nic nenajde
        return 0;
    },
    /**
     * Jednoducha implementace funkce cmn_FieldLocate z Delphi
     * del: oddelovac poli
     * fld: hledane pole
     *
     * 05.02.13 on;
     */
    fieldLocate: function(del, fld) {
        if ((fld === '') || (this === '')) {
            return 0;
        }
        if (del === '') {
            i3.abort('fieldLocate: invalid delimiter');
        }
        // 24.03.22 on; zruseno omezeni
        /*var a = this.split(del, 60);
         if (a.length > 50) {
         i3.abort('String.prototype.fieldLocate: do not use this for long strings');
         }*/
        var a = this.split(del);
        var i;
        for (i = 0; i < a.length; i++) {
            if (fld === a[i]) {
                return i + 1;
            }
        }
        // nic nenajde
        return 0;
    },
    /**
     * Jednoducha implementace funkce reversestring z Delphi
     *
     * 04.04.18 on;
     */
    reverse: function() {
        if (this === '') {
            return '';
        }
        return this.split('').reverse().join('');
    }
});
// tieto neprepisujeme, ak uz su definovane
//
Ext.applyIf(String.prototype, {
    /** Kopia trim() z Ext-u
     * NEMENIT obsah z dovodu, ze normalne bude pouziva verzia z Ext-u
     * tu je len z dovodu aby sa 'i3.base' dalo pouzit aj bez Ext-u
     *
     * Trims whitespace from either end of a string, leaving spaces within the string intact.  Example:
     * <pre><code>
     * var s = '  foo bar  ';
     * alert('-' + s + '-');         //alerts "- foo bar -"
     * alert('-' + s.trim() + '-');  //alerts "-foo bar-"
     * </code>
     * </pre>
     *
     * @return {String} The trimmed string
     */
    trim: (function() {
        var re = /^\s+|\s+$/g;
        return function() {
            return this.replace(re, '');
        };
    }()),
    /** Odrezanie medzier od konca retazca
     */
    trimb: (function() {
        var re = /\s+$/g;
        return function() {
            return this.replace(re, '');
        };
    }()),
    /** Odrezanie medzier od zaciatku retazca
     */
    trimf: (function() {
        var re = /^\s+/g;
        return function() {
            return this.replace(re, '');
        };
    }()),
    /**
     * Odstrani interpunkci na konci retezce.
     *
     * 26.01.12 on;
     */
    csDeleteInterpunction: (function() {
        //var cInter = ':.,;/=';
        var punctuation = /[:.,;/=]/g;;
        return function() {
            var s;
            // 14.10.21 on; pridene + ''  - prevod na string (z pole)
            s = this + '';
            // 15.04.24 on; predelane 
            /*if (s !== '') {
             if (cInter.find(s.substring(s.length - 1)) > 0) {
             s = s.substring(0, s.length - 1);
             s = s.trimb();
             }
             }
             return s;*/
            if (s !== '') {
                s = s.replace(punctuation, "");
            }
            return s;
        };
    }())
});
/**
 * @class i3
 * Zakladna kniznica funkcii - nezavisla na Ext.
 * Hlavne rozne stringove operacie - vyhodou je, ze sa da ladit nezavisle na Ext
 * Moze sa pouzit nezavisle na Ext (co sice nie je iste, ci budeme niekedy potrebovat,
 * ale eventualne sa to moze hodit a aspon to nebude az tak moc prepletene).
 * Pri pouziti s Ext, ale doporucujem nacitat subor az PO Ext-e, z dovodu definicii
 * niekolkych rozsireni String atd. - kontroluju sa eventualne redefinicie,
 * aby v dalsich verziach Extu neprislo ku konfliktu.
 */
if ((Ext !== undefined) && Ext.apply) {
    i3.apply = Ext.apply;
    // just take the Ext version
} else {
    /**
     * Kopia Ext.apply() - v podstate len z dovodu, aby sme tento JS subor mohli
     * pouzit bez include Ext-u.<br><br>
     *
     * 13.06.08 rs; pridane "(c.hasOwnProperty(p))" podla jslint   <br>
     * Copies all the properties of config to obj.<br>
     *
     *  @param {Object} obj The receiver of the properties
     *  @param {Object} config The source of the properties
     *  @param {Object} defaults A different object that will also be applied for default values
     *  @return {Object} returns obj
     */
    i3.apply = function(o, c, defaults) {
        if (defaults) {
            // no "this" reference for friendly out of scope calls
            i3.apply(o, defaults);
        }
        if (o && c && typeof c === 'object') {
            var p;
            for (p in c) {
                if (c.hasOwnProperty(p)) {
                    o[p] = c[p];
                }
            }
        }
        return o;
    };
}
/** inicializacia niektorych globalnych options z URL
 * zatial prva skusobna varianta
 * property "dummy" asi nie je potreba ale nevedel som ako vyvolat funkciu
 * bez priradenia vysledku
 * 15.01.09 rs
 *
 * @private
 */
i3.dummy = (function() {
    // 25.03.09 rs; uprava podmienky na Ext
    if (Ext !== undefined) {
        // separating the GET parameters from the current URL
        var getParams = document.URL.split("?");
        // transforming the GET parameters into a dictionnary
        // 19.03.10 on; osetren bug
        //var urlParams = Ext.urlDecode(getParams[1]);
        var urlParams = {};
        if (getParams.length > 1) {
            urlParams = Ext.urlDecode(getParams[1]);
        }
        if (urlParams.language) {
            if (urlParams.language.piece) {
                urlParams.language = urlParams.language.piece('#', 1);
                // 06.06.19 on; pripadna kotva
            }
            i3.language = urlParams.language;
        }
        if (urlParams.ictx) {
            // 13.03.12 jk; i3.ictx, prvni pismenko se prevadi na velke
            var ictx = urlParams.ictx;
            if (ictx.piece) {
                ictx = ictx.piece('#', 1);
                // 06.06.19 on; pripadna kotva
            }
            i3.ictx = ictx.charAt(0).toUpperCase() + ictx.slice(1);
        }
        // 25.11.09 rs; pridanie chybajuceho prebratia debug flagu z URL
        //              (mam za to, ze predtym to tu bolo ?? neviem ako/preco to vypadlo)
        if (urlParams.debug) {
            // ak by sme nedali prevod na int, zostalo by ako string a potom podmienka if ("0") by bola
            // vyhovela
            if (urlParams.debug.piece) {
                urlParams.debug = urlParams.debug.piece('#', 1);
                // 06.06.19 on; pripadna kotva
            }
            i3.debug = parseInt(urlParams.debug, 10);
        }
        // 03.02.09 rs; zapisat kopiu startup params
        i3.urlParams = {};
        i3.apply(i3.urlParams, urlParams);
    }
    // default (ak jazyk nebol urceny cez URL, urcime napevno)
    // 20.01.09 rs;
    if (!i3.language) {
        i3.language = 1;
    }
    return undefined;
}());
/**
 * Simple assertion macro with firebug stack trace (if available)
 *
 * @param {Boolean} cond: podmienka, ktorej platnost testujeme
 *   ak nie je splnena znamena to fatalnu chybu (taku, pri ktorej
 * nema vyznam pokracovat a treba program ukoncit)
 * pokial je nejakym sposobom mozne chybu osetrit, treba pouzit nieco ine
 * ako assert()
 *
 * @param {String| msg  nepovinny parameter, popisujuci chybu
 */
i3.assert = function(cond, msg) {
    if (!cond) {
        // set message or add prefix
        if (msg === undefined) {
            msg = 'assertion failed';
        } else {
            msg = 'assertion failed: ' + msg;
        }
        // 24.11.10 on; zmena
        //if (console) {
        if (console !== undefined) {
            // do we have firebug?
            console.error(msg);
            // trasovanie mi z nejakeho dovodu nefungovalo
            // 'debugger' by malo zastavit v debuggeri a mala by byt moznost zobrazit call stack
            //console.assert(cond,msg);
            //console.trace();
            // pri ladeni je mozne povolit, nemalo by zostat v runtime kode
            // 05.03.08
            //debugger;
        }
        // 24.11.10 on; zrusene else - alert se zobrazi i ve FF
        //else {
        alert(msg);
        //}
        throw msg;
    }
};
/**
 * abort - will be called on fatal (inrecoverable) error
 * @param {String} msg
 */
i3.abort = function(msg) {
    this.assert(0, msg);
};
i3.apply(i3, {
    /**
     * Vyber jazykoveho prekladu
     *
     * @param {String} pStr       string, kt. chceme prelozit
     * @param {Integer} pLanguage  jazyk (1=slo,2=cze,3=eng,4-ger,..) - ak sa parameter neuvedie
     *   pouzije sa globalny jazykovy kontext (i3.language)
     * @param {String} pDelim     delimiter - default: '#'
     * @param {String} bDefLang   pokud neni pozadovany jazyk, pouzije se prvni v poradi, default je true
     *
     * 13.06.13 jk; doplnen parametr bDefLang
     * 06.06.12 jk; doplneni moznosti zaescapovani znaku, ktery je pouzity jako oddelovac
     */
    languageSel: function(pStr, pLanguage, pDelim, bDefLang) {
        var num, sCommonLang;
        if (pLanguage === undefined) {
            pLanguage = i3.language;
        } // defaultny globalny kontext
        if (pDelim === undefined) {
            pDelim = '#';
        } // defaultny globalny oddelovac
        // escapovane oddelovace
        var chr = String.fromCharCode(1);
        // tento znak by se nemel v textech objevit
        pStr = pStr.replace(new RegExp('\\\\' + pDelim, 'g'), chr);
        // nahradime jim zaescapovane oddelovace
        var a = pStr.split(pDelim, 10);
        // rozdelit na delimiteri; max.10 ks (realne podmienka je asi zbytocna)
        var ret = a[pLanguage - 1];
        // vybrat retazec v danom jazyku
        // Ak nie je poouzije sa prvy jazyk v poradi
        // Normalne by to bola slovencina, ale ak je napr. cely ciselnik len v cestine, kludne
        // sa texty mozu pisat bez oddelovacov
        // 'undefined' riesi situacu, ak by stringov bolo menej, ako je ocakavany jazyk (v tom pripade
        // totiz podmienka ==='' nebude platna)
        if ((ret === undefined) || (ret === '')) {
            // 13.06.13 jk; doplnen parametr bDefLang
            if (bDefLang === false) {
                ret = '';
            } else {
                // 20.05.14 on; osetreno volani jeste pred nactenim i3.WS
                // 30.04.14 on; zkusi nacist defautlni jazyk (jde o konfiguraci ipacu) (COMMON zaznam musi byt nacten uz driv)
                sCommonLang = '';
                if (i3.WS) {
                    var oCommon = i3.WS.sTablesdCacheGet('COMMON');
                    if (oCommon) {
                        sCommonLang = oCommon.getTag('200a');
                    }
                }
                // 04.09.14 on; moznost nastavit v *.csp souboru defaultni jazyk
                if (i3.isEmptyString(sCommonLang)) {
                    sCommonLang = i3.defaultLanguage;
                }
                if (!i3.isEmptyString(sCommonLang)) {
                    num = parseInt(sCommonLang, 10);
                    if (isNaN(num)) {
                        num = 0;
                    } else {
                        num -= 1;
                    }
                    ret = a[num];
                    // pokud jazykova mutace neexistuje, dotahne aspon neco
                    if (i3.isEmptyString(ret)) {
                        ret = a[0];
                    }
                } else {
                    ret = a[0];
                }
            }
        }
        if (ret === undefined) {
            ret = '';
        } // toto by nemalo nastat
        ret = ret.replace(new RegExp(chr, 'g'), pDelim);
        // zpet puvodni oddelovac uz bez backslash
        return ret;
    },
    /** Prevod class name na lname.
     * Kedze nemame k dispozicii info vetu, zatial defacto robime len prevod
     * clasname na table name.
     * Neuvazujeme nieco ako "l_xxx" => "yyy_xxx" - neskor by sa dalo dorobit.
     *
     * 24.07.08 rs; zatial dorobena moznost: v pripade ak vstup uz je lname - ignorujeme chybne
     * zadanie a na vysledok posleme 1:1 vstup
     *
     * @param {String} pClassN  Trieda
     */
    className2LName: function(pClassN) {
        var c, c2, res = '',
            nUCase = 0;
        // poradove cislo U-case znaku, kt. aktualne spracovavame
        // pokial zadana hodnota uz je lname, nekonvertovat
        // toto nie je uplne korektne, pretoze vlastne prisiel neplatny paramater
        // 24.07.08 rs
        if (pClassN.indexOf('_') >= 0) {
            return pClassN;
        }
        // zacneme validaciou (aspon minimalistickou)
        if (pClassN === '') {
            return '';
        } // chybny format
        c = pClassN.substring(0, 1);
        c2 = c.toLowerCase();
        if (c === c2) {
            return '';
        } // chybny format - u classname prve pismeno musi byt velke!
        var i;
        for (i = 0; i < pClassN.length; i++) {
            c = pClassN.substring(i, i + 1);
            c2 = c.toLowerCase();
            if (c !== c2) {
                // je ucase
                nUCase++;
                // ak to nie je prvy ucase znak, pridame potrzitko
                if (nUCase > 1) {
                    res += '_';
                }
            }
            res += c2;
        }
        return res;
    },
    /** Prevod lname na class name
     * viz. poznamka u className2LName - jedna sa o zjednodusenu verziu nakolko nepouzivame
     * info vety - neskor by sa dalo dorobit, ak by bolo treba
     *
     * @param {String} pLName lname
     */
    lName2className: function(pLName) {
        var c, bUCaseNext = true,
            res = '';
        // lname by mohlo prist aj uppercased
        pLName = pLName.toLowerCase();
        // ak neobsahuje potrzitko vratime 1:1
        if (pLName.indexOf('_') === -1) {
            return pLName;
        }
        var i;
        for (i = 0; i < pLName.length; i++) {
            c = pLName.substring(i, i + 1);
            // podtrzitko znamena, preved nasledujuce pismeno na velke
            if (c === '_') {
                bUCaseNext = true;
                continue;
            }
            if (bUCaseNext) {
                c = c.toUpperCase();
                bUCaseNext = false;
            }
            res += c;
        }
        return res;
    },
    /**
     * Osetri lname napr. l_un_cat nahradi ictx_un_cat
     *
     * @param {String} psLName lname
     */
    csFixLname: function(psLName) {
        // lname by mohlo prist aj uppercased
        var sLName = psLName.toLowerCase();
        // ak neobsahuje potrzitko vratime 1:1
        if (sLName.indexOf('_') === -1) {
            return psLName;
        }
        // pokud neni na zacatku "l", nemusim nic menit
        if (sLName.piece('_', 1) !== 'l') {
            return psLName;
        }
        sLName = i3.ictx.toLowerCase() + sLName.substring(sLName.indexOf('_'));
        return sLName;
    },
    /**
     * z navnu db zjisti, zda jde o autoritni db (A), katalog (B), holdingu (H), ctenare (U)
     *
     * @param {String} psLName lname
     */
    csGetDbFormat: function(psLName) {
        var sLName = psLName;
        // ak neobsahuje potrzitko
        if (sLName.indexOf('_') === -1) {
            sLName = i3.className2LName(sLName);
        }
        // lname by mohlo prist aj uppercased
        sLName = sLName.toLowerCase();
        // pokud obsahuje "_auth", jde o autority
        if (sLName.indexOf('_auth') > 0) {
            return 'A';
        }
        // pokud obsahuje "_user", jde o ctenare
        if (sLName.indexOf('_user') > 0) {
            return 'U';
        }
        // pokud obsahuje "_h", jde o holdingy
        if (sLName.indexOf('_h') > 0) {
            return 'H';
        }
        // pokud obsahuje "_cat", jde o katalog (musi byt az za holdingama)
        if (sLName.indexOf('_cat') > 0) {
            return 'B';
        }
        // pokud obsahuje "_order", jde o objednavky
        if (sLName.indexOf('_order') > 0) {
            return 'O';
        }
        // pokud obsahuje "_invoice", jde o faktury
        if (sLName.indexOf('_invoice') > 0) {
            return 'I';
        }
        return undefined;
    },
    /** Vyplnenie parametrov do stringu vo formate pouzivanom v IS_RETURN_CODE
     kedze tento system mame interne zauzivany, pouzijeme aj pre texty
     aplikacii.

     10.07.09 on; predelane
     15.01.09 rs; presunutie fillInParams z i3.WS

     @param {String} pMsg      Text spravy s placeholdermi pre parametre
     @param {Array} paParams  Pole s parametrami ([0] - prvy parameter atd.)

     @return {String} text s doplnenymi parametrami podla algoritmu IS_RETURN_CODE

     */
    fillInParams: function(pMsg, paParams) {
        var sRet = '',
            nQ, sPercCode, nParamNo = -1;
        // 10.07.19 on; komplet predelane, minifikace kodu nefungovala spravne
        nQ = pMsg.indexOf('%');
        while (nQ >= 0) {
            sRet = sRet + pMsg.substring(0, nQ);
            // text po placeholder
            sPercCode = pMsg.substring(nQ + 1, nQ + 2);
            // v pMsg (vzdy) ponechame az text za "%nieco"
            pMsg = pMsg.substring(nQ + 2);
            if ((sPercCode !== 's') && (sPercCode !== 'p') && (sPercCode !== '-')) {
                // neznamy kod: do sRet preberieme este znak percenta a nasledujuci znak
                sRet = sRet + '%' + sPercCode;
            } else {
                nParamNo++;
                // preskocenie parametra
                if (sPercCode !== '-') {
                    // teraz je %s a %p - zatial implementujeme totozne
                    if (paParams[nParamNo]) {
                        sRet = sRet + paParams[nParamNo];
                    }
                }
            }
            nQ = pMsg.indexOf('%');
        }
        return sRet + pMsg;
    },
    /**
     * Zamena CR,LF,TAB v stringu za medzery, string za co sa maju LF zamenit, sa da eventualne manualne urcit
     * 24.01.09 rs
     *
     * @param {Object} s V com nahradit.
     * @param {Object} sReplWith Nahradit cim. Default - medzera.
     */
    fixLF: function(s, sReplWith) {
        if (!sReplWith) {
            sReplWith = ' ';
        }
        return s.strswap('\n', sReplWith).strswap('\t', sReplWith).strswap('\r', sReplWith);
    },
    /**
     * Upravena verzia Ext.each, ktora funguje aj na objekty, nielen na ciste polia.
     *
     *
     * Original description:
     * Iterates an array calling the passed function with each item, stopping if your function returns false. If the
     * passed array is not really an array, your function is called once with it.
     * The supplied function is called with (Object item, Number index, Array allItems).
     *
     * @param {Array/NodeList/Mixed} array
     * @param {Function} fn
     * @param {Object} scope
     */
    eachProp: function(array, fn, scope) {
        if (typeof array !== "object") { // ak je to objekt, nemenime - k. objektu mozeme pristupovat ako k polu
            array = [array];
        }
        var i;
        for (i in array) {
            if (array.hasOwnProperty(i)) { // for jslint
                if (fn.call(scope || array[i], array[i], i, array) === false) {
                    return i;
                }
            }
        }
    },
    /**
     * Zarovnant nulami spredu na zadany pocet miest
     * @param {String} s    - string, kt. chceme zarovnat
     * @param {Integer} n   - pocet miest
     */
    leadingZero: function(s, n) {
        // konverzia na string
        s = s + '';
        while (s.length < n) {
            s = '0' + s;
        }
        return s;
    },
    /**
     * Vratit true ak parametrom je undefined/null alebo prazdny objekt (t.j. {} - objekt bez properties)
     *
     * @param {Object} o
     */
    isEmptyObj: function(o) {
        if ((o === undefined) || (o === null)) { // null a undefined berieme ako prazdne (nemalo by nastat)
            return true;
        }
        if (typeof o !== 'object') { // ak to neni objekt, vratime false (neprazdne; nemalo by nastat)
            return false;
        }
        var i;
        for (i in o) {
            if (o.hasOwnProperty(i)) {
                return false;
                // nasli sme nejaku property - sme neprazdny
            }
        }
        return true;
        // prazdny
    },
    /**
     * Vratit true ak parametrom je undefined/null alebo prazdne pole nebo pole pradnyma objektama (s prazdnyma properties)
     *
     * @param {Array} arr
     */
    csIsEmptyArrayOfObj: function(arr) {
        if ((arr === undefined) || (arr === null)) { // null a undefined berieme ako prazdne (nemalo by nastat)
            return true;
        }
        if (typeof arr === 'string') {
            return arr === '';
        }
        var i, o, prop, v;
        for (i = 0; i < arr.length; i++) {
            o = arr[i];
            for (prop in o) {
                if (o.hasOwnProperty(prop)) {
                    v = o[prop];
                    // 29.11.19 on; prefix subtagu
                    // prazdne stringy a indikatory ignorujeme
                    if ((v === '') || (prop.substring(prop.length - 2, prop.length) === 'i1') || (prop.substring(prop.length - 2, prop.length) === 'i2') || (prop === 'sti1') || (prop === 'sti2')) {
                        continue;
                    }
                    // nasli sme nejaku property - sme neprazdny
                    return false;
                }
            }
        }
        return true;
    },
    /**
     * Vrati true, ak zadany object neobsahuje ziadne pouzitelne hodnoty.
     * V podstate ide o to, eliminovat prvky, ktore su sice not-null ale obsahuju napr. len
     * prazdne stringy, alebo prazdne polia atd.
     *
     * @param {Object} o
     */
    isEmptyTagSet: function(o) {
        if ((o === undefined) || (o === null)) { // null a undefined berieme ako prazdne (nemalo by nastat)
            return true;
        }
        if (typeof o !== 'object') { // ak to neni objekt, vratime false (neprazdne; nemalo by nastat)
            return false;
        }
        var i, v;
        for (i in o) {
            if (o.hasOwnProperty(i)) {
                v = o[i];
                // prazdne stringy ignorujeme
                if (v === '') {
                    continue;
                }
                // 05.11.12 on; kontrola vnorenych objektu
                if (typeof v === 'object') {
                    if (i3.isEmptyTagSet(v)) {
                        continue;
                    }
                }
                // nasli sme nejaku property - sme neprazdny
                return false;
            }
        }
        return true;
        // prazdny
    },
    /**
     * Vratit true ak parametrom je neprazdny string
     * Blank string test
     *
     * @param {Object} s
     */
    isUnEmptyString: function(s) {
        return ((typeof s === 'string') && (s !== ''));
    },
    /**
     * Vratit true ak parametrom je prazdny string alebo undefined/null atd.
     * Blank string test
     * @param {Object} s
     */
    isEmptyString: function(s) {
        return ((!s) || (s === ''));
    },
    /**
     * Test na integer
     * @param {Object} s
     */
    isInteger: function(s) {
        return (s.toString().search(/^-?[0-9]+$/) === 0);
    },
    /**
     * Podobne makro ako setDisabled - v podstate len zabaluje show/hide metody
     *
     * @param {Object} o
     * @param {Object} bShow
     */
    setVisibility: function(o, bShow) {
        if (bShow) {
            o.show();
        } else {
            o.hide();
        }
    },
    /**
     * Nastavenie zadanej option, da sa pouzit na lubovolne globalne parametre
     * @param {Object} psName
     * @param {Object} psValue
     */
    setOption: function(psName, psValue) {
        if (!i3.options) {
            i3.options = {};
        }
        i3.options[psName] = psValue;
    },
    /**
     * Precitanie option k setOption
     * Pre nedefinovanu option vracia undefined.
     *
     * @param {Object} psName
     */
    getOption: function(psName) {
        if (!i3.options) {
            return undefined;
        }
        return i3.options[psName];
    },
    /**
     * Jednoduche makro na upravu property items - pre jednoduchu upravu komponent s polozkou items
     *
     * 23.10.09 on; upravene nastaveni parametru Flexpopup
     * 13.10.09 on; doplnene nastaveni FlexPopupu
     *
     * @param {Object} o
     * @param {Object} data
     */
    applyComp: function(o, data) {
        // 23.10.09 on; musi byt pred o.items[0] = Ext.apply(o.items[0], data),
        //              aby neprepsal parametry csFlexPopParams
        // 13.10.09 on; nastavi parametry flexpopup
        if ((data.csFlexPopParams) && (o.items[0].csFlexPopParams)) {
            // zapise do "data", v dalsim kroku se prenese do o.items[0]
            //o.items[0].csFlexPopParams = Ext.applyIf(o.items[0].csFlexPopParams, data.csFlexPopParams);
            data.csFlexPopParams = Ext.applyIf(data.csFlexPopParams, o.items[0].csFlexPopParams);
        }
        if (o.items) {
            // pokud je prvek zabaleny v panelu a chceme zmenit jeho velikost
            if (data.csPanelWidth) {
                o.width = data.csPanelWidth;
                data.csPanelWidth = undefined;
            }
            o.items[0] = Ext.apply(o.items[0], data);
        } else {
            // 16.12.09 on; doplnene nastaveni parametru i pokud neni prvek zabaleny v panelu
            o = Ext.apply(o, data);
        }
        // 14.12.09 on; doplni prefix id
        if ((o.id) && (this.idpref)) {
            o.id = this.getIdPref(o.id);
            // 25.11.09 rs; pridanie ';'
        }
        // doplni prefix id
        if ((o.items) && (o.items[0].id) && (this.idpref)) {
            o.items[0].id = this.getIdPref(o.items[0].id);
            // 25.11.09 rs; pridanie ';'
        }
        // 13.10.09 on; nastavi scope udalosti listeners.click, pokud je nadefinovana
        if ((o.items) && (o.items[0]) && (o.items[0].listeners)) {
            if (o.items[0].listeners.click) {
                o.items[0].listeners.click = Ext.apply(o.items[0].listeners.click, {
                    scope: this
                });
            }
            // 16.12.21 on; nastavi scope udalosti listeners.change, pokud je nadefinovana
            if (o.items[0].listeners.change) {
                o.items[0].listeners.change = Ext.apply(o.items[0].listeners.change, {
                    scope: this
                });
            }
            // 16.12.21 on; nastavi scope udalosti listeners.select, pokud je nadefinovana
            if (o.items[0].listeners.select) {
                o.items[0].listeners.select = Ext.apply(o.items[0].listeners.select, {
                    scope: this
                });
            }
        }
        // 04.11.09 on; nastavi scope udalosti listeners.activate, pokud je nadefinovana
        if (o && o.listeners && o.listeners.activate) {
            o.listeners.activate = Ext.apply(o.listeners.activate, {
                scope: this
            });
        }
        var that = this;
        // 25.11.09 rs; povodne dvojita definicia (presun na ine miesto)
        // 04.11.09 on; nastavi scope vsech udalosti tbar.listeners.*, pokud jsou nadefinovane
        if (o && o.tbar) {
            // musim si zapamatovat this, protoze v cyklu Ext.each se jeho hodnota zmeni
            Ext.each(o.tbar, function(pItem) {
                // doplni prefix id
                if ((pItem.id) && (that.idpref)) {
                    pItem.id = that.getIdPref(pItem.id);
                    // 25.11.09 rs; pridanie bodkociarky
                }
                if (pItem.listeners.click) {
                    pItem.listeners.click = Ext.apply(pItem.listeners.click, {
                        scope: that
                    });
                }
                if (pItem.listeners.change) {
                    pItem.listeners.change = Ext.apply(pItem.listeners.change, {
                        scope: that
                    });
                }
                // 12.04.11 on; udalost select
                if (pItem.listeners.select) {
                    pItem.listeners.select = Ext.apply(pItem.listeners.select, {
                        scope: that
                    });
                }
            });
        }
        // 09.11.09 on; nastaveni parametru pro cs_auth_select_fs ve fieldsetu
        if ((o.items) && (o.items[0].xtype === 'fieldset')) {
            //var that = data; // 25.11.09 rs; povodne dvojita definicia
            Ext.each(o.items[0].items, function(pItem) {
                // 13.10.21 on; cs_search_combobox_fs
                // 15.01.13 on; potrebuju to i v interpi komponente
                //if ((pItem) && (pItem.items) && (pItem.items[0]) && (pItem.items[0].xtype === 'cs_auth_select_fs')) {
                if (pItem && pItem.items && pItem.items[0] && ((pItem.items[0].xtype.substring(0, 17) === 'cs_auth_select_fs') || (pItem.items[0].xtype === 'cs_search_combobox_fs'))) {
                    if (data.csMarcConvDefFs) {
                        pItem.items[0].csMarcConvDef = pItem.items[0].csMarcConvDef || {};
                        // init
                        pItem.items[0].csMarcConvDef = Ext.apply(pItem.items[0].csMarcConvDef, data.csMarcConvDefFs);
                    }
                    if (data.csFlexPopParamsFs) {
                        pItem.items[0].csFlexPopParams = pItem.items[0].csFlexPopParams || {};
                        // init
                        pItem.items[0].csFlexPopParams = Ext.apply(pItem.items[0].csFlexPopParams, data.csFlexPopParamsFs);
                    }
                }
            });
        }
        // 07.06.11 on; nastavi udalost listeners.change o uroven niz u vsech prvku
        if ((o.items) && (o.items[0].items)) {
            Ext.each(o.items[0].items, function(pItem) {
                if ((pItem.items) && (pItem.items[0]) && (pItem.items[0].listeners) && (pItem.items[0].listeners.change)) {
                    pItem.items[0].listeners.change = Ext.apply(pItem.items[0].listeners.change, {
                        scope: that
                    });
                }
            });
        }
        // 16.01.11 on; nastavi listeners.scope o uroven niz u vsech prvku
        if ((o.items) && (o.items[0].items)) {
            Ext.each(o.items[0].items, function(pItem) {
                if (pItem.listeners) {
                    pItem.listeners.scope = that;
                }
            });
        }
        return o;
    },
    // nasleduje par funkcii definovanych v i3.ui.base
    // musia byt ale uvedene ako fwd aj tu, kvoli dokumentacii
    // toto je nutne kvoli generatoru dokumentacie
    /** See i3.ui.getIdPrefFn
     */
    getIdPrefFn: function() {
        alert('i3.getIdPrefFn abstract definition');
        // funkcia by neskor mala byt redefinovana
    },
    /** See i3.ui.getCmpFn
     */
    getCmpFn: function() {
        alert('i3.getCmpFn abstract definition');
        // funkcia by neskor mala byt redefinovana
    },
    /** See i3.ui.msg
     */
    msg: function() {
        alert('i3.msg abstract definition');
        // funkcia by neskor mala byt redefinovana
    },
    /** See i3.ui.alert
     */
    alert: function() {
        alert('i3.alert abstract definition');
        // funkcia by neskor mala byt redefinovana
    },
    /**i3.ui.intError
     *
     */
    intError: function() {
        alert('i3.intError abstract definition');
        // funkcia by neskor mala byt redefinovana
    },
    /**i3.ui.displayHelp
     *
     */
    displayHelp: function() {
        alert('i3.displayHelp abstract definition');
        // funkcia by neskor mala byt redefinovana
    },
    /**
     * Vyswapuje definovane retezce za aktualni hodnoty
     *
     * @param {String} sData
     *
     * 19.11.21 on; pobocka
     *
     */
    csSwapDefaultValues: function(sData, sBranch) {
        // 23.04.13 on; podminka
        if (sData.strswap) {
            sData = sData.strswap('%DATEYYYYMMDD%', i3.c.dateInt());
            sData = sData.strswap('%DATEYYMMDD%', i3.c.dateIntShort());
            sData = sData.strswap('%DATEYYYY%', i3.c.year());
            if (i3.Login && i3.Login.ctx && !i3.isEmptyString(i3.Login.ctx.isUserClass)) {
                sData = sData.strswap('%ISUSERIDX%', i3.className2LName(i3.Login.ctx.isUserClass) + '*' + i3.Login.ctx.isUserT001);
            }
            // 19.11.21 on; pobocka prihlaseneho uzivatele
            if (sBranch) {
                sData = sData.strswap('%BRANCH%', sBranch);
            }
        }
        return sData;
    },
    /** Dekoduje URL
     * @param {String} sURL
     */
    urlDecode: function(sURL) {
        return decodeURIComponent(sURL.replace(/\+/g, '%20'));
    },
    /**
     * Vrati kvalitu hesla.
     * 5 pismen    = 1 bod
     * jedno cislo = 1 bod
     * spec. znak  = 1 bod
     * male a velke pismeno = 1 bod
     *
     * @param {String} sHeslo
     *
     * 15.04.11 on;
     */
    getPasswordQuality: function(sPassword) {
        var nResult = 0;
        var hasNumber = false;
        var hasSpec = false;
        var hasLower = false;
        var hasUpper = false;
        sPassword = sPassword.trim();
        // otestuj delku - min 6 znaku
        if (sPassword.length < 6) {
            return nResult;
        }
        nResult++;
        var validChars = '0123456789';
        var thisChar;
        var i;
        // vyskyt cislice
        for (i = 0; i < sPassword.length && hasNumber === false; i++) {
            thisChar = sPassword.charAt(i);
            if (validChars.indexOf(thisChar) > -1) {
                hasNumber = true;
            }
        }
        // vyskyt specialniho znaku
        validChars = '+-*/!~`@#$%^&*()_-=|\\{}[]:;"\'?.,><';
        for (i = 0; i < sPassword.length && hasSpec === false; i++) {
            thisChar = sPassword.charAt(i);
            if (validChars.indexOf(thisChar) > -1) {
                hasSpec = true;
            }
        }
        var lowChars = 'abcdefghijklmnopqrstuvwxyz';
        var highChars = lowChars.toUpperCase();
        for (i = 0; i < sPassword.length; i++) {
            thisChar = sPassword.charAt(i);
            if (lowChars.indexOf(thisChar) > -1) {
                hasLower = true;
            }
            if (highChars.indexOf(thisChar) > -1) {
                hasUpper = true;
            }
        }
        // obsahuje cislo a pismeno (male nebo velke)
        if (hasNumber && (hasLower || hasUpper)) {
            nResult++;
        }
        // obsahuje spec. znak a pismeno (male nebo velke)
        if (hasSpec && (hasLower || hasUpper)) {
            nResult++;
        }
        // obsahuje male a velke pismeno
        if (hasLower && hasUpper) {
            nResult++;
        }
        return nResult;
    },
    /**
     * Osetri defaultni formular - odstrani pole 005 a 999, doplnit C99d atd.
     *
     * @param {i3.Marc} poFormRec
     *
     */
    csFixDefaultForm: function(poFormRec) {
        // pole 001 nastavi podle obsahu C99f
        var tC99 = poFormRec.getTag('C99'),
            tC99f = poFormRec.getSubTagStr(tC99, 'f'),
            tC99d, sData, sFormName;
        // odfiltruje CMCONFIG z nazvu formulare
        sFormName = poFormRec.t001;
        if (sFormName.substring(0, 9) === 'CMCONFIG_') {
            sFormName = sFormName.substring(9);
        }
        if (tC99f !== '') {
            // pokud je nastaveno C99f nastavi pole t001
            poFormRec.t001 = tC99f;
        } else {
            poFormRec.t001 = 'new';
        }
        // automaticke doplneni C99$d na zaklade nazvu def. formulare
        tC99d = poFormRec.getSubTagStr(tC99, 'd');
        if (tC99d === '') {
            if (tC99 === '') {
                tC99 = 'C99    ';
            }
            tC99 = poFormRec.setSubTagStr(tC99, 'd', sFormName);
            poFormRec.setTag(tC99);
        }
        // smaze tagy 001, 002, 005 a 999
        poFormRec.delTag('001');
        poFormRec.delTag('002');
        poFormRec.delTag('005');
        poFormRec.delTag('999');
        // vyswapuje definovane retezce za aktualni hodnoty
        sData = poFormRec.dataToStr();
        sData = i3.csSwapDefaultValues(sData);
        poFormRec.data = sData.split('\n');
        return poFormRec;
    },
    /**
     * Prevede datum z formatu YYYYMMDD -> DD.MM.YYYY
     *
     * @param {string} psDate
     */
    csGetDate: function(psDate) {
        var s = '';
        if ((psDate.substring(0, 1) === '*') || (psDate.substring(0, 1) === '!')) {
            s = psDate.substring(0, 1);
            psDate = psDate.substring(1);
        }
        var dt = Date.parseDate(psDate, 'Ymd');
        // prevod se nemusi podarit - kvuli chybnemu datumu
        if (dt) {
            return s + dt.format('d.m.Y');
        }
        // vrati puvodni hodnotu
        return s + psDate;
    },
    /**
     * Prevede datum z formatu YYYYMMDD -> D.M.YYYY
     *
     * @param {string} psDate
     *
     * 03.11.14 on; kratky datum
     */
    csGetShortDate: function(psDate) {
        var s = '';
        if ((psDate.substring(0, 1) === '*') || (psDate.substring(0, 1) === '!')) {
            s = psDate.substring(0, 1);
            psDate = psDate.substring(1);
        }
        var dt = Date.parseDate(psDate, 'Ymd');
        // prevod se nemusi podarit - kvuli chybnemu datumu
        if (dt) {
            // 03.11.14 on; regularni vyraz odstrani 0 v datumu a mesici
            return s + dt.format('d.m.Y').replace(/\b0(?=\d)/g, '');
        }
        // vrati puvodni hodnotu
        return s + psDate;
    },
    /**
     * Obalka funkce Ext.util.JSON.decode, ktera pri volani s neplatnych JSONem pada.
     *
     * @param {string} psText
     */
    csJsonDecode: function(psText) {
        var o;
        try {
            // 25.06.14 on; osetreno na serveru
            // 25.06.14 on; odfiltruje znaky, se kterymi si neporadi metoda Ext.util.JSON.decode
            //psText = this.csFilterUnsupChars(psText);
            o = Ext.util.JSON.decode(psText);
        } catch (e) {
            //Ext.Msg.alert('Login', 'error parsing JSON data: ' + e.message + '<br>response: <br>' + response.responseText);
            i3.displayError('error parsing JSON data (' + e.message + ')<br>response: <br>' + psText);
            return undefined;
        }
        return o;
    },
    /**
     * Odfiltruje znaky, se kterymi si neporadi metoda Ext.util.JSON.decode
     *
     * @param {string} psText
     *
     * 25.06.14 on; osetreno na serveru
     */
    /*csFilterUnsupChars : function(psText) {
    psText = psText.strswap('\u2028', '');
    return psText;
    },*/
    /**
     * Vrati true, pokud jde o right-to-left
     *
     * 15.04.14 on;
     */
    isRTL: function() {
        return (document.body.dir === 'rtl');
    }
});
i3.apply(i3, {
    /**
     * Kontrola cookies v prohlizeci.
     *
     * @param {boolean} pbShowMsg zobrazeni zpravy primo v metode
     *
     * 07.09.12 on;
     */
    checkCookies: function(pbShowMsg) {
        var sMsg = 'Nie su povolené Cookies v prehliadači. Prosím povoľte ich.#Nejsou povolené Cookies v prohlížeči. Prosím povolte je.#Cookies are disabled in your browser. Please enable them.###تم إبطال عمل الكوكيز في متصفحك. الرجاء تفعيلهم.'.ls();
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if ((navigator.cookieEnabled === undefined) && !cookieEnabled) {
            document.cookie = "testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") !== -1) ? true : false;
        }
        if (pbShowMsg && (!cookieEnabled)) {
            //i3.displayError(sMsg);
            alert(sMsg);
        }
        //return (cookieEnabled)?true:showCookieFail();
        return cookieEnabled;
    },
    /**
     * Doplneni parametru a jeho hodnoty do URL, pokud existuje, nahradi se novou hodnotou.
     * @param {String} url    cele url (protokol, server, cesta, parametry)
     * @param {String} param  parametr url ktery se bude menit nebo doplnovat
     * @param {String} value  hodnota parametru
     * @return {String} kompletni doplnene url
     **/
    csSetUrlParam: function(url, param, value) {
        var paramNew = '',
            par, val;
        var server = url.split('?')[0],
            sOp, i;
        var params = url.split('?')[1];
        if (params) {
            params = params.split('&');
            for (i = 0; i < params.length; i++) {
                par = params[i].split("=")[0];
                val = params[i].split("=")[1];
                if (par !== param) {
                    if (paramNew === '') {
                        paramNew = paramNew + '?';
                    } else {
                        paramNew = paramNew + '&';
                    }
                    paramNew = paramNew + par + '=' + val;
                }
            }
        }
        if (paramNew !== '') {
            sOp = '&';
        } else {
            sOp = '?';
        }
        server += paramNew + sOp + param + '=' + value;
        return server;
    },
    /*
     * Vrati hodnotu predaneho parametru v URL.
     *
     * 09.09.15 on;
     */
    getURLParam: function(param) {
        // separating the GET parameters from the current URL
        var getParams = document.URL.split("?");
        // transforming the GET parameters into a dictionnary
        var urlParams = {};
        if (getParams.length > 1) {
            urlParams = Ext.urlDecode(getParams[1]);
        }
        return urlParams[param];
    }
});
/* funkciu i3.languageSel vlozime aj do String prototypu, aby sa to dalo pohodlnejsie volat
 15.01.08 rs;
 */
String.prototype.ls = function() {
    return i3.languageSel(this);
};
/**
 * @class i3.c
 * KONSTANTY pre celu aplikaciu
 */
i3.c = {
    /** subfield delimiter - oddelovac podpoli v zaznamoch
     *
     */
    SF: '\x1f',
    /** escaped string version (napr. takto je to vo vysledku Ext.encode)
     *
     */
    SFstr: '\\u001f',
    /** toto je cisto interny oddelovac pouzity na niekolko malo miestach (da najst searchom prave na tuto konstantu)
     * pouziva sa napr. ak chceme do jedneho hidden fieldu nacpat opakovane hodnoty
     * nie je to optimalne riesenie, ale malo by postacovat
     */
    SFFldsDelim: '||',
    /**
     * interny format datumu
     */
    dateFmtInt: 'Ymd',
    /** europsky format datumu
     * aktualny datum - pozor je vytvorene ako funkcia
     * dalej vyuziva Date.format z Ext-u, takze defacto je tu trocha porusenie
     */
    dateFmtEu: 'd.m.Y',
    /**
     * interny format datumu a casu
     *
     * 15.06.12 on;
     */
    dateTimeFmtInt: 'YmdHis',
    /**
     * Aktualny datum v europskom formate.
     */
    date: function() {
        return new Date().format(i3.c.dateFmtEu);
    },
    /**
     * Aktualny datum a cas ve formatu YYYYMMDDHHNNSS
     */
    dateTimeInt: function() {
        return new Date().format(i3.c.dateTimeFmtInt);
    },
    /**
     * Aktualny datum a cas ve formatu YYYYMMDDHHNNSS.0
     */
    dateTimeInt0: function() {
        return (new Date().format(i3.c.dateTimeFmtInt)) + '.0';
    },
    /**
     * Aktualny datum ve formatu YYYYMMDD
     */
    dateInt: function() {
        return new Date().format(i3.c.dateFmtInt);
    },
    /**
     * Aktualni datum ve formatu YYMMDD
     */
    dateIntShort: function() {
        var sDate = new Date().format(i3.c.dateFmtInt);
        // smaze prvni dva znaky
        return sDate.substring(2);
    },
    /**
     * Aktualni rok YYYY
     */
    year: function() {
        var sDate = new Date().format(i3.c.dateFmtInt);
        // smaze prvni dva znaky
        return sDate.substring(0, 4);
    },
    /*
     * hodnota anchor pro opakovatelne pole s +- tlacitky
     */
    anchorPlusMinus: '-40',
    /*
     * hodnota anchor pro pole s pouze jednim tlacitkem (napr. -)
     */
    anchorMinus: '-22',
    /*
     * hodnota anchor pro neopakovatelne pole
     */
    anchorBase: '-5',
    /**
     * Vrati klon predaneho objektu.
     *
     * @param {Object} pobject
     * @param {Boolean} pbMethods zkopirovat i metody?
     */
    cloneObject: function(pobject, pbMethods) {
        // 03.10.19 on; pro undefined, vrati taky undefined - potrebuju to v MUZ aplikaci (ot370 v csRecord2Form)
        if (pobject === undefined) {
            return undefined;
        }
        pbMethods = pbMethods || false;
        var i, newObj = (pobject instanceof Array) ? [] : {};
        for (i in pobject) {
            // 05.02.14 on; rozsirena podminka
            if (pobject.hasOwnProperty(i) || pbMethods) {
                if (i === 'clone') {
                    continue;
                }
                if (pobject[i] && typeof pobject[i] === "object") {
                    newObj[i] = this.cloneObject(pobject[i], pbMethods);
                } else {
                    newObj[i] = pobject[i];
                }
            }
        }
        return newObj;
    },
    /**
     * Funkce prorovna obsah 2 objektu. Vrati true pokud jsou shodne.
     *
     * @param {Object} obj1
     * @param {Object} obj2
     */
    equalObjects: function(obj1, obj2) {
        var parameter_name;
        // jde o prazdny objekt?
        var isEmptyObj = function(obj, parameter_name) {
            if ((obj === undefined) || (obj === null)) { // null a undefined berieme ako prazdne (nemalo by nastat)
                return true;
            }
            if (typeof obj === 'string') {
                // 17.01.22 on; podminka pro parametr objektu, pokud jde o indikator, tak neporovnavat
                if (!i3.isEmptyString(parameter_name) && (parameter_name.substring(parameter_name.length - 2, parameter_name.length - 1) === 'i')) {
                    return true;
                }
                return obj === '';
            }
            // 31.07.05 on; nemusi se jednat jen o pole objektu, muze jit o jeden samostatny objekt, doplnena podminka
            if (!Ext.isArray(obj)) {
                obj = [obj];
            }
            var i, o, prop, v;
            for (i = 0; i < obj.length; i++) {
                o = obj[i];
                for (prop in o) {
                    if (o.hasOwnProperty(prop)) {
                        v = o[prop];
                        // 29.11.19 on; prefix nazvy subtagu
                        // prazdne stringy a indikatory ignorujeme
                        if ((v === '') || (prop.substring(prop.length - 2, prop.length) === 'i1') || (prop.substring(prop.length - 2, prop.length) === 'i2') || (prop === 'sti1') || (prop === 'sti2')) {
                            continue;
                        }
                        // nasli sme nejaku property - sme neprazdny
                        return false;
                    }
                }
            }
            return true;
        };
        var compare = function(objA, objB, param) {
            // 26.10.12 on; prazdny retezec a undefined hodnota jsou totez
            //var param_objA = objA[param], param_objB = (objB[param] === undefined) ? false : objB[param];
            var param_objA = (objA[param] === undefined) ? '' : objA[param],
                param_objB = (objB[param] === undefined) ? '' : objB[param];
            switch (typeof objA[param]) {
                case "object":
                    return (i3.c.equalObjects(param_objA, param_objB));
                case "function":
                    return (param_objA.toString() === param_objB.toString());
                default:
                    // pokud jsou oba prazdne -> ok
                    if (isEmptyObj(param_objA) && isEmptyObj(param_objB)) {
                        return true;
                    }
                    // 15.10.21 on; nebudu kontorlovat indikatory
                    if ((param.substring(param.length - 2, param.length) === 'i1') || (param.substring(param.length - 2, param.length) === 'i2')) {
                        return true;
                    }
                    return (param_objA === param_objB);
            }
        };
        for (parameter_name in obj1) {
            if (obj1.hasOwnProperty(parameter_name)) {
                // 26.10.12 on; prazdny retezec a undefined hodnota jsou totez
                //if (obj2[parameter_name] === undefined || !compare(obj1, obj2, parameter_name)) {
                if (((obj2[parameter_name] === undefined) && (!isEmptyObj(obj1[parameter_name], parameter_name))) || !compare(obj1, obj2, parameter_name)) {
                    if (console) {
                        console.log('equalObjects obj1 parameter_name=' + parameter_name);
                    }
                    return false;
                }
            }
        }
        for (parameter_name in obj2) {
            if (obj2.hasOwnProperty(parameter_name)) {
                // 26.10.12 on; prazdny retezec a undefined hodnota jsou totez
                //if (obj1[parameter_name] === undefined || !compare(obj1, obj2, parameter_name)) {
                if (((obj1[parameter_name] === undefined) && (!isEmptyObj(obj2[parameter_name], parameter_name))) || !compare(obj1, obj2, parameter_name)) {
                    if (console) {
                        console.log('equalObjects obj2 parameter_name=' + parameter_name);
                    }
                    return false;
                }
            }
        }
        return true;
    },
    /**
     * SHA512
     *
     * 04.04.18 on;
     */
    csSHA512: function(r) {
        function e(r, e) {
            this.highOrder = r;
            this.lowOrder = e;
        }
        var w, n, d, h, O, o, i, l, g, t, v, u, a, c, f, s, A, p, C, b, m, y, H, I, R, S, U, j, k, q, x, z, B, D, E, F, G, J, K, L, M, N, P, Q, T, V, W, X = [new e(1779033703, 4089235720), new e(3144134277, 2227873595), new e(1013904242, 4271175723), new e(2773480762, 1595750129), new e(1359893119, 2917565137), new e(2600822924, 725511199), new e(528734635, 4215389547), new e(1541459225, 327033209)],
            Y = [new e(1116352408, 3609767458), new e(1899447441, 602891725), new e(3049323471, 3964484399), new e(3921009573, 2173295548), new e(961987163, 4081628472), new e(1508970993, 3053834265), new e(2453635748, 2937671579), new e(2870763221, 3664609560), new e(3624381080, 2734883394), new e(310598401, 1164996542), new e(607225278, 1323610764), new e(1426881987, 3590304994), new e(1925078388, 4068182383), new e(2162078206, 991336113), new e(2614888103, 633803317), new e(3248222580, 3479774868), new e(3835390401, 2666613458), new e(4022224774, 944711139), new e(264347078, 2341262773), new e(604807628, 2007800933), new e(770255983, 1495990901), new e(1249150122, 1856431235), new e(1555081692, 3175218132), new e(1996064986, 2198950837), new e(2554220882, 3999719339), new e(2821834349, 766784016), new e(2952996808, 2566594879), new e(3210313671, 3203337956), new e(3336571891, 1034457026), new e(3584528711, 2466948901), new e(113926993, 3758326383), new e(338241895, 168717936), new e(666307205, 1188179964), new e(773529912, 1546045734), new e(1294757372, 1522805485), new e(1396182291, 2643833823), new e(1695183700, 2343527390), new e(1986661051, 1014477480), new e(2177026350, 1206759142), new e(2456956037, 344077627), new e(2730485921, 1290863460), new e(2820302411, 3158454273), new e(3259730800, 3505952657), new e(3345764771, 106217008), new e(3516065817, 3606008344), new e(3600352804, 1432725776), new e(4094571909, 1467031594), new e(275423344, 851169720), new e(430227734, 3100823752), new e(506948616, 1363258195), new e(659060556, 3750685593), new e(883997877, 3785050280), new e(958139571, 3318307427), new e(1322822218, 3812723403), new e(1537002063, 2003034995), new e(1747873779, 3602036899), new e(1955562222, 1575990012), new e(2024104815, 1125592928), new e(2227730452, 2716904306), new e(2361852424, 442776044), new e(2428436474, 593698344), new e(2756734187, 3733110249), new e(3204031479, 2999351573), new e(3329325298, 3815920427), new e(3391569614, 3928383900), new e(3515267271, 566280711), new e(3940187606, 3454069534), new e(4118630271, 4000239992), new e(116418474, 1914138554), new e(174292421, 2731055270), new e(289380356, 3203993006), new e(460393269, 320620315), new e(685471733, 587496836), new e(852142971, 1086792851), new e(1017036298, 365543100), new e(1126000580, 2618297676), new e(1288033470, 3409855158), new e(1501505948, 4234509866), new e(1607167915, 987167468), new e(1816402316, 1246189591)],
            Z = new Array(64),
            $ = 8;

        function _(r, w) {
            var n, d, h;
            return n = (65535 & r.lowOrder) + (65535 & w.lowOrder), h = (65535 & (d = (r.lowOrder >>> 16) + (w.lowOrder >>> 16) + (n >>> 16))) << 16 | 65535 & n, n = (65535 & r.highOrder) + (65535 & w.highOrder) + (d >>> 16), new e((65535 & (d = (r.highOrder >>> 16) + (w.highOrder >>> 16) + (n >>> 16))) << 16 | 65535 & n, h)
        }

        function rr(r, w) {
            return w <= 32 ? new e(r.highOrder >>> w | r.lowOrder << 32 - w, r.lowOrder >>> w | r.highOrder << 32 - w) : new e(r.lowOrder >>> w | r.highOrder << 32 - w, r.highOrder >>> w | r.lowOrder << 32 - w)
        }

        function er(r, w) {
            return w <= 32 ? new e(r.highOrder >>> w, r.lowOrder >>> w | r.highOrder << 32 - w) : new e(0, r.highOrder << 32 - w)
        }
        r = unescape(encodeURIComponent(r)), strlen = r.length * $, (r = function(r) {
            for (var e = [], w = (1 << $) - 1, n = r.length * $, d = 0; d < n; d += $) e[d >> 5] |= (r.charCodeAt(d / $) & w) << 32 - $ - d % 32;
            return e
        }(r))[strlen >> 5] |= 128 << 24 - strlen % 32, r[31 + (strlen + 128 >> 10 << 5)] = strlen;
        for (var wr = 0; wr < r.length; wr += 32) {
            w = X[0], n = X[1], d = X[2], h = X[3], O = X[4], o = X[5], i = X[6], l = X[7];
            for (var nr = 0; nr < 80; nr++) Z[nr] = nr < 16 ? new e(r[2 * nr + wr], r[2 * nr + wr + 1]) : (Q = Z[nr - 2], void 0, void 0, void 0, T = rr(Q, 19), V = rr(Q, 61), W = er(Q, 6), B = new e(T.highOrder ^ V.highOrder ^ W.highOrder, T.lowOrder ^ V.lowOrder ^ W.lowOrder), D = Z[nr - 7], L = Z[nr - 15], void 0, void 0, void 0, M = rr(L, 1), N = rr(L, 8), P = er(L, 7), E = new e(M.highOrder ^ N.highOrder ^ P.highOrder, M.lowOrder ^ N.lowOrder ^ P.lowOrder), F = Z[nr - 16], G = void 0, J = void 0, K = void 0, G = (65535 & B.lowOrder) + (65535 & D.lowOrder) + (65535 & E.lowOrder) + (65535 & F.lowOrder), K = (65535 & (J = (B.lowOrder >>> 16) + (D.lowOrder >>> 16) + (E.lowOrder >>> 16) + (F.lowOrder >>> 16) + (G >>> 16))) << 16 | 65535 & G, G = (65535 & B.highOrder) + (65535 & D.highOrder) + (65535 & E.highOrder) + (65535 & F.highOrder) + (J >>> 16), new e((65535 & (J = (B.highOrder >>> 16) + (D.highOrder >>> 16) + (E.highOrder >>> 16) + (F.highOrder >>> 16) + (G >>> 16))) << 16 | 65535 & G, K)), p = l,
                void 0,
                void 0,
                void 0, q = rr(k = O, 14), x = rr(k, 18), z = rr(k, 41), C = new e(q.highOrder ^ x.highOrder ^ z.highOrder, q.lowOrder ^ x.lowOrder ^ z.lowOrder), U = o, j = i, b = new e((S = O).highOrder & U.highOrder ^ ~S.highOrder & j.highOrder, S.lowOrder & U.lowOrder ^ ~S.lowOrder & j.lowOrder), m = Y[nr], y = Z[nr], H = void 0, I = void 0, R = void 0, H = (65535 & p.lowOrder) + (65535 & C.lowOrder) + (65535 & b.lowOrder) + (65535 & m.lowOrder) + (65535 & y.lowOrder), R = (65535 & (I = (p.lowOrder >>> 16) + (C.lowOrder >>> 16) + (b.lowOrder >>> 16) + (m.lowOrder >>> 16) + (y.lowOrder >>> 16) + (H >>> 16))) << 16 | 65535 & H, H = (65535 & p.highOrder) + (65535 & C.highOrder) + (65535 & b.highOrder) + (65535 & m.highOrder) + (65535 & y.highOrder) + (I >>> 16), g = new e((65535 & (I = (p.highOrder >>> 16) + (C.highOrder >>> 16) + (b.highOrder >>> 16) + (m.highOrder >>> 16) + (y.highOrder >>> 16) + (H >>> 16))) << 16 | 65535 & H, R), t = _((void 0, void 0, void 0, f = rr(c = w, 28), s = rr(c, 34), A = rr(c, 39), new e(f.highOrder ^ s.highOrder ^ A.highOrder, f.lowOrder ^ s.lowOrder ^ A.lowOrder)), (u = n, a = d, new e((v = w).highOrder & u.highOrder ^ v.highOrder & a.highOrder ^ u.highOrder & a.highOrder, v.lowOrder & u.lowOrder ^ v.lowOrder & a.lowOrder ^ u.lowOrder & a.lowOrder))), l = i, i = o, o = O, O = _(h, g), h = d, d = n, n = w, w = _(g, t);
            X[0] = _(w, X[0]), X[1] = _(n, X[1]), X[2] = _(d, X[2]), X[3] = _(h, X[3]), X[4] = _(O, X[4]), X[5] = _(o, X[5]), X[6] = _(i, X[6]), X[7] = _(l, X[7])
        }
        var dr = [];
        for (wr = 0; wr < X.length; wr++) dr.push(X[wr].highOrder), dr.push(X[wr].lowOrder);
        return function(r) {
            for (var e, w = "0123456789abcdef", n = "", d = 4 * r.length, h = 0; h < d; h += 1) e = r[h >> 2] >> 8 * (3 - h % 4), n += w.charAt(e >> 4 & 15) + w.charAt(15 & e);
            return n;
        }(dr)
    },
    /**
     * Zjisti, jestli aplikace bezi na prohlizeci s malo sirkou (mobil)
     *
     * 28.06.19 on;
     */
    csIsPhone: function() {
        return (Ext.getBody().getViewSize().width < 600);
    }
};
