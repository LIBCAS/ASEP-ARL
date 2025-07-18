/*
 * Kniznica zmien Ext-u. T.j. zasahy priamo do vnutra Ext komponent.
 * Mala by byt nacitana po i3.Base.js a po skupine nevizualnych tried (Marc a WS).
 *
 * 04.02.25 on; zacinat budeme pondelkem
 * 05.12.23 on; zvyseny timeout
 * 12.06.20 on; timeou pro ajax requesty
 * 25.11.15 on; MenuLayout
 * 10.11.15 on; preklad datumovych komponent
 * 12.10.15 on; podpora pro IE11
 * 19.06.15 on; zvetsena minimalni sirka dialogoveho okna - v chrome se zobrazuje scvrkle
 * 23.10.14 on; preklady chybovych hlasek
 * 23.08.11 on; isGecko6
 * 12.07.11 on; isGecko5
 * 22.04.11 on; predefinovana metoda findParentByType
 * 12.04.11 on; doplnena kontrola, ze jde o FF v4
 * 08.04.11 on; upravene nastaveni BLANK_IMAGE_URL
 * 28.11.09 rs; odstranenie ladiacej hlasky
 * 27.11.09 rs; pridanie funkcnosti zaznamenavajucej poslednu komponentu, kt. mala focus
 *              do csCurrentFld vlastnosti FormPanelu
 * 20.10.09 on; zapojene volani applyComp v kontextu this
 * 07.10.09 rs; upravy dokumentacia
 * 05.10.09 rs; upravy dokumentacia
 * 05.05.09 rs; pridany zmeneny default labelAlign pre Formpanel
 */
