import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, TaskStatus } from "@/types/task";
import { generateId } from "@/lib/id";
import { fetchSampleTasks } from "@/lib/api";

interface KanbanState {
  tasks: Task[];
  /** True once sample tasks were loaded, so deleting every task never re-seeds the board. */
  hasSeeded: boolean;
  isLoading: boolean;
  error: string | null;

  addTask: (title: string, description: string, status: TaskStatus) => void;
  editTask: (id: string, updates: Partial<Pick<Task, "title" | "description">>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  /** Loads the sample tasks from the fake API and replaces the current board. */
  loadSampleTasks: () => Promise<void>;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      tasks: [],
      hasSeeded: false,
      isLoading: false,
      error: null,

      addTask: (title, description, status) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: generateId(),
              title: title.trim(),
              description: description.trim(),
              status,
              createdAt: Date.now(),
            },
          ],
        })),

      editTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      moveTask: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        })),

      loadSampleTasks: async () => {
        if (get().isLoading) return;
        set({ isLoading: true, error: null });

        try {
          const tasks = await fetchSampleTasks();
          set({ tasks, hasSeeded: true, isLoading: false });
        } catch (err) {
          set({
            isLoading: false,
            error: err instanceof Error ? err.message : "Something went wrong while loading tasks.",
          });
        }
      },
    }),
    {
      name: "kanban-board-storage",
      // Only tasks and the seed flag are saved; loading/error are runtime-only.
      partialize: (state) => ({ tasks: state.tasks, hasSeeded: state.hasSeeded }),
    }
  )
);
