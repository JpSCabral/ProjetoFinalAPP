// src/services/dietService.ts
import dietsData from "@/mock/meals.json";

export interface Food {
  id: string;
  meal_id: string;
  name: string;
  quantity: string;
  calories: number;
}

export interface Meal {
  id: string;
  diet_id: string;
  name: string;
  total_calories: number;
  foods: Food[];
}

export interface Diet {
  id: string;
  name: string;
  description: string;
  meals: Meal[];
}

interface DietsFile {
  diets: Diet[];
}


const data = dietsData as DietsFile;


export function getAllDiets(): Diet[] {
  return data.diets;
}


export function getDietById(dietId: string): Diet | undefined {
  return data.diets.find((d) => d.id === dietId);
}

export function getMealsByDiet(dietId: string): Meal[] {
  const diet = getDietById(dietId);
  return diet ? diet.meals : [];
}

export function getFoodsByMeal(mealId: string): Food[] {
  for (const diet of data.diets) {
    const meal = diet.meals.find((m) => m.id === mealId);
    if (meal) return meal.foods;
  }
  return [];
}
