// main application module
(function(){
	var app = angular.module('aswa',['ngSanitize', 
		'ngRoute',
		'ui.bootstrap', 
		'ui.bootstrap.datetimepicker',
		'ui.select2', 
		'ui.sortable',
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
        if (!Auth.checkPermissionForView(next)){
            event.preventDefault();
            $location.path("/login");
        }
    });
		}]);
;

})();
