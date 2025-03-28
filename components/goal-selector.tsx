// components/goal-selector.tsx
import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "./ui/text";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "../src/context/ThemeContext";

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
  className?: string;
}

export function GoalSelector({ goals, selectedGoalId, onSelectGoal, className = "" }: GoalSelectorProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing[3] }}>
      {goals.map((goal) => (
        <GoalOption
          key={goal.id}
          goal={goal}
          isSelected={goal.id === selectedGoalId}
          onPress={() => onSelectGoal(goal.id)}
        />
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
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <AnimatedPressable
      style={[
        animatedStyle,
        styles.optionContainer,
        {
          borderWidth: 1,
          borderRadius: theme.radius.lg,
          padding: theme.spacing[4],
          borderColor: isSelected ? theme.colors.primary : theme.colors.border,
          backgroundColor: isSelected ? `${theme.colors.primary}10` : theme.colors.card,
        },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <View style={styles.optionContent}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: isSelected ? theme.colors.primary : theme.colors.foreground,
              marginBottom: theme.spacing[1],
            }}
          >
            {goal.name}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.mutedForeground,
            }}
          >
            {goal.description}
          </Text>
        </View>

        <View
          style={[
            styles.radioCircle,
            {
              borderColor: isSelected ? theme.colors.primary : theme.colors.border,
              backgroundColor: isSelected ? theme.colors.primary : "transparent",
            },
          ]}
        >
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  optionContainer: {},
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
