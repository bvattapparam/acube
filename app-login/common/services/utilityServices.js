(function(){
  // create factory for header service to retun object in deffered way
  function utilityServices($rootScope,$http,$q){

    this.clearSessionStorage = function(){
      for(key in sessionStorage){
        sessionStorage.removeItem(key);
      }
    }

    // model with configuaration for form data handling
    this.closeModelConfiguration = function(modalInstance, formName, title, message){
      if(formName){
        if(formName.$dirty){
          var config = {};
              config.title  = title || "Confirmation Check";
              config.size = "md";
              config.body = message || "There are some changes in the form. Do you want to close..?";
              config.buttonHandler = function(index){
                if(index === 0){
                  modalInstance.dismiss();
                }
              };
             $rootScope.showConfirmationBox(config);
        }else{
          modalInstance.dismiss();
        }
      }else{
        var config = {};
              config.title  = title || "confirmation Check";
              config.size = "md";
              config.body = message || "There are some changes in the form. Do you want to close..?";
              config.buttonHandler = function(index){
                if(index === 0){
                  modalInstance.dismiss();
                }
              };
             $rootScope.showConfirmationBox(config);
      }
    };

    // model window with configuration
    this.openConfigModal = function($modal, config){
    	var keyboard = true;
    	if(config.disableEscape){
    		keyboard = false;
    	}
    	var animationsEnabled = true;
    	var modalInstance = $modal.open({
	      animation: animationsEnabled,
	      templateUrl: config.templateUrl,
	      controller: config.controller,
	      size: config.size,
	      backdrop:config.backdrop,
	      resolve: {
	      	passingValues:function(){
	      		var passingValues = angular.copy(config.passingValues);
            //console.log("MODAL", passingValues);
	      		return passingValues;
	      	}
	      }
	    });     

    	modalInstance.result.then(function (selectedItem) {
        // console.log("inside the callback" ,selectedItem);
		    config.callback('success', selectedItem);
		}, function (selectedItem) {
		      //$log.info('Modal dismissed at: ' + new Date());
          config.callback('error', selectedItem);
		});



    }


  }
  angular.module("paaplogin").service('utilityServices',['$rootScope','$http','$q', utilityServices]);
})();
