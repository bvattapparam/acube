(function(){
	function i18n($rootScope){
		return function(key, defaultmsg){
			if(Messages && Messages[key]){
				return Messages[key];
			}
			if(defaultmsg){
				return defaultmsg;
			}
			return key;
		};
	}

	angular.module('i18nFilter',[]).filter('i18n',['$rootScope',i18n]);
})();
	 