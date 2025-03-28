// src/components/ui/input.tsx
import React from "react";
import { View, TextInput, TextInputProps, StyleSheet, ViewStyle } from "react-native";
import { Text } from "./text";
import { useTheme } from "../../context/ThemeContext";

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
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.foreground,
              fontSize: theme.typography.fontSize.sm,
              marginBottom: theme.spacing[1],
            },
          ]}
        >
          {label}
        </Text>
      )}

      <View style={styles.inputContainer}>
        {leftIcon && <View style={[styles.leftIconContainer, { left: theme.spacing[3] }]}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.foreground,
              backgroundColor: "transparent",
              borderColor: error ? theme.colors.destructive : theme.colors.input,
              borderRadius: theme.radius.md,
              paddingLeft: leftIcon ? theme.spacing[9] : theme.spacing[3],
              paddingRight: rightIcon ? theme.spacing[9] : theme.spacing[3],
              height: 36,
              fontSize: theme.typography.fontSize.base,
              paddingVertical: theme.spacing[1],
            },
            error && { borderColor: theme.colors.destructive },
            style,
          ]}
          placeholderTextColor={theme.colors.mutedForeground}
          {...props}
        />

        {rightIcon && <View style={[styles.rightIconContainer, { right: theme.spacing[3] }]}>{rightIcon}</View>}
      </View>

      {error && (
        <Text
          style={[
            styles.errorText,
            {
              color: theme.colors.destructive,
              fontSize: theme.typography.fontSize.sm,
              marginTop: theme.spacing[1],
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    marginLeft: 4,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    width: "100%",
  },
  leftIconContainer: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
    zIndex: 1,
  },
  rightIconContainer: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
    zIndex: 1,
  },
  errorText: {
    marginLeft: 4,
  },
});
