import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FA", // Um branco 'off-white'
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginHorizontal: 16,
    marginTop: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: "center",
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  textBlock: {
    alignItems: "center",
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529", // Cor escura
  },
  label: {
    fontSize: 14,
    color: "#6C757D", // Cor cinza
  },
  divider: {
    width: 1,
    height: "70%",
    backgroundColor: "#E9ECEF", // Divisor cinza claro
  },
  progressBar: {
    marginTop: 20, // Espaço entre os textos e a barra
  },
});
