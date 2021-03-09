package ru.otus.spring.barsegyan.type;

import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import ru.otus.spring.barsegyan.domain.AppUser;

import java.io.Serializable;
import java.security.Principal;
import java.util.Collection;
import java.util.UUID;

public class AppUserDetails implements UserDetails, Principal, Serializable {
    private final UUID userId;
    private final String username;
    private final String email;
    private final String password;
    private final boolean isBlocked;

    public AppUserDetails(AppUser appUser) {
        this.userId = appUser.getId();
        this.username = appUser.getUsername();
        this.email = appUser.getEmail();
        this.password = appUser.getPassword();
        this.isBlocked = appUser.getBlocked();
    }

    public UUID getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.NO_AUTHORITIES;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        if (isBlocked) {
            throw new LockedException("Account is blocked");
        }
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return username;
    }

    private static final long serialVersionUID = 1L;
}

