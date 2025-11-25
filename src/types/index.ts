// Tipagem do Alimento
export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  unit: string;
  // Macros (Opcionais, pois nem sempre teremos esses dados)
  protein?: number;
  carbs?: number;
  fats?: number;
}

// Tipagem dos Tipos de Refeição
export type MealType = 'Café da manha' | 'Almoço' | 'Lanche' | 'Jantar';

// Tipagem da Entrada no Diário (O registro em si)
export interface DiaryEntry {
  id: string;
  food: FoodItem;
  mealType: MealType;
  date: string; // Formato ISO String (ex: "2023-11-25T12:00:00.000Z")
}

// Tipagem para o componente de Lista de Compras
export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  isBought: boolean;
}

// Tipagem auxiliar para gráficos (se precisar usar isoladamente)
export interface MacroData {
  label: string;
  current: number;
  total: number;
  color: string;
}