(function(){

	function headerController($rootScope, $scope, headerService, storageServices, dashboardServices,Auth){

		$scope.userBO = {}
		$scope.$watch('user', function(){
			$scope.userBO.userData = $rootScope.user;
		})

		$scope.logout = function(){
			Auth.logout();
		};




	}

	angular.module('aswa').controller("headerController",["$rootScope", "$scope","headerService", "storageServices", "dashboardServices", "Auth", headerController]);

})();
