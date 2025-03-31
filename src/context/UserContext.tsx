import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserProviderProps {
  children: ReactNode;
}

type CalculationResult = {
  id: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  goal: string;
};

type UserContextType = {
  isAuthenticated: boolean;
  calculations: CalculationResult[];
  addCalculation: (result: CalculationResult) => Promise<void>;
  removeCalculation: (id: string) => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [calculations, setCalculations] = useState<CalculationResult[]>([]);

  // Load data from AsyncStorage on init
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedCalculations = await AsyncStorage.getItem("calculations");
        if (storedCalculations) {
          setCalculations(JSON.parse(storedCalculations));
        }

        // Check if user is authenticated
        const authStatus = await AsyncStorage.getItem("authStatus");
        setIsAuthenticated(authStatus === "true");
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    loadData();
  }, []);

  const addCalculation = async (result: CalculationResult) => {
    try {
      // For anonymous users, limit to 3 calculations
      const newCalculations = [...calculations, result];
      if (!isAuthenticated && newCalculations.length > 3) {
        newCalculations.shift(); // Remove oldest calculation
      }

      setCalculations(newCalculations);
      await AsyncStorage.setItem("calculations", JSON.stringify(newCalculations));
    } catch (error) {
      console.error("Error saving calculation", error);
    }
  };

  const removeCalculation = async (id: string) => {
    try {
      const newCalculations = calculations.filter((calc) => calc.id !== id);
      setCalculations(newCalculations);
      await AsyncStorage.setItem("calculations", JSON.stringify(newCalculations));
    } catch (error) {
      console.error("Error removing calculation", error);
    }
  };

  // Mock sign-in functionality (to be replaced with actual OAuth)
  const signIn = async () => {
    // In a real implementation, this would handle OAuth flow
    setIsAuthenticated(true);
    await AsyncStorage.setItem("authStatus", "true");
  };

  const signOut = async () => {
    setIsAuthenticated(false);
    await AsyncStorage.setItem("authStatus", "false");
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        calculations,
        addCalculation,
        removeCalculation,
        signIn,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
