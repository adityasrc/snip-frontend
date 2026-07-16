import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  BarChart3,
  Link as LinkIcon,
  Shield,
  Zap,
  CheckCircle,
  MousePointerClick,
  Share2,
  LineChart,
} from "lucide-react";

export function LandingHero() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [previewSlug, setPreviewSlug] = useState("");
  const currentHost = window.location.host;
  const isLoggedIn = !!localStorage.getItem("token");

  function generatePreview() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let slug = "";
    for (let i = 0; i < 6; i++) {
      slug += chars[Math.floor(Math.random() * chars.length)];
    }
    setPreviewSlug(slug);
  }

  function handleChange(e) {
    setUrl(e.target.value);
    if (e.target.value.trim()) {
      generatePreview();
    } else {
      setPreviewSlug("");
    }
  }

  return (
    <div className="w-full bg-[radial-gradient(hsl(var(--border))_1.5px,transparent_1px)] [background-size:16px_16px] relative pb-12">

      <div className="absolute top-[-10%] left-1/2 w-[800px] h-[600px] -translate-x-1/2 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <section className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center pt-16 mb-24 relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[1.1] text-foreground">
          Fast links.
          <br />
          Real analytics.
          <br />
          <span className="text-orange-600 dark:text-orange-500 drop-shadow-sm">
            Built for developers.
          </span>
        </h1>

        <p className="text-[16px] md:text-[18px] text-muted-foreground max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
          A lightweight, high-performance URL shortener. Create concise links
          and track accurate geolocation, devices, and browser analytics in
          real-time.
        </p>


        <div className="w-full max-w-3xl bg-card border border-border focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/20 rounded-xl flex items-center p-1.5 shadow-lg shadow-black/5 transition-all mb-4">
          <div className="pl-4 pr-2 text-muted-foreground">
            <LinkIcon className="w-6 h-6" />
          </div>
          <Input
            placeholder="Paste your long URL..."
            value={url}
            onChange={handleChange}
            className="border-none shadow-none focus-visible:ring-0 text-[17px] h-14 flex-1 px-2 bg-transparent text-foreground placeholder:text-muted-foreground font-medium"
          />
          <Button
            onClick={() => {
              if (url.trim()) {
                navigate(isLoggedIn ? "/dashboard" : "/signup", { state: { prefillUrl: url.trim() } });
              } else {
                navigate(isLoggedIn ? "/dashboard" : "/signup");
              }
            }}
            className="bg-orange-600 hover:bg-orange-500 text-white h-14 px-10 rounded-xl font-bold text-[16px] shadow-sm transition-all active:scale-95"
          >
            Snip It
          </Button>
        </div>

        <div className="flex flex-col items-center gap-4 mt-2 h-6">
          <div className={`transition-opacity duration-300 ${url ? "opacity-100" : "opacity-0"}`}>
            <p className="text-[14px] text-muted-foreground font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-orange-500" /> Preview:{" "}
              <span className="text-foreground font-bold tracking-wide">
                {currentHost}/
                <span className="text-orange-500">{previewSlug}</span>
              </span>
            </p>
          </div>
        </div>
      </section>


      <section className="max-w-5xl mx-auto px-6 mb-20 relative z-10" id="how-it-works">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">
            How Snip works
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto">
            From pasting a long URL to tracking global click data, the process
            is seamless and lightning-fast.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center relative">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-border -z-10"></div>
          <StepCard
            step="1"
            icon={<MousePointerClick className="w-6 h-6 text-orange-600 dark:text-orange-500" />}
            title="Paste your link"
            desc="Enter your long URL. You can optionally add a custom alias or set an expiration date for strict access control."
          />
          <StepCard
            step="2"
            icon={<Share2 className="w-6 h-6 text-orange-600 dark:text-orange-500" />}
            title="Share the short link"
            desc="Snip instantly generates a concise, high-speed redirect link and an automatic QR code ready for sharing."
          />
          <StepCard
            step="3"
            icon={<LineChart className="w-6 h-6 text-orange-600 dark:text-orange-500" />}
            title="Track analytics"
            desc="Monitor traffic in real-time. Our engine captures geolocation, device types, and referrers without slowing down redirects."
          />
        </div>
      </section>


      <section className="max-w-5xl mx-auto px-6 mb-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <FeatureCard
            icon={<BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-500" />}
            title="Granular Analytics"
            desc="Every click is enriched with geolocation, browser, and device data using geoip-lite and ua-parser-js."
          />
          <FeatureCard
            icon={<Zap className="w-5 h-5 text-orange-600 dark:text-orange-500" />}
            title="Zero-Latency Redirects"
            desc="Redirections happen instantly. We trigger the HTTP 302 redirect before the database is even touched."
          />
          <FeatureCard
            icon={<Shield className="w-5 h-5 text-orange-600 dark:text-orange-500" />}
            title="Full Control"
            desc="Custom aliases, automatic QR codes, and strict link expiration dates give you total management capability."
          />
        </div>
      </section>


      <section className="max-w-5xl mx-auto px-6 mb-20 relative z-10" id="engine">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">
                Built for speed & clarity.
              </h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Snip utilizes the Bun runtime and Express to handle fast,
                non-blocking HTTP requests. Redirections happen instantly, while
                analytics parsing is executed transparently in the background.
              </p>
            </div>

            <div className="space-y-6 border-l-2 border-border pl-5">
              <div className="relative">
                <div className="absolute -left-[29px] top-1 bg-background border-2 border-muted-foreground w-3.5 h-3.5 rounded-full"></div>
                <h3 className="font-bold text-[15px] text-foreground mb-1">
                  1. Async Request Parsing
                </h3>
                <p className="text-[14px] text-muted-foreground">
                  Headers are parsed immediately to extract device types and IPs
                  natively.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[29px] top-1 bg-background border-2 border-orange-400 w-3.5 h-3.5 rounded-full"></div>
                <h3 className="font-bold text-[15px] text-foreground mb-1">
                  2. Geo-Location Mapping
                </h3>
                <p className="text-[14px] text-muted-foreground">
                  Local geoip-lite databases translate IP addresses into
                  accurate locations fast.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[29px] top-1 bg-background border-2 border-orange-600 w-3.5 h-3.5 rounded-full"></div>
                <h3 className="font-bold text-[15px] text-foreground mb-1">
                  3. Decoupled DB Write
                </h3>
                <p className="text-[14px] text-muted-foreground">
                  User is redirected (HTTP 302) instantly while analytics save
                  asynchronously.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0c0c0e] rounded-2xl shadow-2xl border border-white/10 w-full overflow-hidden hover:shadow-orange-500/10 transition-shadow duration-300">
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="text-[11px] font-mono font-medium text-slate-400">
                response.json
              </span>
            </div>
            <div className="p-6 overflow-x-auto text-[13px] font-mono leading-relaxed">
              <pre>
                <span className="text-slate-500">{"// GET /api/links/analytics/:id\n"}</span>
                <span className="text-slate-300">{"{\n"}</span>
                <span className="text-blue-400">  "link"</span>
                <span className="text-slate-300">{": {\n"}</span>
                <span className="text-blue-400">    "shortId"</span>
                <span className="text-slate-300">{": "}</span>
                <span className="text-emerald-400">"lnk8x"</span>
                <span className="text-slate-300">{",\n"}</span>
                <span className="text-blue-400">    "originalUrl"</span>
                <span className="text-slate-300">{": "}</span>
                <span className="text-emerald-400">"https://github.com/adityasrc"</span>
                <span className="text-slate-300">{",\n"}</span>
                <span className="text-blue-400">    "clicks"</span>
                <span className="text-slate-300">{": "}</span>
                <span className="text-orange-400">42</span>
                <span className="text-slate-300">{",\n    ...\n  },\n"}</span>
                <span className="text-blue-400">  "clicks"</span>
                <span className="text-slate-300">{": [\n    { "}</span>
                <span className="text-blue-400">"device"</span>
                <span className="text-slate-300">{": "}</span>
                <span className="text-emerald-400">"Desktop"</span>
                <span className="text-slate-300">{",\n      "}</span>
                <span className="text-blue-400">"browser"</span>
                <span className="text-slate-300">{": "}</span>
                <span className="text-emerald-400">"Chrome"</span>
                <span className="text-slate-300">{",\n      "}</span>
                <span className="text-blue-400">"country"</span>
                <span className="text-slate-300">{": "}</span>
                <span className="text-emerald-400">"IN"</span>
                <span className="text-slate-300">{",\n      "}</span>
                <span className="text-blue-400">"city"</span>
                <span className="text-slate-300">{": "}</span>
                <span className="text-emerald-400">"Jalandhar"</span>
                <span className="text-slate-300">{" }\n  ]\n}"}</span>
              </pre>
            </div>
          </div>
        </div>
      </section>


      <section className="max-w-3xl mx-auto px-6 text-center">
        <div className="bg-muted rounded-3xl p-12 border border-border shadow-sm relative overflow-hidden">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4 relative z-10">
            Ready to start tracking?
          </h2>
          <p className="text-[16px] text-muted-foreground mb-8 relative z-10">
            Create your first short link and see the dashboard in action.
          </p>
          <Button
            className="bg-orange-600 text-white hover:bg-orange-500 h-12 px-10 rounded-xl font-bold transition-all shadow-sm active:scale-95 text-[15px] relative z-10"
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/signup")}
          >
            Start Snipping
          </Button>
        </div>
      </section>
    </div>
  );
}

function StepCard({ step, icon, title, desc }) {
  return (
    <div className="flex flex-col items-center bg-card p-6 rounded-2xl border border-border relative z-10 shadow-sm">
      <div className="mb-4 bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center border-4 border-background shadow-sm">
        {icon}
      </div>
      <div className="text-[11px] font-bold tracking-widest uppercase text-orange-600 dark:text-orange-500 mb-2 bg-orange-500/10 px-2 py-1 rounded-md">
        Step {step}
      </div>
      <h3 className="font-bold text-lg mb-2 text-foreground tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground text-[14.5px] leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-7 rounded-2xl border border-border bg-card hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 group">
      <div className="mb-5 bg-muted w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-orange-500/10 transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2 text-foreground tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground text-[14.5px] leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
}