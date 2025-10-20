import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#df4b4bff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
  margin: 20, // Pode manter para um pequeno espaçamento das bordas se precisar
  width: '80%', // Exemplo: ocupa 80% da largura da tela
  // Ou maxWidth: 300, // Se preferir um tamanho fixo máximo
  
  backgroundColor: 'white', // Troque para branco ou outra cor de fundo do card
  borderRadius: 20,
  padding: 35,
  alignItems: 'center', // Isso centraliza o *conteúdo* dentro do seu card modal
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5, // Para Android
  },
centeredView: {
  flex: 1, // Ocupa a tela toda
  justifyContent: 'center', // Centraliza na vertical
  alignItems: 'center', // Centraliza na horizontal
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente escuro
},
});
