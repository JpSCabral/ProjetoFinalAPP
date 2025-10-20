import { Modal, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ContentArea } from "@/components/ContentArea";
import { Header } from "@/components/Header";
import { MealCard } from "@/components/MealCard";
import { styles } from "./styles";
import coffeeIcon from "@/assets/icons/coffee.svg";
import mealIcon from "@/assets/icons/mealicon.svg";
import appleIcon from "@/assets/icons/food-apple.svg";

export function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }
  function handleMealPress({
    title,
    description,
  }: {
    title: string;
    description: number;
  }) {
    setSelectedMeal({ title, description });
    setIsModalVisible(true);
  }
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <ContentArea kcalConsumed={500} kcalGoal={1800} />
        <MealCard
          description={256}
          icon={coffeeIcon}
          title="Café da manha"
          onPress={() =>
            handleMealPress({ title: "Café da manhã", description: 256 })
          }
        />
        <MealCard description={486} icon={mealIcon} title="Almoço" />
        <MealCard description={400} icon={appleIcon} title="Lanche" />
        <MealCard description={400} icon={mealIcon} title="Jantar" />
      </ScrollView>
      <Modal animationType="none" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Café da manha</Text>
            <Text>2 ovos</Text>
            <Text>2 fatias de pao</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
