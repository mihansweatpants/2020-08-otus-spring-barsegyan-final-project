package ru.otus.spring.barsegyan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.otus.spring.barsegyan.domain.ChatReadMark;

import java.util.List;
import java.util.UUID;

public interface ChatReadMarkRepository extends JpaRepository<ChatReadMark, UUID> {
    List<ChatReadMark> findAllByUser_Id(UUID userId);
    void deleteAllByChat_IdAndUserIdIn(UUID chatId, List<UUID> userIds);
}
