import { createForm, required, reset } from "@modular-forms/solid";
import TextInput from "./text-input";
import { v4 as uuidv4 } from "uuid";

const TodoForm = (props) => {
  const [todoForm, { Form, Field }] = createForm();

  const handleSubmit = ({ todo: text }) => {
    props.setTodos((previousTodos) => [
      ...previousTodos,
      { id: uuidv4(), text, completed: false },
    ]);
    reset(todoForm, { initialValue: "" });
  };

  return (
    <Form onSubmit={handleSubmit} class="space-y-4 mb-8 p-4">
      <Field
        name="todo"
        validate={[required("Todo field cannot be empty.")]}
        reset
      >
        {(field, props) => (
          <TextInput
            {...props}
            type="text"
            value={field.value || ""}
            error={field.error}
            placeholder="i.e: Example to do..."
            required
          />
        )}
      </Field>
      <div class="text-right">
        <button
          type="submit"
          class="px-6 py-2 bg-green-500 border border-solid border-green-500 text-base text-white font-semibold rounded duration-300 hover:bg-green-600 disabled:bg-slate-500 disabled:cursor-not-allowed"
          disabled={todoForm.validating || todoForm.submitting}
        >
          Add New
        </button>
      </div>
    </Form>
  );
};

export default TodoForm;
