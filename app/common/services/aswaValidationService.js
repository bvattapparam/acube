(function(){
  // create factory for header service to retun object in deffered way
  function aswaValidationService($rootScope,$http,$q, $filter, utilityServices, urlsettings, validationConfigService, form){
    
  this.uiConfig = {};
  var icon = "fa-hand-o-right";


  this.isLoginValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.login, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  }



  // VALIDATE TRAVEL MODULE...
  this.isUserValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.user, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };



  // VALIDATE TRAVEL MODULE...
  this.isUserManagerValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.usermanager, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };

   this.isCustomerManagerValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.customermanager, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    if(reqBO.STATUS == "3" && reqBO.QUOTEAPPROVED !== '1') {
      message   = message + "<li><i class='fa "+ icon +"'></i> " +Messages['validation.customerstatus.confimred'] + "</li>";
      flag  = true;
      
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };
  this.isVendorManagerValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.vendormanager, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };
  
  this.isPaymentValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.paymentmanager, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    if(reqBO.POTYPE === 'PREXP'){
      if(typeof reqBO.CUSTOMERID == 'undefined' || reqBO.CUSTOMERID == ''){
        message = message + "<li><i class='fa "+ icon +"'></i> Customer is mandatory. </li>";
      }
    }
    message   = message + "</ul>";

    
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };

  
  this.isEstimateBasketValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.estimatebasket, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };
  this.isQuoteBasketValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.quotebasket, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };



  this.isMarketingBasketValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.marketingbasket, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };

  this.isPOBasketValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.pobasket, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };
  
  this.isOPEXPBasketValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.opexpbasket, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };
  this.isCustomerPayManagerValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.customerpay, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };

  this.isCustomerNoteValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.customernote, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };

  this.isLabourTMSValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.labourtms, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    
    if(typeof reqBO.ITEMTMS === 'undefined'){
      flag  = true;
      message   = message + "<li><i class='fa "+ icon +"'></i> " + Messages['validation.shift'] + "</li>";
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };
  
  this.isShiftPayValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.shiftpay, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    if(reqBO.PERSHIFT == '0'){
      flag  = true;
      message   = message + "<li><i class='fa "+ icon +"'></i> " + Messages['validation.pershift'] + "</li>";
    }
    if(reqBO.SALARY == '0'){
      flag  = true;
      message   = message + "<li><i class='fa "+ icon +"'></i> " + Messages['validation.salary'] + "</li>";
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };
  
  this.isLabourValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.labour, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };
  this.isLocationValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.acube.location, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  };
  //
  // VALIDATE INSURANCE TRANSACTION MODULE ...

  // VALIDATION FOR INSURANCE TRANSACTION
  this.isInsuranceTrnxValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.paap.insurance.transaction, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  }


  // VALIDATION FOR CAR MODULE SEARCH
  this.isCarmanagerShowModule  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.paap.carmanager.searchmodule, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  }

 // VALIDATION FOR CAR MODULE SEARCH
  this.isCarmanagerShowCar = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.paap.carmanager.searchcar, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  }
 
// VALIDATION FOR OTHERS DATA ADD / EDIT
  this.isOthersDataValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.paap.carmanager.others, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  }

// VALIDATION FOR FUEL DATA ADD / EDIT
  this.isFuelDataValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.paap.carmanager.fuel, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  }

// VALIDATION FOR FUEL DATA ADD / EDIT
  this.isServiceDataValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.paap.carmanager.service, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  }

  // VALIDATION FOR INSURANCE MASTER DATA ADD / EDIT
  this.isInsuranceValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.paap.insurance.master, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  }

