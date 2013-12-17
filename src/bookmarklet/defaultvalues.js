var getDefaultValue = function(inputType, maxLength) {
	'use strict';
	
    /* jshint ignore:start */
    include "systemdefaults.js"
    /* jshint ignore:end */

    console.log(inputType, getSystemDefault(inputType, maxLength));

    return getSystemDefault(inputType, maxLength);
};