(function(){
  function dashboardServices($http, $q, urlsettings, storageServices){

        //get landlord list
        this.getIowe = function(){
            var deferred = $q.defer();
            var cache = storageServices.get("dashboard_", "getIowe");
            if(cache){
              deferred.resolve(cache);
            }else{
              $http({
                method  : "GET",
                url     : urlsettings['dashboard.getiowe'],
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                storageServices.set(data, "dashboard_", "getIowe");
                console.log("service iow", data);
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            }
              return deferred.promise;
          };

          /*// get grand total
          //get landlord list
          this.getGrandTotal = function(){
              var deferred = $q.defer();
              var cache = storageServices.get("dashboard_", "getGrandTotal");
              if(cache){
                deferred.resolve(cache);
              }else{
                $http({
                  method  : "GET",
                  url     : urlsettings['dashboard.getgrandtotal'],
                  headers :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  storageServices.set(data, "dashboard_", "getGrandTotal");
                  console.log("service iow", data);
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              }
                return deferred.promise;
            };*/

          // service to get the details from billreminders
          //get landlord list
          this.getBR = function(){
              var deferred = $q.defer();
              var cache = storageServices.get("dashboard_", "getBR");
              if(cache){
                deferred.resolve(cache);
              }else{
                $http({
                  method  : "GET",
                  url     : urlsettings['dashboard.getbr'],
                  headers :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  storageServices.set(data, "dashboard_", "getBR");
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              }
                return deferred.promise;
            };

            // add Bill reminder data serviceReturn
            this.pushBRData = function(pushdata){
              var deferred = $q.defer();
              $http({
                method  : "POST",
                url     : "../aswa-services/billreminders/add.php?action=push_br_data",
                data    : pushdata
              }).success(function(data, status, headers, config){
                console.log("data", data);
    						console.log("STATUS", status);
    						console.log("headers", headers);
    						console.log("config", config);
                deferred.resolve(status);
              }).error(function(data, status, headers, config){
                deferred.reject(data, status, headers, config);
              });
                return deferred.promise;
            };
            //update Bill reminder data
            this.updateBRData = function(putdata){
              var deferred = $q.defer();
              $http({
                method  : "POST",
                url     : "../aswa-services/billreminders/update.php?action=put_br_data",
                data    : putdata
              }).success(function(data, status, headers, config){
                deferred.resolve(status);
              }).error(function(data, status, headers, config){
                deferred.reject(data, status, headers, config);
              });
                return deferred.promise;
            };

            // add Bill reminder data serviceReturn
            this.pushIOWEData = function(pushdata){
              var deferred = $q.defer();
              $http({
                method  : "POST",
                url     : "../aswa-services/iowe/add.php?action=push_iowe_data",
                data    : pushdata
              }).success(function(data, status, headers, config){
                console.log("data", data);
    						console.log("STATUS", status);
    						console.log("headers", headers);
    						console.log("config", config);
                deferred.resolve(status);
              }).error(function(data, status, headers, config){
                deferred.reject(data, status, headers, config);
              });
                return deferred.promise;
            };
            //update Bill reminder data
            this.updateIOWEData = function(putdata){
              var deferred = $q.defer();
              $http({
                method  : "POST",
                url     : "../aswa-services/iowe/update.php?action=put_iowe_data",
                data    : putdata
              }).success(function(data, status, headers, config){
                deferred.resolve(status);
              }).error(function(data, status, headers, config){
                deferred.reject(data, status, headers, config);
              });
                return deferred.promise;
            };

       // return serviceReturn;

  }
  angular.module("aswa").service('dashboardServices',['$http', '$q', 'urlsettings', 'storageServices', dashboardServices]);
})();
