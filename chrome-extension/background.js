// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
	'use strict';
	chrome.tabs.executeScript(null, {file: 'scripts/fillForms.min.js'});
});


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
			'use strict';
		    if (request.method === 'getInputValue') {

				var val = localStorage[request.inputType];

				if (val !== undefined) {
					sendResponse({data: val});
				}
		    }
		}
);