'use strict'

app.controller('DashboardUserController',function($scope,$location, $q,authService,issueService){
    $scope.addParams={
        'orderBy':'DueDate',
        'pageSize':'10',
        'pageNumber':'1'
    }
    $scope.getCurrentUser=function(){
        userService.getCurrentUser(function(success){
            console.log('success');
        },function(errorr){

        })
    };
    /*$scope.issueMe= function() {
        var deferred=$q.defer();
        issueService.getIssueMe($scope.addParams, function success(success) {

            }.then(console.log($scope.myIssues = sessionStorage['issueMe'])),
            function error(err) {
                console.log(err)
            });
        return deferred.promise;
    };*/
    $scope.issueMe=issueService.getIssueMe($scope.addParams)
        .then($scope.issues=issueService.myIssuesObj().data.Issues);


    $scope.getAllProject=issueService.getAllProject().then(function(response){
        $scope.allProjects=response.data;
    })

    $scope.isHideIssues=false;
    $scope.hideIssues=function(){
        $scope.isHideIssues=!$scope.isHideIssues;
    };
    $scope.isHideProjects=false;
    $scope.hideProjects=function(){
        $scope.isHideProjects=!$scope.isHideProjects;
    }



});