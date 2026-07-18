# Snip Frontend

React frontend for the Snip URL shortener. Clean, component-driven architecture with a professional analytics dashboard.

**Live:** [https://getsnip.vercel.app](https://getsnip.vercel.app)
**Backend repo:** [https://github.com/adityasrc/snip-backend](https://github.com/adityasrc/snip-backend)

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 (Vite) |
| Styling | Tailwind CSS v3 |
| UI Primitives | Radix UI (Shadcn patterns) |
| Charts | Recharts |
| HTTP Client | Axios (with interceptor) |
| Routing | React Router v7 |
| Icons | Lucide React |
| Toasts | react-hot-toast |
| Font | Space Grotesk (Google Fonts) |

## Project Structure

```text
src/
├── components/
│   ├── analytics/       # Chart components (TrafficChart, DevicePieChart, etc.)
│   ├── dashboard/       # DashboardHeader, DashboardStats, LinkCard, Modals
│   └── ui/              # shadcn-style primitives (Button, Input, Card, etc.)
├── lib/
│   └── api.js           # Axios instance with JWT interceptor
├── pages/
│   ├── Landing.jsx      # Landing page shell
│   ├── LandingHero.jsx  # Hero + sections
│   ├── LandingHeader.jsx
│   ├── LandingFooter.jsx
│   ├── Dashboard.jsx    # Main app page
│   ├── Analytics.jsx    # Per-link analytics view
│   ├── signin.jsx
│   ├── signup.jsx
│   ├── Docs.jsx         # API documentation
│   ├── NotFound.jsx
│   └── RedirectHandler.jsx
└── App.jsx              # Routes

```

## Key Architecture Decisions

### Smart Intent Forwarding

The landing page captures long URLs before authentication. React Router state passes this URL through the `/signup` and `/signin` flows, automatically filling the dashboard creation modal once the user logs in.

### Centralized API Client

All requests go through a single Axios instance in `lib/api.js`. A request interceptor automatically attaches the JWT from `localStorage` to every `Authorization` header, removing manual token management.

### Crash-Proof Redirection

The `RedirectHandler` safely parses `document.referrer` inside a try-catch block to prevent fatal `TypeError` crashes on empty referrers, paired with a themed loading state to prevent screen flashing.

### useMemo for Analytics

All derived data on the analytics page (deviceData, browserData, countryData, timelineData) is computed with `useMemo`. These only recompute when the raw `clicks` array changes to optimize rendering performance.

### Optimistic UI Updates

On create, edit, or delete actions, local state updates immediately without waiting for a refetch. This makes the UI feel instant while the server confirms in the background.

## Running Locally

```bash
git clone https://github.com/adityasrc/snip-frontend.git
cd snip-frontend

# Install dependencies
bun install

# Set environment variable
echo "VITE_BACKEND_URL=http://localhost:10000" > .env

# Start dev server
bun run dev

```

App runs on `http://localhost:5173`.

## Environment Variables

```env
VITE_BACKEND_URL=https://snip-backend.onrender.com

```

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page with hero, how-it-works, feature cards |
| `/signup` | User registration |
| `/signin` | Login |
| `/dashboard` | Link management (create, edit, delete, copy, QR) |
| `/analytics/:id` | Per-link analytics with traffic chart, devices, browsers, locations |
| `/docs` | API documentation |
| `/:shortId` | Short link redirect handler |
| `*` | 404 page |

## Deployment

Deployed on Vercel. The `vercel.json` rewrites all routes to `index.html` for client-side routing. Set `VITE_BACKEND_URL` in the Vercel environment variables dashboard before deploying.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}

```