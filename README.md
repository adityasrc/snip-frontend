Snip 🔗
Snip is a lightweight, developer-focused URL shortener with built-in analytics. It allows you to create short links, track clicks in real time, and analyze traffic by device, browser, and location.

🚀 Key Features
Instant Redirects
Links redirect immediately using HTTP 302 before analytics are stored, ensuring zero delay for visitors.

Built-in Analytics
Device, browser, and geographic data are extracted directly from request headers using geoip-lite and ua-parser-js.

Developer Friendly
Supports custom aliases, link expiration, and a clean REST API.

Analytics Dashboard
A minimal dashboard with charts built using Recharts to visualize traffic patterns over the last 7 days.

🛠 Tech Stack
Frontend

React

Tailwind CSS

Recharts

Backend

Node.js + Express (Running on Bun runtime)

MongoDB

Utilities

JWT Authentication

Nanoid for short link generation

📸 Screenshots
Dashboard Overview
Real-time Analytics
📖 API Reference
1. Create Short Link
POST /api/links/shorten

Headers
Authorization: Bearer <token>

Request Body

JSON
{
  "originalUrl": "https://github.com/adityasrc/snip",
  "customAlias": "my-project",
  "expiresAt": "2026-12-31"
}
2. Get Link Analytics
GET /api/links/analytics/:shortId

📂 Repository Structure
The project is split into two repositories to maintain a decoupled architecture:

Frontend: React dashboard and landing page.

Backend: Node.js API responsible for link generation, redirects, and analytics tracking.

🏗 Running Locally
Clone the repository
git clone https://github.com/adityasrc/snip-frontend

Install dependencies
bun install

Start the server
bun run dev

🗺 Roadmap
[ ] Custom Domain Support

[ ] Team Workspaces

[ ] Password Protected Links