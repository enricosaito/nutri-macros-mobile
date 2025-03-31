import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Calculation, calculationsService } from "../services/calculationsService";
import { useAuth } from "./AuthContext";

type UserDataContextType = {
  calculations: Calculation[];
  loading: boolean;
  error: string | null;
  addCalculation: (calculation: Omit<Calculation, "id" | "user_id" | "created_at">) => Promise<void>;
  deleteCalculation: (id: string) => Promise<void>;
  refreshCalculations: () => Promise<void>;
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCalculations = async () => {
    if (!user) {
      setCalculations([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await calculationsService.getCalculations();
      setCalculations(data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch calculations");
      console.error("Error fetching calculations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load calculations when user changes
  useEffect(() => {
    refreshCalculations();
  }, [user]);

  const addCalculation = async (calculation: Omit<Calculation, "id" | "user_id" | "created_at">) => {
    try {
      setLoading(true);
      setError(null);

      // For unauthenticated users, store locally
      if (!user) {
        const newCalc = {
          ...calculation,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
        };

        // Limit to 3 for unauthenticated users
        const newCalculations = [...calculations, newCalc];
        if (newCalculations.length > 3) {
          newCalculations.shift();
        }

        setCalculations(newCalculations);
        return;
      }

      // For authenticated users, store in Supabase
      const newCalculation = await calculationsService.addCalculation({
        ...calculation,
        user_id: user.id,
      });

      setCalculations((prev) => [newCalculation, ...prev]);
    } catch (error: any) {
      setError(error.message || "Failed to add calculation");
      console.error("Error adding calculation:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCalculation = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // For unauthenticated users
      if (!user) {
        setCalculations((prev) => prev.filter((calc) => calc.id !== id));
        return;
      }

      // For authenticated users
      await calculationsService.deleteCalculation(id);
      setCalculations((prev) => prev.filter((calc) => calc.id !== id));
    } catch (error: any) {
      setError(error.message || "Failed to delete calculation");
      console.error("Error deleting calculation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        calculations,
        loading,
        error,
        addCalculation,
        deleteCalculation,
        refreshCalculations,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
