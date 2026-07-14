import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectHandler = () => {
  const { shortId } = useParams();

  useEffect(() => {
    let ref = "Direct";
    if (document.referrer) {
      try {
        ref = new URL(document.referrer).hostname;
      } catch {
        ref = document.referrer;
      }
    }

    window.location.replace(
      `${import.meta.env.VITE_BACKEND_URL}/${shortId}?ref=${encodeURIComponent(ref)}`
    );
  }, [shortId]);

  return null;
};

export default RedirectHandler;