import React from "react";
import { View, StatusBar, ViewProps, SafeAreaView } from "react-native";
import { Text } from "./text";
import { Container } from "./container";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();

  return (
    <Container useSafeArea={false} scroll={scroll} padding={false} className={`bg-background ${className}`} {...props}>
      <SafeAreaView style={{ paddingTop: insets.top }} className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

        {showHeader && (
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-muted">
            {title ? <Text variant="h3">{title}</Text> : <View />}

            {headerRight ? <View>{headerRight}</View> : null}
          </View>
        )}

        <View className={`flex-1 ${padding ? "px-4" : ""}`}>{children}</View>
      </SafeAreaView>
    </Container>
  );
}
