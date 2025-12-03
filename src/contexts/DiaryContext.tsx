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
    console.log("🔄 fetchAll() start");

    // obter usuário
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) {
      console.log("❌ sem usuário. Abort fetchAll.");
      return;
    }

    // pegar dieta
    const { data: diet, error: dietError } = await supabase
      .from("diets")
      .select("*")
      .eq("user_id", user.id)
      .single();
    if (dietError || !diet) {
      console.error("Erro ao obter dieta:", dietError);
      return;
    }

    // pegar meals
    const { data: mealsData, error: mealsError } = await supabase
      .from("meals")
      .select("id, name, total_calories")
      .eq("diet_id", diet.id);
    if (mealsError) {
      console.error("Erro ao obter meals:", mealsError);
      setMeals([]);
    } else {
      setMeals((mealsData as any[]) || []);
    }

    // pegar meal_foods + foods embutido (foods é FK para tabela foods)
    // Selecionamos os campos reais da tabela foods conforme você informou
    const { data: mf, error: mfError } = await supabase
      .from("meal_foods")
      .select(`
        id,
        meal_id,
        food_id,
        quantity_g,
        created_at,
        foods:foods (
          id,
          created_at,
          name,
          calores_per_g,
          carbs_per_g,
          protein_per_g,
          fat_per_g
        )
      `);

    if (mfError) {
      console.error("Erro ao obter meal_foods:", mfError);
      setEntries([]);
      return;
    }

    // mapear para DiaryEntry[] — calcular calorias por item assumindo quantity em gramas:
    const formatted: DiaryEntry[] = (mf || [])
      .filter((row: any) => row && row.foods) // garante relação válida
      .map((row: any) => {
        const foodObj = row.foods;
        const quantity = Number(row.quantity ?? 0);

        // colunas do DB: 'calores_per_g' (typo no DB). use esse campo.
        const calPerG = Number(foodObj.calores_per_g ?? 0);

        // calcular calorias totais do item: calPerG * quantity (assumindo grams)
        const calories = calPerG * (quantity || 1);

        const entry: Partial<DiaryEntry> = {
          id: String(row.id),
          mealType: String(row.meal_id), // meal_id (UUID) — Home lida com meal.id
          quantity: quantity || 1,
          food: {
            id: String(foodObj.id),
            name: String(foodObj.name ?? ""),
            unit: "g", // **assumi gramas**, altere se usar outra unidade
            calories,
            protein: Number(foodObj.protein_per_g ?? 0) * (quantity || 1),
            carbs: Number(foodObj.carbs_per_g ?? 0) * (quantity || 1),
            fats: Number(foodObj.fat_per_g ?? 0) * (quantity || 1),
          },
        };

        return entry as DiaryEntry;
      });

    setEntries(formatted);
    console.log("✅ fetchAll done — entries:", formatted.length);
  }

  // ouvir auth changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await fetchAll();
        } else {
          setMeals([]);
          setEntries([]);
        }
      }
    );

    // se já tiver sessão ao iniciar, carregar
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) await fetchAll();
    })();

    return () => {
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
