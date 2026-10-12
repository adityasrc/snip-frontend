import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Link as LinkIcon } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-6 relative overflow-hidden">
      <div className="text-center max-w-md">
        <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 shadow-sm">
          <LinkIcon className="w-6 h-6" strokeWidth={2.5} />
        </div>

        <span className="text-xs font-mono font-medium text-muted-foreground bg-card border border-border rounded-full px-3 py-1 inline-block mb-4">
          404 Not Found
        </span>

        <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-2">
          Page not found
        </h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          The link you're looking for doesn't exist, has expired, or may have been deleted.
        </p>

        <Button
          onClick={() => navigate("/")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 h-10 font-medium text-sm shadow-sm transition-all inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Button>
      </div>
    </div>
  );
}