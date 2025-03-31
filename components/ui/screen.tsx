import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ViewStyle,
  StatusBar,
  useColorScheme,
  Platform,
} from "react-native";
import { Text } from "./text";
import { colors, darkColors, spacing } from "../../src/styles/globalStyles";
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
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    const contentStyle = [
      styles.content,
      {
        paddingTop: showHeader ? 0 : insets.top,
        // Remove paddingBottom to not add extra space
        ...(padding && {
          paddingHorizontal: spacing[4],
        }),
      },
      contentContainerStyle,
    ];

    if (scroll) {
      return (
        <AnimatedScrollView
          style={[styles.scrollView, { backgroundColor: activeColors.background }]}
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
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={activeColors.background}
        translucent={true}
      />

      {showHeader && (
        <View
          style={[
            styles.header,
            {
              backgroundColor: activeColors.card,
              borderBottomColor: activeColors.border,
              paddingTop: insets.top + (Platform.OS === "ios" ? 0 : spacing[2]),
              paddingBottom: spacing[2],
              paddingHorizontal: spacing[4],
              height: insets.top + spacing[12],
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
