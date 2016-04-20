'use strict'


app.controller('ChangeUserPassword',function($scope,$location,userService,notifyService){
    $scope.data={};
    $scope.changePass=function(data){
        console.log(data);
        userService.changeUserPassword(data,function success(){
            notifyService.showInfo("Successfully changed password");
            console.log("Successfully changed password");
            $location.path('/dashboard');

        },function error(err) {
             notifyService.showError("Failed to login", err);
            console.log(err);
        })
    }
})