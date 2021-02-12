package ru.otus.spring.barsegyan.service.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.otus.spring.barsegyan.domain.AppUser;
import ru.otus.spring.barsegyan.exception.NotFoundException;
import ru.otus.spring.barsegyan.service.AppUserService;
import ru.otus.spring.barsegyan.type.AppUserDetails;

@Service
public class AppUserDetailsService implements UserDetailsService {
    private static final Logger logger = LoggerFactory.getLogger(UserDetailsService.class);

    private final AppUserService appUserService;

    public AppUserDetailsService(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            AppUser user = appUserService.getByUsername(username);

            logger.info("loadByUsername() : {}", username);

            return new AppUserDetails(user);
        }
        catch (NotFoundException e) {
            throw new UsernameNotFoundException(e.getMessage());
        }
    }
}
