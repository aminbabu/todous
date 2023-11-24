import TodoForm from "./components/todo-form";
import Todos from "./components/todos";
import createTodosSignal from "./signals/createTodosSignal";

const App = () => {
  const [todos, setTodos] = createTodosSignal();

  return (
    <div class="min-h-screen flex flex-col justify-center text-slate-900 px-4">
      <div class="max-w-full w-[512px] mx-auto bg-white border border-solid border-slate-100 rounded-lg shadow">
        <div class="p-4 border-b border-solid border-b-slate-100">
          <h1 class="text-4xl text-green-500 font-semibold">Todous</h1>
        </div>
        <TodoForm todos={todos} setTodos={setTodos} />
        <Todos todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};

export default App;
