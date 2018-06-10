(function(){

    console.log("reached router");

    angular.module("paaplogin").config(function($routeProvider){
        $routeProvider
        .when('/login',{
            templateUrl : 'login.html',
            controller : 'loginController'
        })
        .when('/logout',{
            templateUrl : 'logout.html',
            controller : 'logoutController'
        })
        .otherwise({redirectTo : '/login'});
    })
})();
