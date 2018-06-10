(function(){
  // create factory for header service to retun object in deffered way
  function aswaValidationService($rootScope,$http,$q){
    this.isTravelValid  = function(travelBO){
      var flag  = true;
      var icon = "fa-hand-o-right";
      var message ="<ul>";
      if(typeof travelBO === 'undefined'){
        message = message + "<li><i class='fa "+ icon +"'></i> Fields should not be empty</li>";
        flag  = false;
      }
      if(typeof travelBO !== 'undefined'){
        if(!travelBO.source){
          message = message + "<li><i class='fa "+ icon +"'></i> Travel source is mandatory</li>";
          flag  = false;
        }
        if(!travelBO.destination){
          message = message + "<li><i class='fa "+ icon +"'></i> Travel destination is mandatory</li>";
          flag  = false;
        }
        if(!travelBO.traveldate){
          message = message + "<li><i class='fa "+ icon +"'></i> Travel date is mandatory</li>";
          flag  = false;
        }
        if(!travelBO.bookeddate){
          message = message + "<li><i class='fa "+ icon +"'></i> Travel bookeddate is mandatory</li>";
          flag  = false;
        }
        if(!travelBO.pnr){
          message = message + "<li><i class='fa "+ icon +"'></i> Travel PNR is mandatory</li>";
          flag  = false;
        }
        if(!travelBO.amount){
          message = message + "<li><i class='fa "+ icon +"'></i> Travel amount is mandatory</li>";
          flag  = false;
        }
        if(!travelBO.icon){
          message = message + "<li><i class='fa "+ icon +"'></i> Travel mode is mandatory</li>";
          flag  = false;
        }
        if(!travelBO.status){
          message = message + "<li><i class='fa "+ icon +"'></i> Travel status is mandatory</li>";
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
       /* if(!param.dov){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.ll.field.dov'] +"</li>";
          flag  = false;
        }*/
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
        /* if(!paramBO.deliverydate){
          message = message + "<li><i class='fa "+ icon +"'></i> "+ Messages['validation.cart.field.deliverydate'] +"</li>";
          flag  = false;
        }*/
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
    //

  }
  angular.module("paaplogin").service('aswaValidationService',['$rootScope','$http','$q',aswaValidationService]);
})();
