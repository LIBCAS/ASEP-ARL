/**
 * @file Konfigurační soubor stránky CAV Rules
 * @see https://cosmo2/wiki/index.php/Ipac/cavrules
 * <du>2</du> 
 */
let a = document.getElementById("ipac").getAttribute("data-cachebuster");
var cb = a ? ".v-" + a : "";
require.config({
	"baseUrl": document.getElementById("ipac").getAttribute("data-url") + "js/",
	"paths": {
		"bootstrap": "lib/bootstrap4/bootstrap.bundle.min" + cb,
		"jquery": "lib/jquery/jquery.min" + cb,
		"jquerymigrate": "lib/jquery/jquery-migrate.min" + cb
	},
	"shim": {
		"jquerymigrate": ["jquery"],
		"bootstrap": ["jquery"]
	}
});

require([
	"jquery",
	"jquerymigrate",
	"bootstrap",
	"conf.main" + cb
], function($) {
	$(document).ready(function() {
		$(window).bind("hashchange", function() {
			$("*").removeClass("highlight");
			$(document.location.hash).addClass("highlight");
		});
		if (document.location.hash) {
			$(document.location.hash).addClass("highlight");
			$(document.location.hash).on("click focus hover", function(e) {
				$(this).removeClass("highlight");
			});
		}
	}).trigger("hashchange");
});