/*global Ext,i3,document,navigator */
Ext.ns('i3.ui.ext');
i3.ui.ext.tx = {
    txBlankText: 'Toto pole je povinné#Toto pole je povinné#This field is required'.ls(),
    txInvalidText: 'Hodnota v tomto poli je neplatná#Hodnota v tomto poli je neplatná#The value in this field is invalid'.ls(),
    // 25.11.15 on; format d.m.Y neni uzivatelum jasny
    //txInvalidDate : '{0} nie je platný dátum - musí byť vo formáte {1}#{0} není platné datum - musí být ve formátu {1}#{0} is not a valid date - it must be in the format {1}'.ls(),
    txInvalidDate: '{0} nie je platný dátum - musí byť vo formáte DD.MM.RRRR alebo RRRRMMDD#{0} není platné datum - musí být ve formátu DD.MM.RRRR nebo RRRRMMDD#{0} is not a valid date - it must be in the format DD.MM.YYYY or YYYYMMDD'.ls(),
    txSortAscText: 'Zoradiť vzostupne#Seřadit vzestupně#Sort Ascending'.ls(),
    txSortDescText: 'Zoradiť zostupne#Seřadit sestupně#Sort Descending'.ls(),
    txColumnsText: 'Stĺpce#Sloupce#Columns'.ls(),
    // kalendar
    txJanuary: 'Január#Leden#January'.ls(),
    txFebruary: 'Február#Únor#February'.ls(),
    txMarch: 'Marec#Březen#March'.ls(),
    txApril: 'Apríl#Duben#April'.ls(),
    txMay: 'Máj#Květen#May'.ls(),
    txJune: 'Jún#Červen#June'.ls(),
    txJuly: 'Júl#Červenec#July'.ls(),
    txAugust: 'August#Srpen#August'.ls(),
    txSeptember: 'September#Září#September'.ls(),
    txOctober: 'Október#Říjen#October'.ls(),
    txNovember: 'November#Listopad#November'.ls(),
    txDecember: 'December#Prosinec#December'.ls(),
    txSunday: 'Nedeľa#Neděle#Sunday'.ls(),
    txMonday: 'Pondelok#Pondělí#Monday'.ls(),
    txTuesday: 'Utorok#Úterý#Tuesday'.ls(),
    txWednesday: 'Streda#Středa#Wednesday'.ls(),
    txThursday: 'Štvrtok#Čtvrtek#Thursday'.ls(),
    txFriday: 'Piatok#Pátek#Friday'.ls(),
    txSaturday: 'Sobota#Sobota#Saturday'.ls(),
    txToday: 'Dnes#Dnes#Today'.ls(),
    txMinText: 'Dátum nesmie byť starší ako je minimálny#Datum nesmí být starší než je minimální#This date is before the minimum date'.ls(),
    txMaxText: 'Dátum nesmie byť skorší ako je maximálny#Datum nesmí být dřívější než je maximální#This date is after the maximum date'.ls(),
    txNextText: 'Nasledujúci mesiac (Control+Right)#Následující měsíc (Control+Right)#Next Month (Control+Right)'.ls(),
    txPrevText: 'Predchádzajúci mesiac (Control+Left)#Předcházející měsíc (Control+Left)#Previous Month (Control+Left)'.ls(),
    txMonthYearText: 'Zvoľte mesiac (k zmene rokov použite Control+Up/Down)#Zvolte měsíc (ke změně let použijte Control+Up/Down)#Choose a month (Control+Up/Down to move years)'.ls(),
    txCancel: 'Storno#Storno#Cancel'.ls(),
    txDisabled: 'Neaktívny#Neaktivní#Disabled'.ls(),
    txMinTextDateField: 'Dátum v tomto poli nesmie byť starší ako {0}#Datum v tomto poli nesmí být starší než {0}#The date in this field must be equal to or after {0}'.ls(),
    txMaxTextDateField: 'Dátum v tomto poli nesmie byť novší ako {0}#Datum v tomto poli nesmí být novější než {0}#The date in this field must be equal to or before {0}'.ls()
};
// 08.04.11 on; obrazek pridany mezi images, aby se to tu stale nemuselo prepisovat pro zmene verze extu
// Reference local blank image
// Zmenit len vtedy, ak uz nie je zmenena na inom mieste. Ak totiz premiestnime projekt, ukazovalo by to zle.
// A bez s.gif cely Ext nefunguje spravne.
//
// 21.01.09 rs;
if (Ext.BLANK_IMAGE_URL.piece(':', 1) === 'http') {
    //Ext.BLANK_IMAGE_URL = 'extjs22/resources/images/default/s.gif';
    Ext.BLANK_IMAGE_URL = '../images/s.gif';
}
/// 05.12.23 on; zvyseny timeout
/// 12.06.20 on; timeou pro ajax requesty - delsi nema smysl, protoze timenout na csp brane je vetsinou 60s
Ext.Ajax.timeout = 185000;
/**
 * @class Ext.Panel
 * Upraveny panel.
 * Zatial len pridanie "idpref" metod. do Ext.FormPanel, i3.ui.CsGridPanel
 *
 * 20.10.09 on; zapojene volani applyComp v kontextu this
 * 03.04.09 rs; prepracovanie (povodne bolo riesene ako nove triedy i3.ui.CsPanel,i3.ui.CsFormPanel,i3.ui.CsGridPanel,i3.ui.CsWindow
 */
Ext.override(Ext.Panel, {
    /**
     * Generator tzv. idpref funkcie. T.j. zada sa prefix a metda vygeneruje funkciu, ktora
     * sa pouzije na vsetky id-cka v danom okne a tieto budu potom obsahovat prefix urceny pre
     * dane okno. Efektivne tak zabranime duplicite id vo web stranke.
     *
     * @param {Object} idbase
     */
    getIdPref: function(idbase) {
        return this.idpref + '_' + idbase;
    },
    /**
     * Shortcut na Ext.getCmp s automaticky pridanim id prefixu okna. Viz tiez getIdPref.
     * @param {Object} idbase
     */
    getCmp: function(idbase) {
        return Ext.getCmp(this.getIdPref(idbase));
    },
    /**
     * volani i3.applyComp v kontextu this
     * @param {Object} comp
     * @param {Object} o
     */
    applyComp: function(comp, o) {
        return i3.applyComp.call(this, comp, o);
    }
});
/**
 * @class Ext.layout.FormLayout
 * Zmena defaultu label separatora globalne na prazdny string.
 */
