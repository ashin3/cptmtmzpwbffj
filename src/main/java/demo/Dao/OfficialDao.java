package demo.Dao;

import demo.model.Official;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by ayoung on 2015. 10. 14..
 */

@Transactional
public interface OfficialDao extends JpaRepository<Official, Long> {

    @Query(value = "SELECT x FROM Official x WHERE x.leagueName= :leagueName AND x.officialUsername= :officialUsername")
    Official findByLeagueAndOfficialId(@Param("leagueName") String leagueName, @Param("officialUsername") String officialUsername);

    @Query(value = "SELECT x FROM Official x WHERE x.leagueName= :leagueName")
    List<Official> findByLeagueName(@Param("leagueName") String leagueName);

}

