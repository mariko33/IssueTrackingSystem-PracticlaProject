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

        var temp=$scope.projectData.Arrlabels;
        var tempP=$scope.projectData.ArrPriorities;
        $scope.labels=[]
        for(var i=0;i<temp.length;i++){
            var label={'Name':temp[i]};
            $scope.labels.push(label);
        }
        $scope.priorities=[];
        for (var i=0;i<tempP.length;i++){
            var priority={'Name':tempP[i]};
            $scope.priorities.push(priority);
        }

        var data={
            'Name':$scope.projectData.Name,
            'Description':$scope.projectData.Description,
            'ProjectKey':$scope.projectData.ProjectKey,
            'Labels':$scope.labels,
            'Priorities':$scope.priorities,
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
