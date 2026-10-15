import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Logo } from "../Logo";

const HIGHLIGHTS = ["Custom aliases", "Expiry dates", "Click analytics"];

export function AuthLayout({ title, subtitle, panelTitle, panelText, footer, children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden shrink-0 flex-col justify-between bg-foreground px-12 py-10 text-background lg:flex lg:w-[420px] xl:w-[480px]">
        <Link to="/" className="group w-fit"><Logo inverted /></Link>
        <div>
          <h2 className="text-2xl font-semibold leading-snug tracking-tight">{panelTitle}</h2>
          <p className="mt-4 text-sm text-background/60">{panelText}</p>
          <ul className="mt-8 space-y-3 text-sm text-background/80">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-background/60" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-background/50">© {new Date().getFullYear()} Snip</p>
      </aside>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-fade-up">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
          <Link to="/" className="group mt-8 block w-fit lg:hidden"><Logo /></Link>
          <h1 className="mt-8 text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
        </div>
      </main>
    </div>
  );
}
