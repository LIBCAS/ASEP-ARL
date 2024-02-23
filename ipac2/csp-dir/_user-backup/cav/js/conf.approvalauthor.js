/**
 * @file Konfigurační soubor stránky 
 * @see https://cosmo2/wiki/index.php/Ipac/approvalauthor
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
		// Lightbox pro zobrazení obrázků do nového okna
		if ($('*[data-toggle="lightbox"]').length) {
			require(["jquery", "jquerymigrate", "bootstrap", "lightbox"], function($) {
				$(document).on("click", '[data-toggle="lightbox"]', function(e) {
					e.preventDefault();
					$(this).ekkoLightbox();
				});
			});
		}
	});
});