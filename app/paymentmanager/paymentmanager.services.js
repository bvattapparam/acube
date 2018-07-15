(function(){
  // create factory for header service to retun object in deffered way
  function paymentManagerServices($rootScope, $q, $http, storageServices, urlsettings){

        // BASED ON THE SEARCH VALUE, FETCH THE LIST OF ESTIMATES FROM THE MASTER TABLE

          this.getPayment = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['paymentmanager.getPayment'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };



        // ADD NEW ROW IN THE ESTIMATE BASKET.
        this.addPayment = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['paymentmanager.addPayment'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        // ADD NEW ROW IN THE ESTIMATE BASKET.
        this.updatePayment = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['paymentmanager.updatePayment'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        
        this.deletePayment = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['quotemanager.deleteQuoteBasketData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        }

        

  }
  angular.module("aswa").service('paymentManagerServices',['$rootScope', '$q', '$http', 'storageServices', 'urlsettings', paymentManagerServices]);
})();
