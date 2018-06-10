(function(){
	function mainController($rootScope, $q, $scope, $location, $window, settings,$filter,mainServices, utilityServices, storageServices, getreferences){
		$rootScope.settings = {};
		$rootScope.settings = settings.rootScope;
	
		$rootScope.common	=	{};
		$rootScope.common.select2ClearWithoutSearch	=	{
			placeholder:	"- Select One -",
			minimumResultsForSearch:-1,
			allowClear:true
		};
		$rootScope.common.select2ClearWithSearch	=	{
			placeholder:	"- Select One -",
			allowClear:true
		};
		
		$scope.authenticated = false;
		$rootScope.globals = {};

		var messagelanguage='';
		var loadmessage = function(){
			messagelanguage = sessionStorage.getItem('language');
			$rootScope.radioModel = sessionStorage.getItem('control');
			if(!$rootScope.radioModel){
				$rootScope.radioModel	=	"Right";
			}
			if(!messagelanguage){
				messagelanguage = 'en';
				sessionStorage.setItem('language', messagelanguage);
			}
		}
		loadmessage();

		$scope.changeLanguage = function(language,control){
			if(messagelanguage != language){
				utilityServices.clearSessionStorage();
				messagelanguage = language;
				sessionStorage.setItem('language', messagelanguage);
				sessionStorage.setItem('control', control);
				$window.location.reload();
			}
		}

		var loadContentBundle = function(){
			var domHead	=	angular.element(document.querySelector('head'));
			var domScript	=	document.createElement('script');
					domScript.src	=	'content/'+ messagelanguage +'/index.js';
					domHead.append(domScript);
		}
		loadContentBundle();
		
		$rootScope.loggedInFlag = true;


// date configuration
$rootScope.dates = {
    traveldate: new Date('2015-01-01'),
    bookeddate: new Date(),
    date3: new Date(),
    date4: new Date('01 Mar 2015'),
    date5: new Date('10 Mar 2015'),
    date6: new Date()
  };

  $rootScope.open = {
    date1: false,
	traveldate:false,
	bookeddate:false
  };

  // Disable weekend selection
  $rootScope.disabled = function(date, mode) {
  //  return (mode === 'day' && (new Date().toDateString() == date.toDateString()));
  };
  $rootScope.dateOptions = {
    showWeeks: false,
    startingDay: 1
  };
  $rootScope.timeOptions = {
    readonlyInput: true,
    showMeridian: false
  };
  $rootScope.openCalendar = function(e, date) {
      e.preventDefault();
      e.stopPropagation();
      $rootScope.open[date] = true;
  };

// close date configuration
var spinnerCounter = 0;
		$rootScope.showSpinner = function(){
			if(spinnerCounter === 0){
				$rootScope.spinnerShow = true;
			}
			spinnerCounter++;
		}
		$rootScope.hideSpinner = function(){
			spinnerCounter--;
			if(spinnerCounter <= 0){
				$rootScope.spinnerShow = false;
				spinnerCounter = 0;
			}
		}

		var loadReferences = function(){
			var deferred = $q.defer();
			$rootScope.showSpinner();
			getreferences.getReference().then(function(data){
				deferred.resolve();
			}, function(response){
				console.log("Error on loading references");
				deferred.reject();
			})["finally"](function(response){
				$rootScope.hideSpinner();
			});
			return deferred.promise;
		}
		loadReferences();


		var getUserData = function(){
			//sessionStorage.setItem('user', 'bijesh');
			 // $location.path('/dashboard');
			  	getUser =	storageServices.get('user_','getUser');
			  	//console.log("storageServices.get('user_','getUser')", getUser);
		}
		//getUser();
		// function to call logout method. Clear the cache and re-direct to login page.
		$scope.logout 	=	function(){
			storageServices.removeAll();
			$location.path('/login');
		}

		// function to create empty rows in the dashboard based on the length of actual BO (BO - emptyrow)
		$rootScope.emptyRow = function(num){
			return new Array(num); // return new array based on the param num (BO.length - actual empty row from resepctive controller)
		}
		$rootScope.dateCompare = function(sourceDate){
			var currentDate	=	new Date();
			var formattedCD = $filter('date')(currentDate,"yyyy-MM-dd");
			var currentCompareDate = new Date(formattedCD);
			var sourceCompareDate = new Date(sourceDate);
			var tomorrowDate = $filter('date')(currentDate.setDate(currentDate.getDate() + 1),"yyyy-MM-dd");
			var tomorrowCompareDate = new Date(tomorrowDate);
			if(+currentCompareDate === +sourceCompareDate){
				return "TODAY";
			}else if(+tomorrowCompareDate === +sourceCompareDate){
				return 'TOMORROW';
			}else{
				return sourceDate;
			}
		}

		$rootScope.showErrorBox	=	function(title, error, size){
			if(error === 'generalinfoone'){ error= Messages['generalinfo.one'];}
			$scope.modalConfig	=	{
				"title" 		: title || "Error",
				"body"			:	error || "body text",
				"backdrop"		:"static",
				"showDialog"	:	true,
				"buttons"		:	[{"label":"ok","class":"btn-sm btn-primary"}],
				"size"			:	size || "md",
				"customClass"	:	"smallPopup"
			};
		}
		$rootScope.showInfoBox	=	function(title, info, size){
			if(info === 'generalinfoone'){ info= Messages['generalinfo.one'];}
			$scope.modalConfig	=	{
				"title" 		: title || "Info",
				"body"			:	info || "body text",
				"backdrop"		:"static",
				"showDialog"	:	true,
				"buttons"		:	[{"label":"ok","class":"btn-sm btn-primary"}],
				"size"			:	size || "md",
				"customClass"	:	"smallPopup"
			};
		}


		$rootScope.addnotification = function(title, text, sticky, time){
			$.gritter.add({
				title 			: 	title || 'Info',
				image 			: 	'../img/confirm.png',
				text			: 	text || 'Information',
				sticky			: 	false,
				time			: 	time || 2000
			})
		}

		//close confirmation box
		$rootScope.showConfirmationBox	=	function(config){
			$scope.modalConfig	=	{
				"title"			: 	config.title	|| "Warning",
				"body"			: 	config.body		||	"Some Information or warning",
				"showDialog"	: 	true,
				"buttons"		: 	config.buttons	||	[{"label":"Yes", "class":"btn-primary"}, {"label":"No","class":"btn-default"}],
				"buttonHandler"	: 	config.buttonHandler,
				"escHandler"	: 	config.escHandler,
				"size"			: 	config.size 
			};
		}


// wait till the reference data completely loaded.
$rootScope.$on('$routeChangeStart', function(event,next,current){
	next.resolve	=	angular.extend(next.resolve || {},{
		_reference_: loadReferences
	});
});

// authentication
$rootScope.$on('$locationChangeStart', function (event, next, current) {
		$scope.authenticated	=	false;
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
						//console.log("restricted pages", restrictedPage);
						getUser		=	storageServices.get('user_','getUser');
						var loggedIn
						if(getUser){
							  loggedIn= getUser[0].user;
						}
            if (restrictedPage && !loggedIn) {
							$scope.authenticated	=	false;
                $window.location.href = 'http://localhost/paap/app-login/#/login';
            }else if(!restrictedPage && !loggedIn){
							$scope.authenticated	=	false;
						}else{
								$scope.authenticated	=	true;
								loadReferences();
						}
        });
// close authentication close here




	}
	angular.module('paaplogin').controller('mainController',['$rootScope','$q','$scope', '$location', '$window', 'settings', '$filter', 'mainServices', 'utilityServices', 'storageServices', 'getreferences', mainController]);

})();
