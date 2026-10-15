import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Link2Off } from "lucide-react";
import { Button } from "../components/ui/button";
import { isLoggedIn } from "../lib/utils";

export default function NotFound() {
  const expired = useSearchParams()[0].get("reason") === "expired";

  useEffect(() => {
    document.title = expired ? "Snip | Link expired" : "Snip | Page not found";
  }, [expired]);

  const loggedIn = isLoggedIn();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md animate-fade-up">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Link2Off className="h-6 w-6" />
        </div>
        <p className="mb-4 inline-block rounded-full border bg-card px-3 py-1 font-mono text-xs font-medium text-muted-foreground">
          {expired ? "Expired" : "404"}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          {expired ? "This link has expired" : "Page not found"}
        </h1>
        <p className="mt-2 mb-8 text-sm text-muted-foreground">
          {expired
            ? "The owner set an expiry date for this link and it has passed."
            : "The link you're looking for doesn't exist or may have been deleted."}
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