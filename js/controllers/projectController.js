'use strict'

app.controller('ProjectController',function($scope,$q,$location,$routeParams, projectService,userService, issueService,notifyService){

    var Id=$routeParams.Id;
    $scope.myProject={};

    $scope.isHideProject=false;
    $scope.isHideEdit=false;

    $scope.getCurrentUserId=userService.getCurrentUser().then(function(response){
        console.log(response.data);
        $scope.isAdminUser=response.data.isAdmin;
        $scope.currentUserId=response.data.Id;
        console.log($scope.currentUserId)
    },function(){});



    $scope.getProject= projectService.getProject(Id).then(function(response){
            $scope.projectInfo=response.data;
        $scope.isProjectLead=function(){
            return $scope.projectInfo.Lead.Id===$scope.currentUserId;
        };
        $scope.isAdmin=function(){
            return $scope.isAdminUser;
            console.log($scope.isAdminUser);
        }
        $scope.projectInfo.Labels=response.data.Labels;
        $scope.projectInfo.LabelsStr='';
        $scope.projectInfo.Arrlabels=[]
        for(var i=0;i<$scope.projectInfo.Labels.length;i++){
            $scope.projectInfo.LabelsStr=$scope.projectInfo.LabelsStr+$scope.projectInfo.Labels[i].Name+' ';
            $scope.projectInfo.Arrlabels.push($scope.projectInfo.Labels[i].Name);
        };

        $scope.projectInfo.Priorities=response.data.Priorities;
        $scope.projectInfo.PrioritiesStr='';
        $scope.projectInfo.ArrPriorities=[]
        for (var i=0;i<$scope.projectInfo.Priorities.length;i++){
            $scope.projectInfo.PrioritiesStr=$scope.projectInfo.PrioritiesStr+$scope.projectInfo.Priorities[i].Name+' ';
            $scope.projectInfo.ArrPriorities.push($scope.projectInfo.Priorities[i].Name)
        }

            console.log(response);
        },function(){});


    $scope.getProjectIssues=issueService.getProjectIssue(Id).then(function(response){
        $scope.projectIssuesInfo=response.data;
        console.log(response)
    },function(err){
        console.log(err)
    });


    $scope.addIssue=function(){
        $location.path('/projects/'+Id+'/add-issue')
    }

    /*$scope.viewAnotherProject=function(){
        $scope.isHideProject=false;
    };*/
    $scope.edit=function(){
        $location.path('/projects/'+Id+'/edit')
    };



    /*$scope.projectEdit={};
    $scope.projectEdit.labels=[];
    $scope.projectEdit.priorities=[];
    $scope.projectEdit.labels=[];
*/

    /*$scope.editProject=function(Id,data){
        projectService.editProject(Id,data).then(function(response){
            console.log(response);
            notifyService.showInfo(response.statusText);
            $scope.isHideEdit=false;

        },function(err){
            console.log(err)
            notifyService.showError("Failed to edit", err)
        })
    };*/

    $scope.returnToDashboard=function(){
        $location.path('/dashboard');
    }


})