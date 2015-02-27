// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
  'use strict';
  chrome.tabs.executeScript(null, {file: 'scripts/fillForms.min.js'});
});

var utils = {
  getDateFormat:
    function(format) {
      'use strict';
      if (typeof moment === 'function') {
        return moment().format(format);
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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    'use strict';

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

      //custom ordering function .. according to the field priority
      var sortByPriority = function (a,b) {
        if (a.definition.priority < b.definition.priority) {
          return -1;
        }
        if (a.definition.priority > b.definition.priority) {
          return 1;
        }
        return 0;
      };

      //a promise is required as the stored values to compare with are being returned
      // in an async process .. therefore we need to wait
      return new Promise(function (resolve, reject) {
        if (!text) {
          reject();
        } else {

          chrome.storage.sync.get(null, function(data){
            var validKeys = [];

            var keys = Object.keys(data);

            for (var i=0; i < keys.length; i++) {
              var key = keys[i];

              var keyDefinition = JSON.parse(data[key]);

              //check if the text provided is one of the included text
              var contains = utils.contains(keyDefinition.includes, text);
              if (contains) {
                var excluded = utils.contains(keyDefinition.excludes, text);

                if (!excluded) {
                  validKeys.push({key: key, definition: keyDefinition});
                }
              }
            }

            if (validKeys && validKeys.length > 0) {
              validKeys.sort(sortByPriority);

              var mostImportant = validKeys[0];

              if (mostImportant.definition.unique) {
                resolve([mostImportant.key, getUniqueValue(mostImportant.key)]);
              } else {
                resolve([mostImportant.key, mostImportant.definition.defaultValue]);
              }
            } else {
              reject();
            }
          });
        }
      });
    };

    //recursively try to find a valid value to fill the input with given the data
    var valueFiller = function (values) {

      // values array structure
      // [{type: 'ID', value:'aa'}, {type: 'NAME', value: 'bb'}]

      if (!values || values.length === 0) {
        _gaq.push(['_trackEvent', 'input-type', 'TEXT', 'TYPE|' + request.type]);
        sendResponse({key: checkText('TEXT')});
      }

      //get the first piece of data and try to find a valid value to fill with
      var value = values[0];

      checkText(value.value).then(
        //success function .. a value has been found to fill the input with
        function (data) {
          _gaq.push(['_trackEvent', 'input-type', data[0], value.type + '|' + value.value]);
          sendResponse({key: data[1]});
        },
        //fail function .. no matching value has been found .. retry
        function () {
          values.shift();
          valueFiller(values);
        }
      );
    };

    if (request.method === 'checkInput') {

      //prepare data for processing
      var valueArray = [
        {type: 'ID', value: request.id},
        {type: 'NAME', value: request.name},
        {type: 'PLACEHOLDER', value: request._placeholder},
        {type: 'TYPE', value: request.type}
      ];

      //call function which would async send the response back
      valueFiller(valueArray);

      //return true to indicate that the response will be async
      return true;

    } else if (request.method === 'analytics') {
      _gaq.push(['_trackEvent', request.category, request.action, request.label]);
    }
  }

);

//required by typekit in order to always send the referer
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  'use strict';
  var requestHeaders = details.requestHeaders;
  for (var i=0; i<requestHeaders.length; ++i) {
    if (requestHeaders[i].name.toLowerCase() === 'referer') {
      // The request was certainly not initiated by a Chrome extension...
      return;
    }
  }
  // Set Referer
  requestHeaders.push({
    name: 'referer',
    // Host must match the domain in your Typekit kit settings
    value: 'https://fekpdndhlbaagbhmlfhahnknjjcdjppd/'
  });
  return {
    requestHeaders: requestHeaders
  };
}, {
  urls: ['*://use.typekit.net/*'],
  types: ['stylesheet']
}, ['requestHeaders','blocking']);

//create the context menu item
chrome.contextMenus.create({title: 'Formbot Save data'});

//function called when the context menu item is clicked
chrome.contextMenus.onClicked.addListener(function(info) {
  console.log('as %o', info);
  console.log(document.querySelectorAll('input'));
});