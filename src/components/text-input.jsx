import { splitProps } from "solid-js";

const TextInput = (props) => {
  const [, inputProps] = splitProps(props, ["value", "label", "error"]);

  return (
    <div class="flex-1 grid gap-2">
      {props.label && (
        <label for={props.name} class="text-sm text-slate-800 font-medium">
          {props.label}
          {props.required && <span class="text-red-500">*</span>}
        </label>
      )}
      <input
        {...inputProps}
        id={props.name}
        value={props.value || ""}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
        class="border border-solid outline outline-transparent rounded px-4 py-2 text-base text-slate-900 transition-colors duration-300 focus:outline-green-100 focus:outline-3"
        classList={{
          "border-slate-300 focus:border-green-500": !props?.error,
          "border-red-500 focus:border-red-500": props?.error,
        }}
      />
      {props.error && (
        <div id={`${props.name}-error`} class="text-sm text-red-500">
          {props.error}
        </div>
      )}
    </div>
  );
};

export default TextInput;
