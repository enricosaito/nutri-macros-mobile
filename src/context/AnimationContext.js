// src/context/AnimationContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useReducedMotion } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ANIMATION_PREF_KEY = "@NutriMacros:animationPreference";

const AnimationContext = createContext({
  animationsEnabled: true,
  setAnimationsEnabled: () => {},
  systemReducedMotion: false,
});

export const AnimationProvider = ({ children }) => {
  const systemReducedMotion = useReducedMotion();
  const [animationsEnabled, setAnimationsEnabled] = useState(!systemReducedMotion);
  const [loaded, setLoaded] = useState(false);

  // Load saved preference
  useEffect(() => {
    const loadPreference = async () => {
      try {
        const savedPref = await AsyncStorage.getItem(ANIMATION_PREF_KEY);
        if (savedPref !== null) {
          setAnimationsEnabled(savedPref === "true");
        } else {
          // If no preference is saved, default to system setting
          setAnimationsEnabled(!systemReducedMotion);
        }
      } catch (e) {
        console.error("Failed to load animation preference", e);
      } finally {
        setLoaded(true);
      }
    };

    loadPreference();
  }, [systemReducedMotion]);

  // Save preference whenever it changes
  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(ANIMATION_PREF_KEY, String(animationsEnabled)).catch((e) =>
        console.error("Failed to save animation preference", e)
      );
    }
  }, [animationsEnabled, loaded]);

  return (
    <AnimationContext.Provider
      value={{
        animationsEnabled,
        setAnimationsEnabled,
        systemReducedMotion,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimations = () => useContext(AnimationContext);
