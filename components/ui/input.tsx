import React from "react";
import { View, TextInput, TextInputProps, ViewStyle } from "react-native";
import { Text } from "./text";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function Input({ label, error, containerStyle, leftIcon, rightIcon, className = "", ...props }: InputProps) {
  const errorStyle = error ? "border-red-500" : "";

  return (
    <View style={containerStyle} className="w-full mb-4">
      {label && (
        <Text variant="caption" className="mb-1 ml-1">
          {label}
        </Text>
      )}

      <View className="relative flex-row items-center">
        {leftIcon && <View className="absolute left-3 z-10">{leftIcon}</View>}

        <TextInput
          className={`w-full py-2 px-3 rounded-md bg-white border border-muted 
            ${errorStyle} 
            ${leftIcon ? "pl-10" : ""} 
            ${rightIcon ? "pr-10" : ""} 
            ${className}`}
          placeholderTextColor="#9ca3af"
          {...props}
        />

        {rightIcon && <View className="absolute right-3 z-10">{rightIcon}</View>}
      </View>

      {error && (
        <Text variant="caption" color="danger" className="mt-1 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}
