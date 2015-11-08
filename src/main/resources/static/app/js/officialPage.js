/**
 * Created by ayoung on 2015. 11. 5..
 */

var official = angular.module('leagueScheduler.official',[
    'ui.router',
    'ngRoute',
    'ngCookies'
]);

official.config(function config($stateProvider) {
    $stateProvider.state('official', {
        url: "/officialPage",
        views: {
            "main": {
                controller: 'OfficialCtrl',
                templateUrl: 'app/view/officialPage.html'
            }
        },
        data: {
            pageTitle: 'Official Page',
            requireLogin : true
        }
    })
});

official.controller('OfficialCtrl', function($rootScope, $scope, $http, $location, $cookieStore) {

    $rootScope.OfficialLogin = $cookieStore.get('OfficialLogin');
    $rootScope.officialLeague = $cookieStore.get('officialLeague');
    $rootScope.matchUpdated = $cookieStore.get('matchUpdated');

    var leagueUrlBase = "/league";
    var teamUrlBase = "/team";
    var matchUrlBase = "/match";

    $scope.emptyTeamList = [{name:""}, {name:""}];
    $scope.teamList = [];

    if($rootScope.matchUpdated) {
        $http({
            url: teamUrlBase + '/findByLeagueName',
            method: "GET",
            params: {
                leagueName: $rootScope.officialLeague
            }
        }).success(function(data){
            for(var i=0; i<data.length; i++)
                $scope.teamList.push({name:data[i].teamName})
        });
        $http({
            url: leagueUrlBase + "/getStartDateByLeagueName",
            method: "GET",
            params: {
                leagueName : $rootScope.officialLeague
            }
        }).success(function(data) {
            $scope.startDate = data;
        });
        $scope.teams = $scope.teamList;
    } else {
        $scope.teams = $scope.emptyTeamList;
        $scope.startDate = null;
    }

    $scope.addNewTeam = function addNewTeam() {
        $scope.teams.push({name:""})
    };

    $scope.removeTeam = function removeTeam(index) {
        $scope.teams.splice(index, 1);
    };

    $scope.showAddTeam = function showAddTeam(teams) {
        if(teams.length < 10) {
            return true;
        }
    };

    $scope.updateLeague = function updateLeague() {
        $http({
            url: leagueUrlBase + '/updateStartDate',
            method: "PUT",
            params: {
                leagueName: $rootScope.officialLeague,
                startDate: $scope.startDate
            }
        }).success(function(data){
        });
    };

    $scope.createTeam = function(team) {
        $http({
            url: teamUrlBase + '/create',
            method: "POST",
            params: {
                leagueName: $rootScope.officialLeague,
                teamName: team.name
            }
        });
    };

    $scope.createMatch = function(teamNames) {
        $http({
                url: matchUrlBase + "/create",
                method: "POST",
                params: {
                    leagueName: $rootScope.officialLeague,
                    teamNames : teamNames
                }
            }
        ).success(function() {
                $location.path("/home")
            })
    };

    var teamNames = [];
    $scope.emptyResult = true;
    $scope.dateError = true;

    $scope.populateMatch = function populateMatch() {
        if($scope.teams[0].name == "" || $scope.teams[1].name =="" || $scope.startDate == null || $scope.startDate.length<1) {
            $scope.emptyResult = false;
            $scope.dateError = true;
        } else {
            $scope.emptyResult = true;
            $scope.dateError = true;
            $scope.updateLeague();
            var from = $scope.startDate.split("/");
            if(from[2].length == 4 && from[1].length ==2 && from[0].length ==2) {
                var f = new Date(from[2], from[0] - 1, from[1]);
                var today = new Date();
                if(isNaN( f.getTime())) {
                    $scope.dateError = false;
                } else {
                    if(f.getTime() < today.getTime()) {
                        $scope.dateError = false;
                    } else {
                        $scope.updateLeague();
                        $scope.teams.forEach(function(team) {
                            if(team.name != "")
                                teamNames.push(team.name)
                        });
                        $scope.teams.forEach(function(team) {
                            if(team.name != "")
                                $scope.createTeam(team)
                        });
                        $scope.createMatch(teamNames);
                        teamNames = [];
                    }
                }
            } else {
                $scope.dateError = false;
            }
        }

    };

    $scope.deleteTeamByLeagueName = function deleteTeamByLeagueName() {
        $http({
            url: teamUrlBase + "/deleteByLeagueName",
            method: "PUT",
            params: {
                leagueName: $rootScope.officialLeague
            }
        })
    };

    $scope.deleteMatchByLeagueName = function deleteMatchByLeagueName() {
        $http({
            url: matchUrlBase + "/deleteByLeagueName",
            method: "PUT",
            params: {
                leagueName: $rootScope.officialLeague
            }
        })
    };

    $scope.updateMatch = function updateMatch() {
        if($scope.teams[0].name == "" || $scope.teams[1].name =="" || $scope.startDate == null || $scope.startDate.length<1) {
            $scope.emptyResult = false;
            $scope.dateError = true;
        } else {
            $scope.emptyResult = true;
            $scope.dateError = true;
            $scope.updateLeague();
            var from = $scope.startDate.split("/");
            if(from[2].length == 4 && from[1].length ==2 && from[0].length ==2) {
                var f = new Date(from[2], from[0] - 1, from[1]);
                var today = new Date();
                if(isNaN( f.getTime())) {
                    $scope.dateError = false;
                } else {
                    if(f.getTime() < today.getTime()) {
                        $scope.dateError = false;
                    } else {
                        $scope.deleteTeamByLeagueName();
                        $scope.deleteMatchByLeagueName();
                        $scope.updateLeague();
                        $scope.teams.forEach(function(team) {
                            if(team.name != "")
                                teamNames.push(team.name)
                        });
                        $scope.teams.forEach(function(team) {
                            if(team.name != "")
                                $scope.createTeam(team)
                        });
                        $scope.createMatch(teamNames);
                        teamNames = [];
                    }
                }
            } else {
                $scope.dateError = false;
            }
        }
    }
});