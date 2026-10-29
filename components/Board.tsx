"use client";

import { DragEvent, useEffect, useState } from "react";
import { useKanbanStore } from "@/store/useKanbanStore";
import { COLUMNS, Task, TaskStatus } from "@/types/task";
import Header from "./Header";
import Column from "./Column";
import TaskModal from "./TaskModal";
import ConfirmDialog from "./ConfirmDialog";

type ModalState =
  | { mode: "closed" }
  | { mode: "create"; status: TaskStatus }
  | { mode: "edit"; task: Task };

function BoardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading tasks">
      {COLUMNS.map((col) => (
        <div key={col.id} className="h-64 animate-pulse rounded-xl bg-[var(--color-panel)]/60" />
      ))}
    </div>
  );
}

export default function Board() {
  const tasks = useKanbanStore((state) => state.tasks);
  const hasSeeded = useKanbanStore((state) => state.hasSeeded);
  const isLoading = useKanbanStore((state) => state.isLoading);
  const error = useKanbanStore((state) => state.error);
  const addTask = useKanbanStore((state) => state.addTask);
  const editTask = useKanbanStore((state) => state.editTask);
  const deleteTask = useKanbanStore((state) => state.deleteTask);
  const moveTask = useKanbanStore((state) => state.moveTask);
  const loadSampleTasks = useKanbanStore((state) => state.loadSampleTasks);

  const [hasMounted, setHasMounted] = useState(false);
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });
  const [taskPendingDelete, setTaskPendingDelete] = useState<Task | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  useEffect(() => setHasMounted(true), []);

  // First visit (nothing persisted yet): fetch the sample tasks from the fake API.
  useEffect(() => {
    if (hasMounted && !hasSeeded) {
      void loadSampleTasks();
    }
  }, [hasMounted, hasSeeded, loadSampleTasks]);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => setDraggedTaskId(null);

  const handleDrop = (e: DragEvent<HTMLElement>, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain") || draggedTaskId;
    if (taskId) moveTask(taskId, status);
    setDraggedTaskId(null);
  };

  const handleModalSubmit = (data: { title: string; description: string; status: TaskStatus }) => {
    if (modal.mode === "create") {
      addTask(data.title, data.description, data.status);
    } else if (modal.mode === "edit") {
      editTask(modal.task.id, { title: data.title, description: data.description });
      if (data.status !== modal.task.status) {
        moveTask(modal.task.id, data.status);
      }
    }
    setModal({ mode: "closed" });
  };

  const showSkeleton = !hasMounted || (isLoading && tasks.length === 0);

  if (!hasMounted) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <BoardSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        totalTasks={tasks.length}
        disabled={isLoading}
        onAddTask={() => setModal({ mode: "create", status: "todo" })}
        onResetSamples={() => setConfirmingReset(true)}
      />

      <main className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
        {error && (
          <div
            role="alert"
            className="mb-4 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => void loadSampleTasks()}
              className="self-start rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700 sm:self-auto"
            >
              Retry
            </button>
          </div>
        )}

        {showSkeleton ? (
          <BoardSkeleton />
        ) : (
          <div
            className={`grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${
              isLoading ? "opacity-60" : "opacity-100"
            }`}
          >
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
                onEditTask={(task) => setModal({ mode: "edit", task })}
                onDeleteTask={(task) => setTaskPendingDelete(task)}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
              />
            ))}
          </div>
        )}
      </main>

      {modal.mode !== "closed" && (
        <TaskModal
          mode={modal.mode}
          initialTask={modal.mode === "edit" ? modal.task : undefined}
          initialStatus={modal.mode === "create" ? modal.status : undefined}
          onClose={() => setModal({ mode: "closed" })}
          onSubmit={handleModalSubmit}
        />
      )}

      {taskPendingDelete && (
        <ConfirmDialog
          title="Delete this task?"
          message={`"${taskPendingDelete.title}" will be removed for good. This can't be undone.`}
          onCancel={() => setTaskPendingDelete(null)}
          onConfirm={() => {
            deleteTask(taskPendingDelete.id);
            setTaskPendingDelete(null);
          }}
        />
      )}

      {confirmingReset && (
        <ConfirmDialog
          title="Reset to sample tasks?"
          message="All your current tasks will be replaced with the sample tasks from the fake API."
          confirmLabel="Reset"
          onCancel={() => setConfirmingReset(false)}
          onConfirm={() => {
            setConfirmingReset(false);
            void loadSampleTasks();
          }}
        />
      )}
    </div>
  );
}
