package ru.otus.spring.barsegyan.dto.rest.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvalidateSessionsDto {
    private List<String> sessionIds;
}
