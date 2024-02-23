/**
 * Sloučí soubory do jednoho
 * @module concat
 * @see https://github.com/gruntjs/grunt-contrib-concat
 * @param {string} dir - Název adresáře I3 aplikace
 * @param {string} file - Název souboru bez přípony
 * @property formvalidation - Vytvoření knihovny formvalidation - zatím nepoužito
 * @property i3app - Sloučení souborů pro I3 aplikaci
 * @property i3appEpcaD - Sloučení souborů pro I3 aplikaci EPCA Designer
 * @property i3s - Sloučení podpůrných JavaScriptů I3 aplikace 
 * @property interpi - Sloučení souborů pro I3 aplikaci INTERPI
 * @property interpium - Sloučení souborů pro I3 aplikaci INTERPIUM
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	options: {},
	formvalidation: {
		src: ["../csp-dir/js/lib/formvalidation/o/FormValidation.full.js", "../csp-dir/js/lib/formvalidation/o/plugins/Bootstrap.js", "../csp-dir/js/lib/formvalidation/o/plugins/J.js", "../csp-dir/js/lib/formvalidation/o/plugins/MandatoryIcon.js", "../csp-dir/js/lib/formvalidation/o/plugins/Recaptcha.js", "../csp-dir/js/lib/formvalidation/o/locales/sk_SK.js", "../csp-dir/js/lib/formvalidation/o/locales/en_US.js", "../csp-dir/js/lib/formvalidation/o/locales/cs_CZ.js"],
		dest: "temp/babel/formvalidation/formvalidation.js"
	},
	i3app: {
		dest: "../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file %>.js"
	},
	i3appEpcaD: {
		dest: "../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file2 %>.js"
	},
	i3s: {
		dest: "../csp-dir-i3/build/<%= file %>.js"
	},
	interpi: {
		dest: "../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file %>.js"
	},
	interpium: {
		dest: "../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file %>.js"
	}
};