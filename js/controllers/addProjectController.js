'use strict'

app.controller('AddProjectController', function($scope,$location, adminService){

    $scope.projectData={};
    $scope.addProject = function(projectData) {
        adminService.addProject(projectData,
            function success(success) {
                // notifyService.showInfo("Registered successfully");
                console.log('success')
                $location.path('/dashboard');
            },
            function error(err) {
                //notifyService.showError("Failed to register", err);
               // $location.path('/');
            })

    };
    /*$scope.getAllProject=issueService.getAllProject().then(function(response){
        $scope.allProjects=response.data;
    });*/



})
