"use client";

import { DragEvent, useState } from "react";
import { ColumnConfig, Task } from "@/types/task";
import TaskCard from "./TaskCard";

interface ColumnProps {
  column: ColumnConfig;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onDragStart: (e: DragEvent<HTMLDivElement>, taskId: string) => void;
  onDragEnd: () => void;
  onDrop: (e: DragEvent<HTMLElement>, status: ColumnConfig["id"]) => void;
}

export default function Column({
  column,
  tasks,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragEnd,
  onDrop,
}: ColumnProps) {
  const [isOver, setIsOver] = useState(false);

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        setIsOver(false);
        onDrop(e, column.id);
      }}
      aria-label={`${column.title} column`}
      className={`flex h-full min-h-[220px] w-full flex-col rounded-xl border bg-[var(--color-panel)]/60 transition-colors ${
        isOver ? "border-[var(--color-ink)]/30 bg-[var(--color-panel)]" : "border-[var(--color-line)]"
      }`}
    >
      <header className="flex items-center justify-between gap-2 border-b border-[var(--color-line)] px-4 py-3">
        <div className="flex items-center gap-2">
          <span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundColor: column.accent }} />
          <h2 className="font-display text-sm font-semibold tracking-wide text-[var(--color-ink)]">
            {column.title}
          </h2>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-medium text-[var(--color-ink-soft)]"
          style={{ backgroundColor: column.accentSoft }}
        >
          {tasks.length}
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-2.5 p-3">
        {tasks.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-[var(--color-line)] px-4 py-8 text-center">
            <p className="text-xs text-[var(--color-ink-soft)]">{column.emptyLabel}</p>
          </div>
        ) : (
          tasks
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task)}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            ))
        )}
      </div>
    </section>
  );
}
