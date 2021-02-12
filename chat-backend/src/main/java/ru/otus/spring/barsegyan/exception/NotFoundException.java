package ru.otus.spring.barsegyan.exception;

public class NotFoundException extends ApplicationException {
    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(String format, Object... args) {
        super(String.format(format, args));
    }
}
