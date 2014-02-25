var fillInput = function(input, data) {
	'use strict';
    input.value = data;

    //trigger change event after the value is updated
    if ('createEvent' in document) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('change', true, false);
        input.dispatchEvent(evt);
    } else {
        input.fireEvent('onchange');
    }
};

var getDefaultValue = function (inputType, maxLength, input) {
	'use strict';
    chrome.extension.sendMessage({method: 'getInputValue',
                                  inputType: inputType,
                                  maxLength: maxLength},
        function(response) {

                if (response.data !== undefined) {
                    fillInput(input, response.data);
                }
            }
    );
};