import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
      },
      borderRadius: {
        xl: "1rem",
        "3xl": "1.5rem",
      },
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

export default config; 