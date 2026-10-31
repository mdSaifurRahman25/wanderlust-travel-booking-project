# Copilot instructions for Wanderlust

This repo is a small full-stack travel booking app with a Next.js frontend in `frontend/` and an Express + MongoDB backend in `backend/`. Use `frontend/README.md` and `frontend/AGENTS.md` as the project-specific references for routing, data-fetching, and UI conventions.

## Repository layout

- `backend/` contains the API server and MongoDB integration in `backend/index.js`.
- `frontend/` contains the App Router UI in `frontend/src/app/`, reusable sections in `frontend/src/components/`, shared data model types in `frontend/src/types/index.ts`, and static assets in `frontend/public/images/`.
- The destination data contract is split across both sides: the backend exposes MongoDB records, and the frontend consumes them using the shared destination types.

## Build, test, and lint commands

### Frontend

```bash
cd frontend
npm install
npm run dev
npm run build
npx tsc --noEmit
npm run lint
```

- There is no frontend test runner. For focused validation, run ESLint for the files you changed, for example:

```bash
cd frontend
npx eslint src/app/destinations/page.tsx src/components/destinations/DestinationBrowser.tsx
```

- `npm run lint` is the project-wide lint pass. The repo notes existing hook lint warnings in generated UI files; prefer focused checks for edited files instead of broad lint sweeps.

### Backend

```bash
cd backend
npm install
node index.js
```

- There is no backend test suite; `npm test` is a placeholder and not a real validation command.
- The backend expects `backend/.env` with at least:

```env
MONGODB_URI=your-mongodb-connection-string
PORT=8000
```

Do not commit `.env` files or database credentials.

## High-level architecture

### Frontend: Next.js App Router UI

The frontend is a Next.js 16.4.3 + React 19 + TypeScript app. App Router pages live under `frontend/src/app/`, with destination-specific screens, list filters, and edit flows composed from components under `frontend/src/components/`.

- `/destinations` loads the destination list from the backend and passes it to the client-side `DestinationBrowser` for filters, sort controls, and rendering.
- `/destinations/[id]` fetches one destination and expects the backend response shape `{ result: Destination | null }`.
- Add, edit, and delete flows call the corresponding backend routes and refresh the page after successful mutation.
- Static images are referenced via `/images/...`; fallback destination art is stored under `frontend/public/images/destinations/`.

### Backend: Express + MongoDB API

`backend/index.js` is a standalone Express server that connects to MongoDB using `MongoClient` and stores destination data in the `WanderLust` database and `destination` collection.

Current API surface:

- `GET /` health/root response
- `GET /destinations` returns all destinations as a JSON array
- `POST /add-destination` inserts a destination record
- `GET /destinations/:id` returns `{ result: destination | null }`
- `PUT /destinations/:id` validates destination data and updates the record
- `PATCH /destinations/:id` updates fields
- `DELETE /destinations/:id` removes a record
- `POST /booking` validates a booking payload and inserts into the `booking` collection, returning 201 `{ result: Booking }`; duplicate user/destination/date requests return 409

## Key conventions and repo-specific rules

- Treat this as a version-specific Next.js 16 codebase rather than generic Next.js. Check the bundled docs under `frontend/node_modules/next/dist/docs/` before adding routing, cache, or config changes.
- Do not add legacy route segment config keys like `dynamic`, `revalidate`, `fetchCache`, `runtime`, or `experimental.ppr` without verifying the current Next 16 APIs.
- Tailwind is CSS-first here; design tokens live in `frontend/src/app/globals.css`, and there is no `tailwind.config.*` or PostCSS config.
- Shared UI primitives live under `frontend/src/components/ui/`; they use shadcn’s `base-nova` style with `@base-ui/react`. Prefer composition and the `render` prop pattern instead of editing generated primitives.
- Put page sections in `src/components/`, hooks in `src/hooks/`, helpers in `src/lib/`, and keep shared types centralized in `src/types/index.ts`.
- Preserve MongoDB `_id` values when building destination URLs; keep them URL-safe and aligned with the backend response contract.
- Detail-page options such as `reviewCount` and `highlights` are optional. Use truthful fallbacks rather than inventing guarantees.
- Booking is implemented: `BookingCard` posts to `POST /booking` with the signed-in user and selected departure date, then shows a sonner toast.
- Keep frontend API response shapes aligned with the shared types: list endpoints return arrays, while detail and write responses use `{ result: ... }`.
- When editing travel-listing behavior, inspect the frontend page and backend `/destinations` route together because the data contract is split across them.

## Repo-specific workflow

- Prefer the shared `Destination` and filter types in `frontend/src/types/index.ts` over ad hoc component definitions.
- Reuse existing static assets under `frontend/public/images/` and `/images/...` before adding new asset paths.
- If a UI section is page-specific, put it under `src/components/`; if it is reusable and cross-page, prefer the shared component layer.
- When asked to commit or push, sync the full worktree (stage new, modified, and deleted files) per the root `AGENTS.md`.
