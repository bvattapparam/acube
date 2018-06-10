

(function(){

var permissiondirective = angular.module('permissiondirective',[]);

permissiondirective.directive('permission',['Auth', function(Auth){
  return {
    restrict  : 'A',
     scope: {
          permission: '='
       },

      // console.log("Directive reached")

        link: function (scope, elem, attrs) {
            scope.$watch(Auth.isLoggedIn, function() {
            //  console.log("Directive reached --- 1")
                if (Auth.userHasPermissionForSection(scope.permission)) {
                //  console.log("Directive reached... show")
                     elem.show();
                 } else {
                 // console.log("Directive reached... hide")
                    elem.hide();
                 }
            });                
       }
    
  };
}]);

})();
