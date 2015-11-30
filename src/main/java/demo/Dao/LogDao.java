package demo.Dao;

import demo.model.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by ayoung on 2015. 11. 6..
 */
@Transactional
public interface LogDao extends JpaRepository<Log, Long>{

    @Query(value = "SELECT x FROM Log x WHERE x.leagueName= :leagueName ORDER BY x.date DESC")
    List<Log> findAllLogsByLeagueName(@Param("leagueName") String leagueName);

}
