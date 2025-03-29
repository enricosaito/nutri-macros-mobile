// components/goal-selector.tsx
import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "./ui/text";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, FadeInDown } from "react-native-reanimated";
import { useTheme } from "../src/context/ThemeContext";
import { Feather } from "@expo/vector-icons";

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
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing[3] }}>
      {goals.map((goal, index) => (
        <Animated.View
          key={goal.id}
          entering={FadeInDown.delay(index * 100)
            .duration(400)
            .springify()}
        >
          <GoalOption goal={goal} isSelected={goal.id === selectedGoalId} onPress={() => onSelectGoal(goal.id)} />
        </Animated.View>
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
          borderWidth: isSelected ? 2 : 1,
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
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.medium as any,
              color: isSelected ? theme.colors.primary : theme.colors.foreground,
              marginBottom: theme.spacing[1],
            }}
          >
            {goal.name}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
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
