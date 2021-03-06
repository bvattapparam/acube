(function(){

	function marketingBasketController($scope, $rootScope, $modal, $filter, marketingBasketServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.dataBO 						=	{};
		$scope.reference						=	{};
		$scope.reference.referenceBO		= 	getreferences.references;
		$scope.referenceData					=	{};
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERSTATUS" 	: getreferences.referencesData.CUSTOMERSTATUS,
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE
		};

		// Pagination section is here.
		$scope.pagination_payment = {
			currentPage : 1,
	 		limit: 100,
	 		maxSize : 5
		};
		$scope.pageChanged_payment = function() {
	    	$scope.getCustomers();
		};

		$scope.getCustomers = function(){
			var pushdata				=	{};
			pushdata.limit				=	$scope.pagination_payment.limit;
			pushdata.currentPage		=	$scope.pagination_payment.currentPage;
			pushdata.filterstatus		=	false;
			pushdata.pagenation			=	true;
			$rootScope.showSpinner();
			marketingBasketServices.getCustomers(pushdata).then(function(data){
				if(data.msg!=''){
					$scope.dataBO				=	[];
					$scope.dataBO 				= 	data[0].ITEM;
					$scope.TOTALITEMS 			= 	data[1].TOTAL.TOTAL;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};

		$scope.getCustomers();

		$scope.editCustomer = function (data) {
			var config= {};
				config.templateUrl = '../app/marketingbasket/edit/marketingbasket.html';
				config.controller = 'marketingBasketEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['marketingbasket.edit'];
				config.passingValues.dataBO = data;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getCustomers();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		$scope.addCustomer = function () {
			var config= {};
				config.templateUrl = '../app/marketingbasket/edit/marketingbasket.html';
				config.controller = 'marketingBasketEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['marketingbasket.add'];
				config.passingValues.isEdit = false;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getCustomers();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		$scope.refresh	=	function(){
			$scope.getCustomers();
		};

	}

	angular.module('aswa').controller('marketingBasketController',['$scope', '$rootScope', '$modal', '$filter', 'marketingBasketServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', marketingBasketController]);
})();
