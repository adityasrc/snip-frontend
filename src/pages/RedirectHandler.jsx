import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectHandler = () => {
  const { shortId } = useParams();

  useEffect(() => {
    const ref = document.referrer ? new URL(document.referrer).hostname : "Direct";
    window.location.replace(
      `${import.meta.env.VITE_BACKEND_URL}/${shortId}?ref=${encodeURIComponent(ref)}`
    );
  }, [shortId]);

  return null;
};

export default RedirectHandler;