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

export default function Board() {
  const tasks = useKanbanStore((state) => state.tasks);
  const addTask = useKanbanStore((state) => state.addTask);
  const editTask = useKanbanStore((state) => state.editTask);
  const deleteTask = useKanbanStore((state) => state.deleteTask);
  const moveTask = useKanbanStore((state) => state.moveTask);

  const [hasMounted, setHasMounted] = useState(false);
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });
  const [taskPendingDelete, setTaskPendingDelete] = useState<Task | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  useEffect(() => setHasMounted(true), []);

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

  if (!hasMounted) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.id} className="h-64 animate-pulse rounded-xl bg-[var(--color-panel)]/60" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header totalTasks={tasks.length} onAddTask={() => setModal({ mode: "create", status: "todo" })} />

      <main className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}
