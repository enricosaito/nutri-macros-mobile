// components/ui/input.tsx
import React, { useState } from "react";
import { View, TextInput, TextInputProps, StyleSheet, ViewStyle, Text as RNText } from "react-native";
import { Text } from "./text";
import { useTheme } from "../../src/context/ThemeContext";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, AnimatedStyleProp } from "react-native-reanimated";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(RNText);

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
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(0);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    focusAnim.value = withTiming(1, { duration: 200 });
    onFocus && onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    focusAnim.value = withTiming(0, { duration: 200 });
    onBlur && onBlur(e);
  };

  const labelAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(isFocused || (value && value.toString().length > 0) ? -24 : 0, {
            duration: 150,
          }),
        },
        {
          scale: withTiming(isFocused || (value && value.toString().length > 0) ? 0.85 : 1, {
            duration: 150,
          }),
        },
      ],
      color: isFocused ? theme.colors.primary : error ? theme.colors.destructive : theme.colors.mutedForeground,
    } as AnimatedStyleProp<any>;
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <AnimatedText
          style={[
            styles.label,
            {
              left: leftIcon ? theme.spacing[9] : theme.spacing[3],
              fontSize: theme.typography.fontSize.sm,
            },
            labelAnimStyle,
          ]}
        >
          {label}
        </AnimatedText>
      )}

      <View style={styles.inputContainer}>
        {leftIcon && (
          <View
            style={[
              styles.leftIconContainer,
              {
                left: theme.spacing[3],
                opacity: isFocused ? 1 : 0.7,
              },
            ]}
          >
            {leftIcon}
          </View>
        )}

        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.foreground,
              backgroundColor: "transparent",
              borderColor: error ? theme.colors.destructive : isFocused ? theme.colors.primary : theme.colors.input,
              borderRadius: theme.radius.md,
              paddingLeft: leftIcon ? theme.spacing[9] : theme.spacing[3],
              paddingRight: rightIcon ? theme.spacing[9] : theme.spacing[3],
              paddingTop: label ? theme.spacing[3] : theme.spacing[2],
              paddingBottom: theme.spacing[2],
              height: label ? 56 : 44,
              fontSize: theme.typography.fontSize.base,
            },
            style,
          ]}
          placeholderTextColor={theme.colors.mutedForeground}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          {...props}
        />

        {rightIcon && (
          <View
            style={[
              styles.rightIconContainer,
              {
                right: theme.spacing[3],
                opacity: isFocused ? 1 : 0.7,
              },
            ]}
          >
            {rightIcon}
          </View>
        )}
      </View>

      {error && (
        <Text
          style={{
            color: theme.colors.destructive,
            fontSize: theme.typography.fontSize.sm,
            marginTop: theme.spacing[1],
            marginLeft: theme.spacing[1],
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
  label: {
    position: "absolute",
    top: 16,
    zIndex: 1,
    backgroundColor: "transparent",
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
});
