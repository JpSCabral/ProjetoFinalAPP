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
