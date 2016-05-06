'use strict'

app.controller('AddProjectController', function($scope, $location, projectService,issueService,notifyService){

    Array.prototype.sortBy=function(property){
        return this.slice(0).sort(function(a,b){
            return(a[property]>b[property])?1:(a[property]<b[property])?-1:0;
        });
    };

    $scope.allUsers=issueService.allUsersObj();
    $scope.allUsers=$scope.allUsers.sortBy('Username');

    $scope.projectData={};

    $scope.addNewProject=function(){
        $scope.projectData.Arrlabels=[];
        $scope.projectData.ArrPriorities=[]
        var labels=[]
        for(var i=0;i<$scope.projectData.Arrlabels;i++){
            var temp={'Name':$scope.projectData.Arrlabels[i]};
            labels.push(temp);
        }
        var priorities=[];
        for (var i=0;i<$scope.projectData.ArrPriorities;i++){
            var tempP={'Name':$scope.projectData.ArrPriorities[i]};
            priorities.push(tempP);
        }

        var data={
            'Name':$scope.projectData.Name,
            'Description':$scope.projectData.Description,
            'ProjectKey':$scope.projectData.ProjectKey,
            'Labels':labels,
            'Priorities':priorities,
            'LeadId':$scope.projectData.LeadId
        }
        projectService.addProject(data).then(function(response){
            console.log(response)
        },function(err){
            console.log(err)
        })
    };

    $scope.returnToDashboard=function(){
        $location.path('/dashboard');
    };






})
