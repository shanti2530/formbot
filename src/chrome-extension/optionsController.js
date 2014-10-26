/**
 * Created with JetBrains WebStorm.
 * User: Maria
 * Date: 13/07/14
 * Time: 14:49
 */

var myApp = angular.module('FormbotApp', []);

myApp.controller('optionsController', ['$scope', function($scope) {

  $scope.options = [];

  for(var i= 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var obj = {name: key, value : JSON.parse(localStorage.getItem(key))};
    $scope.options.push(obj);
  }

  $scope.changeChecked = function(option) {
    option.value.unique = !option.value.unique;
  }

  var splitter = /(?=\S)[^,]+?(?=\s*(,|$))/g;

  $scope.$watch('options', function() {
    if ($scope.options[0].value.defaultValue) {

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

        localStorage[option.name] = JSON.stringify({unique: option.value.unique,
          defaultValue: option.value.defaultValue,
          includes: includes,
          excludes: excludes,
          priority: option.value.priority});
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