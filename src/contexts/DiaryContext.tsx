// src/contexts/DiaryContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import { MealDefinition, DiaryEntry } from "@/types";

interface DiaryContextData {
  meals: MealDefinition[];
  entries: DiaryEntry[];
  fetchAll: () => Promise<void>;
}

const DiaryContext = createContext<DiaryContextData>({} as DiaryContextData);

export function DiaryProvider({ children }: any) {
  const [meals, setMeals] = useState<MealDefinition[]>([]);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  async function fetchAll() {
    console.log("🔄 Executando fetchAll()...");

    // 1) obter usuário atual
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      console.log("❌ Nenhum usuário logado, cancelando fetchAll()");
      return;
    }

    console.log("👤 Usuário:", user.id);

    // 2) obter dieta
    const { data: diet, error: dietError } = await supabase
      .from("diets")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (dietError) {
      console.error("❌ Erro ao obter dieta:", dietError);
      return;
    }
    if (!diet) {
      console.log("⚠ Usuario sem dieta cadastrada.");
      return;
    }

    console.log("🥗 Dieta:", diet.id);

    // 3) meals
    const { data: mealsData, error: mealsError } = await supabase
      .from("meals")
      .select("id, name, total_calories")
      .eq("diet_id", diet.id);

    if (mealsError) {
      console.error("❌ Erro ao obter meals:", mealsError);
      setMeals([]);
    } else {
      setMeals((mealsData as any[]) || []);
    }

    // 4) meal_foods
    const { data: mf, error: mfError } = await supabase
      .from("meal_foods")
      .select(`
        id,
        quantity,
        created_at,
        meal_id,
        foods:foods (
          id,
          name,
          calories,
          unit,
          protein,
          carbs,
          fats
        )
      `);

    if (mfError) {
      console.error("❌ Erro ao obter meal_foods:", mfError);
      setEntries([]);
      return;
    }

    // 5) formatar
    const formatted: DiaryEntry[] = (mf as any[])
      .filter((row) => row && row.foods) // garante que existe foods
      .map((row) => {
        const foodObj = row.foods;
        // montar objeto no shape esperado pelo seu types.ts
        const entry: Partial<DiaryEntry> = {
          id: String(row.id),
          // aqui usamos meal name (se quiser manter id, ajuste seu types)
          mealType: String(row.meal_id),
          // caso seu DiaryEntry ainda exija "date", você pode usar created_at
          // se não tiver date no types, remova essa linha
          ...(row.created_at ? { date: row.created_at } : {}),
          food: {
            id: String(foodObj.id),
            name: String(foodObj.name),
            unit: String(foodObj.unit ?? ""),
            calories: Number(foodObj.calories ?? 0),
            protein: foodObj.protein ?? undefined,
            carbs: foodObj.carbs ?? undefined,
            fats: foodObj.fats ?? undefined,
          },
        };

        return entry as DiaryEntry;
      });

    setEntries(formatted);
  }


  // 🟢 OUVIR LOGIN / LOGOUT
  useEffect(() => {
    console.log("👂 Instalando listener de autenticação...");

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("⚡ Auth event:", event);

        if (session?.user) {
          console.log("🔐 Usuário autenticado:", session.user.id);
          await fetchAll();
        } else {
          console.log("🚪 Usuário deslogado. Limpando estado.");
          setMeals([]);
          setEntries([]);
        }
      }
    );

    return () => {
      console.log("🔌 Removendo auth listener.");
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <DiaryContext.Provider value={{ meals, entries, fetchAll }}>
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary() {
  return useContext(DiaryContext);
}
