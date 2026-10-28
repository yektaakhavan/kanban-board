export type TaskStatus = "todo" | "inprogress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: number;
}

export interface ColumnConfig {
  id: TaskStatus;
  title: string;
  accent: string;
  accentSoft: string;
  emptyLabel: string;
}

export const COLUMNS: ColumnConfig[] = [
  {
    id: "todo",
    title: "Todo",
    accent: "var(--color-todo)",
    accentSoft: "var(--color-todo-soft)",
    emptyLabel: "Nothing queued up yet.",
  },
  {
    id: "inprogress",
    title: "In Progress",
    accent: "var(--color-progress)",
    accentSoft: "var(--color-progress-soft)",
    emptyLabel: "No active work right now.",
  },
  {
    id: "done",
    title: "Done",
    accent: "var(--color-done)",
    accentSoft: "var(--color-done-soft)",
    emptyLabel: "Nothing finished yet.",
  },
];
