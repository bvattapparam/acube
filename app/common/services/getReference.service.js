(function(){
  // create factory for header service to retun object in deffered way
  function getreferences($rootScope, $http, $q, urlsettings, mainServices){
    var self = this;
    self.referencesData   = {};
    self.references  = null;
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
          angular.forEach(data, function(item,key){
            var length  = item.length-1;
           // console.log(" item: ", item);
           // console.log(" key: ", key);
            //console.log("Length key: ", key.length-1);
            //console.log("Length of item ", item.length-1);
            self.referencesData[key]  = {};
            for(var i=length; i>=0;i--){
              // console.log("I Value : ",i);
              self.referencesData[key][item[i]["code"]] = item[i]["name"];
            }
           
        });
        }).error(function(data){
          deferred.reject(data);
        });
      }
      return deferred.promise;
    };

 }
  angular.module("aswa").service('getreferences',['$rootScope','$http','$q','urlsettings','mainServices',getreferences]);
})();
