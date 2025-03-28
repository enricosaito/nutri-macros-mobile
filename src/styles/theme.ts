// src/styles/theme.ts
import { Platform } from "react-native";

// Define types for our theme
export interface ThemeColors {
  // Light mode - Green theme
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
  // Light mode - Green theme
  background: "#f7fbf9", // hsl(140 50% 98%)
  foreground: "#151915", // hsl(140 10% 10%)
  card: "#ffffff", // hsl(0 0% 100%)
  cardForeground: "#151915", // hsl(140 10% 10%)
  popover: "#ffffff", // hsl(0 0% 100%)
  popoverForeground: "#151915", // hsl(140 10% 10%)
  primary: "#1eb866", // hsl(142 70% 45%)
  primaryForeground: "#ffffff", // hsl(0 0% 100%)
  secondary: "#edf4ee", // hsl(140 15% 94%)
  secondaryForeground: "#233823", // hsl(140 25% 25%)
  muted: "#f1f5f2", // hsl(140 10% 96%)
  mutedForeground: "#6a706b", // hsl(140 5% 45%)
  accent: "#e6f4ea", // hsl(142 35% 94%)
  accentForeground: "#1f4928", // hsl(140 40% 25%)
  destructive: "#e92c2c", // hsl(0 84% 60%)
  destructiveForeground: "#f8faf8", // hsl(0 0% 98%)
  border: "#dfe5df", // hsl(140 10% 90%)
  input: "#dfe5df", // hsl(140 10% 90%)
  ring: "#1eb866", // hsl(142 70% 45%)

  // Semantic colors
  success: "#14a85e", // hsl(160 84% 39%)
  successForeground: "#f8faf8", // hsl(0 0% 98%)
  info: "#1a66ff", // hsl(220 80% 50%)
  infoForeground: "#f8faf8", // hsl(0 0% 98%)
  warning: "#ffc107", // hsl(38 92% 50%)
  warningForeground: "#f8faf8", // hsl(0 0% 98%)

  // Chart colors
  chart1: "#1eb866", // hsl(142 70% 45%)
  chart2: "#14a85e", // hsl(160 84% 39%)
  chart3: "#14a9b8", // hsl(180 80% 45%)
  chart4: "#149bd8", // hsl(200 75% 55%)
  chart5: "#1a66ff", // hsl(220 70% 60%)
};

// Dark theme
export const darkColors: ThemeColors = {
  // Dark mode - Green theme
  background: "#131913", // hsl(140 15% 10%)
  foreground: "#f8faf8", // hsl(0 0% 98%)
  card: "#181d18", // hsl(140 15% 12%)
  cardForeground: "#f8faf8", // hsl(0 0% 98%)
  popover: "#181d18", // hsl(140 15% 12%)
  popoverForeground: "#f8faf8", // hsl(0 0% 98%)
  primary: "#2ac46e", // hsl(142 60% 50%)
  primaryForeground: "#ffffff", // hsl(0 0% 100%)
  secondary: "#1e231e", // hsl(140 10% 20%)
  secondaryForeground: "#f8faf8", // hsl(0 0% 98%)
  muted: "#1c211c", // hsl(140 15% 18%)
  mutedForeground: "#9ca29d", // hsl(140 5% 65%)
  accent: "#1c291e", // hsl(142 15% 25%)
  accentForeground: "#f8faf8", // hsl(0 0% 98%)
  destructive: "#9b1f1f", // hsl(0 62% 40%)
  destructiveForeground: "#f8faf8", // hsl(0 0% 98%)
  border: "#1c291e", // hsl(140 15% 25%)
  input: "#1c291e", // hsl(140 15% 25%)
  ring: "#2ac46e", // hsl(142 60% 50%)

  // Semantic colors - dark mode
  success: "#16b465", // hsl(160 70% 40%)
  successForeground: "#f8faf8", // hsl(0 0% 98%)
  info: "#4d8df6", // hsl(220 70% 55%)
  infoForeground: "#f8faf8", // hsl(0 0% 98%)
  warning: "#f0ad4e", // hsl(38 80% 50%)
  warningForeground: "#f8faf8", // hsl(0 0% 98%)

  // Chart colors - dark mode
  chart1: "#2ac46e", // hsl(142 60% 50%)
  chart2: "#1fc177", // hsl(160 70% 45%)
  chart3: "#1fb7c1", // hsl(180 65% 50%)
  chart4: "#1da1d7", // hsl(200 60% 55%)
  chart5: "#4d8df6", // hsl(220 55% 60%)
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
