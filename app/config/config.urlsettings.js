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
		"customermanager.updateEstimateStatus"			: 	"../acube-services/customermanager/update/?action=update_estimate_status",
		"customermanager.addCustomer"					: 	"../acube-services/customermanager/add/",
		
		"marketingbasket.getCustomers"					: 	"../acube-services/marketingbasket/get/",
		"marketingbasket.updateMarketingBasket"			: 	"../acube-services/marketingbasket/update/",
		"marketingbasket.addMarketingBasket"			: 	"../acube-services/marketingbasket/add/",

		"estimatemanager.getEstimates"					: 	"../acube-services/estimatemanager/get/?action=get_estimates",
		"estimatemanager.getEstimateMaster"				: 	"../acube-services/estimatemanager/get/?action=get_estimate_master",
		"estimatemanager.getEstimateBasket"				: 	"../acube-services/estimatemanager/basket/get/?action=get_estimate_basket",
		"estimatemanager.getEstimateCount"				: 	"../acube-services/estimatemanager/get/?action=get_estimate_count",
		"estimatemanager.generateEstimate"				: 	"../acube-services/estimatemanager/generate/?action=generate_estimate",
		"estimatemanager.cloneEstimateMaster"			: 	"../acube-services/estimatemanager/generate/?action=clone_estimate_master",
		"estimatemanager.cloneUpdateEstimateMaster"		: 	"../acube-services/estimatemanager/generate/?action=clone_update_estimate_master",
		"estimatemanager.cloneEstimateBasket"			: 	"../acube-services/estimatemanager/generate/?action=clone_estimate_basket",
		"estimatemanager.addEstimateBasket"				: 	"../acube-services/estimatemanager/basket/add/",
		"estimatemanager.updateEstimateBasket"			: 	"../acube-services/estimatemanager/basket/update/",
		"estimatemanager.deleteEstimateBasketData"		: 	"../acube-services/estimatemanager/basket/delete/",

		"quotemanager.getQuoteCount"					: 	"../acube-services/quotemanager/get/?action=get_quote_count",
		"quotemanager.getQuotes"						: 	"../acube-services/quotemanager/get/?action=get_quotes",
		"quotemanager.getQuoteMaster"					: 	"../acube-services/quotemanager/get/?action=get_quote_master",
		"quotemanager.getQuoteBasket"					: 	"../acube-services/quotemanager/basket/get/?action=get_quote_basket",
		"quotemanager.cloneQuoteMaster"					: 	"../acube-services/quotemanager/generate/?action=clone_quote_master",
		"quotemanager.cloneUpdateQuoteMaster"			: 	"../acube-services/quotemanager/generate/?action=clone_update_quote_master",
		"quotemanager.cloneQuoteBasket"					: 	"../acube-services/quotemanager/generate/?action=clone_quote_basket",
		"quotemanager.addQuoteBasket"					: 	"../acube-services/quotemanager/basket/add/",
		"quotemanager.updateQuoteBasket"				: 	"../acube-services/quotemanager/basket/update/",
		"quotemanager.approveQuoteMaster"				: 	"../acube-services/quotemanager/update/?action=approve_quote_master",
		"quotemanager.deleteQuoteBasketData"			: 	"../acube-services/quotemanager/basket/delete/",
		
		"vendormanager.addVendor"						:	"../acube-services/vendormanager/add/",
		"vendormanager.getVendors"						:	"../acube-services/vendormanager/get/?action=get_vendors",
		"vendormanager.updateVendor"					: 	"../acube-services/vendormanager/update/?action=update_vendor"
	}

	angular.module('aswa').constant('urlsettings',urlsettings);
})();
