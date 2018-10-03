(function(){

	function settingsController($scope, $rootScope, $modal, $filter, settingsServices, labourManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){

		$scope.locationsBO 						=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.referenceData.referencesDataMap 	= {
			"jurisdiction" 	: getreferences.referencesData.JURISDICTION
		};
		$scope.getLocations = function(){
			$rootScope.showSpinner();
			settingsServices.getLocations().then(function(data){
				if(data.msg!=''){
					$scope.locationsBO	=	[];
					$scope.locationsBO 	= 	data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		
		$scope.getLocations();

		$scope.getLabours = function(){
			$rootScope.showSpinner();
			labourManagerServices.getLabours().then(function(data){
				if(data.msg!=''){
					$scope.laboursList			=	[];
					$scope.laboursBO			=	[];
					$scope.laboursBO			=	data;
					angular.forEach(data, function(val, key){
						var node = {};
						node.name	=	val.LABOUR;
						node.code	=	val.LABOURID;
						$scope.laboursList.push(node);
					});
					$scope.referencesData  = {};
					angular.forEach(data, function(val, key){
						var length  = data.length-1;
						$scope.referencesData['LABOUR'] = {};
						for(var i = length; i>=0;i--){
							$scope.referencesData['LABOUR'][data[i]["LABOURID"]] = data[i]["LABOUR"];
						}
					});
					//console.log('lab', $scope.referencesData)
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};
		$scope.getLabours();

		$scope.getPrecontent = function(){
			$rootScope.showSpinner();
			settingsServices.getPrecontent().then(function(data){
				if(data.msg!=''){
					$scope.contentListBO			=	[];
					$scope.contentListBO			=	data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};
		$scope.getPrecontent();

		$scope.editLocation = function (data) {
			//console.log('EDIT BASKED:.... ', data)
			var config= {};
			config.templateUrl = '../app/settings/edit/location.html';
			config.controller = 'settingsEditController';
			config.size		= 'sm';
			config.backdrop	= 'static';
			config.passingValues = {};
			config.passingValues.title = Messages['settings.editlocation'];
			config.passingValues.isEdit = true;
			config.passingValues.dataBO = data;
			config.passingValues.mode = 'location';
			config.callback = function(status, item){
				if(status === 'success') {
					$scope.getLocations();
				}
			}
			utilityServices.openConfigModal($modal, config);
		};
		$scope.editPrefill = function (data) {
			//console.log('EDIT BASKED:.... ', data)
			var config= {};
			config.templateUrl = '../app/settings/edit/location.html';
			config.controller = 'settingsEditController';
			config.size		= 'lg';
			config.backdrop	= 'static';
			config.passingValues = {};
			config.passingValues.title = Messages['settings.editprefill'];
			config.passingValues.isEdit = true;
			config.passingValues.dataBO = data;
			config.passingValues.mode = 'prefill';
			config.callback = function(status, item){
				if(status === 'success') {
					$scope.getPrecontent();
				}
			}
			utilityServices.openConfigModal($modal, config);
		};
		$scope.addPrefill = function (data) {
			//console.log('EDIT BASKED:.... ', data)
			var config= {};
			config.templateUrl = '../app/settings/edit/location.html';
			config.controller = 'settingsEditController';
			config.size		= 'lg';
			config.backdrop	= 'static';
			config.passingValues = {};
			config.passingValues.title = Messages['settings.editprefill'];
			config.passingValues.isEdit = false;
			config.passingValues.dataBO = data;
			config.passingValues.mode = 'prefill';
			config.callback = function(status, item){
				if(status === 'success') {
					$scope.getPrecontent();
				}
			}
			utilityServices.openConfigModal($modal, config);
		};
		$scope.editLabour = function (data) {
			//console.log('EDIT BASKED:.... ', data)
			var config= {};
			config.templateUrl = '../app/labourmanager/edit/labourshift.pay.html';
			config.controller = 'labourShiftEditController';
			config.size		= 'md';
			config.backdrop	= 'static';
			config.passingValues = {};
			config.passingValues.title = Messages['labourmanager.editlabour'];
			config.passingValues.isEdit = true;
			config.passingValues.dataBO = data;
			config.passingValues.mode = 'labour';
	
			config.callback = function(status, item){
				if(status === 'success') {
					$scope.getLabours();
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
			$scope.getLocations();
			$scope.getLabours();
		};

		


	}

	angular.module('aswa').controller('settingsController',['$scope', '$rootScope', '$modal', '$filter', 'settingsServices', 'labourManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', settingsController]);
})();
