import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowRight, ArrowUpRight, BarChart3, Check, Copy, Globe2, Link2, MousePointer2, QrCode, ShieldCheck, Zap } from "lucide-react";

const steps = [
  { icon: Link2, number: "01", title: "Paste a URL", copy: "Drop in a long link from anywhere on the web." },
  { icon: Zap, number: "02", title: "Make it yours", copy: "Choose a memorable slug, then share your short link." },
  { icon: BarChart3, number: "03", title: "See what works", copy: "Understand clicks by place, device, browser, and referrer." },
];

export function LandingHero() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const isLoggedIn = !!localStorage.getItem("token");
  const goToCreate = () => navigate(isLoggedIn ? "/dashboard" : "/signup", url.trim() ? { state: { prefillUrl: url.trim() } } : undefined);

  return <div className="landing-content">
    <section className="hero-shell">
      <div className="hero-copy"><div className="eyebrow">A focused URL shortener</div><h1>Make every link<br /><span>easy to share.</span></h1><p>Snip gives your links a clean home, a memorable address, and the context to understand what happens next.</p><div className="hero-actions"><Button onClick={goToCreate} className="primary-action">Create a link <ArrowRight size={16} /></Button><a href="#how-it-works" className="text-action">How it works <ArrowRight size={15} /></a></div></div>
      <div className="shorten-panel"><div className="panel-topline"><span>Start with a destination</span><span className="panel-status"><span /> Account required</span></div><label htmlFor="hero-url">Long URL</label><div className="url-row"><Link2 size={18} /><Input id="hero-url" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && goToCreate()} placeholder="https://example.com/your-long-link" /><Button onClick={goToCreate} className="shorten-button">Continue</Button></div><div className="panel-footer"><span><ShieldCheck size={14} /> Your links stay in your account</span><span>Free to start</span></div></div>
      <div className="hero-note"><span className="note-mark"><Check size={13} /></span> Custom slugs, QR codes, and click analytics are ready after sign up.</div>
    </section>
    <section className="proof-strip"><span>Built for everyday sharing</span><div><span><Globe2 size={15} /> Geo context</span><span><MousePointer2 size={15} /> Click activity</span><span><QrCode size={15} /> QR ready</span></div></section>
    <section className="section-shell" id="how-it-works"><div className="section-heading"><span className="section-kicker">The simple part</span><h2>From long to useful in seconds.</h2><p>Snip keeps the workflow short so your attention stays on the work behind the link.</p></div><div className="steps-grid">{steps.map((step) => { const StepIcon = step.icon; return <article className="step-card" key={step.number}><div className="step-meta"><span>{step.number}</span><StepIcon size={18} /></div><h3>{step.title}</h3><p>{step.copy}</p></article>; })}</div></section>
    <section className="feature-shell"><div className="feature-intro"><span className="section-kicker">A clearer dashboard</span><h2>Know which links<br />earn attention.</h2><p>Every shortened link gets a quiet home where you can copy, edit, inspect, or retire it. No clutter, no guesswork.</p><a href={isLoggedIn ? "/dashboard" : "/signup"}>Explore the dashboard <ArrowUpRight size={15} /></a></div><div className="mini-dashboard"><div className="mini-head"><span className="mini-title"><span className="mini-logo"><Link2 size={13} /></span> Recent links</span><span className="mini-filter">Last 30 days</span></div>{[{ slug: "snip.sh/portfolio", label: "Personal portfolio", clicks: "1,284", change: "+18%" }, { slug: "snip.sh/spring-launch", label: "Spring launch", clicks: "846", change: "+9%" }, { slug: "snip.sh/readme", label: "Product notes", clicks: "392", change: "+4%" }].map((item) => <div className="mini-row" key={item.slug}><div><span className="mini-slug">{item.slug}</span><span className="mini-label">{item.label}</span></div><div className="mini-clicks"><strong>{item.clicks}</strong><span>{item.change}</span></div><button aria-label={`Copy ${item.slug}`}><Copy size={14} /></button></div>)}<div className="mini-summary"><span><strong>2,522</strong> total clicks</span><span className="summary-live"><span /> Updating live</span></div></div></section>
    <section className="cta-shell"><div><span className="section-kicker">Ready when you are</span><h2>Make your next link<br />a little more useful.</h2></div><Button onClick={goToCreate} className="primary-action">Get started <ArrowRight size={16} /></Button></section>
  </div>;
}
