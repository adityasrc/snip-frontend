import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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
    const token = localStorage.getItem("token");
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder().decode(bytes));
    return { name: payload.name || "User", email: payload.email || "" };
  } catch {
    return { name: "User", email: "" };
  }
}
