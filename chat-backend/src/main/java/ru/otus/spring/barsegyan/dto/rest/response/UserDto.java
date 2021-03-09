package ru.otus.spring.barsegyan.dto.rest.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UserDto {
    private final UUID id;
    private final String username;
    private final String email;
    private final Boolean isOnline;
}
