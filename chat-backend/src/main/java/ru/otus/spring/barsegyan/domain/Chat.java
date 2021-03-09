package ru.otus.spring.barsegyan.domain;

import org.hibernate.annotations.JoinFormula;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "chat")
public class Chat {
    @Id
    @GeneratedValue
    @Column(name = "chat_id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "app_user_chat",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "app_user_id"))
    private Set<AppUser> members;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinFormula("(" +
            "select cm.chat_message_id " +
            "from chat_message cm " +
            "where cm.chat_id = chat_id " +
            "order by cm.sent_at desc " +
            "limit 1" +
            ")")
    private ChatMessage lastMessage;

    public Chat() {
    }

    public Chat(UUID id,
                String name,
                Set<AppUser> members,
                ChatMessage lastMessage) {
        this.id = id;
        this.name = name;
        this.members = members;
        this.lastMessage = lastMessage;
    }

    public Chat setName(String name) {
        this.name = name;
        return this;
    }

    public Chat setMembers(Set<AppUser> members) {
        this.members = members;
        return this;
    }

    public Chat addMembers(Set<AppUser> newMembers) {
        members.addAll(newMembers);
        return this;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<AppUser> getMembers() {
        return members;
    }

    public ChatMessage getLastMessage() {
        return lastMessage;
    }
}
