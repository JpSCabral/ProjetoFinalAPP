import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    // Use a cor verde principal do seu app
    backgroundColor: '#4C763B', 
    
    // Configura o layout (logo à esquerda, ícone à direita)
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // Espaçamento interno
    paddingHorizontal: 24, // Espaço nas laterais
    paddingBottom: 20, // Espaço abaixo do logo/ícone
    
    // O 'paddingTop' é adicionado dinamicamente no componente
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF', // Branco para alto contraste
  },
  profileButton: {
    padding: 4, // Aumenta a área de clique do ícone
  },
});