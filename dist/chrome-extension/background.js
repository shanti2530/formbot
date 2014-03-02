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
	        function(min, max) {
				'use strict';
	            return Math.floor(Math.random() * (max - min + 1)) + min;
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
	var getDefaults = function() {
	    'use strict';

	    var defaults = {
	        'EMAIL'    : {defaultValue:'f@ke.com', includes: ['mail']},
	        'PASSWORD' : {defaultValue:'Password123', includes: ['pass']},
	        'CARD_NO'  : {defaultValue:'4444333322221111', includes: ['card'], excludes: ['name', 'code']},
	        'CVV'      : {defaultValue:'123', includes: ['cvv']},
	        'PHONE'    : {defaultValue:'79797979', includes: ['phone', 'tel', 'mobile']},
	        'USERNAME' : {defaultValue: 'john', includes: ['username', 'userId']},
	        'DOMAIN'   : {defaultValue: 'fakeaddresshere.com', includes: ['domain']},
	        'URL'      : {defaultValue: 'http://www.fakeaddresshere.com', includes: ['url', 'site']},
	        'NUMBER'   : {defaultValue: 5, includes: ['number', 'amount', 'range']},
	        'DATETIME' : {defaultValue: utils.getDateFormat('YYYY-MM-DDTHH:mm'), includes: ['datetime']},
	        'DATE'     : {defaultValue: utils.getDateFormat('YYYY-MM-DD'), includes: ['date']},
	        'TIME'     : {defaultValue: utils.getDateFormat('HH:mm'), includes: ['time']},
	        'WEEK'     : {defaultValue: utils.getDateFormat('GGGG-[W]WW'), includes: ['week']},
	        'MONTH'    : {defaultValue: utils.getDateFormat('YYYY-MM'), includes: ['month']},
	        'TEXT'     : {defaultValue: 'Lorem', includes: ['text']}
	    };
	    return defaults;
	};

	var getSystemDefault = function(inputType) {
	    'use strict';
	    var defaults = getDefaults();
	    return defaults[inputType].defaultValue;
	};

	var getUniqueValue = function(inputType) {
	    'use strict';
	    switch (inputType) {
	        case 'TEXT':
	            return utils.randomText(7);
	        case 'DOMAIN':
	            return utils.randomText(7) + '.com';
	        case 'EMAIL':
	            return utils.randomText(7) + '@' + utils.randomText(7) + '.com';
	        case 'PASSWORD':
	            return utils.randomText(7);
	        case 'CARD_NO':
	            return '4444333322221111';
	        case 'CVV':
	            return utils.randomNumber(100, 999);
	        case 'PHONE':
	            return utils.randomNumber(10000000, 99999999);
	        case 'USERNAME':
	            return 'u' + utils.getDateFormat('X');
	        case 'URL':
	            return 'http://' + utils.randomText(10) + '.com';
	        case 'NUMBER':
	            return utils.randomNumber(1,99);
	        case 'DATETIME':
	            return utils.getDateFormat('YYYY-MM-DDTHH:mm');
	        case 'DATE':
	            return utils.getDateFormat('YYYY-MM-DD');
	        case 'TIME':
	            return utils.getDateFormat('HH:mm');
	        case 'WEEK':
	            return utils.getDateFormat('GGGG-[W]WW');
	        case 'MONTH':
	            return utils.getDateFormat('YYYY-MM');
	    }
	};
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
			        function(min, max) {
						'use strict';
			            return Math.floor(Math.random() * (max - min + 1)) + min;
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
			var getDefaults = function() {
			    'use strict';

			    var defaults = {
			        'EMAIL'    : {defaultValue:'f@ke.com', includes: ['mail']},
			        'PASSWORD' : {defaultValue:'Password123', includes: ['pass']},
			        'CARD_NO'  : {defaultValue:'4444333322221111', includes: ['card'], excludes: ['name', 'code']},
			        'CVV'      : {defaultValue:'123', includes: ['cvv']},
			        'PHONE'    : {defaultValue:'79797979', includes: ['phone', 'tel', 'mobile']},
			        'USERNAME' : {defaultValue: 'john', includes: ['username', 'userId']},
			        'DOMAIN'   : {defaultValue: 'fakeaddresshere.com', includes: ['domain']},
			        'URL'      : {defaultValue: 'http://www.fakeaddresshere.com', includes: ['url', 'site']},
			        'NUMBER'   : {defaultValue: 5, includes: ['number', 'amount', 'range']},
			        'DATETIME' : {defaultValue: utils.getDateFormat('YYYY-MM-DDTHH:mm'), includes: ['datetime']},
			        'DATE'     : {defaultValue: utils.getDateFormat('YYYY-MM-DD'), includes: ['date']},
			        'TIME'     : {defaultValue: utils.getDateFormat('HH:mm'), includes: ['time']},
			        'WEEK'     : {defaultValue: utils.getDateFormat('GGGG-[W]WW'), includes: ['week']},
			        'MONTH'    : {defaultValue: utils.getDateFormat('YYYY-MM'), includes: ['month']},
			        'TEXT'     : {defaultValue: 'Lorem', includes: ['text']}
			    };
			    return defaults;
			};

			var getSystemDefault = function(inputType) {
			    'use strict';
			    var defaults = getDefaults();
			    return defaults[inputType].defaultValue;
			};

			var getUniqueValue = function(inputType) {
			    'use strict';
			    switch (inputType) {
			        case 'TEXT':
			            return utils.randomText(7);
			        case 'DOMAIN':
			            return utils.randomText(7) + '.com';
			        case 'EMAIL':
			            return utils.randomText(7) + '@' + utils.randomText(7) + '.com';
			        case 'PASSWORD':
			            return utils.randomText(7);
			        case 'CARD_NO':
			            return '4444333322221111';
			        case 'CVV':
			            return utils.randomNumber(100, 999);
			        case 'PHONE':
			            return utils.randomNumber(10000000, 99999999);
			        case 'USERNAME':
			            return 'u' + utils.getDateFormat('X');
			        case 'URL':
			            return 'http://' + utils.randomText(10) + '.com';
			        case 'NUMBER':
			            return utils.randomNumber(1,99);
			        case 'DATETIME':
			            return utils.getDateFormat('YYYY-MM-DDTHH:mm');
			        case 'DATE':
			            return utils.getDateFormat('YYYY-MM-DD');
			        case 'TIME':
			            return utils.getDateFormat('HH:mm');
			        case 'WEEK':
			            return utils.getDateFormat('GGGG-[W]WW');
			        case 'MONTH':
			            return utils.getDateFormat('YYYY-MM');
			    }
			};
			/* jshint ignore:end */

		    if (request.method === 'getInputValue') {

				//get the input value from the local storage
				var val = JSON.parse(localStorage[request.inputType]);
				if(val) {
					if(val.unique) {
						sendResponse({data: getUniqueValue(request.inputType)});
					} else {
						sendResponse({data: val.defaultValue});
					}
				}

		    }
		}
);