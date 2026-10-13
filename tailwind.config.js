export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ivory: "var(--ivory)", blush: "var(--blush)", crimson: "var(--crimson)", aqua: "var(--aqua)", mist: "var(--mist)", ink: "var(--ink)" },
      fontFamily: { serif: ['"Cormorant Garamond"', "Georgia", "serif"], script: ['"La Belle Aurore"', "cursive"] }
    }
  },
  plugins: []
};
