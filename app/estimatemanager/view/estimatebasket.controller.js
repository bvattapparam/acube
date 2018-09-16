(function(){

	function estimateBasketController($location, $window, $routeParams, $scope, $rootScope, $modal, $filter, settings, settingsServices, customerManagerServices, estimateManagerServices, quoteManagerServices, aswaValidationService, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.estimateBasket				=	{};
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
			
		$scope.getEstimateMaster = function(){
			var pushData	=	{};
			pushData.ESTIMATEID = $routeParams.ESTIMATEID;
			estimateManagerServices.getEstimateMaster(pushData).then(function(data){
				if(data.msg!=''){
					$scope.estimateManagerBO	=	[];
					$scope.estimateManagerBO 	= 	data;
					
					if($scope.estimateManagerBO[0].STATUS == 1){
						$scope.softLock	= true;
					}
					if($scope.estimateManagerBO[0].ESTIMATESTATUS == 1){
						$scope.hardLock = true;
					}
					console.log('here', data[0].SORTORDER)
					var location_Sort_Order = data[0].SORTORDER;
					if(location_Sort_Order != null){
						if(location_Sort_Order.length > 0){
							$scope.LOCATIONSORTORDER = location_Sort_Order.split(',');
						}else{
							var default_sorting = settings.rootScope.LOCATIONS;
							$scope.LOCATIONSORTORDER = default_sorting.split(',');
						}
					}else{
						var default_sorting = settings.rootScope.LOCATIONS;
							$scope.LOCATIONSORTORDER = default_sorting.split(',');
					}
					
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
					var sortOrder = [];
					sortOrder = $scope.LOCATIONSORTORDER;
					data.sort(function(a, b) {
						return sortOrder.indexOf(a.LOCATION) - sortOrder.indexOf(b.LOCATION);
						});
					//console.log('SORTED DATA ', data)

					var location_sorted = []
					angular.forEach(data, function(val, key){
						location_sorted.push(val.LOCATION);
					})
					var LOCATIONS_SORTED = utilityServices.removeDuplicates(location_sorted);
					$scope.LOCATIONS_SORTED = [];
					angular.forEach(LOCATIONS_SORTED, function(val, key){
						$scope.LOCATIONS_SORTED.push({'LOCATION': val})
					})
					console.log('SORTED LOCATION ', $scope.LOCATIONS_SORTED)
						
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

					$scope.estimatePDF = {};
					$scope.estimatePDF.dataBO = data;
					$scope.estimatePDF.TOTALAMOUNT = totalamount;
					$scope.estimatePDF.DISCOUNT = $scope.estimateManagerBO[0].DISCOUNT;
					$scope.estimatePDF.TOTALQTY = totalqty;

					// $scope.all = _.groupBy(data, 'LOCATION');
					// console.log('scope all', $scope.all);
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		}


		$scope.save = function (record) {

			console.log("RECORD", record);
			var pushData = {};
			pushData = record;
			pushData.MODIFIEDBY = $rootScope.user.USERID;
			pushData.ESTIMATEID	=	$routeParams.ESTIMATEID;
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
						if(status==200){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message'])
							$scope.getEstimateBasket();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', error);
						}
					})
				}
			}// check error close here
		};
		
		$scope.isDiscount = function(discount){
			if(typeof discount == 'undefined' || discount == ''){
				return false;
			}
			return true;
		};
		$scope.netAmount = function(discount, total){
			var netamount = total - discount;
			return netamount;
		}
		$scope.saveDiscount = function (discount) {
			var pushData = {};
			//pushData = discount;
			pushData.MODIFIEDBY = $rootScope.user.USERID;
			pushData.ESTIMATEID	=	$routeParams.ESTIMATEID;
			pushData.DISCOUNT 	=	discount;
			$rootScope.showSpinner();
			estimateManagerServices.updateEstimateDiscount(pushData).then(function(data){
				if(data.msg != ''){
					$rootScope.hideSpinner();
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
					$scope.getEstimateMaster();
					$scope.dataBO.DISCOUNT = '';
				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', data.error);
				}
			})
		};

		$scope.getPrecontent = function(){
			$rootScope.showSpinner();
			settingsServices.getPrecontent().then(function(data){
				if(data.msg!=''){
					$scope.contentListBO			=	[];
					$scope.contentListBO			=	data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};
		$scope.getPrecontent();

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
		};

		$scope.generatePDF = function (data) {
			var config= {};
				config.templateUrl = '../app/estimatemanager/generate/generatepdf.html';
				config.controller = 'generateESTPDFController';
				config.size		= 'md';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['pdf.generatepdf.estimate'];
				config.passingValues.dataBO = data;
				config.passingValues.PDFBO = $scope.estimatePDF;
				config.passingValues.estMaster = $scope.estimateManagerBO;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						//$scope.getEstimateBasket();
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

		$scope.addDesc = function () {
			var config= {};
				config.templateUrl = '../app/estimatemanager/edit/PREFILL.html';
				config.controller = 'estimateBasketEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['settings.prefill'];
				config.passingValues.dataBO = $scope.contentListBO;
				config.callback = function(status, item){
					console.log('items ', item)
					$scope.dataBO.DESCRIPTION = item;
					if(status === 'success') {
						//$scope.getEstimateBasket();
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
			var ESTIMATEID = COMPANY + "-" + ENTITY + "-" + CUSTOMER_TYPE + "-" + CUSTOMERNAME.substr(0,3).toUpperCase() + "-" + VERSION + "-" + NDATE;

			var pushData = {};
			pushData.ESTIMATEID = ESTIMATEID;
			pushData.CUSTOMERID = CUSTOMERID;
			pushData.MODIFIEDBY = $rootScope.user.USERID;
			pushData.CLONE 		=	true;
			pushData.CLNESTIMATEID 		=	$routeParams.ESTIMATEID;
			pushData.CLNBASKET 			=	$scope.estimateBasketBO;
			pushData.DISCOUNT 			=	$scope.estimateManagerBO[0].DISCOUNT;
			pushData.SORTORDER 			=	$scope.estimateManagerBO[0].SORTORDER;
			console.log("PUSH DATA - CLONE ESTIMATE MASTER ", pushData);

			estimateManagerServices.cloneEstimateMaster(pushData).then(function(data){
				if(data.msg != ''){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					$scope.cloneUpdateEstimateMaster(ESTIMATEID,'E'); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...

				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', data.error);
				}
			});
		};

		$scope.cloneUpdateEstimateMaster = function(ESTIMATEID, paramEntity, QUOTEID, CUSTOMERID){
			var pushData = {};
			pushData.CLONE 		=	true;
			pushData.CLNESTIMATEID 		=	$routeParams.ESTIMATEID;
			//console.log("PUSH DATA -  EDIT STATUS ", pushData);

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
			//console.log("PUSH DATA - CLONE BASKET ", pushData);
			
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
			// AGM-QUOTE-R-BIJ-V0-41720182123;
			var QUOTEID = quoteManagerServices.cloneQuoteVersion($scope.estimateManagerBO[0], version);
			var pushData 				= 	{};
			pushData.QUOTEID 			=	QUOTEID;
			pushData.CUSTOMERID 		= 	$scope.estimateManagerBO[0].CUSTOMERID;
			pushData.MODIFIEDBY 		= 	$rootScope.user.USERID;
			pushData.DISCOUNT 			=	$scope.estimateManagerBO[0].DISCOUNT;
			pushData.SORTORDER 			=	$scope.estimateManagerBO[0].SORTORDER;
			console.log("PUSH DATA - CLONE QUOTE MASTER ", pushData);
			quoteManagerServices.cloneQuoteMaster(pushData).then(function(data){
				if(data.msg!=''){
					$rootScope.hideSpinner();
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					$scope.cloneUpdateEstimateMaster($routeParams.ESTIMATEID, 'Q', pushData.QUOTEID,pushData.CUSTOMERID); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...
					//$scope.cloneUpdateEstimateMaster(ESTIMATEID); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...

				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', data.error);
				}
			});
		};

		$scope.cloneQuoteBasket = function(QUOTEID, CUSTOMERID){
			var pushData = {};
			pushData.QUOTEID 			= 	QUOTEID;
			pushData.MODIFIEDBY 		= 	$rootScope.user.USERID;
			pushData.CLONEBASKET 		=	$scope.estimateBasketBO;
			//console.log("PUSH DATA - CLONE BASKET ", pushData);
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
			//console.log("PUSH DATA -  EDIT CUSTOMER ESTIMATE STATUS ", pushData);

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

		$scope.sortOrder = function () {
			var config= {};
				config.templateUrl = '../app/estimatemanager/edit/sortorder.html';
				config.controller = 'estimateSortOrderController';
				config.size		= 'md';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['settings.sortorder'];
				config.passingValues.dataBO = $scope.estimateManagerBO;
				config.callback = function(status, item){
					console.log('items ', item)
					$scope.dataBO.DESCRIPTION = item;
					if(status === 'success') {
						$scope.getEstimateMaster();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};
		
	}

	angular.module('aswa').controller('estimateBasketController',['$location', '$window', '$routeParams', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'settingsServices', 'customerManagerServices', 'estimateManagerServices', 'quoteManagerServices', 'aswaValidationService', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', estimateBasketController]);
})();
