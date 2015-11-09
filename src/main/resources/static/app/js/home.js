/**
 * Created by ayoung on 2015. 10. 30..
 */

var home = angular.module('leagueScheduler.home', [
    'ui.router',
    'ngRoute',
    'ngCookies'
]);

home.config(function config($stateProvider) {
    $stateProvider.state('home', {
        url: "/home",
        views: {
            "main": {
                controller: 'HomeCtrl',
                templateUrl: 'app/view/home.html'
            }
        },
        data: {pageTitle: 'Home'}
    })
});

home.controller('HomeCtrl', function($rootScope, $scope, $http, $cookieStore, $location, $route) {

    var leagueUrlBase = "/league";
    var teamUrlBase = "/team";
    var matchUrlBase = "/match";
    var logUrlBase = "/log";

    $rootScope.officialLogin = $cookieStore.get('officialLogin');
    $rootScope.officialLeague = $cookieStore.get('officialLeague');
    $rootScope.officialName = $cookieStore.get('officialName');

    $scope.leagueList = [new League("Select")];
    $scope.viewingSchedule = true;
    $scope.validateDate = false;
    $scope.teamList = [];

    $scope.sortType = "score";
    $scope.sortReverse = true;
    $scope.searchScore = "";

    $scope.resultConfirm = false;

    $scope.weekList = [1,2,3,4,5,6,7,8];

    $scope.createTeamScoreList = function(weekSelected) {
        $http({
            url:teamUrlBase + "/findByLeagueName",
            method: "GET",
            params: {
                leagueName : $rootScope.officialLeague
            }
        }).success(function(data) {
            $scope.teamScoreMapList = {};
            $scope.weeklyScoreMapList = {};
            $scope.teamNameList = [];
            for (var i=0; i<data.length; i++) {
                $scope.teamScoreMapList[data[i].teamName] = data[i].score;
                switch(weekSelected) {
                    case 1:
                        $scope.weeklyScoreMapList[data[i].teamName] = data[i].week1;
                        break;
                    case 2:
                        $scope.weeklyScoreMapList[data[i].teamName] = data[i].week2;
                        break;
                    case 3:
                        $scope.weeklyScoreMapList[data[i].teamName] = data[i].week3;
                        break;
                    case 4:
                        $scope.weeklyScoreMapList[data[i].teamName] = data[i].week4;
                        break;
                    case 5:
                        $scope.weeklyScoreMapList[data[i].teamName] = data[i].week5;
                        break;
                    case 6:
                        $scope.weeklyScoreMapList[data[i].teamName] = data[i].week6;
                        break;
                    case 7:
                        $scope.weeklyScoreMapList[data[i].teamName] = data[i].week7;
                        break;
                    case 8:
                        $scope.weeklyScoreMapList[data[i].teamName] = data[i].week8;
                        break;
                }
                $scope.teamNameList.push(data[i].teamName);
            }
        })
    };

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

    $scope.validateDatePassed = function(weekSelected) {
        $http({
            url: leagueUrlBase + "/validateDateByLeagueNameAndWeek",
            method: "GET",
            params: {
                leagueName: $rootScope.officialLeague,
                week : weekSelected
            }
        }).success(function(data){
            $scope.validateDate =  data;
        });
    };

    $scope.viewSchedule = function(leagueSelected, weekSelected) {
        if(!$rootScope.officialLogin) {
            $http({
                url:matchUrlBase + "/findByLeagueNameAndWeek",
                method: "GET",
                params: {
                    leagueName : leagueSelected.leagueName,
                    week : weekSelected
                }
            }).success(function(data) {
                $scope.viewMatch = true;
                $scope.resultView = false;
                $scope.matchList = [];
                $scope.emptyResult = false;
                for (var i=0; i<data.length; i++) {
                    $scope.matchList.push(data[i]);
                }
            });
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
            $http({
                url: leagueUrlBase + "/getDateByLeagueNameAndWeek",
                method: "GET",
                params: {
                    leagueName: leagueSelected.leagueName,
                    week : weekSelected
                }
            }).success(function(data) {
                $scope.tournamentDate = data;
            });
        } else {
            $http({
                url:matchUrlBase + "/findByLeagueNameAndWeek",
                method: "GET",
                params: {
                    leagueName : $rootScope.officialLeague,
                    week : weekSelected
                }
            }).success(function(data) {
                $scope.viewMatch = true;
                $scope.resultView = false;
                $scope.matchList = [];
                $scope.emptyResult = false;
                $scope.resultConfirm = true;
                for (var i=0; i<data.length; i++) {
                    $scope.matchList.push(data[i]);
                    if(data[i].result == null) {
                        $scope.resultConfirm = false;
                    }
                }
                $scope.createTeamScoreList(weekSelected);
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
            $http({
                url: leagueUrlBase + "/getEndDateByLeagueName",
                method: "GET",
                params: {
                    leagueName : $rootScope.officialLeague
                }
            }).success(function(data) {
                $scope.endDate = data;
            });
            $http({
                url: leagueUrlBase + "/getDateByLeagueNameAndWeek",
                method: "GET",
                params: {
                    leagueName : $rootScope.officialLeague,
                    week : weekSelected
                }
            }).success(function(data) {
                $scope.tournamentDate = data;
            });
            $scope.validateDatePassed(weekSelected);
        }
        $scope.viewLog = false;
        $scope.viewingSchedule = true;
        $scope.viewCurrent = false;
    };



    if($rootScope.officialLogin) {
        $http({
            url:matchUrlBase + "/findByLeagueName",
            method: "GET",
            params: {
                leagueName : $rootScope.officialLeague
            }
        }).success(function(data) {
            if(data.length > 0)
                $scope.matchPopulated = true;
            else
                $scope.matchPopulated = false;
        });

        $http({
            url:leagueUrlBase + "/validateStartDatePassed",
            method: "GET",
            params: {
                leagueName : $rootScope.officialLeague
            }
        }).success(function(data) {
            $scope.startDatePassed = data;
        });
    }


    if($rootScope.officialLogin)
        $scope.viewSchedule($rootScope.officialLeague, $scope.weekList[0]);
    else
        $scope.getLeagueNameList();

    $scope.viewResult = function(leagueSelected, weekSelected) {
        if(!$rootScope.officialLogin) {
            $http({
                url:teamUrlBase + "/findByLeagueName",
                method: "GET",
                params: {
                    leagueName : leagueSelected.leagueName
                }
            }).success(function(data) {
                $scope.resultView = true;
                $scope.viewMatch = false;
                $scope.teamList = [];
                for (var i=0; i<data.length; i++) {
                    $scope.teamList.push(data[i])
                }
                $scope.teamScoreList = [];
                for(var j=0; j< $scope.teamList.length; j++) {
                    switch(weekSelected) {
                        case 1:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week1));
                            break;
                        case 2:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week2));
                            break;
                        case 3:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week3));
                            break;
                        case 4:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week4));
                            break;
                        case 5:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week5));
                            break;
                        case 6:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week6));
                            break;
                        case 7:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week7));
                            break;
                        case 8:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week8));
                            break;
                    }
                }
            })
        } else {
            $http({
                url:teamUrlBase + "/findByLeagueName",
                method: "GET",
                params: {
                    leagueName : $rootScope.officialLeague
                }
            }).success(function(data) {
                $scope.resultView = true;
                $scope.viewMatch = false;
                $scope.teamList = [];
                for (var i=0; i<data.length; i++) {
                    $scope.teamList.push(data[i])
                }
                $scope.teamScoreList = [];
                for(var j=0; j< $scope.teamList.length; j++) {
                    switch(weekSelected) {
                        case 1:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week1));
                            break;
                        case 2:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week2));
                            break;
                        case 3:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week3));
                            break;
                        case 4:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week4));
                            break;
                        case 5:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week5));
                            break;
                        case 6:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week6));
                            break;
                        case 7:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week7));
                            break;
                        case 8:
                            $scope.teamScoreList.push(new Team($scope.teamList[j].teamName, $scope.teamList[j].week8));
                            break;
                    }
                }
            })
        }
        $scope.viewLog = false;
        $scope.viewingSchedule = false;
        $scope.viewCurrent = false;
    };

    $scope.generateView = function(leagueSelected, weekSelected) {
        if($scope.viewingSchedule)
            $scope.viewSchedule(leagueSelected, weekSelected);
        else
            $scope.viewResult(leagueSelected, weekSelected);
    };

    $scope.viewCurrent = false;

    $scope.viewCurrentResult = function(leagueSelected) {
        if(!$rootScope.officialLogin) {
            $http({
                url:teamUrlBase + "/findByLeagueName",
                method: "GET",
                params: {
                    leagueName : leagueSelected.leagueName
                }
            }).success(function(data) {
                $scope.resultView = true;
                $scope.viewMatch = false;
                $scope.teamList = [];
                for (var i=0; i<data.length; i++) {
                    $scope.teamList.push(data[i])
                }
            })
        } else {
            $http({
                url:teamUrlBase + "/findByLeagueName",
                method: "GET",
                params: {
                    leagueName : $rootScope.officialLeague
                }
            }).success(function(data) {
                $scope.resultView = true;
                $scope.viewMatch = false;
                $scope.teamList = [];
                for (var i=0; i<data.length; i++) {
                    $scope.teamList.push(data[i])
                }
            })
        }
        $scope.viewCurrent = true;
        $scope.viewLog = false;
    };

    $scope.updateMatchDTO = function(resultOptions, match) {
        match.result = resultOptions;
    };

    $scope.updateMatch = function(matchList) {
        for(var i=0; i<matchList.length; i++) {
            if(matchList[i].result != null && matchList[i].result != "") {
                $http({
                    url: matchUrlBase + "/update",
                    method: "PUT",
                    params: {
                        matchId: matchList[i].matchId,
                        result: matchList[i].result
                    }
                })
            }
        }
    };

    $scope.updateScore = function(leagueName, matchList, weekSelected) {
        for(var i=0; i<matchList.length; i++) {
            if(!matchList[i].confirmed) {
                if(matchList[i].result == "Tied") {
                    $scope.teamScoreMapList[matchList[i].teamName1] = $scope.teamScoreMapList[matchList[i].teamName1] + 3;
                    $scope.teamScoreMapList[matchList[i].teamName2] = $scope.teamScoreMapList[matchList[i].teamName2] + 3;
                    $scope.weeklyScoreMapList[matchList[i].teamName1] = $scope.weeklyScoreMapList[matchList[i].teamName1] + 3;
                    $scope.weeklyScoreMapList[matchList[i].teamName2] = $scope.weeklyScoreMapList[matchList[i].teamName2] + 3;
                } else if(matchList[i].result == matchList[i].teamName1 || matchList[i].result == matchList[i].teamName2) {
                    $scope.teamScoreMapList[matchList[i].result] = $scope.teamScoreMapList[matchList[i].result] + 5;
                    $scope.weeklyScoreMapList[matchList[i].result] = $scope.weeklyScoreMapList[matchList[i].result] + 5;
                    if(matchList[i].result == matchList[i].teamName1) {
                        $scope.teamScoreMapList[matchList[i].teamName2] = $scope.teamScoreMapList[matchList[i].teamName2] + 1;
                        $scope.weeklyScoreMapList[matchList[i].teamName2] = $scope.weeklyScoreMapList[matchList[i].teamName2] + 1;
                    } else {
                        $scope.teamScoreMapList[matchList[i].teamName1] = $scope.teamScoreMapList[matchList[i].teamName1] + 1;
                        $scope.weeklyScoreMapList[matchList[i].teamName1] = $scope.weeklyScoreMapList[matchList[i].teamName1] + 1;
                    }
                } else if(matchList[i].result == "Reschedule") {
                    $scope.teamNameListForReschedule = [matchList[i].teamName1, matchList[i].teamName2];
                    $http({
                        url: matchUrlBase + "/rescheduleMatch",
                        method:"POST",
                        params: {
                            leagueName : leagueName,
                            teamNames : $scope.teamNameListForReschedule
                        }
                    });
                }
            }
        }
        $scope.updateTeam(leagueName, $scope.teamNameList, $scope.teamScoreMapList, $scope.weeklyScoreMapList, weekSelected)
    };

    $scope.updateTeam = function(leagueName, teamNameList, scoreMapList, weeklyScoreMapList, weekSelected) {
        for(var i=0;i<teamNameList.length;i++) {
            $http({
                url:teamUrlBase + "/update",
                method:"PUT",
                params: {
                    leagueName : leagueName,
                    teamName : teamNameList[i],
                    score : scoreMapList[teamNameList[i]],
                    weeklyScore : weeklyScoreMapList[teamNameList[i]],
                    week : weekSelected
                }
            }).success(function(data) {
            });
        }
    };

    $scope.createLog = function(matchList, weekSelected) {
        for(var i = 0; i<matchList.length; i++) {
            if(matchList[i].result != null && matchList[i].result != "" && matchList[i].confirmed != true) {
                $http({
                    url: logUrlBase + "/createMatchLog",
                    method:"POST",
                    params: {
                        leagueName : $rootScope.officialLeague,
                        officialName : $rootScope.officialName,
                        teamName1 : matchList[i].teamName1,
                        teamName2 : matchList[i].teamName2,
                        week : weekSelected
                    }
                })
            }
        }
    };

    $scope.updateResult = function(matchList, weekSelected) {
        $scope.updateMatch(matchList);
        $scope.updateScore($rootScope.officialLeague, matchList, weekSelected);
        $scope.createLog(matchList, weekSelected);
        $scope.viewSchedule($rootScope.officialLeague, weekSelected);
    };

    $scope.logoff = function(weekSelected) {
        $cookieStore.put('officialLogin', false);
        $cookieStore.put('officialLeague', "");
        $cookieStore.put('officialName', "");
        $rootScope.officialLogin = $cookieStore.get('officialLogin');
        $rootScope.officialLeague = $cookieStore.get('officialLeague');
        $rootScope.officialName = $cookieStore.get('officialName');
        $scope.viewLog = false;
        $scope.getLeagueNameList();
        $scope.viewSchedule($scope.leagueList[0], weekSelected);
    };

    $scope.populateLog = function() {
        $http({
            url: logUrlBase + "/findAllLogsByLeagueName",
            method:"GET",
            params: {
                leagueName: $rootScope.officialLeague
            }
        }).success(function(data) {
            $scope.viewLog = true;
            $scope.viewCurrent = false;
            $scope.logList = data;
        });
    };

    $scope.populateSchedule = function() {
        $cookieStore.put('matchUpdated', false);
        $location.path('/officialPage');
    };

    $scope.updateSchedule = function() {
        $cookieStore.put('matchUpdated', true);
        $location.path('/officialPage');
    };
});