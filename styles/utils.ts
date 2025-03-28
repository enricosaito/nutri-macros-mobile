// src/styles/utils.ts
import { StyleSheet } from "react-native";
import { Theme } from "./theme";

/**
 * Creates styles using the theme system
 * @param themeFn Function that receives theme and returns styles
 * @returns Stylesheet created with theme-based styles
 */
export function createThemedStyles<T extends StyleSheet.NamedStyles<T>>(themeFn: (theme: Theme) => T) {
  return (theme: Theme) => StyleSheet.create(themeFn(theme));
}

/**
 * Gets shadow styles based on elevation
 * @param elevation Shadow elevation level
 * @returns Platform-specific shadow styles
 */
export function getShadowStyle(elevation = 2) {
  return {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: elevation / 2 },
    shadowOpacity: elevation * 0.05,
    shadowRadius: elevation,
    elevation,
  };
}

/**
 * Gets border radius styles for consistent corners
 * @param theme Current theme object
 * @param size Radius size (sm, md, lg, xl, etc.)
 * @returns Border radius styles
 */
export function getBorderRadius(theme: Theme, size: keyof Theme["radius"]) {
  return {
    borderRadius: theme.radius[size],
  };
}

/**
 * Gets consistent padding styles
 * @param theme Current theme object
 * @param horizontal Horizontal padding size
 * @param vertical Vertical padding size
 * @returns Padding styles
 */
export function getPadding(theme: Theme, horizontal: keyof Theme["spacing"], vertical?: keyof Theme["spacing"]) {
  return {
    paddingHorizontal: theme.spacing[horizontal],
    paddingVertical: theme.spacing[vertical || horizontal],
  };
}
