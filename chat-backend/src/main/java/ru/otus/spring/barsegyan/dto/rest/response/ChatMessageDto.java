package ru.otus.spring.barsegyan.dto.rest.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.otus.spring.barsegyan.domain.ChatMessageType;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ChatMessageDto {
    private final UUID id;
    private final UserDto sentBy;
    private final LocalDateTime sentAt;
    private final String text;
    private final UUID chatId;
    private final ChatMessageType messageType;
}
