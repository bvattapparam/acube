(function(){
  // create factory for header service to retun object in deffered way
  function customerManagerServices($rootScope, $q, $http, storageServices, urlsettings){

        // to get the user details
        this.getCustomers = function(){
            var deferred = $q.defer();
              $http({
                method  : "GET",
                url     : urlsettings['customermanager.getCustomers'],
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            
              return deferred.promise;
          };

        this.updateCustomerData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['customermanager.updateCustomer'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.addCustomerData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['customermanager.addCustomer'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.getCustomer = function(customerid) {
          var deferred = $q.defer();
              $http({
                method  : "GET",
                url     : urlsettings['customermanager.getCustomer'] + "/customerid",
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            
              return deferred.promise;
        }

  }
  angular.module("aswa").service('customerManagerServices',['$rootScope', '$q', '$http', 'storageServices', 'urlsettings', customerManagerServices]);
})();
