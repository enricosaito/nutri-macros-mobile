import React from "react";
import { View, ViewProps, StatusBar } from "react-native";
import { styled } from "nativewind";
import { Text } from "./text";
import { Container } from "./container";

const StyledView = styled(View);

interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  title?: string;
  headerRight?: React.ReactNode;
  showHeader?: boolean;
  scroll?: boolean;
  padding?: boolean;
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
        <StyledView className="flex-row items-center justify-between px-4 py-3 border-b border-muted">
          {title ? <Text variant="h3">{title}</Text> : <StyledView />}

          {headerRight ? <StyledView>{headerRight}</StyledView> : null}
        </StyledView>
      )}

      <StyledView className={`flex-1 ${padding ? "px-4" : ""}`}>{children}</StyledView>
    </Container>
  );
}
