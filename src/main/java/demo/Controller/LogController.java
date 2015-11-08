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

    @RequestMapping(value = "/create")
    @ResponseBody
    public void createOfficial(@RequestParam String leagueName, String officialName, String activity) {
        Log log = new Log(leagueName, officialName, activity);
        logDao.save(log);
    }}
