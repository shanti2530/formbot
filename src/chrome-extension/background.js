// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
	'use strict';
	chrome.tabs.executeScript(null, {file: 'scripts/analytics.js'});
	chrome.tabs.executeScript(null, {file: 'scripts/fillForms.min.js'});
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
			'use strict';
		    if (request.method === 'getInputValue') {

				/* jshint ignore:start */
				include "utils.js"

				include "systemdefaults.js"
				/* jshint ignore:end */

				//try to get the input value from the user defined values
				var val = localStorage[request.inputType];

				//if not found in the local storage then get the system default value
				if (val === undefined) {
					val = getSystemDefault(request.inputType, request.maxLength);
				}

				sendResponse({data: val});
		    }
		}
);