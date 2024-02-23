/**
 * Minifikovat JS soubory pomocí UglifyJS
 * @module uglify
 * @see https://github.com/gruntjs/grunt-contrib-uglify
 * @param {string} dir - Název adresáře
 * @param {string} file - Název souboru bez přípony
 * @param {string} file2 - Název druhého souboru bez přípony
 * @param {string} ictx - Ictx zákazníka
 * @property i3app - Minifikovat JS soubory pro i3 aplikaci
 * @property i3appEpcaD - Minifikovat JS soubory pro i3 aplikaci EPCA Designer
 * @property i3s -  Minifikace podpůrných JavaScriptů I3 aplikace 
 * @property ictx - Minifikovat JS soubory zákazníka pro IPAC
 * @property interpi - Minifikovat JS soubory pro i3 aplikaci INTERPI
 * @property interpium - Minifikovat JS soubory pro i3 aplikaci INTERPIUM
 * @property ipac - Minifikovat JS soubory pro IPAC
 */
module.exports = {
	i3app: {
		files: {
			"../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file %>.js": ["../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file %>.js"]
		}
	},
	i3appEpcaD: {
		files: {
			"../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file2 %>.js": ["../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file2 %>.js"]
		}
	},
	i3s: {
		files: {
			"../csp-dir-i3/build/<%= file %>.js": ["../csp-dir-i3/build/<%= file %>.js"]
		}
	},
	ictx: {
		files: [{
			expand: true,
			cwd: "temp/_copy/<%= grunt.config.get('ictx') %>/js/",
			src: ["*.js", "app/*.js"],
			dest: "temp/dist/<%= grunt.config.get('ictx') %>/js/",
			ext: ".js",
			// Aby akceptoval soubory, které mají v názvu tečku
			extDot: "last"
		}]
	},
	interpi: {
		files: {
			"../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file %>.js": ["../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file %>.js"]
		}
	},
	interpium: {
		files: {
			"../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file %>.js": ["../csp-dir-i3/<%= grunt.config.get('dir') %>/<%= file %>.js"]
		}
	},
	ipac: {
		files: [{
			expand: true,
			cwd: "temp/_copy/ipac/js/",
			src: ["*.js", "app/*.js", "lib/*.js", "!lib/moment/*.js", "!lib/moment/*/*.js"],
			dest: "temp/dist/ipac/js/",
			ext: ".js",
			// Aby akceptoval soubory, které mají v názvu tečku
			extDot: "last"
		}]
	}
};