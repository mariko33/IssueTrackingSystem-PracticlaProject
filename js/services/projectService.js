'use strict'

app.factory('projectService',function($http,$q,$route, baseServiceUrl, authService,notifyService){
    return {

        getProject:function(id){
            var deferred=$q.defer();
            var request={
                method:'GET',
                url:baseServiceUrl+'Projects/'+id,
                headers:authService.getAuthHeaders()
            };
            $http(request).then(function(response){
                deferred.resolve(response);
                console.log(response);
            },function(err){
                console.log(err);
            });

            return deferred.promise;

        },

        editProject:function(id,data){
            var deferred=$q.defer();
            var request={
                method:'PUT',
                url:baseServiceUrl+'Projects/'+id,
                data:data,
                headers:authService.getAuthHeaders()
            };

            $http(request).then(function(response){
                deferred.resolve(response);
                console.log(response);
                $route.reload();
            },function(err){
                console.log(err);
                notifyService.showError(err.data.Message)
                $route.reload();
            });

            return deferred.promise;


        },

        addProject:function(data){
            var deferred=$q.defer();
            var request={
                method:'POST',
                url:baseServiceUrl+'Projects/',
                data:data,
                headers:authService.getAuthHeaders()
            };

            $http(request).then(function(response){
                deferred.resolve(response);
                console.log(response);
                $route.reload();
            },function(err){
                console.log(err);
                notifyService.showError(err.data.Message)
                $route.reload();
            });

            return deferred.promise;


        },



        getAllProject: function () {
            var deferred=$q.defer();
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'projects',
                headers: authService.getAuthHeaders()

            };
            //console.log(authService.getAuthHeaders());
            $http(request).then(function (responce) {
                deferred.resolve(responce);
                sessionStorage['allProjects']=JSON.stringify(responce);
                console.log(responce);
            },function(err){

            });
            return deferred.promise;
        },


        getMyProjects: function (currentPageSize,cUser) {
            var deferred = $q.defer();
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'Projects?filter=Lead.Id="'+cUser+'"'+'&pageSize='+currentPageSize+'&pageNumber=1',
                headers: authService.getAuthHeaders()

            };

            $http(request).then(function(data){
                deferred.resolve(data);
                console.log(data);

            },function(err){
                console.log(err)

            });


            return deferred.promise;
        }





    }

})

/*app.factory('issueMe',function($resource,baseServiceUrl){
 var allIssuesMe=$resource(baseServiceUrl+'issues/me');
 return{
 getIssueMe:function(success,error){
 return allIssuesMe.query(success,error)
 }
 }
 })*/
