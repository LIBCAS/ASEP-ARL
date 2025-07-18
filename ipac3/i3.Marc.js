/*
 * Praca s MARC a suvislosti
 *
 * 21.07.22 on; zruseno filtrovani T - vyuziva se ve fakturach (webova katalogizace - 210T)
 * 14.01.22 on; kontrola prazdneho zaznamu
 * 10.12.20 on; osetreny undefined v clearBlanks
 * 18.05.17 on; getDF
 * 31.03.16 on; upraveno razeni v metode toMarc (kvuli Chrome)
 * 04.02.16 on; uprava setDataStr
 * 13.11.15 on; uprava csFixRecord
 * 12.11.15 on; uprava csCompareSubtag
 * 26.08.15 on; osetreno csFixRecord
 * 24.04.15 on; oprava razeni ve funkci toMarc
 * 08.04.15 on; osetrena funkce csCheckFields
 * 20.03.14 on; arabstina
 * 05.02.14 on; uprava metody fromMarc
 * 20.03.13 on; uprava csGetTagList
 * 11.12.12 on; udalosti rozsireny o suffixFormName
 * 15.11.12 on; rozsireni pro interpi
 * 26.10.12 on; generovani prevodni tabulky rozsireno
 * 21.06.12 on; zrusene odmazavani gen. subtagu X,Y,Z
 * 14.06.12 on; odstraneny trim mezer na konci poli
 * 11.06.12 on; pri prevodu z marcu na lin. format doplnene odmazani generovanych subtagu
 * 04.06.12 on; zapojeno generovani prevodni tabulky
 * 27.01.12 on; upravena metoda csCheckFields
 * 26.01.12 on; getSTValue: osetrene cteni indikatoru
 * 12.07.11 on; osetrena kontrola ztraty poli
 * 11.05.11 on; metoda csFilterEmptyFields rozsirena o generovane subtagy
 * 02.05.11 on; po nacteni zaznamu doplnena kontrola ztraty poli
 * 10.01.11 on; odstranene odmazani prazdnych radku v delTag
 * 26.08.10 on; zruseno swapovani $$ za char(31) u poli 00x a UN_100
 * 23.03.10 on; v metode clearBlanks osetreny null
 * 03.03.10 on; uprava dataToWsRecord
 * 02.10.09 rs; formalne upravy kvoli dokumentacii
 * 08.09.09 rs; pridana filtracia kratkych riadkov
 * 07.09.09 rs; rozsirenie formatu pre konverziu marcu (povodne cele nastavenie bola mapa; teraz je mapa jeden z atributov)
 * 18.08.09 rs; drobnosti
 * 29.07.09 rs; oprava preklepu
 * 23.07.09 rs; default v Marc constructore
 * 15.04.09 rs; oprava prace s indikatormi setSubtagStr
 * 07.04.09 rs; formalne upravy a drobne vylepsenia konverzie MARC z/do interneho formatu
 * 23.03.09 rs; zaciarok prac na konverzii MARC na vnutorny format a naopak
 * 23.01.09 rs; oprava chybnej/chybajucej inicializacie data pri constructore i3.Marc
 * 23.01.09 rs; drobna uprava kodu appendTag
 * 18.08.08 rs; prehodenie Marc triedy do samostatneho suboru
 * 22.06.09 rs; pridany parameter fmt, ktory nesie format - MARC zaznam totiz nemusi obsahovat
 *              len MARC ale aj ine formaty<br>
 * --
 */
//
/*global i3,console,Ext,alert */
/**
 * @class i3.Marc
 * MARC objekt - praca s MARC zaznamom.
 * Neobsahuje pracu s databazou - tato je v i3.WS.*<br><br>
 *
 */
i3.Marc = function(config) {
    /**
     * @cfg {String} classn Trieda
     */
    /**
     * @cfg {String} t001 Kod zaznamu
     */
    /**
     * @cfg {String} data Pole riadkov zaznamu v MARC. Tvar: ["line1","line2",...]).
     *                    Interne su oddelovace poli $c(31)
     */
    /**
     * @cfg {String} fmt nepovinne pole format (default "LINEMARC")
     */
    config = config || {};
    // default 23.07.09 rs
    // pokial nebolo data zadane, musime ho tu rucne priradit na nove pole.
    // inak by sa zobralo z prototypu a pri appendTag by sa modifikoval prototyp
    // coz je nezmysel
    if (!config.data) {
        config.data = [];
    }
    Ext.apply(this, config);
    //      kopirujeme konfig
    Ext.applyIf(this, { //           standardny format (ak nebol rucne zadany)
        fmt: 'LINEMARC'
    });
};
/* Protyp MARC zaznamu
 */
