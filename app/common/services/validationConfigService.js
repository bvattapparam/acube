(function(){
  // create factory for header service to retun object in deffered way
  "use strict";

  function validationConfigService($rootScope,$http,$q, $filter, utilityServices, urlsettings){

    var self  = this;
    self.cache  = {};
    var inProgress  = false;
    var observers = [];
    
    // FUNCTION TO CALL VALIDATION JSON BASED ON THE CALL FROM MAIN CONTROLLER.

    this.getValidationConfig  = function(param){
      var deferred    = $q.defer();
      var paramKey    = "getValidationConfig";

      if(self.cache[paramKey]){
        deferred.resolve(self.cache[paramKey]);
      } else if(inProgress){
        observers.push(deferred);
      } else {
        inProgress  = true;
        var parmSite  = "validationConfigService.getValidationConfig";
        var reqestURL = urlsettings[parmSite];

        $http({
          method : 'GET',
          url:reqestURL
        }).success(function(data, status){
          inProgress  = false;
          self.cache["getValidationConfig"] = data;
          angular.forEach(observers, function(item){
            item.resolve(data);
          });
          observers   = [];
          deferred.resolve(data);
        }).error(function(data, status){
          inProgress  = false;
          angular.forEach(observers, function(item){
            item.reject(data);
          });
        });
      }
      return deferred.promise;
    };

    this.validateReqBO  = function(reqBO, configBO, form){
      
      // FIRST TIME VALIDATION. IF THE REQBO IS EMPTY THEN DUMMY KEY IS ADDED TO VALIDATE IT.
      if(!reqBO){
        var reqBO = {};
        reqBO.noKey = 'NoKey'; 
      }
        // FUNCTION TO CHANGE THE KEYS IN LOWERCASE...
     // var reqBOKeys = keyToLowercase(reqBO);
         // reqBO     = reqBOKeys;

      var errorMessages = [];
      var k = 0, errorCode, key   = "";
      var validate  = validator();

      for(var i = 0; i < configBO.length; i++){
        key   = configBO[i].key;
        for(var j = 0; j < configBO[i].validations.length; j++){
          if(validate[configBO[i].validations[j].type]){
            errorCode   = validate[configBO[i].validations[j].type](key, configBO[i].validations[j], reqBO, form);
            if(errorCode){
              errorMessages.push(Messages[errorCode]);
            }
          }
        }
      };
      return errorMessages;
    };

    var keyToLowercase  =   function (obj){
        Object.keys(obj).forEach(function (key) {
            var k = key.toLowerCase();

            if (k !== key) {
                obj[k] = obj[key];
                delete obj[key];
            }
        });
        return (obj);
    };

    var validator  = function(){
      return {
        required:function(key,config,reqBO,form){
          if(config.value === "true"){
            if(!reqBO[key]){
              return config.errCode;
            }
          }
        },
        maxLength:function(key, config, reqBO){
          var maxLength   =  parseInt(config.value);
          if(reqBO[key] && maxLength > 0){
            if(maxLength < reqBO[key].length){
              return config.errCode;
            }
          }
        },
        numeric:function(key, config, reqBO){
          if(reqBO[key]){
            if(!(/^[0-9]+$/.test(reqBO[key]))){
              return config.errCode;
            }
          }
        }
      }
    }

  }
  angular.module("aswa").service('validationConfigService',['$rootScope','$http','$q','$filter', 'utilityServices', 'urlsettings', validationConfigService]);
})();
