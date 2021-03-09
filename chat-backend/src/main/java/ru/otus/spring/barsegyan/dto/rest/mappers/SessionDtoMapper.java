package ru.otus.spring.barsegyan.dto.rest.mappers;

import org.springframework.session.Session;
import ru.otus.spring.barsegyan.dto.rest.response.SessionDto;
import ru.otus.spring.barsegyan.type.SessionDetails;
import ru.otus.spring.barsegyan.util.UTCTimeUtils;

public class SessionDtoMapper {
    public static <S extends Session> SessionDto map(S session) {
        return new SessionDto(
                session.getId(),
                UTCTimeUtils.toDate(session.getLastAccessedTime()),
                session.isExpired(),
                session.getAttribute(SessionDetails.SESSION_DETAILS_KEY));
    }
}
