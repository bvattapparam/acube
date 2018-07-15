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
					console.log("vendors", data)

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

					console.log("POMASTER", data)
					//$scope.getPOBasket();
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		}
		$scope.getPOMaster();

		$scope.amountCal = function(qty, percost){
			var totalAmount = qty*percost;
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

					console.log('DATA ', data);
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
		
		$scope.getPOBasket();
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
			pushData.MODIFIEDBY = 	$rootScope.user.USERID;
			pushData.POID		=	$routeParams.POID;
			console.log("pushdata", record);
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
						console.log("here");
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

		$scope.editEstimateBasket = function (data) {
			var config= {};
				config.templateUrl = '../app/estimatemanager/edit/estimatebasket.html';
				config.controller = 'estimateBasketEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['estimatebasket.editestimatebasketitem'];
				config.passingValues.dataBO = data;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getEstimateBasket();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		// CLONE THE ESTIMATE ....
		$scope.cloneEstimate = function(){
			// FIND THE CURRENT COUNT OF ESTIMATES FROM MASTER TABLE...
			$scope.getEstimateCount();
		}

		$scope.getEstimateCount = function(){
			$rootScope.showSpinner();
			var pushData = {};
			pushData.CUSTOMERID = $scope.estimateManagerBO[0].CUSTOMERID;
			estimateManagerServices.getEstimateCount(pushData).then(function(data){
				if(data.msg!=''){
					$scope.estimateManagerCount	=	[];
					$scope.estimateManagerCount 	= 	data;

					// GENERATE A NEW ESTIMATE. IF THE COUNT IS 0 THEN VERSION IS 0, IF COUNT IS 1 THEN VERSION IS 2.
					var totalCount = $scope.estimateManagerCount[0].total;
					if(typeof totalCount == 'undefined' || totalCount === 0){
						$scope.version = "V0";
					}else{
						$scope.version = "V" + totalCount;
					}
					$scope.cloneEstimateMaster($scope.version);
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};

		$scope.cloneEstimateMaster = function(version){
			// AGM-ESTI-R-BI-V0-41720182123;
			var CUSTOMERID = $scope.estimateManagerBO[0].CUSTOMERID;
			var VERSION = version;
			var CUSTOMER_TYPE = $scope.estimateManagerBO[0].TYPE;
			var CUSTOMERNAME = $scope.estimateManagerBO[0].FULLNAME;
			var COMPANY = "AGM";
			var ENTITY = "ESTI";
			var D = new Date();
			var NDATE = D.getMonth()+1 + "" + D.getDate() + "" + D.getFullYear() + "" + D.getHours() + "" + D.getMinutes();
			var ESTIMATEID = COMPANY + "-" + ENTITY + "-" + CUSTOMER_TYPE + "-" + CUSTOMERNAME.substr(0,2).toUpperCase() + "-" + VERSION + "-" + NDATE;

			var pushData = {};
			pushData.ESTIMATEID = ESTIMATEID;
			pushData.CUSTOMERID = CUSTOMERID;
			pushData.MODIFIEDBY = $rootScope.user.USERID;
			pushData.CLONE 		=	true;
			pushData.CLNESTIMATEID 		=	$routeParams.ESTIMATEID;
			pushData.CLNBASKET 			=	$scope.estimateBasketBO;
			console.log("PUSH DATA - CLONE ESTIMATE MASTER ", pushData);

			estimateManagerServices.cloneEstimateMaster(pushData).then(function(status){
				if(status==200){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					$scope.cloneUpdateEstimateMaster(ESTIMATEID,'E'); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...

				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', 'error');
				}
			});
		};

		$scope.cloneUpdateEstimateMaster = function(ESTIMATEID, paramEntity, QUOTEID, CUSTOMERID){
			var pushData = {};
			pushData.CLONE 		=	true;
			pushData.CLNESTIMATEID 		=	$routeParams.ESTIMATEID;
			console.log("PUSH DATA -  EDIT STATUS ", pushData);

			estimateManagerServices.cloneUpdateEstimateMaster(pushData).then(function(status){
				if(status==200){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					
					if(paramEntity === "Q"){
						$scope.cloneQuoteBasket(QUOTEID, CUSTOMERID); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...
					}
					if(paramEntity === "E"){
						$scope.cloneEstimateBasket(ESTIMATEID); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...
					}

				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', 'error');
				}
			});
		}
		$scope.cloneEstimateBasket = function(ESTIMATEID){
			var pushData = {};
			pushData.ESTIMATEID 		= 	ESTIMATEID;
			pushData.MODIFIEDBY 		= 	$rootScope.user.USERID;;
			pushData.CLONEBASKET 		=	$scope.estimateBasketBO;
			console.log("PUSH DATA - CLONE BASKET ", pushData);
			
			estimateManagerServices.cloneEstimateBasket(pushData).then(function(status){
				if(status==200){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					//$scope.cloneEstimateBasket(); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...
					$window.location.href = settings.rootScope.appURL + "#/estimatemanager/estimatebasket/" + pushData.ESTIMATEID + "/cloned";
				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', 'error');
				}
			});
			
		}

		

		// QUOTE MANAGER SECTION. 

		// FIND QUOTE COUNT...

		$scope.generateQuote = function(){
			// FIND THE CURRENT COUNT OF ESTIMATES FROM MASTER TABLE...
			$scope.getQuoteCount();
		}

		$scope.getQuoteCount = function(){
			$rootScope.showSpinner();
			var pushData = {};
			pushData.CUSTOMERID = $scope.estimateManagerBO[0].CUSTOMERID;
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
			// AGM-QUOTE-R-BI-V0-41720182123;

			var QUOTEID = quoteManagerServices.cloneQuoteVersion($scope.estimateManagerBO[0], version);
			
			
			var pushData 				= 	{};
			pushData.QUOTEID 			=	QUOTEID;
			pushData.CUSTOMERID 		= 	$scope.estimateManagerBO[0].CUSTOMERID;
			pushData.MODIFIEDBY 		= 	$rootScope.user.USERID;
			//pushData.CLNESTIMATEID 		=	$routeParams.ESTIMATEID;
			//pushData.CLNBASKET 			=	$scope.estimateBasketBO;
			console.log("PUSH DATA - CLONE QUOTE MASTER ", pushData);

			quoteManagerServices.cloneQuoteMaster(pushData).then(function(status){
				if(status==200){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					$scope.cloneUpdateEstimateMaster($routeParams.ESTIMATEID, 'Q', pushData.QUOTEID,pushData.CUSTOMERID); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...
					//$scope.cloneUpdateEstimateMaster(ESTIMATEID); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...

				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', 'error');
				}
			});
		};

		$scope.cloneQuoteBasket = function(QUOTEID, CUSTOMERID){
			var pushData = {};
			pushData.QUOTEID 			= 	QUOTEID;
			pushData.MODIFIEDBY 		= 	$rootScope.user.USERID;
			pushData.CLONEBASKET 		=	$scope.estimateBasketBO;
			console.log("PUSH DATA - CLONE BASKET ", pushData);
			
			quoteManagerServices.cloneQuoteBasket(pushData).then(function(status){
				if(status==200){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					//$scope.cloneEstimateBasket(); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...
					$scope.updateCustomerEstimateStatus(CUSTOMERID);
					//$window.location.href = settings.rootScope.appURL + "#/quotemanager/" + CUSTOMERID;
				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', 'error');
				}
			});
			
		};

		$scope.updateCustomerEstimateStatus = function(CUSTOMERID){
			var pushData = {};
			pushData.CUSTOMERID 		=	CUSTOMERID;
			console.log("PUSH DATA -  EDIT CUSTOMER ESTIMATE STATUS ", pushData);

			customerManagerServices.updateCustomerEstimateStatus(pushData).then(function(status){
				if(status==200){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					$window.location.href = settings.rootScope.appURL + "#/quotemanager/" + CUSTOMERID;
				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', 'error');
				}
			});
		}

		$scope.refresh	=	function(){
			$scope.getEstimateBasket();
		};

		$scope.fillContent= function(){
			$scope.dataBO.DESCRIPTION = Messages['estimatebasket.description.prefill'];
		};
		
	}

	angular.module('aswa').controller('poBasketController',['$location', '$window', '$routeParams', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'customerManagerServices', 'poManagerServices', 'vendorManagerServices', 'aswaValidationService', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', poBasketController]);
})();
