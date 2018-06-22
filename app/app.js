// main application module
(function(){
	var app = angular.module('aswa',['ngSanitize', 
		'ngRoute',
		'ui.bootstrap', 
		'ui.bootstrap.datetimepicker',
		'ui.select2', 
		'chart.js', 
		'aswaFilters',
		'acubeDirectives',
		'i18nFilter', 
		'confirmationpopup',
		'permissiondirective',
		'ng-fusioncharts',
		'angular.filter',
		'AuthServices',]).run(['$rootScope','$location','Auth', function($rootScope,$location,Auth){
			Auth.init();
			$rootScope.$on('$routeChangeStart', function (event, next) {
				console.log("main")
        if (!Auth.checkPermissionForView(next)){
            event.preventDefault();
            $location.path("/login");
        }
    });
		}]);
;

})();
