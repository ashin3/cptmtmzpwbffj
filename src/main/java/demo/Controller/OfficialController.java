package demo.Controller;

import demo.Dao.OfficialDao;
import demo.model.Official;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by ayoung on 2015. 10. 14..
 */

@Controller
@RequestMapping("/official")
public class OfficialController {

    @Autowired
    OfficialDao officialDao;

    @RequestMapping(value = "/create")
    @ResponseBody
    public void createOfficial(@RequestParam String leagueName, String officialName, String officialUsername, String officialPassword) {
        Official official = new Official(leagueName, officialName, officialUsername, officialPassword);
        officialDao.save(official);
    }

    @RequestMapping(value = "/findByLeagueAndOfficialId")
    @ResponseBody
    public Official findByLeagueAndOfficialId(@RequestParam String leagueName, String officialUsername) {
        return officialDao.findByLeagueAndOfficialId(leagueName, officialUsername);
    }

    @RequestMapping(value = "/findByLeagueName")
    @ResponseBody
    public List<Official> findByLeagueName(@RequestParam String leagueName) {
        return officialDao.findByLeagueName(leagueName.replace("\"", ""));
    }

    @RequestMapping(value = "/deleteAllByLeagueName")
    @ResponseBody
    public void deleteAllByLeagueName(@RequestParam String leagueName) {
        List<Official> officialList = officialDao.findByLeagueName(leagueName.replace("\"", ""));
        officialDao.deleteInBatch(officialList);
    }
}
