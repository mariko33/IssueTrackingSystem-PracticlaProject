'use strict'

app.controller('DashboardUserController',function($scope,$location, $q,authService,$route, issueService,userService){
    $scope.addParams={
        'orderBy':'DueDate',
        'pageSize':'10',
        'pageNumber':'1'
    }
    $scope.getCurrentUser=function(){
        userService.getCurrentUser(function(success){
            console.log('success');
        },function(errorr){

        })
    };
//var param=$scope.addParams;

    /*$scope.issueMe=issueService.getIssueMe($scope.addParams)
        .then($scope.issues=issueService.myIssuesObj().Issues);
*/

    /*$scope.issueMe=issueService.getIssueMe($scope.addParams).then(function(responce){
        $scope.issues=responce.data.Issues;
        console.log(response);
    });*/

     $scope.issueMe=issueService.getIssueMe($scope.addParams).then(function(response){
     $scope.issues=response.data.Issues;
     console.log($scope.issues);
     });




    $scope.getAllProject=issueService.getAllProject().then(function(response){
        $scope.allProjects=response.data;
        console.log($scope.allProjects);
    });

    //$scope.isHideIssues=false;
    /*$scope.hideIssues=function(){
        $scope.isHideIssues=!$scope.isHideIssues;
    };*/
    $scope.isHideProjects=false;
    $scope.hideProjects=function(){
        $scope.isHideProjects=!$scope.isHideProjects;


    };

    $scope.isAdminStatus=userService.getCurrentUser().then(function(response){
        console.log(response.data.isAdmin);
        $scope.isAdmin=response.data.isAdmin;
    },function(){});


    $scope.add=function(){
        $location.path('/projects/add');
    };
    $scope.addIssue=function(id){
        $scope.currentProjectId=id;
        console.log(id);
        $location.path('/issue/add');

    };
    $scope.editIssue=function(){
        $location.path('/issue/edit');
    };

    $scope.changePassword=function(){
        $location.path('/changePassword');
    };

    $scope.logout=function(){
        authService.logout();
        $location.path('/')

    };
    $scope.viewMyIssues=function(){
        $location.path('/issues');
    }



});