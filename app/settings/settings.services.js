(function(){
  // create factory for header service to retun object in deffered way
  function settingsServices($rootScope, $q, $http, storageServices, urlsettings){

        // to get the user details
        this.getLocations = function(){
            var deferred = $q.defer();
              $http({
                method  : "GET",
                url     : urlsettings['settings.getLocations'],
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            
              return deferred.promise;
          };

        this.updateLocation = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['settings.updateLocation'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
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
  angular.module("aswa").service('settingsServices',['$rootScope', '$q', '$http', 'storageServices', 'urlsettings', settingsServices]);
})();
