package ru.otus.spring.barsegyan.domain;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "chat_message")
public class ChatMessage {
    @Id
    @GeneratedValue
    @Column(name = "chat_message_id")
    private UUID id;

    @Column(name = "message_type")
    @Enumerated(EnumType.STRING)
    private ChatMessageType chatMessageType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id")
    private Chat chat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sent_by")
    private AppUser sentBy;

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @Column(name = "message_text")
    private String text;

    public ChatMessage() {}

    public ChatMessage(UUID id,
                       ChatMessageType chatMessageType,
                       Chat chat,
                       AppUser sentBy,
                       LocalDateTime sentAt,
                       String text) {
        this.id = id;
        this.chatMessageType = chatMessageType;
        this.chat = chat;
        this.sentBy = sentBy;
        this.sentAt = sentAt;
        this.text = text;
    }

    public UUID getId() {
        return id;
    }

    public Chat getChat() {
        return chat;
    }

    public AppUser getSentBy() {
        return sentBy;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public String getText() {
        return text;
    }

    public ChatMessage setChat(Chat chat) {
        this.chat = chat;
        return this;
    }

    public ChatMessage setSentBy(AppUser sentBy) {
        this.sentBy = sentBy;
        return this;
    }

    public ChatMessage setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
        return this;
    }

    public ChatMessage setText(String text) {
        this.text = text;
        return this;
    }

    public ChatMessageType getChatMessageType() {
        return chatMessageType;
    }

    public ChatMessage setChatMessageType(ChatMessageType chatMessageType) {
        this.chatMessageType = chatMessageType;
        return this;
    }
}
