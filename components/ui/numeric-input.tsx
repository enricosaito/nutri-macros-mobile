// components/ui/numeric-input.tsx
import React, { useState, useEffect } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { Text } from "./text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { theme } from "../../src/styles/theme";

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
  containerClassName?: string;
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
  containerClassName = "",
}: NumericInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());
  const buttonScale = useSharedValue(1);
  const errorAnim = useSharedValue(0);

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
    if (clampedValue !== newValue) {
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
    buttonScale.value = withTiming(0.95, { duration: 100 });
  };

  const handleButtonPressOut = () => {
    buttonScale.value = withTiming(1, { duration: 100 });
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

  return (
    <AnimatedView style={[containerAnimStyle, styles.container]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputRow}>
        <AnimatedPressable
          style={[buttonAnimStyle, styles.button, styles.decrementButton]}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={decrement}
        >
          <Text style={styles.buttonText}>-</Text>
        </AnimatedPressable>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={handleInputChange}
            keyboardType={allowDecimal ? "decimal-pad" : "number-pad"}
            returnKeyType="done"
            selectTextOnFocus
          />

          {unit && (
            <View style={styles.unitContainer}>
              <Text style={styles.unitText}>{unit}</Text>
            </View>
          )}
        </View>

        <AnimatedPressable
          style={[buttonAnimStyle, styles.button, styles.incrementButton]}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={increment}
        >
          <Text style={styles.buttonText}>+</Text>
        </AnimatedPressable>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginBottom: 4,
    marginLeft: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  decrementButton: {
    borderTopLeftRadius: theme.borderRadius.md,
    borderBottomLeftRadius: theme.borderRadius.md,
  },
  incrementButton: {
    borderTopRightRadius: theme.borderRadius.md,
    borderBottomRightRadius: theme.borderRadius.md,
  },
  buttonText: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.primary,
    fontWeight: "500",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    height: 48,
  },
  input: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: "white",
    textAlign: "center",
    color: theme.colors.text,
  },
  unitContainer: {
    paddingHorizontal: 8,
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: theme.colors.border,
    minWidth: 40,
  },
  unitText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    marginTop: 4,
    marginLeft: 4,
  },
});
