package ru.otus.spring.barsegyan.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.session.Session;
import org.springframework.session.web.socket.config.annotation.AbstractSessionWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import ru.otus.spring.barsegyan.service.security.AuthTokenChannelInterceptor;

@Configuration
@EnableScheduling
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractSessionWebSocketMessageBrokerConfigurer<Session> {

    private final long serverPingTimeout;
    private final long clientPingTimeout;
    private final AuthTokenChannelInterceptor authTokenChannelInterceptor;

    public WebSocketConfig(@Value("${ws.ping.timeout.server:0}") long serverPingTimeout,
                           @Value("${ws.ping.timeout.server:30000}") long clientPingTimeout,
                           AuthTokenChannelInterceptor authTokenChannelInterceptor) {
        this.serverPingTimeout = serverPingTimeout;
        this.clientPingTimeout = clientPingTimeout;
        this.authTokenChannelInterceptor = authTokenChannelInterceptor;
    }

    @Override
    protected void configureStompEndpoints(StompEndpointRegistry registry) {
        registry
                .addEndpoint("/ws")
                .setAllowedOrigins("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry
                .setPreservePublishOrder(true)
                .enableSimpleBroker("/queue/", "/topic/")
                .setHeartbeatValue(new long[]{serverPingTimeout, clientPingTimeout})
                .setTaskScheduler(heartBeatScheduler());
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(authTokenChannelInterceptor);
    }

    @Bean
    public TaskScheduler heartBeatScheduler() {
        return new ThreadPoolTaskScheduler();
    }
}
