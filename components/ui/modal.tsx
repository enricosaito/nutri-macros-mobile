// components/ui/modal.tsx
import React from "react";
import { Modal as RNModal, View, TouchableWithoutFeedback, useColorScheme } from "react-native";
import { Text } from "./text";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ visible, onClose, children, className = "" }: ModalProps) {
  const isDark = useColorScheme() === "dark";

  return (
    <RNModal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <TouchableWithoutFeedback>
            <View
              className={`w-full max-w-[500px] rounded-xl border ${
                isDark ? "bg-[#121212] border-[#333333]" : "bg-white border-[#dfe5df]"
              } shadow-lg max-h-[80%] ${className}`}
            >
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
}

export function ModalHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const isDark = useColorScheme() === "dark";

  return (
    <View className={`p-6 border-b ${isDark ? "border-[#333333]" : "border-[#dfe5df]"} ${className}`}>{children}</View>
  );
}

export function ModalTitle({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <Text variant="h3" className={className}>
      {children}
    </Text>
  );
}

export function ModalBody({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <View className={`p-6 ${className}`}>{children}</View>;
}

export function ModalFooter({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const isDark = useColorScheme() === "dark";

  return (
    <View
      className={`p-6 border-t ${
        isDark ? "border-[#333333]" : "border-[#dfe5df]"
      } flex-row justify-end items-center ${className}`}
    >
      {children}
    </View>
  );
}
