import { Suspense, lazy, useEffect } from 'react';
import { CheckCircle2, Moon, Sun } from 'lucide-react';
import { useTodoStore } from './store/useTodoStore';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const TodoStats = lazy(() => import('./components/TodoStats'));

function App() {
  const isDarkMode    = useTodoStore((state) => state.isDarkMode);
  const toggleDarkMode = useTodoStore((state) => state.toggleDarkMode);

  // <html> tag pe "dark" class add ya remove karo
  useEffect(() => {
    const root = document.documentElement; // <html> element
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]); // sirf isDarkMode change hone pe chale

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 md:p-8 text-slate-800 dark:text-slate-100">
        <div className="w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-slate-900/60 border border-slate-100 dark:border-slate-700 p-6 sm:p-8 space-y-6">

          {/* Header */}
          <header className="flex items-center gap-3.5 pb-2 border-b border-slate-100 dark:border-slate-700">
            {/* Logo Icon */}
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            {/* Title */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                TaskFlow
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
                Organize, prioritize, and accomplish your day
              </p>
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />   /* dark mode mein → Sun dikhao */
              ) : (
                <Moon className="w-5 h-5" />  /* light mode mein → Moon dikhao */
              )}
            </button>
          </header>

          {/* Add Todo Input */}
          <TodoInput />

          {/* Todo Stats — Lazy Loaded */}
          <Suspense
            fallback={
              <div className="text-center py-4 text-slate-400 dark:text-slate-500 text-sm">
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
