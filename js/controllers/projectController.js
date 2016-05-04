'use strict'

app.controller('ProjectController',function($scope,$q,$location,$routeParams, issueService,notifyService){
   // $scope.project={};

    var Id=$routeParams.Id;
    $scope.myProject={};

    $scope.isHideProject=false;
    $scope.isHideEdit=false;


    $scope.getProject= issueService.getProject(Id).then(function(response){
            $scope.projectInfo=response.data;
            $scope.isHideProject = true;

            console.log(response);
        },function(){});

    $scope.viewAnotherProject=function(){
        $scope.isHideProject=false;
    };
    $scope.edit=function(){
        $scope.isHideProject=false;
        $scope.isHideEdit=true;

    };

    $scope.projectEdit={};
    $scope.projectEdit.labels=[];
    $scope.projectEdit.priorities=[];
    $scope.projectEdit.labels=[];

    $scope.editProject=function(id,data){
        issueService.editProject(id,data).then(function(response){
            console.log(response);
            notifyService.showInfo(response.statusText);
            $scope.isHideEdit=false;

        },function(err){
            console.log(err)
            notifyService.showError("Failed to edit", err)
        })
    };

    $scope.returnToDashboard=function(){
        $location.path('/dashboard');
    }


})