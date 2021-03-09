package ru.otus.spring.barsegyan.dto.rest.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class CreateChatDto {
    private final String chatName;
    private final List<UUID> memberIds;
}
