# Snip Frontend

React frontend for the Snip URL shortener. Clean, component-driven architecture with a professional analytics dashboard, designed with a premium, minimalist SaaS aesthetic.

**Live:** [https://trysnip.vercel.app](https://trysnip.vercel.app)  
**Backend repo:** [https://github.com/adityasrc/snip-backend](https://github.com/adityasrc/snip-backend)

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 (Vite) |
| Styling | Tailwind CSS v3 (Semantic Design Tokens) |
| UI Primitives | Radix UI (Shadcn patterns) |
| Charts | Recharts |
| HTTP Client | Axios (with interceptor) |
| Routing | React Router v7 |
| Icons | Lucide React |
| Toasts | react-hot-toast |
| Font | Inter (UI) & DM Mono (Data/URLs) |

## Project Structure

```text
src/
├── components/
│   ├── analytics/       # Chart components (TrafficChart, DevicePieChart, etc.)
│   ├── dashboard/       # DashboardHeader, DashboardStats, LinkCard, Modals
│   └── ui/              # shadcn-style primitives (Button, Input, Card, etc.)
├── lib/
│   ├── api.js           # Axios instance with JWT & 401 interceptor
│   └── utils.js         # Native Intl API helpers & tailwind-merge
├── pages/
│   ├── Landing.jsx      # Landing page shell
│   ├── LandingHero.jsx  # Hero + sections
│   ├── LandingHeader.jsx
│   ├── LandingFooter.jsx
│   ├── Dashboard.jsx    # Main app page
│   ├── Analytics.jsx    # Per-link analytics view
│   ├── Signin.jsx       # Auth flows
│   ├── Signup.jsx
│   ├── RedirectHandler.jsx # Dynamic short link redirect resolver
│   └── NotFound.jsx
└── App.jsx              # Routes (Code-split with React.lazy)
```

## Key Architecture Decisions

### Safe Link Redirection Handler

Short URLs hitting the frontend domain (e.g. `trysnip.vercel.app/:shortId`) are instantly captured by `RedirectHandler.jsx`. The handler extracts the referrer safely without throwing URL exceptions, renders a smooth themed loader to eliminate screen flash, and hands off execution to the backend redirection service to record analytics and issue a native 302 Found redirect.

### Semantic Design Tokens

Hardcoded Tailwind colors were stripped out in favor of centralized CSS variables (e.g., `bg-background`, `text-foreground`, `border-border`). This ensures a unified, premium aesthetic and guarantees zero-friction scalability when adding Dark Mode.

### Zero-Dependency Localization

Instead of bloating the bundle with heavy country-code mapping libraries (like `i18n-iso-countries`), the analytics dashboard utilizes the browser's native `Intl.DisplayNames` API to format country data, maintaining a near-zero impact on bundle size.

### Smart Intent Forwarding

The landing page captures long URLs before authentication. React Router state passes this URL through the `/signup` and `/signin` flows, automatically filling the dashboard creation modal once the user logs in.

### Centralized API Interceptors

All requests go through a single Axios instance in `lib/api.js`. A request interceptor automatically attaches the JWT to every header, while a response interceptor catches `401 Unauthorized` errors globally to force a clean logout, keeping UI components entirely decoupled from auth state logic.

## Running Locally

```bash
git clone https://github.com/adityasrc/snip-frontend.git
cd snip-frontend

# Install dependencies
bun install

# Set environment variable
echo "VITE_API_URL=http://localhost:10000" > .env

# Start dev server
bun run dev
```

App runs on `http://localhost:5173`.

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page with hero, how-it-works, feature cards |
| `/signup` | User registration |
| `/signin` | Login |
| `/dashboard` | Link management (create, edit, delete, copy, QR) |
| `/analytics/:id` | Per-link analytics with traffic chart, devices, browsers, locations |
| `/:shortId` | Short link redirection handler |
| `/404`, `*` | 404 page |

## Deployment

Deployed on Vercel. The `vercel.json` rewrites all standard routes to `index.html` for client-side routing.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```