'use strict'

app.factory('adminService',
    function ($http, $q,baseServiceUrl,authService) {
        return{

            addProject: function(data, success, error) {
            /*var loginData = 'Name=' + projectData.name + '&Description=' + projectData.description +
                'ProjectKey='+projectData.projectKey+'labels[0].Name='+projectData.labelsName+'priorities[0].Name='+
                projectData.prioritiesName+'LeadId='+projectData.leadId;*/

            var request = {
                method: 'POST',
                url: baseServiceUrl + 'projects/',
                headers:authService.getAuthHeaders(),
                data: data
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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
