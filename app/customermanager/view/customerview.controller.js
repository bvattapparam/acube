(function(){

	function customerViewController($location, $scope, $routeParams, $rootScope, $modal, $filter, customerManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.customerManager 					=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.showModuleSpinner				=	false;
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE,
			"PAYMENTMODE" 	: getreferences.referencesData.PAYMENTMODE,
			"CUSTOMERSTATUS" 	: getreferences.referencesData.CUSTOMERSTATUS
		};

		$scope.CUSTOMERID		=	$routeParams.CUSTOMERID;
		$scope.pathFlag			=	'cview';
		
		$scope.quoteStatus = function(param){
			if (param === '1') {
				return "Yes";
			} else if (param === '0') {
				return "No";
			}
		}
		$scope.estimateStatus = function(param){
			if (param === '1') {
				return "Yes";
			} else if (param === '0') {
				return "No";
			}
		}

		$scope.getCustomer = function(){
			$rootScope.showSpinner();
			customerManagerServices.getCustomer($routeParams.CUSTOMERID).then(function(data){
				if(data.msg!=''){
					$scope.customerManagerBO	=	[];
					$scope.customerManagerBO 	= 	data;
					$scope.chart = [];
					$scope.chartValue(data);
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getCustomer();

		$scope.getCustomerPay = function(){
			var pushdata			=	{};
			pushdata.CUSTOMERID		=	$routeParams.CUSTOMERID;
			$rootScope.showSpinner();
			customerManagerServices.getCustomerPay(pushdata).then(function(data){
				if(data.msg!=''){
					$scope.customerPayManagerBO	=	[];
					$scope.customerPayManagerBO 	= 	data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};
		$scope.getCustomerPay();
		
		$scope.getTotals = function(){
			var pushdata		=	{};
			pushdata.CUSTOMERID	=	$routeParams.CUSTOMERID;
			//$rootScope.showSpinner();
			$scope.showModuleSpinner = true;
			customerManagerServices.getTotals(pushdata).then(function(data){
				console.log("total data..", data)
				if(data.msg!=''){
					$scope.totalsBO			=	[];
					$scope.totalsBO 		= 	data;
					if(data[0].QUOTEAMOUNT.length > 0){
						if(!utilityServices.isEmpty(data[0].QUOTEAMOUNT[0].DISCOUNT)){
							var discount 			= data[0].QUOTEAMOUNT[0].DISCOUNT;
							var project_cost 		= data[0].QUOTEAMOUNT[0].QUOTEAMOUNT;
							var final_PROJECTCOST 	= Number(project_cost) - Number(discount);
							$scope.PROJECTCOST 		= final_PROJECTCOST;
						} else {
							$scope.PROJECTCOST 		= 	data[0].QUOTEAMOUNT[0].QUOTEAMOUNT;
						}
						//$scope.PROJECTCOST 		= 	data[0].QUOTEAMOUNT[0].QUOTEAMOUNT;

					}

					// calculate the discount portion here...

					if(data[1].PAIDAMOUNT.length > 0){
						$scope.PAIDAMOUNT		= 	data[1].PAIDAMOUNT[0].PAIDAMOUNT;
					}
					if(data[2].POAMOUNT.length > 0){
						$scope.POAMOUNT			= 	data[2].POAMOUNT[0].POAMOUNT;
					}
					if(data[3].SALARYAMOUNT.length > 0){
						$scope.LBRAMOUNT			= 	data[3].SALARYAMOUNT[0].SALARYAMOUNT;
					}
					if(data[4].MANDAYS.length > 0){
						$scope.MANDAYS			= 	data[4].MANDAYS[0].MANDAYS;
						if($scope.MANDAYS != ''){
							$scope.MANDAYS = $scope.MANDAYS + ' ' + Messages['label.mandays'];
						}
					}
					if(typeof $scope.PROJECTCOST !== 'undefined' && typeof $scope.PAIDAMOUNT !== 'undefined'){
						const balance =  Number($scope.PROJECTCOST) - Number($scope.PAIDAMOUNT);
						$scope.BALANCEAMOUNT = $rootScope.negativeFilterReplacer(balance);
					}
					if(typeof $scope.POAMOUNT !== 'undefined' && typeof $scope.LBRAMOUNT !== 'undefined'){
						const balance =  Number($scope.POAMOUNT) + Number($scope.LBRAMOUNT);
						$scope.TOTALEXPAMOUNT = $rootScope.negativeFilterReplacer(balance);
						var diff		=	Number($scope.PAIDAMOUNT) - Number(balance);
						$scope.POTOTALDIFF  = $rootScope.negativeFilterReplacer(diff);
						if(diff < 0){
							$scope.getClass =  'red-text';
						}else{
							$scope.getClass =  '';
						}
					};
					//$rootScope.hideSpinner();
					$scope.showModuleSpinner = false;
				}else{
					//$rootScope.hideSpinner();
					$scope.showModuleSpinner = false;
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getTotals();

		$scope.customerPay = function () {
			var config= {};
				config.templateUrl = '../app/customermanager/edit/customer-pay.html';
				config.controller = 'customerPayManagerEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['customermanager.customerpay'];
				config.passingValues.isEdit = false;
				config.passingValues.CUSTOMERID = $routeParams.CUSTOMERID;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getCustomer();
						$scope.getCustomerPay();
						$scope.getTotals();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};
		$scope.editCustomerPay = function (data) {
			var config= {};
				config.templateUrl = '../app/customermanager/edit/customer-pay.html';
				config.controller = 'customerPayManagerEditController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['customermanager.customerpay'];
				config.passingValues.isEdit = true;
				config.passingValues.CUSTOMERID = $routeParams.CUSTOMERID;
				config.passingValues.dataBO = data;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getCustomerPay();
						$scope.getTotals();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		

		$scope.chartValue = function(data){
			var varry = [{name:'estimates',y:3},{name:'quotations',y:4},{name:'materials',y:4}];
            angular.forEach(varry, function(val, key){
                var node 	=	{};
                node.name = val.name;
                node.y = val.y;
                $scope.chart.push(node);
            
            });
            $scope.options.series[0].data = $scope.chart;
			//var chart = new Highcharts.Chart($scope.options);
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

		$scope.getClass = function(val){
			if(val < 0){
				return 'red-text';
			}
		};
		
		$scope.getPQE = function(){
			//$rootScope.showSpinner();
			var pushdata = {};
			pushdata.CUSTOMERID = $routeParams.CUSTOMERID;
			customerManagerServices.getPQE(pushdata).then(function(data){
				if(data.msg!=''){
					$scope.dataPQE	=	[];
					$scope.dataPQE 	= 	data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getPQE();

		$scope.viewLabourTMS = function () {
			var config= {};
				config.templateUrl = '../app/labourmanager/view/labour_shift_view.html';
				config.controller = 'labourManagerShiftViewController';
				config.size		= 'lg';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['labourmanager.view'];
				config.passingValues.CUSTOMERID = $routeParams.CUSTOMERID;;
				config.passingValues.isEdit = false;
				config.callback = function(status, item){
					if(status === 'success') {
						//$scope.getCustomers();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};
		
		$scope.viewNotes = function(){
			$location.path('/customer/customerview/customernote/' + $scope.CUSTOMERID);
		}

		$scope.refresh	=	function(){
			$scope.getCustomerPay();
			$scope.getTotals();
			$scope.getCustomer();
		};	

	}

	angular.module('aswa').controller('customerViewController',['$location', '$scope', '$routeParams', '$rootScope', '$modal', '$filter', 'customerManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', customerViewController]);
})();
