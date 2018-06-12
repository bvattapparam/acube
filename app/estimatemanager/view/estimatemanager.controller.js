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

		$scope.getCustomer = function(customerid){
			$rootScope.showSpinner();
			customerManagerServices.getCustomer(customerid).then(function(data){
				console.log(2)
				if(data.msg!=''){
					$scope.customerManagerBO	=	[];
					$scope.customerManagerBO 	= 	data;
					$scope.getEstimateCount();
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};

		$scope.getEstimateCount = function(){
			$rootScope.showSpinner();
			var pushData = {};
			pushData.CUSTOMERID = $scope.dataBO.CUSTOMERID;
			estimateManagerServices.getEstimateCount(pushData).then(function(data){
				if(data.msg!=''){
					$scope.estimateManagerBO	=	[];
					$scope.estimateManagerBO 	= 	data;

					// GENERATE A NEW ESTIMATE. IF THE COUNT IS 0 THEN VERSION IS 0, IF COUNT IS 1 THEN VERSION IS 2.
					var totalCount = $scope.estimateManagerBO[0].total;
					if(typeof totalCount == 'undefined' || totalCount === 0){
						$scope.version = "V0";
					}else{
						$scope.version = "V" + totalCount;
					}
					$scope.generateEstimate($scope.version);
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};
		$scope.generateEstimate = function(version){
			// AGM-ESTI-R-BI-V0-41720182123;
			var CUSTOMERID = $scope.dataBO.CUSTOMERID;
			var VERSION = version;
			var CUSTOMER_TYPE = $scope.customerManagerBO[0].TYPE;
			var CUSTOMERNAME = $scope.customerManagerBO[0].FULLNAME;
			var COMPANY = "AGM";
			var ENTITY = "ESTI";
			var D = new Date();
			var NDATE = D.getMonth()+1 + "" + D.getDate() + "" + D.getFullYear() + "" + D.getHours() + "" + D.getMinutes();
			var ESTIMATEID = COMPANY + "-" + ENTITY + "-" + CUSTOMER_TYPE + "-" + CUSTOMERNAME.substr(0,2).toUpperCase() + "-" + VERSION + "-" + NDATE;

			var pushData = {};
			pushData.ESTIMATEID = ESTIMATEID;
			pushData.CUSTOMERID = CUSTOMERID;
			pushData.MODIFIEDBY = $rootScope.user.USERID;

			estimateManagerServices.generateEstimate(pushData).then(function(status){
				if(status==200){
					$rootScope.hideSpinner();
					
					$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
					$scope.getEstimates();
				}else {
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('error', 'error');
				}
			});
		};

		$scope.generatenewest = function(){
			var customerid = $scope.dataBO.CUSTOMERID;
			if(customerid){
				// GET CUSTOMER DETAILS
				$scope.getCustomer(customerid);
				//$window.location.href = settings.rootScope.appURL + "#/estimategenerate/" + customerid;
			
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
