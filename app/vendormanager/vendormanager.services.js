(function(){
  // create factory for header service to retun object in deffered way
  function vendorManagerServices($rootScope, $q, $http, storageServices, urlsettings){

        // to get the user details
        this.getVendors = function(){
            var deferred = $q.defer();
              $http({
                method  : "GET",
                url     : urlsettings['vendormanager.getVendors'],
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
              return deferred.promise;
          };

        this.updateVendor = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['vendormanager.updateVendor'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.addVendor = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['vendormanager.addVendor'],
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
                url     : urlsettings['customermanager.getCustomer'] + "&customerid=" + customerid,
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            
              return deferred.promise;
        };
        this.updateCustomerEstimateStatus = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['customermanager.updateEstimateStatus'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.vendorIDCreation = function(record){
          var NAMETMP = record.NAME;
          var NAME = NAMETMP.replace(/\s/g,'');
          var VENDOR = "VNDR";
					var D = new Date();
					var NDATE = D.getMonth()+1 + "" + D.getDate() + "" + D.getFullYear() + "" + D.getHours() + "" + D.getMinutes();
					var VENDORID = VENDOR + "-" + NAME.substr(0,3).toUpperCase() + "-" + NDATE;
          return VENDORID;
        }

  }
  angular.module("aswa").service('vendorManagerServices',['$rootScope', '$q', '$http', 'storageServices', 'urlsettings', vendorManagerServices]);
})();
