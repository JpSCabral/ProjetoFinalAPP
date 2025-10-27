import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface DateNavigatorProps {
  // Recebe o texto do dia atual (ex: "Segunda-feira")
  currentDateLabel: string;
  // Funções que serão chamadas ao clicar nas setas
  onPreviousDay: () => void;
  onNextDay: () => void;
}

export function DateNavigator(props: DateNavigatorProps) {
  const { currentDateLabel, onPreviousDay, onNextDay } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPreviousDay} style={styles.arrowButton}>
        <Feather name="arrow-left" size={20} color="#333638" />
      </TouchableOpacity>

      <Text style={styles.dateLabel}>{currentDateLabel}</Text>

      <TouchableOpacity onPress={onNextDay} style={styles.arrowButton}>
        <Feather name="arrow-right" size={20} color="#333638" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24, // Um pouco mais de espaço nas laterais
    marginTop: 24, // Espaço acima do navegador
    // marginBottom: 8, // Espaço abaixo (antes dos MealCards)
  },
  arrowButton: {
    padding: 8, // Aumenta a área de clique
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333638",
  },
});
