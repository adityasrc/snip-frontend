import { LandingHeader } from "../components/landing/LandingHeader";
import { LandingHero } from "../components/landing/LandingHero";
import { LandingFeatures } from "../components/landing/LandingFeatures";
import { LandingCta } from "../components/landing/LandingCta";
import { LandingFooter } from "../components/landing/LandingFooter";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <LandingHeader />

      <main className="flex-1 pt-14 md:pt-16">
        <LandingHero />
        <LandingFeatures />
        <LandingCta />
      </main>

      <LandingFooter />
    </div>
  );
}
