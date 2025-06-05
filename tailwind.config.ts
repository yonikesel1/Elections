import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#E6F0FA",
          600: "#0A66C2",
        },
        accent: "#FFDD00",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  darkMode: ["class"],
} satisfies Config; 