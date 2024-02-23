/**
 * Interaktivní výzva pro konfiguraci Gruntu
 * Například s výběrem i3 aplikace nebo ictx zákaznka.
 * @module prompt
 * @see https://github.com/dylang/grunt-prompt
 * @property epca - I3 aplikace EPCA
 * @property options - globální nastavení pro všechny
 */
module.exports = {
	epca: {
		options: {
			questions: [{
				"config": 'ictx', // arbitrary name or config for any other grunt task
				"type": "list", // list, checkbox, confirm, input, password
				"message": "Vyber ictx", // Question to ask the user, function needs to return a string,
				"default": "cav", // default value if nothing is entered
				"choices": ["cav", "cbvk", "cs", "edu", "eu", "kjm", "sluk", "spu", "stu", "uhkt", "ukb", "umb"]
			}]
		}
	}
};