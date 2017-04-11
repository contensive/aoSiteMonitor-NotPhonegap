app.controller('MainController', function($scope, $rootScope, RemoteDataSrvc, $location, $q, $interval){
  function init() {
  }
  // GET DATA ********************************************
  $scope.serverStatus = [];
  // GET DATA - SEPARATE FILES ********************************************
  $scope.myServers = RemoteDataSrvc.getData('monitorAuth?authToken=1234').then(function(response) {
    $scope.serverList = response.addonList;
    $scope.servers = [];
    angular.forEach($scope.serverList, function(oneServer) {
      RemoteDataSrvc.getData('monitorFolder/' + oneServer).then(function(response) {
        response.urlServer = oneServer;
        $scope.servers.push(response);
        $scope.response = response;
      });
    });
  });

//  ********************************************
$scope.serverDetails = function (server) {
  console.log('Ive been shot!');
  $location.path("/server/"+ server.data.title)
  $scope.serverInfo = server;
  console.log('serverInfo', $scope.serverInfo);
  return $scope.serverInfo;
}

//  ********************************************
init();

});

app.controller('MonitorCtrl', function($scope, $rootScope, RemoteDataSrvc, $location, $q, $interval){

  $scope.init = function(monitor) {
    console.log("monitor", monitor);
    $scope.title = monitor.data.title;
    $scope.refresh = monitor.data.refresh;
    $scope.url = monitor.urlServer;
    console.log("MonitorCtrl");
    $interval(function(){$scope.getMonitorData(); }, $scope.refresh + '000');
  }

  $scope.getMonitorData = function() {
    RemoteDataSrvc.getData('monitorFolder/' + $scope.url).then(function(newResponse) {
      console.log(newResponse);

    });
  }

});
