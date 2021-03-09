package ru.otus.spring.barsegyan.domain;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "app_user")
public class AppUser {
    @Id
    @GeneratedValue
    @Column(name = "app_user_id")
    private UUID id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "is_blocked")
    private Boolean isBlocked = false;

    public AppUser() {}

    public AppUser(UUID id,
                   String username,
                   String email,
                   String password,
                   Boolean isBlocked) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isBlocked = isBlocked;
    }

    public UUID getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Boolean getBlocked() {
        return isBlocked;
    }

    public AppUser setUsername(String username) {
        this.username = username;
        return this;
    }

    public AppUser setEmail(String email) {
        this.email = email;
        return this;
    }

    public AppUser setPassword(String password) {
        this.password = password;
        return this;
    }

    public AppUser setBlocked(Boolean blocked) {
        isBlocked = blocked;
        return this;
    }
}
