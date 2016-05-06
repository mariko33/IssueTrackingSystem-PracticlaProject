'use strict'

app.controller('AddIssueController',function($scope,$location,$routeParams,issueService){
    var Id=$routeParams.Id;
    $scope.issueData={};
    $scope.issueData.Project=Id;


    /*$scope.labels=[];
    var temp=$scope.issueData.Labels;
    for (var i=0;i<temp.length;i++){
        $scope.labels.push(temp[i]['Name']);
    };
*/


    $scope.allUsers=issueService.allUsersObj();
    console.log($scope.allUsers);

    /*$scope.addData={
        'Title':$scope.issueData.Title,
        'Description':$scope.issueData.Description,
        'DueDate':$scope.issueData.DueDate,
        'AssigneeId':$scope.issueData.AssigneeId,
        'Project':$scope.issueData.Project,
        'PriorityId':$scope.issueData.PriorityId,
        'Labels':$scope.issueData.Labels

    };*/

    var data=$scope.addData;


    $scope.addNewIssue=function(){
        var temp=$scope.issueData.Labels;
        $scope.labels=[];
        for (var i=0;i<temp.length;i++){
            var label={'Name':temp[i]}
            $scope.labels.push(label);


        }
        $scope.addData={
            'Title':$scope.issueData.Title,
            'Description':$scope.issueData.Description,
            'DueDate':$scope.issueData.DueDate,
            'AssigneeId':$scope.issueData.AssigneeId,
            'ProjectId':$scope.issueData.Project,
            'PriorityId':$scope.issueData.PriorityId,
            'Labels':$scope.labels

        };
        issueService.addIssue($scope.addData).then(function(response){
            $scope.resultAdd=response;
            console.log(response);
        },function(err){
            console.log(err);
        })
    }

})