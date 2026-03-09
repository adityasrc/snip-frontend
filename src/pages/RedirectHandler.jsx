import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RedirectHandler = () => {
  const { shortId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    const performRedirect = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${shortId}`);
        if (response.data.originalUrl) {
          window.location.href = response.data.originalUrl;
        }
      } catch (err) {
        setError(true);
        setTimeout(() => navigate("/"), 3000);
      }
    };
    performRedirect();
  }, [shortId, navigate]);

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-bold text-destructive">Invalid or Expired Link</h1>
        <p className="text-muted-foreground">Redirecting you to home...</p>
      </div>
    );
  }

  return (
    // <div className="flex h-screen flex-col items-center justify-center bg-background text-foreground">
    //   <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    //   <h1 className="mt-4 text-xl font-medium">Snip is redirecting you...</h1>
    //   <p className="text-sm text-muted-foreground text-center px-4">Preparing your destination, please wait a moment.</p>
    // </div>
    null
  );
};

export default RedirectHandler;