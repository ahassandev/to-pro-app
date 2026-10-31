import { useMemo } from 'react';
import { useTodoStore } from '../store/useTodoStore';
import TodoItem from './TodoItem';

const FILTER_OPTIONS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
];

function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);

  const filteredTodos = useMemo(() =>
    todos.filter((todo) => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'pending') return !todo.completed;
      return true;
    }),
    [todos, filter]
  );

  const counts = useMemo(() => ({
    all: todos.length,
    pending: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }), [todos]);

  return (
    <div className="w-full space-y-4">
      {/* Filter Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
        {FILTER_OPTIONS.map((tab) => {
          const isActive = filter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'bg-slate-200/80 text-slate-600'
                }`}
              >
                {counts[tab.key]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Todo List / Empty State */}
      {filteredTodos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
          <p className="text-slate-500 font-medium text-sm">
            {filter === 'completed'
              ? 'No completed tasks yet.'
              : filter === 'pending'
              ? 'No pending tasks. You are all caught up!'
              : 'No tasks found. Add a task above to get started!'}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
