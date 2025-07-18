/**
 * @file Konfiguracn?soubor str?ky administrace u?ivatelu
 * @see https://cosmo2/wiki/index.php/Ipac/usersadmin
 */
let a = document.getElementById("ipac").getAttribute("data-cachebuster");
var cb = a ? ".v-" + a : "";
require.config({
	"paths": {
		"jquery": "lib/jquery/jquery.min" + cb
	}
});

require([
	"jquery",
	"conf.main" + cb
], function($) {
	$(document).ready(function() {
		require(["jquery", "bootstrap", "ipactable"], function($) {
			const $tables = $("table.jstable, .deleted-users-table");

			// Inicializace tabulek
			$tables.ipacTable();

			// Reinitializace modalShow pluginu po každém překreslení
			$tables.on("post-body.bs.table", function () {		
				$(this).find("a.modal-show").each(function () {
					// Přeskočí, pokud už je modal inicializován (má třeba data-modal-item)
					if (!$(this).attr("data-modal-item")) {
						$(this).modalShow();
					}
				});
			});	

			$(document).on('hidden.bs.modal', function () {
				$('.modal-backdrop').remove(); // Odstraní pozadí
				$('body').removeClass('modal-open'); // Odblokuje scrollování
			});			
		});
	});
});
