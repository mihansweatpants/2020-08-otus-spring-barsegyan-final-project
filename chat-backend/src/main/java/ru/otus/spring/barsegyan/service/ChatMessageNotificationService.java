package ru.otus.spring.barsegyan.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import ru.otus.spring.barsegyan.domain.ChatMessage;
import ru.otus.spring.barsegyan.dto.rest.mappers.ChatMessageDtoMapper;
import ru.otus.spring.barsegyan.dto.ws.NotificationDto;
import ru.otus.spring.barsegyan.dto.ws.NotificationType;

@Service
public class ChatMessageNotificationService {
    private final SimpMessagingTemplate messagingTemplate;
    private final SessionService sessionService;

    public ChatMessageNotificationService(SimpMessagingTemplate messagingTemplate,
                                          SessionService sessionService) {
        this.messagingTemplate = messagingTemplate;
        this.sessionService = sessionService;
    }

    public void notifyChatMembersOnNewMessage(ChatMessage chatMessage) {
        chatMessage.getChat()
                .getMembers()
                .forEach(user -> messagingTemplate.convertAndSendToUser(
                        user.getUsername(),
                        "/queue/updates",
                        new NotificationDto(
                                NotificationType.NEW_MESSAGE,
                                ChatMessageDtoMapper.map(chatMessage, sessionService.mapOnlineStatus(chatMessage.getSentBy()))
                        )
                ));
    }
}
