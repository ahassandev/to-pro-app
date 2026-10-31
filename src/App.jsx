import { Suspense, lazy } from 'react';
import { CheckCircle2 } from 'lucide-react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const TodoStats = lazy(() => import('./components/TodoStats'));

function App() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/40 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 md:p-8 text-slate-800">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8 space-y-6">
          {/* Header */}
          <header className="flex items-center gap-3.5 pb-2 border-b border-slate-100">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                TaskFlow
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Organize, prioritize, and accomplish your day
              </p>
            </div>
          </header>

          {/* Add Todo Input */}
          <TodoInput />

          {/* Todo Stats (Lazy Loaded with Suspense) */}
          <Suspense
            fallback={
              <div className="text-center py-4 text-gray-400 text-sm">
                Loading stats...
              </div>
            }
          >
            <TodoStats />
          </Suspense>

          {/* Todo List with Filter and Items */}
          <TodoList />
        </div>
      </main>
    </>
  );
}

export default App;
