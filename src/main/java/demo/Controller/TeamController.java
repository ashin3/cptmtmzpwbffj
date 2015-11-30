package demo.Controller;

import demo.Dao.TeamDao;
import demo.model.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by ayoung on 2015. 10. 19..
 */
@Controller
@RequestMapping("/team")
public class TeamController {

    @Autowired
    TeamDao teamDao;

    @RequestMapping(value = "/create")
    @ResponseBody
    public void createTeam(@RequestParam String leagueName, String teamName) {
        Team team = new Team(leagueName, teamName);
        teamDao.save(team);
    }

    @RequestMapping(value = "/update")
    @ResponseBody
    public void updateTeam(@RequestParam String leagueName, String teamName, int score, int weeklyScore, int week) {
        Team team = teamDao.findByLeagueNameAndTeamName(leagueName.replace("\"", ""), teamName.replace("\"", ""));
        team.setScore(score);
        switch (week) {
            case 1:
                team.setWeek1(weeklyScore);
                break;
            case 2:
                team.setWeek2(weeklyScore);
                break;
            case 3:
                team.setWeek3(weeklyScore);
                break;
            case 4:
                team.setWeek4(weeklyScore);
                break;
            case 5:
                team.setWeek5(weeklyScore);
                break;
            case 6:
                team.setWeek6(weeklyScore);
                break;
            case 7:
                team.setWeek7(weeklyScore);
                break;
            case 8:
                team.setWeek8(weeklyScore);
                break;
        }

        teamDao.save(team);
    }

    @RequestMapping(value = "/findByLeagueNameAndTeamName")
    @ResponseBody
    public Team findByLeagueName(@RequestParam String leagueName, String teamName) {
        return teamDao.findByLeagueNameAndTeamName(leagueName.replace("\"", ""), teamName.replace("\"", ""));
    }

    @RequestMapping(value = "/findByLeagueName")
    @ResponseBody
    public List<Team> findByLeagueName(@RequestParam String leagueName) {
        return teamDao.findByLeagueName(leagueName.replace("\"", ""));
    }

    @RequestMapping(value = "/deleteByLeagueName")
    @ResponseBody
    public void deleteByLeagueName(@RequestParam String leagueName) {
        List<Team> teamList = teamDao.findByLeagueName(leagueName);
        teamDao.deleteInBatch(teamList);
    }
}
