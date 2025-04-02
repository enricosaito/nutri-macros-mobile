import React, { useState, useEffect } from "react";
import { View, TextInput, Pressable, useColorScheme } from "react-native";
import { Text } from "./text";
import { Feather } from "@expo/vector-icons";

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
  className?: string;
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
  className = "",
}: NumericInputProps) {
  const isDark = useColorScheme() === "dark";
  const [inputValue, setInputValue] = useState(value.toString());

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

  return (
    <View className={`w-full mb-4 ${className}`}>
      {label && <Text className={`mb-2 ${isDark ? "text-white" : "text-[#151915]"}`}>{label}</Text>}

      <View className="flex-row items-center">
        <Pressable
          className={`w-11 h-11 items-center justify-center border rounded-l-md ${
            isDark ? "bg-[#1e231e] border-[#333333]" : "bg-[#edf4ee] border-[#dfe5df]"
          }`}
          onPress={decrement}
        >
          <Feather name="minus" size={20} color={isDark ? "#ffffff" : "#151915"} />
        </Pressable>

        <View className={`flex-1 flex-row h-11 border-t border-b ${isDark ? "border-[#333333]" : "border-[#dfe5df]"}`}>
          <TextInput
            className={`flex-1 text-center px-2 ${isDark ? "text-white bg-[#121212]" : "text-[#151915] bg-white"}`}
            value={inputValue}
            onChangeText={handleInputChange}
            keyboardType={allowDecimal ? "decimal-pad" : "number-pad"}
            returnKeyType="done"
            selectTextOnFocus
          />

          {unit && (
            <View
              className={`px-2 justify-center border-t border-b border-r min-w-10 ${
                isDark ? "bg-[#1e231e] border-[#333333]" : "bg-[#edf4ee] border-[#dfe5df]"
              }`}
            >
              <Text variant="caption" color="muted">
                {unit}
              </Text>
            </View>
          )}
        </View>

        <Pressable
          className={`w-11 h-11 items-center justify-center border rounded-r-md ${
            isDark ? "bg-[#1e231e] border-[#333333]" : "bg-[#edf4ee] border-[#dfe5df]"
          }`}
          onPress={increment}
        >
          <Feather name="plus" size={20} color={isDark ? "#ffffff" : "#151915"} />
        </Pressable>
      </View>

      {error && (
        <Text variant="caption" color="error" className="mt-2">
          {error}
        </Text>
      )}
    </View>
  );
}
