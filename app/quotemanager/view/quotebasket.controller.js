(function(){

	function quoteBasketController($location, $window, $routeParams, $scope, $rootScope, $modal, $filter, settings, customerManagerServices, quoteManagerServices, aswaValidationService, utilityServices, storageServices, settingsServices, getreferences,$http, mainServices){

		$scope.quoteBasket				=	{};
		$scope.dataBO = {};
		$scope.customerManager 					=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.showAddBtn						= 	true;
		$scope.softLock							= 	false;
		$scope.hardLock							= 	false;
		$scope.cloned 							= 	false;
		$scope.allowEdit						=	false;
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
					if($scope.quoteManagerBO[0].QUOTEAPPROVED == 1){
						$scope.hardLock	= true;
					}
					if($scope.quoteManagerBO[0].STATUS == 1 && $scope.quoteManagerBO[0].QUOTEAPPROVED == 1 && $scope.quoteManagerBO[0].APPROVED == 1){
						$scope.allowEdit = false;
					} else if ($scope.quoteManagerBO[0].STATUS == 1 &&  $scope.quoteManagerBO[0].APPROVED == 0){
						$scope.allowEdit = true;
					}

					console.log('quot here', data[0].SORTORDER)
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

					var sortOrder = [];
					sortOrder = $scope.LOCATIONSORTORDER;
					data.sort(function(a, b) {
						return sortOrder.indexOf(a.LOCATION) - sortOrder.indexOf(b.LOCATION);
						});
					console.log('SORTED DATA ', data)

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
					$scope.quotePDF = {};
					$scope.quotePDF.dataBO = data;
					$scope.quotePDF.TOTALAMOUNT = totalamount;
					$scope.quotePDF.TOTALQTY = totalqty;
					$scope.quotePDF.DISCOUNT = $scope.quoteManagerBO[0].DISCOUNT;

					if($scope.quoteManagerBO[0].DISCOUNT){
						var netamount = totalamount - $scope.quotePDF.DISCOUNT;
						$scope.quotePDF.NETAMOUNT = netamount;
					}
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};

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
					quoteManagerServices.addQuoteBasketData(record).then(function(data){
						if(data.msg!=''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message'])
							$scope.dataBO.DESCRIPTION = '';
							$scope.dataBO.LOCATION = '';
							$scope.dataBO.QTY = '';
							$scope.dataBO.UNIT = '';
							$scope.dataBO.PERCOST = '';
							$scope.dataBO.AMOUNT = '';
							$scope.getQuoteBasket();
							
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', data.error);
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
		};

		$scope.generatePDF = function (data) {
			var config= {};
				config.templateUrl = '../app/quotemanager/generate/generatepdf.html';
				config.controller = 'generateQTPDFController';
				config.size		= 'md';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['pdf.generatepdf.quote'];
				config.passingValues.dataBO = data;
				config.passingValues.PDFBO = $scope.quotePDF;
				config.passingValues.quoteMaster = $scope.quoteManagerBO;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
					//	$scope.getEstimateBasket();
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
			pushData.DISCOUNT 			=	$scope.quoteManagerBO[0].DISCOUNT;
			pushData.SORTORDER 			=	$scope.quoteManagerBO[0].SORTORDER;
			//console.log("PUSH DATA - CLONE QUOTE MASTER ", pushData);
			quoteManagerServices.cloneQuoteMaster(pushData).then(function(data){
				if(data.msg!=''){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					$scope.cloneUpdateQuoteMaster(pushData.QUOTEID); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...
					//$scope.cloneUpdateEstimateMaster(ESTIMATEID); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...

				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', data.error);
				}
			});
		};

		$scope.cloneUpdateQuoteMaster = function(QUOTEID){
			var pushData = {};
			pushData.CLNQUOTEID 		=	$routeParams.QUOTEID;
			//console.log("PUSH DATA -  EDIT STATUS ", pushData);

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
			$rootScope.showSpinner();
			//console.log("APPROVED ", QUOTEID);
			var pushData = {};
			pushData.QUOTEID 		=	$routeParams.QUOTEID;
			pushData.MODIFIEDBY		=	$rootScope.user.USERID;
			pushData.CUSTOMERID		=	$scope.quoteManagerBO[0].CUSTOMERID;
			quoteManagerServices.approveQuoteMaster(pushData).then(function(data){
				if(data.msg!=''){
					$rootScope.hideSpinner();
					//console.log("Success", data.msg)
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					$scope.getQuoteMaster(); // UPDATE STATUS HERE FOR THE OLD ESTIMATE...
				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', data.error);
				}
			});
		};
		$scope.addDesc = function () {
			var config= {};
				config.templateUrl = '../app/estimatemanager/edit/prefill.html';
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

		$scope.cloneQuoteBasket = function(QUOTEID){
			var pushData = {};
			pushData.QUOTEID 			= 	QUOTEID;
			pushData.MODIFIEDBY 		= 	$rootScope.user.USERID;
			pushData.CLONEBASKET 		=	$scope.quoteBasketBO;
			//console.log("PUSH DATA - CLONE BASKET ", pushData);
			
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
			pushData.QUOTEID	=	$routeParams.QUOTEID;
			pushData.DISCOUNT 	=	discount;
			$rootScope.showSpinner();
			quoteManagerServices.updateQuoteDiscount(pushData).then(function(data){
				if(data.msg != ''){
					$rootScope.hideSpinner();
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
					$scope.getQuoteMaster();
					$scope.dataBO.DISCOUNT = '';
				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', data.error);
				}
			})
		};

		
		$scope.sortOrder = function () {
			var config= {};
				config.templateUrl = '../app/quotemanager/edit/sortorder.html';
				config.controller = 'quoteSortOrderController';
				config.size		= 'md';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['settings.sortorder'];
				config.passingValues.dataBO = $scope.quoteManagerBO;
				config.callback = function(status, item){
					console.log('items ', item)
					$scope.dataBO.DESCRIPTION = item;
					if(status === 'success') {
						$scope.getQuoteMaster();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		$scope.refresh	=	function(){
			$scope.getQuoteBasket();
		};

		$scope.fillContent= function(){
			$scope.dataBO.DESCRIPTION = Messages['estimatebasket.description.prefill'];
		};
		
	}

	angular.module('aswa').controller('quoteBasketController',['$location', '$window', '$routeParams', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'customerManagerServices', 'quoteManagerServices','aswaValidationService', 'utilityServices', 'storageServices', 'settingsServices', 'getreferences', '$http', 'mainServices', quoteBasketController]);
})();
