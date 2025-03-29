// src/styles/theme.ts - Let's improve this file

import { Platform } from "react-native";

// Define types for our theme
export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;

  // Semantic colors
  success: string;
  successForeground: string;
  info: string;
  infoForeground: string;
  warning: string;
  warningForeground: string;

  // Chart colors
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
}

export interface ThemeTypography {
  fontFamily: {
    sans: string;
    heading: string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    "2xl": number;
    "3xl": number;
    "4xl": number;
    "5xl": number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ThemeSpacing {
  0: number;
  px: number;
  0.5: number;
  1: number;
  1.5: number;
  2: number;
  2.5: number;
  3: number;
  3.5: number;
  4: number;
  5: number;
  6: number;
  8: number;
  10: number;
  12: number;
  16: number;
  20: number;
  24: number;
  32: number;
  40: number;
  64: number;
}

export interface ThemeRadius {
  none: number;
  sm: number;
  DEFAULT: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
  full: number;
}

export interface Theme {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
}

// Light theme
export const lightColors: ThemeColors = {
  background: "#f5f9f7", // Slightly lighter background
  foreground: "#151915",
  card: "#ffffff",
  cardForeground: "#151915",
  popover: "#ffffff",
  popoverForeground: "#151915",
  primary: "#22c069", // Slightly brighter green
  primaryForeground: "#ffffff",
  secondary: "#edf4ee",
  secondaryForeground: "#233823",
  muted: "#f1f5f2",
  mutedForeground: "#6a706b",
  accent: "#e6f4ea",
  accentForeground: "#1f4928",
  destructive: "#e92c2c",
  destructiveForeground: "#f8faf8",
  border: "#e5e9e6", // Slightly lighter border
  input: "#e5e9e6",
  ring: "#22c069",

  // Semantic colors
  success: "#14a85e",
  successForeground: "#f8faf8",
  info: "#1a66ff",
  infoForeground: "#f8faf8",
  warning: "#ffc107",
  warningForeground: "#f8faf8",

  // Chart colors
  chart1: "#22c069", // Primary
  chart2: "#14a85e", // Success
  chart3: "#14a9b8", // Blue
  chart4: "#149bd8", // Light Blue
  chart5: "#1a66ff", // Info
};

// Dark theme
export const darkColors: ThemeColors = {
  background: "#0f120f", // Slightly darker for better contrast
  foreground: "#f8faf8",
  card: "#1a1f1a", // Slightly darker card
  cardForeground: "#f8faf8",
  popover: "#1a1f1a",
  popoverForeground: "#f8faf8",
  primary: "#2ac46e",
  primaryForeground: "#ffffff",
  secondary: "#1e231e",
  secondaryForeground: "#f8faf8",
  muted: "#1c211c",
  mutedForeground: "#9ca29d",
  accent: "#1c291e",
  accentForeground: "#f8faf8",
  destructive: "#9b1f1f",
  destructiveForeground: "#f8faf8",
  border: "#2a332a", // Slightly darker border
  input: "#2a332a",
  ring: "#2ac46e",

  // Semantic colors - dark mode
  success: "#16b465",
  successForeground: "#f8faf8",
  info: "#4d8df6",
  infoForeground: "#f8faf8",
  warning: "#f0ad4e",
  warningForeground: "#f8faf8",

  // Chart colors - dark mode
  chart1: "#2ac46e",
  chart2: "#1fc177",
  chart3: "#1fb7c1",
  chart4: "#1da1d7",
  chart5: "#4d8df6",
};

export const typography: ThemeTypography = {
  fontFamily: {
    sans: Platform.OS === "ios" ? "System" : "Roboto",
    heading: Platform.OS === "ios" ? "System" : "Roboto",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.65,
  },
};

export const spacing: ThemeSpacing = {
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  64: 256,
};

export const radius: ThemeRadius = {
  none: 0,
  sm: 2,
  DEFAULT: 4,
  md: 6,
  lg: 8,
  xl: 12,
  "2xl": 16,
  "3xl": 24,
  full: 9999,
};

// Create theme objects
export const lightTheme: Theme = {
  colors: lightColors,
  typography,
  spacing,
  radius,
};

export const darkTheme: Theme = {
  colors: darkColors,
  typography,
  spacing,
  radius,
};
