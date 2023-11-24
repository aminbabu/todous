import { createSignal } from "solid-js";

const createTodosSignal = (
  key = "",
  defaultValue = [],
  storage = localStorage
) => {
  const initialValue = storage.getItem(key)
    ? JSON.parse(storage.getItem(key))
    : defaultValue;

  const [todos, setTodos] = createSignal(initialValue);

  const setTodosAndStore = (arg) => {
    const value = typeof arg === "function" ? arg(todos()) : arg;

    setTodos(value);

    storage.setItem(key, JSON.stringify(value));

    return value;
  };

  return [todos, setTodosAndStore];
};

export default createTodosSignal;
