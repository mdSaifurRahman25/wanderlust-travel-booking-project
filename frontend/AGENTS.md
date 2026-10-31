<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust travel booking — frontend

Next.js 16.4.3 App Router, React 19.3, TypeScript strict, Tailwind CSS 4. Repo-wide setup, environment, API contract, and commit rules are in the root `AGENTS.md`.

## Commands

Run from `frontend/`:

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npx tsc --noEmit
npm run lint
```

- No test runner. Verify with `npx tsc --noEmit` (passes) and focused lint on changed files, e.g. `npx eslint src/app/destinations/page.tsx src/components/destinations/DestinationBrowser.tsx`.
- `npm run lint` has known failures in generated `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`), plus unused `cn` warnings in `login/page.tsx` and `signup/page.tsx`.
- The backend must be running at `http://localhost:8000` for `/destinations` and `/destinations/[id]` to render.

## Routes and data flow

- `/destinations` is a Server Component that fetches `http://localhost:8000/destinations` with `cache: "no-store"` and passes the bare array to `DestinationBrowser`, which does category/price filtering and sorting client-side.
- `/destinations/[id]` fetches `/destinations/:id` and expects `{ result: Destination | null }`. `params` is a Promise in Next 16 (`const { id } = await params`).
- `BookingCard` (in `/destinations/[id]`) uses the better-auth session, requires a departure date, POSTs to `http://localhost:8000/booking`, and shows sonner toasts for success or failure.
- `EditDestinationDialog` sends `PATCH /destinations/:id` (not PUT) and calls `router.refresh()` after success. `DeleteDestinationDialog` sends DELETE and requires `deletedCount === 1`, then navigates to `/destinations`.
- `/add-destination` POSTs the form to `/add-destination`; the backend does no validation on that route.
- Build detail links from `destination._id ?? destination.id` and always `encodeURIComponent` the ID.

## Auth

- `src/lib/auth.ts` configures better-auth with the MongoDB adapter; `src/app/api/auth/[...all]/route.ts` exposes the handler.
- `src/lib/auth-client.ts` provides client `authClient`, `signIn`, `signUp`, and `useSession`; `Navbar` renders the session and sign-out action.
- `/login` and `/signup` use email/password. `/signin` was removed. Both pages need `MONGODB_URI`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` in `frontend/.env`.
- `Navbar` links to `/profile` and `/my-bookings`, but those pages do not exist yet.

## Conventions

- Put page sections in `src/components/`, hooks in `src/hooks/`, helpers in `src/lib/`. Compose or wrap `src/components/ui/*` rather than editing generated primitives.
- Shared `Destination`, filter, and API response types live in `src/types/index.ts`; import via `@/types` and do not redefine destination shapes.
- `cn` comes from the `cn` package; `src/lib/utils.ts` re-exports it. Generated UI imports it directly from `"cn"`.
- Tailwind is CSS-first: tokens live in `src/app/globals.css` (`@theme inline` + CSS variables). There is no `tailwind.config.*` or PostCSS config; `@tailwindcss/turbopack` is wired in `next.config.ts`.
- shadcn uses the `base-nova` style with `@base-ui/react` primitives, not Radix. Composition uses `render={<Component />}`, not `asChild`. Add components with `npx shadcn add <name>`.
- Keep static assets under `public/images/` and reference them as `/images/...`; destination fallbacks are in `public/images/destinations/`.
- `reviewCount` and `highlights` are optional. Use truthful fallbacks; do not invent ratings, review counts, or service guarantees.
- Booking is implemented in `BookingCard` via `POST /booking`; keep the shared `Booking` type in `src/types/index.ts` aligned with the backend payload.

## Next.js 16 gotchas

- `next.config.ts` sets `cacheComponents: false` and `partialPrefetching: false`. Check the current config before relying on caching or prefetch behavior.
- Don't add older route segment configs (`dynamic`, `revalidate`, `fetchCache`, `runtime`) or `experimental.ppr` without checking the bundled docs: `node_modules/next/dist/docs/01-app/02-guides/adopting-partial-prefetching.md` and `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md`.
- `LayoutProps<"/">` and `PageProps<"/...">` are global generated types in Next 16 — no import needed.
- `next dev` rewrites the BEGIN/END block at the top of this file; commit it rather than deleting it.

## Editing rules

- Listing behavior is split across the frontend page/browser and the backend `/destinations` routes; inspect both when changing it.
- Keep the response shapes aligned: list endpoints return arrays, detail and write responses use `{ result: ... }` or raw Mongo results as documented in the root `AGENTS.md`.
- Don't commit `.env` files or credentials. Run typecheck and focused lint after changes.
