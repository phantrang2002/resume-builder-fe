import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3478F5",
        pageTitle: "#1a1a1a",
        lightBg: "#f5f7fa",
      },
    },
  },
  plugins: [],
} satisfies Config;
