package ru.otus.spring.barsegyan.dto.rest.mappers;

import ru.otus.spring.barsegyan.domain.ChatMessage;
import ru.otus.spring.barsegyan.domain.ChatReadMark;
import ru.otus.spring.barsegyan.dto.rest.response.ChatReadMarkDto;

import java.util.Optional;

public class ChatReadMarkDtoMapper {
    public static ChatReadMarkDto map(ChatReadMark chatReadMark) {
        return new ChatReadMarkDto(
                chatReadMark.getId(),
                chatReadMark.getChat().getId(),
                Optional.ofNullable(chatReadMark.getLastReadMessage())
                        .map(ChatMessage::getId)
                        .orElse(null)
        );
    }
}
