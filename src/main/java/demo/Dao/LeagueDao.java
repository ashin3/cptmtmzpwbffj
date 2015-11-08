package demo.Dao;

import demo.model.League;
import demo.model.Official;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

/**
 * Created by ayoung on 2015. 10. 19..
 */
@Transactional
public interface LeagueDao extends JpaRepository<League, Long>{

    @Query(value = "SELECT x FROM League x WHERE x.leagueName= :leagueName")
    League findByLeagueName(@Param("leagueName") String leagueName);

}
