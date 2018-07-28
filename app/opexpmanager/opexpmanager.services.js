(function(){
  // create factory for header service to retun object in deffered way
  function opexpManagerServices($rootScope, $q, $http, storageServices, urlsettings){

    
    this.opexpVersion =  function(version){
      var VERSION = version;
      var COMPANY = "AGM";
      var ENTITY = "OPEXP";
      var D = new Date();
      var NDATE = D.getMonth()+1 + "" + D.getDate() + "" + D.getFullYear() + "" + D.getHours() + "" + D.getMinutes();
      var OPEXPID = COMPANY + "-" + ENTITY + "-" + VERSION + "-" + NDATE;
      return OPEXPID;
    }    
    // BASED ON THE SEARCH VALUE, FETCH THE LIST OF ESTIMATES FROM THE MASTER TABLE

        this.getOPEXPMasters = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['opexpmanager.getOPEXPMasters'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.getOPEXPMaster = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['opexpmanager.getOPEXPMaster'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.getOPEXPCount = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['opexpmanager.getOPEXPCount'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };



        this.generateOPEXPMaster=  function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['opexpmanager.generateOPEXPMaster'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };


        this.getOPEXPBasket = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['opexpmanager.getOPEXPBasket'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        // ADD NEW ROW IN THE ESTIMATE BASKET.
        this.addOPEXPBasket = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['opexpmanager.addOPEXPBasket'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.updateOPEXPBasket = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['opexpmanager.updateOPEXPBasket'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        
        this.deleteOPEXPBasket = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['opexpmanager.deleteOPEXPBasket'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        }

        

  }
  angular.module("aswa").service('opexpManagerServices',['$rootScope', '$q', '$http', 'storageServices', 'urlsettings', opexpManagerServices]);
})();
