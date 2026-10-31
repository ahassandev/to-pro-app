import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTodoStore = create(
  persist(
    (set) => ({
      // State
      todos: [],
      filter: 'all',   // 'all' | 'completed' | 'pending'
      isDarkMode: false, // dark mode default off

      // Actions
      addTodo: (text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              text: text.trim(),
              completed: false,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      setFilter: (filter) =>
        set({ filter }),

      // Dark mode toggle — true→false ya false→true
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'todo-storage',
      // todos aur isDarkMode dono save karo — filter nahi
      partialize: (state) => ({
        todos: state.todos,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);

export default useTodoStore;

