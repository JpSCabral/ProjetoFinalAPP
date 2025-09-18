import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({
  componentContainer: {
    width: '100%', // Ocupa toda a largura disponível
    marginBottom: 16, // Espaço entre os campos de input
  },
  
  // O estilo da "caixa" (borda, fundo, altura, padding)
  inputContainer: {
    height: 50,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fbfbfb',
    paddingHorizontal: 10, // Padding apenas nas laterais
    justifyContent: 'center', // Centraliza o texto verticalmente
    borderRadius: 8, // Borda arredondada (opcional, mas fica bom)
  },

  // O estilo do TextInput interno (transparente e sem borda)
  textInput: {
    fontSize: 16,
    color: '#000',
    backgroundColor: 'transparent', // Fundo transparente
    borderWidth: 0,
    // outline: 'none', // Remove o outline do foco na web
  },

  // O estilo que é adicionado quando há um erro
  inputError: {
    borderColor: 'red',
    backgroundColor: '#ffe6e6',
  },

  // Seus outros estilos...
  textTop: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textBottom: {
    color: '#666',
    marginTop: 4,
  },
});