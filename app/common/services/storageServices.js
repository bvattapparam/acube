(function(){
  // session storage serice is using to handle session data
  function storageServices($q, $http){

    //set service data to the session
    this.set  = function(value, key1, key2){
      var sObject = JSON.parse(sessionStorage.getItem(key1));
      if(!sObject){
        sObject = {};
      }
      sObject[key2] = value;
      sessionStorage.setItem(key1, JSON.stringify(sObject));
    };

    // get the value from session storage
    this.get =  function(key1, key2){
      var sObject = JSON.parse(sessionStorage.getItem(key1));
      if(sObject){
        return  sObject[key2];
      }
      return null;
    };

    // remove storage data
    this.remove = function(key1, key2){
      var sObject = JSON.parse(sessionStorage.getItem(key1));
      if(sObject){
        if(key2){
          if(sObject[key2]){
            delete sObject[key2];
            sessionStorage.setItem(key1, JSON.stringify(sObject));
          }
        }else{
          sessionStorage.removeItem(key1);
        }
      }
    };

    // function for clear storage data globally. mainly used for logout session
    this.removeAll = function(){
      sessionStorage.clear();
    };

  }


  angular.module("aswa").service('storageServices',['$q', '$http', storageServices]);
})();
