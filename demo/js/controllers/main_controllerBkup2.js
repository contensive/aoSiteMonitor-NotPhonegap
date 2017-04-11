// angular.module('SiteMonitor.controllers.Main', [])

// .controller('MainController', function($scope, $rootScope, DataSrvc, $location, localStorageSrvc, $q){
// app.controller('MainController', function($scope, $rootScope, DataSrvc, RemoteDataSrvc, $location, $q){
app.controller('MainController', function($scope, $rootScope, RemoteDataSrvc, $location, $q, $interval){

  function init() {
console.log('ive updated');
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
          // setInterval($scope.response, $scope.response.data.refresh + '000');
          // $interval(response, $scope.response.data.refresh + '000' );
          // $interval( function(response){}, $scope.response.data.refresh + '000');
          // $interval( function(){ $scope.callAtInterval(); }, 3000);

      });
    });
  });

  // $scope.s01 = RemoteDataSrvc.getData('%7Bf8a01819-7041-4006-9523-26fd57dc0c01%7D.js');
  // $scope.s02 = DataSrvc.getData('S02.js');
  // $scope.s03 = DataSrvc.getData('S03.js');
  // $scope.s04 = DataSrvc.getData('S04.js');
  // $scope.s05 = DataSrvc.getData('S05.js');
  // $scope.s06 = DataSrvc.getData('S06.js');
  // $scope.s07 = DataSrvc.getData('S07.js');
  // $scope.s08 = DataSrvc.getData('S08.js');
  // $scope.s09 = DataSrvc.getData('S09.js');
  // $scope.s10 = DataSrvc.getData('S10.js');
  // $scope.s11 = DataSrvc.getData('S11.js');
  // $scope.s12 = DataSrvc.getData('S12.js');
  // $scope.s13 = DataSrvc.getData('S13.js');
  // $scope.s14 = DataSrvc.getData('S14.js');
  // $scope.s15 = DataSrvc.getData('S15.js');
  // $scope.s16 = DataSrvc.getData('S16.js');
  // $scope.s17 = DataSrvc.getData('S17.js');
  // $scope.s18 = DataSrvc.getData('S18.js');
  // $scope.s19 = DataSrvc.getData('S19.js');
  // $scope.s20 = DataSrvc.getData('S20.js');
  //
  // $q.all([
  //   $scope.s01, $scope.s02, $scope.s03, $scope.s04, $scope.s05, $scope.s06, $scope.s07, $scope.s08, $scope.s09, $scope.s10,
  //   $scope.s11, $scope.s12, $scope.s13, $scope.s14, $scope.s15, $scope.s16, $scope.s17, $scope.s18, $scope.s19, $scope.s20
  // ]).then(
  //   function(s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20) {
  //     $scope.servers = s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20;
  //     console.log('servers', $scope.servers);
  //     $scope.myList = [ $scope.servers ]
  //   }
  // );
//  ********************************************
$scope.serverDetails = function (server) {
  console.log('Ive been shot!');
  $location.path("/server/"+ server.data.title)
  $scope.serverInfo = server;
  console.log('serverInfo', $scope.serverInfo);
  return $scope.serverInfo;
}
//  ********************************************
//REFRESH MONITORS
// setTimeout(function(){
//   window.location.reload(true);
// }, 60000);




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
