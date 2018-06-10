(function(){

	function logoutController($location, $scope, $rootScope, mainServices, Auth){
		$scope.logout	=	function(){
			console.log("LOGOUT...")
			Auth.logout();
		}
		$scope.logout();

	}
	angular.module('aswa').controller('logoutController',['$location', '$scope', '$rootScope','mainServices','Auth', logoutController]);
})();
