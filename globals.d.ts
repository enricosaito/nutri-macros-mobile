// globals.d.ts
import type { PropsWithChildren } from "react";
import type { TextProps as RNTextProps, ViewProps } from "react-native";

// Add className to React Native components
declare module "react-native" {
  interface TextProps extends RNTextProps {
    className?: string;
  }

  interface ViewProps {
    className?: string;
  }

  interface TouchableOpacityProps {
    className?: string;
  }

  interface TextInputProps {
    className?: string;
  }

  interface ImageProps {
    className?: string;
  }

  interface ScrollViewProps {
    className?: string;
    contentContainerClassName?: string;
  }
}