i3.Marc.prototype = {
    /**
     * Id zaznamu
     * @type {String}
     */
    t001: '',
    /**
     * Trieda
     * @type {String}
     */
    classn: '',
    /**
     * Riadky zaznamu
     * @type {Array}
     */
    data: [],
    /**
     * Vymaz tagov zadanej specifikacie.
     * (+ vymaz prazdnych riadkov, ak by sa vyskytli)
     *
     * @param {String/Array} psTag Specifikacia pre vymaz. Moze byt:<br>
     *  1, retazec ('999', '90*' pripadne '9**')<br>
     *  2, pole so zoznamom tagov<br>
     *
     *  Dalej je povolene ako specifikaciu vymazu uviest cely obsah riadka.
     *  T.j. ak je prvok specifikacie dlhsi ako 3 znaky, prvok na vymaz vyhovie len pri zhode celeho riadka 1:1.
     *
     */
    delTag: function(psTag) {
        var delTag1 = function(s, pDelSpec) {
            if (!pDelSpec.length) {
                return s;
                // prazdnu specifikaciu ignorujeme
            }
            if (pDelSpec.length <= 3) {
                pDelSpec = pDelSpec.replace(/\**$/, '');
                // odmazat '*' od konca retazca
            }
            if (pDelSpec.length < 1) {
                i3.abort('Marc.delTag1: parameter tag invalid (after * strip)');
            }
            var ret = [];
            var nTL = pDelSpec.length;
            var s1Comp;
            Ext.each(s, function(s1) {
                // 12.07.11 on; zruseny trimb, dochazelo k odmazavani mezer na konci subtagu (problem u kodovanych udaju)
                // medzery od konca odmazeme vzdy; eventualne medzery na zaciatku ponechame (i ked by tam aj tak nemali byt)
                //s1 = s1.trimb();
                s1Comp = s1;
                //                                    cast, kt. ideme porovnavet
                // ak je delspec 3 alebo menej znakov porovnavame len dany pocet, inak porovnavame cely string
                if (nTL <= 3) {
                    s1Comp = s1.substring(0, nTL);
                }
                // 10.01.11 on; nesmi tu byt kontrola na prazdny retezec, protoze se v infovetach ztracely prazdne radky
                //if ((s1 === '') || (s1Comp === pDelSpec)) {
                if (s1Comp === pDelSpec) {
                    return;
                }
                ret.push(s1);
            });
            return ret;
        };
        // ak bol parameter typu string, skonvertujme na jednoprvkove pole, zjednodusi sa nam spracovanie
        if (typeof psTag === 'string') {
            psTag = [psTag];
        }
        // pre kazdy prvok specifikacie, vykonat vymaz
        var s = this.data;
        Ext.each(psTag, function(pTag1) {
            s = delTag1(s, pTag1);
        });
        this.data = s;
    },
    /** Nastavenie zadaneho zoznamu riadkov

     @param {String/Array} psLine pridavany MARC riadok alebo pole s riadkami.
     <br>
     23.01.09 rs; oprava kontrolnej slucky (preverovat ma psLine a nie existujuce data)
     */
    appendTag: function(psLine) {
        if (typeof psLine === 'string') {
            if (psLine === '') {
                return;
            }
            this.data.push(psLine);
            return;
        }
        // je to pole
        var i, s = psLine;
        // poistka na platnost parametrov
        for (i = 0; i < s.length; i++) {
            if (s[i].length > 0) {
                continue;
            }
            i3.abort('Marc.appendTag: psLine is array and [' + i + '] is blank');
        }
        // pridat riadky k existujucim datam
        this.data = this.data.concat(psLine);
    },
    /**
     * Nastavenie riadku, alebo zoznamu riadkov
     * funguje tak, ze najde vytvori zoznam idenfifikatorov tagov z psLine
     * a zavola delTag()
     * potom prida poskytnute riadky na koniec "data"
     *
     * @param {String/Array} psLine - zoznam riadkov na nastavenie. Vsetky tagy vyskytujuce sa v psLine
     *                       nudu najskor zo zaznamu odmazane a potom sa zadane riadky pridaju na koniec
     *                       zaznamu.
     */
    setTag: function(psLine) {
        var i, s;
        if (typeof psLine === 'string') {
            if (psLine === '') {
                return;
            }
            this.delTag(psLine.substring(0, 3));
            this.data.push(psLine);
            return;
        }
        // je to pole
        // poistka na platnost parametrov
        var oTagL = [],
            oTagL2 = [],
            sTag, sLine;
        s = psLine;
        // prejdeme pole a kontrolujeme ci neobsahuje prazdne riadky
        for (i = 0; i < s.length; i++) {
            sLine = s[i];
            if (sLine.length === 0) {
                i3.abort('Marc.setTag: psLine is array and [' + i + '] is blank');
            }
            // cislo tagu
            sTag = sLine.substring(0, 3);
            // nachadza sa ako index v poli "2"?
            if (oTagL2[sTag]) {
                continue;
            }
            // ak nie pridame ho do oboch poli (jednoducha optimalizacia)
            oTagL2[sTag] = true;
            oTagL.push(sTag);
        }
        this.delTag(oTagL);
        // pridat riadky k existujucim datam
        this.data = this.data.concat(psLine);
    },
    /**
     * Najst tagy zodpovedajuce zadanej specifikacii.<br><br>
     *
     * Metoda je staticka - t.j. moze sa pouzit aj mimo instanciu zaznamu.
     * Teda ak mame napr. object 'a' triedy 'i3.Marc', mozeme pouzit a.getSubTagStr alebo aj
     * i3.marc.getSubTagStr.
     *
     * @param {String} psTagST
     *   Specifikacia. Moze byt bud 3 pismena tag, alebo 4 pismena tag+podpole
     *   Tag moze mat na druhej alebo na druhej a tretej pozicii "*" - napr. "7**" alebo "7**c" je OK
     *   Nie je podporovana kombinacia "***" alebo "7*0".
     *
     * @param {Integer} pC  Nepovinny parameter urcujuci, ktore opakovania sa maju spracovat.
     *    0 - najst prve opakovanie tagu (alebo prve opakovanie podpola z
     *        prveho opakovania tagu. Ak je pouzite podpole - vzdy berie len prve
     *        opakovanie tagu. Ak chceme vsetky opakovania podpola, je nutne pouzit
     *        specifikaciu bez podpola + c==-1 a nasledne getSubTagStr().
     *        Hodnota 0 je default.<br><br>
     *
     *   -1 - Najst vsetky opakovania tagu pripadne tagu+podpola.
     *        Navratova hodnota je vzdy pole (aj ak sa najde len jeden, alebo ziadny udaj).
     *        Specifikacia tag: vrati vsetky opakovania daneho tagu.
     *        Specifikacia tag+podpole: vsetky opakovania daneho podpola zo vsetkych
     *        opakovani tagu.
     *
     *  @return {String/Array}
     *      Ak je pC===0, navratova hodnota je string.
     *      Ak je pC===-1,navratova hodnota je pole, vzdy sa vratia vsetky opakovania.
     *
     */
    getTag: function(psTagST, pC) {
        var s = this.data,
            sTag = psTagST.substring(0, 3),
            sST = psTagST.substring(3, 4),
            i, c, ret, s1, cTagLen;
        if (pC === undefined) {
            pC = 0;
        } // default
        if ((psTagST.length !== 3) && (psTagST.length !== 4)) {
            i3.abort('i3.Marc.getTag: invalid value of psTagST (should be 3 or 4 chars)');
        }
        if ((pC !== 0) && (pC !== -1)) {
            i3.abort('i3.Marc.getTag: invalid value of \'pC\' parameter');
        }
        ret = (pC === 0) ? '' : [];
        // vysledkom je bud pole (pC!=0) alebo string
        if (!s.length) {
            return ret;
        }
        // toto uz by malo byt ok (je preverene vyssie)
        if (sTag.length !== 3) {
            i3.abort('i3.Marc.getTag1');
        }
        if ((sST.length !== 0) && (sST.length !== 1)) {
            i3.abort('i3.Marc.getTag2');
        }
        sTag = sTag.replace(/\**$/, '');
        // odmazat '*' od konca retazca
        if (sTag.length < 1) {
            i3.abort('i3.Marc.getTag3');
        }
        c = s.length;
        cTagLen = sTag.length;
        // slucka cez vsetky riadky zaznamu
        for (i = 0; i < c; i++) {
            s1 = s[i];
            if (s1.substring(0, cTagLen) === sTag) {
                // pokial je pC===0, staci nam prva najdena hodnota
                if (pC === 0) {
                    ret = s1;
                    break;
                }
                // inak berieme vsetky do pola
                ret.push(s1);
            }
        }
        // pre pC===0 vraciame prvy najdeny riadok (alebo '' ak sa nic nenaslo)
        // alebo prve podpole z prveho riadka
        if (pC === 0) {
            return (sST === '') ? ret : this.getSubTagStr(ret, sST);
        }
        // OK sme v multiline verzii - ak nie je zadane podpole - vraciame pole
        // s najdenymi hodnotami (pole moze by prazdne)
        if (sST === '') {
            return ret;
        }
        return this.getSubTagStr(ret, sST, -1);
    },
    /**
     * Prepoklada ako parameter jeden riadok, alebo zoznam riadkov
     *  hlada bud prvy vyskyt, alebo vsetky vyskyty daneho podpola.
     *
     * @param {String} psLine Jeden riadok (ako string).
     *          zoznam riadkov (ako pole)
     * @param {String} psST Jednoznakovy retazec obsahujuci podpole.
     *          Podporuje navyse tieto specialne hodnoty:<br>
     *          '.' : vrati datovu cast tagu (plati aj pre tagy, kt. nie su 0xx)<br>
     *          'i1','i2': vrati prislusny indikator
     * @param {Integer} pC Ktore vyskyty vratit
     *
     * @return {String/Array} Pokial je pC===0 - vysledkom je string, prvy vyskyt najdeneho podpola, alebo '' (prazdny retazec).<br>
     *          Pokial je pC===-1 - hladame vsetky vyskyty daneho podpola. Vysledkom je pole.
     *          Ak sa nenajdu ziadne vyskyty, vysledkom bude pole s poctom prvkov 0.
     */
    getSubTagStr: function(psLine, pST, pC) {
        var ret, i, fld;
        if ((pST.length !== 1) && (pST !== 'i1') && (pST !== 'i2')) {
            i3.abort('i3.Marc.getSubTagStr: invalid value of parameter pST');
        }
        if (pC === undefined) {
            pC = 0;
        }
        if ((pC !== 0) && (pC !== -1)) {
            i3.abort('i3.Marc.getSubTagStr: invalid value of \'pC\' parameter');
        }
        // default return value
        ret = (pC === 0) ? '' : [];
        // getSubTagStr ma 2 sposoby pouzitia
        // psLine je bud pole riadkov, alebo jeden riadok
        // Ak sa jedna o pripad, ze sme dostali pole - proste na kazdu cast zavolame
        // getSubTagStr rekurzivne a vysledok podla potreby spojime.
        if (typeof psLine !== 'string') {
            // parametrom je pole
            for (i = 0; i < psLine.length; i++) {
                ret = ret.concat(this.getSubTagStr(psLine[i], pST, pC));
                // ak chceme len jedno opakovanie a uz ho mame, mozeme skoncit
                if ((pC === 0) && (ret.length > 0)) {
                    break;
                }
            }
            return (pC === 0) ? ret[0] : ret;
        }
        // OK parametrom je jeden riadok - takze najst prve opakovanie alebo
        // vsetky opakovania daneho podpola na danom riadku
        // na ziaciatku poriesime specialne podpole '.', ktore vracia datovu cast tagu
        // normalne ma vyznam len na tagy 0xx, ale to tu neriesim
        // detto nemam moc vyznam volat s pC!=0, ale ani to tu neriesim
        if (pST === '.') {
            fld = psLine.substring(7, psLine.length);
            if (pC === 0) {
                return fld;
            }
            return [fld];
        }
        if ((pST === 'i1') || (pST === 'i2')) {
            i = 3 + (+pST.substring(1, 2));
            // explicitna konverzia na cislo
            fld = psLine.substring(i, i + 1);
            if (pC === 0) {
                return fld;
            }
            return [fld];
        }
        if (!psLine.find(i3.c.SF + pST)) {
            return ret;
        }
        // OK vyzera, ze nieco tam bude
        var flds = psLine.split(i3.c.SF);
        // zaciname na '1' cim preskakujeme prvy index, kde je cislo tagu a podpole
        for (i = 1; i < flds.length; i++) {
            fld = flds[i];
            if (fld.substring(0, 1) !== pST) {
                continue;
            }
            // hodnota podpola + trim
            fld = fld.substring(1, fld.length);
            // 14.06.12 on; uplne zruseny trim - protoze dochazelo k modifikaci zaznamu, ktere mely na konci mezery napr. v kodovanych udajich
            //              viz. napr. zaznam c070876 na VY (tag 230)
            // 27.01.12 on; trim -> trimb
            //fld = fld.trimb();
            // ak ma prazdnu hodnotu - ignorujeme ho
            if (fld === '') {
                continue;
            }
            // Ok nasli sme neprazdny vyskyt - ak nam staci jeden vysledok mame hotovo
            if (pC === 0) {
                return fld;
            }
            // inak pridame do vysledku a pokracujeme
            ret.push(fld);
        }
        return ret;
    },
    /**
     * Nastavenie zadaneho podpola v MARC riadku na danu hodnotu (resp. hodnoty)
     * Ak sa povodne podpole v riadku nenachadzalo, vlozi sa na koniec riadka.
     * Ak sa povodne nachadzalo, vlozi sa na miesto kde sa naslo prve opakovanie zadaneho
     * podpola v riadku.<br><br>
     *
     * Metoda je staticka - t.j. moze sa pouzit aj mimo instanciu zaznamu.
     * Teda ak mame napr. object 'a' triedy 'i3.Marc', mozeme pouzit a.setSubTagStr alebo aj
     * i3.marc.setSubTagStr.
     *
     * 15.04.09 rs; oprava prace s indikatormi<br>
     * 25.03.09 rs; oprava prace s tagmi '00x' (osetrenie defaultov)<br>
     * 25.03.09 rs; oprava prace s indikatormi (preklep, nastavenie hodnoty, defaulty)<br>
     *
     * @param {String} psLine     Marc riadok.
     * @param {String} pST        Jednoznakovy identifikator podpola.<br>
     *                            alebo nasledovne specialne podpolia:<br>
     *                            '.': nahradenie celej datovej casti (moze sa pouzit aj na ine ako 00x tagy)<br>
     *                            'i1','i2': nahradenie zadaneho indikatora
     * @param {String/Array} pValue     pValue moze byt single hodnota (string) alebo pole stringov (opakovania podpola).
     *							Ak je pValue prazdny retazec, alebo prazdne pole, alebo pole obsahujuce
     *							jeden prazdny prvok - podpole sa z riadku vymaze.<br><br>
     *
     *							Ak je pValue prazdne a zaroven zadane podpole je poslednym podpolom v riadku,
     *							vrati sa prazdny retazec (inak by vznikol neplatny riadok bez podpoli).<br><br>
     *
     *							Ak je pValue pole a obsahuje viac ako jeden prvok, nemal by byt ziaden z prvkov
     *							prazdny.
     * @param {String} pDefaultVal
     *                           Defaultne hodnoty, kt. sa uplatnia, ak je prazdny psLine a neprazdne hodnoty.
     *                           Moze mat nasledovne formaty (podla ##class(MARC).setSubTagStr())
     *                           'tag' 'tag medzera i1'  'tag medzera i1 i2'  'tag medzera i1 i2 medzera'.
     *
     * @return {String} Upraveny MARC riadok
     */
    setSubTagStr: function(psLine, pST, pValue, pDefaultVal) {
        var sValueStr;
        // vlozena hodnota ako retazec
        var SF = i3.c.SF;
        // pomocny lokalny odkaz na SF delim
        var s, i, sFlds;
        // riadok rozlozeny na podpolia
        var sFld;
        // jedno podpole s hodnotu
        var sST;
        // podpole z sFld
        var sFldsN;
        // pole vysledneho riadku
        //
        // poriesenie defaultov (ak bol vstup prazdny a default bol zadany)
        if ((psLine === '') && (pDefaultVal !== undefined)) {
            // ak je psLine prazdne & mame zadane default value
            psLine = pDefaultVal;
            // tvar 'tag'
            if (psLine.length === 3) {
                psLine += '  ';
            }
            // tvar 'tag i1'
            if (psLine.length === 5) {
                psLine += ' ';
            }
            // tvar 'tag i1i2'
            if (psLine.length === 6) {
                psLine += ' ';
            }
        }
        // nahradenie celej datovej casti
        // 07.04.09 rs; prehodenie tejto casti az za poriesenie defaultov
        if (pST === '.') {
            // specialna vynimka pre 00x tagy bez podpoli
            // mala by sa pouzit len na tagy bez podpoli, ale tu to neriesim, proste
            // len 1:1 nahradim zadanu cast
            if (pValue === '') {
                return '';
            }
            // ocakava sa tvar: '999 .. '
            s = psLine.substring(0, 7);
            return s + pValue;
        }
        // indikatory
        if ((pST === 'i1') || (pST === 'i2')) {
            i = 3 + (+pST.substring(1, 2));
            // 25.03.09 rs; oprava chybky sST na pST
            // odmazat medzery a znormalizovat dlzku na prave jeden znak
            pValue = pValue.trim().substring(0, 1);
            if (pValue === '') {
                pValue = ' ';
            }
            // vymenit prave jeden znak indikatora
            return psLine.substring(0, i) + pValue + psLine.substring(i + 1, 99999);
        }
        // kontroly parametrov
        i3.assert(pST.length === 1, 'Marc.setSubTagStr: invalid value for pST');
        i3.assert(psLine.length >= 7, 'Marc.setSubTagStr: invalid value for psLine (shorter than 7 chars)');
        // previest pValue na tvar vhodny pre vlozenie do zaznamu
        if (typeof pValue === 'string') {
            // 14.06.12 on; uplne zruseny trim - protoze dochazelo k modifikaci zaznamu, ktere mely na konci mezery napr. v kodovanych udajich
            //              viz. napr. zaznam c070876 na VY (tag 230)
            // 27.01.12 on; trim -> trimb
            //s = pValue.trimb();
            s = pValue;
        } // single
        else {
            if (pValue.length === 1) {
                // 14.06.12 on; uplne zruseny trim - protoze dochazelo k modifikaci zaznamu, ktere mely na konci mezery napr. v kodovanych udajich
                //              viz. napr. zaznam c070876 na VY (tag 230)
                // 27.01.12 on; trim -> trimb
                //s = pValue[0].trimb();
                s = pValue[0];
            } else {
                // viacprvkove pole - najprv poistka na predpoklad neprazdnych hodnot
                for (i = 0; i < pValue.length; i++) {
                    i3.assert(pValue[i].length > 0, 'Marc.setSubTagStr: pValue is array and some value[' + i + '] is blank');
                }
                // zlozime do retazca
                // 14.06.12 on; uplne zruseny trim - protoze dochazelo k modifikaci zaznamu, ktere mely na konci mezery napr. v kodovanych udajich
                //              viz. napr. zaznam c070876 na VY (tag 230)
                // 27.01.12 on; trim -> trimb
                //s = pValue.join(SF + pST).trimb();
                s = pValue.join(SF + pST);
            }
        } // verzia multivalue
        sValueStr = (s.length > 0) ? (pST + s) : '';
        // ak sa podpole v riadku povodne nenachadzalo, proste ho pripojime na koniec riadku
        if (psLine.indexOf(i3.c.SF + pST) === -1) {
            // hodnotu podpola pripojit len ak je neprazdne (inak by pripojilo len znak podpola)
            if (sValueStr !== '') {
                psLine = psLine + SF + sValueStr;
            }
            return psLine;
        }
        // podpole sa uz v riadku nachadzalo
        sFlds = psLine.split(SF);
        // rozdelit na podpolia
        sFldsN = [sFlds[0]];
        // inicializovat vysledkove pole
        // zaciname na '1' cim preskakujeme prvy index, kde je cislo tagu a podpole
        for (i = 1; i < sFlds.length; i++) {
            sFld = sFlds[i];
            sST = sFld.substring(0, 1);
            // prvy znak je podpole
            if (sST === pST) { // je to hladane podpole?
                // ak je to hladane podpole a uz nemame co vlozit, tak koncime (a nevlozime
                // do sFldsN)
                if (sValueStr.length === 0) {
                    continue;
                }
                // inak vlozime hodnotu celeho podpola (aj viac opakovani naraz, ak treba)
                sFld = sValueStr;
                // a odmazeme lokalnu reprezentaciu vkladaneho podpole
                sValueStr = '';
            }
            sFldsN.push(sFld);
        }
        // ak sme odmazali posledne podpole, vratime prazdny riadok
        if (sFldsN.length < 2) {
            return '';
        }
        return sFldsN.join(SF);
    },
    /**
     * Vstup zaznamu ako string, vrati pole, tak ako ho potrebujeme
     * pre property 'data' (t.j. pole)
     * +vymena $$ za $c(31).<br><br>
     *
     * Vysledkom je naplnena property data (povodny obsah data sa nahradi).
     *
     * @param {String}    s        Retazec ktorym chceme naplnit property data
     * @param {Boolean}   pbSFFix  True alebo false, ci na vstupe previest "$"+"$" na ASCII 31
     *
     */
    setDataStr: function(s, pbSFFix) {
        // 26.08.10 on; zamena na kompletnim zaznamu zpusobovala problemy
        //              nebude se provadet v polich 00x a UN_100
        /*if (pbSFFix) {
         s = s.strswap('$$', i3.c.SF);
         }*/
        this.data = s.split('\n');
        // 26.08.10 on; presunute sem
        if (pbSFFix) {
            var i;
            for (i = 0; i < this.data.length; i++) {
                // 04.02.16 on; pouze pokud nejde o prebiraci formular (CMCONFIG_DFLTI_)
                // neswapovat pole 00x
                if ((this.data[i].substring(0, 2) === '00') && (this.t001.substring(0, 15) !== 'CMCONFIG_DFLTI_')) {
                    continue;
                }
                // neswapovat pole UN_100
                if ((this.classn.toLowerCase().indexOf('uncat') >= 0) && (this.classn.substring(this.classn.length - 1, this.classn.length) !== 'H') && (this.data[i].substring(0, 3) === '100')) {
                    // swapovat jen pokud jsou jako oddelovace $$
                    if (this.data[i].substring(7, 9) === '$$') {
                        this.data[i] = this.data[i].substring(0, 7) + i3.c.SF + this.data[i].substring(9, 9999);
                    }
                } else {
                    this.data[i] = this.data[i].strswap('$$', i3.c.SF);
                }
            }
        }
    },
    /**
     * Konverzia obsahu objektu na string, volitelne pridanie 001
     *
     * @param {Boolean} pbSFFix: ci previest $c(31) na $$
     */
    dataToStr: function(pbSFFix) {
        var s = this.data.join('\n');
        // $ u replace musi byt zdvojeny (pouziva sa na placeholdery $1, $2, ..)
        if (pbSFFix) {
            s = s.strswap(i3.c.SF, '$$');
        }
        return s;
    },
    /**
     * Zoberie 'data' z aktualneho objektu
     * a prevedie ich do tvaru, v akom budeme zaznam odosielat pri WS update requeste.<br><br>
     *
     * Vracia objekt s properties "record" a "record_len"
     * Podla dlzky zaznamu bude "record" bud string alebo pole stringov.<br><br>
     *
     * Volajuca metoda by potom properties vrateneho objektu mala 1:1 prekopirovat
     * do URL parametrov pre WS update request.
     *
     * @param {Boolean| bAddT001 Nepovinny parameter, ci do zaznamu pridat aj 001-ku.
     */
    dataToWsRecord: function(bAddT001) {
        // pokial je pozadovane pridame aj 001-ku do zaznamu
        if (bAddT001) {
            this.setTag('001    ' + this.t001);
        }
        var li = this.data;
        // riadky zaznamu
        var c = li.length;
        // pocet riadkov zaznamu
        var nMAX_PGLEN = 10000;
        //
        // max. dlzka jedneho "record" bloku pre WS sluzbu
        // limit je 32 kbyte, ale musime pocitat, ze zaznam v utf8
        // nabobtna (a tu je este limit v znakoch (nie byte))
        var sPg = '';
        // data jedneho bloku
        var nRecLen = 0;
        // total length of the record in chars
        var li1;
        // one record line
        var ret = [];
        // vysledok (cast record)
        // prejdi vsetky riadky
        var i;
        for (i = 0; i < c; i++) {
            li1 = li[i];
            // jeden riadok
            // 03.03.10 on; odstrani znak CR (\x0D) z konce radku - je to nutne pri ulozeni INFOvety z IE
            //              na konci je znak CR, ktery se pri ulozeni zmeni na mezeru, u FF funguje korektne
            li1 = li1.strswap('\r', '');
            // presiahla by sa pridanim aktualneho riadka dlzka "page" bloku?
            if ((sPg !== '') && ((li1.length + sPg.length) > nMAX_PGLEN)) {
                // ano zapisat blok & resetnut 'sPg' + zvysit pocitadlo sufixu
                ret.push(sPg);
                nRecLen += sPg.length;
                sPg = '';
            }
            if (sPg !== '') {
                sPg = sPg + '\n';
            }
            sPg = sPg + li1;
        }
        // last page
        if (sPg !== '') {
            ret.push(sPg);
            nRecLen += sPg.length;
        }
        return {
            record: (ret.length > 1 ? ret : ret[0]),
            record_len: nRecLen
        };
    },
    /**
     * Vyplnit stringovu template hodnotami tagov zo zaznamu
     * Priklad sablony (prefix 'UNH'): ' xxxx {UNH_200a} ... {UNH_210b} ..'
     * Da sa pouzit napr. pre potvrdenky.
     *
     * @param {String} pTplPrefix   Prefix may tagov (napr. 'UNH').
     * @param {String} pTplTx       Text sablony.
     *
     * @return {String} Vyplnena sablona.
     *
     */
    fillTemplate: function(pTplPrefix, pTplTx) {
        // pole rozdelime na prefixe
        var aList = pTplTx.split('{' + pTplPrefix + '_'),
            i, s, sFld, sFldVal;
        // prejst vsetky prvky mimo prveho
        for (i = 1; i < aList.length; i++) {
            s = aList[i];
            sFld = s.piece('}', 1);
            // malo by mat tvar '999x' (t.j. tag a popdpole)
            if (sFld.length !== 4) {
                continue;
            } // ak je dlzka ina ako 4 ignorujeme
            sFldVal = this.getTag(sFld);
            // vyhodnotime obsah pola pre vymenu
            aList[i] = sFldVal + s.substring(sFld.length + 1, s.length);
            // a zamenime
        }
        // spojime bez oddelovaca
        return aList.join('');
    },
    /**
     * Vrati pozadovany ZF
     */
    getDF: function(psDF) {
        var i, o;
        if (!this.zf) {
            return '';
        }
        // prejst vsetky prvky mimo prveho
        for (i = 0; i < this.zf.length; i++) {
            o = this.zf[i];
            if (o && (o.name === psDF)) {
                return o.data;
            }
        }
        // nic nenasel
        return '';
    }
};
// staticke metody
// (musia byt mimo prototypu, aby sa dali pouzivat aj nezavisle na instancii)
//
Ext.apply(i3.Marc, {
    getSubTagStr: i3.Marc.prototype.getSubTagStr,
    setSubTagStr: i3.Marc.prototype.setSubTagStr
});
/**
 * @class i3.DataFmt
 * @singleton
 *
 * Implementacia konverzie MARC do linearnej datovej struktury vhodnej pre pracu vo formularoch a naspat.<br><br>
 *
 * Dokumentacia konfiguracneho pola pre konverziu.<br>
 *
 * Jedna sa o pole hodnot. Kazdy prvok moze byt bud string alebo objekt.<br>
 * 1, string: toto sa pouziva pre jednoduche pripady neopakovatelnych tagov (podpole moze byt opakovatelne)<br>
 * 2, objekt: opakovatelny tag alebo skupina tagov.<br><br>
 *
 *    Definovane option hodnoty:<br>
 *
 *      <b>tag</b>: povinne - tag, ktoreho opakovania ideme citat. v pripade skupiny (napr. udalosti u muzei)
 *           sa jedna o riadiaci tag.<br>
 *           Priklad: '400'<br><br>
 *
 *      <b>subfields</b>: povinne - zoznam podpoli, ktore sa budu citat. Podpolia, ktore budu mat prazdnu hodnotu
 *           sa do liner verzie zapisu ako prazdne.
 *           Podpolia, ktore budu v datach navyse sa aktualne ignoruju.<br>
 *           Priklad: ['i2', 'a', 'i', '8']<br><br>
 *
 *      <b>suffixFld</b>: volitelne - v pripade, ze chceme opakovania daneho tagu rozdelit na viac skupin
 *           sem uvedieme podpole, podkla ktoreho sa bude grupovanie robit. Hodnota uvedeneho podpola
 *           sa potom pouzije ako suffix nazvu property objektu linear verzie, ktore bude nniest data skupiny.
 *           Indikatory sa uvedu ako i1/i2.<br>
 *           Priklad: 'i1'<br><br>
 *
 *      <b>suffixValues</b>: volitelne, resp. povinne ak sa pouzije suffixFld. Jedna sa o pole povolenych/definovanych
 *           suffixov. Na precitane hodnoty sa aplikuje trim, takze napr. u indikatora hodnotu "medzera" zapiseme
 *           ako ''.<br>
 *           Priklad: ['0', '1', '2', '']<br>
 *           Potom pre tag 'C03' nazvy poli budu 'tC030','tC031','tC032','tC03'.<br>
 *           V pripade, ze vstupujuce opakovanie tagu ma hodnotu v podpoli suffixFld inu, nez su povolene hodnoty
 *           v poli suffixValues, pouzije sa suffix ''.
 *           Teda nazov prvku pre i1='-' by bol 'tC03' (a to aj v pripade, ze by sa hodnota '' v suffixValues neuviedla.
 *           Ako posledny prvok sa moze uviest hodnota '*' - tato vyhovie vsetkym vstupnym hodnotam (a moze sa dalej
 *           prelozit na iny string v suffixValuesInt).<br><br>
 *
 *      <b>suffixValuesInt</b>: prekladove pole k suffixValues. Pouzije sa pre pripady, kedy hodnoty suffixu precitane priamo
 *           z dat nie su vhodne aku suffixy nazvov premennych.<br>
 *           Priklad: ['A', 'B', 'C', 'D']<br>
 *           Potom pre tag 'C03' nazvy poli budu 'tC03A','tC03B','tC03C','tC0D'<br><br>
 *
 *      <b>suffixFormName</b>: dalsi mozna podminka k suffixValues. Pouziva se pokud neni hodnota suffixValues jedinecna v cele aplikaci,
 *           ale pouze v ramci formulare. Pokud je zadana, musi krome hodnoty v suffixValues odpovidat i nazev defaultniho formulare (C99d) viz. INTERPI.
 *           Priklad: suffixFormName : ['DFLT_INTERPI_O' , 'DFLT_INTERPI_O' , 'DFLT_INTERPI_K' , 'DFLT_INTERPI_K' ]<br>
 *
 *      <b>fldNameFn</b>: function(pLine)<br>
 *           Funkcia, ktora dostane aktualny Marc riadok a ma vratit string nazov pola.<br><br>
 *
 *      <b>oconvFn</b>:   function(pLinRec)<br>
 *           Funkcia, ktora dostane cely linear record a ma vratit zoznam Marc riadkov.<br>
 *
 *
 */
