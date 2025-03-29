// src/types/components.d.ts
import { ReactNode } from "react";
import { ViewStyle, TextStyle, StyleProp } from "react-native";

// Define common prop interfaces
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      style?: StyleProp<ViewStyle | TextStyle>;
      children?: ReactNode;
    }
  }
}

// Add any specific component types here
export interface ButtonProps {
  title?: string;
  children?: ReactNode;
  onPress: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
