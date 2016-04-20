'use strict'
app.factory('userService',function($http,$q,baseServiceUrl,authService){
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
        },

        getCurrentUser:function(success,errorr){
            var deferred = $q.defer();
            var request={
                method:'GET',
                url:baseServiceUrl+'users/me',
                headers:authService.getAuthHeaders()
            };
            /*$http(request).success(function(data){
                sessionStorage['currentUserMe']=JSON.stringify(data);
                success(data);
            }).error(errorr);*/
            $http(request).then(function(data){
                deferred.resolve(data);
                console.log(data);
                sessionStorage['currentUserMe'] = JSON.stringify(data);
                console.log(sessionStorage['currentUserMe']);

            },function(){

            });


            return deferred.promise;

        },

        getAllUsers:function(success,error){
            var request={
                method:'GET',
                url:baseServiceUrl+'users/',
                headers:authService.getAuthHeaders()
            };

            $http(request).success(function(data){
                sessionStorage['allUsers']=JSON.stringify(data);
                success(data);
            }).error(error);
        },

        changeUserPassword:function(data,success,error){
            var request={
                method:'POST',
                url:baseServiceUrl+'api/Account/ChangePassword',
                data:data,
                headers:authService.getAuthHeaders()
            };

            $http(request).success(function(data){
                success(data);
                console.log(data);
                console.log('success service')
            }).error(error);

        },
        setPassword:function(data,success,error){
            var request={
                method:'POST',
                url:baseServiceUrl+'api/Account/SetPassword',
                data:data,
                headers:authService.getAuthHeaders()
            };
            $http(request).success(function(data){
                success(data);
            }).error(error);

        },


    }

})

/*
$http(request).success(function(data) {
    sessionStorage['currentUser'] = JSON.stringify(data);
    success(data);
    console.log(data);
}).error(error);*/
