(function(){

	customerNoteEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, customerManagerServices, aswaValidationService, storageServices, getreferences, utilityServices){
		$scope.passingValues 				= 	{};
		$scope.isEdit 						= 	passingValues.isEdit;
		$scope.passingValues.title 			= 	passingValues.title;
		$scope.dataBO  						= 	{};
		$scope.reference					=	{};
        $scope.reference.referenceBO		= 	getreferences.references;
        $scope.dataBO.CUSTOMERID            =   passingValues.CUSTOMERID;

		if(passingValues.dataBO)
		{
			$scope.dataBO	 					= 	passingValues.dataBO;
		};
		
		$scope.save = function (record) {
			var pushData = {};
			pushData = record;
			pushData.MODIFIEDBY = $rootScope.user.USERID;
			var error =	aswaValidationService.isCustomerNoteValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
				if($scope.isEdit){
					customerManagerServices.updateCustomerNote(record).then(function(data){
						if(data.msg!=""){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', error);
						}
					})
				}else{
					customerManagerServices.addCustomerNote(record).then(function(data){
					if(data.msg!=""){
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

	angular.module('aswa').controller('customerNoteEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'customerManagerServices', 'aswaValidationService', 'storageServices', 'getreferences', 'utilityServices', customerNoteEditController]);



})();
