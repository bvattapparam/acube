(function(){
	var Settings = {};
		Settings.rootScope={
			"EXCLUDE_GENERIC_STATUS_TWO_PENDING"	: 0,
			"EXCLUDE_GENERIC_STATUS_TWO_PAID"	: 1,
			"NOCUSTOMERMANAGERSTATUS"	:	0,
			"LOCATIONS":	"L1,L2,L3,L4,L5,L6,L7,L8,L9,L10,L11,L12,L13,L14,L15,L16,L17,L18,L19,L20,L21,L22,L23,L24,L25,L26,L27,L28,L29,L30,L31,L32,L33,L34,L35,L36,L37,L38,L39,L40,L41,L42,L43,L44,L45,L46,L47,L48,L49,L50,L51,L52,L53,L54,L55,L56,L57,L58,L59,L60",
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
			"SHOW_CUSTOMER_STATUS":['1','3'],
			"SHOW_PO_CUSTOMER_STATUS":['3'],

			"STATUS_CONFIRMED"	:	3,
			"STATUS_ACTIVE"	:	1,
			"date":"dd-MMM-yyyy",
			"currency":"",
			"appURL" : "http://localhost/acube/app/",
			//"appURL" : "http://acubeapp.in/app/",
			"build": " Build : V1.0 on 18-SEPTEMBER-2018"
		};
	angular.module('aswa').constant('settings',Settings);
})();
