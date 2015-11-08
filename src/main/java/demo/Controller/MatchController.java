package demo.Controller;

import demo.Dao.MatchDao;
import demo.enums.TimeOfDay;
import demo.model.Match;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by ayoung on 2015. 10. 14..
 */

@Controller
@RequestMapping("/match")
public class MatchController {

    @Autowired
    MatchDao matchDao;

    @RequestMapping(value = "/create")
    @ResponseBody
    public void createMatch(@RequestParam String leagueName, String[] teamNames) {
        int num_teams = teamNames.length;

        TimeOfDay timeOfDay;

        ArrayList<Integer> index = new ArrayList<>();
        for(int i = 0; i<num_teams; i++) {
            index.add(i);
        }
        ArrayList<String> team_name = new ArrayList<>();
        for(int i = 0; i<num_teams; i++) {
            team_name.add(teamNames[i]);
        }
        for(int loop = 0; loop<4; loop+=3) {
            if (num_teams % 2 == 0) {
                for (int i = 0; i < num_teams - 1; i++) {
                    int week = i % 3 + 1 + loop;
                    if (i < 3)
                        timeOfDay = TimeOfDay.MORNING;
                    else if (i < 6)
                        timeOfDay = TimeOfDay.AFTERNOON;
                    else
                        timeOfDay = TimeOfDay.EVENING;
                    for (int j = 0; j < num_teams / 2; j++) {
                        matchDao.save(new Match(leagueName, timeOfDay, week, team_name.get(index.get(j)), team_name.get(index.get(num_teams - j - 1))));
                    }
                    Collections.rotate(index.subList(0, num_teams - 1), -1);
                }
            } else {
                for (int i = 0; i < num_teams; i++) {
                    int week = i % 3 + 1 + loop;
                    if (i < 3)
                        timeOfDay = TimeOfDay.MORNING;
                    else if (i < 6)
                        timeOfDay = TimeOfDay.AFTERNOON;
                    else
                        timeOfDay = TimeOfDay.EVENING;
                    for (int j = 0; j < num_teams / 2; j++) {
                        matchDao.save(new Match(leagueName, timeOfDay, week, team_name.get(index.get(j)), team_name.get(index.get(num_teams - j - 1))));
                    }
                    Collections.rotate(index.subList(0, num_teams), -1);
                }
            }
        }
    }

    @RequestMapping(value = "/rescheduleMatch")
    @ResponseBody
    public boolean rescheduleMatch(@RequestParam String leagueName, String[] teamNames) {
        TimeOfDay[] timeOfDay = {TimeOfDay.MORNING, TimeOfDay.AFTERNOON, TimeOfDay.EVENING};
        boolean matchCreated = false;
        outerLoop:
        for(int i=7; i<9; i++) {
            for(int j=0; j<3; j++) {
                List<Match> matchList = matchDao.findByLeagueNameAndWeekAndTimeOfDay(leagueName, i, timeOfDay[j]);
                if(matchList.size() == 0) {
                    matchDao.save(new Match(leagueName, timeOfDay[j], i, teamNames[0], teamNames[1]));
                    matchCreated = true;
                    break outerLoop;
                } else if(matchList.size() < 6) {
                    boolean create = true;
                    for(int z=0; z<matchList.size(); z++) {
                        if(Arrays.asList(teamNames).contains(matchList.get(z).getTeamName1()) || Arrays.asList(teamNames).contains(matchList.get(z).getTeamName2())) {
                            create = false;
                        }
                    }
                    if(create) {
                        matchDao.save(new Match(leagueName, timeOfDay[j], i, teamNames[0], teamNames[1]));
                        matchCreated = true;
                        break outerLoop;
                    }
                }
            }
        }
        return matchCreated;
    }

    @RequestMapping(value = "/findByLeagueNameAndWeek")
    @ResponseBody
    public List<Match> findByLeagueNameAndWeek(@RequestParam String leagueName, int week) {
        return matchDao.findByLeagueNameAndWeek(leagueName.replace("\"", ""), week);
    }

    @RequestMapping(value = "/findByLeagueNameAndWeekAndTimeOfDay")
    @ResponseBody
    public List<Match> findByLeagueNameAndWeek(@RequestParam String leagueName, int week, TimeOfDay timeOfDay) {
        return matchDao.findByLeagueNameAndWeekAndTimeOfDay(leagueName.replace("\"", ""), week, timeOfDay);
    }

    @RequestMapping(value = "/update")
    @ResponseBody
    public void updateMatch(@RequestParam String matchId, String result) {
        Match match = matchDao.findByMatchId(matchId.replace("\"", ""));
        match.setResult(result);
        matchDao.save(match);
    }

    @RequestMapping(value= "/findByMatchId")
    @ResponseBody
    public Match findByMatchId(@RequestParam String matchId) {
        return  matchDao.findByMatchId(matchId);
    }

    @RequestMapping(value= "/findByLeagueName")
    @ResponseBody
    public List<Match> findByLeagueName(@RequestParam String leagueName) {
        return matchDao.findByLeagueName(leagueName.replace("\"", ""));
    }

    @RequestMapping(value="/deleteByLeagueName")
    @ResponseBody
    public void deleteByLeagueName(@RequestParam String leagueName) {
        List<Match> matchList = matchDao.findByLeagueName(leagueName);
        matchDao.deleteInBatch(matchList);
    }
}
