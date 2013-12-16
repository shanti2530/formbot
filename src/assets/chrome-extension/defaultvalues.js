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
            fillInput(input, response.data);
        }
    );
};