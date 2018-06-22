(function(){
	var urlsettings = {
		"validationConfigService.getValidationConfig"	: 	"../validation/validator.json",
		"reference.getreferencedata"					: 	"../acube-services/references/get/",
		
		"myaccount.getUser"								: 	"../acube-services/myaccount/get/index.php?action=get_user_data&USERID",
		
		"usermanager.getUsers"							: 	"../acube-services/usermanager/get/",
		"usermanager.updateUser"						: 	"../acube-services/usermanager/update/?action=put_user_data",
		"usermanager.addUser"							: 	"../acube-services/usermanager/add/",

		"customermanager.getCustomers"					: 	"../acube-services/customermanager/get/?action=get_customers",
		"customermanager.getCustomer"					: 	"../acube-services/customermanager/get/?action=get_customer",
		"customermanager.updateCustomer"				: 	"../acube-services/customermanager/update/?action=put_customer_data",
		"customermanager.addCustomer"					: 	"../acube-services/customermanager/add/",
		
		"marketingbasket.getCustomers"					: 	"../acube-services/marketingbasket/get/",
		"marketingbasket.updateMarketingBasket"			: 	"../acube-services/marketingbasket/update/",
		"marketingbasket.addMarketingBasket"			: 	"../acube-services/marketingbasket/add/",

		"estimatemanager.getEstimates"					: 	"../acube-services/estimatemanager/get/?action=get_estimates",
		"estimatemanager.getEstimateMaster"				: 	"../acube-services/estimatemanager/get/?action=get_estimate_master",
		"estimatemanager.getEstimateBasket"				: 	"../acube-services/estimatemanager/basket/get/?action=get_estimate_basket",
		"estimatemanager.getEstimateCount"				: 	"../acube-services/estimatemanager/get/?action=get_estimate_count",
		"estimatemanager.generateEstimate"				: 	"../acube-services/estimatemanager/generate/",
		"estimatemanager.addEstimateBasket"				: 	"../acube-services/estimatemanager/basket/add/",
		"estimatemanager.deleteEstimateBasketData"		: 	"../acube-services/estimatemanager/basket/delete/"
	}

	angular.module('aswa').constant('urlsettings',urlsettings);
})();
