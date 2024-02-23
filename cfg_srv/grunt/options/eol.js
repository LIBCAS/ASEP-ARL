/**
 * Nastavení konce řádků
 * crlf - windows, lf - unix
 * @see https://www.skypack.dev/view/grunt-eol
 * @see https://cs.wikipedia.org/wiki/Nov%C3%BD_%C5%99%C3%A1dek
 * @module lineending
 * @property gruntfile - Nastavit konce řádků v souborech Gruntu
 * @property i3app - Nastavit konce řádků v souborech zvolené I3 aplikace
 * @property ictx - Nastavit konce řádků v souborech zákazníka JS a SASS pro IPAC
 * @property ictx2 - Nastavit konce řádků v souborech šablon *.csp a *.csr zákazníka
 * @property ipac - Nastavit konce řádků v souborech IPACu
 * @property ipacproduc - Nastavit konce řádků v souborech IPACu
 * @property ipactpl -Nastavit konce řádků v souborech šablon IPACu *.csp a *.csr
 * @property ipacu - Nastavit konce řádků v souborech všech zákaznických JS pro IPAC
 */
module.exports = {
	gruntfile: {
		files: [{
			expand: true,
			cwd: "options/",
			src: ["*.js"],
			ext: [".js"],
			dest: "options/"
		}],
		options: {
			eol: "crlf",
			replace: true
		}
	},
	i3app: {
		options: {
			eol: "crlf",
			replace: true
		}
	},
	ictx: {
		files: [{
			expand: true,
			cwd: "../csp-dir/user/<%= grunt.config.get('ictx') %>/js/",
			src: ["*.js"],
			ext: [".js"],
			dest: "../csp-dir/user/<%= grunt.config.get('ictx') %>/js/"
		}, {
			expand: true,
			cwd: "../csp-dir/user/<%= grunt.config.get('ictx') %>/js/app/",
			src: ["*.js"],
			ext: [".js"],
			dest: "../csp-dir/user/<%= grunt.config.get('ictx') %>/js/app/"
		}, {
			expand: true,
			cwd: "../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/",
			src: ["*.scss"],
			ext: [".scss"],
			dest: "../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/"
		}, {
			expand: true,
			cwd: "../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/",
			src: ["*/*.scss"],
			ext: [".scss"],
			dest: "../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/*/"
		}],
		options: {
			eol: "crlf",
			replace: true
		}
	},
	ictx2: {
		files: [{
			expand: true,
			cwd: "../csp-dir/user/<%= grunt.config.get('ictx') %>/templates2/",
			src: ["*.csp"],
			ext: [".csp"],
			dest: "../csp-dir/user/<%= grunt.config.get('ictx') %>/templates2/"
		}, {
			expand: true,
			cwd: "../csp-dir/user/<%= grunt.config.get('ictx') %>/templates2/",
			src: ["*/*.csp"],
			ext: [".csp"],
			dest: "../csp-dir/user/<%= grunt.config.get('ictx') %>/templates2/*/"
		}],
		options: {
			eol: "crlf",
			replace: true
		}
	},
	ipac: {
		files: [{
			expand: true,
			cwd: "../csp-dir/js/",
			src: ["*.js"],
			ext: [".js"],
			dest: "../csp-dir/js/"
		}, {
			expand: true,
			cwd: "../csp-dir/js/app/",
			src: ["*.js"],
			ext: [".js"],
			dest: "../csp-dir/js/app/"
		}, {
			expand: true,
			cwd: "../csp-dir/js/test/",
			src: ["*.js"],
			ext: [".js"],
			dest: "../csp-dir/js/test/"
		}, {
			expand: true,
			cwd: "../csp-dir/css/",
			src: ["*.css"],
			ext: [".css"],
			dest: "../csp-dir/css/"
		}, {
			expand: true,
			cwd: "../sass/",
			src: ["*.scss"],
			ext: [".scss"],
			dest: "../sass/"
		}, {
			expand: true,
			cwd: "../sass/bskin1/",
			src: ["*.scss"],
			ext: [".scss"],
			dest: "../sass/bskin1/"
		}],
		options: {
			eol: "crlf",
			replace: true
		}
	},
	ipacproduc: {
		files: [{
			expand: true,
			cwd: "../csp-dir/js/",
			src: ["*.js"],
			ext: [".js"],
			dest: "../csp-dir/js/"
		}, {
			expand: true,
			cwd: "../csp-dir/js/app/",
			src: ["*.js"],
			ext: [".js"],
			dest: "../csp-dir/js/app/"
		}, {
			expand: true,
			cwd: "../csp-dir/css/",
			src: ["*.css"],
			ext: [".css"],
			dest: "../csp-dir/css/"
		}],
		options: {
			eol: "crlf",
			replace: true
		}
	},
	ipactpl: {
		files: [{
			expand: true,
			cwd: "../csp-dir/templates2/",
			src: ["*.csp"],
			ext: [".csp"],
			dest: "../csp-dir/templates2/"
		}, {
			expand: true,
			cwd: "../csp-dir/templates2/",
			src: ["*/*.csp"],
			ext: [".csp"],
			dest: "../csp-dir/templates2/*/"
		}, {
			expand: true,
			cwd: "../csp-dir/templates2/",
			src: ["*/*/*.csp"],
			ext: [".csp"],
			dest: "../csp-dir/templates2/*/*/"
		}],
		options: {
			eol: "crlf",
			replace: true
		}
	},
	ipacu: {
		files: [{
			expand: true,
			cwd: "../csp-dir/user/",
			src: ["*/js/*.js"],
			ext: [".js"],
			dest: "../csp-dir/user/*/js/"
		}, {
			expand: true,
			cwd: "../csp-dir/user/",
			src: ["*/js/app/*.js"],
			ext: [".js"],
			dest: "../csp-dir/user/*/js/app/"
		}, {
			expand: true,
			cwd: "../csp-dir/user/",
			src: ["*/_backup/sass/*.scss"],
			ext: [".scss"],
			dest: "../csp-dir/user/*/_backup/sass/"
		}, {
			expand: true,
			cwd: "../csp-dir/user/",
			src: ["*/_backup/sass/*/*.scss"],
			ext: [".scss"],
			dest: "../csp-dir/user/*/_backup/sass/*/"
		}],
		options: {
			eol: "crlf",
			replace: true
		}
	}
};