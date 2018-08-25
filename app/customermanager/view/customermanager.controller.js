(function(){

	function customerManagerController($scope, $rootScope, $modal, $filter, customerManagerServices, utilityServices, storageServices, getreferences,$http, settings, mainServices){

		$scope.customerManager 						=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE,
			"CUSTOMERSTATUS" 	: getreferences.referencesData.CUSTOMERSTATUS
		};
		// Pagination section is here.
		$scope.pagination_payment = {
			currentPage : 1,
	 		limit: 50,
	 		maxSize : 5
		};
		$scope.pageChanged_payment = function() {
	    	$scope.getCustomers();
		};

		$scope.getCustomers = function(){
			var pushdata				=	{};
			pushdata.limit				=	$scope.pagination_payment.limit;
			pushdata.currentPage		=	$scope.pagination_payment.currentPage;
			pushdata.statusfilters		=	$rootScope.settings.SHOW_CUSTOMER_STATUS;
			pushdata.filterstatus		=	true;
			pushdata.pagenation			=	true;
			//statusfilters,limit, currentpage, filterstatus
			$rootScope.showSpinner();
			customerManagerServices.getCustomers(pushdata).then(function(data){
				if(data.msg!=''){
					$scope.customerManagerBO	=	[];
					$scope.TOTALITEMS 			= 	data[1].TOTAL.TOTAL;
					$scope.customerManagerBO	=	data[0].ITEM;
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
				config.templateUrl = '../app/customermanager/edit/customermanager.html';
				config.controller = 'customerManagerEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['customermanager.edit'];
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
				config.templateUrl = '../app/customermanager/edit/customermanager.html';
				config.controller = 'customerManagerEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['customermanager.add'];
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
		
		$scope.showView = function(status) {
			if(status == settings.rootScope.STATUS_ACTIVE || status == settings.rootScope.STATUS_CONFIRMED){
				return true;
			}
			return false;
		}

	}

	angular.module('aswa').controller('customerManagerController',['$scope', '$rootScope', '$modal', '$filter', 'customerManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'settings', 'mainServices', customerManagerController]);
})();
