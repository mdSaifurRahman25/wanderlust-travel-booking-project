<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust travel booking

Wanderlust travel-booking page. `src/app/page.tsx` is still the create-next-app placeholder; the design reference is in `b14-wanderlust-resources/` (`Wanderlust .fig`, `Wanderlust .penpot`, `assets/`). That folder is gitignored and exists only locally.

- The README is mostly stock create-next-app boilerplate; the app lives under `src/app/`. Trust the configs and files over it.
- Public assets live in `public/images/` — reference them as `/images/...`. The six destination images are not copied yet; they are only at `b14-wanderlust-resources/assets/destinations/` (copy to `public/images/destinations/` when needed).
- npm only (`package-lock.json`). No monorepo, backend, API routes, database, auth, tests, CI, or formatter config.

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
| `npm run lint` | ESLint; currently exits 1 |

`npm run lint` has two pre-existing errors in generated files: `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`). Don't treat them as regressions. No test command exists.

## Next.js 16 gotchas

- `next.config.ts` enables `cacheComponents: true` and `partialPrefetching: true`. Data fetching is dynamic by default; cache explicitly with `use cache` / `cacheLife` / `cacheTag`. Don't add older route segment configs (`dynamic`, `revalidate`, `fetchCache`, `runtime`) or `experimental.ppr`; they are replaced or unsupported under Cache Components.
- Read the bundled version-specific docs before adding routing/data code: `node_modules/next/dist/docs/01-app/02-guides/adopting-partial-prefetching.md` and `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md`.
- `LayoutProps<"/">` and `PageProps<"/...">` are global generated types in Next 16 — no import needed.
