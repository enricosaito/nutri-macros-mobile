// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme, Theme } from "../styles/theme";

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

// Create a default theme to avoid undefined issues
const defaultTheme = lightTheme;

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  // Update theme when system preference changes
  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  // Toggle theme manually
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    console.warn("useTheme hook used outside of ThemeProvider, using default theme");
    return {
      theme: defaultTheme,
      isDark: false,
      toggleTheme: () => {},
    };
  }

  return context;
};
