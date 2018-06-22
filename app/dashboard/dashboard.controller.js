(function(){

	function dashboardController($scope, $rootScope, $filter, utilityServices, $modal, mainServices, dashboardServices, getreferences, storageServices){
		$rootScope.title = "dashboard";
		$scope.pageHeader = "Dashboard for aswa";
		$scope.sval=5;
		$scope.refData	={};
		$scope.refData.referencesDataMap = {
			"genericStatus" 	: getreferences.referencesData.genericStatus,
			"genericStatusTwo" 	: getreferences.referencesData.genericStatusTwo
		};


	Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Top 5 Customers Instrumental'
    },
    xAxis: {
        categories: ['Bijeshkumar', 'Maruthi', 'Rao', 'Kissinger', 'Manju']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'Labour',
        data: [5000, 4500, 4000, 7000, 2000],
         marker: {
            symbol: 'triangle'
        }
    }, {
        name: 'Wood',
        data: [2000, 2000, 3000, 2000, 10000],
         marker: {
            symbol: 'triangle'
        }
    }, {
        name: 'Others',
        data: [3000, 4000, 4000, 2000, 5000],
         marker: {
            symbol: 'triangle'
        }
    }]
});


Highcharts.chart('containerpie', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Top 10 Customers'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Manju',
            y: 6000000,
            sliced: true,
            selected: true
        }, {
            name: 'Bijeshkumar',
            y: 500000
        }, {
            name: 'Maruthi',
            y: 1000000
        }, {
            name: 'Lavanya',
            y: 400000
        }, {
            name: 'Kissinger',
            y: 418000
        }, {
            name: 'Rao',
            y: 700000
        }]
    }]
});

Highcharts.chart('container3', {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Monthly Average Revenue'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            }
        }
    },
    tooltip: {
        crosshairs: true,
        shared: true
    },
    plotOptions: {
        spline: {
            marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
    },
    series: [{
        name: 'Income',
        marker: {
            symbol: 'square'
        },
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
            y: 26.5,
            marker: {
                symbol: 'square'
            }
        }, 23.3, 18.3, 13.9, 9.6]

    }, {
        name: 'Expense',
        marker: {
            symbol: 'square'
        },
        data: [{
            y: 3.9,
            marker: {
                symbol: 'square'
            }
        }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
});
	

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
			console.log("refresh");
			storageServices.remove("dashboard_", "getIowe");
			storageServices.remove("dashboard_", "getBR");
			storageServices.remove("dashboard_", "getGrandTotal");
			$scope.getBR();
			$scope.getIowe();
			$scope.getGrandTotal();
        };
        
        $scope.players = [
			{name: 'Gene', team: 'alpha'},
			{name: 'George', team: 'beta'},
			{name: 'Steve', team: 'gamma'},
			{name: 'Paula', team: 'beta'},
			{name: 'Scruath', team: 'gamma'}
		  ];
	}
	angular.module('aswa').controller('dashboardController',['$scope', '$rootScope', '$filter', 'utilityServices', '$modal', 'mainServices', 'dashboardServices', 'getreferences', 'storageServices', dashboardController]);
})();
