package ru.otus.spring.barsegyan.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.session.SessionRepository;
import org.springframework.stereotype.Service;
import ru.otus.spring.barsegyan.domain.AppUser;
import ru.otus.spring.barsegyan.dto.rest.mappers.UserDtoMapper;
import ru.otus.spring.barsegyan.dto.rest.response.UserDto;
import ru.otus.spring.barsegyan.type.AppUserDetails;
import ru.otus.spring.barsegyan.util.UTCTimeUtils;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SessionService {
    private static final long MINUTES_SINCE_LAST_ACTIVITY_TO_BE_CONSIDERED_ONLINE = 1;

    private final FindByIndexNameSessionRepository<? extends Session> findByIndexNameSessionRepository;

    public SessionService(FindByIndexNameSessionRepository<? extends Session> findByIndexNameSessionRepository) {
        this.findByIndexNameSessionRepository = findByIndexNameSessionRepository;
    }

    public AppUserDetails getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return (AppUserDetails) principal;
    }

    public void invalidateSession(String sessionId) {
        findByIndexNameSessionRepository.deleteById(sessionId);
    }

    public boolean isUserOnline(String username) {
        LocalDateTime now = UTCTimeUtils.now();

        return findByIndexNameSessionRepository
                .findByPrincipalName(username)
                .values()
                .stream()
                .anyMatch(session -> {
                    LocalDateTime lastAccessedTime = UTCTimeUtils.toDate(session.getLastAccessedTime());

                    long minutesSinceLastActivity = Duration.between(lastAccessedTime, now).abs().toMinutes();

                    return minutesSinceLastActivity <= MINUTES_SINCE_LAST_ACTIVITY_TO_BE_CONSIDERED_ONLINE;
                });
    }

    public List<UserDto> mapOnlineStatus(Collection<AppUser> users) {
        return users.stream()
                .map(user -> UserDtoMapper.map(user, isUserOnline(user.getUsername())))
                .collect(Collectors.toList());
    }

    public UserDto mapOnlineStatus(AppUser user) {
        return UserDtoMapper.map(user, isUserOnline(user.getUsername()));
    }

    public List<? extends Session> getUserSessions(String username) {
        return new ArrayList<>(findByIndexNameSessionRepository.findByPrincipalName(username).values());
    }

    public Session createSession(Authentication authentication) {
        Session newSession = findByIndexNameSessionRepository.createSession();
        newSession.setMaxInactiveInterval(Duration.ofHours(720));

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);

        newSession.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);
        ((SessionRepository) findByIndexNameSessionRepository).save(newSession);

        return newSession;
    }

    public Authentication getAuthentication(String token) {
        Session session = findByIndexNameSessionRepository.findById(token);

        SecurityContext securityContext = session.getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);

        return securityContext.getAuthentication();
    }
}
