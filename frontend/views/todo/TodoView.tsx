import type Todo from 'Frontend/generated/com/example/application/entities/Todo';
import { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { Button } from '@hilla/react-components/Button.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { TodoEndpoint } from 'Frontend/generated/endpoints';
import { EndpointValidationError } from '@hilla/frontend';

export default function TodoView() {
  const empty: Todo = { task: '', done: false };
  const [todos, setTodos] = useState(Array<Todo>());

  useEffect(() => {
    (async () => {
      setTodos(await TodoEndpoint.findAll());
    })();

    return () => {};
  }, []);

  const formik = useFormik({
    initialValues: empty,
    onSubmit: async (value: Todo, { setSubmitting, setErrors }) => {
      try {
        const saved = (await TodoEndpoint.save(value)) ?? value;
        setTodos([...todos, saved]);
        formik.resetForm();
      } catch (e: unknown) {
        if (e instanceof EndpointValidationError) {
          const errors: FormikErrors<Todo> = {};
          for (const error of e.validationErrorData) {
            if (typeof error.parameterName === 'string' && error.parameterName in empty) {
              const key = error.parameterName as string & keyof Todo;
              errors[key] = error.message;
            }
          }
          setErrors(errors);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  async function changeStatus(todo: Todo, done: boolean) {
    const newTodo = { ...todo, done: done };
    const saved = (await TodoEndpoint.save(newTodo)) ?? newTodo;
    setTodos(todos.map((item) => (item.id === todo.id ? saved : item)));
  }

  async function deleteTodo(todo: Todo) {
    const deletedTodoId = await TodoEndpoint.delete(todo);
    if (deletedTodoId) {
      setTodos(todos.filter((t) => t.id != deletedTodoId));
    }
  }

  return (
    <>
      <div className="m-m flex items-baseline gap-m">
        <TextField
          name="task"
          label="Task"
          value={formik.values.task}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        <TextField
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        <Button theme="primary" disabled={formik.isSubmitting} onClick={formik.submitForm}>
          Add
        </Button>
      </div>

      <div className="m-m flex flex-col items-stretch gap-s">
        {todos.map((todo) => (
          <div key={todo.id}>
            <Checkbox checked={todo.done} onCheckedChanged={({ detail: { value } }) => changeStatus(todo, value)}>
              {todo.task}
            </Checkbox>
            <TextField value={todo.description || ''} disabled />
            <Button theme="primary" disabled={formik.isSubmitting} onClick={() => deleteTodo(todo)}>
              delete
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
