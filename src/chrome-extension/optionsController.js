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
}]);