package demo.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.UUID;

/**
 * Created by ayoung on 2015. 10. 19..
 */

@Entity
@Table(name="Team")
@Data
public class Team {

    @Id
    private String teamId;

    @NotNull
    private String leagueName;

    @NotNull
    private String teamName;

    @NotNull
    private int score;

    public Team() {}

    public Team(String leagueName, String teamName) {
        this.teamId = UUID.randomUUID().toString();
        this.leagueName = leagueName;
        this.teamName = teamName;
        this.score = 0;
    }
}
