(function(){
  // create factory for header service to retun object in deffered way
  function getreferences($rootScope, $http, $q, urlsettings, mainServices){
    var self = this;
    self.referencesData   = {};
    self.references  = null;
   // console.log("_____",self.references);

    // using this function to pass code and name alone for easy tracking purpose rather than using reversedropdown filter
    this.getReference = function(){
      var deferred = $q.defer();
      if(self.references){
        deferred.resolve(self.references);
      }else{
        $rootScope.showSpinner;
        $http({
              method  : "GET",
              url     : urlsettings['reference.getreferencedata'],
              headers : {'Content-Type' : 'application/json'}
        }).success(function(data){
          deferred.resolve(data);
          self.references = data;
          //console.log("selfReference",self.references);
          angular.forEach(data, function(item,key){
            var length  = item.length-1;
            self.referencesData[key]  = {};
            for(var i=length; i>=0;i--){
              self.referencesData[key][item[i]["code"]] = item[i]["name"];
            }
           
        });
        //console.log("self.referencesData[key]", self.referencesData.rentStatus);
        }).error(function(data){
          deferred.reject(data);
        });
      }
      return deferred.promise;
    };

 }
  angular.module("paaplogin").service('getreferences',['$rootScope','$http','$q','urlsettings','mainServices',getreferences]);
})();
