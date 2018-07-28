(function(){

	function opexpManagerController($location, $routeParams, $window, $scope, $rootScope, $modal, $filter, settings, customerManagerServices, opexpManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.opexpManager 					=	{};
		$scope.opexpManagerBO					=	[];
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.dataBO = {};


		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE
		};


		$scope.getOPEXPMasters = function(){
			$rootScope.showSpinner();
			var pushData = {};
			opexpManagerServices.getOPEXPMasters(pushData).then(function(data){
				if(data.msg!=''){
					$scope.opexpManagerBO 	= 	data;
					console.log("PO MASTER ", data)
					if(data!=''){
						$scope.showAddBtn 		=	false;
					}else{
						$scope.showAddBtn 		=	true;
					}
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};
		$scope.getOPEXPMasters();

		$scope.getOPEXPCount = function(){
			$rootScope.showSpinner();
			var pushData = {};
			opexpManagerServices.getOPEXPCount().then(function(data){
				if(data.msg!=''){
					var opexpManagerBO	=	[];
					opexpManagerBO 	= 	data;

					// GENERATE A NEW ESTIMATE. IF THE COUNT IS 0 THEN VERSION IS 0, IF COUNT IS 1 THEN VERSION IS 2.
					var totalCount = opexpManagerBO[0].total;
					if(typeof totalCount == 'undefined' || totalCount === 0){
						$scope.version = "V0";
					}else{
						$scope.version = "V" + totalCount;
					}
					$scope.generateOPEXPMaster($scope.version);
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};
		$scope.generateOPEXPMaster = function(version){
			var OPEXPID = opexpManagerServices.opexpVersion(version);
			var pushData = {};
			pushData.OPEXPID = OPEXPID;
			pushData.MODIFIEDBY = $rootScope.user.USERID;
			opexpManagerServices.generateOPEXPMaster(pushData).then(function(data){
				if(data.msg!= ''){
					$rootScope.hideSpinner();
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					//$scope.getPOMasters();
					$window.location.href = settings.rootScope.appURL + "#/opexpmanager/opexpbasket/" + OPEXPID;
					console.log(1)
				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', data.error);
				}
			});
		};

		$scope.createOPEXP = function(){
			$scope.getOPEXPCount();
		};

		$scope.opexpBasket = function(record){
			var opexpid = record.OPEXPID;
			$window.location.href = settings.rootScope.appURL + "#/opexpmanager/opexpbasket/" + opexpid;
		};
		
		$scope.refresh	=	function(){
			$scope.getOPEXPMasters();
		};

	}

	angular.module('aswa').controller('opexpManagerController',['$location', '$routeParams', '$window', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'customerManagerServices', 'opexpManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', opexpManagerController]);
})();
