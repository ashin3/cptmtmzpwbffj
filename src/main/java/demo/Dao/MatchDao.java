package demo.Dao;

import demo.enums.TimeOfDay;
import demo.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by ayoung on 2015. 10. 14..
 */

@Transactional
public interface MatchDao extends JpaRepository<Match, Long>{

    @Query(value = "SELECT x FROM Match x WHERE x.leagueName= :leagueName AND x.week= :week ORDER BY x.timeOfDay")
    List<Match> findByLeagueNameAndWeek(@Param("leagueName") String leagueName, @Param("week") int week);

    @Query(value = "SELECT x FROM Match x WHERE x.matchId= :matchId")
    Match findByMatchId(@Param("matchId") String matchId);

    @Query(value = "SELECT x FROM Match x WHERE x.leagueName= :leagueName AND x.week= :week  AND x.timeOfDay= :timeOfDay")
    List<Match> findByLeagueNameAndWeekAndTimeOfDay(@Param("leagueName") String leagueName, @Param("week") int week, @Param("timeOfDay") TimeOfDay timeOfDay);

    @Query(value = "SELECT x FROM Match x WHERE x.leagueName= :leagueName")
    List<Match> findByLeagueName(@Param("leagueName") String leagueName);

}

