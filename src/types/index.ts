// ---------------------------
// FOOD
// ---------------------------
export interface Food {
  id: string;
  name: string;
  unit: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}

// ---------------------------
// MEAL (Café da manhã, Almoço...)
// mas dinâmica, vinda do Supabase
// ---------------------------
export interface MealDefinition {
  id: string;        // meal.id
  name: string;      // meal.name
  total_calories?: number;
}

// ---------------------------
// DIARY ENTRY (item consumido)
// ---------------------------
export interface DiaryEntry {
  id: string;        // meal_food id
  mealType: string;  // meal_id
  quantity: number;
  food: Food;        // objeto foods do Supabase
}

