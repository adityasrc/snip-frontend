import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Link as LinkIcon } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-center items-center font-sans px-6 relative overflow-hidden">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 -z-10 bg-dot-grid"
        style={{
          maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
        }}
      />

      <div className="text-center max-w-md">
        <div className="w-12 h-12 rounded-2xl bg-[#0a0a0a] text-white flex items-center justify-center mx-auto mb-6 shadow-sm">
          <LinkIcon className="w-6 h-6" strokeWidth={2.5} />
        </div>

        <span className="text-[13px] font-mono font-medium text-[#737373] bg-white border border-[#e5e5e5] rounded-full px-3 py-1 inline-block mb-4">
          404 Not Found
        </span>

        <h1 className="text-3xl font-semibold text-[#0a0a0a] tracking-tight mb-2">
          Page not found
        </h1>
        <p className="text-[15px] text-[#737373] mb-8 leading-relaxed">
          The link you're looking for doesn't exist, has expired, or may have been deleted.
        </p>

        <Button
          onClick={() => navigate("/")}
          className="bg-[#0a0a0a] hover:bg-[#262626] text-white rounded-full px-6 h-10 font-medium text-[14px] shadow-sm transition-all inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Button>
      </div>
    </div>
  );
}