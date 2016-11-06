// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
  'use strict';
  chrome.tabs.executeScript(null, {file: 'scripts/fillForms.min.js'});
});

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

var utils = {
  getDateFormat: function(format) {
    'use strict';
    if (typeof moment === 'function') {
      return moment().format(format);
    }
  },
  isEmpty: function(obj) {
    return Object.keys(obj).length === 0;
  },
  contains: function (array, needle) {
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
  },
  remove: function (array, toRemove) {
    if (array && array.length > 0) {
    
      var index = array.indexOf(toRemove);
      if (index > -1) {
        array.splice(index, 1);
      }

    }
    return array;
  }
};

//check if there is a token already stored, if not, try to get it and store it
chrome.storage.sync.get('USERPROFILE', function(data) {
  if (utils.isEmpty(data) || data.USERPROFILE == undefined || data.USERPROFILE.TOKEN == undefined) {
    chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
      //store token
      chrome.storage.sync.set({USERPROFILE:{TOKEN:token}});
    });    
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    'use strict';

    var getUniqueValue = function(uniqueConfig) {

      switch (uniqueConfig.type) {
        case 'WORD':
          return chance.word({length: uniqueConfig.length});
        case 'DOMAIN':
          return chance.domain();
        case 'EMAIL':
          return chance.email();
        case 'CARD':
          return chance.cc();
        case 'PHONE':
          return chance.phone();
        case 'NUMBER':
          return chance.integer({min:uniqueConfig.min, max:uniqueConfig.max});
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
            //the userprofile field should not be considered as data to compare with
            utils.remove(keys, 'USERPROFILE');

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
                resolve([mostImportant.key, getUniqueValue(mostImportant.definition.uniqueConfig)]);
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
        return;
      } else {
        //get the first piece of data and try to find a valid value to fill with
        var value = values[0];
      }
      
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
      valueArray.push({type:'TYPE', value:'TEXT'});

      //call function which would async send the response back
      valueFiller(valueArray);

      //return true to indicate that the response will be async
      return true;

    } else if (request.method === 'analytics') {
      _gaq.push(['_trackEvent', request.category, request.action, request.label]);
    }
  }
);

////create the context menu item
//chrome.contextMenus.create({title: 'Formbot Save data'});
//
////function called when the context menu item is clicked
//chrome.contextMenus.onClicked.addListener(function(info) {
//  'use strict';
//  console.log('as %o', info);
//  console.log(document.querySelectorAll('input'));
//});


chrome.runtime.onInstalled.addListener(function() {
  'use strict';
  console.log('on installed');

  var setValue = function(val) {

    //check if the value already exists in the store
    chrome.storage.sync.get(val.name, function(data){

      //if not found we need to store it
      if (utils.isEmpty(data)) {

        var newObject = new Object();
        newObject[val.name] = JSON.stringify({unique: true,
          defaultValue: val.value.defaultValue,
          includes: val.value.includes,
          excludes: val.value.excludes,
          uniqueConfig: val.value.uniqueConfig,
          priority: val.value.priority});

        chrome.storage.sync.set(newObject);

      } else {
        //if the key is already stored, make sure that it has a uniqueConfig field
        var keys = Object.keys(data);
        var dataVal = data[keys[0]];
        var jsonVal = JSON.parse(dataVal);

        jsonVal.uniqueConfig = val.value.uniqueConfig;
        var newObject = new Object();
        newObject[val.name] = JSON.stringify(jsonVal);
        chrome.storage.sync.set(newObject);
      }
    });
  };

  //try to get the input value from the user defined values
  var defaults = [
    {name:'USERNAME',
      value: {
        defaultValue: 'john',
        includes: ['username', 'userId'],
        uniqueConfig: {type: 'WORD', length:7},
        priority:1
      }
    },
    {name:'PASSWORD',
      value: {
        defaultValue:'Password123',
        includes: ['pass'],
        uniqueConfig: {type: 'WORD', length:7},
        priority:2
      }
    },
    {name:'EMAIL',
      value: {defaultValue:'f@ke.com',
        includes: ['mail'],
        uniqueConfig: {type: 'EMAIL'},
        priority:3
      }
    },
    {name:'CARD_NO',
      value: {
        defaultValue:'4444333322221111',
        includes: ['card'],
        excludes: ['name', 'code'],
        uniqueConfig: {type:'CARD'},
        priority:4
      }
    },
    {name:'CVV',
      value: {
        defaultValue:'123',
        includes: ['cvv', 'cvc', 'cv2'],
        uniqueConfig: {type: 'NUMBER', min:100, max:999},
        priority:5
      }
    },
    {name:'PHONE',
      value: {
        defaultValue:'79797979',
        includes: ['phone', 'tel', 'mobile'],
        uniqueConfig: {type: 'PHONE'},
        priority:6
      }
    },
    {name:'DOMAIN',
      value: {
        defaultValue: 'fakeaddresshere.com',
        includes: ['domain'],
        uniqueConfig: {type: 'DOMAIN'},
        priority:7
      }
    },
    {name:'URL',
      value: {
        defaultValue: 'http://www.fakeaddresshere.com',
        includes: ['url', 'site'],
        uniqueConfig: {type: 'DOMAIN'},
        priority:8
      }
    },
    {name:'NUMBER',
      value: {
        defaultValue: 5,
        includes: ['number', 'amount', 'range'],
        uniqueConfig: {type: 'NUMBER', min:1, max:99},
        priority:9
      }
    },
    {name:'DATETIME',
      value: {
        defaultValue: utils.getDateFormat('YYYY-MM-DDTHH:mm'),
        includes: ['datetime'],
        uniqueConfig: {type: 'DATETIME'},
        priority:10
      }
    },
    {name:'DATE',
      value: {
        defaultValue: utils.getDateFormat('YYYY-MM-DD'),
        includes: ['date'],
        uniqueConfig: {type: 'DATE'},
        priority:11
      }
    },
    {name:'TIME',
      value: {
        defaultValue: utils.getDateFormat('HH:mm'),
        includes: ['time'],
        uniqueConfig: {type: 'TIME'},
        priority:12}},
    {name:'WEEK',
      value: {
        defaultValue: utils.getDateFormat('GGGG-[W]WW'),
        includes: ['week'],
        uniqueConfig: {type: 'WEEK'},
        priority:13
      }
    },
    {name:'MONTH',
      value: {
        defaultValue: utils.getDateFormat('YYYY-MM'),
        includes: ['month'],
        uniqueConfig: {type: 'MONTH'},
        priority:14}},
    {name:'TEXT',
      value: {
        defaultValue: 'Lorem',
        includes: ['text'],
        uniqueConfig: {type: 'WORD', length: 7},
        priority:15
      }
    }
  ];

  //load all information into chrome store if it does not exist already
  for (var i=0; i < defaults.length; i++) {
    var val = defaults[i];
    setValue(val);
  }

});
