package demo.Dao;

import demo.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by ayoung on 2015. 10. 19..
 */

@Transactional
public interface TeamDao extends JpaRepository<Team, Long>{

    @Query(value = "SELECT x FROM Team x WHERE x.leagueName= :leagueName order by  x.score DESC")
    List<Team> findByLeagueName(@Param("leagueName") String leagueName);

    @Query(value = "SELECT x FROM Team x WHERE x.leagueName= :leagueName AND x.teamName= :teamName")
    Team findByLeagueNameAndTeamName(@Param("leagueName") String leagueName, @Param("teamName") String teamName);

}
