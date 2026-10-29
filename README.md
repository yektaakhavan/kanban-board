# Kanban Task Manager

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
