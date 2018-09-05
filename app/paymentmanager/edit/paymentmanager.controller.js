(function(){

	paymentManagerEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, paymentManagerServices, aswaValidationService, storageServices, getreferences, utilityServices){
		$scope.passingValues 				= 	{};
		$scope.isEdit 						= 	passingValues.isEdit;
		$scope.passingValues.title 			= 	passingValues.title;
		$scope.dataBO  						= 	{};
		$scope.reference					=	{};
		$scope.reference.referenceBO		= 	getreferences.references;
		$scope.PREXP						=	false;
		$scope.OPEXP						=	false;

		$scope.reference.USER				=	passingValues.userBO;
		$scope.reference.CUSTOMER			=	passingValues.customerBO;
		
		$scope.potype = function(param){
			if(param === 'OPEXP'){
				$scope.OPEXP = true;
				$scope.PREXP = false;
			} else if (param === 'PREXP'){
				$scope.OPEXP = false;
				$scope.PREXP = true;
			}
		}
		if(passingValues.dataBO)
		{
			$scope.dataBO	= 	passingValues.dataBO;
			$scope.potype($scope.dataBO.POTYPE);
		}

		
		$scope.save = function (record) {
			var pushData 			= {};
			pushData 				= record;
			pushData.MODIFIEDBY 	= $rootScope.user.USERID;
			pushData.PAYFROM 		= $rootScope.user.USERID;
			var error =	aswaValidationService.isPaymentValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
				pushData.DATE = utilityServices.dateOnly(record.DATE);
				if($scope.isEdit){
					paymentManagerServices.updatePayment(record).then(function(data){
						if(data.msg != ''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', data.error);
						}
					})
				}else{
					paymentManagerServices.addPayment(record).then(function(status){
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

	angular.module('aswa').controller('paymentManagerEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'paymentManagerServices', 'aswaValidationService', 'storageServices', 'getreferences', 'utilityServices', paymentManagerEditController]);



})();
