import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { isLoggedIn } from "@/lib/utils";

export function LandingCta() {
  const loggedIn = isLoggedIn();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-12 sm:pb-16">
      <div className="rounded-2xl border bg-card px-6 py-12 text-center shadow-xs">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Create your first short link.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Free to use. Your dashboard is ready when you are.
        </p>
        <Button asChild size="lg" className="group mt-6">
          <Link to={loggedIn ? "/dashboard" : "/signup"}>
            {loggedIn ? "Go to dashboard" : "Create a link"}{" "}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
