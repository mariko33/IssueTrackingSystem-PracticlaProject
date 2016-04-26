'use strict'

app.factory('issueService',function($http,$q, baseServiceUrl, authService){
    return {
        getIssueMe: function (addParams) {
            //function (addParams, success, error)
            var deferred = $q.defer();
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'issues/me',
                params: addParams,
                headers: authService.getAuthHeaders()

            };
            console.log(authService.getAuthHeaders());
            /*$http(request).success(function (data) {
                sessionStorage['issueMe'] = JSON.stringify(data);
                console.log(data);
            }).error(error);
*/
            $http(request).then(function(data){
                deferred.resolve(data);
                console.log(data);
                sessionStorage['issueMe'] = JSON.stringify(data);
                console.log(sessionStorage['issueMe']);

            },function(){

            });


            return deferred.promise;
        },

        getIssue:function(id){
            var deferred=$q.defer();
            var request={
                method:'GET',
                url:baseServiceUrl+'issues/'+id,
                headers:authService.getAuthHeaders()
            };
            $http(request).then(function(response){
                deferred.resolve(response);
                console.log(response)
            },function(err){

            });
            return deferred.promise;
        },

        editIssue:function(id,data){
            var deferred=$q.defer();
            var request={
                method:'PUT',
                url:baseServiceUrl+'Issues/'+id,
                data:data,
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

        changeStatus:function(id,statusId){
            var deferred=$q.defer();
            var request={
                method:'PUT',
                url:baseServiceUrl+'issues/'+id+'/changestatus',
                params:{'statusid':statusId},
                headers:authService.getAuthHeaders()
            };
            $http(request).then(function(response){
                deferred.resolve(response)
                console.log(response)
            },function(err){
                console.log(err)
            });

            return deferred.promise;
        },


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
            },function(err){
                console.log(err);
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


        getMyProjects: function (addParams) {
            var deferred = $q.defer();
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'projects',
                params: addParams,
                headers: authService.getAuthHeaders()

            };

            $http(request).then(function(data){
                deferred.resolve(data);
                console.log(data);

            },function(err){
                console.log(err)

            });


            return deferred.promise;
        },


        allUsersObj:function(){
            var allUsers=sessionStorage['allUsers'];
          if(allUsers){
              allUsers=JSON.parse(allUsers);
              return allUsers;
          }
        },


        myIssuesObj: function () {
            var myIssues = sessionStorage['issueMe'];
            if (myIssues) {
                myIssues = JSON.parse(myIssues);
                console.log(myIssues);
                return myIssues;
            }
        }

        /*addIssue:function(data, success,error){
            var request={
                method:"POST",
                url:baseServiceUrl+'issues/',
                headers:authService.getAuthHeaders(),
                data:data
            };
            $http(request).success(success).error(error);

        }*/


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
