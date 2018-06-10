(function(){
	function footerController($scope,$rootScope, settings){
		$scope.copyright = "copyright reserved (2015-2016) to aswa2.0 ";

		$scope.build = settings.rootScope.build;
	}

	angular.module("aswa").controller('footerController',['$scope','$rootScope','settings',footerController]);
})();