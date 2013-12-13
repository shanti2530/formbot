// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // chrome.tabs.executeScript({
    // code: 'document.body.appendChild(document.createElement("script")).src="//raw.github.com/shanti2530/bookmarklets/master/dest/fillForms.min.js";console.log(chrome.extension.getURL("fillForms.min.js"));'
	// code: 'document.body.appendChild(document.createElement("script")).src=chrome.extension.getURL("scripts/fillForms.min.js"); console.log("appended");'
  // });
  chrome.tabs.executeScript(null, {file: "scripts/fillForms.min.js"});
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.method == "getInputValue") {
    	
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
	    var defaults = {
	        'EMAIL'    : {value:'f@ke.com'},
	        'PASSWORD' : {value:'Password123'},
	        'CARD_NO'  : {value:'4444333322221111'},
	        'CVV'      : {value:'123'},
	        'PHONE'    : {value:'79797979'},
	        'TEXT'     : {value: utils.randomText(request.maxLength)},
	        'USERNAME' : {value: 'u' + utils.getDateFormat('X')},
	        'URL'      : {value: 'http://www.fakeaddresshere.com'},
	        'NUMBER'   : {value: utils.randomNumber()},
	        'DATETIME' : {value: utils.getDateFormat('YYYY-MM-DDTHH:mm')},
	        'DATE'     : {value: utils.getDateFormat('YYYY-MM-DD')},
	        'TIME'     : {value: utils.getDateFormat('HH:mm')},
	        'WEEK'     : {value: utils.getDateFormat('GGGG-[W]WW')},
	        'MONTH'    : {value: utils.getDateFormat('YYYY-MM')}
	    };

		var val = localStorage[request.inputType];

		if (val != undefined) {
			sendResponse({data: val});	
		} else {
			sendResponse({data: defaults[request.inputType].value});
		}
    }
});