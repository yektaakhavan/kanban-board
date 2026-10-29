# Kanban Task Manager

<<<<<<< HEAD
A Trello-style task manager built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4** and **Zustand**. Tasks move between columns with native HTML5 drag and drop and persist in `localStorage`, with no backend and no UI library.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5-orange)

<!-- Add a screenshot or GIF here: ![Kanban Board screenshot](./docs/screenshot.png) -->

## Features

- **Three columns:** Todo, In Progress, Done, each with its own accent color and live task count
- **Task CRUD:** create, edit and delete tasks (title + optional description)
- **Drag and drop:** move cards between columns using the native HTML5 Drag and Drop API, with visual feedback on the dragged card and the target column
- **Fake API with sample data:** on the first visit the board is seeded with demo tasks fetched from a mock `GET /api/tasks` endpoint (with simulated latency, loading skeleton and error/retry state)
- **Persistent state:** the whole board survives page reloads via Zustand's `persist` middleware
- **Reset samples:** one click (with confirmation) restores the original sample tasks
- **Safe deletion:** confirmation dialog before a task is removed
- **Empty states:** friendly placeholders for columns with no tasks
- **Responsive:** single column on mobile, multi-column grid on larger screens
- **Accessible basics:** semantic HTML, labelled form fields and buttons, focus styles, `prefers-reduced-motion` respected

## Tech Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| UI | React 19, functional components and hooks |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 (`@theme` design tokens) |
| State | Zustand + `persist` middleware |
| Drag and drop | Native HTML5 DnD API (no extra library) |
| Mock backend | Next.js Route Handler (`app/api/tasks`) |

## Getting Started

**Prerequisites:** Node.js 18.18+ and npm.

```bash
git clone https://github.com/<your-username>/kanban-board.git
cd kanban-board
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
.
├── app/
│   ├── api/tasks/route.ts # Fake API: GET /api/tasks returns sample tasks
│   ├── globals.css        # Tailwind v4 import, theme tokens, animations
│   ├── layout.tsx         # Root layout and metadata
│   └── page.tsx           # Renders the Board
├── components/
│   ├── Board.tsx          # Orchestrates store, modals and drag state
│   ├── Column.tsx         # Drop zone + task list + empty state
│   ├── TaskCard.tsx       # Draggable card with edit/delete actions
│   ├── TaskModal.tsx      # Create / edit form
│   ├── ConfirmDialog.tsx  # Delete confirmation
│   └── Header.tsx         # Title and "Add Task" button
├── data/
│   └── seedTasks.ts       # Sample task definitions served by the fake API
├── store/
│   └── useKanbanStore.ts  # Zustand store: state, actions, persistence
├── types/
│   └── task.ts            # Task model, status union, column config
└── lib/
    ├── api.ts             # Client helper that calls the fake API
    └── id.ts              # ID generation helper
```

## Data Model

```ts
type TaskStatus = "todo" | "inprogress" | "done";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: number; // timestamp
}
```

## Architecture Notes

- **Single source of truth:** all tasks live in one Zustand store; `addTask`, `editTask`, `deleteTask` and `moveTask` are store actions, so components stay presentational.
- **Hydration safety:** because state is restored from `localStorage` on the client, `Board` renders a skeleton until it has mounted. This avoids Next.js server/client hydration mismatches.
- **Fake API + seeding:** `lib/api.ts` fetches `/api/tasks`; the store's `loadSampleTasks` action fills the board on first visit. A persisted `hasSeeded` flag prevents re-seeding after you delete every task, and the "Reset samples" button calls the same action to restore the demo data.
- **Native drag and drop:** the dragged task id travels through `dataTransfer`, and each column acts as a drop target that calls `moveTask`.
- **Design tokens:** colors and fonts are defined once in `@theme` and reused across components.

## Roadmap

- [ ] Reorder tasks within a column
- [ ] Touch-device drag support
- [ ] Custom columns
- [ ] Search and filter
- [ ] Unit and component tests

## License

MIT
=======
A responsive Kanban board application for organizing tasks across workflow stages. Built with Next.js, React, TypeScript, Tailwind CSS v4, and Zustand, with client-side persistence for a consistent experience across page reloads.

## Features

- **Task Management:** Create, edit, and delete tasks with titles and optional descriptions.
- **Drag and Drop:** Move tasks between Todo, In Progress, and Done columns.
- **State Management:** Centralized task state and board actions using Zustand.
- **Persistent Storage:** Save task and board state in browser localStorage.
- **Responsive UI:** Adaptable layouts for desktop and mobile screens.
- **Workflow Overview:** Display task counts for each column and provide empty states when columns have no tasks.
- **Interactive Feedback:** Hover states, drag feedback, and task deletion confirmation where implemented.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS v4
- Zustand
- HTML5 Drag and Drop API
- Browser localStorage

## Getting Started

### Prerequisites

- Node.js (a version compatible with the project's Next.js release)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/yektaakhavan/kanban-board>
   ```

2. Navigate to the project directory:

   ```bash
   cd <PROJECT_DIRECTORY>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser.

## How It Works

Tasks are organized into three workflow stages: Todo, In Progress, and Done. Users can create and update tasks, remove completed or unnecessary items, and move cards between columns using drag and drop.

Zustand manages the application's task state and exposes actions for task operations. Browser localStorage preserves the stored state between page reloads without requiring a backend or user account.

## Project Structure

The application separates UI components, shared TypeScript types, and state management to keep responsibilities clear and make the code easier to maintain.

- `app/` — Next.js App Router pages and layout
- `components/` — Board, columns, task cards, and task forms or modals
- `store/` — Zustand store and task actions
- `types/` — Shared TypeScript definitions

*Directory names may vary depending on the final implementation.*

## Scope and Limitations

This is a client-side application. Tasks are stored locally in the browser and are not synchronized across devices or users. Clearing browser storage may remove saved tasks.

## Future Improvements

- Add task priorities, labels, and due dates.
- Support task filtering and search.
- Add automated component and end-to-end tests.
- Introduce backend persistence and user authentication.

---

## Author

**Yekta Akhavan**

[![Gmail](https://img.shields.io/badge/Gmail-yekta.akhavan.dev@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:yekta.akhavan.dev@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yekta_Akhavan-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yekta-akhavan/)
[![Portfolio](https://img.shields.io/badge/Portfolio-yekta--akhavan.vercel.app-991397?style=flat-square&logo=vercel&logoColor=white)](https://yekta-akhavan.vercel.app/)
>>>>>>> d0aae95896331b84188b77bcac03270f63053807
