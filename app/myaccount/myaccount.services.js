(function(){
  // create factory for header service to retun object in deffered way
  function myAccountServices($rootScope, $q, $http, storageServices, urlsettings){

        // to get the user details
       this.getUserData = function(param){
          var deferred = $q.defer();
            $http({
              method  : "GET",
              url     : urlsettings['myaccount.getUser'] + "=" + param,
              headers   :   {'Content-Type' : 'application/json'}
            }).success(function(data){
              storageServices.set(data[0], "userdata","user");
              deferred.resolve(data);
            }).error(function(data){
              deferred.reject(data);
            });
          
            return deferred.promise;
        };
       

        this.updateUserData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : "../acube-services/myaccount/update/?action=put_user_data",
            data    : pushdata
          }).success(function(data, status, headers, config){
            //storageServices.set(data, "userdata", "user");
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
  }
  angular.module("aswa").service('myAccountServices',['$rootScope', '$q', '$http', 'storageServices', 'urlsettings', myAccountServices]);
})();
