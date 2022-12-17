package com.example.application.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Entity
public class Todo {

  @Id
  @GeneratedValue
  private Integer id;

  @Setter
  private boolean done = false;

  @NotBlank
  @Getter
  @Setter
  private String task;

  @Getter
  @Setter
  private String description;

  public Todo() {
  }

  public Todo(String task, String description) {
    this.task = task;
    this.description = description;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public boolean isDone() {
    return done;
  }
}