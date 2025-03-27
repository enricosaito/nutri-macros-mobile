import React, { useEffect } from "react";
import { View } from "react-native";
import { styled } from "nativewind";
import { Text } from "./ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedReaction,
  SharedValue,
} from "react-native-reanimated";

const StyledView = styled(View);
const AnimatedView = Animated.createAnimatedComponent(StyledView);

interface MacroData {
  protein: number;
  carbs: number;
  fat: number;
}

interface MacroDisplayProps {
  macros: MacroData;
  calories: number;
  showPercentages?: boolean;
  className?: string;
}

export function MacroDisplay({ macros, calories, showPercentages = true, className = "" }: MacroDisplayProps) {
  // Animated values for each macro
  const proteinWidth = useSharedValue(0);
  const carbsWidth = useSharedValue(0);
  const fatWidth = useSharedValue(0);

  // Calculate total and percentages
  const totalGrams = macros.protein + macros.carbs + macros.fat;
  const proteinPercent = totalGrams > 0 ? (macros.protein / totalGrams) * 100 : 0;
  const carbsPercent = totalGrams > 0 ? (macros.carbs / totalGrams) * 100 : 0;
  const fatPercent = totalGrams > 0 ? (macros.fat / totalGrams) * 100 : 0;

  // Calculate calories from each macro
  const proteinCalories = macros.protein * 4;
  const carbsCalories = macros.carbs * 4;
  const fatCalories = macros.fat * 9;

  // Update animated values when macros change
  useEffect(() => {
    proteinWidth.value = withTiming(proteinPercent, { duration: 500 });
    carbsWidth.value = withTiming(carbsPercent, { duration: 500 });
    fatWidth.value = withTiming(fatPercent, { duration: 500 });
  }, [macros, proteinPercent, carbsPercent, fatPercent]);

  // Animated styles for progress bars
  const proteinAnimStyle = useAnimatedStyle(() => {
    return {
      width: `${proteinWidth.value}%`,
    };
  });

  const carbsAnimStyle = useAnimatedStyle(() => {
    return {
      width: `${carbsWidth.value}%`,
    };
  });

  const fatAnimStyle = useAnimatedStyle(() => {
    return {
      width: `${fatWidth.value}%`,
    };
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Distribuição de Macronutrientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Text variant="h3" className="text-center mb-3">
          {calories} kcal
        </Text>

        {/* Progress bar */}
        <StyledView className="h-8 flex-row rounded-md overflow-hidden mb-4">
          <AnimatedView style={proteinAnimStyle} className="bg-blue-500 h-full" />
          <AnimatedView style={carbsAnimStyle} className="bg-green-500 h-full" />
          <AnimatedView style={fatAnimStyle} className="bg-yellow-500 h-full" />
        </StyledView>

        {/* Macros detail */}
        <StyledView className="space-y-4">
          <MacroRow
            label="Proteína"
            grams={macros.protein}
            calories={proteinCalories}
            percent={proteinPercent}
            showPercent={showPercentages}
            color="bg-blue-500"
          />

          <MacroRow
            label="Carboidratos"
            grams={macros.carbs}
            calories={carbsCalories}
            percent={carbsPercent}
            showPercent={showPercentages}
            color="bg-green-500"
          />

          <MacroRow
            label="Gordura"
            grams={macros.fat}
            calories={fatCalories}
            percent={fatPercent}
            showPercent={showPercentages}
            color="bg-yellow-500"
          />
        </StyledView>
      </CardContent>
    </Card>
  );
}

interface MacroRowProps {
  label: string;
  grams: number;
  calories: number;
  percent: number;
  showPercent: boolean;
  color: string;
}

function MacroRow({ label, grams, calories, percent, showPercent, color }: MacroRowProps) {
  return (
    <StyledView className="flex-row items-center">
      <StyledView className={`w-4 h-4 rounded-full ${color} mr-2`} />
      <Text variant="subtitle" className="flex-1">
        {label}
      </Text>
      <StyledView className="flex-row space-x-2">
        <Text variant="body">{grams}g</Text>
        <Text variant="body" color="muted">
          {calories} kcal
        </Text>
        {showPercent && (
          <Text variant="body" color="muted">
            {Math.round(percent)}%
          </Text>
        )}
      </StyledView>
    </StyledView>
  );
}
