import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function RedirectHandler() {
  const { shortId } = useParams();

  useEffect(() => {
    let ref = "Direct";

    // Safely parse the referrer to prevent URL constructor crashes
    if (document.referrer) {
      try {
        ref = new URL(document.referrer).hostname;
      } catch (error) {
        ref = "Unknown";
      }
    }

    // Execute the redirect
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    window.location.replace(
      `${backendUrl}/${shortId}?ref=${encodeURIComponent(ref)}`
    );
  }, [shortId]);

  // Prevent white flash by rendering a themed full-screen loader
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-background text-foreground">
      <Loader2 className="h-8 w-8 animate-spin text-orange-600 dark:text-orange-500 mb-4" />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Redirecting...
      </p>
    </div>
  );
}