/* 
 * Konfigurace Gruntu
 * Gruntfile
 * 2024-04-30 on; na "prettier:i3appEpca" mne to pada, zakomentovano
 * 2023-08-29 on; formular serialu pro male knihovny
 * 2023-08-23 on; formular knihy pro male knihovny
 * 2023-06-27 on; epca.form.Button
 * 2023-06-07 on; properties.json->properties.json5
 * 2023-05-15 jk; do "dm" pridan chybejici jsfiles
 * 2023-05-15 jk; do "dm" pridan notifySim
 * 2022-12-22 on; do dkm pridany SZ akce pro dunajovice
 * 2022-11-16 on; do dkm pridana osoba pro dunajovice
 * 2022-10-25 on; do dkm pridana akce pro dunajovice 
 * 2022-10-12 on; do "dkm" pridan misto
 * 2022-10-05 on; do "dkm" pridan objekt
 * 2022-07-13 on; do "cat" pridana objednavka a faktura
 * 2022-06-22 on; doplnen "dm"
 * 2022-06-21 jk; do "dm" pridan ImportRec a ExportRec
 * 2022-05-09 on; do "cat" doplnen formular clanku, kartograficky dokument, hudebnina, zvuk
 * 2021-12-08 on; do "cat" doplnen formular stary tisk
 * 2021-11-03 on; dalsi doplneni aplikace cat
 * 2021-10-21 on; doplnena aplikace cat
 * 2021-09-20 on; pridany "etc/FileUpload/FileUploadField.css", "etc/fileupload-min.js"
 * 2020-11-26 kp; Zmena adresarove struktury pro konguraci a vystupy
 * 2020-11-03 kp; Pridan BOM
 * 2020-08-21 kp; tablesorter pro ZClienta
 * 2020-06-10 on; newsletter
 * 2020-05-05 on; opravena cesta pro dynf a doplnena dkm
 * 2020-04-16 on; do balicku doplneny ikony
 * 2020-02-14 on; doplnena epcaevidence
 * 2019-12-10 jk; zrusen parametr noSourceMap: true
 * 2019-11-12 kp; Upgrade
 * 2019-11-05 kp; Pridan interpiweb
 * 2019-09-10 on; zrusen parametr noSourceMap: true
 * 2019-09-09 on; uprava muz aplikace
 * 2019-08-23 on; doplneny cesty k dynf a fileupload
 * 2019-08-22 on; rozsiren webadmin
 * 2019-07-11 kp; Pridana uloha i2g
 * 2019-03-26 kp; Opravy formatovani
 * 2019-03-25 lo; domovska stranka i3 aplikacii - da sa na nu dostat z webovej katalogizacie, webove vypozicky a vystupy
 * 2019-03-20 kp; Doplněn SASS a odstraněn LESS
 * 2016-06-01 kp; První verze, dokončení pro i3 aplikace a IPAC
 */
