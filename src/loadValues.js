/**
 * Created with JetBrains WebStorm.
 * User: Maria
 * Date: 30/11/14
 * Time: 15:54
 * To change this template use File | Settings | File Templates.
 */

(function loadValues() {
  'use strict';

  var utils = {
    getDateFormat:
      function(format) {
        'use strict';
        if (typeof moment === 'function') {
          return moment().format(format);
        }
      },
    isEmpty:
      function(obj) {
        return Object.keys(obj).length === 0;
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
          priority: val.value.priority});

        chrome.storage.sync.set(newObject);
      }
      //TODO: check for values fields instead of fields only
    });
  };

  //try to get the input value from the user defined values
  var defaults = [
    {name:'USERNAME',
      value: {
        defaultValue: 'john',
        includes: ['username', 'userId'],
        uniqueConfig: {type: 'WORD', min:7, max:7},
        priority:1
      }
    },
    {name:'PASSWORD',
      value: {
        defaultValue:'Password123',
        includes: ['pass'],
        uniqueConfig: {type: 'WORD', min:7, max:10},
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
        uniqueConfig: {type: 'WORD', min:7, max: 10},
        priority:15
      }
    }
  ];

  //load all information into chrome store if it does not exist already
  for (var i=0; i < defaults.length; i++) {
    var val = defaults[i];
    setValue(val);
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
