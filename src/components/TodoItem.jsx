import { Trash2, Check } from 'lucide-react';
import { useTodoStore } from '../store/useTodoStore';

function TodoItem({ todo }) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  if (!todo) return null;

  return (
    <div className="flex items-center justify-between gap-3 p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          type="button"
          role="checkbox"
          aria-checked={todo.completed}
          onClick={() => toggleTodo(todo.id)}
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
            todo.completed
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'border-slate-300 hover:border-indigo-500 bg-white'
          }`}
        >
          {todo.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
        </button>

        <span
          className={`text-sm break-words transition-all select-none ${
            todo.completed
              ? 'line-through text-slate-400'
              : 'text-slate-700 font-medium'
          }`}
        >
          {todo.text}
        </span>
      </div>

      <button
        type="button"
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete todo"
        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 shrink-0"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default TodoItem;
