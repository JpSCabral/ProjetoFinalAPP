import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FDF6E4', // Um bege claro, ajuste conforme a cor exata
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16, // Para dar um espaçamento nas laterais
    shadowColor: "#000", // Sombra sutil (opcional)
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
    marginTop: 16,
    overflow: 'hidden', // Garante que a barra de dentro não ultrapasse as bordas arredondadas
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2E8B57', // Um verde, ajuste conforme a cor exata
    borderRadius: 5,
  },
});