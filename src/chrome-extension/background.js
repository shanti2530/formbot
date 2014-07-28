// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
  'use strict';
  chrome.tabs.executeScript(null, {file: 'scripts/fillForms.min.js'});
});

(function loadValues() {
  'use strict';
  /* jshint ignore:start */
  include "utils.js"
  include "systemdefaults.js"
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
})();

//Google analytics specific code, we load up the library so that when a message arrives we could send it through
/* jshint ignore:start */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-49960543-2']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
/* jshint ignore:end */

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
    } else if (request.method === 'analytics') {
      _gaq.push(['_trackEvent', request.category, request.action, request.label]);
    }
  }
);