"use client";

import { useState, FormEvent } from "react";
import { COLUMNS, Task, TaskStatus } from "@/types/task";

interface TaskModalProps {
  mode: "create" | "edit";
  initialTask?: Task;
  initialStatus?: TaskStatus;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; status: TaskStatus }) => void;
}

export default function TaskModal({
  mode,
  initialTask,
  initialStatus = "todo",
  onClose,
  onSubmit,
}: TaskModalProps) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(initialTask?.description ?? "");
  const [status, setStatus] = useState<TaskStatus>(initialTask?.status ?? initialStatus);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Give the task a title before saving.");
      return;
    }
    onSubmit({ title, description, status });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/40 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-[var(--color-panel)] p-6 shadow-xl animate-card-drop"
      >
        <h2 id="task-modal-title" className="font-display text-lg font-semibold text-[var(--color-ink)]">
          {mode === "create" ? "New task" : "Edit task"}
        </h2>

        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-[var(--color-ink)]">
              Title
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Write onboarding docs"
              autoFocus
              className="mt-1.5 w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-ink)] focus:ring-2 focus:ring-[var(--color-ink)]/10"
            />
            {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
          </div>

          <div>
            <label htmlFor="task-description" className="block text-sm font-medium text-[var(--color-ink)]">
              Description <span className="font-normal text-[var(--color-ink-soft)]">(optional)</span>
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any useful context…"
              rows={3}
              className="mt-1.5 w-full resize-none rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-ink)] focus:ring-2 focus:ring-[var(--color-ink)]/10"
            />
          </div>

          <div>
            <label htmlFor="task-status" className="block text-sm font-medium text-[var(--color-ink)]">
              Column
            </label>
            <select
              id="task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="mt-1.5 w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-ink)] focus:ring-2 focus:ring-[var(--color-ink)]/10"
            >
              {COLUMNS.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--color-ink-soft)] transition hover:bg-[var(--color-paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[var(--color-ink)] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-ink)]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
          >
            {mode === "create" ? "Add task" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
