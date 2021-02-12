package ru.otus.spring.barsegyan.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.otus.spring.barsegyan.domain.AppUser;
import ru.otus.spring.barsegyan.domain.Chat;
import ru.otus.spring.barsegyan.dto.rest.request.CreateChatDto;
import ru.otus.spring.barsegyan.dto.rest.request.UpdateChatDto;
import ru.otus.spring.barsegyan.repository.ChatRepository;
import ru.otus.spring.barsegyan.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ChatService {
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatReadMarkService chatReadMarkService;

    public ChatService(ChatRepository chatRepository,
                       UserRepository userRepository,
                       ChatReadMarkService chatReadMarkService) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.chatReadMarkService = chatReadMarkService;
    }

    @Transactional(readOnly = true)
    public Chat getById(UUID chatId) {
        return chatRepository.findById(chatId).orElseThrow();
    }

    @Transactional(readOnly = true)
    public List<Chat> getChatsByMemberId(UUID memberId) {
        return chatRepository.findAllByMembers_Id(memberId);
    }

    @Transactional
    public Chat createChat(CreateChatDto createChatDto) {
        Chat chat = new Chat()
                .setName(createChatDto.getChatName())
                .setMembers(userRepository.findAllByIdIn(createChatDto.getMemberIds()));

        chatRepository.save(chat);
        chatReadMarkService.createReadMarksForChatMembers(chat, chat.getMembers());

        return chat;
    }

    @Transactional
    public Chat updateChatById(UUID chatId, UpdateChatDto updateChatDto) {
        Chat chat = chatRepository.findById(chatId).orElseThrow();

        Optional.ofNullable(updateChatDto.getChatName()).ifPresent(chat::setName);

        return chatRepository.save(chat);
    }

    @Transactional
    public Chat addMembers(UUID chatId, List<UUID> userIds) {
        Chat chat = chatRepository.findById(chatId).orElseThrow();

        // TODO notify about added users
        Set<AppUser> newMembers = userRepository.findAllByIdIn(userIds);
        chat.addMembers(newMembers);

        chatRepository.save(chat);
        chatReadMarkService.createReadMarksForChatMembers(chat, newMembers);

        return chat;
    }

    @Transactional
    public Chat removeMembers(UUID chatId, List<UUID> userIds) {
        Chat chat = chatRepository.findById(chatId).orElseThrow();

        // TODO notify about removed users
        Set<AppUser> membersToRemove = chat.getMembers()
                .stream()
                .filter(member -> userIds.contains(member.getId()))
                .collect(Collectors.toSet());

        chat.getMembers().removeAll(membersToRemove);
        chatRepository.save(chat);

        chatReadMarkService.deleteReadMarksForChatMembers(chat, membersToRemove);

        return chat;
    }
}
