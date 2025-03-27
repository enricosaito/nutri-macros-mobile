// components/ui/text.tsx
import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface TextProps extends RNTextProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "subtitle" | "body" | "caption" | "small";
  bold?: boolean;
  italic?: boolean;
  color?: "primary" | "secondary" | "foreground" | "muted" | "success" | "warning" | "danger";
}

const variantStyles = {
  h1: "text-3xl font-bold",
  h2: "text-2xl font-bold",
  h3: "text-xl font-bold",
  h4: "text-lg font-bold",
  subtitle: "text-base font-medium",
  body: "text-base",
  caption: "text-sm",
  small: "text-xs",
};

const colorStyles = {
  primary: "text-primary-600",
  secondary: "text-secondary-600",
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  success: "text-green-600",
  warning: "text-yellow-600",
  danger: "text-red-600",
};

export function Text({
  variant = "body",
  bold = false,
  italic = false,
  color = "foreground",
  className = "",
  children,
  ...props
}: TextProps) {
  const variantStyle = variantStyles[variant] || variantStyles.body;
  const colorStyle = colorStyles[color] || colorStyles.foreground;
  const fontWeight = bold ? "font-bold" : "";
  const fontStyle = italic ? "italic" : "";

  return (
    <RNText className={`${variantStyle} ${colorStyle} ${fontWeight} ${fontStyle} ${className}`} {...props}>
      {children}
    </RNText>
  );
}
