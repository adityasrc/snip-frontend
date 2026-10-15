import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const REFERRER_NAMES = {
  "t.co": "X",
  "l.instagram.com": "Instagram",
  "lnkd.in": "LinkedIn",
  "com.google.android.googlequicksearchbox": "Google app",
};

export function formatReferrer(ref) {
  if (!ref || ref === "Direct" || ref === "Unknown") return "Direct";
  if (REFERRER_NAMES[ref]) return REFERRER_NAMES[ref];
  try {
    const url = ref.includes("://") ? ref : `https://${ref}`;
    const host = new URL(url).hostname.replace(/^www\./, "");
    return REFERRER_NAMES[host] || host;
  } catch {
    return REFERRER_NAMES[ref] || ref;
  }
}

export const formatBrowser = (name) => (!name || name === "Unknown" ? "Other" : name);

export function formatCountry(code) {
  if (!code || code === "Unknown" || code === "—") return "Unknown";
  if (code.length === 2) {
    // native browser API for zero-bundle-size country code resolution
    try {
      const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
      return regionNames.of(code.toUpperCase()) || code;
    } catch {
      return code;
    }
  }
  return code;
}

export function getUserFromToken() {
  try {
    let name = localStorage.getItem("user_name") || "";
    let email = localStorage.getItem("user_email") || "";

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        const payload = JSON.parse(new TextDecoder().decode(bytes));
        if (payload.name) name = payload.name;
        if (payload.email) email = payload.email;
      } catch {
        // token decode fallback
      }
    }

    return { name: name || "User", email: email || "" };
  } catch {
    return { name: "User", email: "" };
  }
}

export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

export function getErrorMessage(err, fallback) {
  return err.response?.data?.message || err.response?.data?.error || fallback;
}
