import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { Button } from "@/components/Button";
import { Styles } from "./Styles";

type Props = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handlePasswordChange = (password: string) => {
    setPassword(password);

    if (password.length > 0 && password.length < 8) {
      setPasswordErrorMessage("A senha deve ter no mínimo 8 caracteres.");
      setIsPasswordValid(false);
    } else {
      setPasswordErrorMessage("");
      setIsPasswordValid(true);
    }
  };

  const handleEmailChange = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(email);
    if (!emailRegex.test(email)) {
      setErrorMessage("Por favor, insira um email válido.");
      setIsValidEmail(false);
    } else {
      setErrorMessage("");
      setIsValidEmail(true);
    }
  };

  function handleSignIn() {
    console.log("Simulando login...");
    // ...lógica de validação do login...
    // Se deu tudo certo:
    onLogin(); // Chama a função que veio lá do App.tsx!
  }

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={Styles.title}>Login</Text>

      <InputField
        texto="E-mail"
        textoPlace="Enter your e-mail"
        textoBaixo={
          errorMessage
            ? errorMessage
            : "Please enter a valid email. e.g.: user@example.com"
        }
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        errorMessage={errorMessage}
        isValid={isValidEmail}
      />

      <InputField
        texto="Password"
        textoPlace="Enter your password"
        textoBaixo={
          passwordErrorMessage
            ? passwordErrorMessage
            : "A senha deve ter no mínimo 8 caracteres."
        }
        value={password}
        onChangeText={handlePasswordChange}
        secure={true}
        isValid={isPasswordValid}
      />

      <View style={Styles.buttonSection}>
        <Button title="Login" color="#000000" icon="" onPress={handleSignIn} />
      </View>

      <Text style={Styles.signupText}>
        Não tem conta? <Text style={Styles.signupLink}>Cadastrar-se</Text>
      </Text>
    </SafeAreaView>
  );
}
