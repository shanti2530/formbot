var fillInput = function(input, data) {
	'use strict';
    input.value = data;
};

var getDefaultValue = function (inputType, maxLength, input) {
	'use strict';
    chrome.extension.sendMessage({method: 'getInputValue',
                                  inputType: inputType,
                                  maxLength: maxLength},
        function(response) {

              /* jshint ignore:start */
              include "systemdefaults.js"
              /* jshint ignore:end */
                if (response.data !== undefined) {
                    fillInput(input, response.data);
                } else {
                    fillInput(input, getSystemDefault(inputType, maxLength));
                }
            }
    );
};