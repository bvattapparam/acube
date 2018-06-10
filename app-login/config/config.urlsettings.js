(function(){
	var urlsettings = {
		"rent.getdata" 						: 	"../aswa-services/rent/?action=get_rent_data",
		"rent.updatedata"					:	"../aswa-services/rent/?action=put_rent_data",
		"rent.adddata"						:	"../aswa-services/rent/?action=push_rent_data",
		"rent.getll"						:	"../aswa-services/rent/?action=get_ll_data",
		"rent.getlandlorddetails"			:	"../aswa-services/rent/?action=get_ll_details&llcode",
		"rent.getrentdatabyll"				:	"../aswa-services/rent/?action=get_rent_data_by_ll&llcode",
		"gas.getdata"						:	"../aswa-services/gas/?action=get_gas_data",
		"gas.getagent"						:	"../aswa-services/gas/?action=get_agent_data",
		"dashboard.getiowe"					:	"../aswa-services/iowe/?action=get_iowe_data",
		"dashboard.getbr"					:	"../aswa-services/billreminders/?action=get_br_data",
		"dashboard.getgrandtotal"			:	"../aswa-services/grandtotal/?action=get_grandtotal_data",
		"dashboard.getksfedetails"			:	"../aswa-services/ksfe/?action=get_ksfe_data",
		"landlord.updatedata"				: 	"../aswa-services/rent/ll/llupdate/",
		"landlord.adddata"					: 	"../aswa-services/rent/ll/lladd/",
		"mobile.getmobile"					: 	"../aswa-services/mobile/get/",
		"medicalbill.getmedicalbill"		: 	"../aswa-services/medicalbill/get/",
		"medicalbill.adddata"				: 	"../aswa-services/medicalbill/add/",
		"medicalbill.updatedata"			: 	"../aswa-services/medicalbill/update/",
		"cart.getcart"						: 	"../aswa-services/cart/get/",
		"cart.adddata"						: 	"../aswa-services/cart/add/",
		"cart.updatedata"					: 	"../aswa-services/cart/update/",
		"reference.getreferencedata"		: 	"../aswa-services/references/get/"
	}

	angular.module('paaplogin').constant('urlsettings',urlsettings);
})();
