package ru.otus.spring.barsegyan.service.security.oauth.user;

import java.util.Map;

public class GoogleOauth2UserInfo implements OAuth2UserInfo {
    private final Map<String, Object> attributes;

    public GoogleOauth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getAvatarUrl() {
        return (String) attributes.get("picture");
    }
}
