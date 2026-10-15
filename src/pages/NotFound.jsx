import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Link2Off } from "lucide-react";
import { Button } from "../components/ui/button";
import { isLoggedIn } from "../lib/utils";

export default function NotFound() {
  useEffect(() => {
    document.title = "Snip | Page not found";
  }, []);

  const loggedIn = isLoggedIn();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md animate-fade-up">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Link2Off className="h-6 w-6" />
        </div>
        <p className="mb-4 inline-block rounded-full border bg-card px-3 py-1 font-mono text-xs font-medium text-muted-foreground">
          404
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 mb-8 text-sm text-muted-foreground">
          The link you're looking for doesn't exist, has expired, or may have been deleted.
        </p>
        <Button asChild>
          <Link to={loggedIn ? "/dashboard" : "/"}>
            <ArrowLeft /> {loggedIn ? "Back to dashboard" : "Back to home"}
          </Link>
        </Button>
      </div>
    </div>
  );
}