(function(){

	settingsEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, settingsServices, aswaValidationService, storageServices, getreferences, utilityServices){
		$scope.passingValues 				= 	{};
		$scope.isEdit 						= 	passingValues.isEdit;
		$scope.passingValues.title 			= 	passingValues.title;
		$scope.dataBO  						= 	{};
		$scope.reference					=	{};
		$scope.reference.referenceBO		= 	getreferences.references;
		$scope.MODE							=	passingValues.mode;

		if($scope.MODE === 'location'){
			//$scope.getShiftEditData(pushData);
		}
		
		if(passingValues.dataBO)
		{
			$scope.dataBO	= 	passingValues.dataBO;
		}

		$scope.loadReferences = function(){
			var deferred = $q.defer();
			$rootScope.showSpinner();
			getreferences.getReference('refresh').then(function(data){
				if(typeof data !== 'object'){
					$rootScope.showInfoBox(Messages['prompt.info.title'], Messages['prompt.label.referencenotloaded']);
				}
				deferred.resolve();
			}, function(data){
				console.log("ERROR ON LOADING REFERENCES...");
				deferred.reject();
			})["finally"](function(data){
				$rootScope.hideSpinner();
			});
			return deferred.promise;
		};
		
		$scope.saveLocation = function (record) {
			//console.log('SAVE PAY RECORD', record)
			var pushData 			= {};
			pushData 				= record;
			var error =	aswaValidationService.isLocationValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
					settingsServices.updateLocation(record).then(function(data){
						if(data.msg != ''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
							$scope.loadReferences();
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', data.error);
						}
					})
			}// check error close here
		};

		$scope.savePrefill = function (record) {
			//console.log('SAVE PAY RECORD', record)
			var pushData 			= {};
			pushData 				= record;
				$rootScope.showSpinner();
				if($scope.isEdit){
					settingsServices.updatePrefill(record).then(function(data){
						if(data.msg != ''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
							//$scope.loadReferences();
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', data.error);
						}
					})
				}else{
					settingsServices.addPrefill(record).then(function(data){
						if(data.msg != ''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.update.message'])
							//$scope.loadReferences();
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', data.error);
						}
					})
				}
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

	angular.module('aswa').controller('settingsEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'settingsServices', 'aswaValidationService', 'storageServices', 'getreferences', 'utilityServices', settingsEditController]);



})();
