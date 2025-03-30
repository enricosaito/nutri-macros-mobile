// components/ui/screen.tsx
import React from "react";
import { View, ScrollView, StyleSheet, ViewStyle, StatusBar, useColorScheme, Platform } from "react-native";
import { Text } from "./text";
import { colors, darkColors, spacing } from "../../src/styles/globalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";
import { useAnimationsEnabled } from "../../src/utils/animation";

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
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const insets = useSafeAreaInsets();
  const animationsEnabled = useAnimationsEnabled();

  // Only use animations if explicitly requested AND animations are enabled
  const shouldAnimate = animate && animationsEnabled;

  const renderContent = () => {
    const contentStyle = [
      styles.content,
      {
        paddingTop: showHeader ? 0 : insets.top + (Platform.OS === "ios" ? 0 : StatusBar.currentHeight || 0),
        paddingBottom: insets.bottom,
        ...(padding && {
          paddingHorizontal: spacing[4],
        }),
      },
      contentContainerStyle,
    ];

    if (scroll) {
      return shouldAnimate ? (
        <AnimatedScrollView
          style={[styles.scrollView, { backgroundColor: activeColors.background }]}
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
          entering={FadeIn.delay(50).duration(300)}
        >
          {children}
        </AnimatedScrollView>
      ) : (
        <ScrollView
          style={[styles.scrollView, { backgroundColor: activeColors.background }]}
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      );
    }

    return shouldAnimate ? (
      <AnimatedView style={[styles.contentContainer, contentStyle, style]} entering={FadeIn.delay(50).duration(300)}>
        {children}
      </AnimatedView>
    ) : (
      <View style={[styles.contentContainer, contentStyle, style]}>{children}</View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={activeColors.background} />

      {showHeader && (
        <View
          style={[
            styles.header,
            {
              backgroundColor: activeColors.card,
              borderBottomColor: activeColors.border,
              paddingTop: insets.top + (Platform.OS === "ios" ? 0 : StatusBar.currentHeight || 0),
              paddingBottom: spacing[2],
              paddingHorizontal: spacing[4],
            },
          ]}
        >
          {title ? (
            <Text variant="h3" style={{ color: activeColors.text }}>
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
