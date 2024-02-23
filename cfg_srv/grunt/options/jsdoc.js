/**
 * Generování dokumentace z JavaScriptových souborů pro Grunt, IPAC a I3 aplikace.
 * Dále se využívá DocStrap - šablona založená na Bootstrapu pro JSDoc3.
 * a jshint-stylish - stylový reportér pro JSHint
 * a skin ink-docstrap
 * @module jsdoc
 * @see https://github.com/krampstudio/grunt-jsdoc
 * @see https://jsdoc.app/index.html
 * @see https://github.com/docstrap/docstrap
 * @see https://github.com/sindresorhus/jshint-stylish
 * @param {string} dir - Název adresáře I3 aplikace
 * @property gruntfile - Dokumentace z JS souborů pro Grunt
 * @property i3app - Dokumentace z JS souborů pro zvolenou I3 aplikaci
 * @property ictx - Dokumentace z JS souborů zákazníka pro IPAC 
 * @property ipac - Dokumentace z JS souborů pro IPAC
 */

module.exports = {
	gruntfile: {
		src: ["options/*.js", "options/README.md", "gruntfile.js", "*.md"],
		"options": {
			"destination": "temp/jsdoc/grunt/",
			"encoding": "utf8",
			"recurse": true,
			"tutorials": "options/",
			"template": "node_modules/ink-docstrap/template",
			"configure": "config/jsdoc/grunt.json"
		}
	},
	i3app: {
		src: ["../csp-dir-i3/<%= grunt.config.get('dir') %>/*.js", "!../csp-dir-i3/<%= grunt.config.get('dir') %>/main.js", "../csp-dir-i3/<%= grunt.config.get('dir') %>/*/*.js", "!../csp-dir-i3/<%= grunt.config.get('dir') %>/build/*.js", "../csp-dir-i3/<%= grunt.config.get('dir') %>/*.md"],
		"options": {
			"destination": "temp/jsdoc/<%= grunt.config.get('dir') %>/",
			"encoding": "utf8",
			"template": "node_modules/ink-docstrap/template",
			"configure": "config/jsdoc/<%= grunt.config.get('dir') %>.json"
		}
	},
	ictx: {
		src: ["../csp-dir/user/<%= grunt.config.get('ictx') %>/js/app/*.js", "../csp-dir/user/<%= grunt.config.get('ictx') %>/js/*.js", "../csp-dir/user/<%= grunt.config.get('ictx') %>/js/*.md"],
		"options": {
			"destination": "temp/jsdoc/<%= grunt.config.get('ictx') %>/",
			"encoding": "utf8",
			"template": "node_modules/ink-docstrap/template",
			"configure": "config/jsdoc/ictx.json"
		}
	},
	ipac: {
		src: ["../csp-dir/js/app/*.js", "../csp-dir/js/test/*.js", "../csp-dir/js/conf.*.js", "../csp-dir/js/README.md"],
		"options": {
			"destination": "temp/jsdoc/ipac/",
			"encoding": "utf8",
			"tutorials": "../csp-dir/js/tutorials/",
			"template": "node_modules/ink-docstrap/template",
			"configure": "config/jsdoc/ipac.json"
		}
	}
};