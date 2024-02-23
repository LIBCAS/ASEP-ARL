/**
 * Kontrola zápisu JavaScriptu s exportem do HTML souboru
 * @module jsonlint
 * @see https://www.npmjs.com/package/grunt-jsonlint
 * @property gruntfile - Gruntfile soubory
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	gruntfile: {
		src: ["options/*.json", "config/*.json", "config/.jsbeautifyrc", "config/.stylelintrc", "config/jsdoc/*.json"]
	}
};