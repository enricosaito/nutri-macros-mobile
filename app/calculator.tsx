// app/calculator.tsx
import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import {
  Screen,
  Text,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  NumericInput,
  GoalSelector,
  Goal,
} from "../components";
import { useTheme } from "../src/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

// Define activity levels
const activityLevels = [
  { id: "sedentary", name: "Sedentário", description: "Pouco ou nenhum exercício" },
  { id: "light", name: "Levemente Ativo", description: "Exercício leve 1-3 dias/semana" },
  { id: "moderate", name: "Moderadamente Ativo", description: "Exercício moderado 3-5 dias/semana" },
  { id: "active", name: "Muito Ativo", description: "Exercício intenso 6-7 dias/semana" },
  { id: "extra_active", name: "Extremamente Ativo", description: "Exercício muito intenso, trabalho físico" },
];

// Define goals
const goals: Goal[] = [
  { id: "lose_weight", name: "Perder Peso", description: "Déficit calórico para perda de peso" },
  { id: "maintain", name: "Manter Peso", description: "Manutenção do peso atual" },
  { id: "gain_muscle", name: "Ganhar Músculo", description: "Superávit calórico para ganho muscular" },
];

function CalculatorScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  // State for user inputs
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("maintain");

  // Calculate BMR and TDEE
  const calculateBMR = () => {
    // Mifflin-St Jeor Equation
    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extra_active: 1.9,
    };

    const multiplier = activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    return bmr * multiplier;
  };

  // Calculate calorie needs based on goal
  const calculateCalories = () => {
    const tdee = calculateTDEE();
    const goalAdjustments = {
      lose_weight: tdee * 0.8, // 20% deficit
      maintain: tdee,
      gain_muscle: tdee * 1.1, // 10% surplus
    };

    return Math.round(goalAdjustments[goal as keyof typeof goalAdjustments]);
  };

  // Calculate macros
  const calculateMacros = () => {
    const calories = calculateCalories();
    let protein = 0;
    let fat = 0;
    let carbs = 0;

    // Set protein based on goal (g/kg of bodyweight)
    if (goal === "lose_weight") {
      protein = Math.round(weight * 2.2);
    } else if (goal === "maintain") {
      protein = Math.round(weight * 1.8);
    } else if (goal === "gain_muscle") {
      protein = Math.round(weight * 2);
    }

    // Set fat (minimum 25% of calories for hormonal health)
    fat = Math.round((calories * 0.25) / 9);

    // Remaining calories from carbs
    const remainingCalories = calories - protein * 4 - fat * 9;
    carbs = Math.round(remainingCalories / 4);

    return {
      protein,
      carbs,
      fat,
      calories,
    };
  };

  const handleCalculate = () => {
    const results = calculateMacros();
    router.push({
      pathname: "/results",
      params: {
        protein: results.protein,
        carbs: results.carbs,
        fat: results.fat,
        calories: results.calories,
      },
    });
  };

  return (
    <Screen title="Calculadora" showHeader={true} scroll={true}>
      {/* Introduction */}
      <Animated.View entering={FadeInDown.duration(600).springify()} style={{ marginBottom: theme.spacing[6] }}>
        <Text variant="body" color="muted" style={{ textAlign: "center" }}>
          Preencha suas informações para calcular suas necessidades diárias de macronutrientes.
        </Text>
      </Animated.View>

      {/* Gender Selection */}
      <Animated.View entering={FadeInUp.delay(100).duration(600).springify()}>
        <Card style={{ marginBottom: theme.spacing[4] }}>
          <CardHeader>
            <CardTitle>Sexo Biológico</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={{ flexDirection: "row", gap: theme.spacing[4] }}>
              <Button
                title="Masculino"
                variant={gender === "male" ? "default" : "outline"}
                onPress={() => setGender("male")}
                leftIcon={<Feather name="user" size={18} color={gender === "male" ? "white" : theme.colors.primary} />}
                style={{ flex: 1 }}
              />
              <Button
                title="Feminino"
                variant={gender === "female" ? "default" : "outline"}
                onPress={() => setGender("female")}
                leftIcon={
                  <Feather name="user" size={18} color={gender === "female" ? "white" : theme.colors.primary} />
                }
                style={{ flex: 1 }}
              />
            </View>
          </CardContent>
        </Card>
      </Animated.View>

      {/* Basic Info */}
      <Animated.View entering={FadeInUp.delay(200).duration(600).springify()}>
        <Card style={{ marginBottom: theme.spacing[4] }}>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={{ gap: theme.spacing[4] }}>
              <NumericInput label="Idade" value={age} onChange={setAge} min={15} max={100} unit="anos" />
              <NumericInput
                label="Peso"
                value={weight}
                onChange={setWeight}
                min={30}
                max={250}
                unit="kg"
                allowDecimal={true}
                step={0.5}
              />
              <NumericInput label="Altura" value={height} onChange={setHeight} min={100} max={250} unit="cm" />
            </View>
          </CardContent>
        </Card>
      </Animated.View>

      {/* Activity Level */}
      <Animated.View entering={FadeInUp.delay(300).duration(600).springify()}>
        <Card style={{ marginBottom: theme.spacing[4] }}>
          <CardHeader>
            <CardTitle>Nível de Atividade</CardTitle>
          </CardHeader>
          <CardContent>
            <GoalSelector goals={activityLevels} selectedGoalId={activityLevel} onSelectGoal={setActivityLevel} />
          </CardContent>
        </Card>
      </Animated.View>

      {/* Goal */}
      <Animated.View entering={FadeInUp.delay(400).duration(600).springify()}>
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <CardHeader>
            <CardTitle>Objetivo</CardTitle>
          </CardHeader>
          <CardContent>
            <GoalSelector goals={goals} selectedGoalId={goal} onSelectGoal={setGoal} />
          </CardContent>
        </Card>
      </Animated.View>

      {/* Calculate Button */}
      <Animated.View entering={FadeInUp.delay(500).duration(600).springify()}>
        <Button
          title="Calcular Macros"
          size="lg"
          onPress={handleCalculate}
          style={{ marginBottom: theme.spacing[6] }}
          rightIcon={<Feather name="arrow-right" size={18} color="white" />}
          fullWidth
        />
      </Animated.View>
    </Screen>
  );
}

export default CalculatorScreen;
