'use strict'
app.factory('userService',function($http,baseServiceUrl,authService){
    return{
        createNewAd:function(adData,success,error){
            var request={
                method:'POST',
                url:baseServiceUrl+'/api/Account/Register',
                headers:authService.getAuthHeaders(),
                data:adData
            };
            console.log(authService.getAuthHeaders());
            $http(request).success(success).error(error);
        }
    }

})