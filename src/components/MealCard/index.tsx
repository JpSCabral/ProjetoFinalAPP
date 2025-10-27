import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { PlusIcon } from "phosphor-react-native";
import { styles } from "./styles";

interface MealCardProps {
  mealName: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  onAddPress: () => void;
  onDetailPress: () => void;
  // O ícone é passado como um elemento React (ex: <CoffeeIcon />)
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

  // Verifica se temos dados de macros para exibir
  const hasMacros =
    protein !== undefined && carbs !== undefined && fats !== undefined;

  // Verificamos se a refeição tem calorias registradas
  const isFilled = calories > 0;

  // Se estiver preenchido, o fundo do ícone fica verde, senão, cinza.
  const iconContainerStyle = [
    styles.iconContainer, // Estilo base
    isFilled ? styles.iconContainerFilled : styles.iconContainerEmpty, // Estilo condicional
  ];

  // Clona o elemento do ícone (passado via props) para injetar a cor correta
  const styledIcon = React.cloneElement(icon as React.ReactElement, {
    color: isFilled ? "#FFFFFF" : "#555",
    size: 24,
  });

  return (
    <Pressable style={styles.container} onPress={onDetailPress}>
      {/* Container do Ícone com estilo condicional */}
      <View style={iconContainerStyle}>{styledIcon}</View>

      <View style={styles.infoContainer}>
        <Text style={styles.mealName}>{mealName}</Text>

        <Text style={[styles.calories, isFilled && styles.caloriesFilled]}>
          {calories} kcal
        </Text>

        {hasMacros && (
          <Text style={styles.macros}>
            P: {protein}g C: {carbs}g G: {fats}g
          </Text>
        )}
      </View>

      <Pressable style={styles.addButton} onPress={onAddPress}>
        <PlusIcon size={24} color="#3B82F6" />
      </Pressable>
    </Pressable>
  );
}
