package ru.otus.spring.barsegyan.dto.rest.mappers;

import ru.otus.spring.barsegyan.domain.AppUser;
import ru.otus.spring.barsegyan.dto.rest.response.UserDto;
import ru.otus.spring.barsegyan.type.AppUserDetails;

public class UserDtoMapper {
    public static UserDto map(AppUser appUser, Boolean isOnline) {
        return new UserDto(
                appUser.getId(),
                appUser.getUsername(),
                appUser.getEmail(),
                isOnline
        );
    }

    public static UserDto map(AppUserDetails appUserDetails, Boolean isOnline) {
        return new UserDto(
                appUserDetails.getUserId(),
                appUserDetails.getUsername(),
                appUserDetails.getEmail(),
                isOnline
        );
    }
}
