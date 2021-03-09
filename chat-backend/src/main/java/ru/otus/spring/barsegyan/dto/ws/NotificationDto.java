package ru.otus.spring.barsegyan.dto.ws;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotificationDto {
    private final NotificationType type;
    private final Object payload;
}
