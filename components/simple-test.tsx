import React from "react";
import { View, Text } from "react-native";
import { createStyles } from "../styles/utils";

// A very basic component
export function SimpleTest() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Theme System</Text>
      <Text style={styles.text}>This component is using the centralized theme system</Text>
    </View>
  );
}

// Using the theme system instead of hardcoded values
const styles = createStyles((theme) => ({
  container: {
    padding: theme.spacing[4],
    margin: theme.spacing[4],
    backgroundColor: theme.colors.muted.DEFAULT,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.DEFAULT,
  },
  title: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    marginBottom: theme.spacing[2],
    color: theme.colors.foreground,
  },
  text: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.muted.foreground,
  },
}));
