import React, { createContext, useState, useContext, ReactNode } from "react";
import { DiaryEntry } from "@/types";

interface DiaryContextData {
  entries: DiaryEntry[];
  goal: number;
  addEntry: (entry: DiaryEntry) => void;
  removeEntry: (id: string) => void;
  replaceEntry: (oldId: string, newEntry: DiaryEntry) => void;
  updateGoal: (newGoal: number) => void;
}

const DiaryContext = createContext<DiaryContextData>({} as DiaryContextData);

export function DiaryProvider({ children }: { children: ReactNode }) {
  // Estado da Meta (Começa com 2000, mas pode ser mudado)
  const [goal, setGoal] = useState(2000);

  // Mock Data inicial
  const today = new Date().toISOString();
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: "1",
      date: today,
      mealType: "Café da manha",
      food: {
        id: "f1",
        name: "Pão Francês",
        calories: 140,
        unit: "1 un",
        protein: 4,
        carbs: 28,
        fats: 0,
      },
    },
    {
      id: "2",
      date: today,
      mealType: "Café da manha",
      food: {
        id: "f2",
        name: "Ovo Vermelho",
        calories: 60,
        unit: "1 un",
        protein: 14,
        carbs: 22,
        fats: 20,
      },
    },
    {
      id: "3",
      date: today,
      mealType: "Almoço",
      food: {
        id: "f2",
        name: "Frango Grelhado",
        calories: 160,
        unit: "150g",
        protein: 30,
        carbs: 0,
        fats: 4,
      },
    },
    {
      id: "7",
      date: today,
      mealType: "Almoço",
      food: {
        id: "f7",
        name: "Arroz Branco",
        calories: 140,
        unit: "150g",
        protein: 10,
        carbs: 40,
        fats: 4,
      },
    },
    {
      id: "8",
      date: today,
      mealType: "Lanche",
      food: {
        id: "f8",
        name: "Tapioca",
        calories: 150,
        unit: "150g",
        protein: 30,
        carbs: 60,
        fats: 14,
      },
    },
    {
      id: "4",
      date: today,
      mealType: "Jantar",
      food: {
        id: "f4",
        name: "Frango Grelhado",
        calories: 160,
        unit: "150g",
        protein: 30,
        carbs: 0,
        fats: 4,
      },
    },
    {
      id: "5",
      date: today,
      mealType: "Jantar",
      food: {
        id: "f5",
        name: "Arroz Branco",
        calories: 200,
        unit: "200g",
        protein: 12,
        carbs: 45,
        fats: 0,
      },
    },
    {
      id: "6",
      date: today,
      mealType: "Jantar",
      food: {
        id: "f6",
        name: "Vegetais",
        calories: 140,
        unit: "100g",
        protein: 32,
        carbs: 25,
        fats: 0,
      },
    },
  ]);

  function addEntry(newEntry: DiaryEntry) {
    setEntries((prevState) => [...prevState, newEntry]);
  }

  function removeEntry(id: string) {
    setEntries((prevState) => prevState.filter((item) => item.id !== id));
  }

  function replaceEntry(oldId: string, newEntry: DiaryEntry) {
    setEntries((prevState) =>
      prevState.map((item) => (item.id === oldId ? newEntry : item))
    );
  }

  // --- 2. IMPLEMENTAÇÃO DA FUNÇÃO ---
  function updateGoal(newGoal: number) {
    setGoal(newGoal);
  }

  return (
    <DiaryContext.Provider
      value={{ entries, goal, addEntry, removeEntry, replaceEntry, updateGoal }}
    >
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary() {
  const context = useContext(DiaryContext);
  if (!context)
    throw new Error("useDiary deve ser usado dentro de um DiaryProvider");
  return context;
}
