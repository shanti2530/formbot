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
    });
  };

  //try to get the input value from the user defined values
  var defaults = [
    {name:'USERNAME', value: {defaultValue: 'john', includes: ['username', 'userId'], priority:1}},
    {name:'PASSWORD', value: {defaultValue:'Password123', includes: ['pass'], priority:2}},
    {name:'EMAIL',    value: {defaultValue:'f@ke.com', includes: ['mail'], priority:3}},
    {name:'CARD_NO',  value: {defaultValue:'4444333322221111', includes: ['card'], excludes: ['name', 'code'], priority:4}},
    {name:'CVV',      value: {defaultValue:'123', includes: ['cvv', 'cvc', 'cv2'], priority:5}},
    {name:'PHONE',    value: {defaultValue:'79797979', includes: ['phone', 'tel', 'mobile'], priority:6}},
    {name:'DOMAIN',   value: {defaultValue: 'fakeaddresshere.com', includes: ['domain'], priority:7}},
    {name:'URL',      value: {defaultValue: 'http://www.fakeaddresshere.com', includes: ['url', 'site'], priority:8}},
    {name:'NUMBER',   value: {defaultValue: 5, includes: ['number', 'amount', 'range'], priority:9}},
    {name:'DATETIME', value: {defaultValue: utils.getDateFormat('YYYY-MM-DDTHH:mm'), includes: ['datetime'], priority:10}},
    {name:'DATE',     value: {defaultValue: utils.getDateFormat('YYYY-MM-DD'), includes: ['date'], priority:11}},
    {name:'TIME',     value: {defaultValue: utils.getDateFormat('HH:mm'), includes: ['time'], priority:12}},
    {name:'WEEK',     value: {defaultValue: utils.getDateFormat('GGGG-[W]WW'), includes: ['week'], priority:13}},
    {name:'MONTH',    value: {defaultValue: utils.getDateFormat('YYYY-MM'), includes: ['month'], priority:14}},
    {name:'TEXT',     value: {defaultValue: 'Lorem', includes: ['text'], priority:15}}
  ];

  //load all information into chrome store if it does not exist already
  for (var i=0; i < defaults.length; i++) {
    var val = defaults[i];
    setValue(val);
  }
  chrome.extension.sendMessage({
      method: 'retrieveStoredValues',
      valueName: null}, //get all values
    function(response) {

      var data;
      if (response) {
       data = response.value;
      } else {
        data = {};
      }
      var storedData = [];

      //get all the data which is already stored in the user's chrome storage
      var keys = Object.keys(data);
      for(var i= 0; i < keys.length; i++) {
        var key = keys[i];
        var obj = {name: key, value : JSON.parse(data[key])};
        storedData.push(obj);
      }

      //for each default value defined, check if it exists in the user's chrome storage
      //if not store it for the user.
      //else do not update it as the user would lose any configured data
      for (var d=0; d < defaults.length; d++) {
        var type = defaults[d].name;
        var found = false;

        for(var a=0; a < storedData.length; a++){
          if (storedData[a].name === type){
            found = true;
            break;
          }
        }

        //a default value was not found, store it
        if (!found) {
          var val = defaults[d].value;

          var newObject = new Object();
          newObject[type] = JSON.stringify({unique: true,
            defaultValue: val.defaultValue,
            includes: val.includes,
            excludes: val.excludes,
            priority: val.priority});

          //send message to store value
          chrome.extension.sendMessage({method: 'storeValue', newValue: newObject});
        }
      }
    });
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
