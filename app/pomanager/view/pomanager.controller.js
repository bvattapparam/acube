(function(){

	function poManagerController($location, $routeParams, $window, $scope, $rootScope, $modal, $filter, settings, customerManagerServices, poManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.poManager 					=	{};
		$scope.poManagerBO	=	[];

		$scope.customerManager 					=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.showAddBtn						= 	true;
		$scope.dataBO = {};

		$scope.reference.CUSTOMER 	=	[];
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE
		};

		
		$scope.getCustomers = function(){
			$rootScope.showSpinner();
			var pushdata				=	{};
			pushdata.statusfilters		=	$rootScope.settings.SHOW_PO_CUSTOMER_STATUS;
			pushdata.filterstatus		=	true;
			pushdata.pagenation			=	false;
			customerManagerServices.getCustomers(pushdata).then(function(data){
				if(data.msg!=''){
					$scope.customerManagerBO	=	[];
					$scope.customerManagerBO	=	data[0].ITEM;
					// CREATE NEW REFERENCE FOR CUSTOMER..
					if($scope.customerManagerBO !== null){
						for(var i=0; i<$scope.customerManagerBO.length; i++){
							var node 	=	{};
							node.code 	= 	$scope.customerManagerBO[i].CUSTOMERID;
							node.name	=	$scope.customerManagerBO[i].CUSTOMERID + " ( " + $scope.customerManagerBO[i].FULLNAME + " )";
							$scope.reference.CUSTOMER.push(node);
						}
					}

					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getCustomers();

		$scope.getPOMasters = function(param){
			$rootScope.showSpinner();
			var pushData = {};
			if(typeof param != 'undefined'){
				pushData.CUSTOMERID = $scope.dataBO.CUSTOMERID;
			}else{
				if($routeParams.CUSTOMERID){
					pushData.CUSTOMERID = $routeParams.CUSTOMERID;
					$scope.dataBO.CUSTOMERID = $routeParams.CUSTOMERID;
				}else{
					pushData.CUSTOMERID = $scope.dataBO.CUSTOMERID;
				}
			}
			
			poManagerServices.getPOMasters(pushData).then(function(data){
				if(data.msg!=''){
					$scope.poManagerBO 	= 	data;
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
		}
		if($routeParams.CUSTOMERID){
			$scope.getPOMasters();
			$scope.id = $routeParams.CUSTOMERID
		}

		$scope.$watch('id', function() {
			$scope.dataBO.CUSTOMERID = $scope.id;
			console.log("changes ",$scope.dataBO.CUSTOMERID)
		  });

		$scope.getPOCount = function(customerid){
			$rootScope.showSpinner();
			var pushData = {};
			pushData.CUSTOMERID = $scope.dataBO.CUSTOMERID;
			poManagerServices.getPOCount(pushData).then(function(data){
				if(data.msg!=''){
					$scope.poManagerBO	=	[];
					$scope.poManagerBO 	= 	data;

					// GENERATE A NEW ESTIMATE. IF THE COUNT IS 0 THEN VERSION IS 0, IF COUNT IS 1 THEN VERSION IS 2.
					var totalCount = $scope.poManagerBO[0].total;
					if(typeof totalCount == 'undefined' || totalCount === 0){
						$scope.version = "V0";
					}else{
						$scope.version = "V" + totalCount;
					}
					$scope.generatePOMaster($scope.version);
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};
		$scope.generatePOMaster = function(version){
			var POID = poManagerServices.poVersion(version);
			var pushData = {};
			pushData.POID = POID;
			pushData.CUSTOMERID = $scope.dataBO.CUSTOMERID;
			pushData.MODIFIEDBY = $rootScope.user.USERID

			poManagerServices.generatePOMaster(pushData).then(function(data){
				if(data.msg!= ''){
					$rootScope.hideSpinner();
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					//$scope.getPOMasters();
					$window.location.href = settings.rootScope.appURL + "#/pomanager/pobasket/" + POID;
					console.log(1)
				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', data.error);
				}
			});
		};

		$scope.generateNewPO = function(){
			var customerid = $scope.dataBO.CUSTOMERID;
			console.log("customerid", customerid)
			if(customerid){
				// GET CUSTOMER DETAILS
				$scope.getPOCount(customerid);
			}else{
				$rootScope.showErrorBox('Error', Messages['validation.selectcustomer']);
			}
		};
		$scope.poBasket = function(record){
			var poid = record.POID;
			$window.location.href = settings.rootScope.appURL + "#/pomanager/pobasket/" + poid;
		};

		$scope.refresh	=	function(){
			$scope.getCustomers();
			$scope.getPOMasters();
		};

		


	}

	angular.module('aswa').controller('poManagerController',['$location', '$routeParams', '$window', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'customerManagerServices', 'poManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', poManagerController]);
})();
