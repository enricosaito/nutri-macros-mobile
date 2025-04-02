import React from "react";
import { View, useColorScheme } from "react-native";
import { Text } from "./text";

// Card container
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  const isDark = useColorScheme() === "dark";

  return (
    <View
      className={`rounded-xl border overflow-hidden mb-4 shadow-sm ${
        isDark ? "bg-[#121212] border-[#333333]" : "bg-white border-[#dfe5df]"
      } ${className}`}
    >
      {children}
    </View>
  );
}

// Card header
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <View className={`px-6 py-4 ${className}`}>{children}</View>;
}

// Card title
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <Text variant="h3" className={className}>
      {children}
    </Text>
  );
}

// Card description
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className = "" }: CardDescriptionProps) {
  return (
    <Text variant="caption" className={`mt-1 ${className}`}>
      {children}
    </Text>
  );
}

// Card content
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <View className={`px-6 pb-6 ${className}`}>{children}</View>;
}

// Card footer
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  const isDark = useColorScheme() === "dark";

  return (
    <View
      className={`px-6 py-4 flex-row items-center border-t ${
        isDark ? "border-[#333333]" : "border-[#dfe5df]"
      } ${className}`}
    >
      {children}
    </View>
  );
}
