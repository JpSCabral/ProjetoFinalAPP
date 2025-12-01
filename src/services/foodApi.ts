import axios from 'axios';
import { FoodItem } from '@/types';

const BASE_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

export async function searchFood(query: string): Promise<FoodItem[]> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        search_terms: query,
        search_simple: 1,
        action: 'process',
        json: 1,
        page_size: 20,
        fields: 'code,product_name,serving_size,nutriments' 
      },
    });

    if (!response.data.products) return [];

    const products = response.data.products.map((item: any) => ({
      id: item.code || Math.random().toString(),
      name: item.product_name || 'Alimento sem nome',
      unit: item.serving_size || '100g',
      calories: item.nutriments?.['energy-kcal_100g'] || item.nutriments?.['energy-kcal'] || 0,
      protein: item.nutriments?.proteins_100g || 0,
      carbs: item.nutriments?.carbohydrates_100g || 0,
      fats: item.nutriments?.fat_100g || 0,
    }));

    return products.filter((p: FoodItem) => p.name && p.calories > 0);

  } catch (error) {
    console.error("Erro na API:", error);
    return [];
  }
}