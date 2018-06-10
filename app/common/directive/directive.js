(function(){

var confirmationpopup = angular.module('confirmationpopup',['ui.bootstrap']);

confirmationpopup.directive('confirmationModalPopup',['$modal', function($modal){
  return {
    restrict  : 'A',
    scope: {modalPopupconfiguration :'='},
    link:function(scope,elem,attrs){
      scope.openPopup = function(){
       // console.log("modalPopupconfiguration ::", scope.modalPopupconfiguration);
        var modalInstance = $modal.open({
          templateUrl: '../app/common/directive/confirmationpop.html',
          controller: confirmationpopupCtrl,
          backdrop : scope.modalPopupconfiguration.backdrop,
          size: scope.modalPopupconfiguration.size,
          resolve: {
            modalPopupconfiguration:function(){
              var configObject = scope.modalPopupconfiguration;
              return configObject;
            }
          }
        }); //modal open close here
        modalInstance.result.then(function () {
          scope.modalPopupconfiguration.showDialog  = false;
        }, function () {
          scope.modalPopupconfiguration.showDialog  = false;
        }); // modalinstance close
        if(attrs.ngClick  === undefined){
          elem.bind('click', function(){
            scope.modalPopupconfiguration.showDialog  = true;
          });
        }
        // scope.$watch('modalPopupconfiguration.showDialog', function(newVal, oldVal){
        //   if(newVal==true){
        //     scope.openPopup();
        //   }
        // },true);
      }
      scope.$watch('modalPopupconfiguration.showDialog', function(newVal, oldVal){
        if(newVal==true){
          scope.openPopup();
        }
      },true);
    }
  };
}]);

// define controller here
var confirmationpopupCtrl =function($sce,$scope, $modalInstance, modalPopupconfiguration){
  $scope.title  = modalPopupconfiguration.title;
  $scope.body   = $sce.trustAsHtml(modalPopupconfiguration.body); // for HTML value
  //$scope.body   = modalPopupconfiguration.body;
  $scope.buttons  = modalPopupconfiguration.buttons;

  $scope.buttonHandler  = function(index){
    if(typeof modalPopupconfiguration.buttonHandler !== 'undefined'){
      modalPopupconfiguration.buttonHandler(index);
    }
    modalPopupconfiguration.showDialog  = false;
    $modalInstance.dismiss();
  };
};

// controller define here
confirmationpopup.controller('confirmationpopupCtrl', ['$sce', '$scope', '$modalInstance', 'modalPopupconfiguration', confirmationpopupCtrl]);

})();
