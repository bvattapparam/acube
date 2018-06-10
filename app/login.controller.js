(function(){

	function loginController($location, $scope, $rootScope, i18nFilter, $modal, $filter, mainServices, loginServices, utilityServices, storageServices, aswaValidationService,Auth){

		
		$scope.getAuthenticate 	= function(param){
			var error 		= 	aswaValidationService.isLoginValid(param);
			if(error){
					$rootScope.showErrorBox('error', error, 'md');
			}else{ 
				var userid = param.USERID;
				var password = param.PASSWORD;
				Auth.login(param);
			}
		}
	}
	angular.module('aswa').controller('loginController',['$location', '$scope', '$rootScope','i18nFilter', '$modal', '$filter', 'mainServices', 'loginServices', 'utilityServices', 'storageServices', 'aswaValidationService','Auth', loginController]);
})();
