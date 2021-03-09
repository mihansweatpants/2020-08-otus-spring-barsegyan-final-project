package ru.otus.spring.barsegyan.dto.rest.base;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Collection;

@Data
@AllArgsConstructor
public class Pagination<T> {
    private final Collection<T> items;
    private final int totalPages;
    private final long totalItems;

    public static <T> Pagination<T> of(Collection<T> items, int totalPages, long totalItems) {
        return new Pagination<>(items, totalPages, totalItems);
    }
}
