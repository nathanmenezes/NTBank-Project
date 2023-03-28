package br.com.nt.ntbank.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    
    public void configure(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
        .csrf().disable()
        .authorizeHttpRequests()
        .antMatchers(HttpMethod.POST, "/ntbank/cadastrar").permitAll()
        .antMatchers(HttpMethod.POST, "/ntbank/login").permitAll()
        .anyRequest().authenticated().and().cors();
        

        httpSecurity.addFilterBefore(new SecurityFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
