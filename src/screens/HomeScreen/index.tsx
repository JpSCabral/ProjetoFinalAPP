import { Modal, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { ContentArea } from "@/components/ContentArea";
import { Header } from "@/components/Header";
import { MealCard } from "@/components/MealCard";
import { styles } from "./styles";
import coffeeIcon from "@/assets/icons/coffee.svg";
import mealIcon from "@/assets/icons/mealicon.svg";
import appleIcon from "@/assets/icons/food-apple.svg";
import { getAllDiets, Meal } from "@/services/dietService";
import { useDietStore } from "@/store/useDietStore"

interface SelectedMeal {
  title: string;
  description: number;
}

export function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<SelectedMeal | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const loadDiets = useDietStore((state) => state.loadDiets);
  const diets = useDietStore((state) => state.diets);

  useEffect(() => {
    loadDiets(); 
  }, []);

  useEffect(() => {
    if (diets.length > 0) {
      setMeals(diets[0].meals);
    }
  }, [diets]);

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }

  function handleMealPress(meal: Meal) {
    setSelectedMeal({ title: meal.name, description: meal.total_calories });
    setIsModalVisible(true);
  }

  function getIconForMeal(name: string) {
    if (name.toLowerCase().includes("café") || name.toLowerCase().includes("breakfast")) return coffeeIcon;
    if (name.toLowerCase().includes("almoço") || name.toLowerCase().includes("lunch")) return mealIcon;
    if (name.toLowerCase().includes("lanche") || name.toLowerCase().includes("snack")) return appleIcon;
    if (name.toLowerCase().includes("jantar") || name.toLowerCase().includes("dinner")) return mealIcon;
    return mealIcon;
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <ContentArea
          kcalConsumed={meals.reduce((acc, m) => acc + m.total_calories, 0)}
          kcalGoal={1800}
        />

        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            description={meal.total_calories}
            icon={getIconForMeal(meal.name)}
            title={meal.name}
            onPress={() => handleMealPress(meal)}
          />
        ))}
      </ScrollView>

      <Modal animationType="none" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedMeal && (
              <>
                <Text style={styles.modalTitle}>{selectedMeal.title}</Text>
                <Text style={styles.modalText}>
                  Total: {selectedMeal.description} kcal
                </Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.closeButton}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
