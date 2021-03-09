package ru.otus.spring.barsegyan.service.security;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.otus.spring.barsegyan.type.SessionDetails;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 101)
public class SessionDetailsFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        filterChain.doFilter(request, response);

        HttpSession session = request.getSession(false);
        if (session != null) {
            SessionDetails sessionDetails = new SessionDetails();
            sessionDetails.setUserAgent(request.getHeader("User-Agent"));
            sessionDetails.setRemoteAddr(getRemoteAddress(request));

            session.setAttribute(SessionDetails.SESSION_DETAILS_KEY, sessionDetails);
        }
    }

    private String getRemoteAddress(HttpServletRequest request) {
        String remoteAddr = request.getHeader("X-FORWARDED-FOR");
        if (remoteAddr == null) {
            remoteAddr = request.getRemoteAddr();
        }
        else if (remoteAddr.contains(",")) {
            remoteAddr = remoteAddr.split(",")[0];
        }
        return remoteAddr;
    }
}