Ext.override(Ext.layout.FormLayout, {
    /**
     * Suffix za field labelom chceme defaultne prazdny.
     */
    labelSeparator: ''
});
/**
 * @class Ext.EventObject
 Konstanty klaves F1 az F4.
 Neviem z akeho dovodu, ale standardne je definovane len F5, takze tu si pridavam dalsie konstanty.<br><br>
 Nic viac tu zatial nie je.
 */
if (!Ext.EventObject.F1) {
    Ext.EventObject.F1 = Ext.EventObject.F5 - 4;
}
if (!Ext.EventObject.F2) {
    Ext.EventObject.F2 = Ext.EventObject.F5 - 3;
}
if (!Ext.EventObject.F3) {
    Ext.EventObject.F3 = Ext.EventObject.F5 - 2;
}
if (!Ext.EventObject.F4) {
    Ext.EventObject.F4 = Ext.EventObject.F5 - 1;
}
/**
 * @class Ext.form.FormPanel
 * Upraveny formpanel. Obsahuje len predefinovanie vybranych konstant (presnejsie aktualne jednej).
 */
Ext.override(Ext.form.FormPanel, {
    /**
     * Zarovnanie titulkov dohora.
     */
    labelAlign: 'top'
});
/* zachovat povodnu hodnotu
 * pretoze ideme metodu prepisat ale nie cez potomka ale priamo do criev povodnej triedy
 * ..je to dobra divocinka
 *
 * 26.11.09 rs
 */
Ext.override(Ext.form.Field, {
    csInitComponentOrig: Ext.form.Field.prototype.initComponent
});
/*
 *
 *  Co sa pridava:
 *    Funkcnost, aby jednotlive komponenty formulara "oznamovali" svojmu formularu, svoj nazov,
 *    aby formular "vedel", ktore pole bolo naposledy aktivne.
 *    Cele je to dost komplikovane, ale nepodarilo sa mi prist na ziaden lepsi/jednoduchsi sposob.
 *
 *  Ako to cele funguje?
 *    Jednotlivym komponentam pridame vlastnost: csAddOnFocus:true - tym sa aktivuje monitorovanie.
 *    Pre radia a checkbody je dalej nutne nastavit vlastnost csOwnerForm aby ukazovala priamo
 *    na rodicovsky FormPanel - zial sa mi zatial nepodarilo najst ziadnu cestu ako z kompomenty
 *    radio/chbox najst formular - pricom u inych to funguje pomerne dobre.
 *  Co sa dosiahne:
 *    Vo FormPaneli pribuda vlastnost csCurrentFld, v kt. zostava zaznamenany nazov posledneho pola,
 *    kt. malo focus. Toto sa da vyuzit napr. pre zobrazenie online napovedy.
 *
 *  Funknost pridame napriamo do Field-u, aby sa dostalo vsetkym komponentam
 *
 * 26.11.09 rs
 */
