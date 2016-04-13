'use strict';

// Declare app level module which depends on views, and components

var app=angular.module('myApp', [
  'ngRoute'

])

/*.
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);*/

app.constant('baseUrl','http://softuni-issue-tracker.azurewebsites.net');
app.config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl:'templates/home.html',
    controller:'HomeController'
  });

  $routeProvider.when('/register',{
    templateUrl:'templates/register.html',
    controller:'RegisterController'
  });

})
