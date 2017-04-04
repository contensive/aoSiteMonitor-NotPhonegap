angular.module('SiteMonitor.controllers.Login', [])

.controller('loginCtrl', function($scope, $rootScope, DataSrvc, $location, $q){

  function init() {
    console.log('the login controller is active');
    $scope.login = {
      username: '',
      password: ''
    };
  }


  init();

  });
