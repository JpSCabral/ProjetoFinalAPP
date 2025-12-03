import React, { useState, useMemo } from "react";
import {
  Modal,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ForkKnifeIcon,
  PlugsIcon,
  TrashIcon,
} from "phosphor-react-native";

import { Header } from "@/components/Header";
import { CalorieSummary } from "@/components/CalorieSummary";
import { DateNavigator } from "@/components/DateNavigator";
import { MealCard } from "@/components/MealCard";
import { useDiary } from "@/contexts/DiaryContext";
import { COLORS, SPACING } from "@/constants/theme";

// Helper de data
const getFormattedDateLabel = (date: Date) => {
  const today = new Date();
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = d.getTime() - today.getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  if (days === 0) return "Hoje";
  if (days === -1) return "Ontem";
  if (days === 1) return "Amanhã";

  return d.toLocaleDateString("pt-BR", { weekday: "long" });
};

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { entries, meals } = useDiary();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Agora é string | null
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  // Como meal_foods ainda não tem campo date, não filtramos por data
  const entriesForDate = entries;

  // Agrupa calorias por refeição usando IDs reais do Supabase
  const caloriesByMeal = useMemo(() => {
    const totals: Record<string, number> = {};

    meals.forEach(m => (totals[m.id] = 0));

    entriesForDate.forEach((e) => {
      if (totals[e.mealType] != null) {
        totals[e.mealType] += e.food.calories * e.quantity;
      }
    });

    return totals;
  }, [entriesForDate, meals]);

  const totalConsumed = Object.values(caloriesByMeal).reduce((a, b) => a + b, 0);

  const foodsForSelectedMeal = useMemo(() => {
    if (!selectedMeal) return [];
    return entries.filter((e) => e.mealType === selectedMeal);
  }, [entries, selectedMeal]);

  const changeDate = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d);
  };

  const handleAddFood = (mealId: string) => {
    navigation.navigate("FoodSearch", {
      mealType: mealId,
      date: selectedDate.toISOString(),
    });
  };

  const handleShowDetails = (mealId: string) => {
    setSelectedMeal(mealId);
    setIsModalVisible(true);
  };

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <View style={styles.greenBackground} />

      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.summaryWrapper}>
          <CalorieSummary consumed={totalConsumed} goal={2000} />
        </View>

        <DateNavigator
          currentDateLabel={getFormattedDateLabel(selectedDate)}
          onPreviousDay={() => changeDate(-1)}
          onNextDay={() => changeDate(1)}
        />

        {/* --- REFLEXÃO DINÂMICA --- */}
        <View style={styles.mealsContainer}>
          {meals.map((meal) => {
            const mealItems = entries.filter((e) => e.mealType === meal.id);
            const total = mealItems.reduce(
              (acc, it) => acc + it.food.calories * it.quantity,
              0
            );

            return (
              <MealCard
                key={meal.id}
                mealName={meal.name}
                calories={total}
                icon={<ForkKnifeIcon size={24} color={COLORS.text.secondary} />}
                onAddPress={() => handleAddFood(meal.id)}
                onDetailPress={() => handleShowDetails(meal.id)}
              />
            );
          })}
        </View>
      </ScrollView>

      {/* --- MODAL --- */}
      <Modal
        transparent
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <Pressable style={styles.modalOverlay} onPress={toggleModal}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {meals.find((m) => m.id === selectedMeal)?.name ?? "Refeição"}
              </Text>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.closeText}>Fechar</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={foodsForSelectedMeal}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Nada registrado.</Text>
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.foodItem}
                  onPress={() => {
                    toggleModal();
                    navigation.navigate("FoodSearch", {
                      mealType: selectedMeal,
                      date: selectedDate.toISOString(),
                      entryToReplaceId: item.id,
                    });
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.foodName}>{item.food.name}</Text>
                    <Text style={styles.foodUnit}>{item.food.unit}</Text>
                  </View>

                  <View style={styles.foodActions}>
                    <Text style={styles.foodCalories}>
                      {item.food.calories} kcal
                    </Text>

                    <TouchableOpacity style={styles.deleteButton}>
                      <TrashIcon size={20} color={COLORS.danger} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.addButtonModal}
              onPress={() => {
                toggleModal();
                if (selectedMeal) handleAddFood(selectedMeal);
              }}
            >
              <PlugsIcon size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  greenBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: COLORS.primary,
  },
  scrollContent: { paddingBottom: 100 },
  summaryWrapper: { paddingHorizontal: SPACING.md, marginTop: SPACING.md },
  mealsContainer: { paddingHorizontal: SPACING.md, gap: SPACING.md },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: SPACING.md,
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.lg,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold" },
  closeText: { color: COLORS.text.secondary },
  emptyText: {
    textAlign: "center",
    color: COLORS.text.light,
    marginTop: 20,
  },

  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  foodName: { fontSize: 16, fontWeight: "600", color: COLORS.text.primary },
  foodUnit: { fontSize: 13, color: COLORS.text.secondary },
  foodActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  foodCalories: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },
  deleteButton: {
    backgroundColor: "#FEF2F2",
    padding: 6,
    borderRadius: 8,
  },

  addButtonModal: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.md,
  },
  addButtonText: { color: "#FFF", marginLeft: 8, fontWeight: "bold" },
});
