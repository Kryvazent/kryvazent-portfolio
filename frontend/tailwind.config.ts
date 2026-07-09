import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#D62133", // Red from the logo
          foreground: "#FFFFFF",
        },
        accent: {
          red: "#FF1F1F",
          glow: "rgba(214, 33, 51, 0.5)",
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(214, 33, 51, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(214, 33, 51, 0.6)' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
