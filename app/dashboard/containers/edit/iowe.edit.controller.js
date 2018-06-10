(function(){

	ioweEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, dashboardServices, aswaValidationService, storageServices, getreferences){
		$scope.passingValues 				= {};
		$scope.isEdit 						= passingValues.isEdit;
		$scope.passingValues.title 			= passingValues.title;
		$scope.iowe  						= {};
		$scope.iowe.ioweBO 				= passingValues.ioweBO;
		$scope.reference					=	{};
		$scope.reference.genericStatusTwo		=	reference.genericStatusTwo; // for dropdown only
		$scope.reference.expenseCategory		=	reference.expenseCategory; // for dropdown only

		$scope.ioweRef					=	{}
		$scope.ioweRef.referencesDataMap 	= {
			"genericStatusTwo" 	: getreferences.referencesData.genericStatusTwo,
			"expenseCategory" 	: getreferences.referencesData.expenseCategory
		};

		$scope.saveIowe = function (record) {
			var pushData = {};
			pushData = record;
			//console.log("record", record);
			var error =	aswaValidationService.isIOWEValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					$rootScope.showSpinner();
					dashboardServices.updateIOWEData(record).then(function(status){
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
					dashboardServices.pushIOWEData(record).then(function(status){
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

	angular.module('aswa').controller('ioweEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'dashboardServices', 'aswaValidationService', 'storageServices', 'getreferences', ioweEditController]);



})();
