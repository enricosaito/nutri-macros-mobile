// components/ui/screen.tsx
import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, ViewStyle, StatusBar, Platform } from "react-native";
import { Text } from "./text";
import { useTheme } from "../../src/context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";

interface ScreenProps {
  children: React.ReactNode;
  title?: string;
  headerRight?: React.ReactNode;
  showHeader?: boolean;
  scroll?: boolean;
  padding?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
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
  style,
  contentContainerStyle,
  animate = true,
}: ScreenProps) {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    const contentStyle = [
      styles.content,
      {
        paddingTop: showHeader ? 0 : insets.top,
        paddingBottom: insets.bottom,
        ...(padding && {
          paddingHorizontal: theme.spacing[4],
        }),
      },
      contentContainerStyle,
    ];

    if (scroll) {
      return (
        <AnimatedScrollView
          style={[styles.scrollView, { backgroundColor: theme.colors.background }]}
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
          entering={animate ? FadeIn.delay(50).duration(300) : undefined}
        >
          {children}
        </AnimatedScrollView>
      );
    }

    if (animate) {
      return (
        <AnimatedView style={[styles.contentContainer, contentStyle, style]} entering={FadeIn.delay(50).duration(300)}>
          {children}
        </AnimatedView>
      );
    }

    return <View style={[styles.contentContainer, contentStyle, style]}>{children}</View>;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
        translucent={true}
      />

      {showHeader && (
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.colors.card,
              borderBottomColor: theme.colors.border,
              paddingTop: insets.top + (Platform.OS === "ios" ? 0 : theme.spacing[2]),
              paddingBottom: theme.spacing[2],
              paddingHorizontal: theme.spacing[4],
              height: insets.top + theme.spacing[12],
            },
          ]}
        >
          {title ? (
            <Text variant="h3" style={{ color: theme.colors.foreground }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
