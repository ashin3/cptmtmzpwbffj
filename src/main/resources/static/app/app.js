var leagueScheduler = angular.module("leagueScheduler", [
    "ngRoute",
    "ngCookies",
    "leagueScheduler.adminLeagueCreate",
    "leagueScheduler.home",
    "leagueScheduler.officialLogin",
    "leagueScheduler.official",
    "leagueScheduler.adminLogin",
    "leagueScheduler.adminHome"
]);

leagueScheduler.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise( '/home' );
});

leagueScheduler.controller('AppCtrl', function AppCtrl ($scope, $rootScope, $cookieStore) {
});