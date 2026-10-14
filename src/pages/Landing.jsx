import { LandingHeader } from "../components/landing/LandingHeader";
import { LandingHero } from "../components/landing/LandingHero";
import { LandingFooter } from "../components/landing/LandingFooter";

export default function Landing() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col relative overflow-x-clip">
      <LandingHeader />

      <main className="flex-1 pt-14 md:pt-16">
        <LandingHero />
      </main>

      <LandingFooter />
    </div>
  );
}
