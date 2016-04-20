'use strict'

app.factory('adminService',
    function ($http, $q,baseServiceUrl,authService) {
        return{

            addProject: function(data, success, error) {


            var request = {
                method: 'POST',
                url: baseServiceUrl + 'projects',
                //headers:authService.getAuthHeaders(),
                headers:{
                    'Authorization':authService.getToken(),
                    'Content-Type':'application/json'
                },
                data: data

            };

            //return $http(request);

            /*var request = {
             method: 'POST',
             url: baseServiceUrl + '/api/user/login',
             data: userData
             };*/
            $http(request).success(function(data) {
                success(data);
                console.log(data);
            }).error(error);
        }





        }

    }

)
