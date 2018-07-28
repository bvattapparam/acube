(function(){

	poBasketEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, poManagerServices, aswaValidationService, storageServices, getreferences, utilityServices){
		
		$scope.passingValues 				= 	{};
		$scope.isEdit 						= 	passingValues.isEdit;
		$scope.passingValues.title 			= 	passingValues.title;
		$scope.dataBO  						= 	{};
		$scope.reference					=	{};
		$scope.reference.referenceBO		= 	getreferences.references;
		$scope.reference.referenceBO.VENDOR 	=	passingValues.vendorBO;
		if(passingValues.dataBO)
		{
			$scope.dataBO	 					= 	passingValues.dataBO;
		}

		$scope.amountCal = function(qty, percost){
			var totalAmount = (qty * percost).toFixed(2);
			$scope.dataBO.AMOUNT = totalAmount;
		};
		
		$scope.save = function (record) {
			var pushData = {};
			pushData = record;
			pushData.MODIFIEDBY = $rootScope.user.USERID;
			var error =	aswaValidationService.isPOBasketValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
					poManagerServices.updatePOBasket(record).then(function(data){
						if(data.msg!=''){
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

	angular.module('aswa').controller('poBasketEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'poManagerServices', 'aswaValidationService', 'storageServices', 'getreferences', 'utilityServices', poBasketEditController]);



})();
