(function(){
  // create factory for header service to retun object in deffered way
  function loginServices($rootScope, $q, $http, storageServices){

        // to get the user details
        $rootScope.loggedInFlag = false;
        this.getUser = function(param){
            var deferred = $q.defer();
              $http({
                method  : "POST",
                url     : "../aswa-services/login/index.php?action=get_user_data",
                data    :   param
              }).success(function(data, status){
                if(data.length > 0){
                  storageServices.set(data, "user_", "getUser");
                  $rootScope.loggedInFlag = true;
                }else {
                  storageServices.remove("user_", "getUser");
                  $rootScope.loggedInFlag = false;
                }
                deferred.resolve(data);
              }).error(function(data, status){
                deferred.reject(data);
              });

              return deferred.promise;
          };





  }
  angular.module("paaplogin").service('loginServices',['$rootScope', '$q', '$http', 'storageServices', loginServices]);
})();
