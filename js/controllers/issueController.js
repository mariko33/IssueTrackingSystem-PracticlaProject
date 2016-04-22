'use strict'

app.controller('IssueController', function($scope,$q, $location, issueService,userService,notifyService){

    $scope.issue={};

    $scope.isHideIssue=false;


    $scope.getCurrentUserId=userService.getCurrentUser().then(function(response){
        console.log(response.data);
        $scope.currentUserId=response.data.Id;
        console.log($scope.currentUserId)
    },function(){});


    $scope.getIssue=function(){
        var id=$scope.issue.Id;
        issueService.getIssue(id).then(function(response){
            $scope.issueInfo=response.data;

            $scope.isHideIssue = true;
            $scope.issueChange={};
            $scope.isHideProject=false;

            $scope.isAssignee=function(){
                return $scope.issueInfo.Assignee.Id===$scope.currentUserId;
            };


            $scope.isProjectLead=function(){
                return $scope.issueInfo.Author.Id===$scope.currentUserId;
            };


            $scope.showIssueStatus=$scope.isAssignee;
            $scope.showEditIssue=$scope.isProjectLead;

            $scope.status={};

            $scope.changeIssueStatus=function(id,param){
                issueService.changeStatus(id,param).then(function(response){
                    console.log(response);
                    notifyService.showInfo("The status has been changed")

                },function(err){
                    notifyService.showError("Failed to change status",err);

                })

            }
        },function(){});


        $scope.viewProject=function(id){
              issueService.getProject(id).then(function(response){
                $scope.projectInfo=response.data;
                $scope.isHideProject = !$scope.isHideProject;

                console.log(response);
            },function(){})
        };

    };
    $scope.viewAnotherIssue=function(){
        $scope.isHideIssue=false;
    };






})