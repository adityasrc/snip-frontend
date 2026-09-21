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
      } catch {
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
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#fafafa] text-[#0a0a0a]">
      <Loader2 className="h-7 w-7 animate-spin text-[#0a0a0a] mb-3" />
      <p className="text-[13px] font-medium text-[#737373] animate-pulse font-mono">
        Redirecting...
      </p>
    </div>
  );
}