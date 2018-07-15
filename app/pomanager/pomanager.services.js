(function(){
  // create factory for header service to retun object in deffered way
  function poManagerServices($rootScope, $q, $http, storageServices, urlsettings){

    
    this.poVersion =  function(version){
      var VERSION = version;
      var COMPANY = "AGM";
      var ENTITY = "PO";
      var D = new Date();
      var NDATE = D.getMonth()+1 + "" + D.getDate() + "" + D.getFullYear() + "" + D.getHours() + "" + D.getMinutes();
      var POID = COMPANY + "-" + ENTITY + "-" + VERSION + "-" + NDATE;
      return POID;
    }    
    // BASED ON THE SEARCH VALUE, FETCH THE LIST OF ESTIMATES FROM THE MASTER TABLE

        this.getPOMasters = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['pomanager.getPOMasters'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.getPOMaster = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['pomanager.getPOMaster'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.getPOCount = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['pomanager.getPOCount'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };



        this.generatePOMaster=  function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['pomanager.generatePOMaster'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.getEstimateMaster = function(pushdata){
          console.log("pushdata", pushdata)
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['estimatemanager.getEstimateMaster'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.getPOBasket = function(pushdata){
          console.log("pushdata", pushdata)
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['pomanager.getPOBasket'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        // ADD NEW ROW IN THE ESTIMATE BASKET.
        this.addPOBasket = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['pomanager.addPOBasket'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.updatePOBasket = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['pomanager.updatePOBasket'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        
        this.deletePOBasket = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['pomanager.deletePOBasket'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        }

        this.cloneEstimateMaster =  function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['estimatemanager.cloneEstimateMaster'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.cloneUpdateEstimateMaster =  function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['estimatemanager.cloneUpdateEstimateMaster'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.cloneEstimateBasket =  function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['estimatemanager.cloneEstimateBasket'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

      
        

  }
  angular.module("aswa").service('poManagerServices',['$rootScope', '$q', '$http', 'storageServices', 'urlsettings', poManagerServices]);
})();
