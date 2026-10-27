<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust travel booking

The frontend is a Next.js travel-booking app under `src/app/`; the Express and MongoDB backend is in the repository's `backend/` directory. The design reference is in the locally available `b14-wanderlust-resources/` folder; it is gitignored.

- Use `frontend/README.md` for local startup instructions and the frontend/backend API endpoints.
- Static frontend assets live in `public/images/` and are referenced as `/images/...`. Destination fallback images are in `public/images/destinations/`; the original design resources remain in `b14-wanderlust-resources/assets/`.
- The destinations page fetches destination records from the backend and renders/filter/sorts them in `src/components/destinations/DestinationBrowser.tsx`.
- Shared destination and filter data types belong in `src/types/index.ts`; reuse these types rather than redefining destination shapes in components.
- The frontend uses npm and `package-lock.json`. Do not commit environment files or database credentials.

## Stack and conventions

- Next.js 16.4.3 App Router, React 19.3, TypeScript strict, Tailwind CSS 4.
- Tailwind is CSS-first: tokens live in `src/app/globals.css` (`@theme inline` + CSS variables). There is no `tailwind.config.*` or PostCSS config; CSS is compiled by `@tailwindcss/turbopack` via `next.config.ts`.
- shadcn/ui uses the `base-nova` style with `@base-ui/react` primitives, not Radix. Composition uses `render={<Component />}`, not `asChild`. Prefer existing `src/components/ui/*`; add more with `npx shadcn add <name>` (writes there). Don't install Radix equivalents.
- `cn` comes from the `cn` package; `src/lib/utils.ts` re-exports it. Generated UI imports it directly from `"cn"`.
- Put page sections in `src/components/`, hooks in `src/hooks/`, helpers in `src/lib/`. Compose or wrap `src/components/ui/*` rather than editing generated primitives.

## Commands

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
