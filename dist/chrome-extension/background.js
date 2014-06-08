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
	        },
	    isEmpty: function(variable) {
	        'use strict';
	        if (!variable || variable === '' || variable === 'undefined') {
	            return true;
	        }
	    },
	    contains:
	        function (array, needle) {
	            'use strict';
	            if (!array || array === undefined || array.length === 0) {
	                return false;
	            }

	            for(var i = 0; i < array.length; i++) {
	                if(needle.toLowerCase().indexOf(array[i]) > -1) {
	                    return true;
	                }
	            }
	            return false;
	        }
	};
	/*The default object with which the fields will be filled up*/
	var getDefaults = function() {
	    'use strict';

	    var defaults = [
	        {name:'EMAIL',    value: {defaultValue:'f@ke.com', includes: ['mail']}},
	        {name:'PASSWORD', value: {defaultValue:'Password123', includes: ['pass']}},
	        {name:'CARD_NO',  value: {defaultValue:'4444333322221111', includes: ['card'], excludes: ['name', 'code']}},
	        {name:'CVV',      value:{defaultValue:'123', includes: ['cvv', 'cvc', 'cv2']}},
	        {name:'PHONE',    value:{defaultValue:'79797979', includes: ['phone', 'tel', 'mobile']}},
	        {name:'USERNAME', value:{defaultValue: 'john', includes: ['username', 'userId']}},
	        {name:'DOMAIN',   value:{defaultValue: 'fakeaddresshere.com', includes: ['domain']}},
	        {name:'URL',      value:{defaultValue: 'http://www.fakeaddresshere.com', includes: ['url', 'site']}},
	        {name:'NUMBER',   value: {defaultValue: 5, includes: ['number', 'amount', 'range']}},
	        {name:'DATETIME', value: {defaultValue: utils.getDateFormat('YYYY-MM-DDTHH:mm'), includes: ['datetime']}},
	        {name:'DATE',     value: {defaultValue: utils.getDateFormat('YYYY-MM-DD'), includes: ['date']}},
	        {name:'TIME',     value: {defaultValue: utils.getDateFormat('HH:mm'), includes: ['time']}},
	        {name:'WEEK',     value: {defaultValue: utils.getDateFormat('GGGG-[W]WW'), includes: ['week']}},
	        {name:'MONTH',    value: {defaultValue: utils.getDateFormat('YYYY-MM'), includes: ['month']}},
	        {name:'TEXT',     value: {defaultValue: 'Lorem', includes: ['text']}}
	    ];
	    return defaults;
	};

	var getSystemDefault = function(inputType) {
	    'use strict';
	    var defaults = getDefaults();
	    for (var d in defaults) {
	        if (defaults[d].name === inputType) {
	            return defaults[d].value.defaultValue;
	        }
	    }
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
	var defaults = getDefaults();
	for (var d in defaults) {
		var type = defaults[d].name;
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
			        },
			    isEmpty: function(variable) {
			        'use strict';
			        if (!variable || variable === '' || variable === 'undefined') {
			            return true;
			        }
			    },
			    contains:
			        function (array, needle) {
			            'use strict';
			            if (!array || array === undefined || array.length === 0) {
			                return false;
			            }

			            for(var i = 0; i < array.length; i++) {
			                if(needle.toLowerCase().indexOf(array[i]) > -1) {
			                    return true;
			                }
			            }
			            return false;
			        }
			};
			/*The default object with which the fields will be filled up*/
			var getDefaults = function() {
			    'use strict';

			    var defaults = [
			        {name:'EMAIL',    value: {defaultValue:'f@ke.com', includes: ['mail']}},
			        {name:'PASSWORD', value: {defaultValue:'Password123', includes: ['pass']}},
			        {name:'CARD_NO',  value: {defaultValue:'4444333322221111', includes: ['card'], excludes: ['name', 'code']}},
			        {name:'CVV',      value:{defaultValue:'123', includes: ['cvv', 'cvc', 'cv2']}},
			        {name:'PHONE',    value:{defaultValue:'79797979', includes: ['phone', 'tel', 'mobile']}},
			        {name:'USERNAME', value:{defaultValue: 'john', includes: ['username', 'userId']}},
			        {name:'DOMAIN',   value:{defaultValue: 'fakeaddresshere.com', includes: ['domain']}},
			        {name:'URL',      value:{defaultValue: 'http://www.fakeaddresshere.com', includes: ['url', 'site']}},
			        {name:'NUMBER',   value: {defaultValue: 5, includes: ['number', 'amount', 'range']}},
			        {name:'DATETIME', value: {defaultValue: utils.getDateFormat('YYYY-MM-DDTHH:mm'), includes: ['datetime']}},
			        {name:'DATE',     value: {defaultValue: utils.getDateFormat('YYYY-MM-DD'), includes: ['date']}},
			        {name:'TIME',     value: {defaultValue: utils.getDateFormat('HH:mm'), includes: ['time']}},
			        {name:'WEEK',     value: {defaultValue: utils.getDateFormat('GGGG-[W]WW'), includes: ['week']}},
			        {name:'MONTH',    value: {defaultValue: utils.getDateFormat('YYYY-MM'), includes: ['month']}},
			        {name:'TEXT',     value: {defaultValue: 'Lorem', includes: ['text']}}
			    ];
			    return defaults;
			};

			var getSystemDefault = function(inputType) {
			    'use strict';
			    var defaults = getDefaults();
			    for (var d in defaults) {
			        if (defaults[d].name === inputType) {
			            return defaults[d].value.defaultValue;
			        }
			    }
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
						sendResponse({data: getUniqueValue(request.inputType), unique: true});
					} else {
						sendResponse({data: val.defaultValue, unique: false});
					}
				}

		    }
		}
);