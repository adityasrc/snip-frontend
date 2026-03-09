import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fdfaf8] flex flex-col justify-center items-center font-sans">
      <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Page Not Found</h2>
      <p className="text-zinc-500 mb-6">Bhai, lagta hai galat link par aa gaye ho.</p>
      <Button onClick={() => navigate("/dashboard")} className="bg-orange-600 hover:bg-orange-700 text-white">
        Back to Dashboard
      </Button>
    </div>
  );
}