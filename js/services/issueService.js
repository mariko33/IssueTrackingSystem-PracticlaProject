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
            }).error(error);*/

            $http(request).then(function(data){
                sessionStorage['issueMe'] = JSON.stringify(data);
                console.log(sessionStorage['issueMe']);

            },function(){

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
        },

        addIssue:function(data, success,error){
            var request={
                method:"POST",
                url:baseServiceUrl+'issues/',
                headers:authService.getAuthHeaders(),
                data:data
            };
            $http(request).success(success).error(error);

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