import React from "react";
import { Text as RNText, TextProps } from "react-native";
import { useColorScheme } from "react-native";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "subtitle" | "body" | "caption" | "small";
type TextColor = "primary" | "secondary" | "text" | "muted" | "success" | "warning" | "error" | "white";

interface CustomTextProps extends TextProps {
  variant?: TextVariant;
  color?: TextColor;
  bold?: boolean;
  italic?: boolean;
  children?: React.ReactNode;
}

export function Text({
  variant = "body",
  color = "text",
  bold = false,
  italic = false,
  className = "",
  children,
  ...props
}: CustomTextProps & { className?: string }) {
  const isDark = useColorScheme() === "dark";

  // Base styles using className
  let textClassNames = "";

  // Variant styles
  switch (variant) {
    case "h1":
      textClassNames += "text-3xl font-bold tracking-tight ";
      break;
    case "h2":
      textClassNames += "text-2xl font-bold ";
      break;
    case "h3":
      textClassNames += "text-xl font-semibold ";
      break;
    case "h4":
      textClassNames += "text-lg font-semibold ";
      break;
    case "subtitle":
      textClassNames += "text-base font-medium ";
      break;
    case "body":
      textClassNames += "text-base ";
      break;
    case "caption":
      textClassNames += "text-sm ";
      if (color === "text") color = "muted"; // Default captions to muted color
      break;
    case "small":
      textClassNames += "text-xs ";
      break;
  }

  // Color styles
  switch (color) {
    case "primary":
      textClassNames += isDark ? "text-[#2ac46e] " : "text-[#22c069] ";
      break;
    case "secondary":
      textClassNames += isDark ? "text-[#1e231e] " : "text-[#edf4ee] ";
      break;
    case "text":
      textClassNames += isDark ? "text-white " : "text-[#151915] ";
      break;
    case "muted":
      textClassNames += isDark ? "text-[#9ca29d] " : "text-[#6a706b] ";
      break;
    case "success":
      textClassNames += isDark ? "text-[#16b465] " : "text-[#14a85e] ";
      break;
    case "warning":
      textClassNames += isDark ? "text-[#f0ad4e] " : "text-[#ffc107] ";
      break;
    case "error":
      textClassNames += isDark ? "text-[#9b1f1f] " : "text-[#e92c2c] ";
      break;
    case "white":
      textClassNames += "text-white ";
      break;
  }

  // Font weight
  if (bold) {
    textClassNames += "font-bold ";
  }

  // Font style
  if (italic) {
    textClassNames += "italic ";
  }

  // Add user-provided className at the end to allow overriding
  textClassNames += className;

  return (
    <RNText className={textClassNames} {...props}>
      {children}
    </RNText>
  );
}
