package ru.otus.spring.barsegyan.dto.rest.base;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private final T data;

    private final ApiError error;

    private ApiResponse(T data, ApiError error) {
        this.data = data;
        this.error = error;
    }

    public static <T> ApiResponse<T> ok() {
        return new ApiResponse<>(null, null);
    }

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(data, null);
    }

    public static <T> ApiResponse<T> error(ApiError error) {
        return new ApiResponse<>(null, error);
    }

    public Object getError() {
        return error;
    }

    public T getData() {
        return data;
    }
}
