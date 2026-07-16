import { LandingHeader } from "./LandingHeader";
import { HTTP_BACKEND } from "../../config";

export default function Docs() {
  return (
    <div className="min-h-screen bg-background font-sans pb-20">
      <LandingHeader />

      <main className="max-w-4xl mx-auto p-6 pt-20">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">API Reference</h1>
          <p className="text-lg text-muted-foreground">
            Integrate Snip's URL shortening and analytics engine directly into your applications. All requests accept and return JSON.
          </p>
        </div>

        <div className="bg-card p-8 rounded-3xl border border-border shadow-sm mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Base URL</h2>
          <div className="bg-zinc-950 text-zinc-50 font-mono text-sm p-4 rounded-xl flex items-center">
            {HTTP_BACKEND}/api
          </div>
        </div>

        <div className="bg-card p-8 rounded-3xl border border-border shadow-sm mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Authentication</h2>
          <p className="text-muted-foreground mb-4">
            Endpoints managing links and analytics require a JWT Bearer token. Include it in the headers of your requests.
          </p>
          <div className="bg-muted border border-border font-mono text-sm p-4 rounded-xl text-foreground">
            Authorization: Bearer &lt;YOUR_JWT_TOKEN&gt;
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground mt-10 mb-2">Core Endpoints</h2>

          <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="bg-muted/50 border-b border-border px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="bg-orange-500/10 text-orange-600 dark:text-orange-500 font-bold text-[13px] px-3 py-1 rounded-md w-fit">POST</span>
              <code className="text-foreground font-bold">/links/shorten</code>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">Generates a new shortened URL. Supports custom aliases and expiration dates.</p>

              <h4 className="font-bold text-foreground text-sm mb-2">Request Body</h4>
              <pre className="bg-zinc-950 text-zinc-300 p-4 rounded-xl font-mono text-[13px] overflow-x-auto mb-4">
                {`{
  "title": "My Portfolio", // Optional
  "originalUrl": "https://github.com/adityasrc/snip", // Required
  "customAlias": "portfolio", // Optional
  "expiresAt": "2026-12-31T23:59:59.000Z" // Optional
}`}
              </pre>

              <h4 className="font-bold text-foreground text-sm mb-2">Success Response (200 OK)</h4>
              <pre className="bg-zinc-950 text-green-400 p-4 rounded-xl font-mono text-[13px] overflow-x-auto">
                {`{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "finalId": "portfolio",
  "originalUrl": "https://github.com/adityasrc/snip",
  "qrDataUrl": "data:image/png;base64,iVBORw0KGgoAAAAN..."
}`}
              </pre>
            </div>
          </div>

          <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="bg-muted/50 border-b border-border px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[13px] px-3 py-1 rounded-md w-fit">GET</span>
              <code className="text-foreground font-bold">/links/analytics/:id</code>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">Retrieves detailed analytics for a specific link, including device, browser, and geo-location data generated via geoip-lite.</p>

              <h4 className="font-bold text-foreground text-sm mb-2">Success Response (200 OK)</h4>
              <pre className="bg-zinc-950 text-green-400 p-4 rounded-xl font-mono text-[13px] overflow-x-auto">
                {`{
  "link": {
    "title": "My Portfolio",
    "originalUrl": "https://github.com/adityasrc/snip",
    "shortId": "portfolio",
    "clicks": 42
  },
  "clicks": [
    {
      "device": "Desktop",
      "browser": "Chrome",
      "country": "IN",
      "city": "Jalandhar",
      "referrer": "Direct",
      "timestamp": "2026-03-09T10:00:00.000Z"
    }
  ]
}`}
              </pre>
            </div>
          </div>

          <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="bg-muted/50 border-b border-border px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[13px] px-3 py-1 rounded-md w-fit">GET</span>
              <code className="text-foreground font-bold">/:shortId</code>
              <span className="bg-muted text-muted-foreground font-semibold text-[11px] px-2 py-0.5 rounded ml-auto border border-border">Public</span>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">The core redirection engine. Does not require authentication. Performs a zero-latency HTTP 302 redirect and asynchronously logs visitor analytics (IP matching, User-Agent parsing).</p>

              <h4 className="font-bold text-foreground text-sm mb-2">Possible Responses</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mb-4 font-mono">
                <li><span className="font-bold text-green-600 dark:text-green-400">302 Found:</span> Redirects to originalUrl</li>
                <li><span className="font-bold text-red-500 dark:text-red-400">404 Not Found:</span> Link does not exist</li>
                <li><span className="font-bold text-orange-500 dark:text-orange-400">410 Gone:</span> Link has passed its expiresAt date</li>
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}