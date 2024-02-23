/**
 * Generovaná dokumentace ze SASS šablon
 * @module sassdoc
 * @see http://sassdoc.com/annotations/
 * @param {string} dir - Název adresáře
 * @property ictx - Dokumentace SASS šablon IPACu vybraného zákazníka
 * @property i3app - Dokumentace SASS šablon zvolené I3 aplikace
 * @property ipac - Dokumentace SASS šablon pro IPAC
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	ictx: {
		src: ["../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/*"],
		options: {
			dest: "../temp/sassdoc/<%= grunt.config.get('ictx') %>/",
			title: "Dokumentace SASS pro <%= grunt.config.get('ictx') %>",
			config: "config/ictx-sassdoc.json"
		}
	},
	i3app: {
		src: ["../csp-dir-i3/<%= grunt.config.get('dir') %>/*.scss", "../csp-dir-i3/<%= grunt.config.get('dir') %>/sass/*.scss"],
		options: {
			dest: "../temp/sassdoc/<%= grunt.config.get('dir') %>/",
			title: "Dokumentace SASS pro <%= grunt.config.get('dir') %>",
			config: "config/i3app-sassdoc.json"
		}

	},
	ipac: {
		src: ["../sass/bskin1/*.scss", "../sass/*.scss"],
		options: {
			config: "config/ipac-sassdoc.json"
		}
	},
	ipacu: {
		src: ["../csp-dir/user/*/_backup/sass/*"],
		options: {
			dest: "../temp/sassdoc/users-ipac/",
			title: "Dokumentace SASS pro IPACy všešch zákazníků",
			config: "config/ictx-sassdoc.json"
		}
	}
};