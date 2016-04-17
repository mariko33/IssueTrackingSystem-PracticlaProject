'use strict';

// The LoginController is responsible for the "Login" screen
app.controller('RegisterController',
    function ($scope, $location, authService, notifyService) {
        $scope.userData = {};

       /* $scope.register = function (user) {
                            authService.registerUser(user)
                                .then(function(userData) {
                                        console.log(userData);
                                    });
                       };
        console.log(userData);
*/


        $scope.register = function(userData) {
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
            console.log(userData);
        }
    }
);
