# Wanderlast Travel Booking

This repository contains a full-stack travel booking app: a Next.js frontend in `frontend/` and an Express/MongoDB backend in `backend/`.

## Requirements

- Node.js and npm
- MongoDB connection string for the backend

## Local setup

Start the backend in one terminal:

```bash
cd backend
npm install
node index.js
```

Create `backend/.env` with the backend configuration before starting it:

```env
MONGODB_URI=your-mongodb-connection-string
PORT=8000
```

Keep the connection string private and do not commit `.env`.

Start the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The destinations page is at `/destinations`.

## App architecture

- `frontend/src/app/` contains the App Router pages and global layout.
- `frontend/src/components/` contains the homepage, destination browser, edit dialog, and shared UI sections.
- `frontend/src/types/index.ts` defines the shared `Destination` and filter models.
- `frontend/public/images/` stores static assets, with destination fallback images in `frontend/public/images/destinations/`.
- `backend/index.js` handles all MongoDB and Express routes.

## Destination data flow

The frontend requests destination data from the backend:

- `GET http://localhost:8000/destinations` loads destinations for `/destinations`.
- `POST http://localhost:8000/add-destination` submits the add-destination form as JSON.
- `GET http://localhost:8000/destinations/:id` returns `{ result: Destination | null }`.
- `PUT http://localhost:8000/destinations/:id` updates a destination and returns `{ result: Destination }`.

The destinations page provides category, price-range, and sorting controls. Images use a destination's `imageUrl` when present, with local sample photos in `public/images/destinations/` as fallbacks.

Shared destination and filter types are defined in `src/types/index.ts` and can be imported with the `@/types` alias.

## Useful commands

Run these from `frontend/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npx tsc --noEmit` | Type-check the frontend |
| `npm run lint` | Run ESLint |

For focused validation when no test script exists, run ESLint against the files you changed, for example:

```bash
cd frontend
npx eslint src/app/destinations/page.tsx src/components/destinations/DestinationBrowser.tsx
```

## Project structure

- `src/app/` — App Router pages and global styles
- `src/components/` — shared and page-specific UI
- `src/types/` — shared TypeScript data and filter types
- `public/images/` — static frontend images
- `backend/` — Express/MongoDB API and environment config

## Repo-specific conventions

- Treat the app as a Next.js 16 codebase rather than generic Next.js behavior; the project includes specific route/data-loading rules documented in `frontend/AGENTS.md`.
- Use the shared destination types from `frontend/src/types/index.ts` instead of redefining destination structures in components.
- Keep MongoDB `_id` values intact when building detail URLs; preserve the ObjectId string form returned by the API.
- Do not make the booking action functional until the booking workflow exists.
- Keep environment files and credentials out of version control.

The Next.js app uses `src/app/` as its application root. The home page and some navigation destinations may still be under development.
