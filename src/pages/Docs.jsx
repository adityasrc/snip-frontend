import { LandingHeader } from "./LandingHeader";
import { HTTP_BACKEND } from "../../config";

export default function Docs() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans pb-24">
      <LandingHeader />

      <main className="max-w-4xl mx-auto px-6 pt-28">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 border border-[#e5e5e5] rounded-full px-3.5 py-1 mb-4 bg-white text-[12px] font-medium text-[#525252]">
            Developer Documentation
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#0a0a0a] tracking-tight mb-3">
            API Reference
          </h1>
          <p className="text-[15px] text-[#737373] leading-relaxed max-w-2xl">
            Integrate Snip's URL shortening and click analytics directly into your workflows. All API endpoints accept and return JSON payloads.
          </p>
        </div>

        {/* Base URL */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e5e5] shadow-[rgba(0,0,0,0.04)_0px_1px_2px_0px] mb-6">
          <h2 className="text-[15px] font-medium text-[#0a0a0a] mb-2">Base URL</h2>
          <div className="bg-[#0c0c0e] text-[#e5e5e5] font-mono text-[13px] px-4 py-3 rounded-xl flex items-center border border-white/10">
            {HTTP_BACKEND}/api
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e5e5] shadow-[rgba(0,0,0,0.04)_0px_1px_2px_0px] mb-10">
          <h2 className="text-[15px] font-medium text-[#0a0a0a] mb-2">Authentication</h2>
          <p className="text-[14px] text-[#737373] mb-3 leading-relaxed">
            Endpoints that manage links and retrieve analytics require a JWT Bearer token in the request headers.
          </p>
          <div className="bg-[#f5f5f5] border border-[#e5e5e5] font-mono text-[13px] px-4 py-3 rounded-xl text-[#171717]">
            Authorization: Bearer &lt;YOUR_JWT_TOKEN&gt;
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-medium text-[#0a0a0a] mb-4">Core Endpoints</h2>

          {/* Shorten */}
          <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[rgba(0,0,0,0.04)_0px_1px_2px_0px] overflow-hidden">
            <div className="bg-[#fafafa] border-b border-[#e5e5e5] px-6 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="bg-[#0a0a0a] text-white font-mono text-[12px] font-medium px-2.5 py-0.5 rounded-full w-fit">POST</span>
              <code className="text-[#0a0a0a] font-mono text-[14px] font-medium">/links/shorten</code>
              <span className="bg-[#f5f5f5] text-[#737373] font-medium text-[11px] px-2 py-0.5 rounded-full sm:ml-auto border border-[#e5e5e5]">Auth Required</span>
            </div>
            <div className="p-6">
              <p className="text-[14px] text-[#737373] mb-4 leading-relaxed">Generates a new shortened link with an optional custom alias and expiration date.</p>

              <h4 className="font-medium text-[#0a0a0a] text-[13px] mb-2">Request Body</h4>
              <pre className="bg-[#0c0c0e] text-[#d4d4d4] p-4 rounded-xl font-mono text-[13px] overflow-x-auto mb-4 border border-white/10">
{`{
  "title": "My Portfolio",              // Optional
  "originalUrl": "https://example.com", // Required
  "customAlias": "portfolio",           // Optional
  "expiresAt": "2026-12-31T23:59:59Z"   // Optional
}`}
              </pre>

              <h4 className="font-medium text-[#0a0a0a] text-[13px] mb-2">Success Response (200 OK)</h4>
              <pre className="bg-[#0c0c0e] text-[#4ade80] p-4 rounded-xl font-mono text-[13px] overflow-x-auto border border-white/10">
{`{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "finalId": "portfolio",
  "originalUrl": "https://example.com",
  "qrDataUrl": "data:image/png;base64,iVBORw0KGgoAAA..."
}`}
              </pre>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[rgba(0,0,0,0.04)_0px_1px_2px_0px] overflow-hidden">
            <div className="bg-[#fafafa] border-b border-[#e5e5e5] px-6 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="bg-[#2563eb] text-white font-mono text-[12px] font-medium px-2.5 py-0.5 rounded-full w-fit">GET</span>
              <code className="text-[#0a0a0a] font-mono text-[14px] font-medium">/links/analytics/:id</code>
              <span className="bg-[#f5f5f5] text-[#737373] font-medium text-[11px] px-2 py-0.5 rounded-full sm:ml-auto border border-[#e5e5e5]">Auth Required</span>
            </div>
            <div className="p-6">
              <p className="text-[14px] text-[#737373] mb-4 leading-relaxed">Retrieves click analytics for a specific link, including countries, cities, browsers, and devices.</p>

              <h4 className="font-medium text-[#0a0a0a] text-[13px] mb-2">Success Response (200 OK)</h4>
              <pre className="bg-[#0c0c0e] text-[#4ade80] p-4 rounded-xl font-mono text-[13px] overflow-x-auto border border-white/10">
{`{
  "link": {
    "title": "My Portfolio",
    "originalUrl": "https://example.com",
    "shortId": "portfolio",
    "clicks": 42
  },
  "clicks": [
    {
      "device": "Desktop",
      "browser": "Chrome",
      "country": "IN",
      "city": "Mumbai",
      "referrer": "Direct",
      "timestamp": "2026-03-09T10:00:00.000Z"
    }
  ]
}`}
              </pre>
            </div>
          </div>

          {/* Redirect Engine */}
          <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[rgba(0,0,0,0.04)_0px_1px_2px_0px] overflow-hidden">
            <div className="bg-[#fafafa] border-b border-[#e5e5e5] px-6 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="bg-[#2563eb] text-white font-mono text-[12px] font-medium px-2.5 py-0.5 rounded-full w-fit">GET</span>
              <code className="text-[#0a0a0a] font-mono text-[14px] font-medium">/:shortId</code>
              <span className="bg-[#f5f5f5] text-[#16a34a] font-medium text-[11px] px-2 py-0.5 rounded-full sm:ml-auto border border-[#e5e5e5]">Public</span>
            </div>
            <div className="p-6">
              <p className="text-[14px] text-[#737373] mb-4 leading-relaxed">
                The core redirection engine. Sends an HTTP 302 redirect to the destination URL while asynchronously logging visitor analytics (IP geolocation, device, and browser information).
              </p>

              <h4 className="font-medium text-[#0a0a0a] text-[13px] mb-2">Possible Status Codes</h4>
              <ul className="list-disc list-inside text-[13px] text-[#737373] space-y-1.5 font-mono">
                <li><span className="font-medium text-[#16a34a]">302 Found:</span> Redirects to destination URL</li>
                <li><span className="font-medium text-[#dc2626]">404 Not Found:</span> Link not found or deleted</li>
                <li><span className="font-medium text-[#ea580c]">410 Gone:</span> Link has expired</li>
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}