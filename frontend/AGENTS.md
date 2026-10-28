<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust travel booking

This repository is a small full-stack travel booking app:

- The frontend is a Next.js App Router app in `frontend/`.
- The backend is a standalone Express + MongoDB API in `backend/`.
- Design references live in `frontend/b14-wanderlust-resources/` and are gitignored.

Use `frontend/README.md` for startup instructions and the current API endpoints; this file captures the repo-specific rules that matter when editing the app.

- Static frontend assets live in `frontend/public/images/` and are referenced as `/images/...`. Destination fallback images are in `frontend/public/images/destinations/`; the original design resources remain in `frontend/b14-wanderlust-resources/assets/`.
- The destinations page fetches destination records from the backend and renders/filter/sorts them in `frontend/src/components/destinations/DestinationBrowser.tsx`.
- Destination detail routes live at `frontend/src/app/destinations/[id]/page.tsx`. They fetch `/destinations/:id` and expect the backend JSON shape `{ result: Destination | null }`.
- Cards link to a detail route using the MongoDB `_id` (or fallback `id`) when available. Keep route IDs URL-encoded and preserve the `ObjectId` string form returned by MongoDB.
- `frontend/src/components/destinations/EditDestinationDialog.tsx` receives the current `Destination`, pre-fills its form, and updates it with `PUT /destinations/:id`. The backend expects the destination fields as JSON and returns `{ result: Destination }`; refresh the route after a successful update.
- Shared destination, API response, and filter types belong in `frontend/src/types/index.ts`; reuse these types rather than redefining destination shapes in components.
- Detail-page fields such as `reviewCount` and `highlights` are optional. Do not invent service guarantees or review counts when the API does not provide them; use truthful fallbacks based on available destination data.
- The Edit dialog is implemented. Booking is not yet implemented; do not make the Book Now control actionable until a booking workflow exists.
- The frontend uses npm and `package-lock.json`. Do not commit environment files or database credentials.

## Repo-level architecture

- `frontend/src/app/` holds the App Router pages and global site shell.
- `frontend/src/components/` contains reusable page sections and destination UI.
- `frontend/src/types/` centralizes shared TypeScript destination and filter models.
- `backend/index.js` owns the MongoDB connection, route validation, and data write/read operations.
- The backend stores destination data in the `WanderLust` database and `destination` collection.

## Commands

### Frontend

```bash
cd frontend
npm install
npm run dev
npm run build
npx tsc --noEmit
npm run lint
```

- There is no frontend test script. For focused validation, run ESLint on the files changed when possible:

```bash
cd frontend
npx eslint src/app/destinations/page.tsx src/components/destinations/DestinationBrowser.tsx
```

### Backend

```bash
cd backend
npm install
node index.js
```

Create `backend/.env` before running the API:

```env
MONGODB_URI=your-mongodb-connection-string
PORT=8000
```

## Stack and conventions

- Next.js 16.4.3 App Router, React 19.3, TypeScript strict, Tailwind CSS 4.
- Tailwind is CSS-first: tokens live in `frontend/src/app/globals.css` (`@theme inline` + CSS variables). There is no `tailwind.config.*` or PostCSS config; CSS is compiled by `@tailwindcss/turbopack` via `frontend/next.config.ts`.
- shadcn/ui uses the `base-nova` style with `@base-ui/react` primitives, not Radix. Composition uses `render={<Component />}`, not `asChild`. Prefer existing `frontend/src/components/ui/*`; add more with `npx shadcn add <name>` (writes there). Don't install Radix equivalents.
- `cn` comes from the `cn` package; `frontend/src/lib/utils.ts` re-exports it. Generated UI imports it directly from `"cn"`.
- Put page sections in `src/components/`, hooks in `src/hooks/`, helpers in `src/lib/`. Compose or wrap `src/components/ui/*` rather than editing generated primitives.

## Next.js 16 gotchas

- `frontend/next.config.ts` currently sets `cacheComponents: false` and `partialPrefetching: false`. Check the current config before relying on framework caching or partial prefetching behavior.
- The destinations page is a Server Component and fetches the backend at request time with `cache: "no-store"` so destination changes are reflected on subsequent requests.
- Don't add older route segment configs (`dynamic`, `revalidate`, `fetchCache`, `runtime`) or `experimental.ppr` without checking the bundled Next.js 16 documentation.
- Read the bundled version-specific docs before adding routing/data code: `frontend/node_modules/next/dist/docs/01-app/02-guides/adopting-partial-prefetching.md` and `frontend/node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md`.
- `LayoutProps<"/">` and `PageProps<"/...">` are global generated types in Next 16 — no import needed.

## Working rules for edits

- When you change listing behavior, inspect both the frontend destination page and the backend `/destinations` routes together; the contract is split across them.
- Keep route IDs URL-safe and preserve the MongoDB `_id` string form returned by the API.
- Reuse the types in `frontend/src/types/index.ts` instead of creating duplicate destination shapes.
- Do not commit `.env` files or database credentials.
- The backend response shape is `{ result: Destination }` or `{ result: Destination | null }`, so frontend code should stay aligned with that contract.


| Command | Notes |
| --- | --- |
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build (Turbopack); passes on the starter |
| `npx tsc --noEmit` | Typecheck; passes. No `typecheck` script |
| `npm run lint` | ESLint; known existing hook lint errors are in generated `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`) |

There is no frontend test script. Run focused ESLint checks on edited files when possible.

## Next.js 16 gotchas

- `next.config.ts` currently sets `cacheComponents: false` and `partialPrefetching: false`. Check the current config before relying on framework caching or partial prefetching behavior.
- The destinations page is a Server Component and fetches the backend at request time with `cache: "no-store"` so destination changes are reflected on subsequent requests.
- Don't add older route segment configs (`dynamic`, `revalidate`, `fetchCache`, `runtime`) or `experimental.ppr` without checking the bundled Next.js 16 documentation; APIs differ across Next versions.
- Read the bundled version-specific docs before adding routing/data code: `node_modules/next/dist/docs/01-app/02-guides/adopting-partial-prefetching.md` and `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md`.
- `LayoutProps<"/">` and `PageProps<"/...">` are global generated types in Next 16 — no import needed.
