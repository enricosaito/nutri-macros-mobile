// components/macro-display.tsx
import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle, useColorScheme, TextStyle } from "react-native";
import { Text } from "./ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, FadeIn, SlideInRight } from "react-native-reanimated";
import { colors, darkColors, spacing } from "../src/styles/globalStyles";
import { Feather } from "@expo/vector-icons";
import { useAnimationsEnabled } from "../src/utils/animation";

const AnimatedView = Animated.createAnimatedComponent(View);

interface MacroData {
  protein: number;
  carbs: number;
  fat: number;
}

interface MacroDisplayProps {
  macros: MacroData;
  calories: number;
  showPercentages?: boolean;
  style?: ViewStyle;
}

export function MacroDisplay({ macros, calories, showPercentages = true, style }: MacroDisplayProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const animationsEnabled = useAnimationsEnabled();

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
    if (animationsEnabled) {
      proteinWidth.value = withTiming(proteinPercent, { duration: 800 });
      carbsWidth.value = withTiming(carbsPercent, { duration: 800 });
      fatWidth.value = withTiming(fatPercent, { duration: 800 });
    } else {
      proteinWidth.value = proteinPercent;
      carbsWidth.value = carbsPercent;
      fatWidth.value = fatPercent;
    }
  }, [macros, proteinPercent, carbsPercent, fatPercent, proteinWidth, carbsWidth, fatWidth, animationsEnabled]);

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

  // Use chart colors
  const proteinColor = activeColors.chart3;
  const carbsColor = activeColors.chart1;
  const fatColor = activeColors.chart5;

  // Define the macro rows
  const macroRows = [
    {
      label: "Proteína",
      grams: macros.protein,
      calories: proteinCalories,
      percent: proteinPercent,
      color: proteinColor,
      icon: "target",
      delay: 0,
      key: "protein",
    },
    {
      label: "Carboidratos",
      grams: macros.carbs,
      calories: carbsCalories,
      percent: carbsPercent,
      color: carbsColor,
      icon: "circle",
      delay: 100,
      key: "carbs",
    },
    {
      label: "Gordura",
      grams: macros.fat,
      calories: fatCalories,
      percent: fatPercent,
      color: fatColor,
      icon: "droplet",
      delay: 200,
      key: "fat",
    },
  ];

  const AnimatedContainer = animationsEnabled ? Animated.View : View;

  return (
    <Card style={style}>
      <CardHeader>
        <CardTitle>Distribuição de Macronutrientes</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatedContainer entering={animationsEnabled ? FadeIn.delay(300).duration(500) : undefined}>
          <Text
            variant="h2"
            color="primary"
            style={{
              textAlign: "center",
              marginBottom: spacing[4],
            }}
          >
            {calories} kcal
          </Text>

          {/* Progress bar */}
          <View
            style={{
              flexDirection: "row",
              overflow: "hidden",
              borderRadius: 8,
              backgroundColor: activeColors.muted,
              height: 16,
              marginVertical: spacing[4],
            }}
          >
            <AnimatedView style={[{ height: "100%" }, proteinAnimStyle, { backgroundColor: proteinColor }]} />
            <AnimatedView style={[{ height: "100%" }, carbsAnimStyle, { backgroundColor: carbsColor }]} />
            <AnimatedView style={[{ height: "100%" }, fatAnimStyle, { backgroundColor: fatColor }]} />
          </View>

          {/* Macros detail */}
          <View style={{ marginTop: spacing[4] }}>
            {macroRows.map((row) => (
              <MacroRow
                key={row.key}
                label={row.label}
                grams={row.grams}
                calories={row.calories}
                percent={row.percent}
                showPercent={showPercentages}
                color={row.color}
                icon={row.icon}
                delay={row.delay}
              />
            ))}
          </View>
        </AnimatedContainer>
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
  icon: string;
  delay: number;
}

function MacroRow({ label, grams, calories, percent, showPercent, color, icon, delay }: MacroRowProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const animationsEnabled = useAnimationsEnabled();

  const AnimatedContainer = animationsEnabled ? Animated.View : View;

  return (
    <AnimatedContainer
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing[3],
      }}
      entering={animationsEnabled ? SlideInRight.delay(delay).springify() : undefined}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: color,
          alignItems: "center",
          justifyContent: "center",
          marginRight: spacing[2],
        }}
      >
        <Feather name={icon as any} size={12} color="white" />
      </View>
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          fontWeight: "500" as TextStyle["fontWeight"],
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600" as TextStyle["fontWeight"],
            marginRight: spacing[2],
          }}
        >
          {grams}g
        </Text>
        <Text
          variant="caption"
          color="muted"
          style={{
            marginRight: spacing[2],
          }}
        >
          {calories} kcal
        </Text>
        {showPercent && (
          <Text
            variant="caption"
            color="muted"
            style={{
              minWidth: 40,
              textAlign: "right",
            }}
          >
            {Math.round(percent)}%
          </Text>
        )}
      </View>
    </AnimatedContainer>
  );
}
