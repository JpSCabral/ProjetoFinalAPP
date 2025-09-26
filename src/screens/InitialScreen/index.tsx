import { Text, View, ImageBackground, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { Styles } from "./Styles";

const backgroundImage = require("@/assets/bgInitial.jpg");

export default function InitialScreen() {
  return (
    <View style={Styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={backgroundImage}
        style={Styles.background}
        resizeMode="cover"
      >
        <View style={Styles.overlay}>
          <SafeAreaView style={Styles.safeArea}>
            <View style={Styles.content}>
              <Text style={Styles.title}>MyDiet</Text>
              <Text style={Styles.subtitle}>
                Sua jornada para uma vida mais saudável começa aqui!
              </Text>
            </View>

            <View style={Styles.footer}>
              <Button title="Começar agora!" color="#4CAF50" icon="" />
              <Text style={Styles.signupText}>
                Não tem conta?{" "}
                <Text style={Styles.signupLink}>Cadastrar-se</Text>
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}
