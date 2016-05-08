'use strict';

// Declare app level module which depends on views, and components

var app=angular.module('myApp', [
  'ngRoute'


]);


/*
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
*/

app.constant('baseServiceUrl','http://softuni-issue-tracker.azurewebsites.net/');
app.constant('pageSize', 4);

app.config(function($routeProvider){
  /*$routeProvider.when('/',{
    templateUrl:'templates/home.html',
    controller:'HomeController'
  });*/

  $routeProvider.when('/register',{
    templateUrl:'templates/register.html',
    controller:'RegisterController'
  });

  $routeProvider.when('/',{
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
  $routeProvider.when('/issue/:Id/edit',{
    templateUrl:'templates/edit-issue.html',
    controller:'EditIssueController'
  });

  $routeProvider.when('/changePassword',{
    templateUrl:'templates/changePassword.html',
    controller:'ChangeUserPassword'
  });
  $routeProvider.when('/issues/:Id', {
    templateUrl: 'templates/issuePage.html',
    controller: 'IssueController'
  });
  $routeProvider.when('/projects/:Id', {
    templateUrl: 'templates/projectPage.html',
    controller: 'ProjectController'
  });
  $routeProvider.when('/projects/:Id/add-issue',{
    templateUrl:'templates/Add-new-issue.html',
    controller:'AddIssueController'
  });

  $routeProvider.when('/projects/:Id/edit',{
    templateUrl:'templates/edit-project.html',
    controller:'EditProjectController'
  });
  $routeProvider.when('/projects',{
    templateUrl:'templates/projects.html',
    controller:'ProjectsListController'

  });

  $routeProvider.otherwise(
      {redirectTo: '/'}
  );



})

app.run(function ($rootScope, $location, authService) {
       $rootScope.$on('$locationChangeStart', function (event) {
             if($location.path().indexOf("/dashboard") != -1 && !authService.isLoggedIn()) {
                   $location.path('/');
               }
         });


  $rootScope.$on('$locationChangeStart', function (event) {
    if($location.path().indexOf("/projects/") != -1 && !authService.isLoggedIn()) {
      $location.path('/');
    }
  });

  $rootScope.$on('$locationChangeStart', function (event) {
    if($location.path().indexOf("/issue/") != -1 && !authService.isLoggedIn()) {
      $location.path('/');
    }
  });

  $rootScope.$on('$locationChangeStart', function (event) {
    if($location.path().indexOf("/issues/") != -1 && !authService.isLoggedIn()) {
      $location.path('/');
    }
  });
  $rootScope.$on('$locationChangeStart', function (event) {
    if($location.path().indexOf("/projects") != -1 && !authService.isLoggedIn()) {
      $location.path('/');
    }
  });




})




