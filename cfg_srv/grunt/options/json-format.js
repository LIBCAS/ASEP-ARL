/**
 * Přeformátování JSON
 * @module json-format
 * @see https://github.com/jahed/grunt-json-format
 * grunt.loadNpmTasks("grunt-json-format");
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	options: {
		indent: "\t",
	},
	gruntfile: {
		files: [{
				expand: true,
				cwd: "options",
				src: ["options/*.json"],
				dest: "options/"
			},
			{
				expand: true,
				cwd: "config",
				src: ["config/*.json", "config/.jsbeautifyrc", "config/.stylelintrc", "config/jsdoc/*.json"],
				dest: "config/"
			}
		]
	}
};