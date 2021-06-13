package ru.otus.spring.barsegyan.type;

import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import ru.otus.spring.barsegyan.domain.AppUser;
import ru.otus.spring.barsegyan.domain.AuthProvider;

import java.security.Principal;
import java.util.Collection;
import java.util.Map;
import java.util.UUID;

public class UserPrincipal implements OAuth2User, UserDetails, Principal {
    private final String username;
    private final String email;
    private final UUID userId;
    private final AuthProvider authProvider;
    private final String password;
    private final Boolean isBlocked;
    private final String avatarUrl;
    private final Map<String, Object> attributes;

    public static UserPrincipal of(AppUser appUser) {
        return new UserPrincipal(appUser, null);
    }

    public static UserPrincipal of(AppUser appUser, Map<String, Object> attributes) {
        return new UserPrincipal(appUser, attributes);
    }

    private UserPrincipal(AppUser appUser, Map<String, Object> attributes) {
        this.username = appUser.getUsername();
        this.email = appUser.getEmail();
        this.userId = appUser.getId();
        this.authProvider = appUser.getAuthProvider();
        this.password = appUser.getPassword();
        this.isBlocked = appUser.getBlocked();
        this.avatarUrl = appUser.getAvatarUrl();
        this.attributes = attributes;
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
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.NO_AUTHORITIES;
    }

    @Override
    public String getName() {
        return userId.toString();
    }

    public String getEmail() {
        return email;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public AuthProvider getAuthProvider() {
        return authProvider;
    }
}
