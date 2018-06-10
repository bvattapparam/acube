(function(){
  // create factory for header service to retun object in deffered way
  function headerService($http,$q){
    var serviceRetun = {};
        // to get the user details
        serviceRetun.getUser = function(callback){
          var deferred = $q.defer();
          $http.get("../aswa-services/users/?action=get_product").
          then(function(successResponse){
            deferred.resolve(successResponse);
            console.log('DATA : ', successResponse.data, 'STATUS :', successResponse.status);
          },function(failureResponse){
            deferred.reject(failureResponse)
            console.log('STATUS :', failureResponse.status);
          });
          return deferred.promise;
        }
      return serviceRetun;
  }
  angular.module("aswa").factory('headerService',['$http','$q',headerService]);
})();
