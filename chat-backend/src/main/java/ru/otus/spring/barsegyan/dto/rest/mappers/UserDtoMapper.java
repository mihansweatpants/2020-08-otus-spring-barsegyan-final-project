package ru.otus.spring.barsegyan.dto.rest.mappers;

import ru.otus.spring.barsegyan.domain.AppUser;
import ru.otus.spring.barsegyan.dto.rest.response.UserDto;
import ru.otus.spring.barsegyan.type.UserPrincipal;

public class UserDtoMapper {
    public static UserDto map(AppUser appUser, Boolean isOnline) {
        return new UserDto(
                appUser.getId(),
                appUser.getUsername(),
                appUser.getEmail(),
                isOnline,
                appUser.getAvatarUrl()
        );
    }

    public static UserDto map(UserPrincipal userInSession, Boolean isOnline) {
        return new UserDto(
                userInSession.getUserId(),
                userInSession.getUsername(),
                userInSession.getEmail(),
                isOnline,
                userInSession.getAvatarUrl()
        );
    }
}
