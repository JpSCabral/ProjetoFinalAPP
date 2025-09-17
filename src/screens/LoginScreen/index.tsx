import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { Button } from "@/components/Button";
import { Styles } from "./Styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("E-mail digitado:", email);
    console.log("Senha digitada:", password);
  };

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={Styles.title}>Login</Text>

      <InputField
        texto="E-mail"
        textoPlace="Enter your e-mail"
        textoBaixo="Please enter a valid email. e.g.: user@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <InputField
        texto="Password"
        textoPlace="Enter your password"
        textoBaixo="Please enter a valid password: - Minimum 8 characters, one..."
        value={password}
        onChangeText={setPassword}
        secure={true}
      />

      <View style={Styles.buttonSection}>
        <Button
          title="Login with E-mail"
          color="#000000"
          icon="mail"
          onPress={handleLogin}
        />
        <Button
          title="Login with Facebook"
          color="#1877F2"
          icon="facebook-f"
          onPress={() => console.log("Login com Facebook")}
        />
        <Button
          title="Login with Google"
          color="#EA4335"
          icon="google"
          onPress={() => console.log("Login com Google")}
        />
      </View>

      <Text style={Styles.signupText}>
        Não tem conta? <Text style={Styles.signupLink}>Cadastrar-se</Text>
      </Text>
    </SafeAreaView>
  );
}
