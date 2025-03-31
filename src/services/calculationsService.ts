import { supabase } from "../lib/supabase";

export type Calculation = {
  id?: string;
  user_id?: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  goal: string;
  created_at?: string;
};

export const calculationsService = {
  async getCalculations() {
    try {
      const { data, error } = await supabase.from("calculations").select("*").order("created_at", { ascending: false });

      if (error) throw error;

      return data as Calculation[];
    } catch (error) {
      console.error("Error fetching calculations:", error);
      throw error;
    }
  },

  async addCalculation(calculation: Calculation) {
    try {
      const { data, error } = await supabase.from("calculations").insert(calculation).select().single();

      if (error) throw error;

      return data as Calculation;
    } catch (error) {
      console.error("Error adding calculation:", error);
      throw error;
    }
  },

  async deleteCalculation(id: string) {
    try {
      const { error } = await supabase.from("calculations").delete().eq("id", id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error("Error deleting calculation:", error);
      throw error;
    }
  },
};
