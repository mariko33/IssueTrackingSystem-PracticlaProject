'use strict';

// The LoginController is responsible for the "Login" screen
app.controller('RegisterController',
    function ($scope, $location,$q, authService, notifyService,userService) {
        $scope.registerData = {};

        $scope.registerUser=function(registerData){
            authService.register(registerData).then(function(response){
                var userData={
                    email:$scope.registerData.Email,
                    password:$scope.registerData.Password
                };

                authService.login(userData,
                    function success() {
                        // notifyService.showInfo("Login Successful");
                        /* if(authService.getCurrentUser().isAdmin)
                         $location.path('/admin/home');
                         else
                         $location.path('/user/home/');*/
                        notifyService.showInfo("Login is successful");

                        userService.getCurrentUser(function(success){
                            console.log("current User");

                        },function(error){});

                        userService.getAllUsers(function(success){
                            console.log("All Users")
                        },function (errorr){});

                        console.log("login");
                        $location.path('/dashboard');



                    },
                    function error(err) {
                        notifyService.showError("Failed to login", err);
                        console.log(err);
                    })

                console.log(response)
            },function(err){
                console.log(err);
            })
        }

       /* $scope.register = function(userData) {
            authService.register(userData,
                function success() {
                   // notifyService.showInfo("Registered successfully");
                    console.log("success")
                    $location.path('/login');
                },
                function error(err) {
                    notifyService.showError("Failed to register", err);
                    $location.path('/');
                })
        }*/
    }
);
