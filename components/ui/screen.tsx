import React from "react";
import { View, StatusBar, ViewProps } from "react-native";
import { Text } from "./text";
import { Container } from "./container";

interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  title?: string;
  headerRight?: React.ReactNode;
  showHeader?: boolean;
  scroll?: boolean;
  padding?: boolean;
  className?: string;
}

export function Screen({
  children,
  title,
  headerRight,
  showHeader = true,
  scroll = true,
  padding = true,
  className = "",
  ...props
}: ScreenProps) {
  return (
    <Container useSafeArea={true} scroll={scroll} padding={false} className={`bg-background ${className}`} {...props}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {showHeader && (
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-muted">
          {title ? <Text variant="h3">{title}</Text> : <View />}

          {headerRight ? <View>{headerRight}</View> : null}
        </View>
      )}

      <View className={`flex-1 ${padding ? "px-4" : ""}`}>{children}</View>
    </Container>
  );
}
