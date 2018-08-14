(function(){

	function customerNoteViewController($scope, $routeParams, $rootScope, $modal, $filter, customerManagerServices, utilityServices, storageServices, getreferences,$http, mainServices){
        
		$scope.noteBO  						= 	{};
		$scope.reference					=	{};
		$scope.CUSTOMERID                   =   $routeParams.CUSTOMERID;

		$scope.getNote = function(){
			$rootScope.showSpinner();
			customerManagerServices.getNote($scope.CUSTOMERID).then(function(data){
				if(data.msg!=''){
					$scope.noteBO	=	[];
                    $scope.noteBO 	= 	data;
                    console.log('data    ', data)
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getNote();
		
		$scope.editNote = function (data) {
			var config= {};
				config.templateUrl = '../app/customermanager/edit/customer-note.html';
				config.controller = 'customerNoteEditController';
				config.size		= 'md';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['customermanager.noteedit'];
				config.passingValues.isEdit = true;
				config.passingValues.CUSTOMERID = $routeParams.CUSTOMERID;
				config.passingValues.dataBO = data;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getNote();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};
		$scope.addNote = function () {
			var config= {};
				config.templateUrl = '../app/customermanager/edit/customer-note.html';
				config.controller = 'customerNoteEditController';
				config.size		= 'md';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['customermanager.noteadd'];
				config.passingValues.isEdit = false;
				config.passingValues.CUSTOMERID = $routeParams.CUSTOMERID;
				config.callback = function(status, item){
					if(status === 'success') {
						$scope.getNote();
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

	}

	angular.module('aswa').controller('customerNoteViewController',['$scope', '$routeParams', '$rootScope','$modal','$filter', 'customerManagerServices', 'utilityServices', 'storageServices', 'getreferences', '$http', 'mainServices', customerNoteViewController]);
})();
