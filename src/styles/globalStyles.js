// src/styles/globalStyles.js
import { Platform } from "react-native";

// Simple global styles that don't rely on context
export const colors = {
  primary: "#22c069",
  secondary: "#edf4ee",
  background: "#f5f9f7",
  card: "#ffffff",
  text: "#151915",
  textMuted: "#6a706b",
  border: "#dfe5df",
  error: "#e92c2c",
  success: "#14a85e",
  warning: "#ffc107",
  chart1: "#1eb866",
  chart2: "#14a85e",
  chart3: "#14a9b8",
  chart4: "#149bd8",
  chart5: "#1a66ff",
};

export const darkColors = {
  primary: "#2ac46e",
  secondary: "#1e231e",
  background: "#000000", // True black background
  card: "#121212", // Very dark card
  text: "#ffffff", // White text
  textMuted: "#9ca29d", // Light gray for muted text
  border: "#333333", // Darker border
  error: "#9b1f1f",
  success: "#16b465",
  warning: "#f0ad4e",
  chart1: "#2ac46e", // Green (for proteins)
  chart2: "#2ac46e", // Green (for carbs)
  chart3: "#1fb7c1",
  chart4: "#1da1d7",
  chart5: "#4d8df6", // Blue (for fats)
  foreground: "#ffffff", // Make sure foreground is white in dark mode
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,

  // For backward compatibility
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.65,
  },
};

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  full: 9999,
};

// Helper to get current theme colors based on dark mode
export const getThemeColors = (isDark) => {
  return isDark ? darkColors : colors;
};
