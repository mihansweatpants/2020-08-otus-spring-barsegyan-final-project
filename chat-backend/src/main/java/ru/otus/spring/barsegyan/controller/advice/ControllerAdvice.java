package ru.otus.spring.barsegyan.controller.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.otus.spring.barsegyan.dto.rest.base.ApiError;
import ru.otus.spring.barsegyan.dto.rest.base.ApiResponse;
import ru.otus.spring.barsegyan.exception.NotFoundException;

@RestControllerAdvice
public class ControllerAdvice {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public ApiResponse handleNotFound(NotFoundException e) {
        return ApiResponse.error(new ApiError(e.getMessage()));
    }
}
