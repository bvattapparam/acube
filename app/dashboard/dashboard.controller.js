(function(){

	function dashboardController($scope, $rootScope, $filter, utilityServices, $modal, mainServices, dashboardServices, customerManagerServices, paymentManagerServices, marketingBasketServices, userManagerServices, getreferences, storageServices){
		
		$scope.LIMIT_PAYMENT 			= 	80;
		$scope.sval						=	5;
		$scope.refData					=	{};
		$scope.spinnerShow_Payment		=	false;
		$scope.spinnerShow_StatusCount		=	false;
		$scope.spinner_top10Customers			=	false;
		$scope.refData.referencesDataMap = {
			"CUSTOMERSTATUS" 	: getreferences.referencesData.CUSTOMERSTATUS,
			"POTYPE" 	: getreferences.referencesData.POTYPE
		};

        $scope.reference					=	{};
		$scope.reference.referenceBO		= 	getreferences.references;
		
		// Pagination section is here.
		$scope.pagination_payment = {
			currentPage : 1,
	 		limit: 50,
	 		maxSize : 5
		};
		$scope.pageChanged_payment = function() {
	    	$scope.getPaymentByUser();
		};
 	
        $scope.getCustomerStatusCount = function(){
			$scope.spinnerShow_StatusCount = true
			customerManagerServices.getStatusCount().then(function(data){
				if(data.msg!=''){
					$scope.customerStatusBO = [];
                    $scope.customerStatusBO = data;
                    $scope.chart = [];
                    $scope.chartValue(data);
					$scope.spinnerShow_StatusCount = false;
				}else{
					$scope.spinnerShow_StatusCount = false;
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
        };
		
		//	MARKETING BASKET / TOP 10 CUSTOMERS.
		$scope.getCustomers = function(){
			var pushdata 		= 	{};
			pushdata.pagenation		=	false;
			//$rootScope.showSpinner();
			$scope.spinner_top10Customers = true;
			marketingBasketServices.getCustomers(pushdata).then(function(data){
				if(data.msg!=''){
					$scope.customerManagerBO	=	[];
					$scope.customerManagerBO 	= 	data[0].ITEM;
					//$rootScope.hideSpinner();
					$scope.spinner_top10Customers = false;
				}else{
					//$rootScope.hideSpinner();
					$scope.spinner_top10Customers = false;
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
           
        $scope.chartValue = function(data){
            angular.forEach(data, function(val, key){
                var node 	=	{};
                node.name = $scope.refData.referencesDataMap.CUSTOMERSTATUS[val.STATUS];
                node.y = val.VALUE;
                $scope.chart.push(node);
            });
            $scope.options.series[0].data = $scope.chart;
			var chart = new Highcharts.Chart($scope.options);
        };

        $scope.options = {
            chart: {
                renderTo: 'container',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
				//pointFormat: '<b>{point.y:.1f}</b>'
				formatter: function(){
					return '<div>'+ this.y + '</div>';
				}
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled:false
                    },
                    showInLegend: true
                }
            },
            series: [{
            }]
        };
		
		// PAYMENT DETAILS FOR SUPERVISOR AND ADMIN...
		$scope.getPayment = function(){
			//$rootScope.showSpinner();
			$scope.spinnerShow_Payment = true;
			var pushdata 			=	{}
			pushdata.pagenation		=	false;
			paymentManagerServices.getPayment(pushdata).then(function(data){
				if(data.msg!=''){
					$scope.paymentManagerBO	=	[];
					$scope.paymentManagerBO	= data[0].ITEM;
					//$scope.adminPaymentBO = data;
					if($scope.paymentManagerBO !== null){
						$scope.paymentManagerBO	= $scope.paymentManagerBO.slice(0,10);
					}
					var totalamount = 0;
					$scope.spinnerShow_Payment = false;
				}else{
					//$rootScope.hideSpinner();
					$scope.spinnerShow_Payment = false;
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		

		// FOR JURI_SUPERVISOR...
		$scope.getCashDetails =  function(userid){
			var pushData 			= {};
			if(userid){
				pushData.USERID 				= 	userid;
			}else{
				pushData.USERID 				= 	$rootScope.user.USERID;
			}
			$rootScope.showSpinner();
			paymentManagerServices.getCashDetails(pushData).then(function(data){
				if(data.msg!=''){
					$scope.dataBO	=	[];
					$scope.dataBO 	= 	data;
					$scope.prEXP 	= 	[];
					$scope.opEXP	=	[];
					angular.forEach(data, function(val, key){
						if(val.POTYPE === 'PREXP'){
							$scope.prEXP.push(val);
						}
						if(val.POTYPE === 'OPEXP'){
							$scope.opEXP.push(val);
						}
					});

					var opTotalAmount = 0;
					for(var i = 0; i< $scope.opEXP.length;i++){
						var amount 	=	$scope.opEXP[i].AMOUNT;
						opTotalAmount += Number(amount);
					}
					$scope.OPTOTALAMOUNT 	=	opTotalAmount;

					var prTotalAmount = 0;
					for(var i = 0; i< $scope.prEXP.length;i++){
						var amount 	=	$scope.prEXP[i].AMOUNT;
						prTotalAmount += Number(amount);
					}
					$scope.PRTOTALAMOUNT 	=	prTotalAmount;
					
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};

		$scope.getPaymentByUser = function(userid){
			$scope.spinnerShow_Payment = true;
			var pushData 					= 	{};
			if(userid){
				pushData.USERID 				= 	userid;
			}else{
				pushData.USERID 				= 	$rootScope.user.USERID;
			}
			pushData.limit					=	$scope.pagination_payment.limit;
			pushData.currentPage			=	$scope.pagination_payment.currentPage;
			pushData.pagenation				=	true;
			paymentManagerServices.getPaymentByUser(pushData).then(function(data){
				if(data.msg!=''){
					$scope.paymentManagerBO			=	[];
					$scope.paymentManagerBO 		= 	data[0].ITEM;
					$scope.TOTALITEMS 				= 	data[1].TOTAL.TOTAL;
					$scope.PO_TOTAL					= 	data[2].POTOTALAMOUNT[0].POAMOUNT;
					$scope.OPEXP_TOTAL				= 	data[3].OPEXPTOTALAMOUNT[0].OPEXPAMOUNT;
					$scope.spinnerShow_Payment 		= 	false;
				}else{
					$scope.spinnerShow_Payment = false;
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};

		$scope.refresh	=	function(){
			if($rootScope.user.PERMISSIONS[0] === 'JRD_ADMIN'){
				$scope.getCustomerStatusCount();
				$scope.getCustomers();
				$scope.getPayment();
			} else if ($rootScope.user.PERMISSIONS[0] === 'JRD_SUPERVISOR') {
				$scope.getCashDetails();
				$scope.getPaymentByUser();
			};
		};
		
		if($rootScope.user.PERMISSIONS[0] === 'JRD_ADMIN'){
			$scope.getCustomerStatusCount();
			$scope.getCustomers();
			$scope.getPayment();
		} else if ($rootScope.user.PERMISSIONS[0] === 'JRD_SUPERVISOR') {
			$scope.getCashDetails();
			$scope.getPaymentByUser();
		}else if ($rootScope.user.PERMISSIONS[0] === 'JRD_MARKETING') {
			$scope.getCustomerStatusCount();
			$scope.getCustomers();
			$scope.getPaymentByUser();
			
		};
		
		$scope.poBalanceCal = function(val1, val2){
			if(typeof val1 !== 'undefined' && typeof val2 !== 'undefined'){
				const balance =  Number(val1) - Number(val2);
				const balance_filter = $rootScope.negativeFilterReplacer(balance);
				return balance_filter;
			}
		};
		$scope.opexpBalanceCal = function(val1, val2){
			if(typeof val1 !== 'undefined' && typeof val2 !== 'undefined'){
				const balance =  Number(val1) - Number(val2);
				const balance_filter = $rootScope.negativeFilterReplacer(balance);
				return balance_filter;
			}
		};
		$scope.getClass = function(val1, val2){
			const balance =  Number(val1) - Number(val2);
			if(balance < 0){
				return 'red-text';
			}
		};
		
		$scope.orderByField = 'POTYPE';
		$scope.reverseSort = false;
  
        $scope.players = [
			{name: 'Gene', team: 'alpha'},
			{name: 'George', team: 'beta'},
			{name: 'Steve', team: 'gamma'},
			{name: 'Paula', team: 'beta'},
			{name: 'Scruath', team: 'gamma'}
		  ];
		  $scope.todocount = 1;
		 

		  $scope.todoClient = function (data) {
			var config= {};
				config.templateUrl = '../app/todo/edit/todo.client.html';
				config.controller = 'todoClientController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['todo.todoclient.todolist'];
				config.passingValues.dataBO = data;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						//$scope.getPOBasket();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};
		if($scope.todocount > 0){
			//$scope.todoClient();
		}
		$scope.getUsers = function(){
			$scope.reference.USER = [];
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

		if($rootScope.user.PERMISSIONS[0] === 'JRD_ADMIN'){
			$scope.getPaymentByUser('dhana');
			$scope.getCashDetails('dhana');
			$scope.USERID = 'dhana';
		}
		
	}
	angular.module('aswa').controller('dashboardController',['$scope', '$rootScope', '$filter', 'utilityServices', '$modal', 'mainServices', 'dashboardServices', 'customerManagerServices', 'paymentManagerServices', 'marketingBasketServices', 'userManagerServices', 'getreferences', 'storageServices', dashboardController]);
})();
