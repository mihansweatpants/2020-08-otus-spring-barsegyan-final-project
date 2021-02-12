package ru.otus.spring.barsegyan.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;
import ru.otus.spring.barsegyan.domain.ChatReadMark;
import ru.otus.spring.barsegyan.dto.rest.base.ApiResponse;
import ru.otus.spring.barsegyan.dto.rest.mappers.ChatReadMarkDtoMapper;
import ru.otus.spring.barsegyan.dto.rest.response.ChatReadMarkDto;
import ru.otus.spring.barsegyan.service.ChatReadMarkService;
import ru.otus.spring.barsegyan.service.SessionService;
import ru.otus.spring.barsegyan.type.AppUserDetails;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Api
@RestController
public class ChatReadMarkController {

    private final ChatReadMarkService chatReadMarkService;
    private final SessionService sessionService;

    public ChatReadMarkController(ChatReadMarkService chatReadMarkService,
                                  SessionService sessionService) {
        this.chatReadMarkService = chatReadMarkService;
        this.sessionService = sessionService;
    }

    @GetMapping("/api/read-marks")
    public ApiResponse<List<ChatReadMarkDto>> getUserReadMarks() {
        AppUserDetails currentUser = sessionService.getCurrentUser();

        return ApiResponse.ok(chatReadMarkService.getAllUserReadMarks(currentUser.getUserId())
                .stream()
                .map(ChatReadMarkDtoMapper::map)
                .collect(Collectors.toList()));
    }

    @PostMapping("/api/read-marks/{readMarkId}")
    public ApiResponse<ChatReadMarkDto> markLastReadMessage(@PathVariable UUID readMarkId, @RequestParam UUID messageId) {
        ChatReadMark updatedReadMark = chatReadMarkService.markLastReadMessage(readMarkId, messageId);

        return ApiResponse.ok(ChatReadMarkDtoMapper.map(updatedReadMark));
    }
}
