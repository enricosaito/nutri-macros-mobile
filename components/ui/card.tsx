import React from "react";
import { View, ViewProps } from "react-native";
import { styled } from "nativewind";
import { Text } from "./text";

const StyledView = styled(View);

// Card container
interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <StyledView className={`bg-card rounded-lg border border-muted p-4 shadow ${className}`} {...props}>
      {children}
    </StyledView>
  );
}

// Card header
interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
}

export function CardHeader({ children, className = "", ...props }: CardHeaderProps) {
  return (
    <StyledView className={`space-y-1.5 pb-3 ${className}`} {...props}>
      {children}
    </StyledView>
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
}

export function CardContent({ children, className = "", ...props }: CardContentProps) {
  return (
    <StyledView className={`pt-0 ${className}`} {...props}>
      {children}
    </StyledView>
  );
}

// Card footer
interface CardFooterProps extends ViewProps {
  children: React.ReactNode;
}

export function CardFooter({ children, className = "", ...props }: CardFooterProps) {
  return (
    <StyledView className={`flex flex-row items-center pt-4 ${className}`} {...props}>
      {children}
    </StyledView>
  );
}
