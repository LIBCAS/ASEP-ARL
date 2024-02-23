/**
 * Použití JS nové generace s Babelem
 * @module babel
 * @see https://github.com/babel/grunt-babel
 * @property formvalidation - Vytvoření knihovny formvalidation
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	options: {
		sourceMap: true //,
		//presets: ["@babel/preset-env"]
	},
	formvalidation: {
		files: [{
			expand: true,
			cwd: "temp/babel/formvalidation/",
			src: ["formvalidation.js"],
			dest: "temp/dist/js/formvalidation/",
			ext: ".js"
		}]
	}
};