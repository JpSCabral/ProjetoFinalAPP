import React from "react";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
// Se você não tiver esses componentes prontos, substitua por TouchableOpacity padrão
import { Button } from "@/components/Button";
// import { Styles } from "./Styles";

const backgroundImage = require("@/assets/bgInitial.jpg"); // Certifique-se que a imagem existe

export default function InitialScreen() {
  const navigation = useNavigation<any>();

  function handleStart() {
    // Navega para o App Principal (Tab Navigator)
    navigation.replace("Login");
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
              <Text style={styles.title}>MyDiet</Text>
              <Text style={styles.subtitle}>
                Sua jornada para uma vida mais saudável começa aqui!
              </Text>
            </View>

            <View style={styles.footer}>
              {/* Botão Começar */}
              <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Text style={styles.buttonText}>Começar agora!</Text>
              </TouchableOpacity>

              <Text style={styles.signupText}>
                Não tem conta?{" "}
                <Text
                  style={styles.signupLink}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  Cadastrar-se
                </Text>
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

// Estilos incorporados (caso você não tenha o arquivo Styles.js)
const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }, // Escurece a imagem
  safeArea: { flex: 1, justifyContent: "space-between", padding: 24 },
  content: { marginTop: 60 },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#E0E0E0",
    textAlign: "center",
    marginTop: 16,
  },
  footer: { marginBottom: 40 },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  signupText: { color: "#FFF", textAlign: "center", fontSize: 14 },
  signupLink: { color: "#4CAF50", fontWeight: "bold" },
});
