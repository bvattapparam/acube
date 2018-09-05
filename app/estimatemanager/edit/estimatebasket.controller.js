(function(){

	estimateBasketEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, estimateManagerServices, aswaValidationService, storageServices, getreferences, utilityServices){
		$scope.passingValues 				= 	{};
		$scope.isEdit 						= 	passingValues.isEdit;
		$scope.passingValues.title 			= 	passingValues.title;
		$scope.dataBO  						= 	{};
		$scope.reference					=	{};
		$scope.reference.referenceBO		= 	getreferences.references;
		
		if(passingValues.dataBO)
		{
			$scope.dataBO	 					= 	passingValues.dataBO;
		}

		$scope.amountCal = function(qty, percost){
			var totalAmount = qty*percost;
			$scope.dataBO.AMOUNT = totalAmount;
		};
		
		$scope.save = function (record) {
			var pushData = {};
			pushData = record;
			pushData.MODIFIEDBY = $rootScope.user.USERID;
			var error =	aswaValidationService.isEstimateBasketValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
					estimateManagerServices.updateEstimateBasketData(record).then(function(status){
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

		$scope.cancel = function (record) {
			var title 		= 	Messages["edit.form.confirmation.title"];
			var message 	=	Messages["edit.form.confirmation.body"];
			//utilityServices.closeModelConfiguration($modalInstance,frm,title,message);
			$modalInstance.dismiss(record);
		};
	}

	angular.module('aswa').controller('estimateBasketEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'estimateManagerServices', 'aswaValidationService', 'storageServices', 'getreferences', 'utilityServices', estimateBasketEditController]);



})();
