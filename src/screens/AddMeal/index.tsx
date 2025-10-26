import { View, Text, ScrollView } from "react-native";
import { MealButton } from "@/components/MealButton";
import coffeeIcon from "@/assets/icons/coffee.svg";
import mealIcon from "@/assets/icons/mealicon.svg";
import appleIcon from "@/assets/icons/food-apple.svg";
import { ProgressCard } from "@/components/ProgressCard";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { AddMealScreenNavigationProp } from "@/routes/addMeal.stack.routes";

export default function AddMeal() {
  const navigation = useNavigation<AddMealScreenNavigationProp>();

  function handleLogMeal() {
    navigation.navigate("log");
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Refeição</Text>
        <Text style={styles.title}>Kcal</Text>
      </View>

      <View style={styles.mealList}>
        <MealButton
          icon={coffeeIcon}
          title="Café da manhã"
          kcal="220"
          onPress={handleLogMeal}
        />
        <MealButton
          icon={appleIcon}
          title="Lanche"
          kcal="300"
          onPress={handleLogMeal}
        />
        <MealButton
          icon={mealIcon}
          title="Almoço"
          kcal="150"
          onPress={handleLogMeal}
        />
        <MealButton
          icon={appleIcon}
          title="Lanche"
          kcal="0"
          onPress={handleLogMeal}
        />
        <MealButton
          icon={mealIcon}
          title="Jantar"
          kcal="0"
          onPress={handleLogMeal}
        />
      </View>

      <Text style={styles.sectionTitle}>Resumo</Text>

      <ProgressCard currentKcal={568} goalValue={1800} />
    </ScrollView>
  );
}
