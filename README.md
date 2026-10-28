# Kanban Board

A Trello-like task board built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Zustand.

## Features

- Three columns: Todo, In Progress, Done
- Create, edit, and delete tasks (with a delete confirmation)
- Native HTML5 drag-and-drop between columns
- State persisted to `localStorage` via `zustand/middleware persist`
- Responsive layout, per-column task counts, empty-state messaging

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/                 Next.js App Router entry (layout, page, global styles)
components/          Presentational + interactive UI components
store/               Zustand store (state + actions + persistence)
types/               Shared TypeScript types and column config
lib/                 Small utility helpers (ID generation)
```
