package ru.otus.spring.barsegyan.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.otus.spring.barsegyan.domain.AppUser;
import ru.otus.spring.barsegyan.domain.Chat;
import ru.otus.spring.barsegyan.domain.ChatReadMark;
import ru.otus.spring.barsegyan.repository.ChatMessageRepository;
import ru.otus.spring.barsegyan.repository.ChatReadMarkRepository;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ChatReadMarkService {
    private final ChatReadMarkRepository chatReadMarkRepository;
    private final ChatMessageRepository chatMessageRepository;

    public ChatReadMarkService(ChatReadMarkRepository chatReadMarkRepository,
                               ChatMessageRepository chatMessageRepository) {
        this.chatReadMarkRepository = chatReadMarkRepository;
        this.chatMessageRepository = chatMessageRepository;
    }

    @Transactional(readOnly = true)
    public List<ChatReadMark> getAllUserReadMarks(UUID userId) {
        return chatReadMarkRepository.findAllByUser_Id(userId);
    }

    @Transactional
    public void createReadMarksForChatMembers(Chat chat, Collection<AppUser> members) {
        List<ChatReadMark> readMarks = members
                .stream()
                .map(chatMember -> new ChatReadMark()
                        .setChat(chat)
                        .setUser(chatMember))
                .collect(Collectors.toList());

        chatReadMarkRepository.saveAll(readMarks);
    }

    @Transactional
    public void deleteReadMarksForChatMembers(Chat chat, Collection<AppUser> members) {
        chatReadMarkRepository
                .deleteAllByChat_IdAndUserIdIn(chat.getId(),
                        members.stream()
                                .map(AppUser::getId)
                                .collect(Collectors.toList()));
    }

    @Transactional
    public ChatReadMark markLastReadMessage(UUID readMarkId, UUID lastReadMessageId) {
        ChatReadMark chatReadMark = chatReadMarkRepository.findById(readMarkId).orElseThrow();

        chatReadMark.setLastReadMessage(chatMessageRepository.getOne(lastReadMessageId));

        return chatReadMarkRepository.save(chatReadMark);
    }
}
