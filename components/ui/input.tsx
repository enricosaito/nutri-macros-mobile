// components/ui/input.tsx
import React, { useState } from "react";
import { View, TextInput, TextInputProps, useColorScheme } from "react-native";
import { Text } from "./text";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  className = "",
  containerClassName = "",
  leftIcon,
  rightIcon,
  style,
  onFocus,
  onBlur,
  value,
  ...props
}: InputProps) {
  const isDark = useColorScheme() === "dark";
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <View className={`w-full mb-4 ${containerClassName}`}>
      {label && (
        <Text
          className={`absolute ${isFocused || (value && value.toString().length > 0) ? "top-2" : "top-4"} left-${
            leftIcon ? "9" : "3"
          } ${isFocused || (value && value.toString().length > 0) ? "text-xs" : "text-sm"} ${
            isFocused
              ? isDark
                ? "text-[#2ac46e]"
                : "text-[#22c069]"
              : error
              ? isDark
                ? "text-[#9b1f1f]"
                : "text-[#e92c2c]"
              : isDark
              ? "text-[#9ca29d]"
              : "text-[#6a706b]"
          } z-10`}
        >
          {label}
        </Text>
      )}

      <View className="relative">
        {leftIcon && (
          <View className={`absolute left-3 h-full justify-center z-10 ${isFocused ? "opacity-100" : "opacity-70"}`}>
            {leftIcon}
          </View>
        )}

        <TextInput
          className={`
            border rounded-md px-3 py-2 w-full
            ${leftIcon ? "pl-9" : "pl-3"}
            ${rightIcon ? "pr-9" : "pr-3"}
            ${label ? "pt-6 pb-2 h-14" : "h-11"}
            ${
              error
                ? isDark
                  ? "border-[#9b1f1f]"
                  : "border-[#e92c2c]"
                : isFocused
                ? isDark
                  ? "border-[#2ac46e]"
                  : "border-[#22c069]"
                : isDark
                ? "border-[#333333]"
                : "border-[#dfe5df]"
            }
            ${isDark ? "text-white bg-transparent" : "text-[#151915] bg-transparent"}
            ${className}
          `}
          placeholderTextColor={isDark ? "#9ca29d" : "#6a706b"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          style={style}
          {...props}
        />

        {rightIcon && (
          <View className={`absolute right-3 h-full justify-center z-10 ${isFocused ? "opacity-100" : "opacity-70"}`}>
            {rightIcon}
          </View>
        )}
      </View>

      {error && (
        <Text variant="caption" color="error" className="mt-1 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}
