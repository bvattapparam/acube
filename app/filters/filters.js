

	var aswaFilters = angular.module('aswaFilters',[]);

	 function aswaDate($filter,settings){
		return function(date){
			if(date){
				if(date != '0000-00-00'){
					return $filter('date')(date,settings.rootScope.date);
				}else{
					return '';
				}
			}
			return date;
		};
	}

	function aswaCurrency($filter,settings){
		return function(currency){
			if(currency){
				return $filter("currency")(currency,settings.rootScope.currency);
				//console.log(currency);
			}
			return currency;
		}
	}

// filter for pagination

function pagination(){
	return function(input, start){
		if(input){
			start = +start;
			return input.slice(start);
		}
		return input;
	}
}

// reverseCode to get data from reference
function reverseCode(){
	return function(code, data, codeKey, valueKey){
		if(code != null && code != undefined && data){
			var i	=	0;
			var item	=	{};
			if(!codeKey){
				codeKey	=	'code';
			}
			if(!valueKey){
				valueKey	=	'name';
			}
			for(i=0; i<data.length;i++){
				item	=	data[i];
				if(item[codeKey]	==	code){
					return item[valueKey];
				}
			}
			return code;
		}
		return code;
	}
}

// filter to format the string from backend

function formatString(){

	return function(formattedString){
			//console.log("formattedString121", formattedString);
		if(formattedString){
			return formattedString.split('\n').join('<br>');
		}
		return formattedString;
	};
};

aswaFilters.filter('aswaDate',['$filter','settings',aswaDate]);
aswaFilters.filter('aswaCurrency',['$filter','settings', aswaCurrency]);
aswaFilters.filter('pagination', pagination);
aswaFilters.filter('reverseCode', reverseCode);
aswaFilters.filter('formatString', formatString);
