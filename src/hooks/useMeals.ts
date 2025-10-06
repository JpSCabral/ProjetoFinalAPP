// src/hooks/useMeals.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/api/supabase";

export function useMeals(userId: string) {
  const queryClient = useQueryClient();

  // 1. Fetch meals
  const mealsQuery = useQuery({
    queryKey: ["meals", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("meals")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    },
  });

  // 2. Add new meal
  const addMeal = useMutation({
    mutationFn: async (mealName: string) => {
      const { data, error } = await supabase
        .from("meals")
        .insert({ name: mealName, user_id: userId })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Refresh meals after adding
      queryClient.invalidateQueries({ queryKey: ["meals", userId] });
    },
  });

  return {
    meals: mealsQuery.data,
    isLoading: mealsQuery.isLoading,
    addMeal: addMeal.mutateAsync,
  };
}
