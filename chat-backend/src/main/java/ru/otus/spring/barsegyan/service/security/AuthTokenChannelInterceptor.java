package ru.otus.spring.barsegyan.service.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ru.otus.spring.barsegyan.service.SessionService;
import ru.otus.spring.barsegyan.type.AppUserDetails;

import java.security.Principal;

@Service
public class AuthTokenChannelInterceptor implements ChannelInterceptor {
    public static final Logger logger = LoggerFactory.getLogger(AuthTokenChannelInterceptor.class);

    private final SessionService sessionService;

    public AuthTokenChannelInterceptor(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authToken = accessor.getFirstNativeHeader("X-Auth-Token");
            Authentication authentication = sessionService.getAuthentication(authToken);
            AppUserDetails user = (AppUserDetails) authentication.getPrincipal();
            accessor.setUser(user);

            logger.info("Established WebSocket connection for user {}", user.getUsername());
        }
        return message;
    }
}
