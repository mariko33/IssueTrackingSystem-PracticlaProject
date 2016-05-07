'use strict';


app.controller('LoginController',
    function ($scope, $rootScope, $location, authService, userService, notifyService) {
        /*$scope.login=function(userData){
        authService.login(userData).then(function(response){
            console.log(response);

            userService.getCurrentUser(function(success){
                console.log("current User");

            },function(errorr){});

            userService.getAllUsers(function(success){
                console.log("All Users")
            },function (errorr){});

            notifyService.showInfo('You are successfully login')
            $location.path('/dashboard')
        },function(err){
            notifyService.showError(err.data.Mesage)
        })

        }
*/

        $scope.login = function(userData) {
            authService.login(userData,
                function success(data) {
                   // notifyService.showInfo("Login Successful");
                   /* if(authService.getCurrentUser().isAdmin)
                        $location.path('/admin/home');
                    else
                        $location.path('/user/home/');*/
                    notifyService.showInfo("Login is successful")

                    userService.getCurrentUser(function(success){
                        console.log("current User");

                    },function(error){});

                    userService.getAllUsers(function(success){
                        console.log("All Users")
                    },function (error){});

                    console.log(data);
                    $location.path('/dashboard');



                },
                function error(err) {
                    notifyService.showError("Failed to login", err);
                    console.log(err);
                });

        };


        $scope.register=function(){
            $location.path('/register');
        }


    }
);

