// components/ui/modal.tsx
import React from "react";
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Text } from "./text";
import { colors, darkColors, spacing, radius } from "../../src/styles/globalStyles";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: any;
}

export function Modal({ visible, onClose, children, style }: ModalProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  return (
    <RNModal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.content,
                {
                  backgroundColor: activeColors.card,
                  borderColor: activeColors.border,
                  borderRadius: radius.xl,
                  borderWidth: 1,
                },
                style,
              ]}
            >
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
}

export function ModalHeader({ style, children }: { style?: any; children: React.ReactNode }) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  return (
    <View
      style={[
        styles.header,
        {
          padding: spacing[6],
          borderBottomWidth: 1,
          borderBottomColor: activeColors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function ModalTitle({ style, children }: { style?: any; children: React.ReactNode }) {
  return (
    <Text variant="h3" style={[style]}>
      {children}
    </Text>
  );
}

export function ModalBody({ style, children }: { style?: any; children: React.ReactNode }) {
  return <View style={[styles.body, { padding: spacing[6] }, style]}>{children}</View>;
}

export function ModalFooter({ style, children }: { style?: any; children: React.ReactNode }) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  return (
    <View
      style={[
        styles.footer,
        {
          padding: spacing[6],
          borderTopWidth: 1,
          borderTopColor: activeColors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: spacing[4],
  },
  content: {
    width: "100%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: "80%",
  },
  header: {},
  body: {},
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
