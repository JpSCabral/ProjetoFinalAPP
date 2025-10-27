import React from "react";
import { View, Text, Dimensions } from "react-native";
import * as Progress from "react-native-progress";
import { styles } from "./styles";

interface CalorieSummaryProps {
  consumed: number;
  goal: number;
}

const { width } = Dimensions.get("window");

export function CalorieSummary({ consumed, goal }: CalorieSummaryProps) {
  const progress = goal > 0 ? consumed / goal : 0;

  const barColor = consumed > goal ? "#E53E3E" : "#4C763B";

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <View style={styles.textBlock}>
          <Text style={styles.value}>{consumed}</Text>
          <Text style={styles.label}>kcal consumida</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.textBlock}>
          <Text style={styles.value}>{goal}</Text>
          <Text style={styles.label}>kcal meta</Text>
        </View>
      </View>

      <Progress.Bar
        progress={progress}
        width={width - 80}
        height={8}
        color={barColor}
        unfilledColor="#F0F0F0" // Cor da barra "vazia"
        borderWidth={0}
        borderRadius={8}
        style={styles.progressBar}
      />
    </View>
  );
}
