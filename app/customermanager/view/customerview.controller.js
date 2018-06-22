(function(){

	function customerViewController($scope, $rootScope, $modal, $filter, customerManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.customerManager 						=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE
		};

		$scope.oneAtATime = true;

		$scope.groups = [
		  {
			title: 'Dynamic Group Header - 1',
			content: 'Dynamic Group Body - 1'
		  },
		  {
			title: 'Dynamic Group Header - 2',
			content: 'Dynamic Group Body - 2'
		  }
		];
	  
		$scope.items = ['Item 1', 'Item 2', 'Item 3'];
	  
		$scope.addItem = function() {
		  var newItemNo = $scope.items.length + 1;
		  $scope.items.push('Item ' + newItemNo);
		};
	  
		$scope.status = {
		  isFirstOpen: true,
		  isFirstDisabled: false
		};



		$scope.getCustomers = function(){
			$rootScope.showSpinner();
			customerManagerServices.getCustomers().then(function(data){
				if(data.msg!=''){
					$scope.customerManagerBO	=	[];
					$scope.customerManagerBO 	= 	data;
					console.log("date", data)
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

	angular.module('aswa').controller('customerViewController',['$scope', '$rootScope', '$modal', '$filter', 'customerManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', customerViewController]);
})();
