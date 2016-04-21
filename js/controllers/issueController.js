'use strict'

app.controller('IssueController', function($scope,$q, $location, issueService){

    $scope.issue={};

    $scope.isHideIssue=false;

    $scope.getIssue=function(){
        var id=$scope.issue.Id;
        issueService.getIssue(id).then(function(response){
            $scope.issueInfo=response.data;
            $scope.isHideIssue = true;
            $scope.issueChange={};

            $scope.changeIssueStatus=function(id,param){
                issueService.changeStatus(id,param).then(function(response){
                    console.log(response);
                },function(err){

                })

            }
        },function(){})
    };
    $scope.viewAnotherIssue=function(){
        $scope.isHideIssue=false;
    };




})