import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CaretLeftIcon, CaretRightIcon } from "phosphor-react-native";
import { COLORS } from "@/constants/theme";
import { styles } from "./styles";

interface DateNavigatorProps {
  currentDateLabel: string;
  onPreviousDay: () => void;
  onNextDay: () => void;
}

export function DateNavigator({
  currentDateLabel,
  onPreviousDay,
  onNextDay,
}: DateNavigatorProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPreviousDay}
        style={styles.arrowButton}
        hitSlop={20}
      >
        <CaretLeftIcon size={24} color={COLORS.secondary} weight="bold" />
      </TouchableOpacity>

      <Text style={styles.dateLabel}>{currentDateLabel}</Text>

      <TouchableOpacity
        onPress={onNextDay}
        style={styles.arrowButton}
        hitSlop={20}
      >
        <CaretRightIcon size={24} color={COLORS.secondary} weight="bold" />
      </TouchableOpacity>
    </View>
  );
}
