'use strict'

app.controller('AddIssueController',function($scope,$location,issueService){
    $scope.issueData={};
    $scope.allUsers=issueService.allUsersObj();
    console.log($scope.allUsers);

    $scope.addNewIssue=function(issueData){
        issueService.addIssue(issueData,function success(responce){
            console.log(responce);
        },function error(err){

        });
    }

})