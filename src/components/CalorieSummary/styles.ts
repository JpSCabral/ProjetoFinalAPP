import { StyleSheet } from "react-native";
import  { COLORS, SPACING } from "@/constants/theme";
export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.md,
    // Sombra suave (Elevation para Android, Shadow para iOS)
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: SPACING.md, // Espaço para baixo
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  textBlock: {
    alignItems: "center",
    flex: 1, // Garante que ocupem espaço igual
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  // Estilos da Barra
  progressBarTrack: {
    height: 10,
    backgroundColor: COLORS.background, // Cinza claro de fundo
    borderRadius: 5,
    width: "100%",
    overflow: "hidden", // Garante que a barra interna não saia das bordas arredondadas
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },
});