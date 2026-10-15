import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { API_URL } from "../lib/api";

function getReferrerHost() {
  try {
    return new URL(document.referrer).hostname || "Direct";
  } catch {
    return "Direct";
  }
}

export default function RedirectHandler() {
  const { shortId } = useParams();

  useEffect(() => {
    document.title = "Redirecting… | Snip";
    window.location.replace(`${API_URL}/${shortId}?ref=${encodeURIComponent(getReferrerHost())}`);
  }, [shortId]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Redirecting…</p>
    </div>
  );
}
