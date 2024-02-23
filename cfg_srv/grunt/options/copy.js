/**
 * Zkopíruje soubory a složky jiné místo
 * @module copy
 * @see https://github.com/gruntjs/grunt-contrib-copy
 * @param {string} dir - Název adresáře  I3 aplikace
 * @param {string} file - Název souboru bez přípony
 * @param {string} file2 - Název druhého souboru bez přípony
 * @param {string} ictx - Ictx zákazníka
 * @property i3app - Vytvoření kopie kde jsou JS nezkomprimované, slouží jen pro kontrolu
 * @property i3appEpcaD -
 * @property i3s - Vytvoření kopie podpůrných JavaScriptů I3 aplikace 
 * @property ictx - Vytvoření kopie zákaznických JS v IPACu a zkopírování do dočasné složky, ze které se budou komprimovat.
 * @property interpi -
 * @property interpium -
 * @property ipac - 
 */
module.exports = {
	i3app: {
		src: "../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file %>.js",
		dest: "../csp-dir-i3/<%= grunt.config.get('dir') %>/build/<%= file %>-uncompressed.js"
	},
	i3appEpcaD: {
		src: "../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file2 %>.js",
		dest: "../csp-dir-i3/<%= grunt.config.get('dir') %>/build/<%= file2 %>-uncompressed.js"
	},
	i3s: {
		src: "../csp-dir-i3/build/<%= file %>.js",
		dest: "../csp-dir-i3/build/<%= file %>-uncompressed.js"
	},
	ictx: {
		expand: true,
		cwd: "../csp-dir/user/<%= grunt.config.get('ictx') %>/",
		src: ["js/*.js", "js/app/*", "js/lib/*", "js/lib/*/*", "js/lib/*/*/*", "css/*"],
		dest: "temp/_copy/<%= grunt.config.get('ictx') %>/",
		// Aby akceptoval soubory, které mají v názvu tečku
		extDot: "last"
	},
	interpi: {
		src: "../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file %>.js",
		dest: "../csp-dir-i3/interpi/build/uncompressed.js"
	},
	interpium: {
		src: "../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file %>.js",
		dest: "../csp-dir-i3/interpium/build/uncompressed.js"
	},
	ipac: {
		expand: true,
		cwd: "../csp-dir/",
		src: ["js/*.js", "js/app/*", "js/lib/*", "js/lib/*/*", "js/lib/*/*/*", "js/lib/*/*/*/*", "js/lib/*/*/*/*/*", "css/*"],
		dest: "temp/_copy/ipac/",
		// Aby akceptoval soubory, které mají v názvu tečku
		extDot: "last"
	}
};