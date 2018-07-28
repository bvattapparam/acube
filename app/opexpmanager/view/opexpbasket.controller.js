(function(){

	function opexpBasketController($location, $window, $routeParams, $scope, $rootScope, $modal, $filter, settings, customerManagerServices, opexpManagerServices, vendorManagerServices, aswaValidationService, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.opexpBasket				=	{};
		$scope.dataBO 					=	{};
		$scope.reference				=	{};
		$scope.referenceData			=	{};
		

		$scope.reference = 	getreferences.references;

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
		};
		$scope.getVendors();

		$scope.getOPEXPMaster = function(){
			var pushData	=	{};
			pushData.OPEXPID = $routeParams.OPEXPID;
			opexpManagerServices.getOPEXPMaster(pushData).then(function(data){
				if(data.msg!=''){
					$scope.opexpManagerBO	=	[];
					$scope.opexpManagerBO 	= 	data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};
		$scope.getOPEXPMaster();

		$scope.amountCal = function(qty, percost){
			var totalAmount = (qty * percost).toFixed(2);
			$scope.dataBO.AMOUNT = totalAmount;
		};

		$scope.getOPEXPBasket = function(){
			$rootScope.showSpinner();
			var pushData	=	{};
			pushData.OPEXPID = $routeParams.OPEXPID;
			opexpManagerServices.getOPEXPBasket(pushData).then(function(data){
				if(data.msg!=''){
					$scope.opexpBasketBO	=	[];
					$scope.opexpBasketBO 	= 	data;
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
		};
		$scope.getOPEXPBasket();
		$scope.save = function (record) {
			var pushData = {};
			pushData = record;
			pushData.MODIFIEDBY 	= 	$rootScope.user.USERID;
			pushData.OPEXPID		=	$routeParams.OPEXPID;
			var error =	aswaValidationService.isOPEXPBasketValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
				if($scope.isEdit){
					opexpManagerServices.updateOPEXPBasket(record).then(function(data){
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
					opexpManagerServices.addOPEXPBasket(record).then(function(data){
						console.log("here");
						if(data.msg!=''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message'])
							$scope.getOPEXPBasket();
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
				config.message = Messages['opexpbasket.deleteitem'];
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
				opexpManagerServices.deleteOPEXPBasket(record).then(function(data){
					if(data.msg!=''){
						$rootScope.hideSpinner();
						$rootScope.addnotification(Messages['modal.delete.title'], Messages['modal.delete.message'])
						$scope.getOPEXPBasket();
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
				config.templateUrl = '../app/opexpmanager/edit/opexpbasket.html';
				config.controller = 'opexpBasketEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['opexpbasket.editopexpbasketitem'];
				config.passingValues.dataBO = data;
				config.passingValues.vendorBO = $scope.reference.vendorManagerBO;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getOPEXPBasket();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		

		$scope.refresh	=	function(){
			$scope.getOPEXPBasket();
			$scope.getOPEXPMaster();
		};
		
	}

	angular.module('aswa').controller('opexpBasketController',['$location', '$window', '$routeParams', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'customerManagerServices', 'opexpManagerServices', 'vendorManagerServices', 'aswaValidationService', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', opexpBasketController]);
})();