Ext.override(Ext.form.Field, {
    /**
     * Metoda pouzitelna z komponent vlozenych do FormPanelu (napr. textfield/combo atd.)
     * ktore najde nadradeny formular.
     * Formular musi byt ozneceny "xtype:'form'" viz, poznamka nizsie.
     * Vlastne je to cele implementovane divne - ak niekto neskor pride na lepsie riesenie moze
     * sa implementacia metody zmenit - pre dcerske komponenty malo by to ale zostat fungovat..
     *
     *  26.11.09 rs
     * @param {Object} child
     */
    findFormPanel: function() {
        var f = null;
        f = this.findParentBy(function(container, comp) {
            // takto by to podla mna mnalo fungovat, ale zial nefunguje
            // ixXType na FormPanel proste nefunguje
            //var isx=container.isXType('form');
            // pokial ala dame do configu triedy odvodenej z FormPanel (viz napr. priklad i3.ui.DataTable.Panel
            // xtype:'form', tak funguje nasledovny test:
            return container.xtype === 'form';
        }, this);
        return f;
    },
    /**
     * Pridanie eventu na monitoring "current field" pre formular
     * 27.11.09 rs
     */
    initComponent: function() {
        if (this.csAddOnFocus) {
            var evt = 'focus';
            if (this.isXType('checkbox')) { // checkbox alebo radio? (radia su odvodene z checkboxov)
                // z nejakeho dovodu, pre checkboxy a radia nefunguje event "focus" aj ked podla dokumentacie
                // by fungovat mal; pouzijeme nahradny event focus
                evt = 'check';
            }
            this.on(evt, this.csRegCurrentField, this);
        }
        Ext.form.Field.prototype.csInitComponentOrig.apply(this, arguments);
    },
    /**
     * On Focus listener - zaregistrovat aktualne pole ako "aktualne" pre dany formular
     * 27.11.09 rs
     */
    csRegCurrentField: function() {
        // csAddOnFocus je sice osetrene uz pred pridavanim eventu, ale u komponent, kde z nejakeho dovodu
        // nejde pridat event (napr. ze su disabled), tak volame len priamo csRegCurrentField; a aby sme si
        // X-krat usetrili podmienku na csRegCurrentField, preverime to tu opakovane
        if (!this.csAddOnFocus) {
            return;
        }
        var f = this.findFormPanel(this),
            n = this.name;
        // rychlofix na komponenty, kde z nejakeho dovodu nefunguje vyhladavanie smerom hore
        // a tak sa nenajde rodicovsky form; v tych komponentach treba uz v init.configu
        //
        if ((!f) && this.csOwnerForm) {
            f = this.csOwnerForm;
        }
        if (n) {
            if (f) {
                if (!this.csCntX) {
                    this.csCntX = 0;
                }
                this.csCntX++;
                f.csCurrentFld = n;
                //console.log('current field('+this.id+'/'+this.csCntX+'): ' + n)
                return;
            }
            // tuto hlasku zatial ponechavam, lebo indikuje, ze spracovanie current field je sice aktivovane,
            // ale pre dane pole nefunguje spravne a programator to este musi doladit (alebo vypnut)
            i3.msg('current field(no form): ' + n);
        }
    }
});
// doplnena kontrola, ze jde o FF v4
//
// 12.04.11 on;
if (Ext.isGecko4 === undefined) {
    var ua = navigator.userAgent.toLowerCase();
    var check = function(r) {
        return r.test(ua);
    };
    Ext.isGecko4 = Ext.isGecko && check(/rv:2\.0/);
}
// doplnena kontrola, ze jde o FF v5
//
// 12.07.11 on;
if (Ext.isGecko5 === undefined) {
    var ua = navigator.userAgent.toLowerCase();
    var check = function(r) {
        return r.test(ua);
    };
    Ext.isGecko5 = Ext.isGecko && check(/rv:5\.0/);
}
// 23.08.11 on; doplnena kontrola, ze jde o FF v6
if (Ext.isGecko6 === undefined) {
    var ua = navigator.userAgent.toLowerCase();
    var check = function(r) {
        return r.test(ua);
    };
    Ext.isGecko6 = Ext.isGecko && check(/rv:6\.0/);
}
// 12.10.15 on; IE11+
Ext.isIE = !Ext.isOpera && (check(/msie/) || check(/trident/));
// 25.11.15 on; IE10
if (Ext.isIE10 === undefined) {
    var docMode = document.documentMode;
    Ext.isIE10 = Ext.isIE && ((check(/msie 10/) && (docMode !== 7) && (docMode !== 8) && (docMode !== 9)) || (docMode === 10));
}
// 25.11.15 on; IE do verze 9 (pouzite nize), prevzate z extjs 3.4.1.1 a doplneno IE10
if (Ext.isIE10m === undefined) {
    Ext.isIE10m = Ext.isIE && (Ext.isIE6 || Ext.isIE7 || Ext.isIE8 || Ext.isIE9 || Ext.isIE10);
}
/**
 * @class Ext.Component
 * Predefinovana funkce findParentByType (prevzata z verze 3.1.0). Ve verzi nefunguje dobre napr. pri prihlaseni.
 *
 * 22.04.11 on;
 */
