import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

type ProgressCardProps = {
  currentKcal: number;
  goalValue: number;
};

export function ProgressCard({ currentKcal, goalValue }: ProgressCardProps) {
  const caloriesLeft = goalValue - currentKcal;
  const progressPercentage = (currentKcal / goalValue) * 100;
  return (
    <View style={styles.cardContainer}>
      <View style={styles.row}>
        <Text style={styles.label}>Total de Kcal</Text>
        <Text style={styles.value}>
          {currentKcal} / {goalValue} kcal
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Kcal faltantes</Text>
        <Text style={styles.value}>{caloriesLeft}</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View
          style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}
        />
      </View>
    </View>
  );
}
