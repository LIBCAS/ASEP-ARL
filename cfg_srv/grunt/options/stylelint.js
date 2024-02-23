/**
 * Validátor SASS šablon
 * Kontroluje zápis SASS šablon, upozorňuje za chyby, duplicity a styl zápisu.
 * Dále se používá standardní sdílená konfigurace pro stylelint (stylelint-config-standard)
 * @module stylelint
 * @see https://stylelint.io/user-guide/rules/list
 * @see https://maximgatilin.github.io/stylelint-config/
 * @see https://www.kutac.cz/weby-a-vse-okolo/stylelint-uhledne-a-ciste-css
 * @see https://www.vzhurudolu.cz/prirucka/stylelint
 * @see https://github.com/stylelint/stylelint-config-standard
 * @param {string} dir - Název adresáře I3 aplikace
 * @param {string} ictx - Ictx zákazníka
 * @property i3app - Kontrola stylopisu SASS šablon pro i3 aplikaci
 * @property i3appEpca - Kontrola stylopisu SASS šablon pro 
 * @property ictx - Kontrola stylopisu zákaznických SASS šablon pro IPAC
 * @property interpiweb - Kontrola stylopisu SASS šablon pro web INTERPI
 * @property ipac - Kontrola stylopisu SASS šablon pro IPAC
 * @property ipacu - Kontrola stylopisu všech zákaznických SASS šablon pro IPAC
 * @property options - globální nastavení pro všechny
 */

module.exports = {
	options: {
		failOnError: false, // Při nalezení chyby pokračovat
		syntax: "scss",
		fix: true,
		formatter: "verbose",
		configFile: "config/.stylelintrc"
	},
	i3app: {
		src: ["../csp-dir-i3/<%= grunt.config.get('dir') %>/*.scss", "../csp-dir-i3/etc/user.scss", "../csp-dir-i3/icons/icons.scss", "../csp-dir-i3/icons/extupdate.scss", "../csp-dir-i3/icons/main.scss", "../csp-dir-i3/etc/FileUpload/FileUploadField.scss", "../csp-dir-i3/RTL/src/resources/css/extjs_rtl.css"],
		options: {
			outputFile: "temp/stylelint/<%= grunt.config.get('dir') %>.log"
		}
	},
	i3appEpca: {
		src: ["../csp-dir-i3/<%= grunt.config.get('dir') %>/config_<%= grunt.config.get('ictx') %>/*.scss", "../csp-dir-i3/<%= grunt.config.get('dir') %>/sass/*.scss"],
		options: {
			outputFile: "temp/stylelint/i3appEpca.log"
		}
	},
	ictx: {
		src: ["../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/*.scss", "../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/bskin1/*.scss", "../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/bskin2/*.scss"],
		options: {
			outputFile: "temp/stylelint/ipac-<%= grunt.config.get('ictx') %>.log"
		}
	},
	interpiweb: {
		src: ["../csp-dir-i3/interpi/_backup/sass/*.scss", "../csp-dir-i3/interpi/_backup/sass/skin/*.scss"],
		options: {
			outputFile: "temp/stylelint/interpiweb.log"
		}
	},
	ipac: {
		src: ["../sass/bskin1/*.scss", "../sass/*.scss"],
		options: {
			outputFile: "temp/stylelint/ipac.log"
		}
	},
	ipacu: {
		src: ["../csp-dir/user/*/_backup/sass/bskin1/*.scss"],
		options: {
			outputFile: "temp/stylelint/ipac-u.log"
		}
	}
};