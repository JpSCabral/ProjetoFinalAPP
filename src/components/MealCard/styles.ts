import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm, // Espaçamento entre cards
    // Sombra suave
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent', // Preparado para borda se necessário
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }]
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24, // Círculo perfeito
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  mealName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  calories: {
    fontSize: 14,
    fontWeight: "500",
  },
  caloriesFilled: {
    color: COLORS.text.secondary,
  },
  caloriesEmpty: {
    color: COLORS.text.light,
    fontStyle: 'italic',
  },
  macros: {
    fontSize: 12,
    color: COLORS.text.light,
    marginTop: 2,
  },
  addButton: {
    padding: SPACING.xs,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background, // Fundo leve no botão +
    borderRadius: 12,
    width: 40,
    height: 40,
  },
});