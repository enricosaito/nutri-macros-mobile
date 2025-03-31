import React from "react";
import { View, Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text } from "./ui/text";
import { colors, darkColors, spacing, radius } from "../src/styles/globalStyles";
import { Feather } from "@expo/vector-icons";

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

  return (
    <View style={{ gap: spacing[3] }}>
      {goals.map((goal) => (
        <Pressable
          key={`goal-${goal.id}`}
          style={[
            styles.optionContainer,
            {
              borderWidth: goal.id === selectedGoalId ? 2 : 1,
              borderRadius: radius.lg,
              padding: spacing[4],
              borderColor: goal.id === selectedGoalId ? activeColors.primary : activeColors.border,
              backgroundColor: goal.id === selectedGoalId ? `${activeColors.primary}10` : activeColors.card,
            },
          ]}
          onPress={() => onSelectGoal(goal.id)}
        >
          <View style={styles.optionContent}>
            <View style={{ flex: 1 }}>
              <Text
                variant="subtitle"
                style={{
                  color: goal.id === selectedGoalId ? activeColors.primary : activeColors.text,
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
                  borderColor: goal.id === selectedGoalId ? activeColors.primary : activeColors.border,
                  backgroundColor: goal.id === selectedGoalId ? activeColors.primary : "transparent",
                },
              ]}
            >
              {goal.id === selectedGoalId && <Feather name="check" size={14} color="white" />}
            </View>
          </View>
        </Pressable>
      ))}
    </View>
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
