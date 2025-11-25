import React, { useState, useMemo, useEffect } from "react";
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
  CoffeeIcon,
  ForkKnifeIcon,
  AppleLogoIcon,
  PlusIcon,
  TrashIcon,
  PlugsIcon,
} from "phosphor-react-native";

// Imports internos
import { Header } from "@/components/Header";
import { CalorieSummary } from "@/components/CalorieSummary";
import { MealCard } from "@/components/MealCard";
import { DateNavigator } from "@/components/DateNavigator";
import { useDiary } from "@/contexts/DiaryContext";
import { MealType } from "@/types";
import { COLORS, SPACING } from "@/constants/theme";

const MEAL_SECTIONS: { id: MealType; label: string; icon: any }[] = [
  { id: "Café da manha", label: "Café da manhã", icon: CoffeeIcon },
  { id: "Almoço", label: "Almoço", icon: ForkKnifeIcon },
  { id: "Lanche", label: "Lanche", icon: AppleLogoIcon },
  { id: "Jantar", label: "Jantar", icon: ForkKnifeIcon },
];

// Helper de Data
const getFormattedDateLabel = (date: Date) => {
  const today = new Date();
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  const diffTime = d.getTime() - t.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoje";
  if (diffDays === -1) return "Ontem";
  if (diffDays === 1) return "Amanhã";
  const days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  return days[d.getDay()];
};

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { entries, goal, removeEntry } = useDiary();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);

  // Filtros
  const entriesForDate = useMemo(() => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    return entries.filter((e) => e.date && e.date.startsWith(dateKey));
  }, [entries, selectedDate]);

  const caloriesByMeal = useMemo(() => {
    const totals: Record<string, number> = {
      "Café da manha": 0,
      Almoço: 0,
      Lanche: 0,
      Jantar: 0,
    };
    entriesForDate.forEach((entry) => {
      if (totals[entry.mealType] !== undefined) {
        totals[entry.mealType] += entry.food.calories;
      }
    });
    return totals;
  }, [entriesForDate]);

  const totalConsumed = Object.values(caloriesByMeal).reduce(
    (a, b) => a + b,
    0
  );

  const foodsForSelectedMeal = useMemo(() => {
    if (!selectedMeal) return [];
    return entriesForDate.filter((entry) => entry.mealType === selectedMeal);
  }, [entriesForDate, selectedMeal]);

  // Ações
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleAddFood = (mealType: MealType) => {
    navigation.navigate("FoodSearch", {
      mealType,
      date: selectedDate.toISOString(),
    });
  };

  const handleShowDetails = (mealType: MealType) => {
    setSelectedMeal(mealType);
    setIsModalVisible(true);
  };

  // --- LÓGICA DE REMOVER ---
  const handleRemoveItem = (id: string) => {
    Alert.alert("Remover", "Deseja excluir este alimento?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          removeEntry(id);
          // Fecha modal se ficar vazio (opcional)
          if (foodsForSelectedMeal.length === 1) setIsModalVisible(false);
        },
      },
    ]);
  };

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.greenBackground} />
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <View style={styles.summaryWrapper}>
          <CalorieSummary consumed={totalConsumed} goal={goal} />
        </View>

        <DateNavigator
          currentDateLabel={getFormattedDateLabel(selectedDate)}
          onPreviousDay={() => changeDate(-1)}
          onNextDay={() => changeDate(1)}
        />

        <View style={styles.mealsContainer}>
          {MEAL_SECTIONS.map((meal) => (
            <MealCard
              key={meal.id}
              mealName={meal.label}
              calories={caloriesByMeal[meal.id] || 0}
              icon={<meal.icon size={24} color={COLORS.text.secondary} />}
              onAddPress={() => handleAddFood(meal.id)}
              onDetailPress={() => handleShowDetails(meal.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* --- MODAL DE DETALHES --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <Pressable style={styles.modalOverlay} onPress={toggleModal}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedMeal}</Text>
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
                  // --- CLICK NA LINHA: SUBSTITUIR ---
                  onPress={() => {
                    setIsModalVisible(false);
                    navigation.navigate("FoodSearch", {
                      mealType: selectedMeal,
                      date: selectedDate.toISOString(),
                      entryToReplaceId: item.id, // Manda o ID pra trocar
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

                    {/* --- CLICK NA LIXEIRA: REMOVER --- */}
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleRemoveItem(item.id)}
                    >
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
              <PlugsIcon size={20} color="#FFF" style={{ marginRight: 8 }} />
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
    zIndex: 0,
  },
  scrollContent: { paddingBottom: 100 },
  summaryWrapper: { paddingHorizontal: SPACING.md, marginTop: SPACING.md },
  mealsContainer: { paddingHorizontal: SPACING.md, gap: SPACING.md },

  // Modal Styles
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
  modalTitle: { fontSize: 20, fontWeight: "bold", color: COLORS.text.primary },
  closeText: { color: COLORS.text.secondary },
  emptyText: {
    textAlign: "center",
    color: COLORS.text.light,
    marginVertical: 20,
  },

  // Estilo do Item no Modal
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  foodName: { fontSize: 16, fontWeight: "500", color: COLORS.text.primary },
  foodUnit: { fontSize: 14, color: COLORS.text.secondary },
  foodActions: { flexDirection: "row", alignItems: "center", gap: SPACING.md },
  foodCalories: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },
  deleteButton: { padding: 4, backgroundColor: "#FEF2F2", borderRadius: 8 },

  addButtonModal: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.md,
  },
  addButtonText: { color: "#FFF", fontWeight: "bold" },
});
