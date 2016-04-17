'use strict'
app.factory('userService',function($http,baseServiceUrl,authService){
    return{
        createNewAd:function(adData,success,error){
            var request={
                method:'POST',
                url:baseServiceUrl+'api/Account/Register',
                headers:authService.getAuthHeaders(),
                data:adData
            };
            console.log(authService.getAuthHeaders());
            $http(request).success(success).error(error);
        },

        getCurrentUser:function(success,errorr){
            var request={
                method:'GET',
                url:baseServiceUrl+'users/me',
                headers:authService.getAuthHeaders()
            };
            $http(request).success(function(data){
                sessionStorage['currentUserMe']=JSON.stringify(data);
                success(data);
            }).error(errorr);

        }
    };


})

/*
$http(request).success(function(data) {
    sessionStorage['currentUser'] = JSON.stringify(data);
    success(data);
    console.log(data);
}).error(error);*/
