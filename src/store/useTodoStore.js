import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTodoStore = create(
  persist(
    (set) => ({
      // State
      todos: [],
      filter: 'all', // 'all' | 'completed' | 'pending'

      // Actions
      addTodo: (text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now(),
              text: text.trim(),
              completed: false,
              createdAt: new Date(),
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
        set({
          filter,
        }),
    }),
    {
      name: 'todo-storage', // localStorage key name
    }
  )
);

export default useTodoStore;
