'use strict'

app.controller('EditProjectController',function($scope,$q,$location,$routeParams, projectService, issueService,notifyService,userService){
    var Id=$routeParams.Id;
    $scope.editInfo={};
    $scope.editInfo.ProjectId=Id;
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

    $scope.allUsers=issueService.allUsersObj();
    $scope.allUsers=$scope.allUsers.sortBy('Username');


    $scope.editProject=function(){
        $scope.editInfo.Arrlabels=[];
        $scope.editInfo.ArrPriorities=[]
        var labels=[]
        for(var i=0;i<$scope.editInfo.Arrlabels;i++){
            var temp={'Name':$scope.editInfo.Arrlabels[i]};
            labels.push(temp);
        }
        var priorities=[];
        for (var i=0;i<$scope.editInfo.ArrPriorities;i++){
            var tempP={'Name':$scope.editInfo.ArrPriorities[i]};
            priorities.push(tempP);
        }

        var data={
            'Name':$scope.editInfo.Name,
            'Description':$scope.editInfo.Description,
            'ProjectKey':$scope.editInfo.ProjectKey,
            'Labels':labels,
            'Priorities':priorities,
            'LeadId':$scope.editInfo.ChangeLeadId
        }

     projectService.editProject(Id,data).then(function(response){
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
    };







})