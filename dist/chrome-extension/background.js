// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
	'use strict';
	chrome.tabs.executeScript(null, {file: 'scripts/analytics.js'});
	chrome.tabs.executeScript(null, {file: 'scripts/fillForms.min.js'});
});

function loadValues() {
	'use strict';
	/* jshint ignore:start */
	var utils = {
	    randomText:
	        function(len) {
				'use strict';
	            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	            var output = '';
	            for (var i = 0; i < len; i++) {
	                output = output + characters.charAt(Math.random()*54);
	            }
	            return output;
	        },
	    randomNumber:
	        function() {
				'use strict';
	            return Math.floor((Math.random()*99) +1);
	        },
	    getDateFormat:
	        function(format) {
				'use strict';
	            if (typeof moment === 'function') {
	                return moment().format(format);
	            }
	        }
	};
	/*The default object with which the fields will be filled up*/
	var getDefaults = function(maxLength) {
	    'use strict';

	    var defaults = {
	        'EMAIL'    : {value:'f@ke.com', includes: ['mail']},
	        'PASSWORD' : {value:'Password123', includes: ['pass']},
	        'CARD_NO'  : {value:'4444333322221111', includes: ['card'], excludes: ['name', 'code']},
	        'CVV'      : {value:'123', includes: ['cvv']},
	        'PHONE'    : {value:'79797979', includes: ['phone', 'tel', 'mobile']},
	        'USERNAME' : {value: 'u' + utils.getDateFormat('X'), includes: ['username', 'userId']},
	        'URL'      : {value: 'http://www.fakeaddresshere.com', includes: ['url', 'site']},
	        'NUMBER'   : {value: utils.randomNumber(), includes: ['number', 'amount', 'range']},
	        'DATETIME' : {value: utils.getDateFormat('YYYY-MM-DDTHH:mm'), includes: ['datetime']},
	        'DATE'     : {value: utils.getDateFormat('YYYY-MM-DD'), includes: ['date']},
	        'TIME'     : {value: utils.getDateFormat('HH:mm'), includes: ['time']},
	        'WEEK'     : {value: utils.getDateFormat('GGGG-[W]WW'), includes: ['week']},
	        'MONTH'    : {value: utils.getDateFormat('YYYY-MM'), includes: ['month']},
	        'TEXT'     : {value: utils.randomText(maxLength), includes: ['text']}
	    };

	    return defaults;
	};

	var getSystemDefault = function(inputType, maxLength) {
	    'use strict';
	    var defaults = getDefaults(maxLength);

	    return defaults[inputType].value;
	};
	/* jshint ignore:end */

	//try to get the input value from the user defined values
	var defaultsArray = Object.keys(getDefaults());
	for (var i = 0; i < defaultsArray.length; i++) {
		var type = defaultsArray[i];
		var val = localStorage[type];
		
		//if not found in the local storage then set the system default value
		if (val === undefined) {
			localStorage[type] = getSystemDefault(type, 7);
		}
	}

}
loadValues();

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
			'use strict';
		    if (request.method === 'getInputValue') {

				//try to get the input value from the user defined values
				var val = localStorage[request.inputType];

				sendResponse({data: val});
		    }
		}
);