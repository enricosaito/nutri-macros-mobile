// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme, Theme } from "../styles/theme";

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  isThemeReady: boolean;
};

// Create a default theme context with light theme
const defaultThemeContext: ThemeContextType = {
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
  isThemeReady: false,
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");
  const [isThemeReady, setIsThemeReady] = useState(false);

  // Initialize theme
  useEffect(() => {
    setIsDark(colorScheme === "dark");
    setIsThemeReady(true);
  }, [colorScheme]);

  // Toggle theme manually
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return <ThemeContext.Provider value={{ theme, isDark, toggleTheme, isThemeReady }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    console.warn("useTheme hook used outside of ThemeProvider");
    return defaultThemeContext;
  }

  return context;
};
