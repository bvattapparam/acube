(function(){
	var Settings = {};
		Settings.rootScope={
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
			"date":"dd-MMM-yyyy",
			"currency":"₹ "
		};
	angular.module('paaplogin').constant('settings',Settings);
})();
