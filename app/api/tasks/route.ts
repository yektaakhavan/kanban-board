import { NextResponse } from "next/server";
import { SEED_TASKS } from "@/data/seedTasks";
import { Task } from "@/types/task";

export const dynamic = "force-dynamic";

const FAKE_LATENCY_MS = 700;

/**
 * GET /api/tasks
 * Fake API: returns the sample tasks after a short artificial delay
 * so the loading state is visible, like a real network request.
 */
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS));

  const now = Date.now();
  const tasks: Task[] = SEED_TASKS.map(({ ageMinutes, ...task }) => ({
    ...task,
    createdAt: now - ageMinutes * 60 * 1000,
  }));

  return NextResponse.json(tasks);
}
