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

<<<<<<< HEAD
  $routeProvider.when('/login',{
    templateUrl:'templates/login.html',
    controller:'LoginController'
  });
  $routeProvider.when('/dashboard',{
    templateUrl:'templates/dashboard.html',
    controller:'DashboardUserController'
  });

  $routeProvider.when('/projects/add',{
    templateUrl:'templates/Add-new-project.html',
    controller:'AddProjectController'
  });
  $routeProvider.when('/issue/add',{
    templateUrl:'templates/Add-new-issue.html',
    controller:'AddIssueController'
  });
  $routeProvider.when('/issue/edit',{
    templateUrl:'templates/edit-issue.html',
    controller:'EditIssueController'
  });

  $routeProvider.when('/changePassword',{
    templateUrl:'templates/changePassword.html',
    controller:'ChangeUserPassword'
  })

=======
>>>>>>> parent of 6dc06f5... AddRegisterLogin
})
