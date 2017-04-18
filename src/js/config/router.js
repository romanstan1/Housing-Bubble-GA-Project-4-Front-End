angular
  .module('houseBubble')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('housesIndex', {
      url: '/houses',
      templateUrl: 'js/views/houses/index.html',
      controller: 'HousesIndexCtrl as housesIndex'
    });
  $urlRouterProvider.otherwise('/houses');
}
