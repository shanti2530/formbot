// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
	'use strict';
	chrome.tabs.executeScript(null, {file: 'scripts/analytics.js'});
	chrome.tabs.executeScript(null, {file: 'scripts/fillForms.min.js'});
});

function loadValues() {
	'use strict';
	/* jshint ignore:start */
	include "utils.js"
	include "systemdefaults.js"
	/* jshint ignore:end */

	//try to get the input value from the user defined values
	var defaultsArray = Object.keys(getDefaults());
	for (var i = 0; i < defaultsArray.length; i++) {
		var type = defaultsArray[i];
		var val = localStorage[type];
		
		//if not found in the local storage then set the system default value
		if (val === undefined) {
			localStorage[type] = JSON.stringify({unique: false,
												defaultValue: getSystemDefault(type, 7),
												uniqueValue: 'getUniqueValue'});
		}
	}
}
loadValues();

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
			'use strict';

			/* jshint ignore:start */
			include "utils.js"
			include "systemdefaults.js"
			/* jshint ignore:end */

		    if (request.method === 'getInputValue') {

				//get the input value from the local storage
				var val = JSON.parse(localStorage[request.inputType]);
				if(val) {
					if(val.unique) {
						sendResponse({data: getUniqueValue(request.inputType), unique: true});
					} else {
						sendResponse({data: val.defaultValue, unique: false});
					}
				}

		    }
		}
);