import React from "react";
import { View, ViewProps, SafeAreaView, ScrollView } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  useSafeArea?: boolean;
  scroll?: boolean;
  centered?: boolean;
  padding?: boolean;
}

export function Container({
  children,
  useSafeArea = true,
  scroll = false,
  centered = false,
  padding = true,
  className = "",
  ...props
}: ContainerProps) {
  const paddingClass = padding ? "px-4" : "";
  const centeredClass = centered ? "items-center justify-center" : "";
  const containerClass = `flex-1 ${paddingClass} ${centeredClass} ${className}`;

  // If scrollable container
  if (scroll) {
    const Wrapper = useSafeArea ? StyledSafeAreaView : StyledView;

    return (
      <Wrapper className="flex-1" {...props}>
        <StyledScrollView
          className={containerClass}
          contentContainerStyle={centered ? { flexGrow: 1, justifyContent: "center" } : undefined}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </StyledScrollView>
      </Wrapper>
    );
  }

  // Non-scrollable container
  if (useSafeArea) {
    return (
      <StyledSafeAreaView className={`${containerClass}`} {...props}>
        {children}
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledView className={`${containerClass}`} {...props}>
      {children}
    </StyledView>
  );
}
