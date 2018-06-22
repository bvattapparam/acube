(function(){
	var Settings = {};
		Settings.rootScope={
			"EXCLUDE_GENERIC_STATUS_TWO_PENDING"	: 0,
			"EXCLUDE_GENERIC_STATUS_TWO_PAID"	: 1,
			travel_status:{
				"1":"status-active-bg",
				"2":"status-pending-bg",
				"3":"status-cancel-bg",
				"4":"status-pending-bg",
				"5":"status-refund-bg"
			},
			text_status:{
				"0":"status-cancel-text",
				"1":"status-active-text",
				"2":"status-cancel-text",
				"3":"status-pending-text"
			},
			status_billreminder:{
				"0":"status-cancel-text",
				"1":"status-active-text"
			},
			ll_icons:{
				"1":"fa fa-building-o",
				"2":"fa fa-male",
				"3":"fa fa-female",
				"V1":"fa fa-user"
			},
			rent_status:{
				"1":"status-active-bg",
				"2":"status-cancel-bg",
				"3":"status-pending-bg",
				"4":"status-refund-bg"
			},
			rent_receipt:{
				"1":"status-active-text",
				"0":"status-pending-text"
			},
			generic_status:{
				"1":"status-active-text",
				"0":"status-cancel-text"
			},
			"CARMODULE_FUEL" : "CM1",
			"CARMODULE_OTHERS" : "CM3",
			"CARMODULE_SERVICE" : "CM2",
			"CARMODULE_INSURANCE" : "CM4",
			"date":"dd-MMM-yyyy",
			"currency":"₹",
			"appURL" : "http://localhost/acube/app/",
			"build": " Build : V1.0 on 01-JUNE-2018"
		};
	angular.module('aswa').constant('settings',Settings);
})();
