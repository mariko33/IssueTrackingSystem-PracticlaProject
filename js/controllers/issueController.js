'use strict'

app.controller('IssueController', function($scope,$q, $location, $routeParams, issueService,userService,notifyService){

    $scope.issue={};

    $scope.isHideIssue=false;
    var Id=$routeParams.Id;


    $scope.getCurrentUserId=userService.getCurrentUser().then(function(response){
        console.log(response.data);
        $scope.currentUserId=response.data.Id;
        console.log($scope.currentUserId)
    },function(){});


    /*Date.prototype.yyyymmdd = function() {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = this.getDate().toString();
        return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
    };

   var currentDate = new Date();
*/




    $scope.getIssue=issueService.getIssue(Id).then(function(response){
        $scope.issueInfo=response.data;
        $scope.isAssignee=function(){
            return $scope.issueInfo.Assignee.Id===$scope.currentUserId;
        };


        $scope.isProjectLead=function(){
            return $scope.issueInfo.Author.Id===$scope.currentUserId;
        };
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
    }



    /*$scope.getIssue=function(){

        //var id=$scope.issue.Id;
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
     $scope.status={};

     $scope.changeIssueStatus=function(id,param){
     issueService.changeStatus(id,param).then(function(response){
     console.log(response);
     notifyService.showInfo("The status has been changed")

     },function(err){
     notifyService.showError("Failed to change status",err);

     })

     }


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




    $scope.editIssue=function(id){
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
            'AssigneeId':$scope.issueInfo.Assignee.Id,
            'PriorityId':$scope.issueInfo.Priority.Id,
            'Label':$scope.labels

        };



        var data=$scope.data;

        issueService.editIssue(id,data).then(function(response){
            console.log(response);
            notifyService.showInfo(response.statusText);
            $scope.isHideEdit=false;

        },function(err){
            console.log(err)
            notifyService.showError("Failed to edit", err)
        })
    };*/






})