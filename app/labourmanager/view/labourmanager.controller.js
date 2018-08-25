(function(){

	function labourManagerController($location, $routeParams, $window, $scope, $rootScope, $modal, $filter, settings, labourManagerServices, userManagerServices, customerManagerServices, utilityServices, storageServices, getreferences, aswaValidationService, $http, mainServices){

		$scope.quoteManager 					=	{};
		$scope.quoteManagerBO	=	[];

		$scope.customerManager 					=	{};
		$scope.reference						=	{};
		$scope.referenceData					=	{};
		$scope.showDropdown						= 	false;
		$scope.tdSpacer 						=	true;
		$scope.dataBO 							= 	{};

		$scope.reference.CUSTOMER 		=	[];
		$scope.reference.CUSTOMERREF 	=	[];
		$scope.reference.USER	 		=	[];
		$scope.referenceData.referencesDataMap 	= {
			"CUSTOMERTYPE" 	: getreferences.referencesData.CUSTOMERTYPE
		};
		if($routeParams.CVIEW == 'cview')
		{
			$scope.showDropdown		= 	true;
		}else{
			$scope.showDropdown		= 	false;
		}
		$scope.dataBO.CUSTOMERID   = $routeParams.CUSTOMERID;
		//if($scope.dataBO.WEEKID)

		// MONTH AND YEAR ONLY
		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();
		$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
			$scope.opened = true;
		};
		$scope.dateOptions = {
			'year-format': "'yy'",
			'starting-day': 1,
			'datepicker-mode':"'month'",
			'min-mode':"month"
		  };
// END HERE...
	$scope.fillWeeks = function(MONTHYEAR){
		const MONTH		=	MONTHYEAR.getMonth();
		const YEAR		=	MONTHYEAR.getFullYear();
		var numWeeks = getWeeks(MONTH, YEAR);
		$scope.getWeeks = [];
		angular.forEach(numWeeks, function(val, key){
			var node 	=	{};
			node.code = val.WEEKID + "DATE" + val.STARTDATE + "DATE" + val.ENDDATE;
			node.name = val.WEEKID;
			$scope.getWeeks.push(node);
		});
	};


	var getWeeks = function(month, year){
		var WEEKS 				= 	[];
		var FD 					= 	new Date(year,month,1);
		var LD 					= 	new Date(year, month+1,0);
		var MONTH				=	FD.getMonth()+1;
		
		if(MONTH < 10){ MONTH = '0' + MONTH;}
		var NUMDAYS = LD.getDate();
		var start = 1;
		var end = 7-FD.getDay();
		var WEEKID = 1;
		const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN","JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
		
		while(start <= NUMDAYS){
			const STARTDATE = year + "-" + MONTH + "-" + (start < 10 ? '0' + start : start);
			const ENDDATE = year + "-" + MONTH + "-" + (end < 10 ? '0' + end : end);
			WEEKS.push({WEEKID:'WEEK' + WEEKID + '_' + monthNames[FD.getMonth()] + '_' + year,STARTDATE:STARTDATE,ENDDATE:ENDDATE});
			start = end + 1;
			end = end + 7;
			if(end > NUMDAYS){
				end = NUMDAYS;
			}
			WEEKID++;
		}
		return WEEKS;
	};

	var formatDate= function( date ) {
		const fDate = new Date(date);
		return fDate.getFullYear() + "-" + (fDate.getMonth()+1) + "-" + fDate.getDate();
	}

	$scope.getDates = function(dates){
		//console.log('DATES......', dates)
		var res = dates.split("DATE");
		const _startDate = res[1];
		const _endDate = res[2];
		var wd = [_startDate , _endDate];
		start = new Date(wd[0]);
		end = new Date(wd[1]);

		arr = new Array();
		dt = new Date(start);

		while(dt <= end){
			arr.push(formatDate(dt));
			dt.setDate(dt.getDate()+1);
		}
		$scope.arr = arr;
		$scope.arrTMS = [];
		
		angular.forEach($scope.arr, function(value, key){
			$scope.arrTMS.push({ITEMDATE:value,ITEMTMS:0});
		});
		if($scope.arrTMS.length > 0){
			$scope.tdSpacer = false;
		}else{
			$scope.tdSpacer = true;
		}
		//console.log('DATES......', $scope.arrTMS)
	};
		
	

	$scope.getCustomers = function(){
		var pushdata				=	{};
		pushdata.statusfilters		=	$rootScope.settings.SHOW_PO_CUSTOMER_STATUS;
		pushdata.filterstatus		=	true;
		pushdata.pagenation			=	false;
		$rootScope.showSpinner();
		customerManagerServices.getCustomers(pushdata).then(function(data){
			if(data.msg!=''){
				$scope.customerManagerBO	=	[];
				$scope.customerManagerBO	=	data[0].ITEM;

				// CREATE NEW REFERENCE FOR CUSTOMER..
					for(var i=0; i<$scope.customerManagerBO.length; i++){
						var node 	=	{};
						node.code 	= 	$scope.customerManagerBO[i].CUSTOMERID;
						node.name	=	$scope.customerManagerBO[i].CUSTOMERID + " ( " + $scope.customerManagerBO[i].FULLNAME + " )";
						$scope.reference.CUSTOMER.push(node);
					}

				$rootScope.hideSpinner();
			}else{
				$rootScope.hideSpinner();
				$rootScope.showErrorBox('Error', data.error);
			}
			
		});
	};
	$scope.getCustomers();

	$scope.getLabourTMSFull = function(CUSTOMERID){
		$rootScope.showSpinner();
		var pushData   = {};
		pushData.CUSTOMERID		=	CUSTOMERID;//$scope.dataBO.CUSTOMERID;
		labourManagerServices.getLabourTMSFull(pushData).then(function(data){
			if(data.msg!=''){
				$scope.laboursTMSList			=	[];
				$scope.laboursTMSList			=	data;
				//console.log('LABOUT TMS DATA....: ', data)
				$rootScope.hideSpinner();
			}else{
				$rootScope.hideSpinner();
				$rootScope.showErrorBox('Error', data.error);
			}
			
		});
	};
	$scope.getLabourTMSFull($scope.dataBO.CUSTOMERID);

	
	$scope.editShiftPay = function (LABOUR, WEEKID) {
		var config= {};
		config.templateUrl = '../app/labourmanager/edit/labourshift.pay.html';
		config.controller = 'labourShiftEditController';
		config.size		= 'sm';
		config.backdrop	= 'static';
		config.passingValues = {};
		config.passingValues.title = Messages['labourmanager.editshift'];
		config.passingValues.CUSTOMERID = $scope.dataBO.CUSTOMERID;
		config.passingValues.LABOURID = LABOUR;
		config.passingValues.WEEKID = WEEKID;
		config.passingValues.isEdit = true;
		config.passingValues.mode = 'shiftpay';
		config.callback = function(status, item){
			if(status === 'success') {
				$scope.getLabourTMSFull($scope.dataBO.CUSTOMERID);
			}
		}
		utilityServices.openConfigModal($modal, config);
	};

	$scope.editBasket = function (data, WEEKID) {
		//console.log('EDIT BASKED:.... ', data)
		var config= {};
		config.templateUrl = '../app/labourmanager/edit/labourshift.pay.html';
		config.controller = 'labourShiftEditController';
		config.size		= 'lg';
		config.backdrop	= 'static';
		config.passingValues = {};
		config.passingValues.title = Messages['labourmanager.editshift'];
		config.passingValues.CUSTOMERID = $scope.dataBO.CUSTOMERID;
		config.passingValues.isEdit = true;
		config.passingValues.dataBO = data;
		config.passingValues.mode = 'tms';
		config.passingValues.WEEKID = WEEKID;
		config.passingValues.LABOURID = data.LABOUR;
		config.passingValues.PERSHIFT = data.PERSHIFT;

		config.callback = function(status, item){
			if(status === 'success') {
				$scope.getLabourTMSFull($scope.dataBO.CUSTOMERID);
			}
		}
		utilityServices.openConfigModal($modal, config);
	};

	

	$scope.refresh	=	function(){
		$scope.getLabourTMSFull($scope.dataBO.CUSTOMERID);
	};

	$scope.jsonConcat = function(o1, o2){
		for(var key in o2){
			o1[key] = o2[key];
		}
		return o1;
	};
	$scope.compareJSON = function(obj1, obj2){
		var ret = {};
		for(var i in obj1){
			if(!obj2.hasOwnProperty(i)){
				ret[i] = obj1[i];
			}
		}
		var op = {};
		op = $scope.jsonConcat(op, obj2)
		op = $scope.jsonConcat(op, ret)
		//console.log('OBJ : ', op);
		return op;
		
	};
		
		$scope.save = function(data, tms){
			//console.log("SAVE SHIFT (MAIN)....", data, tms)
			var error =	aswaValidationService.isLabourTMSValid(data);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$rootScope.showSpinner();
				var WEEK_ID				=		data.WEEKID.substring(0, data.WEEKID.indexOf('DATE'));
				var pushData 			= 		{};
				pushData.LABOURID 		=		data.LABOURID;
				pushData.WEEKID			=		WEEK_ID;
				pushData.CUSTOMERID		=		$scope.dataBO.CUSTOMERID;
				pushData.MODIFIEDBY 	= 		$rootScope.user.USERID;
				pushData.SHIFTS		= 		[];

				// FORMAT THE DATA TMS AS PER TMS
				$scope.referencesData  = {};
				angular.forEach(tms, function(val, key){
					var length  = tms.length-1;
					$scope.referencesData['obj1'] = {};
					for(var i = length; i>=0;i--){
						$scope.referencesData['obj1'][tms[i]["ITEMDATE"]] = String(tms[i]["ITEMTMS"]);
					}
				});
				$scope.referencesData['obj2'] = {};
				$scope.referencesData['obj2'] = data.ITEMTMS;
				var conObjs = $scope.compareJSON($scope.referencesData['obj1'], $scope.referencesData['obj2']);
				data.ITEMTMS = conObjs;

                angular.forEach(data.ITEMTMS, function(val,key){
					var node 		= 	{};
					node.WORKDATE 	= 	key;
					if(val == ""){
						node.SHIFT 		= 	"0";
					}else{
						node.SHIFT 		= 	val;
					}
					pushData.SHIFTS.push(node);
				});
				//console.log("MAIN SAVE PUSHDATA", pushData)
				labourManagerServices.addShift(pushData).then(function(data){
					if(data.msg!=''){
						$rootScope.hideSpinner();
						$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message'])
						$scope.getLabourTMSFull($scope.dataBO.CUSTOMERID);
						$scope.dataBO = {};
						$scope.dataBO.CUSTOMERID   = pushData.CUSTOMERID;
					}else {
						$rootScope.hideSpinner();
						$rootScope.showErrorBox('error', Messages[data.errorid]);
						$scope.dataBO = {};
						$scope.dataBO.CUSTOMERID   = pushData.CUSTOMERID;
					}
				})
			}
		}
	}

	angular.module('aswa').controller('labourManagerController',['$location', '$routeParams', '$window', '$scope', '$rootScope', '$modal', '$filter', 'settings', 'labourManagerServices', 'userManagerServices', 'customerManagerServices', 'utilityServices', 'storageServices', 'getreferences', 'aswaValidationService', '$http', 'mainServices', labourManagerController]);
})();
