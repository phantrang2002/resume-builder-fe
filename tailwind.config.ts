import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2E4C74",
        pageTitle: "#1a1a1a",
        lightBg: "#F7F7F5",
        authNavy: "#253D5D",
        authTeal: "#3BB5B0",
        authMuted: "#64748B",
        link: "#2563EB",
        error: "#A13D2E",
        errorDark: "#7F2F23",
        errorBg: "#FBEFED",
        errorBorder: "#F5D9D4",
        featureCheck: "#38BDF8",
        featureText: "#94A3B8",
        muted: "#6B7280",
        subtle: "#857F74",
        secondary: "#524D44",
        inputFocus: "#456590",
        inputMuted: "#A8A49B",
      },
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
        serif: ['"Source Serif 4"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
