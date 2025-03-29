// src/utils/animation.js
import { Platform } from "react-native";
import { useReducedMotion } from "react-native-reanimated";

/**
 * Helper function to safely apply animations with fallbacks for reduced motion
 * @param {Object} animationConfig - The animation configuration
 * @param {Object} fallbackStyle - Style to use when reduced motion is enabled
 * @returns Animation config or fallback style
 */
export const useSafeAnimation = (animationConfig, fallbackStyle = {}) => {
  const reducedMotion = useReducedMotion();

  // If reduced motion is enabled or we're on specific platforms with issues, use fallback
  if (reducedMotion) {
    return fallbackStyle;
  }

  return animationConfig;
};

/**
 * Determine if animations should be enabled based on preferences and platform
 * @returns {boolean} Whether animations should be enabled
 */
export const useAnimationsEnabled = () => {
  const reducedMotion = useReducedMotion();
  return !reducedMotion;
};
