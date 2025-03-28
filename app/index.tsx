// components/ui/input.tsx
import React from "react";
import { View, TextInput, TextInputProps, StyleSheet, ViewStyle } from "react-native";
import { Text } from "../components/ui/text";
import { theme } from "../src/styles/theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function Input({
  label,
  error,
  containerStyle,
  leftIcon,
  rightIcon,
  className = "",
  style,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <TextInput
          style={[styles.input, error && styles.inputError, style]}
          placeholderTextColor="#9ca3af"
          {...props}
        />

        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
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
  inputContainer: {
    position: "relative",
  },
  input: {
    width: "100%",
    height: 36,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: "white",
    color: theme.colors.text,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  leftIconContainer: {
    position: "absolute",
    left: 12,
    height: "100%",
    justifyContent: "center",
    zIndex: 1,
  },
  rightIconContainer: {
    position: "absolute",
    right: 12,
    height: "100%",
    justifyContent: "center",
    zIndex: 1,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    marginTop: 4,
    marginLeft: 4,
  },
});
