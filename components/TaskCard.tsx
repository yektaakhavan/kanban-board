"use client";

import { DragEvent, useState } from "react";
import { Task } from "@/types/task";

const ACCENT_MAP: Record<Task["status"], { bar: string; badge: string; badgeText: string }> = {
  todo: { bar: "bg-[var(--color-todo)]", badge: "bg-[var(--color-todo-soft)]", badgeText: "text-[var(--color-todo)]" },
  inprogress: { bar: "bg-[var(--color-progress)]", badge: "bg-[var(--color-progress-soft)]", badgeText: "text-[var(--color-progress)]" },
  done: { bar: "bg-[var(--color-done)]", badge: "bg-[var(--color-done-soft)]", badgeText: "text-[var(--color-done)]" },
};

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onDragStart: (e: DragEvent<HTMLDivElement>, taskId: string) => void;
  onDragEnd: () => void;
}

export default function TaskCard({ task, onEdit, onDelete, onDragStart, onDragEnd }: TaskCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const accent = ACCENT_MAP[task.status];

  return (
    <div
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
        onDragStart(e, task.id);
      }}
      onDragEnd={() => {
        setIsDragging(false);
        onDragEnd();
      }}
      className={`group relative flex cursor-grab gap-3 overflow-hidden rounded-lg border border-[var(--color-line)] bg-white p-3.5 shadow-sm transition-all duration-150 active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-md animate-card-drop ${
        isDragging ? "rotate-2 opacity-50" : "rotate-0 opacity-100"
      }`}
    >
      <span aria-hidden className={`w-1 shrink-0 rounded-full ${accent.bar}`} />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="break-words font-display text-sm font-semibold leading-snug text-[var(--color-ink)]">
            {task.title}
          </h3>
          <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            <button
              type="button"
              onClick={onEdit}
              aria-label={`Edit ${task.title}`}
              className="rounded-md p-1 text-[var(--color-ink-soft)] transition hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793ZM11.379 5.793 3 14.172V17h2.828l8.38-8.379-2.83-2.828Z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onDelete}
              aria-label={`Delete ${task.title}`}
              className="rounded-md p-1 text-[var(--color-ink-soft)] transition hover:bg-red-50 hover:text-red-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482 41.03 41.03 0 0 0-2.365-.298V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {task.description && (
          <p className="mt-1.5 line-clamp-3 break-words text-xs leading-relaxed text-[var(--color-ink-soft)]">
            {task.description}
          </p>
        )}

        <div className="mt-2.5 flex items-center justify-between">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${accent.badge} ${accent.badgeText}`}>
            {new Date(task.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          </span>
        </div>
      </div>
    </div>
  );
}
