import React, { useState, useEffect } from "react";
import { View, TextInput, Pressable } from "react-native";
import { Text } from "./text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

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
    <AnimatedView style={containerAnimStyle} className={`w-full mb-4 ${containerClassName}`}>
      {label && (
        <Text variant="caption" className="mb-1 ml-1">
          {label}
        </Text>
      )}

      <View className="flex-row items-center">
        <AnimatedPressable
          style={buttonAnimStyle}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={decrement}
          className="w-12 h-12 bg-muted rounded-l-md items-center justify-center border border-muted"
        >
          <Text variant="subtitle" color="primary">
            -
          </Text>
        </AnimatedPressable>

        <View className="flex-1 flex-row">
          <TextInput
            className="flex-1 h-12 border-t border-b border-muted bg-white px-2 text-center"
            value={inputValue}
            onChangeText={handleInputChange}
            keyboardType={allowDecimal ? "decimal-pad" : "number-pad"}
            returnKeyType="done"
            selectTextOnFocus
          />

          {unit && (
            <View className="h-12 min-w-[40px] border-t border-b border-r border-muted bg-muted justify-center items-center px-2">
              <Text variant="caption" color="muted">
                {unit}
              </Text>
            </View>
          )}
        </View>

        <AnimatedPressable
          style={buttonAnimStyle}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={increment}
          className="w-12 h-12 bg-muted rounded-r-md items-center justify-center border border-muted"
        >
          <Text variant="subtitle" color="primary">
            +
          </Text>
        </AnimatedPressable>
      </View>

      {error && (
        <Text variant="caption" color="danger" className="mt-1 ml-1">
          {error}
        </Text>
      )}
    </AnimatedView>
  );
}
