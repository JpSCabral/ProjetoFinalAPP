import { View, Text } from "react-native";
import { MealCard } from "@/components/MealCard";
import { Button } from "@/components/Button";
import InpultField from "@/components/InputField";
import mealIcon from "@/assets/icons/mealicon.svg";

import { styles } from "./styles";

export default function LogMeal() {
  return (
    <View style={styles.container}>
      <Text>Almoço</Text>
      <InpultField textoPlace="Pesquisar" texto="" textoBaixo="" />
      <MealCard description={256} icon={mealIcon} title="Arroz" />
      <MealCard description={256} icon={mealIcon} title="Frango" />
      <MealCard description={256} icon={mealIcon} title="Carne" />
      <MealCard description={256} icon={mealIcon} title="Feijão" />
      <MealCard description={256} icon={mealIcon} title="Batata" />
      <MealCard description={256} icon={mealIcon} title="Batata-doce" />
      <Button color="#ffb700ff" icon="" title="Salvar refeição" />
    </View>
  );
}
