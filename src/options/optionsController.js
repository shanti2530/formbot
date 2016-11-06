/**
 * Created with JetBrains WebStorm.
 * User: Maria
 * Date: 13/07/14
 * Time: 14:49
 */

var myApp = angular.module('FormbotApp', []);

myApp.controller('optionsController', ['$scope', function($scope) {

  $scope.options = [];

  $scope.uniqueTypes = [
    "WORD",
    "DOMAIN",
    "NUMBER",
    "EMAIL",
    "CARD",
    "PHONE",
    "DATETIME",
    "DATE",
    "TIME",
    "MONTH",
    "WEEK"
  ];

  chrome.storage.sync.get(null, function(data){
    var keys = Object.keys(data);
    for(var i= 0; i < keys.length; i++) {
      var key = keys[i];
      //the userprofile is not a valid key for input prefils
      if (key == 'USERPROFILE') {
        continue;
      }
      var obj = {name: key, value : JSON.parse(data[key])};
      $scope.options.push(obj);
    }

    $scope.$apply();

  });

  $scope.changeChecked = function(option) {
    option.value.unique = !option.value.unique;
  }

  var splitter = /(?=\S)[^,]+?(?=\s*(,|$))/g;

  //save updates
  $scope.$watch('options', function() {
    if (angular.isDefined($scope.options)) {

      for(var i=0; i<$scope.options.length; i++) {
        var option = $scope.options[i];

        var includes;
        if (option.value.includes && !Array.isArray(option.value.includes)) {
          includes = option.value.includes.match(splitter);
        } else {
          includes = option.value.includes;
        }

        if (option.value.excludes && !Array.isArray(option.value.excludes)) {
          var excludes = option.value.excludes.match(splitter);
        } else {
          excludes = option.value.excludes;
        }

        var obj = new Object();
        obj[option.name] = JSON.stringify({unique: option.value.unique,
          defaultValue: option.value.defaultValue,
          includes: includes,
          excludes: excludes,
          uniqueConfig: option.value.uniqueConfig,
          priority: option.value.priority});

        chrome.storage.sync.set(obj);
      }
    }

  }, true);

}]);

myApp.filter('displayArray', function(){
  return function(input) {

    var str = "";
    if (input) {
      for(var i = 0; i< input.length; i++) {
        str = str + input[i] + ',';
      }
      return str.substring(0, str.length-1);
    }

    return str;
  }
});