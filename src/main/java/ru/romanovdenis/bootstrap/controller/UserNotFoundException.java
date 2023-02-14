package ru.romanovdenis.bootstrap.controller;

public class UserNotFoundException extends RuntimeException {
    String message = "Нет такого юзера";

    @Override
    public String getMessage() {
        return message;
    }
}
