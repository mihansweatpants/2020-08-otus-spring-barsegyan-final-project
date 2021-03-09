package ru.otus.spring.barsegyan.dto.rest.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateUserDto {
    private final String username;
    private final String email;
    private final String password;
}
