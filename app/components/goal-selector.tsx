import React from "react";
import { View, Pressable } from "react-native";
import { styled } from "nativewind";
import { Text } from "./ui/text";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const StyledView = styled(View);
const StyledPressable = styled(Pressable);
const AnimatedPressable = Animated.createAnimatedComponent(StyledPressable);

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
  return (
    <StyledView className={`space-y-3 ${className}`}>
      {goals.map((goal) => (
        <GoalOption
          key={goal.id}
          goal={goal}
          isSelected={goal.id === selectedGoalId}
          onPress={() => onSelectGoal(goal.id)}
        />
      ))}
    </StyledView>
  );
}

interface GoalOptionProps {
  goal: Goal;
  isSelected: boolean;
  onPress: () => void;
}

function GoalOption({ goal, isSelected, onPress }: GoalOptionProps) {
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
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      className={`border rounded-lg p-4 ${isSelected ? "border-primary-500 bg-primary-50" : "border-muted bg-white"}`}
    >
      <StyledView className="flex-row items-center justify-between">
        <StyledView className="flex-1">
          <Text variant="subtitle" color={isSelected ? "primary" : "foreground"}>
            {goal.name}
          </Text>
          <Text variant="caption" color="muted" className="mt-1">
            {goal.description}
          </Text>
        </StyledView>

        <StyledView
          className={`w-6 h-6 rounded-full border items-center justify-center ${
            isSelected ? "border-primary-500 bg-primary-500" : "border-muted"
          }`}
        >
          {isSelected && <StyledView className="w-3 h-3 rounded-full bg-white" />}
        </StyledView>
      </StyledView>
    </AnimatedPressable>
  );
}
