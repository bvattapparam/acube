(function(){
  // create factory for header service to retun object in deffered way
  function customerManagerServices($rootScope, $q, $http, storageServices, urlsettings){

        // to get the user details
        this.getCustomers = function(pushdata){
          if(pushdata.limit){
            pushdata.offset = (pushdata.currentPage-1) * pushdata.limit;
          }
            var deferred = $q.defer();
              $http({
                method  : "POST",
                url     : urlsettings['customermanager.getCustomers'],
                data    : pushdata
              }).success(function(data){
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            
              return deferred.promise;
          };
          this.getCustomerPay = function(pushdata){
              var deferred = $q.defer();
                $http({
                  method  : "POST",
                  url     : urlsettings['customermanager.getCustomerPay'],
                  data    : pushdata
                }).success(function(data){
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              
                return deferred.promise;
            };

          this.getStatusCount = function(){
            var deferred = $q.defer();
              $http({
                method  : "GET",
                url     : urlsettings['customermanager.getStatusCount'],
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
              return deferred.promise;
          };
          

        this.updateCustomerData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['customermanager.updateCustomer'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        this.updateCustomerPay = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['customermanager.updateCustomerPay'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.getTotals = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['customermanager.getTotals'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        this.getPQE = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['customermanager.getPQE'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.addCustomerData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['customermanager.addCustomer'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        this.addCustomerPay = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['customermanager.addCustomerPay'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.getCustomer = function(customerid) {
          var deferred = $q.defer();
              $http({
                method  : "GET",
                url     : urlsettings['customermanager.getCustomer'] + "&customerid=" + customerid,
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            
              return deferred.promise;
        };
        this.getNote = function(customerid) {
          var deferred = $q.defer();
              $http({
                method  : "GET",
                url     : urlsettings['customermanager.getNote'] + "&customerid=" + customerid,
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            
              return deferred.promise;
        };
        this.updateCustomerEstimateStatus = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['customermanager.updateEstimateStatus'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        this.updateCustomerNote = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['customermanager.updateCustomerNote'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        this.addCustomerNote = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['customermanager.addCustomerNote'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        this.customerIDCreation = function(record){
          var CUSTOMER_TYPE = record.TYPE;
          var CUSTOMERNAMETMP = record.FULLNAME;
          var CUSTOMERNAME = CUSTOMERNAMETMP.replace(/\s/g,'');;
					var COMPANY = "AGM";
					var D = new Date();
					var NDATE = D.getMonth()+1 + "" + D.getDate() + "" + D.getFullYear() + "" + D.getHours() + "" + D.getMinutes();
					var CUSTOMERID = COMPANY + "-" + CUSTOMER_TYPE + "-" + CUSTOMERNAME.substr(0,3).toUpperCase() + "-" + NDATE;
         
          return CUSTOMERID;
        }

  }
  angular.module("aswa").service('customerManagerServices',['$rootScope', '$q', '$http', 'storageServices', 'urlsettings', customerManagerServices]);
})();
