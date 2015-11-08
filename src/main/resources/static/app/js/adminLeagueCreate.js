/**
 * Created by ayoung on 2015. 10. 19..
 */

var adminLeagueCreate = angular.module('leagueScheduler.adminLeagueCreate',[
    'ui.router',
    'ngRoute',
    'ngCookies'
]);

adminLeagueCreate.config(function config($stateProvider) {
    $stateProvider.state('adminLeagueCreate', {
        url: "/adminLeagueCreate",
        views: {
            "main": {
                controller: 'AdminLeagueCreateCtrl',
                templateUrl: 'app/view/adminLeagueCreate.html'
            }
        },
        data: {
            pageTitle: 'Admin League Create'
        }
    })
});

adminLeagueCreate.controller('AdminLeagueCreateCtrl', function($rootScope, $scope, $http, $location, $cookieStore) {

    var leagueUrlBase = "/league";
    var officialUrlBase = "/official";


    $scope.leagueList = [];

    $scope.getLeagueNameList = function() {
        $http({
            url:leagueUrlBase + "/findAll",
            method: "GET"
        }).success(function(data) {
            for (var i=0; i<data.length; i++) {
                $scope.leagueList.push(data[i].leagueName)
            }
        });
    };

    $scope.getLeagueNameList();

    $scope.officials = [{name:"", username:"", password:""}];

    $scope.addNewOfficial = function addNewOfficial() {
        $scope.officials.push({name:"", username:"", password:""})
    };

    $scope.showAddOfficial = function showAddOfficial(officials) {
        if(officials.length < 3) {
            return true;
        }
    };

    $scope.emptyResult = true;

    $scope.createLeague = function createLeague() {
        $http({
            url: leagueUrlBase + '/create',
            method: "POST",
            params: {
                leagueName: $scope.leagueName
            }
        });
    };

    $scope.createOfficial = function(official) {
        $http({
            url: officialUrlBase + '/create',
            method: "POST",
            params: {
                leagueName: $scope.leagueName,
                officialName: official.name,
                officialUsername: official.username,
                officialPassword: official.password
            }
        }).success(function() {
            $location.path("/adminHome")
        });
    };

    $scope.removeOfficial = function removeOfficial(index) {
        $scope.officials.splice(index, 1);
    };

    $scope.leagueExist = false;

    $scope.populateLeague = function populateLeague() {
        $scope.leagueExist = false;
        if($scope.leagueName == null || $scope.officials[0].name == "" || $scope.officials[0].username == "" || $scope.officials[0].password == "") {
            $scope.emptyResult = false;
        } else {
            $scope.emptyResult = true;
            for(var i=0; i<$scope.officials.length; i++) {
                if($scope.officials[i].username.indexOf(" ") > -1 || $scope.officials[i].password.indexOf(" ") > -1) {
                    $scope.emptyResult = false;
                    break;
                }
            }
            if($scope.emptyResult) {
                if($scope.leagueList.indexOf($scope.leagueName) > -1) {
                    $scope.leagueExist = true;
                } else {
                    $scope.createLeague();
                    $scope.officials.forEach(function(official) {
                        if(official.name != "" && official.username != "" && official.password != "")
                            $scope.createOfficial(official)
                    });
                }
            }
        }
    }
});