/**
 * Created by ayoung on 2015. 11. 5..
 */

var adminHome = angular.module('leagueScheduler.adminHome', [
    'ui.router',
    'ngRoute',
    'ngCookies'
]);

adminHome.config(function config($stateProvider) {
    $stateProvider.state('adminHome', {
        url: "/adminHome",
        views: {
            "main": {
                controller: 'adminHomeCtrl',
                templateUrl: 'app/view/adminHome.html'
            }
        },
        data: {pageTitle: 'adminHome'}
    })
});

adminHome.controller('adminHomeCtrl', function($rootScope, $scope, $http, $cookieStore) {
    var leagueUrlBase = "/league";
    var teamUrlBase = "/team";
    var officialUrlBase = "/official";
    var matchUrlBase = "/match";
    var logUrlBase = "/log";

    $rootScope.adminLogin = $cookieStore.get('adminLogin');
    $scope.leagueList = [new League("Select")];
    $scope.officialList = [];
    $scope.emptyResult = true;
    $scope.readyToDelete = false;

    $scope.confirmDelete = function() {
        $scope.readyToDelete = true;
    };

    $scope.getLeagueNameList = function() {
        $http({
            url:leagueUrlBase + "/findAll",
            method: "GET"
        }).success(function(data) {
            for (var i=0; i<data.length; i++) {
                $scope.leagueList.push(new League(data[i].leagueName))
            }
        });
    };

    $scope.getLeagueNameList();

    $scope.showLeagueInfo = function showLeagueInfo(leagueSelected) {
        $scope.getLeagueInfo(leagueSelected);
        $scope.getTeamInfo(leagueSelected);
        $scope.getOfficialInfo(leagueSelected);
    };

    $scope.getLeagueInfo = function(leagueSelected) {
        $http({
            url: leagueUrlBase + "/getStartDateByLeagueName",
            method: "GET",
            params: {
                leagueName: leagueSelected.leagueName
            }
        }).success(function(data) {
            $scope.startDate = data;
        });
        $http({
            url: leagueUrlBase + "/getEndDateByLeagueName",
            method: "GET",
            params: {
                leagueName: leagueSelected.leagueName
            }
        }).success(function(data) {
            $scope.endDate = data;
        });
    };

    $scope.getTeamInfo = function(leagueSelected) {
        $scope.teams = [];
        $http({
            url:teamUrlBase + "/findByLeagueName",
            method: "GET",
            params: {
                leagueName : leagueSelected.leagueName
            }
        }).success(function(data) {
            for(var i=0; i<data.length; i++) {
                $scope.teams.push(data[i]);
            }
        })
    };

    $scope.getOfficialInfo = function(leagueSelected) {
        $scope.officials = [];
        $scope.officialList = [];
        $http({
            url:officialUrlBase + "/findByLeagueName",
            method: "GET",
            params: {
                leagueName : leagueSelected.leagueName
            }
        }).success(function(data) {
            for(var i=0; i<data.length; i++) {
                $scope.officials.push(data[i]);
                $scope.officialList.push({name:data[i].officialName, username:data[i].officialUsername, password:data[i].officialPassword})
            }
        })
    };

    $scope.addNewOfficial = function addNewOfficial() {
        $scope.officialList.push({name:"", username:"", password:""})
    };

    $scope.removeOfficial = function removeOfficial(index) {
        $scope.officialList.splice(index, 1);
    };

    $scope.showAddOfficial = function showAddOfficial(officialList) {
        if(officialList.length < 3) {
            return true;
        }
    };

    $scope.createOfficial = function(official, leagueSelected) {
        $http({
            url: officialUrlBase + '/create',
            method: "POST",
            params: {
                leagueName: leagueSelected.leagueName,
                officialName: official.name,
                officialUsername: official.username,
                officialPassword: official.password
            }
        }).success(function() {
            $scope.editMode = false;
        });
    };

    $scope.deleteOfficials = function(leagueSelected) {
        $http({
            url: officialUrlBase + '/deleteAllByLeagueName',
            method: 'PUT',
            params: {
                leagueName: leagueSelected.leagueName
            }
        })
    };

    $scope.validDate = true;
    $scope.editMode = false;

    $scope.startUpdate = function() {
        $scope.editMode = true;
    };

    $scope.cancelUpdate = function() {
        $scope.editMode = false;
    };

    $scope.updateOfficial = function updateOfficial(leagueSelected) {
        if($scope.officialList[0].name == "" || $scope.officialList[0].username == "" || $scope.officialList[0].password == "") {
            $scope.emptyResult = false;
        } else {
            $scope.emptyResult = true;
            for(var i=0; i<$scope.officialList.length; i++) {
                if($scope.officialList[i].username.indexOf(" ") > -1 || $scope.officialList[i].password.indexOf(" ") > -1) {
                    $scope.emptyResult = false;
                    break;
                }
            }
            if($scope.emptyResult) {
                $scope.deleteOfficials(leagueSelected);
                $scope.officialList.forEach(function(official) {
                    if(official.name != "" && official.username != "" && official.password != "")
                        $scope.createOfficial(official, leagueSelected)
                });
            }
        }
        $scope.showLeagueInfo(leagueSelected);
    };

    $scope.deleteTeamByLeagueName = function deleteTeamByLeagueName(leagueSelected) {
        $http({
            url: teamUrlBase + "/deleteByLeagueName",
            method: "PUT",
            params: {
                leagueName: leagueSelected.leagueName
            }
        })
    };

    $scope.deleteMatchByLeagueName = function deleteMatchByLeagueName(leagueSelected) {
        $http({
            url: matchUrlBase + "/deleteByLeagueName",
            method: "PUT",
            params: {
                leagueName: leagueSelected.leagueName
            }
        })
    };

    $scope.deleteLogByLeagueName = function deleteLogByLeagueName(leagueSelected) {
        $http({
            url: logUrlBase + "/deleteByLeagueName",
            method: "PUT",
            params: {
                leagueName: leagueSelected.leagueName
            }
        })
    };

    $scope.deleteLeagueInfo = function deleteLeagueInfo(leagueSelected) {
        $http({
            url: leagueUrlBase + "/deleteByLeagueName",
            method: "PUT",
            params: {
                leagueName: leagueSelected.leagueName
            }
        })
    };

    $scope.deleteLeague =function(leagueSelected) {
        $scope.deleteLeagueInfo(leagueSelected);
        $scope.deleteOfficials(leagueSelected);
        $scope.deleteMatchByLeagueName(leagueSelected);
        $scope.deleteTeamByLeagueName(leagueSelected);
        $scope.deleteLogByLeagueName(leagueSelected);
        $scope.readyToDelete = false;
        $scope.leagueList = [new League("Select")];
        $scope.getLeagueNameList();
        $scope.leagueSelected = $scope.leagueList[0];
    };

    $scope.logoff = function() {
        $cookieStore.put('adminLogin', false);
        $rootScope.adminLogin = $cookieStore.get('adminLogin');
    };
});