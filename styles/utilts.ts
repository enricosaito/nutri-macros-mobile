import { StyleSheet } from "react-native";
import theme from "./theme";

// Helper function to create styles with theme access
export function createStyles(stylesCallback: (theme: typeof theme) => any) {
  return StyleSheet.create(stylesCallback(theme));
}

// Example usage:
// const styles = createStyles((theme) => ({
//   container: {
//     backgroundColor: theme.colors.background,
//     padding: theme.spacing[4],
//   },
//   title: {
//     fontSize: theme.typography.fontSizes['2xl'],
//     fontWeight: theme.typography.fontWeights.bold,
//     color: theme.colors.primary[600],
//   },
// }));
