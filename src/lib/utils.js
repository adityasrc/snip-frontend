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
