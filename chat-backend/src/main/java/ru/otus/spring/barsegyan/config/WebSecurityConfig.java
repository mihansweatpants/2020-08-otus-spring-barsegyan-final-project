package ru.otus.spring.barsegyan.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.savedrequest.NullRequestCache;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .formLogin().disable()
                .httpBasic().disable()
                .logout().disable()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/ws").permitAll()
                .antMatchers("/actuator/**").permitAll()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/v2/api-docs", "/configuration/**", "/swagger*/**", "/webjars/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .requestCache(requestCache -> requestCache.requestCache(new NullRequestCache()))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER);
    }

    @Bean
    public AuthenticationManager customAuthenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
