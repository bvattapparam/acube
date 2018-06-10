(function(){
  // create factory for header service to retun object in deffered way
  function mainServices($rootScope, $http, $q, storageServices, urlsettings){
    this.getContent = function(messagelanguage){
      var deferred = $q.defer();
        $http({
          method  : "GET",
          url     : "../aswa-services/content/index_" + messagelanguage +".js",
          headers : {'Content-Type' : 'application/json'}
          }).success(function(data){
            deferred.resolve(data);
            }).error(function(data){
              deferred.reject(data);
            });
        return deferred.promise;
      };


      /*this.getReference = function(){
          var deferred = $q.defer();
          $rootScope.showSpinner;
          $http({
            method  : "GET",
            url     : "../aswa-services/references/get-reference.php",
            headers : {'Content-Type' : 'application/json'}
          }).success(function(data){
            deferred.resolve(data);
          }).error(function(data){
            deferred.reject(data);
          });
          return deferred.promise;
        };*/
        
        // get grand total
        this.getGrandTotal = function(){
            var deferred = $q.defer();
              $http({
                method  : "GET",
                url     : urlsettings['dashboard.getgrandtotal'],
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                //storageServices.set(data, "dashboard_", "getGrandTotal");
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            
              return deferred.promise;
          };
  
  };   

  angular.module("aswa").service('mainServices',['$rootScope','$http','$q', 'storageServices', 'urlsettings', mainServices]);
})();
