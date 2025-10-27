import React, { createContext, useState, useContext, ReactNode } from "react";
import { DiaryEntry, FoodItem, MealType } from "@/types/foods";

interface DiaryContextData {
  entries: DiaryEntry[];
  goal: number;
  addFoodToDiary: (food: FoodItem, mealType: MealType) => void;
  deleteFoodFromDiary: (entryId: string) => void;
  setGoal: (newGoal: number) => void;
}

const DiaryContext = createContext<DiaryContextData | undefined>(undefined);

export function DiaryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [goal, setGoal] = useState(1800);

  const addFoodToDiary = (food: FoodItem, mealType: MealType) => {
    const newEntry: DiaryEntry = {
      id: String(new Date().getTime()),
      food: food,
      mealType: mealType,
    };
    setEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  // 2. CRIE A FUNÇÃO DE DELETAR
  const deleteFoodFromDiary = (entryId: string) => {
    setEntries((prevEntries) =>
      prevEntries.filter((entry) => entry.id !== entryId)
    );
    console.log("Item removido:", entryId);
  };

  return (
    <DiaryContext.Provider
      value={{
        entries,
        goal,
        setGoal,
        addFoodToDiary,
        deleteFoodFromDiary,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary() {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error("useDiary deve ser usado dentro de um DiaryProvider");
  }
  return context;
}
