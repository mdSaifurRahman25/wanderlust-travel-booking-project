# Copilot instructions for Wanderlust

This repo is a small full-stack travel booking app with a Next.js frontend in `frontend/` and an Express + MongoDB backend in `backend/`. Use `frontend/README.md` and `frontend/AGENTS.md` as the repo-specific references for routing, data-fetching, and UI conventions.

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

There is no frontend test runner. For focused validation, run ESLint on the files you changed instead of a broad suite:

```bash
cd frontend
npx eslint src/app/destinations/page.tsx src/components/destinations/DestinationBrowser.tsx
```

Use the project-wide lint pass only when necessary; this repo already has known hook-lint warnings in generated UI code and it is better to keep validation targeted to the edited files.

### Backend

```bash
cd backend
npm install
node index.js
```

There is no backend test suite; `npm test` is a placeholder and not a real validation command. The backend expects a local `backend/.env` file:

```env
MONGODB_URI=your-mongodb-connection-string
PORT=8000
```

Do not commit `.env` files or database credentials.

## High-level architecture

### Frontend: Next.js App Router UI

The frontend is a Next.js 16 + React 19 + TypeScript app. The app shell and page routes live under `frontend/src/app/`, while reusable UI and page sections live under `frontend/src/components/`.

- `/destinations` loads destination records from the backend and hands them to `DestinationBrowser` for filtering, sorting, and rendering.
- `/destinations/[id]` fetches one destination and expects the backend response shape `{ result: Destination | null }`.
- Add, edit, and delete flows trigger the corresponding Express routes and then refresh the page after successful mutations.
- Static images are referenced as `/images/...`; fallback destination art is stored in `frontend/public/images/destinations/`.

### Backend: Express + MongoDB API

`backend/index.js` is the standalone API. It opens a MongoDB connection, exposes route handlers, validates payloads, and persists destination records in the `WanderLust` database and `destination` collection.

Current API surface:

- `GET /` health check
- `GET /destinations` -> array of destinations
- `POST /add-destination` -> inserts a destination
- `GET /destinations/:id` -> `{ result: destination | null }`
- `PUT /destinations/:id` -> validates and updates a destination
- `PATCH /destinations/:id` -> partial update
- `DELETE /destinations/:id` -> removes a destination

This data contract is split across layers: the frontend loads from the backend and then consumes shared `Destination` types from `frontend/src/types/index.ts`.

## Key conventions

- Treat this as a Next.js 16 app rather than generic Next.js behavior. Check the bundled docs under `frontend/node_modules/next/dist/docs/` before adding routing, cache, or config changes.
- Do not add legacy route segment config keys like `dynamic`, `revalidate`, `fetchCache`, `runtime`, or `experimental.ppr` without verifying the current Next 16 APIs.
- Tailwind is the styling system here; token definitions live in `frontend/src/app/globals.css`, and there is no `tailwind.config.*` or PostCSS config.
- Shared UI primitives live under `frontend/src/components/ui/`; they follow the shadcn `base-nova` pattern using `@base-ui/react`. Prefer composition and the `render` prop pattern over editing generated primitives.
- Put page sections in `src/components/`, hooks in `src/hooks/`, helpers in `src/lib/`, and keep shared data models centralized in `src/types/index.ts`.
- Preserve MongoDB `_id` values when building destination URLs; keep them URL-safe and aligned with the backend response shape.
- Detail-page fields like `reviewCount` and `highlights` are optional; use truthful fallbacks rather than inventing service guarantees.
- The booking flow is intentionally not implemented yet. Do not make the `Book Now` CTA functional unless a booking workflow already exists.
- Keep frontend API response shapes aligned with the shared types: list endpoints return arrays, while detail and write responses return `{ result: ... }`.
- When changing destination-listing behavior, inspect the frontend page and backend `/destinations` route together; the contract is split across both sides.
- Reuse existing static assets under `frontend/public/images/` and `/images/...` before adding new asset paths.

## Repo-specific workflow

- Prefer the shared `Destination` and filter types in `frontend/src/types/index.ts` over ad hoc component definitions.
- If a UI section is page-specific, keep it under `src/components/`; if it is reusable or shared across pages, prefer the shared component layer.
- Preserve unrelated worktree changes and do not stage unrelated files when the user asks to commit or push.
- Keep environment files and any secret values out of version control.

## Relevant project-level references

- `frontend/README.md` for local app setup and data flow
- `frontend/AGENTS.md` for the stricter Next.js 16 and repo-specific rules
- Existing AI instruction files such as `.github/copilot-instructions.md` should be updated in place rather than discarded wholesale
