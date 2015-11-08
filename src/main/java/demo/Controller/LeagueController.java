package demo.Controller;

import demo.Dao.LeagueDao;
import demo.model.League;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by ayoung on 2015. 10. 19..
 */

@Controller
@RequestMapping("/league")
public class LeagueController {

    @Autowired
    LeagueDao leagueDao;

    @RequestMapping(value = "/create")
    @ResponseBody
    public void createLeague(@RequestParam String leagueName) {
        League league = new League(leagueName);
        leagueDao.save(league);
    }

    @RequestMapping(value = "/updateStartDate")
    @ResponseBody
    public boolean updateStartDate(@RequestParam String leagueName, String startDate) {
        League league = leagueDao.findByLeagueName(leagueName);
        try {
            league.setStartDate(getParsedDateFromString(startDate));
            league.setEndDate(getDateAfterEightWeeks(getParsedDateFromString(startDate)));
            leagueDao.save(league);
            return true;
        } catch (ParseException e) {
            return false;
        }
    }


    @RequestMapping(value = "/findAll")
    @ResponseBody
    public List<League> getLeagueName() {
        return leagueDao.findAll();
    }

    @RequestMapping(value = "/findByLeagueName")
    @ResponseBody
    public League findByLeagueName(@RequestParam String leagueName) {
        return leagueDao.findByLeagueName(leagueName);
    }

    private Date getParsedDateFromString(String date) throws ParseException{
        String pattern = "MM/dd/yyyy";
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        Date newDate = format.parse(date);
        return newDate;
    }

    private Date getDateAfterEightWeeks(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, 56);
        return calendar.getTime();
    }

    @RequestMapping(value = "/getStartDateByLeagueName")
    @ResponseBody
    public String getStartDate(@RequestParam String leagueName) {
        League league = leagueDao.findByLeagueName(leagueName);
        try {
            league.getStartDate();
            return "\"" + getParsedDateFromDate(league.getStartDate()) + "\"";
        } catch(NullPointerException e) {
            return null;
        }
    }

    @RequestMapping(value = "/getEndDateByLeagueName")
    @ResponseBody
    public String getEndDate(@RequestParam String leagueName) {
        League league = leagueDao.findByLeagueName(leagueName);
        try {
           league.getEndDate();
            return "\"" + getParsedDateFromDate(league.getEndDate()) + "\"";
        } catch(NullPointerException e) {
            return null;
        }
    }

    @RequestMapping(value = "/getDateByLeagueNameAndWeek")
    @ResponseBody
    public String getDateByLeagueNameAndWeek(@RequestParam String leagueName, int week) {
        League league = leagueDao.findByLeagueName(leagueName);
        try {
            Date startDate = league.getStartDate();
            Calendar cal = Calendar.getInstance();
            cal.setTime(startDate);
            while(cal.get(Calendar.DAY_OF_WEEK) != Calendar.SATURDAY)
                cal.add(Calendar.DAY_OF_WEEK,1);
            cal.add(Calendar.DAY_OF_WEEK, (week - 1) * 7);
            Date sat = cal.getTime();
            return "\"" + getParsedDateFromDate(sat) + "\"";
        } catch (NullPointerException e) {
            return null;
        }
    }

    private String getParsedDateFromDate(Date date) {
        String pattern = "MM/dd/yyyy";
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        return format.format(date);
    }

    @RequestMapping(value = "/validateStartDatePassed")
     @ResponseBody
     public Boolean validateStartDatePassed(@RequestParam String leagueName) {
        League league = leagueDao.findByLeagueName(leagueName);
        try {
            Date date = league.getStartDate();
            Calendar cal = Calendar.getInstance();
            return cal.getTime().after(date);
        } catch (NullPointerException e) {
            return true;
        }
    }

    @RequestMapping(value = "/validateDateByLeagueNameAndWeek")
    @ResponseBody
    public Boolean validateMatchCanBeConfirmed(@RequestParam String leagueName, int week) {
        League league = leagueDao.findByLeagueName(leagueName);
        try {
            Date startDate = league.getStartDate();
            Calendar cal = Calendar.getInstance();
            Date currentDate = cal.getTime();
            cal.setTime(startDate);
            while(cal.get(Calendar.DAY_OF_WEEK) != Calendar.SATURDAY)
                cal.add(Calendar.DAY_OF_WEEK,1);
            cal.add(Calendar.DAY_OF_WEEK, (week - 1) * 7);
            Date sat = cal.getTime();
            return currentDate.after(sat);
        } catch (NullPointerException e) {
            return true;
        }
    }
}
