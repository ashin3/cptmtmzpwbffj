/**
 * Created by ayoung on 2015. 11. 4..
 */
var officialLogin = angular.module('leagueScheduler.officialLogin', [
    'ui.router',
    'ngRoute',
    'ngCookies'
]);

officialLogin.config(function config($stateProvider) {
    $stateProvider.state('officialLogin', {
        url: "/officialLogin",
        views: {
            "main": {
                controller: 'OfficialLoginCtrl',
                templateUrl: 'app/view/officialLogin.html'
            }
        },
        data: {pageTitle: 'Official Login'},
    })
});

officialLogin.controller('OfficialLoginCtrl', function($rootScope, $scope, $http, $location, $cookieStore) {
    var leagueUrlBase = "/league";
    var officialUrlBase = "/official";
    var logUrlBase = "/log";

    $scope.leagueList = [new League("Select")];
    $scope.error = false;

    $scope.getLeagueNameList = function() {
        $http({
            url:leagueUrlBase + "/findAll",
            method: "GET"
        }).success(function(data) {
            for (var i=0; i<data.length; i++) {
                $scope.leagueList.push(new League(data[i].leagueName))
            }
        })
    };
    $scope.getLeagueNameList();

    $scope.officialIdCheck = function(officials, leagueSelected) {
        if(officials != null && leagueSelected.leagueName != "Select") {
            $http({
                url:officialUrlBase + "/findByLeagueAndOfficialId",
                method: "GET",
                params: {
                    leagueName : leagueSelected.leagueName,
                    officialUsername : officials.username
                }
            }).success(function(data) {
                if(data != null && data.officialPassword == officials.password) {
                    $location.path("/Home");
                    $cookieStore.put('officialLogin', true);
                    $cookieStore.put('officialName', data.officialName);
                    $cookieStore.put('officialLeague', data.leagueName);
                    $rootScope.officialName = $cookieStore.get('officialName');
                    $rootScope.officialLogin = $cookieStore.get('officialLogin');
                    $rootScope.officialLeague = $cookieStore.get('officialLeague');
                    $scope.createLog();
                } else {
                    $scope.error = true;
                }
            });
        } else {
            $scope.error = true;
        }
    };

    $scope.createLog = function() {
        $http({
            url: logUrlBase + "/createLog",
            method:"POST",
            params: {
                leagueName : $rootScope.officialLeague,
                officialName : $rootScope.officialName,
                logType : "LOGIN"
            }
        })
    };

});
