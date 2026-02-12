package com.backend.portfolio.security.config;

import javax.sql.DataSource;
import javax.swing.text.html.HTML;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.backend.portfolio.security.jwttoken.AuthEntryPointJwt;
import com.backend.portfolio.security.jwttoken.AuthTokenFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {
        JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
        manager.setUsersByUsernameQuery(
                "SELECT email, password, enabled FROM users WHERE email = ?");

        manager.setAuthoritiesByUsernameQuery(
                "SELECT u.email, a.role " +
                        "FROM users u " +
                        "JOIN authority a ON u.id = a.user_id " +
                        "WHERE u.email = ?");

        return manager;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            AuthTokenFilter jwtFilter,
            AuthEntryPointJwt unauthorizedHandler) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/login/all").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/contacts/health").permitAll()
                        .requestMatchers(HttpMethod.POST, "/contacts").permitAll()
                        .requestMatchers(HttpMethod.GET, "/contacts").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/contacts/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/skills/**").permitAll()
                        .requestMatchers("/skills/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/projects/count").permitAll()
                        .requestMatchers(HttpMethod.GET, "/projects").permitAll()
                        .requestMatchers("/projects/**").hasAuthority("ADMIN")
                        .requestMatchers("/login/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/login/authn").permitAll()
                        .requestMatchers(HttpMethod.GET, "/skills").hasAuthority("ADMIN")
                        .anyRequest().authenticated());

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
