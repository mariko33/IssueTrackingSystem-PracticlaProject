'use strict'

app.controller('ProjectsListController', function($scope, $q, projectService,notifyService){

    $scope.getAllProject=projectService.getAllProject().then(function(response){
        $scope.allProjects=response.data;
        console.log($scope.allProjects);
    });
})