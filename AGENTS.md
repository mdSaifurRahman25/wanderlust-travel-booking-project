# Wanderlust travel booking

Full-stack app: a Next.js 16 App Router frontend in `frontend/` and a standalone Express 5 + MongoDB API in `backend/`. There is no root `package.json` or workspace — the two apps are independent npm projects.

Frontend-specific guidance is in `frontend/AGENTS.md` (auto-loaded for files under `frontend/`). Keep its Next.js agent block intact.

## Commands

Backend (`backend/`):

```bash
npm install
node index.js
```

- No dev script and no real test suite; `npm test` is a placeholder that fails. Run `node index.js` directly.
- Backend is ESM with top-level `await` in `index.js`; it expects `MONGODB_URI` to be set before startup.

Frontend (`frontend/`):

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npx tsc --noEmit
npm run lint
```

- No frontend test runner. Verify with `npx tsc --noEmit` (currently passes) and focused lint on changed files:
  `npx eslint src/app/destinations/page.tsx src/components/destinations/DestinationBrowser.tsx`
- `npm run lint` currently fails on generated `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`), and warns about unused `cn` in `login/page.tsx` and `signup/page.tsx`. Do not treat those as regressions.

## Environment and setup

Both env files are gitignored and required:

- `frontend/.env`: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`
- `backend/.env`: `MONGODB_URI`, optional `PORT` (defaults to `8000`)

Both apps use the same MongoDB database, `WanderLust`. The backend reads/writes the `destination` collection; better-auth manages its own collections in the same database. Server Components fetch `http://localhost:8000` directly, so the backend must be running for `/destinations` and `/destinations/[id]` to render.

## Architecture

- Routes in `frontend/src/app/`: `/`, `/destinations`, `/destinations/[id]`, `/add-destination`, `/login`, `/signup`. `/signin` no longer exists (replaced by `/login`).
- `frontend/src/app/api/auth/[...all]/route.ts` exposes the better-auth handler.
- Auth: `frontend/src/lib/auth.ts` (server, better-auth + MongoDB adapter), `frontend/src/lib/auth-client.ts` (client session/actions), session UI in `frontend/src/components/Navbar.tsx`.
- `backend/index.js` is the entire API: connection, routes, validation, Mongo access.
- Shared types live in `frontend/src/types/index.ts`; `@/*` maps to `frontend/src/*`.
- `Navbar` links to `/profile` and `/my-bookings`, but those pages are not implemented.

## API contract

- `GET /destinations` → bare `Destination[]`
- `GET /destinations/:id` → `{ result: Destination }`, or 404 `{ message }`
- `POST /add-destination` → raw Mongo insert result, no validation
- `PATCH /destinations/:id` → raw Mongo update result, no validation; the Edit dialog uses PATCH, not PUT
- `PUT /destinations/:id` → validated full update, returns `{ result: Destination }`
- `DELETE /destinations/:id` → raw Mongo delete result; the UI requires `deletedCount === 1`
- `POST /booking` → validated insert into the `booking` collection, returns 201 `{ result: Booking }`
- IDs are MongoDB `ObjectId` strings. Keep them URL-encoded and preserve the string form returned by the API.

## Conventions and gotchas

- This is version-specific Next.js 16. Read `frontend/node_modules/next/dist/docs/` before changing routing, caching, or config. Do not add legacy route segment configs (`dynamic`, `revalidate`, `fetchCache`, `runtime`) or `experimental.ppr` without checking those docs.
- `frontend/next.config.ts` sets `cacheComponents: false` and `partialPrefetching: false`.
- Tailwind is CSS-first: tokens live in `frontend/src/app/globals.css`; there is no `tailwind.config.*` or PostCSS config. CSS is compiled by `@tailwindcss/turbopack` via `next.config.ts`.
- shadcn uses the `base-nova` style with `@base-ui/react`, not Radix. Use `render={<Component />}` instead of `asChild`; don't add Radix equivalents.
- Booking posts to `POST /booking` from `BookingCard` with the signed-in user and chosen departure date, then shows a toast. Do not invent ratings, review counts, or service guarantees when the API omits them.
- Do not commit `.env` files or database credentials.

## Commit and push

Repo convention when asked to commit and push:

- Treat it as a full repository sync: stage newly created, modified, and deleted files unless the user explicitly excludes something.
- Do not leave uncommitted changes behind when a commit/push was requested.
- Push to all configured remotes. `origin` has two push URLs (GitHub and GitLab), so `git push origin` targets both.
- Confirm remote update status after pushing.
