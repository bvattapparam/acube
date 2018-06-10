(function(){

	brEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, dashboardServices, aswaValidationService, storageServices, getreferences){
		$scope.passingValues 				= {};
		$scope.isEdit 						= passingValues.isEdit;
		$scope.passingValues.title 			= passingValues.title;
		$scope.br  						= {};
		$scope.br.brBO 				= passingValues.brBO;
		$scope.reference					=	{};
		$scope.reference.genericStatusTwo		=	reference.genericStatusTwo; // for dropdown only

		$scope.brRef					=	{}
		$scope.brRef.referencesDataMap 	= {
			"genericStatusTwo" 	: getreferences.referencesData.genericStatusTwo
		};

		$scope.saveBR = function (record) {
			var pushData = {};
			pushData = record;
			//console.log("record", record);
			var error =	aswaValidationService.isBRValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					$rootScope.showSpinner();
					dashboardServices.updateBRData(record).then(function(status){
						if(status==200){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', error);
						}
					})
				}else{
					$rootScope.showSpinner();
					dashboardServices.pushBRData(record).then(function(status){
							if(status==200){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message'])
							$modalInstance.close();
						}
						else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', error);
						}
					})
				}// if add/edit is close here
			}// check error close here
		};

		$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
		};


	}

	angular.module('aswa').controller('brEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'dashboardServices', 'aswaValidationService', 'storageServices', 'getreferences', brEditController]);



})();
