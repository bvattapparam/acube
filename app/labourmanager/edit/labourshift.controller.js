(function(){

	labourShiftEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, labourManagerServices, aswaValidationService, storageServices, getreferences, utilityServices){
		$scope.passingValues 				= 	{};
		$scope.isEdit 						= 	passingValues.isEdit;
		$scope.passingValues.title 			= 	passingValues.title;
		$scope.dataBO  						= 	{};
		$scope.reference					=	{};
		$scope.reference.referenceBO		= 	getreferences.references;

		$scope.reference.USER				=	passingValues.userBO;
		$scope.reference.CUSTOMER			=	passingValues.customerBO;

		if(passingValues.CUSTOMERID){
			$scope.CUSTOMERID					=	passingValues.CUSTOMERID;
		}
		if(passingValues.LABOURID){
			$scope.LABOURID					=	passingValues.LABOURID;
		}
		if(passingValues.WEEKID){
			$scope.WEEKID					=	passingValues.WEEKID;
		}
		if(passingValues.PERSHIFT){
			$scope.PERSHIFT					=	passingValues.PERSHIFT;
		}
		//console.log('Passing values', passingValues)

		$scope.shiftBO			=	[];

		var pushData	=	{};
		pushData.CUSTOMERID 		=	$scope.CUSTOMERID;
		pushData.LABOURID			=	$scope.LABOURID;
		pushData.WEEKID				=	$scope.WEEKID;
		$scope.MODE					=	passingValues.mode;

		$scope.getShiftEditData = function(pushData){
			//console.log('PUSHDATA ', pushData);
			$rootScope.showSpinner();
			labourManagerServices.getShiftEditData(pushData).then(function(data){
				if(data.msg!=''){
					
					$scope.shiftBO			=	data[0];
					//console.log('ShiftBO ', data)
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		if($scope.MODE === 'shiftpay'){
			$scope.getShiftEditData(pushData);
		}
		
		$scope.amountCal = function(shift, pershift){
			var totalAmount = (shift * pershift).toFixed(2);
			$scope.shiftBO.SALARY = totalAmount;
		};
		
		if(passingValues.dataBO)
		{
			$scope.dataBO	= 	passingValues.dataBO;
		}

		
		$scope.savePay = function (record) {
			//console.log('SAVE PAY RECORD', record)
			var pushData 			= {};
			pushData 				= record;
			pushData.MODIFIEDBY 	= $rootScope.user.USERID;
			var error =	aswaValidationService.isShiftPayValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
					labourManagerServices.updateShiftPay(record).then(function(data){
						if(data.msg != ''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', data.error);
						}
					})
			}// check error close here
		};
		$scope.saveLabour = function (record) {
			//console.log('SAVE PAY RECORD', record)
			var pushData 			= {};
			pushData 				= record;
			pushData.MODIFIEDBY 	= $rootScope.user.USERID;
			var error =	aswaValidationService.isLabourValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
					labourManagerServices.updateLabour(record).then(function(data){
						if(data.msg != ''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', data.error);
						}
					})
			}// check error close here
		};


		$scope.saveTMS = function (record) {
			//console.log('SAVE TMS RECORD', record)
			var pushData 					= 	{};
			pushData.MODIFIEDBY 			= 	$rootScope.user.USERID;
			pushData.TMS					=	[];
			var TOTALSHIFT 					= 	0;
			angular.forEach(record, function(val,key){
				var node 		= 	{};
				if(val.SHIFT == ""){
					node.SHIFT 		= 	"0";
				}else{
					node.SHIFT		=	val.SHIFT;
				}
				TOTALSHIFT += Number(node.SHIFT);
				node.ID 			=	val.ID;
				pushData.TMS.push(node);
			});
		
			pushData.CUSTOMERID 	= 	$scope.CUSTOMERID;
			pushData.WEEKID 		= 	$scope.WEEKID;
			pushData.LABOURID 		= 	$scope.LABOURID;
			var SALARY = $scope.PERSHIFT * TOTALSHIFT
			pushData.SALARY			=	SALARY;
			//console.log('Pushdata TMS RECORD', pushData)
				$rootScope.showSpinner();
					labourManagerServices.updateTMS(pushData).then(function(data){
						if(data.msg != ''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', data.error);
						}
					});
		};

		$scope.cancel = function (frm) {
			var title 		= 	Messages["edit.form.confirmation.title"];
			var message 	=	Messages["edit.form.confirmation.body"];
			utilityServices.closeModelConfiguration($modalInstance,frm,title,message);
		};
	}

	angular.module('aswa').controller('labourShiftEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'labourManagerServices', 'aswaValidationService', 'storageServices', 'getreferences', 'utilityServices', labourShiftEditController]);



})();
