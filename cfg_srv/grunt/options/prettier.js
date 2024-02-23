/**
 * Hezky přeformátuje kód SASS šablon
 * @module prettier
 * @see https://github.com/poalrom/grunt-prettier
 * @param {string} dir - Název adresáře I3 aplikace
 * @param {string} ictx - Ictx zákazníka
 * @property i3app - Přeformátování kódu SASS šablon pro i3 aplikaci 
 * @property i3appEpca - Přeformátování kódu SASS šablon pro i3 aplikaci EPCA 
 * @property ictx - Přeformátování kódu SASS šablon vybraného zákazníka pro IPAC
 * @property interpi - Přeformátování kódu SASS šablon pro i3 aplikaci INTERPI
 * @property interpium - Přeformátování kódu SASS šablon pro i3 aplikaci INTERPIUM
 * @property interpiweb - Přeformátování kódu SASS šablon pro web INTERPI
 * @property ipac - Přeformátování kódu SASS šablon pro IPAC
 * @property ipacu - Přeformátování kódu všech zákaznických SASS šablon pro IPAC
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	options: {
		useTabs: true,
		tabWidth: 4,
		parser: "scss",
		semi: true,
		prettier: "config/.prettierrc"
	},
	i3app: {
		src: ["../csp-dir-i3/<%= grunt.config.get('dir') %>/*.scss", "../csp-dir-i3/etc/user.scss", "../csp-dir-i3/icons/icons.scss", "../csp-dir-i3/icons/extupdate.scss", "../csp-dir-i3/icons/main.scss", "../csp-dir-i3/etc/FileUpload/FileUploadField.scss", "../csp-dir-i3/RTL/src/resources/css/extjs_rtl.css"]
	},
	i3appEpca: {
		src: ["../csp-dir-i3/<%= grunt.config.get('dir') %>/config_<%= grunt.config.get('ictx') %>/*.scss", "../csp-dir-i3/<%= grunt.config.get('dir') %>/sass/*.scss"]
	},
	ictx: {
		src: ["../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/*.scss", "../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/*/*.scss"]
	},
	interpi: {
		src: ["../csp-dir-i3/interpi/aplikace/*.scss", "../csp-dir-i3/interpi/aplikace/skin/*.scss"]
	},
	interpium: {
		src: ["../csp-dir-i3/interpi/aplikace/*.scss", "../csp-dir-i3/interpi/aplikace/skin/*.scss"]
	},
	interpiweb: {
		src: ["../csp-dir-i3/interpi/_backup/sass/*.scss", "../csp-dir-i3/interpi/_backup/sass/skin/*.scss"]
	},
	ipac: {
		src: ["../sass/bskin1/*.scss", "../sass/*.scss"]
	},
	pwa: {
		src: ["../sass/skin/pwa/*.scss", "../sass/pwa.scss"]
	},
	ipacu: {
		src: ["../csp-dir/user/*/_backup/sass/*.scss", "../csp-dir/user/*/_backup/sass/*/*.scss", "../csp-dir/user/*/_backup/sass/*/*/*.scss"]
	}
};