module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Your existing color palette
        primary: "#22c069",
        secondary: "#edf4ee",
        background: "#f5f9f7",
        card: "#ffffff",
        text: "#151915",
        "text-muted": "#6a706b",
        border: "#dfe5df",
        error: "#e92c2c",
        success: "#14a85e",
        warning: "#ffc107",
      },
    },
  },
  plugins: [],
};
