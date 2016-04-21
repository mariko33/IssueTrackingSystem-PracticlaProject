'use strict'

app.controller('IssueController', function($scope,$q, $location, issueService){

    $scope.issue={};

    $scope.isHideIssue=false;

    $scope.getIssue=function(){
        var id=$scope.issue.Id;
        issueService.getIssue(id).then(function(response){
            $scope.issueInfo=response.data;
            $scope.isHideIssue = true;
            console.log($scope.issueInfo);
        },function(){})
    };
    $scope.viewAnotherIssue=function(){
        $scope.isHideIssue=false;
    }




})