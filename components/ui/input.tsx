// components/ui/input.tsx
import React, { useState } from "react";
import { View, TextInput, TextInputProps, StyleSheet, ViewStyle, useColorScheme } from "react-native";
import { Text } from "./text";
import { colors, darkColors, spacing, radius, typography } from "../../src/styles/globalStyles";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  containerStyle,
  leftIcon,
  rightIcon,
  style,
  onFocus,
  onBlur,
  value,
  ...props
}: InputProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
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
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={{
            position: "absolute",
            top: isFocused || (value && value.toString().length > 0) ? 8 : 16,
            left: leftIcon ? spacing[9] : spacing[3],
            fontSize:
              isFocused || (value && value.toString().length > 0) ? typography.fontSize.xs : typography.fontSize.sm,
            color: isFocused ? activeColors.primary : error ? activeColors.error : activeColors.textMuted,
            zIndex: 1,
          }}
        >
          {label}
        </Text>
      )}

      <View style={styles.inputContainer}>
        {leftIcon && (
          <View
            style={{
              position: "absolute",
              left: spacing[3],
              height: "100%",
              justifyContent: "center",
              opacity: isFocused ? 1 : 0.7,
              zIndex: 1,
            }}
          >
            {leftIcon}
          </View>
        )}

        <TextInput
          style={[
            {
              color: activeColors.text,
              backgroundColor: "transparent",
              borderColor: error ? activeColors.error : isFocused ? activeColors.primary : activeColors.border,
              borderRadius: radius.md,
              paddingLeft: leftIcon ? spacing[9] : spacing[3],
              paddingRight: rightIcon ? spacing[9] : spacing[3],
              paddingTop: label ? spacing[3] : spacing[2],
              paddingBottom: spacing[2],
              height: label ? 56 : 44,
              fontSize: typography.fontSize.base,
              borderWidth: 1,
              width: "100%",
            },
            style,
          ]}
          placeholderTextColor={activeColors.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          {...props}
        />

        {rightIcon && (
          <View
            style={{
              position: "absolute",
              right: spacing[3],
              height: "100%",
              justifyContent: "center",
              opacity: isFocused ? 1 : 0.7,
              zIndex: 1,
            }}
          >
            {rightIcon}
          </View>
        )}
      </View>

      {error && (
        <Text
          variant="caption"
          color="error"
          style={{
            marginTop: spacing[1],
            marginLeft: spacing[1],
          }}
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
  inputContainer: {
    position: "relative",
  },
});
