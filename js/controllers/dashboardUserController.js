'use strict'

app.controller('DashboardUserController',function($scope,$location, $q,authService,$route, issueService,userService){
    $scope.addParams={
        'orderBy':'DueDate',
        'pageSize':'10',
        'pageNumber':'1'
    };
    /*$scope.getCurrentUser=function(){
        userService.getCurrentUser(function(success){
          $scope.currentUserId=success.data.Id;
           // console.log($scope.currentUser);
        },function(errorr){

        })

        return $scope.currentUserId;
    };
*/
    $scope.getCurrentUser=userService.getCurrentUser().then(function(response){
            $scope.cUser=response.data.Id.toString();
        console.log($scope.cUser);
        var filter='Lead.Id='+$scope.cUser;




        $scope.myAllProjects=issueService.getMyProjects(50,$scope.cUser).then(function (response) {
                $scope.myProjects = response.data.Projects;
                console.log($scope.myProjects);


            }, function (err) {
                console.log(err)

            });


        },function(err){
            console.log(err)
        })







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

    $scope.isHideMyProjects=false;
    $scope.hideMyProjects=function(){
        $scope.isHideMyProjects=!$scope.isHideMyProjects;
        /*$scope.myAllProjects();*/
    }

    $scope.isAdminStatus=userService.getCurrentUser().then(function(response){
        console.log(response.data.isAdmin);
        $scope.isAdmin=response.data.isAdmin;
    },function(){});

    /*$scope.getCurrentUserId=function() {
        userService.getCurrentUser().then(function (response) {
            return  response.data.Id;

        }, function () {
        });
    }*/
/*
    $scope.addParamsMyProjects={
        'Lead.Id':$scope.cUser,
        'pageSize':'50',
        'pageNumber':'1'
    };

    $scope.myAllProjects=function() {
        issueService.getMyProjects($scope.addParamsMyProjects).then(function (response) {
            $scope.myProjects = response.data;
            console.log($scope.myProjects);
            console.log($scope.addParamsMyProjects)

        }, function (err) {
            console.log(err)

        });
    };*/

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
    };
    $scope.viewProject=function(){
        $location.path('/projects');
    }



});