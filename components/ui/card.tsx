import React from "react";
import { View, ViewProps } from "react-native";
import { Text } from "./text";

// Card container
interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <View className={`bg-card rounded-lg border border-muted p-4 shadow ${className}`} {...props}>
      {children}
    </View>
  );
}

// Card header
interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "", ...props }: CardHeaderProps) {
  return (
    <View className={`space-y-1.5 pb-3 ${className}`} {...props}>
      {children}
    </View>
  );
}

// Card title
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = "", ...props }: CardTitleProps) {
  return (
    <Text variant="h3" className={`text-foreground ${className}`} {...props}>
      {children}
    </Text>
  );
}

// Card description
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className = "", ...props }: CardDescriptionProps) {
  return (
    <Text variant="body" color="muted" className={className} {...props}>
      {children}
    </Text>
  );
}

// Card content
interface CardContentProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = "", ...props }: CardContentProps) {
  return (
    <View className={`pt-0 ${className}`} {...props}>
      {children}
    </View>
  );
}

// Card footer
interface CardFooterProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "", ...props }: CardFooterProps) {
  return (
    <View className={`flex flex-row items-center pt-4 ${className}`} {...props}>
      {children}
    </View>
  );
}
