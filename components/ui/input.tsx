import React from "react";
import { View, TextInput, TextInputProps, ViewStyle, StyleSheet } from "react-native";
import { styled } from "nativewind";
import { Text } from "./text";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ label, error, containerStyle, leftIcon, rightIcon, className = "", ...props }: InputProps) {
  const errorStyle = error ? "border-red-500" : "";

  return (
    <StyledView style={containerStyle} className="w-full mb-4">
      {label && (
        <Text variant="caption" className="mb-1 ml-1">
          {label}
        </Text>
      )}

      <StyledView className="relative flex-row items-center">
        {leftIcon && <StyledView className="absolute left-3 z-10">{leftIcon}</StyledView>}

        <StyledTextInput
          className={`w-full py-2 px-3 rounded-md bg-white border border-muted 
            ${errorStyle} 
            ${leftIcon ? "pl-10" : ""} 
            ${rightIcon ? "pr-10" : ""} 
            ${className}`}
          placeholderTextColor="#9ca3af"
          {...props}
        />

        {rightIcon && <StyledView className="absolute right-3 z-10">{rightIcon}</StyledView>}
      </StyledView>

      {error && (
        <Text variant="caption" color="danger" className="mt-1 ml-1">
          {error}
        </Text>
      )}
    </StyledView>
  );
}
