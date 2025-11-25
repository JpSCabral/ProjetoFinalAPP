import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  arrowButton: {
    padding: SPACING.xs,
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text.primary,
    textTransform: "capitalize",
  },
});