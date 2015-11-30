package demo.model;

import demo.enums.TimeOfDay;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.UUID;

/**
 * Created by ayoung on 2015. 10. 14..
 */

@Entity
@Table(name="Matches")
@Data
public class Match {
    @Id
    private String matchId;

    @NotNull
    private String leagueName;

    @NotNull
    private TimeOfDay timeOfDay;

    @NotNull
    private int week;

    @NotNull
    private String teamName1;

    @NotNull
    private String teamName2;

    private String result;

    @NotNull
    private Boolean confirmed;

    public Match() {}

    public Match(String leagueName, TimeOfDay timeOfDay, int week, String teamName1, String teamName2) {
        this.matchId = UUID.randomUUID().toString();
        this.leagueName = leagueName;
        this.timeOfDay = timeOfDay;
        this.week = week;
        this.teamName1 = teamName1;
        this.teamName2 = teamName2;
        this.confirmed = false;
    }
}