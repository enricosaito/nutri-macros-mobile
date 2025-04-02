// components/ui/screen.tsx
import React from "react";
import { View, ScrollView, StatusBar, useColorScheme } from "react-native";
import { Text } from "./text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";

interface ScreenProps {
  children: React.ReactNode;
  title?: string;
  headerRight?: React.ReactNode;
  showHeader?: boolean;
  scroll?: boolean;
  padding?: boolean;
  className?: string;
  contentClassName?: string;
  animate?: boolean;
}

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export function Screen({
  children,
  title,
  headerRight,
  showHeader = true,
  scroll = true,
  padding = true,
  className = "",
  contentClassName = "",
  animate = true,
}: ScreenProps) {
  const isDark = useColorScheme() === "dark";
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    const contentBaseClasses = `
      ${showHeader ? "" : `pt-[${insets.top}px]`}
      ${padding ? "px-4" : ""}
      ${contentClassName}
    `;

    if (scroll) {
      return (
        <AnimatedScrollView
          className={`flex-1 ${isDark ? "bg-black" : "bg-[#f5f9f7]"}`}
          contentContainerClassName={contentBaseClasses}
          showsVerticalScrollIndicator={false}
          entering={animate ? FadeIn.delay(50).duration(300) : undefined}
        >
          {children}
        </AnimatedScrollView>
      );
    }

    if (animate) {
      return (
        <AnimatedView className={`flex-1 ${contentBaseClasses}`} entering={FadeIn.delay(50).duration(300)}>
          {children}
        </AnimatedView>
      );
    }

    return <View className={`flex-1 ${contentBaseClasses}`}>{children}</View>;
  };

  return (
    <View className={`flex-1 ${isDark ? "bg-black" : "bg-[#f5f9f7]"} ${className}`}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#000000" : "#f5f9f7"}
        translucent={true}
      />

      {showHeader && (
        <View
          className={`
            flex-row items-end justify-between
            ${isDark ? "bg-[#121212] border-[#333333]" : "bg-white border-[#dfe5df]"}
            border-b px-4 pb-2
          `}
          style={{
            paddingTop: insets.top,
            height: insets.top + 48,
          }}
        >
          {title ? (
            <Text variant="h3" className={isDark ? "text-white" : "text-[#151915]"}>
              {title}
            </Text>
          ) : (
            <View />
          )}
          {headerRight ? <View>{headerRight}</View> : null}
        </View>
      )}

      {renderContent()}
    </View>
  );
}
