package ru.otus.spring.barsegyan.dto.rest.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class ChatReadMarkDto {
    private final UUID id;
    private final UUID chatId;
    private final UUID lastReadMessageId;
}
