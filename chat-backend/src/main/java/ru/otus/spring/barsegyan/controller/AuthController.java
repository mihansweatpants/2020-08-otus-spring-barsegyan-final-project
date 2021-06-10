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
import ru.otus.spring.barsegyan.service.security.LocalAuthenticationService;

import javax.validation.Valid;

@Api
@RestController
public class AuthController {
    private final LocalAuthenticationService localAuthenticationService;
    private final AppUserService appUserService;

    public AuthController(LocalAuthenticationService localAuthenticationService,
                          AppUserService appUserService) {
        this.localAuthenticationService = localAuthenticationService;
        this.appUserService = appUserService;
    }

    @PostMapping("/api/auth/sign-in")
    public ApiResponse<String> signIn(@RequestBody LoginDto loginDto) {
        String token = localAuthenticationService.authenticate(loginDto.getEmail(), loginDto.getPassword());

        return ApiResponse.ok(token);
    }

    @PostMapping("/api/auth/sign-up")
    ApiResponse<String> signUp(@RequestBody @Valid CreateUserDto createUserDto) {
        AppUser appUser = appUserService.create(createUserDto);

        String token = localAuthenticationService.authenticate(appUser.getEmail(), createUserDto.getPassword());

        return ApiResponse.ok(token);
    }
}
