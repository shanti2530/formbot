var getDefaultValue = function(inputType, maxLength) {
	'use strict';
	
    /* jshint ignore:start */
    include "systemdefaults.js"
    /* jshint ignore:end */

    return getSystemDefault(inputType, maxLength);
};