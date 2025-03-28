// src/components/ui/screen.tsx
import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, ViewStyle, StatusBar } from "react-native";
import { Text } from "./text";
import { useTheme } from "../../context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps {
  children: React.ReactNode;
  title?: string;
  headerRight?: React.ReactNode;
  showHeader?: boolean;
  scroll?: boolean;
  padding?: boolean;
  style?: ViewStyle;
}

export function Screen({
  children,
  title,
  headerRight,
  showHeader = true,
  scroll = true,
  padding = true,
  style,
}: ScreenProps) {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    const contentStyle = [
      styles.content,
      {
        ...(padding && {
          paddingHorizontal: theme.spacing[4],
        }),
      },
      style,
    ];

    if (scroll) {
      return (
        <ScrollView
          style={[styles.scrollView, { backgroundColor: theme.colors.background }]}
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      );
    }

    return <View style={contentStyle}>{children}</View>;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={theme.colors.card} />

      {showHeader && (
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.colors.card,
              borderBottomColor: theme.colors.border,
              paddingHorizontal: theme.spacing[4],
              paddingVertical: theme.spacing[4],
            },
          ]}
        >
          {title ? <Text variant="h3">{title}</Text> : <View />}
          {headerRight ? <View>{headerRight}</View> : null}
        </View>
      )}

      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
