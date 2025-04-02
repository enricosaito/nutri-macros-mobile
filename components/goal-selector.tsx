import React from "react";
import { View, Pressable, useColorScheme } from "react-native";
import { Text } from "./ui/text";
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
  className?: string;
}

export function GoalSelector({ goals, selectedGoalId, onSelectGoal, className = "" }: GoalSelectorProps) {
  const isDark = useColorScheme() === "dark";

  return (
    <View className={`gap-3 ${className}`}>
      {goals.map((goal) => {
        const isSelected = goal.id === selectedGoalId;

        return (
          <Pressable
            key={`goal-${goal.id}`}
            className={`rounded-lg shadow-sm overflow-hidden ${
              isSelected
                ? `border-2 ${isDark ? "border-[#2ac46e] bg-[#2ac46e]/10" : "border-[#22c069] bg-[#22c069]/10"}`
                : `border ${isDark ? "border-[#333333] bg-[#121212]" : "border-[#dfe5df] bg-white"}`
            } p-4`}
            onPress={() => onSelectGoal(goal.id)}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text
                  variant="subtitle"
                  className={`mb-1 ${isSelected ? (isDark ? "text-[#2ac46e]" : "text-[#22c069]") : ""}`}
                >
                  {goal.name}
                </Text>
                <Text variant="caption">{goal.description}</Text>
              </View>

              <View
                className={`w-6 h-6 rounded-full items-center justify-center ${
                  isSelected
                    ? isDark
                      ? "bg-[#2ac46e] border-[#2ac46e]"
                      : "bg-[#22c069] border-[#22c069]"
                    : `border-2 ${isDark ? "border-[#333333]" : "border-[#dfe5df]"}`
                }`}
              >
                {isSelected && <Feather name="check" size={14} color="white" />}
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
