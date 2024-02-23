/**
 * Kontrola zápisu JavaScriptu s exportem do HTML souboru
 * @module jshint
 * @see https://github.com/jshint/jshint/
 * @see https://github.com/jshint/jshint/blob/master/examples/.jshintrc
 * @property gruntfile - Gruntfile soubory
 * @property i3app - Kontrola JS v adresáři I3 aplikace
 * @property i3appEpcaD - Kontrola JS v adresáři I3 aplikace EPCA Designer
 * @property i3s - Kontrola podpůrných JavaScriptů I3 aplikace 
 * @property ictx - Kontrola JS v adresáři zákazníka
 * @property interpi - Kontrola JS v adresáři I3 aplikace INTERPI
 * @property interpium - Kontrola JS v adresáři I3 aplikace INTERPIUM
 * @property interpiweb - Kontrola JS v adresáři webu INTERPI
 * @property ipac - Kontrola JS pro IPAC
 * @property ipacu - Kontrola všech zákaznických JavaScriptů pro IPAC
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	options: {
		reporter: require("jshint-html-reporter"),
		force: true
	},
	gruntfile: {
		options: {
			reporterOutput: "temp/jshint/gruntfile.html"
		},
		src: ["Gruntfile.js", "options/*.js"]
	},
	i3app: {
		options: {
			"-W069": false,
			// Výstup se zapíše do HTML souboru v adresáři i3 aplikace
			reporterOutput: "temp/jshint/i3-<%= file %>.html",
			ignores: ["../csp-dir-i3/webadmin/include/*.js", "../csp-dir-i3/<%= grunt.config.get('dir') %>/build/*.js"]
		}
	},
	i3appEpcaD: {
		options: {
			"-W069": false,
			reporterOutput: "temp/jshint/i3-<%= file2 %>.html"
		}
	},
	i3s: {
		options: {
			reporterOutput: "temp/jshint/i3-<%= grunt.config.get('app') %>.html"
		}
	},
	ictx: {
		options: {
			reporterOutput: "temp/jshint/ictx-<%= grunt.config.get('ictx') %>.html",
			esversion: 6,
			globals: {
				jQuery: true
			}
		},
		files: {
			src: ["../csp-dir/user/<%= grunt.config.get('ictx') %>/js/app/*.js", "../csp-dir/user/<%= grunt.config.get('ictx') %>/js/*.js"]
		}
	},
	interpi: {
		options: {
			reporterOutput: "temp/jshint/i3-interpi.html"
		}
	},
	interpiweb: {
		options: {
			reporterOutput: "temp/jshint/web-interpi.html"
		}
	},
	interpium: {
		options: {
			reporterOutput: "temp/jshint/i3-interpium.html"
		}
	},
	ipac: {
		options: {
			force: true,
			reporterOutput: "temp/jshint/ipac.html",
			esversion: 6,
			globals: {
				Query: true,
				module: true,
				define: true,
				requirejs: true,
				require: true
			}
		},
		files: {
			src: ["../csp-dir/js/conf*.js", "../csp-dir/js/app/*.js", "../csp-dir/js/test/*.js"]
		}
	},
	ipacu: {
		options: {
			force: true,
			reporterOutput: "temp/jshint/ipac-users.html",
			esversion: 6,
			globals: {
				Query: true,
				module: true,
				define: true,
				requirejs: true,
				require: true
			}
		},
		files: {
			src: ["../csp-dir/user/*/js/*.js", "../csp-dir/user/*/js/app/*.js"]
		}
	}
};