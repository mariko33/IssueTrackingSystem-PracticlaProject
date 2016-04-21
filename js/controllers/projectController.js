'use strict'

app.controller('ProjectController',function($scope,$q,issueService){
    $scope.project={};

    $scope.isHideProject=false;

    $scope.getProject=function(){
        var id=$scope.project.Id;
        issueService.getProject(id).then(function(response){
            $scope.projectInfo=response.data;
            $scope.isHideProject = true;
            console.log(response);
        },function(){})
    };
    $scope.viewAnotherProject=function(){
        $scope.isHideProject=false;
    };



})