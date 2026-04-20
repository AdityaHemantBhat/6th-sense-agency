/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#080810",
        surface: "#0f0f1a",
        card: "#141420",
        border: "#1e1e30",
        "border-hi": "#2e2e48",
        lime: "#c8f53f",
        vermillion: "#ff4d2e",
        violet: "#7b61ff",
        teal: "#00d4b4",
        paper: "#eee9e0",
        smoke: "#777790",
        "copy-bg": "#1a1a2e",
      },
      fontFamily: {
        display: ["Anton", "sans-serif"],
        body: ["DM Serif Display", "serif"],
        mono: ["Space Mono", "monospace"],
      },
      fontSize: {
        hero: "clamp(48px, 7vw, 96px)",
        h1: "clamp(36px, 5vw, 72px)",
        h2: "clamp(28px, 4vw, 52px)",
        h3: "clamp(20px, 2.5vw, 36px)",
        body: "17px",
        label: "11px",
        mono: "12px",
      },
      spacing: {
        gutter: "2rem",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        slideInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
