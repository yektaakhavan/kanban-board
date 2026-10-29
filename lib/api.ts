import { Task } from "@/types/task";

export async function fetchSampleTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks", { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to load sample tasks (${response.status})`);
  }

  return (await response.json()) as Task[];
}
