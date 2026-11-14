# Wanderlust — Travel Booking Platform

A full-stack travel booking web application built with **Next.js 16 (App Router)**, **Express 5**, and **MongoDB**. Users can explore travel destinations, view trip details, book departures with duplicate-booking protection, and manage destinations.

🔗 **Live Demo:** [wanderlust-travel-booking-project-woad.vercel.app](https://wanderlust-travel-booking-project-woad.vercel.app)

---

## Screenshots

<!-- Paste or drag & drop your Wanderlust screenshots here in GitHub Editor (e.g., Home, Login, Signup, Destinations) -->

---

## Key Features

- **Explore Destinations:** Browse curated travel destinations and inspect detailed destination pages (`/destinations`, `/destinations/[id]`).
- **Travel Booking System:** Authenticated users can select a departure date and submit a booking (`POST /booking`), with server-side validation that prevents duplicate bookings for the same user, destination, and date (`409 Conflict`).
- **Destination Management:** Create, update (`PATCH` / `PUT`), and delete destinations through dedicated forms and dialogs (`/add-destination`).
- **Authentication:** Secure sign-up and login (`/signup`, `/login`) powered by **Better Auth** with a MongoDB adapter.
- **Responsive Modern UI:** Built with Tailwind CSS (CSS-first tokens) and `shadcn` (`base-nova` style on `@base-ui/react`).

---

## Tech Stack

**Frontend (`frontend/`)**
- Next.js 16 (App Router) & React
- TypeScript
- Tailwind CSS
- shadcn UI (`@base-ui/react`)
- Better Auth (`better-auth`)

**Backend (`backend/`)**
- Node.js (ESM) & Express 5
- MongoDB (`WanderLust` database)

---

## Project Structure

```text
wanderlust/
├── backend/
│   ├── index.js          # Express 5 API, MongoDB connection, validation & routes
│   ├── package.json
│   └── .env              # Git-ignored environment variables
└── frontend/
    ├── src/
    │   ├── app/          # Next.js App Router pages (/, /destinations, /add-destination, /login, /signup, /api/auth)
    │   ├── components/   # Navbar, BookingCard, DestinationBrowser, UI components
    │   ├── lib/          # Better Auth server & client setup
    │   └── types/        # Shared TypeScript interfaces
    ├── next.config.ts
    ├── package.json
    └── .env              # Git-ignored environment variables
```

---

## API Endpoints

Base URL (local): `http://localhost:8000`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/destinations` | Fetch all destinations |
| `GET` | `/destinations/:id` | Fetch a single destination by ID |
| `POST` | `/add-destination` | Add a new destination |
| `PATCH` | `/destinations/:id` | Partially update a destination |
| `PUT` | `/destinations/:id` | Validated full update of a destination |
| `DELETE` | `/destinations/:id` | Delete a destination |
| `POST` | `/booking` | Create a booking (blocks duplicate user/destination/date) |

---

## Getting Started (Local Setup)

This repository contains two independent npm projects (`backend/` and `frontend/`). Make sure the backend is running first so Next.js Server Components can fetch destination data from `http://localhost:8000`.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Setup Backend (`backend/`)

Create a `backend/.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=8000
```

Install dependencies and start the server:

```bash
cd backend
npm install
node index.js
```

### 3. Setup Frontend (`frontend/`)

Create a `frontend/.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
```

Install dependencies and start the development server:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##Images 
<img width="1571" height="992" alt="wanderlast1" src="https://github.com/user-attachments/assets/ba6610b5-5aee-428f-ac02-1e04ffd0f452" />  
<img width="1563" height="991" alt="wanderlast2" src="https://github.com/user-attachments/assets/70cb46a5-c4a0-43b2-b71c-27bf3e65bb24" /> 
<img width="1563" height="985" alt="wanderlast3" src="https://github.com/user-attachments/assets/6e615a9c-7954-4a98-a61d-decdc61972df" /> 




## Available Scripts (`frontend/`)

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the Next.js development server (`http://localhost:3000`) |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npx tsc --noEmit` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |

---

## Planned Improvements

- Implement dedicated `/my-bookings` and `/profile` pages linked from the navbar
- Add automated backend and end-to-end tests

---

## Author

**Md. Saifur Rahman**  
- LinkedIn: [linkedin.com/in/md-saifur-rahman25](https://www.linkedin.com/in/md-saifur-rahman25/)
