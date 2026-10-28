"use client";

interface HeaderProps {
  onAddTask: () => void;
  totalTasks: number;
}

export default function Header({ onAddTask, totalTasks }: HeaderProps) {
  return (
    <header className="border-b border-[var(--color-line)] bg-[var(--color-panel)]/80 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-panel)]/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-ink)] font-display text-sm font-semibold text-white"
          >
            KB
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-2xl">
              Kanban Board
            </h1>
            <p className="text-sm text-[var(--color-ink-soft)]">
              {totalTasks === 0
                ? "No tasks yet — add your first one."
                : `Tracking ${totalTasks} task${totalTasks === 1 ? "" : "s"}.`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddTask}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-ink)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-ink)]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] active:scale-[0.98]"
        >
          <span aria-hidden className="text-base leading-none">＋</span>
          Add Task
        </button>
      </div>
    </header>
  );
}
