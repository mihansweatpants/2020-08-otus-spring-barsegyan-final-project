package ru.otus.spring.barsegyan.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.otus.spring.barsegyan.dto.rest.base.ApiResponse;
import ru.otus.spring.barsegyan.dto.rest.mappers.SessionDtoMapper;
import ru.otus.spring.barsegyan.dto.rest.request.InvalidateSessionsDto;
import ru.otus.spring.barsegyan.dto.rest.response.SessionDto;
import ru.otus.spring.barsegyan.service.SessionService;

import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Api
@RestController
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping("/api/sessions")
    public ApiResponse<List<SessionDto>> getUserSessions() {
        var sessions = sessionService.getUserSessions(sessionService.getCurrentUser().getUsername());

        return ApiResponse.ok(
                sessions
                        .stream()
                        .map(SessionDtoMapper::map)
                        .collect(Collectors.toList()));
    }

    @PostMapping("/api/sessions/logout-current")
    public ApiResponse<Void> invalidateCurrentSession(HttpSession httpSession) {
        sessionService.invalidateSession(httpSession.getId());

        return ApiResponse.ok();
    }

    @PostMapping("/api/sessions/logout-all")
    public ApiResponse<Void> invalidateSessions(@RequestBody InvalidateSessionsDto invalidateSessionsDto) {
        invalidateSessionsDto.getSessionIds().forEach(sessionService::invalidateSession);

        return ApiResponse.ok();
    }
}
