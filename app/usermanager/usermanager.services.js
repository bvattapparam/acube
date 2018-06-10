(function(){
  // create factory for header service to retun object in deffered way
  function userManagerServices($rootScope, $q, $http, storageServices, urlsettings){

        // to get the user details
        this.getUsers = function(){
            var deferred = $q.defer();
              $http({
                method  : "GET",
                url     : urlsettings['usermanager.getUsers'],
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            
              return deferred.promise;
          };

        this.updateUserData = function(pushdata){
          console.log("pushdata",pushdata);
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['usermanager.updateUser'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            //storageServices.set(data, "userdata", "user");
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.addUserData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['usermanager.addUser'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

  }
  angular.module("aswa").service('userManagerServices',['$rootScope', '$q', '$http', 'storageServices', 'urlsettings', userManagerServices]);
})();
