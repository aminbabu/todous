import { createForm, required } from "@modular-forms/solid";
import { For, Show, createSignal } from "solid-js";
import TextInput from "./text-input";

const Todos = (props) => {
  const [todoForm, { Form, Field }] = createForm();
  const [todo, setTodo] = createSignal(null);

  const hanldeCompleted = (id) => {
    props.setTodos(
      props
        .todos()
        .map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    );
  };

  const handleDeleteAll = () => {
    props.setTodos([]);
  };

  const handleClearCompleted = () => {
    props.setTodos(props.todos().filter((todo) => !todo.completed));
  };

  const handleEdit = (item) => {
    setTodo(item);
  };

  const handleDelete = (id) => {
    props.setTodos((previousTodos) =>
      previousTodos.filter((item) => item.id !== id)
    );
  };

  const handleReset = () => {
    setTodo(null);
  };

  const handleSubmit = ({ todo: text }) => {
    props.setTodos((previousTodos) =>
      previousTodos.map((todoItem) =>
        todoItem.id === todo()?.id ? { ...todo(), text } : todoItem
      )
    );
    setTodo(null);
  };

  return (
    <>
      <div class="p-4">
        <h2 class="text-xl text-green-500 font-medium mb-2">List of todos:</h2>
        <Form onSubmit={handleSubmit}>
          <ul class="list-none grid gap-2 mb-4 max-h-80 overflow-auto">
            <For each={props.todos()}>
              {(todoItem) => (
                <Show
                  when={todo()?.id === todoItem.id}
                  fallback={
                    <li class="flex items-start justify-between gap-4">
                      <Field name={todoItem.id} type="boolean">
                        {(field, props) => (
                          <label class="flex gap-2 text-base text-green-500 cursor-pointer">
                            <input
                              {...props}
                              type="checkbox"
                              checked={field.value || todoItem.completed}
                              class="appearance-none w-4 h-4 rounded-sm border border-solid border-slate-300 checked:bg-green-500 inline-block mt-1 cursor-pointer"
                              onChange={() => hanldeCompleted(todoItem.id)}
                            />
                            <span
                              classList={{
                                "line-through text-slate-500":
                                  todoItem.completed,
                              }}
                            >
                              {todoItem.text}
                            </span>
                          </label>
                        )}
                      </Field>
                      {!todoItem.completed && (
                        <div class="inline-flex items-center gap-2">
                          <button
                            type="button"
                            class="w-6 h-6 text-green-300 border border-solid border-green-300 inline-flex items-center justify-center p-1 rounded transition-colors duration-300 hover:border-green-500 hover:text-green-500"
                            onClick={() => handleEdit(todoItem)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            class="w-6 h-6 text-red-300 border border-solid border-red-300 inline-flex items-center justify-center p-1 rounded transition-colors duration-300 hover:border-red-500 hover:text-red-500"
                            onClick={() => handleDelete(todoItem.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z" />
                              <path d="M9 10h2v8H9zm4 0h2v8h-2z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </li>
                  }
                >
                  <li class="flex items-start justify-between gap-4">
                    <Field
                      name="todo"
                      validate={[required("Todo field cannot be empty.")]}
                      reset
                    >
                      {(field, props) => (
                        <TextInput
                          {...props}
                          type="text"
                          value={todo()?.text}
                          error={field.error}
                          required
                        />
                      )}
                    </Field>
                    <button
                      type="button"
                      class="px-2.5 py-2 inline-flex items-center justify-center bg-slate-500 border border-solid border-slate-500 text-base text-white font-semibold rounded  duration-300 hover:bg-slate-600 disabled:bg-slate-500 disabled:cursor-not-allowed"
                      title="Skip"
                      onClick={handleReset}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7 7v10l7-5zm9 10V7h-2v10z" />
                      </svg>
                    </button>
                    <button
                      type="submit"
                      class="px-2.5 py-2 inline-flex items-center justify-center bg-green-500 border border-solid border-green-500 text-base text-white font-semibold rounded  duration-300 hover:bg-green-600 disabled:bg-slate-500 disabled:cursor-not-allowed"
                      title="submit"
                      disabled={todoForm.validating || todoForm.submitting}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M14 13H8V5H6v9a1 1 0 0 0 1 1h7v3l5-4-5-4v3z" />
                      </svg>
                    </button>
                  </li>
                </Show>
              )}
            </For>
          </ul>
        </Form>
      </div>
      <div class="p-4 border-t border-solid border-t-slate-100">
        <div class="flex items-center justify-end gap-4">
          <button
            type="button"
            class="px-6 py-2 bg-red-500 border border-solid border-red-500 text-base text-white font-semibold rounded duration-300 hover:bg-red-600 disabled:bg-slate-500 disabled:cursor-not-allowed"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-green-500 border border-solid border-green-500 text-base text-white font-semibold rounded duration-300 hover:bg-green-600 disabled:bg-slate-500 disabled:cursor-not-allowed"
            onClick={handleClearCompleted}
          >
            Clear Completed
          </button>
        </div>
      </div>
    </>
  );
};

export default Todos;
