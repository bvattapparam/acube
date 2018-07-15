(function(){

	function dashboardController($scope, $rootScope, $filter, utilityServices, $modal, mainServices, dashboardServices, customerManagerServices, paymentManagerServices, marketingBasketServices, getreferences, storageServices){
		$rootScope.title = "dashboard";
		$scope.pageHeader = "Dashboard for aswa";
		$scope.LIMIT_PAYMENT = 80;
		$scope.sval=5;
		$scope.refData	={};
		$scope.refData.referencesDataMap = {
			"CUSTOMERSTATUS" 	: getreferences.referencesData.CUSTOMERSTATUS,
			"genericStatusTwo" 	: getreferences.referencesData.genericStatusTwo
		};

        $scope.reference					=	{};
		$scope.reference.referenceBO		= 	getreferences.references;
        

        $scope.getCustomerStatusCount = function(){
			$rootScope.showSpinner();
			customerManagerServices.getStatusCount().then(function(data){
				if(data.msg!=''){
					$scope.customerStatusBO = [];
                    $scope.customerStatusBO = data;
                    $scope.chart = [];
                    console.log("COUNT ", $scope.customerStatusBO);

                    $scope.chartValue(data);
                   
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
        };
		$scope.getCustomerStatusCount();
		
		// PAYMENT DETAILS FOR SUPERVISOR AND ADMIN...
		$scope.getPayment = function(){
			$rootScope.showSpinner();
			paymentManagerServices.getPayment().then(function(data){
				if(data.msg!=''){
					$scope.paymentManagerBO	=	[];
					if($rootScope.user.PERMISSIONS[0] != 'JRD_ADMIN'){
						angular.forEach(data, function(val,key){
							if(val.PAYTO == $rootScope.user.USERID){
								$scope.paymentManagerBO.push(val)
							}
						});
					}else{
						$scope.paymentManagerBO	= data;
						$scope.adminPaymentBO = data;
					}

					if($rootScope.user.PERMISSIONS[0] === 'JRD_ADMIN'){
						$scope.paymentManagerBO	= $scope.paymentManagerBO.slice(0,6);
					}
					
					var totalamount = 0;
					for(var i = 0; i< $scope.adminPaymentBO.length;i++){
						var amount 	=	$scope.adminPaymentBO[i].AMOUNT;
						totalamount += Number(amount);
					}
					$scope.TOTALAMOUNT 	=	totalamount;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getPayment();
		
		//	MARKETING BASKET / TOP 10 CUSTOMERS.
		$scope.getCustomers = function(){
			$rootScope.showSpinner();
			marketingBasketServices.getCustomers().then(function(data){
				if(data.msg!=''){
					$scope.customerManagerBO	=	[];
					$scope.customerManagerBO 	= 	data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};

		$scope.getCustomers();
           
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
                pointFormat: '<b>{point.y:.1f}</b>'
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
        


		$scope.currentMonth	=	$filter('date')(new Date(), "MMMM");
		$scope.emptyRowCount = 5;
		$scope.iowe	=	{};
		$scope.getIowe = function(){
			$rootScope.showSpinner();
			dashboardServices.getIowe().then(function(data){
				$scope.iowe.ioweBO = [];
					$scope.iowe.ioweBO = data;
					$rootScope.hideSpinner();
			});
		};
		//$scope.getIowe();

		// FOR BILL REMINDER MODULE..
		$scope.br	=	{};
		$scope.getBR = function(){
			$rootScope.showSpinner();
			dashboardServices.getBR().then(function(data){
				$scope.br.brBO = [];
					$scope.br.brBO = data;
					$rootScope.hideSpinner();
			});
		};
		//$scope.getBR();
		$scope.getGrandTotal	={};

		$scope.getGrandTotal = function(){
			$rootScope.showSpinner();
			mainServices.getGrandTotal().then(function(data){
				$scope.getGrandTotal.getGrandTotalBO = [];
					$scope.getGrandTotal.getGrandTotalBO = data;
					$rootScope.hideSpinner();
			});
		};
		//$scope.getGrandTotal();

		$scope.addBR = function (size) {
			var config= {};
			config.templateUrl = '../app/dashboard/containers/edit/br.edit.html';
			config.controller = 'brEditController';
			config.size		= 'm';
			config.backdrop	= 'static';
			config.passingValues = {};
			config.passingValues.title = Messages['addbr'];
			config.callback = function(status, item){
				if(status === 'success') {
					storageServices.remove("dashboard_", "getBR");
					$scope.getBR();
				}
			}
			utilityServices.openConfigModal($modal, config);
		};

		$scope.editBR = function (data) {
			var config= {};
			config.templateUrl = '../app/dashboard/containers/edit/br.edit.html';
			config.controller = 'brEditController';
			config.size		= 'm';
			config.backdrop	= 'static';
			config.passingValues = {};
			config.passingValues.title = Messages['editbr'];
			config.passingValues.brBO = data;
			config.passingValues.isEdit = true;
			config.callback = function(status, item){
				if(status === 'success') {
					storageServices.remove("dashboard_", "getBR");
					$scope.getBR();
				}
			}
			utilityServices.openConfigModal($modal, config);
		};

		// add new IOWE entry
		$scope.addIOWE = function (size) {
			var config= {};
			config.templateUrl = '../app/dashboard/containers/edit/iowe.edit.html';
			config.controller = 'ioweEditController';
			config.size		= 'm';
			config.backdrop	= 'static';
			config.passingValues = {};
			config.passingValues.title = Messages['addiowe'];
			config.callback = function(status, item){
				if(status === 'success') {
					storageServices.remove("dashboard_", "getIowe");
					$scope.getIowe();
				}
			}
			utilityServices.openConfigModal($modal, config);
		};

		$scope.editIOWE= function (data) {
			var config= {};
			config.templateUrl = '../app/dashboard/containers/edit/iowe.edit.html';
			config.controller = 'ioweEditController';
			config.size		= 'm';
			config.backdrop	= 'static';
			config.passingValues = {};
			config.passingValues.title = Messages['editiowe'];
			config.passingValues.ioweBO = data;
			config.passingValues.isEdit = true;
			config.callback = function(status, item){
				if(status === 'success') {
					storageServices.remove("dashboard_", "getIowe");
					$scope.getIowe();
				}
			}
			utilityServices.openConfigModal($modal, config);
		};

		$scope.refresh	=	function(){
			$scope.getCustomerStatusCount();
			$scope.getPayment();
        };
        
        $scope.players = [
			{name: 'Gene', team: 'alpha'},
			{name: 'George', team: 'beta'},
			{name: 'Steve', team: 'gamma'},
			{name: 'Paula', team: 'beta'},
			{name: 'Scruath', team: 'gamma'}
		  ];
	}
	angular.module('aswa').controller('dashboardController',['$scope', '$rootScope', '$filter', 'utilityServices', '$modal', 'mainServices', 'dashboardServices', 'customerManagerServices', 'paymentManagerServices', 'marketingBasketServices', 'getreferences', 'storageServices', dashboardController]);
})();
