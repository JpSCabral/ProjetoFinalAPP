import { View, Text, TouchableOpacity } from "react-native";
import { SvgProps } from "react-native-svg"; // Importa os tipos para o SVG
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";

interface MealCardProps {
  title: string;
  description: number;
  icon: React.FC<SvgProps>;
}

export function MealCard({
  title,
  description,
  icon: IconComponent,
}: MealCardProps) {
  return (
    <View style={styles.container}>
      {/* View para o Ícone */}
      <View style={styles.iconContainer}>
        <IconComponent width={24} height={24} color="#333638" />
      </View>

      {/* View para os Textos */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description} kcal</Text>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Feather name="arrow-right" size={24} color="#333638" />
      </TouchableOpacity>
    </View>
  );
}
