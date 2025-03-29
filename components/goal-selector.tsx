// components/goal-selector.tsx
import React from "react";
import { View, Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text } from "./ui/text";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, FadeInDown } from "react-native-reanimated";
import { colors, darkColors, spacing, radius } from "../src/styles/globalStyles";
import { Feather } from "@expo/vector-icons";
import { useAnimationsEnabled } from "../src/utils/animation";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface Goal {
  id: string;
  name: string;
  description: string;
}

interface GoalSelectorProps {
  goals: Goal[];
  selectedGoalId: string;
  onSelectGoal: (goalId: string) => void;
}

export function GoalSelector({ goals, selectedGoalId, onSelectGoal }: GoalSelectorProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const animationsEnabled = useAnimationsEnabled();

  const AnimatedContainer = animationsEnabled ? Animated.View : View;

  return (
    <View style={{ gap: spacing[3] }}>
      {goals.map((goal, index) => (
        <AnimatedContainer
          key={`goal-${goal.id}`}
          entering={
            animationsEnabled
              ? FadeInDown.delay(index * 100)
                  .duration(400)
                  .springify()
              : undefined
          }
        >
          <GoalOption goal={goal} isSelected={goal.id === selectedGoalId} onPress={() => onSelectGoal(goal.id)} />
        </AnimatedContainer>
      ))}
    </View>
  );
}

interface GoalOptionProps {
  goal: Goal;
  isSelected: boolean;
  onPress: () => void;
}

function GoalOption({ goal, isSelected, onPress }: GoalOptionProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const scale = useSharedValue(1);
  const animationsEnabled = useAnimationsEnabled();

  const handlePressIn = () => {
    if (animationsEnabled) {
      scale.value = withTiming(0.98, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (animationsEnabled) {
      scale.value = withTiming(1, { duration: 100 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Use regular Pressable if animations are disabled
  if (!animationsEnabled) {
    return (
      <Pressable
        style={[
          styles.optionContainer,
          {
            borderWidth: isSelected ? 2 : 1,
            borderRadius: radius.lg,
            padding: spacing[4],
            borderColor: isSelected ? activeColors.primary : activeColors.border,
            backgroundColor: isSelected ? `${activeColors.primary}10` : activeColors.card,
          },
        ]}
        onPress={onPress}
      >
        <View style={styles.optionContent}>
          <View style={{ flex: 1 }}>
            <Text
              variant="subtitle"
              style={{
                color: isSelected ? activeColors.primary : activeColors.text,
                marginBottom: spacing[1],
              }}
            >
              {goal.name}
            </Text>
            <Text variant="caption">{goal.description}</Text>
          </View>

          <View
            style={[
              styles.radioCircle,
              {
                borderColor: isSelected ? activeColors.primary : activeColors.border,
                backgroundColor: isSelected ? activeColors.primary : "transparent",
              },
            ]}
          >
            {isSelected && <Feather name="check" size={14} color="white" />}
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <AnimatedPressable
      style={[
        animatedStyle,
        styles.optionContainer,
        {
          borderWidth: isSelected ? 2 : 1,
          borderRadius: radius.lg,
          padding: spacing[4],
          borderColor: isSelected ? activeColors.primary : activeColors.border,
          backgroundColor: isSelected ? `${activeColors.primary}10` : activeColors.card,
        },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <View style={styles.optionContent}>
        <View style={{ flex: 1 }}>
          <Text
            variant="subtitle"
            style={{
              color: isSelected ? activeColors.primary : activeColors.text,
              marginBottom: spacing[1],
            }}
          >
            {goal.name}
          </Text>
          <Text variant="caption">{goal.description}</Text>
        </View>

        <View
          style={[
            styles.radioCircle,
            {
              borderColor: isSelected ? activeColors.primary : activeColors.border,
              backgroundColor: isSelected ? activeColors.primary : "transparent",
            },
          ]}
        >
          {isSelected && <Feather name="check" size={14} color="white" />}
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
