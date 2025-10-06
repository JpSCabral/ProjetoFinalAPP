import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',      
    alignItems: 'center',       
    backgroundColor: '#F0EBE8', 
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dededeff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,           
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF', // Fundo branco para o círculo do ícone
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,            // Espaço entre o ícone e o texto
  },
  textContainer: {
    flex: 1,                    // Faz o container de texto ocupar o espaço disponível
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333638',
  },
  description: {
    fontSize: 14,
    color: '#5f5f5f',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6DFDC', // Cor de fundo do botão de adicionar
    justifyContent: 'center',
    alignItems: 'center',
  },
});