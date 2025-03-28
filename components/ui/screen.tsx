import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, ViewStyle, StatusBar } from "react-native";
import { Text } from "./text";
import { theme } from "../../styles/theme";
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
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    const contentStyle = [styles.content, padding && styles.contentPadded, style];

    if (scroll) {
      return (
        <ScrollView style={styles.scrollView} contentContainerStyle={contentStyle} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      );
    }

    return <View style={contentStyle}>{children}</View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {showHeader && (
        <View style={styles.header}>
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
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentPadded: {
    paddingHorizontal: theme.spacing.md,
  },
});
