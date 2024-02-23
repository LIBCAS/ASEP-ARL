/**
 * Komprimace souborů a adresářů
 * Zazipuje soubory a vytvoří balíčky.
 * @module compress
 * @see https://github.com/gruntjs/grunt-contrib-compress
 * @param {string} dir - Název adresáře I3 aplikace
 * @param {string} version - Verze I3 aplikace
 * @property i3app - Vytvoření ZIP balíčku pro zvolenou i3 aplikaci 
 * @property interpi - Vytvoření ZIP balíčku pro i3 aplikaci INTERPI
 * @property interpium - Vytvoření ZIP balíčku pro i3 aplikaci INTERPIUM
 */
module.exports = {
	i3app: {
		options: {
			// Místo uložení
			archive: "../csp-dir-i3/<%= grunt.config.get('dir') %>/build/<%= version %>.zip"
		},
		files: [{
			expand: true,
			cwd: "../csp-dir-i3/",
			dest: "../csp-dir-i3/"
		}]
	},
	interpi: {
		options: {
			archive: "../csp-dir-i3/interpi/build/<%= version %>.zip"
		},
		files: [{
			expand: true,
			cwd: "../csp-dir-i3/",
			dest: "../csp-dir-i3/"
		}]
	},
	interpium: {
		options: {
			archive: "../csp-dir-i3/interpium/build/<%= version %>.zip"
		},
		files: [{
			expand: true,
			cwd: "../csp-dir-i3/",
			dest: "/"
		}]
	}
};