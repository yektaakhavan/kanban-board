import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, TaskStatus } from "@/types/task";
import { generateId } from "@/lib/id";

interface KanbanState {
  tasks: Task[];
  addTask: (title: string, description: string, status: TaskStatus) => void;
  editTask: (id: string, updates: Partial<Pick<Task, "title" | "description">>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      tasks: [],

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
    }),
    {
      name: "kanban-board-storage",
    }
  )
);
