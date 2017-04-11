'use strict';
var app = angular.module('SiteMonitor', [
  'ngRoute',
  'mobile-angular-ui',

  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'.
  // This is intended to provide a flexible, integrated and and
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

app.run(function($transform) {
  window.$transform = $transform;
});

//
app.config(function($routeProvider, $locationProvider) {
   $locationProvider.html5Mode(true);
  $routeProvider.when('/', {templateUrl: 'monitors.html', reloadOnSearch: false});
  $routeProvider.when('/server/:serverId', {templateUrl: 'server-details.html', reloadOnSearch: false});
});

//////////////////////////////////// SITE MONITOR ADDED //////////////////////
/************************ ADDED - api.js ********************/

(function (window) {
	/*****************************
	* The workhorse; converts an object to x-www-form-urlencoded serialization.
	* @param {Object} obj
	* @return {String}
	*/
	window.__formUrlEncode = function(obj) {
		if (!angular.isObject(obj) || String(obj) === '[object File]') {
			return obj;
		}

		var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

		for(name in obj) {
			value = obj[name];

			if(value instanceof Array) {
				for(i=0; i<value.length; ++i) {
					subValue = value[i];
					fullSubName = name + '[' + i + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + '&';
				}
			}
			else if(value instanceof Object) {
				for(subName in value) {
					subValue = value[subName];
					fullSubName = name + '[' + subName + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + '&';
				}
			}
			else if(value !== undefined && value !== null) {
				query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
			}
		}

		return query.length ? query.substr(0, query.length - 1) : query;
	};
}(this));
app.config(function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	delete $httpProvider.defaults.headers.common['X-Requested-With']
	$httpProvider.defaults.transformRequest = [function(data) {return __formUrlEncode(data);}];
});


// //****************************************************
// app.service('DataSrvc', function ($http, $location) {
// 	//*************************************
// 	var self = this;
// 	var callDomain = $location.protocol() + "://" + $location.host();
// 	//*************************************
//   this.url = '';
// 	this.getData = function(addonName, object) {
// 		var params = String();
// 		if(object) params = '&' + $.param(object);
//     // return $http.get("http://localhost:8000/data"  + '/' + addonName + '?callingDomain='+encodeURIComponent(callDomain) + params).then(
//     // return $http.get(this.url + "js/data"  + '/' + addonName + '?callingDomain='+encodeURIComponent(callDomain) + params).then( //forlocalHOst
// 		return $http.get(this.url + "/data"  + '/' + addonName + '?callingDomain='+encodeURIComponent(callDomain) + params).then(
// 			function success(response) {
// 				if (typeof(response.data) === 'object') {
// 					if (response.data.dataError) logResponseErrors(response, addonName);
// 					return response.data;
// 				} else {
//           // return 'api endpoint not found: ' + "http://localhost:8000/data"  + '/' + addonName;
//           // return 'api endpoint not found: ' + this.url + "js/data"  + '/' + addonName; //for LocalHost
// 					return 'api endpoint not found: ' + this.url + "/data"  + '/' + addonName;
// 				}
// 			}, function failure(error) {
// 				console.error('failure callback: DataSrvc.getData(' + addonName + ', ' + object.toString() + ')');
// 			}, function emit(event) {
// 				return event;
// 			}
// 		);
// 	};
// 	//*************************************
// 	function logResponseErrors(response, addonName) {
// 		if (response.data.dataError) {
// 			if (response.data.dataError.length > 0) {
// 				response.data.dataError.forEach(function (dataError) {
// 					if (response.data.success) console.log(dataError.description);
// 					else console.error(dataError.description);
// 				});
// 			} else {
// 				if (!response.data.success) {
// 					console.error("remote method call " + addonName + " returned success:false without any data errors");
// 				}
// 			}
// 		}
// 	};
//
//   });

  //****************************************************
  app.service('RemoteDataSrvc', function ($http, $location) {
  	//*************************************
  	var self = this;
  	var callDomain = $location.protocol() + "://" + $location.host();
    //*************************************
    this.url = '';
    this.getData = function(addonName) {
      // var params = String();
      // if(object) params = '&' + $.param(object);
      return $http.get(this.url + '/' + addonName).then(
        function success(response) {
            return response.data;

          },
        function failure(error) {
          console.error('ERROR');
        }, function emit(event) {
          return event;
        }
      );
    };
    //*************************************
  });

// app.service('loginSrvc', function($http, $location) {
//   var self = this;
//
// });

//////////////////////////////////////// HARD CODED AUTH CALL FOR ONE JS //////////////////////////
//****************************************************
// app.service('RemoteDataSrvc', function ($http, $location) {
//   //*************************************
//   var self = this;
//   var callDomain = $location.protocol() + "://" + $location.host();
//   //*************************************
//   this.url = '';
//   this.getData = function(object) {
//     var params = String();
//     if(object) params = '&' + $.param(object);
//     // return $http.get(this.url + '/' + addonName + '?authToken='+encodeURIComponent(callDomain) + params).then(
//     // return $http.get(this.url + '/' + 'siteMonitors?authtoken=%7Ba68ecdbd-534f-42ab-9f8d-4bd29702f247%7D').then(
//     return $http.get(this.url + '/' + 'monitorFolder/f8a0181970414006952326fd57dc0c01.js'  + '?callingDomain='+encodeURIComponent(callDomain) + params).then(
//       function success(response) {
//         if (typeof(response.data) === 'object') {
//           if (response.data.dataError) logResponseErrors(response);
//           return response.data;
//         } else {
//           return 'api endpoint not found: ' + this.url  + '/' +  'monitorFolder/f8a0181970414006952326fd57dc0c01.js';
//         }
//       }, function failure(error) {
//         console.error('failure callback: RemoteDataSrvc.getData(' + 'monitorFolder/f8a0181970414006952326fd57dc0c01.js' + ', ' + object.toString() + ')');
//       }, function emit(event) {
//         return event;
//       }
//     );
//   };
//
//   //*************************************
//   function logResponseErrors(response) {
//     if (response.data.dataError) {
//       if (response.data.dataError.length > 0) {
//         response.data.dataError.forEach(function (dataError) {
//           if (response.data.success) console.log(dataError.description);
//           else console.error(dataError.description);
//         });
//       } else {
//         if (!response.data.success) {
//           console.error("remote method call " + 'monitorFolder/f8a0181970414006952326fd57dc0c01.js' + " returned success:false without any data errors");
//         }
//       }
//     }
//   };
//
// });



/////////////////////////////////// SITE MONITOR END ADDED ////////////////////
