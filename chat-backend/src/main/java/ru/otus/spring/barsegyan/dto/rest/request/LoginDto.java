package ru.otus.spring.barsegyan.dto.rest.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginDto {
    private final String username;
    private final String password;
}
