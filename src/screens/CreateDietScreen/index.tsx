import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  PlusIcon,
  TrashIcon,
  UserIcon,
  FloppyDiskIcon,
} from "phosphor-react-native";
import { COLORS, SPACING } from "@/constants/theme";
import { MealType, FoodItem } from "@/types";

interface DietPlanItem {
  meal: MealType;
  foods: FoodItem[];
}

const MEALS: MealType[] = ["Café da manha", "Almoço", "Lanche", "Jantar"];

export default function CreateDietScreen() {
  const navigation = useNavigation<any>();

  const [patientName, setPatientName] = useState("");

  const [dietPlan, setDietPlan] = useState<DietPlanItem[]>(
    MEALS.map((meal) => ({ meal, foods: [] }))
  );

  const handleAddFood = (meal: MealType, food: FoodItem) => {
    setDietPlan((prev) =>
      prev.map((item) => {
        if (item.meal === meal) {
          return { ...item, foods: [...item.foods, food] };
        }
        return item;
      })
    );
  };

  const openSearch = (meal: MealType) => {
    navigation.navigate("FoodSearch", {
      mealType: meal,
      onSelect: (selectedFood: FoodItem) => handleAddFood(meal, selectedFood),
    });
  };

  const removeFood = (meal: MealType, foodId: string) => {
    setDietPlan((prev) =>
      prev.map((item) => {
        if (item.meal === meal) {
          return { ...item, foods: item.foods.filter((f) => f.id !== foodId) };
        }
        return item;
      })
    );
  };

  const handleSaveDiet = () => {
    if (!patientName) return Alert.alert("Erro", "Defina o nome do paciente");

    console.log(
      "Dieta Salva:",
      JSON.stringify({ patient: patientName, plan: dietPlan }, null, 2)
    );
    Alert.alert("Sucesso", `Dieta criada para ${patientName}!`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header Simples */}
      <View style={styles.header}>
        <Text style={styles.title}>Prescrever Dieta</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Input do Paciente */}
        <Text style={styles.label}>Nome do Paciente</Text>
        <View style={styles.inputContainer}>
          <UserIcon color={COLORS.text.secondary} size={20} />
          <TextInput
            style={styles.input}
            placeholder="Ex: João da Silva"
            value={patientName}
            onChangeText={setPatientName}
          />
        </View>

        {/* Lista de Refeições */}
        {dietPlan.map((section, index) => (
          <View key={index} style={styles.mealSection}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealTitle}>{section.meal}</Text>
              <TouchableOpacity onPress={() => openSearch(section.meal)}>
                <PlusIcon color={COLORS.secondary} size={24} weight="bold" />
              </TouchableOpacity>
            </View>

            {/* Alimentos adicionados nesta refeição */}
            {section.foods.length > 0 ? (
              section.foods.map((food, fIndex) => (
                <View key={`${food.id}-${fIndex}`} style={styles.foodRow}>
                  <Text style={styles.foodText}>
                    {food.name}{" "}
                    <Text style={styles.foodUnit}>({food.unit})</Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeFood(section.meal, food.id)}
                  >
                    <TrashIcon color={COLORS.danger} size={18} />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Nenhum alimento prescrito.</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Botão Flutuante de Salvar */}
      <TouchableOpacity style={styles.fab} onPress={handleSaveDiet}>
        <FloppyDiskIcon color="#FFF" size={28} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SPACING.lg, paddingTop: 50, backgroundColor: COLORS.card },
  title: { fontSize: 24, fontWeight: "bold", color: COLORS.text.primary },
  content: { padding: SPACING.lg, paddingBottom: 100 },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: { flex: 1, padding: 12, fontSize: 16 },

  mealSection: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  mealTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },

  foodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#F3F4F6",
  },
  foodText: { fontSize: 16, color: COLORS.text.primary },
  foodUnit: { color: COLORS.text.secondary, fontSize: 14 },
  emptyText: { color: COLORS.text.light, fontStyle: "italic", fontSize: 12 },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
