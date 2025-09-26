import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  // O container principal que ocupa a tela toda
  container: {
    flex: 1,
  },
  // O ImageBackground que também ocupa tudo
  background: {
    flex: 1,
  },
  // O overlay que escurece a imagem e organiza o conteúdo
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Preto com 45% de opacidade
  },
  // SafeAreaView para garantir que o conteúdo não fique sob a notch
  safeArea: {
    flex: 1,
    justifyContent: 'space-between', // Joga um conteúdo para cima e outro para baixo
    padding: 20,
  },
  content: {
  },
  footer: {
    alignItems: 'center', 
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  signupText: {
    color: 'white',
    marginTop: 15,
  },
  signupLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
})