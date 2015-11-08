package demo.model;

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
@Table(name="official")
@Data
public class Official {

    @Id
    private String officialId;

    @NotNull
    private String leagueName;

    @NotNull
    private String officialName;

    @NotNull
    private String officialUsername;

    @NotNull
    private String officialPassword;

    public Official() {
    }

    public Official(String leagueName, String officialName, String officialUsername, String officialPassword) {
        this.officialId = UUID.randomUUID().toString();
        this.officialName = officialName;
        this.leagueName = leagueName;
        this.officialUsername = officialUsername;
        this.officialPassword = officialPassword;
    }
}
