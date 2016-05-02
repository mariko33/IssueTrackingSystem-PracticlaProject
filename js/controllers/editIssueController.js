'use strict'

app.controller('EditIssueController',function($scope,$q,$routeParams,$route,$location,issueService,notifyService,userService){
    var Id=$routeParams.Id;

    Array.prototype.sortBy=function(property){
        return this.slice(0).sort(function(a,b){
            return(a[property]>b[property])?1:(a[property]<b[property])?-1:0;
        });
    };

    $scope.getCurrentUserId=userService.getCurrentUser().then(function(response){
        console.log(response.data);
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

        $scope.showIssueStatus=$scope.isAssignee()||$scope.isProjectLead()||userService.isAdmin();
        $scope.showEditIssue=$scope.isProjectLead()||userService.isAdmin();

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


    /*$scope.getIssueComments=issueService.getIssuesComments(Id).then(function(response){
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
    };
*/

    $scope.editIssue=function(){
        $scope.data={};
        $scope.labels=[];
        var temp=$scope.issueInfo.Labels;
        for (var i=0;i<temp.length;i++){
            $scope.labels.push(temp[i]['Name']);
        };



        $scope.data={
            'Title':$scope.issueInfo.Title,
            'Description':$scope.issueInfo.Description,
            'DueDate':$scope.issueInfo.DueDate,
            'ProjectId':$scope.issueInfo.Project.Id,
            'AssigneeId':$scope.issueInfo.AssigneeChange.Id,
            'PriorityId':$scope.issueInfo.Priority.Id,
            'Label':$scope.labels

        };



        var data=$scope.data;

        issueService.editIssue(Id,data).then(function(response){
            console.log(response);
            notifyService.showInfo(response.statusText);
            $route.reload();
            //$scope.isHideEdit=false;

        },function(err){
            console.log(err)
            notifyService.showError("Failed to edit", err.data.Mesage)
            $route.reload();
        })
    };

    $scope.allUsers=issueService.allUsersObj();
    $scope.allUsers=$scope.allUsers.sortBy('Username');

    $scope.returnToDashboard=function(){
        $location.path('/dashboard');
    };


});