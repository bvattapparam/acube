(function(){

	function estimateManagerController($location, $window, $scope, $rootScope, $modal, $filter, settings, customerManagerServices, estimateManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.estimateManager 					=	{};
		$scope.customerManager 					=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.showAddBtn						= 	true;
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE
		};


		$scope.getCustomers = function(){
			$rootScope.showSpinner();
			customerManagerServices.getCustomers().then(function(data){
				if(data.msg!=''){
					$scope.customerManagerBO	=	[];
					$scope.customerManagerBO 	= 	data;
					$scope.reference.CUSTOMER 	=	[];

					// CREATE NEW REFERENCE FOR CUSTOMER..
						for(var i=0; i<data.length; i++){
							var node 	=	{};
							node.code 	= 	data[i].CUSTOMERID;
							node.name	=	data[i].CUSTOMERID + " ( " + data[i].FULLNAME + " )";
							$scope.reference.CUSTOMER.push(node);;
						}

					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};

		$scope.getCustomers();

		$scope.getEstimates = function(){
			$rootScope.showSpinner();
			var pushData = {};
			pushData.CUSTOMERID = $scope.dataBO.CUSTOMERID;
			
			estimateManagerServices.getEstimates(pushData).then(function(data){
				if(data.msg!=''){
					$scope.estimateManagerBO	=	[];
					$scope.estimateManagerBO 	= 	data;
					if(data!=''){
						$scope.showAddBtn 		=	false;
					}else{
						$scope.showAddBtn 		=	true;
					}
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		}

		$scope.generatenewest = function(){
			var customerid = $scope.dataBO.CUSTOMERID;

			if(customerid){
				$window.location.href = settings.rootScope.appURL + "#/estimategenerate/" + customerid;
			// 	estimateManagerServices.generateNewEstimate(customerid).then(function(data){
				
			// 	if(data.msg!=''){
			// 		$rootScope.hideSpinner();
			// 		// Redirect to new page
			// 	}else{
			// 		$rootScope.hideSpinner();
			// 		$rootScope.showErrorBox('Error', data.error);
			// 	}
			// });
			}else{
				$rootScope.showErrorBox('Error', Messages['validation.selectcustomer']);
			}

		};

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

	angular.module('aswa').controller('estimateManagerController',['$location', '$window', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'customerManagerServices', 'estimateManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', estimateManagerController]);
})();
