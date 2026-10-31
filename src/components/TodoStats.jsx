import { useTodoStore } from '../store/useTodoStore';

function TodoStats() {
  const todos = useTodoStore((state) => state.todos);

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (total === 0) {
    return (
      <div className="bg-white dark:bg-slate-700/50 border border-slate-200/70 dark:border-slate-600/50 rounded-2xl p-4 text-center shadow-sm">
        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">
          Add some tasks to see progress stats
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-700/50 border border-slate-200/80 dark:border-slate-600/50 rounded-2xl p-4 shadow-sm space-y-4">
      {/* Progress Header & Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600 dark:text-slate-300">Task Progress</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">{percentage}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-600 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-600/40 border border-slate-100 dark:border-slate-600">
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Total</p>
          <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{total}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30">
          <p className="text-[11px] font-medium text-amber-700 dark:text-amber-400">Pending</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-300">{pending}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30">
          <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">Completed</p>
          <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300">{completed}</p>
        </div>
      </div>
    </div>
  );
}

export default TodoStats;
