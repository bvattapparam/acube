(function(){

	customerManagerEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, customerManagerServices, aswaValidationService, storageServices, getreferences, utilityServices){
		$scope.passingValues 				= 	{};
		$scope.isEdit 						= 	passingValues.isEdit;
		$scope.passingValues.title 			= 	passingValues.title;
		$scope.dataBO  						= 	{};
		$scope.reference					=	{};
		$scope.reference.referenceBO		= 	getreferences.references;

		if(passingValues.dataBO)
		{
			$scope.dataBO	 					= 	passingValues.dataBO;
		};
		
		$scope.save = function (record) {
			var pushData = {};
			pushData = record;
			pushData.MODIFIEDBY = $rootScope.user.USERID;
			var error =	aswaValidationService.isCustomerManagerValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
				if($scope.isEdit){
					customerManagerServices.updateCustomerData(record).then(function(status){
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
					
					var CUSTOMERID = customerManagerServices.customerIDCreation(record);
					record.CUSTOMERID = CUSTOMERID;

					customerManagerServices.addCustomerData(record).then(function(status){
					if(status==200){
						$rootScope.hideSpinner();
						$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message'])
						$modalInstance.close();
					}else {
						$rootScope.hideSpinner();
						$rootScope.showErrorBox('error', error);
					}
				})
				}
				
			}// check error close here
		};

		$scope.cancel = function (frm) {
			var title 		= 	Messages["edit.form.confirmation.title"];
			var message 	=	Messages["edit.form.confirmation.body"];
			utilityServices.closeModelConfiguration($modalInstance,frm,title,message);
		};
	}

	angular.module('aswa').controller('customerManagerEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'customerManagerServices', 'aswaValidationService', 'storageServices', 'getreferences', 'utilityServices', customerManagerEditController]);



})();
