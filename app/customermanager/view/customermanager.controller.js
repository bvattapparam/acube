(function(){

	function customerManagerController($scope, $rootScope, $modal, $filter, customerManagerServices, utilityServices, storageServices, getreferences,$http, settings, mainServices){

		$scope.customerManager 						=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE,
			"GENERICSTATUS" 	: getreferences.referencesData.GENERICSTATUS
		};


		$scope.getCustomers = function(){
			$rootScope.showSpinner();
			customerManagerServices.getCustomers().then(function(data){
				if(data.msg!=''){

					$scope.customerManagerBO	=	[];
					
					angular.forEach(data, function(item,key){
						if(item.STATUS != settings.rootScope.NOCUSTOMERMANAGERSTATUS){
							$scope.customerManagerBO.push(item)
						}
					});
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};

		$scope.getCustomers();

		$scope.editUser = function (data) {
			console.log("yes", data);
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

		$scope.addUser = function () {
			var config= {};
				config.templateUrl = '../app/customermanager/edit/customermanager.html';
				config.controller = 'customerManagerEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['customermanager.add'];
				//config.passingValues.dataBO = data;
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

	angular.module('aswa').controller('customerManagerController',['$scope', '$rootScope', '$modal', '$filter', 'customerManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'settings', 'mainServices', customerManagerController]);
})();
