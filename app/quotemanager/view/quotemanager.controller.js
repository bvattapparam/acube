(function(){

	function quoteManagerController($location, $routeParams, $window, $scope, $rootScope, $modal, $filter, settings, customerManagerServices, quoteManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.quoteManager 					=	{};
		$scope.quoteManagerBO					=	[];
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
				if(data.msg!=''){
					$scope.customerManagerBO	=	[];
					$scope.customerManagerBO 	= 	data;
					//$scope.getEstimateCount();
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		
		$scope.quoteBasket = function(record){
			var quoteid = record.QUOTEID;
			$window.location.href = settings.rootScope.appURL + "#/quotemanager/quotebasket/" + quoteid;
		}
		
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
