'use strict'

app.factory('issueService',function($http,$q,$route, baseServiceUrl, authService,notifyService){
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
                //console.log(sessionStorage['issueMe']);

            },function(){

            });


            return deferred.promise;
        },


        getAllIssuesMe: function (addParams) {
            var deferred = $q.defer();
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'Issues/',
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

        getProjectIssue:function(id){
            var deferred=$q.defer();
            var request={
                method:'GET',
                url:baseServiceUrl+'Projects/'+id+'/Issues',
                headers:authService.getAuthHeaders()
            };
            $http(request).then(function(response){
                deferred.resolve(response);
                console.log(response)
            },function(err){
                console.log(err)

            });
            return deferred.promise;
        },


        getIssuesComments:function(id){
            var deferred=$q.defer();
            var request={
                method:'GET',
                url:baseServiceUrl+'Issues/'+id+'/comments',
                headers:authService.getAuthHeaders()
            };
            $http(request).then(function(response){
                deferred.resolve(response);
                console.log(response)
            },function(err){
                console.log(err)
            });

            return deferred.promise;
        },

        addIssuesComments:function(id,data){
            var deferred=$q.defer();
            var request={
                method:'POST',
                url:baseServiceUrl+'Issues/'+id+'/comments',
                data:data,
                headers:authService.getAuthHeaders()
            };
            $http(request).then(function(response){
                deferred.resolve(response);
                $route.reload();
                console.log(response)
            },function(err){
                console.log(err)
                console.log(data)
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
                notifyService.showInfo('You are successfuly edit issue')
                $route.reload();
            },function(err){
                notifyService.showError(err.data.Message);
                console.log(err);
                $route.reload();
            });

            return deferred.promise;


        },

        addIssue:function(data){
            var deferred=$q.defer();
            var request={
                method:'POST',
                url:baseServiceUrl+'issues/',
                data:data,
                headers:authService.getAuthHeaders()
            };

            $http(request).then(function(response){
                deferred.resolve(response);
                console.log(response);
                notifyService.showInfo('You are successfuly add issue')
                $route.reload();
            },function(err){
                notifyService.showError(err.data.Message);
                console.log(err);
                $route.reload();
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
                $route.reload();
            },function(err){
                console.log(err)
                notifyService.showError("Failed to change status", err.statusText)
                $route.reload();
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
