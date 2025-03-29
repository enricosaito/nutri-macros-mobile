// components/ui/numeric-input.tsx
import React, { useState, useEffect } from "react";
import { View, TextInput, Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text } from "./text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { colors, darkColors, spacing, radius, typography } from "../../src/styles/globalStyles";
import { Feather } from "@expo/vector-icons";
import { useAnimationsEnabled } from "../../src/utils/animation";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface NumericInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  error?: string;
  allowDecimal?: boolean;
}

export function NumericInput({
  label,
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  unit,
  error,
  allowDecimal = false,
}: NumericInputProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const [inputValue, setInputValue] = useState(value.toString());
  const buttonScale = useSharedValue(1);
  const errorAnim = useSharedValue(0);
  const [isFocused, setIsFocused] = useState(false);
  const animationsEnabled = useAnimationsEnabled();

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (text: string) => {
    // Allow only numbers and decimal point if allowed
    const regex = allowDecimal ? /^-?\d*\.?\d*$/ : /^-?\d*$/;
    if (!regex.test(text) && text !== "") return;

    setInputValue(text);

    // Convert to number and update if valid
    const numValue = allowDecimal ? parseFloat(text) : parseInt(text, 10);
    if (!isNaN(numValue)) {
      updateValue(numValue);
    } else if (text === "" || text === "-") {
      setInputValue(text);
    }
  };

  const updateValue = (newValue: number) => {
    // Clamp value between min and max
    let clampedValue = Math.max(min, Math.min(max, newValue));

    // Round to avoid floating point issues if decimal allowed
    if (allowDecimal) {
      const precision = step < 1 ? String(step).split(".")[1].length : 0;
      clampedValue = parseFloat(clampedValue.toFixed(precision));
    }

    // Only update if different
    if (clampedValue !== value) {
      onChange(clampedValue);
    }

    // Add error animation if value is clamped
    if (clampedValue !== newValue && animationsEnabled) {
      errorAnim.value = withSequence(
        withTiming(10, { duration: 100 }),
        withRepeat(withTiming(-10, { duration: 100 }), 3, true),
        withTiming(0, { duration: 100 })
      );
    }
  };

  const increment = () => {
    const numValue = parseFloat(inputValue || "0");
    if (!isNaN(numValue)) {
      updateValue(numValue + step);
    }
  };

  const decrement = () => {
    const numValue = parseFloat(inputValue || "0");
    if (!isNaN(numValue)) {
      updateValue(numValue - step);
    }
  };

  const handleButtonPressIn = () => {
    if (animationsEnabled) {
      buttonScale.value = withTiming(0.95, { duration: 100 });
    }
  };

  const handleButtonPressOut = () => {
    if (animationsEnabled) {
      buttonScale.value = withTiming(1, { duration: 100 });
    }
  };

  const buttonAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const containerAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: errorAnim.value }],
    };
  });

  // If animations are disabled, use regular components
  if (!animationsEnabled) {
    return (
      <View style={styles.container}>
        {label && (
          <Text
            style={[
              styles.label,
              {
                color: activeColors.text,
                marginBottom: spacing[2],
              },
            ]}
          >
            {label}
          </Text>
        )}

        <View style={styles.inputRow}>
          <Pressable
            style={[
              styles.button,
              styles.decrementButton,
              {
                backgroundColor: activeColors.secondary,
                borderColor: activeColors.border,
                borderTopLeftRadius: radius.md,
                borderBottomLeftRadius: radius.md,
              },
            ]}
            onPress={decrement}
          >
            <Feather name="minus" size={20} color={activeColors.text} />
          </Pressable>

          <View
            style={[
              styles.inputContainer,
              {
                borderColor: isFocused ? activeColors.primary : activeColors.border,
                borderTopWidth: 1,
                borderBottomWidth: 1,
              },
            ]}
          >
            <TextInput
              style={[
                styles.input,
                {
                  color: activeColors.text,
                  backgroundColor: activeColors.card,
                },
              ]}
              value={inputValue}
              onChangeText={handleInputChange}
              keyboardType={allowDecimal ? "decimal-pad" : "number-pad"}
              returnKeyType="done"
              selectTextOnFocus
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {unit && (
              <View
                style={[
                  styles.unitContainer,
                  {
                    backgroundColor: activeColors.secondary,
                    borderColor: activeColors.border,
                  },
                ]}
              >
                <Text variant="caption" color="muted">
                  {unit}
                </Text>
              </View>
            )}
          </View>

          <Pressable
            style={[
              styles.button,
              styles.incrementButton,
              {
                backgroundColor: activeColors.secondary,
                borderColor: activeColors.border,
                borderTopRightRadius: radius.md,
                borderBottomRightRadius: radius.md,
              },
            ]}
            onPress={increment}
          >
            <Feather name="plus" size={20} color={activeColors.text} />
          </Pressable>
        </View>

        {error && (
          <Text variant="caption" color="error" style={{ marginTop: spacing[2] }}>
            {error}
          </Text>
        )}
      </View>
    );
  }

  return (
    <AnimatedView style={[containerAnimStyle, styles.container]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: activeColors.text,
              marginBottom: spacing[2],
            },
          ]}
        >
          {label}
        </Text>
      )}

      <View style={styles.inputRow}>
        <AnimatedPressable
          style={[
            buttonAnimStyle,
            styles.button,
            styles.decrementButton,
            {
              backgroundColor: activeColors.secondary,
              borderColor: activeColors.border,
              borderTopLeftRadius: radius.md,
              borderBottomLeftRadius: radius.md,
            },
          ]}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={decrement}
        >
          <Feather name="minus" size={20} color={activeColors.text} />
        </AnimatedPressable>

        <View
          style={[
            styles.inputContainer,
            {
              borderColor: isFocused ? activeColors.primary : activeColors.border,
              borderTopWidth: 1,
              borderBottomWidth: 1,
            },
          ]}
        >
          <TextInput
            style={[
              styles.input,
              {
                color: activeColors.text,
                backgroundColor: activeColors.card,
              },
            ]}
            value={inputValue}
            onChangeText={handleInputChange}
            keyboardType={allowDecimal ? "decimal-pad" : "number-pad"}
            returnKeyType="done"
            selectTextOnFocus
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {unit && (
            <View
              style={[
                styles.unitContainer,
                {
                  backgroundColor: activeColors.secondary,
                  borderColor: activeColors.border,
                },
              ]}
            >
              <Text variant="caption" color="muted">
                {unit}
              </Text>
            </View>
          )}
        </View>

        <AnimatedPressable
          style={[
            buttonAnimStyle,
            styles.button,
            styles.incrementButton,
            {
              backgroundColor: activeColors.secondary,
              borderColor: activeColors.border,
              borderTopRightRadius: radius.md,
              borderBottomRightRadius: radius.md,
            },
          ]}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={increment}
        >
          <Feather name="plus" size={20} color={activeColors.text} />
        </AnimatedPressable>
      </View>

      {error && (
        <Text variant="caption" color="error" style={{ marginTop: spacing[2] }}>
          {error}
        </Text>
      )}
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  decrementButton: {},
  incrementButton: {},
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    height: 44,
  },
  input: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  unitContainer: {
    paddingHorizontal: 8,
    justifyContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    minWidth: 40,
  },
});
