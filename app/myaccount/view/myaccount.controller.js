(function(){

	function myAccountController($scope, $rootScope, $modal, $filter, myAccountServices, utilityServices, storageServices, getreferences,$http, mainServices, Auth){

		$scope.myAccount						=	{};
		$scope.referenceData						=	{};
		
		$scope.pageHeader = Messages['myaccount.title'];

		$scope.referenceData.referencesDataMap 	= {
			"jurisdiction" 	: getreferences.referencesData.JURISDICTION
		};

		$scope.user = {};
		$scope.user.userBO = storageServices.get("userdata", "user");

		$scope.getUserDetails = function(){
			$rootScope.showSpinner();
			myAccountServices.getUserData($scope.user.userBO.USERID).then(function(data){
				$scope.user.userBO = storageServices.get("userdata", "user");
				$rootScope.user = storageServices.get("userdata", "user");
				$rootScope.hideSpinner();
			});
		};

		$scope.$watch('user.userBO', function(){
			$rootScope.user = storageServices.get("userdata", "user");
		});

		
		$scope.editUser = function (data) {
			var config= {};
				config.templateUrl = '../app/myaccount/edit/myaccount.html';
				config.controller = 'myAccountEditController';
				config.size		= 'm';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['myaccount.edituser'];
				config.passingValues.dataBO = $scope.user.userBO;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getUserDetails();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		$scope.refresh	=	function(){
			storageServices.remove("userdara", "user");
			$scope.getUserDetails();
		};

		


	}

	angular.module('aswa').controller('myAccountController',['$scope', '$rootScope', '$modal', '$filter', 'myAccountServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', 'Auth', myAccountController]);
})();
