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
        .when('/quotemanager',{
            templateUrl : 'quotemanager/view/quotemanager.html',
            controller : 'quoteManagerController',
            requiresAuthentication: true
        })
        .when('/quotemanager/:CUSTOMERID',{
            templateUrl : 'quotemanager/view/quotemanager.html',
            controller : 'quoteManagerController',
            requiresAuthentication: true
        })
        .when('/quotemanager/quotebasket/:QUOTEID',{
            templateUrl : 'quotemanager/view/quotebasket.html',
            controller : 'quoteBasketController',
            requiresAuthentication: true
        })
        .when('/quotemanager/quotebasket/:QUOTEID/:cloned',{
            templateUrl : 'quotemanager/view/quotebasket.html',
            controller : 'quoteBasketController',
            requiresAuthentication: true
        })
        .when('/pomanager',{
            templateUrl : 'pomanager/view/pomanager.html',
            controller : 'poManagerController',
            requiresAuthentication: true
        })
        .when('/pomanager/:CUSTOMERID',{
            templateUrl : 'pomanager/view/pomanager.html',
            controller : 'poManagerController',
            requiresAuthentication: true
        })
        .when('/pomanager/pobasket/:POID',{
            templateUrl : 'pomanager/view/pobasket.html',
            controller : 'poBasketController',
            requiresAuthentication: true
        })
        .when('/opexpmanager',{
            templateUrl : 'opexpmanager/view/opexpmanager.html',
            controller : 'opexpManagerController',
            requiresAuthentication: true
        })
        .when('/opexpmanager/opexpbasket/:OPEXPID',{
            templateUrl : 'opexpmanager/view/opexpbasket.html',
            controller : 'opexpBasketController',
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
        .when('/estimatemanager/estimatebasket/:ESTIMATEID/:cloned',{
            templateUrl : 'estimatemanager/view/estimatebasket.html',
            controller : 'estimateBasketController',
            requiresAuthentication: true
        })
        .when('/paymentmanager',{
            templateUrl : 'paymentmanager/view/paymentmanager.html',
            controller : 'paymentManagerController',
            requiresAuthentication: true
        })
        .when('/labourmanager/',{
            templateUrl : 'labourmanager/view/labourmanager.html',
            controller : 'labourManagerController',
            requiresAuthentication: true
        })
        .when('/labourmanager/:CUSTOMERID',{
            templateUrl : 'labourmanager/view/labourmanager.html',
            controller : 'labourManagerController',
            requiresAuthentication: true
        })
        .when('/labourmanager/:CUSTOMERID/:CVIEW',{
            templateUrl : 'labourmanager/view/labourmanager.html',
            controller : 'labourManagerController',
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
        }).when('/customer/customerview/customernote/:CUSTOMERID',{
            templateUrl : 'customermanager/view/customernoteview.html',
            controller : 'customerNoteViewController',
            requiresAuthentication: true
        })
        .when('/vendor',{
            templateUrl : 'vendormanager/view/vendormanager.html',
            controller : 'vendorManagerController',
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
