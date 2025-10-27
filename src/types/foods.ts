export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  unit: string;
}

// O tipo da refeição
export type MealType = 'Café da manha' | 'Almoço' | 'Lanche' | 'Jantar';

// A entrada no diário (um alimento + a refeição)
export interface DiaryEntry {
  id: string; // ID único para esta entrada (ex: um timestamp)
  food: FoodItem;
  mealType: MealType;
}