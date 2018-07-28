(function(){

	function quoteManagerController($location, $routeParams, $window, $scope, $rootScope, $modal, $filter, settings, customerManagerServices, quoteManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.quoteManager 					=	{};
		$scope.quoteManagerBO	=	[];

		$scope.customerManager 					=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.showAddBtn						= 	true;
		$scope.dataBO = {};

		$scope.reference.CUSTOMER 	=	[];
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE
		};
		$scope.getTooltipText = function(approved,status){
			 if(approved === "1" && status === "1"){
				 $scope.tooltip = Messages['label.approved'];
			}
			  if(approved === "0" && status === "1"){
				 $scope.tooltip = "";
			  }
			
		 }  
		
		$scope.getCustomers = function(){
			$rootScope.showSpinner();
			var pushdata				=	{};
			pushdata.statusfilters		=	$rootScope.settings.SHOW_CUSTOMER_STATUS;
			pushdata.filterstatus		=	true;
			pushdata.pagenation			=	false;
			customerManagerServices.getCustomers(pushdata).then(function(data){
				if(data.msg!=''){
					
					$scope.customerManagerBO	=	[];
					$scope.customerManagerBO	=	data[0].ITEM;
					// CREATE NEW REFERENCE FOR CUSTOMER..
						for(var i = 0; i < $scope.customerManagerBO.length; i++){
							var node 	=	{};
							node.code 	= 	$scope.customerManagerBO[i].CUSTOMERID;
							node.name	=	$scope.customerManagerBO[i].CUSTOMERID + " ( " + $scope.customerManagerBO[i].FULLNAME + " )";
							$scope.reference.CUSTOMER.push(node);
						}

					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getCustomers();

		$scope.getQuotes = function(param){
			$rootScope.showSpinner();
			var pushData = {};
			if(typeof param != 'undefined'){
				pushData.CUSTOMERID = $scope.dataBO.CUSTOMERID;
			}else{
				if($routeParams.CUSTOMERID){
					pushData.CUSTOMERID = $routeParams.CUSTOMERID;
					$scope.dataBO.CUSTOMERID = $routeParams.CUSTOMERID;
				}else{
					pushData.CUSTOMERID = $scope.dataBO.CUSTOMERID;
				}
			}
			quoteManagerServices.getQuotes(pushData).then(function(data){
				if(data.msg!=''){
					$scope.quoteManagerBO 	= 	data;
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
		};
		
		if($routeParams.CUSTOMERID){
			$scope.getQuotes();
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
			console.log("pdata ", pushData)

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
			console.log("customerid", customerid)
			if(customerid){
				// GET CUSTOMER DETAILS
				$scope.getCustomer(customerid);
				//$window.location.href = settings.rootScope.appURL + "#/estimategenerate/" + customerid;
			
			}else{
				$rootScope.showErrorBox('Error', Messages['validation.selectcustomer']);
			}

		};
		$scope.quoteBasket = function(record){
			var quoteid = record.QUOTEID;
			$window.location.href = settings.rootScope.appURL + "#/quotemanager/quotebasket/" + quoteid;

		}

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

		
		$scope.lockIcon = function(status,quoteapproved, approved){
			var iconClass;
			$scope.tooltipContent = "";
			if(status == 1 && quoteapproved == 0){
				iconClass =  "fa-lock green-lock";
				$scope.tooltipContent = "";
				$scope.tooltipContent = Messages['label.softlock'];
			}else if(status == 1 && quoteapproved == 1){
				iconClass = "fa-thumbs-up approved-icon";
				$scope.tooltipContent = "";
				$scope.tooltipContent = "approved"
				if(approved == 1){
					iconClass = "fa-thumbs-up approved-icon";
				}else{
					iconClass = "fa-lock red-lock";
				}
				$scope.tooltipContent = "";
				$scope.tooltipContent = Messages['label.approved'];
			}
			return iconClass;
		};

		$scope.refresh	=	function(){
			$scope.getCustomers();
			$scope.getQuotes();
		};

	}

	angular.module('aswa').controller('quoteManagerController',['$location', '$routeParams', '$window', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'customerManagerServices', 'quoteManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', quoteManagerController]);
})();
