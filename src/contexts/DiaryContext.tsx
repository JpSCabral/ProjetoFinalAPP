import React, { createContext, useState, useContext, ReactNode } from "react";
import { DiaryEntry } from "@/types";

interface DiaryContextData {
  entries: DiaryEntry[];
  goal: number;
  addEntry: (entry: DiaryEntry) => void;
  removeEntry: (id: string) => void;
  replaceEntry: (oldId: string, newEntry: DiaryEntry) => void; // Função de substituir
}

const DiaryContext = createContext<DiaryContextData>({} as DiaryContextData);

export function DiaryProvider({ children }: { children: ReactNode }) {
  // Meta fixa (pode vir de config depois)
  const [goal] = useState(2000);

  // Dados iniciais (Mock) para não abrir o app vazio
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

  // --- 1. ADICIONAR ---
  function addEntry(newEntry: DiaryEntry) {
    setEntries((prevState) => [...prevState, newEntry]);
  }

  // --- 2. REMOVER ---
  function removeEntry(id: string) {
    setEntries((prevState) => prevState.filter((item) => item.id !== id));
  }

  // --- 3. SUBSTITUIR ---
  function replaceEntry(oldId: string, newEntry: DiaryEntry) {
    setEntries((prevState) =>
      prevState.map((item) => (item.id === oldId ? newEntry : item))
    );
  }

  return (
    <DiaryContext.Provider
      value={{ entries, goal, addEntry, removeEntry, replaceEntry }}
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
