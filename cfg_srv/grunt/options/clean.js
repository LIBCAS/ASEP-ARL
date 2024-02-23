/**
 * Mazání souborů a složek
 * Maže vygenerované soubory a adresáře, aby je bylo možné porovnat a kommitnout do SVN.
 * @module clean
 * @see https://github.com/gruntjs/grunt-contrib-clean
 * @property gruntfile - Smazat vygenerovanou JS dokumentace před znovuvytvořením
 * @property i3app - Vyčistit adresáře zvolené i3 aplikace od vygenerovaných souborů a adresářů
 * @property i3appEpca - Vyčistit adresář I3 aplikace EPCA od vygenerovaných souborů
 * @property i3clean - Smazat vygenerované soubory v I3 apliakcích
 * @property ipac - Vyčistit lokální adresář IPACu od nepotřebných souborů a adresář temp
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	options: {
		force: true
	},
	gruntfile: {
		src: ["temp/jsdoc/grunt/"]
	},
	i3app: {
		src: ["../csp-dir-i3/build/*uncompressed.js", "temp/jsdoc/<%= grunt.config.get('dir') %>/", "../csp-dir-i3/<%= grunt.config.get('dir') %>/build/*", "../csp-dir-i3/build/*.zip", "../csp-dir-i3/*/main.css", "../csp-dir-i3/build/*.html", "../csp-dir-i3/*/*/Thumbs.db", "../csp-dir-i3/*/Thumbs.db"]
	},
	i3appEpca: {
		src: ["../csp-dir-i3/epca/css/*", "../csp-dir-i3/epca/main.js", "../csp-dir-i3/epca/epcadesigner.js"]
	},
	i3clean: {
		src: ["../csp-dir-i3/epca/css/*.css", "../csp-dir-i3/*/main.js", "../csp-dir-i3/*/main.css", "../csp-dir-i3/*/*uncompressed.js", "../csp-dir-i3/etc/*.css", "../csp-dir-i3/*/build/", "../csp-dir-i3/build/*.js", "../csp-dir-i3/build/*.html"]
	},
	ipac: {
		src: ["../csp-dir/js/*.lib.js", "temp/jsdoc/ipac/", "temp/_copy/ipac/", "temp/sassdoc/ipac/", "../csp-dir/css/bskin1.css", "../csp-dir/user/*/css/*.css", "../csp-dir/s1/*/Thumbs.db", "../csp-dir/s1/*/*/Thumbs.db", "../csp-dir/img/*/Thumbs.db"]
	}
};