/**
 * Created by ayoung on 2015. 11. 5..
 */

var adminLogin = angular.module('leagueScheduler.adminLogin', [
    'ui.router',
    'ngRoute',
    'ngCookies'
]);

adminLogin.config(function config($stateProvider) {
    $stateProvider.state('adminLogin', {
        url: "/adminLogin",
        views: {
            "main": {
                controller: 'adminLoginCtrl',
                templateUrl: 'app/view/adminLogin.html'
            }
        },
        data: {pageTitle: 'Official Login'}
    })
});

adminLogin.controller('adminLoginCtrl', function($rootScope, $scope, $http, $location, $cookieStore) {

    $scope.error = false;

    $scope.adminIdCheck = function(admin) {
        if (admin.username == null || admin.password == null) {
            $scope.error = true;
        } else if (admin.username != "admin" || admin.password != "password") {
            $scope.error = true;
        } else {
            $scope.error = false;
            $location.path("/adminHome");
            $cookieStore.put('adminLogin', true);
            $rootScope.adminLogin = $cookieStore.get('adminLogin');
        }
    };
});
