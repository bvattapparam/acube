(function(){

	function paymentBasketController($location, $window, $routeParams, $scope, $rootScope, $modal, $filter, settings, customerManagerServices, quoteManagerServices, aswaValidationService, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.quoteBasket				=	{};
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
			
		

		$scope.lockIcon = function(status, approved){

			var iconClass;
			if(status == 1 && approved == 0){
				iconClass =  "soft-lock-container";
			}
			return iconClass;
		};

		$scope.getQuoteMaster = function(){
			var pushData	=	{};
			pushData.QUOTEID = $routeParams.QUOTEID;
			quoteManagerServices.getQuoteMaster(pushData).then(function(data){
				if(data.msg!=''){
					$scope.quoteManagerBO	=	[];
					$scope.quoteManagerBO 	= 	data;
					if($scope.quoteManagerBO[0].STATUS == 1){
						$scope.softLock	= true;
					}
					if($scope.quoteManagerBO[0].APPROVED == 1){
						$scope.softLock	= true;
					}
					
					$scope.getQuoteBasket();
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		}
		$scope.getQuoteMaster();

		$scope.amountCal = function(qty, percost){
			var totalAmount = qty*percost;
			$scope.dataBO.AMOUNT = totalAmount;
		};

		$scope.getQuoteBasket = function(){
			$rootScope.showSpinner();
			var pushData	=	{};
			pushData.QUOTEID = $routeParams.QUOTEID;
			quoteManagerServices.getQuoteBasket(pushData).then(function(data){
				if(data.msg!=''){
					$scope.quoteBasketBO	=	[];
					$scope.quoteBasketBO 	= 	data;
					console.log ("QUT BASKET ", $scope.quoteBasketBO)
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
		


		$scope.save = function (record) {
			var pushData = {};
			pushData = record;
			pushData.MODIFIEDBY = $rootScope.user.USERID;
			pushData.QUOTEID	=	$routeParams.QUOTEID;
			var error =	aswaValidationService.isQuoteBasketValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
				if($scope.isEdit){
					quoteManagerServices.updateQuoteBasketData(record).then(function(status){
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
					quoteManagerServices.addQuoteBasketData(record).then(function(status){
						console.log("here");
						if(status==200){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message'])
							$scope.getQuoteBasket();
							//$scope.dataBO = ;
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', error);
						}
					})
				}
			}// check error close here
		};
		

		$scope.quoteBasket = function (data) {
			var config= {};
				config.message = Messages['quotebasket.deleteitem'];
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.buttonHandler = function(index){
					if(index === 0){
						$scope.deleteQuoteBasket(data);
					}
				  };
				  var parConfig = utilityServices.confirmModelConfiguration(config);
			$rootScope.showConfirmationBox(config);
		};

		$scope.deleteBasket = function (data) {
			var config= {};
				config.message = Messages['quotebasket.deleteitem'];
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.buttonHandler = function(index){
					if(index === 0){
						$scope.deleteQuoteBasket(data);
					}
				  };
				  var parConfig = utilityServices.confirmModelConfiguration(config);
			$rootScope.showConfirmationBox(config);
		};

		$scope.deleteQuoteBasket = function(record){
			var pushData = {}
			pushData.ID = record.ID;
			//var error =	aswaValidationService.deleteEstimateBasketValid(record);
			//if(!error){
				//$rootScope.showErrorBox('Error', error);
			//}else{
				$rootScope.showSpinner();
				quoteManagerServices.deleteQuoteBasketData(record).then(function(status){
					if(status==200){
						$rootScope.hideSpinner();
						$rootScope.addnotification(Messages['modal.delete.title'], Messages['modal.delete.message'])
						$scope.getQuoteBasket();
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

		$scope.editQuoteBasket = function (data) {
			var config= {};
				config.templateUrl = '../app/quotemanager/edit/quotebasket.html';
				config.controller = 'quoteBasketEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['quotebasket.editquotebasketitem'];
				config.passingValues.dataBO = data;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getQuoteBasket();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		

		$scope.cloneQuote = function(){
			// FIND THE CURRENT COUNT OF ESTIMATES FROM MASTER TABLE...
			$scope.getQuoteCount();
		}

		$scope.getQuoteCount = function(){
			$rootScope.showSpinner();
			var pushData = {};
			pushData.CUSTOMERID = $scope.quoteManagerBO[0].CUSTOMERID;
			quoteManagerServices.getQuoteCount(pushData).then(function(data){
				if(data.msg!=''){
					$scope.quoteManagerCount	=	[];
					$scope.quoteManagerCount 	= 	data;

					// GENERATE A NEW ESTIMATE. IF THE COUNT IS 0 THEN VERSION IS 0, IF COUNT IS 1 THEN VERSION IS 2.
					var totalCount = $scope.quoteManagerCount[0].total;
					if(typeof totalCount == 'undefined' || totalCount === 0){
						$scope.version = "V0";
					}else{
						$scope.version = "V" + totalCount;
					}
					$scope.cloneQuoteMaster($scope.version);
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};

		$scope.cloneQuoteMaster = function(version){

			var QUOTEID = quoteManagerServices.cloneQuoteVersion($scope.quoteManagerBO[0], version);
			var pushData 				= 	{};
			pushData.QUOTEID 			=	QUOTEID;
			pushData.CUSTOMERID 		= 	$scope.quoteManagerBO[0].CUSTOMERID;
			pushData.MODIFIEDBY 		= 	$rootScope.user.USERID;
			//pushData.CLNESTIMATEID 		=	$routeParams.ESTIMATEID;
			//pushData.CLNBASKET 			=	$scope.estimateBasketBO;
			console.log("PUSH DATA - CLONE QUOTE MASTER ", pushData);

			quoteManagerServices.cloneQuoteMaster(pushData).then(function(status){
				if(status==200){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					$scope.cloneUpdateQuoteMaster(pushData.QUOTEID); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...
					//$scope.cloneUpdateEstimateMaster(ESTIMATEID); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...

				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', 'error');
				}
			});
		};

		$scope.cloneUpdateQuoteMaster = function(QUOTEID){
			var pushData = {};
			pushData.CLNQUOTEID 		=	$routeParams.QUOTEID;
			console.log("PUSH DATA -  EDIT STATUS ", pushData);

			quoteManagerServices.cloneUpdateQuoteMaster(pushData).then(function(status){
				if(status==200){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					$scope.cloneQuoteBasket(QUOTEID); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...
					}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', 'error');
				}
			});
		};
		$scope.approveQuote = function(QUOTEID){
			console.log("APPROVED ", QUOTEID);
			var pushData = {};
			pushData.QUOTEID 		=	$routeParams.QUOTEID;
			pushData.MODIFIEDBY		=	$rootScope.user.USERID;
			quoteManagerServices.approveQuoteMaster(pushData).then(function(status){
				if(status==200){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					$scope.getQuoteMaster(); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...
					}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', 'error');
				}
			});
		};

		$scope.cloneQuoteBasket = function(QUOTEID){
			var pushData = {};
			pushData.QUOTEID 			= 	QUOTEID;
			pushData.MODIFIEDBY 		= 	$rootScope.user.USERID;
			pushData.CLONEBASKET 		=	$scope.quoteBasketBO;
			console.log("PUSH DATA - CLONE BASKET ", pushData);
			
			quoteManagerServices.cloneQuoteBasket(pushData).then(function(status){
				if(status==200){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					$window.location.href = settings.rootScope.appURL + "#/quotemanager/quotebasket/" + pushData.QUOTEID + "/cloned";
				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', 'error');
				}
			});
			
		};








		$scope.refresh	=	function(){
			$scope.getEstimateBasket();
		};

		$scope.fillContent= function(){
			$scope.dataBO.DESCRIPTION = Messages['estimatebasket.description.prefill'];
		};
		
	}

	angular.module('aswa').controller('paymentBasketController',['$location', '$window', '$routeParams', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'customerManagerServices', 'quoteManagerServices','aswaValidationService', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', paymentBasketController]);
})();
