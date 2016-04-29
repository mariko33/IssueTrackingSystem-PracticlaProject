'use strict'

app.factory('adminService',
    function ($http, $q,baseServiceUrl,authService) {
        return{

            addProject: function(data, success, error) {


            var request = {
                method: 'POST',
                url: baseServiceUrl + 'projects',
                headers:authService.getAuthHeaders(),
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
            }).error(function(err){
                console.log(err)
            });
        }





        }

    }

)
