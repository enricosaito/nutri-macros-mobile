// src/components/ui/numeric-input.tsx
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
import { useTheme } from "../../src/context/ThemeContext";

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
  const { theme } = useTheme();
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
    <AnimatedView style={[containerAnimStyle, { marginBottom: theme.spacing[4] }]}>
      {label && (
        <Text
          style={{
            marginBottom: theme.spacing[1],
            marginLeft: theme.spacing[1],
            fontSize: theme.typography.fontSize.sm,
          }}
        >
          {label}
        </Text>
      )}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AnimatedPressable
          style={[
            buttonAnimStyle,
            styles.button,
            {
              width: 48,
              height: 48,
              backgroundColor: theme.colors.muted,
              borderTopLeftRadius: theme.radius.md,
              borderBottomLeftRadius: theme.radius.md,
              borderWidth: 1,
              borderColor: theme.colors.border,
            },
          ]}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={decrement}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.primary,
            }}
          >
            -
          </Text>
        </AnimatedPressable>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <TextInput
            style={[
              styles.input,
              {
                flex: 1,
                height: 48,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.card,
                paddingHorizontal: theme.spacing[2],
                textAlign: "center",
                color: theme.colors.foreground,
              },
            ]}
            value={inputValue}
            onChangeText={handleInputChange}
            keyboardType={allowDecimal ? "decimal-pad" : "number-pad"}
            returnKeyType="done"
            selectTextOnFocus
          />

          {unit && (
            <View
              style={[
                styles.unitContainer,
                {
                  height: 48,
                  minWidth: 40,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.muted,
                  paddingHorizontal: theme.spacing[2],
                },
              ]}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.mutedForeground,
                }}
              >
                {unit}
              </Text>
            </View>
          )}
        </View>

        <AnimatedPressable
          style={[
            buttonAnimStyle,
            styles.button,
            {
              width: 48,
              height: 48,
              backgroundColor: theme.colors.muted,
              borderTopRightRadius: theme.radius.md,
              borderBottomRightRadius: theme.radius.md,
              borderWidth: 1,
              borderColor: theme.colors.border,
            },
          ]}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={increment}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.primary,
            }}
          >
            +
          </Text>
        </AnimatedPressable>
      </View>

      {error && (
        <Text
          style={{
            marginTop: theme.spacing[1],
            marginLeft: theme.spacing[1],
            color: theme.colors.destructive,
            fontSize: theme.typography.fontSize.sm,
          }}
        >
          {error}
        </Text>
      )}
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
  },
  unitContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
