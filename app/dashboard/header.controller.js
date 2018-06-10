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

		// fusion chart codesnippet

		//funel chart starts here

$scope.myDataSource = {
	"attrs":{

    "caption": "",
    "subCaption": "",
    "numberprefix": "₹",
    "plotgradientcolor": "",
    "bgcolor": "FFFFFF",
    "showalternatehgridcolor": "0",
    "divlinecolor": "CCCCCC",
    "showvalues": "0",
    "showcanvasborder": "0",
    "canvasborderalpha": "0",
    "canvasbordercolor": "CCCCCC",
    "canvasborderthickness": "1",
    "yaxismaxvalue": "1500",
    "captionpadding": "30",
    "linethickness": "3",
    "yaxisvaluespadding": "15",
    "legendshadow": "0",
    "legendborderalpha": "0",
    "palettecolors": "#00816d,#b46b7a,#33bdda,#e44a00,#6baa01,#583e78",
    "showborder": "0"
},
"categories":[{
    "category": [{
        "label": "Jan"
    }, {
        "label": "Feb"
    }, {
        "label": "Mar"
    }, {
        "label": "Apr"
    }, {
        "label": "May"
    }, {
        "label": "Jun"
    }, {
        "label": "Jul"
    }, {
        "label": "Aug"
    }, {
        "label": "Sep"
    }, {
        "label": "Oct"
    }, {
        "label": "Nov"
    }, {
        "label": "Dec"
    }]
}],
"dataset":[{
        "seriesname": "Husband",
        "data": [{
            "value": "550"
        }, {
            "value": "780"
        }, {
            "value": "650"
        }, {
            "value": "980"
        }, {
            "value": "450"
        }, {
            "value": "400"
        }, {
            "value": "560"
        }, {
            "value": "456"
        }, {
            "value": "390"
        }, {
            "value": "789"
        }, {
            "value": "567"
        }, {
            "value": "450"
        }]
    },

    {
        "seriesname": "Wife",
        "data": [{
            "value": "890"
        }, {
            "value": "990"
        }, {
            "value": "450"
        }, {
            "value": "567"
        }, {
            "value": "345"
        }, {
            "value": "330"
        }, {
            "value": "330"
        }, {
            "value": "670"
        }, {
            "value": "456"
        }, {
            "value": "345"
        }, {
            "value": "330"
        }, {
            "value": "330"
        }]
    }
]





};
	
		// cunnel close


		$scope.currentMonth	=	$filter('date')(new Date(), "MMMM");
		$scope.emptyRowCount = 5;
		// function to call the service for get all iowe data
		$scope.iowe	=	{};
		$scope.getIowe = function(){
			console.log("inside");
			$rootScope.showSpinner();
			dashboardServices.getIowe().then(function(data){
				$scope.iowe.ioweBO = [];
					$scope.iowe.ioweBO = data;
					$rootScope.hideSpinner();
					console.log("iowe-", $scope.iowe.ioweBO);
			});
		}
		//$scope.getIowe();

		// for bill reminders module

		$scope.br	=	{};
		$scope.getBR = function(){
			console.log("br");
			$rootScope.showSpinner();
			dashboardServices.getBR().then(function(data){
				$scope.br.brBO = [];
					$scope.br.brBO = data;
					$rootScope.hideSpinner();
			});
		}
		//$scope.getBR();
		$scope.getGrandTotal	={};

		$scope.getGrandTotal = function(){
			$rootScope.showSpinner();
			mainServices.getGrandTotal().then(function(data){
				$scope.getGrandTotal.getGrandTotalBO = [];
					$scope.getGrandTotal.getGrandTotalBO = data;
					$rootScope.hideSpinner();
			});
		}
		//$scope.getGrandTotal();



		// zone to add new items
		// add new BR entry
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
		}

		// edit BR entry
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
		}

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
		}
		// edit BR entry
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
		}

		// recall the services to refresh the data - manual refresh is done here

		$scope.refresh	=	function(){
			console.log("refresh");
			storageServices.remove("dashboard_", "getIowe");
			storageServices.remove("dashboard_", "getBR");
			storageServices.remove("dashboard_", "getGrandTotal");
			$scope.getBR();
			$scope.getIowe();
			$scope.getGrandTotal();
		}

}
	angular.module('aswa').controller('dashboardController',['$scope', '$rootScope', '$filter', 'utilityServices', '$modal', 'mainServices', 'dashboardServices', 'getreferences', 'storageServices', dashboardController]);
})();
