// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme, Platform } from "react-native";

// Define a complete theme object with all necessary properties
const baseTheme = {
  colors: {
    primary: "#22c069",
    secondary: "#edf4ee",
    background: "#f5f9f7",
    card: "#ffffff",
    foreground: "#151915",
    border: "#dfe5df",
    mutedForeground: "#6a706b",
    chart1: "#1eb866",
    chart3: "#14a9b8",
    chart5: "#1a66ff",
    destructive: "#e92c2c",
    destructiveForeground: "#f8faf8",
  },
  spacing: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
  radius: {
    sm: 2,
    md: 6,
    lg: 8,
    xl: 12,
    full: 9999,
  },
  typography: {
    fontFamily: {
      sans: Platform.OS === "ios" ? "System" : "Roboto",
      heading: Platform.OS === "ios" ? "System" : "Roboto",
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
  },
};

// Create dark theme by extending base theme
const darkTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    background: "#0f120f",
    card: "#1a1f1a",
    foreground: "#f8faf8",
    border: "#2a332a",
  },
};

// Define default context with complete theme
const defaultContext = {
  theme: baseTheme,
  isDark: false,
  toggleTheme: () => {},
};

const ThemeContext = createContext(defaultContext);

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(false);

  // Set initial theme based on system preference
  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Always provide a complete theme object
  const value = {
    theme: isDark ? darkTheme : baseTheme,
    isDark,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.warn("useTheme used outside ThemeProvider, using default theme");
    return defaultContext;
  }
  return context;
};
