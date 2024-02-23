/**
 * @file Konfigurační soubor stránky Rozesílání emailů
 * @see https://cosmo2/wiki/index.php/Ipac/upsendemail
 * @tutorial form
 * <du>2</du> 
 */
let a = document.getElementById("ipac").getAttribute("data-cachebuster");
var cb = a ? ".v-" + a : "";
require.config({
	"baseUrl": document.getElementById("ipac").getAttribute("data-url") + "js/",
	"paths": {
		"bootstrap": "lib/bootstrap4/bootstrap.bundle.min" + cb,
		"jquery": "lib/jquery/jquery.min" + cb
	},
	"shim": {
		"bootstrap": ["jquery"]
	}
});

require([
	"jquery",
	"bootstrap",
	"conf.main" + cb
], function($) {
	require(["jquery", "fv"], function($, FormValidation) {
		FormValidation.formValidation(document.getElementById(require.s.contexts._.config.fvid), {
			plugins: {
				mandatoryIcon: new FormValidation.plugins.MandatoryIcon({
					icon: "icon-required"
				}),
				declarative: new FormValidation.plugins.Declarative({
					html5Input: true
				}),
				aria: new FormValidation.plugins.Aria(),
				defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
				trigger: new FormValidation.plugins.Trigger({
					event: "blur"
				}),
				bootstrap: new FormValidation.plugins.Bootstrap({
					rowSelector: ".fv-row"
				}),
				icon: new FormValidation.plugins.Icon()
			}
		});
	});
});