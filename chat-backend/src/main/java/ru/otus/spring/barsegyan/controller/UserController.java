package ru.otus.spring.barsegyan.controller;

import io.swagger.annotations.Api;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.otus.spring.barsegyan.domain.AppUser;
import ru.otus.spring.barsegyan.dto.rest.base.ApiResponse;
import ru.otus.spring.barsegyan.dto.rest.base.Pagination;
import ru.otus.spring.barsegyan.dto.rest.mappers.UserDtoMapper;
import ru.otus.spring.barsegyan.dto.rest.response.UserDto;
import ru.otus.spring.barsegyan.service.AppUserService;
import ru.otus.spring.barsegyan.service.SessionService;

@Api
@RestController
public class UserController {

    private final SessionService sessionService;
    private final AppUserService appUserService;

    public UserController(SessionService sessionService,
                          AppUserService appUserService) {
        this.sessionService = sessionService;
        this.appUserService = appUserService;
    }

    @GetMapping("/api/users/me")
    public ApiResponse<UserDto> getCurrentUser() {
        return ApiResponse.ok(UserDtoMapper.map(sessionService.getCurrentUser(), true));
    }

    @GetMapping("/api/users/search")
    public ApiResponse<Pagination<UserDto>> searchUsers(
            @RequestParam(value = "searchText", required = false) String searchText,
            @RequestParam(value = "limit", defaultValue = "10") Integer limit,
            @RequestParam(value = "page", defaultValue = "0") Integer page
    ) {
        Page<AppUser> users = appUserService.search(searchText, PageRequest.of(page, limit));

        return ApiResponse.ok(Pagination.of(
                sessionService.mapOnlineStatus(users.getContent()),
                users.getTotalPages(),
                users.getTotalElements()
        ));
    }
}