Ext.apply(Ext.Component.prototype, {
    findParentByType: function(xtype) {
        return Ext.isFunction(xtype) ? this.findParentBy(function(p) {
            return p.constructor === xtype;
        }) : this.findParentBy(function(p) {
            return p.constructor.xtype === xtype;
        });
    }
});
/**
 * @class Ext.form.Field
 *
 * 23.10.13 on; preklad chybovych hlasek
 */
Ext.override(Ext.form.Field, {
    invalidText: i3.ui.ext.tx.txInvalidText
});
/**
 * @class Ext.form.TextField
 *
 * 23.10.13 on; preklad chybovych hlasek
 */
Ext.override(Ext.form.TextField, {
    blankText: i3.ui.ext.tx.txBlankText
});
/**
 * @class Ext.form.DateField
 *
 * 23.10.13 on; preklad chybovych hlasek
 */
Ext.override(Ext.form.DateField, {
    invalidText: i3.ui.ext.tx.txInvalidDate
});
/**
 * @class Ext.grid.GridView
 *
 * 23.10.13 on; preklad nabidek v zahlavi sloupcu
 */
Ext.override(Ext.grid.GridView, {
    sortAscText: i3.ui.ext.tx.txSortAscText,
    sortDescText: i3.ui.ext.tx.txSortDescText,
    columnsText: i3.ui.ext.tx.txColumnsText
});
/// 19.06.15 on; zvetsena minimalni sirka dialogoveho okna - v chrome se zobrazuje scvrkle
Ext.MessageBox.minWidth = 300;
/// 10.11.15 on; preklad datumovych komponent
Date.monthNames = [i3.ui.ext.tx.txJanuary, i3.ui.ext.tx.txFebruary, i3.ui.ext.tx.txMarch, i3.ui.ext.tx.txApril, i3.ui.ext.tx.txMay, i3.ui.ext.tx.txJune, i3.ui.ext.tx.txJuly, i3.ui.ext.tx.txAugust, i3.ui.ext.tx.txSeptember, i3.ui.ext.tx.txOctober, i3.ui.ext.tx.txNovember, i3.ui.ext.tx.txDecember];
Date.getShortMonthName = function(month) {
    return Date.monthNames[month].substring(0, 3);
};
Date.monthNumbers = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
};
Date.getMonthNumber = function(name) {
    return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
};
Date.dayNames = [i3.ui.ext.tx.txSunday, i3.ui.ext.tx.txMonday, i3.ui.ext.tx.txTuesday, i3.ui.ext.tx.txWednesday, i3.ui.ext.tx.txThursday, i3.ui.ext.tx.txFriday, i3.ui.ext.tx.txSaturday];
Date.getShortDayName = function(day) {
    return Date.dayNames[day].substring(0, 3);
};
if (Ext.DatePicker) {
    Ext.apply(Ext.DatePicker.prototype, {
        todayText: i3.ui.ext.tx.txToday,
        minText: i3.ui.ext.tx.txMinText,
        maxText: i3.ui.ext.tx.txMaxText,
        disabledDaysText: i3.ui.ext.tx.txDisabled,
        disabledDatesText: i3.ui.ext.tx.txDisabled,
        monthNames: Date.monthNames,
        dayNames: Date.dayNames,
        nextText: i3.ui.ext.tx.txNextText,
        prevText: i3.ui.ext.tx.txPrevText,
        monthYearText: i3.ui.ext.tx.txMonthYearText,
        //todayTip : "{0} (Spacebar)",
        //format : "d.m.Y",
        //okText : "&#160;OK&#160;",
        cancelText: i3.ui.ext.tx.txCancel
        //startDay : 1
    });
}
if (Ext.form.DateField) {
    Ext.apply(Ext.form.DateField.prototype, {
        disabledDaysText: i3.ui.ext.tx.txDisabled,
        disabledDatesText: i3.ui.ext.tx.txDisabled,
        minText: i3.ui.ext.tx.txMinTextDateField,
        maxText: i3.ui.ext.tx.txMaxTextDateField,
        startDay: 1 // 04.02.25 on; zacinat budeme pondelkem
        //invalidText : i3.ui.ext.tx.txInvalidDate  // toto je predefiniovane uz vys
        //format : "d.m.Y",
        //altFormats : "d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
    });
}
/**
 * @class Ext.layout.MenuLayout
 *
 * 25.11.15 on; oprava velikosti menu v IE, prevzato z ext-all-debug.js a upravena podminka isIE10m podle isIE9m ve verzi 3.4.1.1
 */
