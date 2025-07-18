/**
 * @author Michal Namesny
 *
 * 23.06.25 on; ikona obrazek
 * 03.03.25 on; moznost nemazat Txx tagy
 * 20.02.25 on; ulozi zaznam pred prilozenim prilohy
 * 18.02.25 on; cteni boosteru pri zmene skinu 
 * 31.01.25 on; prida do ouska id zaznamu
 * 21.01.25 on; pridan parametr, zda nezakazat tlacitko Do IPAC
 * 20.01.25 on; doplneno pro sav
 * 06.12.24 on; moznost nastavit v UnDatabases_ictx.json formtype
 * 01.07.24 on; slouceno a pridano "I"
 * 13.06.24 on; moznost nastavit popisek zobrazovaciho formatu
 * 10.06.24 on; moznost nastavit popisek zobrazovaciho formatu
 * 28.05.24 on; pro zaznam ctenare zobrazi v pripade U95a=1 jinou hlasku
 * 29.04.24 on; nastaveni css bude pouze v csp souboru
 * 11.10.23 on; snaha zamezit pokusu o opakovane vlozeni noveho zaznamu (dvojklikem)
 * 20.07.23 on; nekontrolovat pri kopirovani zaznamu
 * 14.07.23 on; nekontrolovat pri odeslani do/z ipac
 * 14.07.23 on; zrusena vyjimka pro individualniho uzivatele
 * 28.06.23 on; moznsot predat zaznam v parametru
 * 27.06.23 on; pro Datovy zaznam na CAV je nutne pro zobrazeni tlacitko k odeslani do IPAC vyplnene pole U95c=1
 * 27.06.23 on; moznost zobrazit hlasku
 * 21.06.23 on; nekontrolovat Datovy zaznam na CAV pri ulozeni
 * 07.06.23 on; json5
 * 23.02.23 on; musi vzit db z vybraneho formulare
 * 22.11.22 on; moznost vytvorit kopii zaznamu
 * 18.11.22 on; zobrazeni tlacitko copy
 * 04.11.22 on; skryta globalni limita pro vyhledavani pro PB
 * 10.02.21 on; oprava zobrazeni vysledku kontroly zaznamu
 * 13.01.21 on; nastavi vlastnika zaznamu - pouziva se pri kopii zaznamu
 * 08.01.21 on; doplni vlastnika zaznamu - do 999e - pokud tam neni
 * 07.01.21 on; vymaz zaznamu
 * 07.01.21 on; icon-error-epca
 * 06.01.21 on; zmena sActualCssStyle
 * 21.12.20 on; rolovani na spravnou pozici po ulozeni
 * 26.03.20 on; pred ulozenim odfiltruje vsechny $T subtagy, protoze jsou na formulari (napr. EU) uprostred pole a vsechna pole za nim se ztraci
 * 05.03.20 on; nastaveni skinu
 * 14.02.20 on; funkce 928
 * 24.01.20 on; razeni zaznam podle konfigurace
 * 06.12.19 on; dialog pro otevreni formulare
 * 27.11.19 on; do defaultValues musim doplnit prefix 'st'
 * 06.06.19 on; pripadna kotva
 * 29.05.19 on; anchor
 * 10.01.19 on; ikony ve SPAN
 * 13.12.17 on; zapojen filtr pri kopii zaznamu
 * 21.11.17 on; ikony v prehledu kontrol
 * 16.11.17 on; zmena zobrazeni vysledku kontrol
 * 13.09.17 on; pri ulozeni zaznamu pridano zobrazeni vysledku kontrol
 * 04.05.17 on; parametry tlacitko WOS/SCOPUS
 * 11.04.17 on; upravena kontrola pri otrevreni zaznamu
 * 10.14.17 on; kontroly pro sluk
 * 29.03.17 on; uprava tlacitek pro CAV
 * 18.11.16 on; doplneny dboptions do prebirani z wos/scopus
 * 02.11.16 on; upraven import z WOS/SCOPUS
 * 03.10.16 on; v csClearCheckIcons doplnena kontrola existence prvku
 * 26.09.16 on; defaultni hodnoty do csLoadRecordPopup
 * 19.09.16 on; moznost odmazat pole 610 pri prebirani zaznamu z wos/scopus
 * 08.08.16 on; zobrazeni poli v importu WOS/SCOPUS
 * 26.07.16 on; upraven import WOS/SCOPUS
 * 21.07.16 on; import WOS/SCOPUS
 * 20.05.16 on; uprava volani convertToObject
 * 25.04.16 on; rozsireni csURLBtn
 * 24.03.16 on; do hlavniho vyhledavani pres combobox zapojena podpora pro novy SE
 * 25.02.16 on; moznost zadat komplet URL - doplnim jenom parametry
 * 18.02.16 on; predelane kvuli velkym formularum
 * 12.12.14 on; rozsireni
 * 08.12.14 on; tisk presunut do hlavniho toolbaru
 * 03.12.14 on; tisk
 * 10.06.14 on; podpora limit
 * 07.03.14 on; podpora jazykovych mutaci v nazvu formulare
 * 29.11.12 on; doplnene nastaveni indexu pro vyhledavani
 * 14.11.12 on; nastaveny index 2009 (misto 1016)
 * 12.11.12 on; uprava chovani topDbSelect
 * 04.09.12 on; nastaveny index dez (misto 1016)
 * 19.07.12 on; doplnena aktualizace zaznamu po ulozeni do db (insert)
 * 23.05.12 on; v csOnDFClick povoleno otevreni odkazu v nove zalozce
 * 24.01.12 on; csOnDFClick
 * 20.01.12 on; otevreni formualre podle c99d
 * 30.08.11 on; doplnena moznost zadat kod zaznamu pro otevreni v editoru
 * 20.07.11 on; moznost predat nazev formulare v URL
 */
/*global Ext,i3,epca,document,window,Blob,replacejscssfile,setTimeout,alert,getActCss */

Ext.ns('epca.evidence');

epca.evidence.c = {
	sFieldCheckError : 'icon-field-csCheckError',
	sFieldCheckWarning : 'icon-field-csCheckWarning',
	sFieldCheckInfo : 'icon-field-csCheckInfo',

	sAnonymous : 'I3UG_AN',
	sIndividual : 'I3UG_IN',
	sProcessor : 'I3UG_ZP', // 28.03.17 on;
	sSuper : 'I3UG_SU', // 28.03.17 on;

	// 29.04.24 on; nastaveni bude pouze v csp souboru
	//sActualCssStyle : 'css/' + i3.ictx.toLowerCase() + '.css', // globalni promenna - defaultni styl - musi byt shodny se stylem v indexEvidence.csp

	sFormMsgId : 'openformmsg', // id dialogu pro zobrazeni info o probihajici akci
	sFormMsgId2 : 'saveformmsg', // id dialogu pro zobrazeni info o probihajici akci - pro ulozeni zaznamu

	// 21.11.17 on; ikony v prehledu kontrol
	sErrorImg : '<img src="images/exclamation.gif" alt="Error">',
	sWarningImg : '<img src="images/check_warn.gif" alt="Warning">',
	sInfoImg : '<img src="images/information.png" alt="Info">'
};

epca.evidence.tx = {
	txCheckOK : 'Záznam je v poriadku.#Záznam je v pořádku.#Record is alright.'.ls(),
	txNew : 'new#new#new'.ls()
};

