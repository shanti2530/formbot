// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
  'use strict';
  chrome.tabs.executeScript(null, {file: 'scripts/fillForms.min.js'});
});

(function loadValues() {
  'use strict';
  /* jshint ignore:start */
  include "utils.js"
  /* jshint ignore:end */

  //try to get the input value from the user defined values
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

  for (var d=0; d < defaults.length; d++) {
    var type = defaults[d].name;
    var val = localStorage[type];

    //if not found in the local storage then set the system default value
    if (val === undefined) {
      localStorage[type] = JSON.stringify({unique: false,
        defaultValue: defaults[d].value.defaultValue,
        includes: defaults[d].value.includes,
        excludes: defaults[d].value.excludes});
    } else{
      var jsonVal = JSON.parse(val);
      localStorage[type] = JSON.stringify({unique: jsonVal.unique,
        defaultValue: jsonVal.defaultValue,
        includes: defaults[d].value.includes,
        excludes: defaults[d].value.excludes});
    }
  }
})();

//Google analytics specific code, we load up the library so that when a message arrives we could send it through
/* jshint ignore:start */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-44998061-1']);
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
    /* jshint ignore:end */

    var getUniqueValue = function(inputType) {
      switch (inputType) {
        case 'TEXT':
          return chance.word({length: 7});
        case 'DOMAIN':
          return chance.domain();
        case 'EMAIL':
          return chance.email();
        case 'PASSWORD':
          return chance.string({length: 7});
        case 'CARD_NO':
          return chance.cc();
        case 'CVV':
          return chance.integer({min:100, max:999});
        case 'PHONE':
          return chance.phone();
        case 'USERNAME':
          return chance.word({length: 7});
        case 'URL':
          return 'http://' + chance.domain();
        case 'NUMBER':
          return chance.integer({min:1,max:99});
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

    var checkText = function(text) {
      if (text) {
        for (var i=0; i<localStorage.length; i++) {
          var key = localStorage.key(i);
          var keyDefinition = JSON.parse(localStorage.getItem(key));

          //check if the text provided is one of the included text
          var contains = utils.contains(keyDefinition.includes, text);
          if (contains) {
            var excluded = utils.contains(keyDefinition.excludes, text);

            if (!excluded) {
              if (keyDefinition.unique) {
                return [key, getUniqueValue(key)];
              } else {
                return [key, keyDefinition.defaultValue];
              }
            }
          }
        }
      }
    };

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

    } else if (request.method === 'checkInput') {

      var checker = checkText(request.id);
      if (checker) {
        _gaq.push(['_trackEvent', 'input-type', checker[0], 'ID|' + request.id]);
        sendResponse({key: checker[1]});
      } else {
        checker = checkText(request.name);
        if (checker) {
          _gaq.push(['_trackEvent', 'input-type', checker[0], 'NAME|' + request.name]);
          sendResponse({key: checker[1]});
        } else {
          checker = checkText(request.placeholder);
          if (checker) {
            _gaq.push(['_trackEvent', 'input-type', checker[0], 'PLACEHOLDER|' + request.placeholder]);
            sendResponse({key: checker[1]});
          } else {
            checker = checkText(request.type);
            if (checker) {
              _gaq.push(['_trackEvent', 'input-type', checker[0], 'TYPE|' + request.type]);
              sendResponse({key: checker[1]});
            } else {
              _gaq.push(['_trackEvent', 'input-type', checker[0], 'TYPE|' + request.type]);
              sendResponse({key: checkText('TEXT')});
            }
          }
        }
      }

    } else if (request.method === 'analytics') {
      _gaq.push(['_trackEvent', request.category, request.action, request.label]);
    }
  }
);