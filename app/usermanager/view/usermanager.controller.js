(function(){

	function userManagerController($scope, $rootScope, $modal, $filter, userManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.userManager 						=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.referenceData.referencesDataMap 	= {
			"jurisdiction" 	: getreferences.referencesData.JURISDICTION
		};

		// HiChart sample

/*Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
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
        name: 'dhana',
        data: [5, 3, 4, 7, 2]
    }, {
        name: 'ajay',
        data: [2, 2, 3, 2, 1]
    }, {
        name: 'sangi',
        data: [3, 4, 4, 2, 5]
    }]
});
*/

		$scope.getUsers = function(){
			$rootScope.showSpinner();
			userManagerServices.getUsers().then(function(data){
				if(data.msg!=''){
					$scope.userManagerBO	=	[];
					$scope.userManagerBO 	= 	data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};

		$scope.getUsers();

		$scope.editUser = function (data) {
			console.log("yes", data);
			var config= {};
				config.templateUrl = '../app/usermanager/edit/user.html';
				config.controller = 'userManagerEditController';
				config.size		= 'm';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['usermanager.edituser'];
				config.passingValues.dataBO = data;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getUsers();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		$scope.addUser = function () {
			console.log("yes...add");
			var config= {};
				config.templateUrl = '../app/usermanager/edit/user.html';
				config.controller = 'userManagerEditController';
				config.size		= 'm';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['usermanager.adduser'];
				//config.passingValues.dataBO = data;
				config.passingValues.isEdit = false;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getUsers();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		

		$scope.refresh	=	function(){
			$scope.getUsers();
		};

		


	}

	angular.module('aswa').controller('userManagerController',['$scope', '$rootScope', '$modal', '$filter', 'userManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', userManagerController]);
})();
