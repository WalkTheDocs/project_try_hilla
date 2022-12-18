package com.example.application.endpoints.todo;

import java.util.List;

import javax.annotation.security.PermitAll;

import com.example.application.entities.Todo;
import com.example.application.repositories.TodoRepository;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@PermitAll
public class TodoEndpoint {
    private TodoRepository repository;

    public TodoEndpoint(TodoRepository repository) {
        this.repository = repository;
    }

    public @Nonnull List<@Nonnull Todo> findAll() {
        return repository.findAll();
    }

    public Todo save(Todo todo) {
        return repository.save(todo);
    }

    public Integer delete(Todo todo) {
        repository.delete(todo);
        return todo.getId();
    }
}