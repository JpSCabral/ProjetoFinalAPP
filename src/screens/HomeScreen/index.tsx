import { StyleSheet, ScrollView, View } from "react-native";
import { ContentArea } from "@/components/ContentArea";
import { Header } from "@/components/Header";
import { MealCard } from "@/components/MealCard";
import { styles } from "./styles";
import coffeeIcon from "@/assets/icons/coffee.svg";
import mealIcon from "@/assets/icons/mealicon.svg";
import appleIcon from "@/assets/icons/food-apple.svg";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <ContentArea kcalConsumed={500} kcalGoal={1800} />
        <MealCard description={256} icon={coffeeIcon} title="Café da manha" />
        <MealCard description={486} icon={mealIcon} title="Almoço" />
        <MealCard description={400} icon={appleIcon} title="Lanche" />
        <MealCard description={400} icon={mealIcon} title="Jantar" />
      </ScrollView>
    </View>
  );
}
