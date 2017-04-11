// angular.module('SiteMonitor.controllers.Login', [])

app.controller('loginCtrl', function($scope, $rootScope, RemoteDataSrvc, $location, $q){

  function init() {
    console.log('the login controller is active');
    $scope.login = {
      username: '',
      password: ''
    };
  }

  $scope.submitLogin = function() {
    // $scope.authToken = RemoteDataSrvc.getData('monitorAuth?authToken=1234');
    // console.log('$scope.authToken', $scope.authToken);
    console.log('$scope.login', $scope.login);
  }

  init();

  });
