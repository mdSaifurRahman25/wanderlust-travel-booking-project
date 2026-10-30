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

- There is no frontend test runner or single-test command. For focused linting, run ESLint on the files you changed, for example:

```bash
cd frontend
npx eslint src/app/destinations/page.tsx src/components/destinations/DestinationBrowser.tsx
```

- `npm run lint` runs ESLint for the whole frontend. The frontend guidance notes existing `react-hooks/set-state-in-effect` lint errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`; use focused linting to check only changed files.

### Backend

```bash
cd backend
npm install
node index.js
```

There is no backend test suite: `npm test` is a placeholder that exits with an error.

The backend expects a `backend/.env` file with at least:

```env
MONGODB_URI=your-mongodb-connection-string
PORT=8000
```

Keep the MongoDB connection string private and do not commit `.env` files.

## High-level architecture

### Frontend: Next.js App Router UI

The frontend is a Next.js 16.4.3 + React 19 + TypeScript app. The homepage and routing live under `frontend/src/app/`, and the app uses the App Router rather than Pages Router conventions.

App Router pages call the API in `backend/index.js`; destination shapes and filter types are shared from `frontend/src/types/index.ts`. The `/destinations` page fetches the list without caching and passes it to the client-side `DestinationBrowser` for filtering, sorting, and rendering. The `/destinations/[id]` page fetches a single record; add, edit, and delete UI calls the corresponding backend routes. Static images live in `frontend/public/images/` and are referenced using `/images/...`, with destination fallbacks under `frontend/public/images/destinations/`.

### Backend: Express + MongoDB API

The backend is a standalone Express server in `backend/index.js` connected to MongoDB via `MongoClient`.

Current API surface:

- `GET /` health/root response
- `GET /destinations` returns all destinations as a JSON array
- `POST /add-destination` inserts a destination record
- `GET /destinations/:id` returns `{ result: destination | null }`
- `PUT /destinations/:id` validates destination data and updates the record, returning `{ result: destination }`
- `PATCH /destinations/:id` updates fields and `DELETE /destinations/:id` removes a record

The database name is `WanderLust`, and the collection is `destination`. `frontend/README.md` documents setup and the frontend-facing API contract.

## Key conventions and repo-specific rules

- Treat this as a version-specific Next.js 16 codebase, not generic Next.js. Read the bundled docs in `frontend/node_modules/next/dist/docs/` before making changes to routing, cache behavior, or config.
- Do not add legacy route segment config keys like `dynamic`, `revalidate`, `fetchCache`, `runtime`, or `experimental.ppr` without checking the current Next 16 APIs.
- Tailwind is CSS-first here: design tokens live in `frontend/src/app/globals.css`; there is no `tailwind.config.*` or PostCSS config. Prefer existing tokens and utilities.
- Shared UI primitives live under `frontend/src/components/ui/`. They use shadcn's `base-nova` style with `@base-ui/react`; compose them rather than editing generated primitives. Use the `render` prop, not Radix's `asChild` pattern.
- Use `src/components/` for page sections, `src/hooks/` for hooks, and `src/lib/` for helpers. Keep data types centralized in `src/types/index.ts`.
- Destination IDs must stay URL-safe and preserve the MongoDB `_id` string form returned by the backend when used in route params.
- Detail-page fields such as `reviewCount` and `highlights` are optional. Use truthful fallbacks rather than inventing guarantees.
- The booking flow is intentionally not implemented yet. Do not make the `Book Now` CTA actionable unless a booking workflow exists.
- `frontend/AGENTS.md` explicitly warns against relying on old Next.js assumptions and calls out the project’s current behavior around destination fetching and editing.
- Do not commit environment files or database credentials.
- Keep frontend API response shapes aligned with the shared types: list responses are arrays, while detail and successful update responses use `{ result: ... }`.

## Practical workflow for this project

- If you are changing travel listing behavior, inspect both the frontend destination page and the backend `/destinations` routes together; the data contract is split between them.
- If you are editing a UI section, check whether it belongs in `src/components/` or `src/app/` before introducing a new abstraction.
- When updating destination detail or edit flows, keep the backend response shape and frontend type expectations aligned with `{ result: ... }` and the `Destination` model in `src/types/index.ts`.
- Use existing static assets under `frontend/public/images/` and `/images/...` references before adding new asset paths.
- When asked to commit or push, stage only the requested changes, preserve unrelated worktree changes, and push only when explicitly requested.
