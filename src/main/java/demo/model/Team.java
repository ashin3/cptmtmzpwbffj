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
    private int week1;

    @NotNull
    private int week2;

    @NotNull
    private int week3;

    @NotNull
    private int week4;

    @NotNull
    private int week5;

    @NotNull
    private int week6;

    @NotNull
    private int week7;

    @NotNull
    private int week8;

    @NotNull
    private int score;

    public Team() {}

    public Team(String leagueName, String teamName) {
        this.teamId = UUID.randomUUID().toString();
        this.leagueName = leagueName;
        this.teamName = teamName;
        this.week1 = 0;
        this.week2 = 0;
        this.week3 = 0;
        this.week4 = 0;
        this.week5 = 0;
        this.week6 = 0;
        this.week7 = 0;
        this.week8 = 0;
        this.score = 0;
    }
}
