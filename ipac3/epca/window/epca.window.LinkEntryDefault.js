/**
 * 24.09.20 on; vymaz 200v
 * 08.01.20 on; vyjimnka dotazeni TXX tagu
 * 13.12.19 on; prefix subtagu
 * 07.08.17 on; PB vyhledavani
 * 28.07.17 on; zfunkcneno pro vlozeny formular
 * 03.09.13 on; predelane 4XX tagy
 * 23.05.12 on; oprava chyby
 */
/*global Ext, epca */

Ext.ns('epca.window');

epca.window.LinkEntryDefault = Ext.extend(Ext.Window, {

  tag : undefined,
  field : undefined,
  convertMap : undefined,

  constructor : function(config) {
    var aItems;

    config = config || {};

    config.listeners = config.listeners || {};

    Ext.applyIf(config.listeners, {
      close : function() {
        this.destroy();
      }
    });

    aItems = [{
      "tag" : "001",
      "tagLabel" : "Identifikačné číslo záznamu",
      "xtype" : "epca.marc_fieldset",
      "repeatable" : false,
      "type" : "R",
      "autoHeight" : true,
      "autoWidth" : true,
      "labelWidth" : 200,
      "title" : "001: Identifikačné číslo záznamu",
      "items" : [{
        "tag" : "001",
        "field" : ".",
        "fieldLabel" : "Identifikačné číslo záznamu",
        "type" : "R",
        "repeatable" : false,
        "labelWidth" : 200,
        "width" : 400,
        "xtype" : "epca.marc_textfield",
        disabled : true
      }]
    }, {
      "xtype" : "epca.repeatable_encapsulation",
      "autoHeight" : true,
      "autoWidth" : true,
      "labelWidth" : 200,
      "item" : {
        "tag" : "010",
        "tagLabel" : "ISBN",
        "xtype" : "epca.marc_fieldset",
        "repeatable" : true,
        "type" : "O",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "title" : "010: ISBN",
        "items" : [{
          "tag" : "010",
          "field" : epca.form.Helper.c.sSubtagPrefix + "a",
          "fieldLabel" : "ISBN",
          "type" : "R",
          "repeatable" : false,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.marc_textfield"
        }]
      }
    }, {
      "tag" : "011",
      "tagLabel" : "Medzinárodné štandardné číslo seriálu (ISSN)",
      "xtype" : "epca.marc_fieldset",
      "repeatable" : false,
      "type" : "O",
      "autoHeight" : true,
      "autoWidth" : true,
      "labelWidth" : 200,
      "title" : "011: Medzinárodné štandardné číslo seriálu (ISSN)",
      "items" : [{
        "tag" : "011",
        "field" : epca.form.Helper.c.sSubtagPrefix + "a",
        "fieldLabel" : "Číslo (ISSN)",
        "type" : "R",
        "repeatable" : false,
        "labelWidth" : 200,
        "width" : 400,
        "xtype" : "epca.marc_textfield"
      }]
    }, {
      "tag" : "200",
      "tagLabel" : "Názov a údaje o zodpovednosti",
      "xtype" : "epca.marc_fieldset",
      "repeatable" : false,
      "type" : "R",
      "autoHeight" : true,
      "autoWidth" : true,
      "labelWidth" : 200,
      "title" : "200: Názov a údaje o zodpovednosti",
      "items" : [{
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Hlavný názov",
        "item" : {
          "tag" : "200",
          "field" : epca.form.Helper.c.sSubtagPrefix + "a",
          "fieldLabel" : "Hlavný názov",
          "type" : "R",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.marc_textfield"
        }
      }, {
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Všeobecné označenie typu dokumentu",
        "item" : {
          "tag" : "200",
          "field" : epca.form.Helper.c.sSubtagPrefix + "b",
          "fieldLabel" : "Všeobecné označenie typu dokumentu",
          "type" : "O",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.marc_textfield"
        }
      }, {
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Hlavný názov od iného autora",
        "item" : {
          "tag" : "200",
          "field" : epca.form.Helper.c.sSubtagPrefix + "c",
          "fieldLabel" : "Hlavný názov od iného autora",
          "type" : "O",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.marc_textfield"
        }
      }, {
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Súbežný názov / Paralelný názov",
        "item" : {
          "tag" : "200",
          "field" : epca.form.Helper.c.sSubtagPrefix + "d",
          "fieldLabel" : "Súbežný názov / Paralelný názov",
          "type" : "O",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.marc_textfield"
        }
      }, {
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Podnázov a doplnky k názvu",
        "item" : {
          "tag" : "200",
          "field" : epca.form.Helper.c.sSubtagPrefix + "e",
          "fieldLabel" : "Podnázov a doplnky k názvu",
          "type" : "O",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.marc_textfield"
        }
      }, {
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Prvý údaj o pôvodcovi (zodpovednosti)",
        "item" : {
          "tag" : "200",
          "field" : epca.form.Helper.c.sSubtagPrefix + "f",
          "fieldLabel" : "Prvý údaj o pôvodcovi (zodpovednosti)",
          "type" : "O",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.marc_textfield"
        }
      }, {
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Ďalší údaj o pôvodcovi (zodpovednosti)",
        "item" : {
          "tag" : "200",
          "field" : epca.form.Helper.c.sSubtagPrefix + "g",
          "fieldLabel" : "Ďalší údaj o pôvodcovi (zodpovednosti)",
          "type" : "O",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.marc_textfield"
        }
      }, {
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Číslo časti",
        "item" : {
          "tag" : "200",
          "field" : epca.form.Helper.c.sSubtagPrefix + "h",
          "fieldLabel" : "Číslo časti",
          "type" : "O",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.marc_textfield"
        }
      }, {
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Názov časti",
        "item" : {
          "tag" : "200",
          "field" : epca.form.Helper.c.sSubtagPrefix + "i",
          "fieldLabel" : "Názov časti",
          "type" : "O",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.marc_textfield"
        }
      }, {
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Jazyk súbežného názvu",
        "item" : {
          "tag" : "200",
          "field" : epca.form.Helper.c.sSubtagPrefix + "z",
          "fieldLabel" : "Jazyk súbežného názvu",
          "type" : "O",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.codeddata_combobox",
          "csStatTableN" : epca.Config.User.dbTab + "*STABLE_UT_LANGUAGE"
        }
      }, {
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Označenie zväzku",
        "item" : {
          "tag" : "200",
          "field" : epca.form.Helper.c.sSubtagPrefix + "v",
          "fieldLabel" : "Označenie zväzku",
          "type" : "O",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.marc_textfield"
        }
      }]
    }, {
      "xtype" : "epca.repeatable_encapsulation",
      "autoHeight" : true,
      "autoWidth" : true,
      "labelWidth" : 200,
      "item" : {
        "tag" : "205",
        "tagLabel" : "Údaje o vydaní",
        "xtype" : "epca.marc_fieldset",
        "repeatable" : true,
        "type" : "O",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "title" : "205: Údaje o vydaní",
        "items" : [{
          "tag" : "205",
          "field" : epca.form.Helper.c.sSubtagPrefix + "a",
          "fieldLabel" : "Údaj o vydaní",
          "type" : "R",
          "repeatable" : false,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.marc_textfield"
        }]
      }
    }, {
      "xtype" : "epca.repeatable_encapsulation",
      "autoHeight" : true,
      "autoWidth" : true,
      "labelWidth" : 200,
      "item" : {
        "tag" : "210",
        "tagLabel" : "Bibliografická adresa",
        "xtype" : "epca.marc_fieldset",
        "repeatable" : true,
        "type" : "O",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "title" : "210: Bibliografická adresa",
        "items" : [{
          "xtype" : "epca.repeatable_encapsulation",
          "autoHeight" : true,
          "autoWidth" : true,
          "labelWidth" : 200,
          "fieldLabel" : "Miesto vydania, distribúcie, atď.",
          "item" : {
            "tag" : "210",
            "field" : epca.form.Helper.c.sSubtagPrefix + "a",
            "fieldLabel" : "Miesto vydania, distribúcie, atď.",
            "type" : "Q",
            "repeatable" : true,
            "labelWidth" : 200,
            "width" : 400,
            "xtype" : "epca.marc_textfield"
          }
        }, {
          "xtype" : "epca.repeatable_encapsulation",
          "autoHeight" : true,
          "autoWidth" : true,
          "labelWidth" : 200,
          "fieldLabel" : "Adresa vydavateľa, distribútora, atď.",
          "item" : {
            "tag" : "210",
            "field" : epca.form.Helper.c.sSubtagPrefix + "b",
            "fieldLabel" : "Adresa vydavateľa, distribútora, atď.",
            "type" : "O",
            "repeatable" : true,
            "labelWidth" : 200,
            "width" : 400,
            "xtype" : "epca.marc_textfield"
          }
        }, {
          "xtype" : "epca.repeatable_encapsulation",
          "autoHeight" : true,
          "autoWidth" : true,
          "labelWidth" : 200,
          "fieldLabel" : "Meno vydavateľa, distribútora, atď.",
          "item" : {
            "tag" : "210",
            "field" : epca.form.Helper.c.sSubtagPrefix + "c",
            "fieldLabel" : "Meno vydavateľa, distribútora, atď.",
            "type" : "Q",
            "repeatable" : true,
            "labelWidth" : 200,
            "width" : 400,
            "xtype" : "epca.marc_textfield"
          }
        }, {
          "xtype" : "epca.repeatable_encapsulation",
          "autoHeight" : true,
          "autoWidth" : true,
          "labelWidth" : 200,
          "fieldLabel" : "Dátum vydania, distribúcie, atď.",
          "item" : {
            "tag" : "210",
            "field" : epca.form.Helper.c.sSubtagPrefix + "d",
            "fieldLabel" : "Dátum vydania, distribúcie, atď.",
            "type" : "Q",
            "repeatable" : true,
            "labelWidth" : 200,
            "width" : 400,
            "xtype" : "epca.marc_textfield"
          }
        }, {
          "xtype" : "epca.repeatable_encapsulation",
          "autoHeight" : true,
          "autoWidth" : true,
          "labelWidth" : 200,
          "fieldLabel" : "Miesto výroby",
          "item" : {
            "tag" : "210",
            "field" : epca.form.Helper.c.sSubtagPrefix + "e",
            "fieldLabel" : "Miesto výroby",
            "type" : "O",
            "repeatable" : true,
            "labelWidth" : 200,
            "width" : 400,
            "xtype" : "epca.marc_textfield"
          }
        }, {
          "xtype" : "epca.repeatable_encapsulation",
          "autoHeight" : true,
          "autoWidth" : true,
          "labelWidth" : 200,
          "fieldLabel" : "Adresa výrobcu",
          "item" : {
            "tag" : "210",
            "field" : epca.form.Helper.c.sSubtagPrefix + "f",
            "fieldLabel" : "Adresa výrobcu",
            "type" : "O",
            "repeatable" : true,
            "labelWidth" : 200,
            "width" : 400,
            "xtype" : "epca.marc_textfield"
          }
        }, {
          "xtype" : "epca.repeatable_encapsulation",
          "autoHeight" : true,
          "autoWidth" : true,
          "labelWidth" : 200,
          "fieldLabel" : "Meno výrobcu",
          "item" : {
            "tag" : "210",
            "field" : epca.form.Helper.c.sSubtagPrefix + "g",
            "fieldLabel" : "Meno výrobcu",
            "type" : "O",
            "repeatable" : true,
            "labelWidth" : 200,
            "width" : 400,
            "xtype" : "epca.marc_textfield"
          }
        }, {
          "xtype" : "epca.repeatable_encapsulation",
          "autoHeight" : true,
          "autoWidth" : true,
          "labelWidth" : 200,
          "fieldLabel" : "Dátum výroby",
          "item" : {
            "tag" : "210",
            "field" : epca.form.Helper.c.sSubtagPrefix + "h",
            "fieldLabel" : "Dátum výroby",
            "type" : "O",
            "repeatable" : true,
            "labelWidth" : 200,
            "width" : 400,
            "xtype" : "epca.marc_textfield"
          }
        }]
      }
    }, {
      "xtype" : "epca.repeatable_encapsulation",
      "autoHeight" : true,
      "autoWidth" : true,
      "labelWidth" : 200,
      "item" : {
        "tag" : "215",
        "tagLabel" : "Fyzický popis/Kolácia",
        "xtype" : "epca.marc_fieldset",
        "repeatable" : true,
        "type" : "O",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "title" : "215: Fyzický popis/Kolácia",
        "items" : [{
          "xtype" : "epca.repeatable_encapsulation",
          "autoHeight" : true,
          "autoWidth" : true,
          "labelWidth" : 200,
          "fieldLabel" : "Špecifické označenie typu dokumentu a jeho rozsahu",
          "item" : {
            "tag" : "215",
            "field" : epca.form.Helper.c.sSubtagPrefix + "a",
            "fieldLabel" : "Špecifické označenie typu dokumentu a jeho rozsahu",
            "type" : "R",
            "repeatable" : true,
            "labelWidth" : 200,
            "width" : 400,
            "xtype" : "epca.marc_textfield"
          }
        }]
      }
    }, {
      "tag" : "700",
      "tagLabel" : "Osobné meno - Hlavná intelektuálna zodpovednosť",
      "xtype" : "epca.marc_fieldset",
      "repeatable" : false,
      "type" : "O",
      "autoHeight" : true,
      "autoWidth" : true,
      "labelWidth" : 200,
      "title" : "700: Osobné meno - Hlavná intelektuálna zodpovednosť",
      "items" : [{
        "tag" : "700",
        "field" : epca.form.Helper.c.sSubtagPrefix + "a",
        "fieldLabel" : "Vstupný prvok",
        "type" : "R",
        "repeatable" : false,
        "labelWidth" : 200,
        "width" : 400,
        "convertMap" : {
          "1" : {
            "tag" : "200",
            "field" : epca.form.Helper.c.sSubtagPrefix + "a"
          }
        },
        "xtype" : "epca.marc_textfield"
      }, {
        "tag" : "700",
        "field" : epca.form.Helper.c.sSubtagPrefix + "b",
        "fieldLabel" : "Časť mena odlišná od vstupného prvku",
        "type" : "O",
        "repeatable" : false,
        "labelWidth" : 200,
        "width" : 400,
        "convertMap" : {
          "1" : {
            "tag" : "200",
            "field" : epca.form.Helper.c.sSubtagPrefix + "b"
          }
        },
        "xtype" : "epca.marc_textfield"
      }, {
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Prívlastky mena okrem dátumu",
        "item" : {
          "tag" : "700",
          "field" : epca.form.Helper.c.sSubtagPrefix + "c",
          "fieldLabel" : "Prívlastky mena okrem dátumu",
          "type" : "O",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "convertMap" : {
            "1" : {
              "tag" : "200",
              "field" : epca.form.Helper.c.sSubtagPrefix + "c"
            }
          },
          "xtype" : "epca.marc_textfield"
        }
      }, {
        "tag" : "700",
        "field" : epca.form.Helper.c.sSubtagPrefix + "f",
        "fieldLabel" : "Dátumy",
        "type" : "O",
        "repeatable" : false,
        "labelWidth" : 200,
        "width" : 400,
        "convertMap" : {
          "1" : {
            "tag" : "200",
            "field" : epca.form.Helper.c.sSubtagPrefix + "f"
          }
        },
        "xtype" : "epca.marc_textfield"
      }, {
        "tag" : "700",
        "field" : epca.form.Helper.c.sSubtagPrefix + "3",
        "fieldLabel" : "Číslo záznamu v heslári",
        "type" : "Q",
        "repeatable" : false,
        "labelWidth" : 200,
        "width" : 400,
        "xtype" : "epca.marc_search_combobox",
        "db" : epca.Config.User.dbAuth,
        "index" : "1",
        "convertMap" : {
          "1" : {
            "tag" : "001",
            "field" : "."
          }
        },
        "convertGroup" : "1"
      }, {
        "xtype" : "epca.repeatable_encapsulation",
        "autoHeight" : true,
        "autoWidth" : true,
        "labelWidth" : 200,
        "fieldLabel" : "Kód funkcie",
        "item" : {
          "tag" : "700",
          "field" : epca.form.Helper.c.sSubtagPrefix + "4",
          "fieldLabel" : "Kód funkcie",
          "type" : "Q",
          "repeatable" : true,
          "labelWidth" : 200,
          "width" : 400,
          "xtype" : "epca.codeddata_combobox",
          "csStatTableN" : epca.Config.User.dbTab + "*STABLE_UT_RELATOR_CODE",
          "convertMap" : {
            "1" : {
              "tag" : "000",
              "field" : epca.form.Helper.c.sSubtagPrefix + "x"
            }
          }
        }
      }]
    }];

    Ext.apply(config, {
      width : 800,
      height : 600,
      title : 'Link Entry',
      autoScroll : true,
      layout : 'form',
      padding : 10,
      items : [/*{
       id : 'windowLinkEntrySearchCombobox',
       xtype : 'epca.marc_search_combobox',
       fieldLabel : epca.L10n.titleVyhledat,
       labelWidth : 200,
       width : 500,
       db : config.db,
       index : config.index,
       minQueryLength : 1
       },*/
      {
        //id : 'windowLinkEntrySearchCombobox',
        xtype : 'cs_auth_select',
        fieldLabel : epca.L10n.titleVyhledat,
        labelWidth : 200,
        width : 500,
        editable : true,
        db : config.db,
        index : config.index,
        minQueryLength : 1,
        csMarcConvDef : config.csMarcConvDef,
        csLoadMarcMap : [],
        csFlexPopParams : {
          classn : config.db,
          displayFmt : config.fmt,
          idxlistStoreId : config.idxlistStoreId,
          displayFmtPnl : config.displayFmtList,
          initUseAttr : config.index
        },
        csEditFieldName : '000x',
        csLoadMarcRecord : function(pRecord) {
          var sTag;
          
          if (!pRecord) {
            return;
          }
          var marc = epca.convertToObject(pRecord.data, epca.Config.getDbFormat(this.db));
          // 08.01.20 on; vyjimka, tagy Txx se dotahnou do poli Cxx (cs113626) - dotahuje se zaznam a obsah T82 se zapise do C82
          for (sTag in marc) {
            if (marc.hasOwnProperty(sTag)) {
              if (sTag.substring(0, 1) === 'T') {
                marc['C' + sTag.substring(1, 3)] = marc[sTag];
              }
            }
          }
          
          // 24.09.20 on; natvrdo vyjimka - pole 200v v 463 se automaticky generuje na serveru a nebude se tedy tu dotahovat ze zdrojoveho zaznamu
          //              zatim to tu pro vsechna dotahovani, slo by to kdyz tak omezit na pole 463
          marc['200'][epca.form.Helper.c.sSubtagPrefix + 'v'] = '';

          // 24.01.12 on; opravene PB v opakovatelnem poli
          // 23.01.12 on; predany nazev db
          if (this.ownerCt) {
            if ((this.ownerCt.xtype === 'epca.repeatable_encapsulation') && (this.ownerCt.ownerCt)) {
              this.ownerCt.ownerCt.setMarc(marc, true, this.convertGroup, pRecord.classn);
            } else {
              this.ownerCt.setMarc(marc, true, this.convertGroup, pRecord.classn);
            }
          }
        }
      }, {
        id : 'windowLinkEntryMainFieldSet',
        xtype : 'epca.marc_fieldset',
        autoHeight : true,
        autoWidth : true,
        frame : false,
        border : false,
        style : {
          paddingLeft : '0px',
          paddingTop : '10px',
          paddingRight : '0px',
          paddingBottom : '0px'
        },
        // 28.07.17 on; pokud je definovany vlastni seznam tagu nebo vlastni formular, nebude zatim nic generovat (do formulare se nactou pozdej)
        items : (config.taglist || config.leFormName) ? [] : aItems
      }],
      buttonAlign : 'center',

      getMarc : function() {
        var retVal = (this.getComponent('windowLinkEntryMainFieldSet')).getMarc();

        // 02.09.13 on; pouze pokud je vyplneny kod a neobsahuje jeste *
        if ((retVal['001']) && (retVal['001']['.'] !== '') && (!retVal['001']['.'].find('*'))) {
          retVal['001']['.'] = epca.Config.getLinkDbValue(config.db) + '*' + retVal['001']['.'];
        }

        //Ak neexistuje 001, bude potrebne vytvorit novy zaznam

        return retVal;
      },

      setMarc : function(marc/*, convert, group*/) {
        (this.getComponent('windowLinkEntryMainFieldSet')).setMarc(marc);
      }
    });

    epca.window.LinkEntryDefault.superclass.constructor.call(this, config);
  }
});
