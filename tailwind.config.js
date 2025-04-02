module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Main colors
        primary: {
          DEFAULT: "#22c069",
          dark: "#2ac46e",
        },
        secondary: {
          DEFAULT: "#edf4ee",
          dark: "#1e231e",
        },
        background: {
          DEFAULT: "#f5f9f7",
          dark: "#000000",
        },
        card: {
          DEFAULT: "#ffffff",
          dark: "#121212",
        },
        text: {
          DEFAULT: "#151915",
          dark: "#ffffff",
          muted: {
            DEFAULT: "#6a706b",
            dark: "#9ca29d",
          },
        },
        border: {
          DEFAULT: "#dfe5df",
          dark: "#333333",
        },
        // Semantic colors
        error: {
          DEFAULT: "#e92c2c",
          dark: "#9b1f1f",
        },
        success: {
          DEFAULT: "#14a85e",
          dark: "#16b465",
        },
        warning: {
          DEFAULT: "#ffc107",
          dark: "#f0ad4e",
        },
        // Chart colors
        chart: {
          1: { DEFAULT: "#1eb866", dark: "#2ac46e" },
          2: { DEFAULT: "#14a85e", dark: "#1fc177" },
          3: { DEFAULT: "#14a9b8", dark: "#1fb7c1" },
          4: { DEFAULT: "#149bd8", dark: "#1da1d7" },
          5: { DEFAULT: "#1a66ff", dark: "#4d8df6" },
        },
      },
    },
  },
  plugins: [],
};
