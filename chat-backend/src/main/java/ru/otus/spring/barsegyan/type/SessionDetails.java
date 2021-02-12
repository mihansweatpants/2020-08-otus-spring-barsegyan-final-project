package ru.otus.spring.barsegyan.type;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionDetails implements Serializable {
    public static final String SESSION_DETAILS_KEY = "SESSION_DETAILS";

    private String remoteAddr;
    private String userAgent;

    private static final long serialVersionUID = 1L;
}
