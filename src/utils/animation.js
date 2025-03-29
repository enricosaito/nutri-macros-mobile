// src/utils/animation.js - Updated to use context
import { useAnimations } from "../context/AnimationContext";

/**
 * Helper function to safely apply animations with fallbacks for reduced motion
 * @param {Object} animationConfig - The animation configuration
 * @param {Object} fallbackStyle - Style to use when reduced motion is enabled
 * @returns Animation config or fallback style
 */
export const useSafeAnimation = (animationConfig, fallbackStyle = {}) => {
  const { animationsEnabled } = useAnimations();

  if (!animationsEnabled) {
    return fallbackStyle;
  }

  return animationConfig;
};

/**
 * Determine if animations should be enabled based on preferences
 * @returns {boolean} Whether animations should be enabled
 */
export const useAnimationsEnabled = () => {
  const { animationsEnabled } = useAnimations();
  return animationsEnabled;
};
