(function(){

	function poBasketController($location, $window, $routeParams, $scope, $rootScope, $modal, $filter, settings, customerManagerServices, poManagerServices, vendorManagerServices, aswaValidationService, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.poBasket				=	{};
		$scope.dataBO = {};
		$scope.customerManager 					=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.showAddBtn						= 	true;
		$scope.softLock							= 	false;
		$scope.hardLock							= 	false;
		$scope.cloned 							= 	false;
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	:	getreferences.referencesData.CUSTOMERTYPE,
			"LOCATION"		:	getreferences.referencesData.LOCATION
		};

		$scope.reference = 	getreferences.references;

		if($routeParams.cloned){
			$scope.cloned = true;
		}

		
			
		$scope.getVendors = function(){
			vendorManagerServices.getVendors().then(function(data){
				if(data.msg!=''){
					$scope.vendorManagerBO	=	[];
					$scope.vendorManagerBO 	= 	data;
					$scope.reference.vendorManagerBO	=	[];

					angular.forEach(data, function(val, key){
						var node 	=	{};
						node.code = val.VENDORID;
						node.name = val.NAME;
						$scope.reference.vendorManagerBO.push(node);
					
					});

					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		}
		$scope.getVendors();

		$scope.getPOMaster = function(){
			var pushData	=	{};
			pushData.POID = $routeParams.POID;
			poManagerServices.getPOMaster(pushData).then(function(data){
				if(data.msg!=''){
					$scope.poManagerBO	=	[];
					$scope.poManagerBO 	= 	data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		}
		$scope.getPOMaster();

		$scope.amountCal = function(qty, percost){
			var totalAmount = (qty * percost).toFixed(2);
			$scope.dataBO.AMOUNT = totalAmount;
		};

		$scope.getPOBasket = function(){
			$rootScope.showSpinner();
			var pushData	=	{};
			pushData.POID = $routeParams.POID;
			poManagerServices.getPOBasket(pushData).then(function(data){
				if(data.msg!=''){
					$scope.poBasketBO	=	[];
					$scope.poBasketBO 	= 	data;
					var totalamount = 0;
					var totalqty = 0;
					for(var i = 0; i<data.length;i++){
						var amount 	=	data[i].AMOUNT;
						var qty		=	data[i].QTY;
						totalamount += Number(amount);
						totalqty += Number(qty);
					}
					$scope.TOTALAMOUNT 	=	totalamount;
					$scope.TOTALQTY		=	totalqty;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		}
		
		$scope.getPOBasket();

		$scope.save = function (record) {
			var pushData = {};
			pushData = record;
			pushData.MODIFIEDBY = 	$rootScope.user.USERID;
			pushData.POID		=	$routeParams.POID;
			var error =	aswaValidationService.isPOBasketValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
				if($scope.isEdit){
					poManagerServices.updatePOBasket(record).then(function(data){
						if(data.msg!=''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', data.error);
						}
					})
				}else{
					poManagerServices.addPOBasket(record).then(function(data){
						if(data.msg!=''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message'])
							$scope.getPOBasket();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', data.error);
						}
					})
				}
			}// check error close here
		};
		

		$scope.deleteBasket = function (data) {
			var config= {};
				config.message = Messages['pobasket.deleteitem'];
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.buttonHandler = function(index){
					if(index === 0){
						$scope.deletePOBasket(data);
					}
				  };
				  var parConfig = utilityServices.confirmModelConfiguration(config);
			$rootScope.showConfirmationBox(config);
		};


		$scope.deletePOBasket = function(record){
			var pushData = {}
			pushData.ID = record.ID;
			//var error =	aswaValidationService.deleteEstimateBasketValid(record);
			//if(!error){
				//$rootScope.showErrorBox('Error', error);
			//}else{
				$rootScope.showSpinner();
				poManagerServices.deletePOBasket(record).then(function(data){
					if(data.msg!=''){
						$rootScope.hideSpinner();
						$rootScope.addnotification(Messages['modal.delete.title'], Messages['modal.delete.message'])
						$scope.getPOBasket();
					}else {
						$rootScope.hideSpinner();
						$rootScope.showErrorBox('error', error);
					}
				})
			//}
		};

		$scope.generatePDF = function (data) {
			var config= {};
				config.templateUrl = '../app/estimatemanager/generate/estimatebasketpdf.html';
				config.controller = 'estimateBasketController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['estimatebasket.generatepdf.estimate'];
				config.passingValues.dataBO = data;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getEstimateBasket();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		$scope.editBasket = function (data) {
			var config= {};
				config.templateUrl = '../app/pomanager/edit/pobasket.html';
				config.controller = 'poBasketEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['pobasket.editpobasketitem'];
				config.passingValues.dataBO = data;
				config.passingValues.vendorBO = $scope.reference.vendorManagerBO;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getPOBasket();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};
		
		$scope.refresh	=	function(){
			$scope.getVendors();
			$scope.getPOMaster();
			$scope.getPOBasket();
		};
		
	}

	angular.module('aswa').controller('poBasketController',['$location', '$window', '$routeParams', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'customerManagerServices', 'poManagerServices', 'vendorManagerServices', 'aswaValidationService', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', poBasketController]);
})();
