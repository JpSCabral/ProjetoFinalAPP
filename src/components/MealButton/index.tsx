import { View, Text, TouchableOpacity } from "react-native";
import { SvgProps } from "react-native-svg";
import { styles } from "./styles";

type MealButtonProps = {
  title: string;
  kcal: string | number;
  icon: React.FC<any>;
  onPress?: () => void;
};

export function MealButton({
  title,
  kcal,
  icon: IconComponent,
  onPress,
}: MealButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.infoContainer}>
          <IconComponent width={24} height={24} color="#333638" />
          <Text style={styles.title}>{title}</Text>
        </View>

        <Text style={styles.description}>{kcal} kcal</Text>
      </TouchableOpacity>
    </View>
  );
}
