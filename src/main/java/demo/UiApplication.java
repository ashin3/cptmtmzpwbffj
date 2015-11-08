package demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@SpringBootApplication
@EnableAutoConfiguration
@Configuration
public class UiApplication{

  public static void main(String[] args) {
    ApplicationContext ctx = SpringApplication.run(UiApplication.class, args);

    EntityManagerFactory bean = ctx.getBean(EntityManagerFactory.class);
    System.out.println(bean);
  }

  @Value("${spring.datasource.driverClassName}")
  private String databaseDriverClassName;

  @Value("${spring.datasource.url}")
  private String datasourceUrl;

  @Value("${spring.datasource.username}")
  private String databaseUsername;

  @Value("${spring.datasource.password}")
  private String databasePassword;

  @Bean
  public DataSource datasource() {
    org.apache.tomcat.jdbc.pool.DataSource ds = new org.apache.tomcat.jdbc.pool.DataSource();
    ds.setDriverClassName(databaseDriverClassName);
    ds.setUrl(datasourceUrl);
    ds.setUsername(databaseUsername);
    ds.setPassword(databasePassword);

    return ds;
  }

}
