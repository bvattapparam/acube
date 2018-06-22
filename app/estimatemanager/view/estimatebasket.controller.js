(function(){

	function estimateBasketController($location, $window, $routeParams, $scope, $rootScope, $modal, $filter, settings, customerManagerServices, estimateManagerServices, aswaValidationService, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.estimateBasket				=	{};
		$scope.dataBO = {};
		$scope.customerManager 					=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.showAddBtn						= 	true;
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	:	getreferences.referencesData.CUSTOMERTYPE,
			"LOCATION"		:	getreferences.referencesData.LOCATION
		};

		$scope.reference = 	getreferences.references;
			
		$scope.getEstimateMaster = function(){
			var pushData	=	{};
			pushData.ESTIMATEID = $routeParams.ESTIMATEID;
			estimateManagerServices.getEstimateMaster(pushData).then(function(data){
				if(data.msg!=''){
					$scope.estimateManagerBO	=	[];
					$scope.estimateManagerBO 	= 	data;
					$scope.getEstimateBasket();
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		}
		$scope.getEstimateMaster();

		$scope.amountCal = function(qty, percost){
			var totalAmount = qty*percost;
			$scope.dataBO.AMOUNT = totalAmount;
		};

		$scope.getEstimateBasket = function(){
			$rootScope.showSpinner();
			var pushData	=	{};
			pushData.ESTIMATEID = $routeParams.ESTIMATEID;
			estimateManagerServices.getEstimateBasket(pushData).then(function(data){
				if(data.msg!=''){
					$scope.estimateBasketBO	=	[];
					$scope.estimateBasketBO 	= 	data;
					//$scope.groubedByTeam=groupBy(data, 'LOCATION')
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
		
		// TODO: WILL USE THIS METHOD LATER...
		var groupBy = function(xs, key) {
		return xs.reduce(function(rv, x) {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});
		};



		$scope.save = function (record) {
			var pushData = {};
			pushData = record;
			pushData.MODIFIEDBY = $rootScope.user.USERID;
			pushData.ESTIMATEID	=	$routeParams.ESTIMATEID;
			console.log("pushdata", record);
			var error =	aswaValidationService.isEstimateBasketValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
				if($scope.isEdit){
					estimateManagerServices.updateEstimateBasketData(record).then(function(status){
						if(status==200){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', error);
						}
					})
				}else{
					estimateManagerServices.addEstimateBasketData(record).then(function(status){
						console.log("here");
						if(status==200){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message'])
							$scope.getEstimateBasket();
							//$scope.dataBO = ;
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', error);
						}
					})
				}
			}// check error close here
		};
		

		$scope.deleteBasket = function (data) {
			var config= {};
				config.message = Messages['estimatebasket.deleteitem'];
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.buttonHandler = function(index){
					if(index === 0){
						$scope.deleteEstBasket(data);
					}
				  };
				  var parConfig = utilityServices.confirmModelConfiguration(config);
			$rootScope.showConfirmationBox(config);
		};


		$scope.deleteEstBasket = function(record){
			var pushData = {}
			pushData.ID = record.ID;
			//var error =	aswaValidationService.deleteEstimateBasketValid(record);
			//if(!error){
				//$rootScope.showErrorBox('Error', error);
			//}else{
				$rootScope.showSpinner();
				estimateManagerServices.deleteEstimateBasketData(record).then(function(status){
					if(status==200){
						$rootScope.hideSpinner();
						$rootScope.addnotification(Messages['modal.delete.title'], Messages['modal.delete.message'])
						$scope.getEstimateBasket();
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
						$scope.getCustomers();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		$scope.refresh	=	function(){
			$scope.getEstimateBasket();
		};

		$scope.fillContent= function(){
			$scope.dataBO.DESCRIPTION = Messages['estimatebasket.description.prefill'];
		};
		
	}

	angular.module('aswa').controller('estimateBasketController',['$location', '$window', '$routeParams', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'customerManagerServices', 'estimateManagerServices','aswaValidationService', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', estimateBasketController]);
})();
