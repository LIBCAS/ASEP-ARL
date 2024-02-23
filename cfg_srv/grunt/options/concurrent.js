/**
 * @file Spouštění více gruntových úkolů současně
 * @module concurrent
 * @see https://github.com/sindresorhus/grunt-concurrent
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	options: {
		logConcurrentOutput: true
	}
	/*,
	ipac: ["watch:ipacJS", "watch:ipacSASS"]
	*/
};