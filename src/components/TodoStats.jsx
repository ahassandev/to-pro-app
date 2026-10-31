import { useTodoStore } from '../store/useTodoStore';

function TodoStats() {
  const todos = useTodoStore((state) => state.todos);

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (total === 0) {
    return (
      <div className="bg-white border border-slate-200/70 rounded-2xl p-4 text-center shadow-sm">
        <p className="text-slate-400 text-xs font-medium">
          Add some tasks to see progress stats
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-4">
      {/* Progress Header & Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600">Task Progress</span>
          <span className="text-indigo-600 font-bold">{percentage}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[11px] font-medium text-slate-500">Total</p>
          <p className="text-lg font-bold text-slate-800">{total}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100">
          <p className="text-[11px] font-medium text-amber-700">Pending</p>
          <p className="text-lg font-bold text-amber-800">{pending}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
          <p className="text-[11px] font-medium text-emerald-700">Completed</p>
          <p className="text-lg font-bold text-emerald-800">{completed}</p>
        </div>
      </div>
    </div>
  );
}

export default TodoStats;
