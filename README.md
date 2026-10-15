# Snip (frontend)

React frontend for Snip, a URL shortener with click analytics.

**Live:** https://trysnip.vercel.app
**Backend:** https://github.com/adityasrc/snip-backend

## Features

- Create short links with an optional custom alias and expiry date
- Search, edit, delete and copy links; QR code for each link
- Per-link analytics: clicks over the last 7 days, devices, browsers, countries and referrers
- Paste a URL on the landing page and it carries through sign-up into the create dialog

## Tech stack

React 19 (Vite), Tailwind CSS v4, Radix UI primitives (shadcn-style components), React Router, Axios, Recharts, react-hot-toast and date-fns. Fonts: Inter and DM Mono. Package manager: Bun.

## Project structure

```text
src/
├── components/
│   ├── analytics/       # Chart components (TrafficChart, DevicePieChart, RankedListCard, ChartCard)
│   ├── auth/            # AuthLayout, FormError, PasswordInput
│   ├── dashboard/       # DashboardHeader, DashboardStats, LinkCard
│   ├── landing/         # LandingCta, LandingFeatures, LandingFooter, LandingHeader, LandingHero
│   ├── modals/          # CreateLinkModal, DeleteLinkModal, EditLinkModal, QrCodeModal
│   ├── ui/              # Radix UI primitives (Button, Input, Card, Dialog, etc.)
│   └── Logo.jsx
├── lib/
│   ├── api.js           # Axios instance with JWT & 401 interceptor
│   ├── constants.js     # Shared constants
│   ├── useCopy.js       # Clipboard copy hook
│   └── utils.js         # Formatting helpers & tailwind-merge
├── pages/
│   ├── Analytics.jsx    # Per-link analytics view
│   ├── Dashboard.jsx    # Link management dashboard
│   ├── Landing.jsx      # Marketing landing page
│   ├── NotFound.jsx     # Not found / expired link page
│   ├── RedirectHandler.jsx # Dynamic short link redirect resolver
│   ├── Signin.jsx       # Sign in page
│   └── Signup.jsx       # Sign up page
├── App.jsx              # Routes (Code-split with React.lazy)
├── index.css            # Tailwind design tokens, animations, fonts
└── main.jsx             # React entry point
```

## How it works

**Short links.** A short URL such as trysnip.vercel.app/abc opens the app's RedirectHandler, which sends the browser to the backend (`/abc?ref=<referrer host>`). The backend records the click and answers with a 302 to the destination. The referrer is read in the browser first because the backend would otherwise only see its own frontend as the referrer. For a missing or expired link the backend redirects back to /404 on the frontend.

**API client.** One Axios instance (`src/lib/api.js`) attaches the JWT to every request and, on a 401, clears the token and sends the user to /signin.

**Signed-in user.** The JWT carries `id`, `name` and `email`. The header decodes it only to show the name; the server verifies the token on every request.

**Design tokens.** Colors, radius and fonts are CSS variables mapped in `src/index.css`, so components use names like `bg-card` and `text-muted-foreground` instead of raw colors. The only accents are brand (blue), success (green) and destructive (red).

**Animations.** CSS only (keyframes in `src/index.css`); they are switched off for `prefers-reduced-motion`.

## Run locally

```bash
git clone https://github.com/adityasrc/snip-frontend.git
cd snip-frontend
bun install
cp .env.example .env   # VITE_BACKEND_URL=http://localhost:10000
bun run dev            # http://localhost:5173
```

The backend must be running on port 10000 (see the backend README).

## Routes

| Route | Page |
| --- | --- |
| `/` | Landing page |
| `/signup`, `/signin` | Authentication |
| `/dashboard` | Link management |
| `/analytics/:id` | Analytics for one link |
| `/:shortId` | Short link redirect |
| `/404` | Not found / expired link |

## Deploy

Vercel. `vercel.json` rewrites every path to `index.html` so client-side routing works. Set `VITE_BACKEND_URL` to the backend URL in the Vercel project settings.