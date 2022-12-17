package com.example.application.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.application.entities.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
}