(function(){

	myAccountEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, myAccountServices, aswaValidationService, storageServices, getreferences, utilityServices){
		$scope.passingValues 				= 	{};
		$scope.isEdit 						= 	passingValues.isEdit;
		$scope.passingValues.title 			= 	passingValues.title;
		$scope.dataBO  						= 	{};
		$scope.dataBO	 					= 	passingValues.dataBO;
		$scope.reference					=	{};

		$scope.reference.referenceBO		= 	getreferences.references;
		
		$scope.save = function (record) {;
			var pushData = {};
			pushData = record;
			var error =	aswaValidationService.isUserValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
				myAccountServices.updateUserData(record).then(function(status){
					if(status==200){
						$rootScope.hideSpinner();
						$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
						$modalInstance.close();
					}else {
						$rootScope.hideSpinner();
						$rootScope.showErrorBox('error', error);
					}
				})
			}// check error close here
		};

		$scope.cancel = function (frm) {
			var title 		= 	Messages["edit.form.confirmation.title"];
			var message 	=	Messages["edit.form.confirmation.body"];
			utilityServices.closeModelConfiguration($modalInstance,frm,title,message);
		};
	}

	angular.module('aswa').controller('myAccountEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'myAccountServices', 'aswaValidationService', 'storageServices', 'getreferences', 'utilityServices', myAccountEditController]);



})();
