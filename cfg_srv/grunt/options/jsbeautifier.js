/**
 * Hezky přeformátuje kód JavaScriptu
 * @module jsbeautifier
 * @see https://github.com/vkadam/grunt-jsbeautifier
 * @param {string} dir - Název adresáře  I3 apliakce
 * @param {string} ictx - Ictx zákazníka
 * @property gruntfile - Přeformátování všech JS Gruntu
 * @property i3app - Přeformátování JS pro i3 aplikace
 * @property ictx - Přeformátování JS pro IPAC zakaznika
 * @property interpi - 
 * @property interpium -
 * @property interpiweb - 
 * @property ipac - Přeformátování JS pro IPAC
 * @property ipacu - Přeformátování všech zákaznických JS pro IPAC
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	options: {
		config: "config/.jsbeautifyrc"
	},
	gruntfile: {
		options: {
			js: {
				indentChar: "\t",
				indentSize: 4,
				indentWithTabs: true
			}
		},
		src: ["Gruntfile.js", "options/*.js", "config/*.", "config/jsdoc/*.json", "!config/README.md"]
	},
	i3app: {
		// Olda formátuje jinak
		options: {
			js: {
				commaFirst: false,
				endWithNewline: true,
				indentChar: " ",
				indentLevel: 0,
				indentSize: 4,
				indentWithTabs: false,
				preserveNewlines: false,
				selectorSeparator: " ",
				selectorSeparatorNewline: false,
				spaceInParen: false
			}
		},
		src: ["../csp-dir-i3/<%= grunt.config.get('dir') %>/*.js", "../csp-dir-i3/*.js"]
	},
	ictx: {
		src: ["../csp-dir/user/<%= grunt.config.get('ictx') %>/js/conf*.js", "../csp-dir/user/<%= grunt.config.get('ictx') %>/js/app/*.js"]
	},
	interpi: {
		// Olda formátuje jinak
		options: {
			js: {
				indentSize: 2,
				indentWithTabs: false
			}
		},
		src: ["../csp-dir-i3/interpi/aplikace/*.js"]
	},
	interpium: {
		// Olda formátuje jinak
		options: {
			js: {
				indentSize: 2,
				indentWithTabs: false
			}
		},
		src: ["../csp-dir-i3/interpi/aplikace/*.js"]
	},
	interpiweb: {
		src: ["../csp-dir-i3/interpi/js/*.js"]
	},
	ipac: {
		src: ["../csp-dir/js/conf*.js", "../csp-dir/js/app/*.js", "../csp-dir/js/test/*.js"]
	},
	pwa: {
		src: ["../csp-dir/js/pwa.js", "../webroot/service-worker.js", "../csp-dir/js/pwainstall.js"]
	},
	ipacu: {
		src: ["../csp-dir/user/*/js/conf*.js", "../csp-dir/user/*/js/app/*.js"]
	}
};