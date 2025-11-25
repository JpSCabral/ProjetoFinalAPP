import React from "react";
import { View, Text, Pressable } from "react-native";
import { PlusIcon } from "phosphor-react-native"; // Certifique-se de importar o ícone correto
import { COLORS } from "@/constants/theme";
import { styles } from "./styles";

interface MealCardProps {
  mealName: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  onAddPress: () => void;
  onDetailPress: () => void;
  icon: React.ReactNode;
}

export function MealCard(props: MealCardProps) {
  const {
    mealName,
    calories,
    protein,
    carbs,
    fats,
    onAddPress,
    onDetailPress,
    icon,
  } = props;

  const hasMacros =
    protein !== undefined && carbs !== undefined && fats !== undefined;
  const isFilled = calories > 0;

  // Lógica de Cores baseada no estado (Preenchido vs Vazio)
  const iconBackgroundColor = isFilled ? COLORS.secondary : "#E5E7EB"; // Verde se tiver dados, Cinza se não
  const iconColor = isFilled ? COLORS.card : COLORS.text.light; // Branco se tiver dados, Cinza escuro se não

  // Clona o ícone para injetar as cores do tema
  const styledIcon = React.cloneElement(icon as React.ReactElement, {
    color: iconColor,
    size: 24,
    weight: isFilled ? "fill" : "regular", // Opcional: ícone preenchido se tiver dados
  });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed, // Efeito visual ao clicar
      ]}
      onPress={onDetailPress}
    >
      {/* Container do Ícone */}
      <View
        style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}
      >
        {styledIcon}
      </View>

      {/* Informações Centrais */}
      <View style={styles.infoContainer}>
        <Text style={styles.mealName}>{mealName}</Text>

        <Text
          style={[
            styles.calories,
            isFilled ? styles.caloriesFilled : styles.caloriesEmpty,
          ]}
        >
          {calories} kcal
        </Text>

        {hasMacros && (
          <Text style={styles.macros}>
            P: {protein}g C: {carbs}g G: {fats}g
          </Text>
        )}
      </View>

      {/* Botão de Adicionar (Agora Verde!) */}
      <Pressable
        style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.5 }]}
        onPress={onAddPress}
        hitSlop={10} // Aumenta a área de toque
      >
        <PlusIcon size={24} color={COLORS.secondary} weight="bold" />
      </Pressable>
    </Pressable>
  );
}
