package demo.Controller;

import demo.Dao.LogDao;
import demo.model.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by ayoung on 2015. 11. 6..
 */

@Controller
@RequestMapping("/log")
public class LogController {

    @Autowired
    LogDao logDao;

    @RequestMapping(value = "/findAllLogsByLeagueName")
    @ResponseBody
    public List<Log> findAllLogsByLeagueName(@RequestParam String leagueName) {
        return logDao.findAllLogsByLeagueName(leagueName.replace("\"", ""));
    }

    @RequestMapping(value = "/createMatchLog")
    @ResponseBody
    public void createMatchLog(@RequestParam String leagueName,
                            String officialName,
                            String teamName1,
                            String teamName2,
                            int week) {
        String activity;
        Log log;
        activity = "Confirmed Week " + week + " Match for " + teamName1 + " : " + teamName2;
        log = new Log(leagueName, officialName, activity);
        logDao.save(log);
    }

    @RequestMapping(value = "/editMatchLog")
    @ResponseBody
    public void editMatchLog(@RequestParam String leagueName,
                               String officialName,
                               String teamName1,
                               String teamName2,
                               int week) {
        String activity;
        Log log;
        activity = "Edited Result for Week " + week + " Match for " + teamName1 + " : " + teamName2;
        log = new Log(leagueName, officialName, activity);
        logDao.save(log);
    }

    @RequestMapping(value = "/deleteByLeagueName")
    @ResponseBody
    public void deleteByLeagueName(@RequestParam String leagueName) {
        List<Log> logList = logDao.findAllLogsByLeagueName(leagueName);
        logDao.deleteInBatch(logList);
    }

    @RequestMapping(value = "/createLog")
    @ResponseBody
    public void createLog(@RequestParam String leagueName,
                               String officialName,
                               String logType) {
        String activity;
        Log log;
        switch (logType) {
            case "CONFIGURE": {
                activity = "Configured Match";
                log = new Log(leagueName, officialName, activity);
                logDao.save(log);
                break;
            }
            case "EDIT": {
                activity = "Edited Match";
                log = new Log(leagueName, officialName, activity);
                logDao.save(log);
                break;
            }
            case "LOGIN": {
                activity = "Logged In";
                log = new Log(leagueName, officialName, activity);
                logDao.save(log);
                break;
            }
        }
    }
}
