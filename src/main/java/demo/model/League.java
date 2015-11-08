package demo.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by ayoung on 2015. 10. 16..
 */

@Entity
@Table(name="League")
@Data
public class League {

    @Id
    @Column(unique = true)
    private String leagueName;

    private Date startDate;

    private Date endDate;

    public League() {}

    public League(String leagueName) {
        this.leagueName = leagueName;
    }

}
