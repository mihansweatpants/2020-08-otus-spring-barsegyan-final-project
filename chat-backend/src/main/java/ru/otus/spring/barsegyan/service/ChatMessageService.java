package ru.otus.spring.barsegyan.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.otus.spring.barsegyan.domain.ChatMessage;
import ru.otus.spring.barsegyan.domain.ChatMessageType;
import ru.otus.spring.barsegyan.dto.rest.request.CreateMessageDto;
import ru.otus.spring.barsegyan.repository.ChatMessageRepository;
import ru.otus.spring.barsegyan.repository.ChatRepository;
import ru.otus.spring.barsegyan.repository.UserRepository;
import ru.otus.spring.barsegyan.util.UTCTimeUtils;

import java.util.UUID;

@Service
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final ChatMessageNotificationService chatMessageNotificationService;

    public ChatMessageService(ChatMessageRepository chatMessageRepository,
                              UserRepository userRepository,
                              ChatRepository chatRepository,
                              ChatMessageNotificationService chatMessageNotificationService) {
        this.chatMessageRepository = chatMessageRepository;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
        this.chatMessageNotificationService = chatMessageNotificationService;
    }

    public Page<ChatMessage> getChatMessages(UUID chatId, Pageable pageable) {
        return chatMessageRepository.findAllByChat_Id(chatId, pageable);
    }

    public ChatMessage createMessage(UUID chatId,
                                     UUID sentById,
                                     CreateMessageDto createMessageDto) {
        ChatMessage chatMessage = new ChatMessage()
                .setChatMessageType(ChatMessageType.USER_MESSAGE)
                .setChat(chatRepository.getOne(chatId))
                .setSentBy(userRepository.getOne(sentById))
                .setSentAt(UTCTimeUtils.now())
                .setText(createMessageDto.getText());

        chatMessageRepository.save(chatMessage);

        chatMessageNotificationService.notifyChatMembersOnNewMessage(chatMessage);

        return chatMessage;
    }
}
