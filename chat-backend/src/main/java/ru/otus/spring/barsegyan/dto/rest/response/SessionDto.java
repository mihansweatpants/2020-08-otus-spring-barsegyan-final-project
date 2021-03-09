package ru.otus.spring.barsegyan.dto.rest.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.otus.spring.barsegyan.type.SessionDetails;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SessionDto {
    private final String id;
    private final LocalDateTime lastAccessedTime;
    private final Boolean expired;
    private final SessionDetails details;
}
