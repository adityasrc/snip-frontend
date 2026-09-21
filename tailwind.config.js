import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],       // body/UI — was Space Grotesk
        display: ['"Inter"', 'sans-serif'],    // display headings — substitute for Satoshi
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sapphire: {
          DEFAULT: "hsl(var(--sapphire))",
          foreground: "hsl(var(--sapphire-foreground))",
        },
        tintMint: {
          DEFAULT: "hsl(var(--tint-mint))",
          foreground: "hsl(var(--tint-mint-foreground))",
        },
        accentGreen: "hsl(var(--accent-green))",
        accentOrange: "hsl(var(--accent-orange))",
        accentViolet: "hsl(var(--accent-violet))",
      },
      fontSize: {
        caption: ["11px", { lineHeight: "1.5" }],
        body: ["14px", { lineHeight: "1.43" }],
        "body-lg": ["16px", { lineHeight: "1.5" }],
        "body-xl": ["18px", { lineHeight: "1.56" }],
        subheading: ["20px", { lineHeight: "1.4" }],
        "heading-sm": ["24px", { lineHeight: "1.33" }],
        heading: ["30px", { lineHeight: "1.38" }],
        "heading-lg": ["36px", { lineHeight: "1.11" }],
        display: ["48px", { lineHeight: "1" }],
      },
      borderRadius: {
        lg: "var(--radius)",   // keep for any existing usage — leave alias in place
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        input: "6px",
        button: "8px",
        card: "12px",
        "card-lg": "16px",
        pill: "9999px",
      },
      boxShadow: {
        subtle: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
        card: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px",
        "card-elevated": "rgba(0, 0, 0, 0.1) 0px 0px 0px 4px",
        showcase: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}