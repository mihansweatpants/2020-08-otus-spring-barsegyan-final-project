package ru.otus.spring.barsegyan.controller;

import io.swagger.annotations.Api;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import ru.otus.spring.barsegyan.domain.ChatMessage;
import ru.otus.spring.barsegyan.dto.rest.base.ApiResponse;
import ru.otus.spring.barsegyan.dto.rest.base.Pagination;
import ru.otus.spring.barsegyan.dto.rest.mappers.ChatMessageDtoMapper;
import ru.otus.spring.barsegyan.dto.rest.request.CreateMessageDto;
import ru.otus.spring.barsegyan.dto.rest.response.ChatMessageDto;
import ru.otus.spring.barsegyan.service.ChatMessageService;
import ru.otus.spring.barsegyan.service.SessionService;
import ru.otus.spring.barsegyan.type.AppUserDetails;

import java.util.UUID;
import java.util.stream.Collectors;

@Api
@RestController
public class ChatMessageController {
    private final ChatMessageService chatMessageService;
    private final SessionService sessionService;

    public ChatMessageController(ChatMessageService chatMessageService,
                                 SessionService sessionService) {
        this.chatMessageService = chatMessageService;
        this.sessionService = sessionService;
    }

    @GetMapping("/api/chats/{chatId}/messages")
    public ApiResponse<Pagination<ChatMessageDto>> getChatMessages(@PathVariable UUID chatId,
                                                                   @RequestParam(value = "limit", defaultValue = "100") Integer limit,
                                                                   @RequestParam(value = "page", defaultValue = "0") Integer page) {
        Page<ChatMessage> chatMessages = chatMessageService.getChatMessages(chatId,
                PageRequest.of(page, limit, Sort.by(Sort.Order.desc("sentAt"))));

        return ApiResponse.ok(
                Pagination.of(
                        chatMessages.stream()
                                .map(chatMessage ->
                                        ChatMessageDtoMapper.map(chatMessage, sessionService.mapOnlineStatus(chatMessage.getSentBy())))
                                .collect(Collectors.toList()),
                        chatMessages.getTotalPages(),
                        chatMessages.getTotalElements()
                )
        );
    }

    @PostMapping("/api/chats/{chatId}/messages")
    public ApiResponse<Void> addMessage(@PathVariable UUID chatId, @RequestBody CreateMessageDto createMessageDto) {
        AppUserDetails currentUser = sessionService.getCurrentUser();

        chatMessageService.createMessage(chatId, currentUser.getUserId(), createMessageDto);

        return ApiResponse.ok();
    }
}
