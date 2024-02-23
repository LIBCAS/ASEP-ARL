/*
 * @file Konfigurační soubor stránky Výsledky vyhledávání
 * @see https://cosmo2/wiki/index.php/Ipac/result
 * https://bootbites.com/demos/bootstrap4-sticky-navbar/
 * <du>1</du>
 */
let a = document.getElementById("ipac").getAttribute("data-cachebuster");
var cb = a ? ".v-" + a : "";
require.config({
	"baseUrl": document.getElementById("ipac").getAttribute("data-url") + "js/",
	"paths": {
		"facets": "app/facets" + cb,
		"jquery": "lib/jquery/jquery.min" + cb,
		"jquerymigrate": "lib/jquery/jquery-migrate.min" + cb,
		"resultbody": "../user/cav/js/app/resultbody" + cb,
	},
	"shim": {
		"facets": ["jquery"],
		"jquerymigrate": ["jquery"],
		"resultbody": ["jquery"]
	}
});
require([
	"jquery",
	"jquerymigrate",
	"conf.main" + cb
], function($) {

	$(document).ready(function() {
		require(["jquery", "affix"]);

		// Facebook
		try {
			if ($("#ipac").data("cookie-marketing") == "1") {
				require(["fb"]);
			}
		} catch (error) {
			console.error(error);
			console.log("Incognito mode. Facebook is deactivated.");
		}

		if ($(".openseadragon").length) {
			//  @doc https://openseadragon.github.io/docs/OpenSeadragon.html#.Options
			require(["jquery", "jquerymigrate", "jsrender", "openseadragon", "osd"], function($) {
				$(".openseadragon").ipacOsd({
					lang: language2
				});
			});
		}
		// Práce se stránku result
		require(["jquery", "bootstrap", "resultbody"], function($) {
			$("#result-body").resultBody({
				pageid: "result",
				shortnoactivetab: true
			});
		});

		require(["jquery", "ipacmodal"], function($) {
			$(".modal-show").modalShow();
			$(".modal-ajax").modalAjax();
		});

		/* Posunout stránku */
		/* TODO: získat barvu používanou pro zvýrazňovač dočasným vytvořením elementu */
		// var sHighlight = $("<em class="highlight"></em>").css("background-color");
		/* Získat ID záznamu ze kterého se uživatel vrátil na stránku výsledky vyhledávání */
		var sItem = "#item-" + $.trim($("#result-body").data("from-item"));
		/* a pokud se záznam na stránce nachází */
		if ($(sItem).length) {
			$(sItem).animate({
				backgroundColor: "#FFFF00"
			}, "slow").hover(function() {
				$(this).animate({
					backgroundColor: "transparent"
				}, "slow");
			});
		} else {
			if ($("#bside").length) {
				$("html, body").animate({
					scrollTop: $("#bside").offset().top
				}, 1, "swing");
			}
		}
		// Fazety
		if ($("#facetbox").length) {
			require(["jquery", "jquerymigrate", "bootstrap", "jquery-ui", "jsrender", "jsviews", "facets"], function($) {
				if ($("#facetbox.ajaxactive").length) {
					$("#facetbox").html(`<div class="loading">${$("#facetbox.ajaxactive").data("text")}<br/><div class="ipac-loading"><span class="icon-loading" aria-hidden="true"></span></div></div>`);
					$.ajax({
							url: $("#facetbox.ajaxactive").data("ajax"),
							async: true,
							cache: false
						})
						.done(function(html) {
							$("#facetbox").html(html);
							$("#facets .card").facets();
							// Nastavení rozsahu datumu
							$(".rangeslider").facetSlider();
						});
				} else {
					$("#facets .card").facets();
					// Nastavení rozsahu datumu
					$(".rangeslider").facetSlider();
				}
			});
		}
		// Znovunačtení tabulky zdrojů
		if ($("#mr-sources-table").length) {
			require(["jquery", "jquerymigrate", "app/refresh-source"], function($) {
				$("#mr-sources-table").refreshSource({
					refreshURL: window.location.href + "&" + "st=ajax&" + $("#mr-sources-table").data("query")
				});
			});
		}
		// Kalendář
		if ($(".date").length) {
			require(["jquery", "jquerymigrate", "datepicker_lang", "datepicker", "clearable"], function($) {
				$(".form-group .date input").each(function() {
					var dateFormat = $(this).data("format");
					$(this).datepicker({
						firstDayOfWeek: 1,
						gainFocusOnConstruction: false,
						inputFormat: [dateFormat],
						markup: "bootstrap4",
						outputFormat: dateFormat
					});
				});
			});
		}
	});
});