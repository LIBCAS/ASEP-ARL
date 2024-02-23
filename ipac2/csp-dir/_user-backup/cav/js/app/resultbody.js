/**
 * @file Práce s výsledky vyhledávání i v košíku a detailu.
 * <du>2</du>
 * Citace PRO  - zakomentováno
 * Přidána vlastní funkce pro mazání cavdelete
 * @function $.fn.resultBody
 * @param {object} defaults - Výchozí nastavení
 * @param {object} options - Externí nastavení
 * @param {object} settings - Vnitřní nastavení
 * @example $("#result-body").resultBody({pageid: "detail"});
 * @example $("#result-body").resultBody({pageid: "result"});
 * @example $("#result-body").resultBody({pageid: "basket"});

 */
(function($) {
	"use strict";

	$.fn.resultBody = function(options = {}) {

		const defaults = {
			/// @param {bool} debug - zobrazení ladicích informací
			debug: false,
			/// @param {object} lightboxOpt - Vlastní nastavení pro ekkoLightbox
			lightboxOpt: {},
			/// @param {string} pageid - id stránky pro nastavení odlišné konfigurace
			pageid: ""
		};

		var settings = $.extend({}, defaults, options);

		var oThis = $(this);

		require(["clipboard", "jquery", "jquerymigrate", "bootstrap", "jsrender", "jsviews", "ipacmodal"], function(ClipboardJS, $) {
			$('[data-toggle="popover"]').popover();

			// Volání modálního okna ajaxem pokud je uživatel přihlášen: rezervace
			$(oThis).find(".reservation a, a.reservation").modalAjax({
				debug: settings.debug,
				login: 1,
				type: "request"
			});
			// Volání modálního okna ajaxem pokud je uživatel přihlášen: vybrané dokumenty
			$(oThis).find(".mydoc a").modalAjax({
				debug: settings.debug,
				login: 1,
				type: "mydoc"
			});

			// Volání modálního okna ajaxem: bookmark
			$(oThis).find(".bookmark a").modalAjax({
				debug: settings.debug,
				type: "bookmark"
			});

			// Volání modálního okna ajaxem: slideshow, kalednář, Kontakt na pobočku
			$(oThis).find("a.slideshow, .icalendar a, a.contact").modalAjax();

			// Volání modálního okna ajaxem: Mapa fondu
			$(oThis).find(".mfond a, a.mfond").modalAjax({
				debug: settings.debug,
				type: "ajax"
			});

			// Volání modálního okna: Trvalý odkaz + kopírování URL
			$(oThis).find(".permalink a").each(function() {
				var tplpermalink = $.templates("#tpl-permalink");
				var datap = {
					"href": $(this).attr("href"),
					"title": $(this).attr("data-title")
				};
				$(this).modalShow({
					debug: settings.debug,
					name: $("#tpl-permalink").attr("title"),
					ClipboardJS: ClipboardJS,
					type: "permalink",
					body: tplpermalink.render(datap)
				});
			});

			// Volání modálního okna: Formulář pro přejítí na stránku
			var tplskip = $.templates("#tpl-skip-page");
			$(".skip-page a").modalShow({
				debug: settings.debug,
				name: $("#tpl-skip-page").attr("title"),
				type: "skip-page",
				body: tplskip.render()
			});

			// Lightbox pro zobrazení obrázků do nové vrstvy
			if (($(oThis).find('.result-item *[data-toggle="lightbox"]').length) || ($(oThis).find("#gallery li a").length)) {
				require(["jquery", "jquerymigrate", "bootstrap", "lightbox"], function($) {
					$(oThis).on("click", '[data-toggle="lightbox"]', function(e) {
						e.preventDefault();
						$(this).ekkoLightbox(settings.lightboxOpt);
					});
				});
			}
		});
		// Hodnocení
		if ($(oThis).find("a.comment-popup").length) {
			require(["jquery", "jquerymigrate", "bootstrap", "jsrender", "jsviews", "ipacmodal"], function($) {
				if (settings.pageid !== "detail") {
					$(oThis).find("li a.comment-popup").modalAjax({
						debug: settings.debug
					});
				}
			});
		}
		// Tagování - štítky
		if ($(oThis).find(".tag-list").length) {
			require(["jquery", "jquerymigrate", "bootstrap", "jsrender", "jsviews", "tagging", "ipacmodal"], function($) {
				$(oThis).find("li a.tagging-dialog").modalAjax(settings);
				$(".tag-edit-trigger").click(function(e) {
					e.preventDefault();
					$(this).closest(".result-item").find(".tagging-dialog").trigger("click");
					return false;
				});
			});
		}

		// Po kliku na záložku odporúčanej literatúry
		$(this).find(".recommend-trigger").click(function(e) {
			var oThis1 = $(this);
			require(["jquery", "jquerymigrate", "bootstrap", "recommend"], function($) {
				$(oThis1).closest("li.result-item").find(".recommend-content").recommendLoader();
			});
		});

		// Přidat / odebrat z  košíku
		require(["jquery", "bootstrap", "basket"], function($) {
			if (settings.pageid == "basket") {
				$(oThis).find("li.basket, p.basket, div.basket, h2 span.basket").getBasket({
					debug: settings.debug,
					bDelete: 1
				});
			} else {
				$(oThis).find("li.basket, p.basket, div.basket, h2 span.basket").getBasket({
					debug: settings.debug
				});
			}
		});

		// Citace PRO
		/*
		if ($(this).find(".citace-pro").length) {
			require(["jquery", "citacepro"], function($) {
				$(oThis).find(".citace-pro").getCitacePro({
					debug: settings.debug,
					autoload: 1
				});
			});
		}
		*/

		// Citace OKCZ
		if ($(this).find(".citace-okcz").length) {
			require(["jquery", "citaceokcz"], function($) {
				$(oThis).find(".citace-okcz").getCitaceOkcz({
					debug: settings.debug,
					autoload: 1
				});
			});
		}

		// Označení zdroje obálek
		$(oThis).find("li.result-item").each(function() {
			if ($(this).find(".img a.obalkyknih").length) {
				$(this).addClass("obalkyknih");
			} else if ($(this).find(".img a.martinus").length) {
				$(this).addClass("martinus");
			}
		});

		// Odkaz na záložku v ZF přes URL
		require(["jquery", "jquerymigrate", "bootstrap"], function($) {
			var hash = document.location.hash.toString();
			var prefix = "tab-";
			if (hash) {
				hash = hash.replace(prefix, "");
				var hashPieces = hash.split("?");
				var activeTab = $("#result-body .nav-tabs a[href=" + hashPieces[0] + "]");
				if (activeTab) {
					activeTab.tab("show");
				}
			} else {
				// První záložku označit jako aktivní
				$("#result-body .nav-tabs").each(function() {
					$(this).find("a:first").tab("show");
				});
			}
			$("#result-body .nav-tabs").each(function() {
				$(this).find("a").on("shown", function(e) {
					window.location.hash = e.target.hash.replace("#", "#" + prefix);
				});
			});
			// JS odkaz na záložku
			$(".jslinktab").each(function() {
				$(this).click(function(e) {
					e.preventDefault();
					$('#result-body .nav-tabs a[href="' + $(this).attr("href") + '"]').tab("show");
					return false;
				});
			});
			// Aktivovat první záložku v ZF
			if ($("#detail").length) {
				$(".result-item ul.nav-tabs li:first, .result-item .tab-content .tab-pane:first").addClass("active");
			}
		});

		require(["jquery", "jquerymigrate", "ipactable"], function($) {
			//$(oThis).find(".zfTF2").ipacTable();
		});

		// Formulář pro přejítí na stránku
		if ($(".cavdelete a").length) {
			$(".cavdelete a").IpacDialog({
				type: "delete"
			});
		}
	};
}(jQuery));