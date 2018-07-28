(function(){
  // create factory for header service to retun object in deffered way
  function marketingBasketServices($rootScope, $q, $http, storageServices, urlsettings){

        // to get the user details
        

          this.getCustomers = function(pushdata){
            if(pushdata.limit){
              pushdata.offset           =   (pushdata.currentPage-1) * pushdata.limit;
            }
              var deferred = $q.defer();
                $http({
                  method  : "POST",
                  url     : urlsettings['customermanager.getCustomers'],
                  data    : pushdata
                }).success(function(data){
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              
                return deferred.promise;
            };


        this.updateMarketingBasket = function(pushdata){
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

        this.addMarketingBasket = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['marketingbasket.addMarketingBasket'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

  }
  angular.module("aswa").service('marketingBasketServices',['$rootScope', '$q', '$http', 'storageServices', 'urlsettings', marketingBasketServices]);
})();
