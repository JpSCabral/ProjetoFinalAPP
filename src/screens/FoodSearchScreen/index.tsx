import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "@/routes/home.stack.routes";
import { styles } from "./style";
import { useDiary } from "@/contexts/DiaryContext";
import { MealType, FoodItem } from "@/types/foods";

// --- DADOS FICTÍCIOS (MOCK) ---
// No futuro, isso virá de uma API ou banco de dados
interface FoodItens {
  id: string;
  name: string;
  calories: number;
  unit: string; // ex: '100g', '1 unidade'
}

const MOCK_FOOD_DATABASE: FoodItens[] = [
  { id: "1", name: "Maçã", calories: 52, unit: "1 unidade (média)" },
  { id: "2", name: "Banana", calories: 89, unit: "1 unidade (média)" },
  { id: "3", name: "Ovo Cozido", calories: 78, unit: "1 unidade (grande)" },
  { id: "4", name: "Peito de Frango Grelhado", calories: 165, unit: "100g" },
  { id: "5", name: "Arroz Branco Cozido", calories: 130, unit: "100g" },
  { id: "6", name: "Feijão Preto Cozido", calories: 132, unit: "100g" },
  { id: "7", name: "Pão Integral", calories: 70, unit: "1 fatia" },
  { id: "8", name: "Queijo Minas", calories: 70, unit: "1 fatia (30g)" },
];
// --- Fim dos Dados Fictícios ---

type FoodSearchRouteProp = RouteProp<HomeStackParamList, "FoodSearch">;
export function FoodSearchScreen() {
  const navigation = useNavigation();
  const route = useRoute<FoodSearchRouteProp>();
  const { addFoodToDiary, deleteFoodFromDiary } = useDiary();
  const { mealType, entryToReplaceId } = route.params;
  const [searchQuery, setSearchQuery] = useState("");

  // Lógica de filtro
  const filteredData = useMemo(() => {
    if (searchQuery.trim() === "") {
      return MOCK_FOOD_DATABASE; // Mostra tudo se a busca estiver vazia
    }
    return MOCK_FOOD_DATABASE.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]); // Recalcula apenas quando a busca muda

  // Função para lidar com a seleção
  const handleSelectFood = (food: FoodItem) => {
    // Se for uma substituição, delete o item antigo primeiro
    if (entryToReplaceId) {
      deleteFoodFromDiary(entryToReplaceId);
    }

    // Adicione o novo item (funciona para "add" e "substitute")
    addFoodToDiary(food, mealType as MealType);

    // Volte para a Home
    navigation.goBack();
  };

  // Componente para renderizar cada item na lista
  const renderFoodItem = ({ item }: { item: FoodItens }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => handleSelectFood(item)}
    >
      <View>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodDetails}>{item.unit}</Text>
      </View>
      <Text style={styles.foodCalories}>{item.calories} kcal</Text>
    </TouchableOpacity>
  );
  const screenTitle = entryToReplaceId
    ? "Substituir por:"
    : `Adicionar em: ${mealType}`;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{screenTitle}</Text>
        {/* Barra de Busca */}
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar alimento..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Lista de Resultados */}
        <FlatList
          data={filteredData}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum alimento encontrado.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}
