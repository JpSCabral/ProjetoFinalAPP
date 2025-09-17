import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { ContentArea } from "@/components/ContentArea";
import { Header } from "@/components/Header";
import { MealCard } from "@/components/MealCard";
import Routes from "@/routes";

import coffeeIcon from "@/assets/icons/coffee.svg";
import mealIcon from "@/assets/icons/mealicon.svg";
import appleIcon from "@/assets/icons/food-apple.svg";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <ContentArea />
      <MealCard description="152kcal" icon={coffeeIcon} title="Café da manha" />
      <MealCard description="180kcal" icon={mealIcon} title="Almoço" />
      <MealCard description="200kcal" icon={appleIcon} title="Lanche" />
      <Button title="Entrar" color="#4CAF50" icon="" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
