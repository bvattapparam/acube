(function(){

    angular.module("aswa").config(function($routeProvider){
        $routeProvider
        .when('/dashboard',{
            templateUrl : 'dashboard/dashboard.html',
            controller : 'dashboardController',
            requiresAuthentication: true

        })
        .when('/marketingbasket',{
            templateUrl : 'marketingbasket/view/marketingbasket.html',
            controller : 'marketingBasketController',
            requiresAuthentication: true
        })
        .when('/users',{
            templateUrl : 'usermanager/view/usermanager.html',
            controller : 'userManagerController',
            requiresAuthentication: true
        })
         .when('/estimatemanager',{
            templateUrl : 'estimatemanager/view/estimatemanager.html',
            controller : 'estimateManagerController',
            requiresAuthentication: true
        })
        .when('/estimatemanager/:CUSTOMERID',{
            templateUrl : 'estimatemanager/view/estimatemanager.html',
            controller : 'estimateManagerController',
            requiresAuthentication: true
        })
         .when('/estimatemanager/estimatebasket/:ESTIMATEID',{
            templateUrl : 'estimatemanager/view/estimatebasket.html',
            controller : 'estimateBasketController',
            requiresAuthentication: true
        })
        .when('/customer',{
            templateUrl : 'customermanager/view/customermanager.html',
            controller : 'customerManagerController',
            requiresAuthentication: true
        })
        .when('/customer/customerview/:CUSTOMERID',{
            templateUrl : 'customermanager/view/customerview.html',
            controller : 'customerViewController',
            requiresAuthentication: true
        })
        .when('/myaccount',{
            templateUrl : 'myaccount/view/myaccount.html',
            controller : 'myAccountController',
            requiresAuthentication: true
        })
        .when('/login',{
            templateUrl : 'login.html',
            controller : 'loginController'
        })
        .when('/logout',{
            templateUrl : 'logout.html',
            controller : 'logoutController'
        })
        .otherwise({redirectTo : '/dashboard'});
    })
})();
