Ext.ns('epca.designer');

epca.designer.CustomCodeValidator = {

    options: {
        white: false,
        browser: true,
        devel: true,
        widget: true,
        windows: true,
        laxbreak: true,
        onevar: true,
        on: true,
        undef: true,
        nomen: true,
        eqeqeq: true,
        plusplus: true,
        bitwise: true,
        regexp: true,
        newcap: true,
        immed: true,
        predef: ['window', '$', 'escape', 'unescape', 'Ext', 'epca', 'isValid']
    },
    
	errorMessage: undefined,
	
    validate: function(source){
		if (JSLINT(source, this.options) == true) {
			this.errorMessage = undefined;
			return true;
		}
		else {
			if (JSLINT.errors[0] != undefined) 
				this.errorMessage = JSLINT.errors[0].reason;
			else
				this.errorMessage = 'unknown validation error';
			return false;
		}
    }
};