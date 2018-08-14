(function(){
  // create factory for header service to retun object in deffered way
  function labourManagerServices($rootScope, $q, $http, storageServices, urlsettings){

        // BASED ON THE SEARCH VALUE, FETCH THE LIST OF ESTIMATES FROM THE MASTER TABLE

          this.getLabours = function(){
            var pushdata = {};
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['labourmanager.getLabours'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        //var URLs = "../aswa-services/travel/index.php?action=get_travel_data&offset="+(currentpage-1)*limit+"&limit="+limit;
        this.getLabourTMSFull = function(pushdata){
        //  console.log('pushdata', pushdata);
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['labourmanager.getLabourTMSFull'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };



        // ADD NEW ROW IN THE ESTIMATE BASKET.
        this.addShift = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['labourmanager.addShift'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        // ADD NEW ROW IN THE ESTIMATE BASKET.
        this.updateShiftPay = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['labourmanager.updateShiftPay'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        this.updateTMS = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['labourmanager.updateTMS'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.updateLabour = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['labourmanager.updateLabour'],
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

        
        this.getShiftEditData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['labourmanager.getShiftEditData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        }

        

  }
  angular.module("aswa").service('labourManagerServices',['$rootScope', '$q', '$http', 'storageServices', 'urlsettings', labourManagerServices]);
})();
