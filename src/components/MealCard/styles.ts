import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // Fundo branco puro
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    // Estilos base para o container do ícone
    borderRadius: 25,
    padding: 10,
    marginRight: 16,
  },
  iconContainerEmpty: {
    borderRadius: 25,
    backgroundColor: '#F0F0F0', 
  },
  iconContainerFilled: {
    borderRadius: 25,
    backgroundColor: '#34D399', 
  },
  infoContainer: {
    flex: 1, // Faz esta View ocupar todo o espaço restante
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  calories: {
    // Estilo base para as calorias
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  caloriesFilled: {
    // Estilo extra para calorias quando calories > 0
    color: '#333',
    fontWeight: '600',
  },
  macros: {
    fontSize: 12,
    color: '#777',
    marginTop: 6,
  },
  addButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#E0EFFF', // Fundo azul claro para o botão
  },
});
