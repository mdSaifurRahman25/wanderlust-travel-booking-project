# Copilot instructions for Wanderlust

## Repository layout

This repo is a small full-stack app with two main parts:

- `backend/` is an Express + MongoDB API in `backend/index.js`.
- `frontend/` is a Next.js App Router app, with routes under `frontend/src/app/` and shared UI under `frontend/src/components/`.

Use the frontend documentation in `frontend/README.md` and the repo-specific guidance in `frontend/AGENTS.md` before changing routing, data-fetching, or UI conventions.

## Build, test, and lint commands

Run these from the relevant directory.

### Frontend

```bash
cd frontend
npm install
npm run dev
npm run build
npx tsc --noEmit
npm run lint
```

- There is no dedicated frontend test script today. For focused validation, run ESLint on the files you changed, for example:

```bash
cd frontend
npx eslint src/app/destinations/page.tsx src/components/destinations/DestinationBrowser.tsx
```

- `npm run lint` is the project lint command, and it is intentionally the smallest reliable validation step for edited frontend files when no tests exist.

### Backend

```bash
cd backend
npm install
node index.js
```

The backend expects a `backend/.env` file with at least:

```env
MONGODB_URI=your-mongodb-connection-string
PORT=8000
```

Keep the MongoDB connection string private and do not commit `.env` files.

## High-level architecture

### Frontend: Next.js App Router UI

The frontend is a Next.js 16.4.3 + React 19 + TypeScript app. The homepage and routing live under `frontend/src/app/`, and the app uses the App Router rather than Pages Router conventions.

Important structure:

- `frontend/src/app/page.tsx` is the home page.
- `frontend/src/app/destinations/page.tsx` loads destination data from the backend and renders it through `DestinationBrowser`.
- `frontend/src/components/destinations/DestinationBrowser.tsx` handles filtering, sorting, and list rendering.
- `frontend/src/components/destinations/EditDestinationDialog.tsx` pre-fills the edit form and updates the backend via `PUT /destinations/:id`.
- `frontend/src/types/index.ts` contains the shared destination and filter types; reuse those instead of redefining shapes in components.
- Static images live in `frontend/public/images/` and are referenced using `/images/...`; destination fallbacks are in `frontend/public/images/destinations/`.

### Backend: Express + MongoDB API

The backend is a standalone Express server in `backend/index.js` connected to MongoDB via `MongoClient`.

Current API surface:

- `GET /` health/root response
- `GET /destinations` returns all destinations as a JSON array
- `GET /destinations/:id` returns `{ result: destination | null }`
- `POST /add-destination` inserts a destination record
- `PUT /destinations/:id` validates destination data and updates the record, returning `{ result: destination }`

The database name is `WanderLust`, and the collection is `destination`.

## Key conventions and repo-specific rules

- Treat this as a version-specific Next.js 16 codebase, not generic Next.js. Read the bundled docs in `frontend/node_modules/next/dist/docs/` before making changes to routing, cache behavior, or config.
- Do not add legacy route segment config keys like `dynamic`, `revalidate`, `fetchCache`, `runtime`, or `experimental.ppr` without checking the current Next 16 APIs.
- Tailwind is CSS-first here: the design tokens live in `frontend/src/app/globals.css`, and there is no `tailwind.config.*` or PostCSS config. Prefer existing tokens and utility classes rather than introducing custom config.
- Shared UI primitives live under `frontend/src/components/ui/`. These are generated shadcn-style components; compose them rather than editing the generated primitives directly.
- Use `src/components/` for page sections, `src/hooks/` for hooks, and `src/lib/` for helpers. Keep data types centralized in `src/types/index.ts`.
- Destination IDs must stay URL-safe and preserve the MongoDB `_id` string form returned by the backend when used in route params.
- Detail-page fields such as `reviewCount` and `highlights` are optional. Use truthful fallbacks rather than inventing guarantees.
- The booking flow is intentionally not implemented yet. Do not make the `Book Now` CTA actionable unless a booking workflow exists.
- `frontend/AGENTS.md` explicitly warns against relying on old Next.js assumptions and calls out the project’s current behavior around destination fetching and editing.
- Do not commit environment files or database credentials.

## Practical workflow for this project

- If you are changing travel listing behavior, inspect both the frontend destination page and the backend `/destinations` routes together; the data contract is split between them.
- If you are editing a UI section, check whether it belongs in `src/components/` or `src/app/` before introducing a new abstraction.
- When updating destination detail or edit flows, keep the backend response shape and frontend type expectations aligned with `{ result: ... }` and the `Destination` model in `src/types/index.ts`.
- Use existing static assets under `frontend/public/images/` and `/images/...` references before adding new asset paths.
