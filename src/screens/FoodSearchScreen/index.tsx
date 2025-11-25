import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PlusCircleIcon, ArrowsLeftRightIcon } from "phosphor-react-native"; // Icone de troca opcional

import { useDiary } from "@/contexts/DiaryContext";
import { FoodItem, MealType } from "@/types";
import { COLORS, SPACING } from "@/constants/theme";

interface RouteParams {
  mealType: MealType;
  date?: string;
  onSelect?: (food: FoodItem) => void;
  entryToReplaceId?: string; // O ID opcional
}

export default function FoodSearchScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;

  const { addEntry, replaceEntry } = useDiary();

  // Mock Data Completo
  const foods: FoodItem[] = [
    {
      id: "1",
      name: "Arroz Branco",
      calories: 130,
      unit: "100g",
      protein: 2,
      carbs: 28,
      fats: 0,
    },
    {
      id: "2",
      name: "Feijão Carioca",
      calories: 76,
      unit: "1 concha",
      protein: 5,
      carbs: 14,
      fats: 1,
    },
    {
      id: "3",
      name: "Peito de Frango",
      calories: 160,
      unit: "1 filé",
      protein: 32,
      carbs: 0,
      fats: 3,
    },
    {
      id: "4",
      name: "Ovo Cozido",
      calories: 70,
      unit: "1 unidade",
      protein: 6,
      carbs: 1,
      fats: 5,
    },
    {
      id: "5",
      name: "Banana Prata",
      calories: 68,
      unit: "1 unidade",
      protein: 1,
      carbs: 18,
      fats: 0,
    },
    {
      id: "6",
      name: "Aveia em Flocos",
      calories: 100,
      unit: "30g",
      protein: 4,
      carbs: 17,
      fats: 2,
    },
    {
      id: "7",
      name: "Whey Protein",
      calories: 120,
      unit: "1 scoop",
      protein: 24,
      carbs: 3,
      fats: 1,
    },
  ];

  const handleSelectFood = (food: FoodItem) => {
    // 1. Nutricionista
    if (params.onSelect) {
      params.onSelect(food);
      navigation.goBack();
      return;
    }

    // 2. Diário
    if (params.date) {
      const newEntry = {
        id: Math.random().toString(), // Novo ID
        food: food,
        mealType: params.mealType,
        date: params.date,
      };

      // Decisão: Substituir ou Adicionar?
      if (params.entryToReplaceId) {
        replaceEntry(params.entryToReplaceId, newEntry);
      } else {
        addEntry(newEntry);
      }

      navigation.goBack();
    }
  };

  const isReplacing = !!params.entryToReplaceId;

  return (
    <View style={styles.container}>
      {/* Header indicativo */}
      {isReplacing && (
        <View style={styles.replacingHeader}>
          <Text style={styles.replacingText}>
            Selecione o novo alimento para substituir
          </Text>
        </View>
      )}

      {/* Busca (Visual) */}
      <TextInput
        placeholder="Buscar alimento..."
        style={styles.searchInput}
        placeholderTextColor={COLORS.text.light}
      />

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCard}
            onPress={() => handleSelectFood(item)}
            activeOpacity={0.7}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.unit}>
                {item.unit} • {item.calories} kcal
              </Text>
            </View>

            {/* Muda ícone se estiver substituindo */}
            {isReplacing ? (
              <ArrowsLeftRightIcon
                size={28}
                color={COLORS.danger}
                weight="bold"
              />
            ) : (
              <PlusCircleIcon
                size={28}
                color={COLORS.secondary}
                weight="fill"
              />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  searchInput: {
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  replacingHeader: {
    backgroundColor: "#FEF3C7",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  replacingText: { color: "#D97706", fontWeight: "bold", fontSize: 12 },

  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  name: { fontSize: 16, fontWeight: "600", color: COLORS.text.primary },
  unit: { fontSize: 14, color: COLORS.text.secondary, marginTop: 2 },
});
