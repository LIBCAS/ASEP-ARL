/*
 * 23.05.25 on; doplneno pole 801
 * 15.07.11 on; doplnena pole
 * 12.07.11 on; doplnene chybejici pole
 * 21.10.10 on; doplnene pole US_710
 * 20.10.10 on; doplneno 024i1,a
 * 20.09.10 on; doplneno podpole 930$u
 * 06.09.10 on; doplneno podpole 930$8
 * 11.08.10 on; do pole 930 doplneno podpole $d
 * 04.05.10 on; doplnene pole 451 a podpole $i do 5XX - auth
 * 30.04.10 on; doplnene indikatory do 856
 * 01.04.10 bs; doplnene podpole i k poli 500 auth
 * 17.03.10 on; doplnene pole 511 a 111
 * 27.11.09 rs; zmena sposobu opakovania pola 675
 * 05.11.09 rs; doplnenie podpoli do 510
 * 26.10.09 rs; drobnosti
 * 30.09.09 rs; doplnenie 930 do mapy
 * 24.09.09 rs; deduplikacny kluc C06q
 * 16.09.09 rs; zmena C03$7 na $3
 * 11.09.09 rs; rozne drobnosti a doladovacky
 * 25.08.09 rs; doplnenie dalsich tagov - drobnosti podla NA (950i1,678i1)
 * 24.08.09 rs; doplnenie dalsich tagov
 * 07.08.09 rs; zakladna konverzna tabulka bibliograficky format (pre citacie)
 * 30.07.09 rs; rozsirenie mapovania na dalsie podpolia M05
 *
 **/
/*global Ext,i3,epca */
Ext.ns('epca.marcConv');
/**
 * @class i3.muz.marcConv
 * Muzea/konverzna tabulka pre prevod MARC a interny format
 * Pre vsetky typy autorit (osobne, korporacie, geo., ..)
 */
