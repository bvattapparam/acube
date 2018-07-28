(function(){

	function paymentManagerController($location, $routeParams, $window, $scope, $rootScope, $modal, $filter, settings, paymentManagerServices, userManagerServices, customerManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.quoteManager 					=	{};
		$scope.quoteManagerBO	=	[];

		$scope.customerManager 					=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.showAddBtn						= 	true;
		$scope.dataBO = {};

		$scope.reference.CUSTOMER 		=	[];
		$scope.reference.CUSTOMERREF 	=	[];
		$scope.reference.USER	 		=	[];
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE
		};

		// Pagination section is here.
		$scope.pagination_payment = {
			currentPage : 1,
	 		limit: 50,
	 		maxSize : 5
		};
		$scope.pageChanged_payment = function() {
	    	$scope.getPayment();
		};
		$scope.getPayment = function(){
			$rootScope.showSpinner();
			var pushdata = {};
			pushdata.limit 				= 	$scope.pagination_payment.limit;
			pushdata.currentPage		=	$scope.pagination_payment.currentPage;
			pushdata.pagenation			=	true;
			paymentManagerServices.getPayment(pushdata).then(function(data){
				if(data.msg!=''){
					$scope.paymentManagerBO	=	[];
					$scope.paymentManagerBO = data[0].ITEM;
					$scope.TOTALITEMS = data[1].TOTAL.TOTAL;
					$scope.PRTOTALAMOUNT = data[2].PRTOTALAMOUNT[0].PRAMOUNT;
					$scope.OPEXPTOTALAMOUNT = data[3].OPEXPTOTALAMOUNT[0].OPEXPAMOUNT;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getPayment();
		
		$scope.getCustomers = function(){
			var pushdata 		= 	{};
			pushdata.pagenation		=	false;
			$rootScope.showSpinner();
			customerManagerServices.getCustomers(pushdata).then(function(data){
				if(data.msg!=''){

					$scope.customerManagerBO	=	[];
					angular.forEach(data, function(item,key){
						angular.forEach($rootScope.settings.SHOW_PO_CUSTOMER_STATUS, function(citem,ckey){
							if(item.STATUS == citem){
								$scope.customerManagerBO.push(item)
							}
						});
					});
					// CREATE NEW REFERENCE FOR CUSTOMER..
					for(var i=0; i<$scope.customerManagerBO.length; i++){
						var node 	=	{};
						var node_ref 	=	{};
						node.code 	= 	$scope.customerManagerBO[i].CUSTOMERID;
						node.name	=	$scope.customerManagerBO[i].CUSTOMERID + " ( " + $scope.customerManagerBO[i].FULLNAME + " )";

						node_ref.code 	= 	$scope.customerManagerBO[i].CUSTOMERID;
						node_ref.name	=	 $scope.customerManagerBO[i].FULLNAME;
						
						$scope.reference.CUSTOMER.push(node);
						$scope.reference.CUSTOMERREF.push(node_ref);
					}
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getCustomers();

		$scope.getUsers = function(){
			$rootScope.showSpinner();
			userManagerServices.getUsers().then(function(data){
				if(data.msg!=''){
					$scope.userManagerBO	=	[];
					$scope.userManagerBO 	= 	data;

					// CREATE NEW REFERENCE FOR CUSTOMER..
					for(var i=0; i<data.length; i++){
						var node 	=	{};
						node.code 	= 	data[i].USERID;
						node.name	=	data[i].USERID + " ( " + data[i].FULLNAME + " )";
						$scope.reference.USER.push(node);
					}
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getUsers();

		$scope.editPay = function (data) {
			var config= {};
				config.templateUrl 					= '../app/paymentmanager/edit/paymentmanager.html';
				config.controller 					= 'paymentManagerEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['paymentmanager.edit'];
				config.passingValues.dataBO = data;
				config.passingValues.isEdit = true;
				config.passingValues.userBO 		= $scope.reference.USER;
				config.passingValues.customerBO 	= $scope.reference.CUSTOMER;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getPayment();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		$scope.newPay = function () {
			var config								= {};
				config.templateUrl 					= '../app/paymentmanager/edit/paymentmanager.html';
				config.controller 					= 'paymentManagerEditController';
				config.size							= 'lg';
				config.backdrop						= 'static';
				config.passingValues 				= {};
				config.passingValues.title 			= Messages['paymentmanager.newpay'];
				config.passingValues.userBO 		= $scope.reference.USER;
				config.passingValues.customerBO 	= $scope.reference.CUSTOMER;
				config.passingValues.isEdit 		= false;
				config.callback 					= function(status, item){
					if(status === 'success') {
						$scope.getPayment();
					}
				}
			utilityServices.openConfigModal($modal, config);
		};

		
		$scope.lockIcon = function(status,approved){
			var iconClass;
			$scope.tooltipContent = "";
			if(status == 1 && approved == 0){
				iconClass =  "fa-lock green-lock";
				$scope.tooltipContent = "";
				$scope.tooltipContent = Messages['label.softlock'];
			}else if(status == 1 && approved == 1){
				iconClass = "fa-thumbs-up approved-icon";
				$scope.tooltipContent = "";
				$scope.tooltipContent = Messages['label.approved'];
			}
			return iconClass;
		};

		$scope.refresh	=	function(){
			$scope.getPayment();
		};

		


	}

	angular.module('aswa').controller('paymentManagerController',['$location', '$routeParams', '$window', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'paymentManagerServices', 'userManagerServices', 'customerManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', paymentManagerController]);
})();