// VALIDATION FOR MEDICALBILL DATA ADD / EDIT
  this.isMedicalbillValid  = function(reqBO){
    var message   = "<p class='uppercase'>" + Messages['validation.header'] + "</p> <ul>";
    var flag      = false;

    var errorMessages = validationConfigService.validateReqBO(reqBO, validationConfigService.cache.getValidationConfig.paap.medicalbill, form);

    if(errorMessages.length > 0){
      flag  = true;
      for(var i=0; i < errorMessages.length; i++){
        message   = message + "<li><i class='fa "+ icon +"'></i> " + errorMessages[i] + "</li>";
      }
    }
    message   = message + "</ul>";
    if(flag){
      return message;
    }else {
      return false;
    }
    return message;
  }

/*


    // Validate landlord
    this.isLandlordValid  = function(param){
      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof param === 'undefined'){
        message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.field.notempty'] +"</li>";
        flag  = false;
      }
      if(typeof param !== 'undefined'){
        if(!param.dop){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.ll.field.dop'] +"</li>";
          flag  = false;
        }
       
        if(!param.pan){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.ll.field.pan'] +"</li>";
          flag  = false;
        }
        if(!param.advance){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.ll.field.advance'] +"</li>";
          flag  = false;
        }
        if(!param.name){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.ll.field.name'] +"</li>";
          flag  = false;
        }
        if(!param.status){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.ll.field.status'] +"</li>";
          flag  = false;
        }
        if(!param.contact){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.ll.field.contact'] +"</li>";
          flag  = false;
        }
        if(!param.address){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.ll.field.address'] +"</li>";
          flag  = false;
        }
        if(!param.comment){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.ll.field.comment'] +"</li>";
          flag  = false;
        }
      }
      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }

    // Login validation
    this.isLoginValid  = function(loginBo){
      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof loginBo === 'undefined'){
        message = message + "<li><i class='fa "+ icon +"'></i> Fields should not be empty</li>";
        flag  = false;
      }
      if(typeof loginBo !== 'undefined'){
        if(!loginBo.passkey){
          message = message + "<li><i class='fa "+ icon +"'></i> Please enter Passkey</li>";
          flag  = false;
        }
      }
      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }

      // Mobile validation
    this.isMobileValid  = function(mobileBO){

      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof mobileBO === 'undefined'){
         message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.field.notempty'] +"</li>";
        flag  = false;
      }
       console.log("reached 123", mobileBO);
      if(typeof mobileBO !== 'undefined'){
        if(!mobileBO.month){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.mobile.field.month'] +"</li>";
          flag  = false;
        }
        if(!mobileBO.amount){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.mobile.field.amount'] +"</li>";
          flag  = false;
        }
        if(!mobileBO.billno){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.mobile.field.billno'] +"</li>";
          flag  = false;
        }
        if(!mobileBO.user){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.mobile.field.user'] +"</li>";
          flag  = false;
        }
        if(!mobileBO.comment){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.mobile.field.comment'] +"</li>";
          flag  = false;
        }
      }


      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }

     // Medical bill validation
    this.isMedicalbillValid  = function(paramBO){

      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof paramBO === 'undefined'){
         message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.field.notempty'] +"</li>";
        flag  = false;
      }
       console.log("reached 123", paramBO);
      if(typeof paramBO !== 'undefined'){
        if(!paramBO.billmonth){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.mdeicalbill.field.month'] +"</li>";
          flag  = false;
        }
        if(!paramBO.amount){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.medicalbill.field.amount'] +"</li>";
          flag  = false;
        }
        if(!paramBO.billno){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.medicalbill.field.billno'] +"</li>";
          flag  = false;
        }
        if(!paramBO.user){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.medicalbill.field.user'] +"</li>";
          flag  = false;
        }
       
      }


      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }

    // Cart Validation

    // Medical bill validation
    this.isCartValid  = function(paramBO){

      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof paramBO === 'undefined'){
         message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.field.notempty'] +"</li>";
        flag  = false;
      }
       console.log("reached 123", paramBO);
      if(typeof paramBO !== 'undefined'){
        if(!paramBO.orderdate){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.cart.field.orderdate'] +"</li>";
          flag  = false;
        }
        
        if(!paramBO.cart){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.cart.field.cart'] +"</li>";
          flag  = false;
        }
        if(!paramBO.item){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.cart.field.item'] +"</li>";
          flag  = false;
        }
        if(!paramBO.status){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.cart.field.status'] +"</li>";
          flag  = false;
        }
        if(!paramBO.amount){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.cart.field.amount'] +"</li>";
          flag  = false;
        }
        if(!paramBO.ordernum){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.cart.field.ordernum'] +"</li>";
          flag  = false;
        }
       
      }

      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }




    // Bill reminder validation
    this.isBRValid  = function(brBO){
      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof brBO === 'undefined'){
        message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.field.notempty'] +"</li>";
        flag  = false;
      }
      if(typeof brBO !== 'undefined'){
        if(!brBO.item){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.br.field.item'] +"</li>";
          flag  = false;
        }
        if(!brBO.amount){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.br.field.amount'] +"</li>";
          flag  = false;
        }
        if(!brBO.billdate){
          message = message + "<li><i class='fa "+ icon +"'></i>  "+ Messages['validation.br.field.billdate'] +"</li>";
          flag  = false;
        }
        if(!brBO.status){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.br.field.status'] +"</li>";
          flag  = false;
        }
      }
      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }

    //isIOWEValid
    this.isIOWEValid  = function(valueBO){
      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof valueBO === 'undefined'){
        message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.field.notempty'] +"</li>";
        flag  = false;
      }
      if(typeof valueBO !== 'undefined'){
        if(!valueBO.contact){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.iowe.field.contact'] +"</li>";
          flag  = false;
        }
        if(!valueBO.amount){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.iowe.field.amount'] +"</li>";
          flag  = false;
        }
        if(!valueBO.date_owe){
          message = message + "<li><i class='fa "+ icon +"'></i>  "+ Messages['validation.iowe.field.owedate'] +"</li>";
          flag  = false;
        }
        if(!valueBO.status){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.iowe.field.status'] +"</li>";
          flag  = false;
        }
        if(!valueBO.category){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.iowe.field.category'] +"</li>";
          flag  = false;
        }
      }
      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }

    // VALIDATION FOR FLAT STATIC PAYMENT...
     this.isFlatStaticPaymentValid  = function(valueBO){
      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof valueBO === 'undefined'){
        message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.field.notempty'] +"</li>";
        flag  = false;
      }
      if(typeof valueBO !== 'undefined'){
        if(!valueBO.PAID_DATE){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.flat.field.paiddate'] +"</li>";
          flag  = false;
        }
        if(!valueBO.AMOUNT){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.flat.field.amount'] +"</li>";
          flag  = false;
        }
        if(!valueBO.MODE){
          message = message + "<li><i class='fa "+ icon +"'></i>  "+ Messages['validation.flat.field.paymentmmode'] +"</li>";
          flag  = false;
        }
        if(!valueBO.PURPOSE){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.flat.field.purpose'] +"</li>";
          flag  = false;
        }
       
      }
      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }
    //
    // VALIDATION FOR CAR MODULE SEARCH...
     this.isCarmanagerShowModule  = function(valueBO){
      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof valueBO === 'undefined'){
        message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.field.notempty'] +"</li>";
        flag  = false;
      }
      if(typeof valueBO != 'undefined'){
        if(!valueBO.car){
          message = message + "<li><i class='fa "+ icon +"'></i>  "+ Messages['validation.carmanager.searchfield.car'] +"</li>";
          flag  = false;
        }
        if(!valueBO.carModuleType){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.carmanager.searchfield.carModuleType'] +"</li>";
          flag  = false;
        }
       
      }
      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }
    // VALIDATION FOR FULE DATA ADD / EDIT
    this.isFuelDataValid  = function(valueBO){
      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof valueBO === 'undefined'){
        message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.field.notempty'] +"</li>";
        flag  = false;
      }
      if(typeof valueBO != 'undefined'){
        if(!valueBO.FILLED_DATE){
          message = message + "<li><i class='fa "+ icon +"'></i>  "+ Messages['validation.carmanager.fuel.filleddate'] +"</li>";
          flag  = false;
        }
        if(!valueBO.CAR){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.carmanager.fuel.car'] +"</li>";
          flag  = false;
        }
        if(!valueBO.AMOUNT){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.carmanager.fuel.amount'] +"</li>";
          flag  = false;
        }
       
      }
      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }

    // VALIDATION FOR SERVICE DATA ADD / EDIT
    this.isServiceDataValid  = function(valueBO){
      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof valueBO === 'undefined'){
        message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.field.notempty'] +"</li>";
        flag  = false;
      }
      if(typeof valueBO != 'undefined'){
        if(!valueBO.DATE){
          message = message + "<li><i class='fa "+ icon +"'></i>  "+ Messages['validation.carmanager.service.date'] +"</li>";
          flag  = false;
        }
        if(!valueBO.CAR){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.carmanager.fuel.car'] +"</li>";
          flag  = false;
        }
        if(!valueBO.SERVICE_STATION){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.carmanager.service.servicestation'] +"</li>";
          flag  = false;
        }
        if(!valueBO.AMOUNT){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.carmanager.fuel.amount'] +"</li>";
          flag  = false;
        }
       
      }
      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }
    
      // VALIDATION FOR OTHERS DATA ADD / EDIT
    this.isOthersDataValid  = function(valueBO){
      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof valueBO === 'undefined'){
        message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.field.notempty'] +"</li>";
        flag  = false;
      }
      if(typeof valueBO != 'undefined'){
        if(!valueBO.DATE){
          message = message + "<li><i class='fa "+ icon +"'></i>  "+ Messages['validation.carmanager.service.date'] +"</li>";
          flag  = false;
        }
        if(!valueBO.CAR){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.carmanager.fuel.car'] +"</li>";
          flag  = false;
        }
        if(!valueBO.ITEM){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.carmanager.others.item'] +"</li>";
          flag  = false;
        }
        if(!valueBO.AMOUNT){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.carmanager.fuel.amount'] +"</li>";
          flag  = false;
        }
       
      }
      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }

     // VALIDATION FOR INSURANCE MASTER
    this.isInsuranceValid  = function(valueBO){
      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof valueBO === 'undefined'){
        message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.field.notempty'] +"</li>";
        flag  = false;
      }
      if(typeof valueBO != 'undefined'){
        if(!valueBO.NAME){
          message = message + "<li><i class='fa "+ icon +"'></i>  "+ Messages['validation.insurance.name'] +"</li>";
          flag  = false;
        }
        if(!valueBO.POLICYNO){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.insurance.policyno'] +"</li>";
          flag  = false;
        }
        if(!valueBO.POLICY_TYPE){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.insurance.policytype'] +"</li>";
          flag  = false;
        }
        if(!valueBO.SUM_ASSURED){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.insurance.sumassured'] +"</li>";
          flag  = false;
        }
        if(!valueBO.START_DATE){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.insurance.startdate'] +"</li>";
          flag  = false;
        }
        if(!valueBO.MATURITY_DATE){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.insurance.maturitydate'] +"</li>";
          flag  = false;
        }
        if(!valueBO.PREMIUM){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.insurance.premium'] +"</li>";
          flag  = false;
        }
        if(!valueBO.NOMINEE){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.insurance.nominee'] +"</li>";
          flag  = false;
        }
        if(!valueBO.NOMINEE_RELATIONSHIP){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.insurance.nomineerelationship'] +"</li>";
          flag  = false;
        }
       
      }
      message = message + "</ul>";
      if(flag){
        return false;
      }else{
        return message;
      }
    }
*/
    

  }
  angular.module("aswa").service('aswaValidationService',['$rootScope','$http','$q','$filter', 'utilityServices', 'urlsettings', 'validationConfigService', aswaValidationService]);
})();