epca.evidence.EvidencePanel = Ext.extend(Ext.Panel, {

	nTabCount : 0,
	tabPanelForms : undefined,
	csHideDFPanel : undefined,

	csUnFormatStore : undefined,
	csCounter : 0,

	// recordId
	// marcToSet

	/**
	 * Vrati formular z danej zalozky
	 * @param {Object} tab Zalozka
	 */
	getTabNumber : function() {
		this.nTabCount += 1;
		return this.nTabCount;
	},
	/**
	 * Vrati formular z danej zalozky
	 * @param {Object} tab Zalozka
	 */
	getForm : function(tab) {
		// v pripade zmeny opravit i v epca.form.KindValue
		return tab.get(1).get(0);
	},
	/**
	 * Lazy inicializacia panelu tabov
	 */
	getTabPanelForms : function() {
		if (!Ext.isDefined(this.tabPanelForms)) {
			this.tabPanelForms = new Ext.TabPanel({
				id : 'tabPanelForms',
				border : false,
				tabPosition : 'top',
				autoWidth : true, // 29.10.15 on; doplneno kvuli problem se zmensovani okna u IE a Chrome
				plugins : new Ext.ux.TabCloseMenu(),
				enableTabScroll : true, // 18.11.15 on; scrollbar pres zalozky
				listeners : {
					tabchange : {
						// reakce na prepinani mezi zalozkami
						fn : function(tabPanel, tab) {
							this.csUpdateInterface(tab);
							this.csUpdateInterfaceSave(tab);
						},
						scope : this
					}
				}
			});
		}
		return this.tabPanelForms;
	},
	/**
	 * Pridanie formulara, noveho alebo existujuceho do novej zalozky (tabu)
	 * @param {Object} form
	 */
	addForm : function(form) {
		var sDFlist, record;
		// makra na jednoduche prefixovanie id-ciek elementov
		var idprefix = 'tab' + this.getTabNumber();
		var idpref = i3.getIdPrefFn(idprefix);
		//, getCmp = i3.getCmpFn(idprefix);

		// 18.02.16 on; zapamatuju si, ze pridavam formular, ze proces pridavani formulare bezi, kvuli ZF
		this.csAddingFormZF = true;

		// preload few UnTablesd records
		this.csTablesdCacheInit(form.formTablesdCache);

		// 16.10.15 on; ZF muze byt vyplneny primo v definici formulare
		if (!i3.isEmptyString(form.formDFST)) {
			// zadany nazev ST ZF v definici formulare
			sDFlist = form.formDFST;
		} else {
			// 10.12.14 on; zjisti ZF
			var comboDbBox = Ext.getCmp('topDbSelect');

			// 23.02.23 on; musi vzit db z vybraneho formulare
			//var dbname = comboDbBox.getValue();
			//var n = comboDbBox.store.findExact('id', comboDbBox.getValue());
			var n = comboDbBox.store.findExact('id', form.targetDb);
			if (n >= 0) {
				record = comboDbBox.store.getAt(n);
			}
			if (record) {
				// existujici zaznam
				sDFlist = record.data['dflist'];
			}
		}

		/*var pnlForm = new Ext.Panel({
		 xtype : 'form', //
		 border : true,
		 frame : true,
		 title : 'ahojky',
		 items : form.generate(true)
		 });*/

		var newTab = this.getTabPanelForms().add({
			// 07.03.14 on; jazykove mutace
			title : form.title.ls(),
			iconCls : "epca-list",
			closable : true,

			// 29.10.15 on; osetreno chovani v chrome
			autoScroll : true,
			// 29.10.15 on; osetreno chovani v chrome
			//autoWidth : true,

			layout : 'border',
			idpref : idprefix,

			items : [{
				region : 'east',
				// 10.06.24 on; moznost nastavit popisek zobrazovaciho formatu
				title : epca.Config.User.DisplayFormatText || epca.L10n.txDisplayFormat,
				hidden : ((this.getTabPanelForms().items.items.length > 0) || this.csHideDFPanel) ? this.csIsDfHidden() : false,
				split : true,
				width : this.csGetZfWidth(),
				minSize : 170,
				maxSize : 700,
				collapsible : true,
				collapsed : false,
				margins : '5 5 5 0',
				autoScroll : true,
				id : idpref('displayPnl'),
				html : '',
				listeners : {
					expand : {
						fn : function() {
							this.csUpdateZFInfo();
						},
						scope : this
					},
					/*collapse : {
					 fn : function(panel) {
					 this.doLayout();
					 this.ownerCt.doLayout();
					 this.ownerCt.ownerCt.doLayout();
					 },
					 scope : this
					 },*/
					render : {
						fn : function(cmp) {
							cmp.getEl().on('click', function(e) {
								this.csOnDFClick(e);
							}, this, {});
						},
						scope : this
					},
					resize : {
						fn : function(cmp) {
							// platnost rok
							var d = new Date();
							d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));

							// 10.02.16 on; ulozi sirku panelu se ZF
							Ext.util.Cookies.set('i3epcazfwidth', cmp.getWidth(), d);
						},
						scope : this
					}
				},
				// zatim nic
				/*items : [{
				 xtype : 'component',
				 id : 'ifrejm',
				 autoEl : {
				 tag : 'iframe',
				 height : '100%',
				 width : '100%',
				 border : '0',
				 frameborder : '0'
				 }
				 }],*/
				tbar : [{
					xtype : 'cs_combo_st',
					id : idpref('displayPnlFmt'),
					editable : false,
					typeAhead : true,
					csStatTableN : sDFlist || 'EPCA_ZFLIST_BIB',
					csAutoSelectFirst : true,
					csHideNotFoundWarning : true, // 17.07.12 on;
					csOnLoadCallBack : this.csHideIfNotSet, // 17.07.12 on;
					csOnLoadScope : this, // 17.07.12 on;
					displayField : 'text',
					valueField : 'id',
					mode : 'local',
					triggerAction : 'all',
					allowBlank : false,
					lazyInit : false,
					width : 180,
					forceSelection : true,
					csHideQtip : true, // 21.01.16 on; skryje tooltip/qtip
					listeners : {
						// 12.04.11 on; zmena udalosti na select
						//change: {
						select : {
							fn : function() {
								this.csUpdateZFInfo();
								// redisp
							},
							scope : this
						}
					}
				}, {
					xtype : 'button',
					text : epca.L10n.txUpdateZF,
					listeners : {
						click : {
							fn : function() {
								this.csUpdateZFInfo();
							},
							scope : this
						}
					}
				}/*, {
				xtype : 'tbseparator'
				}*/
				// 08.12.14 on; presunuto do horniho menu
				/*{
				 xtype : 'button',
				 //text : i3.Is.Borrow.tx.txPrint,
				 //text : epca.L10n.txUpdateZF,
				 //id : idpref('print'),
				 iconCls : 'icon-print',
				 handler : function() {
				 this.csPrintDF();
				 },
				 scope : this
				 }*/]
			}, {
				region : 'center',
				// 02.11.15 on; potrebuju zfunkcnit clientvalidation
				//layout : 'fit',
				xtype : 'form',

				labelAlign : 'left',
				border : false,
				margins : '5 0 0 5',
				autoScroll : true,
				//autoWidth : true,
				// 08.02.16 on; zruseno -  nechovalo se idelane pro pruznou delku poli
				// 30.10.15 on; nastaveno pro CAV, kdyby nekde vadilo, prida vyjimku pro CAV
				//minWidth : i3.ictx.toLowerCase() === 'cav' ? 980 : 800,
				items : [form.generate(true)],
				//monitorValid : true,   // 22.01.16 on; zruseno, neni idealni
				listeners : {
					// 22.01.16 on; zruseno, neni idealni
					/*clientvalidation : function(form, isValid) {
					this.csUpdateInterfaceSave(form);
					},*/
					// 14.01.16 on; toto je tu jenom kvuli tomu, ze v IE nefunguje spravne autoWidth viz. metoda generate v epca.form.js
					bodyresize : function(form) {
						var nWidth;
						if (form && form.items && form.items.items && form.items.items[0]) {
							nWidth = form.getSize().width;
							if (nWidth < form.minWidth) {
								nWidth = form.minWidth;
							}
							form.items.items[0].setWidth(nWidth - 20);
						}
					},
					scope : this
				}
				//listeners : {
				/*render : {
				fn : function() {
				// alert('a');
				this.on('clientvalidation', this.csalert('b'), this);
				}
				}*/
				/*resize : function() {
				this.doLayout();
				this.ownerCt.doLayout();
				this.ownerCt.items.items[0].doLayout();
				//this.ownerCt.ownerCt.doLayout();
				}*/
				//}
			}],
			form : form,
			//monitorValid : true,
			//xtype : 'form',
			//layout : 'form',

			listeners : {
				beforeclose : {
					fn : this.csOnCloseTab,
					scope : this
				},
				form_changed : {
					fn : function(cmp, form) {
						// 22.01.16 on; po zmene hodnoty pole
						this.csUpdateInterface(form);
						this.csUpdateInterfaceSave(form);
						this.csUpdateZFInfo();
					},
					scope : this
				}
				//clientvalidation : function(form, isValid) {
				//  isValid = true;
				//alert('a');
				//}
				/*render : {
				 fn : function() {
				 // alert('a');
				 this.on('clientvalidation', this.csalert('b'), this);
				 }
				 }*/
			},
			csCheckRightsToRec : function(pTab) {
				var record1;

				// kontroly
				if (i3.isEmptyString(epca.Config.User.csCheckRightsToRecord)) {
					return;
				}

				if (i3.isEmptyString(pTab.recordId)) {
					return;
				}

				// 11.04.17 on; zuniverzalneno
				// 18.11.15 on; pro cav se bude volat kontrola kvality
				// 19.12.14 on; nefunguje zjisteni opravneni pro konkretni zaznam
				//       pak jeste zakazat tlacitko "ulozit" pro tuto zalozku
				/*sRecID = pTab.form.targetDb + '*' + pTab.recordId;
				i3.WS.rights({
				db: sRecID,
				right: epca.Config.User.csCheckRightsToRecord,
				success: function(o) {
				if (o.ret_code !== '0') {
				// prava nepotvrzena, zakaze polozky panelu
				pTab.csDisableTabItems();
				}
				},
				scope: this
				});*/
				//if ((i3.ictx.toLowerCase() === 'cav') || (i3.ictx.toLowerCase() === 'sluk')) {

				if (!Ext.isDefined(pTab) || (pTab === null)) {
					return;
				}
				var newMarc = this.getForm(pTab).getMarc(epca.cloneObject(pTab.marcToSet));
				this.mergeMarc(pTab.marcCloneToSet, newMarc);

				newMarc['001'] = pTab.recordId;
				record1 = epca.convertToMarc(newMarc);
				//  12.08.15  on;  mozna  uprava zaznamu  pred  ulozenim (i pred kontrolou)
				if (epca.Config.User && epca.Config.User.csPreSave) {
					epca.Config.User.csPreSave(record1, pTab);
				}
				record1.t001 = pTab.recordId;
				record1.classn = pTab.form.targetDb;
				record1.data = (record1.dataToWsRecord(true)).record;
				i3.WS.update({
					operation : 'check',
					success : function() {
					},
					failure : function(errorMsg) {
						i3.displayError(epca.L10n.evidenceOpenRecordError + '<br>' + errorMsg);
						// zakaze polozky panelu
						pTab.csDisableTabMainFs();
					},
					scope : this // 11.08.11 on; zmena scope
				}, record1);
			},
			/**
			 * zakaze hlavni fieldset
			 */
			csDisableTabMainFs : function() {
				var fs;
				// hlavni fieldset
				fs = this.getFormMainFieldset();
				if (fs) {
					fs.setDisabled(true);
					fs.disabled = true;
					// toto je tu kvuli kontrole pred ulozenim zaznamu
				}
				this.ownerCt.ownerCt.csUpdateInterfaceSave(this);
			},
			/**
			 * Vrati hlavni fieldset formulare.
			 */
			getFormMainFieldset : function() {
				if (this.items && this.items.items[1] && this.items.items[1].items) {
					return this.items.items[1].items.items[0];
				}
				return undefined;
			}
		});

		// 16.02.16 on; potrebuju to na delsi dobu
		// 14.01.16 on; zobrazeni zpravy o otevirani zaznamu
		//i3.msg(epca.L10n.txOpeningRecord, undefined, undefined, undefined, true);
		i3.msgOn(epca.L10n.txOpeningRecord, undefined, undefined, epca.evidence.c.sFormMsgId, true);

		try {
			newTab.show();

			var item = this.getForm(newTab);

			// 27.11.19 on; do defaultValues musim doplnit prefix 'st'
			epca.csAddStPrefixes(form.defaultValues);

			// vlozeno do metody
			this.csLoadRecord(newTab, epca.cloneObject(form.defaultValues));
			this.csAddFormWait(this, newTab, form, item, this.addFormEnd);
		} catch(err) {
			// chyba
			i3.msgOff(epca.evidence.c.sFormMsgId);
			// 26.04.16 on; zobrazi chybu
			i3.alert(err.message);
		}
	},
	/**
	 * 16.02.16 on; rozdelena funkce addform
	 */
	csAddFormWait : function(scope, newTab, form, item, callback, callbackscope, nScrollTop) {
		//start = new Date().getTime();

		// 16.02.16 on; sice funguje, ale az od verze IE10
		/*if (epca.wait) {
		 setTimeout(scope.csAddFormWait, 1000, scope, newTab, form, item);
		 } else {
		 scope.addFormEnd(newTab, form, item);
		 }*/
		(function() {
			var self = arguments.callee;
			if (scope.csWaitForSemafor(epca.semafor)) {
				setTimeout(self, 1000);
			} else {
				//end = new Date().getTime();
				//time = end - start;
				//alert(time);

				callbackscope = callbackscope || scope;
				// 21.12.20 on; doplneny parametr
				callback.call(callbackscope, newTab, form, item, nScrollTop);
			}
		})();
	},
	csWaitForSemafor : function(o) {
		var prop, v;
		for (prop in o) {
			if (o.hasOwnProperty(prop)) {
				v = o[prop];
				if (v) {
					return true;
				}
			}
		}

		// uz se nemusi cekat
		return false;
	},

	/**
	 * 16.02.16 on; rozdelena funkce addform
	 */
	addFormEnd : function(newTab, form, item) {
		try {
			// 16.02.16 on; oddeleno z csLoadRecord
			this.csLoadRecordEnd(newTab);

			// Update nazvov tagov a podpoli, podla hodnot v DB
			this.csUpdateFieldNames(form, item);
			// 19.12.14 on; moznost zkontrolovat prava na zaznam
			if (!i3.isEmptyString(epca.Config.User.csCheckRightsToRecord)) {
				newTab.csCheckRightsToRec.call(this, newTab);
			}

			// 26.10.11 on; spusti validaci
			item.validate();

			// 22.01.16 on; presunuto do csLoadRecord
			// po nacteni formulare, zavola funkci znovu
			//this.csUpdateInterface(newTab);
			//this.csUpdateInterfaceSave(newTab);

			// 04.09.15 on; kontrola, jestli nedoslo, ke ztrate nejakeho pole
			this.csIsRecordChangedAndShowInfo();
		} catch(err) {
			// chyba
			i3.msgOff(epca.evidence.c.sFormMsgId);
		}

		i3.msgOff(epca.evidence.c.sFormMsgId);
		//alert('msgOff');
	},
	/**
	 * Odmaze z objektu polozky s prazdnymi hodnotami (prazdny string, undefined, prazdne pole)
	 * @param {Object} key
	 * @param {Object} value
	 * @param {Object} object
	 */
	deleteEmptyItems : function(key, value, object) {
		if (Ext.isArray(value)) {
			if (value.length === 0) {
				delete object[key];
				return;
			}
			var isEmpty = true, i;
			for ( i = 0; i < value.length; i++) {
				isEmpty = isEmpty && epca.isEmpty(value[i]);
			}
			if (isEmpty) {
				delete object[key];
				return;
			}
		}

		if (epca.isEmpty(value)) {
			delete object[key];
		}

		// 03.03.25 on; moznost nemazat Txx tagy
		// 04.09.15 on; tag 000 potrebujeme
		// Tagy ktore nie je potrebne nacitavat
		//if (key === '000' || key[0] === 'T') {
		if (!epca.Config.User.csDoNotDeleteTxx) {
		  if (key[0] === 'T') {
	        delete object[key];
		  }
	    }
	},
	isUnloadedData : function(object) {
		return !epca.isEmpty(object);
	},
	constructor : function(config) {
		var cmpPBSearch = {
			hidden : true
		}, cmpDBList = {
			hidden : true
		}, cmpDBListPB = {
			hidden : true
		}, cmpFn969f = {
			hidden : true
		}, cmpFnClear969f = {
			hidden : true
		}, cmpFn969fSeparator = {
			id : 'maintb_set969f_separator',
			xtype : 'spacer',
			width : 10,
			hidden : true
		}, cmpFnClearSeparator = {
			id : 'maintb_clear969f_separator',
			xtype : 'spacer',
			width : 10,
			hidden : true
		}, cmnUserName = {
			hidden : true
		}, cmpUsernameSeparator = {
			xtype : 'spacer',
			width : 10,
			hidden : true
		}, cmpMenuSeparator = {
			xtype : 'spacer',
			width : 10,
			hidden : true
		}, cmpContentServerBtn = {
			hidden : true
		}, cmpCopyRecordBtn = {
			hidden : true
		}, cmpCheckRecordBtn = {
			hidden : true
		}, o, cmpLogout, cmpMainSearch = {
			hidden : true
		}, cmpPrint, cmpMainSearchSeparator = {
			// 16.09.15 on; zmena
			//xtype : 'tbseparator',
			xtype : 'spacer',
			width : 10,
			hidden : true
		}, cmpPrintSeparator, cmpSave, cmpSaveSeparator, cmpNew, cmpCopyRecordBtnSeparator = {
			id : 'maintb_copyrecordbtn_separator', // 18.11.22 on;
			xtype : 'spacer',
			width : 10,
			hidden : true
		}, cmpCheckRecordBtnSeparator = {
			xtype : 'spacer',
			width : 10,
			hidden : true
		}, cmpContentServerBtnSeparator = {
			id : 'maintb_contentserverbtn_separator',
			xtype : 'spacer',
			width : 10,
			hidden : true
		}, aTBarItems, cmpURLBtn = {
			hidden : true
		}, cmpURLBtnSeparator = {
			xtype : 'spacer',
			width : 10,
			hidden : true
		}, cmpWosScopus = {
			hidden : true
		}, cmpWosScopusSeparator = {
			xtype : 'spacer',
			id : 'maintb_wosscopusbtn_separator',
			width : 10,
			hidden : true
		}, cmpDeleteBtn = {
			hidden : true
		}, cmpDeleteBtnSeparator = {
			xtype : 'spacer',
			//id : 'maintb_deletebtn_separator',
			width : 10,
			hidden : true
		};
		config = config || {};

		// MENU
		var toolBarMenu = [];
		// vytvorit kopii zaznamu
		if (epca.Config.User.ShowCopyRecordMenuFn) {
			toolBarMenu.push({
				text : epca.L10n.titleCopyRecord,
				iconCls : 'icon-copy',
				handler : function() {
					this.csCopyRecord();
				},
				scope : this
			});
		}

		// kopie zaznamu - tlacitko
		if (epca.Config.User.ShowCopyRecordBtnFn) {
			cmpCopyRecordBtn = {
				xtype : 'button',
				id : 'maintb_copyrecordbtn', // 18.11.22 on;
				iconCls : 'icon-copy',
				tooltip : epca.Config.User.ShowCopyRecordBtnHint || '',
				text : this.csGetBtnText(epca.Config.User.ShowCopyRecordBtnText, epca.L10n.titleCopyRecord),
				handler : function() {
					this.csCopyRecord();
				},
				scope : this
			};
			Ext.apply(cmpCopyRecordBtnSeparator, {
				hidden : false
			});
		}

		// kontrola kvality
		if (epca.Config.User.ShowCheckRecordMenuFn) {
			toolBarMenu.push({
				text : epca.L10n.titleCheckRecord,
				iconCls : 'icon-accept',
				handler : function() {
					this.csCheckRecord();
				},
				scope : this
			});
		}

		// kontrola kvality - tlacitko
		if (epca.Config.User.ShowCheckRecordBtnFn) {
			cmpCheckRecordBtn = {
				xtype : 'button',
				iconCls : 'icon-accept',
				tooltip : epca.Config.User.ShowCheckRecordBtnHint || '',
				text : this.csGetBtnText(epca.Config.User.ShowCheckRecordBtnText, epca.L10n.titleCheckRecord),
				handler : function() {
					this.csCheckRecord();
				},
				scope : this
			};
			Ext.apply(cmpCheckRecordBtnSeparator, {
				hidden : false
			});
		}

		// link na content server v menu
		if (epca.Config.User.ShowContentServerMenuFn) {
			toolBarMenu.push({
				text : epca.L10n.titleUploadContentServer,
				iconCls : 'icon-upload-file',
				handler : function() {
					this.csUploadContentServer();
				},
				scope : this
			});
		}

		// link na content server - tlacitko
		if (epca.Config.User.ShowContentServerBtnFn) {
			cmpContentServerBtn = {
				xtype : 'button',
				iconCls : 'icon-upload-file',
				tooltip : epca.Config.User.ShowContentServerBtnHint || '',
				text : this.csGetBtnText(epca.Config.User.ShowContentServerBtnText, epca.L10n.titleUploadContentServer),
				id : 'maintb_contentserverbtn',
				handler : function() {
					this.csUploadContentServer();
				},
				scope : this
			};
			Ext.apply(cmpContentServerBtnSeparator, {
				hidden : false
			});
		}

		// libovolny link - tlacitko
		if (!i3.isEmptyString(epca.Config.User.ShowURLBtnFn)) {
			cmpURLBtn = {
				xtype : 'button',
				iconCls : 'icon-url',
				text : this.csGetBtnText(epca.Config.User.ShowURLBtnFnText, ''),
				tooltip : epca.Config.User.ShowURLBtnFnHint || '',
				//id : 'maintb_contentserverbtn',
				handler : function() {
					this.csURLBtn();
				},
				scope : this
			};
			Ext.apply(cmpURLBtnSeparator, {
				hidden : false
			});
		}

		// 15.01.16 on; prepinani skinu
		var cmpCssList = {
			hidden : true, // zobrazi se jenom pokud bude potreba  // 02.11.16 on;
			xtype : 'cs_combo_st',
			csStatTableN : 'EPCA_CSS_LIST',
			// 05.03.20 on; zruseno
			//csAutoSelectFirst : i3.isEmptyString(Ext.util.Cookies.get('i3style')) ? true : false,
			// 29.04.24 on; upraveno
			//value : Ext.util.Cookies.get('i3style') || epca.evidence.c.sActualCssStyle,
			value : Ext.util.Cookies.get('i3style') || getActCss(),
			//tooltip : epca.Config.User.ShowURLBtnFnHint || '',
			forceSelection : true,
			width : 120,
			csHideQtip : true, // 21.01.16 on; skryje tooltip/qtip
			// 02.11.16 on; zobrazi combobox jenom pokud je to potreba
			csOnLoadCallBack : this.csOnCssListLoad,
			csOnLoadScope : this,
			listeners : {
				// 12.04.11 on; zmena udalosti na select
				select : {
					fn : this.csSwitchCSS,
					scope : this
				}
			}
		};
		var cmpCssListSeparator = {
			xtype : 'spacer',
			width : 10
		};

		// link na vystupy - nepouzito
		/*if (epca.Config.User.ShowReportsMenuFn) {
		 toolBarMenu.push({
		 text : epca.L10n.titleReportsLink,
		 iconCls : 'icon-report',
		 handler : function() {
		 this.csShowReports(epca.Config.User.ShowReportsFn);
		 },
		 scope : this
		 });
		 }*/

		var cmpMenu = {
			hidden : (toolBarMenu.length > 0) ? false : true,
			text : 'Menu',
			iconCls : 'bmenu',
			//id : idpref('pmMenu'), // 10.02.12 on; pristup k menu
			menu : toolBarMenu
		};
		if (toolBarMenu.length > 0) {
			Ext.apply(cmpMenuSeparator, {
				hidden : false
			});
		}

		// 10.04.17 on; prida IS_RETURN_CODE
		// preload few UnTablesd records from config_ictx.json (tablesdCache)
		if (i3.isEmptyString(epca.Config.User.tablesdCache)) {
			epca.Config.User.tablesdCache = 'IS_RETURN_CODE';
		}
		if (epca.Config.User.tablesdCache.indexOf('IS_RETURN_CODE') < 0) {
			epca.Config.User.tablesdCache += ',IS_RETURN_CODE';
		}
		this.csTablesdCacheInit(epca.Config.User.tablesdCache);

		// seznam db
		o = {
			hidden : true, // zobrazi se jenom pokud bude potreba
			xtype : 'combo',
			id : 'topDbSelect',
			fieldLabel : 'Databáza',
			triggerAction : 'all',
			mode : 'local',
			typeAhead : false,
			allowBlank : false,
			editable : false,
			valueField : 'id',
			displayField : 'text',
			// 11.12.15 on; vetsi pole pro CAV
			width : i3.ictx.toLowerCase() === 'cav' ? 150 : 100,
			autoSelect : true,
			forceSelection : true,
			emptyText : epca.L10n.titleDatabase,
			store : new Ext.data.JsonStore({
				autoDestroy : true,
				autoLoad : true,
				// 07.06.23 on; json5
				// 16.09.15 on;
				//url : 'UnDatabases.json',
				//url : 'UnDatabases_' + i3.ictx.toLowerCase() + '.json',
				url : 'UnDatabases_' + i3.ictx.toLowerCase() + '.json5',
				fields : ['id', 'text', 'index', 'limits', 'fldlist', 'dflist', 'shortdf', 'formtype'],
				listeners : {
					load : function(pStore) {
						// 12.11.12 on; po nahrani automaticky vybere prvni polozku
						var thisCombo = Ext.getCmp('topDbSelect');
						var record = pStore.getAt(0);
						var c1, c2;

						if (!record) {
							return;
						}

						var val = record.data[thisCombo.valueField || thisCombo.displayField];
						thisCombo.setValue(val);

						// toto jeste zvazit, asi by bylo lepsi zrusit povinnost cmpDBList
						// odstraneni tohoto neni uplne trivialni, mozna az bude nekdy cas

						c1 = Ext.getCmp('topSearchComboBox');
						c2 = Ext.getCmp('mainsearch_term');
						// pokud je nastaveno vice DB, zobrazi combobox
						thisCombo.setVisible((pStore.data.length > 1) && (!epca.Config.User.csHideMainSearch || epca.Config.User.csPBMainSearch || epca.Config.User.csCAVMainSearch) && (c1 || c2));

						// nabidka indexu - nemusi byt zobrazena
						var c = Ext.getCmp('mainsearch_index');
						if (c) {
							val = record.data['fldlist'] || 'EPCA_FLDLIST_BIB';
							this.csSetupValueStore(c, val);
						}
					},
					scope : this
				}
			}),
			listeners : {
				change : function(combo, newValue, oldValue) {
					// pri zmene db musi zmenit nabidku indexu
					if (newValue !== oldValue) {
						// nabidka indexu - nemusi byt zobrazena
						var c = Ext.getCmp('mainsearch_index');
						if (c) {
							var n = combo.store.findExact('id', newValue);
							if (n >= 0) {
								var record = combo.store.getAt(n);
								var val = record.data['fldlist'];
								this.csSetupValueStore(c, val);
							}
						}
					}
				},
				scope : this
			}
		};

		if (epca.Config.User.csPBMainSearch) {
			cmpDBListPB = o;
		} else {
			cmpDBList = o;
		}

		if (epca.Config.User.csPBMainSearch) {
			cmpPBSearch = [{
				xtype : 'tbseparator'
			}, cmpDBListPB, {
				xtype : 'spacer',
				width : 2
			}, {
				xtype : 'cs_combo_st',
				//csStatTableN : 'EPCA_FLDLIST_BIB',
				name : 'mainsearch_index',
				id : 'mainsearch_index',
				//title: 'Search field',
				editable : false,
				//allowBlank : false,
				forceSelection : true,
				csAutoSelectFirst : true,
				csHideQtip : true // 21.01.16 on; skryje tooltip/qtip
			}, {
				xtype : 'spacer',
				width : 2
			}, {
				xtype : 'textfield',
				fieldLabel : 'Term',
				name : 'mainsearch_term',
				id : 'mainsearch_term',
				listeners : {// 10.02.10 on; doplnena reakce na enter
					specialkey : function(field, el) {
						if (el.getKey() === Ext.EventObject.ENTER) {
							this.csOnSearch(1);
						}
					},
					scope : this
				}
			}, {
				xtype : 'spacer',
				width : 2
			}, {
				xtype : 'button',
				text : i3.tx.txSearch,
				//id : idpref('btnHeaderSearch'),
				handler : function() {
					this.csOnSearch(1);
				},
				scope : this
			}];
		}
		// 08.11.22 on; limita se bude nastavivat i kdyz neni hlavni PB vyhledavani - kvuli vyhledavani ve formularich
		// 04.11.22 on; skryta globalni limita pro vyhledavani pro PB
		i3.colLimitsApplyCB = this.csSetupSearchLimits.createDelegate(this);

		// 11.12.15 on; specialni vyhledavani CAV
		if (epca.Config.User.csCAVMainSearch) {
			cmpPBSearch = [{
				xtype : 'spacer',
				width : 10
			}, {
				xtype : 'trigger',
				triggerClass : 'x-form-search-trigger',
				//fieldLabel : 'Term',
				//name : 'mainsearch_term',
				id : 'mainsearch_term',
				width : 110,
				listeners : {// 10.02.10 on; doplnena reakce na enter
					specialkey : function(field, el) {
						if (el.getKey() === Ext.EventObject.ENTER) {
							this.csGetRecSearch(field);
						}
					},
					scope : this
				},
				onTriggerClick : this.csGetRecSearch.createDelegate(this, [])
			}, {
				xtype : 'spacer',
				width : 2
			}];
		}

		// tlacitko pro nastaveni 969f
		if (!i3.isEmptyString(epca.Config.User.csSet969f)) {
			cmpFn969f = {
				xtype : 'button',
				iconCls : 'icon-send',
				id : 'maintb_set969f',
				text : this.csGetBtnText(epca.Config.User.csSet969fText, epca.L10n.evidenceSet969f),
				tooltip : epca.Config.User.csSet969fHint || '',
				hidden : true, // 04.11.15 on; aktualizuje se v csUpdateInterface
				handler : function() {
					this.csOnSet969f();
				},
				scope : this
			};

			Ext.apply(cmpFn969fSeparator, {
				//hidden : false
				hidden : true // 04.11.15 on; aktualizuje se v csUpdateInterface
			});
		}

		// 07.09.15 on; tlacitko pro vymaz 969f
		if (!i3.isEmptyString(epca.Config.User.csClear969f)) {
			cmpFnClear969f = {
				xtype : 'button',
				iconCls : 'icon-send',
				id : 'maintb_clear969f',
				text : this.csGetBtnText(epca.Config.User.csClear969fText, epca.L10n.evidenceClear969f),
				tooltip : epca.Config.User.csClear969fHint || '',
				hidden : true, // 04.11.15 on; aktualizuje se v csUpdateInterface
				handler : function() {
					this.csOnClear969f();
				},
				scope : this
			};

			Ext.apply(cmpFnClearSeparator, {
				//hidden : false
				hidden : true // 04.11.15 on; aktualizuje se v csUpdateInterface
			});
		}

		if (epca.Config.User.csShowUsername) {
			cmnUserName = {
				xtype : 'tbtext',
				text : i3.Login.ctx.isUserName,
				id : 'maintb_username'
			};
			Ext.apply(cmpUsernameSeparator, {
				hidden : false
			});
		}

		cmpNew = {
			text : this.csGetBtnText(epca.Config.User.NewBtnFnText, epca.L10n.titleNew), // 10.12.15 on
			tooltip : epca.Config.User.NewBtnFnHint || '', // 10.12.15 on
			id : 'evNewBtn',
			iconCls : 'icon-form',
			handler : function() {
				// 24.09.15 on; vlozeno do metody
				this.csOnNew();
			},
			scope : this
		};
		// nepouzito
		/*cmpOpen = {
		 text : epca.L10n.titleOpen,
		 iconCls : 'icon-open',
		 hidden : true,
		 handler : function() {
		 var win = new epca.window.OpenRecord({
		 buttons : [{
		 text : epca.L10n.titleOpen,
		 listeners : {
		 click : function() {
		 if (Ext.isEmpty(win.getRecordId())) {
		 epca.notify(epca.L10n.evidenceRecordNotSelected, epca.L10n.messageError, "icon-error-epca");
		 return;
		 }
		 //epca.WsForm.getForm(win.getFormId(), this, this.loadForm);
		 win.close();
		 },
		 scope : this
		 }
		 }, {
		 text : epca.L10n.titleClose,
		 listeners : {
		 click : function() {
		 win.close();
		 },
		 scope : this
		 }
		 }]
		 });
		 win.show();
		 },
		 scope : this
		 };*/

		cmpSaveSeparator = {
			xtype : 'spacer',
			width : 10
			//id : 'maintb_save_separator'
			//hidden : true
		};

		cmpSave = {
			text : this.csGetBtnText(epca.Config.User.SaveBtnFnText, epca.L10n.titleSave), // 10.12.15 on
			tooltip : epca.Config.User.SaveBtnFnHint || '', // 10.12.15 on
			id : 'maintb_save',
			// 23.06.25 on; ikona obrazek
			//iconCls : 'icon-save',
			iconCls : 'icon-save-img',
			handler : function() {
				this.save();
			},
			scope : this
		};

		// zatim nepouzite
		/*cmpDelete = {
		text : epca.L10n.titleDelete,
		iconCls : 'icon-delete',
		hidden : true,
		handler : function() {

		var activTab = this.getTabPanelForms().getActiveTab();

		if (!Ext.isDefined(activTab) || activTab === null || !Ext.isDefined(activTab.recordId)) {
		epca.notify("Nemáte otvorený žiadny záznam.", epca.L10n.messageError, "icon-error-epca");
		return;
		}

		var form = this.getForm(activTab);

		var formRecord = epca.convertToMarc(activTab.marcToSet);
		formRecord.t001 = activTab.recordId;
		formRecord.classn = form.formDBTable;
		formRecord.data = (formRecord.dataToWsRecord(true)).record;

		i3.WS.update({
		operation : 'delete',
		success : function(oMARC_rec) {
		epca.notify("Záznam bol vymazaný.", "Úspech", "icon-accept");
		},
		failure : function(errorMsg) {
		epca.notify("Pri manipulácií so záznamom sa vyskytla chyba:" + errorMsg, "Chyba", "icon-error-epca");
		},
		scope : this
		}, formRecord);
		},
		scope : this
		};*/

		// k nicemu
		/*cmpNewAuthority = {
		hidden : true,
		text : epca.L10n.titleNewAuthority,
		iconCls : 'icon-user-add',
		handler : function() {
		var fpwin = i3.ui.FlexPop.getWin();
		fpwin.usrDoSearch({
		classn : epca.Config.User.dbAuth,
		displayFmt : 'ISBD',
		idxlistStoreId : 'UnTablesd*I3_FLDLIST_CAT',
		initUseAttr : '1',
		initTerm : '',
		searchMode : 2,
		wannaMarcRes : true,
		CSNewRecPanel : this,
		callback : this.flexpopLoadRecord,
		scope : this
		});
		},
		scope : this
		};*/

		// k nicemu
		/*cmpOpenDebug = {
		 text : 'Debug',
		 hidden : true,
		 iconCls : 'icon-open',
		 handler : function() {

		 var panel = new Ext.Panel();
		 var win = new Ext.Window({
		 width : 900,
		 id : 'previewWindow',
		 height : 400,
		 title : 'Debug',
		 autoScroll : true,
		 items : panel,
		 buttonAlign : 'center',
		 buttons : [{
		 text : epca.L10n.evidencePreviewClose,
		 listeners : {
		 click : function() {
		 win.close();
		 }
		 }
		 }]
		 });
		 win.show();

		 var i, activTab = this.getTabPanelForms().getActiveTab();

		 if (!Ext.isDefined(activTab)) {
		 return false;
		 }

		 var marcData = epca.convertToMarc(this.getForm(activTab).getMarc()).data;
		 var marc = '';

		 for ( i = 0; i < marcData.length; i++) {
		 marc += marcData[i].replace(i3.c.SF, '@');
		 marc += '<br>';
		 }

		 panel.update(marc);
		 },
		 scope : this
		 };*/

		cmpPrint = {
			// 08.12.14 on; presunuto sem
			xtype : 'button',
			text : this.csGetBtnText(epca.Config.User.PrintBtnFnText, epca.L10n.txPrint), // 10.12.15 on
			tooltip : epca.Config.User.PrintBtnFnHint || '', // 10.12.15 on
			//id : idpref('print'),
			iconCls : 'icon-print',
			handler : function() {
				// pred tiskem zaznam aktualizuje
				var cfg = {
					csCallback : this.csPrintDF
				};
				this.csUpdateZFInfo(cfg);
			},
			scope : this
		};

		cmpPrintSeparator = {
			xtype : 'spacer',
			width : 10
		};

		if (!epca.Config.User.csHideMainSearch) {
			cmpMainSearch = {
				hidden : epca.Config.User.csHideMainSearch, // 03.12.14 on; moznost skryt vyhledavani
				xtype : 'epca.evidence_search_combobox',
				id : 'topSearchComboBox',

				//fieldLabel: 'Formulár',
				triggerAction : 'all',
				//width : 500,
				style : 'min-width:200px',

				typeAhead : false,
				allowBlank : true,
				//editable: false,
				loadingText : epca.L10n.titleSearching,
				//emptyText : epca.L10n.titleSearch,
				valueField : 't001',
				displayField : 'data',
				//fmt: 'xxxxx',

				//store: new i3.WS.StoreSearch({
				//autoLoad: false,
				//baseParams: {
				//db: epca.Config.dbCat,

				//from: 1,
				//to: 20,
				//root: 'records'

				//},
				//scope: this
				//}),
				listeners : {
					beforequery : function() {
						var index = '', record, limits = '', sShortDF = '', oAttParams;

						var comboBoxForm = Ext.ComponentMgr.get('topSearchComboBox');
						// search only if the length of inserted text in combobox is more than 2 letters
						if (comboBoxForm.getRawValue().length < 2) {
							//comboBoxForm.collapse();
							return false;
						}
						var comboDbBox = Ext.ComponentMgr.get('topDbSelect');
						if (Ext.isEmpty(comboDbBox.getValue())) {
							comboDbBox.setValue(epca.Config.User.dbCat);
						}
						// 29.11.12 on; doplneno nacteni indexu z comboboxu
						var n = comboDbBox.store.findExact('id', comboDbBox.getValue());
						if (n >= 0) {
							record = comboDbBox.store.getAt(n);
						}

						if (record) {
							index = record.data['index'];
							// 10.06.14 on; moznost zadat limity v konfigu UnDatabases.json
							limits = record.data['limits'];
							if (!i3.isEmptyString(limits)) {
								// vyswapuje definovane retezce za aktualni hodnoty
								limits = i3.csSwapDefaultValues(limits, epca.Config.User.csBranch);
							}
							// 04.11.15 on; moznost nastavit v UnDatabases_ictx.json zkraceny ZF
							sShortDF = record.data['shortdf'];
						}
						if (index === '') {
							// defaultni index
							index = '1016';
							// 1016 - vsechna pole
						}

						comboBoxForm.setDb(comboDbBox.getValue(), sShortDF);

						oAttParams = {
							1 : index, // 14.11.12 on; nastaveny index 2009 (misto 1016) // 29.11.12 on; konfigurovatelny index
							5 : '1', // right truncation
							4 : '1' // phrase
						};

						// 24.03.16 on; novy se
						if (i3.csUseNewSE) {
							oAttParams[98] = '2';
						}
						// 24.03.16 on; pokud se ma pouzivat ascii, zapne ho defaultne
						if (i3.csUseASCII) {
							oAttParams[99] = '1';
						}

						comboBoxForm.store.setSearchQuery(oAttParams, //
						comboBoxForm.getRawValue(), //
						limits // 10.06.14 on; limity
						);

						comboBoxForm.store.load({
							add : false
						});

						return false;
					},
					select : function() {
						// vyber najdeneho zaznamu
						var comboBoxForm = Ext.ComponentMgr.get('topSearchComboBox');
						var comboDbBox = Ext.ComponentMgr.get('topDbSelect');
						var recordDb = comboDbBox.getValue();
						i3.WS.getRecord({
							//classn: epca.Config.dbCat,
							classn : recordDb,
							fmt : 'LINEMARC',
							t001 : comboBoxForm.getValue(),
							success : function(selectedRecord) {
								// 05.11.15 on; doplneno nacteni formatu z comboboxu
								var record, sFormType = '', n = comboDbBox.store.findExact('id', comboDbBox.getValue());
								if (n >= 0) {
									record = comboDbBox.store.getAt(n);
								}
								if (record) {
									// 05.11.15 on; moznost nastavit v UnDatabases_ictx.json formtype
									sFormType = record.data['formtype'];
								}

								// 09.12.14 on; vlozeno do funkce
								this.csLoadMarcRec(selectedRecord, false, sFormType);
							},
							failure : function(errmsg, o) {
								this(undefined, o);
								//Ext.example.msg('Error', 'Pri ukladaní formulára sa vyskytla chyba: {0}',errmsg);
							},
							scope : this
						});

						//var comboBoxForm = Ext.ComponentMgr.get('topSearchComboBox');
						//epca.WsRecord.getRecord(comboBoxForm.getValue(), this.getTabPanelForms().getActiveTab());
					},
					scope : this
				}
			};
			Ext.apply(cmpMainSearchSeparator, {
				hidden : false
			});
		}

		// logout
		cmpLogout = {
			text : this.csGetBtnText(epca.Config.User.LogoutBtnFnText, epca.L10n.titleLogout), // 10.12.15 on
			tooltip : epca.Config.User.LogoutBtnFnHint || '', // 10.12.15 on
			iconCls : 'icon-logout',
			handler : function() {
				this.csOnLogout();
			},
			scope : this
		};

		if (!i3.isEmptyString(epca.Config.User.csShowWosScopusBtn)) {
			cmpWosScopus = {
				xtype : 'button',
				id : 'maintb_wosscopusbtn', // 04.05.17 on;
				iconCls : 'icon-import',
				tooltip : epca.Config.User.csShowWosScopusBtnHint || '',
				text : this.csGetBtnText(epca.Config.User.csShowWosScopusBtnText, epca.L10n.titleWosScopusImport),
				handler : function() {
					this.csImportWosScopus(epca.Config.User.csShowWosScopusBtn);
				},
				scope : this
			};
			Ext.apply(cmpWosScopusSeparator, {
				hidden : false
			});
		}

		// 06.01.21 on; vymaz zaznamu
		if (!i3.isEmptyString(epca.Config.User.csShowDeleteBtn)) {
			cmpDeleteBtn = {
				xtype : 'button',
				//id : 'maintb_deletebtn',
				iconCls : 'icon-delete',
				tooltip : epca.Config.User.csShowDeleteBtnHint || '',
				text : this.csGetBtnText(epca.Config.User.csShowDeleteBtnText, epca.L10n.titleDeleteBtn),
				handler : function() {
					this.csDeleteRecord();
				},
				scope : this
			};
			Ext.apply(cmpDeleteBtnSeparator, {
				hidden : false
			});
		}
        
        // 20.01.25 on; doplneno SAV
		// 16.09.15 on; vyjimka pro CAV - jina poradi policek v menu
		if ((i3.ictx.toLowerCase() === 'cav')||(i3.ictx.toLowerCase() === 'sav')) {
			// 14.07.23 on; zrusena vyjimka pro individualniho uzivatele
			// zmena popisu tlacitka ulozit
			//if (this.csIsAnonymousUser() || this.csIsIndividualUser()) {
			if (this.csIsAnonymousUser()) {
				// 10.12.15 on; text pujdu do hintu
				cmpSave.tooltip = 'Odeslat zpracovateli';
			}
			// anonymnimu uzivateli se po ulozeni zaznam zavre
			if (this.csIsAnonymousUser()) {
				cmpSave.handler = function() {
					this.save(true);
				};
			}

			// 07.01.21 on; doplnen vymaz
			// 28.03.17 on; zmena logiky, nejdriv zkontroluju zpracovatele, pak individuala a zbytek je anonym
			// 24.09.15 on; vyjimka pro anonymniho uzivatele
			if (this.csIsSuperUser() || this.csIsProcessorUser()) {
				aTBarItems = [cmpNew, cmpWosScopusSeparator, cmpWosScopus, cmpPrintSeparator, cmpPrint, cmpCopyRecordBtnSeparator, cmpCopyRecordBtn, cmpCheckRecordBtnSeparator, cmpCheckRecordBtn, cmpContentServerBtnSeparator, cmpContentServerBtn, //
				cmpFnClearSeparator, cmpFnClear969f, cmpFn969fSeparator, cmpFn969f, cmpDeleteBtnSeparator, cmpDeleteBtn, /*cmpMainSearchSeparator, cmpMainSearch,*/cmpPBSearch, cmpDBList, cmpURLBtnSeparator, cmpURLBtn, cmpSaveSeparator, cmpSave, {
					xtype : 'tbfill'
				}, cmnUserName, cmpUsernameSeparator, cmpLogout, cmpCssListSeparator, cmpCssList];
			} else if (this.csIsIndividualUser()) {
				// nema nastaveni 969f
				aTBarItems = [cmpNew, cmpWosScopusSeparator, cmpWosScopus, cmpPrintSeparator, cmpPrint, cmpCopyRecordBtnSeparator, cmpCopyRecordBtn, cmpCheckRecordBtnSeparator, cmpCheckRecordBtn, cmpContentServerBtnSeparator, cmpContentServerBtn, //
				/*cmpMainSearchSeparator, cmpMainSearch,*/ cmpPBSearch, cmpDBList, cmpURLBtnSeparator, cmpURLBtn, cmpSaveSeparator, cmpSave, {
					xtype : 'tbfill'
				}, cmnUserName, cmpUsernameSeparator, cmpLogout, cmpCssListSeparator, cmpCssList];
			} else {
				// zbytek je anonymni uzivatel - nema skoro nic
				aTBarItems = [cmpNew, cmpPrintSeparator, cmpPrint, cmpURLBtnSeparator, cmpURLBtn, cmpSaveSeparator, cmpSave, {
					xtype : 'tbfill'
				}, cmnUserName, cmpUsernameSeparator, cmpLogout, cmpCssListSeparator, cmpCssList, cmpDBList];
			}
		} else {
			// 07.01.21 on; doplnen vymaz
			// standardni poradi komponent v tbaru
			aTBarItems = [cmpNew, cmpWosScopusSeparator, cmpWosScopus, cmpSaveSeparator, cmpSave, cmpFn969fSeparator, cmpFn969f, cmpFnClearSeparator, cmpFnClear969f, cmpPrintSeparator, cmpPrint, cmpDeleteBtnSeparator, cmpDeleteBtn, cmpMainSearchSeparator, cmpMainSearch, cmpDBList, //
			cmpPBSearch, cmpMenuSeparator, cmpMenu, cmpCopyRecordBtnSeparator, cmpCopyRecordBtn, cmpCheckRecordBtnSeparator, cmpCheckRecordBtn, cmpContentServerBtnSeparator, cmpContentServerBtn, cmpURLBtnSeparator, cmpURLBtn, {
				xtype : 'tbfill'
			}, cmnUserName, cmpUsernameSeparator, cmpLogout, cmpCssListSeparator, cmpCssList];
		}

		Ext.apply(config, {
			autoScroll : true,
			frame : false,
			border : false,
			//xtype : 'form',
			layout : 'fit',
			tbar : {
				autoScroll : true, // 07.12.15 on; scrollbar v toolbaru
				style : {
					minHeight : '30px'
				},
				xtype : 'toolbar',
				cls : 'bigger-text',
				items : aTBarItems
			},
			items : [this.getTabPanelForms()]
			//monitorValid : true,
			//listeners : {
			//
			//  clientvalidation : function(form, isValid) {
			//    isValid = false;
			//    alert('a');
			//  }
			//}
		});

		if (config.formId) {
			epca.WsForm.getForm(config.formId, 'b', this, this.addForm);
		}

		epca.evidence.EvidencePanel.superclass.constructor.call(this, config);
	},
	initComponent : function() {
		var recordDb, sFormType;

		// pokud je v url zadan skin, otevre ho pri spusteni
		var sSkin = this.csGetSkinFromUrl();
		if (!i3.isEmptyString(sSkin)) {
			// "0" se bere jako ictx bez sufixu
			if (sSkin === '0') {
				sSkin = '';
			}
			sSkin = 'css/' + i3.ictx.toLowerCase() + sSkin + '.css';
			this.csSwitchCSS(null, null, null, sSkin);
		}

		this.constructor.superclass.initComponent.call(this);

		// nastavi db
		var comboDbBox = Ext.ComponentMgr.get('topDbSelect');
		if (Ext.isEmpty(comboDbBox.getValue())) {
			comboDbBox.setValue(epca.Config.User.dbCat);
		}

		// pokud je v url zadano ID formulare, otevre ho pri spusteni
		var sFormId = this.csGetFormId();
		// 30.08.11 on; pokud je predany kod zaznamu, otevre ho
		var sRecordId = this.csGetRecordId();
		// 22.11.22 on; moznost vytvorit kopii zaznamu
		var sRecordCopy = this.csGetRecordCopy();

		// 13.10.15 on; moznost nastavit typ (default je b)
		sFormType = this.csGetFormType();
		if (sFormType === '') {
			sFormType = 'b';
		}

		if (sRecordId !== '') {
			// 12.08.15 on; moznost zadat db v URL
			if (sRecordId.indexOf('*') > 0) {
				recordDb = i3.lName2className(sRecordId.piece('*', 1));
				sRecordId = sRecordId.piece('*', 2);
			} else {
				recordDb = comboDbBox.getValue();
			}

			// pokud je zadano "new" tak zobrazi dialog pro vyber noveho zaznamu
			if (sRecordId === 'new') {
				// 24.09.15 on; nabidne dialog pro novy zaznam
				this.csOnNew(sFormType);
			} else if (sRecordId !== '') {
				// 22.11.22 on; moznost vytvorit kopii zaznamu
				if ((sRecordCopy !== '') && (sRecordCopy !== '1')) {
					// pouzije primo metodu filter
					i3.WS.command({
						db : recordDb,
						command : 'filterrec',
						params : sRecordCopy + ' ' + recordDb + '*' + sRecordId,
						success : function(poJSON) {
							var rec = new i3.Marc(poJSON.records[0]);
							// zavola funkci pro kopii zaznamu
							this.csCopyRecord0(undefined, rec, true, this.csGetFormType());
						},
						scope : this
					});
				} else {
					i3.WS.getRecord({
						classn : recordDb,
						fmt : 'LINEMARC',
						t001 : sRecordId,
						success : function(selectedRecord) {
							// 22.11.22 on; moznost vytvorit kopii zaznamu (bez filtru)
							if (sRecordCopy === '1') {
								this.csCopyRecord0(undefined, selectedRecord, true, this.csGetFormType());
							} else {
								// 24.09.15 on; pridan parametr, abych vedel, ze se otvira zaznam z URL a muze mit predany i formular
								this.csLoadMarcRec(selectedRecord, true, this.csGetFormType());
							}
						},
						failure : function(errmsg) {
							epca.notify(errmsg, epca.L10n.messageError, "icon-error-epca");
						},
						scope : this
					});
				}
			}
			return;
		}

		if (sFormId !== '') {
			// otevre prazdny formular

			// 24.09.15 on; bude se predavat ID - jmeno muze byt komplikovane
			// nazev formulare predany jako paty parametr
			epca.WsForm.getForm(sFormId, sFormType, this, this.addForm /*,sFormName*/);
		}

		// povytvoreni komponent, zakaze tlacitko Novy - zatim zrusene, tlacitko novy se pouzije pro novy zaznam
		/*if((sFormName) && (sFormName !== '')) {
		// zakaze tlacitko novy
		var c = Ext.getCmp('evNewBtn');
		if(c) {
		c.hidden = true;
		}
		// zakaze spacer
		c = Ext.getCmp('spacerNew');
		if(c) {
		c.hidden = true;
		}
		}*/

		// 06.12.19 on; dialog pro otevreni formulare
		if ((sFormId === '') && (sRecordId === '') && epca.Config.User.csShowOpenFormDialog) {
			this.csOnNew(epca.Config.User.csShowOpenFormDialogFormat);
		}
	},
	/**
	 * Ulozenie zaznam
	 * @param {Object} is_new
	 * 
	 * 20.02.25 on; parametr poCallback
	 */
	save : function(pbClose, poMarc, pbForceCheck, psMsgAfterSave, poCallback) {
		var activTab, record, is_new, c, nScrollTop, prop, newMarc, cmpBtnSave;
		
		// 10.10.23 on; snaha zamezit pokusu o opakovane vlozeni noveho zaznamu (dvojklikem)
		cmpBtnSave = Ext.getCmp('maintb_save');
		cmpBtnSave.setDisabled(true);
		try {
			activTab = this.getTabPanelForms().getActiveTab();
			
			// 26.07.16 on; neexistuje zadny formular
			if (!activTab) {
				// 10.10.23 on;
				cmpBtnSave.setDisabled(false);
				return;
			}

			// 10.04.17 on; presunute pred zobrazeni hlasky o ukladani
			c = Ext.getCmp('maintb_save');
			if (!this.csCheckBeforeSave(c, activTab, true)) {
				//i3.msgOff(epca.evidence.c.sFormMsgId2);
				// 10.10.23 on;
				cmpBtnSave.setDisabled(false);
				return;
			}

            // 20.02.25 on; podminka
            if (!poCallback) {
			  i3.msgOn(epca.L10n.txSavingRecord, undefined, undefined, epca.evidence.c.sFormMsgId2);
			}
			try {
				// 12.11.15 on; predelane
				if ((activTab.recordId === undefined) || (activTab.recordId === 'new')) {
					is_new = true;
				} else {
					is_new = false;
				}

				// 28.06.23 on; moznsot predat zaznam v parametru
				if (poMarc) {
					newMarc = poMarc;
				} else {
					newMarc = this.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
					this.mergeMarc(activTab.marcCloneToSet, newMarc);
				}

				// 26.03.20 on; odfiltruje vsechny $T subtagy, protoze jsou na formulari (napr. EU) uprostred pole a vsechna pole za nim se ztraci
				this.csDeleteTSubtags(newMarc);

				newMarc['001'] = activTab.recordId;

				// 08.01.21 on; doplni vlastnika zaznamu - do 999e - pokud tam neni
				if (is_new) {
					this.csAddRecordOwner999e(newMarc);
				}

				record = epca.convertToMarc(newMarc);
				//  12.08.15  on;  mozna  uprava zaznamu  pred  ulozenim
				if (epca.Config.User && epca.Config.User.csPreSave) {
					epca.Config.User.csPreSave(record, activTab);
				}
				if (is_new) {
					record.t001 = 'new';
				} else {
					record.t001 = activTab.recordId;
				}
				record.classn = activTab.form.targetDb;
				record.data = (record.dataToWsRecord(true)).record;

			} catch(err) {
				// chyba
                // 20.02.25 on; podminka
                if (!poCallback) {
		          i3.msgOff(epca.evidence.c.sFormMsgId2);
		        }
			}

			// 21.12.20 on; zapamatuje si pozici scrollbaru
			c = activTab.getFormMainFieldset();
			if (c && c.ownerCt) {
				nScrollTop = activTab.getFormMainFieldset().ownerCt.body.dom.scrollTop;
			} else {
				nScrollTop = 0;
			}

			i3.WS.update({
				operation : is_new ? 'insert' : 'update',
				// 20.01.25 on; sav
				// 28.06.23 on; nebude se kontrolovat zadny zaznam na CAV
				// 21.06.23 on; nekontrolovat Datovy zaznam na CAV pri ulozeni
				//check : ((activTab.form.unFormat === 'E') && (i3.ictx.toLowerCase() === 'cav') && !pbForceCheck) ? '0' : '1',
				check : (((i3.ictx.toLowerCase() === 'cav')||(i3.ictx.toLowerCase() === 'sav')) && !pbForceCheck) ? '0' : '1',
				success : function(oMARC_rec, poResult) {
					var m;
					try {
						// pokud se ma zaznam po uozeni zavrit, nebudu ho nacitat
						if (pbClose) {
							// zavre zalozku
							this.getTabPanelForms().remove(activTab);
							// 27.06.23 on; moznost zobrazit hlasku
							if (!i3.isEmptyString(psMsgAfterSave)) {
								i3.alert(psMsgAfterSave);
							}
						} else if (activTab.csOrigMarcRecord.getTag('C99d') !== oMARC_rec.getTag('C99d')) {
							// 14.11.16 on; pokud doslo ke zmene def. formulare C99d, zavre zalozku a otevre zaznamu v tom spravnem formulari
							// zavre zalozku
							this.getTabPanelForms().remove(activTab);
							// otevre zaznam v novem formulari
							this.csLoadMarcRec(oMARC_rec, false, activTab.form.unFormat);
						} else {
							// 13.08.15 on; moznost upravit nacitany zaznam
							if (epca.Config.User && epca.Config.User.csPreOpen) {
								epca.Config.User.csPreOpen(oMARC_rec);
							}
							this.recordId = oMARC_rec.t001;
							// 20.05.16 on; zmena
							//this.marcToSet = epca.convertToObject(oMARC_rec.data, epca.Config.getUnFormat(oMARC_rec.classn));
							this.marcToSet = epca.convertToObject(oMARC_rec.data, epca.Config.getDbFormat(oMARC_rec.classn));
							// 10.12.14 on; zapamatuje si MARC zaznam
							this.csOrigMarcRecord = oMARC_rec;

							this.csLoadRecord(activTab, undefined, true);
							// 21.12.20 on; doplnen parametr
							// 17.02.16 on; csLoadRecord rozdeleno na 2 casti
							this.csAddFormWait(this, activTab, undefined, undefined, this.csLoadRecordEnd, undefined, nScrollTop);

							// 21.12.20 on; rolovani na spravnou pozici - protoze pokud mam vice opakovani fieldsetu (napr. autori), dojde k odskoku na 2 opakovani
							//              je to tady i v metode csLoadRecordEnd, ktera se vola pozdeji - neni tam moc videt odskok nahoru a zpet
							if (nScrollTop && (nScrollTop > 0)) {
								c = activTab.getFormMainFieldset();
								if (c) {
									c.ownerCt.body.dom.scrollTop = nScrollTop;
								}
							}
						}

						// 13.09.17 on; vysledky kontrol
						this.csCheckRecordResult(poResult, true);

			            // 20.02.25 on; podminka
                        if (!poCallback) {
  							// 28.05.24 on; pro zaznam ctenare zobrazi v pripade U95a=1 jinou hlasku
    						if ((activTab.form.unFormat === 'U')&&(oMARC_rec.getTag('U95a') === '1')) {
								m = new i3.WS.Msg('INFEPCAUSER001');
        	   	                 i3.alert(m.userText); 
							} else {
							  epca.notify(epca.L10n.evidenceSaveRecordSuccess, epca.L10n.messageOK, "icon-accept");
							}
						}
						
						/// 20.02.25 on; moznost predat callback
						if (poCallback) {
                          poCallback.call(this);
                        }
                
					} catch(err) {
						// chyba
      		            // 20.02.25 on; podminka
                        if (!poCallback) {
    						i3.msgOff(epca.evidence.c.sFormMsgId2);
    					}
         				// 10.10.23 on; 
		    			cmpBtnSave.setDisabled(false);
					}
                    // 20.02.25 on; podminka
                    if (!poCallback) {
				  	  i3.msgOff(epca.evidence.c.sFormMsgId2);
				  	} 
       				// 10.10.23 on; 
	    			cmpBtnSave.setDisabled(false);
				},
				failure : function(errorMsg, poResult) {
					i3.msgOff(epca.evidence.c.sFormMsgId2);

					// 13.09.17 on; vysledky kontrol
					this.csCheckRecordResult(poResult, true);

					epca.notify(epca.L10n.evidenceManipulatingFormError + errorMsg, epca.L10n.messageError, "icon-error-epca");
					
					// 10.10.23 on; 
					cmpBtnSave.setDisabled(false);
				},
				//scope : activTab.marcCloneToSet // v clone sa nachadza 005 a 009, pretoze sa nezobrazuje
				scope : this // 11.08.11 on; zmena scope
			}, record);
		} catch(err) {
			// chyba
			// 10.10.23 on;
			cmpBtnSave.setDisabled(false);
			i3.msgOff(epca.evidence.c.sFormMsgId2);
		}

	},
	mergeMarc : function(marcBase, converted) {
		var v;

		for (v in marcBase) {
			if (marcBase.hasOwnProperty(v)) {
				// 04.09.15 on; nerozumim tomu, proc je tady !Ext.isArray(marcBase[v]) - kdyz mam v zaznamu opakovatelne pole, ktere neni na formulari, ztrati se
				//if ((v !== undefined) && marcBase.hasOwnProperty(v) && !Ext.isArray(marcBase[v])) {
				if (v !== undefined) {
					epca.processMarcValue(converted, v, marcBase[v]);
				}
			}
		}
	},
	/*
	 * Vrati hodnotu predaneho parametru v URL.
	 *
	 */
	getURLParam : function(param) {
		// separating the GET parameters from the current URL
		var getParams = document.URL.split("?");
		// transforming the GET parameters into a dictionnary
		var urlParams = {};
		if (getParams.length > 1) {
			urlParams = Ext.urlDecode(getParams[1]);
		}
		return urlParams[param];
	},
	/**
	 * Aktualizovat zaznam v zobrazovacom formate.
	 */
	csUpdateZFInfo : function(config) {
		var newMarc;
		var activTab = this.getTabPanelForms().getActiveTab();
		if (!Ext.isDefined(activTab) || (activTab === null)) {
			return false;
		}
		var pfmt = activTab.getCmp('displayPnlFmt');
		var sFmt = pfmt.getValue();
		// 26.10.11 on; pokud neni vybrany ZF, skonci
		if (sFmt === '') {
			return false;
		}

		/*if(this.getForm(activTab).validate() != true) {
		 epca.notify(epca.L10n.evidenceFormNotValid, epca.L10n.evidenceFormValidation, "icon-error-epca");
		 return false;
		 }*/
		if (activTab.recordId !== undefined) {
			newMarc = this.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
		} else {
			// 26.10.11 on; zmena
			//this.recordId = 'new';
			activTab.recordId = 'new';

			// 20.05.16 on; zmena
			//this.marcToSet = epca.convertToObject({}, epca.Config.getUnFormat(activTab.form.targetDb));
			this.marcToSet = epca.convertToObject({}, epca.Config.getDbFormat(activTab.form.targetDb));

			newMarc = this.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
			//newMarc = {};
		}
		this.mergeMarc(activTab.marcCloneToSet, newMarc);
		newMarc['001'] = activTab.recordId;
		var record = epca.convertToMarc(newMarc);
		//  22.09.15  on;  mozna  uprava zaznamu  pred  ulozenim
		if (epca.Config.User && epca.Config.User.csPreSave) {
			epca.Config.User.csPreSave(record, activTab);
		}

		record.t001 = activTab.recordId;
		record.classn = activTab.form.targetDb;
		//record.data = (record.dataToWsRecord(true)).record;

		// 24.01.20 on; nacte zaznam s poradim poli a pak zavola csUpdateZFInfo0
		epca.WsTagMap.getTagList(activTab.form.unFormat, this, this.csUpdateZFInfo0.createDelegate(this, [config, record, activTab, sFmt], 1));
	},
	/**
	 * 24.01.20 on; rozdeleno na dve casti
	 */
	csUpdateZFInfo0 : function(taglist, config, record, activTab, psFmt) {
		var n, s;

		// 24.01.20 on; serazeni zaznamu
		n = this.csRecordSort(taglist, record);
		if (n !== 0) {
			// chyba, ale pokracuju dal
			epca.notify(i3.fillInParams(epca.L10n.txErrorSortingRecord, [n]), epca.L10n.messageError, "icon-error-epca");
		}

		this.csUpdateZFInfoUsingTx(activTab, epca.L10n.txLoading);

		if (psFmt === 'LINEMARC') {
			s = i3.WS.zf2HTML(record);
			this.csUpdateZFInfoUsingTx(activTab, s, config);
			return;
		}

		i3.WS.display({
			success : function(pRec) {
				s = i3.WS.zf2HTML(pRec);
				// pouze test
				//s += '<a href="OPEN?recid=sllk_un_cat*0500135&amp;formtype=B"><img alt="lupa" src="s1/icons/search.gif"></a>';
				this.csUpdateZFInfoUsingTx(activTab, s, config);
			},
			failure : function(msg) {
				// 'Display format request failed: '
				i3.alert(epca.L10n.txDisplayFmtFailed + msg);
			},
			scope : this
		}, record, psFmt);
	},
	/**
	 * Priprava zobrazenia ZF v popupe, nakoniec sa nepouzilo.
	 *
	 * @private
	 *
	 * @param {Object} actvTab
	 * @param {Object} psTx
	 */
	csUpdateZFInfoUsingTx : function(actvTab, psTx, config) {
		actvTab.get(0).update(psTx);

		// zatim nic - kdybych to tu zapojoval, pozor na tisk!!!
		/*var doc = document.getElementById('ifrejm').contentWindow.document;
		doc.open();
		doc.write(psTx);
		doc.close();*/

		// moznost zavolat callback
		if (config && config.csCallback) {
			config.csCallback.call(config.csScope || this);
		}

	},
	/**
	 * Nacte zaznam do formulare.
	 *
	 * @private
	 *
	 * @param {Object} actTab - aktivniu zalozka
	 * @param {Object} defaultValues - defaultni hodnoty pro novy zaznam
	 * @param {Object} clearForm - smazat formular pred nacteni zaznamu?
	 */
	csLoadRecord : function(actTab, defaultValues, clearForm) {
		// 27.09.16 on; kopie i3.isEmptyTagSet, ale navic povazuje za prazdne pole pole s indikatorem
		function isEmptyTag(o) {
			if ((o === undefined) || (o === null)) {// null a undefined berieme ako prazdne (nemalo by nastat)
				return true;
			}
			if ( typeof o !== 'object') {// ak to neni objekt, vratime false (neprazdne; nemalo by nastat)
				return false;
			}
			var i, v;
			for (i in o) {
				if (o.hasOwnProperty(i)) {
					v = o[i];
					// 29.11.19 on; prefix
					// prazdne stringy ignorujeme
					//if ((v === '') || (i === 'i1') || (i === 'i2')) {
					if ((v === '') || (i === (epca.form.Helper.c.sSubtagPrefix + 'i1')) || (i === (epca.form.Helper.c.sSubtagPrefix + 'i2'))) {
						continue;
					}
					// 05.11.12 on; kontrola vnorenych objektu
					if ( typeof v === 'object') {
						if (isEmptyTag(v)) {
							continue;
						}
					}

					// nasli sme nejaku property - sme neprazdny
					return false;
				}
			}
			// prazdny
			return true;
		}

		//var start = new Date().getTime();

		var item = this.getForm(actTab), bNewRec = false, prop, o;

		// zmena - aktulne se kazdy zaznam otevre do noveho formulare - takze neni potreba - form smaze jenom po update
		// pokud otvirame zaznamy do jednoho formulare, tak musi pokazde smazat obsah formulare
		/*if (this.csGetFormId()!=='') {
		 item.clearFields();
		 } else {
		 // jinak staci mazat jenom po update (zatim)
		 if (clearForm) {
		 item.clearFields();
		 }
		 }*/
		if (clearForm) {
			item.clearFields();
			this.csUpdateFieldNames(actTab.form, item);
		}

		// smaze ikony z kontrol
		this.csClearCheckIcons(item);

		// 20.07.16 on; podminka pro import
		// 11.08.11 on; defaultni hodnoty jen pro nove zaznamy
		if ((!this.recordId || (this.recordId === 'new')) && defaultValues) {
			bNewRec = true;

			// 16.12.15 on; presun nekam na viditelne misto
			// 20.01.12 on; vyswapuje def. hodnoty
			//this.csSwapDefaultValues(defaultValues);
			epca.WsForm.csSwapDefaultValues(defaultValues);

			// 03.11.16 on; pokud je nastaveno nacteni zaznamu a zaroven jde o novy zaznam s defaultama, tak musim
			//              pridat defaulty do zaznamu, nacteni do formulare probehne pozdej
			//              jeste by se melo aktualizovat this.csOrigMarcRecord, ale kaslu na to
			if (this.csForceLoadRecord) {
				for (prop in defaultValues) {
					if (defaultValues.hasOwnProperty(prop)) {
						o = defaultValues[prop];
						// 27.09.16 on; tag s pouze s indikatorem povazuju za prazdny
						//if (!i3.isEmptyTagSet(o)) {
						if (!isEmptyTag(o)) {
							this.marcToSet[prop] = o;
						}
					}
				}
			} else {
				// standardne nactu defaulty do noveho zaznamu
				item.setMarc(defaultValues);

				// 10.12.14 on; potrebuju si zapamatovat i novy zaznam, jak je na zacatku
				var marc = this.getForm(actTab).getMarc({});
				this.csOrigMarcRecord = epca.convertToMarc(marc);
			}
		}

		actTab.marcToSet = this.marcToSet;
		actTab.recordId = this.recordId;
		actTab.csOrigMarcRecord = this.csOrigMarcRecord;
		// 10.12.14 on;

		var marcCloneToSet = epca.cloneObject(this.marcToSet);
		actTab.marcCloneToSet = marcCloneToSet;

		this.marcToSet = undefined;
		this.recordId = undefined;
		this.csOrigMarcRecord = undefined;
		this.csLoadDefaultValues = undefined;
		// 02.11.16 on; pri importu z WOS/SCOPUS je potreba do "noveho" zaznamu nahrat defaulni hodnoty a zaroven zaznam nacist
		var bForceLoadRecord = this.csForceLoadRecord;
		this.csForceLoadRecord = undefined;

		// 31.01.25 on; prida do ouska id zaznamu
		var sId = actTab.recordId || epca.evidence.tx.txNew;
		actTab.setTitle(actTab.form.title.ls()+'*'+sId);

		// Ako prechadza marc stromom, odmazavaju sa z neho nacitane hodnoty
		epca.semafor = {};
		if ((!bNewRec) || bForceLoadRecord) {
			item.setMarc(marcCloneToSet);
		}
	},

	/*
	 * 21.12.20 on; nScrollTop
	 * 16.02.16 on; rozdeleni funkce LoadRecord na 2 casti
	 *
	 */
	csLoadRecordEnd : function(actTab, form, item, nScrollTop) {
		var c, oItem = this.getForm(actTab);

		// 16.02.16 on; musi to tu byt!!
		// 16.02.16 on; zruseno, doufam, ze je to tu k nicemu, jinak bych to musel volat az po nacteni celeho zaznamo - pripadne zapojit do csLoadRecordEnd
		// 03.09.15 on; tato cast by se mohla casem vyhodit, protoze jsem se snazil osetrit fieldsety, aby si pamatovaly i subtagy, co nejsou na formulari viz. csNotPresentedFields
		//              ale zatim je to takova kontrola pro me
		// Odmazenie prazdnych hodnot, aby sme zistili ci sa zaznam nacital cely do formulara
		Ext.iterate(actTab.marcCloneToSet, this.deleteEmptyItems, this);

		if (this.isUnloadedData(actTab.marcCloneToSet)) {
			//Nenacitali sa vsetky udaje do formulara disablujeme opakovatelne komponenty
			oItem.disableFields(actTab.marcCloneToSet);
		}

		// 21.12.20 on; rolovani na spravnou pozici - protoze pokud mam vice opakovani fieldsetu (napr. autori), dojde k odskoku na 2 opakovani
		if (nScrollTop && (nScrollTop > 0)) {
			c = actTab.getFormMainFieldset();
			if (c) {
				c.ownerCt.body.dom.scrollTop = nScrollTop;
			}
		}

		// aktualizuje ZF
		this.csUpdateZFInfo();
		// 18.02.16 on; zapamatuju si, ze prave doslo k zobrazeni ZF
		this.csAddingFormZF = false;

		// 22.01.16 on; aktualizce rozhrani
		this.csUpdateInterface(actTab);
		this.csUpdateInterfaceSave(actTab);
	},
	// vrati nazev formulare predaneho v URL
	csGetFormId : function() {
		var sFormId = this.getURLParam('formid');
		if (!sFormId) {
			sFormId = '';
		}
		sFormId = sFormId.piece('#', 1);
		// 06.06.19 on; pripadna kotva
		return sFormId;
	},
	// vrati typ formulare z URL (typicky "b" nebo "a")
	csGetFormType : function() {
		var sFormType = this.getURLParam('formtype');
		if (!sFormType) {
			sFormType = '';
		}
		sFormType = sFormType.piece('#', 1);
		// 06.06.19 on; pripadna kotva
		return sFormType;
	},

	// vrati kod zaznamu predany v URL
	csGetRecordId : function() {
		var sRecId = this.getURLParam('recid');
		if (!sRecId) {
			sRecId = '';
		}
		sRecId = sRecId.piece('#', 1);
		// 29.05.19 on; pripadna kotva
		return this.csFixDbName(sRecId);
	},
	// 04.03.20 on; vrati skin
	csGetSkinFromUrl : function() {
		var sSkin = this.getURLParam('skin');
		if (!sSkin) {
			sSkin = '';
		}
		// 29.05.19 on; pripadna kotva
		sSkin = sSkin.piece('#', 1);
		return sSkin;
	},
	// 22.11.22 on; zjisti, jestli byl predany parametr na vytvoreni kopie zaznamu (pro CAV)
	csGetRecordCopy : function() {
		var sRecordCopy = this.getURLParam('recordcopy');
		if (!sRecordCopy) {
			sRecordCopy = '';
		}
		return sRecordCopy;
	},

	/**
	 * odstrani logicke db
	 */
	csFixDbName : function(psIdx) {
		var s;
		if (i3.isEmptyString(psIdx)) {
			return '';
		}

		// neobsahuje *, tak nic nemenit (kvuli idx=new)
		if (psIdx.indexOf('*') === -1) {
			return psIdx;
		}

		s = psIdx.piece('*', 1);
		s = s.piece('-', 1);
		return s + '*' + psIdx.piece('*', 2);

	},
	/**
	 *  preload few UnTablesd records
	 */
	csTablesdCacheInit : function(psRecList) {
		var aT001 = psRecList.split(',');

		i3.WS.sTablesdCacheInit({
			t001 : aT001
		});
	},
	/**
	 * projde defaultni hodnoty a nahradi definove retezce aktualnim udajem
	 *
	 * 16.12.15 on; presun do epca.WsForm
	 * 20.01.12 on;
	 */
	/*csSwapDefaultValues : function(poDefValues) {
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

	},*/
	/**
	 * Reakce na kliknuti mysi do ZF
	 * @param {Event} e
	 *
	 * 29.05.19 on; anchor
	 * 23.05.12 on; povoleno otevreni odkazu v nove zalozce
	 * 24.01.12 on;
	 */
	csOnDFClick : function(e) {
		var s;
		var targetEl, anchor;
		var target = e.getTarget();
		var href = target.href;

		// 29.05.19 on; vyjimka pro kotvy
		if ((target.tagName === 'A') && (href.indexOf('#ANCH') > 0)) {
			return;
		}

		// zastavi provadeni
		e.stopEvent();

		// 01.07.24 on; slouceno a pridano "I"
		/*if (target.tagName === 'IMG') {// pokud jde o obrazek (mozna lupu?), zkusi nacist jinak
			href = '';
			// musim smazat href
			targetEl = Ext.fly(target);
			anchor = targetEl.up("a");
			if (anchor) {
				href = anchor.dom.href;
			}
		} else
		// 10.01.19 on; SPAN
		if (target.tagName === 'SPAN') {
			href = '';
			// musim smazat href
			targetEl = Ext.fly(target);
			anchor = targetEl.up("a");
			if (anchor) {
				href = anchor.dom.href;
			}
		}*/
		if ((target.tagName === 'IMG')||(target.tagName === 'SPAN')||(target.tagName === 'I')) {
			href = '';
			// musim smazat href
			targetEl = Ext.fly(target);
			anchor = targetEl.up("a");
			if (anchor) {
				href = anchor.dom.href;
			}
		} 

		if (href) {
			// 11.12.15 on; moznost otevrit zaznam v nove zalozce
			// testovani
			//href = "https://library.sk/i3/EPCA/OPEN?recid=cbvk_us_cat*0000529&formtype=b";
			//href = "https://library.sk/i3/EPCA/OPEN?recid=cbvk_us_auth*new&formtype=a";
			//href = "https://library.sk/i3/EPCA/OPEN?recid=cbvk_us_auth*new";
			//href = "OPEN?recid=cbvk_us_cat*new";
			//href = "OPEN?formid=test&formtype=b";

			s = href.piece('?', 1);
			s = s.substring(s.length - 4, s.length);
			if (s === 'OPEN') {
				this.csOpenHrefInTab(href);
			} else {
				// zobrazi v novem okne
				window.open(href, "i3window");
			}
		}
	},
	/**
	 * skryje panel se ZF, pokud nebyl zadny nadefinovan
	 * @param {boolean} pbCreated - vrati true, pokud byl vytvoren novy store a false pokud uz existoval
	 *
	 * 17.07.12 on;
	 *
	 */
	csHideIfNotSet : function(pbCreated) {
		// pouzite pouze pokud byl store prave vytvoren, jinak se totiz funkce volala jeste pred vytvoreni panelu a pracovalo se tak s panelem jinym
		if (pbCreated) {
			var activTab = this.getTabPanelForms().getActiveTab();
			if (!Ext.isDefined(activTab) || (activTab === null)) {
				return;
			}
			var pfmt = activTab.getCmp('displayPnlFmt');

			if (pfmt.store.getCount() === 0) {
				pfmt.ownerCt.ownerCt.hide();
				this.csHideDFPanel = true;
				this.doLayout();
			} else {
				// 18.02.16 on; podminka, pokud byl uz formular vygenerovany pred nactenim seznamu ZF, tak pak volam novy ZF
				if (!this.csAddingFormZF) {
					// 13.08.15 on;  jinak  aktualizuje ZF - vyuzije se pri otevreni zaznamu zadaneho v URL
					this.csUpdateZFInfo();
				}
			}

		}
	},

	/**
	 * vrati true, pokud ma byt ZF skryty
	 *
	 * 17.07.12 on;
	 */
	csIsDfHidden : function() {
		if (this.csHideDFPanel) {
			return true;
		}

		if (this.getTabPanelForms().items.items.length > 0) {
			var firstTab = this.getTabPanelForms().items.items[0];
			if (!Ext.isDefined(firstTab) || (firstTab === null)) {
				return false;
			}
			var c = firstTab.getCmp('displayPnl');
			if (c) {
				return c.hidden;
			}
		}
		return false;
	},
	/**
	 * tisk zobrazovaciho formatu
	 *
	 * 03.12.14 on;
	 */
	csPrintDF : function() {

		// pouze k testovani
		/*var sTx = '';
		for (var i = 0; i < 150; i++) {
		sTx += '' + i + '. some text<br>';
		}
		sTx += '';
		this.csPrintText(sTx);*/

		// pokud uz okno existuje
		var c = Ext.getCmp('windowPrint');
		if (c) {
			//alert('print');
			return;
		}

		var activTab = this.getTabPanelForms().getActiveTab();
		if (activTab) {
			var sDF = activTab.get(0).body.dom.innerHTML;
			this.csPrintText(activTab, sDF);
		}
	},
	/*
	 * Vystiskne sablonu/text.
	 * psText: tisknuty text
	 */
	csPrintText : function(pActvTab, psText) {
		var panel = new Ext.Panel({
			html : psText
		});

		var win = new Ext.Window({
			width : 600,
			height : 400, // natvrdo nastavim velikost okna
			autoScroll : true,
			title : epca.L10n.txPrint,
			id : 'windowPrint', // 19.10.15 on; kvuli kontrole existene okna
			buttons : [{
				text : epca.L10n.txExport,
				handler : function() {
					var textFileAsBlob = new Blob([psText], {
						type : 'text/html'
					});

					var fileName = pActvTab.recordId + '.html';

					//var browserName = navigator.appName;
					if (Ext.isIE) {
						window.navigator.msSaveBlob(textFileAsBlob, fileName);
					} else {
						var link = document.createElement('a');
						link.download = fileName;

						//Firefox requires the link to be in the body
						link.style.display = "none";
						document.body.appendChild(link);

						if (window.webkitURL !== null) {
							// Chrome allows the link to be clicked
							// without actually adding it to the DOM.
							link.href = window.webkitURL.createObjectURL(textFileAsBlob);
						} else {
							// Firefox requires the link to be added to the DOM
							// before it can be clicked.
							link.href = window.URL.createObjectURL(textFileAsBlob);
						}

						//simulate click
						link.click();

						//remove the link when done
						document.body.removeChild(link);
					}

					win.close();
				}
			}, {
				text : epca.L10n.txPrint,
				handler : function() {
					// nastavi styl
					Ext.ux.Printer.renderers.panel.stylesheetPath = '../etc/printer/print.css';
					// tisk
					Ext.ux.Printer.print(panel);
					win.close();
				}
			}, {
				text : epca.L10n.titleClose,
				handler : function() {
					win.close();
				}
			}],
			items : [panel]
		});
		win.show();
	},
	csOnSearch : function(pbSearch) {
		var ix = Ext.getCmp('mainsearch_index').getValue(), term = Ext.getCmp('mainsearch_term').getValue(), sFldlist = '', sDFlist = '', sShortDF = '', record;

		var fpwin = i3.ui.FlexPop.getWin();
		var fppar = Ext.apply({}, this.csFlexPopParams);

		var comboDbBox = Ext.getCmp('topDbSelect');
		var dbname = comboDbBox.getValue();
		var sFormType = '';

		// nastavi parametry vyhledavani
		var n = comboDbBox.store.findExact('id', comboDbBox.getValue());
		if (n >= 0) {
			record = comboDbBox.store.getAt(n);
		}
		if (record) {
			sFldlist = record.data['fldlist'];
			sDFlist = record.data['dflist'];
			sShortDF = record.data['shortdf'];
		    // 06.12.24 on; moznost nastavit v UnDatabases_ictx.json formtype
		    sFormType = record.data['formtype'];
		}

		// 12.12.14 on; pokud se ma pouzivat ascii, zapne ho defaultne
		if (i3.csUseASCII) {
			pbSearch = 3;
		}

		Ext.applyIf(fppar, {
			// trieda na ktorej spustit search
			// je ale len default, mozem byt zadana explicitne (napr. moze byt zadany iny default pre novy zaznam
			// a iny (napr. zoznam) pre search
			classn : dbname,
			initUseAttr : ix, //                        init atributy (nepovinne)
			initTerm : term,
			searchMode : pbSearch, //                   search mode 0: scan,1: search, 2: browse,3: ascii
			wannaMarcRes : true, //                     request result in MARC
			
			// 06.12.24 on; pridam typ formulare
			//callback : this.csLoadMarcRec,
			callback : this.csLoadMarcRec.createDelegate(this, [null, sFormType], true),
			idxlistStoreId : sFldlist, // indexy
			displayFmtPnl : sDFlist, // zobrazovaky
			displayFmt : sShortDF, // zkraceny ZF
			csDisabledOKBtn : epca.Config.User.csPBMainSearchOnlyView,
			// 13.06.24 on; moznost nastavit popisek zobrazovaciho formatu
            csDisplayFormatText : epca.Config.User.DisplayFormatText,
			scope : this
		});

		// 08.02.12 on; podminka kvuli vypujckam
		if (this.csOnPreSearch) {
			// callback pred vyhladavanim - moze napr. upravit parametre flexpop pred spustenim aktualneho vyhladavania
			if (!this.csOnPreSearch(fppar)) {
				return;
			}
		}

		// Otvorit flexpop so search/browse
		fpwin.usrDoSearch(fppar);
	},
	/**
	 * Nacitanie MARC zaznamu do formulara.
	 * Pridava specifika okna autorit - rieseni bazy navrhov vs. ostrej, rozne kontroly.
	 *
	 * @param {Object} oRec
	 *
	 */
	csLoadMarcRec : function(poRec, pbGetRecFromUrl, psFormType) {
		if (epca.Config.User && epca.Config.User.csPreOpen) {
			epca.Config.User.csPreOpen(poRec);
		}
		this.recordId = poRec.t001;
		// 20.05.16 on; zmena
		//this.marcToSet = epca.convertToObject(poRec.data, epca.Config.getUnFormat(poRec.classn));
		this.marcToSet = epca.convertToObject(poRec.data, epca.Config.getDbFormat(poRec.classn));
		// 10.12.14 on; zapamatuje si MARC zaznam
		this.csOrigMarcRecord = poRec;

		// 20.01.12 on; zaznam otevre ve formulari, ktery je vyplneny v C99d, pokud tam neni nic, pouzije default
		var tC99d = poRec.getTag('C99d');
		var form_id = '';

		// pokud jde o nacteni zaznamu z URL, v dalsich pripadech to bude ignorovat
		if (pbGetRecFromUrl) {
			// pokud je v url zadany nazev formulare, pouzije ho
			form_id = this.csGetFormId();
		}
		if (i3.isEmptyString(form_id)) {
			if (tC99d !== '') {
				form_id = tC99d;
			} else {
				// 24.09.15 on; cteni z URL zrusene, nedavalo smysl
				// pokud je v url zadany nazev formulare, pouzije ho
				//formName = this.csGetFormId();

				// jinak vezne default z konfigurace
				//if (formName === '') {
				form_id = (poRec.classn === epca.Config.User.dbCat ? epca.Config.User.defaultCatForm : epca.Config.User.defaultAuthForm);
				//}
			}
		}

		if (i3.isEmptyString(psFormType)) {
			psFormType = epca.Config.getUnFormat(poRec.classn);
		}

		// 01.08.11 on; doplneny typ DB
		epca.WsForm.getForm(form_id, psFormType, this, this.addForm, '' /*formName*/);
	},

	/**
	 * Nastavenie obsahu zadaneho store podla zadaneho "StoreId".
	 * Pouziva sa pre index store a pre display fmt.store.
	 *
	 * 1, Bud najdeme alebo vytvoreme nove store podla pStoreId
	 * 2, Potom odstraniem vsetky existujuce data z pStore a naplnime ho novymi datami
	 *    prekopirovanymi z bodu 1
	 *
	 *
	 * @param {Object} pCombo - combobox
	 * @param {Object} pStoreId  - string identifikujuci store; moze by undefined
	 *                             (vtedy len vyprazdnime exist.obsah)
	 */
	csSetupValueStore : function(pCombo, pStoreId) {
		// specialny pripad, kedy nemame ziaden obsah
		if (!pStoreId) {
			pCombo.store.removeAll();
			// vycisti nas store
			return;
		}

		// pStoreId je storeId bazoveho store
		// najdeme ho cez store manager a data indexStore (t.j. store pripnuteho na nas index combo)
		// vymenime za data zdrojoveho store
		var srcStore = Ext.StoreMgr.get(pStoreId);
		var aSourceDT;

		if (srcStore) {
			aSourceDT = srcStore.getRange();
			pCombo.store.removeAll();
			// vycisti nas store
			pCombo.store.add(aSourceDT);
			// a napln ho datami zo zdroja
			if (aSourceDT && aSourceDT[0]) {
				// zoberieme z prveho zaznamu "id"; aSourceDT[0] je typu Ext.data.Record
				var firstID = aSourceDT[0].data.id;
				if (firstID) {
					pCombo.setValue(firstID);
					// nastavit obsah combo na prvy hodnotu z dat
				}
			}

		} else {
			srcStore = new i3.WS.StoreST({
				csStatTableN : pStoreId,
				autoLoad : false,
				listeners : {
					load : {
						fn : this.csOnValueLoad,
						scope : pCombo
					}
				}
			});
			srcStore.load();
		}
	},
	/**
	 *
	 */
	csOnValueLoad : function(store) {
		var aSourceDT = store.getRange();
		if (!aSourceDT) {
			i3.intError('source store for ' + store + ' NOT found in store manager ' + '& we got not data after store.load');
		}
		// smaz store
		this.store.removeAll();
		// a napln ho datami zo zdroja
		this.store.add(aSourceDT);

		// a napln ho datami zo zdroja
		// ak sa nasli nejake zaznamy (t.j. nejaky zoznam indexov)
		if (aSourceDT && aSourceDT[0]) {
			// zoberieme z prveho zaznamu "id"; aSourceDT[0] je typu Ext.data.Record
			var firstID = aSourceDT[0].data.id;
			if (firstID) {
				this.setValue(firstID);
				// nastavit obsah combo na prvy hodnotu z dat
			}
		}

		// toto osetri situaci, kdy v pripade, ze store jeste nenacetl a zavola se setValue, tak se nezobrazila textova hodnota z ciselniku ale pouze kod
		// timto se to snad vyresi
		//this.setValue(this.getValue());

	},
	/**
	 * Zavre zaznam.
	 *
	 * @param {Object} p Panel
	 */
	csOnCloseTab : function(p) {
		// zkotroluje jestli nebyl zaznam zmenen
		if (this.csIsRecordChanged()) {
			// pokud doslo ke zmene zobrazi dotaz
			Ext.Msg.show({
				title : epca.L10n.evidenceReallyCloseTit,
				msg : epca.L10n.evidenceReallyClose,
				buttons : i3.ui.YesNoCancel,
				fn : function(pButtonId) {
					if (pButtonId === 'yes') {
						p.ownerCt.remove(p);

						// 06.12.19 on; moznost otevrit nabidku pro otevreni formulare
						this.csOpenNewFormDialog();

						// pro volani z beforeclose
						return true;
					}
					// pro volani z beforeclose
					return false;
				},
				icon : Ext.MessageBox.QUESTION,
				scope : this
			});
			// pro volani z beforeclose
			// returning false to beforeclose cancels the close event
			return false;
		}
		// 06.12.19 on; moznost otevrit nabidku pro otevreni formulare
		this.csOpenNewFormDialog();

		// pro volani z beforeclose
		return true;
	},
	/**
	 * Moznost otevrit dialog po zavreni posledniho tabu.
	 *
	 * @param {Object} p Panel
	 *
	 * 06.12.19 on;
	 */
	csOpenNewFormDialog : function() {
		var tabpanel;

		if (epca.Config.User.csShowOpenFormDialog) {
			tabpanel = this.getTabPanelForms();
			// zaviram posledni tab?
			if (tabpanel && (tabpanel.items.length === 1)) {
				this.csOnNew(epca.Config.User.csShowOpenFormDialogFormat);
			}
		}
	},
	/**
	 * Zjisti, jestli byl zaznam zmenen. Vrati true, pokud zmenen byl.
	 *
	 * @param {Object} tab Panel
	 */
	csIsRecordChanged : function(tab) {
		var aNewRec = [];
		var aOrigRec = [];

		// kdyz nepreda tab, vezme aktualni
		if (!tab) {
			tab = this.getTabPanelForms().getActiveTab();
		}

		var newMarc = this.getForm(tab).getMarc(epca.cloneObject(tab.marcToSet), true);
		this.mergeMarc(tab.marcCloneToSet, newMarc);

		var newMarcRec = epca.convertToMarc(newMarc);

		// vynechane generovane tagy a subtagy a pole seradi
		i3.DataFmt.csFixRecord(newMarcRec, aNewRec);
		i3.DataFmt.csFixRecord(tab.csOrigMarcRecord, aOrigRec);

		// porovna oba objekty
		if (!i3.c.equalObjects(aOrigRec, aNewRec)) {
			return true;
		}
		return false;
	},
	/**
	 * Zjisti, jestli byl zaznam zmenen. Pokud zmenen byl, zobrazi dalsi informace
	 *
	 * @param {Object} tab Panel
	 */
	csIsRecordChangedAndShowInfo : function(tab) {
		var aNewRec = [];
		var aOrigRec = [];

		// kdyz nepreda tab, vezme aktualni
		if (!tab) {
			tab = this.getTabPanelForms().getActiveTab();
		}

		// nove zaznamy nebudu kontrolovat
		if (!tab.recordId || (tab.recordId === 'new')) {
			return false;
		}

		var newMarc = this.getForm(tab).getMarc(epca.cloneObject(tab.marcToSet), true);
		this.mergeMarc(tab.marcCloneToSet, newMarc);

		var newMarcRec = epca.convertToMarc(newMarc);

		// vynechane generovane tagy a subtagy a pole seradi
		i3.DataFmt.csFixRecord(newMarcRec, aNewRec);
		i3.DataFmt.csFixRecord(tab.csOrigMarcRecord, aOrigRec);

		// porovna oba objekty
		if (!i3.c.equalObjects(aOrigRec, aNewRec)) {
			Ext.each(aOrigRec, function(pLine, i) {
				// pokud se lisi, zkusi zrusit nejdrive mezery na konci podpoli
				// podminka je tu proto, aby to nedela pokazde -> tagy se lisi vyjimecne
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
							i3.alert(/*i3.DataFmt.tx.txWarning,*/
							i3.DataFmt.tx.txTagLost + aOrigRec[i].substring(0, 3) + '<br><br>' + i3.DataFmt.tx.txContact);
						} else {
							// doslo ke ztrate subtagu
							i3.alert(/*i3.DataFmt.tx.txWarning,*/
							i3.DataFmt.tx.txTagChange + aOrigRec[i].substring(0, 3) + '<br>' + i3.DataFmt.tx.txOrigTag + aOrigRec[i].strswap(i3.c.SF, '$$') + '<br>' + i3.DataFmt.tx.txNewTag + aNewRec[i].strswap(i3.c.SF, '$$') + '<br><br>' + i3.DataFmt.tx.txContact);
						}

						return false;
					}
				}
			});

			return true;
		}
		return false;
	},
	/*
	 * Zkontroluje, jestli nebyly zaznamy zmeneny - pozdej se sem muze pridat funkce pro odemknuti zaznamu pri odhlaseni z aplikace
	 *
	 */
	csTabsChanged : function() {
		var i, tab;

		for ( i = 0; i < this.getTabPanelForms().items.items.length; i++) {
			tab = this.getTabPanelForms().items.items[i];
			if (tab) {
				if (this.csIsRecordChanged(tab)) {
					return true;
				}
			}
		}
		return false;
	},
	/**
	 * odhlaseni z aplikace
	 */
	csOnLogout : function() {
		// nejprve zjisti, jestli neni nektery zaznam zmeneny
		if (this.csTabsChanged()) {
			// pokud doslo ke zmene zobrazi dotaz
			Ext.Msg.show({
				title : epca.L10n.evidenceReallyLogoutTit,
				msg : epca.L10n.evidenceReallyLogout,
				buttons : i3.ui.YesNoCancel,
				fn : function(pButtonId) {
					if (pButtonId === 'yes') {
						// po potvrzeni odhlasi
						i3.Login.mainAppFireEvent('app_logout');
					}
				},
				icon : Ext.MessageBox.QUESTION,
				scope : this
			});
		} else {
			i3.Login.mainAppFireEvent('app_logout');
		}
	},
	csOnSet969f : function() {
		var activTab = this.getTabPanelForms().getActiveTab(), record, c, o, sSetValue, prop, nScrollTop;

		i3.msgOn(epca.L10n.txSendingRecord, undefined, undefined, epca.evidence.c.sFormMsgId);
		try {
			c = Ext.getCmp('maintb_set969f');

			// kontroly pred provedenim
			if (!this.csCheckBeforeSet969f(c, activTab, true)) {
				return;
			}

			var newMarc = this.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));

			this.mergeMarc(activTab.marcCloneToSet, newMarc);

			newMarc['001'] = activTab.recordId;
			if (!newMarc['969']) {
				newMarc['969'] = {};
			}

			// 07.12.15 on; moznost zadat vice hodnot, nastavovat se bude pouze prvni
			sSetValue = epca.Config.User.csSet969f.piece('#', 1);
			// 09.11.15 on; moznost prepsat vsechny 969f
			if (epca.Config.User.csSet969fOverwriteAll) {
				o = sSetValue;
			} else {
				// 03.12.19 on; prefix subtagu
				prop = epca.form.Helper.c.sSubtagPrefix + 'f';
				o = newMarc['969'][prop];
				if (Ext.isArray(o)) {
					o.push(sSetValue);
				} else if (!i3.isEmptyString(o)) {
					o = [o, sSetValue];
				} else {
					o = sSetValue;
				}
			}
			// 21.12.20 on; nakonec jinak - neprojde pres jslint
			// 21.12.20 on; pridane [] k prop
			// 03.12.19 on; prefix subtagu
			prop = epca.form.Helper.c.sSubtagPrefix + 'f';
			/*Ext.apply(newMarc['969'], {
			 [prop] : o
			 });*/
			newMarc['969'][prop] = o;

			record = epca.convertToMarc(newMarc);
			//  18.09.15  on;  mozna  uprava zaznamu  pred  ulozenim
			if (epca.Config.User && epca.Config.User.csPreSave) {
				epca.Config.User.csPreSave(record, activTab);
			}

			record.t001 = activTab.recordId;
			record.classn = activTab.form.targetDb;
			record.data = (record.dataToWsRecord(true)).record;
		} catch(err) {
			// chyba
			i3.msgOff(epca.evidence.c.sFormMsgId);
		}

		// 21.12.20 on; zapamatuje si pozici scrollbaru
		c = activTab.getFormMainFieldset();
		if (c && c.ownerCt) {
			nScrollTop = activTab.getFormMainFieldset().ownerCt.body.dom.scrollTop;
		} else {
			nScrollTop = 0;
		}

		i3.WS.update({
			operation : 'update',
			// 14.07.23 on; nekontrolovat pri odeslani do/z ipac
			check : '0',
			success : function(oMARC_rec) {
				try {
					// 12.11.15 on;
					if (epca.Config.User && epca.Config.User.csPreOpen) {
						epca.Config.User.csPreOpen(oMARC_rec);
					}

					this.recordId = oMARC_rec.t001;

					// 20.05.16 on; zmena
					//this.marcToSet = epca.convertToObject(oMARC_rec.data, epca.Config.getUnFormat(oMARC_rec.classn));
					this.marcToSet = epca.convertToObject(oMARC_rec.data, epca.Config.getDbFormat(oMARC_rec.classn));

					// 10.12.14 on; zapamatuje si MARC zaznam
					this.csOrigMarcRecord = oMARC_rec;

					this.csLoadRecord(activTab, undefined, true);
					// 17.02.16 on; csLoadRecord rozdeleno na 2 casti
					this.csAddFormWait(this, activTab, undefined, undefined, this.csLoadRecordEnd, undefined, nScrollTop);

					// 21.12.20 on; rolovani na spravnou pozici - protoze pokud mam vice opakovani fieldsetu (napr. autori), dojde k odskoku na 2 opakovani
					//              je to tady i v metode csLoadRecordEnd, ktera se vola pozdeji - neni tam moc videt odskok nahoru a zpet
					if (nScrollTop && (nScrollTop > 0)) {
						c = activTab.getFormMainFieldset();
						if (c) {
							c.ownerCt.body.dom.scrollTop = nScrollTop;
						}
					}
				} catch(err) {
					// chyba
					i3.msgOff(epca.evidence.c.sFormMsgId);
				}
				i3.msgOff(epca.evidence.c.sFormMsgId);

				epca.notify(epca.L10n.evidenceSendRecordSuccess, epca.L10n.messageOK, "icon-accept");
			},
			failure : function(errorMsg) {
				// chyba
				i3.msgOff(epca.evidence.c.sFormMsgId);

				epca.notify(epca.L10n.evidenceSendRecordError + errorMsg, epca.L10n.messageError, "icon-error-epca");
			},
			scope : this // 11.08.11 on; zmena scope
		}, record);
	},
	// 07.09.15 on; odmazani 969f
	csOnClear969f : function() {
		var o, activTab = this.getTabPanelForms().getActiveTab(), record, index, c, i, s969f, bFound, nScrollTop;

		i3.msgOn(epca.L10n.txSendingRecord, undefined, undefined, epca.evidence.c.sFormMsgId);
		try {

			c = Ext.getCmp('maintb_clear969f');

			// kontroly jako pro save()
			if (!this.csCheckBeforeClear969f(c, activTab, true)) {
				return;
			}

			var newMarc = this.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
			this.mergeMarc(activTab.marcCloneToSet, newMarc);
			newMarc['001'] = activTab.recordId;

			// 03.12.19 on; prefix subtagu
			o = newMarc['969'][epca.form.Helper.c.sSubtagPrefix + 'f'];

			bFound = false;
			if (!Ext.isArray(o)) {
				// 07.12.15 on; moznost nastavit vice hodnot
				for ( i = 1; i <= epca.Config.User.csClear969f.fieldcount('#'); i += 1) {
					s969f = epca.Config.User.csClear969f.piece('#', i);
					if (o === s969f) {
						bFound = true;
						break;
					}
				}

				if (!bFound) {
					epca.notify(i3.fillInParams(epca.L10n.evidenceClear969fNotFound, [epca.Config.User.csClear969f]), epca.L10n.messageError, "icon-error-epca");
					return false;
				}
				// 03.12.19 on; prefix subtagu
				newMarc['969'][epca.form.Helper.c.sSubtagPrefix + 'f'] = '';
			} else {
				// 07.12.15 on; moznost nastavit vice hodnot
				for ( i = 1; i <= epca.Config.User.csClear969f.fieldcount('#'); i += 1) {
					s969f = epca.Config.User.csClear969f.piece('#', i);
					index = o.indexOf(s969f);
					if (index >= 0) {
						bFound = true;
						o.splice(index, 1);
					}
				}
				if (!bFound) {
					epca.notify(i3.fillInParams(epca.L10n.evidenceClear969fNotFound, [epca.Config.User.csClear969f]), epca.L10n.messageError, "icon-error-epca");
					return false;
				}
				// 03.12.19 on; prefix subtagu
				newMarc['969'][epca.form.Helper.c.sSubtagPrefix + 'f'] = o;
			}

			record = epca.convertToMarc(newMarc);
			//  18.09.15  on;  mozna  uprava zaznamu  pred  ulozenim
			if (epca.Config.User && epca.Config.User.csPreSave) {
				epca.Config.User.csPreSave(record, activTab);
			}

			record.t001 = activTab.recordId;
			record.classn = activTab.form.targetDb;
			record.data = (record.dataToWsRecord(true)).record;
		} catch(err) {
			// chyba
			i3.msgOff(epca.evidence.c.sFormMsgId);
		}

		// 21.12.20 on; zapamatuje si pozici scrollbaru
		c = activTab.getFormMainFieldset();
		if (c && c.ownerCt) {
			nScrollTop = activTab.getFormMainFieldset().ownerCt.body.dom.scrollTop;
		} else {
			nScrollTop = 0;
		}

		i3.WS.update({
			operation : 'update',
			// 14.07.23 on; nekontrolovat pri odeslani do/z ipac
			check : '0',
			success : function(oMARC_rec) {
				try {
					// 12.11.15 on;
					if (epca.Config.User && epca.Config.User.csPreOpen) {
						epca.Config.User.csPreOpen(oMARC_rec);
					}

					this.recordId = oMARC_rec.t001;
					// 20.05.16 on; zmena
					//this.marcToSet = epca.convertToObject(oMARC_rec.data, epca.Config.getUnFormat(oMARC_rec.classn));
					this.marcToSet = epca.convertToObject(oMARC_rec.data, epca.Config.getDbFormat(oMARC_rec.classn));

					// 10.12.14 on; zapamatuje si MARC zaznam
					this.csOrigMarcRecord = oMARC_rec;

					this.csLoadRecord(activTab, undefined, true);
					// 17.02.16 on; csLoadRecord rozdeleno na 2 casti
					this.csAddFormWait(this, activTab, undefined, undefined, this.csLoadRecordEnd, undefined, nScrollTop);

					// 21.12.20 on; rolovani na spravnou pozici - protoze pokud mam vice opakovani fieldsetu (napr. autori), dojde k odskoku na 2 opakovani
					//              je to tady i v metode csLoadRecordEnd, ktera se vola pozdeji - neni tam moc videt odskok nahoru a zpet
					if (nScrollTop && (nScrollTop > 0)) {
						c = activTab.getFormMainFieldset();
						if (c) {
							c.ownerCt.body.dom.scrollTop = nScrollTop;
						}
					}

					epca.notify(epca.L10n.evidenceSendRecordSuccess, epca.L10n.messageOK, "icon-accept");

					// pokud je nastavene zavre zalozku
					if (epca.Config.User.csClear969fCloseTab === 'true') {
						this.getTabPanelForms().remove(activTab);
					}
				} catch(err) {
					// chyba
					i3.msgOff(epca.evidence.c.sFormMsgId);
				}
				i3.msgOff(epca.evidence.c.sFormMsgId);
			},
			failure : function(errorMsg) {
				// chyba
				i3.msgOff(epca.evidence.c.sFormMsgId);

				epca.notify(epca.L10n.evidenceSendRecordError + errorMsg, epca.L10n.messageError, "icon-error-epca");
			},
			scope : this // 11.08.11 on; zmena scope
		}, record);
	},
	/**
	 * kontrola zaznamu
	 *
	 */
	csCheckRecord : function() {
		var activTab = this.getTabPanelForms().getActiveTab(), record;
		//var that = this;  // musim si uchovat this

		if (!Ext.isDefined(activTab) || activTab === null) {
			return false;
		}

		/*if (this.getForm(activTab).validate() !== true) {
		 epca.notify(epca.L10n.evidenceFormNotValid, epca.L10n.evidenceFormValidation, "icon-error-epca");
		 return false;
		 }*/

		/*var is_new = true;

		 if (activTab.recordId !== undefined) {
		 is_new = false;
		 }*/

		var newMarc = this.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));

		this.mergeMarc(activTab.marcCloneToSet, newMarc);

		newMarc['001'] = activTab.recordId;
		record = epca.convertToMarc(newMarc);
		//  12.08.15  on;  mozna  uprava zaznamu  pred  ulozenim (i pred kontrolou)
		if (epca.Config.User && epca.Config.User.csPreSave) {
			epca.Config.User.csPreSave(record, activTab);
		}
		record.t001 = activTab.recordId;
		record.classn = activTab.form.targetDb;
		record.data = (record.dataToWsRecord(true)).record;
		//record = epca.convertToMarc(this.getForm(activTab).getMarc());
		//record.t001 = 'new';
		//record.classn = activTab.form.targetDb;
		//      var recordWs = (record.dataToWsRecord(false));
		//.record_len
		//record.data = recordWs.record;

		i3.WS.update({
			operation : 'check',
			success : function(poResult) {
				this.csCheckRecordResult(poResult, false);
				//if (epca.Config.User && epca.Config.User.csPreOpen) {
				//  epca.Config.User.csPreOpen(oMARC_rec);
				//}
				//epca.notify(epca.L10n.evidenceSaveRecordSuccess, epca.L10n.messageOK, "icon-accept");
			},
			failure : function(errorMsg) {
				epca.notify(epca.L10n.evidenceManipulatingFormError + errorMsg, epca.L10n.messageError, "icon-error-epca");
			},
			//scope : activTab.marcCloneToSet // v clone sa nachadza 005 a 009, pretoze sa nezobrazuje
			scope : this // 11.08.11 on; zmena scope
		}, record);
	},
	csCheckRecordResult : function(poResult, pbSave) {
		var sNotFoundList = '', s, m;

		var activTab = this.getTabPanelForms().getActiveTab();
		if (!Ext.isDefined(activTab) || activTab === null) {
			return false;
		}
		var actForm = this.getForm(activTab);

		this.csClearCheckIcons(actForm);

		// pokud server nevrati zadnou zpravu, zobrazim hlasku, ze je zaznam v poradku
		if (!poResult.check_error && !poResult.check_warning && !poResult.check_info) {
			// 13.09.17 on; pridana podminka, ze nesmi jit o ulozeni zaznamu - tam je hlaska obtezujici
			if (!pbSave) {
				i3.alert(epca.evidence.tx.txCheckOK);
			}
			return;
		}

		// 15.11.17 on; zobrazit vzdy vsechny zpravy
		// zobrazeni ikon od nejmene dulezitych
		// chyby
		s = this.csCheckRecordResult0(actForm, poResult.check_error, 0, true);
		if (!i3.isEmptyString(s)) {
			// 21.11.17 on; zmena oddelovace kvuli doplneni ikon
			m = new i3.WS.Msg(s, '|');
			if (!i3.isEmptyString(m.userText)) {
				// 21.11.17 on; doplni ikony
				m.userText = this.csAddCheckIcons(m.userText, epca.evidence.c.sErrorImg);

				if (!i3.isEmptyString(sNotFoundList)) {
					sNotFoundList += '<br>';
				}
				sNotFoundList += m.userText;
			}
		}

		// 15.11.17 on; zobrazit vzdy vsechny zpravy
		// varovani
		s = this.csCheckRecordResult0(actForm, poResult.check_warning, 1, true);
		if (!i3.isEmptyString(s)) {
			// 21.11.17 on; zmena oddelovace kvuli doplneni ikon
			m = new i3.WS.Msg(s, '|');
			if (!i3.isEmptyString(m.userText)) {
				// 21.11.17 on; doplni ikony
				m.userText = this.csAddCheckIcons(m.userText, epca.evidence.c.sWarningImg);

				if (!i3.isEmptyString(sNotFoundList)) {
					sNotFoundList += '<br>';
				}
				sNotFoundList += m.userText;
			}
		}

		// 15.11.17 on; zobrazit vzdy vsechny zpravy
		// infa
		s = this.csCheckRecordResult0(actForm, poResult.check_info, 2, true);
		if (!i3.isEmptyString(s)) {
			// 21.11.17 on; zmena oddelovace kvuli doplneni ikon
			m = new i3.WS.Msg(s, '|');
			if (!i3.isEmptyString(m.userText)) {
				// 21.11.17 on; doplni ikony
				m.userText = this.csAddCheckIcons(m.userText, epca.evidence.c.sInfoImg);

				if (!i3.isEmptyString(sNotFoundList)) {
					sNotFoundList += '<br>';
				}
				sNotFoundList += m.userText;
			}
		}

		if (!i3.isEmptyString(sNotFoundList)) {
			// 16.11.17 on; lepsi zobrazeni velkeho mnozstvi chyb
			//i3.alert(sNotFoundList);

			var panel = new Ext.Panel({
				html : sNotFoundList,
				autoScroll : true,
				border : false,
				cls : 'ext-mb-text',
				bodyStyle : 'padding: 5px 5px 5px 5px'
			});

			var win = new Ext.Window({
				resizable : false,
				constrain : true,
				constrainHeader : true,
				minimizable : false,
				maximizable : false,
				stateful : false,
				shim : true,
				buttonAlign : 'center',
				minHeight : 80,
				plain : true,
				footer : true,
				closable : true,
				modal : true,
				border : false,
				title : i3.tx.txInfo,
				cls : 'x-window-dlg',
				buttons : [{
					text : 'OK',
					handler : function() {
						win.close();
					}
				}],
				items : [panel]
			});
			win.show();

			// pokud je velikost dialogu vetsi nez okno prohlizece, zmensi ho
			if (panel.getHeight() > Ext.getBody().getViewSize().height) {
				panel.setHeight(Ext.getBody().getViewSize().height - 120);
				win.setPosition(undefined, 10);
			}
		}
	},
	/**
	 * Prida do prehledu ikony
	 *
	 * 21.11.17 on;
	 */
	csAddCheckIcons : function(psList, psImg) {
		var i, s, sResult, aList = psList.split('|');

		sResult = '';

		for ( i = 0; i < aList.length; i++) {
			s = aList[i];
			if (!i3.isEmptyString(sResult)) {
				sResult += '<br>';
			}
			sResult += psImg + ' ' + s;
		}
		return sResult;
	},
	// 15.11.17 on; zobrazeni vsech zprav v dialogu
	// nType: 0=chyby, 1=varovani, 2=info
	csCheckRecordResult0 : function(pForm, paList, nType, pbAll) {
		var i, j, k, l, o, m, n, oItem, oItem1, sList = '', bFoundField, bFoundTag, nTagNo, nSubtagNo, oItem2, oItem3, oItem4, cmpEl, oQTip, sQTipText, sQtip, bFoundFieldMain;

		if (!paList) {
			return;
		}
		if (!pForm) {
			return;
		}

		// testovani
		/*if (nType === 0) {
		 paList.push({
		 tag : "245",
		 subtag : "h",
		 tagno : "1",
		 subtagno : "1",
		 text : "Není vyplněn jazyk dokumentace."
		 }, {
		 tag : "245",
		 subtag : "h",
		 tagno : "1",
		 subtagno : "1",
		 text : "nepopsana chyba"
		 }, {
		 tag : "245",
		 subtag : "h",
		 tagno : "1",
		 subtagno : "1",
		 text : "OKBSKT001#xxx"
		 }, {
		 tag : "245",
		 subtag : "h",
		 tagno : "1",
		 subtagno : "1",
		 text : "OKBSKT001#xxx"
		 }, {
		 tag : "245",
		 subtag : "h",
		 tagno : "1",
		 subtagno : "1",
		 text : "OKBSKT001#xxx"
		 });
		 }*/

		for ( i = 0; i < paList.length; i++) {
			o = paList[i];
			bFoundTag = false;
			bFoundFieldMain = false;
			if (i3.isEmptyString(o.tagno)) {
				o.tagno = '1';
				// 06.11.15 on; zmena 0 -> 1
			}
			o.tagno = parseInt(o.tagno, 10);

			if (i3.isEmptyString(o.subtagno)) {
				o.subtagno = '1';
				// 06.11.15 on; zmena 0 -> 1
			}
			o.subtagno = parseInt(o.subtagno, 10);

			// 15.11.17 on; zobrazeni vsech chyb v dialogu
			if (pbAll) {
				sList += '|' + o.text;
			}

			// pokud je tag i subtag prazdny, zapamatuje si text
			if (i3.isEmptyString(o.tag) && i3.isEmptyString(o.subtag)) {
				// 15.11.17 on; pouze pokud uz nezobrazuju vsechny zpravy
				if (!pbAll) {
					sList += '|' + o.text;
				}
				continue;
			}

			// zkusi najit prvek na formulari
			// najde tag
			nTagNo = 0;
			// hledam tag
			for ( j = 0; j < pForm.items.items.length; j++) {
				oItem = pForm.items.items[j];

				// 12.07.16 on; pouze viditelne pole
				if (!oItem.hidden) {
					// opakovatelne pole
					if (oItem.xtype === 'epca.repeatable_encapsulation') {
						for ( k = 0; k < oItem.csGetCount(); k++) {
							oItem1 = oItem.csGetItem(k);
							if (oItem1.tag === o.tag) {
								nTagNo++;
								if (nTagNo === o.tagno) {
									bFoundTag = true;
									break;
								}
							}
						}
						if (bFoundTag) {
							oItem = oItem1;
							break;
						}
					} else {
						if (oItem.tag === o.tag) {
							nTagNo++;
							if (nTagNo === o.tagno) {
								bFoundTag = true;
								break;
							}
						}
					}
				}
			}

			// nasel tag
			if (bFoundTag) {
				// tag byl nalezen
				if (i3.isEmptyString(o.subtag)) {
					// tag
					// musim  nejak nastavit priznak
					switch(nType) {
						case 0:
							oItem.tools.csCheckError.setVisible(true);
							m = new i3.WS.Msg(o.text);
							sQtip = oItem.tools.csCheckError.dom.qtip;
							if (!i3.isEmptyString(sQtip)) {
								sQtip = sQtip + '<br>' + m.userText;
							} else {
								sQtip = m.userText;
							}
							oItem.tools.csCheckError.dom.qtip = sQtip;
							break;
						case 1:
							oItem.tools.csCheckWarning.setVisible(true);
							m = new i3.WS.Msg(o.text);
							sQtip = oItem.tools.csCheckWarning.dom.qtip;
							if (!i3.isEmptyString(sQtip)) {
								sQtip = sQtip + '<br>' + m.userText;
							} else {
								sQtip = m.userText;
							}
							oItem.tools.csCheckWarning.dom.qtip = sQtip;
							break;
						case 2:
							oItem.tools.csCheckInfo.setVisible(true);
							m = new i3.WS.Msg(o.text);
							sQtip = oItem.tools.csCheckInfo.dom.qtip;
							if (!i3.isEmptyString(sQtip)) {
								sQtip = sQtip + '<br>' + m.userText;
							} else {
								sQtip = m.userText;
							}
							oItem.tools.csCheckInfo.dom.qtip = sQtip;
							break;
					}
					bFoundFieldMain = true;
				} else {
					// hledam subtag
					nSubtagNo = 0;
					bFoundField = false;

					for ( l = 0; l < oItem.items.items.length; l++) {
						oItem1 = oItem.items.items[l];

						// 12.07.16 on; preskoci skryta pole
						if (!oItem1.hidden) {
							// opakovatelne podpole
							if (oItem1.xtype === 'epca.repeatable_encapsulation') {
								for ( k = 0; k < oItem1.csGetCount(); k++) {
									oItem2 = oItem1.csGetItem(k);
									// 10.02.21 on; doplnen prefix
									// pridana podminka, prazdne podpole se neposila na server, ale pokud jsou vsechna pole prazdna, tak server vraci chybu, ze je pole povinne
									if ((oItem2.field === (epca.form.Helper.c.sSubtagPrefix + o.subtag)) && this.csIsFieldChecked(epca.form.Helper.c.sSubtagPrefix + o.subtag, oItem2)) {
										nSubtagNo++;
										if (nSubtagNo === o.subtagno) {
											bFoundField = true;
											break;
										}
									}
								}
								if (bFoundField) {
									oItem = oItem2;
									break;
								}
							} else {
								// 10.02.21 on; doplnen prefix
								if (oItem1.field === (epca.form.Helper.c.sSubtagPrefix + o.subtag)) {
									nSubtagNo++;
									if (nSubtagNo === o.subtagno) {
										bFoundField = true;
										oItem = oItem1;
										break;
									}
								}
							}
						}
					}

					// subtag
					if (bFoundField) {
						// musim  nejak nastavit priznak
						switch(nType) {
							case 0:
								oItem.addClass(epca.evidence.c.sFieldCheckError);
								break;
							case 1:
								oItem.addClass(epca.evidence.c.sFieldCheckWarning);
								break;
							case 2:
								oItem.addClass(epca.evidence.c.sFieldCheckInfo);
								break;
						}
						m = new i3.WS.Msg(o.text);

						// zjistim, jestli uz neexistuje tooltip
						cmpEl = oItem.getEl();
						if (cmpEl) {
							oQTip = Ext.QuickTips.getQuickTip().targets[cmpEl.id];
						}
						if (cmpEl && oQTip) {
							// zrusi puvodni
							sQTipText = oQTip.text + '<br>' + m.userText;
							Ext.QuickTips.unregister(oItem);
						} else {
							sQTipText = m.userText;
						}

						Ext.QuickTips.register({
							target : oItem,
							title : '',
							text : sQTipText
						});
						bFoundFieldMain = true;
					}
				}
			}

			// pokud nebyl nalezen std. tag, zkusi jeste projit kontejnery
			if (!bFoundTag) {
				for ( j = 0; j < pForm.items.items.length; j++) {
					oItem = pForm.items.items[j];
					if (oItem.csContainer) {
						// opakovatelny kontejner nebudu zatim resit, doufam, ze to nikoho nenapadne vytvorit
						if (oItem.xtype === 'epca.repeatable_encapsulation') {
							/*for ( k = 0; k < oItem.csGetCount(); k++) {
							 oItem1 = oItem.csGetItem(k);
							 if (oItem1.tag === o.tag) {
							 nTagNo++;
							 if (nTagNo === o.tagno) {
							 bFoundTag = true;
							 break;
							 }
							 }
							 }
							 if (bFoundTag) {
							 oItem = oItem1;
							 break;
							 }*/
						} else {
							if (o.subtag === '') {
								// hledam tag - kvuli chybe "too much recursion" zakomentovane
								/*nTagNo = 0;
								 bFoundTag = false;

								 for ( l = 0; l < oItem.items.items.length; l++) {
								 oItem1 = oItem.items.items[l];
								 // opakovatelne podpole
								 if (oItem1.xtype === 'epca.repeatable_encapsulation') {
								 for ( k = 0; k < oItem1.csGetCount(); k++) {
								 oItem2 = oItem1.csGetItem(k);
								 // pridana podminka, prazdne podpole se neposila na server, ale pokud jsou vsechna pole prazdna, tak server vraci chybu, ze je pole povinne
								 if ((oItem2.tag === o.tag) && i3.isEmptyString(oItem2.field) && this.csIsFieldChecked(o.subtag, oItem2)) {
								 nSubtagNo++;
								 if (nSubtagNo === o.subtagno) {
								 bFoundTag = true;
								 break;
								 }
								 }
								 }
								 if (bFoundTag) {
								 oItem = oItem2;
								 break;
								 }
								 } else {
								 if ((oItem1.tag === o.tag) && i3.isEmptyString(oItem1.field)) {
								 nTagNo++;
								 if (nTagNo === o.tagno) {
								 bFoundTag = true;
								 oItem = oItem1;
								 break;
								 }
								 }
								 }
								 }
								 // subtag
								 if (bFoundTag) {
								 // musim  nejak nastavit priznak
								 switch(nType) {
								 case 0:
								 oItem.tools.csCheckError.setVisible(true);
								 m = new i3.WS.Msg(o.text);
								 sQtip = oItem.tools.csCheckError.dom.qtip;
								 if (!i3.isEmptyString(sQtip)) {
								 sQtip = sQtip + '<br>' + m.userText;
								 } else {
								 sQtip = m.userText;
								 }
								 oItem.tools.csCheckError.dom.qtip = sQtip;
								 break;
								 case 1:
								 oItem.tools.csCheckWarning.setVisible(true);
								 m = new i3.WS.Msg(o.text);
								 sQtip = oItem.tools.csCheckWarning.dom.qtip;
								 if (!i3.isEmptyString(sQtip)) {
								 sQtip = sQtip + '<br>' + m.userText;
								 } else {
								 sQtip = m.userText;
								 }
								 oItem.tools.csCheckWarning.dom.qtip = sQtip;
								 break;
								 case 2:
								 oItem.tools.csCheckInfo.setVisible(true);
								 m = new i3.WS.Msg(o.text);
								 sQtip = oItem.tools.csCheckInfo.dom.qtip;
								 if (!i3.isEmptyString(sQtip)) {
								 sQtip = sQtip + '<br>' + m.userText;
								 } else {
								 sQtip = m.userText;
								 }
								 oItem.tools.csCheckInfo.dom.qtip = sQtip;
								 break;
								 }
								 bFoundFieldMain = true;
								 break;
								 }*/
							} else {
								// hledam subtag
								nSubtagNo = 0;
								bFoundField = false;

								for ( l = 0; l < oItem.items.items.length; l++) {
									oItem1 = oItem.items.items[l];
									// opakovatelne pole/podpole
									if (oItem1.xtype === 'epca.repeatable_encapsulation') {
										nTagNo = 0;
										bFoundTag = false;
										for ( k = 0; k < oItem1.csGetCount(); k++) {
											oItem2 = oItem1.csGetItem(k);
											// 10.02.21 on; doplnen prefix
											// pridana podminka, prazdne podpole se neposila na server, ale pokud jsou vsechna pole prazdna, tak server vraci chybu, ze je pole povinne
											if ((oItem2.tag === o.tag) && (oItem2.field === (epca.form.Helper.c.sSubtagPrefix + o.subtag)) && this.csIsFieldChecked(epca.form.Helper.c.sSubtagPrefix + o.subtag, oItem2)) {
												nSubtagNo++;
												if (nSubtagNo === o.subtagno) {
													bFoundField = true;
													oItem = oItem2;
													break;
												}
											} else
											// subtag v tagu v kontejneru
											if ((oItem2.tag === o.tag) && !oItem2.field) {
												nTagNo++;
												if (nTagNo === o.tagno) {
													bFoundTag = true;
												}
											}
											if (bFoundTag) {
												// zkusim najit subtag
												nSubtagNo = 0;
												for ( m = 0; m < oItem2.items.items.length; m++) {
													oItem3 = oItem2.items.items[m];
													// 10.02.21 on; doplnen prefix
													if ((oItem3.tag === o.tag) && (oItem3.field === (epca.form.Helper.c.sSubtagPrefix + o.subtag))) {
														// opakovatelne podpole
														if (oItem3.xtype === 'epca.repeatable_encapsulation') {
															for ( n = 0; n < oItem3.csGetCount(); n++) {
																oItem4 = oItem3.csGetItem(n);
																// 10.02.21 on; doplnen prefix
																// pridana podminka, prazdne podpole se neposila na server, ale pokud jsou vsechna pole prazdna, tak server vraci chybu, ze je pole povinne
																//if ((oItem3.tag === o.tag) && (oItem3.field === o.subtag) && this.csIsFieldChecked(o.subtag, oItem3)) {
																if (this.csIsFieldChecked(epca.form.Helper.c.sSubtagPrefix + o.subtag, oItem4)) {
																	nSubtagNo++;
																	if (nSubtagNo === o.subtagno) {
																		bFoundField = true;
																		break;
																	}
																}
															}
															if (bFoundField) {
																oItem = oItem4;
																break;
															}
														} else {
															// neopakovatelne podpole
															nSubtagNo++;
															if (nSubtagNo === o.subtagno) {
																bFoundField = true;
																oItem = oItem3;
																break;
															}
														}
													}

												}
												if (bFoundField) {
													break;
												}
											}
										}
										if (bFoundField) {
											break;
										}
									} else {
										// bud jde o subtag v kontejneru ...
										// 10.02.21 on; doplnen prefix
										if ((oItem1.tag === o.tag) && (oItem1.field === (epca.form.Helper.c.sSubtagPrefix + o.subtag))) {
											nSubtagNo++;
											if (nSubtagNo === o.subtagno) {
												bFoundField = true;
												oItem = oItem1;
												break;
											}
										} else
										// ... nebo subtag v tagu v kontejneru
										if ((oItem1.tag === o.tag) && !oItem1.field) {
											// zkusim najit subtag
											nSubtagNo = 0;
											bFoundField = false;
											for ( m = 0; m < oItem1.items.items.length; m++) {
												oItem2 = oItem1.items.items[m];
												// 10.02.21 on; doplnen prefix
												if ((oItem2.tag === o.tag) && (oItem2.field === (epca.form.Helper.c.sSubtagPrefix + o.subtag))) {
													// opakovatelne podpole
													if (oItem2.xtype === 'epca.repeatable_encapsulation') {
														for ( k = 0; k < oItem2.csGetCount(); k++) {
															oItem3 = oItem2.csGetItem(k);
															// 10.02.21 on; doplnen prefix
															// pridana podminka, prazdne podpole se neposila na server, ale pokud jsou vsechna pole prazdna, tak server vraci chybu, ze je pole povinne
															//if ((oItem3.tag === o.tag) && (oItem3.field === o.subtag) && this.csIsFieldChecked(o.subtag, oItem3)) {
															if (this.csIsFieldChecked(epca.form.Helper.c.sSubtagPrefix + o.subtag, oItem3)) {
																nSubtagNo++;
																if (nSubtagNo === o.subtagno) {
																	bFoundField = true;
																	break;
																}
															}
														}
														if (bFoundField) {
															oItem = oItem3;
															break;
														}
													} else {
														// neopakovatelne podpole
														nSubtagNo++;
														if (nSubtagNo === o.subtagno) {
															bFoundField = true;
															oItem = oItem2;
															break;
														}
													}
												}
											}
											if (bFoundField) {
												break;
											}
										}
									}
								}
								// subtag
								if (bFoundField) {
									// musim  nejak nastavit priznak
									switch(nType) {
										case 0:
											oItem.addClass(epca.evidence.c.sFieldCheckError);
											break;
										case 1:
											oItem.addClass(epca.evidence.c.sFieldCheckWarning);
											break;
										case 2:
											oItem.addClass(epca.evidence.c.sFieldCheckInfo);
											break;
									}
									m = new i3.WS.Msg(o.text);

									// zjistim, jestli uz neexistuje tooltip
									cmpEl = oItem.getEl();
									if (cmpEl) {
										oQTip = Ext.QuickTips.getQuickTip().targets[cmpEl.id];
									}
									if (cmpEl && oQTip) {
										// zrusi puvodni
										sQTipText = oQTip.text + '<br>' + m.userText;
										Ext.QuickTips.unregister(oItem);
									} else {
										sQTipText = m.userText;
									}

									Ext.QuickTips.register({
										target : oItem,
										title : '',
										text : sQTipText
									});
									bFoundFieldMain = true;
									break;
								}
							}
						}
					}
				}
			}

			// 15.11.17 on; pouze pokud uz nezobrazuju vsechny zpravy
			if (!pbAll && !bFoundFieldMain) {
				sList += '|' + o.text;
			}

		}
		return sList;
	},
	// vrati true pokud se ma pole validovat
	// validuje se pole vyplnene nebo nevyplnene v pripade, ze neni vyplnene zadne v ramci RepeatableEncapsulation
	csIsFieldChecked : function(psST, poItem) {
		var oMarc;
		if (poItem.getRawValue() !== '') {
			return true;
		}

		// jsme v ramci RepeatableEncapsulation
		oMarc = poItem.ownerCt.getMarc();

		if (i3.csIsEmptyArrayOfObj(oMarc[psST])) {
			return true;
		}
		return false;
	},
	/// skryje vsechny tools ikony z kontrol
	csClearCheckIcons : function(pForm) {
		var j, k, oItem, oItem1;

		if (!pForm) {
			return;
		}
		// projdu vsechno, skryju vsechno
		for ( j = 0; j < pForm.items.items.length; j++) {
			oItem = pForm.items.items[j];
			// opakovatelne pole
			if (oItem.xtype === 'epca.repeatable_encapsulation') {
				for ( k = 0; k < oItem.csGetCount(); k++) {
					oItem1 = oItem.csGetItem(k);

					// 03.10.16 on; kontejner nemusi byt vykresleny (je skryty)
					if (oItem1 && oItem1.tools) {
						if (oItem1.tools.csCheckError) {
							oItem1.tools.csCheckError.setVisible(false);
							oItem1.tools.csCheckError.dom.qtip = '';
						}
						if (oItem1.tools.csCheckWarning) {
							oItem1.tools.csCheckWarning.setVisible(false);
							oItem1.tools.csCheckWarning.dom.qtip = '';
						}
						if (oItem1.tools.csCheckInfo) {
							oItem1.tools.csCheckInfo.setVisible(false);
							oItem1.tools.csCheckInfo.dom.qtip = '';
						}
						this.csClearIconField(oItem1);
					}
				}
			} else {
				// 03.10.16 on; kontejner nemusi byt vykresleny (je skryty)
				if (oItem && oItem.tools) {
					if (oItem.tools.csCheckError) {
						oItem.tools.csCheckError.setVisible(false);
						oItem.tools.csCheckError.dom.qtip = '';
					}
					if (oItem.tools.csCheckWarning) {
						oItem.tools.csCheckWarning.setVisible(false);
						oItem.tools.csCheckWarning.dom.qtip = '';
					}
					if (oItem.tools.csCheckInfo) {
						oItem.tools.csCheckInfo.setVisible(false);
						oItem.tools.csCheckInfo.dom.qtip = '';
					}
					this.csClearIconField(oItem);
				}
			}
		}
	},
	/// skryje vsechny ikony podpoli
	csClearIconField : function(oFieldset) {
		var i, j, k, l, oItem, oItem1, oItem2, oItem3;

		if (!oFieldset) {
			return;
		}
		// projdu vsechno, skryju vsechno
		for ( i = 0; i < oFieldset.items.items.length; i++) {
			oItem = oFieldset.items.items[i];

			if (!oItem.field) {
				// tag v kontejneru
				// opakovatelny tag
				if (oItem.xtype === 'epca.repeatable_encapsulation') {
					for ( j = 0; j < oItem.csGetCount(); j++) {
						oItem1 = oItem.csGetItem(j);
						for ( k = 0; k < oItem1.items.items.length; k++) {
							oItem2 = oItem1.items.items[k];
							// opakovatelne podpole
							if (oItem2.xtype === 'epca.repeatable_encapsulation') {
								for ( l = 0; l < oItem2.csGetCount(); l++) {
									oItem3 = oItem2.csGetItem(l);
									oItem3.removeClass(epca.evidence.c.sFieldCheckError);
									oItem3.removeClass(epca.evidence.c.sFieldCheckWarning);
									oItem3.removeClass(epca.evidence.c.sFieldCheckInfo);
									Ext.QuickTips.unregister(oItem3);
								}
							} else {
								oItem2.removeClass(epca.evidence.c.sFieldCheckError);
								oItem2.removeClass(epca.evidence.c.sFieldCheckWarning);
								oItem2.removeClass(epca.evidence.c.sFieldCheckInfo);
								Ext.QuickTips.unregister(oItem2);
							}
						}
					}
				} else {
					for ( k = 0; k < oItem.items.items.length; k++) {
						oItem1 = oItem.items.items[k];
						// opakovatelne podpole
						if (oItem1.xtype === 'epca.repeatable_encapsulation') {
							for ( j = 0; j < oItem1.csGetCount(); j++) {
								oItem2 = oItem1.csGetItem(j);
								oItem2.removeClass(epca.evidence.c.sFieldCheckError);
								oItem2.removeClass(epca.evidence.c.sFieldCheckWarning);
								oItem2.removeClass(epca.evidence.c.sFieldCheckInfo);
								Ext.QuickTips.unregister(oItem2);
							}
						} else {
							oItem1.removeClass(epca.evidence.c.sFieldCheckError);
							oItem1.removeClass(epca.evidence.c.sFieldCheckWarning);
							oItem1.removeClass(epca.evidence.c.sFieldCheckInfo);
							Ext.QuickTips.unregister(oItem1);
						}
					}
				}

			} else {
				// std. subtagy

				// opakovatelne podpole
				if (oItem.xtype === 'epca.repeatable_encapsulation') {
					for ( j = 0; j < oItem.csGetCount(); j++) {
						oItem1 = oItem.csGetItem(j);
						oItem1.removeClass(epca.evidence.c.sFieldCheckError);
						oItem1.removeClass(epca.evidence.c.sFieldCheckWarning);
						oItem1.removeClass(epca.evidence.c.sFieldCheckInfo);
						Ext.QuickTips.unregister(oItem1);
					}
				} else {
					oItem.removeClass(epca.evidence.c.sFieldCheckError);
					oItem.removeClass(epca.evidence.c.sFieldCheckWarning);
					oItem.removeClass(epca.evidence.c.sFieldCheckInfo);
					Ext.QuickTips.unregister(oItem);
				}
			}
		}
	},
	/**
	 * link na vystupy - zatim neouzito
	 */
	/*csShowReports : function(psURL) {
	var s;

	// zobrazi v novem okne, prida sso info
	s = this.getURLParam('_arlsso');
	if (s) {
	s = s.piece('#', 1);  // 06.06.19 on; pripadna kotva
	psURL += '&_arlsso=' + encodeURIComponent(s);
	}
	s = this.getURLParam('_arlssopw');
	if (s) {
	s = s.piece('#', 1);  // 06.06.19 on; pripadna kotva
	psURL += '&_arlssopw=' + encodeURIComponent(s);
	}
	window.open(psURL, '_blank');
	},*/
	/**
	 * vytvorit kopii zaznamu
	 *
	 */
	csCopyRecord : function() {
		var activTab = this.getTabPanelForms().getActiveTab();

		if (!Ext.isDefined(activTab) || activTab === null) {
			return false;
		}

		// 15.12.17 on; presunuto niz
		/*if (this.getForm(activTab).validate() !== true) {
		epca.notify(epca.L10n.evidenceFormNotValid, epca.L10n.evidenceFormValidation, "icon-error-epca");
		return false;
		}*/

		// nejrive je nutne zaznam ulozit
		if (this.csIsNewRecord(activTab.recordId)) {
			epca.notify(epca.L10n.evidenceFirstSaveCommon, epca.L10n.messageError, 'icon-error');
			return;
		}

		// 27.11.17 on; zaznam musi byt v db aktualni
		if (this.csIsRecordChanged()) {
			// 15.12.17 on; kontrola na validaci formulare jen pokud byl zaznam zmenen - na SLUKu se kopiruji zaznamy, ktere nejsou z pohledu formulare validni (nemaji vyplneno 969f)
			if (this.getForm(activTab).validate() !== true) {
				epca.notify(epca.L10n.evidenceFormNotValid, epca.L10n.evidenceFormValidation, "icon-error-epca");
				return false;
			}

			epca.notify(epca.L10n.evidenceFirstSaveEdited, epca.L10n.messageError, 'icon-error');
			return;
		}

		Ext.Msg.show({
			title : epca.L10n.titleCopyRecord,
			msg : epca.L10n.txReallyCreateRecordCopy,

			buttons : i3.ui.YesNo,

			fn : function(pButtonId) {
				if (pButtonId !== 'yes') {
					return;
				}

				// pokracujeme ulozenim zaznamu
				this.csCopyRecord1(activTab);
			},
			icon : Ext.MessageBox.QUESTION,
			scope : this
		});
	},
	// 27.11.17 on; mezikrok - aplikovani filtru ze serveru
	csCopyRecord1 : function(activTab) {
		// 27.11.17 on; moznost zapojit filtr ze serveru
		if (!i3.isEmptyString(epca.Config.User.ShowCopyRecordBtnFilter)) {
			// 13.12.17 on; zapojeno provolani serverove metody
			i3.WS.command({
				db : activTab.form.targetDb,
				command : 'filterrec',
				params : epca.Config.User.ShowCopyRecordBtnFilter + ' ' + activTab.form.targetDb + '*' + activTab.recordId,
				success : function(poJSON) {
					var rec = new i3.Marc(poJSON.records[0]);
					this.csCopyRecord0(activTab, rec);
				},
				scope : this
			});
		} else {
			this.csCopyRecord0(activTab);
		}
	},
	// 23.11.22 on; doplneny parametry pbGetRecFromUrl, psFormType - kopirovani zadane pres url a typ formulare z url
	csCopyRecord0 : function(activTab, pNewRec, pbGetRecFromUrl, psFormType) {
		var record, sSetValue, o, bFound, i, prop;

		// 27.11.17 on; pokud byl zaznam predany, nebudu ho menit
		if (pNewRec) {
			record = pNewRec;
			record.t001 = 'new';
			record.setTag('001    new');
		} else {
			var newMarc = this.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));

			i3.msgOn(epca.L10n.txCopyingRecord, undefined, undefined, epca.evidence.c.sFormMsgId);
			try {
				this.mergeMarc(activTab.marcCloneToSet, newMarc);

				// 25.01.16 on; moznost nastavit hodnotu v 969f
				if (!i3.isEmptyString(epca.Config.User.ShowCopyRecordBtn969f)) {
					if (!newMarc['969']) {
						newMarc['969'] = {};
					}
					sSetValue = epca.Config.User.ShowCopyRecordBtn969f;
					// 09.11.15 on; moznost prepsat vsechny 969f
					if (epca.Config.User.csSet969fOverwriteAll) {
						o = sSetValue;
					} else {
						// 03.12.19 on; prefix subtagu
						prop = epca.form.Helper.c.sSubtagPrefix + 'f';
						o = newMarc['969'][prop];
						if (Ext.isArray(o)) {
							bFound = false;
							for ( i = 0; i < o.length; i += 1) {
								if (o[i] === sSetValue) {
									bFound = true;
									break;
								}
							}
							// pouze pokud tam ta hodnota uz neni
							if (!bFound) {
								o.push(sSetValue);
							}
						} else if (!i3.isEmptyString(o)) {
							// pouze pokud tam ta hodnota uz neni
							if (o !== sSetValue) {
								o = [o, sSetValue];
							}
						} else {
							o = sSetValue;
						}
					}

					// 21.12.20 on; nakonec jinak, neprojde pres jslint
					// 21.12.20 on; pridane [] kolem prop
					// 03.12.19 on; prefix subtagu
					prop = epca.form.Helper.c.sSubtagPrefix + 'f';
					/*Ext.apply(newMarc['969'], {
					 [prop] : o
					 });*/
					newMarc['969'][prop] = o;
				}

				newMarc['001'] = 'new';
				record = epca.convertToMarc(newMarc);
				//  12.08.15  on;  mozna  uprava zaznamu  pred  ulozenim
				if (epca.Config.User && epca.Config.User.csPreSave) {
					epca.Config.User.csPreSave(record, activTab);
				}
				record.t001 = 'new';
				record.classn = activTab.form.targetDb;
				record.data = (record.dataToWsRecord(false)).record;
			} catch(err) {
				// chyba
				i3.msgOff(epca.evidence.c.sFormMsgId);
			}
		}

		// 13.01.21 on; nastavi vlastnika zaznamu - pokud jde o isuser login
		this.csSetRecordOwner999eMarc(record);

		i3.WS.update({
			operation : 'insert',
			// 20.07.23 on; nekontrolovat pri kopirovani zaznamu
			check : '0',
			success : function(oMARC_rec) {
				try {
					// 28.11.17 on; bude se otevirat v nove zalozce
					// 12.11.15 on;
					/*if (epca.Config.User && epca.Config.User.csPreOpen) {
					epca.Config.User.csPreOpen(oMARC_rec);
					}
					// 19.07.12 on; je nutne nacist cely zaznam do formulare po ulozeni
					this.recordId = oMARC_rec.t001;

					// 20.05.16 on; zmena
					//this.marcToSet = epca.convertToObject(oMARC_rec.data, epca.Config.getUnFormat(oMARC_rec.classn));
					this.marcToSet = epca.convertToObject(oMARC_rec.data, epca.Config.getDbFormat(oMARC_rec.classn));

					// 10.12.14 on; zapamatuje si MARC zaznam
					this.csOrigMarcRecord = oMARC_rec;

					this.csLoadRecord(activTab, undefined, true);
					// 17.02.16 on; csLoadRecord rozdeleno na 2 casti
					this.csAddFormWait(this, activTab, undefined, undefined, this.csLoadRecordEnd);*/

					// 23.11.22 on; kopie z URL
					if (pbGetRecFromUrl) {
						this.csLoadMarcRec(oMARC_rec, true, psFormType);
					} else {
						this.csLoadMarcRec(oMARC_rec);
					}
				} catch(err) {
					// chyba
					i3.msgOff(epca.evidence.c.sFormMsgId);
				}
				i3.msgOff(epca.evidence.c.sFormMsgId);
				epca.notify(epca.L10n.evidenceCopyRecordSuccess, epca.L10n.messageOK, "icon-accept");
			},
			failure : function(errorMsg) {
				// chyba
				i3.msgOff(epca.evidence.c.sFormMsgId);

				epca.notify(epca.L10n.evidenceCreateRecordError + errorMsg, epca.L10n.messageError, "icon-error-epca");
			},
			scope : this
		}, record);

	},
	/**
	 * upload souboru do content serveru
	 */
	csUploadContentServer : function() {
		var activTab, sId;

		activTab = this.getTabPanelForms().getActiveTab();

		// neni otevrena zadna zalozka
		if (!activTab) {
			return;
		}

		// id zaznamu
		sId = activTab.recordId;
		// nejrive je nutne zaznam ulozit
		if (this.csIsNewRecord(sId)) {
			// 20.02.25 on; zkusi zaznam ulozit
			//epca.notify(epca.L10n.evidenceFirstSaveCommon, epca.L10n.messageError, 'icon-error');
			this.csUploadContentServer1SaveNewRec(activTab);
			return;
		}
		this.csUploadContentServer0();
	},
	csUploadContentServer0 : function() {
		var activTab, sId, sDb, sIctx, sLanguage, sURL;

		activTab = this.getTabPanelForms().getActiveTab();

		// neni otevrena zadna zalozka
		if (!activTab) {
			return;
		}

		// id zaznamu
		sId = activTab.recordId;

		
		// class
		sDb = i3.className2LName(activTab.form.targetDb);

		// ictx
		sIctx = i3.WS.baseParams.ictx;
		// jazyk
		sLanguage = i3.WS.baseParams.language;

		// 25.02.16 on; moznost zadat komplet URL - doplnim jenom parametry
		if (epca.Config.User.ShowContentServerBtnURL) {
			// parametry jsou ale pevne dane
			sURL = i3.fillInParams(epca.Config.User.ShowContentServerBtnURL, [sIctx, sLanguage, sDb + '*' + sId]);
		} else {
			// vyskladam URL
			if (window.location.href.toLowerCase().indexOf('/i3t/') >= 0) {
				sURL = '/i2t/i2.entry.cls';
			} else {
				sURL = '/i2/i2.entry.cls';
			}
			sURL += '?ictx=' + sIctx + '&language=' + sLanguage + '&op=uploader&idx=' + sDb + '*' + sId;
		}

		// zobrazi v novem okne
		window.open(sURL, '_blank');
	},
	// 20.02.25 on; ulozi zaznam pred prilozenim prilohy
	csUploadContentServer1SaveNewRec : function(activTab) {
		var c;
		
		if (!Ext.isDefined(activTab) || activTab === null) {
			return;
		}

		// tlacitko Ulozit
		c = Ext.getCmp('maintb_save');
		if (c) {
			// 21.01.16 on; potrebuju to co  nejjednoduzsi
			if (!this.csCheckBeforeSave(c, activTab, true)) {
				return;
			}
			// ulozi zaznam
			this.save(undefined, undefined, undefined, undefined, this.csUploadContentServer0);
		}
	},
	/**
	 * vrati true, pokud jde o novy zaznam
	 */
	csIsNewRecord : function(psId) {
		return ((psId === undefined) || (psId === 'new'));
	},
	/**
	 * vyber noveho zaznamu
	 */
	csOnNew : function(psFormType) {

		// 19.10.15 on; kontrola na existenci panelu
		var c = Ext.getCmp('windowFormatFormComboBoxUnFormat');
		if (c) {
			//alert('existuje');
			return;
		}

		// 26.08.15 on; reset zaznamu
		this.recordId = undefined;
		this.marcToSet = undefined;
		this.csOrigMarcRecord = undefined;

		// 24.09.15 on; toto je problem, nejde vybrat jiny formular - zruseno
		// pokud je v url zadany nazev formulare, otevre ho primo
		/*var sFormName = this.csGetFormId();
		 if (sFormName !== '') {
		 // otevre formular
		 var comboDbBox = Ext.ComponentMgr.get('topDbSelect');
		 var dbname = comboDbBox.getValue();
		 // nazev formulare predany jako paty parametr
		 epca.WsForm.getForm(undefined, epca.Config.getUnFormat(dbname), this, this.addForm, sFormName);
		 } else {*/
		var win = new epca.window.FormatForm({
			buttons : [{
				text : epca.L10n.titleOpen,
				listeners : {
					click : function() {
						if (Ext.isEmpty(win.getFormId())) {
							epca.notify(epca.L10n.evidenceFormNotSelected, epca.L10n.messageError, "icon-error-epca");
							return;
						}
						// 28.07.11 on; doplnene predani formatu
						epca.WsForm.getForm(win.getFormId(), win.getUnFormat(), this, this.addForm);
						win.close();
					},
					scope : this
				}
			}, {
				text : epca.L10n.titleClose,
				listeners : {
					click : function() {
						win.close();
					},
					scope : this
				}
			}],
			csEvidencePanel : true,
			csFormType : psFormType
		});
		win.show();
		//}
	},
	/*
	 * zjisteni, zda jde o anonymniho uzivatele pro CAV
	 *
	 */
	csIsAnonymousUser : function() {
		// 19.10.15 on; zmena, bude se urcovat podle login kontextu
		/*if (!psBarcode) {
		return true;
		}

		psBarcode = psBarcode.toLowerCase();
		var sSufix = psBarcode.substring(psBarcode.length - 2, psBarcode.length);

		return sSufix === '-a';*/

		// pokud uzivatel nema logincontext
		if (!i3.Login.ctx.isUserLoginOptions) {
			return true;
		}

		return this.csIsUserOfGroup(epca.evidence.c.sAnonymous);
	},
	/*
	 * zjisteni, zda jde o individualniho uzivatele pro CAV
	 *
	 */
	csIsIndividualUser : function() {
		return this.csIsUserOfGroup(epca.evidence.c.sIndividual);
	},
	/*
	 * zjisteni, zda jde o zpracovatele pro CAV
	 *
	 */
	csIsProcessorUser : function() {
		return this.csIsUserOfGroup(epca.evidence.c.sProcessor);
	},
	/*
	 * zjisteni, zda jde o superuzivatele pro CAV
	 *
	 */
	csIsSuperUser : function() {
		return this.csIsUserOfGroup(epca.evidence.c.sSuper);
	},
	/*
	 * zjisteni, zda jde o anonymniho uzivatele pro CAV - ma na konci 100$b "-a"
	 *
	 */
	csIsUserOfGroup : function(psGroup) {
		// pokud uzivatel nema logincontext
		if (!i3.Login.ctx.isUserLoginOptions) {
			return false;
		}

		if (i3.Login.ctx.isUserLoginOptions.fieldLocate(',', psGroup) > 0) {
			return true;
		}
		return false;
	},
	/*
	 * kontroly pred clear969f
	 */
	csCheckBeforeClear969f : function(cmpBtn, activTab, pbShowMsg, poOutParams) {
		var index, i, s969f, bFound;
		//cmpBtn.setTooltip('');
		
		// 21.01.25 on; zobrazit tlacitko zakazane? 
		poOutParams = poOutParams || {};
		poOutParams.disabled = false;

		if (!Ext.isDefined(activTab) || activTab === null) {
			return false;
		}

		if (this.getForm(activTab).validate() !== true) {
			if (pbShowMsg) {
				epca.notify(epca.L10n.evidenceFormNotValidCommon, epca.L10n.evidenceFormValidation, "icon-error-epca");
			}
			//cmpBtn.setTooltip(epca.L10n.evidenceFormNotValidCommon);
			return false;
		}

		// navic nesmi jit o novy zaznam
		if (this.csIsNewRecord(activTab.recordId)) {
			if (pbShowMsg) {
				epca.notify(epca.L10n.evidenceFirstSave, epca.L10n.messageError, "icon-error-epca");
			}
			//cmpBtn.setTooltip(epca.L10n.evidenceFirstSave);
			return false;
		}

		// odmazavana hodnota 969f musi byt nastavena v konfiguraci - toto by se nemelo zobrazit uzivatelum
		if (i3.isEmptyString(epca.Config.User.csClear969f)) {
			if (pbShowMsg) {
				epca.notify('param FnClear969f in config is empty', epca.L10n.messageError, "icon-error-epca");
			}
			return false;
		}

		// pokud je nastaveno omezeni zobrazeni tlacitka podle typu formulare, zkontroluje to
		if (!i3.isEmptyString(epca.Config.User.csClear969fAllowedFormTypes)) {
			if (epca.Config.User.csClear969fAllowedFormTypes.fieldLocate('#', activTab.form.unFormat) === 0) {
				return false;
			}
		}

		var newMarc = this.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));

		this.mergeMarc(activTab.marcCloneToSet, newMarc);

		//newMarc['001'] = activTab.recordId;
		//  969 neexistuje, chyba
		if (!newMarc['969']) {
			if (pbShowMsg) {
				epca.notify(i3.fillInParams(epca.L10n.evidenceClear969fNotFound, [epca.Config.User.csClear969f]), epca.L10n.messageError, "icon-error-epca");
			}
			return false;
		}

		// 03.12.19 on; prefix subtagu
		// najde 969f se zadanou hodnotou
		if (!newMarc['969'][epca.form.Helper.c.sSubtagPrefix + 'f']) {
			if (pbShowMsg) {
				epca.notify(i3.fillInParams(epca.L10n.evidenceClear969fNotFound, [epca.Config.User.csClear969f]), epca.L10n.messageError, "icon-error-epca");
			}
			return false;
		}

		// 03.12.19 on; prefix subtagu
		var o = newMarc['969'][epca.form.Helper.c.sSubtagPrefix + 'f'];

		bFound = false;
		if (!Ext.isArray(o)) {
			// 07.12.15 on; moznost nastavit vice hodnot
			for ( i = 1; i <= epca.Config.User.csClear969f.fieldcount('#'); i += 1) {
				s969f = epca.Config.User.csClear969f.piece('#', i);
				if (o === s969f) {
					bFound = true;
					break;
				}
			}
		} else {
			// 07.12.15 on; moznost nastavit vice hodnot
			for ( i = 1; i <= epca.Config.User.csClear969f.fieldcount('#'); i += 1) {
				s969f = epca.Config.User.csClear969f.piece('#', i);
				index = o.indexOf(s969f);
				if (index >= 0) {
					bFound = true;
					break;
				}
			}
		}

		if (!bFound) {
			if (pbShowMsg) {
				epca.notify(i3.fillInParams(epca.L10n.evidenceClear969fNotFound, [epca.Config.User.csClear969f]), epca.L10n.messageError, "icon-error-epca");
			}
			return false;
		}

		// 21.01.25 on; pokud dojdu az sem, tak zobrazim tlacitko "Do IPAC", ale nepovolim ho
		// 20.01.25 on; zrusena vyjimka pro CAV
		// 27.06.23 on; pro Datovy zaznam na CAV je nutne pro zobrazeni tlacitko k odeslani do IPAC vyplnene pole U95c=1
		//if ((i3.ictx.toLowerCase() === 'cav') && (activTab.form.unFormat === 'E')) {
		if (activTab.form.unFormat === 'E') {
			// 21.01.25 on; 
			poOutParams.disabled = true;

			if (!newMarc['U95']) {
				return false;
			}
			if (!newMarc['U95'][epca.form.Helper.c.sSubtagPrefix + 'c']) {
				return false;
			}
			if (newMarc['U95'][epca.form.Helper.c.sSubtagPrefix + 'c'] !== '1') {
				return false;
			}
		}

		return true;
	},
	/*
	 * kontroly pred set969f
	 */
	csCheckBeforeSet969f : function(cmpBtn, activTab, pbShowMsg) {
		var index, i, s969f, bFound;
		//cmpBtn.setTooltip('');

		if (!Ext.isDefined(activTab) || activTab === null) {
			return false;
		}

		if (this.getForm(activTab).validate() !== true) {
			if (pbShowMsg) {
				epca.notify(epca.L10n.evidenceFormNotValidCommon, epca.L10n.evidenceFormValidation, "icon-error-epca");
			}
			//cmpBtn.setTooltip(epca.L10n.evidenceFormNotValidCommon);
			return false;
		}

		// navic nesmi jit o novy zaznam
		if (this.csIsNewRecord(activTab.recordId)) {
			if (pbShowMsg) {
				epca.notify(epca.L10n.evidenceFirstSave, epca.L10n.messageError, "icon-error-epca");
			}
			//cmpBtn.setTooltip(epca.L10n.evidenceFirstSave);
			return false;
		}

		// nova hodnota 969f musi by nastavena v konfiguraci - toto by se nemelo zobrazit uzivatelum
		if (i3.isEmptyString(epca.Config.User.csSet969f)) {
			if (pbShowMsg) {
				epca.notify('param FnSet969f in config is empty', epca.L10n.messageError, "icon-error-epca");
			}
			return false;
		}

		// pokud je nastaveno omezeni zobrazeni tlacitka podle typu formulare, zkontroluje to
		if (!i3.isEmptyString(epca.Config.User.csSet969fTitleAllowedFormTypes)) {
			if (epca.Config.User.csSet969fTitleAllowedFormTypes.fieldLocate('#', activTab.form.unFormat) === 0) {
				return false;
			}
		}

		var newMarc = this.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
		this.mergeMarc(activTab.marcCloneToSet, newMarc);

		// pole 969 neexistuje -> ok
		if (!newMarc['969']) {
			return true;
		}

		// 03.12.19 on; prefix subtagu
		// zkusi najit 969f se zadanou hodnotou
		if (!newMarc['969'][epca.form.Helper.c.sSubtagPrefix + 'f']) {
			return true;
		}

		// 03.12.19 on; prefix subtagu
		var o = newMarc['969'][epca.form.Helper.c.sSubtagPrefix + 'f'];
		bFound = false;
		if (!Ext.isArray(o)) {
			// 07.12.15 on; moznost nastavit vice hodnot
			for ( i = 1; i <= epca.Config.User.csSet969f.fieldcount('#'); i += 1) {
				s969f = epca.Config.User.csSet969f.piece('#', i);
				if (o === s969f) {
					bFound = true;
					break;
				}
			}
		} else {
			// 07.12.15 on; moznost nastavit vice hodnot
			for ( i = 1; i <= epca.Config.User.csSet969f.fieldcount('#'); i += 1) {
				s969f = epca.Config.User.csSet969f.piece('#', i);
				index = o.indexOf(s969f);
				if (index >= 0) {
					bFound = true;
					break;
				}
			}
		}
		if (bFound) {
			if (pbShowMsg) {
				epca.notify(i3.fillInParams(epca.L10n.evidenceClear969fNotFound, [epca.Config.User.csSet969f]), epca.L10n.messageError, "icon-error-epca");
			}
			return false;
		}

		return true;
	},
	/**
	 * zobrazeni tlacitka content serveru
	 */
	csCheckContentServerBtnVisibility : function(cmpBtn, activTab) {
		//var index;
		//cmpBtn.setTooltip('');

		if (!Ext.isDefined(activTab) || activTab === null) {
			return false;
		}

		/*if (this.getForm(activTab).validate() !== true) {
		if (pbShowMsg) {
		epca.notify(epca.L10n.evidenceFormNotValidCommon, epca.L10n.evidenceFormValidation, "icon-error-epca");
		}
		//cmpBtn.setTooltip(epca.L10n.evidenceFormNotValidCommon);
		return false;
		}

		// navic nesmi jit o novy zaznam
		if (this.csIsNewRecord(activTab.recordId)) {
		if (pbShowMsg) {
		epca.notify(epca.L10n.evidenceFirstSave, epca.L10n.messageError, "icon-error-epca");
		}
		//cmpBtn.setTooltip(epca.L10n.evidenceFirstSave);
		return false;
		}*/

		// pokud je nastaveni omezeni zobrazeni tlacitko podle typu formulare, zkontroluje to
		if (!i3.isEmptyString(epca.Config.User.ShowContentServerBtnFnParam)) {
			if (epca.Config.User.ShowContentServerBtnFnParam.fieldLocate('#', activTab.form.unFormat) === 0) {
				return false;
			}
		}

		return true;
	},
	/**
	 * zobrazeni tlacitka pro wos/scopus
	 *
	 * 04.05.17 on;
	 */
	csCheckWosScopusBtnVisibility : function(cmpBtn, activTab) {
		if (!Ext.isDefined(activTab) || activTab === null) {
			return false;
		}
		// pokud je nastaveni omezeni zobrazeni tlacitko podle typu formulare, zkontroluje to
		if (!i3.isEmptyString(epca.Config.User.csShowWosScopusBtnFnParam)) {
			if (epca.Config.User.csShowWosScopusBtnFnParam.fieldLocate('#', activTab.form.unFormat) === 0) {
				return false;
			}
		}

		return true;
	},
	/**
	 * zobrazeni tlacitka pro kopii zaznamu
	 *
	 * 18.11.22 on;
	 */
	csCheckCopyRecordVisibility : function(cmpBtn, activTab) {
		if (!Ext.isDefined(activTab) || activTab === null) {
			return false;
		}
		// pokud je nastaveni omezeni zobrazeni tlacitko podle typu formulare, zkontroluje to
		if (!i3.isEmptyString(epca.Config.User.csShowCopyRecordBtnParam)) {
			if (epca.Config.User.csShowCopyRecordBtnParam.fieldLocate('#', activTab.form.unFormat) === 0) {
				return false;
			}
		}

		return true;
	},
	/*
	 * kontroly pred Save
	 */
	csCheckBeforeSave : function(cmpBtn, activTab, pbShowMsg) {
		var c;
		//cmpBtn.setTooltip('');

		if (!Ext.isDefined(activTab) || activTab === null) {
			return false;
		}

		if (this.getForm(activTab).validate() !== true) {
			if (pbShowMsg) {
				epca.notify(epca.L10n.evidenceFormNotValid, epca.L10n.evidenceFormValidation, "icon-error-epca");
			}
			return false;
		}

		// pokud je zalozka nebo ZF nebo form zakazany, nedovoli ulozit
		if (activTab.disabled || activTab.items.items[0].disabled || activTab.items.items[1].disabled) {
			return false;
		}

		// 11.04.17 on; pokud je hlavni fieldset zakazany, nedovoli ulozit
		c = activTab.getFormMainFieldset();
		if (c.disabled) {
			return false;
		}

		return true;
	},

	/**
	 * Podle stavu  aktivniho formulare  aktualizuje tlacitka.
	 *
	 * @param {Object} form
	 */
	csUpdateInterface : function(form) {
		var c, bVisible, oDisabled = {};

		var activTab = this.getTabPanelForms().getActiveTab();

		if (!Ext.isDefined(activTab) || activTab === null) {
			return;
		}

		// pouze pro aktivni zalozku
		if (activTab.idpref !== form.idpref) {
			//alert('a');
			return;
		}

		/*if (bSkip) {
		if (this.csCounter < 15) {
		this.csCounter++;
		return;
		} else {
		this.csCounter = 0;
		}
		}*/

		// presunuto do clientvalidation
		// tlacitko Ulozit
		/*c = Ext.getCmp('maintb_save');
		if (c) {
		bVisible = this.csCheckBeforeSave(c, activTab, false);
		c.setDisabled(!bVisible);
		// pouze zneplatnim
		//c = Ext.getCmp('maintb_save_separator');
		// if (c) {
		// c.setVisible(bVisible);
		//}
		}*/

		// clear969f
		c = Ext.getCmp('maintb_clear969f');
		if (c) {
			// 21.01.25 on; pridan parametr, zda nezakazat tlacitko Do IPAC
			bVisible = this.csCheckBeforeClear969f(c, activTab, false, oDisabled);
			c.setVisible(bVisible);
			// 21.01.25 on; pokud se ma tlacitko zakazat, zobrazi ho
			if (!bVisible && oDisabled.disabled) {
			 	bVisible = true;	
				c.setVisible(true);
				c.setDisabled(true);
			} else {
				c.setDisabled(false);
			}

			c = Ext.getCmp('maintb_clear969f_separator');
			if (c) {
				c.setVisible(bVisible);
			}
		}

		// set969f
		c = Ext.getCmp('maintb_set969f');
		if (c) {
			bVisible = this.csCheckBeforeSet969f(c, activTab, false);
			c.setVisible(bVisible);
			c = Ext.getCmp('maintb_set969f_separator');
			if (c) {
				c.setVisible(bVisible);
			}
		}
		// tlacitko content serveru
		c = Ext.getCmp('maintb_contentserverbtn');
		if (c) {
			bVisible = this.csCheckContentServerBtnVisibility(c, activTab);
			c.setVisible(bVisible);
			c = Ext.getCmp('maintb_contentserverbtn_separator');
			if (c) {
				c.setVisible(bVisible);
			}
		}

		// 04.05.17 on; tlacitko WOS/SCOPUS
		c = Ext.getCmp('maintb_wosscopusbtn');
		if (c) {
			bVisible = this.csCheckWosScopusBtnVisibility(c, activTab);
			c.setVisible(bVisible);
			c = Ext.getCmp('maintb_wosscopusbtn_separator');
			if (c) {
				c.setVisible(bVisible);
			}
		}

		// 18.11.22 on; tlacitko pro kopii zaznamu
		c = Ext.getCmp('maintb_copyrecordbtn');
		if (c) {
			bVisible = this.csCheckCopyRecordVisibility(c, activTab);
			c.setVisible(bVisible);
			c = Ext.getCmp('maintb_copyrecordbtn_separator');
			if (c) {
				c.setVisible(bVisible);
			}
		}

		// 29.03.17 on; uzivatelske nastaveni
		if (epca.Config.User.csUpdateInterfaceUser) {
			epca.Config.User.csUpdateInterfaceUser.call(this, activTab);
		}
	},
	/**
	 * Podle stavu  aktivniho formulare  aktualizuje tlacitko Ulozit.
	 *
	 * @param {Object} form
	 */
	csUpdateInterfaceSave : function(form) {
		var c, bVisible;

		var activTab = this.getTabPanelForms().getActiveTab();

		if (!Ext.isDefined(activTab) || activTab === null) {
			return;
		}

		// pouze pro aktivni zalozku
		if (activTab.idpref !== form.idpref) {
			//alert('a');
			return;
		}

		// pouze pro aktivni zalozku
		//if (form.ownerCt.ownerCt.activeTab && (form.ownerCt.idpref === form.ownerCt.ownerCt.activeTab.idpref)) {
		// tlacitko Ulozit
		c = Ext.getCmp('maintb_save');
		if (c) {
			// 21.01.16 on; potrebuju to co  nejjednoduzsi
			bVisible = this.csCheckBeforeSave(c, activTab, false);
			c.setDisabled(!bVisible);
		}
		//}
	},
	/**
	 * otevre odkaz
	 */
	csURLBtn : function() {
		// 22.04.16 on; moznost zadat parametry, zatim jenom idx (kod zaznamu)
		var activTab = this.getTabPanelForms().getActiveTab();
		var s = epca.Config.User.ShowURLBtnFn;
		if (activTab) {
			s = s.strswap('%IDX%', i3.className2LName(activTab.form.targetDb) + '*' + activTab.recordId);
		}
		// zobrazi v novem okne
		window.open(s, '_blank');
	},
	/**
	 * Update nazvov tagov a podpoli, podla hodnot v DB
	 */
	csUpdateFieldNames : function(form, item) {
		i3.WS.command({
			db : epca.Config.User.dbTab,
			command : 'getFieldsNames',
			params : Ext.util.JSON.encode({
				'lang' : i3.language,
				'format' : epca.UnFormat.getValue(form.unFormat).replace('_', ''),
				'tags' : form.getContentTags()
			}).replace(/\"/g, "'"),
			success : function(pJSON) {
				this.setTagMapValue(pJSON.data[0].tags);
			},
			scope : item
		});
	},
	csGetBtnText : function(sUser, sDefault) {
		if (!i3.isEmptyString(sUser)) {
			if (sUser === '.') {
				sUser = '';
			}
			return sUser;
		}
		return sDefault;
	},
	csGetRecSearch : function(cmp) {
		var comboDbBox = Ext.getCmp('topDbSelect');
		var dbname = comboDbBox.getValue();
		if (!cmp) {
			cmp = Ext.getCmp('mainsearch_term');
		}
		var sValue = cmp.getValue();
		if (sValue === '') {
			return;
		}

		i3.WS.getRecord({
			classn : dbname,
			fmt : 'LINEMARC',
			t001 : sValue,
			success : function(selectedRecord) {
				// 05.11.15 on; doplneno nacteni formatu z comboboxu
				var record, sFormType = '', n = comboDbBox.store.findExact('id', comboDbBox.getValue());
				if (n >= 0) {
					record = comboDbBox.store.getAt(n);
				}
				if (record) {
					// 05.11.15 on; moznost nastavit v UnDatabases_ictx.json formtype
					sFormType = record.data['formtype'];
				}

				// 09.12.14 on; vlozeno do funkce
				this.csLoadMarcRec(selectedRecord, false, sFormType);
			},
			failure : function() {
				//epca.notify("Záznam se sysno="+sValue+" nenalezen!", "Chyba", "icon-error-epca");
				i3.displayError("Záznam se sysno \"" + sValue + "\" nenalezen!");
			},
			scope : this
		});
	},
	/*
	 * Vrati hodnotu predaneho parametru v href.
	 *
	 */
	getHREFParam : function(psHref, param) {
		var urlParams = {};
		urlParams = Ext.urlDecode(psHref);
		return urlParams[param];
	},
	/**
	 * otevre HREF v nove zalozce aplikace
	 * @param {Object} psHref
	 */
	csOpenHrefInTab : function(psHref) {
		var recordDb, sRecordId, sFormType, sFormId;

		// zatim ocekavam jenom OPEN
		psHref = psHref.piece('?', 2);

		// kod zaznamu
		sRecordId = this.getHREFParam(psHref, 'recid');
		if (!sRecordId) {
			sRecordId = '';
		}
		sRecordId = this.csFixDbName(sRecordId);

		// vrati typ formulare (typicky "b" nebo "a")
		sFormType = this.getHREFParam(psHref, 'formtype');
		if (!sFormType) {
			sFormType = '';
		}
		if (sFormType === '') {
			sFormType = 'b';
		}

		if (sRecordId !== '') {
			// zkusi otevrit zaznam
			if (sRecordId.indexOf('*') > 0) {
				recordDb = i3.lName2className(sRecordId.piece('*', 1));
				sRecordId = sRecordId.piece('*', 2);
			} else {
				i3.alert('wrong idx - ' + sRecordId);
				return;
			}

			// pokud je zadano "new" tak zobrazi dialog pro vyber noveho zaznamu
			if (sRecordId === 'new') {
				// 24.09.15 on; nabidne dialog pro novy zaznam
				this.csOnNew(sFormType);
			} else if (sRecordId !== '') {
				i3.WS.getRecord({
					classn : recordDb,
					fmt : 'LINEMARC',
					t001 : sRecordId,
					success : function(selectedRecord) {
						// 24.09.15 on; pridan parametr, abych vedel, ze se otvira zaznam z URL a muze mit predany i formular
						this.csLoadMarcRec(selectedRecord, false, sFormType);
					},
					failure : function(errmsg) {
						epca.notify(errmsg, epca.L10n.messageError, "icon-error-epca");
					},
					scope : this
				});
			}
			return;
		}

		sFormId = this.getHREFParam(psHref, 'formid');
		if (!sFormId) {
			sFormId = '';
		}
		if (sFormId !== '') {
			// otevre prazdny formular
			epca.WsForm.getForm(sFormId, sFormType, this, this.addForm);
		}
	},
	/**
	 * 15.01.16 on; prepne styl
	 */
	csSwitchCSS : function(cmp, a, b, psSkin) {
		/*function createjscssfile(filename) {
		 var fileref = document.createElement("link");
		 fileref.setAttribute("rel", "stylesheet");
		 fileref.setAttribute("type", "text/css");
		 fileref.setAttribute("href", filename);
		 return fileref;
		 }

		 function replacejscssfile(oldfilename, newfilename) {
		 var i, newelement;
		 var targetelement = "link";
		 var targetattr = "href";
		 var allsuspects = document.getElementsByTagName(targetelement);
		 for ( i = allsuspects.length; i >= 0; i--) {//search backwards within nodelist for matching elements to remove
		 if ((allsuspects[i] && allsuspects[i].getAttribute(targetattr) !== null) && (allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) !== -1)) {
		 newelement = createjscssfile(newfilename);
		 allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
		 }
		 }
		 }*/

		var sValue, oParams = {}, sActCss;
		// novy styl
		if (!i3.isEmptyString(psSkin)) {
			sValue = psSkin;
		} else {
			sValue = cmp.getValue();
		}

		// 29.04.24 on; upraveno
		// pouze pokud se lisi od aktualniho
		//if (epca.evidence.c.sActualCssStyle !== sValue) {
         sActCss = getActCss(oParams);
		if (sActCss  !== sValue) {
			// 18.02.25 on; booster
			// 29.04.24 on; upraveno
			//Replace all occurences "oldstyle.css" with "newstyle.css"
			//replacejscssfile(epca.evidence.c.sActualCssStyle, sValue);
			//epca.evidence.c.sActualCssStyle = sValue;
			replacejscssfile(sActCss, sValue, oParams.sBooster);

			var d = new Date();
			d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
			// platnost rok
			Ext.util.Cookies.set('i3style', sValue, d);
		}
	},
	/**
	 * vrati sirku panelu se ZF
	 *
	 * 10.02.16 on;
	 */
	csGetZfWidth : function() {
		var nWidth, s = Ext.util.Cookies.get('i3epcazfwidth');
		nWidth = parseInt(s, 10);

		if (nWidth) {
			return nWidth;
		}

		return 310;
	},
	/**
	 * Funkce pro import zaznamu z WOS/SCOPUS
	 */
	csImportWosScopus : function(psParams) {
		var sDbList, aDbList, flds, fld, i, aFldList, sFldList, aDFList, sDFList, aSDFList, sSDFList, sFormId, aDBOptions, sDBOptions;

		var fpwin = i3.ui.FlexPop.getWin();
		var fppar = {};

		// seznam db
		aDbList = [];
		sDbList = psParams.piece(',', 1);
		flds = sDbList.split('|');
		for ( i = 0; i < flds.length; i++) {
			fld = flds[i];
			if (fld.piece('#', 2) !== '') {
				aDbList.push([fld.piece('#', 1), fld.piece('#', 2)]);
			} else {
				aDbList.push(fld);
			}
		}

		// seznam indexu
		aFldList = [];
		sFldList = psParams.piece(',', 2);
		flds = sFldList.split('|');
		for ( i = 0; i < flds.length; i++) {
			fld = flds[i];
			aFldList.push(fld);
		}

		// seznam ZF
		aDFList = [];
		sDFList = psParams.piece(',', 3);
		flds = sDFList.split('|');
		for ( i = 0; i < flds.length; i++) {
			fld = flds[i];
			aDFList.push(fld);
		}

		// seznam zkracenych ZF
		aSDFList = [];
		sSDFList = psParams.piece(',', 4);
		flds = sSDFList.split('|');
		for ( i = 0; i < flds.length; i++) {
			fld = flds[i];
			aSDFList.push(fld);
		}

		// 18.11.16 on; dboptions pro jednotlive db
		aDBOptions = [];
		sDBOptions = psParams.piece(',', 5);
		flds = sDBOptions.split('|');
		for ( i = 0; i < flds.length; i++) {
			fld = flds[i];
			fld = fld.strswap('#', ',');
			aDBOptions.push(fld);
		}

		// ID prebiraciho formulare
		sFormId = psParams.piece(',', 6);

		Ext.applyIf(fppar, {
			// trieda na ktorej spustit search
			// je ale len default, mozem byt zadana explicitne (napr. moze byt zadany iny default pre novy zaznam
			// a iny (napr. zoznam) pre search
			classn : aDbList,
			//initUseAttr : '', //                        init atributy (nepovinne)
			//initTerm : '',
			searchMode : '1', //                   search mode 0: scan,1: search, 2: browse,3: ascii
			wannaMarcRes : true, //                     request result in MARC
			callback : this.csShowWosScopusRec.createDelegate(this, [sFormId], true), // pridam nazev prebiraciho formulare
			idxlistStoreId : aFldList, // indexy
			displayFmtPnl : aDFList, // zobrazovaky
			displayFmt : aSDFList, // zkraceny ZF
			scope : this,
			dbOptions : aDBOptions,
			// 13.06.24 on; moznost nastavit popisek zobrazovaciho formatu
            csDisplayFormatText : epca.Config.User.DisplayFormatText
		});

		// Otvorit flexpop so search/browse
		fpwin.usrDoSearch(fppar);
	},
	/**
	 * Nacitanie zaznamu z WOS/SCOPUS do popup formulara.
	 *
	 * @param {Object} oRec
	 *
	 */
	csShowWosScopusRec : function(poRec, psFormID) {
		if (i3.isEmptyString(psFormID)) {
			i3.alert('Form ID is empty in configuration (parameter ShowWosScopusBtn)!');
			return;
		}

		// 01.11.16 on; nakonec neni zapojeno otevreni prebiraciho formulare jako popup okno,
		//              ale formular se otevre jako klasicky, puvodni kod tu necham, kdyby to nekdo chtel zapojit jako popup
		//epca.WsForm.getForm(psFormID, 'B', this, this.csShowWosScopusRec2.createDelegate(this, [poRec], true));

		// zapise prebiraci defaultni formular do C99d
		var tC99 = poRec.getTag('C99');
		if (tC99 === '') {
			tC99 = 'C99    ';
		}
		tC99 = poRec.setSubTagStr(tC99, 'd', psFormID);
		poRec.setTag(tC99);
		// pole 001
		poRec.t001 = 'new';
		poRec.setTag('001    new');
		// nastavim, ze krome defaultnich hodnot chcu nacist i cely zaznam
		this.csForceLoadRecord = true;
		this.csLoadMarcRec(poRec, false, 'B');
	},
	// 01.11.16 on; N E M A Z A T !!!!!
	//              zakomentovano, potoze popup formular CAVka nechce, ale muze se hodit jinde, tak at to nemusim znovu vymyslet
	/*csShowWosScopusRec2: function(poForm, poRec) {
	var oErr = {};
	var oForm = poForm.generate(true);
	// 08.08.16 on; doplneno true

	var pnl = Ext.extend(i3.ui.ColPanel, {
	constructor: function(config) {
	config = config || {};

	Ext.apply(config, {
	items: [{
	xtype: 'panel',
	width: '100%',
	layout: 'form',
	labelAlign: 'left',
	//items: oForm.items
	items: oForm
	}],
	csFormDefinition: poForm
	});
	pnl.superclass.constructor.call(this, config);
	},
	csRecord2Form: function() {
	this.csLoadRecordPopup(poRec, epca.cloneObject(poForm.defaultValues));
	this.csOnAfterOKScope.csAddFormWait(this.csOnAfterOKScope, poRec, undefined, undefined, this.csLoadRecordEndPopup, this);
	},
	csForm2Record: function() {
	var activTab = this.items.items[0].items.items[0], record;

	//i3.msgOn(epca.L10n.txSavingRecord, undefined, undefined, epca.evidence.c.sFormMsgId);
	try {
	// zatim bez pouziti marcToSet
	//var newMarc = activTab.getMarc();
	var newMarc = activTab.getMarc(epca.cloneObject(this.marcToSet));
	this.csOnAfterOKScope.mergeMarc(this.marcCloneToSet, newMarc);

	//newMarc['001'] = this.csLinRecord.t001;
	newMarc['001'] = 'new';
	record = epca.convertToMarc(newMarc);
	//record.t001 = this.csLinRecord.t001;
	record.t001 = 'new';
	// databaze z prebiraciho formulare, pozdej se zmeni na DB z ciloveho formulare
	record.classn = this.form.csFormDefinition.targetDb;
	//record.data = (record.dataToWsRecord(true)).record;
	} catch(err) {
	// chyba
	//i3.msgOff(epca.evidence.c.sFormMsgId);
	alert(err);
	}

	this.csLinRecord = record;
	// vysledny zaznam
	},
	// Nacte zaznam do formulare.
	// @param {Object} actTab - aktivniu zalozka
	// @param {Object} defaultValues - defaultni hodnoty pro novy zaznam
	// @param {Object} clearForm - smazat formular pred nacteni zaznamu?
	//
	csLoadRecordPopup: function(poRec, defaultValues) {
	// 27.09.16 on; kopie i3.isEmptyTagSet, ale navic povazuje za prazdne pole pole s indikatorem
	function isEmptyTag(o) {
	if ((o === undefined) || (o === null)) {// null a undefined berieme ako prazdne (nemalo by nastat)
	return true;
	}
	if ( typeof o !== 'object') {// ak to neni objekt, vratime false (neprazdne; nemalo by nastat)
	return false;
	}
	var i, v;
	for (i in o) {
	if (o.hasOwnProperty(i)) {
	v = o[i];
	// prazdne stringy ignorujeme
	if ((v === '') || (i === 'i1') || (i === 'i2')) {
	continue;
	} else
	// 05.11.12 on; kontrola vnorenych objektu
	if ( typeof v === 'object') {
	if (isEmptyTag(v)) {
	continue;
	}
	}

	// nasli sme nejaku property - sme neprazdny
	return false;
	}
	}
	return true;
	// prazdny
	}

	var marcCloneToSet, i, form, o, prop;

	if (epca.Config.User && epca.Config.User.csPreOpen) {
	epca.Config.User.csPreOpen(poRec);
	}

	this.marcToSet = epca.convertToObject(poRec.data, epca.Config.getDbFormat(poRec.classn));

	// 26.09.16 on; moznost zadat defaultni hodnoty, ktere se pridaji k zaznamu
	if (defaultValues) {
	epca.WsForm.csSwapDefaultValues(defaultValues);
	for (prop in defaultValues) {
	if (defaultValues.hasOwnProperty(prop)) {
	o = defaultValues[prop];
	// 27.09.16 on; tag s pouze s indikatorem povazuju za prazdny
	//if (!i3.isEmptyTagSet(o)) {
	if (!isEmptyTag(o)) {
	this.marcToSet[prop] = o;
	}
	}
	}
	}

	marcCloneToSet = epca.cloneObject(this.marcToSet);
	this.marcCloneToSet = marcCloneToSet;

	// Ako prechadza marc stromom, odmazavaju sa z neho nacitane hodnoty
	epca.semafor = {};
	form = this.get(0);
	for ( i = 0; i < form.items.length; i++) {
	if ((form.get(i)).setMarc) {
	(form.get(i)).setMarc(marcCloneToSet);
	}
	}
	},
	//
	// dokonceni nacteni zaznamu
	//
	csLoadRecordEndPopup: function() {
	try {
	// Odmazenie prazdnych hodnot, aby sme zistili ci sa zaznam nacital cely do formulara
	Ext.iterate(this.marcCloneToSet, this.csOnAfterOKScope.deleteEmptyItems, this.csOnAfterOKScope);

	// Update nazvov tagov a podpoli, podla hodnot v DB
	this.csOnAfterOKScope.csUpdateFieldNames(this.csFormDefinition, this);

	this.validate();

	// 19.07.16 on; nebudu nic kontrolovat - zatim - standardni metoda nejde pouzit
	// 04.09.15 on; kontrola, jestli nedoslo, ke ztrate nejakeho pole
	//this.csOnAfterOKScope.csIsRecordChangedAndShowInfo();
	} catch(err) {
	// chyba
	//i3.msgOff(epca.evidence.c.sFormMsgId);
	alert(err);
	}
	//i3.msgOff(epca.evidence.c.sFormMsgId);
	},
	setTagMapValue: function(titles) {
	var i, item;
	item = this.items.items[0].items.items[0];
	for ( i = 0; i < item.items.length; i++) {
	(item.get(i)).setPropertyTitle(titles);
	}
	},
	validate: function() {
	var i, item;
	item = this.items.items[0];
	for ( i = 0; i < item.items.length; i++) {
	(item.get(i)).validate();
	}
	}
	});

	// volat popup okienko pre vstup zaznamu
	i3.ui.csOpenColWin({
	title: this.csGetBtnText(epca.Config.User.csShowWosScopusBtnText, epca.L10n.titleWosScopusImport),
	//CsPanel : epca.Config.User.pnlWosScopus,
	CsPanel: pnl,
	width: 800,
	y: 10,
	csHideHelp: true
	}, {// panel config
	// csMarcConvDefUN pripadne zapojit v epca.Config.User.js
	csLinRecord: i3.DataFmt.fromMarc(epca.Config.User.csMarcConvDefUN, poRec, oErr, true),
	csOnAfterOK: this.csShowWosScopusRecEnd,
	csOnAfterOKScope: this
	});
	},
	csShowWosScopusRecEnd: function(poLinRecord) {
	// teraz by sme mali mat aktualizovany zaznam v poLinRecord

	// zjistim nazev formulare a typ, pokud je zadany typ, musim upravit obsah C99d
	var tC99d, tC99, sFormType = '';
	tC99 = poLinRecord.getTag('C99');
	tC99d = i3.Marc.getSubTagStr(tC99, 'd');
	sFormType = tC99d.piece('#', 2);
	if (!i3.isEmptyString(sFormType)) {
	tC99d = tC99d.piece('#', 1);
	tC99 = i3.Marc.setSubTagStr(tC99, 'd', tC99d);
	poLinRecord.setTag(tC99);
	}

	// 19.09.16 on; moznost odmazat vsechna opakovani 610 - pokud je U98a === 0 (vyuzito na CAV)
	if (poLinRecord.getTag('U98a') === '0') {
	poLinRecord.delTag('610');
	// smaze i pomocne pole U98
	poLinRecord.delTag('U98');
	}

	this.recordId = poLinRecord.t001;
	this.marcToSet = epca.convertToObject(poLinRecord.data, epca.Config.getDbFormat(poLinRecord.classn));
	this.csOrigMarcRecord = poLinRecord;
	// poznacim si, ze i kdyz jde o novy zaznam, jde o import existujiciho zaznamu
	this.csLoadDefaultValues = true;

	// 20.01.12 on; zaznam otevre ve formulari, ktery je vyplneny v C99d, pokud tam neni nic, pouzije default
	var form_id = '';
	if (tC99d !== '') {
	form_id = tC99d;
	} else {
	// jinak vezne default z konfigurace
	form_id = (poLinRecord.classn === epca.Config.User.dbCat ? epca.Config.User.defaultCatForm : epca.Config.User.defaultAuthForm);
	}

	if (i3.isEmptyString(sFormType)) {
	sFormType = epca.Config.getUnFormat(poLinRecord.classn);
	}

	epca.WsForm.getForm(form_id, sFormType, this, this.addForm, '');
	},*/
	/**
	 * Combobox se nabidkou stylu zobrazi, jenom pokud obsahuje vice polozek
	 * @param {Object} a
	 * @param {Object} pStore
	 * @param {Object} pCombo
	 */
	csOnCssListLoad : function(a, pStore, pCombo) {
		if (pStore && pStore.data) {
			pCombo.setVisible(pStore.data.length > 1);
		}
	},
	/**
	 * Seradi zaznam podle seznamu
	 * @param {Object} tagList
	 * @param {Object} record
	 *
	 * 24.01.20 on;
	 */
	csRecordSort : function(tagList, record) {
		function pad(num, size) {
			var s = num + "";
			while (s.length < size) {
				s = " " + s;
			}
			return s;
		}

		var i, nResult, sLine, aPomRecord = [], nPos, sShift, sn, sTag;

		if (!tagList) {
			// ok
			return 0;
		}
		if (!record) {
			// chyba
			return -999;
		}

		for ( i = 0; i < record.data.length; i++) {
			nResult = -(i + 1);
			sLine = record.data[i];

			if (i3.isEmptyString(sLine)) {
				continue;
			}

			if (sLine.length < 7) {
				return nResult;
				// exit & lineerr setup
			}

			sTag = sLine.substring(0, 3);
			if (sLine[3] !== ' ') {
				return nResult;
				// exit & lineerr setup
			}

			nPos = tagList.indexOf(sTag);
			if (nPos === -1) {
				nPos = 999;
			}
			sShift = pad(nPos, 3);
			sn = pad(i, 4);

			// to ensure proper seq.ordering of tags
			aPomRecord.push(sShift + sLine.substring(0, 3) + sn + sLine.substring(3));
		}

		// seradi pole
		aPomRecord.sort();

		record.data = [];

		for ( i = 0; i < aPomRecord.length; i++) {
			sLine = aPomRecord[i];
			record.data.push(sLine.substring(3, 6) + sLine.substring(10));
		}
		// ok
		return 0;

	},
	/**
	 * Ruzne funkce, ktere se volani po dotazeni zaznamu (typicky autority) do editovaneho zaznamu.
	 *
	 * @param {Object} cmp
	 * @param {Object} poRecord
	 *
	 * 14.02.20 on;
	 */
	csDoFnAfterLinkToRecord : function(cmp, poRecord) {
		var tab;
		tab = epca.WsForm.csGetActiveTab();
		if (!tab) {
			return;
		}

		if (cmp.tag === '928') {
			this.csDoFn928(tab, poRecord);
		}
	},
	/**
	 * Dotazeni vydavatele do 210.
	 *
	 * @param {Object} poRecord
	 *
	 * 14.02.20 on;
	 */
	csDoFn928 : function(actTab, poRecord) {
		var aTag, sA, sB, sLine, w, aList, sVydTag;
		if (!poRecord) {
			return;
		}

		aList = [];

		if (epca.csIsM21(poRecord.classn)) {
			sVydTag = '110';
		} else {
			sVydTag = '210';
		}

		// tag 110/210
		aTag = poRecord.getTag(sVydTag, -1);
		// sekvencny search po riadkoch
		Ext.each(aTag, function(li) {
			sA = i3.Marc.getSubTagStr(li, 'a');
			if (sA !== '') {
				sLine = sA;
			}
			sB = i3.Marc.getSubTagStr(li, 'b');
			if (sB !== '') {
				sLine += ' - ' + sB;
			}
			aList.push([sLine, sA]);
		});
		// tag 410
		aTag = poRecord.getTag('410', -1);
		// sekvencny search po riadkoch
		Ext.each(aTag, function(li) {
			sA = i3.Marc.getSubTagStr(li, 'a');
			if (sA !== '') {
				sLine = sA;
			}
			sB = i3.Marc.getSubTagStr(li, 'b');
			if (sB !== '') {
				sLine += ' - ' + sB;
			}
			aList.push([sLine, sA]);
		});
		// tag 510
		aTag = poRecord.getTag('510', -1);
		// sekvencny search po riadkoch
		Ext.each(aTag, function(li) {
			sA = i3.Marc.getSubTagStr(li, 'a');
			if (sA !== '') {
				sLine = sA;
			}
			sB = i3.Marc.getSubTagStr(li, 'b');
			if (sB !== '') {
				sLine += ' - ' + sB;
			}
			aList.push([sLine, sA]);
		});

		// pokud nemam zadny nazev, skonci (nemelo by nastat nikdy)
		if (aList.length === 0) {
			return;
		}

		w = epca.window.Fn928.getWin({
			callback : this.csDoFn9281.createDelegate(this, [actTab, poRecord], true), // pridam nazev prebiraciho formulare
			callbackScope : this
		});
		// open window
		w.csOpen({
			items : aList
		});
	},
	/**
	 * * Dotazeni vydavatele do 210. pokracovani
	 *
	 */
	csDoFn9281 : function(paList, actTab, poRecord) {
		var sTargetTag, sCity, sVariantName, mainFs, i, j, oFs, oItem, bFound, sTargetSubtag, prop;

		// mesto
		sCity = poRecord.getTag('980b');
		// zvoleny variantni nazev
		sVariantName = paList[0].data.value;

		if (epca.csIsM21(poRecord.classn)) {
			sTargetTag = '264';
			sTargetSubtag = 'b';
		} else {
			sTargetTag = '210';
			sTargetSubtag = 'c';
		}

		// zkusi pole najit na formulari
		// hlavni fieldset
		bFound = false;
		mainFs = actTab.getFormMainFieldset();
		for ( i = 0; i < mainFs.items.items.length; i++) {
			oFs = mainFs.items.items[i];
			if (oFs.xtype === 'epca.repeatable_encapsulation') {
				oFs = oFs.items.items[0];
			}

			if (oFs.csContainer || (oFs.tag === sTargetTag)) {
				for ( j = 0; j < oFs.items.items.length; j++) {
					oItem = oFs.items.items[j];
					if (oItem.xtype === 'epca.repeatable_encapsulation') {
						oItem = oItem.items.items[0];
					}

					// kontrola tagu je tu kvuli kontejneru
					if ((oItem.tag === sTargetTag) && (oItem.field === (epca.form.Helper.c.sSubtagPrefix + 'a'))) {
						oItem.setValue(sCity);
					}
					if ((oItem.tag === sTargetTag) && (oItem.field === (epca.form.Helper.c.sSubtagPrefix + sTargetSubtag))) {
						oItem.setValue(sVariantName);
						// staci najit podpole pro variantni nazev
						bFound = true;
					}
				}
			}
		}

		if (!bFound) {
			if (!actTab.marcCloneToSet[sTargetTag]) {
				actTab.marcCloneToSet[sTargetTag] = {};
			}
			prop = epca.form.Helper.c.sSubtagPrefix + 'a';
			actTab.marcCloneToSet[sTargetTag][prop] = sCity;
			prop = epca.form.Helper.c.sSubtagPrefix + sTargetSubtag;
			actTab.marcCloneToSet[sTargetTag][prop] = sVariantName;
		}

		actTab.fireEvent('form_changed', this, actTab);
	},
	// 26.03.20 on; odfiltruje vsechny $T subtagy, protoze jsou na formulari (napr. EU) uprostred pole a vsechna pole za nim se ztraci
	csDeleteTSubtags : function(poMarc) {
		var i, oTag, oTag1, prop, prop2;

		for (prop in poMarc) {
			if (poMarc.hasOwnProperty(prop)) {
				if (!prop) {
					continue;
				}
				oTag = poMarc[prop];
				// opakovatelny tag?
				if (Ext.isArray(oTag)) {
					for ( i = 0; i < oTag.length; i++) {
						oTag1 = oTag[i];
						for (prop2 in oTag1) {
							if (oTag1.hasOwnProperty(prop2)) {
								// subtag T smazu
								if (prop2 === epca.form.Helper.c.sSubtagPrefix + 'T') {
									delete oTag1[prop2];
								}
							}
						}
					}
				} else {
					for (prop2 in oTag) {
						if (oTag.hasOwnProperty(prop2)) {
							// subtag T smazu
							if (prop2 === epca.form.Helper.c.sSubtagPrefix + 'T') {
								delete oTag[prop2];
							}
						}
					}
				}
			}
		}
	},
	/**
	 * Funkce pro vymaz zaznamu
	 *
	 * 07.01.21 on;
	 */
	csDeleteRecord : function() {
		var activTab = this.getTabPanelForms().getActiveTab(), record;

		// neexistuje zadny formular
		if (!activTab) {
			return;
		}

		// novy zaznam nemazat
		if ((activTab.recordId === undefined) || (activTab.recordId === 'new')) {
			epca.notify(epca.L10n.evidenceDeleteNewRecordError, epca.L10n.messageError, "icon-error-epca");
			return;
		}

		i3.msgOn(epca.L10n.txDeletingRecord, undefined, undefined, epca.evidence.c.sFormMsgId2);
		try {

			var newMarc = this.getForm(activTab).getMarc(epca.cloneObject(activTab.marcToSet));
			this.mergeMarc(activTab.marcCloneToSet, newMarc);

			// odfiltruje vsechny $T subtagy, protoze jsou na formulari (napr. EU) uprostred pole a vsechna pole za nim se ztraci
			this.csDeleteTSubtags(newMarc);

			newMarc['001'] = activTab.recordId;
			record = epca.convertToMarc(newMarc);
			//  12.08.15  on;  mozna  uprava zaznamu  pred  ulozenim
			if (epca.Config.User && epca.Config.User.csPreSave) {
				epca.Config.User.csPreSave(record, activTab);
			}
			record.t001 = activTab.recordId;
			record.classn = activTab.form.targetDb;
			record.data = (record.dataToWsRecord(true)).record;

		} catch(err) {
			// chyba
			i3.msgOff(epca.evidence.c.sFormMsgId2);
		}

		// zapamatuje si pozici scrollbaru
		/*c = activTab.getFormMainFieldset();
		 if (c && c.ownerCt) {
		 nScrollTop = activTab.getFormMainFieldset().ownerCt.body.dom.scrollTop;
		 } else {
		 nScrollTop = 0;
		 }*/

		i3.WS.update({
			operation : 'delete',
			// 20.07.23 on; nekontrolovat pri vymazu
			check : '0',
			success : function(oMARC_rec, poResult) {
				try {
					// pokud vymazu, zavre zalozku
					this.getTabPanelForms().remove(activTab);
				} catch(err) {
					// chyba
					i3.msgOff(epca.evidence.c.sFormMsgId2);
				}
				i3.msgOff(epca.evidence.c.sFormMsgId2);

				epca.notify(epca.L10n.evidencedeleteRecordSuccess, epca.L10n.messageOK, "icon-accept");
			},
			failure : function(errorMsg, poResult) {
				i3.msgOff(epca.evidence.c.sFormMsgId2);
				epca.notify(epca.L10n.evidenceDeleteRecordError + errorMsg, epca.L10n.messageError, "icon-error-epca");
			},
			scope : this
		}, record);
	},
	/**
	 * Funkce doplne do zaznamu vlastnika - 999e. Pokud je prihlasen ctenar.
	 *
	 * 13.01.21 on;
	 */
	csAddRecordOwner999e : function(marcRec) {
		var prop;
		if (i3.Login && i3.Login.ctx && !i3.isEmptyString(i3.Login.ctx.isUserClass)) {
			if (!marcRec['999']) {
				marcRec['999'] = {};
			}
			prop = epca.form.Helper.c.sSubtagPrefix + 'e';
			if (i3.isEmptyString(marcRec['999'][prop])) {
				marcRec['999'][prop] = i3.className2LName(i3.Login.ctx.isUserClass) + '*' + i3.Login.ctx.isUserT001;
			}
		}
	},
	/**
	 * Nastavi vlastnika zaznamu - pouziva se pri kopii zaznamu
	 *
	 * 13.01.21 on;
	 */
	csSetRecordOwner999eMarc : function(poRec) {
		var t999;

		if (i3.Login && i3.Login.ctx && !i3.isEmptyString(i3.Login.ctx.isUserClass)) {
			t999 = poRec.getTag('999');
			if (t999 === '') {
				t999 = '999    ';
			}
			t999 = poRec.setSubTagStr(t999, 'e', i3.className2LName(i3.Login.ctx.isUserClass) + '*' + i3.Login.ctx.isUserT001);
			poRec.setTag(t999);
		}
	},
	/**
	 * Nastaveni limit vo flexpope
	 *
	 * @param {Object} pStore        - search store flexpopu
	 * @param {Object} pLimitsDT     - data limit flexpopu
	 *
	 * 04.11.22 on;
	 */
	csSetupSearchLimits : function(pStore /*, pLimitsDT*/ ) {
		var record, limits, comboDbBox = Ext.ComponentMgr.get('topDbSelect');
		if (!comboDbBox) {
			return;
		}
		// 29.11.12 on; doplneno nacteni indexu z comboboxu
		//var n = comboDbBox.store.findExact('id', comboDbBox.getValue());
		var n = comboDbBox.store.findExact('id', pStore.baseParams.db);
		if (n >= 0) {
			record = comboDbBox.store.getAt(n);
		}

		if (record) {
			limits = record.data['limits'];
			if (!i3.isEmptyString(limits)) {
				// vyswapuje definovane retezce za aktualni hodnoty
				limits = i3.csSwapDefaultValues(limits, epca.Config.User.csBranch);
				pStore.baseParams.query = this.csAddLimit(limits, pStore.baseParams.query);
			}
		}
	},
	/**
	 * Makro pre skladanie limit casti PQF query<br>
	 *
	 * @param {Object} pLim
	 * @param {Object} pPQF
	 *
	 * 04.11.22 on;
	 */
	csAddLimit : function(pLim, pPQF, pOper) {
		if (pPQF === '') {// ak je zaslana otazka prazdna, vratime povodnu query - ziadna zmena
			return pLim;
		}
		if (pLim === '') {// ak sucasna limita prazdna, proste vratime pridavany PQF
			return pPQF;
		}
		if (!pOper) {
			pOper = '@and';
		}
		// pridavame limitu
		return pOper + ' ' + pLim + ' ' + pPQF;
	}
});
