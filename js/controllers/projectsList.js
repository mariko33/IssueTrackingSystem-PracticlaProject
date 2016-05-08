'use strict'

app.controller('ProjectsListController', function($scope, $q,$location, projectService,notifyService,pageSize){
    $scope.listParams={
        'startPage':1,
        'pageSize':pageSize
    }

    $scope.getAllProject=function() {
        projectService.getAllProject().then(function (response) {
            $scope.allProjects = response.data;
            console.log($scope.allProjects);
        });
    };

    $scope.returnToDashboard=function(){
        $location.path('/dashboard');
    };

    $scope.getAllProject();

})

