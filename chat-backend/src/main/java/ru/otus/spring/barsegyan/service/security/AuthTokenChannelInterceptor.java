package ru.otus.spring.barsegyan.service.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Service;
import ru.otus.spring.barsegyan.type.UserPrincipal;

@Service
public class AuthTokenChannelInterceptor implements ChannelInterceptor {
    public static final Logger logger = LoggerFactory.getLogger(AuthTokenChannelInterceptor.class);

    private final SessionService sessionService;

    public AuthTokenChannelInterceptor(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authToken = accessor.getFirstNativeHeader("X-Auth-Token");
            UserPrincipal userInSession = sessionService.getAuthenticationPrincipal(authToken);
            accessor.setUser(userInSession);

            logger.info("Established WebSocket connection for user {}", userInSession.getUsername());
        }

        return message;
    }
}
