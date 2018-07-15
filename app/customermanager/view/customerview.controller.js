(function(){

	function customerViewController($scope, $routeParams, $rootScope, $modal, $filter, customerManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.customerManager 						=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE,
			"CUSTOMERSTATUS" 	: getreferences.referencesData.CUSTOMERSTATUS
		};

		
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

		$scope.getTotals = function(){
			$rootScope.showSpinner();
			customerManagerServices.getTotals($routeParams.CUSTOMERID).then(function(data){
				if(data.msg!=''){
					$scope.totalsBO	=	[];
					$scope.totalsBO 	= 	data;

					console.log('TOTALs ', data)
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getTotals();

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

		$scope.chartValue = function(data){
			console.log('data1 ', data)

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

		


	}

	angular.module('aswa').controller('customerViewController',['$scope', '$routeParams', '$rootScope', '$modal', '$filter', 'customerManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', customerViewController]);
})();
