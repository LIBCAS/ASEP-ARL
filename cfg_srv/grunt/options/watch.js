/**
 * Sleduje soubory a spouští definované úlohy v případě změny sledovaných souborů.
 * @module watch
 * @see https://github.com/gruntjs/grunt-contrib-watch
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	options: {
		force: true,
		interrupt: true
	},
	ipac: {
		files: ["../sass/bskin1/*.scss", "../sass/bskin1.scss"],
		tasks: ["ipacsass"],
		options: {
			nospawn: true
		}
	}
};