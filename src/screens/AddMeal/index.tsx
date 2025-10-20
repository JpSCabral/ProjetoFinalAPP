import { View, Text } from "react-native";
import { MealButton } from "@/components/MealButton";
import coffeeIcon from "@/assets/icons/coffee.svg";
import mealIcon from "@/assets/icons/mealicon.svg";
import appleIcon from "@/assets/icons/food-apple.svg";
import { ProgressCard } from "@/components/ProgressCard";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { AddMealScreenNavigationProp } from "@/routes/addMeal.stack.routes"; // <-- Verifique o caminho do import

export default function AddMeal() {
  const navigation = useNavigation<AddMealScreenNavigationProp>();
  function handleLogMeal() {
    navigation.navigate("log");
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>Refeição</Text>
        <Text>Kcal</Text>
      </View>
      <View>
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
      <Text>Resumo</Text>
      <View style={styles.container}>
        <ProgressCard currentKcal={568} goalValue={1800} />
      </View>
    </View>
  );
}
