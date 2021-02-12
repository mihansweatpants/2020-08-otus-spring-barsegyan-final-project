package ru.otus.spring.barsegyan.dto.rest.mappers;

import ru.otus.spring.barsegyan.domain.Chat;
import ru.otus.spring.barsegyan.dto.rest.response.ChatDto;
import ru.otus.spring.barsegyan.dto.rest.response.UserDto;

import java.util.List;
import java.util.Optional;

public class ChatDtoMapper {
    public static ChatDto map(Chat chat, List<UserDto> chatMembers) {
        return new ChatDto(
                chat.getId(),
                chat.getName(),
                chatMembers,
                Optional.ofNullable(chat.getLastMessage())
                        .map(lastMessage -> ChatMessageDtoMapper.map(
                                lastMessage,
                                chatMembers.stream()
                                        .filter(member -> lastMessage.getSentBy().getId().equals(member.getId()))
                                        .findFirst()
                                        .get()))
                        .orElse(null)
        );
    }
}
