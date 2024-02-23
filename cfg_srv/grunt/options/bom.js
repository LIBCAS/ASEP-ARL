/**
 * Přidat nebo odebrat znak BOM
 * Přidává znak BOM do JavaScriptů a CSS, SCSS aby se korektně zobrazovala diakritika v JS s jazykovou lokalizací nebo komentáře.
 * @see https://github.com/bergquist/grunt-byte-order-mark
 * @module bom
 * @property gruntfile - Přidat do souborů Gruntu znak BOM
 * @property i3app - Přidat do souborů zvolené I3 aplikace znak BOM
 * @property ictx - Přidat do souborů zákazníka JS a SASS pro IPAC znak BOM 
 * @property ictx2 -Odebart znak BOM ze šablon *.csp a *.csr zákazníka
 * @property ipac - Přidat do vývojových souborů IPACu znak BOM
 * @property ipacproduc - Přidat do výstupní souborů IPACu znak BOM
 * @property ipactpl -Odebart znak BOM ze šablon IPACu *.csp a *.csr
 * @property ipacu - Přidat do vývojových souborů všech zákaznických JS pro IPAC znak BOM
 */
module.exports = {
	gruntfile: {
		src: ["options/*.js"],
		options: {
			add: true
		}
	},
	i3app: {
		src: ["../csp-dir-i3/<%= grunt.config.get('dir') %>/*.scss", "../csp-dir-i3/etc/user.scss", "../csp-dir-i3/icons/icons.scss", "../csp-dir-i3/icons/extupdate.scss", "../csp-dir-i3/icons/main.scss", "../csp-dir-i3/etc/FileUpload/FileUploadField.scss", "../csp-dir-i3/RTL/src/resources/css/extjs_rtl.css"],
		options: {
			add: true
		}
	},
	ictx: {
		src: ["../csp-dir/user/<%= grunt.config.get('ictx') %>/js/*.js", "../csp-dir/user/<%= grunt.config.get('ictx') %>/js/app/*.js", "../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/*.scss", "../csp-dir/user/<%= grunt.config.get('ictx') %>/_backup/sass/*/*.scss"],
		options: {
			add: true
		}
	},
	ictx2: {
		src: ["../csp-dir/user/<%= grunt.config.get('ictx') %>/templates2/*/*.csp"],
		options: {
			remove: true,
			add: false
		}
	},
	ipac: {
		src: ["../csp-dir/js/*.js", "../csp-dir/js/app/*.js", "../csp-dir/css/*.css", "../sass/*.scss", "../sass/bskin1/*.scss"],
		options: {
			add: true
		}
	},
	ipacproduc: {
		src: ["../csp-dir/js/*.js", "../csp-dir/js/app/*.js", "../csp-dir/css/*.css"],
		options: {
			add: true
		}
	},
	ipactpl: {
		src: ["../csp-dir/templates2/*.csr", "../csp-dir/templates2/*/*.csp", "../csp-dir/templates2/*/*/*.csp"],
		options: {
			remove: true,
			add: false
		}
	},
	pwa: {
		src: ["../csp-dir/js/pwa.js", "../webroot/service-worker.js", "../csp-dir/js/pwainstall.js", "../sass/pwa.scss"],
		options: {
			add: true
		}
	},
	ipacu: {
		src: ["../csp-dir/user/*/js/*.js", "../csp-dir/user/*/js/app/*.js", "../csp-dir/user/*/_backup/sass/*.scss", "../csp-dir/user/*/_backup/sass/*/*.scss"],
		options: {
			add: true
		}
	}
};