'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {


                return {
                    login: function(userData, success, error) {
                        var loginData = 'Username=' + userData.email + '&Password=' + userData.password + '&grant_type=password';

                        var request = {
                            method: 'POST',
                            url: baseServiceUrl + 'api/Token',
                            data: loginData,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        };

                        //return $http(request);

                        /*var request = {
                            method: 'POST',
                            url: baseServiceUrl + '/api/user/login',
                            data: userData
                        };*/
                           $http(request).success(function(data) {
                            sessionStorage['currentUser'] = JSON.stringify(data);
                            success(data);
                            console.log(data);
                        }).error(error);
                    },

                    register: function(data, success, error) {
                        //var deferred=$q.defer();
                        var request = {
                            method: 'POST',
                            url: baseServiceUrl + 'api/Account/Register',
                            data: data
                            /*headers: { 'Content-Type': 'application/json' }*/

                        };
                        $http(request).success(function(data) {
                            sessionStorage['currentUser'] = JSON.stringify(data);
                            success(data);
                            console.log(data);
                        }).error(error)
                        /*$http(request).then(function(response){
                            deferred.resolve(response.data)
                        },function(error){

                        })
                        return deferred.promise;*/
                    },



                    logout: function() {
                       // delete sessionStorage['currentUser'];
                        sessionStorage.clear();

                    },

                    getCurrentUser : function() {
                        var userObject = sessionStorage['currentUser'];
                        if (userObject) {
                            return JSON.parse(sessionStorage['currentUser']);
                        }
                    },

                    isAsignee : function() {
                        return sessionStorage['currentUser'] == undefined;
                    },

                    isLoggedIn : function() {
                        return sessionStorage['currentUser'] != undefined;
                    },

                    isProjectLeader : function() {
                        var currentUser = this.getCurrentUser();
                        return (currentUser != undefined) && (!currentUser.isAdmin);
                    },

                    isAdmin : function() {
                    var currentUserMe = JSON.parse(sessionStorage['currentUserMe']);
                        if(currentUserMe){
                       console.log(currentUserMe.isAdmin)
                            return currentUserMe.isAdmin;
                      }
                    },


        getAuthHeaders : function() {
                        var headers = {};
                        var currentUser = this.getCurrentUser();
                        if(currentUser) {
                            headers['Authorization'] = 'Bearer ' + currentUser.access_token;
                        }
                        return headers;
                    },

                    getToken:function(){
                        var currentUser = this.getCurrentUser();
                        if(currentUser) {
                        return   'Bearer ' + currentUser.access_token;
                        }

                    }

                }
    }
);
