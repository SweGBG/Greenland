import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: {
          DEFAULT: "#28391F",
          50: "#EEF1E8",
          100: "#D7DEC8",
          200: "#AEBE93",
          300: "#84995F",
          400: "#5C7642",
          500: "#3D5A2B",
          600: "#28391F", // primary deep forest
          700: "#1E2C18",
          800: "#161F12",
          900: "#0E140B",
        },
        wheat: {
          DEFAULT: "#D9A441",
          50: "#FBF4E3",
          100: "#F5E3B9",
          200: "#EDCC85",
          300: "#E3B65A",
          400: "#D9A441",
          500: "#BE8A2E",
          600: "#996E23",
        },
        barn: {
          DEFAULT: "#8C3B2E",
          50: "#F4E5DF",
          400: "#A8493A",
          500: "#8C3B2E",
          600: "#702E24",
          700: "#54221A",
        },
        cream: {
          DEFAULT: "#F6F1E2",
          50: "#FBF9F2",
          100: "#F6F1E2",
          200: "#EDE5CC",
          300: "#E2D5AE",
        },
        soil: {
          DEFAULT: "#2A2118",
          50: "#EFEAE2",
          400: "#5B4B3A",
          600: "#3D3022",
          700: "#2A2118",
          800: "#1C160F",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-worksans)", "sans-serif"],
        mono: ["var(--font-jbmono)", "monospace"],
      },
      backgroundImage: {
        "grain": "url('/images/grain.png')",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        swing: {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        leafFall: {
          "0%": { transform: "translateY(-10%) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(120%) rotate(140deg)", opacity: "0" },
        },
      },
      animation: {
        ticker: "ticker 28s linear infinite",
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        swing: "swing 6s ease-in-out infinite",
      },
      boxShadow: {
        crate: "0 2px 0 rgba(0,0,0,0.08), 0 18px 30px -14px rgba(20,15,5,0.35)",
        tag: "2px 3px 0 rgba(0,0,0,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
