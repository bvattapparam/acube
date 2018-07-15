(function(){

	function vendorManagerController($scope, $rootScope, $modal, $filter, vendorManagerServices, utilityServices, storageServices, getreferences,$http, settings, mainServices){

		$scope.vendorManager 					=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERSTATUS" 	: getreferences.referencesData.CUSTOMERSTATUS
		};


		$scope.getVendors = function(){
			$rootScope.showSpinner();
			vendorManagerServices.getVendors().then(function(data){
				if(data.msg!=''){
					$scope.vendorManagerBO	=	[];
					$scope.vendorManagerBO 	= 	data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};

		$scope.getVendors();

		$scope.editVendor = function (data) {
			console.log("yes", data);
			var config= {};
				config.templateUrl = '../app/vendormanager/edit/vendormanager.html';
				config.controller = 'vendorManagerEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['vendormanager.edit'];
				config.passingValues.dataBO = data;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getVendors();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		$scope.addVendor = function () {
			var config= {};
				config.templateUrl = '../app/vendormanager/edit/vendormanager.html';
				config.controller = 'vendorManagerEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['vendormanager.add'];
				//config.passingValues.dataBO = data;
				config.passingValues.isEdit = false;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getVendors();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		

		$scope.refresh	=	function(){
			$scope.getCustomers();
		};

		


	}

	angular.module('aswa').controller('vendorManagerController',['$scope', '$rootScope', '$modal', '$filter', 'vendorManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'settings', 'mainServices', vendorManagerController]);
})();
