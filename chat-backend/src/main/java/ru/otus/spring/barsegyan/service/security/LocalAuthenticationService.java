package ru.otus.spring.barsegyan.service.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.session.Session;
import org.springframework.stereotype.Service;

@Service
public class LocalAuthenticationService {

    private final SessionService sessionService;
    private final AuthenticationManager authenticationManager;

    public LocalAuthenticationService(SessionService sessionService,
                                      AuthenticationManager authenticationManager) {
        this.sessionService = sessionService;
        this.authenticationManager = authenticationManager;
    }

    public String authenticate(String email, String password) {
        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        }
        catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid username or password", e);
        } catch (AuthenticationException e) {
            throw new RuntimeException("Authentication error", e);
        }

        Session session = sessionService.createSession(authentication);

        return session.getId();
    }
}
