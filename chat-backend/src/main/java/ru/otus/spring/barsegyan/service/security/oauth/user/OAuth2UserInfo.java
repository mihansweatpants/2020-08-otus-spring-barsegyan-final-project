package ru.otus.spring.barsegyan.service.security.oauth.user;

import ru.otus.spring.barsegyan.domain.AuthProvider;
import ru.otus.spring.barsegyan.exception.OAuth2AuthenticationProcessingException;

import java.util.Map;

public interface OAuth2UserInfo {
    String getName();
    String getEmail();
    String getAvatarUrl();

    static OAuth2UserInfo create(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(AuthProvider.GOOGLE.toString())) {
            return new GoogleOauth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Unsupported registrationId " + registrationId);
        }
    }
}
