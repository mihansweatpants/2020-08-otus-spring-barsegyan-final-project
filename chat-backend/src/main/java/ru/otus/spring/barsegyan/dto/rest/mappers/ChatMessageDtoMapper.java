package ru.otus.spring.barsegyan.dto.rest.mappers;

import ru.otus.spring.barsegyan.domain.ChatMessage;
import ru.otus.spring.barsegyan.dto.rest.response.ChatMessageDto;
import ru.otus.spring.barsegyan.dto.rest.response.UserDto;

public class ChatMessageDtoMapper {
    public static ChatMessageDto map(ChatMessage chatMessage, UserDto sentBy) {
        if (chatMessage == null) {
            return null;
        }

        return new ChatMessageDto(
                chatMessage.getId(),
                sentBy,
                chatMessage.getSentAt(),
                chatMessage.getText(),
                chatMessage.getChat().getId()
        );
    }
}
