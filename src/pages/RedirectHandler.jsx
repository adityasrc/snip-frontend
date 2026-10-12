import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function RedirectHandler() {
  const { shortId } = useParams();

  useEffect(() => {
    let ref = "Direct";

    if (typeof document !== "undefined" && document.referrer) {
      try {
        ref = new URL(document.referrer).hostname || "Direct";
      } catch {
        ref = "Unknown";
      }
    }

    const backendUrl =
      import.meta.env.VITE_BACKEND_URL ||
      import.meta.env.VITE_API_URL ||
      "http://localhost:10000";

    window.location.replace(
      `${backendUrl}/${shortId}?ref=${encodeURIComponent(ref)}`
    );
  }, [shortId]);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground text-sm font-medium tracking-tight">
        Redirecting...
      </p>
    </div>
  );
}
