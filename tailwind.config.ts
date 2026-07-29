import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Primary - Modern Blue
        primary: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d8ff",
          300: "#a4bfff",
          400: "#7d9aff",
          500: "#5b6dff",
          600: "#4847ff",
          700: "#3d32d4",
          800: "#362db5",
          900: "#2e2494",
        },
        // Secondary - Modern Purple
        secondary: {
          50: "#f8f4ff",
          100: "#f0e9ff",
          200: "#e1d5ff",
          300: "#cbb5ff",
          400: "#b08aff",
          500: "#9560ff",
          600: "#8b4bff",
          700: "#7d37e8",
          800: "#6b2dc9",
          900: "#5a24aa",
        },
        // Accent - Vibrant Teal
        accent: {
          50: "#f0fdfb",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        // Risk colors
        risk: {
          low: "#10b981",
          medium: "#f59e0b",
          high: "#ef4444",
        },
        // Status colors
        status: {
          planning: "#8b5cf6",
          progress: "#5b6dff",
          review: "#f59e0b",
          complete: "#10b981",
        },
        // Neutrals
        neutral: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716b",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