Ext.override(Ext.layout.MenuLayout, {
    doAutoSize: function() {
        var ct = this.container,
            w = ct.width;
        if (ct.floating) {
            if (w) {
                ct.setWidth(w);
            } else if (Ext.isIE10m) {
                ct.setWidth(Ext.isStrict && (Ext.isIE7 || Ext.isIE8 || Ext.isIE9 || Ext.isIE10) ? 'auto' : ct.minWidth);
                var el = ct.getEl();
                //, t = el.dom.offsetWidth;
                ct.setWidth(ct.getLayoutTarget().getWidth() + el.getFrameWidth('lr'));
            }
        }
    }
});
/*Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Prosím čekejte...</div>';

 if(Ext.View){
 Ext.View.prototype.emptyText = "";
 }

 if(Ext.grid.GridPanel){
 Ext.grid.GridPanel.prototype.ddText = "{0} vybraných řádků";
 }

 if(Ext.TabPanelItem){
 Ext.TabPanelItem.prototype.closeText = "Zavřít záložku";
 }

 if(Ext.form.Field){
 Ext.form.Field.prototype.invalidText = "Hodnota v tomto poli je neplatná";
 }

 if(Ext.LoadMask){
 Ext.LoadMask.prototype.msg = "Prosím čekejte...";
 }

 if(Ext.MessageBox){
 Ext.MessageBox.buttonText = {
 ok     : "OK",
 cancel : "Storno",
 yes    : "Ano",
 no     : "Ne"
 };
 }

 if(Ext.util.Format){
 Ext.util.Format.date = function(v, format){
 if(!v) return "";
 if(!(v instanceof Date)) v = new Date(Date.parse(v));
 return v.dateFormat(format || "d.m.Y");
 };
 }

 if(Ext.PagingToolbar){
 Ext.apply(Ext.PagingToolbar.prototype, {
 beforePageText : "Strana",
 afterPageText  : "z {0}",
 firstText      : "První strana",
 prevText       : "Přecházející strana",
 nextText       : "Následující strana",
 lastText       : "Poslední strana",
 refreshText    : "Aktualizovat",
 displayMsg     : "Zobrazeno {0} - {1} z celkových {2}",
 emptyMsg       : 'Žádné záznamy nebyly nalezeny'
 });
 }

 if(Ext.form.TextField){
 Ext.apply(Ext.form.TextField.prototype, {
 minLengthText : "Pole nesmí mít méně {0} znaků",
 maxLengthText : "Pole nesmí být delší než {0} znaků",
 blankText     : "This field is required",
 regexText     : "",
 emptyText     : null
 });
 }

 if(Ext.form.NumberField){
 Ext.apply(Ext.form.NumberField.prototype, {
 minText : "Hodnota v tomto poli nesmí být menší než {0}",
 maxText : "Hodnota v tomto poli nesmí být větší než {0}",
 nanText : "{0} není platné ??íslo"
 });
 }

 if(Ext.form.ComboBox){
 Ext.apply(Ext.form.ComboBox.prototype, {
 loadingText       : "Prosím ??ekejte...",
 valueNotFoundText : undefined
 });
 }

 if(Ext.form.VTypes){
 Ext.apply(Ext.form.VTypes, {
 emailText    : 'V tomto poli může být vyplněna pouze emailová adresa ve formátu "uživatel@doména.cz"',
 urlText      : 'V tomto poli může být vyplněna pouze URL (adresa internetové stránky) ve formátu "http:/'+'/www.doména.cz"',
 alphaText    : 'Toto pole může obsahovat pouze písmena abecedy a znak _',
 alphanumText : 'Toto pole může obsahovat pouze písmena abecedy, ??ísla a znak _'
 });
 }

 if(Ext.form.HtmlEditor){
 Ext.apply(Ext.form.HtmlEditor.prototype, {
 createLinkText : 'Zadejte URL adresu odkazu:',
 buttonTips : {
 bold : {
 title: 'Tu??né (Ctrl+B)',
 text: 'Ozna??í vybraný text tu??ně.',
 cls: 'x-html-editor-tip'
 },
 italic : {
 title: 'Kurzíva (Ctrl+I)',
 text: 'Ozna??í vybraný text kurzívou.',
 cls: 'x-html-editor-tip'
 },
 underline : {
 title: 'Podtržení (Ctrl+U)',
 text: 'Podtrhne vybraný text.',
 cls: 'x-html-editor-tip'
 },
 increasefontsize : {
 title: 'Zvětšit písmo',
 text: 'Zvětší velikost písma.',
 cls: 'x-html-editor-tip'
 },
 decreasefontsize : {
 title: 'Zúžit písmo',
 text: 'Zmenší velikost písma.',
 cls: 'x-html-editor-tip'
 },
 backcolor : {
 title: 'Barva zvýraznění textu',
 text: 'Ozna??í vybraný text tak, aby vypadal jako ozna??ený zvýrazňova??em.',
 cls: 'x-html-editor-tip'
 },
 forecolor : {
 title: 'Barva písma',
 text: 'Změní barvu textu.',
 cls: 'x-html-editor-tip'
 },
 justifyleft : {
 title: 'Zarovnat text vlevo',
 text: 'Zarovná text doleva.',
 cls: 'x-html-editor-tip'
 },
 justifycenter : {
 title: 'Zarovnat na střed',
 text: 'Zarovná text na střed.',
 cls: 'x-html-editor-tip'
 },
 justifyright : {
 title: 'Zarovnat text vpravo',
 text: 'Zarovná text doprava.',
 cls: 'x-html-editor-tip'
 },
 insertunorderedlist : {
 title: 'Odrážky',
 text: 'Za??ne seznam s odrážkami.',
 cls: 'x-html-editor-tip'
 },
 insertorderedlist : {
 title: 'Číslování',
 text: 'Za??ne ??íslovaný seznam.',
 cls: 'x-html-editor-tip'
 },
 createlink : {
 title: 'Internetový odkaz',
 text: 'Z vybraného textu vytvoří internetový odkaz.',
 cls: 'x-html-editor-tip'
 },
 sourceedit : {
 title: 'Zdrojový kód',
 text: 'Přepne do módu úpravy zdrojového kódu.',
 cls: 'x-html-editor-tip'
 }
 }
 });
 }

 if(Ext.grid.GridView){
 Ext.apply(Ext.grid.GridView.prototype, {
 sortAscText  : "Řadit vzestupně",
 sortDescText : "Řadit sestupně",
 lockText     : "Ukotvit sloupec",
 unlockText   : "Uvolnit sloupec",
 columnsText  : "Sloupce"
 });
 }

 if(Ext.grid.GroupingView){
 Ext.apply(Ext.grid.GroupingView.prototype, {
 emptyGroupText : '(Žádná data)',
 groupByText    : 'Seskupit dle tohoto pole',
 showGroupsText : 'Zobrazit ve skupině'
 });
 }

 if(Ext.grid.PropertyColumnModel){
 Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
 nameText   : "Název",
 valueText  : "Hodnota",
 dateFormat : "j.m.Y"
 });
 }

 if(Ext.layout.BorderLayout && Ext.layout.BorderLayout.SplitRegion){
 Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
 splitTip            : "Tahem změnit velikost.",
 collapsibleSplitTip : "Tahem změnit velikost. Dvojklikem skrýt."
 });
 }*/
