package ru.otus.spring.barsegyan.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.otus.spring.barsegyan.domain.AppUser;
import ru.otus.spring.barsegyan.dto.rest.base.ApiResponse;
import ru.otus.spring.barsegyan.dto.rest.request.LoginDto;
import ru.otus.spring.barsegyan.dto.rest.request.CreateUserDto;
import ru.otus.spring.barsegyan.service.AppUserService;
import ru.otus.spring.barsegyan.service.AuthenticationService;

import javax.validation.Valid;

@Api
@RestController
public class AuthController {
    private final AuthenticationService authenticationService;
    private final AppUserService appUserService;

    public AuthController(AuthenticationService authenticationService,
                          AppUserService appUserService) {
        this.authenticationService = authenticationService;
        this.appUserService = appUserService;
    }

    @PostMapping("/api/auth/sign-in")
    public ApiResponse<String> signIn(@RequestBody LoginDto loginDto) {
        String token = authenticationService.authenticate(loginDto.getUsername(), loginDto.getPassword());

        return ApiResponse.ok(token);
    }

    @PostMapping("/api/auth/sign-up")
    ApiResponse<String> signUp(@RequestBody @Valid CreateUserDto createUserDto) {
        AppUser appUser = appUserService.create(createUserDto);

        String token = authenticationService.authenticate(appUser.getUsername(), createUserDto.getPassword());

        return ApiResponse.ok(token);
    }
}
