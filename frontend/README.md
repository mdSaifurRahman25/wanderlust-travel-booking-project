# Wanderlast Travel Booking

The frontend for Wanderlast is built with Next.js App Router, React, TypeScript, and Tailwind CSS. The repository also contains an Express/MongoDB backend in `../backend`.

## Requirements

- Node.js and npm
- MongoDB connection string for the backend

## Run locally

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

## Destinations

The frontend requests destination data from the backend:

- `GET http://localhost:8000/destinations` loads destinations for `/destinations`.
- `POST http://localhost:8000/add-destination` submits the add-destination form as JSON.

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

## Project structure

- `src/app/` — App Router pages and global styles
- `src/components/` — shared and page-specific UI
- `src/types/` — shared TypeScript data and filter types
- `public/images/` — static frontend images

The Next.js app uses `src/app/` as its application root. The home page and some navigation destinations may still be under development.
