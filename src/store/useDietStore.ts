import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { Diet, Meal, getAllDiets } from "@/services/dietService";

interface DietState {
  diets: Diet[];
  meals: Meal[];
  loadDiets: () => void;
  addMeal: (meal: Meal) => void;
  clearMeals: () => void;
}

export const useDietStore = create<DietState>()(
  persist(
    (set, get) => ({
      diets: [],
      meals: [],

      loadDiets: () => {
        const allDiets = getAllDiets();
        set({ diets: allDiets });

        const allMeals = allDiets.flatMap((d) => d.meals);
        set({ meals: allMeals });
      },

      addMeal: (meal) =>
        set((state) => ({
          meals: [...state.meals, meal],
        })),

      clearMeals: () => set({ meals: [] }),
    }),
    {
      name: "diet-storage", 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
