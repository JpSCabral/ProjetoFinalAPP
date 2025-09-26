import { View, Text } from "react-native";
import { styles } from "./styles";

interface ContentAreaProps {
  kcalConsumed: number;
  kcalGoal: number;
}

export function ContentArea({ kcalConsumed, kcalGoal }: ContentAreaProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
        <Text style={styles.numberText}>{kcalConsumed}</Text>
        <Text>kcal consumida</Text>
      </View>
      <View style={styles.divisoria}></View>
      <View style={styles.textArea}>
        <Text style={styles.numberText}>{kcalGoal}</Text>
        <Text>kcal meta</Text>
      </View>
    </View>
  );
}
