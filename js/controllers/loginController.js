'use strict';


app.controller('LoginController',
    function ($scope, $rootScope, $location, authService, userService, notifyService) {
        $scope.login = function(userData) {
            authService.login(userData,
                function success() {
                   // notifyService.showInfo("Login Successful");
                   /* if(authService.getCurrentUser().isAdmin)
                        $location.path('/admin/home');
                    else
                        $location.path('/user/home/');*/
                    notifyService.showInfo("Login is successful")

                    userService.getCurrentUser(function(success){
                        console.log("current User");

                    },function(errorr){});

                    userService.getAllUsers(function(success){
                        console.log("All Users")
                    },function (errorr){});

                    console.log("login");
                    $location.path('/dashboard');



                },
                function error(err) {
                    notifyService.showError("Failed to login", err);
                    console.log(err);
                });

        };


    }
);

