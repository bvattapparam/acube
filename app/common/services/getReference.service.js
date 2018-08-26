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
          var POTYPE = [];
          POTYPE.push({id:1, code: 'OPEXP', name: 'OPERATIONAL EXPENSE', status:1},{id:2, code: 'PREXP', name: 'PROJECT EXPENSE', status:1})
          data.POTYPE = POTYPE;
          self.references = data;
          angular.forEach(data, function(item,key){
            if(typeof item == 'undefined' || item == null){
              $rootScope.showInfoBox(Messages['prompt.info.title'], Messages['prompt.label.referencenotloaded']);
            }else{
              var length  = item.length-1;
              self.referencesData[key]  = {};
              for(var i=length; i>=0;i--){
                //console.log('self ', item[i]["name"])
                self.referencesData[key][item[i]["code"]] = item[i]["name"];
             }
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
