(function(){

	function estimateGenerateController($location, $window, $routeParams, $scope, $rootScope, $modal, $filter, settings, customerManagerServices, estimateManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.estimateGenerate 				=	{};
		$scope.customerManager 					=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.showAddBtn						= 	true;
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE
		};


		$scope.getCustomer = function(){
			console.log(1)
			$rootScope.showSpinner();
			customerManagerServices.getCustomer($routeParams.CUSTOMERID).then(function(data){
				console.log(2)
				if(data.msg!=''){
					$scope.customerManagerBO	=	[];
					$scope.customerManagerBO 	= 	data;

					console.log("PRINT: ", $scope.customerManagerBO);
					
					$scope.getEstimateCount();
					
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		}

		$scope.getCustomer();

		$scope.getEstimateCount = function(){
			$rootScope.showSpinner();
			var pushData = {};
			pushData.CUSTOMERID = $routeParams.CUSTOMERID;
			
			
			estimateManagerServices.getEstimateCount(pushData).then(function(data){
				if(data.msg!=''){
					$scope.estimateManagerBO	=	[];
					$scope.estimateManagerBO 	= 	data;

					// GENERATE A NEW ESTIMATE. IF THE COUNT IS 0 THEN VERSION IS 0, IF COUNT IS 1 THEN VERSION IS 2.
					
					var totalCount = $scope.estimateManagerBO[0].total;
					if(typeof totalCount == 'undefined' || totalCount === 0){
						$scope.version = "V0";
					}else{
						$scope.version = "V" + totalCount;
					}
					$scope.generateEstimate($scope.version);
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		}


		$scope.generateEstimate = function(version){

			// AGM-ESTI-R-BI-V0-41720182123;
			var CUSTOMERID = $routeParams.CUSTOMERID;
			var VERSION = version;
			var CUSTOMER_TYPE = $scope.customerManagerBO[0].TYPE;
			var CUSTOMERNAME = $scope.customerManagerBO[0].FULLNAME;
			var COMPANY = "AGM";
			var ENTITY = "ESTI";
			var D = new Date();
			var NDATE = D.getMonth()+1 + "" + D.getDate() + "" + D.getFullYear() + "" + D.getHours() + "" + D.getMinutes();
			var ESTIMATEID = COMPANY + "-" + ENTITY + "-" + CUSTOMER_TYPE + "-" + CUSTOMERNAME.substr(0,2).toUpperCase() + "-" + VERSION + "-" + NDATE;

			var pushData = {};
			pushData.ESTIMATEID = ESTIMATEID;
			pushData.CUSTOMERID = CUSTOMERID;
			pushData.MODIFIEDBY = $rootScope.user.USERID;

			estimateManagerServices.generateEstimate(pushData).then(function(data){
				if(status==200){
					$rootScope.hideSpinner();
					$scope.getEstimate();
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
					$modalInstance.close();
				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', error);
				}
			});
		};

		$scope.getEstimate = function(){
			estimateManagerServices.getEstimate($routeParams.CUSTOMERID).then(function(data){
				if(data.msg!=''){
					$scope.estimateManagerBO	=	[];
					$scope.estimateManagerBO 	= 	data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		}


		

		$scope.refresh	=	function(){
			$scope.getCustomers();
		};
		
	}

	angular.module('aswa').controller('estimateGenerateController',['$location', '$window', '$routeParams', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'customerManagerServices', 'estimateManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', estimateGenerateController]);
})();