i3.DataFmt = {
    /* Konverzia z MARCu *******************************************************************************
     *
     ********************/
    tx: {
        txWarning: 'Varovanie#Varování#Warning###تحذير'.ls(),
        txTagChange: 'Došlo ku zmene v tagu #Došlo ke změně v tagu #Change in tag ###تغيير في العلامة '.ls(),
        txOrigTag: 'Pôvodný obsah: #Původní obsah: #Original content: ###المحتوى الأصلي: '.ls(),
        txNewTag: 'Nový obsah: #Nový obsah: #New content: ###المحتوى الجديد: '.ls(),
        txTagLost: 'Došlo ku strate tagu #Došlo ke ztrátě tagu #Lost of tag ###فقدان العلامة '.ls(),
        txContact: 'Neukladajte prosím záznam a kontaktujte správcu!#Neukládejte prosím záznam a kontaktujte správce!#Please don\'t save this record and contact administrator!###الرجاء عدم حفظ هذا السجل كبيانات اتصال مدير!'.ls()
    },
    /**
     * Uprava hodnoty precitanej z MARC zaznamu pre zobrazenie vo formulari (t.j. pre prevod z MARC
     * string value na string pre linearnu verziu zaznamu.
     * Toto je tiez viac/menej interna funkcia, ale dala by sa vyuzit aj zvonka.
     *
     * @param {String} s
     */
    fixMarcValue: function(s) {
        s = s.strswap('\\n', '\n');
        // 12.07.11 on; zruseny trim, dochazelo k odmazavani mezer na konci subtagu (problem u kodovanych udaju)
        //s = s.trim();
        return s;
    },
    /** Precitat subtag z MARC-line a zapisat do vysledkoveho pola do zadaneho fieldu
     * @private
     *
     * @param {Object} pRes       Linearna verzia zaznamu.
     * @param {Object} psLine     MARC riadok.
     * @param {Object} psFldName  Nazov pola.
     * @param {Object} psTag      Cislo resp. text tagu.
     * @param {Object} psSTag     Podpole.
     */
    getSTValue: function(pRes, psLine, psFldName, psTag, psSTag) {
        // precitat podpole so vsetkymi opakovaniami
        var sData = '';
        if (psLine !== '') {
            sData = i3.Marc.getSubTagStr(psLine, psSTag, -1);
            // ak je vysledkom jednoprvkove pole, skonvertovat na jednoduchu stringovu hodnotu
            if (sData.length === 1) {
                sData = sData[0];
                // 26.01.12 on; vyjimka pro indikatory, v aplikaci webove katalogizace byl pred problem:
                //              v zaznamu nemusi byt indikator vyplneny napr. 260    $$a$$b$$c
                //              a pritom v ciselniku indikatoru je povolen indikator prazdny napr.
                //              STABLE_US_T260I1
                //              201    $$a$$bNeaplikovateľné/Informácia neposkytnutá/Najskorší vydavateľ#Neuvádí se/První nakladatel#Not applicable/No information provided/Earliest available publisher
                if ((sData === ' ') && ((psSTag === 'i1') || (psSTag === 'i2'))) {
                    sData = '';
                }
            }
        }
        // prazdne pole ulozit ako prazdny string
        if (sData.length === 0) {
            sData = '';
        }
        // 08.04.09 rs; docasne zmena - ukladat aj prazdne hodnoty
        //if ((sData === '') || (sData.length === 0)) {
        //  return '';
        //} // no data
        // na kazdu hodnotu precitanu z MARC zaznamu aplikovat MARC input conversion
        if (Ext.isArray(sData)) {
            Ext.each(sData, function(s, i) {
                sData[i] = this.fixMarcValue(sData[i]);
            }, this);
        } else {
            sData = this.fixMarcValue(sData);
        }
        pRes[psFldName] = sData;
        return '';
    },
    /**
     * @private
     *
     * Precitat tag+subtag z MARC a zapisat do vysledkoveho pola do zadaneho fieldu
     */
    getTagSTValue: function(pRes, pMarc, psFldName, psTag, psSTag) {
        // 14.01.22 on; kontrola
        if ((!pMarc) || (!pMarc.getTag)) {
            return '';
        }
        var sLine = pMarc.getTag(psTag);
        // 08.04.09 rs; docasne zmena - ukladat aj prazdne hodnoty
        //if (sLine === '') {
        //  return '';
        //} // no data
        return this.getSTValue(pRes, sLine, psFldName, psTag, psSTag);
    },
    /** @private
     * Pre dany MARC riadok a dany konfig prvok pola, vrat aky suffix pouzit pre aktualny
     * nazov pola v linear verzii.
     *
     * @param {Object} pMarcLine1
     * @param {Object} pCfg1
     * @param {Object} pMarc
     */
    fromMarcGetFldSuffix: function(pMarcLine1, pCfg1, pMarc) {
        var sSuffixTx = '',
            sFormName = '',
            that;
        if (pCfg1.suffixFld && pCfg1.suffixValues) {
            that = this;
            // precitat obsah pola so suffixom
            sSuffixTx = i3.Marc.getSubTagStr(pMarcLine1, pCfg1.suffixFld).trim();
            sFormName = pMarc.getTag('C99d');
            // poznacime si index pouziteho suffixu, toto zaroven posluzi aj ako 0/1 ci nejaka hodnota vyhovela
            var bUsedSuffixIdx = null;
            // slucka cez vsetky platne hodnoty suffixu
            Ext.each(pCfg1.suffixValues, function(pSuffix, pSuffixIdx) {
                // aktualna hodnota suffix pola sa nasla v poli? alebo je aktualna hodnota z pola '*'?
                // -> poznac si index
                // 15.11.12 on; vyjimka pro pole hodnot
                if (Ext.isArray(pSuffix)) {
                    if ((pSuffix.indexOf(sSuffixTx) !== -1) && (that.csIsRightForm(sFormName, pCfg1, pSuffixIdx))) {
                        // remember suffix index used
                        bUsedSuffixIdx = pSuffixIdx;
                        // a ukonci slucku (nasli sme, co sme hladali)
                        return false;
                    }
                } else {
                    if (((pSuffix === sSuffixTx) || (pSuffix === '*')) && (that.csIsRightForm(sFormName, pCfg1, pSuffixIdx))) {
                        // remember suffix index used
                        bUsedSuffixIdx = pSuffixIdx;
                        // a ukonci slucku (nasli sme, co sme hladali)
                        return false;
                    }
                }
            });
            // if suffix got from Marc line is not listed in valid values, then fallback. blank suffix will be used
            if (bUsedSuffixIdx === null) {
                sSuffixTx = '';
            }
            // ak je definovane prekladove pole a mame znamy index (t.j. nejedna sa o fallback)
            // a prekladova hodnota je definovana - pouzi preklad
            if (pCfg1.suffixValuesInt && (bUsedSuffixIdx !== null) && pCfg1.suffixValuesInt[bUsedSuffixIdx]) {
                sSuffixTx = pCfg1.suffixValuesInt[bUsedSuffixIdx];
            }
        }
        return sSuffixTx;
    },
    /**
     * @private
     *
     * Vrati true pokud neni nadefinovano omezni na formular a nebo jde o spravny formular
     *
     * @param {String} psFormName
     * @param {Object} pCfg1
     * @param {Number} pnSuffixIdx
     */
    csIsRightForm: function(psFormName, pCfg1, pnSuffixIdx) {
        if (!pCfg1.suffixFormName) {
            return true;
        }
        return (pCfg1.suffixFormName[pnSuffixIdx] === undefined) || (pCfg1.suffixFormName[pnSuffixIdx] === psFormName);
    },
    /**
     * @private
     *
     * Pre dany MARC riadok a dany konfig prvok pola, vrat aky nazov pola  pouzit pre data v linear verzii.
     *
     * @param {Object} pMarcLine1
     * @param {Object} pCfg1
     * @param {Object} pMarc  // 11.12.12 on;
     */
    fromMarcGetFldName: function(pMarcLine1, pCfg1, pMarc) {
        // nazov pola je bud odvodeny z pola "tag" alebo urceny funkciou fldNameFn()
        if (typeof pCfg1.fldNameFn === 'function') {
            return pCfg1.fldNameFn(pMarcLine1);
        }
        // suffix field defined?
        var sSuffixTx = this.fromMarcGetFldSuffix(pMarcLine1, pCfg1, pMarc);
        return this.fldName(pCfg1.tag, sSuffixTx);
    },
    /**
     * @private
     * Zadany Marc riadok precitat do linerneho tvaru do zadaneho objektu pRes1.
     * Zoznam podpoli je urceny v pCfg1.subfields.
     * Nazov properties do lin.reprezentacie bude odvodeny z cisla tagu (z pCfg1) a aktualneho podpola.
     * Aktualne sa beru aj podpolia s prazdnymi hodnotami.
     *
     * @return error string
     *
     */
    fromMarc_MarcLine2Lin: function(pRes1, pMarcLine1, pCfg1) {
        // pre kazde opakovanie riadku tagu prejst vsetky podpolia a data ulozit do pomocneho objektu
        Ext.each(pCfg1.subfields, function(pST) {
            // nazov property pre tento prvok
            var sFldName = this.fldName(pCfg1.tag, pST);
            // precitat z aktualneho riadku
            var sErr = this.getSTValue(pRes1, pMarcLine1, sFldName, pCfg1.tag, pST);
            i3.assert(sErr === '', 'fromMarc_MarcLine2Lin: sErr === ""');
            // chyby ignorujeme - nemala by nastat (ak hej, zak zastav (ako poistka))
        }, this);
    },
    /**
     * @private
     * Osetrenie nacitania linked tag riadkov.
     * T.j. ak je nastavene linkingFld - precitameho z aktualneho Marc riadka.
     * Ak je neprazdne, potom prejdeme cely linkedCfg a precitame z Marc zaznamu uvedene tagy
     * a najdeme tie opakovania kde sedi uvod linkingFld, tieto potom doplnime do aktualnej "grupy"
     * a *vymazeme* z Marc zaznamu. Riesenie nie je velmi efektivne, ale malo by byt pomerne funkcne.
     * Pitfall delTag tak ako je pouzite je, ze sa nesmu vyskytnut 2 MARC riadky, splnajuce "prilinkovanost",
     * ktore by boli uplne totozne - toto by ale v praxi nemalo mat dovod.
     *
     * @param {Object} pRes1			- linear version of currently read group
     *                                  sem budu pridane udaje z prilinkovanych tagov.
     * @param {Object} pMarcLine1     - Marc line of group control tag
     * @param {Object} pCfg1          - config for current tag
     */
    fromMarc_AddLinkedTags: function(pRes1, pMarcLine1, pCfg1, pMarc) {
        // check if linked field present in the config
        if (!pCfg1.linkingFld) {
            return;
        }
        // je zadany linking field?
        var sLinkingValue = i3.Marc.getSubTagStr(pMarcLine1, pCfg1.linkingFld).trim();
        if (sLinkingValue === '') {
            return;
        }
        // OK process linked tags
        Ext.each(pCfg1.linkedCfg, function(pLCfg1) {
            var sLMarcLines = pMarc.getTag(pLCfg1.tag, -1),
                sLMarcLines2 = [];
            // filter by linking field content
            Ext.each(sLMarcLines, function(pLMarcLine1) {
                var s1 = i3.Marc.getSubTagStr(pLMarcLine1, pCfg1.linkingFld).trim();
                if (s1.substring(0, sLinkingValue.length) === sLinkingValue) {
                    sLMarcLines2.push(pLMarcLine1);
                }
            }, this);
            // now we have array of MARC lines to be added to our group
            Ext.each(sLMarcLines2, function(pLMarcLine1) {
                // discard this line from the Marc record
                pMarc.delTag(pLMarcLine1);
                var s1 = i3.Marc.getSubTagStr(pLMarcLine1, pCfg1.linkingFld).trim();
                // chceme LEN zvysok za hodnotou linked value
                s1 = s1.substring(sLinkingValue.length, 999);
                var sMarcLineFix = i3.Marc.setSubTagStr(pLMarcLine1, pCfg1.linkingFld, s1);
                if (sMarcLineFix === '') {
                    return;
                    // nemalo by nastat
                }
                var aRes1 = {};
                // aktualny MARC riadok nacitat do lin.tvaru do pomocneho objektu
                this.fromMarc_MarcLine2Lin(aRes1, sMarcLineFix, pLCfg1);
                var sFldName = this.fldName(pLCfg1.tag);
                if (!pRes1[sFldName]) {
                    pRes1[sFldName] = [];
                }
                pRes1[sFldName].push(aRes1);
            }, this);
        }, this);
    },
    /**
     * @private
     * Podprogram pre fromMarc. Nemal by sa volat priamo.
     *
     * @param {Object} pRes  - vysledkovy objekt linearizovaneho zaznamu sem pridavame data
     * @param {Object} pCfg1 - jedna konfig option z konfigu
     * @param {Object} pMarc - vstupny zaznam
     *
     */
    fromMarc1: function(pRes, pCfg1, pMarc) {
        var sFldName, sTag, sSTag;
        if (typeof pCfg1 === 'string') {
            sFldName = this.fldName(pCfg1);
            // kod zaznamu je rieseny specialnou vynimkou
            if (sFldName === 't001') {
                pRes[sFldName] = pMarc.t001;
                return '';
            }
            sTag = pCfg1.substring(0, 3);
            // tag
            sSTag = pCfg1.substring(3, 5);
            // subtag (moze byt aj 'i1' alebo 'i2')
            if ((pCfg1.length !== 4) && (sSTag !== 'i1') && (sSTag !== 'i2')) {
                return 'simple string option - length should be 4';
            }
            return this.getTagSTValue(pRes, pMarc, sFldName, sTag, sSTag);
        }
        // cfg. option je objekt
        if (!pCfg1.tag) {
            return 'missing "tag" property';
        }
        if (!pCfg1.subfields) {
            return 'missing "subfields" property';
        }
        // 14.01.22 on; kontrola
        if (!pMarc || (!pMarc.getTag)) {
            return '';
        }
        var sMarcLines = pMarc.getTag(pCfg1.tag, -1);
        if (sMarcLines.length === 0) {
            return '';
            // Ok, but no data
        }
        // od pola oRes1 pozbierame vsetky deklarovane podpolia pre aktualny riadok
        var oRes1;
        // cez vsetky opakovania tagu
        Ext.each(sMarcLines, function(pMarcLine1) {
            oRes1 = {};
            // zistit nazov pre aktalnu skupinu poli
            sFldName = this.fromMarcGetFldName(pMarcLine1, pCfg1, pMarc);
            // 11.06.12 on; odstrani generovane subtagy
            pMarcLine1 = this.csRemoveGenSubtags(pMarcLine1);
            // aktualny MARC riadok nacitat do lin.tvaru do pomocneho objektu
            this.fromMarc_MarcLine2Lin(oRes1, pMarcLine1, pCfg1);
            this.fromMarc_AddLinkedTags(oRes1, pMarcLine1, pCfg1, pMarc);
            // v pripade, ze pole pre tento prvok este nie je zalozene - inicializovat
            if (!Ext.isArray(pRes[sFldName])) {
                pRes[sFldName] = [];
            }
            // zapisat do pomocneho vysledkoveho pola
            pRes[sFldName].push(oRes1);
        }, this);
        return '';
        // OK (=error msg is blank string)
    },
    /**
     * Vstupny bod pre konverziu MARC formatu na interny linearny format.
     *
     * @param {Object}  pCfg   - pole s config parametrami
     * @param {i3.Marc} pMarc  - vstupny MARC zaznam
     * @param {Object}  pErr   - sem sa vratia chyby; hlasenie chyb je *deaktivovane* ak je na vstupe pErr prazdny
     *       objekt. (Inak to totiz nejde - nemozem vytvorit novy objet, pretoze by sa nepredal na vyssiu uroven.)
     *       tx: text chyby
     * @param {boolean} pCheckFields - false/true - kontrolovat ztratu poli pri nacteni do lin. struktury?
     *
     * @return {Object} Objekt s linearizovanym zaznamom podla zadaneho konfigu.
     */
    fromMarc: function(pCfg, pMarc, pErr, pCheckFields) {
        var aMap = pCfg.map;
        var r = {},
            sErr = '';
        // 05.02.14 on; metoda fromMarc1 zmeni pod rukama obsah promenne pMarc, se kterou se muze jeste dal pracovat, proto to tu upravim
        // 12.07.11 on; pro kontrolu ztraty poli si potrebuju uchovat puvodni zaznam, protoze v metode fromMarc1 dochazi k jeho zmene (asi jen pro muzea)
        var oMarc = i3.c.cloneObject(pMarc, true);
        // 05.02.14 on; budu pracovat s oMarc
        // 01.06.12 on; snaha doplnit do mapy tagy, ktere jsou v zaznamu
        // poznaci se vsechny tagy v zaznamu
        //var aRecTagList = this.csGetTagList(pMarc);
        var aRecTagList = this.csGetTagList(oMarc);
        Ext.each(aMap, function(pCfg1, i) {
            // 05.02.14 on; budu pracovat s oMarc
            //sErr = this.fromMarc1(r, pCfg1, pMarc);
            sErr = this.fromMarc1(r, pCfg1, oMarc);
            if (sErr !== '') {
                sErr = 'config option [' + i + ']: ' + sErr;
                return false;
            }
            // 01.06.12 on; poznaci si, ze pole bylo uz pravedeno - pole ze seznamu odstrani
            this.csMergeTagList(aRecTagList, pCfg1);
        }, this);
        // forward error
        if ((sErr !== '') && pErr) {
            pErr.tx = sErr;
        }
        // 05.02.14 on; budu pracovat s oMarc
        // pokud neni pole aRecTagList prazdne, jsou v zaznamu neprevedene tagy, ktere tady prevede
        //this.csConvertRecTagList(r, aRecTagList, pMarc, pErr);
        this.csConvertRecTagList(r, aRecTagList, oMarc, pErr);
        // specialne pomocne polia - zatial experimentalne
        // 04.01.22 on; doplnena podminka pMarc
        if (pMarc && pMarc.classn && (pMarc.classn !== '')) {
            r.classn = pMarc.classn;
            r.lname = i3.className2LName(pMarc.classn);
            r.t001x = r.lname + '*' + r.t001;
        }
        // 22.04.11 on; doplnena konrola, jestli jsou vsechna podpole nadefinovana
        if (pCheckFields) {
            // 05.02.14 on; upravene
            // 12.07.11 on; preda puvodni zaznam
            //this.csCheckFields(pCfg, pMarc, r);
            //this.csCheckFields(pCfg, origMarc, r);
            this.csCheckFields(pCfg, pMarc, r);
        }
        return r;
    },
    /**
     * zjisti, jestli porovnavat tag
     */
    csCompareTag: function(psTag) {
        return (psTag.substring(0, 1) !== 'T') && (psTag.substring(0, 3) !== '001') && (psTag.substring(0, 3) !== '002');
    },
    /**
     * zjisti, jestli porovnavat subtag
     */
    csCompareSubtag: function(psSubtag) {
        // 12.11.15 on; podle vyjadresni tt (a potazmo js) jsou vsechny subtagy s velkym pismenem generovane
        //return (psSubtag !== 'T') && (psSubtag !== 'X') && (psSubtag !== 'Y') && (psSubtag !== 'Z');
        return !((psSubtag >= 'A') && (psSubtag <= 'Z'));
    },
    /**
     * konrola, jestli jsou vsechna podpole nadefinovana.
     *
     * @param {Object}  pCfg   - pole s config parametrami
     * @param {i3.Marc} pMarc  - vstupni MARC zaznam
     * @param {Object} pLinRec  - prevedeny linearni zaznam
     *
     */
    csCheckFields: function(pCfg, pOrigMarc, pLinRec) {
        var sErr = '';
        var aNewRec = [];
        var aOrigRec = [];
        // 14.01.22 on; kontrola
        if (!pOrigMarc) {
            return true;
        }
        var lNewMarc = this.toMarc(pCfg, pLinRec, sErr);
        // 14.06.12 on; po zruseni odmazavani mezer na ponci poli je potreba odfiltrovat prazdne subtagy i z noveho zaznamu
        // odfiltruje ze zaznamu prazdne subtagy - toto je nutne pri pouziti defaultnich formularu
        pOrigMarc = this.csFilterEmptyFields(pOrigMarc, true);
        lNewMarc = this.csFilterEmptyFields(lNewMarc, true);
        // vynechane generovane tagy a subtagy a pole seradi
        this.csFixRecord(pOrigMarc, aOrigRec);
        this.csFixRecord(lNewMarc, aNewRec);
        // projde cely zaznam a zkontroluje, zda se nektery tag lisi
        Ext.each(aOrigRec, function(pLine, i) {
            // 27.01.12 on; pokud se lisi, zkusi zrusit nejdrive mezery na konci podpoli
            //              podminka je tu proto, aby to nedela pokazde -> tagy se lisi vyjimecne
            if (aOrigRec[i] !== aNewRec[i]) {
                // sice zrusi i mezeru za indikatory, ale tady to nevadi
                // 08.04.15 on; podminky
                if (aOrigRec[i]) {
                    aOrigRec[i] = aOrigRec[i].strswap(' ' + i3.c.SF, i3.c.SF);
                    aOrigRec[i] = aOrigRec[i].trimb();
                }
                if (aNewRec[i]) {
                    aNewRec[i] = aNewRec[i].strswap(' ' + i3.c.SF, i3.c.SF);
                    aNewRec[i] = aNewRec[i].trimb();
                }
                if (aOrigRec[i] !== aNewRec[i]) {
                    if (!aNewRec[i]) {
                        // doslo ke ztrate celeho tagu
                        i3.alert(i3.DataFmt.tx.txTagLost + aOrigRec[i].substring(0, 3) + '<br><br>' + i3.DataFmt.tx.txContact);
                    } else if (aOrigRec[i].substring(0, 3) !== aNewRec[i].substring(0, 3)) {
                        // doslo ke ztrate celeho tagu
                        i3.alert( /*i3.DataFmt.tx.txWarning,*/ i3.DataFmt.tx.txTagLost + aOrigRec[i].substring(0, 3) + '<br><br>' + i3.DataFmt.tx.txContact);
                    } else {
                        // doslo ke ztrate subtagu
                        i3.alert( /*i3.DataFmt.tx.txWarning,*/ i3.DataFmt.tx.txTagChange + aOrigRec[i].substring(0, 3) + '<br>' + i3.DataFmt.tx.txOrigTag + aOrigRec[i].strswap(i3.c.SF, '$$') + '<br>' + i3.DataFmt.tx.txNewTag + aNewRec[i].strswap(i3.c.SF, '$$') + '<br><br>' + i3.DataFmt.tx.txContact);
                    }
                    return false;
                }
            }
        });
        return true;
    },
    /*
     * ze zaznamu vynecha generovane tagy a subtagy a zaznam seradi, aby se daly dva zaznamy porovnat
     */
    csFixRecord: function(pMarcRecord, paRecord) {
        var that = this,
            j;
        // 26.08.15 on; podminka
        if (pMarcRecord) {
            // projde vsechny tagy
            Ext.each(pMarcRecord.data, function(pLine, i) {
                // nejde o generovany tag?
                if (that.csCompareTag(pLine.substring(0, 3))) {
                    // pole subtagu
                    var aSubtags = pLine.split(i3.c.SF);
                    var aNewSubtags = [aSubtags[0]];
                    // pres vsechny subtagy (az od druheno prvku)
                    for (j = 1; j < aSubtags.length; j++) {
                        // pokud nejde o generovany subtag porida si ho do pole
                        if (that.csCompareSubtag(aSubtags[j].substring(0, 1))) {
                            aNewSubtags.push(aSubtags[j]);
                        }
                    }
                    // ted musim seradit subtagy podle abecedy, protoze muzou byt v ruznem poradi
                    // prvni cast nebudeme radit
                    var sField1 = aNewSubtags[0];
                    // timto dosahneme, ze bude po serazeni na zacatku
                    aNewSubtags[0] = '';
                    aNewSubtags.sort();
                    // vratimer puvodni hodnotu tagu
                    aNewSubtags[0] = sField1;
                    // spojime tag
                    pLine = aNewSubtags.join(i3.c.SF);
                    // 13.11.15 on; preskocim radky bez subtagu
                    if (pLine.length > 7) {
                        paRecord.push(pLine);
                    }
                }
            });
        }
        // nakonec seradi tagy podle abecedy
        paRecord.sort();
    },
    /**
     * odfiltruje z tagu generovane subtagy
     *
     * @param {string} psTag  - vstupni tag
     *
     * 21.07.22 on; zruseno filtrovani T - vyuziva se ve fakturach (webova katalogizace - 210T)
     * 21.06.12 on; nemuze odfiltrovat vsechny generovane subtagy, protoze minimalne subtag X se pouziva na MUZ pro nazev zdroje
     *              odfiltruje teda pouze subtag T (T by se teoreticky nemuselo filtorvat) a vse co za nim nasleduje, protoze pri prevodu se
     *              zmeni poradi poli a mohly by se subtagy za T dostat do zaznamu
     * 11.06.12 on;
     */
    csRemoveGenSubtags: function(psTag) {
        var flds = psTag.split(i3.c.SF),
            i;
        var line = '';
        var fld;
        if (flds.length > 1) {
            // tag se subtagy     // zaciname na '1' cim preskakujeme prvy index, kde je cislo tagu a podpole
            for (i = 1; i < flds.length; i++) {
                fld = flds[i];
                // 21.07.22 on; subtag T jeste veznu - potrebuju ve fakturach v poli 210T je nazev dokumentu - presunuto niz
                // pokud jde o subtag T, tak skonci s prochazenim, protoze dal nasleduji pouze generovane subtagy
                /*if (this.csIsGenSubtagT(fld[0])) {
                    break;
                }*/
                // 21.06.12 on; subtag X se nesmi filtrovat kvuli C13X na muzeach
                /*else {
                if (this.csIsGenSubtag(fld[0])) {
                continue;
                }
                }*/
                // inak pridame do vysledku a pokracujeme
                line += i3.c.SF + fld;
                // 21.07.22 on; subtag T jeste veznu, ale dal uz nic - potrebuju ve fakturach v poli 210T je nazev dokumentu
                if (this.csIsGenSubtagT(fld[0])) {
                    break;
                }
            }
            if (line !== '') {
                return flds[0] + line;
            }
        }
        return psTag;
    },
    /**
     * odfiltruje ze zaznamu prazdne subtagy a pripadne i generovane subtagy.
     *
     * @param {i3.Marc} pMarc  - vstupni MARC zaznam
     * @param {boolean} pbGenST  - parametr, zda filtrovat i generovane subtagy
     *
     * 11.05.11 on; doplneny parametr pbGenST
     */
    csFilterEmptyFields: function(pMarc, pbGenST) {
        var res = [];
        var that = this;
        Ext.each(pMarc.data, function(pLine, i) {
            var flds = pLine.split(i3.c.SF);
            var line = '';
            var fld;
            if (flds.length > 1) {
                // tag se subtagy
                // zaciname na '1' cim preskakujeme prvy index, kde je cislo tagu a podpole
                for (i = 1; i < flds.length; i++) {
                    fld = flds[i];
                    // 05.06.12 on; doplneny trim (v defaultnim formulari muze podpole obsahujici pouze mezeru)
                    // pokud obsahuje pouze nazev podpole, tak preskakujeme
                    if (fld.trim().length < 2) {
                        continue;
                    }
                    if (pbGenST) {
                        // pokud jde subtag T, tak skonci s prochazim, protoze dal nesladuji pouze generovane subtagy
                        if (that.csIsGenSubtagT(fld[0])) {
                            break;
                        } else {
                            if (that.csIsGenSubtag(fld[0])) {
                                continue;
                            }
                        }
                    }
                    // inak pridame do vysledku a pokracujeme
                    line += i3.c.SF + fld;
                }
                if (line !== '') {
                    res.push(flds[0] + line);
                }
            } else {
                // tag bez subtagu
                res.push(pLine);
            }
        });
        pMarc.data = res;
        return pMarc;
    },
    /**
     * vrati true pokud se jedna o generovany subtag, za kterym nasleduji dalsi generovane subtagy
     *
     * 11.05.11 on;
     */
    csIsGenSubtagT: function(pST) {
        return (pST === 'T');
    },
    /**
     * vrati true pokud se jedna o generovany subtag
     *
     * 11.05.11 on;
     */
    csIsGenSubtag: function(pST) {
        return ((pST === 'X') || (pST === 'Y') || (pST === 'Z') || (pST === 'T'));
    },
    /**
     * vrati true pokud se jedna o generovany tag
     *
     * 01.06.12 on;
     */
    csIsGenTag: function(pTag) {
        return (pTag.substring(0, 1) === 'T');
    },
    /**
     * vrati seznam (pole) tagu ze zadaneho zaznamu
     **/
    csGetTagList: function(pMarc) {
        var res = [];
        //var that = this;
        Ext.each(pMarc.data, function(pLine, i) {
            // cislo tagu a podpola ocakavame tvar 't999x' alebo 't999i1' alebo 't00X.'
            var sTag = pLine.substring(0, 3);
            // 20.03.13 on; Txx tagy nebudeme ignorovat, protoze je potrebujeme kvuli ZF
            // ingoruje tag 002
            //if ((!that.csIsGenTag(sTag)) && (sTag !== '002')) {
            if (sTag !== '002') {
                if (res.indexOf(sTag) === -1) {
                    res.push(sTag);
                }
            }
        });
        return res;
    },
    /**
     * poznaci si, ze pole bylo uz pravedeno - pole ze seznamu odstrani
     *
     * 01.06.12 on;
     **/
    csMergeTagList: function(paRecTagList, pCfg1) {
        var sTag, n;
        if (typeof pCfg1 === 'string') {
            sTag = pCfg1;
        } else {
            sTag = pCfg1.tag;
        }
        n = paRecTagList.indexOf(sTag.substring(0, 3));
        if (n > -1) {
            paRecTagList.splice(n, 1);
            // odstranění 1 prvku od pozice n
        }
    },
    /**
     * pokud neni pole paRecTagList prazdne, jsou v zaznamu neprevedene tagy, ktere tady prevede
     *
     * 04.06.12 on;
     **/
    csConvertRecTagList: function(paLinRec, paRecTagList, pMarc, pErr) {
        var i, sTag, aTagList, aSTList, aMap, sErr;
        // pokud je pole prazdne, skonci
        if (paRecTagList.length === 0) {
            return;
        }
        aMap = [];
        // na zaklade chybejich tagu a marc zaznamu vygeneruje prevodni tabulku
        for (i = 0; i < paRecTagList.length; i++) {
            sTag = paRecTagList[i];
            aTagList = pMarc.getTag(sTag, -1);
            // ziskame seznam podpoli v tagu
            aSTList = this.csGetSTList(aTagList);
            aMap.push({
                tag: sTag,
                subfields: aSTList
            });
        }
        paLinRec.aDifConvMap = aMap;
        // uchova si vygenerovanou prevodni tabulku
        Ext.each(aMap, function(pCfg1, i) {
            sErr = this.fromMarc1(paLinRec, pCfg1, pMarc);
            if (sErr !== '') {
                sErr = 'config option [' + i + ']: ' + sErr;
                return false;
            }
        }, this);
        // forward error
        if ((sErr !== '') && pErr) {
            if (pErr.tx) {
                pErr.tx = pErr.tx + ';' + sErr;
            } else {
                pErr.tx = sErr;
            }
        }
    },
    /**
     * ziskame seznam podpoli v tagu
     *
     * 04.06.12 on;
     **/
    csGetSTList: function(paTagList) {
        var i, j, sTag, aFlds, fld, ret;
        // indikatory tam dame oba
        ret = ['i1', 'i2'];
        // pres vsechny tagy
        for (i = 0; i < paTagList.length; i++) {
            sTag = paTagList[i];
            aFlds = sTag.split(i3.c.SF);
            // 26.10.12 on; pokud jde o tag 00X, doplni do seznamu podpole '.'
            if (sTag.substring(0, 2) === '00') {
                if (ret.indexOf('.') === -1) {
                    ret.push('.');
                }
            } else {
                // zaciname na '1' cim preskakujeme prvy index, kde je cislo tagu a podpole
                for (j = 1; j < aFlds.length; j++) {
                    fld = aFlds[j].substring(0, 1);
                    if (ret.indexOf(fld) === -1) {
                        ret.push(fld);
                    }
                }
            }
        }
        return ret;
    },
    /* **********************************************************************************************************
     * Konverzia do MARCu ***************************************************************************************
     * **********************************************************************************************************
     */
    /**
     * @private
     *
     * Parametrom je bud string alebo pole. Ak je to pole, prejde vsetky prvky a odstrani prazdne hodnoty.
     * Jednoprvkove pole sa prevedie na string.
     *
     * Priklad: ['a','','b'] => ['a','b']
     *          ['a']        => 'a'
     * @param {Object} s
     */
    clearBlanks: function(s) {
        if (s === undefined) {
            return '';
        }
        if (typeof s === 'string') {
            s = this.fixInputValue(s);
            return s;
        }
        i3.assert(Ext.isArray(s), 'clearBlanks: Ext.isArray(s)');
        // predpoklad
        // filter out the blanks
        var s2 = [];
        Ext.each(s, function(pV) {
            // 10.12.20 on; osetreny undefined
            // 23.03.10 on; osetreny null
            if ((pV !== null) && (pV !== undefined)) {
                if (pV.length > 0) {
                    pV = this.fixInputValue(pV);
                }
                if (pV.length > 0) {
                    s2.push(pV);
                }
            }
        }, this);
        // array with no items
        if (s2.length === 0) {
            return '';
        }
        // array with length of 1 item will be converted to string
        if (s2.length === 1) {
            return s2[0];
        }
        return s2;
    },
    /**
     * @private
     *
     * Uprava hodnoty precitanej z formulara. Neskor by sa malo napisat defenzivnejsie - vyhodit vsetko pod ASCII31
     * @param {Object} s
     */
    fixInputValue: function(s) {
        if (typeof s !== 'string') {
            return s;
        }
        s = s.strswap('\n', '\\n');
        s = s.strswap(i3.c.SF, ' ');
        // 12.07.11 on; zruseny trim, dochazelo k odmazavani mezer na konci subtagu (problem u kodovanych udaju)
        //s = s.trim();
        return s;
    },
    /**
     * @private
     * Precitanie jedneho pola do MARC riadku
     *
     * @param {Object} pLine     - rozpracovana MARC line (moze byt prazdna)
     * @param {Object} pFldName  - fldname & pole kde sa fldname ma nachadzat
     * @param {Object} pLinRec   - vstupujuci zaznam v lin. tvare
     *                             je to bud cely zaznam
     *                             alebo to moze byt jedno opakovanie skupiny (u fieldsetov)
     *
     * @return upravena MARC line (moze byt nezmenena oproti vstupu, ak bolo dane pole v pLinRec prazdne)
     */
    setSTValue: function(pLine, pFldName, pLinRec) {
        var sValue = pLinRec[pFldName];
        // hodnota v lin.rec.
        // precistit pole a vypustit eventualne v nom nachadzajuce sa prazdne prvky
        sValue = this.clearBlanks(sValue);
        // je prazdna? nerobit nic
        if (sValue === '') {
            return pLine;
        }
        // cislo tagu a podpola ocakavame tvar 't999x' alebo 't999i1' alebo 't00X.'
        var sTag = pFldName.substring(1, 4);
        // tag
        var sSTag = pFldName.substring(4, 6);
        // subtag (moze byt aj 'i1' alebo 'i2')
        pLine = i3.Marc.setSubTagStr(pLine, sSTag, sValue, sTag);
        // vratit upraveny vysledok
        return pLine;
    },
    /**
     * @private
     * Convert one field group from linear representation to MARC.
     * Newly got MARC lines will be added to MARC record.
     *
     * @param {Object} pLinRec
     * @param {Object} pGroupName
     * @return {Array} MARC riadky na pridanie alebo null
     */
    toMarcOneGroup: function(pLinRec, pGroupName, pCfg1) {
        var aValue = pLinRec[pGroupName];
        var aRes = [];
        // pole s MARC riadkami
        if (aValue === undefined) {
            return null;
            // ok (no data)
        }
        Ext.each(aValue, function(pValue1) {
            // sMarcLine bude Marc riadok zodpovedajuci jednemu opakovaniu skupiny
            var sMarcLine = '';
            // pre kazde opakovanie riadku tagu prejst vsetky podpolia
            Ext.each(pCfg1.subfields, function(pST) {
                // nazov property pre tento prvok
                var sFldName = this.fldName(pCfg1.tag, pST);
                // naskladat vsetky vyplnene podpolia do sMarcLine
                // pValue1 je z prveho "each" - t.j. sub-linearna verzia zaznamu
                sMarcLine = this.setSTValue(sMarcLine, sFldName, pValue1);
                // skladame jeden riadok
            }, this);
            // sMarcLine riadky zlozit do pola
            // pokial je vysledok prazdny, alebo je tam len indikator a ziadne data - ignorovat
            // "TAG xx $z"
            if (sMarcLine.length < 9) {
                return;
            }
            aRes.push(sMarcLine);
            // preverit, ci su nejake "linked fields" - ak nie mame hotovo
            if (!pCfg1.linkingFld) {
                return;
            }
            // linking value - mal by byt 4 znaky
            var sLinkingVal = i3.Marc.getSubTagStr(sMarcLine, pCfg1.linkingFld).trim();
            Ext.each(pCfg1.linkedCfg, function(pLCfg1) {
                var sGroupName = this.fldName(pLCfg1.tag);
                var aLRes1 = this.toMarcOneGroup(pValue1, sGroupName, pLCfg1);
                if ((!aLRes1) || (aLRes1.length <= 0)) {
                    return;
                }
                // OK mame nejake linked riadky, potreba v nich nastavit linked field
                // teraz pre kazdy Marc riadok skupiny, precitat obsah linking fieldu (t.j. linking fld suffix)
                // a pred neho vlozit obsah linking fieldu - mal by byt vzdy 4 znaky dlhy
                Ext.each(aLRes1, function(pLMarcLine) {
                    var sLinkingValSuff = i3.Marc.getSubTagStr(pLMarcLine, pCfg1.linkingFld).trim();
                    pLMarcLine = i3.Marc.setSubTagStr(pLMarcLine, pCfg1.linkingFld, sLinkingVal + sLinkingValSuff);
                    aRes.push(pLMarcLine);
                });
            }, this);
        }, this);
        return aRes;
    },
    /**
     * @private
     * Konverzia vnutornej datovej struktury na MARC.
     * Spracovanie jedneho prvku pola nastaveni.
     *
     * @param {Object} pResMarc   - vstupujuci MARC zaznam
     * @param {Object} pCfg1      - jeden prvok pola konfigu
     * @param {Object} pLinRec    - vytvarany linearizovany zaznam
     *
     * @return - '' ak ok, inak text chyby
     */
    toMarc1: function(pResMarc, pCfg1, pLinRec) {
        var sFldName, sLine, sLine2;
        if (typeof pCfg1 === 'string') {
            sFldName = this.fldName(pCfg1);
            // kod zaznamu je rieseny vynimkou
            if (sFldName === 't001') {
                pResMarc.t001 = pLinRec.t001;
                return '';
            }
            // cislo tagu a podpola ocakavame tvar 't999x' alebo 't999i1'
            var sTag = sFldName.substring(1, 4);
            // tag
            sLine = pResMarc.getTag(sTag);
            sLine2 = this.setSTValue(sLine, sFldName, pLinRec);
            if (sLine !== sLine2) {
                pResMarc.setTag(sLine2);
            }
        } else {
            var aRes;
            // it's object
            // cfg. option je objekt
            if (!pCfg1.tag) {
                return 'missing "tag" property';
            }
            if (!pCfg1.subfields) {
                return 'missing "subfields" property';
            }
            // ak je definovana funkcia "oconvFn", tato je zodpovedna za komplet preskladanie udajov
            // t.j. pre dany tag je vsetko riesene uzivatelskym kodom
            if (typeof pCfg1.oconvFn === 'function') {
                aRes = pCfg1.oconvFn(pLinRec);
                //                   call oconv function
            } else if (pCfg1.suffixFld && pCfg1.suffixValues) {
                aRes = [];
                // now loop for each suffix value
                Ext.each(pCfg1.suffixValues, function(pSuffix, pSuffixIdx) {
                    // suffix moze byt iny v datach a iny realne v poli, pretoze nie ten v datach moze byt nevhodny
                    // pre nazvy premennych
                    // takze tato premenna ponesie udaj pre suffix pola, pSuffix bude udaj do dat
                    var sFldNameSuffix = pSuffix;
                    if (pCfg1.suffixValuesInt && pCfg1.suffixValuesInt[pSuffixIdx]) {
                        sFldNameSuffix = pCfg1.suffixValuesInt[pSuffixIdx];
                    }
                    // 15.11.12 on; vezne jenom cast po .
                    // get group data for this suffix
                    sFldName = this.fldName(pCfg1.tag, sFldNameSuffix);
                    var aRes1 = this.toMarcOneGroup(pLinRec, sFldName, pCfg1);
                    // got something (will be list of Marc lines)
                    if (aRes1) {
                        // for each Marc line setup "suffixFld" subtag to current suffix value
                        Ext.each(aRes1, function(pMarcLine, pIdx, pArray) {
                            // 15.11.12 on; pokud je predane pole, tak nebude nastavovat subtag pCfg1.suffixFld
                            if (Ext.isArray(pSuffix)) {} else {
                                var sValue = pSuffix;
                                // suffix tag smieme nastavit len pre riadky obsahujuce riadiaci tag (teda pCfg1.tag)
                                // pokial skupina obsahuje aj pripojene tagu via linkingField, mozu tu v datach byt
                                // aj dalsie tagy, kde suffixField nesmieme prepisat pretoze moze mat uplneniny vyznam
                                var sKeyTag = pMarcLine.substring(0, 3);
                                if (sKeyTag !== pCfg1.tag) {
                                    return;
                                }
                                if (sValue === '*') { // ak bol ako klucova hodnota v datach uvedena '*', tak do dat piseme ''
                                    sValue = '';
                                }
                                // setup the subtag
                                pArray[pIdx] = i3.Marc.setSubTagStr(pMarcLine, pCfg1.suffixFld, sValue);
                            }
                        });
                        // add Marc lines in result
                        aRes = aRes.concat(aRes1);
                    }
                }, this);
            } else {
                sFldName = this.fldName(pCfg1.tag);
                aRes = this.toMarcOneGroup(pLinRec, sFldName, pCfg1);
            }
            if (aRes) { //                                      if something returned, append to MARC record
                pResMarc.appendTag(aRes);
            }
        }
        return '';
    },
    /**
     * @private
     * Vrati nazov pola do linearnej struktury.
     * V podstate ide o to, aby sa prefix 't' pridaval na jedinom mieste a toto aby bolo mozne
     * pripade do buducna upravit.
     *
     * @param {Object} pTag    - tag (od neho bude odvodeny nazov pola)
     * @param {Object} pSuffix - suffix. Tento moze byt prazdny, pripadne moze obsahovat nazov podpola
     *                           pripadne nazov podpola + suffix z linkingField
     */
    fldName: function(pTag, pSuffix) {
        if (!pSuffix) {
            pSuffix = '';
        }
        return 't' + pTag + pSuffix;
    },
    /*XX
     * Ocislovanie skupiny tagov obsahujucich zgrupovane skupiny tagov via. linkingField
     * priklad: udalosti v muz.
     * Je volane pred konverziu na MARC (toMarc()) na kazdy tag, ktory ma nastaveny linkingField.
     *
     * @param {Object} pCfg1   - konfig tagu, ktory obsahuje linking field
     * @param {Object} pLinRec - lin.reacord
     */
    toMarcLinkingFldNumbering: function(pCfg1, pLinRec) {
        // zistit maximalne pouzite cislo udalosti
        var nMaxUdNo = '0000';
        // nazov pola pre cislovanie
        var sLinkingFldN = this.fldName(pCfg1.tag, pCfg1.linkingFld);
        // prejdeme vsetky typy udalosti
        Ext.each(pCfg1.suffixValuesInt, function(pSuffix) {
            var sFldNameGrp = this.fldName(pCfg1.tag, pSuffix);
            var dt = pLinRec[sFldNameGrp];
            if (!dt) {
                return;
            }
            Ext.each(dt, function(pUdalost) { // pre kazdy definovany typ, prejdeme jeho vsetky opakovania
                var nUdNo = pUdalost[sLinkingFldN];
                if (nUdNo && (nUdNo > nMaxUdNo)) {
                    nMaxUdNo = nUdNo;
                    // zaznamenat max. pouzite cislo udalosti
                }
            }, this);
        }, this);
        // konverzia string na cislo nie je automaticka; '002'+1 da '0021'
        if (typeof nMaxUdNo === 'string') {
            nMaxUdNo = parseInt(nMaxUdNo, 10);
        }
        // doplnit chybajuce prepajajuce cisla udalosti
        Ext.each(pCfg1.suffixValuesInt, function(pSuffix, pnSuffixNo) { // vsetky typy
            var sFldNameGrp = this.fldName(pCfg1.tag, pSuffix);
            var dt = pLinRec[sFldNameGrp];
            if ((!dt) || (dt.length === 0)) {
                return;
            }
            Ext.each(dt, function(pUdalost) { // vsetky opakovania daneho typu
                if (i3.isEmptyTagSet(pUdalost)) { // ak je udalost prazdna - ignorovat
                    return;
                }
                var nUdNo = pUdalost[sLinkingFldN];
                if ((!nUdNo) || (nUdNo === '')) {
                    nMaxUdNo = nMaxUdNo + 1;
                    pUdalost[sLinkingFldN] = i3.leadingZero(nMaxUdNo, 4);
                }
            }, this);
        }, this);
    },
    /**
     * @private
     * Finalne prejdenie vysledku a odfiltrovanie kratkych riadkov
     * To je pripady neopakovatelnych tagov s indikatormi, kde sa vyskytne indikator
     * ale bez podpoli.
     *
     * 08.09.09 rs;
     *
     * @param {Object} resMarc
     */
    toMarcFilterShortLines: function(pMarc) {
        // pole s vyslednymi riadkami
        var res = [];
        // pre kazdy riadok
        Ext.each(pMarc.data, function(pLine) {
            // ak je riadok dlhsi ako 8 znakov - prijmeme ho
            // "TAG .. $aX"
            if (pLine.length > 8) {
                res.push(pLine);
            }
        });
        // vysledok
        pMarc.data = res;
    },
    /**
     * Konverzia vnutornej datovej struktury na MARC.<br><br>
     *
     * 08.09.09 rs; pridana filtracia kratkych riadkov
     *
     * @param pCfg {Array}
     *   Pole s konfigom - pouzije sa to iste ako pre vstupnu konverziu niektore prvky pola su specificke
     *   pre iconv, ine pre oconv, cast je spolocnych.
     * @param pLinRec {Object}
     *   Zaznam v internel 'linearnej' strukture
     * @param pErr {Object}
     *   Vystupne premenna, kt. bude pri chybe obsahovat text chyby a to v property 'tx'.
     * @return  {i3.Marc} vytvoreny zaznam v MARC
     *
     */
    toMarc: function(pCfgX, pLinRec, pErr) {
        // 31.03.16 on; rozsiri pole o indexy a kdy pri porovnani vyjde ===, zachova poradi podle indexu
        var stableSort = function(arr, cmpFunc) {
            //wrap the arr elements in wrapper objects, so we can associate them with their origional starting index position
            var arrOfWrapper = arr.map(function(elem, idx) {
                return {
                    elem: elem,
                    idx: idx
                };
            });
            //sort the wrappers, breaking sorting ties by using their elements orig index position
            arrOfWrapper.sort(function(wrapperA, wrapperB) {
                var cmpDiff = cmpFunc(wrapperA.elem, wrapperB.elem);
                return cmpDiff === 0 ? wrapperA.idx - wrapperB.idx : cmpDiff;
            });
            //unwrap and return the elements
            return arrOfWrapper.map(function(wrapper) {
                return wrapper.elem;
            });
        };
        // funkce pro serazeni tagu (nektere jsou stringy, jine objekty)
        var sortFn = function(a, b) {
            var s1, s2;
            if (a.tag) {
                s1 = a.tag;
            } else {
                s1 = a.substring(0, 3);
            }
            if (b.tag) {
                s2 = b.tag;
            } else {
                s2 = b.substring(0, 3);
            }
            if (s1 < s2) {
                return -1;
            }
            if (s1 > s2) {
                return 1;
            }
            return 0;
        };
        var aMap = pCfgX.map;
        i3.assert(Ext.isArray(aMap), 'i3.Marc.toMarc: Ext.isArray(aMap)');
        var resMarc = new i3.Marc({}),
            sErr = '';
        // 04.06.12 on; pokud bylo vygenerovana prevodni tabulka, prida ji ke staticke tabulce
        if (pLinRec.aDifConvMap) {
            aMap = aMap.concat(pLinRec.aDifConvMap);
            // 31.03.16 on; razeni v chromu neni stabilni - dochazelo k prohozeni poli se stejnymi tagy, zapojena funkce stableSort
            // 24.04.15 on; nesmi radit subtagy (napr. zapis "111d", "111c")
            // seradi pole, podle specialni funkce
            //aMap.sort(sortFn);
            aMap = stableSort(aMap, sortFn);
        }
        Ext.each(aMap, function(pCfg1, i) {
            // ak je nastaveny linking field, vykonat pred konverziou na MARC ocislovanie
            // zviazanych udajov. Napr. ak boli pridane v lin.strukture pridane nove prvky,
            // je potreba pred konverziou do MARC vygenerovat nove prepajacie cisla
            if (pCfg1.linkingFld) {
                this.toMarcLinkingFldNumbering(pCfg1, pLinRec);
            }
            sErr = this.toMarc1(resMarc, pCfg1, pLinRec);
            if (sErr !== '') {
                sErr = 'config option [' + i + ']: ' + sErr;
                return false;
            }
        }, this);
        // forward error
        if ((sErr !== '') && pErr) {
            pErr.tx = sErr;
        }
        this.toMarcFilterShortLines(resMarc);
        return resMarc;
    },
    /**
     * Najst dany tag v mape tagv a vratit jeho definicny zaznam.
     * Moze byt vhodne, ak chceme definiciu tagu pouzit napr. v nejakej uzivatelskej metode, mimo
     * kodu i3.DataFmt.<br>
     * Aktualne funguje len pre definicie tagov s property 'tag'.
     *
     * @param {Object} pCfg   Konverzna tabulka.
     * @param {String} pTag   Tag, ktory hladame.
     *
     * @return {Object} Vrati definicny zaznam tagu, alebo null.
     */
    findTagDef: function(pCfg, pTag) {
        var r = null;
        Ext.each(pCfg.map, function(pCfg1) {
            if (pCfg1.tag === pTag) {
                r = pCfg1;
                return false;
            }
        });
        return r;
    }
};
