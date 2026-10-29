import { Task } from "@/types/task";

/**
 * Sample tasks served by the fake API.
 * `ageMinutes` is converted to a real `createdAt` timestamp when the API responds,
 * so the dates on the cards always look recent.
 */
export type SeedTask = Omit<Task, "createdAt"> & { ageMinutes: number };

export const SEED_TASKS: SeedTask[] = [
  {
    id: "seed-1",
    title: "Design landing page wireframes",
    description: "Sketch the hero, features and pricing sections for desktop and mobile.",
    status: "todo",
    ageMinutes: 60 * 26,
  },
  {
    id: "seed-2",
    title: "Set up CI pipeline",
    description: "Run type-check, lint and build on every pull request.",
    status: "todo",
    ageMinutes: 60 * 20,
  },
  {
    id: "seed-3",
    title: "Write API documentation",
    description: "",
    status: "todo",
    ageMinutes: 60 * 8,
  },
  {
    id: "seed-4",
    title: "Implement authentication flow",
    description: "Login, register and password reset screens with form validation.",
    status: "inprogress",
    ageMinutes: 60 * 14,
  },
  {
    id: "seed-5",
    title: "Refactor dashboard components",
    description: "Split the large dashboard file into smaller reusable components.",
    status: "inprogress",
    ageMinutes: 60 * 5,
  },
  {
    id: "seed-6",
    title: "Initialize Next.js project",
    description: "App Router, TypeScript, Tailwind CSS v4 and Zustand configured.",
    status: "done",
    ageMinutes: 60 * 48,
  },
  {
    id: "seed-7",
    title: "Define color palette and typography",
    description: "Design tokens added to the Tailwind theme.",
    status: "done",
    ageMinutes: 60 * 40,
  },
];