module.exports = function(grunt) {
	"use strict";
	if (!grunt.config.get("ictx")) {
		grunt.config.set("ictx", "");
	}
	if (!grunt.config.get("dir")) {
		grunt.config.set("dir", "");
	}
	if (!grunt.option("ictx")) {
		grunt.option("ictx", "");
	}
	if (!grunt.option("dir")) {
		grunt.option("dir", "");
	}
	if (!grunt.option("app")) {
		grunt.option("app", "");
	}

	// =========================================================================
	// @name Načítání konfigurace pluginů
	// =========================================================================
	require("jit-grunt")(grunt);
	var configs = require("load-grunt-configs")(grunt, {
		config: {
			src: "options/*.js"
		},
		ftpPut: {
			options: {
				host: "ftp://cosmo2",
				user: "cosmoftp",
				pass: "N7ursoba"
			},
			upload: {
				files: {
					"css/*": "/csp-dir/css/*"
				}
			}
		}
	});
	grunt.initConfig(configs);
	require("load-grunt-tasks")(grunt);

	grunt.registerTask("cosmo2tcss", ["ftpPut"]);
	// =========================================================================
	// Načtení pluginů
	// =========================================================================

	grunt.loadNpmTasks("grunt-jsbeautifier");
	// SASS - Přeformátování, kompilace, dokumentace
	grunt.loadNpmTasks("grunt-dart-sass");
	grunt.loadNpmTasks("grunt-prettier");
	grunt.loadNpmTasks("grunt-sassdoc");
	grunt.loadNpmTasks("grunt-stylelint");
	// Zazipování
	grunt.loadNpmTasks("grunt-zip");
	// BOM znak
	grunt.loadNpmTasks("grunt-byte-order-mark");
	// Konce řádků
	grunt.loadNpmTasks("grunt-eol");
	// Validace JS
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-jsdoc");
	// Spojování souborů
	grunt.loadNpmTasks("grunt-contrib-concat");
	// JSON - Přeformátování a validace
	grunt.loadNpmTasks("grunt-json-format");
	grunt.loadNpmTasks("grunt-jsonlint");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-prompt");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	// =========================================================================
	// @name Registrace úloh
	// =========================================================================

	/**
	 * @name Výchozí úloha pro testování čehokoliv
	 * @example grunt
	 */
	grunt.registerTask("default", "Testování - demo", "jsbeautifier:gruntfile");
	/**
	 * @name Údržba Gruntu
	 * @example grunt gruntfile
	 * @file Task_Gruntfile.bat
	 */
	grunt.registerTask("gruntfile", "Údržba JS souborů Gruntu, přeformátovat, validovat, dokumetace", function() {
		grunt.task.run(["jsbeautifier:gruntfile", "bom:gruntfile", "eol:gruntfile", "json-format:gruntfile", "jsonlint:gruntfile", "jshint:gruntfile", "clean:gruntfile", "jsdoc:gruntfile"]);
	});
	// Ignorovat JS v adresáři app/ a lib/ a další vybrané soubory při testování a přeformátování kódu
	var ignoreIPAC = {
		files: ["../csp-dir/js/*.js", "!../csp-dir/js/lib/*.js", "!../csp-dir/js/app/*.js", "!../csp-dir/js/*.lib.js", "!../csp-dir/js/*.min.js", "!../csp-dir/js/attc.googleCharts.js", "!../csp-dir/js/load-image.js", "!../csp-dir/js/bootstrap.js", "!../csp-dir/js/bootstrapValidator.js", "!../csp-dir/js/canvas-to-blob.js", "!../csp-dir/js/html5.js", "!../csp-dir/js/jqm-datebox.core.js", "!../csp-dir/js/jqm-datebox.mode.calbox.js", "!../csp-dir/js/jqm-datebox.mode.datebox.js", "!../csp-dir/js/jqm-datebox.mode.slidebox.js", "!../csp-dir/js/jquery.js", "!../csp-dir/js/jquery.autocomplete.js", "!../csp-dir/js/jquery.columnmanager.js", "!../csp-dir/js/jquery.cycle.js", "!../csp-dir/js/jquery.easing.js", "!../csp-dir/js/jquery.expander.js", "!../csp-dir/js/jquery.fancybox.js", "!../csp-dir/js/jquery.fancybox-buttons.js", "!../csp-dir/js/jquery.fancybox-media.js", "!../csp-dir/js/jquery.fancybox-thumbs.js", "!../csp-dir/js/jquery.fileupload.js", "!../csp-dir/js/jquery.fileupload-audio.js", "!../csp-dir/js/jquery.fileupload-image.js", "!../csp-dir/js/jquery.fileupload-process.js", "!../csp-dir/js/jquery.fileupload-ui.js", "!../csp-dir/js/jquery.fileupload-validate.js", "!../csp-dir/js/jquery.fileupload-video.js", "!../csp-dir/js/jquery.jcarousel.js", "!../csp-dir/js/jquery.jcarousel-autoscroll.js", "!../csp-dir/js/jquery.jcarousel-control.js", "!../csp-dir/js/jquery.jcarousel-pagination.js", "!../csp-dir/js/jquery.jqmts.js", "!../csp-dir/js/jquery.maskedinput.js", "!../csp-dir/js/jquery.maxlength.js", "!../csp-dir/js/jquery.metadata.js", "!../csp-dir/js/jquery.mobile.js", "!../csp-dir/js/jquery.mobile.datebox.ar.js", "!../csp-dir/js/jquery.mobile.datebox.cs.js", "!../csp-dir/js/jquery.mobile.datebox.en.js", "!../csp-dir/js/jquery.mobile.datebox.lang.js", "!../csp-dir/js/jquery.mobile.datebox.sk.js", "!../csp-dir/js/jquery.mousewheel.js", "!../csp-dir/js/jquery.pass-strengthener.js", "!../csp-dir/js/jquery.selectboxes.js", "!../csp-dir/js/jquery.simpleautogrow.js", "!../csp-dir/js/jquery.tablesorter.js", "!../csp-dir/js/jquery.tag.editor.js", "!../csp-dir/js/jquery.tinysort.js", "!../csp-dir/js/jquery.ui.custom.js", "!../csp-dir/js/jquery.ui.map.js", "!../csp-dir/js/jquery.ui.map.extensions.js", "!../csp-dir/js/jquery.url.js", "!../csp-dir/js/jquery.validationEngine.js", "!../csp-dir/js/jquery.validationEngine.ar.js", "!../csp-dir/js/jquery.validationEngine.cs.js", "!../csp-dir/js/jquery.validationEngine.en.js", "!../csp-dir/js/jquery.validationEngine.sk.js", "!../csp-dir/js/jquery.validationEngine-loc.js", "!../csp-dir/js/jquery-1.11.js", "!../csp-dir/js/jquery-migrate.js", "!../csp-dir/js/klass.js", "!../csp-dir/js/photoswipe.jquery.js", "!../csp-dir/js/require.js", "!../csp-dir/js/respond.js", "!../csp-dir/js/xhr-xdr-adapter.js"]
	};
	/**
	 * @name Vyčištění IPACu 
	 * @example grunt ipclean
	 * @file Task_IPAC_clean.bat
	 */
	grunt.registerTask("ipclean", "Vyčištění IPACu od nepotřebných a generovaných souborů", function() {
		grunt.task.run(["clean:ipac"]);
	});
	/**
	 * @name Vyčištění adresářů i3 aplikací od nepotřebných souborů
	 * @example grunt i3clean
	 * @file Task_I3_clean.bat
	 */
	grunt.registerTask("i3clean", "Vyčištění adresářů i3 aplikací od nepotřebných a generovaných souborů", function() {
		grunt.task.run(["clean:i3app"]);
	});
	/**
	 * @name Zpracování CSS a JS pro IPAC
	 * @example grunt ipac
	 * @file Task_IPAC.bat
	 */
	grunt.registerTask("ipac", "Zpracování CSS a JS pro IPAC", ["prettier:ipac", "jsbeautifier:ipac", "dart-sass:arl", "dart-sass:ipac", "bom:ipacproduc", "eol:ipacproduc", "copy:ipac", "uglify:ipac"]);
	/**
	 * @name SASS IPACu
	 * @example grunt ipacsass
	 * @file Task_IPAC_Sass.bat
	 */
	//grunt.registerTask("ipacsass", ["prettier:ipac", "stylelint:ipac", "bom:ipac", "eol:ipac", "dart-sass:ipac", "dart-sass:arl"]);
	grunt.registerTask("ipacsass", ["prettier:ipac", "dart-sass:ipac"]);
	/**
	 * @name SASS PWA
	 * @example grunt pwa
	 * @file Task_PWA.bat
	 */
	grunt.registerTask("pwa", ["prettier:pwa", "jsbeautifier:pwa", "bom:pwa", "dart-sass:pwa"]);
	/**
	 * @name Dokumentace SASS k IPACu
	 * @example grunt docipacsass
	 * @file Task_IPAC_DocSass.bat
	 */
	grunt.registerTask("docipacsass", "Dokumentace SASS k IPACu", ["sassdoc:ipac"]);
	/**
	 * @name Odebart znak BOM ze šablon *.csp a *.csr a nastavit konce řádků
	 * @example grunt ipactpl
	 * @file Task_IPAC_templates.bat
	 */
	grunt.registerTask("ipactpl", "Odebart znak BOM ze šablon *.csp a *.csr a nastavit konce řádků", ["bom:ipactpl", "eol:ipactpl"]);
	/**
	 * @name Přeformátování SASS u všech zákazníků
	 * @example grunt allsassusers
	 * @file Task_IPAC_all_SASS_users.bat
	 */
	grunt.registerTask("allsassusers", "Přeformátování SASS u všech zákazníků ", ["prettier:ipacu", "bom:ipacu"]);
	/**
	 * @name Otestování všech JS pro IPAC a vytvoření dokumentace
	 * @example grunt ipacjstest
	 * @file Task_IPAC-JS.bat
	 */
	grunt.registerTask("ipacjstest", ["jsbeautifier:ipac", "jshint:ipac", "bom:ipac", "eol:ipac", "jsdoc:ipac"]);
	/**
	 * @name Otestování všech JS pro IPAC u všech zakazníků
	 * @example grunt @example ipacjstestuser
	 * @file Task_IPAC-JS-users.bat
	 */
	grunt.registerTask("ipacjstestuser", ["jsbeautifier:ipacu", "bom:ipacu", "eol:ipacu", "jshint:ipacu"]);
	/**
	 * @name Spuštění úlohy s parametrem ictx -> Adresář zákazníka -> přeložení šablon SASS, komprimace CSS a JS.
	 * @example grunt i2 --ictx=cbvk
	 * @file Task_IPAC-User.bat
	 */
	grunt.registerTask("i2", "Spuštění úloh pro IPAC s parametrem --ictx=", function() {
		var ictx = grunt.option("ictx");
		if (ictx) {
			grunt.config.set("ictx", ictx);
			grunt.task.run(["bom:ictx", "jsbeautifier:ictx", "jshint:ictx", "copy:ictx", "prettier:ictx", "dart-sass:ictx", "dart-sass:ictx2", "bom:ictx", "bom:ictx2", "eol:ictx", "eol:ictx2", "jsdoc:ictx", "uglify:ictx"]);
		} else {
			grunt.log.error("Nebyl zadán parametr: --ictx=");
		}
		grunt.log.write("ICTX: " + ictx);
	});
	// -------------------------------------------------------------------------
	// Konfigurace I3 aplikací

	/**
	 * @name Smazání vygenerovaných souborů z i3 aplikací
	 * @example grunt @example i3clean
	 * @file Task_I3_clean.bat
	 */
	grunt.registerTask("i3clean", ["clean:i3clean"]);
	var basicFiles = ["user.js", "index.csp", "favicon.ico", "icons/arl.svg", "icons/arl.ttf", "icons/arl.woff2", "icons/arl.woff", "images/*", "images/flags/*", "images/icons/*", "images/icons/fam/*", "images/panel/*", "build/dynf.js", "build/lov.js", "etc/colorfield/*", "etc/lov/**", "etc/printer/print.css", "etc/user.css", "etc/printer/printer-min.js", "etc/extjs_examples/**", "etc/appHTML.csp", "etc/appStyle.xsl", "etc/indexStyle.xsl", "etc/appIcon.png", "etc/encryption-min.js", "etc/FileUpload/FileUploadField.css", "etc/fileupload-min.js"];
	var extjs340Files = ["extjs340/adapter/ext/ext-base.js", "extjs340/ext-all.js", "extjs340/resources/**"];
	var extjs3411Files = ["extjs3411/adapter/ext/ext-base.js", "extjs3411/ext-all.js", "extjs3411/resources/**"];
	var extjs22Files = ["extjs22/adapter/ext/ext-base.js", "extjs22/ext-all.js", "extjs22/resources/**"];
	var extjs340ExampleFiles = ["extjs340/examples/ux/**", "extjs340/examples/shared/**"];
	var RTLFiles = ["RTL/src/*"];
	var epcaFiles = ["epca/main.js", "epca/epcadesigner.js", "epca/images/**", "epca/s1/**", "epca/css/**", "epca/properties.json5", "epca/index.csp", "epca/indexDesigner.csp", "epca/indexEvidence.csp", "epca/login.js", "epca/logout.js", "epca/epca.Config.User.js"];
	var i3Conf = {
		// Název parametru se kterým pracuje úkol Gruntu
		"webadmin": {
			// Adresář i3 aplikace
			"dir": "webadmin",
			// Název hlavníhou souboru i3 aplikace
			"file": "main",
			// Adresáře a soubory do zip balíčku
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["webadmin/admin.csp", "webadmin/index.csp", "webadmin/main.js", "webadmin/main.css", "webadmin/images/**"]),
			// Soubory pro vytvoření obsahu hlavního souboru i3 aplikace a validaci JSLINT
			"jsfiles": ["../csp-dir-i3/webadmin/version.js", "../csp-dir-i3/webadmin/include/jquery-1.12.4.min.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.ComboboxLang.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.Import.js", "../csp-dir-i3/webadmin/i3.Microedit.js", "../csp-dir-i3/webadmin/i3.Main.Admin.js"]
		},
		"cat": {
			"dir": "cat",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["cat/cat.csp", "cat/index.csp", "cat/main.js", "cat/main.css", "cat/s1/**"]),
			"jsfiles": ["../csp-dir-i3/cat/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.NewAuth.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/i3.Inventory.js", "../csp-dir-i3/i3.UI.Basket.js", "../csp-dir-i3/i3.UI.SearchComboBox.js", "../csp-dir-i3/cat/i3.cat.auto.js", "../csp-dir-i3/cat/i3.cat.form.js", "../csp-dir-i3/cat/i3.cat.comp.js", "../csp-dir-i3/cat/i3.cat.compC.js", "../csp-dir-i3/cat/i3.cat.compD.js", "../csp-dir-i3/cat/i3.cat.compE.js", "../csp-dir-i3/cat/i3.cat.compF.js", "../csp-dir-i3/cat/i3.cat.compG.js", "../csp-dir-i3/cat/i3.cat.compH.js", "../csp-dir-i3/cat/i3.cat.compI.js", "../csp-dir-i3/cat/i3.cat.compJ.js", "../csp-dir-i3/cat/i3.cat.compK.js", "../csp-dir-i3/cat/i3.cat.compL.js", "../csp-dir-i3/cat/i3.cat.compM.js", "../csp-dir-i3/cat/i3.cat.compN.js", "../csp-dir-i3/cat/i3.cat.MarcConv.js", "../csp-dir-i3/cat/i3.cat.hold.form.js", "../csp-dir-i3/cat/i3.cat.hold.MarcConv.js", "../csp-dir-i3/cat/forms/i3.cat.formBookZao.js", "../csp-dir-i3/cat/forms/i3.cat.formSerialZao.js", "../csp-dir-i3/cat/forms/i3.cat.formBookStd.js", "../csp-dir-i3/cat/forms/i3.cat.formOldprintZao.js", "../csp-dir-i3/cat/forms/i3.cat.formArticleStd.js", "../csp-dir-i3/cat/forms/i3.cat.formCartographicStd.js", "../csp-dir-i3/cat/forms/i3.cat.formSoundStd.js", "../csp-dir-i3/cat/forms/i3.cat.formMusicStd.js", "../csp-dir-i3/cat/forms/i3.cat.formSerialStd.js", "../csp-dir-i3/cat/forms/i3.cat.formOrderStd.js", "../csp-dir-i3/cat/forms/i3.cat.formInvoiceStd.js", "../csp-dir-i3/cat/forms/i3.cat.formBookMK.js", "../csp-dir-i3/cat/forms/i3.cat.formSerialMK.js", "../csp-dir-i3/cat/i3.cat.Main.js"]
		},
		"catu": {
			"dir": "catu",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["catu/catu.csp", "catu/index.csp", "catu/main.js", "catu/main.css", "catu/s1/**"]),
			"jsfiles": ["../csp-dir-i3/catu/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.NewAuth.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/i3.Inventory.js", "../csp-dir-i3/i3.UI.Basket.js", "../csp-dir-i3/cat/i3.cat.auto.js", "../csp-dir-i3/catu/i3.catu.form.js", "../csp-dir-i3/catu/i3.catu.comp.js", "../csp-dir-i3/catu/i3.catu.MarcConv.js", "../csp-dir-i3/cat/i3.cat.hold.form.js", "../csp-dir-i3/cat/i3.cat.hold.MarcConv.js", "../csp-dir-i3/catu/i3.catu.Main.js"]
		},
		"cle": {
			"dir": "cle",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["cle/cle.csp", "cle/index.csp", "cle/main.js", "cle/main.css"]),
			"jsfiles": ["../csp-dir-i3/cle/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.ComboboxLang.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/cle/i3.cle.Main.js", "../csp-dir-i3/cle/i3.cleCenter.form.js", "../csp-dir-i3/cle/i3.cleWest.form.js", "../csp-dir-i3/cle/i3.cleNorth.form.js", "../csp-dir-i3/cle/i3.cle.Util.js", "../csp-dir-i3/cle/i3.cle.MaskF.js", "../csp-dir-i3/cle/i3.cle.Panels.js"]
		},
		"dkm": {
			"dir": "dkm",
			"file": "main",
			"packet": basicFiles.concat(extjs3411Files, RTLFiles, ["dkm/dkm.csp", "dkm/index.csp", "dkm/main.js", "dkm/main.css", "dkm/s1/**"]),
			"jsfiles": ["../csp-dir-i3/dkm/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/i3.UI.Basket.js", "../csp-dir-i3/dkm/i3.dkm.marcConv.js", "../csp-dir-i3/dkm/forms/i3.dkm.formActionStd.js", "../csp-dir-i3/dkm/forms/i3.dkm.formActionSZStd.js", "../csp-dir-i3/dkm/forms/i3.dkm.formPersonStd.js", "../csp-dir-i3/dkm/forms/i3.dkm.formGeoStd.js", "../csp-dir-i3/dkm/forms/i3.dkm.formCorpStd.js", "../csp-dir-i3/dkm/forms/i3.dkm.formObjectStd.js", "../csp-dir-i3/dkm/forms/i3.dkm.formEntryStd.js", "../csp-dir-i3/dkm/forms/i3.dkm.formArticleStd.js", "../csp-dir-i3/dkm/forms/i3.dkm.formSubjectHeadingStd.js", "../csp-dir-i3/dkm/forms/i3.dkm.formInterviewStd.js", "../csp-dir-i3/dkm/forms/i3.dkm.formNewsletterHol.js", "../csp-dir-i3/dkm/forms/i3.dkm.formActionHol.js", "../csp-dir-i3/dkm/forms/i3.dkm.formActionDun.js", "../csp-dir-i3/dkm/forms/i3.dkm.formActionSZHol.js", "../csp-dir-i3/dkm/forms/i3.dkm.formActionSZDun.js", "../csp-dir-i3/dkm/forms/i3.dkm.formOrganisationHol.js", "../csp-dir-i3/dkm/forms/i3.dkm.formCouncilHol.js", "../csp-dir-i3/dkm/forms/i3.dkm.formPersonHol.js", "../csp-dir-i3/dkm/forms/i3.dkm.formWeatherHol.js", "../csp-dir-i3/dkm/forms/i3.dkm.formObjectHol.js", "../csp-dir-i3/dkm/forms/i3.dkm.formPlaceHol.js", "../csp-dir-i3/dkm/forms/i3.dkm.formPersonDun.js", "../csp-dir-i3/dkm/i3.dkm.form.js", "../csp-dir-i3/dkm/i3.dkm.comp.js", "../csp-dir-i3/dkm/i3.dkm.editor.js", "../csp-dir-i3/dkm/i3.dkm.main.js"]
		},
		"dkruz": {
			"dir": "dk",
			"file": "dkruz",
			"packet": basicFiles.concat(extjs3411Files, RTLFiles, ["dk/dk.csp", "dk/index.csp", "dk/dkruz.js", "dk/main.css", "dk/s1/**"]),
			"jsfiles": ["../csp-dir-i3/dk/version-dkruz.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/dk/i3.dk.marcConv.js", "../csp-dir-i3/dk/forms/ruz/i3.dk.formActionRuz.js", "../csp-dir-i3/dk/forms/i3.dk.formActionSZStd.js", "../csp-dir-i3/dk/forms/ruz/i3.dk.formPersonRuz.js", "../csp-dir-i3/dk/forms/i3.dk.formGeoStd.js", "../csp-dir-i3/dk/forms/ruz/i3.dk.formCorpRuz.js", "../csp-dir-i3/dk/forms/i3.dk.formObjectStd.js", "../csp-dir-i3/dk/forms/i3.dk.formEntryStd.js", "../csp-dir-i3/dk/forms/ruz/i3.dk.formArticleRuz.js", "../csp-dir-i3/dk/i3.dk.form.js", "../csp-dir-i3/dk/i3.dk.comp.js", "../csp-dir-i3/dk/i3.dk.editor.js", "../csp-dir-i3/dk/i3.dk.main.js"]
		},
		"dk": {
			"dir": "dk",
			"file": "main",
			"packet": basicFiles.concat(extjs3411Files, RTLFiles, ["dk/dk.csp", "dk/index.csp", "dk/main.js", "dk/main.css", "dk/s1/**"]),
			"jsfiles": ["../csp-dir-i3/dk/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/dk/i3.dk.marcConv.js", "../csp-dir-i3/dk/forms/i3.dk.formActionStd.js", "../csp-dir-i3/dk/forms/i3.dk.formActionSZStd.js", "../csp-dir-i3/dk/forms/i3.dk.formPersonStd.js", "../csp-dir-i3/dk/forms/i3.dk.formGeoStd.js", "../csp-dir-i3/dk/forms/i3.dk.formCorpStd.js", "../csp-dir-i3/dk/forms/i3.dk.formObjectStd.js", "../csp-dir-i3/dk/forms/i3.dk.formEntryStd.js", "../csp-dir-i3/dk/forms/i3.dk.formArticleStd.js", "../csp-dir-i3/dk/forms/i3.dk.formInterviewStd.js", "../csp-dir-i3/dk/forms/i3.dk.formSubjectHeadingStd.js", "../csp-dir-i3/dk/i3.dk.form.js", "../csp-dir-i3/dk/i3.dk.comp.js", "../csp-dir-i3/dk/i3.dk.editor.js", "../csp-dir-i3/dk/i3.dk.main.js"]
		},
		"epcareports": {
			"dir": "epcareports",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["epcareports/epcarep.csp", "epcareports/index.csp", "epcareports/main.js", "epcareports/main.css", "epcareports/s1/**"]),
			"jsfiles": ["../csp-dir-i3/epcareports/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/epcareports/i3.epcarep.MarcConv.js", "../csp-dir-i3/epcareports/i3.epcarep.Form.js", "../csp-dir-i3/epcareports/i3.epcarep.Main.js"]
		},
		"epcaevidence": {
			"dir": "epca",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, extjs340ExampleFiles, RTLFiles, epcaFiles),
			"jsfiles": ["../csp-dir-i3/epca/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.SOAP.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/epca/styleswitcher.js", "../csp-dir-i3/epca/epca.Config.js", "../csp-dir-i3/epca/epca.L10n.js", "../csp-dir-i3/epca/window/epca.window.Notification.js", "../csp-dir-i3/epca/epca.js", "../csp-dir-i3/epca/epca.Form.js", "../csp-dir-i3/epca/epca.WsTagMap.js", "../csp-dir-i3/epca/epca.WsForm.js", "../csp-dir-i3/epca/epca.WsRecord.js", "../csp-dir-i3/epca/form/epca.form.Helper.js", "../csp-dir-i3/epca/form/epca.form.MarcFieldSet.js", "../csp-dir-i3/epca/form/epca.form.MarcSearchComboBox.js", "../csp-dir-i3/epca/form/epca.form.MarcTextField.js", "../csp-dir-i3/epca/form/epca.form.MarcTextArea.js", "../csp-dir-i3/epca/form/epca.form.CodedDataFieldSet.js", "../csp-dir-i3/epca/form/epca.form.CodedDataComboBox.js", "../csp-dir-i3/epca/form/epca.form.CodedDataDateField.js", "../csp-dir-i3/epca/form/epca.form.RepeatableEncapsulation.js", "../csp-dir-i3/epca/form/epca.form.LinkEntry.js", "../csp-dir-i3/epca/form/epca.form.ContentServerLink.js", "../csp-dir-i3/epca/form/epca.form.Label.js", "../csp-dir-i3/epca/form/epca.form.Checkbox.js", "../csp-dir-i3/epca/form/epca.form.KindValue.js", "../csp-dir-i3/epca/form/epca.form.Button.js", "../csp-dir-i3/epca/window/epca.window.LinkEntryDefault.js", "../csp-dir-i3/epca/window/epca.window.FormatForm.js", "../csp-dir-i3/epca/window/epca.window.NewForm.js", "../csp-dir-i3/epca/window/epca.window.OpenRecord.js", "../csp-dir-i3/epca/window/epca.window.F928Form.js", "../csp-dir-i3/epca/evidence/epca.evidence.EvidencePanel.js", "../csp-dir-i3/epca/evidence/epca.evidence.SearchComboBox.js", "../csp-dir-i3/epca/epca.MainPanel.js", "../csp-dir-i3/epca/epca.MainLoginEvidence.js"]
		},
		"epcadesigner": {
			"dir": "epca",
			"file": "epcadesigner",
			"packet": "",
			"jsfiles": ["../csp-dir-i3/epca/version-epcadesigner.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.SOAP.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/epca/epca.Config.js", "../csp-dir-i3/epca/epca.L10n.js", "../csp-dir-i3/epca/window/epca.window.Notification.js", "../csp-dir-i3/epca/epca.js", "../csp-dir-i3/epca/epca.Form.js", "../csp-dir-i3/epca/epca.WsTagMap.js", "../csp-dir-i3/epca/epca.WsForm.js", "../csp-dir-i3/epca/epca.MarcConv.js", "../csp-dir-i3/epca/form/epca.form.Helper.js", "../csp-dir-i3/epca/form/epca.form.MarcFieldSet.js", "../csp-dir-i3/epca/form/epca.form.MarcSearchComboBox.js", "../csp-dir-i3/epca/form/epca.form.MarcTextField.js", "../csp-dir-i3/epca/form/epca.form.MarcTextArea.js", "../csp-dir-i3/epca/form/epca.form.CodedDataFieldSet.js", "../csp-dir-i3/epca/form/epca.form.CodedDataComboBox.js", "../csp-dir-i3/epca/form/epca.form.CodedDataDateField.js", "../csp-dir-i3/epca/form/epca.form.RepeatableEncapsulation.js", "../csp-dir-i3/epca/form/epca.form.LinkEntry.js", "../csp-dir-i3/epca/form/epca.form.ContentServerLink.js", "../csp-dir-i3/epca/form/epca.form.Label.js", "../csp-dir-i3/epca/form/epca.form.Checkbox.js", "../csp-dir-i3/epca/form/epca.form.KindValue.js", "../csp-dir-i3/epca/form/epca.form.Button.js", "../csp-dir-i3/epca/window/epca.window.LinkEntryDefault.js", "../csp-dir-i3/epca/window/epca.window.FormatForm.js", "../csp-dir-i3/epca/window/epca.window.NewForm.js", "../csp-dir-i3/epca/window/epca.window.SaveAsForm.js", "../csp-dir-i3/epca/window/epca.window.OpenRecord.js", "../csp-dir-i3/epca/designer/epca.designer.TagTreePanel.js", "../csp-dir-i3/epca/designer/epca.designer.FormPropertyGrid.js", "../csp-dir-i3/epca/designer/epca.designer.DesignerPanel.js", "../csp-dir-i3/epca/designer/epca.designer.CustomCodeValidator.js", "../csp-dir-i3/epca/epca.MainPanel.js", "../csp-dir-i3/epca/epca.MainLoginDesigner.js"]
		},
		"home": {
			"dir": "home",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["home/home.csp", "home/index.csp", "home/main.js", "home/main.css", "home/images/**"]),
			"jsfiles": ["../csp-dir-i3/home/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.ComboboxLang.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/home/i3.home.Main.js"]
		},
		"icons": {
			"dir": "home",
			"file": "main",
			"packet": ""
		},
		"is": {
			"dir": "is",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, extjs340ExampleFiles, ["is/is.csp", "is/index.csp", "is/main.js", "is/main.css", "is/s1/**"]),
			"jsfiles": ["../csp-dir-i3/is/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/i3.ItemList.js", "../csp-dir-i3/is/i3.Is.MarcConv.js", "../csp-dir-i3/is/i3.Is.User.js", "../csp-dir-i3/is/i3.Is.Borrows.js", "../csp-dir-i3/is/i3.Is.BorrowList.js", "../csp-dir-i3/is/i3.Is.RequestList.js", "../csp-dir-i3/is/i3.Is.ReservationList.js", "../csp-dir-i3/is/i3.Is.PaymentList.js", "../csp-dir-i3/is/i3.Is.Notify.js", "../csp-dir-i3/is/i3.Main.Is.js"]
		},
		"jrec": {
			"dir": "jrec",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["jrec/index.csp", "jrec/main.js", "jrec/main.css", "jrec/images/*"]),
			"jsfiles": ["../csp-dir-i3/jrec/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.ComboboxLang.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/jrec/i3.jrec.center.form.js", "../csp-dir-i3/jrec/i3.jrec.main.js", "../csp-dir-i3/jrec/i3.jrec.north.form.js", "../csp-dir-i3/jrec/i3.jrec.join.js"]
		},
		"kd": {
			"dir": "kd",
			"file": "main",
			"packet": basicFiles.concat(extjs22Files, ["kd/kd.csp", "kd/index.csp", "kd/main.js", "kd/main.css"]),
			"jsfiles": ["../csp-dir-i3/kd/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/muz/i3.muz.Collectors.js", "../csp-dir-i3/muz/i3.muz.ColUdalost.js", "../csp-dir-i3/muz/i3.muz.MarcConv.js", "../csp-dir-i3/muz/i3.muz.AuthP.js", "../csp-dir-i3/muz/i3.muz.AuthOther.js", "../csp-dir-i3/kd/i3.fiit.Language.js", "../csp-dir-i3/kd/i3.fiit.Main.js", "../csp-dir-i3/kd/i3.fiit.MonumentMenu.js", "../csp-dir-i3/kd/i3.fiit.MonumentTree.js", "../csp-dir-i3/kd/i3.fiit.DataPanel.js"]
		},
		"muz": {
			"dir": "muz",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["muz/muz.csp", "muz/index.csp", "muz/main.js", "muz/main.css", "muz/muz_logo.gif", "muz/s1/**"]),
			"jsfiles": ["../csp-dir-i3/muz/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.NewAuth.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/muz/i3.muz.MarcConv.js", "../csp-dir-i3/muz/i3.muz.AuthP.js", "../csp-dir-i3/muz/i3.muz.AuthOther.js", "../csp-dir-i3/muz/i3.muz.Collectors.js", "../csp-dir-i3/muz/i3.muz.ColUdalost.js", "../csp-dir-i3/muz/i3.muz.Main.js"]
		},
		"nra": {
			"dir": "nra",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["nra/nra.csp", "nra/index.csp", "nra/main.js", "nra/main.css", "nra/images/*"]),
			"jsfiles": ["../csp-dir-i3/nra/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.NewAuth.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/nra/i3.nra.marcConv.js", "../csp-dir-i3/nra/forms/i3.nra.formPerson.js", "../csp-dir-i3/nra/forms/i3.nra.formPersonAll.js", "../csp-dir-i3/nra/forms/i3.nra.formCorp.js", "../csp-dir-i3/nra/forms/i3.nra.formAction.js", "../csp-dir-i3/nra/forms/i3.nra.formGeo.js", "../csp-dir-i3/nra/forms/i3.nra.formRod.js", "../csp-dir-i3/nra/forms/i3.nra.formChronology.js", "../csp-dir-i3/nra/forms/i3.nra.formTopicalName.js", "../csp-dir-i3/nra/i3.nra.form.js", "../csp-dir-i3/nra/i3.nra.editor.js", "../csp-dir-i3/nra/i3.nra.comp.js", "../csp-dir-i3/nra/i3.nra.join.js", "../csp-dir-i3/nra/i3.nra.AuthOther.js", "../csp-dir-i3/nra/i3.nra.Collectors.js", "../csp-dir-i3/nra/i3.nra.ColUdalost.js", "../csp-dir-i3/nra/i3.nra.main.js"]
		},
		"dm": {
			"dir": "dm",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["dm/dm.csp", "dm/index.csp", "dm/main.js", "dm/main.css"]),
			"jsfiles": ["../csp-dir-i3/dm/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/i3.UI.ComboboxLang.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.Import.js", "../csp-dir-i3/i3.UI.ImportRec.js", "../csp-dir-i3/i3.UI.ExportRec.js", "../csp-dir-i3/i3.UI.NotifySim.js", "../csp-dir-i3/dm/i3.dm.Main.js", "../csp-dir-i3/dm/i3.dm.Center.form.js", "../csp-dir-i3/dm/i3.dm.Search.form.js", "../csp-dir-i3/dm/i3.dm.SearchCommon.js ", "../csp-dir-i3/dm/i3.dm.West.form.js", "../csp-dir-i3/dm/i3.dm.North.form.js", "../csp-dir-i3/dm/i3.dm.Global.form.js", "../csp-dir-i3/dm/i3.dm.Util.js", "../csp-dir-i3/dm/i3.dm.Panels.js"]
		},
		"reports": {
			"dir": "reports",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["reports/rep.csp", "reports/index.csp", "reports/main.js", "reports/main.css", "reports/s1/**"]),
			"jsfiles": ["../csp-dir-i3/reports/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/reports/i3.rep.Form.js", "../csp-dir-i3/reports/i3.rep.Main.js"]
		},
		"scd": {
			"dir": "scd",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["scd/scd.csp", "scd/index.csp", "scd/main.js", "scd/main.css"]),
			"jsfiles": ["../csp-dir-i3/scd/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.AuthSelect.js", "../csp-dir-i3/i3.UI.NewAuth.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/i3.Reg.js", "../csp-dir-i3/scd/i3.scd.AppForm.js", "../csp-dir-i3/scd/i3.scd.AppFormNomination.js", "../csp-dir-i3/scd/i3.scd.List.js", "../csp-dir-i3/scd/i3.scd.Main.js"]
		},
		"scdauth": {
			"dir": "scdauth",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["scdauth/scdauth.csp", "scdauth/index.csp", "scdauth/main.js", "scdauth/main.css", "scdauth/s1/**", "scdauth/images/*"]),
			"jsfiles": ["../csp-dir-i3/scdauth/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/scdauth/i3.scd_auth.Form.js", "../csp-dir-i3/scdauth/i3.scd_auth.comp.js", "../csp-dir-i3/scdauth/i3.scd_auth.editor.js", "../csp-dir-i3/scdauth/i3.scd_auth.MarcConv.js", "../csp-dir-i3/cat/i3.cat.hold.form.js", "../csp-dir-i3/cat/i3.cat.hold.MarcConv.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formCorporation.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formGeoNazov.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formJury.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formOcenenieRocnik.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formOcenenieSZ.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formOstatneRocnik.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formOstatneSZ.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formPerson.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formProduct.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formSKRocnik.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formSKSZ.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formSutazRocnik.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formSutazSZ.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formVystavaRocnik.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formVystavaSZ.js", "../csp-dir-i3/scdauth/forms/i3.scd_auth.formZbierkovyPredmet.js", "../csp-dir-i3/scdauth/i3.scd_auth.Main.js"]
		},
		"scdf": {
			"dir": "scdf",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["scdf/scdf.csp", "scdf/index.csp", "scdf/main.js", "scdf/main.css"]),
			"jsfiles": ["../csp-dir-i3/scdf/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.UI.AuthSelect.js", "../csp-dir-i3/i3.UI.NewAuth.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/i3.Reg.js", "../csp-dir-i3/scdf/i3.scdf.AppForm.js", "../csp-dir-i3/scdf/i3.scdf.List.js", "../csp-dir-i3/scdf/i3.scdf.Main.js"]
		},
		// Toto nejsou i3 aplikace
		// ---------------------------------------------------------------------
		"dynf": {
			"dir": "etc/dynform",
			"file": "../build/dynf",
			"jsfiles": ["jslint-hdr.js", "../csp-dir-i3/etc/dynform/Ext.form.Field.js", "../csp-dir-i3/etc/dynform/Ext.form.FieldSet.js", "../csp-dir-i3/etc/dynform/Ext.form.FormPanel.js", "../csp-dir-i3/etc/dynform/Ext.form.CheckboxGroup-rs.js", "../csp-dir-i3/etc/dynform/Ext.ux.DynTriggerField.js"]
		},
		"fileupload": {
			"dir": "etc/fileupload",
			"file": "../etc/fileupload-min",
			"jsfiles": ["../csp-dir-i3/jslint-hdr.js", "../csp-dir-i3/etc/FileUpload/FileUploadField.js"]
		},
		"lov": {
			"dir": "etc/lov",
			"file": "lov",
			"jsfiles": ["../csp-dir-i3/etc/lov/version.js", "../csp-dir-i3/etc/lov/js/Ext.ux.util.js", "../csp-dir-i3/etc/lov/js/WebPage.js", "../csp-dir-i3/etc/lov/js/Ext.ux.form.LovCombo.js", "../csp-dir-i3/etc/lov/js/Ext.ux.form.ThemeCombo.js"]
		},
		"printer": {
			"dir": "etc/printer",
			"file": "printer",
			"jsfiles": ["../csp-dir-i3/etc/printer/version.js", "../csp-dir-i3/etc/printer/Printer.js", "../csp-dir-i3/etc/printer/renderers/Base.js", "../csp-dir-i3/etc/printer/renderers/Panel.js"]
		},
		// INTERPI app
		/// --------------------------------------------------------------------
		"interpi": {
			"dir": "interpi",
			"file": "main",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["interpi/**"]),
			"jsfiles": ["../csp-dir-i3/interpi/aplikace/version.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/interpi/aplikace/i3.Interpi.FlexPop.js", "../csp-dir-i3/interpi/aplikace/i3.Interpi.ColUdalost.js", "../csp-dir-i3/interpi/aplikace/i3.Interpi.Editor.js", "../csp-dir-i3/interpi/aplikace/i3.Interpi.Recordlist.js", "../csp-dir-i3/interpi/aplikace/i3.Interpi.Form.js", "../csp-dir-i3/interpi/aplikace/i3.Interpi.Comp.js", "../csp-dir-i3/interpi/aplikace/i3.Interpi.MarcConv.js", "../csp-dir-i3/interpi/aplikace/i3.Interpi.Main.js"]
		},
		// INTERPI sprava uzivatelu
		/// --------------------------------------------------------------------
		"interpium": {
			"dir": "interpi",
			"file": "mainum",
			"packet": basicFiles.concat(extjs340Files, RTLFiles, ["interpi/**"]),
			"jsfiles": ["../csp-dir-i3/interpi/aplikace/version-mainum.js", "../csp-dir-i3/i3.Base.js", "../csp-dir-i3/i3.Marc.js", "../csp-dir-i3/i3.WS.js", "../csp-dir-i3/i3.WS.Store.js", "../csp-dir-i3/i3.UI.Ext.js", "../csp-dir-i3/i3.UI.Base.js", "../csp-dir-i3/i3.Login.js", "../csp-dir-i3/i3.UI.FlexPop.js", "../csp-dir-i3/i3.UI.ColWin.js", "../csp-dir-i3/i3.UI.DataTable.js", "../csp-dir-i3/interpi/aplikace/i3.Interpi.FlexPop.js", "../csp-dir-i3/interpi/aplikace/i3.Interpi.ColUdalost.js", "../csp-dir-i3/interpi/aplikace/i3.InterpiUM.Editor.js", "../csp-dir-i3/interpi/aplikace/i3.Interpi.Recordlist.js", "../csp-dir-i3/interpi/aplikace/i3.Interpi.Form.js", "../csp-dir-i3/interpi/aplikace/i3.InterpiUM.Comp.js", "../csp-dir-i3/interpi/aplikace/i3.InterpiUM.MarcConv.js", "../csp-dir-i3/interpi/aplikace/i3.InterpiUM.Main.js"]
		}
	};
	// Načtení verze JS i3 aplikace
	function getVersionFromFile(appDir, appMainJS) {
		var nameVersionFile = "version.js";
		if (appMainJS !== "main") {
			nameVersionFile = "version-" + appMainJS + ".js";
		}
		var filePath = "../csp-dir-i3/" + appDir + "/" + nameVersionFile;
		var version = "none";
		if (grunt.file.exists(filePath)) {
			var fileContent = grunt.file.read(filePath, "UTF-8");
			var i = 0;
			var sLine;
			var aLines = fileContent.split("\n");
			try {
				for (i = 0; i < aLines.length; i++) {
					if (aLines[i].indexOf("i3.version") !== -1) {
						sLine = aLines[i].split("=");
						version = sLine[1].toString().replace(";", "").replace('"', "").replace("'", "").replace(/^\s+|\s+$/gm, "");
					}
				}
			} catch (err) {
				grunt.log.errorlns("Chybí obsah souboru version.js!");
				version = "error-version";
			}
		}
		return version;
	}
	/**
	 * @name Spuštění úloh pro I3 aplikaci s parametrem --app=
	 * @example grunt i3Sass --app=
	 * @file Task_I3-App-Sass.bat
	 */
	grunt.registerTask("i3Sass", "Spuštění úloh pro I3 aplikaci s parametrem --app=", function() {
		var app2;
		var app = grunt.option("app");
		if (app === "epca") {
			app = "epcaevidence";
			app2 = "epcadesigner";
		}
		grunt.log.write("App: " + app);
		var ictx = grunt.option("ictx");
		grunt.config.set("file", i3Conf[app].file);
		grunt.config.set("dir", i3Conf[app].dir);
		grunt.log.write("\nFile: " + i3Conf[app].file);
		grunt.log.write("\nDir: " + i3Conf[app].dir);
		grunt.task.run(["prettier:i3app", "dart-sass:i3app", "bom:i3app"]);
	});
	/**
	 * @name Spuštění úlohy s parametrem app -> Adresář i3 aplikace -> přeložení šablon SASS, komprimace CSS a JS, spojení JS souborů
	 * @example grunt i3 --app=webadmin
	 * @example grunt i3 --app=epca
	 * @example grunt i3 --app=dk --debug --verbose --force
	 * @file Task_I3-App.bat
	 */
	grunt.registerTask("i3", "Spuštění úloh pro I3 aplikaci s parametrem --app=", function() {
		var app2;
		var app = grunt.option("app");
		// Pro EPCA se přidává i ictx
		var ictx = grunt.option("ictx");
		if (app === "epca") {
			app = "epcaevidence";
			//grunt.task.run(["clean:i3appEpca"]);
		}
		grunt.log.write("App: " + app);
		if (app) {
			grunt.config.set("file", i3Conf[app].file);
			grunt.config.set("app", app);
			grunt.config.set("dir", i3Conf[app].dir);
			grunt.log.write("\nFile: " + i3Conf[app].file);
			grunt.log.write("\nDir: " + i3Conf[app].dir);
			// Načtení verze JS i3 aplikace pro vytvoření názvu ZIP balíčku
			var version = getVersionFromFile(i3Conf[app].dir, i3Conf[app].file);
			if ((version !== "none") && (version != "")) {
				grunt.config.set("version", version);
				grunt.log.write("\nVersion: " + version);
			} else {
				grunt.log.errorlns("Chybí soubor version.js!");
				grunt.config.set("version", i3Conf[app].dir);
			}
			if (app === "epcaevidence") {
				grunt.config.set("ictx", ictx);
				app2 = "epcadesigner";
				grunt.config.set("file2", app2);
				grunt.config.merge({
					jshint: {
						i3appEpcaD: {
							src: i3Conf[app2].jsfiles
						}
					},
					concat: {
						i3appEpcaD: {
							src: i3Conf[app2].jsfiles
						}
					}
				});
				if (!ictx) {
					grunt.task.run(["prompt:epca"]);
				}
			}
			// Používat přímo čistě proměné v konfiguraci Gruntu nejde, proto se to musí provést zde.
			grunt.config.merge({
				jshint: {
					i3app: {
						src: i3Conf[app].jsfiles
					}
				},
				concat: {
					i3app: {
						src: i3Conf[app].jsfiles
					}
				},
				compress: {
					i3app: {
						files: [{
							src: i3Conf[app].packet
						}]
					}
				}
			});
			grunt.task.run(["prettier:i3app", "dart-sass:i3app", "bom:i3app", "jsbeautifier:i3app", "jshint:i3app", "jsdoc:i3app", "concat:i3app"]);
			if (app2 === "epcadesigner") {
				// 30.04.24 on; na "prettier:i3appEpca" mne to pada, zakomentovano
				//grunt.task.run(["prettier:i3appEpca", "dart-sass:i3appEpca"]);
				grunt.task.run(["dart-sass:i3appEpca"]);
				grunt.task.run(["jshint:i3appEpcaD", "concat:i3appEpcaD", "copy:i3appEpcaD", "uglify:i3appEpcaD"]);
			}
			grunt.task.run(["concat:i3app", "copy:i3app", "uglify:i3app", "compress:i3app"]);
		} else {
			grunt.log.error("Nebyl zadán parametr: --app=");
		}
	});
	/**
	 * @name Úloha pro I3 podpůrné JavaScripty s parametrem --app=
	 * @example grunt i3s --app=dynf
	 */
	grunt.registerTask("i3s", "Spuštění úloh pro I3 podpůrné JavaScripty s parametrem --app=", function() {
		var app = grunt.option("app");
		if (app) {
			grunt.config.set("file", i3Conf[app].file);
			grunt.config.set("dir", i3Conf[app].dir);
			// Používat přímo čistě proměné v konfiguraci Gruntu nejde, proto se to musí provést zde.
			grunt.config.merge({
				jshint: {
					i3s: {
						src: i3Conf[app].jsfiles
					}
				},
				concat: {
					i3s: {
						src: i3Conf[app].jsfiles
					}
				}
			});
			grunt.task.run(["jshint:i3s", "concat:i3s", "copy:i3s", "uglify:i3s"]);
		} else {
			grunt.log.error("Nebyl zadán parametr: --app=");
		}
	});
	/**
	 * @name Spuštění úlohy pro web INTERPI
	 * @example grunt interpiweb
	 */
	grunt.registerTask("interpiweb", "Spuštění úloh pro web interpi", function() {
		grunt.task.run(["prettier:interpiweb", "dart-sass:interpiweb", "jsbeautifier:interpiweb", "jshint:interpiweb"]);
	});
	/**
	 * @name Spuštění úlohy pro INTERPI
	 *  @example grunt interpi
	 */
	grunt.registerTask("interpi", "Spuštění úloh pro INTERPI", function() {
		var app = "interpi";
		grunt.config.set("file", i3Conf[app].file);
		grunt.config.set("dir", "interpi/aplikace");
		var version = getVersionFromFile("interpi/aplikace", i3Conf[app].file);
		if (version !== "none") {
			grunt.config.set("version", version);
			grunt.log.oklns(version);
		} else {
			grunt.log.errorlns("Chybí soubor version.js");
			grunt.config.set("version", i3Conf[app].dir);
		}
		grunt.config.merge({
			jshint: {
				interpi: {
					src: i3Conf[app].jsfiles
				}
			},
			concat: {
				interpi: {
					src: i3Conf[app].jsfiles
				}
			},
			compress: {
				interpi: {
					files: [{
						src: i3Conf[app].packet
					}]
				}
			}
		});
		grunt.task.run(["prettier:interpi", "dart-sass:interpi", "jsbeautifier:interpi", "jshint:interpi", "concat:interpi", "copy:interpi", "uglify:interpi", "compress:interpi"]);
	});
	/**
	 * @name Spuštění úlohy pro INTERPIUM
	 * @example grunt interpium
	 */
	grunt.registerTask("interpium", "Spuštění úloh pro INTERPIUM", function() {
		var app = "interpium";
		grunt.config.set("file", i3Conf[app].file);
		grunt.config.set("dir", "interpi/aplikace");
		var version = getVersionFromFile("interpi/aplikace", i3Conf[app].file);
		if (version !== "none") {
			grunt.config.set("version", version);
			grunt.log.oklns(version);
		} else {
			grunt.log.errorlns("Chybí soubor version.js");
			grunt.config.set("version", i3Conf[app].dir);
		}
		grunt.config.merge({
			jshint: {
				interpium: {
					src: i3Conf[app].jsfiles
				}
			},
			concat: {
				interpium: {
					src: i3Conf[app].jsfiles
				}
			},
			compress: {
				interpium: {
					files: [{
						src: i3Conf[app].packet
					}]
				}
			}
		});
		grunt.task.run(["prettier:interpium", "dart-sass:interpium", "jsbeautifier:interpium", "jshint:interpium", "concat:interpium", "copy:interpium", "uglify:interpium", "compress:interpium"]);
	});
};