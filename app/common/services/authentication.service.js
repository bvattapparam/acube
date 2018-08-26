(function(){
  // create factory for header service to retun object in deffered way
  function Auth($location,$rootScope,$http,storageServices,$q,loginServices){
     
    var auth = {};
     
    auth.init = function(){
        if (auth.isLoggedIn()){
            $rootScope.user = auth.currentUser();
        }
    };
         
    auth.login = function(param){
      loginServices.getUser(param).then(function(data){
          if(data.length > 0){
            storageServices.set(data[0], "userdata","user");
            $rootScope.user = storageServices.get("userdata","user");
            if(typeof storageServices.get("userdata","user").PERMISSIONS == 'undefined'){
                $rootScope.showInfoBox(Messages['prompt.info.title'], Messages['prompt.label.permissionissue']);
                $location.path('/logout');
            }
            $location.path('/dashboard');
          }else{
            var errordetails   =   Messages['login.failure.message'];
            $rootScope.showErrorBox('error', errordetails, 'md');
          }
        });
    };
     
 
    auth.logout = function() {
         storageServices.remove("userdata","user");
        delete $rootScope.user;
        $location.path('/login');
    };
     
     
    auth.checkPermissionForView = function(view) {
        if (!view.requiresAuthentication) {
            return true;
        }
        return userHasPermissionForView(view);
    };
     
     
    var userHasPermissionForView = function(view){
      if(!auth.isLoggedIn()){
            return false;
        }
         
        if(!view.permissions || !view.permissions.length){
            return true;
        }
         
        return auth.userHasPermission(view.permissions);
    };
     
     
    auth.userHasPermissionForSection = function(permissions){
        if(!auth.isLoggedIn()){
            return false;
        }
         
        var found = false;
        angular.forEach(permissions, function(permission, index){
            if(typeof storageServices.get("userdata","user").PERMISSIONS == 'undefined'){
                $location.path('/logout');
            }else{
                if(storageServices.get("userdata","user").PERMISSIONS.indexOf(permission) >= 0){
                    found = true;
                    return;
                } 
            }
                                   
        });
        
        return found;
    };

    auth.userHasPermission = function(permissions){
        if(!auth.isLoggedIn()){
            return false;
        }
         
        var found = false;
        angular.forEach(permissions, function(permission, index){
            if(storageServices.get("userdata","user").PERMISSIONS.indexOf(permission) >= 0){
               found = true;
               return;
           }                        
        });

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
        return storageServices.get("userdata","user") != null;
    };
     
    return auth;
    

 }
  angular.module("AuthServices",[]).factory('Auth',['$location','$rootScope','$http','storageServices','$q','loginServices', Auth]);
})();

