package demo.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

/**
 * Created by ayoung on 2015. 11. 6..
 */

@Entity
@Table(name="ActivityLog")
@Data
public class Log {

    @Id
    private String logId;

    private String leagueName;

    private String date;

    private String officialName;

    private String activity;

    public Log() {}

    public Log(String leagueName, String officialName, String activity) {
        this.logId = UUID.randomUUID().toString();
        this.leagueName = leagueName;
        Calendar cal = Calendar.getInstance();
        this.date = getParsedDateFromDate(cal.getTime());
        this.officialName = officialName;
        this.activity = activity;
    }

    private String getParsedDateFromDate(Date date) {
        String pattern = "MM/dd/yyyy hh:mm:ss aaa";
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        return format.format(date);
    }
}
