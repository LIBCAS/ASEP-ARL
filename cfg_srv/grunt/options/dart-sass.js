/**
 * Kompilace SASS šablon do CSS
 * @module dart-sass
 * @see https://github.com/gruntjs/grunt-contrib-sass
 * @see https://github.com/sindresorhus/grunt-sass
 * @see https://github.com/sass/node-sass
 * @param {string} dir - Název adresáře I3 aplikace
 * @param {string} ictx - Ictx zákazníka
 * @property arl - Kompilace SASS šablon pro ARL bez verzí IAPCu
 * @property i3app - Kompilace SASS šablon pro I3 aplikace
 * @property i3appEpca - Kompilace SASS šablon podle ictx
 * @property ictx - Kompilace SASS šablon pro IPAC v zákaznickém adresáři s výstupem mimo
 * @property ictx2 - Kompilace SASS šablon pro IPAC v zákaznickém adresáři s výstupem do adresáře zákazníka
 * @property interpi - Kompilace SASS šablon pro I3 aplikaci INTERPI
 * @property interpium - Kompilace SASS šablon pro I3 aplikaci INTERPIUM
 * @property interpiweb - Kompilace SASS šablon pro web INTERPI
 * @property ipac - Kompilace SASS šablon pro IPAC
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	options: {
		sourcemap: false,
		linefeed: "crlf",
		indentType: "tab",
		compass: false,
		outputStyle: "compressed"
	},
	arl: {
		files: {
			"../csp-dir/css/arlpage.css": ["../sass/arlpage.scss"],
			"../csp-dir/css/print.css": ["../sass/print.scss"],
			"../csp-dir/css/opensearch.css": ["../sass/opensearch.scss"],
			"../csp-dir/css/newreports.css": ["../sass/newreports.scss"],
			"../csp-dir/css/client.css": ["../sass/client.scss"]
		}
	},
	i3app: {
		files: [{
			expand: true,
			cwd: "../csp-dir-i3/<%= grunt.config.get('dir') %>/",
			src: ["*.scss"],
			dest: "../csp-dir-i3/<%= grunt.config.get('dir') %>/",
			ext: ".css"
		}, {
			"../csp-dir-i3/etc/user.css": "../csp-dir-i3/etc/user.scss"
		}]
	},
	i3appEpca: {
		files: [{
			expand: true,
			cwd: "../csp-dir-i3/<%= grunt.config.get('dir') %>/config_<%= grunt.config.get('ictx') %>/",
			src: ["*.scss"],
			dest: "../csp-dir-i3/<%= grunt.config.get('dir') %>/css/",
			ext: ".css"
		}]
	},
	ictx: {
		files: [{
			expand: true,
			cwd: "../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/",
			src: ["*.scss"],
			dest: "temp/<%= grunt.config.get('ictx') %>/css/",
			ext: ".css"
		}]
	},
	ictx2: {
		files: [{
			expand: true,
			cwd: "../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/",
			src: ["*.scss"],
			dest: "../csp-dir/user/<%= grunt.config.get('ictx') %>/css/",
			ext: ".css"
		}]
	},
	interpi: {
		files: {
			"../csp-dir-i3/<%= grunt.config.get('dir') %>/skin/aplikace.css": ["../csp-dir-i3/<%= grunt.config.get('dir') %>/skin/aplikace.scss"],
			"../csp-dir-i3/<%= grunt.config.get('dir') %>/user.css": ["../csp-dir-i3/<%= grunt.config.get('dir') %>/user.scss"]
		}
	},
	interpiweb: {
		files: {
			"../csp-dir-i3/interpi/css/main.css": ["../csp-dir-i3/interpi/_backup/sass/main.scss"]
		}
	},
	interpium: {
		files: {
			"../csp-dir-i3/<%= grunt.config.get('dir') %>/skin/aplikaceum.css": ["../csp-dir-i3/<%= grunt.config.get('dir') %>/skin/aplikaceum.scss"],
			"../csp-dir-i3/<%= grunt.config.get('dir') %>/user.css": ["../csp-dir-i3/<%= grunt.config.get('dir') %>/user.scss"]
		}
	},
	ipac: {
		files: {
			"../csp-dir/css/arlicons.css": ["../sass/arlicons.scss"],
			"../csp-dir/css/blackhole.css": ["../sass/blackhole.scss"],
			"../csp-dir/css/bskin1.css": ["../sass/bskin1.scss"],
			"../csp-dir/css/client.css": ["../sass/client.scss"],
			"../csp-dir/css/login.css": ["../sass/login.scss"],
			"../csp-dir/css/newreports.css": ["../sass/newreports.scss"],
			"../csp-dir/css/opensearch.css": ["../sass/opensearch.scss"],
			"../csp-dir/css/print-reports.css": ["../sass/print-reports.scss"],
			"../csp-dir/css/print.css": ["../sass/print.scss"],
			"../csp-dir/css/pwa.css": ["../sass/pwa.scss"],
			"../csp-dir/css/sitemap.css": ["../sass/sitemap.scss"],
			"../csp-dir/css/reports.css": ["../sass/reports.scss"]
		}
	},
	pwa: {
		files: {
			"../csp-dir/css/pwa.css": ["../sass/pwa.scss"]
		}
	}
};