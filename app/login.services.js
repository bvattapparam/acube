(function(){
  // create factory for header service to retun object in deffered way
  function loginServices($rootScope, $q, $http, storageServices){

        // to get the user details
        $rootScope.loggedInFlag = false;
        this.getUser = function(param){
          console.log("----------------")
            var deferred = $q.defer();
              $http({
                method  : "POST",
                url     : "../acube-services/login/index.php?action=get_user_data",
                data    :   param
              }).success(function(data, status){
                if(data.length > 0){
                  //storageServices.set(data[0], "userdata", "user");
                //  $rootScope.loggedInFlag = true;
                }else {
                 // storageServices.remove("userdata", "user");
                 // $rootScope.loggedInFlag = false;
                }
                console.log("reacred login service data", data);
                deferred.resolve(data);
              }).error(function(data, status){
                deferred.reject(data);
              });

              return deferred.promise;
          };





  }
  angular.module("aswa").service('loginServices',['$rootScope', '$q', '$http', 'storageServices', loginServices]);
})();
