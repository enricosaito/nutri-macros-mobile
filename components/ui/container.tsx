// components/ui/container.tsx
import React from "react";
import { View, SafeAreaView, ScrollView, ViewProps } from "react-native";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  useSafeArea?: boolean;
  scroll?: boolean;
  centered?: boolean;
  padding?: boolean;
  className?: string;
}

export function Container({
  children,
  useSafeArea = true,
  scroll = false,
  centered = false,
  padding = true,
  className = "",
  ...props
}: ContainerProps) {
  const baseClasses = `
    flex-1 
    ${padding ? "px-4" : ""} 
    ${centered ? "items-center justify-center" : ""} 
    ${className}
  `;

  // If scrollable container
  if (scroll) {
    const Wrapper = useSafeArea ? SafeAreaView : View;

    return (
      <Wrapper className="flex-1" {...props}>
        <ScrollView
          className={baseClasses}
          contentContainerStyle={centered ? { flexGrow: 1, justifyContent: "center" } : undefined}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </Wrapper>
    );
  }

  // Non-scrollable container
  if (useSafeArea) {
    return (
      <SafeAreaView className={baseClasses} {...props}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View className={baseClasses} {...props}>
      {children}
    </View>
  );
}
