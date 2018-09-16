(function(){

	quoteSortOrderController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, quoteManagerServices, settingsServices, aswaValidationService, storageServices, getreferences, utilityServices){
		$scope.passingValues 				= 	{};
		$scope.isEdit 						= 	passingValues.isEdit;
		$scope.passingValues.title 			= 	passingValues.title;
		$scope.dataBO  						= 	{};
        $scope.reference					=	{};
        $scope.referenceData                =   {};
        $scope.reference.referenceBO		= 	getreferences.references;
        
        $scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	:	getreferences.referencesData.CUSTOMERTYPE,
			"LOCATION"		:	getreferences.referencesData.LOCATION
		};
		
		if(passingValues.dataBO)
		{
			$scope.dataBO	 					= 	passingValues.dataBO;
        }

        var manipulate_Sorting_location = function(data){
            var param =  data.toString();
            $scope.LOCATIONSORTORDER = param.split(',');

            $scope.SORTING_DATA = [];
            angular.forEach($scope.LOCATIONSORTORDER,function(val, key){
                $scope.SORTING_DATA.push({'LOCATION':val, 'NAME': $scope.referenceData.referencesDataMap.LOCATION[val]})
            })
            var tmpList = $scope.SORTING_DATA;
            $scope.list = tmpList;
            $scope.sortingLog = [];
            $scope.sortableOptions = {
                handle: '> .myHandle',
                update: function(e, ui) {
                var logEntry = tmpList.map(function(i){
                    return i.value;
                }).join(', ');
                $scope.sortingLog.push('Update: ' + logEntry);
                },
                stop: function(e, ui) {
                // this callback has the changed model
                var logEntry = tmpList.map(function(i){
                    return i.value;
                }).join(', ');
                $scope.sortingLog.push('Stop: ' + logEntry);
                }
            };
        }

        $scope.getLocations = function(){
			$rootScope.showSpinner();
			settingsServices.getLocations().then(function(data){
				if(data.msg!=''){
					$scope.locationsBO	=	[];
                    $scope.locationsBO 	= 	data;
                    console.log('DATA ', data)
                    $scope.location_Sort_Order = [];
                    angular.forEach(data, function(val, key){
                        $scope.location_Sort_Order.push(val.CODE);
                    })
                    console.log('ready one  ', $scope.location_Sort_Order)
                    manipulate_Sorting_location($scope.location_Sort_Order);
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
        };
        
        if($scope.dataBO[0].SORTORDER != null ){
            if($scope.dataBO[0].SORTORDER.length > 0 )
            {
                $scope.location_Sort_Order = $scope.dataBO[0].SORTORDER;
                manipulate_Sorting_location($scope.location_Sort_Order);
            }else{
                $scope.getLocations();
            }
        }else{
            $scope.getLocations();
        }
		
		$scope.save = function (record) {
            console.log('LOCATION RESORTED : ', record)
            var sorting_list = [];
            angular.forEach(record, function(val, key){
                sorting_list.push(val.LOCATION);
            })
            var SORTORDER = sorting_list.toString();
			var pushData = {};
			pushData.SORTORDER = SORTORDER;
            pushData.MODIFIEDBY = $rootScope.user.USERID;
            pushData.QUOTEID = $scope.dataBO[0].QUOTEID;
            console.log('PUSH DATA ', pushData)
            $rootScope.showSpinner();
                settingsServices.quoteSortOrder(pushData).then(function(data){
                    if(data.msg != ''){
                        $rootScope.hideSpinner();
                        $rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
                        $modalInstance.close();
                    }else {
                        $rootScope.hideSpinner();
                        $rootScope.showErrorBox('error', data.error);
                    }
                })
		};

		$scope.cancel = function (record) {
			var title 		= 	Messages["edit.form.confirmation.title"];
			var message 	=	Messages["edit.form.confirmation.body"];
			//utilityServices.closeModelConfiguration($modalInstance,frm,title,message);
			$modalInstance.dismiss(record);
		};
	}

	angular.module('aswa').controller('quoteSortOrderController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'quoteManagerServices', 'settingsServices', 'aswaValidationService', 'storageServices', 'getreferences', 'utilityServices', quoteSortOrderController]);



})();
