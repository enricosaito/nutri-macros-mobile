import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import {
  Screen,
  Text,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  NumericInput,
  GoalSelector,
  Goal,
} from "../components";

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);

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

export default function CalculatorScreen() {
  const router = useRouter();

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
    // In a real app, you'd probably use state management or context
    // But for simplicity, we're using URL params to pass the data
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
      <StyledView className="space-y-6 py-4">
        {/* Gender Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Sexo Biológico</CardTitle>
          </CardHeader>
          <CardContent className="flex-row space-x-4">
            <Button
              variant={gender === "male" ? "primary" : "outline"}
              onPress={() => setGender("male")}
              className="flex-1"
            >
              Masculino
            </Button>
            <Button
              variant={gender === "female" ? "primary" : "outline"}
              onPress={() => setGender("female")}
              className="flex-1"
            >
              Feminino
            </Button>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        {/* Activity Level */}
        <Card>
          <CardHeader>
            <CardTitle>Nível de Atividade</CardTitle>
          </CardHeader>
          <CardContent>
            <GoalSelector goals={activityLevels} selectedGoalId={activityLevel} onSelectGoal={setActivityLevel} />
          </CardContent>
        </Card>

        {/* Goal */}
        <Card>
          <CardHeader>
            <CardTitle>Objetivo</CardTitle>
          </CardHeader>
          <CardContent>
            <GoalSelector goals={goals} selectedGoalId={goal} onSelectGoal={setGoal} />
          </CardContent>
        </Card>

        {/* Calculate Button */}
        <Button size="lg" onPress={handleCalculate} className="my-4">
          Calcular Macros
        </Button>
      </StyledView>
    </Screen>
  );
}
