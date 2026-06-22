/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        "paper-dark": "var(--color-paper-dark)",
        surface: "var(--color-surface)",
        pine: "var(--color-pine)",
        "pine-soft": "var(--color-pine-soft)",
        sage: "var(--color-sage)",
        court: "var(--color-court)",
        "court-soft": "var(--color-court-soft)",
        clay: "var(--color-clay)",
        "clay-soft": "var(--color-clay-soft)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        soft: "var(--shadow-sm)",
        elevated: "var(--shadow-md)",
        deep: "var(--shadow-lg)",
        float: "var(--shadow-float)",
      },
    },
  },
  plugins: [],
};