Ext.apply(epca.marcConv, {
    /**
     * Konverzna tabulka pre autoritny format - vsetky typy autorit
     */
    csMarcConvDefUSA: {
        fmtPrefix: 'USA',
        map: ['001', '000.', '003.', '005.', '008.', //
            //
            '100i1', '1007', '100a', '100d', '100b', '100c', '100i', '100q', '100v', '100w', '100t', '100x', //
            {
                tag: 'M90',
                subfields: ['a', '9', 'x', 'i', '8'],
                suffixFld: '7',
                suffixValues: ['muz_us_auth_n*u000001', 'muz_us_auth_n*u000002', 'muz_us_auth_n*0000912', //
                    'muz_us_auth_n*0000861', 'muz_us_auth_n*0000913', 'muz_us_auth_n*0000863', '*'
                ],
                suffixValuesInt: ['N', 'U', 'Z', //
                    'S', 'P', 'C', 'X'
                ],
                linkingFld: '9', //
                // user defined data - pre udalosti je to hodnota M90a
                userDt1: ['E067', 'E069', 'E007', 'E007', 'E063', 'E007', 'E007'],
                linkedCfg: [{
                    tag: 'M91',
                    subfields: ['8', '9', 'w', 'i', 'a', 'b', 'c']
                }, {
                    tag: '500',
                    subfields: ['i1', '2', '5', '7', '8', '9', 'i1', 'a', 'd', 'b', 'c', 'i', 'q', 'v', 'w', 't', 'x']
                }, {
                    tag: '510',
                    subfields: ['i1', '7', '8', '9', 'w', 'i', 'a', 'b']
                }, {
                    tag: '551',
                    subfields: ['i1', '7', '8', '9', 'w', 'i', 'a', 'b']
                }]
            }, // vecne autority - mapu spravime sirsiu, aby sa dala pouzit na vsetky potrebne konverzie
            //
            '110i1', '110a', '110b', '111i1', '111a', '111q', '111e', '150a', '151a', {
                tag: '040',
                subfields: ['a', 'b', 'c', 'd']
            }, // udalosti musia byt uvedene PRED tagmi, ktore mozu byt v nich vnorene (500,510,551)
            //
            {
                tag: '400',
                subfields: ['i1', 'a', 'd', 'b', 'c', 'q', '2', '5', '7', '8', 'w', 'i']
            }, { // pre autority 110 - 4xx
                tag: '410',
                subfields: ['i1', 'a', 'b', '7', '9', 'w']
            }, { // pre autority 150 - 4xx
                tag: '450',
                subfields: ['a', '7', '9', 'w']
            }, { // pre autority 151 - 4xx
                tag: '451',
                subfields: ['a', 'w', 'i', 'v', 'x', 'y', 'z']
            }, {
                tag: '500',
                subfields: ['i1', 'a', 'd', 'b', 'c', 'q', 'w', 'i', 't', 'v', '2', '5', '7', '8']
            }, {
                tag: '510',
                subfields: ['i1', 'i2', '7', '9', 'w', 'i', 'a', 'b', '5', '8']
            }, {
                tag: '511',
                subfields: ['i1', '7', '9', 'w', 'i', 'a', 'q', 'e', '5', '8']
            }, {
                tag: '550',
                subfields: ['9', '7', 'w', 'i', 'a', '5']
            }, {
                tag: '551',
                subfields: ['9', '7', 'w', 'i', 'a', 'b', '5']
            }, //
            // poznamky
            '665a', '667a', {
                tag: '670',
                subfields: ['a', 'b']
            }, '675a', // 27.11.09 rs; zmena sposobu opakovania pola 675
            //{
            //  tag: '675',
            //  subfields: ['a']
            //},
            '678i1', '678a', '680i', //
            {
                tag: '700',
                subfields: ['i1', 'i2', 'w', 'a', 'q', 'b', 'c', 'e', 't', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 'v', 'x', 'y', 'z', '0', '2', '5', '6', '7', '8']
            }, {
                // URL
                tag: '856',
                subfields: ['i1', 'i2', '3', '5', '8', 'u', 'y', 'z', '4']
            }, //
            '900a',
            // opravy
            '906a', '906b', '906c', //
            // provenience
            '909a', //
            {
                // stav zaznamu z bandasky - needituje sa ale nemal by vypadnut // 30.09.09 rs
                tag: '930',
                subfields: ['i1', '1', 'a', 'b', 'c', 'd', '8', 'u', '0', '2', 'q', '7', '9', 'x', 'w']
            }, // status zaznamu (rozpracovany)
            //'950i1', // 950i1 vnutorne nepouzivame a problem nastava ak by bolo i1 vyplnene a $a prazdne
            // preto vnutorne v MUZ 'i1' tu nesmie byt zadane
            '950i1', '950a', //
            '969f', // rozpracovanost (ARL)
            '998a', // pole z NA
            // verzovanie zaznamu
            '999a', '999b', '999c', '999d', '999e', 'C99a', 'C99d', //
            // klicova slova (dle i1: nevyplneno = klicove slovo, 0 = profese, 1 = styl, 2 = obor)
            {
                tag: 'C03',
                subfields: ['a', '3'],
                suffixFld: 'i1',
                suffixValues: ['0', '1', '2', ''],
                suffixValuesInt: [null, null, null, 'k']
            }, 'C06a', 'C06b', 'C06c', 'C06d', 'C06g', 'C06e', 'C06f', 'C06o', 'C06p', 'C06r', 'C06s', 'C06t', 'C06u', 'C06v', 'C06z', 'C06x', 'C06y', 'C068', // deduplikacny kluc
            //
            {
                tag: 'C13',
                subfields: ['7', '8', '9', 'e', 'y', 'X']
            }, //
            // narodnost
            {
                tag: 'M09',
                subfields: ['i2', 'a', 'i', '8']
            }, //
            // zivotopis
            'M05i1', 'M05a', 'M05i', 'M05c', 'M05l', 'M05u', 'M058', //
            // tituly a zdroj
            'M08a', 'M08b', 'M088', //
            // pohlavie
            'M11a', //
            // TEST polia (len pre ladenie 20.08.09 rs - moze sa neskor ponechat alebo vyhodit)
            'R01a', //
            'R02a' //
            //
        ]
    },
    /**
     * Konverzna tabulka pre bibliograficky format
     */
    csMarcConvDefUS: {
        fmtPrefix: 'US',
        map: ['001', '001', '000.', '003.', '005.', '008.', //
            '020a', //
            '024i1', '024a', '0242', // 20.10.10 on; doplneno 024i1,a
            // 100-ka je neopakovatelna ale nacitame ju ako opakovatelnu aby sme na editaciu mohli pouzit
            // dyntrigger
            {
                tag: '100',
                subfields: ['i1', 'a', 'b', 'd', 'c', 'i', 'q', 'v', 'w', 't', 'x', '7']
            }, '245a', '245b', '245n', //
            '250a', //
            '260a', '260b', '260c', '260d', //
            '300a', //
            '490a', '490v', '500a', //
            //
            {
                tag: '700',
                subfields: ['7', 'i1', 'a', 'b', 'd', 'c', 'i', 'q', 'v', 'w', 't', 'x']
            }, //
            {
                tag: '710',
                subfields: ['7', 'i1', 'a', 'b', 'd', 'c', 'i', 'q', 'v', 'w', 't', 'x']
            }, //
            '773a', '773b', '773d', '773g', '773t', '7739', '856u', //
            '915a', '915b', '915c', // verzovanie zaznamu
            '999a', '999b', '999c', '999d', '999e', 'C99a', 'C99d', //
            'Tdia'
        ]
    },
    /**
     * Konverzni tabulka pro autoritni format - vsechny typy autorit.
     */
    csMarcConvDefUNA: {
        fmtPrefix: 'UNA',
        map: ['001', '000.', '003.', '005.', '100a',
            //
            '200i2', '200a', '200b', '200c', '200d', '200f', '200g', '2004', '200s', '200x', '200y', '200z', '2007', '2008', '2009', //
            //
            '210i1', '210i2', '210a', '210b', '210c', '210d', '210e', '210f', '210g', '210h', '2104', '210x', '210y', '210z', '2107', '2108', '2109', //
            //
            '215a', '215x', '215y', '215z', '2157', '2158',
            //
            '216a', '216f', '216c', '216j', '216x', '216y', '216z', '2167', '2168',
            //
            '216a', '216f', '216c', '216j', '216x', '216y', '216z', '2167', '2168',
            //
            '217a', '217b', '217c', '217d', '217f', '217g', '217j', '217x', '217y', '217z', '2177', '2178',
            //
            '220a', '220c', '220d', '220f', '2204', '220x', '220y', '220z', '2207', '2208',
            //
            '230a', '230c', '230h', '230i', '230k', '230l', '230m', '230n', '230q', '230r', '230s', '230u', '230w', '230x', '230y', '230z', '2307', '2308', '2309',
            //
            '235i1', '235a', '235b', '235e', '235k', '235m', '235r', '235s', '235u', '235w', '235x', '235y', '235z', '2357', '2358',
            //
            '2401', '2407', '2408',
            //
            '243i2', '243a', '243b', '243c', '243e', '243f', '243i', '243l', '243n', '243t', '243j', '243x', '243y', '243z', '2437', '2438',
            //
            '2451', '2457', '2458',
            //
            '250a', '250n', '250m', '250j', '250x', '250y', '250z', '2507', '2508',
            //
            '260a', '260b', '260c', '260d', '260e', '260f', '260g', '260h', '260i', '260k', '260m', '260n', '260o', '2607', '2608',
            //
            '280i2', '280a', '280j', '280x', '280y', '280z', '2807', '2808',
            //
            '285a', '2853', '2857', '2858',
            //
            '290n', '290a', '290k', '2903', {
                tag: '300',
                subfields: ['i1', 'a', '6', '7']
            }, {
                tag: '400',
                subfields: ['i2', 'a', 'b', 'c', 'd', 'f', 'g', '4', 'x', 'y', 'z', '0', '2', '3', '5', '6', '7', '8']
            }, {
                tag: '410',
                subfields: ['i1', 'i2', 'a', 'b', 'c', 'd', 'e', 't', 'f', 'g', 'h', '4', 'x', 'y', 'z', '0', '2', '3', '5', '6', '7', '8']
            }, {
                tag: '415',
                subfields: ['a', 'x', 'y', 'z', '0', '2', '3', '5', '6', '7', '8']
            }, {
                tag: '450',
                subfields: ['a', 'n', 'm', 'j', 'x', 'y', 'z', '0', '2', '3', '5', '6', '7', '8']
            }, {
                tag: '500',
                subfields: ['i2', 'a', 'b', 'c', 'd', 'f', 'g', '4', 'x', 'y', 'z', '0', '2', '3', '5', '6', '7', '8']
            }, {
                tag: '510',
                subfields: ['i1', 'i2', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', '4', 'x', 'y', 'z', '0', '2', '3', '5', '6', '7', '8']
            }, {
                tag: '515',
                subfields: ['a', 'x', 'y', 'z', '0', '2', '3', '5', '6', '7', '8']
            }, {
                tag: '550',
                subfields: ['a', 'n', 'm', 'j', 'x', 'y', 'z', '0', '2', '3', '5', '6', '7', '8']
            }, {
                tag: '675',
                subfields: ['a', 'b', 'c', 'v', 'z', '3']
            }, {
                // 23.05.25 on; doplneno
                tag: '801',
                subfields: ['i2', 'a', 'b', 'c']
            }, {
                tag: '810',
                subfields: ['a', 'b']
            },
            // provenience
            '909a', //
            // opravy
            '906c', //
            // status zaznamu (rozpracovany)
            //'950i1', // 950i1 vnutorne nepouzivame a problem nastava ak by bolo i1 vyplnene a $a prazdne
            // preto vnutorne v MUZ 'i1' tu nesmie byt zadane
            '950a', //
            //
            '969f', // rozpracovanost (ARL)
            //
            '980x', //
            //
            '998a', // pole z NA
            // verzovanie zaznamu
            '999a', '999b', '999c', '999d', '999e', '999f', //
            'C99a', 'C99b', 'C99c', 'C99d', 'C99e', 'C99f' //
        ]
    },
    /**
     * Konverzni tabulka pro bibliograficky format.
     *
     *
     * 04.06.12 on; konverzni tabulka by tagy, ktere nejsou ve formulari vubec nemusela obsahovat, ale kdyz uz je tu necham
     */
    csMarcConvDefUN: {
        fmtPrefix: 'UN',
        map: ['000.', '001', '005.', {
                tag: '010',
                subfields: ['a', 'b', 'd', 'z']
            }, {
                tag: '011',
                subfields: ['i1', 'a', 'b', 'd', 'y', 'z']
            }, '100a', {
                tag: '101',
                subfields: ['i1', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
            }, '102a', '102b', '102c', '1022', '105a', '106a', '110a', //
            '200i1', '200a', '200b', '200c', '200d', '200e', '200f', '200g', '200h', '200i', '200z', '200v', '2005', '205a', '205b', '205d', '205f', '205g', {
                tag: '210',
                subfields: ['i1', 'i2', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
            }, {
                tag: '215',
                subfields: ['a', 'c', 'd', 'e']
            }, {
                tag: '225',
                subfields: ['i1', 'a', 'd', 'e', 'f', 'h', 'i', 'v', 'x', 'z']
            }, {
                tag: '300',
                subfields: ['a']
            }, {
                tag: '302',
                subfields: ['a']
            }, {
                tag: '307',
                subfields: ['a']
            }, {
                tag: '315',
                subfields: ['a']
            }, {
                tag: '320',
                subfields: ['a', 'u']
            }, {
                tag: '330',
                subfields: ['a']
            }, {
                tag: '510',
                subfields: ['i1', 'a', 'e', 'h', 'i', 'j', 'n', 'z']
            }, {
                tag: '512',
                subfields: ['i1', 'a', 'e', 'n']
            }, {
                tag: '516',
                subfields: ['i1', 'a', 'e']
            }, {
                tag: '517',
                subfields: ['i1', 'a', 'e']
            }, {
                tag: '541',
                subfields: ['i1', 'a', 'e', 'h', 'i', 'z']
            }, {
                tag: '600',
                subfields: ['i2', '3', 'a', 'b', 'c', 'd', 'f', 'j', 'p', 't', 'x', 'y', 'z', '2', '5']
            }, {
                tag: '601',
                subfields: ['i1', 'i2', '3', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 't', 'x', 'y', 'z', '2', '5']
            }, {
                tag: '602',
                subfields: ['3', 'a', 'f', 'j', 'x', 'y', 'z', '2', '5']
            }, {
                tag: '605',
                subfields: ['3', 'a', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'q', 't', 's', 'u', 'w', 'x', 'y', 'z', '2']
            }, {
                tag: '606',
                subfields: ['i1', '3', 'a', 'j', 'x', 'y', 'z', '2']
            }, {
                tag: '607',
                subfields: ['3', 'a', 'j', 'x', 'y', 'z', '2']
            }, {
                tag: '608',
                subfields: ['i2', '3', 'a', 'j', 'x', 'y', 'z', '2', '5']
            }, {
                tag: '610',
                subfields: ['i1', 'a', '9', '5']
            }, {
                tag: '615',
                subfields: ['3', 'a', 'x', 'n', 'm', '2', '9']
            }, {
                tag: '675',
                subfields: ['3', 'a', 'v', 'z', 'x', '9']
            }, {
                tag: '676',
                subfields: ['3', 'a', 'v', 'z']
            }, {
                tag: '680',
                subfields: ['3', 'a', 'b']
            }, {
                tag: '686',
                subfields: ['3', 'a', 'b', 'c', '2']
            }, '700i2', '7003', '700a', '700b', '700c', '700d', '700f', '700g', '700p', '7004', '7009', {
                tag: '701',
                subfields: ['i2', '3', 'a', 'b', 'c', 'd', 'f', 'g', 'p', '4', '9']
            }, {
                tag: '702',
                subfields: ['i2', '3', 'a', 'b', 'c', 'd', 'f', 'g', 'p', '4', '9', '5']
            }, '710i1', '710i2', '7103', '710a', '710b', '710c', '710d', '710e', '710f', '710g', '710h', '7104', '7109', {
                tag: '711',
                subfields: ['i1', 'i2', '3', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', '4', 'p']
            }, {
                tag: '712',
                subfields: ['i1', 'i2', '3', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', '4', 'p', '5']
            }, '7203', '720a', '720f', '7204', {
                tag: '721',
                subfields: ['3', 'a', 'f', '4']
            }, {
                tag: '722',
                subfields: ['3', 'a', 'f', '4', '5']
            }, {
                tag: '856',
                subfields: ['i1', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '2']
            }, '969a', '969b', '969c', '969f', '969g', '969y', //
            '970a', '970b', '970c', '970d', '970e', '970f', '970g', '970h', '970i', '970j', '970k', '970l', '970m', '970n', '970x', //
            '999a', '999b', '999c', '999d', '999e', '999f', 'C99a', 'C99b', 'C99c', 'C99d', 'C99e', 'C99f', 'Tdia', 'T00a'
        ]
    }
    //
});
