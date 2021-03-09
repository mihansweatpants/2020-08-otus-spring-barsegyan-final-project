package ru.otus.spring.barsegyan.domain;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "chat_read_mark")
public class ChatReadMark {
    @Id
    @GeneratedValue
    @Column(name = "chat_read_mark_id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "app_user_id")
    private AppUser user;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;

    @ManyToOne
    @JoinColumn(name = "last_read_message_id")
    private ChatMessage lastReadMessage;

    public ChatReadMark() {}

    public ChatReadMark(UUID id,
                        AppUser user,
                        Chat chat,
                        ChatMessage lastReadMessage) {
        this.id = id;
        this.user = user;
        this.chat = chat;
        this.lastReadMessage = lastReadMessage;
    }

    public UUID getId() {
        return id;
    }

    public AppUser getUser() {
        return user;
    }

    public Chat getChat() {
        return chat;
    }

    public ChatMessage getLastReadMessage() {
        return lastReadMessage;
    }

    public ChatReadMark setUser(AppUser user) {
        this.user = user;
        return this;
    }

    public ChatReadMark setChat(Chat chat) {
        this.chat = chat;
        return this;
    }

    public ChatReadMark setLastReadMessage(ChatMessage chatMessage) {
        this.lastReadMessage = chatMessage;
        return this;
    }
}
