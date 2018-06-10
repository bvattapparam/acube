(function(){
  // create factory for header service to retun object in deffered way
  function Auth($location,$rootScope,$http,storageServices,$q,loginServices){
     
    var auth = {};
     
    auth.init = function(){
      console.log("One")
        if (auth.isLoggedIn()){
            $rootScope.user = auth.currentUser();
        }
    };
         
    auth.login = function(param){
       console.log("two")
      loginServices.getUser(param).then(function(data){
          if(data.length > 0){
            storageServices.set(data[0], "userdata","user");
            $rootScope.user = storageServices.get("userdata","user");
            $location.path('/dashboard');
          }else{
            var errordetails   =   Messages['login.failure.message'];
            $rootScope.showErrorBox('error', errordetails, 'md');
          }
        });
    };
     
 
    auth.logout = function() {
       console.log("three")
         storageServices.remove("userdata","user");
        delete $rootScope.user;
        $location.path('/login');
    };
     
     
    auth.checkPermissionForView = function(view) {
       console.log("four")
        if (!view.requiresAuthentication) {
            return true;
        }
        return userHasPermissionForView(view);
    };
     
     
    var userHasPermissionForView = function(view){
       console.log("five")
      if(!auth.isLoggedIn()){
            return false;
        }
         
        if(!view.permissions || !view.permissions.length){
            return true;
        }
         
        return auth.userHasPermission(view.permissions);
    };
     
     
    auth.userHasPermissionForSection = function(permissions){
       console.log("six section")
      console.log("reached permission", permissions)
        if(!auth.isLoggedIn()){
            return false;
        }
         
        var found = false;
        angular.forEach(permissions, function(permission, index){
          console.log("Inside angular : ", permission," ---- ", storageServices.get("userdata","user").PERMISSIONS.indexOf(permission));
            if(storageServices.get("userdata","user").PERMISSIONS.indexOf(permission) >= 0){
              console.log("inside 1......");
               found = true;
               return;
           }                        
        });
        
        return found;
    };

    auth.userHasPermission = function(permissions){
       console.log("six")
      console.log("reached permission", permissions)
        if(!auth.isLoggedIn()){
            return false;
        }
         
        var found = false;
        angular.forEach(permissions, function(permission, index){
          console.log("Inside angular : ", permission," ---- ", storageServices.get("userdata","user").PERMISSIONS.indexOf(permission));
            if(storageServices.get("userdata","user").PERMISSIONS.indexOf(permission) >= 0){
              console.log("inside 1......");
               found = true;
               return;
           }                        
        });

        //console.log("FOUND: ", found);
         if(!found){
          var errordetails   =   Messages['page.access.denied'];
          $rootScope.showErrorBox('info', errordetails, 'md');
         auth.logout();
         }
        return found;
    };
     
     
    auth.currentUser = function(){
       return storageServices.get("userdata","user");
    };
     
     
    auth.isLoggedIn = function(){
       console.log("seven")
        return storageServices.get("userdata","user") != null;
    };
     
     return auth;
    

 }
  angular.module("AuthServices",[]).factory('Auth',['$location','$rootScope','$http','storageServices','$q','loginServices', Auth]);
})();

