'use strict'

app.controller('IssueController', function($scope,$q, $location, $routeParams, issueService,userService,notifyService){

    $scope.issue={};

    $scope.isHideIssue=false;
    var Id=$routeParams.Id;


    $scope.getCurrentUserId=userService.getCurrentUser().then(function(response){
        console.log(response.data);
        $scope.isAdminUser=response.data.isAdmin;
        $scope.currentUserId=response.data.Id;
        console.log($scope.currentUserId)
    },function(){});

    $scope.getIssue=issueService.getIssue(Id).then(function(response){
        $scope.issueInfo=response.data;
        $scope.isAssignee=function(){
            return $scope.issueInfo.Assignee.Id===$scope.currentUserId;
        };


        $scope.isProjectLead=function(){
            return $scope.issueInfo.Author.Id===$scope.currentUserId;
        };
        $scope.isAdmin=function(){
            return $scope.isAdminUser;
            console.log($scope.isAdminUser);
        }
        $scope.showIssueStatus=$scope.isAssignee;
        $scope.showEditIssue=$scope.isProjectLead;

        $scope.status={};

        $scope.changeIssueStatus=function(param){
            issueService.changeStatus(Id,param).then(function(response){
                console.log(response);
                notifyService.showInfo("The status has been changed")

            },function(err){
                notifyService.showError("Failed to edit", err)
            })

        }


    },function(err){
        console.log(err)
    });

    $scope.getIssueComments=issueService.getIssuesComments(Id).then(function(response){
        console.log(response);
        $scope.comments=response.data;
    },function(err){
        console.log(err)
    })

    $scope.comment={};

    $scope.addComments=function(){
        issueService.addIssuesComments(Id,$scope.comment).then(function(response){
            notifyService.showInfo('The comment is added');

            console.log(response)
        },function(err){
            notifyService.showError('The comment was not added',err);
            console.log(err)

        })
    }

    $scope.returnToDashboard=function(){
        $location.path('/dashboard');
    };

    $scope.editIssue=function(){
        $location.path('/issue/'+Id+'/edit')
    };


})