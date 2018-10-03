(function(){
  // create factory for header service to retun object in deffered way
  function utilityServices($rootScope,$http,$q){

    this.convertToSQL = function(inputdate){
      var convertDate = new Date(inputdate);
      var month = convertDate.getMonth()+1;
      var year = convertDate.getFullYear();
      var day = convertDate.getDate();
      var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
      return formattedDate;
    };

    this.clearSessionStorage = function(){
      for(key in sessionStorage){
        sessionStorage.removeItem(key);
      }
    };

    this.isEmpty = function(value){
      if(value == null || value == "" || value == undefined){
        return true;
      }else{
        return false;
      }
    };

    this.removeDuplicates = function(arr){
			var unique_array = []
			for(var i = 0;i < arr.length; i++){
				if(unique_array.indexOf(arr[i]) == -1){
					unique_array.push(arr[i])
				}
			}
			return unique_array;
		};

    // model with configuaration for form data handling
    this.closeModel = function(modalInstance, formName, title, message){
      if(formName){
          modalInstance.dismiss();
        }
    };

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
              config.buttonHandler = function(index){;
                if(index === 0){
                  modalInstance.dismiss();
                }
              };
             $rootScope.showConfirmationBox(config);
      }
    };

    // model with configuaration for form data handling
    this.confirmModelConfiguration = function(paramConfig){
      
        var config = {};
          config.title  = paramConfig.title || "confirmation Check";
          config.size = "md";
          config.body = paramConfig.message || "There are some changes in the form. Do you want to close..?";
          
          paramConfig.title = config.title;
          paramConfig.size=config.size;
          paramConfig.body= config.body;
      return paramConfig;
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
  angular.module("aswa").service('utilityServices',['$rootScope','$http','$q', utilityServices]);
})();
