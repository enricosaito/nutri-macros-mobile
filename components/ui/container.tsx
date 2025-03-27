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
  const paddingClass = padding ? "px-4" : "";
  const centeredClass = centered ? "items-center justify-center" : "";
  const containerClass = `flex-1 ${paddingClass} ${centeredClass} ${className}`;

  // If scrollable container
  if (scroll) {
    const Wrapper = useSafeArea ? SafeAreaView : View;

    return (
      <Wrapper className="flex-1" {...props}>
        <ScrollView
          className={containerClass}
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
      <SafeAreaView className={`${containerClass}`} {...props}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View className={`${containerClass}`} {...props}>
      {children}
    </View>
  );
}
